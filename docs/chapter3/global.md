# 公共方法与配置

?> 像上一章一样，直接调用 `bui.ajax` 来实现数据请求，用起来方便，维护起来却十分困难，所以需要有一个放公共方法及配置的地方。

## 公共方法的定义

1. 我们在 *src/js/* 目录下，新建config目录，目录下新建一个`global.js`文件，内容如下：

*js/config/global.js*

```js
loader.global(function(global) {

    /** 
     * @description: 公共的请求方法
     * @param {object} opt 参考 bui.ajax
     * @param {string} opt.url 必填url地址 默认 ""
     * @param {object} [opt.data] 默认 {}
     * @param {string} [opt.method] 默认的请求方法 "GET" | "POST" 
     * @return {*}
     * @example {*}
    * 
        global.ajax({
            url:"http://easybui.com/demo/json/shop.json",
            data:{}
        }).then(function(res){
            // 成功的时候输出
            console.log(res);
        })
    
     */    
    function ajax(opt){

        // 可以公共处理请求的headers
        let opts = $.extend(true,{ headers:{"token":"buixxxx"} },opt);

        return bui.ajax(opts)
    }


    // 一定要抛出这个方法，外部才能调用到
    return {
        ajax: ajax
    }
})
```

## 公共方法的使用

### 1. 首页引入

*src/index.html*

```html
<script src="js/zepto.js">
<script src="js/bui.js">

<!-- 在bui.js 的引入后面即可 -->
<script src="js/config/global.js">
```

### 2. 首页调用
*src/index.js*

```js
bui.ready(function(global){
    // 1.7.0 以上才支持
    global.ajax({
        url:"http://easybui.com/demo/json/shop.json"
    }).then(function(res){
        console.log(res)
    })

    // 1.6.x 支持
    loader.global().ajax({
        url:"http://easybui.com/demo/json/shop.json"
    }).then(function(res){
        console.log(res)
    })

})
```

### 3. 组件的调用
*src/pages/main/main.js*

```js
loader.define(function(require,exports,module,global){
    // 调用得到global的所有方法
    ...
    getList(opt){
        global.ajax(opt).then((result)=>{
            // 请求成功就赋值
            this.datas = result.data;

        },function(result,status){
            // 失败 console.log(status)
        });
    }
    ...
})
```

## 公共配置

### 1. 控件配置

> BUI的每个控件都支持默认的配置修改，可以根据业务需要去配置属于自己的交互版本

*js/config/global.js*

```js
loader.global(function(global) {

    // ajax 的全局配置，这样所有的请求都会加上这个token，一般不建议这样简单粗暴去修改
    bui.config.ajax = {
        headers: {
            token:"buixxxxx"
        }
    }
    // 默认 hint是居中的交互，可以改成全部从底部交互
    bui.config.hint = {
        position: "bottom",
        effect:"fadeInUp"
    }
})
```

### 2. 业务配置

*js/config/global.js*

```js
loader.global(function(global) {

    let baseurl = "http://easybui.com/";
    let apiurl = baseurl + "demo/"

    return {
        baseurl: baseurl,
        apiurl: apiurl,
    }
})
```
