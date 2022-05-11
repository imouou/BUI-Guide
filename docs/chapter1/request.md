# 数据交互

?> BUI 里面有 3 种数据交互.

- [页面跳转及传参](chapter1/multipage.md)
- [数据请求](chapter1/request?id=数据请求)
- [数据存储](chapter1/request?id=数据存储)

## 数据请求

### bui.ajax(option)

?> 数据请求 <a href="http://www.easybui.com/guide/api/classes/bui.ajax.html" target="_blank">bui.ajax API</a> 数据请求的跨域处理,请查看[调试](chapter1/debug.md)章节.

_参数: option 是一个对象_

#### option.url

- Type: `string`
- Detail: `url地址`

#### option.data

- Type: `object`
- Detail: `请求的参数,默认:{}`

#### option.method

- Type: `string`
- Detail: `默认: GET`

_示例:_

```js
bui
  .ajax({
    url: "",
    data: {},
  })
  .then(
    function (res) {
      // 成功回调
      console.log(res);
    },
    function (res, status) {
      // 失败回调
      console.log(status);
    }
  );
```

?> 还有依赖请求,顺序请求等, [查看更多 ajax 技巧](http://www.easybui.com/demo/#pages/ui_method/bui.ajax)

## 模板渲染

?> 这里你熟悉`$`的 jQuery 及 Dom 操作都可以直接在`bui.ready`里面使用, 工程里面可以支持`ES6 的模板`.

### 使用 `$` 渲染示例:

?> 这些属于`jQuery`的基础操作, 更多知识请自行学习.

_渲染一个列表:_

_list.js_

```js
// 示例数据,正常由请求返回
var data = [
  {
    name: "hello",
  },
  {
    name: "bui",
  },
];

// 声明列表模板
var templateList = function (data) {
  var html = "";

  data.forEach(function (el, index) {
    html += `<li class="bui-btn">${el.name}</li>`;
  });

  return html;
};

var listTpl = templateList(data);

// $渲染
$("#list").html(listTpl);
```

_list.html_

```html
<ul id="list"></ul>
```

## 数据存储

### bui.storage(option)

?> `bui.storage` 是基于 `localStorage` 及 `sessionStorage` 封装的, 主要解决两者之间的 API 统一问题, 并且支持 JSON 存储, 以及支持限制多少条数据等问题, 常用来做历史记录. 默认返回的是一个数组.

_参数: option 是一个对象_

#### option.local

- Type: `boolean`
- Detail: `设置是否为本地存储,默认:true 为localStorage, false 则为 sessionStorage`

#### option.size

- Type: `number`
- Detail: `限制存储多少条数据,默认:1`

_示例 1: 字符存储_

```js
// 存储1条数据
var storage = bui.storage();
storage.set("name", "hello");
// 第2个会覆盖第1个
storage.set("name", "bui");
```

_示例 2: 对象存储_

```js
// 存储2条json数据
var storage2 = bui.storage({ size: 2 });
// 通过id字段判断数据是否重复,如果有重复的ID,则会替换掉之前的数据
storage2.set("user", { id: "u1", name: "hello" }, "id");
storage2.set("user", { id: "u2", name: "bui" }, "id");
```

_示例 3: 结合示例 1,示例 2 获取数据_

```js
// 获取字符串
var names = storage.get("name");
// names 为数组, 可以通过 names[0] 获取到内容.
console.log(names); // ["bui"]

// 获取对象
var users = storage2.get("user");
// 最后存储的数据在前面
console.log(users); // [{id:"u2",name:"bui"},{id:"u1",name:"hello"}]
```

!> 注意: bui.storage 不管存什么数据,获取到的内容都在一个数组里面.

?> 如果想要取到存进去的值, 可以这样

```js
// 获取第一个值
var name = storage.get("name", 0);
console.log(name); // "bui"
```
