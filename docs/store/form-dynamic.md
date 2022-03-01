
# 4. 动态表单

<iframe width="320" height="560" src="http://www.easybui.com/demo/#pages/store/form_dynamic" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

```html
<div class="bui-page page-store page-input">
    <header>
        <div  lass="bui-bar">
            <div class="bui-bar-left">
                <a class="bui-btn" onclick="bui.back();"><i class="icon-back"></i></a>
            </div>
            <div class="bui-bar-main">动态表单</div>
            <div class="bui-bar-right">
            </div>
        </div>
    </header>
    <main>
        <div class="bui-btn" b-click="page.add"><i class="icon-plus"></i>添加</div>
        <div b-template="page.tplUser(page.users)">

        </div>

        <div class="container-xy">
            <button class="bui-btn primary round" b-click="page.submitForm">提交</button>
        </div>
    </main>
</div>
```
?> 点击添加会新增一个动态表单, 注意 `$index` 的指向是指向 `b-target="ul"`, 获得的索引,才是跟数据一一对应的.

```js
var bs = bui.store({
    scope: "page", // 用于区分公共数据及当前数据的唯一值
    data: {
        users: [{
            name: "",
            id: ""
        }],
    },
    methods: {
        submitForm: function(e) {
            console.log(this.users)
            return false;
        },
        add: function() {
            this.users.push({
                name: "",
                id: ""
            })
        },
        remove: function(index) {
            console.log(index)
            bui.array.deleteIndex(this.users, index);
        }
    },
    watch: {},
    computed: {},
    templates: {
        tplUser: function(data) {
            var html = `<ul class="bui-list">`;
            var that = this;
            data.forEach(function(item, index) {
                let length = that.users.length - 1;
                html += `<li class="bui-btn-title bui-box clearactive">表单${length}<div class="span1"></div><div class="bui-btn" b-click="page.remove($index)" b-target="ul"><i class="icon-remove"></i></div></li><li class="bui-btn bui-box clearactive">
                <label class="bui-label">姓名</label>
                <div class="span1">
                    <div class="bui-value"><input type="text" name="fname" b-model="page.$index.name" b-target="ul"></div>
                </div>
            </li>
            <li class="bui-btn bui-box clearactive">
                <label class="bui-label">身份证</label>
                <div class="span1">
                    <div class="bui-value"><input type="text" name="fname" b-model="page.$index.id" b-target="ul"></div>
                </div>
            </li>`
            })
            html += `</ul>`

            return html;
        }
    },
    mounted: function() {
        // 加载后执行
    }
})
```