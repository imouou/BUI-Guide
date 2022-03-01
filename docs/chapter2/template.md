# 模板

> 模板是一个html结构，不能引入脚本或样式。

*main.html* 
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

> 模板里面可以增加局部样式. 1.7.x 以上版本不会影响全局样式。

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
