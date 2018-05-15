# 样式规范


## 字体图标

[图标内置样式](http://www.easybui.com/demo/#pages/ui/icon)

[更多图标预览](http://www.easybui.com/demo/font/demo.html)

?> 样式名 `icon` 及 `icon-` 开头默认自带了字体图标的样式, 如果需要自定义图标或引入第三方图标,建议更改样式名为 `icons-` 或其它命名. 

## 布局样式

| **布局**   | **子元素**            | **描述**            |
|:------------- |:-------------------|:-------------------|
| bui-box       | span1 - span12     | 弹性布局    |
| bui-box-space       | span1 - span12     | 留白弹性布局    |
| bui-box-vertical       | span1 - span12     | 垂直方向    |
| bui-box-reverse       | span1 - span12     | 反序排列    |
| bui-fluid       | span1 - span12     | 流式布局    |
| bui-fluid-space       | span1 - span12     | 留白流式布局    |
| bui-fluid-5       | span1 | 流式5列等比布局, 数字支持1-12    |
| bui-fluid-space-5  | span1 | 流式5列等比留白布局, 数字支持1-12    |
| bui-left       |       | 左浮动    |
| bui-right       |       | 右浮动    |
| bui-clear       |       | 清除浮动    |

## 布局对齐 

| **布局**   | **子元素**            | **描述**            |
|:------------- |:-------------------|:-------------------|
| bui-box-center  | div     | 块元素水平垂直居中    |
| bui-box-align-center  | div     | 水平居中    |
| bui-box-align-left  | div     | 居左对齐    |
| bui-box-align-right  | div     | 居右对齐    |
| bui-box-align-middle  | div     | 垂直居中对齐    |
| bui-box-align-top  | div     | 顶部对齐    |
| bui-box-align-bottom  | div     | 底部对齐    |
| bui-box-align-justify  | div     | 两端对齐    |
| bui-box-align-stretch  | div     | 子集高度拉伸等高    |

## 全局样式-常用类

| **样式名**   | **描述**            |
|:------------- |:-------------------|
| bui-btn-       | 自定义按钮,后面跟名字,自带bui-btn样式  |
| container-x       | 左右间隙    |
| container-y       | 上下间隙    |
| container-xy       | 上下左右间隙    |
| active       | 按钮高亮颜色    |
| clearactive       | 清除按钮高亮,常用于表单    |
| inline       | 内联元素    |
| round       | 圆角    |
| noround       | 没有圆角    |
| ring       | 圆    |
| large       | 加大高度    |
| xlarge       | 超大高度    |
| bui-reset       | 按钮样式重置    |
| bui-show       | 显示块元素    |
| bui-hide       | 隐藏块元素    |

## 全局样式-颜色类

| **样式名**   | **描述**            |
|:------------- |:-------------------|
| default       | 默认颜色    |
| primary       | 页面主颜色    |
| success       | 一般是绿色    |
| warning       | 一般是橘红色   |
| danger       | 列表的分组标题    |

## 全局样式-标题类 

| **样式名**   | **描述**            |
|:------------- |:-------------------|
| page-title       | 页面标题    |
| title       | 文章标题    |
| subtitle       | 文章子标题    |
| section-title       | 章节标题,常用于页面的模块划分    |
| bui-btn-title       | 列表的分组标题    |
| item-title       | 列表的多行标题    |
| item-text       | 列表的多行内容    |

## 全局样式-文本类 

| **样式名**   | **描述**            |
|:------------- |:-------------------|
| bui-align-left       | 文本左对齐    |
| bui-align-right       | 文本右对齐    |
| bui-align-center       | 文本居中对齐    |
| bui-text-show       | 文本显示    |
| bui-text-hide       | 文本超出点点点    |
| bui-box-text-hide    | 文本2行超出点点点    |
| bui-text-clip       | 文本超出截断    |

## 全局样式-箭头类 

| **样式名**   | **描述**            |
|:------------- |:-------------------|
| bui-arrow-left       | 左边箭头,需要父级增加 positon:relative;    |
| bui-arrow-right       | 右边箭头,需要父级增加 positon:relative;    |
| bui-arrow-up       | 顶部箭头,需要父级增加 positon:relative;    |
| bui-arrow-down       | 底部箭头,需要父级增加 positon:relative;    |


## 注意事项 
* `active` 是控件的公共样式,请通过父层的方式定义 `.bui-nav .active{}` ,不要直接 `.active {}` ;
* BUI的样式单位都需要以 rem 为单位, 也就是量到的px除以100 就能转换成rem, 除了`1px` 不做转换;
<strong class="hint">注意: </strong> `.bui-nav .active{}` 也会修改到使用bui-nav的其它控件, 所以如果跟业务相关,请直接加上自己的业务样式进行修改;

