# bui.list: 列表刷新及加载

## 效果预览
![控件预览](http://www.easybui.com/static/images/controls/bui-list_low.gif)

!> 滑动类控件需要开启chrome才能模拟手机下拉效果, 可以扫码在手机全屏预览.

## 列表刷新及加载

?> 列表控件 = `bui.scroll+bui.ajax`; 非常简单,重点理解 `field` 的字段配置. 你只需要传接口,模板,就会自动请求分页. 除非特殊功能无法满足,不然建议使用 `bui.list` 代替 `bui.scroll`

<iframe width="100%" height="450" src="https://jshare.com.cn/easybui/NtNLXs/share/js,html,css,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 列表下拉刷新+侧滑列表

?> 留意模板的生成,这里采用静态生成侧滑列表的结构,可以减少渲染, 
- li标签属性 `status=1` 手动拼接侧滑菜单,这样可以避免再次dom操作
- 设置固定高度可以少遍历一次

<iframe width="100%" height="450" src="https://jshare.com.cn/easybui/NtNLXs/1/share/js,html,css,result" allowfullscreen="allowfullscreen" frameborder="0"></iframe>