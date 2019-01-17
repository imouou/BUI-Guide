
# 模板渲染


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/template" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 1. ES6模板

?> `b-template` 的值的字段在 `templates` 里面定义. 

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

#### 渲染模板,不能动态改变 
html:
```html
<div b-template="page.tplObject(page.obj)"></div>

```
?> 如果对象需要动态改变, 则在模板里面使用 `b-text="page.obj.${key}"` 这样改变会一起联动. 

!> 需要注意的是, 这种方式只在第一次渲染的时候有效, 如果你的数据需要新增的时候, 新增的数据是不会解析这种行为属性的. 所以你也可以改成这种模板方式, 就会根据你的数据改变而重新渲染内容. 

#### 根据数据动态改变的模板 
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


## 2. 数据的增删改

?> 通过`b-template`的绑定, 我们可以通过操作数据,便能得到页面的及时响应. 

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

## 调试

?> 如果把里面的变量`bs`,改成 `window.bs`, 可以在控制面板里面调试数据, `window.bs.list.push("我是列表3")` 所有模板都会增加数据.

初始化的时候, 还有一个 `log:true` 参数, 控制开启,可以看到数据获取的过程. 