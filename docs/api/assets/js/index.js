// 菜单控制器
// window.onload = function (argument) {
//     var menu = document.getElementById("sidemenu"),
//         sidebar = document.getElementById("sidebar"),
//         sidebarItem = document.querySelectorAll("#api-classes li");

//     var sidebarStatus = false;
//     menu.onclick = function (argument) {

//         if( !sidebarStatus ){
//             sidebar.classList.add('sidebar-menu-active');
//             sidebarStatus = true;
//         }else{
//             sidebar.classList.remove('sidebar-menu-active');
//             sidebarStatus = false;
//         }

//     }
    
//     // sidebarItem.forEach(function (el,index) {
//     //     el.addEventListener("click", function(){
//     //         sidebar.classList.remove('sidebar-menu-active');
//     //         sidebarStatus = false;
//     //     });
//     // })

// }
// 
// 在页面顶部显示滚动条进度
function scrollProgress() {

    var obj = window,
        $obj = $(obj),
        // 是否被嵌套在iframe里
        target = window.parent.length ? window.parent.document.body : window.document.body,
        $target = $(target),
        scrollHeight,
        scrollTop,
        objHeight = $obj.height(),
        progressHtml = '<div id="scrollprogress" style="height:2px;overflow:hidden;width :0;background: #0072c6;position:fixed;top:0;left:0;z-index:100;-webkit-transition:all 200ms;-moz-transition:all 200ms;transition:all 200ms"></div>',
        $progress = $target.find("#scrollprogress");

    if( !$progress.length ){
        $target.append(progressHtml);
        $progress = $target.find("#scrollprogress");
    }else{
        //清空滚动条进度
        $progress.width(0);
    }

    $obj.on("scroll",function () {

        scrollHeight =  document.body.scrollHeight;
        scrollTop =  document.body.scrollTop;

        progressWidth = ((scrollTop)/(scrollHeight-objHeight) * 100)+"%";
        $progress.width(progressWidth)
    })
}

// 滚动返回顶部
function scrollTop(argument) {
    var scrollTopStyle = 'display:none;position:fixed;border-radius:3px;bottom:30px;right:30px;cursor:pointer;background:rgba(0,0,0,0.7);width:40px;height:40px;text-align:center;line-height:40px;font-size:24px;color:#fff;';
    var arrowStyle = 'display:inline-block;width:14px;height:14px;border-top:2px solid #ccc;border-right:2px solid #ccc;-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);transform:rotate(-45deg)';
    var scrollTopHtml = '<div class="scrolltop" title="在页面双击可以快速返回顶部" style="'+scrollTopStyle+'"><div title="在页面双击可以快速返回顶部" style="'+arrowStyle+'"></div></div>';
    var $scrollTop = $(".scrolltop");

    if( !$scrollTop.length ){
        $("body").append(scrollTopHtml);
        $scrollTop = $(".scrolltop");
    }

    $(window).on("scroll",function(){
        var scrolltop=$(this).scrollTop();
        if(scrolltop>=200){     
            $scrollTop.fadeIn();
        }else{
            $scrollTop.fadeOut();
        }
    });

    // 双击返回
    // $("body").dblclick(function (argument) {
    //     $("html,body").animate({scrollTop: 0}, 500);    
    // });

    // 单击也可以返回
    $scrollTop.click(function(){
        $("html,body").animate({scrollTop: 0}, 500);    
    });     

}
// 检测是否是移动端
function testMobile(argument) {
    var isMobile = false;//默认PC端
    // 检测userAgent
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {
    　　isMobile = true;
    }
    return isMobile;
}
function sidebarInit() {
    var sidebarHeight = $(window).height() - 153 ;

    if( !testMobile()){
        $("#api-tabview-panel").height(sidebarHeight);
    }

    $(window).on("resize",function () {
        var sidebarHeight2 = $(window).height() - 153 ;

        $("#api-tabview-panel").height(sidebarHeight2);
    })
}

(function ($) {
    $(function () {
        // 文档阅读进度
        scrollProgress();
        // 文档滚动到顶部
        scrollTop();
        // 左栏固定
        sidebarInit();
    })
})(jQuery)