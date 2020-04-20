
# 综合案例

## 1. 待办处理


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/case" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


核心思路: 定义了3个字段. 
- `todo` 是当前已有的数据, 会通过 `b-template` 进行渲染. 
- `todoText` 搜索框的默认文本, 如果空则显示`placeholder`, 通过 `b-model` 进行关联.
- `nextTodoId` 这个是数据的自增字段, 不是必须, 可以使用唯一id来处理. 

定义了一个方法, 通过 `b-click` 进行绑定. 点击的时候, 检验字段是否为空, 不为空则增加一条待办. 

模板里面还通过`b-click` 绑定了一个`removeTodo` 删除的方法, 通过索引删除, 这里用到一个动态索引, 这个是内置的, 前面在[事件绑定章节](store/event.md)已经讲过. 有增删改的数据, `i` 拿到的是固定的值.

```js

var bs = bui.store({
    scope: "page", 
    data: {
        todo: [{
            id: 1,
            title: "参加项目会议"
        },{
            id: 2,
            title: "项目启动会"
        },{
            id: 3,
            title: "看电影"
        }],
        todoText: "",
        nextTodoId: 4
    },
    methods: {
        addTodo: function (e) {

            if( this.todoText ){
                this.todo.push({
                    id: this.nextTodoId++,
                    title:this.todoText
                })
                this.todoText = "";
            }else{
                bui.hint("请填写待办事项")
            }
        },
        removeTodo: function (index) {
            // 方法1: 通过索引删除
            this.todo.splice(index,1);
            this.todoText = "";
        }
    },
    templates: {
        tplTodo: function (data) {
            var _self = this;
            var html = "";
            data.forEach(function (item,i) {

                html += `<li id="${item.id}" class="bui-btn bui-box">
                            <div class="span1">${item.title}</div>
                            <i b-click="page.removeTodo($parentIndex)" class="icon-remove large"></i>
                        </li>`;
            })
            return html;
        }
    }
})
```

核心html
```html
<!-- 搜索条控件结构 -->
<div class="bui-searchbar bui-box">
    <div class="span1">
        <div class="bui-input">
            <i class="icon-search"></i>
            <input type="text" value="" placeholder="请输入待办" b-model="page.todoText" />
            <div class="bui-btn" b-click="page.addTodo">添加</div>
        </div>
    </div>
</div>
<!-- 数组todo lendth 改变的时候,不会自动触发,需要监听 page.todo 数组改变 -->
<div class="section-title">待办事项: <b b-text="page.todo.length"></b></div>
<ul b-template="page.tplTodo(page.todo)" class="bui-list"></ul>
```

### 预览

<a href="http://www.easybui.com/demo/index.html#pages/store/case" target="_blank">查看效果</a>

## 2. 弹窗选择交互

?> 如果数据一开始有值,还需要把值跟模板里的数据进行比对,处理成选中状态.

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/choose.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### js

```js
var bs = bui.store({
        scope: "page", // 用于区分公共数据及当前数据的唯一值
        data: {
            items: [{
                id: "guangzhou",
                name: "广州",
            }, {
                id: "shenzhen",
                name: "深圳",
            }, {
                id: "dongguan",
                name: "东莞",
            }],
            checked: ["shenzhen"], //缓存选中的值, 默认选中深圳
            checkedObj: [{
                id: "shenzhen",
                name: "深圳",
            }],
        },
        methods: {
            open: function() {
                this.uiDialog.open();
            }
        },
        watch: {
            checked: function(val) {
                var _self = this;
                // 获取的使用 this.$data.xxx
                var items = bui.array.getAll(_self.$data.items, val, "id");

                // 替换新的值 this.xxx
                bui.array.replace(this.checkedObj, items);
            }
        },
        computed: {},
        templates: {
            tplItem: function(data) {
                var html = "";

                data.forEach(function(item, i) {
                    html += `<li class="bui-btn" id="${item.id}">${item.name}</li>`
                })

                return html;
            },
            tplCity: function(data) {
                var html = "";
                var _self = this;
                data.forEach(function(item, i) {
                    // 渲染已经选择的城市
                    var hasChoose = _self.checkedObj && bui.array.compare(_self.checkedObj, item.id, "id");
                    var hasChecked = hasChoose ? "checked" : "";
                    html += `<li class="bui-btn bui-box bui-btn-line">
                      <div class="span1">
                          <label for="interest+${i}">${item.name}</label>
                      </div>
                      <input id="interest+${i}" type="checkbox" class="bui-choose" name="interest" value="${item.id}" text="" ${hasChecked} b-model="page.checked">
                  </li>`
                })

                return html;
            }
        },
        mounted: function() {
            // 加载后执行

            this.uiDialog = bui.dialog({
                id: "#uiDialog"
            });

        }
    })
```

