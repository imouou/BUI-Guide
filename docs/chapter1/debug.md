# 调试

?> 关于数据的调试,只需要打开跨域的Chrome就可以直接预览效果了,但在手机调试就需要部署工程,并且还要解决跨域问题, 这些通过`自动化部署工程`,简单配置一下就可以了.

## 自动化部署工程

?> 使用[buijs](tools/buijs.md)创建的工程,安装好依赖以后,执行`npm run dev`,就会起一个服务器了.

```bash
# 安装依赖
$ npm install
# 部署环境并打开浏览器
$ npm run dev
```

## 接口如何跨域

?> 配合自动化构建工程, 打开根目录下的 `app.json` ,里面有个键值 `proxy` 的对象. 

假设请求的接口地址为: http://www.easybui.com/api/getDetail/id/123 
*可以这样配置 proxy :*

`"/api"` 为请求接口的二级目录

```
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

js: ajax请求的时候使用`相对路径`.

```
bui.ajax({
    url: "api/getDetail/id/123"
}).then(function(res){
    
})
```

!> 为了后面更改为正式地址, 建议可以把url部分作为配置项
```
var apiUrl = "";

bui.ajax({
    url: apiUrl+ "api/getDetail/id/123"
}).then(function(res){
    
})
```
> 关于代理的更多配置,可以查看 [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) 的使用说明.

## Chrome跨域调试

?> 打开chrome 开发者工具, 开启模拟手机效果, 这样才能模拟手机的滑动拖拽事件. 

![chrome 预览图](../static/images/chrome.png)

!> 在PC调试数据,界面等内容,需要打开跨域的chrome, 搜索`chrome 跨域`

## Debugtool调试

?> DebugTool是手机上的一个应用,可以预览远程地址,并输出console.log的相关信息, 必须使用第一种跨域方式,才能在手机预览.

* [安卓版下载](http://www.easybui.com/downloads/source/debugtool/DebugTool-v3.4.0.apk)
* [IOS版下载](http://www.easybui.com/downloads/source/debugtool/DebugTool-v1.0.ipa)


## 微信调试缓存

?> 微信调试需要注意的是,微信里面的缓存很严重,每次修改,需要给修改的js引用,后面增加`?t=时间戳`之类的方式,来确保脚本的更新.

### 去除脚本缓存

*例如:*
```html
<script src="bui.js?t=2016073101"></script>
```
?> 如果你使用的是单页模块化开发, 重新初始化`window.loader`设置缓存参数为false, 加载的模块便会采用时间戳的方式加载.

```js
window.loader = bui.loader({cache: false});
```

### 去除模板缓存
?> 如果你的页面是单页,则在路由初始化的时候,加上`cache:false`; 如果是多页,则在地址栏上,加上`?t=时间戳`

```js
router.init({
    ...
    cache: false
    ...
})
```

