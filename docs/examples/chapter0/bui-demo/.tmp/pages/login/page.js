"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_typeof2=_interopRequireDefault(require("@babel/runtime/helpers/typeof"));loader.define(function(e,t,a,r){return bui.store({el:"#loginpart",scope:"form",data:{datas:{username:"",password:"",save:!1}},methods:{checkForm:function(e){for(var t in e)if(""===e[t])return bui.hint("".concat(t,"的内容不能为空")),!1;return!0},savePassword:function(e){this.$data.datas.save?r.storage.set("userinfo",e):r.storage.remove("userinfo")},close:function(){bui.history.getPageDialog(a.id).close()},submit:function(){var t=this;this.checkForm(this.datas)&&bui.ajax({url:r.apiurl+"json/token.json",data:this.datas}).then(function(e){bui.hint("登录成功"),t.savePassword(t.$data.datas),t.close(),bui.history.getLast("exports").refresh()})}},templates:{},mounted:function(){var e=r.storage.get("userinfo",0);"object"===(0,_typeof2.default)(e)&&(this.datas=e)}})});