/**
 * 首页模块
 * 默认模块名: main
 * @return {[object]}  [ 返回一个对象 ]
 */
loader.define(async function(require, exports, module, global){

    // 同步编译按顺序执行

    // 1. 同步请求token
    // global.apiurl + "json/token.json" 本地会转发到 http://easybui.com/demo/json/token.json
    let token = await global.ajax({
        url: global.apiurl + "json/token.json",
        data: {
            uid:"bui"
        }
    })
    // 2. 通过token请求接口
    let result = await global.ajax({
        url: global.apiurl + "json/slide.json",
        data: {
            token:token.data
        }
    })
    // 把数据处理成远程图片展示，正常开发不需要这步操作
    let data = result.data.map(function(item,index){
        return {image: "http://easybui.com/demo/"+item.image }
    })
    // 3. 同步编译
    const uiSlide = await loader.delay({
        id:"#slide",
        param: {
            height: 300,
            data: data
        }
    })

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