
# 属性与值绑定

## 1. 属性动态绑定
?> `b-bind` 绑定支持2种数据格式. 并且通过 `bs.title="XXX"` 或者 `bs.attrs.title="xxx"` 可以触发属性的修改. 绑定的字段在 `data` 里面

- Object : 键值为样式名,值为布尔值
- String : 值为样式名

```js
var bs = bui.store({
    scope: "page", 
    data: {
        title: "这是动态标题",
        attrs: {
            "title": "这是动态标题",
            "data-title": "自定义标题",
        }
    }
})

```

html:
```html
<!-- 绑定多个 -->
<p b-bind="page.attrs">绑定title属性,及自定义属性</p>

<!-- 绑定1个 -->
<p b-bind="page.title">绑定title属性</p>

```

### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/attribute" target="_blank">查看效果</a>

## 2. 值的动态绑定

?> 有三种值的设置, 推荐 `b` 标签作为默认的双向绑定标签. 如果内容元素是块状, 可使用 `div` 标签.

- b-text : 设置文本
- b-html : 设置html
- b-value : 设置属性value,一般用于表单

```js
var bs = bui.store({
    scope: "page", 
    data: {
        value: "Hello bui.js",
        attrs: {
            title: "这是动态标题",
        },
        title: "<h1>html标题</h1>",
    }
})

```

```html
<!-- 1.设置文本,支持对象 -->
<b b-text="page.attrs.title"></b>

<!-- 2.设置Html -->
<div b-html="page.title"></div>

<!-- 3.设置value -->
<input b-value="page.value" class="bui-input"/>

```

### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/set" target="_blank">查看效果</a>

## 3. 静态解析

?> 静态解析{{}}里面的值. 默认没有开启, 如果需要, 初始化时设置 `needStatic: true` 才会解析. `templates`定义的模板方法里面不要使用`{{}}` 或者 `b-`开头的模板命令. 

- 不支持表达式
- 不支持动态修改
- 只在第一次渲染解析

```js
var bs = bui.store({
    scope: "page", 
    data: {
        title: "这是动态标题2",
        attrs: {
            "title": "这是动态标题",
            "data-title": "自定义标题",
        }
    },
    needStatic: true,
})

```

html:
```html

<div title="{{page.attrs.title}}">{{page.title}}</div>

```

!> 值得注意的是, 如果你的数据是公共数据, `isPublic:true` 时, `needStatic`不能为true,会干扰到路由, 那如何解析公共数据的{{}}值呢?

```js
window.router = bui.router();

bui.ready(function() {

    // 公共数据
    var store = bui.store({
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

?> 把`store`挂载到路由, 就可以解析公共数据的 `{{app.firstName}}` 之类的数据, 在模块里面,你也可以使用 `router.store.firstName` 读取跟修改公共数据的值, 会在全局起作用, 比方商城的加入购物车. 
