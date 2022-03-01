
# 表单绑定


### 1. 双向绑定

!> 注意: input 的type类型必须声明是哪种类型(text,radio,checkbox)等.

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/input" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

#### 示例: 

?> `page.message` 有3个地方用到, `b-model`, `b-text`, `b-click`点击的时候,也会拿到`message`去做处理.

```js
var bs = bui.store({
    scope: "page", 
    data: {
        message: "Hello bui.js",
    },
    methods: {
        reverseMessage: function (e) {
            var a = this.message.split(' ').reverse().join(' ')
            this.message = a;
        }
    }
})
```

```html
<div id="searchbar" class="bui-searchbar bui-box">
    <div class="span1">
        <div class="bui-input">
            <i class="icon-search"></i>
            <input type="text" value="" placeholder="请输入关键字" b-model="page.message" />
        </div>
    </div>
</div>
<div class="section-title">正在输入: 
    <span class="result" b-text="page.message"></span>
    <div class="bui-btn" b-click="page.reverseMessage">反序输入值</div>
</div>
```

#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/input" target="_blank">查看效果</a>


?> `b-model` 的值支持3种数据类型

- 字符串: 用于单选或输入
- 布尔值: 用于多选
- 数组: 用于多选

### 2. 单选双向

?> `page.sex` 的值是`string`, 会先设置回对应的`value="女"`的input, name的值的sex1 不是必须的, 这个是h5用来对选择进行分组的.  `b-text` 用来输出当前的选中值.

```js
var bs = bui.store({
      scope: "page",
      data: {
          sex: "女",
      }
  })
```
```html

<label><input type="radio" name="sex1" value="男" b-model="page.sex">男</label>
<label><input type="radio" name="sex1" value="女" b-model="page.sex">女</label>

性别: <span b-text="page.sex"></span>
```

### 3. 多选双向


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/checkbox" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

?> 多选是一个数组, 里面的值会跟自己本身的值进行比较,如果一致,会是选中状态. `b-text` 输出数组会加上逗号.

```js
var bs = bui.store({
      scope: "page",
      data: {
          citys: ["广州","深圳"],
      }
  })
```

```html
<label><input type="checkbox" name="city" value="广州" b-model="page.citys">广州</label>
<label><input type="checkbox" name="city" value="汕头" b-model="page.citys">汕头</label>
<label><input type="checkbox" name="city" value="深圳" b-model="page.citys">深圳</label>
<label><input type="checkbox" name="city" value="东莞" b-model="page.citys">东莞</label>

<div class="section-title">多选: 城市: <span b-text="page.citys"></span></div>
```

### 4. 状态联动

?> 当`b-model`的值是布尔值时, 加上`b-show` 可以根据数据的状态来控制当前元素的显示或者隐藏. 

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

#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/checkbox" target="_blank">查看效果</a>

### 5. 选择列表


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/select" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

?> 下面只是展示 select 的用法, 实际上移动端我们一般使用 `bui.select`控件.



#### 单选

```js
var bs = bui.store({
    scope: "page", 
    data: {
        selected: "B",                  // 单个select初始化的值
        options: [                      // 单选多选的数据源
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ]
    },
    templates: {
        tplSelect: function (data) {
            var html ='';
            data.forEach(function (item,i) {
                // value 属性必须有
                html +=`<option value="${item.value}">${item.text}</option>`
            })
            return html;
        }
    }
})

```

```html
<select b-model="page.selected" b-template="page.tplSelect(page.options)" ></select>
<span>Selected: <b b-text="page.selected"></b></span>
```

#### 多选

?> 只是把选择项变成了数组, 把`select`加多了个属性 `multiple`. 

```js
var bs = bui.store({
    scope: "page
    data: {
        multipleSelectes: ["A","B"],    // 多选select初始化的值是一个数组
        options: [                      // 单选多选的数据源
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ]
    },
    templates: {
        // 单选多选共用模板
        tplSelect: function (data) {
            var html ='';
            data.forEach(function (item,i) {
                // value 属性必须有
                html +=`<option value="${item.value}">${item.text}</option>`
            })
            return html;
        }
    }
})
```

```html
<select b-model="page.multipleSelectes" multiple b-template="tplSelect(page.options)" b-command="append">
      <option disabled value="">请选择</option>
</select>
<span>Selected: <b b-text="page.multipleSelectes"></b></span>
```

?> 这里会有个 `b-command` 属性,用来告诉模板第1次渲染的时候使用什么方法?

- html     替换数据
- append   在后面增加数据
- prepend  在前面增加数据

#### 单选联动

?> 联动的示例,增加了事件绑定, `$index`是内置对象,代表点击当前dom的索引, 有意思的是, 这里为什么是 `$index` 而不是 `i` ? `i` 是每次都从0开始的, 当数据有增删改以后, 索引值是不确定的, 而 `$index` 是根据你当前的dom所在的索引, 这个跟数组的索引是一一对应的. 更多内置对象,请查看[事件绑定章节](store/event.md). 

```js
var bs = bui.store({
    scope: "page", 
    data: {
        selectA: [                      // 联动select的数据源
          { text: 'One', value: 'A' },
          { text: 'Two', value: 'B' },
          { text: 'Three', value: 'C' }
        ],
        selectB: [],
    },
    methods: {
        addToB: function (index) {
            this.selectB.push(this.selectA[index]);
            this.selectA.splice(index,1);
        },
        addToA: function (index) {
            this.selectA.push(this.selectB[index]);
            this.selectB.splice(index,1);
        }
    },
    templates: {
        tplSelectA: function (data) {
            var html ='';
            data.forEach(function (item,i) {
                // value 属性必须有
                html +=`<option value="${item.value}" b-click='page.addToB($index)'>${item.text}</option>`
            })
            return html;
        },
        tplSelectB: function (data) {
            var html ='';
            data.forEach(function (item,i) {
                html +=`<option value="${item.value}" b-click='page.addToA($index)'>${item.text}</option>`
            })
            return html;
        }
    }
})
```

```html
<div class="bui-box">
    <div class="span1">
        <select b-template="page.tplSelectA(page.selectA)" class="bui-select" multiple>
        </select>
    </div>
    <div class="span1">
        <select b-template="page.tplSelectB(page.selectB)" class="bui-select" multiple >
        </select>
    </div>
</div>
```


#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/select" target="_blank">查看效果</a>

#### 多选联动

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/selectm" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

这个例子是一个自定义的模拟select, 我们放在[综合案例](store/case.md)里面讲. 

#### 弹窗选择交互

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/choose" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 5.动态表单

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/form_dynamic" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

