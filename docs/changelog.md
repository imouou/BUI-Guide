# BUI 版本更新日志

## 目录
[TOC]


## 1.6.1 2020420

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 1.6.0 命令才会生效

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

### 多页开发

1. 新增对bui组件化的支持, 保持跟单页开发一致.

### bui.levelselect

1. 修复不支持4级菜单问题

### bui.router
1. 修复 iframe 在ios问题

### bui.page
1. 修复 iframe 在ios问题

### bui.viewport
1. 横屏竖屏统一采用竖屏的宽度比例;

### bui.ajax
1. dcloud平台在ios13.4 对本地文件的支持

### bui.select
1. 修改数据为空的时候不会重新清空数据问题



## 1.6.0 2020412

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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

### 重要更新

建议重新安装 `buijs`, `bui-fast` 插件.

bui-page 使用弹性结构, 模板等示例都统一更新.适应性更强, 但要注意对旧项目的头部有没有影响(没改过颜色的一般没影响);

```
// 安卓无跨域问题, 默认bui.ajax 就可以
if( bui.platform.isIos() ){
    // 请求使用原生
    bui.config.ajax = {
        needNative: true
    }
    // 列表请求使用原生
    bui.config.list = {
        needNative: true
    }
    // 模块的import本地文件使用原生
    window.loader = bui.loader({
        needNative: true
    })
}
```

### 控件更新

#### bui.page
1. 新增页面加载器控件, 可以用于在当前页插入其它模块页面, 比方需要权限的时候, 把登录页面插入进来

#### bui.history
1. 新增历史记录, 单页的路由1.6以后统一改在这里操作.

#### bui.date
1. 新增日期的常用方法; 日期格式化, 多少天前, 多少分钟前, 星期几等

#### bui.floor
1. 新增楼层插件; 常用的滚动效果,比方通讯录固定字母栏;

#### bui.router 
1. 修正 refresh 方法导致重复加载事件问题;
2. 新增 errorPage 参数,比方 可以配置为 404.html 这样页面找不到就会跳转到 404.html

#### bui.select 
1. 新增needSearch 参数,数据多的时候可以开启本地搜索;

#### bui.stepbar 
1. value新增错误状态以及自定义错误样式;

#### bui.array
1. 多个方法做了更新
2. 新增了 bui.array.deleteIndex 方法
3. 修复 bui.array.remove bui.array.delete 删除多个相同值可能存在不一致的情况;

#### bui.loader 
1. 修复模块多个依赖的加载顺序会导致加载异常;
2. 新增多个方法 loader.component loader.view loader.components loader.views  ...

#### bui.store
1. 修复 compiled 的时候,同一页面多个相同键名只触发了一次的问题;
2. b-show的问题
3. b-template中使用b指令的问题
4. null值问题
5. 修复 b-class 默认第一次不能为空的问题;
6. 其它问题

#### bui.scroll 
1. 横向自动加载  ok
2. 简化toBottom方法的处理;
3. 

#### bui.timer
1. 新增支持不同类型设定,可以用于秒杀的倒计时,支持 数字,秒,分,时,天,日期

#### bui.list 
1. 新增toBottom方法
2. 新增scrollTop方法;
3. 新增to方法;
4. 新增对聊天记录下拉新增的处理


#### bui.dialog 
1. 新增 useBox  参数, 是否使用弹性布局, 默认false, 部分全屏弹窗的底部按钮会被微信的导航遮盖住, 则可以开启这个参数. 
2. 新增toggle方法
3. 新增 style 参数,便于对全屏窗口的处理


#### bui.dropdown 
1. 修复 on change 的方式可能会触发2次的情况;

#### bui.slide 
1. 新增relative参数, 相对父级;

#### bui.tab 
1. 新增relative参数, 相对父级;
2. 修正autoheight参数,让每个li保持当前内容高度;

#### bui.upload
1. 新增dcloud平台的原生上传支持;

