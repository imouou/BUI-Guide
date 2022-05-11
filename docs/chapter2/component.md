# 组件

> 组件是一个有独立交互可被复用的代码块，由相同名字的[模板](chapter2/template)+[模块](chapter2/module)组成。模板使用`.html`结尾，模块使用`.js`结尾，默认使用路径名作为组件的名称，无需配置。

### 特点

| 特点                | BUI模块           | BUI组件     
|:--------------------:|:---------------:|:---------------:|
| html文件  |       <span style="color:red">没有</span>      |   有    
| js文件  |       有      |   有    
| 独立作用域  |       有      |   有    
| 自执行  |       <span style="color:red">没有</span>      |   有    

### 组件定义

以按钮为例，默认绑定一个事件。

*pages/components/btn.html*

```html
<!-- 局部样式，非必需 -->
<style>
  .bui-btn {}
</style>
<!-- 结构 -->
<div class="bui-btn">按钮</div>
```

*pages/components/btn.js*
```js
// 定义一个模块
loader.define(function(requires,exports,module,global){
    
    // 通过 module.id 绑定可以防止组件被重复加载导致重复绑定问题
    let mid = module.id;
    let $module = bui.$(`#${mid}`);
    let $btn = $module.find(".bui-btn");
    
    // 通过对象来描述组件的信息，便于维护
    const pageview = {
      init(){
        // 绑定事件
        this.bind();
      },
      bind(){
        $btn.click(function(){
          alert("已经有按钮事件")
        })

        return this;
      }
    }

    // 自执行
    pageview.init();

    // 可以抛出组件里面的方法给外部操作，也可以不抛出
    return pageview
})
```

### 组件加载及传参

#### 1.静态加载

页面打开的时候，就会自动加载标签上的组件，color为自定义传给组件的参数

*pages/main/main.html*
```html
<component name="pages/components/btn" color="primary"></component>
```


#### 2.动态延迟加载

*pages/main/main.html* 

标签多了个 delay属性，需要等待主动调用delay方法才会加载组件

```html
<component id="btn" name="pages/components/btn" delay="true"></component>
```

*pages/main/main.js* 

```js
loader.define(function(requires,exports,module,global){
    // 动态加载
    loader.delay({
        id:"#btn",
        param: {
          color:"primary"
        }
    })
})
```

#### 3. 组件同步加载

1.7.x 支持，需要工程支持

```html
<component id="btn" name="pages/components/btn" delay="true"></component>

```
```js
loader.define(async function(requires,exports,module,global){

  // compBtn 组件可以拿到 init, bind 方法；
  const compBtn = await loader.delay({
    id: "#btn",
    param: {
        color:"primary"
    }
  })

})
```

### 组件接收参数

*pages/components/btn.js*
```js
// 定义一个模块
loader.define(function(requires,exports,module,global){

  // 1.6.x 通过模块的id来获取不同的参数，所有属性的参数都会被拿到. 
  // var params = bui.history.getParams(module.id);
  // 1.7.x
  let params = module.props;

  // 通过 module.id 绑定可以防止组件被重复加载导致重复绑定问题
  let mid = module.id;
  let $module = bui.$(`#${mid}`);
  let $btn = $module.find(".bui-btn");
    
  // 通过对象来描述组件的信息，便于维护
  const pageview = {
      init(){
        // 绑定事件
        this.bind(params);
        this.addColor(params);
      },
      addColor(opt){
        // 增加样式
        opt.color && $btn.addClass(opt.color);
      },
      bind(){
        let that = this;
        $btn.click(function(e){
          // 如果外部传方法，则点击的时候要执行该方法
          params.callback && params.callback.call(that,e)
        })

        return this;
      }
    }

    // 自执行
    pageview.init();

    // 可以抛出组件里面的方法给外部操作，也可以不抛出
    return pageview

})
```

### 组件预览及传参

组件可以单独预览，在网址中的路径 `index.html# + 组件名`的形式；

方式1: 普通调试
```
index.html#pages/components/btn

index.html#pages/components/btn?color=primary 
``` 

方式2: 微信开发的回调域名不允许使用hash值，要改成? 的形式
```
index.html?module=pages/components/btn

index.html?module=pages/components/btn&color=primary 
``` 


*效果预览*
<div class="phone">
  <div class="bui-btn primary" onclick="alert('已经有按钮事件')">按钮</div>
</div>

