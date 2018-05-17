# 动画交互

?> 合理的使用动画让人身心愉悦, 给予用户适当的反馈,可以增强用户操作体验.

## 动画切换器
### bui.toggle(option) 
[点击预览](http://www.easybui.com/demo/#pages/ui_method/bui.toggle)

?> 基于`animate.css`的部分动画交互效果,统一了动画进场,出场的交互方式. 像 `bui.dialog`,`bui.router` 的交互都是基于 `bui.toggle` 实现.  


*参数: option是一个对象 *

#### option.id
- Type: `string|object`
- Detail: `要执行动画的元素ID,或对象`

#### option.effect
- Type: `object`
- Detail: `动画效果, showIn(无动画) | fadeIn | fadeInLeft | fadeInRight | fadeInDown | fadeInUp | zoomIn | bounceIn | rotateIn | flipInX | flipInY`

*例子:*
```html
<div id="toggle" style="width: 100px;height: 100px;background: red;"></div>
```
```js
var toggle = bui.toggle({id:"toggle"});
    
    // 显示
    toggle.show();
    // 隐藏
    toggle.hide();
```

## 动画控制器
### bui.animate(option) 
[点击预览](http://www.easybui.com/demo/#pages/ui_method/bui.animate)

?> 直接对元素执行`transform`动画

*参数: option是一个对象 *

#### option.id
- Type: `string|object`
- Detail: `要执行动画的元素ID,或对象`

*例子:*
```html
<div id="btn1" class="bui-btn">
  触发动画
</div>
<div id="bar1">我是动画元素</div>
```
```js
var uiAnimate = bui.animate({id:"#bar1"});

    $("#btn1").on("click",function () {
      uiAnimate.stop().left(100).start(function () {
        this.skewX(10).start(function () {
          this.left(200).start()
        });
      })
    })
```

!> 先`stop()` 是为了清空之前的动画,在初始化位置位移,如果不要stop,则是继续位移,可以一直执行
