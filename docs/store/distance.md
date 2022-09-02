
# 实例

<iframe width="320" height="560" src="//www.easybui.com/demo/#pages/store/case" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


### 1. 创建一个`store`实例.

- `el`        挂载的根元素, 默认是: `.bui-page`
- `scope`     数据的范围, 必须字段, 比方公共数据可以使用`app`, 页面里面的数据默认使用 `page`，组件应该更改为组件相关的名字
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
      el: ".bui-page",  
      scope: "page",  
      data: {},
      methods: {},
      watch: {},
      computed: {},
      templates: {},
      beforeMount: function(){
        // 数据解析前执行
      },
      mounted: function(){
        // 数据解析后执行
      }
    })
})

```

### 2. 基本使用

实例的名字使用`bs` (behavior store)作为实例名. `b` 标签作为这个数据关联的默认标签.

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

### 3. 加载的时机

?> 当store初始化的时候, 会做两件事情
- 第1件事, 把当前已有的数据进行代理, 也就是vue使用的 `Object.define`来处理 data,watch,computed 这些数据挂载到 store实例本身;
- 第2件事, 把模板进行匹配过滤, 找到对应的选择器.

在这两件事前后, 会分别执行`beforeMount`, `mounted` 方法. 所以一般业务都应该在 `mounted` 里面执行.

### 4. 动态加载时机

我们看到上面的数据都是静态数据, 一开始数据是有初始值的, 但有时候我们还有动态数据, 需要通过请求以后才能加载进来, 这种又该如何处理呢?

```html
<ul b-template="page.tplList(page.list)"></ul>
```

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
            // bui.array.merge(this.list,["广州","深圳","上海","北京"])

            // 1.7.x 
            this.list = ["广州","深圳","上海","北京"];

        },1000)
    }
})
```

### 5. 公共数据与私有数据

?> 通过`scope`来区分数据源, 再加上`isPublic:true`这个参数, 在`index.js`初始化以后, 所有的单页页面都可以拿到这个公共数据, 当公共数据改变的时候, 多个页面的数据视图都会重新渲染.


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

