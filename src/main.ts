import { path, Plugin, decorate } from '@typora-community-plugin/core'
import { editor, File } from 'typora'
import { existsSync, readFileSync } from 'node:fs'


export default class extends Plugin {

  private siteImageBase: string | null = null
  private siteImageBaseFromConfig = false

  private loadSiteImageBase() {
    if (this.siteImageBaseFromConfig) {
      return
    }

    this.siteImageBaseFromConfig = true

    const configPath = path.join(this.app.vault.path, '_config-dev.yml')
    if (!existsSync(configPath)) {
      return
    }

    const content = readFileSync(configPath, 'utf8')
    const match = content.match(/^\s*image_base\s*:\s*(.+?)\s*$/m)
    if (!match) {
      return
    }

    let imageBase = match[1].trim().replace(/^['"]|['"]$/g, '')
    if (!imageBase) {
      return
    }

    imageBase = imageBase.replace(/\/$/, '')

    if (/^http:\/\/localhost(?::\d+)?\//.test(imageBase)) {
      const localhostPath = imageBase.replace(/^http:\/\/localhost(?::\d+)?/, '')
      this.siteImageBase = path.join(path.dirname(configPath), localhostPath)
      return
    }

    this.siteImageBase = imageBase
  }

  private resolveJekyllPath(url: string) {
    this.loadSiteImageBase()

    if (!this.siteImageBase) {
      return url
    }

    const tokenPattern = /^\s*\{\{\s*site\.\s*image_base\s*\}\}/
    if (tokenPattern.test(url)) {
      return url.replace(tokenPattern, this.siteImageBase)
    }

    return url
  }

  onload() {

    // Resolve relative path from vault root as absolute path
    this.register(
      decorate.parameters(editor.imgEdit, 'getRealSrc', ([url]) => {
        url = this.resolveJekyllPath(url)

        if (/^[/\\]/.test(url)) {
          url = 'file://' + path.join(this.app.vault.path, url)
        }
        return [url] as [string]
      }))

    // Front Matter `typora-root-url` support relative path from vault root as absolute path
    this.register(
      decorate.returnValue(editor.docMenu, 'getLocalRootUrl', ([], url) => {
        if (url) {
          url = this.resolveJekyllPath(url)
        }

        if (url && /^[/\\]/.test(url)) {
          url = path.join(this.app.vault.path, url)
        }
        return url
      }))

    // Pass vault root to custom uploader
    this.register(
      decorate.returnValue(editor.imgEdit, 'getImageUploaderCommand', (args, uploader) => {
        if (File.option.imageUploader === 'custom') {
          uploader = uploader.replace(/\$\{vault\}/g, this.app.vault.path)
        }
        return uploader
      }))

    // Simplify absolute path to relative path from vault root.
    this.register(
      decorate.returnValue(editor.imgEdit, 'resolveImagePath', (args, imgPath) => {
        const vaultPath = this.app.vault.path
        const prefix = `file://${vaultPath}`

        if (imgPath.startsWith(prefix)) {
          imgPath = imgPath.slice(prefix.length)
        }
        else if (imgPath.startsWith(vaultPath)) {
          imgPath = imgPath.slice(vaultPath.length)
            .replace(/\\/g, '/')
        }
        else if (imgPath.startsWith('file://./')) {
          imgPath = imgPath.slice(9)
        }
        return imgPath
      }))
  }
}
