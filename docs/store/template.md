
# 模板渲染


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/template" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 1. ES6模板

?> `b-template` 的值的字段在 `templates` 里面定义. 注意: 子集的内容必须有标签包住. 例如模板里面的`li`标签.

### 数据支持数组

```js
var bs = bui.store({
    scope: "page",
    data: {
      list: ["我是列表1","我是列表2"],
    },
    templates: {
      tplList: function (data) {
          let html = "";
          data.forEach(function (item,i) {
              html += `<li class="bui-btn">${item}</li>`;
          })
          return html;
      }
    }
})

```

html:
```html
<ul b-template="page.tplList(page.list)" class="bui-list"></ul>

```

### 数据支持对象

```js
var bs = bui.store({
    scope: "page",
    data: {
      obj: {
        title: "我的对象的标题",
        content: "<p>我是内容,支持html</p><p>我是内容,支持html</p>"
      }
    },
    templates: {
      tplObject: function (data) {
          let html = "";
          for( let key in data ){
              html += `<div class="bui-btn" >${data[key]}</div>`;
          }
          return html;
      }
    }
})

```

#### 渲染模板,数据是对象时,默认不会动态联动
html:
```html
<div b-template="page.tplObject(page.obj)"></div>

```
?> 如果对象需要动态联动, 有2种方法:

方法1:  `obj` 为数据源
```js
// 改变数据
bs.obj.title = "我的对象的标题2";
// 告诉使用obj的模板,数据变更需要重新渲染
bs.trigger("obj",{value:bs.obj});
```

方法2: `obj` 为数据源
```js
// 改变数据
bs.obj.title = "我的对象的标题2"
// 告诉使用obj的模板,数据变更需要重新渲染
bs.set("obj",bs.obj);
```

?> 方法1 跟 方法2的区别在于, 方法1只是变更并重新触发模板渲染, 方法2, 会对数据的所有键值重新赋值并触发模板渲染.

#### 拆分对象数据,监听改变
html:
```html
<div >
  <div b-text="page.obj.title"></div>
  <div b-html="page.obj.content"></div>
</div>

```

### 复杂对象

?> 支持数据是一个对象, 那就可以更好的设计这个数据了, 但不建议把数据层级设计得太深.

```js
var bs = bui.store({
    scope: "page",
    data: {
      objList: {
          title: "我是标题",
          data: ["我是复杂数据列表1"]
      }
    },
    templates: {
      tplObjectList: function (data,e) {
          var html = "";
          data.forEach(function (item,i) {
              html += `<li class="bui-btn">${item}</li>`;
          })
          return html;
      }
    }
})

```
```html
<h2 b-text="page.objList.title"></h2>
<ul b-template="page.tplObjectList(page.objList.data)" class="bui-list"></ul>
```

?> 如果 `h2` 是在 `ul` 里面, 那么默认第一次渲染数据, `h2` 就会被替换, 这时可以通过 `b-command` 属性,告诉模板第一次渲染采用什么方式. :) 当然这里`ul`标签里面放`h2`标签是不符合w3c标准的. 我们改成`li`标签.

- html    替换模板
- append  在模板后面增加
- prepend 在模板前面增加


```html
<ul b-template="page.tplObjectList(page.objList.data)" b-command="append" class="bui-list">
  <li b-text="page.objList.title"></li>
</ul>
```

?> 如果 ul 的子集不止有li标签元素? `b-children` 就可以派上用场, 代表子集的重复元素是哪个选择器?

- 可以是标签
- 可以是类名

比方:

```html
<ul b-template="page.tplObjectList(page.objList.data)" b-children=".bui-btn" class="bui-list">
</ul>
```

这个生成的模板可能是这样的. 如果你使用 `bui.array.set` 修改数据的时候,变成新增, 这个时候你就要怀疑是不是需要设置 `b-children`.

```html
<ul b-template="page.tplObjectList(page.objList.data)" b-children=".bui-btn" class="bui-list">
    <li class="section-title">我是二级标题</li>
    <li class="bui-btn">我是内容0,索引0</li>
    <li class="section-title">我是二级标题</li>
    <li class="bui-btn">我是内容1,索引1</li>
    <li class="section-title">我是二级标题</li>
    <li class="bui-btn">我是内容2,索引2</li>
</ul>
```

## 2. 数据的增删改

?> 通过`b-template`的绑定, 我们可以通过操作数组,便能得到页面的及时响应.

```js
var bs = bui.store({
    scope: "page",
    data: {
      list: ["我是列表1","我是列表2"],
    },
    templates: {
      tplList: function (data) {
          let html = "";
          data.forEach(function (item,i) {
              html += `<li class="bui-btn">${item}</li>`;
          })
          return html;
      }
    }
})

```

