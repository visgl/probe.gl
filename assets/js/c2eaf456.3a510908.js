"use strict";(self.webpackChunkproject_website=self.webpackChunkproject_website||[]).push([[657],{5680:(e,t,n)=>{n.d(t,{xA:()=>g,yg:()=>y});var a=n(6540);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function m(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},g=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},u="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,o=e.parentName,g=m(e,["components","mdxType","originalType","parentName"]),u=p(n),d=i,y=u["".concat(o,".").concat(d)]||u[d]||s[d]||l;return n?a.createElement(y,r(r({ref:t},g),{},{components:n})):a.createElement(y,r({ref:t},g))}));function y(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,r=new Array(l);r[0]=d;var m={};for(var o in t)hasOwnProperty.call(t,o)&&(m[o]=t[o]);m.originalType=e,m[u]="string"==typeof e?e:i,r[1]=m;for(var p=2;p<l;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},1945:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>r,default:()=>s,frontMatter:()=>l,metadata:()=>m,toc:()=>p});var a=n(9668),i=(n(6540),n(5680));const l={},r="Stat",m={unversionedId:"modules/stats/stat",id:"modules/stats/stat",title:"Stat",description:"A tracker for a single statistic.",source:"@site/../docs/modules/stats/stat.md",sourceDirName:"modules/stats",slug:"/modules/stats/stat",permalink:"/probe.gl/docs/modules/stats/stat",draft:!1,editUrl:"https://github.com/visgl/probe.gl/tree/master/docs/../docs/modules/stats/stat.md",tags:[],version:"current",frontMatter:{},sidebar:"defaultSidebar",previous:{title:"Log",permalink:"/probe.gl/docs/modules/log/"},next:{title:"Stats",permalink:"/probe.gl/docs/modules/stats/"}},o={},p=[{value:"Usage",id:"usage",level:2},{value:"Properties",id:"properties",level:2},{value:"name : String",id:"name--string",level:3},{value:"count : Number",id:"count--number",level:3},{value:"time : Number",id:"time--number",level:3},{value:"lastTiming : Number",id:"lasttiming--number",level:3},{value:"lastSampleTime : Number",id:"lastsampletime--number",level:3},{value:"Methods",id:"methods",level:2},{value:"constructor",id:"constructor",level:3},{value:"incrementCount",id:"incrementcount",level:3},{value:"decrementCount",id:"decrementcount",level:3},{value:"addCount",id:"addcount",level:3},{value:"subtractCount",id:"subtractcount",level:3},{value:"timeStart",id:"timestart",level:3},{value:"timeEnd",id:"timeend",level:3},{value:"addTime",id:"addtime",level:3},{value:"getHz",id:"gethz",level:3},{value:"getAverageTime",id:"getaveragetime",level:3},{value:"getAverageCount",id:"getaveragecount",level:3},{value:"getSampleHz",id:"getsamplehz",level:3},{value:"getSampleAverageTime",id:"getsampleaveragetime",level:3},{value:"getSampleAverageCount",id:"getsampleaveragecount",level:3}],g={toc:p},u="wrapper";function s(e){let{components:t,...n}=e;return(0,i.yg)(u,(0,a.A)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,i.yg)("h1",{id:"stat"},"Stat"),(0,i.yg)("p",null,"A tracker for a single statistic."),(0,i.yg)("h2",{id:"usage"},"Usage"),(0,i.yg)("p",null,"Create a ",(0,i.yg)("inlineCode",{parentName:"p"},"Stat")," instance using ",(0,i.yg)("inlineCode",{parentName:"p"},"Stats.get"),". There are two basic usage patterns, ",(0,i.yg)("inlineCode",{parentName:"p"},"timer")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"counter"),".\n",(0,i.yg)("inlineCode",{parentName:"p"},"Timer")," usage involves the methods ",(0,i.yg)("inlineCode",{parentName:"p"},"timeStart"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"timeEnd"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"addTime"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"getHz"),", and ",(0,i.yg)("inlineCode",{parentName:"p"},"getAverageTime"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-js"},"import {Stats} from '@probe.gl/stats';\n\nconst stats = new Stats({id: 'my-stats'});\nconst executionTime = stats.get('Time');\nexecutionTime.timeStart();\nexecutionTime.timeEnd();\nexecutionTime.addTime(16);\n\n// getHz and getAverageTime based on the\n// number of individual timings that were taken\nexecutionTime.getHz();\nexecutionTime.getAverageTime();\n")),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"Counter")," usage involves the methods ",(0,i.yg)("inlineCode",{parentName:"p"},"incrementCount"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"decrementCount"),", ",(0,i.yg)("inlineCode",{parentName:"p"},"addCount"),", and ",(0,i.yg)("inlineCode",{parentName:"p"},"subtractCount"),":"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-js"},"const stats = new Stats({id: 'my-stats'});\nconst memoryUsage = stats.get('Mem');\nmemoryUsage.incrementCount();\nmemoryUsage.decrementCount();\nmemoryUsage.addCount(1024);\nmemoryUsage.subtractCount(512);\n")),(0,i.yg)("p",null,"For time statistics, the ",(0,i.yg)("inlineCode",{parentName:"p"},"Stat")," object can also define a sample window, to only update ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," or ",(0,i.yg)("inlineCode",{parentName:"p"},"time")," after a given number of samples are taken:"),(0,i.yg)("pre",null,(0,i.yg)("code",{parentName:"pre",className:"language-js"},"const stats = new Stats({id: 'my-stats'});\nconst executionTime = stats.get('Time').setSampleSize(3);\nexecutionTime.addTime(1);\nexecutionTime.addTime(2);\n// `time` is still 0 at this point\nexecutionTime.getHz();          // => 0\nexecutionTime.getAverageTime(); // => 0\n\nexecutionTime.addTime(3);\n// Now `time` = 6\nexecutionTime.getAverageTime(); // => 2\nexecutionTime.addTime(1);\nexecutionTime.addTime(1);\nexecutionTime.addTime(1);\nexecutionTime.getAverageTime();       // => 1.5\nexecutionTime.getSampleAverageTime(); // => 1 (only from the last sample set)\n")),(0,i.yg)("h2",{id:"properties"},"Properties"),(0,i.yg)("h3",{id:"name--string"},"name : String"),(0,i.yg)("p",null,"Name of the stat."),(0,i.yg)("h3",{id:"count--number"},"count : Number"),(0,i.yg)("p",null,"Accumulated count or number of timings."),(0,i.yg)("h3",{id:"time--number"},"time : Number"),(0,i.yg)("p",null,"Accumulated time from all timings."),(0,i.yg)("h3",{id:"lasttiming--number"},"lastTiming : Number"),(0,i.yg)("p",null,"Last timing taken."),(0,i.yg)("h3",{id:"lastsampletime--number"},"lastSampleTime : Number"),(0,i.yg)("p",null,"Timing of the last completed set of samples."),(0,i.yg)("h2",{id:"methods"},"Methods"),(0,i.yg)("h3",{id:"constructor"},"constructor"),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"new Stat(name, type)")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"name")," (",(0,i.yg)("inlineCode",{parentName:"li"},"String"),") - the name of the stat."),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"type")," (",(0,i.yg)("inlineCode",{parentName:"li"},"String"),") - the type of the stat.")),(0,i.yg)("p",null,"Supported options:"),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"count")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"averageTime")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"totalTime")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"fps")),(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"memory"))),(0,i.yg)("h3",{id:"incrementcount"},"incrementCount"),(0,i.yg)("p",null,"Increase ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," by ",(0,i.yg)("inlineCode",{parentName:"p"},"1"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.incrementCount()")),(0,i.yg)("h3",{id:"decrementcount"},"decrementCount"),(0,i.yg)("p",null,"Decrease ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," by ",(0,i.yg)("inlineCode",{parentName:"p"},"1"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.decrementCount()")),(0,i.yg)("h3",{id:"addcount"},"addCount"),(0,i.yg)("p",null,"Increase ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," by ",(0,i.yg)("inlineCode",{parentName:"p"},"value"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.addCount(value)")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"value")," (",(0,i.yg)("inlineCode",{parentName:"li"},"Number"),", required) - the amount to add to ",(0,i.yg)("inlineCode",{parentName:"li"},"count"),".")),(0,i.yg)("h3",{id:"subtractcount"},"subtractCount"),(0,i.yg)("p",null,"Decrease ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," by ",(0,i.yg)("inlineCode",{parentName:"p"},"value"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.subtractCount(value)")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"value")," (",(0,i.yg)("inlineCode",{parentName:"li"},"Number"),", required) - the amount to subtract from ",(0,i.yg)("inlineCode",{parentName:"li"},"count"),".")),(0,i.yg)("h3",{id:"timestart"},"timeStart"),(0,i.yg)("p",null,"Start a timer."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.timeStart()")),(0,i.yg)("h3",{id:"timeend"},"timeEnd"),(0,i.yg)("p",null,"End a timer. Time elapsed since the last ",(0,i.yg)("inlineCode",{parentName:"p"},"timeStart")," is\nadded to ",(0,i.yg)("inlineCode",{parentName:"p"},"time")," and ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," is incremented by ",(0,i.yg)("inlineCode",{parentName:"p"},"1"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.timeEnd()")),(0,i.yg)("h3",{id:"addtime"},"addTime"),(0,i.yg)("p",null,"Increase ",(0,i.yg)("inlineCode",{parentName:"p"},"time")," by ",(0,i.yg)("inlineCode",{parentName:"p"},"value")," and increment ",(0,i.yg)("inlineCode",{parentName:"p"},"count")," by ",(0,i.yg)("inlineCode",{parentName:"p"},"1"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.addTime(value)")),(0,i.yg)("ul",null,(0,i.yg)("li",{parentName:"ul"},(0,i.yg)("inlineCode",{parentName:"li"},"value")," (",(0,i.yg)("inlineCode",{parentName:"li"},"Number"),", required) - time in millisecons to add to ",(0,i.yg)("inlineCode",{parentName:"li"},"time"),".")),(0,i.yg)("h3",{id:"gethz"},"getHz"),(0,i.yg)("p",null,"Calculate the average number of timing events per second (i.e. ",(0,i.yg)("inlineCode",{parentName:"p"},"samples / (time * 1000)"),"."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.getHz()")),(0,i.yg)("h3",{id:"getaveragetime"},"getAverageTime"),(0,i.yg)("p",null,"Calculate the average amount of time take per timing event in milliseconds (i.e. ",(0,i.yg)("inlineCode",{parentName:"p"},"time / samples"),")."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.getAverageTime()")),(0,i.yg)("h3",{id:"getaveragecount"},"getAverageCount"),(0,i.yg)("p",null,"Calculate the average count per sampling (i.e. ",(0,i.yg)("inlineCode",{parentName:"p"},"count / samples"),")."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.getAverageCount()")),(0,i.yg)("h3",{id:"getsamplehz"},"getSampleHz"),(0,i.yg)("p",null,"Calculate the average number of timing events per second (i.e. ",(0,i.yg)("inlineCode",{parentName:"p"},"samples / (time * 1000)")," for the last completed set of samples."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.getHz()")),(0,i.yg)("h3",{id:"getsampleaveragetime"},"getSampleAverageTime"),(0,i.yg)("p",null,"Calculate the average amount of time take per timing event in milliseconds (i.e. ",(0,i.yg)("inlineCode",{parentName:"p"},"time / samples"),") for the last completed set of samples."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.getAverageTime()")),(0,i.yg)("h3",{id:"getsampleaveragecount"},"getSampleAverageCount"),(0,i.yg)("p",null,"Calculate the average count per sampling (i.e. ",(0,i.yg)("inlineCode",{parentName:"p"},"count / samples"),") for the last completed set of samples."),(0,i.yg)("p",null,(0,i.yg)("inlineCode",{parentName:"p"},"stat.getAverageTime()")))}s.isMDXComponent=!0}}]);