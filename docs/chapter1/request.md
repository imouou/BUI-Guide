# 数据交互

?> BUI里面有3种数据交互.

* [页面跳转及传参](chapter1/multipage.md)
* [数据请求](chapter1/request?id=数据请求)
* [数据存储](chapter1/request?id=数据存储)

## 数据请求

### bui.ajax(option) 

?> 数据请求 <a href="http://www.easybui.com/demo/api/classes/bui.ajax.html" target="_blank">bui.ajax API</a>

*参数: option 是一个对象* 

#### option.url
- Type: `string`
- Detail: `url地址`

#### option.data
- Type: `object`
- Detail: `请求的参数,默认:{}`

#### option.method
- Type: `string`
- Detail: `默认: GET`

*示例:*

```js
bui.ajax({
    url: "",
    data: {}
}).then(function(res){
    // 成功回调
    console.log(res)
},function(res,status){
    // 失败回调
    console.log(status);
})
```
?> 还有依赖请求,顺序请求等, [查看更多ajax技巧](http://www.easybui.com/demo/#pages/ui_method/bui.ajax)

## 模板渲染

?> 这里你熟悉`$`的操作都可以直接在`bui.ready`里面使用, 模板渲染可以使用`$.html + 字符串`拼接, 也可以支持`ES6 的模板`, 你还可以引入第三方模板, [artTemplate](https://aui.github.io/art-template/zh-cn/docs/index.html), `BUI+Vuejs` 也是不错的选择. 

### 使用 `$` 渲染示例:

?> 这些属于`jQuery`的基础操作, 更多知识请自行学习.

*渲染一个列表:*

*list.js*
```js
// 示例数据,正常由请求返回
var data = [{
        name: "hello"
    },{
        name: "bui"
    }];

// 声明列表模板
var templateList = function (data) {
    var html = '';

    data.forEach(function(el,index){
        html += '<li class="bui-btn">'+el.name+'</li>';
    })

    return html;
}

var listTpl = templateList(data);

// $渲染
$("#list").html(listTpl);

```

*list.html*
```html
<ul id="list"></ul>
```
### 使用 `artTemplate` 渲染示例:

*list.js*
```
// 渲染
<script>
    // 示例数据,正常由请求返回
    var data = [{
            name: "hello"
        },{
            name: "bui"
        }];

    // 结合数据返回模板 script id="tpl-list"
    var html = template("tpl-list",{ listData: data});

　　　　$("#list").html(html);
</script>

```

*list.html*
```html
// 引入artTemplate
<script src="https://raw.githubusercontent.com/aui/art-template/master/lib/template-web.js"></script>

<ul id="list"></ul>

// 模板放html里
<script id="tpl-list" type="text/html">
{{each listData as item index}} 
    <li class="bui-btn">{{item.name}}</li>
{{/each}} 
</script>
```


## 数据存储

### bui.storage(option)

?> `bui.storage` 是基于 `localStorage` 及 `sessionStorage` 封装的, 主要解决两者之间的API统一问题, 并且支持JSON存储, 以及支持限制多少条数据等问题, 常用来做历史记录.

*参数: option 是一个对象* 

#### option.local
- Type: `boolean`
- Detail: `设置是否为本地存储,默认:true`

#### option.size
- Type: `number`
- Detail: `限制存储多少条数据,默认:1`


*示例1: 字符存储*

```js
// 存储1条数据
var storage = bui.storage();
    storage.set("name","hello");
    // 第2个会覆盖第1个
    storage.set("name","bui");

```

*示例2: 对象存储*

```js
// 存储2条json数据
var storage2 = bui.storage({size:2});
    // 通过id字段判断数据是否重复,如果有重复的ID,则会替换掉之前的数据
    storage2.set("user",{id:"u1",name:"hello"},"id");
    storage2.set("user",{id:"u2",name:"bui"},"id");


```

*示例3: 结合示例1,示例2 获取数据*

```js
// 获取字符串
var names = storage.get("name");
    // names 为数组, 可以通过 names[0] 获取到内容. 
    console.log(names) // ["bui"] 

// 获取对象
var users = storage2.get("user");
    // 最后存储的数据在前面 
    console.log(users) // [{id:"u2",name:"bui"},{id:"u1",name:"hello"}] 

```

!> 注意: bui.storage 不管存什么数据,获取到的内容都在一个数组里面.


