/**
 * 首页模块
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(function(requires, exports, module, global){

    // 轮播图动态渲染
    global.ajax({
        url: global.apiurl + "json/slide.json",
    }).then(function(result){
        // 把数据处理成远程图片展示，正常开发不需要这步操作
        let data = result.data.map(function(item,index){
            return {image: "http://easybui.com/demo/"+item.image }
        })

        loader.delay({
            id:"#slide",
            param: {
                height: 300,
                data: data
            }
        })

    })
    // 登录页
    var loginPage = null;
    
    // 初始化数据行为存储
    const bs = bui.store({
        el: `#${module.id}`,
        scope: "list",
        data: {
           datas: [],
        },
        mounted: function(){
            // 请求列表数据
            this.getList({
                url:`${module.path}main.json`,
                data: {}
            })
        },
        methods: {
            login(){
                // 并传参给登录页，登录页登录成功以后，指向
                if( loginPage ){
                    loginPage.open();
                    return;
                }
                loginPage = bui.page({
                    url:"pages/login/page.html",
                    param: {}
                })                
            },
            refresh(){
                // 配合弹窗关闭时的方法，执行数据刷新方法, 例如新增数据
                this.datas.push({
                    "id":"bui4",
                    "title":"文章标题4",
                    "image":"images/applogo.png",
                    "desc":"文章的内容简介"
                })
            },
            getList(opt){
                bui.ajax(opt).then((result)=>{
                    // 请求成功就赋值
                    this.datas = result.data;

                },function(result,status){
                    // 失败 console.log(status)
                });
            }
        },
        watch: {},
        computed: {},
        templates: {
            tplList:function(data){
                let html = "";
                data.forEach(item => {
                    html +=`<li class="bui-btn bui-box" href="pages/article/article.html?id=${item.id}">
                            <div class="thumbnail"><img src="${item.image}"></div>
                            <div class="span1">${item.title}</div>
                            <i class="icon-listright"></i>
                        </li>`
                });

                return html;
            }
        }
    })

    return bs;
})