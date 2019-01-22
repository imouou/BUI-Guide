
# 实例

在开始之前,我们先来看看这个待办处理的效果. 代码里面只需做相关的绑定操作, 操作dom的行为交给行为属性处理, 这个案例在[综合案例](store/case.md)会有详细说明. 

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/case" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## 1. 创建一个`store`实例.

- `el`        挂载的根元素, 默认是: `.bui-page`
- `scope`     数据的范围, 必须字段, 比方公共数据可以使用app, 模块里面的数据使用 page, 
- `isPublic`  是否是公共数据, 默认: false | true
- `data`      数据的定义, 结合行为属性使用
- `watch`     侦听器, 侦听data 里面的字段改变, 触发当前回调
- `computed`  计算属性, 结合 data 的字段的处理, 比方加减乘除
- `methods`   自定义的方法, 通过行为属性`b-click`访问
- `templates` 模板的定义,通过行为属性`b-template`访问
- `beforeMount` 数据解析前执行
- `mounted`   数据解析后执行


`bui.store`初始化, 单页一般在`loader.define` 里面, 多页在 `bui.ready` 里面.

```js
loader.define(function(){

  var bs = bui.store({
      scope: "page"  
      data: {},
      methods: {},
      watch: {},
      computed: {},
      templates: {},
      beforeMount: function(){
        // 数据解析前执行
      }
      mounted: function(){
        // 数据解析后执行
      }
    })
})

```

!> 注意: 每个单独的模块里面都可以使用page, 如果作为局部加载的模块, 则需要区分数据源.

比方模块A, 要把模块B的数据加载到模块A里面.

模块A: 
```js
loader.define(function(){
  // 当前数据源为 page 
  var bs = bui.store({
      scope: "page"  
      data: {},
      mounted: function(){
        // 加载模块B
        router.loadPart({
          id: "#test",
          url: "模块B.html"
        })
      }
    })
})
```

模块B: 
```js
loader.define(function(){

  // 这里的数据源不能跟模块A的数据源名字相同 
  var bs = bui.store({
      scope: "pageB"  
      data: {},
      mounted: function(){
        
      }
    })

    return bs;
})
```

## 2. 基本使用

实例的名字由你自己定义,这里我们整篇使用`bs` (behavior store)作为实例名. `b` 标签作为这个数据关联的默认标签. 

```js
var bs = bui.store({
  scope: "page",
  data: {
    size: 1
  }
});

// 设置以后就会触发dom b-text="page.size"的视图更新
bs.size = 2;

```

```html
<b b-text="page.size"></b>
```

当这些数据改变时，视图会进行重渲染。绑定到模板里面的写法是 `page.xxx` 而不是 `bs.xxx` .

!> 注意: 新增的属性不是响应式的. 例如:

```js
bs.number = 12;
```

在进行视图的设计的时候, 需要对这些值进行初始值的设定, 自定义键值, 比如: 

```js
data : {
  str: '',
  num: 0,
  bool: false,
  lists: [],    
}
```

!> 需要注意的是, 如果你希望通过 `bs.lists = [1,2]` 这种赋值操作来操作数组, `bs.lists` 的dom是不会进行响应的, 但你可以使用 `bs.lists.push()` 的方式, 或者使用 `bui.array` 的一些命令式方法, 来处理这些数组. 这个会在 [模板渲染的章节](store/template.md) 使用到.


## 3. 公共数据与私有数据

?> 这是`bui.store`独特的地方, 我们通过`scope`来区分数据源, 再加上`isPublic:true`这个参数, 这样在`index.js`初始化以后, 所有的单页页面都可以拿到这个公共数据, 当公共数据改变的时候, 多个页面的数据视图都会重新渲染. 


```js
window.router = bui.router();

bui.ready(function() {

    // 公共数据
    window.store = bui.store({
        scope: "app",
        isPublic: true, 
        data: {
            firstName: "Hello",
            lastName: "BUI"
        }
    })    
    
    // 初始化路由
    router.init({
        id: "#bui-router",
        progress: true,
        hash: true,
        store: store,
    })
})
```

```html
<b b-text="app.firstName"></b>
```


如上面例子: `store.firstName="Bingo"` 的时候, 所有单页页面上有`<b b-text="app.firstName"></b>` 进行渲染的模板,都会一起改变. 

?> 把`store`挂载到路由, 还可以解析公共数据的 `{{app.firstName}}` 之类的数据, 在模块里面,你也可以使用 `store.firstName` 读取跟修改公共数据的值, 会更新页面相关数据的视图. 

## 4. 加载的时机

?> 当store初始化的时候, 会做两件事情
- 第1件事, 把当前已有的数据进行代理, 也就是vue使用的 `Object.define`来处理 data,watch,computed 这些数据挂载到 store实例本身; 
- 第2件事, 把模板进行匹配过滤, 找到对应的选择器.

在这两件事前后, 会分别执行`beforeMount`, `mounted` 方法. 所以一般业务都应该在 `mounted` 里面执行.

而页面的生命周期, 其实是在模块里面的, 通过路由的跳转执行模块的生命周期, 很多时候我们都无需关注, 我们也仅仅是提供了最简单的使用方式. 

## 5. 动态加载时机

我们看到上面的数据都是静态数据, 一开始数据是有初始值的, 这样是最好的, 但有时候我们还有动态数据, 需要通过请求以后才能加载进来, 这种又该如何处理呢?

```js
var bs = bui.store({
    scope: "page", 
    data: {
        list: [],
    },
    templates: {
        tplList: function (data) {
            var html = "";
            data.forEach(function (item,i) {
                html += `<li class="bui-btn">${item}</li>`;
            })
            return html;
        }
    },
    mounted: function () {
        // 模拟数据动态改变
        setTimeout(()=>{
            
            // 方法1:
            // this.list.push("广州","深圳","上海","北京");

            // 方法2: 合并并触发 this.list 的视图更新
            bui.array.merge(this.list,["广州","深圳","上海","北京"])

        },1000)
    }
})
```

```html
<ul b-template="page.tplList(page.list)"></ul>
```

?> 一般请求得到的是一个数组, 所以建议可以使用 `bui.array.merge` 合并数据. 这样视图就能得到更新.

再复杂一点, 我们需要对数据进行解析, 比方模板里面,包含 `b-model`, 需要双向绑定, 那么我们需要调用 `this.compile` 方法, 而这个方法,是需要在 dom 渲染完成以后才能处理的, 这就要用到 `this.oneTick` 或者 `this.nextTick` 来处理, 并且需要在数据更新之前调用. 

```js
...
mounted: function () {
    // 模拟数据动态改变
    setTimeout(()=>{
        this.oneTick("citys",function () {
            this.compile("#test")
        })
        
        bui.array.merge(this.list,["广州","深圳","上海","北京"])

    },1000)
}
...
```

!> 注意: `this.compile` 能不使用就不使用, 不合理使用会造成重复的视图渲染.

## 6. oneTick 与 nextTick 的区别.

这两个方法, 都是在 dom 渲染以后执行, 不同的是:
- `oneTick` 只在某个字段更新,并且视图渲染以后的才会触发, 并且同个字段只监听一次. 
- `nextTick` 是多字段, 不管哪个字段更新,只要触发了视图更新, 都会执行一次, 造成重复渲染, 重复调用还会造成重复的监听. 

!> 特别是在watch监听的时候, 千万不要使用 `nextTick`. 一般是在 `mounted` 使用.


## 7. 常用方法

请查看[bui.store API](http://www.easybui.com/demo/api/classes/bui.store.html)
