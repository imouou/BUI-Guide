# 控件用法


### 控件初始化
?> 以 `bui.list` 为例, 对控件的详细用法实例讲解. 可以先了解下[bui.list API](http://www.easybui.com/demo/api/classes/bui.list.html) 

*例子: 列表下拉刷新,滚动加载*

效果预览:

![bui.list](../static/images/controls/bui-list_low.gif)

*生成结构, bui-fast 快速书写 `ui-list` <kbd>tab</kbd>*
```html
<div id="uiScroll" class="bui-scroll">
    <div class="bui-scroll-head"></div>
    <div class="bui-scroll-main">
        <!-- 这里是滚动的内容区,如果不是ul,则需要修改对应的参数 -->
        <ul class="bui-list">
        </ul>
    </div>
    <div class="bui-scroll-foot"></div>
</div>
```
*初始化, bui-fast 快速书写 `bui-list` <kbd>tab</kbd>*
```js
var uiList = bui.list({
    id: "#uiScroll",
    url: "http://www.easybui.com/demo/json/shop.json",
    pageSize:5,
    data: {},
    //如果分页的字段名不一样,通过field重新定义
    field: {
        page: "page",
        size: "pageSize",
        data: "data"
    },
    template: function (data) {
        var html = "";
        data.map(function(el, index) {

            html +=`<li class="bui-btn bui-box">
                <div class="bui-thumbnail"><img src="${el.image}" alt=""></div>
                <div class="span1">
                    <h3 class="item-title">${el.name}</h3>
                    <p class="item-text">${el.address}</p>
                    <p class="item-text">${el.distance}公里</p>
                </div>
                <span class="price"><i>￥</i>${el.price}</span>
            </li>`
        });

        return html;
    }
});
    
```
?> `template` 接收的数据来源于`field`参数的data字段映射, 返回数组才能做对应的分页比对. 

*例如: 请求的接口是*
```html
http://www.easybui.com/api/getList?pagination=1&pagesize=9
```
*假设返回的数据是*
```js
{
    code: "200",
    results: [{
        id: "123"
        name: "新闻标题"
    }]
}
```
*bui.list的初始化, field的值应该是, 默认字段, `page:"page"`,`size:"pageSize"`,`data:""`*
```js
var uiList = bui.list({
    id: "#uiScroll",
    url: "http://www.easybui.com/api/getList",
    data: {},
    field: {
        page: "pagination",  // 页码字段
        size: "pagesize", // 页数字段, 相同字段可以不传
        data: "results"   // 返回的数据, 空则是整个数据
    },
    page:1,
    pageSize:10
})

```
!> 如果数据存在多层`results.data`, 则字段也需要像对象访问一样.

### 使用方法

*uiList的实例来源于前面的例子初始化*
```js
uiList.refresh();
```

### 事件监听

*事件全部为小写*
```js
// 刷新的时候触发
uiList.on("refresh",function(result){
    
});
```

### 修改参数
#### option 方法
?> 通过`option`方法可以在控件初始化以后,重新修改初始化参数, 跟 `init`方法的区别是, `option`方法不一定会重新初始化, 比方在修改数据参数的时候. 

*例子: 修改下次请求的参数*
```js
uiList.option("data",{
    "lastId":"123",
})
```

### 获取依赖
#### widget 方法
?> 通过`widget`方法,可以获取控件的内部依赖, 比方 `bui.list = bui.scroll + bui.ajax`组合而成.

*例子: 获取内部scroll的实例*
```js
返回所有依赖实例
var listWidget = uiList.widget();

引用内部的scroll
var scroll = uiList.widget("scroll");

调用scrollTop方法返回顶部
scroll.scrollTop();
``` 