#### bui.pickerdate
1. 新增empty方法,便于清空数据;
2. 优化了最小日期跟最大日期为 前年今年明年 
3. 修复只显示年份,月份,日期导致回到最小时间问题;



## 1.5.5 20191202

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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

### 重要更新

### 新增
新增控件全局配置获取修改的方法 bui.setting

### 修复

### bui.loader 
1. 修复多个依赖都时候,并且最后一个依赖被上一个页面使用,会导致第一次跳转不执行问题;


### header
1. 里面有下拉菜单，及有搜索的时候，样式问题 

### 修复APICloud打包全屏以后导致顶部遮住问题 

### buijs
buijs create -m 一些命令都需要先获取新版本会导致比较慢

### bui.store
1. 修正 b-show 对内联标签,块状标签的解析;
2. 增加 b-template 多个数据的传参; 
3. 修正 b-model 对checkbox的双向绑定;

### bui.ajax
1. 新增 proxy 参数, 结合工程的 app.json, 把绝对路径的接口,改成相对路径接口, 这样就可以解决跨域调试问题(部分应用未预留域名变量,所以没法更改,而且部分平台并无原生请求);

### bui.slide
1. onBeforeTo 跟 bui.list 冲突 

### bui.unit
1. 新增filterField方法 对象提取，字段提取，映射等，比方下拉菜单提取name,value 返回过来。 

### bui.hint
1. 修正隐藏时文本变左对齐;

### bui.btn
1. 修正 bui.btn.submit 导致进度条不对齐;

### bui.number
1. 修正 value无法设置零;

### bui.list
1. 修正 没有数据的时候, 刷新的进度条跟滚动的进度条重叠问题;

### bui.select
1. 多级选择的第一次初始化,如果数据格式只有数组,会导致不能初始化第一个值
2. 新增 allValues 方法, 用于返回所有的数据, 包含未选中的值, 有一个 checked 状态做区分;

### bui.upload
1. 添加图片及删除图片时,会导致删除的索引不对,修正例子;
2. 修复start上传文件时,会变base32;

### bui.pickerdate
1. cols参数会导致执行两次,而且日期不一样;

### bui.storage
1. 新增 prefix 参数, 用于区分不同字段数据;
2. 新增 getAll 方法, 获取存储的所有字段;

### bui.hint
1. 新增 text 方法;
2. 新增 autoTrigger 参数,支持像对象一样操作;


## 1.5.4 20190829

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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
### 重要更新
1. 去除默认数组原型链的自定义方法, 改为通过 bui.store 定义的数组,才会有 $empty, $replace, $merge 等方法,其它通过 bui.array.empty(arr) 这种方式去操作.

### 样式更新
1. 新增 bui-box-vertical 对 bui-page bui-tab 的影响，可以解决移动端微信 IOS 版的导航遮挡问题； `buijs create -t main-tab` 默认就是这种方式.
2. 修复 bui-text-select, bui-text-unselect 对文本复制的支持.
3. 新增 bui-scroll-hide(去掉滚动条), bui-scroll-auto(去掉ios缓冲), bui-scroll-touch(加上ios缓冲) 三种滚动方式

### bui.router
1. 修复 router.$ 在 loaderPart 局部加载以后, 获取不到选择器问题;
2. 修复公共的 beforeBack 没有执行;
3. 修复 router.currentPage , router.currentModule的在不同的切换指向问题

### bui.store
1. 修复b-model在IOS下输入中文输入法变拼音问题;
2. 修复在数组的操作上 $replace 不会把旧版的模板删除的问题;
3. 修复b-click 在tab里面加载会导致触发2次问题;
4. 新增 b-model 的 checkbox 相关联, 相同值可以触发相同的选中效果
5. 修复b-model type=tel 不会实时监听问题
6. 新增 ref 属性，this.$refs 的dom访问  
7. 优化 computed, 仅支持对第一层数组的length 读取触发, 比如 this.list.length 会触发
8. 完善一些常用的报错信息
9. 修复数组push,unshift 多条数据的时候,不解析dom

