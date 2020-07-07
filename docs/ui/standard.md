# 开发规范


## 目录规范

![BUI 单页示例目录说明](../static/images/router/catalog.png)  

> `src`目录及外层 `app.json`,`gulpfile.js`,`package.json`, 不使用npm时,非必须. 

!> 注意: 工程目录下不能有中文文件名,会影响打包. 整个工程目录也不能有中文的路径, 保存代码热更新才会有效. 

**目录说明:**

| **目录名**   | **描述**               | **是否必须**               |
|:------------- |:--------------------------------|--------------:|
| /app.json | 插件及跨域的配置        | 否 |
| /gulpfile.js | gulp编译配置        | 否 |
| /package.json | 工程依赖配置        | 否 |
| /src/index.html | 应用首页入口文件        | 是 |
| /src/index.js   | 路由的初始化脚本及全局事件     | 是 |
| /src/css/       | 应用样式及bui.css样式        | 是 |
| /src/font/      | bui.css用到的字体图标        | 是 |
| /src/images/       | 应用图片目录        | 否 |
| /src/js/       | 应用脚本        | 是 |
| /src/js/zepto.js   | bui.js默认依赖于zepto.js 或 jquery      | 是 |
| /src/js/bui.js     | BUI交互控件库        | 是 |
| /src/pages/       | 应用的模块        | 是 |
| /src/pages/main/       | 默认路由初始化以后会先载入这个main模块        | 是 |
| /src/pages/main/main.html | main模块的模板        | 是 |
| /src/pages/main/main.js   | main模块的业务脚本     | 是 |

## 路径使用规范

假设你的页面在 `pages/main/index.html`;

1. 单页开发, 使用相对根目录的路径, 无论你的页面的层级目录有多深, 里面的图片路径,跳转路径, 应该使用 `images/xxx.jpg`, `pages/xxx/xxx.html` 的写法;

2. 不使用绝对根路径的写法 `/images/xxx.jpg`, `/pages/xxx/xxx.html`; 打包后本地的路径查找会从 file:///xxxx 来查找你的文件, 最终导致路径错误.

## 页面结构规范
?> 一个标准的结构包含, .bui-page 子集分别是 `header`, `main`, `footer` 等标签, `main` 标签必须有, 因为页面初始化的时候会自动撑开main的高度. 快速书写 `ui-page` <kbd>Tab</kbd>

```html
<div class="bui-page">
    <header class="bui-bar">
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

## 结构及命名规范

*注意:*
* `bui-box, bui-fluid, bui-btn, span1 - span12, icon-`, 是全局定义的关键字,不要使用上面的名称开头,可能导致你的样式多了很多东西
* 业务中新增的样式无需以bui开头命名
* 结构使用 控件名+中横杆+位置 命名 head main foot left right cell wrap

  **上下结构 示例** : 滑动控件  
  快速书写: `ui-slide` <kbd>Tab</kbd>

  ```html
    <div class="bui-slide">
        <div class="bui-slide-head">
        </div>
        <div class="bui-slide-main">
        </div>
    </div>
  ```
  **上中下结构 示例** : 滚动加载控件 
  快速书写: `ui-scroll` <kbd>Tab</kbd>

  ```html
    <div class="bui-scroll">
      <div class="bui-scroll-head"></div>
      <div class="bui-scroll-main"></div>
      <div class="bui-scroll-foot"></div>
    </div>
  ```
  **左中右结构 示例** : bar
  快速书写: `ui-bar` <kbd>Tab</kbd>

  ```html
    <div class="bui-bar">
        <div class="bui-bar-left">
        </div>
        <div class="bui-bar-main"></div>
        <div class="bui-bar-right">
        </div>
    </div>
  ```
  **控件的重复子元素使用 -cell 示例** : 步骤条
  快速书写: `ui-rating` <kbd>Tab</kbd>

  ```html
    <div class="bui-rating">
      <div class="bui-rating-cell"></div>
    </div>
  ```
  **控件名父层在控件名后面加上 -wrap 示例** : 侧边栏
  快速书写: `ui-sidebar` <kbd>Tab</kbd>

  ```html
    <div class="bui-sidebar-wrap">
      <div id="sidebar" class="bui-sidebar">
        侧滑菜单
      </div>
      <div class="bui-page">
        页面正文
      </div>
    </div>
  ```



## 模块化规范

1. 一个js 文件里面只能有一个 `loader.define` 的匿名模块;
2. 业务逻辑需要在 `loader.define` 里面,防止加载其它模块的时候冲突;
3. 避免循环依赖 A ->依赖 B 模块, 而 B模块 -> A模块, 这就造成循环依赖,一般需要避免这种设计,如果一定要用, 不使用依赖前置的方式;
4. 避免循环嵌套, 在`loader.define` 里面 又 `require` 加载当前模块, 这个时候还没实例化,就会造成死循环;
5. 每个页面的ID不能相同;
6. 模块的路径以及资源等,都使用相对路径;

## 事件规范

?>事件分为全局事件,及控件事件, 

- **全局事件**: 指页面加载的时候,就会触发的事件;

- **控件事件**: 在控件初始化以后才会存在;


### 全局事件

页面初始化加载事件

- pagebefore (dom 初始化完毕, BUI 及 原生方法未初始化)
- pageinit (dom 及 BUI 初始化完毕, 原生方法未初始化 )
- pageready (dom 及 BUI 及原生方法 初始化完毕 )
- onload (dom 及 BUI 及原生方法 及 图片js资源 都初始化完毕 )

?> UI控件初始化可以在下面执行: 

```js
// dom及bui控件初始化完毕 
bui.on("pageinit",function(){
  // dom ready , bui ready
})
```

?> 多页开发控件及原生方法都必须在`bui.ready` 里面

```js
// dom及bui及原生方法都初始化完毕 
bui.ready(function(){
  // dom ready , bui ready, native ready 
})
```

?> 在PC的加载顺序是 `pagebefore -> pageinit -> pageready -> onload` , 在手机的加载顺序是 `pagebefore -> pageinit -> onload -> pageready` 所以为了方法及dom能正确初始化, 我们的事件监听一般在 `bui.ready` . 

### 控件事件

?>已安装BUI Fast 插件的SublimeText用户, 输入 `bui- + 控件名 + -on`,按<kbd>Tab</kbd>键可以生成以下结构. 

BUI Fast 书写示例: `bui-accordion-on`

```js
// 监听事件
uiAccordion.on("show",function(){
  // 显示的时候做什么事情
})

```
控件的更多事件,请查看[API文档](http://www.easybui.com/demo/api/)

!> <strong class="hint">注意:</strong> 控件的事件监听要在控件初始化之后. 

