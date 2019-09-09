# 常用方法

## 生成唯一ID
### bui.guid() 

*例子:*
```js
var gid = bui.guid();
```

## 类型检测
### bui.typeof(str) 
- 返回字符串,全部是小写.

?> 弥补typeof 无法检测是否是索引对象的问题, null 本身也会返回 object. 

*例子:*
```js
var obj = {
    id: 123
}
var objectStr = bui.typeof(obj);
// "object"

var nullStr = bui.typeof(null);
// "null"

var undefinedStr = bui.typeof(undefined);
// "undefined"

```

## 平台检测
### bui.platform 

?> 通过 `navigator.userAgent` 判断当前的平台类型. 方法名采用驼峰氏命名.

*例子:*

```js
    bui.platform.isIphone();
    bui.platform.isIphoneX();
    bui.platform.isIpad();
    bui.platform.isWeiXin();
    // 平台类
    bui.platform.isIos();
    bui.platform.isAndroid();
    bui.platform.isMac();
    bui.platform.isWindow();
```

## 版本检查
### bui.checkVersion(option) 

?> 这个方法会绑定ID按钮的点击,并且第一次会请求到如果有新版本的时候,会在按钮旁边增加个红点, 如果按钮里面还有图标`icon`,则红点会增加在图标上. 

*例子:*
```html
<div id="checkUpdate" class="bui-btn"></div>
```
```js
bui.checkVersion({
    id: "#checkUpdate",
    currentVersion: "",
    currentVersionCode: "",
    url: "http://www.easybui.com/json/versionUpdate.json"
});
```
*请求的接口返回的json内容*
```js
{
    "versionName": "1.0",          //版本名称
    "versionCode": 20160605,       //版本ID
    "minVersionCode": 20160604,    //最小版本号
    "isForced": true,              //是否强制更新,如果强制更新,需要检测最小版本号
    "downloadUrl": "http://www.easybui.com/download/bui.apk", //安卓下载的地址
    "iosDownloadUrl": "https://itunes.apple.com/cn/app/id1362470378?mt=8",  //Appstore 地址
    "remark": "版本更新的内容"   //新版本的描述,支持html
}
```


## 数组操作
?> 常见的数组比对,去重,复制,过滤,移除 等.

!> <del>1.5.2 以下, 第1个参数为要比对的值,第2个参数为数组. </del> 1.5.2 以上,第1个参数统一为数组, 第2个参数为比对的值, 1.5.2有向下兼容, 但建议全部统一数组在前.

### bui.array.index(arr,name,key)

?> 返回存在的第1个索引,支持普通数组及JSON数组

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","bui"];
var index = bui.array.index( arr,"bui" );

// console.log(index) //结果: 1

//JSON数组: 
var arr = [{ "id":1,value:"hello"},{ "id":2,value:"bui"}];
var index = bui.array.index( arr, "bui", "value" );
// console.log(index) //结果: 1 
```

### bui.array.indexs(arr,name,key)

?> 返回存在的所有索引,支持普通数组及JSON数组

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","bui"];
var index = bui.array.indexs( arr, "bui" );

// console.log(index) //结果: [1,3]

//JSON数组: 
var arr = [{ "id":1,value:"hello"},{ "id":2,value:"bui"}];
var index = bui.array.indexs( arr,"bui", "value" );
// console.log(index) //结果: [1]
```

### bui.array.compare(arr,name,key)

?> 检测是否存在

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","bui"];
var index = bui.array.compare( arr,"bui" );

// console.log(index) //结果: 1

//JSON数组: 
var arr = [{ "id":1,value:"hello"},{ "id":2,value:"bui"}];
var index = bui.array.compare( arr, "bui", "value" );
// console.log(index) //结果: 1 
```

### bui.array.remove(arr,name,key)

?> 删除数组里的某个值,返回一个新数组

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","bui"];
var newArr = bui.array.remove( arr,"bui" );

// console.log(newArr) //结果: ["hello","hi"]

//JSON数组: 
var arr = [{ "id":1,value:"hello"},{ "id":2,value:"bui"}];
var newArr = bui.array.remove( arr, "bui", "value" );
// console.log(newArr) //结果: [{ "id":1,value:"hello"}] 
```


### bui.array.uniq(arr,name,key)

?> 去除重复的值

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","bui"];
var newArr = bui.array.excess(  arr,"bui" );

// console.log(newArr) //结果: ["hello","bui","hi"]

//JSON数组: 
var arr = [{ "id":1,value:"hello"},{ "id":2,value:"bui"},{ "id":3,value:"bui"}];
var newArr = bui.array.excess( arr, "bui", "value" );
// console.log(newArr) //结果: [{ "id":1,value:"hello"},{ "id":2,value:"bui"}] 
```

### bui.array.filter(arr,name,key)

?> 筛选数组,可以用于搜索关键字的检测

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","easybui"];
var newArr = bui.array.filter( arr,"bui" );

// console.log(newArr) //结果: ["bui","easybui"]

//JSON数组: 
var arr = [{ "id":1,value:"hello"},{ "id":2,value:"bui"},{ "id":3,value:"easybui"}];
var newArr = bui.array.filter( arr,"bui", "value" );
// console.log(newArr) //结果: [{ "id":2,value:"bui"},{ "id":3,value:"easybui"}] 
```


### bui.array.copy(arr,from,length)

?> 复制数组或某一部分, from 从第几个开始复制, 默认:0; length 不传则到数组的最后,否则以自身开始算起

*例子:*
```js
//普通数组:
var arr = ["hello","bui","hi","easybui"];
var newArr = bui.array.copy( arr, 1 );
var newArr2 = bui.array.copy( arr, 1,2 );

// console.log(newArr) //结果: ["bui","hi","easybui"]
// console.log(newArr2) //结果: ["bui","hi"]

```


## 打电话
### bui.unit.tel
*例子:*
```js
bui.unit.tel("10086");
```

## 发短信
### bui.unit.sms
*例子:*
```js
bui.unit.sms("10086","CZMM");
```

## 发邮件
### bui.unit.mailto
*例子:*
```js
bui.unit.mailto({
    email:"admin@bui.com",
    cc:"test@bui.com",
    subject:"邮件主题",
    body:"邮件内容"
});
```

## rem转换成px
### bui.unit.remToPx
*例子: 按当前手机的比例转换的rem值 *
```js
bui.unit.remToPx("2");

```

## px转换成rem
### bui.unit.pxToRem
*例子: 按当前手机的比例转换的px值 *
```js
bui.unit.pxToRem("200");

```


