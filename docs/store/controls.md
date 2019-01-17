
# 控件结合

bui的控件都是以DOM交互为主, 这种方式可以很好的在各种低版本的系统及平台上运行, 所以目前还是会以保留原有命令式交互为主, 那如何使用数据驱动的方式来改造已有的控件呢? 

?> bui的控件都会支持两种渲染方式:

- `动态渲染` 这种方式只要传数据就可以, 容易使用, 但定制化较难.
- `静态渲染` 把动态渲染的结构静态化, 由你自己去自由定制里面的结构.

动态渲染是在内部的, 动不了, 但是你可以使用静态的方式, 加上模板, 改造成数据驱动的方式. 下面会简单以几个控件来说明下. 


## 1. bui.list 下拉刷新列表

### 效果预览


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/bui.list" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<a href="http://www.easybui.com/demo/index.html#pages/store/bui.list" target="_blank">下拉刷新</a>

?> 滑动类的操作,需要使用手机预览才能体验.

### 思路

这个比较简单, 先定义好下拉刷新的数据源`lists`, 再定义好列表的模板 `tplList`, 当加载的时候,初始化`bui.list` 控件. 控件的回调里面有2个比较重要的方法, 一个是滚动加载的时候, `bui.array.merge`合并新请求的数据; 下拉刷新的时候, 清空原有的数据, 并且合并新的数据.

```js
var bs = bui.store({
    scope: "page", 
    data: {
        lists: []
    },
    templates: {
        tplList: function (data) {
            var html = "";
            data.forEach(function (item,i) {
                html += `<li class="bui-btn"><i class="icon-facefill"></i>${item.name}</li>`;
            })
            return html;
        }
    },
    mounted: function (argument) {
        var _self = this;

        this.list = bui.list({
            id: "#listStore",
            url: "http://easybui.com/demo/json/userlist.json",
            page:1,
            pageSize:9,
            height:0,
            field: {
                page: "page",
                size: "pageSize",
                data: "data"
            },
            onRefresh: function (scroll,datas) {
                // 清空数据
                bui.array.empty(_self.lists);
                // 合并新的数据
                bui.array.merge(_self.lists,datas.data)
            },
            onLoad: function (scroll,datas) {
                
                bui.array.merge(_self.lists,datas.data)
            }
        });
    }
})
```
```html
<div id="listStore" class="bui-scroll">
    <div class="bui-scroll-head"></div>
    <div class="bui-scroll-main">
        <ul class="bui-list" b-template="page.tplList(page.lists)"></ul>
    </div>
    <div class="bui-scroll-foot"></div>
</div>
```


## 2. bui.dropdown 下拉菜单


### 效果预览


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/bui.dropdown" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<a href="http://www.easybui.com/demo/index.html#pages/store/bui.dropdown" target="_blank">下拉菜单</a>

?> 多下拉菜单,只需初始化一次.

### 思路

#### 步骤1:

定义一个对象, 对象上有3个值, 

- `placeholder`   如果选中值为空,则变默认值, 这个条件在 `computed` 里面判断. 
- `value` 选中值
- `items` 数据源

`templates` 定义控件的模板, 当`mounted`时,进行`bui.dropdown`控件的初始化, 并挂载在`this`上, 在控件的回调里面, 设置选中的值, 再在`watch` 里面监听值改变的时候,处理回调. 这样的好处是, 控件我只需要初始化一次, 不同的控件,我只需要更改不同的数据源. 当把 `bs` 实例return出去以后, 其它模块都可以很简单的操作这个模块的数据,并访问到 `bs.dropdown`, 必要时做些其它操作.

!> 注意: `watch` 里面是一个有层级的对象时,使用引号,通过`.`进行连接, `"dropdownData.value"`.

