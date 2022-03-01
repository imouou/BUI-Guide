
# 控件使用必读说明


[Demo](http://easybui.com/demo/)

<iframe width="320" height="560" src="http://www.easybui.com/demo/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 控件示例说明

- 滑动交互类控件, 需要用chrome开启模拟设备, 或者 扫码在手机端操作, 比如 `bui.slide`焦点图, `bui.tab` 选项卡, `bui.sidebar`侧滑菜单, `bui.listview`侧滑列表, `bui.pullrefresh`下拉刷新等;

- 控件看到的源码默认为多页模式, 一键复制到新建的文件,可以直接运行看到效果;

- 切换为单页模式以后, 作为单页路由的某个模块, 需要使用 `loader.define` 包裹起来, 这种方式, 一键复制不能运行. 

- 部分示例在源码里无法展示,不代表控件有问题,请以官方[demo](http://www.easybui.com/demo/)示例为准;


## 控件使用说明

- `bui.ready`, 控件初始化必须在里面;
 多页开发每页都需要有 `bui.ready`;
 单页开发只在/src/index.js 需要`bui.ready`, `loader.define`里面不用;

- 单页开发所有组件的使用,默认都是在模块`loader.define`里面; 

- 单页开发组件如果需要在 `src/index.js` 使用, 需要在 `router.init` 之前初始化;

- 在打包成安装包前, 执行 `npm run build` 可以打包编译es6代码, 但是有部分es6是不支持的, 例如:`Object.assign`,`import`,`export` 等, 如果部分手机页面空白, 可以查看是否因为es6代码引起;