# 第三方插件

### 1. 全局引入

插件必须放在 *src/js/plugins/* 目录下，插件才不会被2次编译。

*src/index.html*

```html
<!-- 例如：引入插件的样式，在head标签里 -->
<link href="js/plugins/echarts/echarts.css"></link>

<!-- 例如：引入插件脚本，在body底部 -->
<script src="js/plugins/echarts/echarts.js"></script>
```

### 2. 按需动态引入

在需要引入的地方，通过 *loader.import* 动态引入

```js
loader.define(function(requires, exports, module, global) {

    // 例如：异步导入
    loader.import(["js/plugins/echarts/echarts.css","js/plugins/echarts/echarts.js"], function() {
        // 回调里才能拿到 echarts全局变量
        echarts.init()
    });

})
```

!> 有些插件，例如高德地图，只支持全局引入。

### 3. 导入NPM模块

1.7.0 以上支持引入NPM模块，且默认工程已经加入 *vconsole* 模块，如果没有，请先执行以下命令。导入的npm模块最终是静态编译在脚本中。

执行安装模块命令
```bash
# 进入工程
cd bui-demo
# 安装模块
npm i vconsole --save
```

在需要的地方导入模块

*src/index.js*

```js
// 导入手机调试模块
import VConsole from 'vconsole';
// 初始化手机调试
const vConsole = new VConsole();
```
