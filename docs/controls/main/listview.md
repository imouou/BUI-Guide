# 交互列表

[查看API](http://www.easybui.com/demo/api/classes/bui.listview.html)

?> 滑动类效果,请使用扫码在手机操作.

?> 这里面包含2种渲染, 在属性 `status=1`的时候, 以静态渲染为主, 如果里面不包含自定义菜单结构,不渲染.

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.listview&code=html,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## 自动分页+交互列表

?> 留意模板的生成,这里采用静态生成侧滑列表的结构,可以减少渲染, 
- li标签属性 `status=1` 手动拼接侧滑菜单,这样可以避免再次dom操作
- 设置固定高度可以少遍历一次

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.list_listview&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>