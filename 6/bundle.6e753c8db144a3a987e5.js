(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var s=n(537),i=n.n(s),r=n(645),o=n.n(r)()(i());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",s=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),s&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),s&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,s,i,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(s)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);s&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),i&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=i):u[4]="".concat(i)),e.push(u))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var s=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),r="/*# ".concat(i," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},_={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+v(s,2,"0")+":"+v(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,o=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-o:o-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:i,s,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",$={};$[y]=m;var g=function(t){return t instanceof C},b=function t(e,n,s){var i;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();$[r]&&(i=r),n&&($[r]=n,i=r);var o=e.split("-");if(!i&&o.length>1)return t(o[0])}else{var a=e.name;$[a]=e,i=a}return!s&&i&&(y=i),i||!s&&y},w=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new C(n)},M=_;M.l=b,M.i=g,M.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function m(t){this.$L=b(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(p);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return M},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return w(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<w(t)},v.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!M.u(e)||e,f=M.p(t),p=function(t,e){var s=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?s:s.endOf(o)},h=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case u:return c?p(1,0):p(31,11);case l:return c?p(1,v):p(0,v+1);case a:var $=this.$locale().weekStart||0,g=(m<$?m+7:m)-$;return p(c?_-g:_+(6-g),v);case o:case d:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case i:return h(y+"Seconds",2);case s:return h(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=M.p(t),f="set"+(this.$u?"UTC":""),p=(a={},a[o]=f+"Date",a[d]=f+"Date",a[l]=f+"Month",a[u]=f+"FullYear",a[r]=f+"Hours",a[i]=f+"Minutes",a[s]=f+"Seconds",a[n]=f+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var m=this.clone().set(d,1);m.$d[p](h),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[M.p(t)]()},v.add=function(n,c){var d,f=this;n=Number(n);var p=M.p(c),h=function(t){var e=w(f);return M.w(e.date(e.date()+Math.round(t*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===u)return this.set(u,this.$y+n);if(p===o)return h(1);if(p===a)return h(7);var m=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[p]||1,v=this.$d.getTime()+n*m;return M.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},d=function(t){return M.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:p(r,o,!0),A:p(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:i};return s.replace(h,(function(t,e){return e||m[t]||i.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,f){var p,h=M.p(d),m=w(n),v=(m.utcOffset()-this.utcOffset())*t,_=this-m,y=M.m(this,m);return y=(p={},p[u]=y/12,p[l]=y,p[c]=y/3,p[a]=(_-v)/6048e5,p[o]=(_-v)/864e5,p[r]=_/e,p[i]=_/t,p[s]=_/1e3,p)[h]||_,f?y:M.a(y)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return $[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=b(t,e,!0);return s&&(n.$L=s),n},v.clone=function(){return M.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),S=C.prototype;return w.prototype=S,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,C,w),t.$i=!0),w},w.locale=b,w.isDayjs=g,w.unix=function(t){return w(1e3*t)},w.en=$[y],w.Ls=$,w.p={},w}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,a=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:a,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof y},f=function(t,e,n){return new y(t,n,e.$l)},p=function(t){return e.p(t)+"s"},h=function(t){return t<0},m=function(t){return h(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},_=function(t,e){return t?h(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},y=function(){function h(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*u[p(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[p(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(c);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=h.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*u[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/a),t%=a,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/i),t%=i,this.$d.minutes=m(t/s),t%=s,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=_(n,"D"),i=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var a=_(o,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||a.negative,c=i.format||r.format||a.format?"T":"",u=(l?"-":"")+"P"+t.format+e.format+s.format+c+i.format+r.format+a.format;return"P"===u||"-P"===u?"P0D":u},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,e){return e||String(s[t])}))},v.as=function(t){return this.$ms/u[p(t)]},v.get=function(t){var e=this.$ms,n=p(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/u[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var s;return s=e?t*u[p(e)]:d(t)?t.$ms:f(t,this).$ms,f(this.$ms+s*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return f(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},h}();return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return f(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,o=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)&&(t=t.asMilliseconds()),o.bind(this)(t,e)}}}()},607:function(t){t.exports=function(){"use strict";return function(t,e,n){e.prototype.isBetween=function(t,e,s,i){var r=n(t),o=n(e),a="("===(i=i||"()")[0],l=")"===i[1];return(a?this.isAfter(r,s):!this.isBefore(r,s))&&(l?this.isBefore(o,s):!this.isAfter(o,s))||(a?this.isBefore(r,s):!this.isAfter(r,s))&&(l?this.isAfter(o,s):!this.isBefore(o,s))}}}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,s=0;s<e.length;s++)if(e[s].identifier===t){n=s;break}return n}function s(t,s){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=s.base?l[0]+s.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var f=n(d),p={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==f)e[f].references++,e[f].updater(p);else{var h=i(p,s);s.byIndex=a,e.splice(a,0,{identifier:d,updater:h,references:1})}o.push(d)}return o}function i(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,i){var r=s(t=t||[],i=i||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=s(t,i),c=0;c<r.length;c++){var u=n(r[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var s=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");s.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var s="";n.supports&&(s+="@supports (".concat(n.supports,") {")),n.media&&(s+="@media ".concat(n.media," {"));var i=void 0!==n.layer;i&&(s+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),s+=n.css,i&&(s+="}"),n.media&&(s+="}"),n.supports&&(s+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(s+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(s,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={id:s,exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";const t="afterbegin";function e(t,e,n="beforeend"){if(!(t instanceof $))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function s(t,e){if(!(t instanceof $&&e instanceof $))throw new Error("Can replace only components");const n=t.element,s=e.element,i=s.parentElement;if(null===i)throw new Error("Parent element doesn't exist");i.replaceChild(n,s)}var i=n(379),r=n.n(i),o=n(795),a=n.n(o),l=n(569),c=n.n(l),u=n(565),d=n.n(u),f=n(216),p=n.n(f),h=n(589),m=n.n(h),v=n(10),_={};_.styleTagTransform=m(),_.setAttributes=d(),_.insert=c().bind(null,"head"),_.domAPI=a(),_.insertStyleElement=p(),r()(v.Z,_),v.Z&&v.Z.locals&&v.Z.locals;const y="shake";class ${#t=null;constructor(){if(new.target===$)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(y),setTimeout((()=>{this.element.classList.remove(y),t?.()}),600)}}class g extends ${get template(){return'\n  <section class="trip-main__trip-info  trip-info"></section>\n  '}}class b extends ${get template(){return'\n  <div class="trip-info__main"></div>\n  '}}class w extends ${get template(){return'\n  <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n  '}}class M extends ${get template(){return'\n  <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n  '}}class C extends ${get template(){return'\n  <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n  '}}class S extends ${#e=null;constructor(t){super(),this.#e=t}get template(){return function(t){const e=t.filters.map(((t,e)=>function(t,e){const{type:n,count:s}=t;return`<div class="trip-filters__filter">\n                  <input id="filter-${n.toLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${n.toLowerCase()}"     ${e?"checked":""} ${0===s?"disabled":""}>\n                  <label class="trip-filters__filter-label" for="filter-${n.toLowerCase()}">${n}</label>\n                </div>`}(t,0===e))).join("");return`\n<form class="trip-filters" action="#" method="get">\n ${e}\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>\n  `}(this.#e)}}class T extends ${get template(){return'\n<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>\n  '}}class A extends ${get template(){return'\n  <ul class="trip-events__list"></ul>\n  '}}class D extends ${get template(){return'\n  <li class="trip-events__item"></li>\n  '}}var k=n(484),x=n.n(k),E=n(646),O=n.n(E),B=n(607),L=n.n(B);x().extend(O()),x().extend(L());const F=t=>t?{dateTimeFull:x()(t).format("YYYY-MM-DDTHH-mm"),dateFull:x()(t).format("YYYY-MM-DD"),date:x()(t).format("MMM D"),time:x()(t).format("HH:mm"),editableDate:x()(t).format("DD/MM/YY HH:mm")}:"";function H(){return Math.random()}class Y extends ${#n=null;#s=null;constructor({event:t,cityName:e,selectedOffers:n,onArrowClick:s}){super(),this.#n=t,this.cityName=e,this.selectedOffers=n,this.#s=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#i)}get template(){return function(t,e,n){const{basePrice:s,type:i,dateFrom:r,dateTo:o,isFavorite:a}=t,l=F(r),c=F(o),u=((t,e)=>{const n=x()(t),s=x()(e),i=x().duration(s.diff(n)),r=i.days(),o=i.hours(),a=i.minutes();return r>0?`${r.toString().padStart(2,"0")}D ${o.toString().padStart(2,"0")}H ${a.toString().padStart(2,"0")}M`:o>0?`${o.toString().padStart(2,"0")}H ${a.toString().padStart(2,"0")}M`:`${a.toString().padStart(2,"0")}M`})(r,o),d=a?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn";return`\n  <div class="event">\n                <time class="event__date" datetime="${l.dateFull}">${l.date}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${i}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${i} ${e}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="${l.dateTimeFull}">${l.time}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="${c.dateTimeFull}">${c.time}</time>\n                  </p>\n                  <p class="event__duration">${u}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${s}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                  ${n.map((t=>`\n                  <li class="event__offer">\n                    <span class="event__offer-title">${t.title}</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${t.price}</span>\n                  </li>`)).join("")}\n                </ul>\n                <button class="${d}" type="button">\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n  `}(this.#n,this.cityName,this.selectedOffers)}#i=t=>{t.preventDefault(),this.#s()}}const N=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],I="Everything",P="Future",j="Present ",Z="Past",R={EVERYTHING:"Click New Event to create your first point",PAST:"There are no past events now",PRESENT:"There are no present events now",FUTURE:"There are no future events now"};class U extends ${#r=null;#o=null;constructor({event:t,destination:e,destinationsNames:n,offersByType:s,onFormSubmit:i,onCloseButtonClick:r}){super(),this.event=t,this.destination=e,this.destinationsNames=n,this.offersByType=s,this.#r=i,this.#o=r,this.element.addEventListener("submit",this.#a),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l)}get template(){return function(t,e,n,s){const{type:i,dateFrom:r,dateTo:o,basePrice:a,offers:l}=t,c=F(r),u=F(o),d=t=>t.split(" ")[t.split(" ").length-1];return`\n<form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n${N.map((t=>{return`\n                        <div class="event__type-item">\n                          <input id="event-type-${t.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t.toLowerCase()}" ${e=t,e.toLowerCase()===i?"checked":""}>\n                          <label class="event__type-label  event__type-label--${t.toLowerCase()}" for="event-type-${t.toLowerCase()}-1">${t}</label>\n                        </div>`;var e})).join("")}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                    ${i}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${e.name}" list="destination-list-1">\n                    <datalist id="destination-list-1">\n                    ${n.map((t=>`<option value="${t}"></option>`)).join("")}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c.editableDate}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${u.editableDate}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${a}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n\n                      ${s.offers.map((t=>{return`<div class="event__offer-selector">\n                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${d(t.title)}-1" type="checkbox" name="event-offer-${d(t.title)}"\n                        ${e=t.id,l.includes(e)?"checked":""}>\n                        <label class="event__offer-label" for="event-offer-${d(t.title)}-1">\n                          <span class="event__offer-title">${t.title}</span>\n                          &plus;&euro;&nbsp;\n                          <span class="event__offer-price">${t.price}</span>\n                        </label>\n                      </div>`;var e})).join("")}\n\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${e.description}</p>\n\n                    <div class="event__photos-container">\n                      <div class="event__photos-tape">\n                      ${e.pictures.map((t=>`\n                        <img class="event__photo" src="${t.src}" alt="${t.description}">\n                      `)).join("")}\n                      </div>\n                    </div>\n                  </section>\n                </section>\n              </form>\n  `}(this.event,this.destination,this.destinationsNames,this.offersByType)}#a=t=>{t.preventDefault(),this.#r()};#l=t=>{t.preventDefault(),this.#o()}}const W=[{type:"taxi",offers:[{id:"1",title:"Upgrade to a business class",price:120},{id:"2",title:"Order Uber",price:20}]},{type:"bus",offers:[{id:"3",title:"Choose seats",price:5}]},{type:"train",offers:[{id:"4",title:"Choose seats",price:5}]},{type:"ship",offers:[{id:"5",title:"Choose seats",price:5}]},{type:"restaurant",offers:[{id:"6",title:"Choose seats",price:5}]},{type:"drive",offers:[{id:"7",title:"Rent a car",price:200}]},{type:"check-in",offers:[{id:"8",title:"Add breakfast",price:50}]},{type:"sightseeing",offers:[{id:"9",title:"Book tickets",price:40},{id:"15",title:"Lunch in city",price:30}]},{type:"flight",offers:[{id:"10",title:"Add luggage",price:30},{id:"11",title:"Switch to comfort class",price:100},{id:"12",title:"Add meal",price:15},{id:"13",title:"Choose seats",price:5},{id:"14",title:"Travel by train",price:40}]}],q=[{id:"1",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:`http://picsum.photos/300/200?r=${H()}`,description:"Chamonix parliament building"},{src:`http://picsum.photos/300/200?r=${H()}`,description:"Chamonix parliament building"},{src:`http://picsum.photos/300/200?r=${H()}`,description:"Chamonix parliament building"}]},{id:"2",description:"Amsterdam, is a beautiful city, a true asian pearl, with crowded streets.",name:"Amsterdam",pictures:[{src:`http://picsum.photos/300/200?r=${H()}`,description:"Amsterdam parliament building"},{src:`http://picsum.photos/300/200?r=${H()}`,description:"Amsterdam parliament building"},{src:`http://picsum.photos/300/200?r=${H()}`,description:"Amsterdam parliament building"}]},{id:"3",description:"London, is a beautiful city, a true asian pearl, with crowded streets.",name:"London",pictures:[{src:`http://picsum.photos/300/200?r=${H()}`,description:"London parliament building"},{src:`http://picsum.photos/300/200?r=${H()}`,description:"London parliament building"}]},{id:"4",description:"Riga, is a beautiful city, a true asian pearl, with crowded streets.",name:"Riga",pictures:[{src:`http://picsum.photos/300/200?r=${H()}`,description:"Riga parliament building"},{src:`http://picsum.photos/300/200?r=${H()}`,description:"Riga parliament building"}]}];function z(t){var e;return{id:(e=t)[Math.floor(Math.random()*e.length)].id}}const J=[{id:"1",basePrice:1100,dateFrom:"2019-03-10T22:55:56.845Z",dateTo:"2019-03-11T11:22:13.375Z",destination:z(q).id,isFavorite:!1,offers:["1","2"],type:"taxi"},{id:"2",basePrice:1200,dateFrom:"2019-03-10T22:55:56.845Z",dateTo:"2019-03-11T11:22:13.375Z",destination:z(q).id,isFavorite:!0,offers:["11","13","14"],type:"flight"},{id:"3",basePrice:1300,dateFrom:"2019-03-10T22:55:56.845Z",dateTo:"2019-04-11T11:22:13.375Z",destination:z(q).id,isFavorite:!1,offers:["15"],type:"sightseeing"},{id:"4",basePrice:1400,dateFrom:"2019-03-10T22:55:56.845Z",dateTo:"2019-04-11T11:22:13.375Z",destination:z(q).id,isFavorite:!0,offers:["5"],type:"ship"},{id:"5",basePrice:1500,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-08-11T11:22:13.375Z",destination:z(q).id,isFavorite:!1,offers:["7"],type:"drive"}].slice().sort((()=>Math.random()-.5));class X extends ${#c=null;constructor({message:t}){super(),this.#c=t["Everything".toUpperCase()]}get template(){return`\n<p class="trip-events__msg">${this.#c}</p>\n`}}const V={[I]:t=>t,[P]:t=>t.filter((t=>{return(e=t.dateFrom)&&x()().isBefore(e,"D");var e})),[j]:t=>t.filter((t=>{return e=t.dateFrom,n=t.dateTo,x()().isBetween(e,n,"day","[]");var e,n})),[Z]:t=>t.filter((t=>{return(e=t.dateTo)&&x()().isAfter(e,"D");var e}))},G=document.querySelector(".trip-main"),K=G.querySelector(".trip-controls__filters"),Q=document.querySelector(".trip-events"),tt=new class{#u=null;#d=new g;#f=new b;constructor({container:t}){this.#u=t}init(){e(this.#d,this.#u,t),e(this.#f,this.#d.element),e(new w,this.#f.element),e(new M,this.#f.element),e(new C,this.#d.element)}}({container:G}),et=new class{#u=null;#p=new T;constructor({container:t}){this.#u=t}init(){this.#u.querySelector(".trip-events__msg")||e(this.#p,this.#u,t)}}({container:Q}),nt=new class{#h=[];constructor(){this.#h=[]}init(){this.#h=J.splice(0,3)}get events(){return this.#h}},st=new class{#m=[];constructor(){this.#m=[]}init(){this.#m=q}get destinations(){return this.#m}getDestinationById(t){return this.#m.find((({id:e})=>e===t))}get destinationsNames(){return[...this.#m.map((t=>t.name))]}},it=new class{#v=[];constructor(){this.#v=[]}init(){this.#v=W}getDestinations(){return this.#v}getOffersByType(t){return this.#v.find((({type:e})=>e===t))}getCurrentOffers(t,e){return t.offers.filter((t=>e.offers.includes(t.id)))}};nt.init(),st.init(),it.init();const rt=new class{#u=null;#_=null;#y=null;#$=null;#g=new A;#b=null;#w=[];constructor({container:t,eventsModel:e,destinationsModel:n,offersModel:s}){this.#u=t,this.#_=e,this.#y=n,this.#$=s}init(){this.#w=[...this.#_.events],0===this.#w.length&&e(new X({message:R}),this.#u),e(this.#g,this.#u);for(let t=0;t<this.#w.length;t++){this.#b=new D,e(this.#b,this.#g.element);const n=this.#$.getOffersByType(this.#w[t].type),s={offersByType:n,selectedOffers:this.#$.getCurrentOffers(n,this.#w[t]),destination:this.#y.getDestinationById(this.#w[t].destination),destinationsNames:this.#y.destinationsNames};this.#M(this.#w[t],s)}}#M(t,n){const i=t=>{"Escape"===t.key&&(t.preventDefault(),a(),document.removeEventListener("keydown",i))},r=new Y({event:t,selectedOffers:n.selectedOffers,cityName:n.destination.name,onArrowClick:()=>{s(o,r),document.addEventListener("keydown",i)}}),o=new U({event:t,destination:n.destination,destinationsNames:n.destinationsNames,offersByType:n.offersByType,onFormSubmit:()=>{a(),document.removeEventListener("keydown",i)},onCloseButtonClick:()=>{a(),document.removeEventListener("keydown",i)}});function a(){s(r,o)}e(r,this.#b.element)}}({container:Q,eventsModel:nt,destinationsModel:st,offersModel:it}),ot=(at=nt.events,Object.entries(V).map((([t,e])=>({type:t,count:e(at).length}))));var at;const lt=new class{#u=null;#e=null;constructor({container:t,filters:e}){this.#u=t,this.#e=e}init(){e(new S({filters:this.#e}),this.#u)}}({container:K,filters:ot});tt.init(),lt.init(),rt.init(),et.init()})()})();
//# sourceMappingURL=bundle.6e753c8db144a3a987e5.js.map