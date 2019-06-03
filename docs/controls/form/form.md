# 基本元素

## 按钮效果

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui/btn&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 单选框

?> 单选框的 `name` 属性不能省略.

!> 单选复选的取值跟设置跟普通取值方式不太一样, 建议使用jquery 的 `prop` 去设置. `checkbox` 同样.

```js

// 设置选中
$(".radio").prop("checked",true);

// 设置不选中
$(".radio").prop("checked",false);

// 获取选中状态
var hasChecked = $(".radio").prop("checked");

// 获取某一组单选框选中的值
var val = $('.radio[name="interest2"]:checked').val();


```

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui/radio&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 复选框

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui/checkbox&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 开关按钮

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui/switch&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 滑动条

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui/range&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 进度条

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui/progress&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
