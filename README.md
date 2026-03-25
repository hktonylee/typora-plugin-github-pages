# Typora Plugin Image Location

English | [简体中文](./README.zh-CN.md)

This a plugin based on [typora-community-plugin][core] for [Typora](https://typora.io).

## Features

- Resolve image's path relative to the vault's root.

  > **Example**
  >
  > `/assets/image.png` → `{vault-path}/assets/image.png`

- Resolve Front Matter `typora-root-url` relative to the vault's root.

  > **Example**
  >
  > `typora-root-url: /assets` → `typora-root-url: {vault-path}/assets`
  >
  > Then we can use the image like this: `![](image.png)`, it will be resolved to `![]({vault-path}/assets/image.png)`.

- App Settings → Image → Image Upload Setting → Command, supports new placeholder `${vault}` (it will be replaced to the vault's root path)

- Jekyll blog support: resolve `{{ site.image_base }}` from `_config-dev.yml`. If `image_base` starts with `http://localhost.../`, it will be converted to a local path relative to `_config-dev.yml`.

- After an image is inserted, the image's absolute path will be simplified to relative path from vault root.

  > **Example**
  >
  > `{vault-path}/assets/image.png` → `/assets/image.png`

## Preview

| image from vault's root | `typora-root-url` from vault's root |
|:-----------------------:|:-----------------------------------:|
| ![](./docs/assets/base.jpg) | ![](./docs/assets/local-root-path.jpg) |

## Install

1. Install [typora-community-plugin][core]
2. Open "Settings -> Plugin Marketplace" search "Image Location" then install it.



[core]: https://github.com/typora-community-plugin/typora-community-plugin
