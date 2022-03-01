loader.define(function(require, exports, module, global) {
    var params = bui.history.getParams(module.id);

    // 初始化数据行为存储
    var bs = bui.store({
        el: `#${module.id}`,
        scope: "article",
        data: {
           datas: {},
        },
        methods: {
            bindShare(){
                // 绑定分享
                var uiActionsheet = bui.actionsheet({
                    trigger: ".btn-share",
                    buttons: [{ name: "分享到微博", value: "weibo" }, { name: "朋友圈", value: "pyq" }],
                    callback: function(e) {
                        var val = $(e.target).attr("value");
                        if (val == "cancel") {
                            this.hide();
                        }
                    }
                })
            },
            getDetail(id){
                global.ajax({
                    url: `${module.path}article.json`,
                    data: {
                        id:id
                    }
                }).then((result)=>{
                    // 正常直接取到对应的返回对象即可，这个接口返回所有数据，需要通过id比对获取当前数据的形式。
                    let datas = bui.array.get(result.data,id,"id");
                    // 赋值模板
                    this.datas = datas;
                },function(result,status){
                    // 失败 console.log(status)
                });
            }
        },
        templates: {
            tpl(data){
                let html = `<h1>${data.title}</h1>
                <div class="article-info bui-box">
                    <span class="article-from">互联网</span>
                    <div class="span1"> <i class="icon-time"> 2021-03-14</i></div>
                    <i class="icon-comment"> 42</i>
                    <i class="icon-eye"> 142</i>
                </div>
                <section>
                    <p><img src="${data.image}" alt=""></p>
                    ${data.content}
                </section>`
                return html;
            }
        },
        mounted: function(){
            // 获取详情
            this.getDetail(params.id);
            // 绑定分享
            this.bindShare();
        }
    })

    
})