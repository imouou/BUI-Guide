# 安装

## 开发环境
?> 你可能只需要一个系统自带的编辑器,就可以使用BUI开发应用, 但通过以下软件相互配合,对开发效率会有一定的帮助.

1. 编辑器 ( 推荐: `vscode`, `Atom` 或 `Sublimetext3` );
2. `bui-fast` [点击下载](https://github.com/imouou/BUI-Fast-Snippets/releases) (配合编辑器快速书写插件, 支持 Vscode(搜索安装bui-fast插件), Atom , Sublimetext , Webstorm , APICloudIDE ) [查看安装说明](https://github.com/imouou/BUI-Fast-Snippets/);
3. [`buijs`](tools/buijs) cli工程构建工具, 用于快速构建工程,模板,更新平台等功能

## 下载开发包

!> 用过npm, 我们推荐您学习使用[buijs](https://github.com/imouou/buijs-cli)`自动化构建`, 自动化构建默认是最新的`bui`版本. 并且 `buijs -v`1.6.0版本会自动根据你的node版本,创建对应的工程, 减少安装依赖的错误产生.

- [下载BUI单页开发包](http://www.easybui.com/downloads/source/bui/bui_router_dev_latest.zip)

- [下载BUI多页开发包](http://www.easybui.com/downloads/source/bui/bui_dev_latest.zip)

## 了解规范

- [目录规范说明](ui/standard.md)
- [切图规范说明](ui/cutimage.md)
- [样式规范说明](ui/style.md)

## 部署运行

?> 解压,进入工程目录, 通过这种运行, `app.json`可以配置域名代理,解决移动端调试的跨域问题. 生成的`dist`目录为最终要打包的目录, `src`目录保持源文件的方式.


第1种, 通过npm, (安装较慢)

```bash
# 安装依赖
$ npm install
# 运行服务
$ npm run dev
```

第2种, yarn安装 (推荐)
```bash
# 安装
$ npm install -g yarn
# 安装依赖
$ yarn install
# 运行服务
$ npm run dev
```

## 支持热更新

```bash
npm run dev
```


跑起项目后, 保存代码就会自动刷新浏览器内容.

!> 注意, 工程目录上不能有中文路径, 工程包里面也不能有中文命名.

第3种, 如果使用es5开发, 无需工程化, 把src 目录放在 IIS 或者 phpstudy 之类的服务器, 运行就能直接观看效果, 单页工程打开空白需要解决浏览器跨域问题, [Chrome跨域调试](chapter1/debug.md).

## 编译sass或less
需要先安装 [buijs](https://github.com/imouou/buijs-cli), 1.6.x工程, 默认已经去掉对sass的支持, 需要自己选择创建. 

```bash
# 新增sass, 需要重新安装依赖
buijs create -p sass
# 新增less, 无需重新安装依赖
buijs create -p less
```
