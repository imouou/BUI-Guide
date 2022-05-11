# 数据存储

> bui.storage 是基于localStorage，sessionStorage封装的存储对象及多条数据的方法库。

## 存储数据

```js
// 初始化，默认使用localstorage保存一条数据
const uiStorage = bui.storage();

uiStorage.set("userinfo",{
    username:"bui",
})
```

## 存储多条数据

```js
// 可以存2条数据，大于2则覆盖最先存储的一条数据
const uiStorage = bui.storage({size:2});

// 存储第1条
uiStorage.set("userinfo",{
    username:"wangxiaoo",
})
// 存储第2条
uiStorage.set("userinfo",{
    username:"bui",
})
// 存储第3条, username:"wangxiaoo" 会删除，变成第一条数据为 username:"bui"
uiStorage.set("userinfo",{
    username:"easybui",
})

```


## 获取数据

```js

// 获取到数组
let uinfos = uiStorage.get("userinfo");

// 获取第一条数据
let uinfo = uiStorage.get("userinfo",0);

```

## 删除数据

```js

// 删除第一条数据
uiStorage.remove("userinfo",0);

// 删除整个字段
uiStorage.remove("userinfo");

```

## 缓存案例


**效果预览**

![预览图](../static/images/template/login.png)

新增一个登录页，增加登录缓存功能。

*pages/login/login.html*
```html
<div id="loginpage" class="bui-page bui-box-vertical">
    <main>
        <ul class="bui-list">
            <li class="bui-btn bui-box clearactive">
                <label class="bui-label">帐号</label>
                <div class="span1">
                    <input type="text" class="bui-input" value="" placeholder="请输入邮箱@qq.com" b-model="form.datas.username">
                </div>
            </li>
            <li class="bui-btn bui-box clearactive">
                <label class="bui-label">密码</label>
                <div class="span1">
                    <input type="password" class="bui-input" value="" placeholder="请输入密码" b-model="form.datas.password">
                </div>
            </li>
            <li class="bui-btn bui-box clearactive">
                <label class="bui-label">保存密码</label>
                <div class="span1">
                    <input type="checkbox" class="bui-checkbox" b-model="form.datas.save">
                </div>
            </li>
        </ul>
        <div class="container-y">
            <div class="bui-box-space">
                <div class="span1">
                    <div class="bui-btn round primary" b-click="form.submit">登录</div>
                </div>
            </div>
        </div>
    </main>
</div>

```

*pages/login/login.js*

```js
loader.define(function(requires, exports, module, global){

    // 初始化数据行为存储
    const bs = bui.store({
        el: `#loginpage`,    // 容器下的行为指令
        scope: "form",      // 容器下的相同作用域指令
        data: {
            datas: {
                username:"",    // 账号名
                password:"",    // 密码
                save: false,     //保存密码
            },
        },
        methods: {
            savePassword(val){
                // 保存密码
                if(this.$data.datas.save){
                    global.storage.set("userinfo",val);
                }else{
                    global.storage.remove("userinfo");
                }
            },
            submit(){

                bui.ajax({
                    url: global.apiurl + "json/token.json",
                    data: this.datas // 表单收集到的内容
                }).then((res)=>{
                    bui.hint("登录成功")
                    // 成功的账号才需要保存密码，且密码应该使用md5之类的进行加密再存储到本地
                    this.savePassword(this.$data.datas);
                    // 保存token
                    global.storage.set("token",res.data);

                    // 跳转首页
                    bui.load({
                        url:"main"
                    })
                })
            },
        },
        templates: {},
        mounted: function(){
            // 获取本地缓存
            let uinfo = global.storage.get("userinfo",0);

            // 如果有缓存数据，则赋值
            typeof uinfo ==="object" &&( this.datas = uinfo);
        }
    })

    return bs;
})

```

把storage放在了global.js的公共方法里，可以通过global.storage调用，具体代码请查看整个案例。