?> **注意:** `checkedObj: null` 数组如果需要通过`this.checkedObj = []`赋值操作, 先设置为空; 如果初始值是数组, 则需要通过 `bui.array.xxx` 去操作才会触发界面响应.

### 核心html

```html
<div class="bui-page page-store">
    <main>
        <div class="bui-btn" b-click="page.open()">点击选择喜欢的城市</div>
        <div class="subtitle">您已选择:</div>
        <!-- 列表控件 html 对应的结构:  -->
        <ul class="bui-list" b-template="page.tplItem(page.checkedObj)"></ul>
    </main>
    <!-- 对话框需要在 bui-page 里面, 这样默认才会解析 b- 行为属性的值 page.xxx  -->
    <div id="uiDialog" class="bui-dialog">
        <div class="bui-dialog-head">选择喜欢的城市</div>
        <div class="bui-dialog-main">
          <ul class="bui-list" b-template="page.tplCity(page.items)"></ul>
        </div>
        <div class="bui-dialog-close"><i class="icon-close"></i></div>
    </div>
</div>
```

### 预览

<a href="http://www.easybui.com/demo/index.html#pages/store/choose" target="_blank">查看效果</a>


## 3. 多选联动复杂场景

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/selectm_step1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


### 2.1 简单思路版

在data设计了4个字段, 分别是: 

- `selectA` A的数据源
- `selectB` B的数据源
- `selectAChecked` A的选中暂存区
- `selectBChecked` B的选中暂存区

定义了4个方法: 

- `modifyStatusA` 点击以后修改A的激活状态, 并把数据存到A暂存区
- `modifyStatusB` 点击以后修改B的激活状态, 并把数据存到B暂存区
- `addToB` 合并A的选中数据到B的数据源里面, 数据改变会自动渲染到视图
- `addToA` 合并B的选中数据到A的数据源里面, 数据改变会自动渲染到视图

操作数据便会更新视图. 代码有点多, 但是理清了思路,我们后面再看优化版. 

```js
var bs = bui.store({
    scope: "page", 
    data: {
        selectAChecked: [], // A区选中暂存区
        selectBChecked: [], // B区选中暂存区
        selectA: [          // 联动select的数据源
          { text: 'One', value: 'A', selected: false },
          { text: 'Two', value: 'B', selected: false },
          { text: 'Three', value: 'C', selected: false }
        ],
        selectB: [],
    },
    methods: {
        modifyStatusA: function (index) {

            var selectedItem = this.selectA[index],
                selecteds = this.selectAChecked,
                // 判断是否唯一
                indexs = bui.array.index(this.selectA[index].value,selecteds,"value");

            // 选中暂存区的增加或减少
            if( indexs > -1 ){
                selecteds.splice(indexs,1);
            }else{
                selecteds.push(selectedItem);
            }

            // 修改选中状态
            this.selectA[index].selected = !this.selectA[index].selected;
            // 替换整条数据并触发数据变更
            bui.array.set(this.selectA,index,this.selectA[index]);
        },
        modifyStatusB: function (index) {
            var selectedItem = this.selectB[index],
                selecteds = this.selectBChecked,
                indexs = bui.array.index(this.selectB[index].value,selecteds,"value");

            // 选中暂存区的增加或减少
            if( indexs > -1 ){
                selecteds.splice(indexs,1);
            }else{
                selecteds.push(selectedItem);
            }

            // 更新字段
            this.selectB[index].selected = !this.selectB[index].selected;
            // 替换整条数据并触发数据变更
            bui.array.set(this.selectB,index,this.selectB[index]);
        },
        addToB: function (e) {
            // 删除选中状态
            this.selectAChecked.forEach(function(item,i){
                item.selected = false;
            })
            // 合并并触发 this.selectB
            bui.array.merge(this.selectB,this.selectAChecked);
            // 删除this.selectA选中数据,通过value字段比对,支持多个
            bui.array.remove(this.selectA,this.selectAChecked,"value")

            // 清空A暂存区数据
            bui.array.empty(this.selectAChecked);
        },
        addToA: function (e) {
            // 删除选中状态
            this.selectBChecked.forEach(function(item,i){
                item.selected = false;
            })
            // 合并并触发 this.selectA
            bui.array.merge(this.selectA,this.selectBChecked);

            // 删除选中数据,通过value字段比对
            bui.array.remove(this.selectB,this.selectBChecked,"value")
            // 清空B暂存区数据
            bui.array.empty(this.selectBChecked);
        },
    },
    templates: {
        // 联动的示例,增加了事件绑定
        tplSelectA: function (data,te) {
            var html ='';
            data.forEach(function (item,i) {
                var active = item.selected ? "active" : "";
                html +=`<li b-click='page.modifyStatusA($index)' class="bui-btn ${active}">${item.text}</li>`;
            })
            return html;
        },
        tplSelectB: function (data) {
            var html ='';
            data.forEach(function (item,i) {
                var active = item.selected ? "active" : "";
                html +=`<li b-click='page.modifyStatusB($index)' class="bui-btn ${active}">${item.text}</li>`
            })
            return html;
        }
    }
})

```

