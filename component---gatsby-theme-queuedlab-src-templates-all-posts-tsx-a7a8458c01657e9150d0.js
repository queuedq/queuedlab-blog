/*! For license information please see component---gatsby-theme-queuedlab-src-templates-all-posts-tsx-a7a8458c01657e9150d0.js.LICENSE.txt */
(self.webpackChunkmain_blog=self.webpackChunkmain_blog||[]).push([[843],{382:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if("string"===i||"number"===i)e.push(n);else if(Array.isArray(n)){if(n.length){var l=a.apply(null,n);l&&e.push(l)}}else if("object"===i)if(n.toString===Object.prototype.toString)for(var o in n)r.call(n,o)&&n[o]&&e.push(o);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},6250:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(9373),a=n.n(r),i=n(7378),l=n(5414),o=n(4645),s=function(e){var t=e.posts;return i.createElement("ul",{className:"PostList-module--postList--ZjCZv"},t.map((function(e){var t=e.title,n=e.summary,r=e.datePublished,s=e.category,u=e.url;return i.createElement("li",{className:"PostList-module--postCard--XiQ2b",key:t},i.createElement("h3",{className:"PostList-module--postTitle--1qTuk"},i.createElement(l.Link,{to:u},t)),s?i.createElement(l.Link,{className:"PostList-module--postCategory--3QNwq",to:"/categories/"+a()(s)},s):null,i.createElement("time",{className:"PostList-module--postDate--3SNvb"},(0,o.p)(r)),n?i.createElement("div",{className:"PostList-module--postSummary--211ac"},n):null)})))}},5928:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(7378),a=n(9703),i=n(2980),l=n(6250),o=n(7721),s=n(5414),u=n(382),c=n.n(u),m="Pagination-module--page--GpBLt",p=function(e){var t=e.index,n=e.current,a=e.linkPrefix,i=t===n;return r.createElement(s.Link,{to:a+"/"+t+"/",className:c()([m,i&&"Pagination-module--current--1ObUQ"])},t)},f=function(e){var t=e.count,n=e.current,a=e.linkPrefix,i=a+"/"+(n-1)+"/",l=a+"/"+(n+1)+"/",u=1===n,c=n===t;return r.createElement("nav",{"aria-label":"pagination",className:"Pagination-module--pagination--3eEJt"},!u&&r.createElement(s.Link,{to:i,className:m},"Previous"),(0,o.Z)(Array(t)).map((function(e,t){return r.createElement(p,{key:t,index:t+1,current:n,linkPrefix:a})})),!c&&r.createElement(s.Link,{to:l,className:m},"Next"))},d=n(142),g=function(e){var t=e.data,n=e.pageContext,o=n.pageCount,s=n.currentPageNum,u=(0,a.Ty)(t.allRemarkBlogPost.edges);return r.createElement(i.Z,null,r.createElement(d.Z,null),r.createElement(l.Z,{posts:u}),r.createElement(f,{count:o,current:s,linkPrefix:""}))}}}]);
//# sourceMappingURL=component---gatsby-theme-queuedlab-src-templates-all-posts-tsx-a7a8458c01657e9150d0.js.map