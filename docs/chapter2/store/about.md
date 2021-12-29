
# 介绍

我们按照vue的接口设计了一个不一样的数据驱动方式, 如果你熟悉vue, 很容易上手.

!> 注意: 使用 `bui.store` 意味着放弃安卓低版本的兼容, 比方安卓4.3 的浏览器对这种数据解析方式支持不太好, 打包影响不大, 取决于打包的内核. 

?> 这个目前还不支持复杂的对象处理, 建议设计的时候, 层级在2层左右. 如果一定要多层级, 可以使用 `this.setState("xx.xxx",value)` 这种方式可以确保一定会触发对应的数据变更. 

[查看示例](http://easybui.com/demo/#pages/store/index)


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/index" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