核心的html绑定
```html
<style type="text/css">
    .bui-select .active {
        color: red;
    }
</style>
<div class="bui-box">
    <div class ="span1">
        <h2 class="bui-box"><b b-text="page.selectAChecked.length"></b>/<b b-text="page.selectA.length"></b></h2>
        <div class="bui-select" b-template="page.tplSelectA(page.selectA)">
        </div>
    </div>
    <div style="width: 100px">
        <div class="bui-btn" b-click="page.addToB">添加到B</div>
        <div class="bui-btn" b-click="page.addToA">添加到A</div>
    </div>
    <div class="span1">
        <h2 class="bui-box"><div class="span1">列表2</div><b b-text="page.selectBChecked.length"></b>/<b b-text="page.selectB.length"></b></h2>
        <div class="bui-select" b-template="page.tplSelectB(page.selectB)">
        </div>
    </div>
</div>
```


### 预览

<a href="http://www.easybui.com/demo/index.html#pages/store/selectm_step1.html" target="_blank">查看效果</a>


### 2.2 代码优化版


<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/selectm.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


优化了操作流程, 在原来的data增加多了2个状态: 这2个状态都是一个对象, 因为实际上想要的是 `disabled`这个样式名, 如果你的样式上, 是设计的 `canAdd`, `canDel` 作为样式名, 只需要布尔值就行.

- canAdd 是否能够增加
- canDel 是否能够删除

原先的4个方法, 优化成了2个, 一个点击的时候修改状态, 一个是合并数据. 

原先的2个模板方法, 优化成了1个, 通过传进来的不同字段进行处理就行. 这里要理解,`b-click='page.setStatus(${target},$index,${targetChecked})'` `${target}` 跟 `$index` 的区别. 

!> 注意: `b-template` 传过去的第一个值会被解析成数据, 其它参数传什么就是什么. 

