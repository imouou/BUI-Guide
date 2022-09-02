
# 计算属性与侦听器

### 1. computed 选项

?> 模板不支持表达式, 模板尽量精简, 把表达式定义到 `computed` 里面, 可以处理跟`data`相关的计算.


<iframe width="320" height="560" src="//www.easybui.com/demo/#pages/store/computed" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


#### 例子1:

点击按钮的时候,`a`更新,并触发页面上的 `aDouble` 的dom更新.

js:

```js
var bs = bui.store({
      scope: "page", // 用于区分公共数据及当前数据的唯一值
      data: {
          a: 2,
      },
      methods: {
          changeA: function (e) {
              this.a++;
          }
      },
      computed: {
          aDouble: function () {
            // a 改变的时候,会触发乘法,并更新到dom
            return this.a * 2
          }
      }
  })

```

html:
```html
<!-- 绑定事件,点击改变 a的值,并且会触发 aDouble 跟着一起改变 -->
<div class="bui-btn" b-click="page.changeA">点击1次,a+1,结果乘以2</div>

<div class="container-xy">
a: <b b-text="page.a" ></b>
结果: <b b-text="page.aDouble"></b>
</div>
```


#### 例子2:

通过`b-model`把`firstName`,`lastName` 渲染出来, 并且当input输入修改的时候,会触发`fullName`的修改. fullName 支持两种方式设置.

- function
- object

?> 区别: `function方式`,fullName的修改不会重新赋值到 firstName, lastName. 如果要实现双向联动绑定, 则采用`object方式`, 以对象的方式. 查看例子3.


js:

```js
var bs = bui.store({
    scope: "page", // 用于区分公共数据及当前数据的唯一值
    data: {
        firstName: "Hello",
        lastName: "BUI",
    },
    computed: {
        fullName: function() {
            var val = this.firstName + ' '+ this.lastName;
            return val;
        }
    },
})

```

html:
```html
<ul class="bui-list">
    <li class="bui-btn bui-box clearactive">
        <label class="bui-label">姓: </label>
        <div class="span1">
            <div class="bui-value"><input type="text" value="" placeholder="请输入" b-model="page.firstName"></div>
        </div>
    </li>
    <li class="bui-btn bui-box clearactive">
        <label class="bui-label">名: </label>
        <div class="span1">
            <div class="bui-value"><input type="text" value="" placeholder="请输入" b-model="page.lastName"></div>
        </div>
    </li>
</ul>

<!-- firstName,lastName改变就会触发 fullName 的绑定 -->
<div class="container-xy">
结果: <b b-text="page.fullName"></b>
</div>
```


#### 例子3:

双向联动修改, `bs.fullName = "BUI Best"` 设置以后, 会把`firstName`,`lastName` 重新赋值.

js:

```js
var bs = bui.store({
    scope: "page", // 用于区分公共数据及当前数据的唯一值
    data: {
        firstName: "Hello",
        lastName: "BUI",
    },
    computed: {
        // 2. 双向联动 fullName 改变,会触发各自改变 firstName,lastName,
        fullName: {
            get: function () {
              return this.firstName + ' ' + this.lastName
            },
            set: function (newValue) {
              var names = newValue.split(' ')
              this.firstName = names[0]
              this.lastName = names[names.length - 1]
            }
        }
    },
})

```

#### 例子4:

登录按钮的状态, 当`firstName`,`lastName` 有值的时候, 登录按钮可以点击; `disabled` 状态为false, 当没有值的时候, `disabled` 为 true 不能点击.  
`disabled` computed 绑定在登录按钮的`b-class`上, 有值没值的时候, 会去修改class有没有 `disabled` 样式名.

js:

```js
var bs = bui.store({
    scope: "page", // 用于区分公共数据及当前数据的唯一值
    data: {
        firstName: "",
        lastName: "",
    },
    computed: {
        disabled: function() {
            // 注意: 这里需要先缓存下来值再进行判断.
            var firstName = this.firstName,
                lastName = this.lastName;

            if( firstName && lastName ){
              return false;
            }else{
              return true;
            }
        }
    },
})

```

html:
```html
<ul class="bui-list">
    <li class="bui-btn bui-box clearactive">
        <label class="bui-label">姓: </label>
        <div class="span1">
            <div class="bui-value"><input type="text" value="" placeholder="请输入" b-model="page.firstName"></div>
        </div>
    </li>
    <li class="bui-btn bui-box clearactive">
        <label class="bui-label">名: </label>
        <div class="span1">
            <div class="bui-value"><input type="text" value="" placeholder="请输入" b-model="page.lastName"></div>
        </div>
    </li>
</ul>
<div class="container-xy">
  <div b-class="page.disabled" class="bui-btn primary round">登录</div>
</div>
```

!> 注意: `disabled`方法里面, 有个注释提醒, 为何要先缓存? 因为经常我们习惯性的直接去判断?  比如:
```js

if( this.firstName && this.lastName ){
  return false;
}else{
  return true;
}
```

当初始值 `firstName`跟`lastName` 为空的时候, if 只拿到 `firstName` 不正确, 就会跳到 `true`, 导致 `lastName` 改变的时候,不会重新执行判断条件. 这在`computed`是经常见到的错误, 如果你希望这些值都会改变 `disabled`, 那应该先进行缓存.


#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/computed" target="_blank">查看效果</a>

### 2. watch 选项

?> `watch` 可以用来监听 `data` 里面的键值的变化以后处理其它事情. `watch`函数返回当前监听变量的新值跟旧值`newVal,oldVal`.  比方下面的例子.


<iframe width="320" height="560" src="//www.easybui.com/demo/#pages/store/watch" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### 例子4:

```js
var bs = bui.store({
      scope: "page", // 用于区分公共数据及当前数据的唯一值
      data: {
          a: 2,
          b: 1,
      },
      methods: {
          changeA: function (e) {
              this.a++;
          }
      },
      watch: {
          a: function (newVal,oldVal) {
            this.b = this.a * 2;
          }
      }
  })

```

html:
```html
<!-- 绑定事件,点击改变 a的值,并且会触发 b 跟着一起改变 -->
<div class="bui-btn" b-click="page.changeA">点击1次,a+1,结果乘以2</div>

<div class="container-xy">
a: <b b-text="page.a" ></b>
结果: <b b-text="page.b"></b>
</div>
```

?> `computed` 的例子也可以用`watch`实现.

```js
var bs = bui.store({
  scope: 'page',
  data: {
    firstName: 'Hello',
    lastName: 'BUI',
    fullName: 'Hello BUI'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```

除了 `watch` 选项之外，您还可以使用命令式的 `bs.watch` 方法。可以实现分离式监听.

```
bs.watch("firstName",function(val){
  this.fullName = val + ' ' + this.lastName
})

bs.watch("lastName",function(val){
  this.fullName = this.firstName + ' ' + val
})
```

#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/watch" target="_blank">查看效果</a>
