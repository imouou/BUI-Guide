
# Class 与 Style 的绑定


<iframe width="320" height="560" src="//www.easybui.com/demo/#pages/store/style" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 1. Class 绑定 

?> `b-class` 绑定支持4种数据格式. 

- Object : 键值为样式名,值为布尔值
- Array : 值为样式名, 会删除默认的class样式
- Boolean : 键值为样式名,值为布尔值
- String : 值为样式名

```js
var bs = bui.store({
    scope: "page", 
    data: {
        active: true,
        activeClass: "active",
        tabClass: {
            active: true,
            hasActive: true,
        },
        tabClassNames: ["tab","active"],
    }
})


```

html:
```html
<!-- 1.绑定多个,支持对象,数组,数组不支持动态修改 -->
<p b-class="page.tabClass" class="tab">tabClass是一个对象,键值为样式名</p>

<!-- 2.绑定多个,支持数组 -->
<p b-class="page.tabClassNames">tabClassNames是数组,键值为样式名</p>

<!-- 3.绑定单个,支持布尔值 -->
<p b-class="page.active" class="tab">active 是一个布尔值</p>

<!-- 4.绑定单个,支持字符串 -->
<p b-class="page.activeClass" class="tab">activeClass 是一个字符串</p>

```
### 2. Style 绑定 

?> `b-style` 绑定支持2种数据格式.当绑定的是一个对象时, 可以绑定多个, key值为css的键值, 比方`color`,`display`,`background`,等. 以下例子, `page.styles.color="green"` 或 `page.color = "red"` 都会触发该元素的颜色变更.

- Object : 键值为样式名,值为布尔值
- String : 值为样式名

```js
var bs = bui.store({
    scope: "page", 
    data: {
        styles: {
            color: "red"
        },
        color:"green",
    }
})

```

html:
```html
<!-- 1.绑定1个-->
<p b-style="page.color">绑定title属性,查看源码才能看到</p>

<!-- 2.绑定多个-->
<p b-style="page.styles">绑定title属性,查看源码才能看到</p>

```


#### 效果预览:

<a href="http://www.easybui.com/demo/index.html#pages/store/style" target="_blank">查看效果</a>


### 3. 显示与隐藏


<iframe width="320" height="560" src="//www.easybui.com/demo/#pages/store/checkbox" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

?> `b-show` 可以根据数据的状态来控制当前元素的显示或者隐藏. `b-model` 是双向绑定的内容,可以查看[表单绑定](store/form.md)的章节. 

```js
var bs = bui.store({
    scope: "page", 
    data: {
        show: true,
    }
})
```

```html
<!-- 初始化显示 -->
<p b-show="page.show">我是A,被控制的内容</p>

<!-- 初始化隐藏 -->
<p b-show="!page.show">我是B,跟A相反的状态</p>

<label><input type="checkbox" b-model="page.show" />点击可以控制A和B: <span b-text="page.show"></span></label>

```

#### 效果预览:

<a href="http://www.easybui.com/demo/index.html#pages/store/checkbox" target="_blank">查看效果</a>
