# 插件扩展

## 以一个折叠菜单为例

![折叠菜单交互](http://www.easybui.com/static/images/controls/bui-accordion_low.gif)

## 控件分析

### 控件结构
> 一个点击显示隐藏的效果, 并且点击的时候, 会先把展开进行隐藏, 再展开自己的. 从界面上我们来看看结构的设计.

```html
<!-- 一般控件最外层就是控件的容器名 -->
<div class="bui-foldmenu">
    <div class="bui-foldmenu-item">菜单</div>
    <div class="bui-foldmenu-content">内容</div>
    <div class="bui-foldmenu-item">菜单2</div>
    <div class="bui-foldmenu-content">内容2</div>
</div>
```

> 这里我们采用的是并列同级的方式, 那结构写起来有点麻烦, 其实这个结构跟 dl,dt,dd 是一致的, 那我们完全可以优化成以下结构.

```html
<!-- 一般控件最外层就是控件的容器名 -->
<dl class="bui-foldmenu">
    <dt>菜单</dt>
    <dd>内容</dd>
    <dt>菜单2</dt>
    <dd>内容2</dd>
</dl>
```

> bui的设计是基于按钮的原型撑开容器的方式, 这样可以保持每个容器都是一致的标准高度, 所以我们再对结构进行优化.

```html
<!-- 一般控件最外层就是控件的容器名 -->
<dl class="bui-foldmenu">
    <dt class="bui-btn">菜单</dt>
    <dd>内容</dd>
    <dt class="bui-btn">菜单2</dt>
    <dd>内容2</dd>
</dl>
```

> 像刚刚效果图,菜单的点击还会有图标的切换, 再结合布局来得到以下结构, 一切皆布局, 一切皆容器.

```html
<!-- 一般控件最外层就是控件的容器名 -->
<dl class="bui-foldmenu">
    <dt class="bui-btn bui-box"><div class="span1">菜单</div><i class="icon-foldmenu"></i></dt>
    <dd>内容</dd>
    <dt class="bui-btn bui-box"><div class="span1">菜单2</div><i class="icon-foldmenu"></i></dt>
    <dd>内容2</dd>
</dl>
```

### 控件样式
一般作为插件的独立样式引入, `bui-foldmenu.css`文件
```css
.bui-foldmenu {}

.bui-foldmenu>dt,
.bui-foldmenu>[class*=bui-btn] {
    border: 0;
    border-bottom: 1px solid #eee;
}
/*  默认隐藏内容 */
.bui-foldmenu>dd {
    display: none;
    border: 0;
    overflow-y: auto;
    border-bottom: 1px solid #eee;
    background: #fff;
}
/*  图标 */
.bui-foldmenu .icon-foldmenu {
    -webkit-transition: -webkit-transform 0.3s ease-in-out 0s;
    transition: transform 0.3s ease-in-out 0s;
}
.bui-foldmenu .icon-foldmenu:before {
    content: "\e649";
}
/* 激活的时候显示block */
.bui-foldmenu>.active+dd {
    display: block;
}
/* 激活的二级菜单的时候,把箭头翻转 */
.bui-foldmenu>.active .icon-foldmenu {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
```
> 样式里面就默认隐藏内容标签(dt相邻的dd),由控件初始化, 其它都是一些修饰, 设置激活状态的时候,箭头翻转.

### 控件脚本

> 1.5.4 新增 bui.extend 方法,可以用来扩展插件, 并且保持跟 bui原本的使用方式一致.

#### bui.extend 控件参数是一个对象, 其中包含以下参数

- name `string` 控件名称
- config `object` 控件默认参数
- callback `function` 控件的逻辑

1. 最简单的版本

```js
// 最简单的版本
bui.extend({
    name: "foldmenu",
    config: {
        id: ""
    },
    callback: function(opt) {

        // that 指向插件的抛出的公共方法, option widget 等
        let that = this;
        // this.config 为已经跟初始化参数合并以后的结果;
        let param = this.config;
        // 缓存选择器
        let $id = null;

        // 要抛给开发者的方法
        that.init = function(option) {
            // 对直接调用init方法的参数进行合并
            param = $.extend(true, {}, param, option);

            // 单页多页选择器,如果是单页,这个插件只能在模块里面用, 不能在bui.ready
            $id = bui.$(param.id);

                // 绑定事件,点击的时候增加激活样式
            $id.children("dt").click(function(e) {
                var hasActive = $(this).hasClass("active");
                if (hasActive) {
                    $(this).removeClass("active");
                } else {
                    // 加上样式以后会自动对箭头及下一层级展示处理;
                    $(this).addClass("active");
                }
            })

            return that;
        }

        // 如果有依赖bui控件,应该在这里写,这样方便外部调用
        // that.widgets.loading = ui.loading({
        //     appendTo: opt.id
        // });

        // 如果需要销毁的生命周期,则在这里加上.
        // that.beforeDestroy = function() {
        //
        //     return that;
        // }

        // 必须传id
        if (!param.id) {
            // 抛出错误
            bui.showLog("必须传id参数.")
            return that;
        }
        // 默认先初始化一次
        return this.init(opt);
    }
});

```

### 控件使用

```html
<dl id="folder" class="bui-foldmenu">
    <dt class="bui-btn">菜单</dt>
    <dd>内容</dd>
    <dt class="bui-btn">菜单2</dt>
    <dd>内容2</dd>
</dl>
```

```js
  // 初始化
  var uiFloder = bui.foldmenu({id:"#folder"})

  // uiFloder.config 可以拿到一些实例的参数
```

### 插件预览

[在线预览bui.folder插件](http://www.easybui.com/demo/index.html#pages/ui_controls/bui.extend)

## 完善插件


### 用闭包防止全局污染
> 放在一个闭包里,这样可以防止控件受到污染, `window.libs` 指的是 `zepto` 或者 `jquery`, 当你去掉引入 zepto.js 的时候, 引入 `jquery.js` 就可以完美切换成jquery版本. (jquery版本建议在: 1.9.x - 1.11.x)

```js
;(function(ui, $) {
    "use strict";


})(window.bui || {}, window.libs);
```

### 加上注释

```js
/* @namespace bui
  *  @class foldmenu
  *  @constructor
  *  @param {object} option
  *  @param {string} option.id [控件id]
  *  @param {string} [option.handle] [点击的区域]
  *  @param {number} [option.height] [父层高度,0则自适应]
  *  @param {string} [option.target] [要显示隐藏的目标]
  *  @param {number} [option.targetHeight] [目标自适应高度还是限制高度]
  *  @param {boolean} [option.single] [ false(显示多个) || true(一次只折叠一个) ]
  *  @param {function} [option.onInited] [ 1.5.1新增 初始化以后触发 ]
  *  @param {function} [option.callback] [ 点击按钮的回调 ]
  *  @example
  *
  */
```

### 完整版

```js
;(function(ui, $) {
    "use strict";
    /* @namespace bui
      *  @class foldmenu
      *  @constructor
      *  @param {object} option
      *  @param {string} option.id [控件id]
      *  @param {string} [option.handle] [点击的区域]
      *  @param {number} [option.height] [父层高度,0则自适应]
      *  @param {string} [option.target] [要显示隐藏的目标]
      *  @param {number} [option.targetHeight] [目标自适应高度还是限制高度]
      *  @param {boolean} [option.single] [ false(显示多个) || true(一次只折叠一个) ]
      *  @param {function} [option.onInited] [ 1.5.1新增 初始化以后触发 ]
      *  @param {function} [option.callback] [ 点击按钮的回调 ]
      *  @example
      *
      */
      ui.extend({
          name: "foldmenu",
          config: {
              id: ""
          },
          callback: function(opt) {

              // that 指向插件的抛出的公共方法, option widget 等
              let that = this;
              // this.config 为已经跟初始化参数合并以后的结果;
              let param = this.config;
              // 缓存选择器
              let $id = null;

              // 要抛给开发者的方法
              that.init = function(option) {
                  // 对直接调用init方法的参数进行合并
                  param = $.extend(true, {}, param, option);

                  // 单页多页选择器,如果是单页,这个插件只能在模块里面用, 不能在bui.ready
                  $id = ui.$(param.id);

                      // 绑定事件,点击的时候增加激活样式
                  $id.children("dt").click(function(e) {
                      var hasActive = $(this).hasClass("active");
                      if (hasActive) {
                          $(this).removeClass("active");
                      } else {
                          // 加上样式以后会自动对箭头及下一层级展示处理;
                          $(this).addClass("active");
                      }
                  })

                  return that;
              }

              // 如果有依赖bui控件,应该在这里写,这样方便外部调用
              // that.widgets.loading = ui.loading({
              //     appendTo: opt.id
              // });

              // 如果需要销毁的生命周期,则在这里加上.
              // that.beforeDestroy = function() {
              //
              //     return that;
              // }

              // 必须传id
              if (!param.id) {
                  // 抛出错误
                  ui.showLog("必须传id参数.")
                  return that;
              }
              // 默认先初始化一次
              return this.init(opt);
          }
      });

})(window.bui || {}, window.libs);
```

## 结语

上面我们示例了一个最简单的插件的开发及使用, 但插件的适应性还不够, 还需要考虑各种扩展性,复杂的场景如何去适应, 比方内容是需要固定高度,选择器换成其它,只展示一个,等各种需求都不能满足, 我们需要考虑更多的场景, 抽取更多的变量作为可配置.
