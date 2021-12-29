
# 模板语法

?> 数据改变的时候应该做什么事情, 这是通过行为属性去绑定的.

## 行为属性语法

| **属性名**             | **语法示例**    | **语法描述**    |
|:--------------------|:----------------|:-----------------|
| b-text  | `<b b-text="page.size"></b>`   | 设置文本,一般使用 b 标签 |
| b-html  | `<div b-html="page.size"></div>`   | 设置html,html一般使用div标签 |
| b-value  | `<input b-value="page.size"/>`   | 设置value, b-value属性,必须是input标签 |
| b-show  | `<b b-show="page.isShow"></b>`   | 显示当前dom, `page.isShow=false;` 则控制不显示. 初始化的时候是隐藏,则设置 `<b b-show="!page.isShow"></b>` |
| b-model  | `<input b-model="page.size"/>`   | 双向绑定,会把当前值,设置到value属性,并监听value的改变,改变又会重新设置 `page.size` 的值 |
| b-bind  | `<b b-bind="page.attrs"></b>`   | 设置属性, key值为属性名, 结果: `<b title="我是动态标题"></b>`|
| b-style  | `<b b-style="page.styles"></b>`   | 设置style的样式, key值为样式属性, 结果: `<b style="color:red;border:1px solid #ddd"></b>` |
| b-class  | `<b b-bind="page.classNames"></b>`   | 设置class的样式, 结果: `<b class="active"></b>`, classNames可以是对象,也可以是字符串,或者是布尔值 |
| b-template  | `<ul b-template="page.list"></ul>`   | 绑定模板,page.list的数据更新会及时反应到页面上 |
| b-command  | `<ul b-template="page.list" b-command="append"></ul>`   | 非必须,配合b-template一起使用,代表第一次模板渲染采用什么方法, 默认是html, append, prepend |
| b-children  | `<ul b-template="page.list" b-children="li"></ul>`   | 非必须,配合b-template一起使用, 代表子集的元素,当子集里面有其它布局元素干扰的时候,才做配置, 可以是标签,类名 |
| b-click  | `<b b-click="page.openDialog"></b>`   | 点击事件, openDialog 在 methods 定义.  |
| b-target  | `<div class="parentDom"><b b-click="page.openDialog" b-target=".parentDom"></b></div>`   | 1.5.2新增 可以控制当前this的指向,这样会影响到 $index $this 等内置值,会在当前往上查找 b-target. 一般用于嵌套的层级过深,找不到父级index使用  |
| b-src  | `<img b-src="page.imgurl" />`   | 1.5.2新增 动态图片地址 |
| b-href  | `<a b-href="page.linkurl"></a>`   | 1.5.2新增 动态跳转地址 |


!> 注意, `b-`语法属性不能在dom动态修改的时候解析.

?> 行为属性可以让你减少手动操作dom的机会, 但却不是任何时候都应该使用这种属性, 理解什么是需要改变的数据很重要. 比方购物车,购物车的商品的数量改变的时候,需要去重新计算金额,总数量,总金额就可以采用这种绑定, 而像商店名称这些, 应该在整个模板上去处理.
