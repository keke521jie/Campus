(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Mine-Mine"],{"016c":function(e,i,n){"use strict";n.d(i,"b",(function(){return o})),n.d(i,"c",(function(){return a})),n.d(i,"a",(function(){return t}));var t={uniIcons:n("b6af").default},o=function(){var e=this,i=e.$createElement,n=e._self._c||i;return n("v-uni-view",{staticClass:"mine"},[n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],staticClass:"login"},[n("v-uni-view",{staticClass:"userinfo"},[n("v-uni-image",{staticClass:"user_pic",attrs:{src:e.user_pic,mode:""}}),n("v-uni-text",{staticClass:"nickname"},[e._v(e._s(e.userInfo.nickname))])],1),n("v-uni-view",{staticClass:"user_handle"},[n("v-uni-view",{staticClass:"item",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.updeuserinfo.apply(void 0,arguments)}}},[n("uni-icons",{staticClass:"icon",attrs:{type:"compose",size:"25"}}),n("v-uni-text",[e._v("修改个人信息")])],1),n("v-uni-view",{staticClass:"item",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.updePwd.apply(void 0,arguments)}}},[n("uni-icons",{staticClass:"icon",attrs:{type:"compose",size:"25"}}),n("v-uni-text",[e._v("修改密码")])],1)],1),n("v-uni-view",{staticClass:"quit",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.quit.apply(void 0,arguments)}}},[n("uni-icons",{staticClass:"icon",attrs:{type:"pulldown",size:"25",color:"#fff"}}),n("v-uni-text",[e._v("退出登录")])],1)],1),n("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:!e.isLogin,expression:"!isLogin"}],staticClass:"no-login"},[n("v-uni-view",{staticClass:"login-btn",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.login.apply(void 0,arguments)}}},[n("v-uni-text",[e._v("登录/注册")])],1)],1)],1)},a=[]},"3c78":function(e,i,n){"use strict";n.r(i);var t=n("016c"),o=n("e50e");for(var a in o)"default"!==a&&function(e){n.d(i,e,(function(){return o[e]}))}(a);n("7132");var s,r=n("f0c5"),u=Object(r["a"])(o["default"],t["b"],t["c"],!1,null,"1f19d160",null,!1,t["a"],s);i["default"]=u.exports},"5a8e":function(e,i,n){"use strict";var t=n("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,n("96cf");var o=t(n("1da1")),a={data:function(){return{isLogin:!1,userInfo:{}}},onShow:function(){this.getUserInfo(),uni.getStorageSync("token")?this.isLogin=!0:this.isLogin=!1},methods:{getUserInfo:function(){var e=this;return(0,o.default)(regeneratorRuntime.mark((function i(){var n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(uni.getStorageSync("token")){i.next=2;break}return i.abrupt("return");case 2:return i.next=4,e.$myRequest({url:"/my/userinfo"});case 4:n=i.sent,0==n.data.status?e.userInfo=n.data.data:uni.showToast({title:"网络出现问题！"});case 6:case"end":return i.stop()}}),i)})))()},updeuserinfo:function(){uni.redirectTo({url:"/pages/UpdateUserInfo/UpdateUserInfo?id=".concat(this.userInfo.id)})},updePwd:function(){uni.redirectTo({url:"/pages/UpdatePwd/UpdatePwd?id=".concat(this.userInfo.id)})},quit:function(){uni.showModal({title:"确定退出？",success:function(e){e.confirm&&uni.removeStorage({key:"token",success:function(){uni.showToast({title:"已退出！"}),uni.switchTab({url:"/pages/Home/Home"})},fail:function(){uni.showToast({title:"操作失败！"})}})},fail:function(){uni.showToast({title:"操作失败！"})}})},login:function(){uni.navigateTo({url:"/pages/Login/Login"})}},computed:{user_pic:function(){return null===this.userInfo.user_pic?"http://152.136.253.106:2000/images/default-userpic.png":this.userInfo.user_pic}}};i.default=a},7132:function(e,i,n){"use strict";var t=n("b3a2"),o=n.n(t);o.a},b3a2:function(e,i,n){var t=n("d138");t.__esModule&&(t=t.default),"string"===typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);var o=n("4f06").default;o("4454ebd1",t,!0,{sourceMap:!1,shadowMode:!1})},d138:function(e,i,n){var t=n("24fb");i=t(!1),i.push([e.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */uni-page-body[data-v-1f19d160]{background-color:#eee}.mine[data-v-1f19d160]{width:100%;padding:%?20?%}.mine .userinfo[data-v-1f19d160]{width:100%;border-radius:%?10?%;display:flex;flex-direction:column;align-items:center;padding:%?35?% 0;background-color:#fff;margin-bottom:%?20?%}.mine .userinfo .user_pic[data-v-1f19d160]{width:%?200?%;height:%?200?%;border-radius:50%;margin-bottom:%?20?%}.mine .userinfo .nickname[data-v-1f19d160]{font-size:%?35?%}.mine .user_handle[data-v-1f19d160]{width:100%;border-radius:%?10?%;display:flex;flex-direction:column;background-color:#fff;overflow:hidden;margin-bottom:%?20?%}.mine .item[data-v-1f19d160]{display:flex;height:%?90?%;border-bottom:%?1?% solid #eee;font-size:%?32?%;padding:0 %?20?%;align-items:center}.mine .item .icon[data-v-1f19d160]{margin-right:%?10?%}.mine .item[data-v-1f19d160]:last-child{border-bottom:none}.mine .quit[data-v-1f19d160]{display:flex;height:%?90?%;border-bottom:%?1?% solid #eee;font-size:%?32?%;padding:0 %?20?%;align-items:center;background-color:#cd5c5c;color:#fff;border-radius:%?10?%}.mine .login-btn[data-v-1f19d160]{display:flex;height:%?90?%;border-bottom:%?1?% solid #eee;font-size:%?32?%;padding:0 %?20?%;align-items:center;background-color:#87ceeb;color:#fff;border-radius:%?10?%;justify-content:center}body.?%PAGE?%[data-v-1f19d160]{background-color:#eee}',""]),e.exports=i},e50e:function(e,i,n){"use strict";n.r(i);var t=n("5a8e"),o=n.n(t);for(var a in t)"default"!==a&&function(e){n.d(i,e,(function(){return t[e]}))}(a);i["default"]=o.a}}]);