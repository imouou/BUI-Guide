# BUI 版本更新日志


## 目录
[TOC]


## 1.4.4 20180501

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台
```
# 更新 webapp 平台 bui.css, bui.js 
$ buijs update   

# 更新 dcloud 平台 bui.css, bui.js 
$ buijs update -p dcloud   

# 更新 apicloud 平台 bui.css, bui.js 
$ buijs update -p apicloud 

# 更新 appcan 平台 bui.css, bui.js 
$ buijs update -p appcan    
```

会自动更新最新的 bui.css bui.js 文件

新增:

发短信 bui.unit.sms
打电话 bui.unit.tel
发邮件 bui.unit.mailto

综合方法,保持跟href写法一致. 发短信,打电话,发邮件 bui.unit.openExtral

### 重要修改

### 优化-修复-维护

#### bui.upload 
1. 修复 上传文件的 data 不能附带参数问题

#### bui.list
1. 修复refresh方法的分页错乱问题 (未修复)

#### bui.list, bui.pullrefresh, bui.slide, bui.scroll, bui.dialog
1. 修复高度自动计算时,受键盘影响问题

#### bui.accordion
1. 修复配合全局初始化,在单页使用时导致部分失效的问题

#### bui.slide
1. 修复纵向滑动时,高度不支持rem问题

#### bui.array
1. 修复 bui.array.remove 删除普通数组只删除一个的问题;
1. 修复 bui.array.filter 过滤普通数组的匹配问题;


## 1.4.3 20180427

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台
```
# 更新 webapp 平台 bui.css, bui.js 
$ buijs update   

# 更新 dcloud 平台 bui.css, bui.js 
$ buijs update -p dcloud   

# 更新 apicloud 平台 bui.css, bui.js 
$ buijs update -p apicloud 

# 更新 appcan 平台 bui.css, bui.js 
$ buijs update -p appcan    
```

会自动更新最新的 bui.css bui.js 文件


### 重要修改

修复 bui.ajax 不进入 fail 状态.

修复字体图标冲突, 当你加入新的字体图标时, 会出现图标冲突的情况, 需要替换新的 bui.css 文件, 另外新的图标命名, 不要使用 icon- 开头, 可以是 icons- 啥的.

### 优化-修复-维护

#### bui.select 
1. 修复bui.select的onChange事件, 只有值改变的时候才触发
2. 新增 appendTo 参数, 便于跟单页绑定

#### bui.router
1. 新增 "preloadend" 预加载结束事件
2. 修复路由在bui.ready无法初始化问题
3. 新增indexModule 参数,用于修改首页的指向
4. 新增initScroll 方法,用于手动修改footer显示隐藏,main的高度不准确问题
5. 修复 有键盘时,跳转的时候, 页面高度不准确问题
6. 支持链接是 tel: 开头,会调用拨打电话功能, sms: 发短信 , mailto: 写邮件


#### bui.loader
1. 修复return, exports 导出模块以后,重复加载模块, 如果有控件抛出,控件的引用是第一次的控件.
2. 修复多页开发使用bui.loader 定义的依赖模块,baseUrl的相对路径问题 not done.
3. 修复定义的第三方依赖的模块

#### bui.dialog
1. 新增 appendTo 参数, 便于跟单页绑定

#### bui.actionsheet
1. 新增 appendTo 参数, 便于跟单页绑定

#### bui.pickerdate
1. 新增 appendTo 参数, 便于跟单页绑定

#### bui.scroll
1. 新增 scrollTop 方法, 用于单页A标签无法处理的锚点跳转


#### bui.checkVersion
1. 修复不支持打开https 
2. 简化ios下载


#### bui.load
1. 支持链接是 tel: 开头,会调用拨打电话功能, sms: 发短信 , mailto: 写邮件

#### bui.btn
1. 支持链接是 tel: 开头,会调用拨打电话功能, sms: 发短信 , mailto: 写邮件


#### bui.slide
1. tab模式下,新增按钮的disabled 属性或样式, 阻止点击跳转, 这样便于使用其它跳转方式
2. 在纵向滚动下, rem 的高度缩放存在问题
3. 修复to事件监听,在动态加载tab时,webapp存在延迟会导致js先执行,再渲染模板
3. 新增autoheight 参数, 便于在一些特殊情况使用, 比方tab 是在中间部分,由内容决定高度


#### bui.listview
1. 修复默认宽度只能是屏幕宽度问题
2. 删除 height 参数
2. 新增menuWidth,menuHeight 等参数

#### bui.swipe
1. 修复默认宽度只能是屏幕宽度问题

#### bui.number
1. 新增onInput参数



## 1.4.2 20180329

### 升级指南
** 一, 资源替换: **

执行命令, 选择你使用的平台
```
# 更新 webapp 平台 bui.css, bui.js 
$ buijs update   

# 更新 dcloud 平台 bui.css, bui.js 
$ buijs update -p dcloud   

# 更新 apicloud 平台 bui.css, bui.js 
$ buijs update -p apicloud 

# 更新 appcan 平台 bui.css, bui.js 
$ buijs update -p appcan    
```

会自动更新最新的 bui.css bui.js 文件

