loader.define(function(require, exports, module, global){
    // 只定义返回方法，不在模块中执行
    // 缓存购物车数据
    let data = [];

    return {
        data: data,
        add(opt){

            // 添加购物车方法
            data.push(opt);

            console.log(data)
        },
        remove(id){
            // 删除购物车的某个数据
            bui.array.delete(data,id,"id");
        }
    }
})
