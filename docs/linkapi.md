# LINK API

?> Link API 为内部开发平台, 供开发商及内部人员使用.

* [Link API PC](http://dev.bingocc.com/btapi/) 

**link API 移动版, 请使用Link 扫码体验**

<a href="http://dev.bingocc.com/btapi-demo/index.html#main" target="_blank"><img src="http://www.easybui.com/static/images/qrcode-bt-api.png" alt="link API 移动版"/></a>


## 常见问题
---

> Q: 安卓9的系统下,第二次打开link轻应用市场会有页面白屏.

?> 更新 `bui.css` `bui.js` 为`1.5.2`版本

> Q: `bui.isWebapp = false;` 代表什么?

?> 首先, 创建平台的时候, 要选择 `buijs create -p bingotouch` 这样创建的 `bui.js` 才是支持`false`形态. 这是因为移动端跟PC端的执行时机不同, 通过设置为false以后, `bui.ready` 会走原生的初始化时机, 确保原生设备的API已经准备就绪. 1.5 以前的版本, 这样设置以后, `bui.ajax` 也会走原生请求, 1.5 以后的版本, 默认不管状态是什么, 都走 `$.ajax` ,打包后没有跨域问题. 按照工程配置去修改, 在手机端的调试也不会有跨域问题.  