### 重要修改

#### buijs cli 升级, 已经安装过的朋友,需要重新安装, 
windows: 
```
npm install -g buijs
```
mac: 
```
sudo npm install -g buijs
```

1. 修复创建工程时,没有网络不进行处理;
2. 修改了目录工程规范, 新建项目全部在 src 目录下, 对旧项目没有影响; 
3. 支持自动编译,开启服务器,允许接口跨域等问题, 减少对工具的依赖; 使用方法请查看 buijs的readme.md 

#### 新增 BUI-fast ATOM编辑器插件


### 新增

#### bui.array 
1. 新增, 把常用的数组比对放在这个对象里, 不再有 bui.inArray, bui.compareArray 等这些都在 bui.array 里面查找

所有控件,新增控件的 destroy 方法, 用于销毁事件,内容,释放内存, 一般用在单页路由的后退上.


### 优化-修复-维护

#### bui.router 
1. 新增preload方法,预加载错误页面
2. 新增 currentPage 方法,可以获得当前的对象, 可以解决重复加载的页面模块,以及重复加载的控件
3. 修复页面切换进度条问题
4. 修复loadpart局部加载的重复加载问题
5. 修复替换页面,替换的页面为已经加载过的页面,会导致无法后退问题 
6. 修复无法重复替换页面问题
7. 修复替换页面以后,如果替换的页面是已经存在历史记录的,再点击跳多一层, 这时后退的应该是最靠近最后一层的数据. 之前是取最前面的历史记录
8. 刷新也会加载iframe地址, 模块名不能以 http:// 或者 https:// 开头
9. 修复后退问题 
10. 路由加载同一个页面的id重复问题
11. 通过网址修改地址,会导致页面后退问题
12. 修复刷新问题 
13. 单页应用跟单页应用的交互
14. 修复先require一个模块,路由跳转的时候,就不再触发的问题
15. 优化页面切换速度,更快
16. 修复连续跳转时, 不能后退问题
17. 修复无网络时,点击页面,再恢复网络时,触发不了事件
18. 修复先map配置首页后, 使用replace方法还会有历史记录

19. 支持iframe跳转
20. 控件事件监听里面 currentTarget 统一改为 target; 
21. 修复bui.getPageParams 刷新传参失效;
22. 修复bui.getPartParams 局部加载接收不到 

#### bui.loader
1. 修复checkLoad方法,不能单独检测一个模块
2. 修复module.exports 的导出不被认可
3. 修复loader.require 不能引入对应的模块

#### bui.pickerdate
1. 修复 cols 修改以后,显示时,布局凌乱

#### bui.pullrefresh
1. 修复 底部菜单是原生框时, 下拉刷新滑动距离过长,会导致不会触发.
2. 新增 stopHandle 参数, 禁止操作的样式名

#### bui.scroll
1. 新增 stopHandle 参数, 禁止操作的样式名


#### bui.slide 
1. to 方法,增加路径名跳转,自动查找对应的索引
2. 新增 stopHandle 参数, 禁止操作的样式名


#### bui.load 
1. 新增iframe参数,用于单页加载外部网址
1. 新增reload参数,用于单页应用跳转到另外一个单页应用


#### bui.list 
1. 修复callback 的事件绑定,会导致子集的冒泡无法阻止
2. 新增 stopHandle 参数, 禁止操作的样式名
3. 修复与vue一起协作时,高度过高但只请求一页,接下来不再触发的问题

#### bui.swipe 
1. 新增 stopHandle 参数, 禁止操作的样式名

#### bui.number 
1. 去除最大最小值的默认提醒,由用户自行定义
2. 修复输入超出最大值,改为最小值,却不能点击问题
3. 修复change事件,触发条件为值改变就触发


#### bui.dialog 
1. 修复宽度高度在定位为left,rigiht,top,bottom 时无效.





## 1.4.1 20180131

### 升级指南
** 一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css


### 新增


### 优化-修复-维护

#### bui.isWebapp 设置
用于替换 bui.debug. 同时也兼容旧的方式, 所以对熟悉的你没有影响.

bui.isWebapp = true; 则使用web方法, 
bui.isWebapp = false; 代表打包,使用原生方法

#### bui.router 
1. 修复 loader.define 单独定义个对象问题
2. 优化页面切换速度,更快
3. 修复连跳2层后退以后的层级问题
4. bui.back || router.back 支持 name 属性,指定后退到某一个层级
5. 支持动态加载第三方网址 not ok

重要: 
6. 修复物理按键快速点击导致无法后退问题 ok.
7. 修复动态加载外部页面无法回退问题,部署的时候需要设置reloadCache,如果默认为true不利于调试 ok.

#### bui.loader 
1. 修复在中兴z802t 安卓4.3系统加载不了模块问题

#### bui.accordion
1. 修复showFirst方法有href的时候跟bui.load 冲突

#### bui.storage
1. 修复默认数字1问题
2. 修复对多维对象存储及获取不够完整
3. 修复覆盖新版本以后,旧版报错

#### bui.slide
1. 修复配合单页以后的高度计算问题