```js
var bs = bui.store({
    scope: "page", 
    data: {
        dropdownData: {
            placeholder: "分类",
            value: "",
            items: [{
                name: "全部",
                value: "全部",
            },{
                name: "兑换券",
                value: "兑换券",
            },{
                name: "代金券",
                value: "代金券",
            },{
                name: "提货券",
                value: "提货券",
            },{
                name: "会员卡",
                value: "会员卡",
            }]
        }
    },
    watch: {
        "dropdownData.value": function(newVal,oldVal){
            // 当值改变以后, 可以执行搜索类的事情
            console.log(newVal);
        }
    },
    computed: {
        dropdownValue: function () {
            return this.dropdownData.value || this.dropdownData.placeholder;
        }
    },
    templates: {
        tplDropdown: function (data) {
            var html = "";
            data.forEach(function (item,i) {
                html += `<li class="bui-btn" value="${item.value}">${item.name}</li></li>`;
            })
            return html;
        }
    },
    mounted: function () {
        var _self = this;

        // 初始化dropdown
        this.dropdown = bui.dropdown({
            id: "#uiDoropdownClass",
            //设置relative为false,二级菜单继承父层宽度
            relative: true,
            value: "",
            callback: function(e) {
                // 设置选中值
                _self.dropdownData.value = this.value();
            }
        })
    }
})
```
```html
<div id="uiDoropdownClass" class="bui-dropdown">
    <div class="bui-btn bui-box">
        <div class="span1" b-text="page.dropdownData.placeholder"></div>
        <i class="icon-dropdown"></i>
    </div>
    <ul b-template="page.tplDropdown(page.dropdownData.items)" class="bui-list">
    </ul>
</div>
```

?> 很多时候我们初始化完以后,基本也很少对控件再进行操作了, 那我们这里改成这样数据驱动的方式又有什么意义? 

统一数据驱动的意义在于不用管控件的行为, 你只要关注data里的数据, 那像上面的例子, 我们还可以再进行优化, 变成一个控件初始化一次, 但是可以有不同的数据源. 


#### 步骤2:

在步骤1的基础上, 我们增加一个数据源`dropdownData2`, 当点击下拉菜单时, 执行回调. 我们对数据源的`value` 重新设计一下, 把它改成以 `dropdownData.0` 命名, 在回调里, 拿到`value`进行解析, 我们只需要前面的字段, 然后把值改成获取它的文本. 如果你取的值不是文本, 那你可以在`watch` 里面,对值进行映射. 这样我们就可以实现, 一个控件初始化, 但是能够分别拿到不同的数据. 以往的控件是1对1, 现在就可以变成1对多了.


```js
var bs = bui.store({
    scope: "page", 
    data: {
        dropdownData: {
            placeholder: "分类",
            value: "",
            items: [{
                name: "全部",
                value: "dropdownData.0",
            },{
                name: "兑换券",
                value: "dropdownData.1",
            },{
                name: "代金券",
                value: "dropdownData.2",
            },{
                name: "提货券",
                value: "dropdownData.3",
            },{
                name: "会员卡",
                value: "dropdownData.4",
            }]
        },
        dropdownData2: {
            placeholder: "地市",
            value: "",
            items: [{
                name: "全广州",
                value: "dropdownData2.0",
            },{
                name: "天河区",
                value: "dropdownData2.1",
            },{
                name: "海珠区",
                value: "dropdownData2.2",
            },{
                name: "白云区",
                value: "dropdownData2.3",
            },{
                name: "越秀区",
                value: "dropdownData2.4",
            }]
        }
    },
    watch: {
        "dropdownData.value": function(newVal,oldVal){
            // 当值改变以后, 可以执行搜索类的事情
            console.log(newVal);
        },
        "dropdownData2.value": function(newVal,oldVal){
            // 当值改变以后, 可以执行搜索类的事情
            console.log(newVal);
        }
    },
    computed: {
        dropdownValue: function () {
            // 显示默认值
            return this.dropdownData.value || this.dropdownData.placeholder;
        },
        dropdownValue2: function () {
            // 显示默认值
            return this.dropdownData2.value || this.dropdownData2.placeholder;
        }
    },
    templates: {
        tplDropdown: function (data) {
            var html = "";
            data.forEach(function (item,i) {
                html += `<li class="bui-btn" value="${item.value}">${item.name}</li></li>`;
            })
            return html;
        }
    },
    mounted: function () {
        var _self = this;

        // 初始化多个dropdown
        this.dropdown = bui.dropdown({
            id: ".bui-dropdown",
            relative: false,
            callback: function(e) {
                // 分解value,取出 所在字段
                var val = this.value().split(".")[0]; 
                // 设置选中值
                _self[val].value = this.text();
            }
        })
    }
})
```

