"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[489],{5680:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>m});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(n),g=r,m=u["".concat(s,".").concat(g)]||u[g]||d[g]||i;return n?a.createElement(m,l(l({ref:t},c),{},{components:n})):a.createElement(m,l({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=g;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},1196:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(9668),r=(n(6540),n(5680));const i={},l="Stats",o={unversionedId:"modules/stats/stats",id:"modules/stats/stats",title:"Stats",description:"A collection of statistic for tracking time or magnitude metrics.",source:"@site/../docs/modules/stats/stats.md",sourceDirName:"modules/stats",slug:"/modules/stats/",permalink:"/probe.gl/docs/modules/stats/",draft:!1,editUrl:"https://github.com/visgl/probe.gl/tree/master/docs/../docs/modules/stats/stats.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Stat",permalink:"/probe.gl/docs/modules/stats/stat"},next:{title:"StatsWidget",permalink:"/probe.gl/docs/modules/stats-widget/"}},s={},p=[{value:"Usage",id:"usage",level:2},{value:"Methods",id:"methods",level:2},{value:"constructor",id:"constructor",level:3},{value:"get",id:"get",level:3},{value:"reset",id:"reset",level:3},{value:"forEach",id:"foreach",level:3},{value:"getTable",id:"gettable",level:3}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.yg)(u,(0,a.A)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"stats"},"Stats"),(0,r.yg)("p",null,"A collection of statistic for tracking time or magnitude metrics."),(0,r.yg)("h2",{id:"usage"},"Usage"),(0,r.yg)("p",null,"Just create Stat objects (see ",(0,r.yg)("inlineCode",{parentName:"p"},"Stat")," documentation) for various metrics."),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-js"},"import {Stats} from '@probe.gl/stats';\n\nconst stats = new Stats({id: 'my-stats'});\nconst memoryUsage = stats.get('Mem');\nconst executionTime = stats.get('Time');\nmemoryUsage.addCount(1024);\nexecutionTime.timeStart();\nexecutionTime.timeEnd();\n")),(0,r.yg)("h2",{id:"methods"},"Methods"),(0,r.yg)("h3",{id:"constructor"},"constructor"),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"new Stats({id, stats})")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"id")," (",(0,r.yg)("inlineCode",{parentName:"li"},"String"),") - the id of the ",(0,r.yg)("inlineCode",{parentName:"li"},"Stats")," object."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"stats")," (",(0,r.yg)("inlineCode",{parentName:"li"},"Stat[] || Object[]"),") - the list of stats. Each element in the stats could be either",(0,r.yg)("inlineCode",{parentName:"li"},"Stat")," object or ",(0,r.yg)("inlineCode",{parentName:"li"},"{name, type}")," (type is optional, default is ",(0,r.yg)("inlineCode",{parentName:"li"},"count"),");")),(0,r.yg)("h3",{id:"get"},"get"),(0,r.yg)("p",null,"Retrieve a stat tracker. Create it if it doesn't already exist."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"stats.get(name, type)")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"name")," (",(0,r.yg)("inlineCode",{parentName:"li"},"String"),", required) - the name of the stat tracker."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"type")," (",(0,r.yg)("inlineCode",{parentName:"li"},"String"),", optional) - the type of the stat tracker. Default is ",(0,r.yg)("inlineCode",{parentName:"li"},"count"),".")),(0,r.yg)("p",null,"Supported types are described in ",(0,r.yg)("a",{parentName:"p",href:"/docs/modules/stats/stat"},"Stat")),(0,r.yg)("p",null,"Returns the ",(0,r.yg)("inlineCode",{parentName:"p"},"Stat")," object identified by ",(0,r.yg)("inlineCode",{parentName:"p"},"name"),"."),(0,r.yg)("h3",{id:"reset"},"reset"),(0,r.yg)("p",null,"Resets all stats."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"stats.reset()")),(0,r.yg)("h3",{id:"foreach"},"forEach"),(0,r.yg)("p",null,"Iterate over all stats."),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"stats.forEach(fn)")),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("inlineCode",{parentName:"li"},"fn")," (",(0,r.yg)("inlineCode",{parentName:"li"},"Function"),", required) - function to call on each ",(0,r.yg)("inlineCode",{parentName:"li"},"Stat")," object.")),(0,r.yg)("h3",{id:"gettable"},"getTable"),(0,r.yg)("p",null,"Return stats in a format suitable for ",(0,r.yg)("inlineCode",{parentName:"p"},"console.table")),(0,r.yg)("p",null,(0,r.yg)("inlineCode",{parentName:"p"},"stats.getTable()")))}d.isMDXComponent=!0}}]);