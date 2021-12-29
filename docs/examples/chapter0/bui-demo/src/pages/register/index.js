loader.define(function(requires, exports, module, global){
    // 初始化数据行为存储
    const bs = bui.store({
        el: `#formpage`,    // 容器下的行为指令
        scope: "form",      // 容器下的相同作用域指令
        data: {
            datas: {
                username:"",    // 账号名
                password:"",    // 密码
                comfirmpassword:"",//确认密码
                sex:"woman",         //性别
            }
        },
        methods: {
            regexFromString(string) {
                // 把正则字符串转为表达式
                var match = /^\/(.*)\/([a-z]*)$/.exec(string) 
             
                return new RegExp(match[1], match[2])
            },
            checkRule(dom,keyname){
                // 自定义规则
                let rule = dom.getAttribute("rule");
                // 自定义提醒
                let tip = dom.getAttribute("tip");
                // 转正则
                let regexp = this.regexFromString(rule);
                // 取值
                let val = dom.value;

                if( val && !regexp.test(val) ){
                    // 清空错误格式
                    // this.datas[keyname] = ""
                    // 提醒
                    bui.hint(tip)
                    return false;
                }
            },
            checkForm(datas){
                // 全局校验
                for(let key in datas ){
                    let item = datas[key];
                    if( item === ""){
                        bui.hint(`${key}的内容不能为空`)
                        return false;
                    }
                }
                if( datas["password"] !== datas["comfirmpassword"]){
                    bui.hint(`两次密码不一致，请检查后提交`)
                }
                return true;
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
                    bui.hint("提交成功")
                })
            },
            reset(){
                this.datas = {
                    username:"",    // 账号名
                    password:"",    // 密码
                    comfirmpassword:"",//确认密码
                    sex:"",         //性别
                }
                bui.hint("重置成功");
            }
        },
        templates: {},
        mounted: function(){
            // 数据解析后执行
        }
    })

    return bs;
})
