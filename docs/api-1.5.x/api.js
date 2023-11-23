YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "bui.accordion",
        "bui.actionsheet",
        "bui.ajax",
        "bui.alert",
        "bui.animate",
        "bui.array",
        "bui.back",
        "bui.btn",
        "bui.checkVersion",
        "bui.config",
        "bui.confirm",
        "bui.dialog",
        "bui.download",
        "bui.dropdown",
        "bui.emitter",
        "bui.file",
        "bui.fileselect",
        "bui.getPageParams",
        "bui.guid",
        "bui.hint",
        "bui.init",
        "bui.input",
        "bui.levelselect",
        "bui.list",
        "bui.listview",
        "bui.load",
        "bui.loader",
        "bui.loading",
        "bui.mask",
        "bui.number",
        "bui.pickerdate",
        "bui.platform",
        "bui.prompt",
        "bui.pullrefresh",
        "bui.rating",
        "bui.ready",
        "bui.refresh",
        "bui.router",
        "bui.run",
        "bui.scroll",
        "bui.searchbar",
        "bui.select",
        "bui.sidebar",
        "bui.slide",
        "bui.stepbar",
        "bui.storage",
        "bui.store",
        "bui.swipe",
        "bui.tab",
        "bui.timer",
        "bui.toggle",
        "bui.typeof",
        "bui.unit",
        "bui.upload",
        "bui.viewport"
    ],
    "modules": [
        "Animate",
        "Core",
        "Event",
        "Method",
        "Native",
        "UI"
    ],
    "allModules": [
        {
            "displayName": "Animate",
            "name": "Animate",
            "description": "<h3>动画库</h3> \n<h5>动画控制器</h5>\n{{#crossLink \"bui.animate\"}}{{/crossLink}}: 常用的transform动画及属性动画 <br>\n<h5>动画切换器</h5>\n{{#crossLink \"bui.toggle\"}}{{/crossLink}}: animate.css的常用动画,切换显示 <br>"
        },
        {
            "displayName": "Core",
            "name": "Core",
            "description": "核心"
        },
        {
            "displayName": "Event",
            "name": "Event",
            "description": "<h3>全局事件: </h3>\n<p>依次加载顺序, 所有事件均在 dom 加载以后处理.</p>\n<p>pagebefore(dom准备完毕,但bui还未初始化) -  pageinit(dom准备完毕,bui初始化完成) - pageready(dom+原生能力都已经准备完毕) - onload(图片及资源都加载完毕以后触发)</p>"
        },
        {
            "displayName": "Method",
            "name": "Method",
            "description": "<h3>常用方法库</h3> \n<h5>数组比对</h5>\n{{#crossLink \"bui.array\"}}{{/crossLink}}: 常用数组比对 <br>\n<h5>对象存储</h5>\n{{#crossLink \"bui.storage\"}}{{/crossLink}}: 常用于搜索历史记录, 可以存储普通数据也可以存储对象数据, 返回值必定是数组\n<h5>平台检测</h5>\n{{#crossLink \"bui.platform\"}}{{/crossLink}}: 属于什么系统跟浏览器的检测 <br>\n<h5>其它常用</h5>\n{{#crossLink \"bui.guid\"}}{{/crossLink}}: 生成唯一id <br>\n{{#crossLink \"bui.typeof\"}}{{/crossLink}}: 检测对象类型 <br>\n{{#crossLink \"bui.checkVersion\"}}{{/crossLink}}: 获取最新版本 <br>"
        },
        {
            "displayName": "Native",
            "name": "Native",
            "description": "<h3>原生方法库</h3>\n原生方法库是采用原生及普通方法的一个混合,便于在debug中随时切换\n<h5>数据交互</h5>\n{{#crossLink \"bui.ajax\"}}{{/crossLink}}: 数据请求 <br>\n{{#crossLink \"bui.upload\"}}{{/crossLink}}: 上传文件 <br>\n{{#crossLink \"bui.download\"}}{{/crossLink}}: 下载文件 <br>\n{{#crossLink \"bui.file\"}}{{/crossLink}}: 文件管理 <br>\n{{#crossLink \"bui.fileselect\"}}{{/crossLink}}: 文件选择 <br>\n<h5>页面交互</h5>\n{{#crossLink \"bui.load\"}}{{/crossLink}}: 页面跳转及传参 <br>\n{{#crossLink \"bui.getPageParams\"}}{{/crossLink}}: 页面获取参数 <br>\n{{#crossLink \"bui.back\"}}{{/crossLink}}: 页面后退 <br>\n{{#crossLink \"bui.refresh\"}}{{/crossLink}}: 页面刷新 <br>"
        },
        {
            "displayName": "UI",
            "name": "UI",
            "description": "<h3>UI控件库</h3>\n{{#crossLink \"bui.btn\"}}{{/crossLink}}: 绑定跳转,提交 <br>\n{{#crossLink \"bui.list\"}}{{/crossLink}}: 滚动加载,下拉刷新,快速版本 <br>\n{{#crossLink \"bui.searchbar\"}}{{/crossLink}}: 搜索 <br>\n{{#crossLink \"bui.scroll\"}}{{/crossLink}}: 滚动加载,下拉刷新控件 <br>\n{{#crossLink \"bui.pullrefresh\"}}{{/crossLink}}: 下拉刷新控件 <br>\n{{#crossLink \"bui.swipe\"}}{{/crossLink}}: 滑动控件 <br>\n{{#crossLink \"bui.sidebar\"}}{{/crossLink}}: 菜单侧滑 <br>\n{{#crossLink \"bui.listview\"}}{{/crossLink}}: 列表侧滑 <br>\n{{#crossLink \"bui.slide\"}}{{/crossLink}}: 滑动控件 <br>\n{{#crossLink \"bui.hint\"}}{{/crossLink}}: 自动消失的提醒 <br>\n{{#crossLink \"bui.alert\"}}{{/crossLink}}: 弹出提醒,可以支持调试Object <br>\n{{#crossLink \"bui.confirm\"}}{{/crossLink}}: 确认提醒 <br>\n{{#crossLink \"bui.accordion\"}}{{/crossLink}}: 折叠菜单 <br>\n{{#crossLink \"bui.dialog\"}}{{/crossLink}}: 弹出框 <br>\n{{#crossLink \"bui.stepbar\"}}{{/crossLink}}: 步骤条 <br>\n{{#crossLink \"bui.loading\"}}{{/crossLink}}: 加载进度 <br>\n{{#crossLink \"bui.mask\"}}{{/crossLink}}: 遮罩 <br>\n{{#crossLink \"bui.select\"}}{{/crossLink}}: 下拉选择菜单 <br>\n{{#crossLink \"bui.pickerdate\"}}{{/crossLink}}: 日期控件 <br>\n{{#crossLink \"bui.dropdown\"}}{{/crossLink}}: 下拉菜单 <br>\n{{#crossLink \"bui.actionsheet\"}}{{/crossLink}}: 上拉菜单 <br>\n{{#crossLink \"bui.number\"}}{{/crossLink}}: 数字增减条 <br>\n{{#crossLink \"bui.rating\"}}{{/crossLink}}: 评分 <br>\n{{#crossLink \"bui.actionsheet\"}}{{/crossLink}}: 上拉选择菜单 <br>\n{{#crossLink \"bui.input\"}}{{/crossLink}}: 输入框 <br>\n{{#crossLink \"bui.prompt\"}}{{/crossLink}}: 弹出输入框 <br>\n{{#crossLink \"bui.tab\"}}{{/crossLink}}: tab选项卡 <br>\n{{#crossLink \"bui.levelselect\"}}{{/crossLink}}: 层级选择 <br>"
        }
    ]
} };
});