"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[199],{5680:(e,t,r)=>{r.d(t,{xA:()=>p,yg:()=>m});var n=r(6540);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var l=n.createContext({}),c=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},y=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(r),y=o,m=d["".concat(l,".").concat(y)]||d[y]||u[y]||a;return r?n.createElement(m,i(i({ref:t},p),{},{components:r})):n.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=y;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}y.displayName="MDXCreateElement"},2830:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var n=r(9668),o=(r(6540),r(5680));const a={},i="Seer API",s={unversionedId:"modules/seer/header",id:"modules/seer/header",title:"Seer API",description:"This library provides an abstraction around the Window.postMessage API",source:"@site/../docs/modules/seer/header.md",sourceDirName:"modules/seer",slug:"/modules/seer/header",permalink:"/probe.gl/docs/modules/seer/header",draft:!1,editUrl:"https://github.com/visgl/probe.gl/tree/master/docs/../docs/modules/seer/header.md",tags:[],version:"current",frontMatter:{}},l={},c=[{value:"Install",id:"install",level:2},{value:"Notes",id:"notes",level:2}],p={toc:c},d="wrapper";function u(e){let{components:t,...r}=e;return(0,o.yg)(d,(0,n.A)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"seer-api"},"Seer API"),(0,o.yg)("p",null,"This library provides an abstraction around the ",(0,o.yg)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage"},"Window.postMessage API"),"\nto interact with the Seer extension."),(0,o.yg)("p",null,"How the communication is done exactly relies on the bridge, that you can checkout\nin its dedicated directory. The following schema represent the\ncomplete data flow:"),(0,o.yg)("img",{src:"https://cdn.pbrd.co/images/92al0O7cY.png",height:"300"}),(0,o.yg)("h2",{id:"install"},"Install"),(0,o.yg)("p",null,"Simply download the package from the npm registry"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"yarn add seer\n")),(0,o.yg)("h2",{id:"notes"},"Notes"),(0,o.yg)("p",null,"The extension will declare a ",(0,o.yg)("inlineCode",{parentName:"p"},"__SEER_INITIALIZED__")," boolean on the window,\nthat you can use to check if the extension is installed and prevent any useless\nprocessing in production or for real-users."))}u.isMDXComponent=!0}}]);