### bui.loader
1. 修复loader.get 获取不到该模块的template模板信息;
2. 修复 loader.import 如果多次导入到id不执行
3. 支持相对路径

### bui.ajax
1. 新增 baseUrl,transformRequest transformResponse 参数,对提交前的数据及返回的数据做处理;
2. 新增 bui.get, bui.post, bui.put, bui.delete, bui.all 方法对 bui.ajax 的简化;


### bui.$
1. 新增 bui.$ 选择器,可以用来替换 router.$，以及 $ , 会在单页跟多页之间进行选择, 仅在 loader.define 里面使用;

### bui.hint
1. 支持宽度高度定义.

### bui.number
1. 修复受parentId 影响, 单独的 number控件无法初始化问题;

### bui.btn
1. 新增 click 方法, 可以解决事件绑定中快速点击导致多次触发问题
2. 修复 submit loading 多次创建问题

### bui.select
1. 修复右边有title的时候,会把title显示出来;
2. 修复选项内容过多,导致页面高过屏幕,无滚动条问题;

### bui.levelselect
1. 修复右边有title的时候,会把title显示出来;

### bui.scroll
1. 修复lock方法;


### bui.searchbar
1. 修复onInput在IOS下输入中文输入法变拼音问题;


### bui.tab
1. 新增 onBeforeTo 参数, 里面可以拿到 e.currentIndex e.prevIndex 来判断是否可以跳转过去, return false 则不行
2. 支持动态加载相对路径

### bui.actionsheet
1. 修复 option 不能直接修改对象 buttons 的值


### bui.storage
1. 新增 deep参数，默认false，可以修复 数据量大的时候，取值太慢问题；


### bui.rating
1. 修复 value 方法 0 无法重置星星；


### bui.toggle
1. 新增 useBox 参数,默认不开启,
 开启可以修复一些切换box导致的错位问题;


### bui.dropdown
1. 新增 onChange 参数, 只有改变的时候才会触发;



## 1.5.3 20190529

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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


### 重要更新

微信IOS版运行的表单, 如果出现底部有灰色的区域, 监听取消焦点以后,调用scrollIntoView可以解决.
```
router.$("input,textarea").on("blur", function() {
    this.scrollIntoView(false)
})
```

### bui.css
1. 修复默认路由跳转效果,在IPhone第一次跳会闪白问题.
2. bui-box-center 在flex 下导致的高度过高被截掉的问题.

### bui.router
1. 优化firstAnimate参数, 当等于true时, 要跳转过去的页面如果是地图,chart等比较耗性能的页面, 应该采用这种动画优先的方式,避免跳转过程中渲染图表导致卡顿. 如果是跟 store 一起使用,则不建议开启, 会先跳转过去后再进行数据渲染.
2. 修复bui.back 如果是指定模块名时,后退的页面不正确.
3. 新增 path 参数,设置路由的根目录, 便于路径跳转的简写 "pages/";
4. 新增 ../ ./ 等相对路径的处理, 如果该应用需要迁移, 就不需要每个都改路径了.
5. 修复?号参数在前,不获取模块参数问题, 这个公众号可能会对url重新处理,导致参数在前

### bui.loader
4. 新增 define 的依赖对相对当前模块的处理, ["../new", "./new" ] 如果该应用需要迁移, 就不需要每个都改路径了.
5. 新增 get 根据模块名获取模块的信息
6. 新增 set 根据模块名,设置模块的信息
7. 新增模块的生命周期,配合 router 使用.

### bui.extend
1. 新增插件扩展

### bui.pickerdate
1. 新增bindValue参数, 开启以后,可以自动绑定 handle 设置值.
2. 新增对多个日期的支持, 不再需要重复初始化, 开始时间,结束时间, 只需要一个初始化.
3. 修复日期的部分格式化导致回到原始时间问题.

### bui.array
1. bui.array.set 修改单条,或者修改某个值
2. bui.array.getAll 支持获取多个数组是否存在
3. 支持 [].$set() [].$get() [].$merge [].$empty() [].$replace() 等数组的操作并触发

