# 控件用法

### 控件初始化

?> 以 `bui.list` 为例, 对控件的详细用法实例讲解. 可以先了解下[bui.list API](http://www.easybui.com/guide/api/classes/bui.list.html)

_例子: 列表下拉刷新,滚动加载_

效果预览:

![bui.list](../static/images/controls/bui-list_low.gif)

_生成结构, bui-fast 快速书写 `ui-list` <kbd>tab</kbd>_

```html
<div id="uiScroll" class="bui-scroll">
  <div class="bui-scroll-head"></div>
  <div class="bui-scroll-main">
    <!-- 这里是滚动的内容区,如果不是ul,则需要修改对应的参数 -->
    <ul class="bui-list"></ul>
  </div>
  <div class="bui-scroll-foot"></div>
</div>
```

_初始化, bui-fast 快速书写 `bui-list` <kbd>tab</kbd>_

```js
var uiList = bui.list({
  id: "#uiScroll",
  url: "http://www.easybui.com/demo/json/shop.json",
  pageSize: 5,
  data: {},
  //如果分页的字段名不一样,通过field重新定义
  field: {
    page: "page",
    size: "pageSize",
    data: "data",
  },
  template: function (data) {
    var html = "";
    data.map(function (el, index) {
      html += `<li class="bui-btn bui-box">
                <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${el.name}</h3>
                    <p class="item-text">${el.address}</p>
                    <p class="item-text">${el.distance}公里</p>
                </div>
                <span class="price"><i>￥</i>${el.price}</span>
            </li>`;
    });

    return html;
  },
});
```

?> `template` 接收的数据来源于`field`参数的 data 字段映射, 返回数组才能做对应的分页比对.

_例如: 请求的接口是_

```html
http://www.easybui.com/api/getList?pagination=1&pagesize=9
```

_假设返回的数据是_

```js
{
    code: "200",
    results: [{
        id: "123"
        name: "新闻标题"
    }]
}
```

_bui.list 的初始化, field 的值应该是, 默认字段, `page:"page"`,`size:"pageSize"`,`data:""`_

```js
var uiList = bui.list({
  id: "#uiScroll",
  url: "http://www.easybui.com/api/getList",
  data: {},
  field: {
    page: "pagination", // 页码字段
    size: "pagesize", // 页数字段, 相同字段可以不传
    data: "results", // 返回的数据, 空则是整个数据
  },
  page: 1,
  pageSize: 10,
});
```

!> 如果数据存在多层`results.data`, 则字段也需要像对象访问一样.

### 使用方法

_uiList 的实例来源于前面的例子初始化_

```js
uiList.refresh();
```

### 事件监听

_事件全部为小写_

```js
// 刷新的时候触发
uiList.on("refresh", function (result) {});
```

### 修改参数

#### option 方法

?> 通过`option`方法可以在控件初始化以后,重新修改初始化参数, 跟 `init`方法的区别是, `option`方法不一定会重新初始化, 比方在修改数据参数的时候.

_例子: 修改下次请求的参数_

```js
uiList.option("data", {
  lastId: "123",
});
```

### 获取依赖

#### widget 方法

?> 通过`widget`方法,可以获取控件的内部依赖, 比方 `bui.list = bui.scroll + bui.ajax`组合而成.

_例子: 获取内部 scroll 的实例_

```js
返回所有依赖实例;
var listWidget = uiList.widget();

引用内部的scroll;
var scroll = uiList.widget("scroll");

调用scrollTop方法返回顶部;
scroll.scrollTop();
```
