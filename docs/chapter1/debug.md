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
*需要这样配置 proxy :*

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

js: 脚本请求使用`相对路径`, 为了后面更改为正式地址, 建议可以把url部分作为配置项.

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

![chrome 预览图](http://www.easybui.com/docs/images/chrome.png)

!> 在PC调试数据,界面等内容,需要打开跨域的chrome
    
* **Chrome 49以下版本解决跨域问题**

  **mac** 在终端上输入以下命令:
  ```bash
  $ open -a Google\ Chrome --args --disable-web-security
  ```
  **windows** 新建个快捷方式,右键->属性, 目标路径后面增加  `--args --disable-web-security` 
  ```
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --args --disable-web-security 
  ```

* **Chrome 49以上版本解决跨域问题**

  **mac** 在终端上输入以下命令:
  ```bash
  $ open -a Google\ Chrome --args --disable-web-security  --user-data-dir
  ```
  **windows** 新建个快捷方式,右键->属性, 目标路径后面增加  `--args --disable-web-security  --user-data-dir`
  ```
  "C:\Program Files\Google\Chrome\Application\chrome.exe" --args --disable-web-security  --user-data-dir
  ```

如果以上方式不能解决你的跨域问题,请自行网上搜索 chrome对应的版本的跨域.


## Debugtool调试

?> DebugTool是手机上的一个应用,可以在手机模拟打包后的调试效果,基于`Bingotouch`,`Link`开发的应用, 多页开发全局配置 `bui.isWebapp = false;` 可以切换成原生跳转,原生请求.

* [安卓版下载](http://www.easybui.com/downloads/source/debugtool/DebugTool-v3.4.0.apk)
* [IOS版下载](http://www.easybui.com/downloads/source/debugtool/DebugTool-v1.0.ipa)


手机安装应用以后,工程需要服务器部署起来,然后才能在手机预览. 手机端预览,请更改成您的 `http://IP+端口号`.

## 微信调试

?> 微信调试需要注意的是,微信里面的缓存很严重,每次修改,需要给修改的js引用,后面增加`?t=时间戳`之类的方式,来确保脚本的更新.

*例如:*
```html
<script src="bui.js?t=2016073101"></script>
```

?> 如果你使用的是`bui.loader`模块化开发, 可以在公共配置的地方, 设置 `bui.config.loader.cache = false;`, 加载的模块便会采用时间戳的方式加载.

```js
bui.config.loader.cache = false;
```

