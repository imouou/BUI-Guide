# 模板渲染

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/template" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 1. ES6 模板

?> `b-template` 的值的字段在 `templates` 里面定义. 注意: 子集的内容必须有标签包住. 例如模板里面的`li`标签.

#### 数据支持数组

```html
<ul b-template="page.tplList(page.list)" class="bui-list"></ul>
```

```js
var bs = bui.store({
  el: ".bui-list",
  scope: "page",
  data: {
    list: ["我是列表1", "我是列表2"],
  },
  templates: {
    tplList: function (data) {
      let html = "";
      data.forEach(function (item, i) {
        html += `<li class="bui-btn">${item}</li>`;
      });
      return html;
    },
  },
});
```

#### 数据支持对象

```js
var bs = bui.store({
  scope: "page",
  data: {
    obj: {
      title: "我的对象的标题",
      content: "<p>我是内容,支持html</p><p>我是内容,支持html</p>",
    },
  },
  templates: {
    tplObject: function (data) {
      let html = "";
      for (let key in data) {
        html += `<div class="bui-btn" >${data[key]}</div>`;
      }
      return html;
    },
  },
});
```

#### 层级对象

```html
<div class="wrap">
  <h2 b-text="page.objList.title"></h2>
  <ul b-template="page.tplObjectList(page.objList.data)" class="bui-list"></ul>
</div>
```

```js
var bs = bui.store({
  el: ".wrap",
  scope: "page",
  data: {
    objList: {
      title: "我是标题",
      data: ["我是复杂数据列表1"],
    },
  },
  templates: {
    tplObjectList: function (data, e) {
      var html = "";
      data.forEach(function (item, i) {
        html += `<li class="bui-btn">${item}</li>`;
      });
      return html;
    },
  },
});
```

?> 如果 `h2` 是在 `ul` 里面, 那么默认第一次渲染数据, `h2` 就会被替换, 这时可以通过 `b-command` 属性,告诉模板第一次渲染采用什么方式. :) 当然这里`ul`标签里面放`h2`标签是不符合 w3c 标准的. 我们改成`li`标签.

- html 替换模板
- append 在模板后面增加
- prepend 在模板前面增加

```html
<ul
  b-template="page.tplObjectList(page.objList.data)"
  b-command="append"
  class="bui-list"
>
  <li b-text="page.objList.title"></li>
</ul>
```

### 数据的增删改

```html
<ul b-template="page.tplList(page.list)" class="bui-list"></ul>
```

?> 通过`b-template`的绑定, 我们可以通过操作数组,便能得到页面的及时响应.

```js
var bs = bui.store({
  el: ".bui-list",
  scope: "page",
  data: {
    list: ["我是列表1", "我是列表2"],
  },
  templates: {
    tplList: function (data) {
      let html = "";
      data.forEach(function (item, i) {
        html += `<li class="bui-btn">${item}</li>`;
      });
      return html;
    },
  },
});
```

?> 通过脚本操控 `bs.list.push("我是列表3")` , 页面便能及时渲染新的数据.

!> 并非数组的所有操作都能得到及时响应, 可以监听到以下几种方法:

- `push` 在后面增加数据
- `unshift` 在前面增加数据
- `shift` 删除第 1 条数据
- `pop` 删除最后一条数据
- `splice` 删除或者插入新的数据, 具体可以查看数组的 splice 用法
- `sort` 排序
- `reverse` 反序
- `length` 获取长度

?> 为了更方便的操作数据视图, 我们还提供了几个命令式的方法, 可以方便的对数组进行操作响应. 具体可以查看对应的 [bui.array API](http://www.easybui.com/guide/api/classes/bui.array.html) 使用说明, 在综合案例里面, 我们会频繁的用到.

- `bui.array.empty` 清空数组,并触发第 1 个数组的视图变更
- `bui.array.replace` 替换数组,并触发第 1 个数组的视图变更
- `bui.array.merge` 合并数组,并触发第 1 个数组的视图变更
- `bui.array.set` 修改数组的某个值,支持对象
- `bui.array.delete` 删除数组的某个值,支持对象

### 模板的交互

```html
<div class="wrap">
  当前选中: <b b-text="page.citysCheck"></b>
  <ul id="cityList" b-template="page.tplListCheck(page.citys)"></ul>
</div>
```

```js
var bs = bui.store({
  el: ".wrap",
  scope: "page",
  data: {
    citysCheck: ["广州", "深圳"],
    citys: ["广州", "深圳", "上海", "北京"],
  },
  templates: {
    tplListCheck: function (data) {
      var html = "";
      data.forEach(function (item, i) {
        html += `<li class="bui-btn"><label><input type="checkbox" name="city" value="${item}" b-model="page.citysCheck">${item}</label></li>`;
      });
      return html;
    },
  },
});
```

#### 效果预览

<a href="http://www.easybui.com/demo/index.html#pages/store/template" target="_blank">查看效果</a>
