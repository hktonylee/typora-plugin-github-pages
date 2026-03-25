# Typora Plugin Image Location

[English](./README.md) | 简体中文

这是一个基于 [typora-community-plugin][core] 开发的，适用于 [Typora](https://typora.io) 的插件。

## 特性

- 相对于当前笔记目录的根目录解析图片路径，类似 Obsidian。

  > **例子**
  >
  > 例如 `/assets/image.png` 被解析为 `{笔记目录路径}/assets/image.png` 而不用写冗长的绝对路径或复杂的相对路径。

- 相对于当前笔记目录的根目录解析 Front Matter 属性 `typora-root-url`

  > **例子**
  >
  > `typora-root-url: /assets` → `typora-root-url: {笔记目录路径}/assets`
  >
  > 然后我们就可以这样引用图片: `![](image.png)`，它会被解析为 `![]({笔记目录路径}/assets/image.png)`。

- 应用设置 → 图片 → 图片上传设置 → 命令，支持占位符 `${vault}`（它会被解析为当前笔记目录的根路径）

- 支持 Jekyll 博客：从 `_config-dev.yml` 解析 `{{ site.image_base }}`。如果 `image_base` 以 `http://localhost.../` 开头，会被转换为相对于 `_config-dev.yml` 的本地路径。

- 插入图片时，简化图片绝对路径为相对于 当前笔记目录的根目录 的相对路径

  > **Example**
  >
  > `{vault-path}/assets/image.png` → `/assets/image.png`

## 预览

| 相对于当前笔记根目录的图片   | 相对于当前笔记根目录的 `typora-root-url` |
|:-----------------------:|:-----------------------------------:|
| ![](./docs/assets/base.jpg) | ![](./docs/assets/local-root-path.jpg) |

## 安装

1. 安装 [typora-community-plugin][core]
2. 在 “设置 -> 插件市场” 中搜索 “Image Location” 并安装



[core]: https://github.com/typora-community-plugin/typora-community-plugin
