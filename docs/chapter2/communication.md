# 组件通讯

## 组件同步通讯

> 1.7.x 以上版本

异步通讯在业务比较复杂的情况下，会增加使用难度，1.7.x 以后推荐使用同步加载组件的方式，需要工程化的支持。

![组件通讯图](/static/images/link/page-link.png)

假设 component1,component2,component3 在 *pages/components*目录下

_pages/main/main.html_

```html
...
<component id="comp1"></component>
<component id="comp2"></component>
<component id="comp3"></component>
...
```

_pages/main/main.js_

```js
loader.define(function (requires, exports, module, global) {


  var component1 = null,
      component2 = null,
      component3 = null;

  var pageview = {
    init: async function(){

      // 组件1
      component1 = await loader.syncLoad({
        id: "#comp1",
        url: "pages/components/component1/index.html",
        param: {},
      });

      // 组件2
      component2 = await loader.syncLoad({
        id: "#comp2",
        url: "pages/components/component2/index.html",
        param: {},
      });
      // 组件3
      component3 = await loader.syncLoad({
        id: "#comp3",
        url: "pages/components/component3/index.html",
        param: {},
      });

    // 组件1可以拿到子组件的方法进行操作
    // component1.childs1

    }
  }

  // 初始化
  pageview.init();

  return pageview;
});
```

component1 组件，里面有 3 个组件

_pages/components/component1/index.html_

```html
...
<component id="child1"></component>
<component id="child2"></component>
<component id="child3"></component>
...
```

_pages/components/component1/index.js_

```js
loader.define(function (requires, exports, module, global) {

  var childs1 = null,
      childs2 = null,
      childs3 = null;

  var pageview = {
    init: async function(){
      // 子组件内部兄弟组件的交互

      // 组件1-1
      childs1 = await loader.syncLoad({
        id: "#child1",
        url: "pages/components/component1/child-1.html",
        param: {},
      });
      // 组件1-2
      childs2 = await loader.syncLoad({
        id: "#child2",
        url: "pages/components/component1/child-2.html",
        param: {},
      });
      // 组件1-3
      childs3 = await loader.syncLoad({
        id: "#child3",
        url: "pages/components/component1/child-3.html",
        param: {},
      });

    }
  }

  // 初始化
  pageview.init();

  return {
    childs1,
    childs2,
    childs3,
  };
});
```

component1 的 child1 组件的定义

_pages/components/component1/child-1.html_

```html
<div class="bui-btn">按钮</div>
```

_pages/components/component1/child-1.js_

```js
loader.define(function (requires, exports, module, global) {
  // 1.6.x 通过模块的id来获取不同的参数，所有属性的参数都会被拿到.
  // var params = bui.history.getParams(module.id);
  // 1.7.x
  let params = module.props;
  // 通过缓存module.id 绑定可以防止组件的重复绑定问题
  let mid = module.id;
  let $btn = router.$(`#${mid}`).find(".bui-btn");

  // 通过对象来描述组件的信息，便于维护
  const pageview = {
    init() {
      // 绑定事件
      this.bind(params);
      this.addColor(params);
    },
    addColor(opt) {
      // 增加样式
      opt.color && $btn.addClass(opt.color);
    },
    bind() {
      let that = this;
      $btn.click(function (e) {
        // 如果外部传方法，则点击的时候要执行该方法
        params.callback && params.callback.call(that, e);
      });

      return this;
    },
  };

  // 自执行
  pageview.init();

  // 可以抛出组件里面的方法给外部操作，也可以不抛出
  return pageview;
});
```

## <del>组件异步通讯</del>

<span style="color:red">组件异步通讯的开发方式太过零散，已经不推荐了</span>

> BUI 1.6.2 以上版本.

![组件通讯图](/static/images/link/component-link.png)

路由初始化以后就会去找 `main` 入口页, 假设`main`由 3 个组件组成, 会依次,从上到下加载组件, 加载以后再递归查找子组件, 如此反复.

### 父组件获取子组件


_pages/main/main.html_

```html
<component id="searchbar" name="pages/components/searchbar/index"></component>
<component id="list" name="pages/components/list/index"></component>
```

_pages/main/main.js_

```js
loader.define(function () {
  // 监听 多个子组件加载完成就会触发一次
  loader.waited(["searchbar", "list"], function (searchbar, list) {
    // 拿到子组件实例操作
    console.log(searchbar);
    console.log(list);
  });
});
```

### 子组件获取父组件

list 组件 _pages/components/list/index.js_

```js
loader.define(function(require,export,module){
    // 1.6.1 的方式
    // var params = bui.history.getParams(module.id);
    // var parentComp = bui.history.getComponent(params.parentId);


    // 1.6.2 的方式
    var parentComp = bui.history.getParentComponent();
    // 拿到父组件return 出来的方法, 就可以操作父组件.

})
```

### 子组件获取页面组件

list 组件 _pages/components/list/index.js_

```js
loader.define(function(require,export,module){
    // 无论被嵌套多少层都可以直接获取到页面组件
    var pageComp = bui.history.getLast("exports");

})
```

### 兄弟组件

> 比方页面由 `搜索组件`, `列表组件` 组成, 点击搜索, 要操作列表的方法重新带上关键字请求;

页面组件 _pages/main/main.html_

```html
<div class="bui-page bui-box-vertical">
  <header></header>
  <main>
    <!-- 搜索组件 -->
    <component id="search" name="pages/components/searchbar/index"></component>
    <!-- 列表组件 -->
    <component id="list" name="pages/components/list/index"></component>
  </main>
</div>
```

search 组件 _pages/components/search/index.js_

```js
loader.define(function(require,export,module){
    var pageview = {
      init: function(){
        // 这样是获取不到list组件的 refresh 方法, 因为list比search晚加载.
        // var list = bui.history.getComponent("list");
        let mid = module.id;
        let $module = bui.$(`#${mid}`);
        let $btn = $module.find("#btnSearch");
        $btn.click(function(){

            // 在点击的时候可以获取到兄弟list组件.
            var list = bui.history.getComponent("list");

            // 获取搜索的关键字
            var keyword = $module.find(".search-input").val();

            // 调用列表组件的局部属性方法, 把关键字传过去.
            list.refresh(keyword);
        })
      }
    }
    // 初始化
    pageview.init();
    return pageview
})

```

list 组件 _pages/components/list/index.js_

```js
loader.define(function(require,export,module){
    var pageview = {
      init: function(){

      },
      refresh: function(keyword){
        // 接收到搜索传来的关键字进行请求操作
        console.log(keyword)
      }
    }
    // 初始化
    pageview.init();
    return pageview
})

```

> 注意, 搜索组件在初始化直接获取 list 组件, 会获取不到, 因为 list 比 search 晚加载.