#### bui.sidebar
1. 修复配合单页以后双侧滑遮罩及错位问题
2. 修复sidebar在oppo手机侧滑滚动触发关闭问题

#### bui.select
1. 修复配合单页以后弹出的遮罩问题,需要手动关闭遮罩

#### bui.list
1. 修复配合单页以后高度计算问题

#### bui.scroll
1. 修复配合单页以后高度计算问题

#### bui.pullrefresh
1. 修复配合单页以后高度计算问题

#### bui.dropdown
1. 修复相对定位覆盖绝对定位


#### bui.mask
1. 修复公用遮罩的回调只有第一个可以点击的情况




## 1.4.0-beta 20171224

### 升级指南
** 一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css


### 新增

#### 1. bui.router 单页路由
#### 2. bui.loader 模块化,配合单页一起使用
#### 3. bui.prompt 输入对话框
#### 4. bui.copyArray 数组复制方法

### 优化-修复-维护
修复控件的 option 方法不能获取id 的值.
完善报错机制, 可以通过 bui.trace = true 拿到报错的调用栈
统一了控件的事件监听, 点击事件,this=dom本身, 其它事件, this=ui 控件本身


#### bui.upload
1. 修复web 上传可以看到上传控件,并且滚动的问题
2. 支持web,ios,安卓上传
3. 修复原生上传的this问题

#### bui.loading
1. 修复多次start, 在stop的时候,只是移除遮罩,loading还存在的问题

#### bui.toggle
1. 新增按顺序显示隐藏参数
2. 新增几种页面动画

#### bui.slide
1. 新增autoload 参数,可以动态加载html到对应的内容
2. 新增load 事件,配合动态加载以后的事件处理
3. 新增load 方法,动态增加页面
4. 修复微信里面使用lock 导致在往下滑动操作会返回第一页
5. 模拟路由,配合多页开发使用,解决后退无法刷新问题

#### bui.accordion
1. 支持嵌套


#### bui.dialog
1. 可以自由配置动画效果

#### bui.pickerdate
1. 修复弹窗模式IOS下打开缓慢问题.

#### bui.removeArray  
1. 修复无法删除普通数组问题,受影响的有 bui.storage 

#### bui.pickerdate, bui.select , bui.actionsheet, bui.accordion, bui.dropdown, 都加了disabled方法跟 enabled 方便控制是否触发弹窗

## 1.3.5 20170710

### 升级指南
** 一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css

### 优化viewport

### 支持requirejs

### 优化-修复-维护
修复控件的 option 方法不能获取id 的值.



## 1.3.4 20170628

### 升级指南
** 一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css

### 样式
1. 新增流式等列布局, 具体查看 ui/layout.html 的底部,可以解决流式布局遇到5等分,7等分等情况. (替换 bui.css )


### 优化-修复-维护
#### bui.init 
1. 支持自定义选择器计算main 的值

#### bui.dialog
1. 修复静态绑定对事件的处理. 

#### bui.slide
1. tab菜单滑动多个的时候,iphone会有滚动条,现在统一去掉.
2. 新增 direction:"y" 时,有滚动优先处理滚动再做滑动处理.
3. 新增 全屏效果示例.
4. 新增 alignClassName 参数,可以控制滑动内容的对齐方式,主要在全屏下的对齐;
5. autopage true 参数导致没有点击事件.
6. 修复 menu 为id 时, 无法点击事件.
7. 修复tab嵌套slide循环嵌套时外层无法滑动

#### bui.dropdown
1. 修复监听 change事件的时候,会触发2次问题
1. 修复监听 change事件的时候,value方法获取不到值 
3. 新增 三级联调菜单效果,基于vue的例子
4. 修复显示三角不显示问题.

#### bui.select
1. 修复 value("11,22") 设置多个值的时候,会导致值永远是设置的值.
2. 修复在无值或者值的格式不对是,会导致报错无法继续.
3. 新增 三级联调菜单效果demo 
4. 新增 静态自定义选择列表的demo ui_controls/bui.select.html

#### bui.listview
1. 动态渲染的内容高度自适应问题(之前是统一高度)
2. 新增bui.listview 删除整行效果
2. 新增bui.listview 配合dialog效果

#### bui.swipe
1. 新增alwaysTrigger 参数,控制滑动的距离不管达不达标都会触发一次open或者close事件, 默认为false 不触发, 用于频繁判断操作.
2. 新增isActive 方法,判断状态打开还是关闭

#### ui/form_edit.html
1. 整理编辑表单的单选多选列表结构示例(支持整行点击触发)


#### 解决在mx6浏览器整个页面上移不会还原的bug
1. 部分手机当页面有输入框聚焦, 会出现页面上移,但取消焦点,页面不会返回原来样子, 替换 bui.css

### 优化文档的展示


## 1.3.3 20170426

### 升级指南
** 一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css
3. (必须) 替换bingotouch.js

### 优化-修复-维护

#### bui.list 
1. 修复多次调用init不请求的问题 (严重,在跟searchabr合作使用问题明显)

#### bui.scroll 
1. html结构下面的list, 右边没有箭头时无法点击, 替换 bui.css 文件

