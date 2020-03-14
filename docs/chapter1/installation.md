# 安装

## 开发环境
?> 你可能只需要一个系统自带的编辑器,就可以使用BUI开发应用, 但通过以下软件相互配合,对开发效率会有一定的帮助.

1. 编辑器 ( 推荐: `vscode`, `Atom` 或 `Sublimetext3` );
2. `bui-fast` [点击下载](https://github.com/imouou/BUI-Fast-Snippets/releases) (配合编辑器快速书写插件, 支持 Vscode, Atom , Sublimetext , Webstorm , APICloudIDE ) [查看安装说明](tools/buifast.md);
3. [`buijs`](tools/buijs) cli工程构建工具, 用于快速构建工程,模板,更新平台等功能

## 下载开发包

!> 用过npm, 我们推荐您学习使用[buijs](tools/buijs.md)`自动化构建`, 自动化构建默认是最新的`bui`版本.

- [下载BUI单页开发包](http://www.easybui.com/downloads/source/bui/bui_router_dev_latest.zip)

- [下载BUI多页开发包](http://www.easybui.com/downloads/source/bui/bui_dev_latest.zip)

## 了解规范

- [目录规范说明](ui/standard.md)
- [切图规范说明](ui/cutimage.md)
- [样式规范说明](ui/style.md)

## 部署运行

第1种, 通过npm (推荐使用 cnpm 或者 yarn 模块安装)

?> 解压,进入工程目录, 通过这种运行, `app.json`可以配置域名代理,解决移动端调试的跨域问题. 生成的`dist目录`为最终要打包的目录, src 保持源文件的方式.

```
# 安装依赖
$ npm install
# 运行服务
$ npm run dev
```

!> 注意, 如果报错, 推荐安装[cnpm](https://npm.taobao.org/), 使用 `cnpm install` 安装依赖.
另一个报错的原因是, [node-sass](https://github.com/sass/node-sass) 版本跟你的 [node](https://nodejs.org/en/) 版本不一致, 建议下载[node 8.x](https://nodejs.org/dist/v8.15.1/). 如果你下载的 node 是`10.15.3 LTS`. `node-sass` 的版本要在 4.9+ , 需要先`npm remove node-sass` 再安装指定版本.

| **NodeJS**             | **Minimum node-sass version**    |
|:--------------------|---------------:|
| Node 11  |4.10+      |
| Node 10  |4.9+      |
| Node 8  |4.5.3+      |


第2种: 使用yarn安装

?> 这种方式比Npm 要稳定,报错的概率较小. 通过[yarn](https://yarnpkg.com/lang/zh-hans/docs/install/)安装, 需要先安装`yarn`.

```
# 安装依赖
$ yarn install

# 调试的时候
$ yarn run dev

# 打包的时候执行
$ yarn run build
```

第3种, 把src 目录放在 IIS 或者 phpstudy 之类的服务器, 运行就能直接观看效果, 但是需要解决浏览器跨域问题, [Chrome跨域调试](chapter1/debug.md).
