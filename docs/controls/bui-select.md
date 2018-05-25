# bui.select: 选择菜单

## 列表刷新及加载

?> 列表控件 = `bui.scroll+bui.ajax`; 非常简单,重点理解 `field` 的字段配置. 你只需要传接口,模板,就会自动请求分页. 除非特殊功能无法满足,不然建议使用 `bui.list` 代替 `bui.scroll`

<iframe width="100%" height="450" src="https://code.hcharts.cn/easybui/NtNLXs/share/result,js,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 列表下拉刷新+侧滑列表

?> 留意模板的生成,这里采用静态生成侧滑列表的结构,可以减少渲染, 
- li标签属性 `status=1` 手动拼接侧滑菜单,这样可以避免再次dom操作
- 设置固定高度可以少遍历一次

<iframe width="100%" height="450" src="https://code.hcharts.cn/easybui/NtNLXs/1/share/result,js,html,css" allowfullscreen="allowfullscreen" frameborder="0"></iframe>