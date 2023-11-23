# LINK API

?> Link API 为原生开发平台, 供Link轻应用原生开发使用.

* [Link 开发文档](http://linkdoc.bingosoft.net:8088/) 
* [Link API PC](https://open.bingosoft.net/btapi-demo/index.html) 
* [Link 平台相关文件](https://github.com/bingo-oss/mobile-btjsapi/) 



## 常见问题
---

> Q: 安卓9的系统下,第二次打开link轻应用市场会有页面白屏.

?> 更新 `bui.css` `bui.js` 为`1.5.2`版本以上
```bash
buijs update -p bingotouch
```

> Q: `bui.isWebapp = false;` 代表什么?

?> 首先, 创建平台的时候, 要选择 `buijs create -p bingotouch` 这样创建的 `bui.js` 才是支持`false`形态. 这是因为移动端跟PC端的执行时机不同, 通过设置为false以后, `bui.ready` 会走原生的初始化时机, 确保原生设备的API已经准备就绪. <del>1.5 以前的版本, 这样设置以后, `bui.ajax` 会走原生请求</del>, 1.5 以后的版本, 默认不管状态是什么, 都走 `$.ajax` ,打包后没有跨域问题. 按照工程配置去修改, 在手机端的调试也不会有跨域问题.  

> Q: 如何与LINK SSO对接? 


1. 检查 index.html 有没有引入以下文件. 

```html
<script src="js/platform/cordova.js"></script>
<script src="js/platform/bingotouch.js"></script>
<script src="js/platform/linkplugins.js"></script>
```

有引入说明已经是bingotouch工程了. 在工程下执行以下命令, 更新 bui.js 为bingotouch平台版本;
```bash
buijs update -p bingotouch
```

2. 切换 bui.isWebapp 的状态为false;

```js
// 切换为原生, 走 deviceready. pc调试改为 true;
bui.isWebapp = false;
// 修改请求使用原生, 就会自动对接LINK SSO, 请求自动带上token;
bui.config.ajax = {
    needNative: !bui.isWebapp
}
// 修改list请求使用原生, 就会自动对接LINK SSO, 请求自动带上token;
bui.config.list = {
    needNative: !bui.isWebapp
}

bui.ready(function(){
    // 这个方法只能在link里面获取到, 在PC会报错, 请使用 try catch 包裹.
    app.link.getLoginInfo(function(result){
        // 获取用户信息
        bui.alert(result);
    });
})
```

备用方案: 如果第1步检查不到这些依赖跟文件, 执行以下命令创建一个新工程, 把 `index.html`及 `js/bui.js`文件,`js/platform`目录 复制到自己的工程. 并重复第2步就行. 

```bash
// 创建新bingotouch工程, index.html里面会有对应的依赖文件, 并且bui.js会更新为bingotouch平台版本, 复制到你的工程下.
buijs create -p bingotouch
```