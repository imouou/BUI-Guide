# 安装

## 开发环境
?> 你可能只需要一个系统自带的编辑器,就可以使用BUI开发应用, 但通过以下软件相互配合,对开发效率会有一定的帮助. 

1. 编辑器 ( 推荐: `vscode`, `Atom` 或 `Sublimetext3` );
2. `bui-fast` [点击下载](https://github.com/imouou/BUI-Fast-Snippets/releases) (配合编辑器快速书写插件, 支持 Vscode, Atom , Sublimetext , Webstorm , APICloudIDE ) [查看安装说明](tools/buifast.md); 

## 下载开发包

!> 用过npm, 我们推荐您学习使用[buijs](tools/buijs.md)`自动化构建`, 自动化构建默认是最新的`bui`版本. 

- [下载BUI单页开发包](http://www.easybui.com/downloads/source/bui/bui_router_dev_latest.zip)


- [下载BUI多页开发包](http://www.easybui.com/downloads/source/bui/bui_dev_latest.zip)

## 了解规范

- [目录规范说明](ui/standard.md)
- [切图规范说明](ui/cutimage.md)
- [样式规范说明](ui/style.md)

## 部署运行

第1种, 解压,进入工程目录, 通过这种运行,里面可以配置域名代理,解决移动端调试的跨域问题. 生成的`dist目录`为最终要打包的目录, src 保持源文件的方式.

```
# 安装依赖
$ npm install
# 运行服务
$ npm run dev
```

第2种, 把src 目录放在 IIS 或者 phpstudy 之类的服务器, 运行就能直接观看效果.

