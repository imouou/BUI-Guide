"use strict";loader.define(function(t,e,r,i){return bui.store({el:"#formpage",scope:"form",data:{datas:{username:"",password:"",comfirmpassword:"",sex:"woman"}},methods:{regexFromString:function(t){t=/^\/(.*)\/([a-z]*)$/.exec(t);return new RegExp(t[1],t[2])},checkRule:function(t,e){var r=t.getAttribute("rule"),i=t.getAttribute("tip"),r=this.regexFromString(r),t=t.value;if(t&&!r.test(t))return bui.hint(i),!1},checkForm:function(t){for(var e in t)if(""===t[e])return bui.hint("".concat(e,"的内容不能为空")),!1;return t.password!==t.comfirmpassword&&bui.hint("两次密码不一致，请检查后提交"),!0},submit:function(){this.checkForm(this.datas)&&bui.ajax({url:i.apiurl+"json/token.json",data:this.datas}).then(function(t){bui.hint("提交成功")})},reset:function(){this.datas={username:"",password:"",comfirmpassword:"",sex:""},bui.hint("重置成功")}},templates:{},mounted:function(){}})});