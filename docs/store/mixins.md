
# 混入

### 实例分发
?> 混入`minxins参数` 提供了一种灵活的方式, 把`bui.store`的实例进行划分. 它是一个数组, 数组里面每个对象包含`bui.store`的选项, 实例自身的属性会覆盖`mixins`的相同属性. 

**pages/main/main.js**
```js
var bs = bui.store({
    id: ".bui-page",
    scope:"page",
    mixins: [{
        data: {
            title:"标题2"
        },
        methods: {},
        watch: {},
        computed: {},
        beforeMount:function(){
            // console.log(this.$data.title)
        },
        mounted:function(){
            console.log(this.$data.title)
        }
    }],
    data: {
        title:"标题"
    },
    methods: {},
    watch: {},
    computed: {},
    beforeMount:function(){
        // console.log(this.$data.title)
    },
    mounted:function(){
        console.log(this.$data.title)
        // 标题
    },
})
```

改写为
**pages/main/main.js**

```js
loader.define(["pages/list/index"]function(list,require,export,module){
    var bs = bui.store({
        id: ".bui-page",
        scope:"page",
        mixins: [list],
        data: {
            title:"标题"
        },
        methods: {},
        watch: {},
        computed: {},
        beforeMount:function(){
            // console.log(this.$data.title)
        },
        mounted:function(){
            console.log(this.$data.title)
            // 标题
        },
    })
})
```

定义列表模块 **pages/list/index.js**
```js
loader.define(function(require,export,module){

    var data = {
            data: {
                title:"标题2"
            },
            methods: {},
            watch: {},
            computed: {},
            beforeMount:function(){
                // console.log(this.$data.title)
            },
            mounted:function(){
                console.log(this.$data.title)
            }
        }
    // 抛出对象
    return data;
})

```
通过`view`标签把模板分发.
**pages/main/main.html**
```html
<view name="pages/list/index"></view>
```

!> 通过分发出去的view组件, 最终是合并在一个实例上, 模块之间会按先后顺序覆盖, 没有独立的作用域. 

### 独立作用域

需要独立作用域时, 应该使用的是 `component标签`. 模块里面需要返回一个实例, 而不是普通对象. 

```html
<component id="list" name="pages/list/index"></component>
```

**pages/list/index.html**
```html
<h2 b-text="list.title"></h2>
```

**pages/list/index.js**
```js
loader.define(function(require,export,module){
    // module.id = list
    var bs = bui.store({
        el: `#{module.id}`,
        scope: "list",
        data: {
            title:"标题"
        },
        mounted: function(){
            console.log("list 模块已经加载")
        }
    })
    return bs;
})
```

### 案例

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/view" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

?> 在一个模块里面处理三个Tab不好维护, 可以把每个tab的内容进行分发. 这是一个`bui.floor`跟 `bui.store`结合的例子. 其中用到了延迟加载, 滚动到第2个的时候, 会自动加载第3个模板, 加载了模板以后, 还需要通过实例的 `bs.$mount`方法, 重新编译该组件的数据. 
