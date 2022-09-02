
# 事件处理


<iframe width="320" height="560" src="//www.easybui.com/demo/#pages/store/event" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 1. 基本使用

?> `b-click` 的值的字段在 `methods`里定义. 在方法里面,可以通过`event`拿到点击的上下文关系.

```html
<div b-click='page.getMessage'>最简单</div>
```

```js
var bs = bui.store({
    scope: "page",
    methods: {
        getMessage: function(e) {
            console.log(e)
        }
    }
})

```


### 2. 事件传参

#### 常规参数

示例:

```html
<div class="bui-btn" b-click='page.getMessage(3,[4],{"test":"对象"})'>点击输出3个参数:3,[4],{"test":"对象"}</div>
```

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

?> 如果参数是对象,需要是一个标准JSON才能转换, `b-click` 属性值并且一定要用单引号`''`. 另外传参里面不能有`()`,`&` 之类的特殊字符,会导致解析出错或者数据出错, 可以看复杂参数的处理. 

#### 复杂参数

示例:

```js
var bs = bui.store({
    scope: "page",
    methods: {
        getMessage: function(dom) {
            // 这个名字太复杂只能通过属性的方式获取, 或者传索引跟数据匹配的方式
            var name = $(dom).attr("name");
        }
    }
})

```

```html
<div class="bui-btn" b-click='page.getMessage($this)' name="abc复杂名字(a).pdf">点击输出3个参数:3,[4],{"test":"对象"}</div>
```

示例2:

```html
<ul class="bui-list">
  <li class="bui-btn" b-click='page.getMessage($index)'>通过索引来取这个数据</li>
  <li class="bui-btn" b-click='page.getMessage($index)'>通过索引来取这个数据</li>
</ul>  
```

```js
var bs = bui.store({
    scope: "page",
    data: {
      datas: [{id:"1","name":"test1"},{id:"2","name":"test2"}]
    },
    methods: {
        getMessage: function(index) {
            // 这个名字太复杂只能通过属性的方式获取, 或者传索引跟数据匹配的方式
            console.log(this.$data.datas[index])
        }
    }
})

```

> $index 是动态索引, 代表点击的元素li 在第几个索引, 跟你渲染的数据是一一对应的. 类似的还有 $parentIndex 

#### 内置参数

?> 有些时候,我们不得不通过dom去操作的时候, 可以通过一些内置的参数传给方法.

- $itemIndex: 模板子集的索引，跟数组是一一对应关系
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

如果层级太深, 通过`$parentIndex` 都不能获取到, 那`b-target`属性就可以派上用场了

例如: 

```html
<ul class="bui-list">
  <li>
    <div class="bui-btn">
      <h3>标题名</h3>
      <!-- $parentIndex 指向的是 bui-btn 而我们要删除的,其实是li的索引才是跟数据一一对应的 -->
      <div b-click="page.remove($parentIndex)" >删除</div>
      <!-- 通过b-target 修改了 $index 指向 li -->
      <div b-click="page.remove($index)" b-target="li">删除</div>
    </div>
  </li>
</ul>
```

### 3. 自定义事件传参

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

### 4. 事件与数据联动

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


#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/event" target="_blank">查看效果</a>

?> 点击的时候,查看chrome控制面板的输出信息.
