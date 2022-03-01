

# 创建工程

!> **完整的创建工程命令如下** 如果没有这些环境，请先安装[node12](https://npmmirror.com/mirrors/node/v12.13.1/)以上，再按步骤一步步安装。

```bash
# 创建工程
buijs create bui-demo
# 进入工程
cd bui-demo
# 安装工程依赖
npm install
# 运行预览
npm run dev
```

![构建GIF预览](../static/images/buijs/buijs-create-demo_low.gif)

## 1. 全局安装 buijs

`buijs`是一个cli命令工具（需要node 12支持），用于快速构建工程，模板，更新平台等功能。

> Windows用户

```bash
npm install -g buijs
```

> MAC用户

```bash
sudo npm install -g buijs
```
MAC需要加上权限，输入开机密码

## 2. 创建单页工程

创建名为`bui-demo`的工程模板。

```bash
# 创建工程模板
buijs create bui-demo 
# 进入工程目录
cd bui-demo

```

!> 也可以直接下载 [BUI单页工程开发包](http://easybui.com/downloads/source/bui/bui_router_dev_latest.zip) ，解压后进行第3步安装依赖。


## 3. 安装依赖

第1种, 通过npm (部分地区安装较慢)

```bash
# 安装依赖
$ npm install
```

第2种, 通过[cnpm](https://npmmirror.com/) (推荐)

```bash
# 安装cnpm
$ npm install -g cnpm --registry=https://registry.npmmirror.com
# 安装依赖
$ cnpm install
```

第3种, yarn安装
```bash
# 安装
$ npm install -g yarn
# 安装依赖
$ yarn install
```

## 4. 运行预览

执行`npm run dev`会自动打开默认浏览器预览，编辑内容实时刷新。

```bash
# 运行预览
$ npm run dev
```

![预览图](../static/images/template/preview.png)