### bui.store
1. 修复set 方法会触发2次trigger问题
2. 修复oneTick 监听, 在不同模板使用相同数据源会触发2次问题
3. 新增模板对行为属性的支持


### bui.number
1. 新增 parentId 参数, 默认: .bui-page , 正常初始化一组, 只需一次, 不用id 参数, 这样即使在列表里的 number 动态的也能正常初始化.
2.

### bui.input
1. 修复计算长度的时候,第一次不触发.
2.

### bui.array
1. 针对数组的扩展, 配合 bui.store 这里的方法多了一种使用方式 [].$include [].$set [].$delete [].$empty [].$replace [].$merge [].$index [].$indexs 等方法
2.

### bui.getPageParams
1. 修复在单页路由的 bui.ready 里面拿不到页面参数问题

### bui.upload
1. startAll 方法,新增 needFileinfo参数, 可以把文件的基本信息一起传给接口, 对于实现一个页面多个上传类型,共享一个文件上传控件.
2. 修复showProgress设置为false还是会有进度条问题.

### bui.searchbar
1. 新增value方法,获取当前的关键字.

### bui.list, bui.pullrefresh, bui.scroll, bui.router, bui.tab, bui.slide
1. 新增resize方法

### bui.upload, bui.fileselect
1. 新增resize方法, 压缩图片

### bui.list
1. 新增autoUpdatePage参数,默认true
1. 新增updatePage方法, 用于手动更新判断是否还有最后一页数据.

### bui.listview
1. 修复 listview 跟 list 配合的时候,有时候点击后按钮会掉行变空白.

### bui.slide
1. 新增 data 动态数据里面支持 iframe, reload 参数, 便于外部跳转


### bui.levelselect
1. 修复顶部面包屑的跳转问题;

### bui.checkVersion  bingotouch link 才能用
1. 新增 field 参数, 配置返回的数据字段
2. 修改 isForced 为 forced , 部分json接口会过滤掉 is 参数.


## 1.5.2 20190401

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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

### 重要更新
link轻应用在安卓9,在打开第2次的时候,会出现获取不到宽高的情况. 建议更新 bui.css bui.js .

### bui 工程新增二维码,手机扫码即可预览效果. 确保手机跟电脑在同一个wifi下.

### bui.css 更新
1. bui-box-reverse 的反序修复
2. bui-loading 样式更新
3. bui-check iphone 的圆角问题

### buijs npm 插件
1. 支持创建空模块 buijs create -m xxx  
2. 支持从 gitee创建 buijs create -f gitee

### loader.define
1. 修复加载上一个模块失效的情况

### loader.import
1. 修复引入单个css资源失败
2. 新增html模板的加载

### bui.router
1. bui.getPartParams 的传参问题, 之前必须接收一个id, 现在不用,可以拿到当前加载的id的参数

### bui.store
1. 新增 b-children 配合 b-template 模板使用, 应对复杂模板的情况
2. 修复删除input的值变成 object
3. 支持事件中文传参
4. 修复b-show 相反属性导致不能同时操作问题
5. 新增 b-href, b-src 行为属性
6. 修复 disabled, checked 特殊属性的问题
7. 修复一些发现的问题, 有用到 bui-store 开发,建议更新最新版本.
8. 修复watch 有时拿不到上一个数据的值
9. 新增 选择交互列表的示例

### bui.slide
1. 新增 data 参数,支持动态数据渲染
2. 修改 template 可以配合 data 自定义模板
3. 修改 轮播图,标题轮播图,跨屏轮播,公告为动态渲染例子,简化使用方式.
4. 新增 相册简单效果

### bui.scroll
1. 新增 onBeforeRefresh 参数
2. 新增 onBeforeLoad 参数

### bui.tab
1. 新增 template 参数, 支持数据动态自定义

### bui.levelselect
3. 修复全屏以后,蓝色区域不自适应问题

