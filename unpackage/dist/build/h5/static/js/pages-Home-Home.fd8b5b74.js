(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-Home-Home"],{"6a30":function(t,e,n){"use strict";var i=n("8abf"),a=n.n(i);a.a},"8abf":function(t,e,n){var i=n("981c");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("1e68388e",i,!0,{sourceMap:!1,shadowMode:!1})},"928f":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={uniFab:n("089e").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"home"},[n("SlideNav",{attrs:{navList:t.newsList,navid:t.id},on:{changeId:function(e){arguments[0]=e=t.$handleEvent(e),t.changeNews.apply(void 0,arguments)}}}),0==t.news.length?n("NoData"):t._e(),t._l(t.news,(function(e,i){return n("v-uni-view",{key:i,staticClass:"newsList"},[n("v-uni-view",{staticClass:"newsItem"},[n("v-uni-view",{staticClass:"user_pic"},[n("v-uni-image",{attrs:{src:e.user_pic,alt:""}})],1),n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"user_name"},[t._v(t._s(e.nickname))]),n("v-uni-view",{staticClass:"con"},[t._v(t._s(e.content))]),e.img_list?n("v-uni-view",{staticClass:"imgList",class:1===e.img_list.length||2===e.img_list.length||4===e.img_list.length?"imgList_two":"imgList_three"},t._l(e.img_list,(function(i,a){return n("v-uni-view",{key:i,staticClass:"img",style:{background:"url("+i+")","background-size":"cover",bacgroundRepeat:"no-repeat","background-position":"center"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.seeImg(a,e.img_list)}}})})),1):t._e(),n("v-uni-view",{staticClass:"date"},[t._v(t._s(e.date))])],1)],1)],1)})),n("uni-fab",{attrs:{horizontal:"right",vertical:"bottom",popMenu:!1},on:{fabClick:function(e){arguments[0]=e=t.$handleEvent(e),t.fabClick.apply(void 0,arguments)}}})],2)},s=[]},"981c":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 水平间距 */\n/* 水平间距 */.home[data-v-82060c66]{width:100%}.home .newsList[data-v-82060c66]{width:100%;padding:%?10?% %?20?%;display:flex;flex-direction:column}.home .newsList .newsItem[data-v-82060c66]{width:100%;display:flex;margin-bottom:%?20?%;overflow:hidden}.home .newsList .newsItem .user_pic[data-v-82060c66]{width:%?80?%;height:%?80?%;margin-right:%?20?%}.home .newsList .newsItem .user_pic uni-image[data-v-82060c66]{width:%?80?%;height:%?80?%}.home .newsList .newsItem .content[data-v-82060c66]{display:flex;width:%?630?%;flex-direction:column;padding-right:%?10?%}.home .newsList .newsItem .content .user_name[data-v-82060c66]{font-size:%?30?%;color:#007efe;font-weight:700;margin-bottom:%?10?%}.home .newsList .newsItem .content .con[data-v-82060c66]{font-size:%?20?%;margin-bottom:%?10?%}.home .newsList .newsItem .content .imgList[data-v-82060c66]{display:flex;flex-wrap:wrap;margin-bottom:%?10?%}.home .newsList .newsItem .content .imgList_three .img[data-v-82060c66]{width:33.33%;height:0;padding-bottom:33.33%}.home .newsList .newsItem .content .imgList_two .img[data-v-82060c66]{width:50%;height:0;padding-bottom:50%}.home .newsList .newsItem .content .date[data-v-82060c66]{font-size:%?15?%;color:#999}',""]),t.exports=e},ba5d:function(t,e,n){"use strict";var i=n("4ea4");n("d81d"),n("fb6a"),n("ac1f"),n("1276"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("5530"));n("96cf");var s=i(n("1da1")),o=i(n("c831")),r=i(n("091e")),c={data:function(){return{newsList:[],id:"",news:[]}},components:{NoData:r.default,SlideNav:o.default},onLoad:function(){this.getNewsList(),this.id=1,this.getNews()},onShow:function(){this.getNews()},methods:{getNewsList:function(){var t=this;return(0,s.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$myRequest({url:"/api/getnewslist"});case 2:n=e.sent,0==n.data.status?t.newsList=n.data.data:uni.showToast({title:"服务器出错！"});case 4:case"end":return e.stop()}}),e)})))()},getNews:function(){var t=this;return(0,s.default)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$myRequest({url:"/api/getnews",method:"post",data:{news_id:t.id,page:1,total:10}});case 2:n=e.sent,0==n.data.status?t.news=n.data.data.map((function(t){var e=t.img_list;if(null!==e){var n=e.split("#"),i=t.date.slice(0,10);return n.shift(),(0,a.default)((0,a.default)({},t),{},{img_list:n,date:i})}return t})):uni.showToast({title:"服务器出错！"});case 4:case"end":return e.stop()}}),e)})))()},changeNews:function(t){this.id=t},fabClick:function(){uni.navigateTo({url:"../PublishNews/PublishNews?id=".concat(this.id)})},seeImg:function(t,e){uni.previewImage({current:t,urls:e})}},watch:{id:function(t,e){this.getNews()}}};e.default=c},da23:function(t,e,n){"use strict";n.r(e);var i=n("ba5d"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},f77e:function(t,e,n){"use strict";n.r(e);var i=n("928f"),a=n("da23");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("6a30");var o,r=n("f0c5"),c=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,"82060c66",null,!1,i["a"],o);e["default"]=c.exports}}]);