html:
```html
<ul b-template="page.tplList(page.list)" class="bui-list"></ul>

```

?> 这样绑定以后, 通过脚本操控 `bs.list.push("我是列表3")` , 页面便能及时渲染新的数据.

!> 不过并非数组的所有操作都能得到及时响应, 目前我们可以监听到以下几种方法:

- `push`      在后面增加数据
- `unshift`   在前面增加数据
- `shift`     删除第1条数据
- `pop`       删除最后一条数据
- `splice`    删除或者插入新的数据, 具体可以查看数组的splice用法
- `sort`      排序
- `reverse`   反序
- `length`    获取长度

?> 为了更方便的操作数据视图, 我们还提供了几个命令式的方法, 可以方便的对数组进行操作响应. 具体可以查看对应的 [bui.array API](http://www.easybui.com/demo/api/classes/bui.array.html) 使用说明, 在综合案例里面, 我们会频繁的用到.

- `bui.array.empty`  清空数组,并触发第1个数组的视图变更
- `bui.array.replace` 替换数组,并触发第1个数组的视图变更
- `bui.array.merge`  合并数组,并触发第1个数组的视图变更
- `bui.array.set`  修改数组的某个值,支持对象
- `bui.array.delete`  删除数组的某个值,支持对象

!> 值得注意的是, 如果数组里面是一个对象, 对象的某个字段变更是不会反馈到视图的, 这种时候就可以使用 `bui.array.set` 来替换整条数据, 达到刷新视图的目的. 这个可以查看 [综合案例章节](store/case.md)的多选联动的 `setStatus` 方法, 会修改到数组对象的状态.

`1.5.3 以后, 上面那些方法, 可以有更方便的使用方式`, 比方: 

!> 1.5.4修正: 只有通过 bui.store 初始化劫持的数组,才会有 $方法操作

1. 清空数组 [].$empty()
```js

var bs = bui.store({
    data: {
        arr:["hello","bui","hi","easybui"]
    }
})
bui.array.empty( bs.arr );

// 1.5.4 版本以后可以这样
bs.arr.$empty();

```

2. 替换数组 [].$replace()
```js
var bs = bui.store({
    data: {
        arr:["hello","bui","hi","easybui"]
    }
})
bui.array.replace( bs.arr, ["new","bui"]);

// 1.5.4 版本以后可以这样
bs.arr.$replace(["new","bui"]);

```

3. 合并数组 [].$merge()
```js
var bs = bui.store({
    data: {
        arr:["hello","bui","hi","easybui"]
    }
})
bui.array.merge( bs.arr, ["new","bui"]);

// 1.5.4 版本以后可以这样
bs.arr.$merge(["new","bui"],["easy"]);

```

4. 修改数组 [].$set()
```js

// 例子1: 修改第几个
var bs = bui.store({
    data: {
        arr:["hello","bui","easybui"]
    }
})
bui.array.set( bs.arr, 1, "new hi");
// ["hello","new hi","easybui"]

// 1.5.4 版本以后可以这样
bs.arr.$set(1, "new hi");
// arr 结果: ["hello","new hi","easybui"]

```
```js
// 例子2: 修改值等于 bui 为新值 new bui
var bs = bui.store({
    data: {
        arr:["hello","bui","easybui"]
    }
})
bui.array.set( bs.arr, "bui", "new bui");
// ["hello","new bui","easybui"]

// 1.5.4 版本以后可以这样
bs.arr.$set("bui", "new bui");
// arr 结果: ["hello","new bui","easybui"]

```
```js
// 例子3: 修改对象值
var bs = bui.store({
    data: {
        arr:[{name:"hello"},{name:"hi"},{name:"easybui"}]
    }
})
bui.array.set( bs.arr, 1, {name:"new hi"} );
// [{name:"hello"},{name:"new hi"},{name:"easybui"}]

// 1.5.4 版本以后可以这样
bs.arr.$set(1, {name:"new hi"});
// arr 结果: [{name:"hello"},{name:"new hi"},{name:"easybui"}]

```
```js
// 例子4: 修改对象某个字段值, 需要传多一个唯一值的字段名
var bs = bui.store({
    data: {
        arr:[{name:"hello"},{name:"hi"},{name:"easybui"}]
    }
})

// 1.5.4 版本以后可以这样
// 单独修改某个值
bs.arr.$set("hello", "hi bui", "name");
// 修改整个对象,不同的key值则会一起合并过去
bs.arr.$set("hi", {name:"new hi"}, "name");
// arr 结果: [{name:"hello"},{name:"new hi"},{name:"easybui"}]
```

5. 删除数据并触发视图更新
```js
//例子1: 删除值或索引:
var bs = bui.store({
    data: {
        arr:["hello","bui","hi","bui"]
    }
})
bui.array.delete(bs.arr , "bui" );

// 1.5.4 版本以后可以这样
bs.arr.$delete("hi");
// arr 结果: ["hello","hi"]
```
```js
// 例子2: 删除值在哪个字段:
var bs = bui.store({
    data: {
        arr:[{ "id":1,value:"hello"},{ "id":2,value:"bui"}]
    }
})
bui.array.delete( bs.arr, "bui", "value" );

// 1.5.3 版本以后可以这样
bs.arr.$delete("bui", "value");
// arr 结果: [{ "id":1,value:"hello"}]
```

## 3. 模板的交互

?> 再来一个交互类的模板, 为了代码更加清晰易懂,样式类的属性都去掉.

```js
var bs = bui.store({
    scope: "page",
    data: {
        citysCheck: ["广州","深圳"],
        citys: ["广州","深圳","上海","北京"],
    },
    templates: {
        tplListCheck: function (data) {
            var html = "";
            data.forEach(function (item,i) {
                html += `<li class="bui-btn"><label><input type="checkbox" name="city" value="${item}" b-model="page.citysCheck">${item}</label></li>`;
            })
            return html;
        }
    }
})
```

```html

当前选中: <b b-text="page.citysCheck"></b>
<ul id="cityList" b-template="page.tplListCheck(page.citys)"></ul>
```

?> 这个模板用到 `b-model` 属性, 这在一开始有数据的时候, 渲染是正确的, 当数据是异步增加进来以后, 这个数据并没有选中状态. 那要如何处理呢?

### 模拟数据请求

```js
var bs = bui.store({
    scope: "page",
    data: {
        citysCheck: [],
        citys: [],
    },
    templates: {
        tplListCheck: function (data) {
            let _self = this;
            let html = "";
            data.forEach(function (item,i) {
                // 通过比对,增加选中状态
                let hasCheck = bui.array.compare(item,_self.citysCheck);
                let checked = hasCheck ? "checked" : "";

                html += `<li class="bui-btn"><label><input type="checkbox" name="city" value="${item}" b-model="page.citysCheck" ${checked}>${item}</label></li>`;
            })
            return html;
        }
    },
    mounted: function () {
        // 模拟数据动态改变
        setTimeout(()=>{
            // 方法1:
            this.citysCheck.push("广州","深圳")
            this.citys.push("广州","深圳","上海","北京");

            // 方法2:
            // bui.array.merge(this.citysCheck,["广州","深圳"])
            // bui.array.merge(this.citys,["广州","深圳","上海","北京"])

        },1000)
    }
})
```

?> 这里其实还有一种办法, 通过使用 `this.oneTick` 方法绑定 `citys` 的数据更新,并且视图已经渲染完成以后, 执行多一次解析行为属性. 这个`compile`要慎用, 多次调用会增加多个重复的回调, 造成性能的损耗.  

```js
mounted: function () {
    // 模拟数据动态改变
    setTimeout(()=>{
        // 通过监听 citys 的数据变更并且视图渲染完成以后, 增加数据的解析, 这样就不用在模板里面做数据比对处理了.

        // 必须在数据更新之前
        this.oneTick("citys",function () {
           this.compile("#cityList")
        })
        // 数据更新
        this.citysCheck.push("广州","深圳")
        this.citys.push("广州","深圳","上海","北京");

    },1000)
}
```


## 4. 第三方模板

?> 我们的页面只有干净的绑定, 其它都在模板的方法里面处理逻辑, 正常ES6模板其实已经能够很好的满足我们的需求了, 不过如果你习惯用第三方模板的话, 你也可以使用, 这里以 `artTemplate` 为例, 需要在首页引入这个模板的js文件.

```js
var bs = bui.store({
    scope: "page",
    data: {
        list: ["我是列表1","我是列表2"],
    },
    templates: {
        artTplList: function (data,e) {

            var html = template("tpl-list",{ listData: data});

            return html;
        }
    }
})
```
```html

<ul b-template="page.artTplList(page.list)" class="bui-list"></ul>
<script id="tpl-list" type="text/html">
  {{each listData item index}}
      <li class="bui-btn" href="pages/ui_controls/bui.store.html" >{{item}}</li>
  {{/each}}
</script>
```

### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/template" target="_blank">查看效果</a>
