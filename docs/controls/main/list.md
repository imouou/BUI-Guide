# 下拉刷新及滚动加载

[查看 API](http://www.easybui.com/guide/api/classes/bui.list.html)

## 自动分页加载

!> 滑动类控件需要开启 chrome 才能模拟手机下拉效果, 可以扫码在手机全屏预览.

?> bui.list`重点理解`field`的字段配置. 你只需要传接口,模板,就会自动请求分页. 除非特殊功能无法满足,不然建议使用`bui.list`代替`bui.scroll`. 当第 1 页的数目加起来还不足出现滚动条的高度的时候,会自动请求下一页.

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.list&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 自定义分页加载

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.scroll&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 自动分页+交互列表

?> 留意模板的生成,这里采用静态生成侧滑列表的结构,可以减少渲染,

- li 标签属性 `status=1` 手动拼接侧滑菜单,这样可以避免再次 dom 操作
- 设置固定高度可以少遍历一次

<iframe width="100%" height="560" src="http://www.easybui.com/demo/source.html?url=pages/ui_controls/bui.list_listview&code=full,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