### bui.list
1. 调用init 以后重复初始化loading问题
2. 修复数据返回对象,数组却是字符串的奇葩格式问题
3. 在tab里面的高度不准确问题
4. 新增 onBeforeRefresh 参数
5. 新增 onBeforeLoad 参数

### bui.loading
1. 允许一个容器下有多个进度条, 便于用户对进度条的灵活控制.

### bui.mask
1. 修改成一个控件对应一个遮罩, 方便其它控件的控制

### bui.pickerdate
1. 修复只显示时间的时候,点击取消会导致时间变为00:00

### bui.dropdown
1. 修复 reset 方法以后还能获取到值的问题

### bui.number
1. 新增静态属性 max, min 在input. 便于每个number有自己单独的大小

### bui.select
1. 新增disabledSelect, enabledSelect 方法, 来控制某些元素不允许通过点击选择
2. 新增unactive, unselected 方法

### bui.array
1. 新增get 方法,获取该值是否存在, 存在返回当前值或对象
2. 新增getAll 获取该数组里面所有符合的对象, 返回数组

### bui.input
1. 修复取值问题

### bui.upload
1. 修复startAll 方法问题
2. 新增 currentName 方法
3. 新增 currentIndex 方法
4. 修复demo示例,删除后不能上传问题

### bui.download 此控件Link, Bingotouch 开发者可以使用.
1. 修复不能IOS不能下载问题

## 1.5.1 20190117

### 重要更新

新增数据驱动开发 bui.store, 具体使用请查看教程

bui.ajax 的 needJsonString 参数, 由于用的人比较少, 所以默认更改为 false, 基本跟 $.ajax 的行为一致.

意思就是:
```
bui.ajax({data: {id:123} ,needJsonString: true }).then() 这里的data默认是对象, needJsonString 为true 会在内部序列化. JSON.stingify(); 默认改为 fasle,不序列化,不需要传. 如果对你的项目有影响, 请使用全局配置.

bui.config.ajax = {needJsonString: true};
```

公司内部相关: 如有疑问,在内部群里提出.
bui.ajax, bui.upload, bui.download 等bingotouch,link原生控件,不再受 bui.isWebapp 的状态影响, 可以通过 needNative 参数自由选择该控件是否使用原生. 默认为web上传. 如果对旧项目有影响, 请使用 全局配置 bui.config.upload = { needNative:true } 使用原生上传. bingotouch,link平台支持.


### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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

## buijs npm 插件
支持创建bui项目的公共文件夹, 用于共享node_modules, 在一个文件夹下创建多个工程, 安装以后的 node_modules 可以作为多个工程共享, 不用每次安装.
1. 升级buijs 0.5.3
2. 创建bui工程名,作为所有工程目录 `buijs create bui-projects`, 删除 src目录 app.json ,只保留 `package.json, gulpfile.js `
3. `npm install` 安装模块
4. `buijs create project1` 创建带工程名的工程
5. `npm run dev-project1` 运行服务 或者 `npm run build-project1 ` 编译打包

## bui-template 工程优化
1. 去除imagemin的优化, 这样跑项目快很多


## bui.guid
1. 修改为默认是bui前缀, 可以自行加前缀,最多36位

## bui.back
1. 新增 beforeBack 后退处理.

## bui.router
1. 新增 resize 方法
2. 新增 beforeLoad 参数,用于全局校验处理
2. 新增 beforeBack 参数,用于全局校验处理
3. router.load 新增 beforeLoad 参数,用于单次权限校验
4. 修复多次快速跳转导致跳转的历史记录不正确问题
5. 在syncHistory = true 的时候, 后退使用 bui.back , 这样可以避免后退多层导致的路由混乱问题
6. 新增hash 参数,采用这种方式,则无需开启reloadCache, 刷新也可以后退

## bui.loader
1. 修复模块在isWebapp=false的时候,模块并行创建导致依赖不正确问题.
2. 修复第一个模块连续跳转的时候会获取不到的问题.

