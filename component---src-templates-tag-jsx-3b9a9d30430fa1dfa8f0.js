(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"1wty":function(t,e,a){"use strict";var o=a("9Hrx"),n=a("N1om"),r=a.n(n),s=a("q1tI"),i=a.n(s),m=a("Wbzz"),p=a("IpnI"),c=a.n(p),l=a("jwng"),u=a("TMeN"),d=a.n(u),g=function(t){function e(){return t.apply(this,arguments)||this}Object(o.a)(e,t);var a=e.prototype;return a.getPostList=function(){var t=[];return this.props.postEdges.forEach((function(e){t.push({path:e.node.fields.slug,category:e.node.frontmatter.category,tags:e.node.frontmatter.tags,cover:e.node.frontmatter.cover,title:e.node.frontmatter.title,summary:e.node.frontmatter.summary,date:Object(l.a)(e.node.fields.date).format(c.a.dateFormat),excerpt:e.node.excerpt,timeToRead:e.node.timeToRead})})),t},a.render=function(){var t=this.getPostList();return i.a.createElement("ul",{className:d.a.postList},t.map((function(t){return i.a.createElement("li",{className:d.a.postCard,key:t.title},i.a.createElement("h3",{className:d.a.postTitle},i.a.createElement(m.Link,{to:t.path},t.title)),t.category?i.a.createElement(m.Link,{className:d.a.postCategory,to:"/categories/"+r()(t.category)},t.category):null,i.a.createElement("time",{className:d.a.postDate},t.date),t.summary?i.a.createElement("div",{className:d.a.postSummary},t.summary):null)})))},e}(i.a.Component);e.a=g},TMeN:function(t,e,a){t.exports={postList:"PostListing-module--postList--UNOnL",postCard:"PostListing-module--postCard--1vEJh",postTitle:"PostListing-module--postTitle--3kS42",postCategory:"PostListing-module--postCategory--19QUM",postDate:"PostListing-module--postDate--L8PHH",postSummary:"PostListing-module--postSummary--2Ezsf"}},ZUrO:function(t,e,a){"use strict";a.r(e),a.d(e,"default",(function(){return l})),a.d(e,"pageQuery",(function(){return u}));var o=a("9Hrx"),n=a("q1tI"),r=a.n(n),s=a("qhky"),i=a("hpys"),m=a("1wty"),p=a("IpnI"),c=a.n(p),l=function(t){function e(){return t.apply(this,arguments)||this}return Object(o.a)(e,t),e.prototype.render=function(){var t=this.props.pageContext.tag,e=this.props.data.allMarkdownRemark.edges;return r.a.createElement(i.a,null,r.a.createElement("div",{className:"tag-container"},r.a.createElement(s.a,{title:'Posts tagged as "'+t+'" | '+c.a.siteTitle}),r.a.createElement(m.a,{postEdges:e})))},e}(r.a.Component),u="2637793037"}}]);
//# sourceMappingURL=component---src-templates-tag-jsx-3b9a9d30430fa1dfa8f0.js.map