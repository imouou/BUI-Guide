# 快速入门

> 有Node基础，使用第一种方式即可，无Node基础，可以按第二种方式操作一次。

### 一、下载开发包并解压 

[下载单页开发包](https://www.easybui.com/p/download.html)

修改解压的目录名为 demo， 打开终端命令行。

1. npm 安装依赖即可预览
```bash
# 进入工程目录
cd demo
# 安装依赖,加上淘宝源会速度快一点，或使用cnpm
npm install --registry=https://registry.npm.taobao.org
# 运行预览
npm run dev
```


**效果预览**

<img src="static/images/template/preview.png">

### 二、 使用CDN版本

- **cdn.jsdelivr.net** [buijs](https://www.jsdelivr.com/package/npm/buijs)
    ```html
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.css" />
    <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
    ```

#### 1. 新建 *index.html* 页面

```html

<!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>BUI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.css" />
    </head>
    <body>
        <!-- 结构内容位置 -->

        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
        <script>
            // 多页开发: 一个页面必须要有一个 bui.ready, 且只能有一个
            bui.ready(function(global){
                // init
                bui.alert("done")
            })
        </script>
    </body>
</html>

```

#### 2. 新增*BUI标准结构*

放在body结构里面。

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
    </main>
    <footer>
        <!-- 底部固定内容 -->
    </footer>
</div>

```

#### 3. 使用BUI控件

一个控件包含结构与初始化脚本，分别增加到main内容里面，以及bui.ready的初始化里面。

```html
<!-- 轮播图结构 -->
<div id="uiSlide" class="bui-slide"></div>

```

```js
// 轮播图控件初始化
var uiSlide = bui.slide({
        id: "#uiSlide",
        height: 380,
        autopage: true,
        data: [{
            image: "http://easybui.com/demo/images/banner01.png",
        },{
            image: "http://easybui.com/demo/images/banner02.png",
        }]
    })
```

完整代码

```html

<!DOCTYPE HTML>
<html>
    <head>
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
                <div id="uiSlide" class="bui-slide"></div>

            </main>
            <footer>
                <!-- 底部固定内容 -->
            </footer>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
        <script>
            // 多页开发: 一个页面必须要有一个 bui.ready, 且只能有一个
            bui.ready(function(global){
                // init
                // 轮播图控件初始化
                var uiSlide = bui.slide({
                        id: "#uiSlide",
                        height: 380,
                        autopage: true,
                        data: [{
                            image: "http://easybui.com/demo/images/banner01.png",
                        },{
                            image: "http://easybui.com/demo/images/banner02.png",
                        }]
                    })
            })
        </script>
    </body>
</html>

```

> 以上是BUI最基础的用法，简单好理解，但随着需求的变更，慢慢就越写越乱，不好维护。需要组件化把可以复用的代码抽离，比方轮播图是可以公共使用的。

#### 4. 新增自定义组件

还是以轮播图组件为例子，抽离原本的代码，做参数合并操作。单页多页都是一样的用法。

> 组件化以后，需要部署或打开跨域的chrome才能访问。

*pages/slide.html*

```html
<div class="bui-slide"></div>
```

*pages/slide.js*

```js
// 组件包装器
loader.define(function(requires, exports, module, global){

  // 接收参数 1.6.x 支持
    // let props = bui.history.getParams(module.id);
  
    // 接收参数 1.7.x 支持
    let props = module.props;
  
    // 合并默认参数，如果没传参数则使用默认，可以保证组件正常展示。
    let params = $.extend(true,{
          height: 380,
          autopage: true,
          loop: true,
          data: [{ image: "http://easybui.com/demo/images/banner01.png" }]
      },props);

      // id比较特殊，需要改成通过component生成的id 
      params.id = `#${module.id} .bui-slide`;

    // 轮播图控件初始化
    const uiSlide = bui.slide(params);

    // 抛出接口供外部调用
    return uiSlide;
})
```

在页面的任何地方，使用component 标签即可使用。

```html
<component id="homeSlide" name="pages/slide" height="300"></component>
<component id="tabSlide" name="pages/slide" height="200"></component>
```

完整代码：


```html

<!DOCTYPE HTML>
<html>
    <head>
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
                <component id="homeSlide" name="pages/slide" height="300"></component>

            </main>
            <footer>
                <!-- 底部固定内容 -->
            </footer>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
        <script>
            // 多页开发: 一个页面必须要有一个 bui.ready, 且只能有一个
            bui.ready(function(global){
                // init
                
            })
        </script>
    </body>
</html>

```

#### 5. 组件动态传参

部分参数我们通过属性的方式传过去，对象类型的参数则需要动态传过去。

```html
<component id="homeSlide" name="pages/slide" delay="true"></component>
```

```js
// 动态编译，且只编译一次，参数只传一次
loader.delay({
    id:"#homeSlide",
    param: {
        height: 300,
        data: [{ image: "http://easybui.com/demo/images/banner01.png" },
        { image: "http://easybui.com/demo/images/banner02.png" }]
    }
})
```
完整代码


```html

<!DOCTYPE HTML>
<html>
    <head>
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
                <component id="homeSlide" name="pages/slide" delay="true"></component>

            </main>
            <footer>
                <!-- 底部固定内容 -->
            </footer>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/zepto.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/buijs@latest/lib/latest/bui.js"></script>
        <script>
            // 多页开发: 一个页面必须要有一个 bui.ready, 且只能有一个
            bui.ready(function(global){
                // 动态编译传参，且只编译一次，参数只传一次
                loader.delay({
                    id:"#homeSlide",
                    param: {
                        height: 300,
                        data: [{ image: "http://easybui.com/demo/images/banner01.png" },
                        { image: "http://easybui.com/demo/images/banner02.png" }]
                    }
                })
            })
        </script>
    </body>
</html>

```

更多内容请继续参考文档或实践。