# 跨域调试

## 接口跨域配置

**1. 修改配置**

?> 假设请求的接口地址为: http://www.easybui.com/api/getDetail?id=123

打开根目录下的 `app.json`，里面有个键值 *proxy* 的对象。

```js
{
...
"proxy": {
    "/api": {
      "target": "http://www.easybui.com",  
      "changeOrigin":true,
      "ssl": false  
    }
  }
...
}
```

`"/api"`: 为请求接口的二级目录

`"target": "http://www.easybui.com"`: 为请求接口的域名地址


**2. 修改请求的方法**

```js
// 一定要注意这个请求的url是 "api/xxx", 不能是 "/api/xxx"
bui.ajax({
    url: "api/getDetail",
    data: {
        id:"123"
    }
}).then(function(res){

})
```

!> **注意:** ajax请求的时候请使用`相对工程路径`,这样代理才会正确转发.


> 结合全局配置，可以把url前部分作为变量配置项, 调试的时候为空, 打包的时候再改为正式环境，打包后没有跨域问题。

*global.js*
```js
loader.global(function(){
    // 本地调试为空""，会自动转发到app.json配置的域名，正式环境修改为接口域名： http://www.easybui.com/
    let baseurl = "";
    // 模拟请求的接口
    let apiGetListUrl = baseurl + "api/getDetail/";

    return {
        api: {
            getListUrl: apiGetListUrl
        }
    }
    
})
```

*main.js*

```js
loader.define(function(require,exports,module,global){

    // 请求
    global.ajax({
        url: global.api.getListUrl
        data: {
            id:"123"
        }
    }).then(function(res){
        console.log(res)
    })
})

```

> 关于代理的更多配置,可以查看 [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) 的使用说明.

## 手机远程调试

VConsole 是在手机端调试的利器， 1.7.x 工程默认内置了这个模块，直接引入即可。

方法1:

*src/index.js*
```js
// 手机调试，正式环境请自行去掉
import VConsole from 'vconsole';
const vConsole = new VConsole();

bui.ready(function(){
    // 控件初始化
})
```

方法2: 

*src/index.html*

```html
<script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></script>
<script>
  // VConsole will be exported to `window.VConsole` by default.
  var vConsole = new window.VConsole();
</script>
```

## 手机远程预览

假设打开的预览地址为 http://localhost:3000 ，把`localhost`改成 您的本机IP `10.0.0.123`，可以通过微信扫码预览，或者手动输入地址。


## 微信调试缓存

> 微信调试需要注意的是,微信里面的缓存很严重,每次修改,需要给修改的js引用,后面增加`?t=时间戳`之类的方式,来确保脚本的更新.

### 去除脚本缓存

*例如:*
```html
<script src="bui.js?t=2016073101"></script>
```
> 单页模块化开发, 通过重新初始化`window.loader`设置缓存参数为false, 加载的模块便会采用时间戳的方式加载.

*src/index.js*
```js
// 这行代码必须在bui.ready 之前
window.loader = bui.loader({cache: false});

bui.ready(function(){
    //
})
```
