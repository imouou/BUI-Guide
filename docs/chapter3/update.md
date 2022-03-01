# 版本升级

**查看当前版本**

在chrome调试面板输入 `bui.version`（当前版本），`bui.versionCode`（当前版本的日期）

**查看当前平台**

在chrome调试面板输入 `bui.currentPlatform`

## 更新Webapp版

webapp版为默认通用的版本

```bash
# 进入工程
cd bui-demo
# 更新 bui.js，bui.css 为webapp最新版
buijs update
```

## 更新Link版

> link版为在link容器运行的版本

```bash
# 进入工程
cd bui-demo
# 更新 bui.js，bui.css 为link最新版
buijs update -p link
```

## 更新Dcloud版

```bash
# 进入工程
cd bui-demo
# 更新 bui.js，bui.css 为dcloud最新版
buijs update -p dcloud
```

## 更新APICloud版

```bash
# 进入工程
cd bui-demo
# 更新 bui.js，bui.css 为apicloud最新版
buijs update -p apicloud
```