## bui.dialog
1. create 方法的参数支持不传,放在dialog作为公共创建的参数
2. open,close 方法增加单次切换

## bui.toggle
1. show,hide 方法增加单次切换

## bui.dropdown
1. 新增 values 方法, 获取选中的对象;
2. 新增 reset 方法, 重置默认选中的值;
3. 修改 value 方法,支持 value,text 的设定, 以后只需要使用这个方法,就可以选中想要选择的值;
4. 新增 value 参数, 可以支持静态,动态渲染的初始化值;

## bui.actionsheet
1. show,hide 方法增加单次切换
2. 修复点击取消以后还回弹问题

## bui.select
1. show,hide 方法增加单次切换

## bui.input
1. 修复设置值的时候, 没有减去字数

## bui.list
1. 如果手动调用刷新数据为空不会清空

## bui.download Bingotouch Cordova 平台
1. 修复转码文件无法下载问题
## bui.swipe
1. 默认打开的高度不准确问题
2. 修复跟bui.scroll,bui.tab的滚动冲突问题
3. 新增支持内容滚动以后才触发

## bui.sidebar
1. 修复跟 bui.list 冲突问题

## bui.upload
1. 修复示例添加的图片在前面的问题
2. toBase64 方法新增 needCompress 参数, 默认不再压缩, 部分手机可能会出现崩溃;
3. 修复外部处理上传图片数据时,上传的还是原图片
4. 修复web上传返回的数据为字符串,默认为对象
5. 新增startAll 批量上传接口, 没有续传,大图慎用.

## bui.store
1. 新增 b-click 绑定方法
2. 新增 b-template
3. 新增 b-style
4. 新增 b-bind
5. 新增 b-html
6. 基本行为跟 vue 保持一致

## bui.fileselect
1. 新增 toFile 方法
2. toBase64 方法新增 needCompress 参数, 默认不再压缩, 部分手机可能会出现崩溃;

## bui.btn
1. 修复 submit 的遮罩点击问题, 并且默认不允许点击取消,由用户控制

## bui.loader
1. 修复 cache false 的情况,第二次进入不加载脚本

## bui.scroll
1. 新增跳到底部方法 toBottom

## 1.5.0 20181031

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.5.0 命令才会生效

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

## 重要更新
原本 540规范,升级成750 规范, 切图的时候如果设计稿是750的, 不再需要转稿了.

修改UI控件的参数的所有回调的this指向控件本身, 原本的点击对象this 在 e.target 获取
一些无需传参的方法.

优化了gulpfile.js 针对es6的编译

## 新增 bui.input 控件,用于输入表单类的交互.
## 新增 progress 标签进度
## 新增 bui.store 数据订阅器

## css 更新
1. 更新几种大小配置 mini,small,large,xlarge,xxlarge
2. 更新几种颜色配置 default,primary,warning,success,danger
3. 更新圆角配置 round
4. 更新大圆配置 ring
5. 新增图标
6. 新增角标

## bui-fast 插件
1. 修复 bui-select 的初始化书写
2. 新增 bui-levelselect
3.

## bui.sidebar
1. 修复双侧滑遮罩偶尔不显示问题;

## bui.tab
1. 新增tab控件,简化tab的初始化
2. 新增tab切换菜单动画效果
3. 菜单在左边采用新的结构,更加整体

## bui.unit.tel
1. 去除电话号码的验证,由开发者自己判断

## bui.dialog
1. 新增弹窗里面又开弹窗的zIndex参数设置,避免被已有遮罩覆盖
2. 修复动态修改的高度自适应问题

## bui.router
1. 修复 router.$ 对数字开头id 不支持问题
2. 修复 router.refresh 对首页无效问题

## bui.levelselect
1. 修复静态渲染
2. 修改value方法, 获取到的为 json数组, [{name:"",value:"",index:""}]

## bui.dropdown
1. 支持动态渲染数据,数据格式跟bui.select保持一致


## bui.storage
1. 修复存储二维数据的时候,拿到的是一个半对象.