```js
/**
 * 设计思路说明:
 * 左边列表A: selectA
 * 右边列表B: selectB
 * 左边选中列表暂存区A: selectAChecked
 * 右边选中列表暂存区B: selectBChecked
 * 点击列表, 往暂存区存放对应的数据, 并且通过watch 暂存区的数据变更,把按钮的状态变成能够操作.
 * 点击按钮添加到B, 则把右边列表数据,合并A选中的暂存区, 并删除选中状态, 清空A暂存区数据
 * 点击按钮添加到A, 则把左边列表数据,合并B选中的暂存区, 并删除选中状态, 清空B暂存区数据
 */

var bs = bui.store({
    scope: "page",
    data: {
        canAdd: {
            disabled: true
        },
        canDel: {
            disabled: true
        },
        selectAChecked: [], // A区选中暂存区
        selectBChecked: [], // B区选中暂存区
        selectA: [
          { text: 'One', value: 'A', selected: false },
          { text: 'Two', value: 'B', selected: false },
          { text: 'Three', value: 'C', selected: false }
        ],
        selectB: [],
    },
    methods: {
        setStatus: function (target,index,checked) {

            var selectedItem = this[target][index],
                selecteds = this[checked],
                // 判断是否唯一
                indexs = bui.array.index(this[target][index].value,selecteds,"value");

            // 选中暂存区的增加或减少
            if( indexs > -1 ){
                selecteds.splice(indexs,1);
            }else{
                selecteds.push(selectedItem);
            }

            // 修改选中状态
            this[target][index].selected = !this[target][index].selected;
            // 替换第几条数据并触发数据this[target] 的dom变更
            bui.array.set(this[target],index,this[target][index]);
        },
        moveSelect: function (target,checked,targetB) {

            // 修改按钮状态
            var btn = checked == "selectBChecked" ? "canDel" : "canAdd";
            
            if( this[btn].disabled ){ return; }

            // 移动过去以后,不需要选中状态
            this[checked].forEach(function (item) {
                item.selected = false;
            })

            // 合并并触发 this.selectB
            bui.array.merge(this[target],this[checked]);

            // 删除this.selectA选中数据,通过value字段比对,支持多个
            bui.array.delete(this[targetB],this[checked],"value");

            // 清空暂存区数据
            bui.array.empty(this[checked]);
        },
    },
    watch: {
        selectAChecked: function (data) {
            // 修改添加按钮状态
            this.canAdd.disabled = !data.length;
        },
        selectBChecked: function (data) {
            // 修改删除按钮状态
            this.canDel.disabled = !data.length;
        }
    },
    templates: {
        // 联动的示例,增加了事件绑定
        tplSelect: function (data,target,targetChecked) {

            var html ='';
            data.forEach(function (item,i) {
                var active = item.selected ? "active" : "";
                // $index 为内置的动态索引, i 不一定等于 $index
                html +=`<li b-click='page.setStatus(${target},$index,${targetChecked})' class="bui-btn ${active}">${item.text}</li>`;
            })
            return html;
        }
    }
})
```

```html
<style type="text/css">
    .bui-select .active {
        color: red;
    }
    .btn-controls {
        width: 1rem;
        margin:0 .1rem;
    }
    .btn-controls .bui-btn{
        margin-top:.1rem;
    }
</style>
<div class="bui-box">
    <div class ="span1">
        <div class="subtitle bui-box">
            <div class="span1">列表1</div>
            <b b-text="page.selectAChecked.length"></b>/<b b-text="page.selectA.length"></b>
        </div>
        <div b-template="page.tplSelectA(page.selectA)" class="bui-list">
        </div>
    </div>
    <div class="btn-controls">
        <!-- 传多个数据源字段 -->
        <div b-click="page.moveSelect(selectB,selectAChecked,selectA)" b-class="page.canAdd" class="bui-btn round">&gt;&gt;</div>
        <div b-click="page.moveSelect(selectA,selectBChecked,selectB)" b-class="page.canDel" class="bui-btn round">&lt;&lt;</div>
    </div>
    <div class="span1">
        <div class="subtitle bui-box">
            <div class="span1">列表2</div>
            <b b-text="page.selectBChecked.length"></b>/<b b-text="page.selectB.length"></b>
        </div>
        <div b-template="page.tplSelectB(page.selectB)" class="bui-list">
        </div>
    </div>
</div>
```

### 预览

<a href="http://www.easybui.com/demo/index.html#pages/store/selectm.html" target="_blank">查看效果</a>


[动态表单](form-dynamic.md ':include')

## 总结

数据驱动的改变在于思路的转变, 合理的使用,可以大大的减少手动操作dom的代码. 数据驱动不比dom操作, 有可能需要去理解核心的业务以后才能上手, 所以在代码的设计数据上, 写上自己的设计思路, 这对于后面的维护会很有帮助. 

`bui.store` 并不是必须用到的, 使用单页及模块化已经可以很好的处理各种问题. 只是在一些表单联动上, 你会发现这个真的很有用! 
