
# 组件化

组件的按钮例子改为store版本

```html
<div class="bui-btn" b-class="btn.color" b-text="btn.text" b-click="btn.submit">按钮</div>
```

```js
loader.define(function(requires,exports,module,global){

    // 接收外部参数
    let props = module.props;

    var bs = bui.store({
        el: `#${module.id}`,
        scope: 'btn',
        data: {
            text: props.text || "",
            color: props.color || "",
        },
        mounted(){
            // 加载完成后初始化
        },
        methods: {
        submit(e){
            bui.alert("绑定点击事件")
        }
        }
    })
    
    return bs;
})
```

使用

```html
<component name="pages/components/btn" color="primary"></component>
```
