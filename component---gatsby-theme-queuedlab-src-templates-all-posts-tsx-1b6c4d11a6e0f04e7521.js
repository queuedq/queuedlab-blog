/*! For license information please see component---gatsby-theme-queuedlab-src-templates-all-posts-tsx-1b6c4d11a6e0f04e7521.js.LICENSE.txt */
(self.webpackChunkmain_blog=self.webpackChunkmain_blog||[]).push([[843],{382:function(e,t){var n;!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var i=a.apply(null,n);i&&e.push(i)}}else if("object"===l)if(n.toString===Object.prototype.toString)for(var o in n)r.call(n,o)&&n[o]&&e.push(o);else e.push(n.toString())}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},6250:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(9373),a=n.n(r),l=n(7378),i=n(5414),o=n(4645),s=function(e){var t=e.posts;return l.createElement("ul",{className:"PostList-module--postList--3dqv+"},t.map((function(e){var t=e.title,n=e.summary,r=e.datePublished,s=e.category,u=e.url;return l.createElement("li",{className:"PostList-module--postCard--upW8f",key:t},l.createElement("h3",{className:"PostList-module--postTitle--Ehf90"},l.createElement(i.Link,{to:u},t)),s?l.createElement(i.Link,{className:"PostList-module--postCategory--r85XS",to:"/categories/"+a()(s)},s):null,l.createElement("time",{className:"PostList-module--postDate--Ws4z+"},(0,o.p)(r)),n?l.createElement("div",{className:"PostList-module--postSummary--B5lLm"},n):null)})))}},5928:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(7378),a=n(9703),l=n(2980),i=n(6250),o=n(4769),s=n(5414),u=n(382),c=n.n(u),m="Pagination-module--page--k3eVs",p=function(e){var t=e.index,n=e.current,a=e.linkPrefix,l=t===n;return r.createElement(s.Link,{to:a+"/"+t+"/",className:c()([m,l&&"Pagination-module--current--4QgMi"])},t)},f=function(e){var t=e.count,n=e.current,a=e.linkPrefix,l=a+"/"+(n-1)+"/",i=a+"/"+(n+1)+"/",u=1===n,c=n===t;return r.createElement("nav",{"aria-label":"pagination",className:"Pagination-module--pagination--nnVtt"},!u&&r.createElement(s.Link,{to:l,className:m},"Previous"),(0,o.Z)(Array(t)).map((function(e,t){return r.createElement(p,{key:t,index:t+1,current:n,linkPrefix:a})})),!c&&r.createElement(s.Link,{to:i,className:m},"Next"))},d=n(142),g=function(e){var t=e.data,n=e.pageContext,o=n.pageCount,s=n.currentPageNum,u=(0,a.Ty)(t.allRemarkBlogPost.edges);return r.createElement(l.Z,null,r.createElement(d.Z,null),r.createElement(i.Z,{posts:u}),r.createElement(f,{count:o,current:s,linkPrefix:""}))}}}]);
//# sourceMappingURL=component---gatsby-theme-queuedlab-src-templates-all-posts-tsx-1b6c4d11a6e0f04e7521.js.map