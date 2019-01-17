
# 事件处理


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/event" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 1. 基本使用

?> `b-click` 的值的字段在 `methods`里定义. 在方法里面,可以通过`event`拿到点击的上下文关系.

```js
var bs = bui.store({
    scope: "page", 
    methods: {
        getMessage: function() {
            console.log(event)
        }
    }
})

```

```html
<div b-click='page.getMessage'>最简单</div>
```

## 2. 事件传参

### 常规参数

示例: 

```js
var bs = bui.store({
    scope: "page", 
    methods: {
        getMessage: function(a,b) {
            console.log(a)  // 输出3
            console.log(b)  // 输出4
        }
    }
})

```

```html
<div class="bui-btn" b-click="page.getMessage(3,4)">点击输出2个参数:3,4</div>
```

### 内置参数

?> 有些时候,我们不得不通过dom去操作的时候, 可以通过一些内置的参数传给方法.

- $index: 当前索引
- $parentIndex: 父层索引,只能取一层
- $text: 当前元素的文本
- $html: 当前的内容包含html
- $this: 点击本身的dom
- $parent: 父层的dom
- $children: 子集的$dom

示例: 

```js
var bs = bui.store({
    scope: "page", 
    methods: {
        getMessage: function(a,b) {
          console.log(a)  // 当前索引
          console.log(b)  // 当前的dom对象
        },
        remove: function(index){
          console.log(index); // 拿到跟 a 一样的索引.
        }
    }
})

```

```html
<div b-click="page.getMessage($index,$this)" >
  <div b-click="page.remove($parentIndex)" >删除</div>
</div>
```

?> 示例里面的`remove`方法, 如果传的是 `$index`, 那它永远等于0, 而`$parentIndex` 是会根据父级的元素改变的.

## 3. 自定义事件传参

示例: 

```js
var bs = bui.store({
    scope: "page", 
    methods: {
        getMessage: function(index) {
          // 触发自定义事件,参数可以自定义
          this.trigger("remove","自定义参数")
        }
    },
    mounted: function(){
      // 加载后, 监听自定义remove的时候做什么事情.
      this.on("remove",function (a) {
          console.log(a)
      })
    }
})

```

```html
<div b-click="page.getMessage($index)" ></div>
```

## 4. 事件与数据联动

?> 通过点击触发a值的改变, 在 a 值改变的时候, 又可以处理不同的事情. 

示例: 

```js
var bs = bui.store({
    scope: "page",
    data: {
      a: 1
    }, 
    methods: {
      changeA: function() {
        this.a++;
      }
    },
    watch: {
      a: function (newVal,oldVal) {
          console.log(newVal);  // 改变后的值
          console.log(oldVal);  // 改变前的值
      }
    }
})

```

```html
<div class="bui-btn" b-click="page.changeA">改变a的值,触发watch事件</div>
```


### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/event" target="_blank">查看效果</a>

?> 点击的时候,查看chrome控制面板的输出信息.