# 多页路由开发

?> [上一节](chapter1/quickstart) 我们用最简单的方式,创建了一个`index.html`, 当我们创建了多个页面以后, 就需要页面跳转了. 

?> 多页路由简单, 跟以前PC的开发方式是一致的, 利用浏览器的历史记录来解决页面之间的前进,后退,传参问题. 可以用于各种PHP框架的模板.

!> 注意, 多页开发跟单页开发用到的方法可以是一致的. 

?> 多页开发只需直接引入对应的脚本就可以开发. 以下地址为cdn地址,仅用于测试.

```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs/lib/latest/bui.css" />
  <!-- bui.js 依赖于Zepto或jQuery -->
  <script src="https://cdn.jsdelivr.net/npm/buijs/lib/zepto.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/buijs/lib/latest/bui.js"></script>
```

## 页面跳转

?> 页面跳转有2种: `bui.btn`(绑定静态属性href跳转) 跟 `bui.load`(动态跳转)
- `静态属性跳转`,含有属性 `href` 则会调用跳转页面操作;
- `动态跳转`, 需要自己绑定按钮跳转操作;

### 1. bui.btn(option) `静态属性绑定`  

*参数: option是一个对象 *

#### option.id
- Type: `string`
- Detail: `父层选择器`

#### option.handle
- Type: `string`
- Detail: `要点击的目标`

#### option.progress
- Type: `boolean`
- Detail: `是否开启进度条`

?> 绑定`.bui-page` 结构中 `.bui-btn`, `a`, 如果含有 `href` 属性则会跳转. <a href="http://www.easybui.com/demo/api/classes/bui.load.html" target="_blank">bui.btn API</a>
- 多页开发:`一个页面绑定一次`.  
- 单页开发:`只在首页绑定一次`.  

*示例:*

```html
<div class="bui-page">
  <div class="bui-btn" href="pages/page2/page2.html">普通跳转</div>
  <div class="bui-btn" href="pages/page2/page2.html?id=page1">传参跳转</div>
</div>
```
```js
// .bui-page 下的所有bui-btn按钮带href属性,点击会调用 bui.load 跳转.
bui.btn({id:".bui-page",handle:".bui-btn"}).load();

```
!> 这里为什么还要初始化bui.btn,不直接使用a链接跳转呢? 通过bui.btn绑定对连续快速点击做了处理, 防止多次跳转.

### 2. bui.load(option) `动态跳转`
?> 传参的时候比较方便 <a href="http://www.easybui.com/demo/api/classes/bui.load.html?id=123" target="_blank">bui.load API</a>

*参数: option是一个对象 *

#### option.url
- Type: `string`
- Detail: `相对路径`

#### option.param
- Type: `object`
- Detail: `传给目标页面的参数`

#### option.replace
- Type: `boolean`
- Detail: `替换页面,默认:false`

*page1.html 示例:*

```html
<div id="btnGo" class="bui-btn">点击跳转</div>;
```
```js
// 绑定按钮跳转
$("#btnGo").on("click",function(e){
  bui.load({ url: "pages/page2.html", param: { id: "page1"} });
})
```

## 接收参数  

### bui.getPageParams() 

?> <del>页面接收参数, 这里参数的值是在回调里面, 部分原生参数的接收是异步的, 这是为了保持接收参数的方式统一 <a href="http://www.easybui.com/demo/api/classes/bui.getPageParams.html" target="_blank">bui.getPageParams API</a></del>
1.6.x的版本可以使用 <a href="http://www.easybui.com/demo/api/classes/bui.history.html#method_getParams" target="_blank">bui.history.getParams("url")</a>;

*page2.html 示例:*

```js
// 需要跟原生结合使用这种异步方式
var getParams = bui.getPageParams();
    getParams.done(function(result){
        console.log(result);
        // {id:"page2"}
    })

// 1.6.x 默认不再推荐原生路由,因此可以使用
var urlparams = bui.history.getParams("url");

```

## 页面后退

### bui.back(option)

?> 后退页面 <a href="http://www.easybui.com/demo/api/classes/bui.back.html" target="_blank">bui.back API</a>

*参数: option是一个对象 *

#### option.callback
- Type: `function`
- Detail: `后退以后执行回调`

*示例:*

```js
bui.back();
```

!> webapp版的多页开发不支持后退刷新等操作. 如果需要更复杂的路由定制, 就需要以[单页开发](chapter2/router), 自由度会更高.


## 页面刷新
### bui.refresh()

?> 后退页面 <a href="http://www.easybui.com/demo/api/classes/bui.refresh.html" target="_blank">bui.refresh API</a>

*示例:*

```js
bui.refresh();
```

## 页面替换
### bui.load(option)

?> 页面替换不会有历史记录 <a href="http://www.easybui.com/demo/api/classes/bui.load.html" target="_blank">bui.load API</a>

*示例:*

```js
bui.load({ url: "pages/page2.html", replace:true });
```


## bui.ready
?> 设备准备完毕, 一个页面只需要一个 `bui.ready`, 里面可以执行`$`的方法.
```
  bui.ready(function(){
    // 执行
  })
```
!> 注意, 以上的使用方式都需要在`bui.ready`的回调里面, `$` 选择器指 `Zepto`跟`jQuery`通用的方法.

## 使用原生方法

```bash
# 创建 dcloud 平台版本
$ buijs create -p dcloud
```
在`bui.ready`上面加入一个`bui.isWebapp = false;` 的配置项, 运行在 `bui.ready` 里面的综合方法, `bui.load`,`bui.back`,`bui.getPageparams` 等等, 都会采用原生的处理. Yes, 就是这么简单! `1.5.x`以后 `bui.ajax`, `bui.upload` 的切换需要通过 `{needNative:true}` 参数来进行切换.

```js
bui.isWebapp = false;

```

!> 启用原生以后,Chrome无法调试, 需要在`dcloud`或者对应的平台容器上才能调试..


?> 接下来可以继续学习

- [数据交互](chapter1/request)