## bui.timer
1. 回调增加target的获取

## bui.number
1. 新增values 方法, 用于批量设置及获取对应的number 控件值
2. 新增 autocheck 参数
3. 新增 onChange 参数
4. 新增 onInited 参数

## bui.swipe
1. 修复上下自定义移动位置的时候不正确
2. 修复在微信浏览器里面,下拉偶尔会触发微信的展示X5内核


## bui.stepbar
1. 新增 hasNumber 参数
2. 增加对横向导航的动态控制


## bui.slide
1. 新增 loop 参数,允许循环处理
2. 新增 cross 参数,简化跨屏处理
3. 新增bui-slide-skin01,bui-slide-skin02 激活皮肤



## bui.actionsheet
1. 修复动态修改buttons数据会动态创建多个 actionsheet 问题



## bui.pickerdate
1. 修复日期如果是年份的时候,取消会变成最小日期


## bui.number
1. 新增图标字段,支持图标路径以及图标样式名,变成图标列表;
1. 新增图片字段,支持图片路径以及图片样式名,变成图片列表;


## bui.select
1. 新增图标字段;
2. 新增values方法,获取键值对;
3. 修复value参数传值不显示问题


## bui.pullrefresh
1. 修复在微信浏览器里面,下拉偶尔会触发微信的展示X5内核


## bui.hint
1. 修复多页不显示问题




## 1.4.7 20180831

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.4.1 命令才会生效

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

## bui-fast 插件
1. 修复 bui-select 的初始化书写
2. 新增 bui-levelselect
3.

## bui.mask
1. 修复遮罩看不到

## bui.select
1. 新增对数据的自定义字段的支持
2. 新增 empty 方法,用于清空数据
3. 修复数据如果是普通字符串时,全选,反选,激活等方法无效
4. 修复当值是1,2,3 的时候, 会导致数据不准确问题

## bui.upload
1. 新增拍照上传,如果直接转换展示的话,图片较大可能会出现卡死现象, 建议上传以后展示返回回来的地址较好.
2. 修复pc无法测试选择文件问题

## bui.list
1. 新增empty 方法

## bui.listview
1. 修复jquery版本会导致高度变小问题

## bui.levelselect
1. 新增在change事件拿到当前的一些数据及操作信息

## bui.slide
1. 新增 add, remove 方法, 便于动态修改tab, 比方循环

## bui.btn
1. 修复多页开发的传参如果url? 会出现参数重复的情况

## bui.on
1. 新增 pageshow pagehide 事件监听, 用户捕获物理Home键


## bui.number
1. 修复动态创建的模板在不同平台下展示不一致,改成字体图标


## buijs 0.4.2 工程更新

### 升级指南 执行
```
buijs update -d
```

1. 修正json文件修改不更新
2. 修复加入第三方插件时,会导致插件失效, 引入第三方插件需要放在js/plugins/目录下才不会被压缩编译.
3. 修复app.json 等文件创建模板后会被覆盖问题
4. 修复覆盖的文件,或者新增的文件,修改不会同步问题
5. 修复删除文件夹以后,dist只删除文件,目录还存在的问题
6. 新增图片压缩功能
7. 新增对 *.min.js 结尾的文件不做编译

## 1.4.6 20180801

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.4.1 命令才会生效

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

## 修复 page-chat , page-login, main-tab 模板


## bui.router
1. 修复路由开启缓存以后,刷新找不到currentPage

## bui.loading
1. 统一为页面跳转的效果;

## bui.select
1. 修复 点击checkbox 无法选中的情况
2. 新增参数可以控制单选是否可以取消
3. 修复 data value 为数字,导致无法选择的情况
4. 修复 data 数据为普通数组问题

## bui.levelselect
1. 修复无法选择第三层问题

## bui.upload
1. 修复onFail 无效问题;
2. 修复 bingotouch 版本的文件读取无法显示;
3. 修复 remove 方法, 默认删除最后选择的一个图片数据, 不需要传名字, 不同系统的名字不一样

