# 模块化

## 前言

?> 随着应用的功能逐渐丰富,逻辑的复杂度不断的增加,多人协作等问题, BUI有了自己的模块化方案, 类似`requirejs`的AMD. 熟悉`requirejs`,`seajs`都可以很好的适应过来. 

## 模块化解决什么问题?

- 命名冲突
- 文件依赖
- 多人协作
- 可维护性
- 跨页面共享


## 定义模块

!> `window.loader` 默认注册给了 `bui.loader`. 关于loader的用法,可以查看 <a href="http://www.easybui.com/demo/api/classes/bui.loader.html" target="_blank">bui.loader API</a>. 

### loader.define

*loader.define 定义一个匿名模块. *

```js
loader.define(function(require,exports,module){
    
    // 以下几个参数非必须,如果前面加载了依赖,则这三个参数后移;
    // require : 相当于 loader.require, 获取依赖的模块
    // exports : 如果没有return 可以采用这种方式输出模块
    // module : 拿到当前模块信息

    // 第一次加载会执行一次
    
    // 模块如果需要给其它模块加载,通过 return 的方式抛出来,或者module.exports的方式
    return {};
})
```
*定义模块需要遵循什么?*
1. 一个js 文件里面只能有一个 `loader.define` 的匿名模块;
2. 业务逻辑需要在 `loader.define` 里面,防止加载其它模块的时候冲突;
3. 避免循环依赖 A ->依赖 B 模块, 而 B模块 -> A模块, 这就造成循环依赖,一般需要避免这种设计,如果一定要用, 不使用依赖前置的方式;
4. 避免循环嵌套自身, 在loader.define 里面 又 require 加载当前模块, 这个时候还没实例化,就会造成死循环;
5. 作为依赖的模块, 里面不要执行, 应该返回对象给外层调用的方式;

## 加载模块
### loader.require 

>假设我们定义了一个匿名模块, 是在pages/page2/目录下, 目录下有 page2.html ,page2.js 两个文件. 则默认匿名模块的 模块名是 pages/page2/page2 会根据.html 文件提取前面路径作为模块名.

page2.js
```js
loader.define(function(require,exports,module){

    // 定义初始化
    function init(text){
      // console.log("init:"+text)
    }

    // 自执行初始化, 如果要给tab 使用,建议不要自执行.
    init("第一次会自执行");

    // 抛出方法及变量给外部访问.
    return {
      init: init,
      pageName: "page2"
    }
})
```
>现在我们想在刚刚的main.js里面加载这个模块,调用pages/page2/page2 的名称.

main.js
```js
loader.define(function(require,exports,module){
    
    // 1. 加载pages/page2/page2模块 方法1: 这里会自执行一次 init. 输出自执行. 如果该模块已经加载过了,这里则不会执行.
    require("pages/page2/page2"); 

    // 2. 有回调的时候,是会每次都执行, 如果define的时候,有一次自执行, 会变成执行2次.
    require("pages/page2/page2",function(page2){
        // 这里会执行第2次.
        page2.init("回调执行")
    })

    return {
      pageName: "main"
    }
})
```
这样打开首页的时候,就会加载`main.js`, `main.js` 会去加载`pages/page2/page2`模块,并调用对应的方法.

?> 造成重复执行一般在tab比较常见, `bui.tab`的`to` 事件是会每次都执行, 如果 `loader.require` 的模块有相同`init`回调, 则每次都会执行两次, 解决的办法是, 外部要操作里面的`init`方法时, `define` 的时候,不要自执行`init`. 

模块的定义及加载更多用法，请大家自行查阅 <a href="http://www.easybui.com/demo/api/classes/bui.loader.html" target="_blank">bui.loader API</a> 


## 加载文件资源
### loader.import 

?> 没有经过define的第三方资源,又不想全局引用,可以使用`loader.import`动态引入进来. 例如,图表控件.


