# 帮助中心

## 前言

?> 新手使用BUI开发中常见的问题, 如果这里找不到你的答案, 可以像我们提问, 问题中尽量描述清楚你要实现的功能及效果, 我们会尽快答复. 

[我要提问](https://github.com/imouou/BUI-Guide/issues/new)

## 数据问题
---

> Q: 接口请求如何跨域?
 
*答:*  [调试](chapter1/debug.md)
```
该问题在调试一节已经给出方案.
```
---



## 功能问题
---

> Q: 代码已经写在 bui.ready里面,为何调试不了原生功能?

*答:*
```text
1. 设置 bui.isWebapp= false;
2. 确认你的 bui.js 是带原生功能版本; 输出 console.log(bui.currentPlatform). 
3. 你的方法都在 bui.ready 里面
```

> Q: BUI 为什么需要计算main 的高度?

*答:*
```text
上中下是移动端常见的一种结构,当然实现这种布局的方式有很多, 比如, 
第1种, 你可以使用绝对定位或者固定定位的方式, 固定定位以后,中间的内容的坐标就变成0; 我们可以给中间内容加上padding的方式. 这样当头部变高或者不要头部的时候, 或者ios 在viewport下不支持fixed的情况, 这种方式带来的弊端就比较明显了.这也是BT最早的UI采用的方式,最终还是得通过计算的方式. 
第2种, 自从有了css3以后,我们有flex布局可以实现对页面的垂直布局有了很好的支持,我可以头部固定,底部固定,中间自适应, 可惜的是这种布局在移动终端的适应性有局限性, 低配的手机都不支持,就连微信都不支持.

第3种, 也就是我们采用的计算的方式,在页面初始化前先进行计算,固定好他们各自该在的位置.你中间的内容也就能够自适应,它没有第1种的ios兼容问题,用户也不用去管用不用设置padding, 也没有第2种的兼容问题.他只提供一个框架上的容器,你不需要的时候就删除对应的标签即可. 虽然需要动态计算耗一点性能,但这个对于页面初始化之前丝毫没有影响.另外它还可以解决,当页面跳转导致的webview高度问题.
当然,你如果不喜欢这种计算的方式,你也可以使用自己认为合适的方式,不使用 bui-page header main footer 这几个保留样式名就行.
```

> Q: iconfont 图标冲突问题

*答:*

```text
引入第三方 iconfont 以后,里面的字体图标不能以 .icon- 命名, 需要全局修改.

默认bui使用的字体图标名字为: font-family:"icon"; 
并且所有 .icon 或 .icon- 会自动引用默认字体图标的样式, 
如果要自定义一个图标, 可以以 icons- 开头,避免冲突.

```
?> 尽量使用默认图标, [点击查看所有图标](http://www.easybui.com/demo/font/demo.html)

*使用unicode编码图标示例:*
```html
<i class="icon">&#xe60a;</i>

自定义样式名
<i class="icon-alert">&#xe658;</i>

```

> Q: 如何打电话,发短信,发邮件? 

*答:*

```js
打电话
bui.unit.tel("10086");

发送短信
bui.unit.sms("10086","CZMM");

发邮件
bui.unit.mailto({
  email: "bui@easybui.com",
  cc: "抄送",
  subject: "邮件标题",
  body: "邮件内容"
});

```
*方案2: 可以保持跟a标签调用的方式一致, 前提是当前按钮已经绑定静态跳转* 

```html
<div class="bui-btn" href="tel:10086">打电话</div>
```


> Q: 微信调试缓存问题? 

*答:*

```js
多页开发需要手动修改js的引用加入时间戳
<script src="index.js?t=20180518"></script>

单页开发只要在index.js, 重新初始化 window.loader, 动态加载的模块就会自动加上时间戳
window.loader = bui.loader({
    cache: false
})
```

> Q: 应该使用tap事件还是click事件?

*答:*

```text
bui的开发推荐全部使用click事件, tap事件在移动端会存在一些兼容问题.
```


## 单页开发问题
---

> B页面跟D页面,都跳转到C页面, 那C页面如何能够确保后退到B页面?

?> 路由1: A->b>-C , 路由2: A>B>D>C 

*答:*

```text
指定后退到B模块, B模块如果不是自定义名称, 则输入B页面的路径.
router.back({
  name: "B"
})
```

> Q: 如何跳转锚点? 

?> 单页里面的锚点已经更改成模块加载, 锚点跳转是禁止的.可以利用 scrollTop = 某个高度来实现, 首先你需要知道你当前的滚动条是在哪里? 正常滚动条是在`main`标签, tab 控件的滚动是在 `.bui-tab-main > ul > li` 层. list 控件的滚动条则在 `bui-scroll`

*答:*

以`main`标签为例.

```html
<div class="bui-page">
  <header class="bui-bar">
    <div class="bui-bar-main">
      锚点跳转
    </div>
  </header>
  <main class="main-scroll">
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    内容 <br>  
    <div id="jump">我在这里</div>
  </main>
</div>
```

```js
// 返回顶部
document.querySelector(".main-scroll").scrollTop = 0;

// 跳转指定id
var jumpTop = document.querySelector("#jump").offsetTop;
document.querySelector(".main-scroll").scrollTop = jumpTop;

```

> Q: 是否可以在单页的`.html`页面直接引入样式,脚本及初始化

?> 可以,但是要注意的是, 样式会影响全局, 脚本引入跟初始化不会被缓存, 每次都是新的, 也无法抛出共享给其它页面调用. 

*答: 我们更推荐使用同名的js,在define里面初始化.*

```js
loader.define(function(){
  // 在这里初始化你的脚本  
})
```

> Q: a 标签跳转跟 bui.load 的区别? 

*答:*

```text
当 bui.isWebapp=true; 的时候,其实是一样的, 但使用 bui.load 会多一种可能性, 可以随状态变成原生跳转. 

而当绑定按钮及A标签的静态跳转以后, 
bui.btn({id:".bui-page",handle:".bui-btn,a"}).load(); 
a标签跳转 = bui.load 跳转. 
```

!> 需要注意的是 a 标签默认点击会受样式的伪类状态影响, 默认我们使用 div 标签模拟. 


## 控件问题
---

> Q: 如何全局修改请求?

?> 正常我们开始一个项目前, 一般会封装一个统一的 ajax请求方法, 这样便于后面的修改, 但如果万一你没有封装, 并且已经开发了一大半了, 那就需要使用全局修改的方式.

*答: 比方: 增加请求头部认证* 
```js
bui.config.ajax = {
  headers: {
    token: ""
  }
}
```
!> 这个全局配置,每个控件都有一个,配置以后,会覆盖控件的默认参数. 

## 样式问题
