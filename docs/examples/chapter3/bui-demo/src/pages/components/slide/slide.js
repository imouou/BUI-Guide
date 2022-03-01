loader.define(function(require, exports, module, global){
    // 1.7.x 支持，接收外部参数
    var props = module.props;
    // 1.6.x 支持，接收外部参数
    // let props = bui.history.getParams(module.id);

    // 通过component 的id进行初始化
    props.id = `#${module.id} .bui-slide`;
    // 处理默认参数
    props.height = props.height || 200;
    props.autopage = true;
    props.data = props.data || [{image: "http://easybui.com/demo/images/banner01.png"},{image: "http://easybui.com/demo/images/banner02.png"}];

    // 初始化:
    const uiSlide = bui.slide(props);

    // 抛出组件供外部调用
    return uiSlide;
})