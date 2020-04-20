# 模板

## 多页模板

?> 多页模板就是传统的模板, 每一个多页模板都需要有一个,且只能有一个`bui.ready`. 多页模板简单方便. 

```html
<!DOCTYPE HTML>
<html lang="en-US">
  <head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <title>BUI 多页开发标准页面</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/buijs/lib/latest/bui.css" />
  <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div class="bui-page bui-box-vertical">
        <header>
            <!-- 固定顶部区 -->
            <div class="bui-bar">
                <div class="bui-bar-left">
                    <a class="bui-btn" onclick="bui.back();"><i class="icon-back"></i></a>
                </div>
                <div class="bui-bar-main">模板页</div>
                <div class="bui-bar-right">
                </div>
            </div>
        </header>
        <main>
          <!-- 固定中间滚动内容区 -->
        </main>
        <footer>
          <!-- 固定底部   -->
        </footer>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/buijs/lib/zepto.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/buijs/lib/latest/bui.js"></script>
    <script>
        bui.ready(function() {
          // 所有控件及方法需要在这里执行
        })
    </script>
  </body>
</html>
```

## 单页模板

?> 单页模板不需要引入一堆脚本样式, 跟组件模板一致, 就是一个简单html结构. 单页模板的命名跟模块的命名默认保持一致, 路径一致的方式.

```html
<div class="bui-page bui-box-vertical">
    <header>
        <!-- 固定顶部区 -->
        <div class="bui-bar">
            <div class="bui-bar-left">
                <a class="bui-btn" onclick="bui.back();"><i class="icon-back"></i></a>
            </div>
            <div class="bui-bar-main">单页模板</div>
            <div class="bui-bar-right">
            </div>
        </div>
    </header>
    <main>
      <!-- 固定中间滚动内容区 -->
    </main>
    <footer>
      <!-- 固定底部   -->
    </footer>
</div>
```

?> 模板里面可以增加样式.

```html
<style>
  .bui-page .bui-bar {
    background:red;
  }
</style>
<div class="bui-page bui-box-vertical">
    <header>
        <!-- 固定顶部区 -->
        <div class="bui-bar">
            <div class="bui-bar-left">
                <a class="bui-btn" onclick="bui.back();"><i class="icon-back"></i></a>
            </div>
            <div class="bui-bar-main">单页模板</div>
            <div class="bui-bar-right">
            </div>
        </div>
    </header>
    <main>
      <!-- 固定中间滚动内容区 -->
    </main>
    <footer>
      <!-- 固定底部   -->
    </footer>
</div>
```

!> 像上面的写法会影响全局. 应该在 bui-page 加多一个独有的样式, 才能避免相互影响. 

```html
<style>
  .page-home .bui-bar {
    background:red;
  }
  .page-home main {
    background:#ddd;
  }
</style>
<div class="bui-page bui-box-vertical page-home">
    <header>
        <!-- 固定顶部区 -->
        <div class="bui-bar">
            <div class="bui-bar-left">
                <a class="bui-btn" onclick="bui.back();"><i class="icon-back"></i></a>
            </div>
            <div class="bui-bar-main">单页模板</div>
            <div class="bui-bar-right">
            </div>
        </div>
    </header>
    <main>
      <!-- 固定中间滚动内容区 -->
    </main>
    <footer>
      <!-- 固定底部   -->
    </footer>
</div>
```

## 组件模板

?> 跟单页模板一样, 但颗粒度会更小一点. 比方轮播图.

**pages/components/slide/index.html**

```html
<div class="bui-slide"></div>
```

## 模板标签

?> 上面定义的模板, 可以使用view标签局部加载到页面中, 默认是不编译的. 主要用来配合`bui.store`, 初始化了`bui.store`才能编译.

```html
<view name="pages/components/slide/index"></view>
```

## view标签属性

?> `view`有3个内置的属性. 支持自定义属性, 具体查看组件的传参.

  - `name="xxx"` 模块名.
  - `render="true"` 代表已经渲染结束,不会再次渲染.
  - `delay="true"` 代表暂时不加载,直到调用 `loader.delay`方法. 查看组件的延迟加载

## view延迟加载

?> 不会自动加载模板, 直到手动调用 `loader.delay`方法.
```html
<view class="delayview" name="pages/list/index" delay="true"></view>
```

```js
loader.delay({
  id: ".delayview"
})
```


## 模板手动编译

**loader.view**
```html
<view id="slide" name="pages/components/slide/index"></view>
```

```js
loader.view({
  id: "#slide"
})
```
