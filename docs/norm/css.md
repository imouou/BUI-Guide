# 切图规范

> 开发者可以跳过 切图制作流程. 

BUI有独特的自适应规范,这个规范跟正常的web切图流程一致, 唯一需要注意的就是单位的转换, BUI的制作是基于rem缩放, 无需关注viewport或scale, 在bui里面, 基于540px设计稿量取大小, 1rem = 100px; 这样做出来的应用,能保持在各种系统,各种浏览器,保持跟设计稿一致的效果. 

## 按源稿大小切图
1. 打开PSD源稿
2. 选中图片,导出为PNG格式, ( 这里用到一个 <a href="http://www.cutterman.cn/zh/cutterman" target="_target">cutterman</a> PS插件;
2. 把图片放到BUI开发包的 `images` 目录下;
>images目录里面可以自行规划,例如:icons,banner等;

**演示:**
![切图](http://www.easybui.com/docs/images/cutimage_low.gif)

## 转换设计稿大小
> BUI独创的基于REM适配手机,保持跟原生DPI一致的缩放效果, 需要把设计稿转换为540的设计稿,这样量取到的值,直接除以100,便是rem值.


5.2.1. 把设计稿更改为`540px`宽度,高度等比缩放的设计稿

![修改设计稿为540宽度](http://www.easybui.com/docs/images/modify540.png)

5.2.2. 量取设计稿内容的大小/100, 转成rem单位
![转换尺寸为rem单位](http://www.easybui.com/docs/images/getSlideHeight.png)

>**说明:**
如果希望slide的高度随着移动设备的不同比例缩放,需要转换成rem单位, 比方,你量取到的宽度是`540px`,高度是`270px`的焦点图, 那么写成 `2.7rem = 270px/100` ; 这样页面的slide,就会根据手机的分辨率不同,自动更改为等比的焦点图.
```
.slide { width:100%;height:2.7rem; } 
```
----
**如果写成`270px` 会有什么问题呢? **
答: 如果是写成`270px` 那么页面的高度就剩下不多(iphone4 高度`480px`,iphone5 高度`568px`),最终做出来的页面,跟设计稿会有比较大的误差.而设置成`2.7rem`以后,就会随着不同DPI而转换成等比的高度; 换句话说,设计搞放到手机上是什么样子,做出来就是什么样子, 精确还原.

----
**那么是不是所有的 px 都需要这样转换呢? **
答: `1px` 不需要转换,直接就写`1px`;

## 编写结构

**BUI 标准的页面结构**
```
<div class="bui-page">
    <header>
        <!-- 头部内容 -->
    </header>
    <main>
        <!-- 正文内容 -->
    </main>
    <footer>
        <!-- 底部内容 -->
    </footer>
</div>
```
> **标准结构说明:** BUI的页面分为上中下结构,中间main是主要内容的容器(唯一).BUI会去计算main的容器高度,除去header,footer以后的高度,所以如果你有内容要放底部,就放footer里面.

## 布局
BUI的布局简单强大,学会则没有布不了的局.

<a href="http://www.easybui.com/demo/ui/layout.html" target="_target">弹性布局</a> (点击看更多示例)

```
// 弹性等分布局: span1容器放内容或控件,如果还有span1 则是1/3 大小...
<div class="bui-box">
    <div class="span1">
        1/2大小
    </div>
    <div class="span1">
        1/2大小
    </div>
</div>

// 弹性自适应布局: span1容器的宽度 = 页面宽度 - 100 
<div class="bui-box">
    <div style="width:100px;"></div>
    <div class="span1">
        // 自适应内容
    </div>
</div>
```

<a href="http://www.easybui.com/demo/ui/layout.html#p4" target="_target">流式布局</a> (点击看更多示例)

```
// 流式等分布局: 6+6 = 12 = 一行, 最大也就span12
<div class="bui-fluid">
    <div class="span6">
        1/2大小
    </div>
    <div class="span6">
        1/2大小
    </div>
</div>
// 自由比例: 3+3+4+2 = 12 = 一行, 最大也就span12
<div class="bui-fluid">
    <div class="span3"></div>
    <div class="span3"></div>
    <div class="span4"></div>
    <div class="span2"></div>
</div>
```

<a href="http://www.easybui.com/demo/ui/layout.html#p7" target="_target">流式等列布局</a> (点击看更多示例)

```
// 流式等列布局:
<ul class="bui-fluid-2">
    <li>
        1/2大小
    </li>
    <li>
        1/2大小
    </li>
</ul>
```