```js

例子1: 动态加载单个样式
loader.import("main.css",function(){
  // 创建成功以后执行回调
});

例子2: 动态加载单个脚本
loader.import("main.js",function(){
  // 创建成功以后执行回调
});

例子3: 动态加载多个脚本
loader.import(["js/plugins/baiduTemplate.js","js/plugins/map.js"],function(){
  // 创建成功以后执行回调
});

例子4: 1.5.2新增, 动态加载模板,回调每次都执行, 如果放在 loader.require 里面执行,则默认只初始化一次;

loader.import("pages/ui/list.html",function(res){
  // 拿到模板信息
});

例子5: 1.5.4新增, 把html,渲染到某个id下,只渲染一次. 有回调也只执行一次

loader.import("pages/ui/list.html","#id",function(res){
    // 在渲染模板到#id以后,回调只执行一次
});

```
!> 样式的引入没有局部作用域,所以加载样式文件可能会造成影响全局,最好样式还是统一`sass模块化`管理.

## 同步加载多个文件

### loader.importSync
如果需要同步加载多个文件, 应该使用`loader.importSync`来替代`loader.import`;

```js
例子: 动态加载多个脚本
loader.importSync(["js/plugins/baiduTemplate.js","js/plugins/map.js"],function(){
  // 创建成功以后执行回调
});
```

## 获取及配置模块
### loader.map 
?> 可以用于设置或者获取已经加载的模块的相关信息

```js
例子1: 获取所有模块的配置信息
var map = loader.map();

例子2: 声明单个模块, router路由默认声明了main模块,页面打开会自动加载该模板下的资源,也可以通过map去修改
修改首页,必须在 window.router=bui.router(); 之后;

loader.map({
    moduleName: "main",
    template: "pages/main/main.html",
    script: "pages/main/main.js"
})

例子3: 定义多个模块,并修改路径
loader.map({
  baseUrl: "",
  modules: {
    "main": {
      moduleName: "main",
      template: "pages/main/main.html",
      script: "pages/main/main.js"
    }
    "home": {
      moduleName: "home",
      template: "pages/main/home.html",
      script: "pages/main/home.js"
    }
  }
})
```

*注意:*

- 定义了模块名以后,单页跳转则不能使用路径跳转,而需要传模块跳转, 例如, `router.load({url:"home"})`
- 如果`loader.define`的第一个参数有自定义名称, 则还需要通过`loader.map`配置下模块的路径及模板指向. 


## 获取模块的信息

?> 1.5.3 新增

### loader.get

```js
var main = loader.get("main");
```

## 设置模块的信息

?> 1.5.3 新增

### loader.set

?> 如要设置main模块, 必须在 `window.router = bui.router()` 之后, `router.init` 之前.

```js
loader.set("main",{
  template:"pages/login/login.html",
  script: "pages/login/login.js"
});
```

## 页面模块的生命周期

?> 1.5.3 新增. 需要配合路由使用,路由里面会去调用模块定义的生命周期.

- `beforeCreate`,`create` 只在模块第一次创建的时候执行,如果相同模块第2次拿的是缓存, 不会触发;
- `beforeLoad`,`loaded` 每次进入页面都会执行, `loaded` 就相当于 `loader.define(function(){})` 里面的function;
- `show`,`hide` 每次页面前进后退都会分别执行, 可以通过形参拿到 show,hide 的 type 是 load, 还是 back, 默认当前页刷新, 也会触发 show, type 则等于 firstload;
- `beforeDestroy`,`destroyed` 每次后退前跟后退后执行;

!> 注意: `beforeLoad` 这里return false 并不能阻止页面跳转及执行, 如果要阻止应该在 `bui.load({url:"",beforeLoad:function(){ return false; }})`.

```js
loader.define({
    beforeCreate: function() {
        // 只在创建脚本前执行,缓存的时候不执行
        console.log(this.moduleName + " before create")
    },
    created: function() {
        // 只在创建后执行,缓存的时候不执行
        console.log(this.moduleName + " createed")
    },
    beforeLoad: function() {
        // 页面每次跳转前都会执行
        console.log(this.moduleName + " before load")
    },
    loaded: function() {
        // 页面每次跳转后都会执行
        console.log(this.moduleName + " loaded")
    },
    hide: function(e) {
        // 页面每次跳转后退都会执行当前模块的触发
        console.log(this.moduleName + " hide")
        console.log(e.type)
    },
    show: function(e) {
        // 页面每次跳转后退都会执行当前模块的触发
        console.log(this.moduleName + " show")
        console.log(e.type)
    },
    beforeDestroy: function() {
        // 页面每次后退前执行
        console.log(this.moduleName + " before destroy")
    },
    destroyed: function() {
        // 页面每次后退后执行
        console.log(this.moduleName + " destroyed")
    }
})
```