```html
<div class="bui-box">
    <div class="span1">
        <div class="bui-dropdown">
            <div class="bui-btn bui-box">
                <div class="span1" b-text="page.dropdownValue"></div>
                <i class="icon-dropdown"></i>
            </div>
            <ul class="bui-list" b-template="page.tplDropdown(page.dropdownData.items)">
            </ul>
        </div>
    </div>
    <div class="span1">
        <div class="bui-dropdown">
            <div class="bui-btn bui-box">
                <div class="span1" b-text="page.dropdownValue2"></div>
                <i class="icon-dropdown"></i>
            </div>
            <ul class="bui-list" b-template="page.tplDropdown(page.dropdownData2.items)">
            </ul>
        </div>
    </div>
    </div>
```

## 3. bui.slide 轮播图

### 效果预览

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/bui.slide" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<a href="http://www.easybui.com/demo/index.html#pages/store/bui.slide" target="_blank">轮播图</a>

?> 滑动类的操作,需要使用手机预览才能体验.

### 思路

这个控件增加数据以后是需要重新初始化的, 这里会用到2个控件, 一个是请求时显示进度条遮罩(可以作为整个页面的公共控件), 一个是轮播图控件, 所以这里定义了2个数据源.

- `loadingStatus`     显示进度
- `slides`            轮播图的数据源

然后就是定义轮播图的模板, 并且监听 `loadingStatus` 的状态改变以后, 分别做2个事情, 一个是显示进度条, 一个是隐藏进度条. 当解析完以后, 执行`bui.loading`,`bui.slide`的初始化, 在请求数据前显示进度条. 请求完数据以后, 进入监听 `slides` 的数据改变, 在视图更新以后, 关闭进度条,重新初始化轮播图.   

```js
var bs = bui.store({
    scope: "page", 
    data: {
        loadingStatus: false,
        slides: []
    },
    watch: {
        slides: function (newVal,oldVal) {
            // 1. 监听slides数据变更的时候,并且在dom更新以后执行控件初始化
            this.oneTick("slides",function (e) {
                // 修改状态
                this.loadingStatus = false;
                // 轮播图需要重新计算
                this.slide.init();
            })
        },
        loadingStatus: function (val) {
            if( val === true ){
                this.loading.show();
            }else{
                this.loading.hide();
            }
        }
    },
    templates: {
        tplSlide: function (data) {
            var html = "";
            data.forEach(function (item,i) {
                // 模拟的请求,没有真实的图片数据源
                if( i > 3) { return; }
                // 这里的图片数据只是随便模拟的,本地只有4张图片
                html += `<li>
                            <img src="images/banner0${i+1}.png" alt="占位图">
                        </li>`;
            })
            return html;
        }
    },
    mounted: function () {
        var _self = this;

        // 公共进度条
        this.loading = bui.loading();

        // 初始化轮播图
        this.slide = bui.slide({
           id:"#slide",
           height:380,
           autopage: true,
           autoinit: false
         })
        
        // 显示进度条
         this.loadingStatus = true;

        // 模拟请求成功以后数据更新
         bui.ajax({
             url: "http://www.easybui.com/demo/json/userlist.json",
         }).then(function(result){
            // 合并并触发视图更新
             bui.array.merge(_self.slides,result.data)
         });
    }
})

```

```html
<div id="slide" class="bui-slide bui-slide-skin01">
    <div class="bui-slide-main">
        <ul b-template="page.tplSlide(page.slides)">
        </ul>
    </div>
</div>
```

?> 这种控件结合只是提供一个思路, 其实并不需要把控件改成数据驱动的形式, 我们直接使用命令式也同样可以相互结合. 关键在于你的业务的设计上, 而不是控件. 