#### bui.swipe
1. 在打开的时候,滑动条件无法达到关闭时,会导致页面无法关闭, (listview,sidebar)都会受到影响.
2. 新增模拟日历复杂交互场景( bui.swipe_date.html )
3. 打开状态下,双手指操作,导致移动错位(严重).

#### bui.pickerdate
1. 修复在IOS下,只显示年月会导致ios下无法滚动(严重).

#### bui.slide
1. 修复slide嵌套swipe,listview一起使用时, swipe参数为false,切换tab会导致swipe,listview无法滑动(手机才有).


#### bui.upload
1. 修复华为手机无法预览图片跟上传图片( web 模式).

#### bui.pickerdate
1. 方法更改支持链式调用.


#### 新增入门文档
1. 嵌入离线文档并进行手机适配.
2. 嵌入快速入门文档.


## 1.3.2 20170331

### 升级指南
**  一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css

### 重要修改
1. 支持 jQuery (2.0以上) 跟 Zeptojs 库, 如果需要用到jquery库,则不引用zepto.js (正常Zeptojs 也能满足需求). 如果更改为 jquery 库, 需要替换 bingotouch.js 的精简版 ( 49k ) .

2. bui.pullrefresh (bui.list bui.scroll也会受影响) 跟 bui.slide 的事件冲突问题

### 优化-修复-维护

#### bui.slide 
1. 修复顶部导航的滑动菜单未完全展示
2. 修复全屏时高度计算不准确
3. 修复滑动过程会触发click事件(安卓4.3)

#### bui.pullrefresh 
1. 修复 fail 方法, 数据调用失败时不显示提醒
2. 修复 失败时无法请求数据
3. 修复 滑动过程中出现第2个手指会中断原本的操作

#### bui.viewport
1. 优化 meta 重复创建问题

#### bui.list
1. 新增 modify 方法,便于修改多个参数 跟 option 的区别在于, option 修改了多个参数会执行初始化. . 
2. init 多次执行会导致列表请求的时候多次请求, 这个单独使用没问题, 跟 bui.searchbar 配合才出现的问题.

#### bui.swipe
1. 上下滑动,只能滑出来,不能滑动回去
2. 新增 targetMove 参数, 可以控制目标不跟着移动.
3. 新增 bui.swipe_down.html 的示例, 可以只滑一半.
4. 上下滑动跟滚动条的交互问题
5. 新增 initDistance 参数初始化handle的距离, 具体使用场景: bui.swipe_down.html

#### bui.select
1. 初始化 init 多次会创建多个select 


#### 微信版样式
1. 样式美化



## 1.3.1 20170317

### 升级指南
**  一, 资源替换: **

1. (必须) 替换bui.js
2. (必须) 替换bui.css

** 二, 重要修改: **

1. bui.searchbar 跟 bui.list 的操作变了, 原本 list 的option 修改参数以后,会执行初始化请求, 现在 bui.list 的 option 只做参数修改, 初始化需要调用 init 方法.

### 优化-修复-完善
#### CSS bui-navbar
1. 结合 bui-nav 变成按钮自适应横向滚动, li标签在书写时,之间不要有空白.
2. 增加demo ui/nav.html

#### bui.ready 
1. 增加$.Deferred的扩展,支持类似 ajax 一样的操作
2. 如果需要在多处地方调用ready 可以监听pageready事件

#### bui.getPageParams 
1. 增加$.Deferred的扩展,支持ajax 一样的操作, 这样就不用所有业务都写在回调里面, 原来的方式不受影响
2. 增加示例演示 示例: ui_method/bui.getPageParams.html

#### bui.mask 
1. 遮罩改为共用遮罩,一次只能触发一个遮罩,这样可以节省部分dom操作
2. 修复部分控件使用下

#### bui.loading 
1. 进度在body下改为共用,一次只能触发一个进度条,这样可以节省部分dom操作

#### bui.dialog 
1. 弹窗打开的时候,如果是autoClose: true, 快速点击遮罩会导致弹窗无法 

#### bui.pickerdate 
1. 简化formatValue 参数跟方法,通过formatValue: "yyyy-MM-dd hh:mm" 控制显示的字段;
2. 新增on 事件监听
3. 新增 pickerdate 更多使用场景demo  示例: ui_controls/bui.pickerdate.html
4. 修复 pickerdate api 文档里的参数错误
5. 修复 pickerdate 在iphone可能会打开的时候扭成一团

#### bui.animate 
1. 完善animate的动画demo 示例: ui_method/bui.animate.html

#### bui.toggle  
1. 完善toggle的动画demo 示例: ui_method/bui.toggle.html
2. 修复快速点击可能导致的显示错误情况

#### bui.slide  
1. 修复 on("to") 只能监听到调用 to 方法而不是每次都会触发的问题
2. 完善 bui.slide 跟顶部导航出现横向滚动的情况的示例 示例: ui_controls/bui.slide_tab.html

#### bui.btn  
1. 修复在开启遮罩进行原生跳转的时候,点击返回需要手动关闭遮罩的问题

#### bui.searchbar
bui.searchbar 支持显示中文搜索按钮

## 1.3.0 20170313

