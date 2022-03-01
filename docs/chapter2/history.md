# 历史记录

> 多页单页统一使用 `bui.history` 来获取历史记录，多页的历史记录只会有一个。


### 获取所有历史记录

*bui.history.get*
```js
// 获取所有, 返回数组
var allHistory = bui.history.get();

// 通过模块名获取某个历史记录, 返回对象
var main = bui.history.get("main");
```

### 获取当前页的记录

*bui.history.getLast*
```js
// 获取所有, 返回对象
var lastHistory = bui.history.getLast();

// 获取最后的页面的实例, exports 是需要模块抛出才会有.
var currentDistance = bui.history.getLast("exports");
```

### 获取上一个页面的记录

*bui.history.getPrev*
```js
// 获取上一个页面
var prevHistory = bui.history.getPrev();
// 获取上一个页面的实例, exports 是需要模块抛出才会有.
var prevDistance = bui.history.getPrev("exports");
```


### 获取传参

*bui.history.getParams*

```js
  // 1.7.x 以后可以使用 module.props 获取
  var params = module.props;

// 方法1: 如果不确定该模块会被哪种方式使用, 则可以使用这种方式获取. module.id 在loader.define(function(req,ext,module){ }) 的第三个参数
  var params = bui.history.getParams(module.id);

// 方法2: 获取单页路由或者多页路由的跳转传参 bui.load({url:"",param:{}}) 
  var params = bui.history.getParams("url");

// 方法3: 获取以bui.page({url:"",param:{}}) 加载的的参数, 通过以下方式获取
  var pageParams = bui.history.getParams("page");

// 方法4: 获取以router.loadPart, loader.load , component标签 加载的的参数, 通过以下方式获取 
  var partParams = bui.history.getParams("component");
```


### 获取弹窗组件的实例

*bui.history.getPage*

通过 bui.page 加载的模块,使用这个方式获取
例如: 
```js
var loginPage = bui.page({
  url:"pages/login/login.html"
})
```

```js
// 可以拿到login实例抛出的方法
var login =  bui.history.getPage("pages/login/login");;
```

**pages/login/login.js**
```js
loader.define(function(require,export,module){
  var form = {
    init: function(){
      console.log("login init")
    }
  }
  // 执行
  form.init();
  return form;
})
```

### 内部获取弹窗的实例

**pages/login/login.js**
```js
loader.define(function(require,export,module){
  var form = {
    init: function(){
      // 内部可以拿到 module.id 来获取弹窗, 进行弹窗的操作.
      var dialog = bui.history.getPageDialog(module.id);
      // 关闭操作
          // dialog.close();
      
      console.log(dialog)
    }
  }
  // 执行
  form.init();
  return form;
})
```

### 检测页面是否已经加载

*bui.history.check*
```js
var isLogin = bui.history.check("pages/login/login.html");

```

### 检测component是否已经加载

*bui.history.checkComponent*
```js
<component id="tab1" name="pages/components/list/index"></component>
// tab1 为 component 标签的id
var isLoaded = bui.history.check("tab1");

```

### 检测page是否已经加载

*bui.history.checkPage*
```js
// tab1 为 id
var isLoaded = bui.history.checkPage("tab1");

```
