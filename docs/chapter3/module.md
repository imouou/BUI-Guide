# 模块

> 模块：模块是一个应用里面对局部通用业务的划分，只跟部分业务关联抽离出来的方法。

## 特点

| 特点                | BUI模块           | BUI组件     |  ES6模块     
|:--------------------:|:---------------:|:---------------:|:---------------:|
| 静态编译  |       支持      | 支持      |   支持  
| 动态编译  |       支持      | 支持      |   <span style="color:red">不支持</span>  
| 一次性加载  |       支持      | 支持      |   支持  
| 按需加载  |       支持      | 支持      |   <span style="color:red">不支持</span>    

BUI组件跟模块的进一步区别：组件包含 html、js文件，且是默认执行初始化的；模块只有js文件，只定义，不执行。


## 模块定义

*pages/main/cart.js*

```js
loader.define(function(requires, exports, module, global){
    // 只定义返回方法，不在模块中执行
    // 缓存购物车数据
    let data = [];

    return {
        data: data,
        add(opt){
            // 添加购物车方法
            data.push(opt);
        },
        remove(id){
            // 删除购物车的某个数据
            bui.array.delete(data,id,"id");
        }
    }
})
```

## 模块使用

*pages/main/main.js*

方法1: 使用依赖前置的方式，模块中都可以调用

```js
loader.define(["pages/main/cart"],function(cart, requires, exports, module, global){
    
    // 业务组件中调用对应的方法
    cart.add({
        id:"cart1",
        name:"",
        type:"",
    })
})
```


方法2: 局部使用

```js
loader.define(function(requires, exports, module, global){
    
    // 异步局部使用
    requires("pages/main/cart",function(cart){
        // 业务组件中调用对应的方法
        cart.add({
            id:"cart1",
            name:"",
            type:"",
        })
    })
    
})
```

方法3: 同步使用

```js
loader.define(async function(requires, exports, module, global){
    
    // 方法1: 
    // const cart = await requires("pages/main/cart");
    // 方法2:
    const cart = await loader.require("pages/main/cart");

    // 业务组件中调用对应的方法
    cart.add({
        id:"cart1",
        name:"",
        type:"",
    })

    console.log(cart.data)
    
})
```