## bui.list
1. 修复下拉刷新以后不继续请求分页问题

## bui.btn
1. 新增?号传参的方式

## bui.storage
1. 修复删除json数组的某个值无效

## bui.scroll
1. 修复scrollTips 配置没有数据的时候,刷新后返回默认值


## bui.slide
1. 新增跨屏切换效果示例

## bui.alert
1. 新增对不同类型对象的调试支持


## 1.4.5 20180702

### 升级指南

** 一, 资源替换: **

执行命令, 选择你使用的平台, buijs 需要更新到 0.4.1 以上命令才会生效

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

新增秒数倒计时 bui.timer
新增事件触发器 bui.emitter
新增层级选择器 京东省市区 bui.levelselect
内部重整 bui.select 控件, 着重看对你有没有造成影响.

### 优化-修复-维护


#### bui.router
1. 在 bui.isWebapp = false 的情况下, 路由会加载2次问题;
2. 新增路由的 router.$() 方法,确保查找的元素不跟另外页面冲突;
3. 修复后退时,页面参数丢失问题
4. 路由的进度条统一为黑块居中, 需要替换 bui.css

#### bui.pickerdate
1. 修复在微信上弹出时,日期的底部按钮,会跳到中间,布局错乱, (替换bui.css)
2. 修复仅有时间的时候,点击取消无法返回上一个值;

#### bui.slide
1. 新增可视个数控制参数

#### bui.loading
1. 新增默认效果,并且把页面跳转的进度条做了统一.

#### bui.list
1. 新增 localData 参数,用来做本地数据调试,支持分页

#### bui.number
1. 支持静态初始化,而不需要id

#### bui.select

1. 修复 value 方法修改值时, text方法拿不到值
2. 新增 value 方法可以针对文本设置匹配
3. 统一 bui.select change 的this 指向, function(e){ console.log(e.target) } (重要)
4. bui.select 取值跟文本需要通过自带的方法, 不要通过属性取值的方式 (重要)
5. 动态渲染,支持字段配置,可以根据数据的文本属性,值属性配置, 比方 数据的文本在 "n" field:{name:"n"}
6. change 事件的监听, this 不再指向点击的input, 这里统一在实参的 target 获得, 这个target 单选多选统一为 input 数组


#### bui.dropdown
1. 修复 relative 参数为true 时, 在单页的定位不准确问题.
2. 新增二级分类菜单
3. 新增下拉提醒效果

#### bui.sidebar
1. 修复 双侧滑栏的时候,偶尔会出现关闭错乱问题.


#### bui.emitter 事件发布订阅式, 具体查看API的示例


#### bui 的离线模式  未完成

#### bui 的模板绑定 或者跟 vue 的处理  未完成

#### bui 的案例教程  未完成


## 1.4.4 20180531

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
计时器 bui.timer

综合方法,保持跟href写法一致. 发短信,打电话,发邮件 bui.unit.openExtral

### 重要修改

### 优化-修复-维护

#### bui.router
1. 修复 preload 的资源文件不支持数组


#### bui.upload
1. 修复 上传文件的 data 不能附带参数问题

#### bui.list
1. 修复refresh方法的分页错乱问题

#### bui.list, bui.pullrefresh, bui.slide, bui.scroll, bui.dialog
1. 修复高度自动计算时,受键盘影响问题

#### bui.accordion
1. 修复配合全局初始化,在单页使用时导致部分失效的问题

#### bui.slide
1. 修复纵向滑动时,高度不支持rem问题

#### bui.array
1. 修复 bui.array.remove 删除普通数组只删除一个的问题;
1. 修复 bui.array.filter 过滤普通数组的匹配问题;

#### bui.pickerdate
1. 修复 时间,分钟显示的时候,;

#### bui.sidebar
1. 修复高度无效问题

#### bui.select
1. 重复设置的时候,只有值,没有勾.
2. 回填指定值的时候,可以使用 value方法, active只能索引


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
