# 开发方式

### 一、单页开发

[下载单页开发包](https://www.easybui.com/p/download.html)

* 优点：体验好，媲美app，操控强，按需加载或一次性加载；
* 缺点：不支持后端语言输出展示，不支持seo；

!> 单页开发预览需要IIS部署，或者node工程的支持，默认需要3个文件。

*index.html*

```html
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>BUI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.css" />
    </head>
    <body>
        <div id="bui-router"></div>

        <!-- content -->
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
        <script>
            // router init
            window.router = bui.router();

            bui.ready(function(global){
                // router init, will find default page. pages/main/main.html pages/main/main.js 
                router.init({
                    id: "#bui-router"
                })
            })
        </script>
    </body>
</html>
```

*pages/main/main.html*

```html
<!-- BUI标准结构 -->
<div class="bui-page bui-box-vertical">
    <header>
        <!-- 顶部固定内容 -->
        <div class="bui-bar">
            <div class="bui-bar-left">
                <div class="bui-btn"><i class="icon-back"></i></div>
            </div>
            <div class="bui-bar-main">BUI首页</div>
            <div class="bui-bar-right"></div>
        </div>
    </header>
    <main>
        <!-- 中间滚动内容 -->
        <div class="bui-btn warning">中间按钮</div>
    </main>
    <footer>
        <!-- 底部固定内容 -->
        <div class="bui-btn primary">底部按钮</div>
    </footer>
</div>
```

*pages/main/main.js* 特定的模块包装

```js
loader.define(function(requires,exports,module,global){
    // requires: 加载模块
    // module: 模块信息
    // global: 获取全局方法
    bui.alert("done");

})
```


### 二、多页开发

[下载多页开发包](http://easybui.com/downloads/source/bui/bui_router_dev_latest.zip)

* 优点：简单，支持后端语言输出展示，支持seo；
* 缺点：体验较差，无法定制交互及路由操作；

*index.html*

```html

<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>BUI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.css" />
    </head>
    <body>
        <!-- BUI标准结构 -->
        <div class="bui-page bui-box-vertical">
            <header>
                <!-- 顶部固定内容 -->
                <div class="bui-bar">
                    <div class="bui-bar-left">
                        <div class="bui-btn"><i class="icon-back"></i></div>
                    </div>
                    <div class="bui-bar-main">BUI首页</div>
                    <div class="bui-bar-right"></div>
                </div>
            </header>
            <main>
                <!-- 中间滚动内容 -->
                <div class="bui-btn warning">中间按钮</div>
            </main>
            <footer>
                <!-- 底部固定内容 -->
                <div class="bui-btn primary">底部按钮</div>
            </footer>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
        <script>
            bui.ready(function(global){
                // init
                bui.alert("done")
            })
        </script>
    </body>
</html>

```

[点击在线预览](https://codesandbox.io/s/qnzgk?file=/doc-examples/createpage.html)
