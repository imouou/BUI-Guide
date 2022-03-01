# 开发规范

遵循以下规范开发，可以避免开发中出现的奇奇怪怪的问题。

### 1. 切图规范

> BUI基于REM适配手机,保持跟原生DPI一致的缩放效果, 需要把设计稿转换为750的设计稿,量取到的值,直接除以100,便是rem值.

#### 量取设计稿内容的大小/100, 转成rem单位
![转换尺寸为rem单位](../static/images/getSlideHeight.png)

```css
.slide { width:100%;height:2.7rem; } 
```


### 2. 目录规范
![目录截图](../static/images/router/catalog.png)

!> 注意: 工程目录下不能有`中文文件名`,会影响打包. 整个工程目录也不能有`中文路径`, 保存代码热更新才会有效. 

**目录说明:**

```
➜  bui tree
.
├── src                                                 ## 应用目录
|   ├── index.html                                      ## 首页路由结构
|   ├── index.js                                        ## 路由初始化
|   ├── pages                                           ## 页面存放地址
|   │   ├── main                                        
|   │   |   └── main.html                               ## 默认打开的main模板，代表首页内容（可配）
|   │   |   └── main.js                                 ## 默认打开的main模块，代表首页初始化（可配）
|   │   └── components (可选)                            ## 组件目录
|   │       └── slide                                   ## slide 组件
|   │           └── index.html                          ## slide 模板
|   │           └── index.js                            ## slide 模块
|   ├── js                                              ## 框架及插件目录
|   |   ├── zepto.js                                    ## zepto库
|   |   ├── bui.js                                      ## bui库
|   │   ├── config  (可选)                               ## 公共配置的文件目录
|   │   |   └── global.js
|   │   └── plugins (可选)                               ## 插件目录，插件必须存放在这里面才不会被二次编译
|   │   |   └── map                                     ## 地图插件
|   │   |       └── map.css
|   │   |       └── map.js
|   │   └── platform (可选)                              ## 原生的平台框架
|   │       └── cordova.js
|   ├── css                                             ## 应用的样式目录
|   |   ├── bui.css
|   |   └── style.css
|   ├── less（可选）                                     ## 使用less写样式，会覆盖掉style.css
|   |   ├── _common.less
|   |   └── style.less
|   ├── scss（可选）                                     ## 使用scss写样式，会覆盖掉style.css
|   |   ├── _common.scss
|   |   └── style.scss
│   ├── font                                            ## bui.css用到的字体图标
│   └── images                                          ## 应用的图片目录
│
├── app.json                                            ## 编译的配置
├── gulpfile.js                                         
├── package.json
```

### 3. 路径使用规范

假设你的页面在 *pages/main/index.html*;

1. 单页开发, 使用相对src目录的路径, 无论你的页面的层级目录有多深, 里面的图片路径,跳转路径, 应该使用 *images/xxx.jpg*, *pages/xxx/xxx.html* 的写法;

2. 不使用绝对根路径的写法 */images/xxx.jpg*, */pages/xxx/xxx.html*; 打包后本地的路径查找会从 file:///xxxx 来查找你的文件, 最终导致路径错误.

### 4. 页面结构规范
?> 一个标准的结构包含, .bui-page 子集分别是 `header`, `main`, `footer` 等标签, `main` 标签必须有, 因为页面初始化的时候会自动撑开main的高度. 快速书写 `ui-page` <kbd>Tab</kbd>

```html
<div class="bui-page bui-box-vertical">
    <header class="bui-bar">
        <!-- 顶部固定内容 -->
        <div class="bui-bar-left">
            <!-- 左边有图标示例 -->
            <div class="bui-btn"><i class="icon-back"></i></div>
        </div>
        <div class="bui-bar-main">BUI开发工程模板</div>
        <div class="bui-bar-right">
            <!-- 右边有图标示例 -->
            <div class="bui-btn"><i class="icon-search"></i></div>
        </div>
    </header>
    <main>
        <!-- 中间内容 -->
    </main>
    <footer>
        <!-- 底部内容 -->
    </footer>
</div>
```

### 5. 模块化规范

1. 一个js 文件里面只能有一个 *loader.define* 的匿名模块;
2. 业务逻辑需要在 *loader.define* 里面,防止加载其它模块的时候冲突;
3. 模块的路径以及资源等,都使用相对路径;
4. 模块里面不能有*bui.ready*的执行;

```js
// 异步模块或组件
loader.define(function(requires,exports,module,global){
    // requires: 加载依赖模块
    // module: 当前模块的基本信息
    // global: 定义的全局方法 
    
    return {}
})
```

### 6. 事件绑定

?> 单页开发里面很容易造成事件重复绑定, 模块、组件里面`$` 选择器要改成 `router.$` 或 `module.$` 选择器.

```js

// 单页不应该这样绑定
$(".bui-page").click(function(e){

})

// 应该使用
router.$(".bui-page").click(function(e){
  console.log("点击了页面")
})

```
