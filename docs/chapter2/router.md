# 路由


## 一、单页路由

> 单页路由是组件的加载器，把组件以页面切换的形式加载。

#### 效果预览

![单页示例预览](../static/images/controls/bui-router_low.gif)

[点击这里体验](http://www.easybui.com/demo/#pages/router/index)

#### 路由功能

* 支持路由零配置;
* 支持路由单独配置;
* 支持路由拦截;
* 支持物理按键后退;
* 支持预加载;
* 支持选择不同动画,融入不同平台的切换效果;
* 支持页面的局部加载;
* 支持页面传参,获取参数;
* 支持指定跳入某个页面;
* 支持缓存,默认已经配置;
* 支持展示进度条,需要配置;
* 支持后退刷新;
* 支持后退多层;
* 支持后退到指定模块;
* 支持页面刷新;
* 支持当前页面替换;


### 1.1 页面跳转传参

#### 静态跳转
单页开发包的index.js 默认对按钮绑定了事件，有href属性就可以执行跳转。

index.js
```js
bui.btn({ 
  id: "#bui-router", 
  handle: ".bui-btn,.btn-link" 
}).load();
```

跳转的区别
```html
<!-- 执行文件跳转，跳转的页面没有样式，不会执行脚本 -->
<a href="pages/page2/page2.html?name=page2"></a>

<!-- 执行单页跳转，按钮有默认样式，跳转的页面有样式，并会执行脚本 -->
<a class="bui-btn" href="pages/page2/page2.html?name=page2"></a>
<!-- 执行单页跳转，按钮无样式，跳转的页面有样式，并会执行脚本 -->
<a class="btn-link" href="pages/page2/page2.html?name=page2"></a>
```

#### 动态跳转 bui.load(option) 

*例子:*
```js
bui.load({ url: "pages/page2/page2.html", param: {name:"page2"} });
```

### 1.2 接收参数

> 接收到的参数为一个对象

*例子:*
*pages/page2/page2.js*
```js

// 1.7.x 支持以上几种类型，优先组件参数，没有则获取url参数
var params = module.props;
// 结果
// params = {name:"page2"}


// 1.5.x 支持，只支持url参数
// var params = router.getParams();

// 1.6.x 支持, url,及组件的参数统一获取
// var params = bui.history.getParams(module.id);

```

### 1.3 页面后退
#### bui.back(option) 

*例子:*
```js
// 普通后退
bui.back();

// 后退局部刷新
bui.back({
  callback: function(prevMod){
    // 后退到上一个页面，并拿它的方法执行
    prevMod.init();
  }
});

// 后退2层刷新
bui.back({
  index: -2,
  callback: function(){
    bui.refresh()
  }
});

// 不管在哪层,都可以后退到首页或指定模块
bui.back({
  name: "main"
});
```


### 1.4 页面替换

> 页面替换不会增加历史记录

*例子:*

```js
bui.load({ url: "pages/page3/page3.html",replace:true });
```

### 1.5 局部加载模块
#### <del>router.loadPart</del> 
> 不再建议使用，局部加载在1.6.x 有更统一的方式, 查看组件章节.

*例子:*

```js
router.loadPart({ id:"#part", url: "pages/page2/page2.html", param: {} });

```

### 1.6 预加载
#### router.preload(option)

```js
// 预加载一个页面
router.preload({ url: "pages/page2/page2.html" });

// 预加载多个页面
router.preload([{ 
  url: "pages/page2/page2.html" 
},{ 
  url: "pages/page3/page3.html" 
}]);

```

### 1.7 配置首页地址

*src/index.js*
```js
bui.ready(function(global){
  // 修改首页为登录页, 那main代表的就是登录页
  router.init({
    id:"#bui-router",
    indexModule:{
      template:"pages/login/index.html",
      script:"pages/login/index.js",
    }
  })
})

```

### 1.8 路由拦截

*src/index.js*
```js
const uiStoarge = bui.storage();
// 存储用户登录信息，登录的时候会设置进去，没有则认为没有登录
let userinfo = "";
let whiteList = ["pages/login/index"];

bui.ready(function(global){

  // 修改首页为登录页
  router.init({
    id:"#bui-router",
    beforeLoad(e){
      // 获取用户登录信息，登录的时候会设置进去，没有则认为没有登录
      userinfo = uiStoarge.get("userinfo",0);
      // 如果不在白名单里，且没有用户登录信息，则跳转到登录页
      if( !userinfo && !whiteList.includes(e.target.name) ){
          bui.hint("请登录后访问");
          // 在当前页插入一个登录页
          bui.page({
              url:"pages/login/index.html"
          })
          // // 跳转登录页，登录完后退刷新处理
          // bui.load({
          //     url:"pages/login/index.html"
          // })
          return false;
      }
    }
  })
})

```


### 1.9 页面刷新

```js
bui.refresh();
```

### 1.10 路由全局事件

> 注意: 建议全局事件都在 src/index.js 定义，避免订阅事件重复加载绑定。

#### show 事件
> 页面显示的时候触发，前进后退都会触发当前页的显示

```js
router.on("show",function(e){
  // 获取当前页的模块
  console.log(e.target);
  // 获取上一页的模块
  console.log(e.prevTarget);
})
```

#### hide 事件
> 页面隐藏的时候触发，前进后退都会触发当前页的隐藏

```js
router.on("hide",function(e){
  // 获取当前页的模块
  console.log(e.target);
  // 获取上一页的模块
  console.log(e.prevTarget);
})
```


#### complete 事件
> 页面完成,每次加载完模板都会触发

```js
router.on("complete",function(e){
  // 获取当前页的模块
  console.log(e.target);
  // 获取上一页的模块
  console.log(e.prevTarget);
})
```

#### back 事件

```js
router.on("back",function(e){
  // 获取当前页的模块
  console.log(e.target);
  // 获取上一页的模块
  console.log(e.prevTarget);
})
```


## 二、多页路由

> 多页路由跳转采用替换页面的形式，没有交互动画，跳转及传参后退的使用都跟单页路由保持一致。