?> 当然,你依然可以使用默认最简单的模块创建方式, 只是特殊模块你可以给它自己的生命周期, 比方我在列表页面,进去详情页, 后退到列表页, 是不会刷新的, 之前的方式是在后退的时候执行某个方法. 现在只要在 `show` 的这个生命周期里, 我可以调用这个页面的某个局部刷新的方法, 不管是前进后退, 都可以执行. 

例子: 利用生命周期实现后退刷新.

```js
loader.define({
    loaded: function() {
        this.pageview = {};
        
        // 初始化
        this.pageview.init = function(){
          
        }
        // 局部刷新
        this.pageview.refresh = function(){

        }
        
        // 这个是抛出给 loader.require 访问的, 不能return this
        return this.pageview;
    },
    show: function(e) {
      
        // 后退才触发刷新操作
        if( e.type == "back" ){
          this.pageview.refresh();
        }
    }
})
```

?> 比方跳转的页面里面有个定时器, 后退的时候, 需要清理掉这个定时器, 这些是需要自己清除的. 

```js
loader.define({
    loaded: function() {
        // 页面每次跳转后都会执行
        console.log(this.moduleName + " loaded")

        // 定时刷新
        this.timetoRefresh = window.setInterval(function(){
            // 4秒后执行刷新
        },2000)
    },
    beforeDestroy: function() {
        // 页面每次后退前执行
        console.log(this.moduleName + " before destroy")

        if( this.timetoRefresh ){
          window.clearInterval(this.timetoRefresh);
        }
    }
})
```

?> 还有一些比较有用的方法, 会在组件那里介绍.

## 疑难解答

?> 1. 如何抛出当前模块的方法共享 

>1. 推荐 使用return 的方式 ;
>2. 使用module.exports 的方式; 
>3. exports 的方式;
>使用任意一种就可以.


?> 2. 微信调试的缓存问题怎么解决?

*在 index.js 配置`bui.loader`的cache参数* 初始化必须在 `window.router` 前面
```js
window.loader = bui.loader({
    cache: false
})
```

?> 3. 为什么不直接采用requirejs或者seajs呢?

>这两种方式都有在项目中使用,这样模块的复用及开发方式就无法统一,A项目开发完的部分模块,可能B项目也能用,但两者各自用的模块化方式不同, 这就需要熟悉的人去做一定的修改. 采用我们自己的模块化方式,可以跟bui.router路由更好的配合, 后面模块化的公共插件也会越来越多, 这是我们以后希望看到的. 

?> 4. 如何定义模块的依赖呢?

main.js
```js
// 依赖前置, 这种会优先加载完 page2,page3模块以后再执行main的回调. page2,page3 只定义,不执行.
loader.define(["pages/page2/page2","pages/page3/page3"],function(page2,page3,require,exports,module){
  // 如果需要用到当前模块信息的话, page3后面依次还有 require,exports,module 
  
})
```

?> 5. 如何定义一个自定义名字的模块呢?

**第1种: **

* 第1步: 声明自定义模块, 名称需要跟映射的模块名一致

*pages/page2/page2.js*
```js
loader.define("page2",function(require,exports,module){
  // 这里是page2的业务逻辑 
})

```
* 第2步: 在首页 index.html 的 bui.js 下面引入该文件.

index.html
```html
<script src="js/bui.js"></script>
<!-- 加入自定义模块 -->
<script src="pages/page2/page2.js"></script>
```

**第2种:**

* 第1步: 映射脚本路径

*index.js*

```js
// 映射脚本路径
loader.map({
  moduleName: "page2",
  script: "pages/page2/page2.js"
})

// 把路由实例化给 window.router 
window.router = bui.router();

bui.ready(function(){

})
```
* 第2步: 声明自定义模块, 名称需要跟映射的模块名一致

*pages/page2/page2.js*
```js
loader.define("page2",function(require,exports,module){
  // 这里是page2的业务逻辑 
})

```



模块的定义及加载更多用法，请大家自行查阅  <a href="http://www.easybui.com/docs/index.html?id=api" target="_blank">bui.loader API</a> 

