# 控件

> 控件：指有交互效果的UI，一般包含HTML结构及JS代码。BUI有50多个交互控件，兼容，灵活，可以组合成上百种交互效果。

## 初始化

### 轮播图效果演示
支持手势操作

<div id="uiSlide" class="bui-slide"></div>
<script>
// 焦点图 js 初始化:
var uiSlide = bui.slide({
    id:"#uiSlide",
    width:375,
    height:200,
    autopage: true,
    loop: true,
    zoom: false,
    data: [{
        image: "http://easybui.com/demo/images/banner01.png",
        target: "_blank",
        url: "http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.slide&code=html,js,result",
    },{
        image: "http://easybui.com/demo/images/banner02.png",
        target: "_blank",
        url: "http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.slide&code=html,js,result",
    }]
})
</script>


例如：轮播图包含以下代码片段

```html
<div id="uiSlide" class="bui-slide"></div>
```

```js
// 焦点图 js 初始化:
var uiSlide = bui.slide({
    id:"#uiSlide",
    height:380,
    autopage: true,
    loop: true,
    data: [{
        image: "images/banner01.png",
        url: "pages/ui_controls/bui.slide_title.html",
    },{
        image: "images/banner02.png",
        url: "pages/ui_controls/bui.slide_title.html",
    }]
})
```

控件的具体参数请参考API文档 [slide api](http://easybui.com/demo/api/classes/bui.slide.html)

> 带中括号的参数为可选，例如`[menu] [width]`，不带中括号的参数为必要项，例如`id`


## 控件方法

可以通过刚刚的实例`uiSlide`，常用的场景，都能找到对应的方法。

```js

// 自动播放
uiSlide.start();

// 停止播放
uiSlide.stop();

// 跳转下一个
uiSlide.next();

// 获取当前索引
uiSlide.index();

// 跳转第2个图片
uiSlide.to(1);
// 跳转第2个图片不需要动画
uiSlide.to(1,"none");

```

## 动态渲染

BUI的控件只初始化一次，无需重复初始化，通过option方法，修改data的数据。

```js
// 示例数据
var data = [{
    image: "images/banner01.png"
}]
// 修改动态值
uiSlide.option("data",data)
```

例子： 

```html
<div id="slide" class="bui-slide"></div>
```

```js
// 先初始化
var uiSlide = bui.slide({
id:"#slide",
height:380,
autopage:true,
data: []    // 数据为空
})

// 异步请求
bui.ajax({
    url: "http://www.easybui.com/demo/json/slide.json",
}).then(function(result){

    var data = result.data || [];
    // 修改数据
    uiSlide.option("data",data)
});

```

slide.json 接口返回的数据为：
```js
{
    "status": 200,
    "info": "获取成功",
    "data": [{
        "image": "images/banner01.png",
        "url": "pages/ui_controls/bui.slide_title.html"
    },{
        "image": "images/banner02.png",
        "url": "pages/ui_controls/bui.slide_title.html"
    }]
}
```

## 订阅式事件

控件的内部绑定了一些方法，在外层重新绑定一次会影响内部实现，通过订阅式监听事件则不会相互影响。

例如：监听跳转事件，不管轮播图滑动跳转，点击跳转，还是自动跳转到第几个，都会触发这个回调，展示当前的索引值。

```js
uiSlide.on("to",function(){
    let index = this.index();
    console.log(index)
})
```

## 更多控件

- <a href="http://easybui.com/demo/" target="_blank">BUI控件演示</a>
- <a href="http://easybui.com/demo/api/" target="_blank">BUI控件API文档</a>