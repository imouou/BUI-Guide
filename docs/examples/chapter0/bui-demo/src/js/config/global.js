loader.global(function(global) {

    // 公共配置
    // 部署到时候，baseurl改为："http://easybui.com/demo/" 调试的时候为空："",
    let baseurl = "";
    let apiurl = baseurl

    // 公共的本地存储
    const uiStorage = bui.storage();

    /** 
     * @description: 公共的请求方法
     * @param {object} opt 参考 bui.ajax
     * @param {string} opt.url 必填url地址 默认 ""
     * @param {object} [opt.data] 默认 {}
     * @param {string} [opt.method] 默认的请求方法 "GET" | "POST" 
     * @return {*}
     * @example {*}
    * 
        global.ajax({
            url:"http://easybui.com/demo/json/shop.json",
            data:{}
        }).then(function(res){
            // 成功的时候输出
            console.log(res);
        })
    
     */    
    function ajax(opt){

        // 可以公共处理请求的headers
        let opts = $.extend(true,{ headers:{"token":"buixxxx"} },opt);

        return bui.ajax(opts)
    }

    /**
     * @description: 公共的提醒方法，配置从底部弹出效果
     * @param {string} text 文本即可
     * @return {*}
     * @example {*}
    * 
        global.hint("操作成功")

     */    
    function hint(text){
        let opts = $.extend(true,{position:"bottom",effect:"fadeInUp"},{content: text})
        return bui.hint(opts)
    }



    // 一定要抛出这个方法，外部才能调用到
    return {
        baseurl: baseurl,
        apiurl: apiurl,
        storage: uiStorage,
        ajax: ajax,
        hint: hint
    }
})