### 升级指南
#### 一, 资源替换: 

1. (必须) 替换bui.js
2. (必须) 替换bui.css
3. (可选) zeptojs 报trigger错问题,去掉了默认的swipe longtap 事件 
4. (可选) bingotouch 纯api版本

#### 二, 重要修改,可能会对已有的项目造成影响的地方:

**js 方面**

1. bui.sidebar 的初始化在 bui-page 的父级id , 需要在原本的 bui-sidebar 加上 swiperight 滑动方向. 

2. bui.slide 修改了参数 zoom: false; 不再默认缩放slide的整体比例. 之前如果有用到焦点图的地方,需要修改为 zoom: true; 也可以在配置文件修改.
```
bui.config.slide.zoom = true;
```

3. 使用bui.swipe重写 bui.sidebar,bui.listview 等插件, 如果有用到 bui.sidebar 或者 bui.listview 则需要在想要滑动的方向加上 swipeleft swiperight ;如果用到的这类控件的地方比较多,可以修改配置文件批量修改
```
往左边滑动: bui.config.sidebar.swipeleft = ".bui-sidebar";
往右边滑动: bui.config.sidebar.swiperight = ".bui-sidebar";
往左边滑动: bui.config.listview.swipeleft = ".bui-listview-menu";
往右边滑动: bui.config.listview.swiperight = ".bui-listview-menu";
```
4. 增加页面及控件的事件监听,具体查看, 控件初始化以后会有 on 方法用来监听事件. 
[BUI 事件演示](http://www.easybui.com/demo/index.html#pages/ui_event/index.html)

5. 比较重要的方法放在 bui, 不常用方法放在第三级, 例如 bui.platform.isWindow bui.unit.pxToRem 之类的
bui.platform 统一了这类判断控件的调用方式 bui.platform.isWinow() ( 以前是bui.platform().isWindow() )

6. bui.getPagaparams 1.2.3版本 原生获取不到传参问题

7. bui.list 跟 bui.listview 的结合,不再需要在 bui.list 的回调里面多次执行 bui.listview ,一个控件只需要初始化一次.


** CSS方面 **
1. bui-btn 统一了最小高度 .6rem的高度,并且line-height更改为 1

2. bui-list 列表的样式,单行改为固定高度垂直居中, 
bui-list 下面的 bui-btn 会变成box 布局, 要注意有没有对自己的列表样式造成影响, 如果有影响,自定义对应的列表名称,把按钮改为 block;
```
//自定义列表的样式,不要使用 .bui-list .bui-btn {} 会影响到其它控件
.customList .bui-btn { display:block; }
```
3. dialog 的头部底部,采用固定最小高度的方式,单行.6rem, 如果对你的造成影响,可以这样修改.
```
// 自定义对话框的样式, 不要 .bui-dialog .bui-dialog-head
.custom-dialog .bui-dialog-head { line-height:inherit; min-height:inherit; }
```
4. bui.checkVersion 检测版本更新的方法做过修改,需要传当前版本号进行比对

### 优化-修复-完善

** 3.1 原生相关**

bui原生方法结构重整,方便扩展第三方平台

##### bui.download
bui.download 如果文件地址没有文件名,会存在文件被替换的情况, 新增 fileName 参数,可以自定义下载文件的名字

##### bui.ajax 
bui.ajax 新增全局配置


** 3.2 滑动交互类**
##### bui.swipe 新增
bui.swipe 控件,支持更复杂的滑动交互,支持上下左右滑动,支持自定义滑动距离

##### bui.slide
bui.slide 在魅族浏览器滑动一次以后不灵敏的问题
bui.slide zoom 参数的缩放问题

##### bui.listview
bui.listview 自定义渲染打开再关闭会有条蓝边
bui.listview 只有最后一个有遮罩的问题.
bui.listview 的滑动重构,支持左右两边都有侧滑栏
bui.listview 新增 open close active 等方法,支持自定义滑动距离

##### bui.sidebar的滑动重构
bui.sidebar 只能滑动打开,不能滑动关闭的问题
bui.sidebar 的滑动重构,支持左右两边都有侧滑栏,支持自定义滑动距离

** 3.3 数据交互类**
##### bui.btn 
bui.btn 一个页面只需要初始化一个 bui.btn 的绑定操作就可以了.
bui.btn 新增disabled属性跟disabled样式的判断
bui.btn 新增 replace 替换当前窗口参数,解决 登录提交->成功->后退 又回到登录页面问题 
bui.btn 新增 timeout 参数,定时关闭, 默认3000秒,主要因为在原生下一个页面,会导致页面返回还看到进度条


##### bui.load 
bui.load 新增 replace 替换当前窗口参数,解决 登录提交->成功->后退 又回到登录页面问题 

##### bui.list 页面跳转
bui.list 修改 onRefresh, onLoad 参数回调的第2个参数为 请求得到的对象(之前是数组)
bui.list 支持 vuejs, artTemplate, baiduTemplate 等第三方模板操作并提供示例.
bui.list 支持自定义参数 刷新是增加数据,还是覆盖数据
bui.list 下拉刷新高度不足以后不会自动请求下一页
bui.list 支持手动初始化
bui.list 修改跟 bui.scroll children handle 保持一致的调用
bui.list bui.scroll 小于最小高度又没有数据的情况下会一直请求.
bui.list 跟 bui.listview 配合使用导致页面宽度计算不准确问题.
bui.list bui.listview bui.sidebar bui.btn 等几个控件一起使用的复杂场景问题
bui.list 的刷新方法数据为空的时候,不执行

##### bui.scroll
bui.scroll 新增 isRefresh 方法, 获取当前执行的是刷新操作还是加载操作.
bui.list bui.scroll 小于最小高度又没有数据的情况下会一直请求.
bui.pullrefresh,bui.list,bui.scroll 的下拉刷新优化

##### bui.searchbar
bui.searchbar 的示例页面拿不到数据
bui.searchbar 修复 search 方法不能触发

##### bui.accordion
bui.accordion 扩展性更强,详情可以参考 bui.accordion_article.html 示例

** 3.4 弹出交互类**

##### bui.pickerdate
bui.pickerdate 简化参数, 可以不传 value min max 
bui.pickerdate 支持按钮取消及确定再进行设置
bui.pickerdate 的格式导致ios报错问题
bui.pickerdate 日期统一从0开始

##### bui.mask
bui.mask 增加了zIndex 参数设置, 默认 100, 跟 dropdown结合的时候,有可能需要设置层级 低于10.
bui.mask 修复2个弹窗以后,关闭弹窗会导致有一个没有遮罩

##### bui.loading
bui.loading 新增 pause 暂停滚动方法
bui.loading 新增 timeout 参数,定时关闭,这种一般在 页面跳转时使用

##### bui.dialog
bui.dialog 底部按钮样式问题及自定义的dialog高度问题

##### bui.confirm
bui.confirm 新增几种弹出成功失败提醒示例
bui.confirm 默认确定按钮高亮

##### bui.hint
bui.hint 去掉close参数,使用autoClose替代
bui.hint 统一了提醒样式
bui.hint interval 参数改为 timeout 

##### bui.select
bui.select 新增 active 方法,可以激活选中的第几个数据
bui.select 弹出窗口的情况下会导致页面跳到底部,不采用label绑定input的方式
bui.select 数据一多导致超出页面高度,滚动问题.

##### bui.dropdown
bui.dropdown 新增 active 方法,可以激活指定二级菜单
bui.dropdown 在第2个TAB会导致二级菜单不显示
bui.dropdown 激活高亮显示
bui.dropdown 跟 bui-bar 的各种不同位置使用场景 ui_controls/bui.dropdown_scenes.html

##### bui.actionsheet
bui.actionsheet 美化



## 1.2.3  20161229

### 重要修复
bui.list , bui.scroll, bui.pullrefresh 在滚动过程导致拖拽失效问题.
bui.load 不支持 http:// 地址问题


### 新增
bui.excessArray 去除多余重复元素方法

### 修复
bui.listview 拖出来以后,回去会导致右边有条线问题

### 优化 
bui.inArray
bui.compareArray
bui.filterArray
bui.indexArray
bui.removeArray


## 1.2.2  20161226
###重要修改: 
1. bui.ready 手机的API调试加载增加了 window.onload ,如果替换新版,原先写在 bui.ready 外面的 window.onload 就可以取消了. 原因: 部分手机需要在onload 里面才能监听到设备接口准备完毕. 

2. 替换 bui.css 可以解决跟require等第三方插件配合使用导致的页面闪跳问题.

3. bui.viewport.init() 方法如果项目中有独立使用到的,需要更改为 bui.init();
4. bui.list 的field.data 参数 默认更改为""; 
   修改说明: 如果旧项目数据返回默认是{data:[]}, 则需要全局配置修改一下,对已经配置过field的列表没有影响.
   ```
   bui.config.list.field = {data:"data"}; 
   ```

5. 统一了 bui.storage 的get set remove 方法,可以获取某条数据,删除某条数据,增加某条数据, 更多请参考api例子. 跟localstorage的不同之处在于, bui.storage 存储的值可以是字符串,对象字面量,数组,返回的值统一是数组,也就是storage可以存储多条数据,常用于历史记录.
例如:
```
var storage = bui.storage();
// 存储字符串:
    storage.set("username","wangws")
// 存储JSON:
    storage.set("username",{"id","123","name":"wangws"})
// 获取数组
    storage.get("username");
    // 输出数组 [{"id","123","name":"wangws"}]

// 以前获取某个值
    storage.get("username")[0];
    // 输出 {"id","123","name":"wangws"}
// 输出某个字段 不存在时会报错
    storage.get("username")[0]["name"];

// 现在获取某个值 
    storage.get("username",0);
    // 输出 {"id","123","name":"wangws"}
// 还可以输出某个字段 不存在不会报错
    storage.get("username",0,"name");
    // wangws
```


### 新增
* 新增 bui.config.viewport.zoom 属性, 控制是否自动viewport, 默认是,一般无需修改
* 新增 bui.toggle effect:"showIn" 简单的隐藏显示效果, dialog等其它控件也会支持效果.
* 新增 input标签type="radio" checkbox 等的title属性,便于这类选项框直接定义右边文本,需要修改时利用伪类 &:after {} 修改 

### 修改
* 修改 bui.css 控件库的样式,减少层级嵌套. 
* 修改 bui.loading bui.mask appendTo 属性允许class名,只取第一个
* 修改 bui.list 在数据还没加载出来不可以下拉刷新
* 修改 bui.btn 的进度条开启方式,增加多一个 progress 属性,以及在html增加progress 对单个开启的控制.

### 修复
* 修复 bui.list 的 field data参数层级嵌套一样.
* 修复 bui.listview 跟 bui.mask relative 冲突问题 未解决
* 修复 bui的viewport 会导致页面闪跳的问题, (需要替换bui.css文件)
* 修复 bui.slide 的手动设置高度导致无法滚动的问题
* 修复 bui.slide autopage 参数可能导致的不可点击操作.
* 修复 bui.dropdown value text 为空字符串时,获取到的值是上一个设置值.
* 修复 bui.loading 点击遮罩有时删除,有时删除不了的问题

### 优化
* 优化 bui.searchbar onInput 
* 优化 bui.pullrefresh 
* 优化 bui.scroll 
* 优化 bui.list 
* 优化 bui.slide 
* 优化 bui.sidebar 
* 优化 bui.listview 


## 1.2  20161104

###重要修改, 升级需要注意:
* 优化 bui.confirm 的默认按钮, 统一主按钮更改在右边( 更新请注意,如果你点也使用默认确认框的操作, 按钮通过index去判断,这个会导致你的确认框的逻辑变更 )
* 优化 bui.mask 的自动生成,改为默认不生成, 优化 add,remove,show,hide 方法
* 优化 bui.loading 的自动生成,改为默认不生成, 优化 add,remove,show,hide 方法
旧项目要升级,则需要全局更改为原来的方式 bui.config.mask.autoTrigger = true ; bui.config.loading.autoTrigger = true ; 或者更改为新的方式 


#### 新增控件
* 新增 bui.upload 上传控件
* 新增 bui.download 下载控件
* 新增 bui.file 文件管理控件
* 新增 bui.fileselect 文件选择控件

#### 新增控件参数及方法
* 新增 常用控件的全局参数配置 ui.config.alert = {} 之类的统一配置以后,所有用到alert的公共参数都会改变. 
* 新增 bui.list  refresh 参数, false 可以选择不要刷新.
* 新增 bui.list  headers 参数, 部分ajax需要这样的头部.
* 新增 bui.scroll  refresh 参数, false 可以选择不要刷新.
* 新增 bui.hint  isShow 方法.
* 新增 bui.dialog  isOpen 方法, 并且修复快速点击窗口关闭及打开导致关闭混乱.
* 新增 bui.mask  hide, show 方法
* 新增 原生的方法多了个 native 参数, 对原生的方法是否单独使用web的方式, 比方 bui.ajax({native:false}).done(function(){}) 及时 bui.debug = false ;依然使用的是web的请求方式.
* 新增 bui.rating show 方法, 用于展示只读的分数, 比方 3.8, 最后一颗星星可以展示百分比. 
* 新增 bui.btn().load() 对弹出键盘的处理方式,页面跳转比较快,键盘还没有完全关闭,会导致页面计算错误.
* 新增 sidebar dialog 控件的事件监听 $().on("open",function(e,status){}) 
* 新增 bui.storage(size,bool) 的存储方式, 第2个参数为 false 则采用 sessionStorage true 这使用localStorage . 


#### 修复
* 修复 bui.ajax 不支持 headers 参数
* 修复 bui.ajax 不支持数据是文本的方式
* 修复 bui.ajax 增加 native 参数, debug=false 的情况下,还可以设置 native = false, 这样请求还是使用web请求.
* 修复 bui.ready  获取元素高度不准确
* 修复 bui.list  option 修改 data 参数,无需重新初始化.
* 修复 bui.list  跟 bui.searchbar 之间相互配合问题
* 修复 bui.list option 分页值不会动态更改问题
* 修复 bui.dropdown 的下拉菜单点击不能默认跳转( 跟btn 控件冲突).
* 修复 bui.dropdown 三星s3无法弹出二级菜单问题
* 修复 bui.listview 默认自动隐藏按钮(跟scroll,list,pullrefresh冲突).
* 修复 bui.listview 跟 dialog 控件的mask冲突,无法触发 onMask 方法.
* 修复 bui.checkVersion 检测版本更新样式及不能下载问题.
* 修复 bui.pickerdate 的日期准确及字体大小问题.
* 修复 bui.btn().submit(callback,{}) 抛出进度条的参数修改,可以在后面的对象修改.
* 修复 bui.actionsheet 快速点击多次以后出现显示错乱问题.
* 修复 bui.sidebar 导致iphone6 闪白问题
* 修复 bui.select 三星s3 取不到name值问题
* 修复 bui.select ios下快速点击导致无法显示问题
* 修改 控件的方法回调的指向. dom this指向dom本身, 非dom this 指向实例本身


## 1.1.0  20160830

**修复控件的重要问题,建议更新到此版本.**


**js**

* 兼容BT4.0 处理 ;

* 新增 bui.select 的宽高参数;
* 新增 bui.init 方法,默认初始化,这样方便跟其它框架之间配合;
* 新增 bui.unit 对象, 后面存放一些小方法, 目前有 px 跟 rem 的等值换算,有小小误差,无伤大雅.

* 修复 bui.dialog bui.alert bui.confirm 的宽高参数的缩放问题,及内容居中;
* 修复 bui.select 快速点击的动画无法打开问题;
* 修复 bui.slide 重新初始化问题;
* 修复 bui.listview 全部静态初始化的问题;
* 修复 bui.ajax 自定义配置字段以及数据为空的情况;
* 修复 bui.ajax 原生请求到的数据有问题;

* 删除 bui.ready 的回调参数 viewport;



## 1.0.6  20160729

**html** 

* 修改 bui-input 图标的大小
* 修改 bui.dropdown 控件增加下拉箭头属性, 默认箭头居右及居上, 如果需要居中,需要手动增加 bui-arrow-center 样式在父层

**js**

* 修复 bui.btn 跟 label 的冲突
* 修复 bui.list 使用option导致原生在请求过程中数据不断重复问题;
* 修复 bui.searchbar onRemove 的可以word获取不到问题;
* 修复 bui.slide + bui.list 之间的切换,导致里面的元素要点2次才能点击 
* 修复 bui.ajax 原生不支持POST;

* 修改 bui.list 新增 onRefresh 参数,在刷新后执行
* 修改 bui.scroll 的filter 拿不到数据问题
* 修改 bui.select 的selectNone 不支持radio的问题
* 修改 bui.searchbar.html 示例, 每次回调的list 高度问题;
* 修改 bui.searchbar 新增 handleRemove 参数及 search方法;
* 修改 bui.ajax 支持contentType 的传参;




## 1.0.5  20160701 稳定版

* 新增 bui.actionsheet 插件
* 新增 微信版皮肤风格及示例
* 新增 bui.pickerdate 日期控件

* 修改 bui.pullRefresh 改为小写 bui.pullrefresh , 确保所有控件名都是小写,参数名区分大小写,这样使用才不会混乱
* 修改 控件 buttons 参数的传参,支持2种格式 ["确定","取消"] [{name:"确定",className:"primary"},{name:"取消",className:"danger"}]
* 修改 bui.list 自定义事件,及手动刷新导致无法继续拖拽刷新
* 修改 支持 Zepto或者jQuery2.2 两个库,自行选用, api 方面暂时只支持 Zepto.
* 修改 bui.select 的回调改为手动触发,用户可以自由操作.增加 bui-btn-line 样式可以扩大点击的区域在整行
* 修改 bui.dropdown direction属性为 positon 值为 top bottom left right 统一了控件的位置属性, 支持宽度自定义, 新增 箭头显示控制, 激活状态控制

* 删除 js/plugins/picker 及 pickerdate 目录, 该插件已经整合在 bui.pickerdate 



## 1.0.4  20160624

### 建议更新到此版本!
**重要更新 :**

* slide 重构 ok
* slide 高度计算不准确 ok
* slide 的滚动跟 scroll的滚动冲突  ok
* scroll list pullrefresh 控件在中兴z802t 只能滚动刷新一次,接下来滚动不了, ok
* alert 及 confirm 无法滚动  ok
* 版本检测更新的dialog无法滚动 ok
* 完善了bui.list 控件,更快速的组装开发 ok

其它更新:
* bui.btn 增加 disabled 阻止事件跳转 ok
* bui.select 增加 自定义className 参数 ok
* bui.dialog 增加 自定义宽度高度参数 兼容PC ok
* bui.animate 修改了 trans3d方法 为 open3D ok


## 1.0.3 20160617 版本更新

* listView 如果每次只打开一个,会导致listview无法绑定点击事件 ok
* sidebar listview 有链接时跳转会导致页面跳转  ( 崔浩反馈 ) ok
* listview ios 在微信滑动问题有闪动 ( 崔浩反馈 )  ok
* dialog 的滚动跟父层 跟buiscroll 的滚动问题,在ios8 问题严重弹出层不能滚动, 是因为 -webkit-animation-fill-mode: both; 导致的 ok
* dialog 无法打开动态创建窗口  ok
* overflow-scrolling: touch 在ios8 无法滚动问题, 因为跟animate动画一起导致的scrolling无法滚动,另外这个在ios下面会有穿透问题.
  解决: 去掉了accordion dialog 的弹性滚动 scrolling:touch; 或者去掉动画效果, 因为 -webkit-animation-fill-mode: both; 导致的 ok
* dropdown点击同一个按钮,需要触发打开或者关闭, 并且修改为一次初始化一个id的下拉菜单 ok 
* bui.viewport 可以不需要ready 使用  ok
* 规范化参数的传参 ok
* 修复了sidebar ios 不能关闭问题 ok
* 给每个控件增加了动态获取设置参数方法 ok
* 把回调统一传控件自身 ok
* select 全选以后获取不到值 ok

