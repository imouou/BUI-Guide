// 手机调试请自行去掉
// import VConsole from 'vconsole';

// const vConsole = new VConsole();

window.router = bui.router();

bui.ready(function(global) {
    
    // 初始化路由
    router.init({
        id: "#bui-router",
        progress: true,
        hash: true,
        indexModule:{
            template:"pages/login/index.html",
            script:"pages/login/index.js",
        },
        beforeLoad(e){
            let token = global.storage.get("token",0);
            // 如果不在登录页，且没有用户信息，则只能进入首页
            if( e.target.name !== "main" && !token){
                bui.load({
                    url:"main"
                })
                // 禁止进入其它页面
                return false;
            }
        }
    })

    // 绑定事件
    bind();

    // 事件类定义
    function bind() {
        // 绑定页面的所有按钮有href跳转
        bui.btn({ id: "#bui-router", handle: ".bui-btn" }).load();

        // 统一绑定页面所有的后退按钮
        $("#bui-router").on("click", ".btn-back", function(e) {
            // 支持后退多层,支持回调
            bui.back();
        })
    }
})