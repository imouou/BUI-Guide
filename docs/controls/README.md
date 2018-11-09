
# 组件说明

- 滑动交互类控件, 需要用chrome开启模拟设备, 或者 扫码在手机端操作, 比如 `bui.slide`焦点图, `bui.tab` 选项卡, `bui.sidebar`侧滑菜单, `bui.listview`侧滑列表, `bui.pullrefresh`下拉刷新等;

- 控件看到的源码默认为多页模式, 一键复制到新建的文件,可以直接运行看到效果;

- 多页开发每页都需要有 `bui.ready`, 控件初始化必须在里面;

- 单页开发只在/src/index.js 需要`bui.ready`, `loader.define`里面不用;

- 切换为单页模式以后, 作为单页路由的某个模块, 需要使用 `loader.define` 包裹起来, 这种方式, 一键复制不能运行. 

- 部分示例在源码里无法展示,不代表控件有问题,请以官方[demo](http://www.easybui.com/demo/)示例为准;