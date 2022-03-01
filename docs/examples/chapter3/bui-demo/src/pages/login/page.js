loader.define(function(requires, exports, module, global){

    // 初始化数据行为存储
    const bs = bui.store({
        el: `#loginpart`,    // 容器下的行为指令
        scope: "form",      // 容器下的相同作用域指令
        data: {
            datas: {
                username:"",    // 账号名
                password:"",    // 密码
                save: false,     //保存密码
            },
        },
        methods: {
            checkForm(datas){
                // 全局校验
                for(let key in datas ){
                    let item = datas[key];
                    if( item === ""){
                        bui.hint(`${key}的内容不能为空`)
                        return false;
                    }
                }
                return true;
            },
            savePassword(val){
                // 保存密码
                if(this.$data.datas.save){
                    global.storage.set("userinfo",val);
                }else{
                    global.storage.remove("userinfo");
                }
            },
            close(){
                // 关闭登录页，且刷新当前要做的操作
                var dialog = bui.history.getPageDialog(module.id);

                // 关闭当前弹窗
                dialog.close();
                
            },
            submit(){
                // 如果有为空的数据不能提交
                let canSumit = this.checkForm(this.datas);
                if( !canSumit ){
                    return;
                }

                bui.ajax({
                    url: global.apiurl + "json/token.json",
                    data: this.datas // 表单收集到的内容
                }).then((res)=>{
                    bui.hint("登录成功")
                    // 成功的账号才需要保存密码，且密码应该使用md5之类的进行加密再存储到本地
                    this.savePassword(this.$data.datas);
                    // 关闭弹窗并刷新页面
                    this.close();
                    // 获取最后的页面，执行某个刷新方法
                    let lastHistory = bui.history.getLast("exports");
                    lastHistory.refresh();
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
