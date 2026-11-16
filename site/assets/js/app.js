function er(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function $d(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}var qn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ba={duration:.5,overwrite:!1,delay:0},uu,fn,Pt,gi=1e8,vt=1/gi,iu=Math.PI*2,G_=iu/4,V_=0,Zd=Math.sqrt,H_=Math.cos,W_=Math.sin,tn=function(e){return typeof e=="string"},kt=function(e){return typeof e=="function"},nr=function(e){return typeof e=="number"},fl=function(e){return typeof e>"u"},Bi=function(e){return typeof e=="object"},Xn=function(e){return e!==!1},fu=function(){return typeof window<"u"},tl=function(e){return kt(e)||tn(e)},Jd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},vn=Array.isArray,X_=/random\([^)]+\)/g,q_=/,\s*/g,kd=/(?:-?\.?\d|\.)+/gi,du=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,ss=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Jh=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,pu=/[+-]=-?[.\d]+/,Y_=/[^,'"\[\]\s]+/gi,$_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ut,Oi,ru,mu,ei={},sl={},Kd,Qd=function(e){return(sl=Us(e,ei))&&yn},dl=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},za=function(e,t){return!t&&console.warn(e)},jd=function(e,t){return e&&(ei[e]=t)&&sl&&(sl[e]=t)||ei},ka=function(){return 0},Z_={suppressEvents:!0,isStart:!0,kill:!1},nl={suppressEvents:!0,kill:!1},J_={suppressEvents:!0},gu={},Ar=[],su={},ep,Hn={},Kh={},Gd=30,il=[],_u="",xu=function(e){var t=e[0],n,i;if(Bi(t)||kt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=il.length;i--&&!il[i].targetTest(t););n=il[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Mu(e[i],n)))||e.splice(i,1);return e},Cr=function(e){return e._gsap||xu(_i(e))[0]._gsap},vu=function(e,t,n){return(n=e[t])&&kt(n)?e[t]():fl(n)&&e.getAttribute&&e.getAttribute(t)||n},Ln=function(e,t){return(e=e.split(",")).forEach(t)||e},Gt=function(e){return Math.round(e*1e5)/1e5||0},Nt=function(e){return Math.round(e*1e7)/1e7||0},as=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},K_=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},al=function(){var e=Ar.length,t=Ar.slice(0),n,i;for(su={},Ar.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},yu=function(e){return!!(e._initted||e._startAt||e.add)},tp=function(e,t,n,i){Ar.length&&!fn&&al(),e.render(t,n,i||!!(fn&&t<0&&yu(e))),Ar.length&&!fn&&al()},np=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Y_).length<2?t:tn(e)?e.trim():e},ip=function(e){return e},ti=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Q_=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Us=function(e,t){for(var n in t)e[n]=t[n];return e},Vd=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Bi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},ol=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Ua=function(e){var t=e.parent||Ut,n=e.keyframes?Q_(vn(e.keyframes)):ti;if(Xn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},j_=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},rp=function(e,t,n,i,s){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},pl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Rr=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},ns=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},e0=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},au=function(e,t,n,i){return e._startAt&&(fn?e._startAt.revert(nl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},t0=function r(e){return!e||e._ts&&r(e.parent)},Hd=function(e){return e._repeat?Os(e._tTime,e=e.duration()+e._rDelay)*e:0},Os=function(e,t){var n=Math.floor(e=Nt(e/t));return e&&n===e?n-1:n},ll=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},ml=function(e){return e._end=Nt(e._start+(e._tDur/Math.abs(e._ts||e._rts||vt)||0))},gl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Nt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),ml(e),n._dirty||ns(n,e)),e},sp=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=ll(e.rawTime(),t),(!t._dur||Wa(0,t.totalDuration(),n)-t._tTime>vt)&&t.render(n,!0)),ns(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-vt}},Fi=function(e,t,n,i){return t.parent&&Rr(t),t._start=Nt((nr(n)?n:!n&&cl(t)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:n||e!==Ut?mi(e,n,t):e._time)+t._delay),t._end=Nt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),rp(e,t,"_first","_last",e._sort?"_start":0),cl(t)||(e._recent=t),i||sp(e,t),e._ts<0&&gl(e,e._tTime),e},ap=function(e,t){return(ei.ScrollTrigger||dl("scrollTrigger",t))&&ei.ScrollTrigger.create(t,e)},op=function(e,t,n,i,s){if(wu(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!fn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ep!==Wn.frame)return Ar.push(e),e._lazy=[s,i],1},n0=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},cl=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},i0=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&n0(e)&&!(!e._initted&&cl(e))||(e._ts<0||e._dp._ts<0)&&!cl(e))?0:1,o=e._rDelay,l=0,c,h,d;if(o&&e._repeat&&(l=Wa(0,e._tDur,t),h=Os(l,o),e._yoyo&&h&1&&(a=1-a),h!==Os(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||fn||i||e._zTime===vt||!t&&e._zTime){if(!e._initted&&op(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?vt:0),n||(n=t&&!d),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&au(e,t,n,!0),e._onUpdate&&!n&&jn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&jn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Rr(e,1),!n&&!fn&&(jn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},r0=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Fs=function(e,t,n,i){var s=e._repeat,a=Nt(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:Nt(a*(s+1)+e._rDelay*s):a,o>0&&!i&&gl(e,e._tTime=e._tDur*o),e.parent&&ml(e),n||ns(e.parent,e),e},Wd=function(e){return e instanceof xn?ns(e):Fs(e,e._dur)},s0={_start:0,endTime:ka,totalDuration:ka},mi=function r(e,t,n){var i=e.labels,s=e._recent||s0,a=e.duration()>=gi?s.endTime(!1):e._dur,o,l,c;return tn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(vn(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},Oa=function(e,t,n){var i=nr(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Xn(l.vars.inherit)&&l.parent;a.immediateRender=Xn(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new Wt(t[0],a,t[s+1])},Pr=function(e,t){return e||e===0?t(e):t},Wa=function(e,t,n){return n<e?e:n>t?t:n},dn=function(e,t){return!tn(e)||!(t=$_.exec(e))?"":t[1]},a0=function(e,t,n){return Pr(n,function(i){return Wa(e,t,i)})},ou=[].slice,lp=function(e,t){return e&&Bi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Bi(e[0]))&&!e.nodeType&&e!==Oi},o0=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return tn(i)&&!t||lp(i,1)?(s=n).push.apply(s,_i(i)):n.push(i)})||n},_i=function(e,t,n){return Pt&&!t&&Pt.selector?Pt.selector(e):tn(e)&&!n&&(ru||!Bs())?ou.call((t||mu).querySelectorAll(e),0):vn(e)?o0(e,n):lp(e)?ou.call(e,0):e?[e]:[]},lu=function(e){return e=_i(e)[0]||za("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return _i(t,n.querySelectorAll?n:n===e?za("Invalid scope")||mu.createElement("div"):e)}},cp=function(e){return e.sort(function(){return .5-Math.random()})},hp=function(e){if(kt(e))return e;var t=Bi(e)?e:{each:e},n=is(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,d=i;return tn(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],d=i[1]),function(f,u,_){var x=(_||t).length,p=a[x],g,v,T,y,w,E,m,S,R;if(!p){if(R=t.grid==="auto"?0:(t.grid||[1,gi])[1],!R){for(m=-gi;m<(m=_[R++].getBoundingClientRect().left)&&R<x;);R<x&&R--}for(p=a[x]=[],g=l?Math.min(R,x)*h-.5:i%R,v=R===gi?0:l?x*d/R-.5:i/R|0,m=0,S=gi,E=0;E<x;E++)T=E%R-g,y=v-(E/R|0),p[E]=w=c?Math.abs(c==="y"?y:T):Zd(T*T+y*y),w>m&&(m=w),w<S&&(S=w);i==="random"&&cp(p),p.max=m-S,p.min=S,p.v=x=(parseFloat(t.amount)||parseFloat(t.each)*(R>x?x-1:c?c==="y"?x/R:R:Math.max(R,x/R))||0)*(i==="edges"?-1:1),p.b=x<0?s-x:s,p.u=dn(t.amount||t.each)||0,n=n&&x<0?y0(n):n}return x=(p[f]-p.min)/p.max||0,Nt(p.b+(n?n(x):x)*p.v)+p.u}},cu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Nt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(nr(n)?0:dn(n))}},up=function(e,t){var n=vn(e),i,s;return!n&&Bi(e)&&(i=n=e.radius||gi,e.values?(e=_i(e.values),(s=!nr(e[0]))&&(i*=i)):e=cu(e.increment)),Pr(t,n?kt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),l=parseFloat(s?a.y:0),c=gi,h=0,d=e.length,f,u;d--;)s?(f=e[d].x-o,u=e[d].y-l,f=f*f+u*u):f=Math.abs(e[d]-o),f<c&&(c=f,h=d);return h=!i||c<=i?e[h]:a,s||h===a||nr(a)?h:h+dn(a)}:cu(e))},fp=function(e,t,n,i){return Pr(vn(e)?!t:n===!0?!!(n=0):!i,function(){return vn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},l0=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},c0=function(e,t){return function(n){return e(parseFloat(n))+(t||dn(n))}},h0=function(e,t,n){return pp(e,t,0,1,n)},dp=function(e,t,n){return Pr(n,function(i){return e[~~t(i)]})},u0=function r(e,t,n){var i=t-e;return vn(e)?dp(e,r(0,e.length),t):Pr(n,function(s){return(i+(s-e)%i)%i+e})},f0=function r(e,t,n){var i=t-e,s=i*2;return vn(e)?dp(e,r(0,e.length-1),t):Pr(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},zs=function(e){return e.replace(X_,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(q_);return fp(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},pp=function(e,t,n,i,s){var a=t-e,o=i-n;return Pr(s,function(l){return n+((l-e)/a*o||0)})},d0=function r(e,t,n,i){var s=isNaN(e+t)?0:function(u){return(1-u)*e+u*t};if(!s){var a=tn(e),o={},l,c,h,d,f;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(vn(e)&&!vn(t)){for(h=[],d=e.length,f=d-2,c=1;c<d;c++)h.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var x=Math.min(f,~~_);return h[x](_-x)},n=t}else i||(e=Us(vn(e)?[]:{},e));if(!h){for(l in t)bu.call(o,e,l,"get",t[l]);s=function(_){return Cu(_,o)||(a?e.p:e)}}}return Pr(n,s)},Xd=function(e,t,n){var i=e.labels,s=gi,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(l=a,s=o);return l},jn=function(e,t,n){var i=e.vars,s=i[t],a=Pt,o=e._ctx,l,c,h;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Ar.length&&al(),o&&(Pt=o),h=l?s.apply(c,l):s.call(c),Pt=a,h},Da=function(e){return Rr(e),e.scrollTrigger&&e.scrollTrigger.kill(!!fn),e.progress()<1&&jn(e,"onInterrupt"),e},Ns,mp=[],gp=function(e){if(e)if(e=!e.name&&e.default||e,fu()||e.headless){var t=e.name,n=kt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ka,render:Cu,add:bu,kill:P0,modifier:R0,rawVars:0},a={targetTest:0,get:0,getSetter:_l,aliases:{},register:0};if(Bs(),e!==i){if(Hn[t])return;ti(i,ti(ol(e,s),a)),Us(i.prototype,Us(s,ol(e,a))),Hn[i.prop=t]=i,e.targetTest&&(il.push(i),gu[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}jd(t,i),e.register&&e.register(yn,i,Dn)}else mp.push(e)},Tt=255,Na={aqua:[0,Tt,Tt],lime:[0,Tt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Tt],navy:[0,0,128],white:[Tt,Tt,Tt],olive:[128,128,0],yellow:[Tt,Tt,0],orange:[Tt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Tt,0,0],pink:[Tt,192,203],cyan:[0,Tt,Tt],transparent:[Tt,Tt,Tt,0]},Qh=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Tt+.5|0},_p=function(e,t,n){var i=e?nr(e)?[e>>16,e>>8&Tt,e&Tt]:0:Na.black,s,a,o,l,c,h,d,f,u,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Na[e])i=Na[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Tt,i&Tt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Tt,e&Tt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(kd),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,s=h*2-a,i.length>3&&(i[3]*=1),i[0]=Qh(l+1/3,s,a),i[1]=Qh(l,s,a),i[2]=Qh(l-1/3,s,a);else if(~e.indexOf("="))return i=e.match(du),n&&i.length<4&&(i[3]=1),i}else i=e.match(kd)||Na.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Tt,a=i[1]/Tt,o=i[2]/Tt,d=Math.max(s,a,o),f=Math.min(s,a,o),h=(d+f)/2,d===f?l=c=0:(u=d-f,c=h>.5?u/(2-d-f):u/(d+f),l=d===s?(a-o)/u+(a<o?6:0):d===a?(o-s)/u+2:(s-a)/u+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},xp=function(e){var t=[],n=[],i=-1;return e.split(tr).forEach(function(s){var a=s.match(ss)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},qd=function(e,t,n){var i="",s=(e+i).match(tr),a=t?"hsla(":"rgba(",o=0,l,c,h,d;if(!s)return e;if(s=s.map(function(f){return(f=_p(f,t,1))&&a+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=xp(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(tr,"1").split(ss),d=c.length-1;o<d;o++)i+=c[o]+(~l.indexOf(o)?s.shift()||a+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=e.split(tr),d=c.length-1;o<d;o++)i+=c[o]+s[o];return i+c[d]},tr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Na)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),p0=/hsl[a]?\(/,Su=function(e){var t=e.join(" "),n;if(tr.lastIndex=0,tr.test(t))return n=p0.test(t),e[1]=qd(e[1],n),e[0]=qd(e[0],n,xp(e[1])),!0},Ga,Wn=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],l,c,h,d,f,u,_=function x(p){var g=r()-i,v=p===!0,T,y,w,E;if((g>e||g<0)&&(n+=g-t),i+=g,w=i-n,T=w-a,(T>0||v)&&(E=++d.frame,f=w-d.time*1e3,d.time=w=w/1e3,a+=T+(T>=s?0:s-T),y=1),v||(l=c(x)),y)for(u=0;u<o.length;u++)o[u](w,f,E,p)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(p){return f/(1e3/(p||60))},wake:function(){Kd&&(!ru&&fu()&&(Oi=ru=window,mu=Oi.document||{},ei.gsap=yn,(Oi.gsapVersions||(Oi.gsapVersions=[])).push(yn.version),Qd(sl||Oi.GreenSockGlobals||!Oi.gsap&&Oi||{}),mp.forEach(gp)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(p){return setTimeout(p,a-d.time*1e3+1|0)},Ga=1,_(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Ga=0,c=ka},lagSmoothing:function(p,g){e=p||1/0,t=Math.min(g||33,e)},fps:function(p){s=1e3/(p||240),a=d.time*1e3+s},add:function(p,g,v){var T=g?function(y,w,E,m){p(y,w,E,m),d.remove(T)}:p;return d.remove(p),o[v?"unshift":"push"](T),Bs(),T},remove:function(p,g){~(g=o.indexOf(p))&&o.splice(g,1)&&u>=g&&u--},_listeners:o},d})(),Bs=function(){return!Ga&&Wn.wake()},rt={},m0=/^[\d.\-M][\d.\-,\s]/,g0=/["']/g,_0=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,l,c;s<a;s++)l=n[s],o=s!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(g0,"").trim():+c,i=l.substr(o+1).trim();return t},x0=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},v0=function(e){var t=(e+"").split("("),n=rt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[_0(t[1])]:x0(e).split(",").map(np)):rt._CE&&m0.test(e)?rt._CE("",e):n},y0=function(e){return function(t){return 1-e(1-t)}},is=function(e,t){return e&&(kt(e)?e:rt[e]||v0(e))||t},os=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return Ln(e,function(o){rt[o]=ei[o]=s,rt[a=o.toLowerCase()]=n;for(var l in s)rt[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=rt[o+"."+l]=s[l]}),s},vp=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},jh=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/iu*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*W_((h-a)*s)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:vp(o);return s=iu/s,l.config=function(c,h){return r(e,c,h)},l},eu=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:vp(n);return i.config=function(s){return r(e,s)},i};Ln("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;os(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});rt.Linear.easeNone=rt.none=rt.Linear.easeIn;os("Elastic",jh("in"),jh("out"),jh());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};os("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);os("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});os("Circ",function(r){return-(Zd(1-r*r)-1)});os("Sine",function(r){return r===1?1:-H_(r*G_)+1});os("Back",eu("in"),eu("out"),eu());rt.SteppedEase=rt.steps=ei.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-vt;return function(o){return((i*Wa(0,a,o)|0)+s)*n}}};Ba.ease=rt["quad.out"];Ln("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return _u+=r+","+r+"Params,"});var Mu=function(e,t){this.id=V_++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:vu,this.set=t?t.getSetter:_l},Va=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Fs(this,+t.duration,1,1),this.data=t.data,Pt&&(this._ctx=Pt,Pt.data.push(this)),Ga||Wn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Fs(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Bs(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(gl(this,n),!s._dp||s.parent||sp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Fi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===vt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),tp(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Hd(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Hd(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Os(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-vt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?ll(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-vt?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||s>0&&s<o)&&this.totalTime(Wa(-Math.abs(this._delay),o,s),i!==!1),ml(this),e0(this)},e.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Bs(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,s=this.progress()===1&&Math.abs(this._zTime)!==vt,a;if(s)for(this._tTime-=vt,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+vt){s=!1;break}a=a._next}this.totalTime(i,s)}return this},e.startTime=function(n){if(arguments.length){this._start=Nt(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Fi(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Xn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ll(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=J_);var i=fn;return fn=n,yu(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),fn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Wd(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Wd(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(mi(this,n),Xn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Xn(i)),this._dur||(this._zTime=-vt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-vt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-vt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-vt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=kt(n)?n:ip,l=function(){var h=i.then;i.then=null,s&&s(),kt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=h),a(o),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},e.kill=function(){Da(this)},r})();ti(Va.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-vt,_prom:0,_ps:!1,_rts:1});var xn=(function(r){$d(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Xn(n.sortChildren),Ut&&Fi(n.parent||Ut,er(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&ap(er(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return Oa(0,arguments,this),this},t.from=function(i,s,a){return Oa(1,arguments,this),this},t.fromTo=function(i,s,a,o){return Oa(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,Ua(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Wt(i,s,mi(this,a),1),this},t.call=function(i,s,a){return Fi(this,Wt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,l,c,h){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new Wt(i,a,mi(this,l)),this},t.staggerFrom=function(i,s,a,o,l,c,h){return a.runBackwards=1,Ua(a).immediateRender=Xn(a.immediateRender),this.staggerTo(i,s,a,o,l,c,h)},t.staggerFromTo=function(i,s,a,o,l,c,h,d){return o.startAt=a,Ua(o).immediateRender=Xn(o.immediateRender),this.staggerTo(i,s,o,l,c,h,d)},t.render=function(i,s,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Nt(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,u,_,x,p,g,v,T,y,w,E,m;if(this!==Ut&&h>l&&i>=0&&(h=l),h!==this._tTime||a||d){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),f=h,y=this._start,T=this._ts,g=!T,d&&(c||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,s,a);if(f=Nt(h%p),h===l?(x=this._repeat,f=c):(w=Nt(h/p),x=~~w,x&&x===w&&(f=c,x--),f>c&&(f=c)),w=Os(this._tTime,p),!o&&this._tTime&&w!==x&&this._tTime-w*p-this._dur<=0&&(w=x),E&&x&1&&(f=c-f,m=1),x!==w&&!this._lock){var S=E&&w&1,R=S===(E&&x&1);if(x<w&&(S=!S),o=S?0:h%c?c:h,this._lock=1,this.render(o||(m?0:Nt(x*p)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&jn(this,"onRepeat"),this.vars.repeatRefresh&&!m&&(this.invalidate()._lock=1,w=x),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,R&&(this._lock=2,o=S?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!m&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=r0(this,Nt(o),Nt(f)),v&&(h-=f-(f=v._start))),this._tTime=h,this._time=f,this._act=!!T,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&h&&c&&!s&&!w&&(jn(this,"onStart"),this._tTime!==h))return this;if(f>=o&&i>=0)for(u=this._first;u;){if(_=u._next,(u._act||f>=u._start)&&u._ts&&v!==u){if(u.parent!==this)return this.render(i,s,a);if(u.render(u._ts>0?(f-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(f-u._start)*u._ts,s,a),f!==this._time||!this._ts&&!g){v=0,_&&(h+=this._zTime=-vt);break}}u=_}else{u=this._last;for(var A=i<0?i:f;u;){if(_=u._prev,(u._act||A<=u._end)&&u._ts&&v!==u){if(u.parent!==this)return this.render(i,s,a);if(u.render(u._ts>0?(A-u._start)*u._ts:(u._dirty?u.totalDuration():u._tDur)+(A-u._start)*u._ts,s,a||fn&&yu(u)),f!==this._time||!this._ts&&!g){v=0,_&&(h+=this._zTime=A?-vt:vt);break}}u=_}}if(v&&!s&&(this.pause(),v.render(f>=o?0:-vt)._zTime=f>=o?1:-1,this._ts))return this._start=y,ml(this),this.render(i,s,a);this._onUpdate&&!s&&jn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(y===this._start||Math.abs(T)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Rr(this,1),!s&&!(i<0&&!o)&&(h||o||!l)&&(jn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(nr(s)||(s=mi(this,s,i)),!(i instanceof Va)){if(vn(i))return i.forEach(function(o){return a.add(o,s)}),this;if(tn(i))return this.addLabel(i,s);if(kt(i))i=Wt.delayedCall(0,i);else return this}return this!==i?Fi(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-gi);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof Wt?s&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,a)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return tn(i)?this.removeLabel(i):kt(i)?this.killTweensOf(i):(i.parent===this&&pl(this,i),i===this._recent&&(this._recent=this._last),ns(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Nt(Wn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=mi(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=Wt.delayedCall(0,s||ka,a);return o.data="isPause",this._hasPause=1,Fi(this,o,mi(this,i))},t.removePause=function(i){var s=this._first;for(i=mi(this,i);s;)s._start===i&&s.data==="isPause"&&Rr(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)Er!==o[l]&&o[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=_i(i),l=this._first,c=nr(s),h;l;)l instanceof Wt?K_(l._targets,o)&&(c?(!Er||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&a.push(l):(h=l.getTweensOf(o,s)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=mi(a,i),l=s,c=l.startAt,h=l.onStart,d=l.onStartParams,f=l.immediateRender,u,_=Wt.to(a,ti({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||vt,onStart:function(){if(a.pause(),!u){var p=s.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());_._dur!==p&&Fs(_,p,0,1).render(_._time,!0,!0),u=1}h&&h.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,ti({startAt:{time:mi(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Xd(this,mi(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Xd(this,mi(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+vt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,l=this.labels,c;for(i=Nt(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(c in l)l[c]>=a&&(l[c]+=i);return ns(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),ns(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,l=gi,c,h,d;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(d=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Fi(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(s-=h,(!d&&!a._dp||d&&d.smoothChildTiming)&&(a._start+=Nt(h/a._ts),a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>s&&o._ts&&(s=o._end),o=c;Fs(a,a===Ut&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Ut._ts&&(tp(Ut,ll(i,Ut)),ep=Wn.frame),Wn.frame>=Gd){Gd+=qn.autoSleep||120;var s=Ut._first;if((!s||!s._ts)&&qn.autoSleep&&Wn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Wn.sleep()}}},e})(Va);ti(xn.prototype,{_lock:0,_hasPause:0,_forcing:0});var S0=function(e,t,n,i,s,a,o){var l=new Dn(this._pt,e,t,0,1,Au,null,s),c=0,h=0,d,f,u,_,x,p,g,v;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=zs(i)),a&&(v=[n,i],a(v,e,t),n=v[0],i=v[1]),f=n.match(Jh)||[];d=Jh.exec(i);)_=d[0],x=i.substring(c,d.index),u?u=(u+1)%5:x.substr(-5)==="rgba("&&(u=1),_!==f[h++]&&(p=parseFloat(f[h-1])||0,l._pt={_next:l._pt,p:x||h===1?x:",",s:p,c:_.charAt(1)==="="?as(p,_)-p:parseFloat(_)-p,m:u&&u<4?Math.round:0},c=Jh.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(pu.test(i)||g)&&(l.e=0),this._pt=l,l},bu=function(e,t,n,i,s,a,o,l,c,h){kt(i)&&(i=i(s||0,e,a));var d=e[t],f=n!=="get"?n:kt(d)?c?e[t.indexOf("set")||!kt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,u=kt(d)?c?E0:Sp:Eu,_;if(tn(i)&&(~i.indexOf("random(")&&(i=zs(i)),i.charAt(1)==="="&&(_=as(f,i)+(dn(f)||0),(_||_===0)&&(i=_))),!h||f!==i||hu)return!isNaN(f*i)&&i!==""?(_=new Dn(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?C0:Mp,0,u),c&&(_.fp=c),o&&_.modifier(o,this,e),this._pt=_):(!d&&!(t in e)&&dl(t,i),S0.call(this,e,t,f,i,u,l||qn.stringFilter,c))},M0=function(e,t,n,i,s){if(kt(e)&&(e=Fa(e,s,t,n,i)),!Bi(e)||e.style&&e.nodeType||vn(e)||Jd(e))return tn(e)?Fa(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=Fa(e[o],s,t,n,i);return a},Tu=function(e,t,n,i,s,a){var o,l,c,h;if(Hn[e]&&(o=new Hn[e]).init(s,o.rawVars?t[e]:M0(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=l=new Dn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Ns))for(c=n._ptLookup[n._targets.indexOf(s)],h=o._props.length;h--;)c[o._props[h]]=l;return o},Er,hu,wu=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,f=i.keyframes,u=i.autoRevert,_=e._dur,x=e._startAt,p=e._targets,g=e.parent,v=g&&g.data==="nested"?g.vars.targets:p,T=e._overwrite==="auto"&&!uu,y=e.timeline,w=i.easeReverse||d,E,m,S,R,A,D,N,X,I,B,V,F,j;if(y&&(!f||!s)&&(s="none"),e._ease=is(s,Ba.ease),e._rEase=w&&(is(w)||e._ease),e._from=!y&&!!i.runBackwards,e._from&&(e.ratio=1),!y||f&&!i.stagger){if(X=p[0]?Cr(p[0]).harness:0,F=X&&i[X.prop],E=ol(i,gu),x&&(x._zTime<0&&x.progress(1),t<0&&h&&o&&!u?x.render(-1,!0):x.revert(h&&_?nl:Z_),x._lazy=0),a){if(Rr(e._startAt=Wt.set(p,ti({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!x&&Xn(l),startAt:null,delay:0,onUpdate:c&&function(){return jn(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(fn||!o&&!u)&&e._startAt.revert(nl),o&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(h&&_&&!x){if(t&&(o=!1),S=ti({overwrite:!1,data:"isFromStart",lazy:o&&!x&&Xn(l),immediateRender:o,stagger:0,parent:g},E),F&&(S[X.prop]=F),Rr(e._startAt=Wt.set(p,S)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(fn?e._startAt.revert(nl):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,vt,vt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&Xn(l)||l&&!_,m=0;m<p.length;m++){if(A=p[m],N=A._gsap||xu(p)[m]._gsap,e._ptLookup[m]=B={},su[N.id]&&Ar.length&&al(),V=v===p?m:v.indexOf(A),X&&(I=new X).init(A,F||E,e,V,v)!==!1&&(e._pt=R=new Dn(e._pt,A,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(W){B[W]=R}),I.priority&&(D=1)),!X||F)for(S in E)Hn[S]&&(I=Tu(S,E,e,V,A,v))?I.priority&&(D=1):B[S]=R=bu.call(e,A,S,"get",E[S],V,v,0,i.stringFilter);e._op&&e._op[m]&&e.kill(A,e._op[m]),T&&e._pt&&(Er=e,Ut.killTweensOf(A,B,e.globalTime(t)),j=!e.parent,Er=0),e._pt&&l&&(su[N.id]=1)}D&&Ru(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!j,f&&t<=0&&y.render(gi,!0,!0)},b0=function(e,t,n,i,s,a,o,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],h,d,f,u;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,u=e._targets.length;u--;){if(h=f[u][t],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==t&&h.fp!==t;)h=h._next;if(!h)return hu=1,e.vars[t]="+=0",wu(e,o),hu=0,l?za(t+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(u=c.length;u--;)d=c[u],h=d._pt||d,h.s=(i||i===0)&&!s?i:h.s+(i||0)+a*h.c,h.c=n-h.s,d.e&&(d.e=Gt(n)+dn(d.e)),d.b&&(d.b=h.s+dn(d.b))},T0=function(e,t){var n=e[0]?Cr(e[0]).harness:0,i=n&&n.aliases,s,a,o,l;if(!i)return t;s=Us({},t);for(a in i)if(a in s)for(l=i[a].split(","),o=l.length;o--;)s[l[o]]=s[a];return s},w0=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(vn(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Fa=function(e,t,n,i,s){return kt(e)?e.call(t,n,i,s):tn(e)&&~e.indexOf("random(")?zs(e):e},hl=_u+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",yp={};Ln(hl+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return yp[r]=1});hl=hl.split(",");var Wt=(function(r){$d(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:Ua(i))||this;var l=o.vars,c=l.duration,h=l.delay,d=l.immediateRender,f=l.stagger,u=l.overwrite,_=l.keyframes,x=l.defaults,p=l.scrollTrigger,g=i.parent||Ut,v=(vn(n)||Jd(n)?nr(n[0]):"length"in i)?[n]:_i(n),T,y,w,E,m,S,R,A;if(o._targets=v.length?xu(v):za("GSAP target "+n+" not found. https://gsap.com",!qn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=u,_||f||tl(c)||tl(h)){i=o.vars;var D=i.easeReverse||i.yoyoEase;if(T=o.timeline=new xn({data:"nested",defaults:x||{},targets:g&&g.data==="nested"?g.vars.targets:v}),T.kill(),T.parent=T._dp=er(o),T._start=0,f||tl(c)||tl(h)){if(E=v.length,R=f&&hp(f),Bi(f))for(m in f)~hl.indexOf(m)&&(A||(A={}),A[m]=f[m]);for(y=0;y<E;y++)w=ol(i,yp),w.stagger=0,D&&(w.easeReverse=D),A&&Us(w,A),S=v[y],w.duration=+Fa(c,er(o),y,S,v),w.delay=(+Fa(h,er(o),y,S,v)||0)-o._delay,!f&&E===1&&w.delay&&(o._delay=h=w.delay,o._start+=h,w.delay=0),T.to(S,w,R?R(y,S,v):0),T._ease=rt.none;T.duration()?c=h=0:o.timeline=0}else if(_){Ua(ti(T.vars.defaults,{ease:"none"})),T._ease=is(_.ease||i.ease||"none");var N=0,X,I,B;if(vn(_))_.forEach(function(V){return T.to(v,V,">")}),T.duration();else{w={};for(m in _)m==="ease"||m==="easeEach"||w0(m,_[m],w,_.easeEach);for(m in w)for(X=w[m].sort(function(V,F){return V.t-F.t}),N=0,y=0;y<X.length;y++)I=X[y],B={ease:I.e,duration:(I.t-(y?X[y-1].t:0))/100*c},B[m]=I.v,T.to(v,B,N),N+=B.duration;T.duration()<c&&T.to({},{duration:c-T.duration()})}}c||o.duration(c=T.duration())}else o.timeline=0;return u===!0&&!uu&&(Er=er(o),Ut.killTweensOf(v),Er=0),Fi(g,er(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(d||!c&&!_&&o._start===Nt(g._time)&&Xn(d)&&t0(er(o))&&g.data!=="nested")&&(o._tTime=-vt,o.render(Math.max(0,-h)||0)),p&&ap(er(o),p),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-vt&&!h?l:i<vt?0:i,f,u,_,x,p,g,v,T;if(!c)i0(this,i,s,a);else if(d!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(f=d,T=this.timeline,this._repeat){if(x=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(x*100+i,s,a);if(f=Nt(d%x),d===l?(_=this._repeat,f=c):(p=Nt(d/x),_=~~p,_&&_===p?(f=c,_--):f>c&&(f=c)),g=this._yoyo&&_&1,g&&(f=c-f),p=Os(this._tTime,x),f===o&&!a&&this._initted&&_===p)return this._tTime=d,this;_!==p&&this.vars.repeatRefresh&&!g&&!this._lock&&f!==x&&this._initted&&(this._lock=a=1,this.render(Nt(x*_),!0).invalidate()._lock=0)}if(!this._initted){if(op(this,h?i:f,a,s,d))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&_!==p))return this;if(c!==this._dur)return this.render(i,s,a)}if(this._rEase){var y=f<o;if(y!==this._inv){var w=y?o:c-o;this._inv=y,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=w?(y?-1:1)/w:0,this._invScale=y?-this.ratio:1-this.ratio,this._invEase=y?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(f/c);if(this._from&&(this.ratio=v=1-v),this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&d&&!s&&!p&&(jn(this,"onStart"),this._tTime!==d))return this;for(u=this._pt;u;)u.r(v,u.d),u=u._next;T&&T.render(i<0?i:T._dur*T._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&au(this,i,s,a),jn(this,"onUpdate")),this._repeat&&_!==p&&this.vars.onRepeat&&!s&&this.parent&&jn(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&au(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Rr(this,1),!s&&!(h&&!o)&&(d||o||g)&&(jn(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,l){Ga||Wn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||wu(this,c),h=this._ease(c/this._dur),b0(this,i,s,a,o,h,c,l)?this.resetTo(i,s,a,o,1):(gl(this,0),this.parent||rp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Da(this):this.scrollTrigger&&this.scrollTrigger.kill(!!fn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Er&&Er.vars.overwrite!==!0)._first||Da(this),this.parent&&a!==this.timeline.totalDuration()&&Fs(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?_i(i):o,c=this._ptLookup,h=this._pt,d,f,u,_,x,p,g;if((!s||s==="all")&&j_(o,l))return s==="all"&&(this._pt=0),Da(this);for(d=this._op=this._op||[],s!=="all"&&(tn(s)&&(x={},Ln(s,function(v){return x[v]=1}),s=x),s=T0(o,s)),g=o.length;g--;)if(~l.indexOf(o[g])){f=c[g],s==="all"?(d[g]=s,_=f,u={}):(u=d[g]=d[g]||{},_=s);for(x in _)p=f&&f[x],p&&((!("kill"in p.d)||p.d.kill(x)===!0)&&pl(this,p,"_pt"),delete f[x]),u!=="all"&&(u[x]=1)}return this._initted&&!this._pt&&h&&Da(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Oa(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return Oa(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Ut.killTweensOf(i,s,a)},e})(Va);ti(Wt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Ln("staggerTo,staggerFrom,staggerFromTo",function(r){Wt[r]=function(){var e=new xn,t=ou.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Eu=function(e,t,n){return e[t]=n},Sp=function(e,t,n){return e[t](n)},E0=function(e,t,n,i){return e[t](i.fp,n)},A0=function(e,t,n){return e.setAttribute(t,n)},_l=function(e,t){return kt(e[t])?Sp:fl(e[t])&&e.setAttribute?A0:Eu},Mp=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},C0=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Au=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Cu=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},R0=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},P0=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?pl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},I0=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Ru=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},Dn=(function(){function r(t,n,i,s,a,o,l,c,h){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Mp,this.d=l||this,this.set=c||Eu,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=I0,this.m=n,this.mt=s,this.tween=i},r})();Ln(_u+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return gu[r]=1});ei.TweenMax=ei.TweenLite=Wt;ei.TimelineLite=ei.TimelineMax=xn;Ut=new xn({sortChildren:!1,defaults:Ba,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});qn.stringFilter=Su;var rs=[],rl={},L0=[],Yd=0,D0=0,tu=function(e){return(rl[e]||L0).map(function(t){return t()})},Ha=function(){var e=Date.now(),t=[];e-Yd>2&&(tu("matchMediaInit"),rs.forEach(function(n){var i=n.queries,s=n.conditions,a,o,l,c;for(o in i)a=Oi.matchMedia(i[o]).matches,a&&(l=1),a!==s[o]&&(s[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),tu("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Yd=e,tu("matchMedia"))},bp=(function(){function r(t,n){this.selector=n&&lu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=D0++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){kt(n)&&(s=i,i=n,n=kt);var a=this,o=function(){var c=Pt,h=a.selector,d;return c&&c!==a&&c.data.push(a),s&&(a.selector=lu(s)),Pt=a,d=i.apply(a,arguments),kt(d)&&a._r.push(d),Pt=c,a.selector=h,a.isReverted=!1,d};return a.last=o,n===kt?o(a,function(l){return a.add(null,l)}):n?a[n]=o:o},e.ignore=function(n){var i=Pt;Pt=null,n(this),Pt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Wt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return o.splice(o.indexOf(h),1)}));for(o.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof xn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Wt)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=rs.length;a--;)rs[a].id===this.id&&rs.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(Ha):o.removeEventListener("change",Ha)}),this._mqs=null}},e.revert=function(n){this.kill(n||{})},r})(),N0=(function(){function r(t){this.contexts=[],this.scope=t,Pt&&Pt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Bi(n)||(n={matches:n});var a=new bp(0,s||this.scope),o=a.conditions={},l,c,h;Pt&&!a.selector&&(a.selector=Pt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=Oi.matchMedia(n[c]),l&&(rs.indexOf(a)<0&&rs.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(Ha):l.addEventListener("change",Ha),(a._mqs||(a._mqs=[])).push(l)));return h&&i(a,function(d){return a.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),ul={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return gp(i)})},timeline:function(e){return new xn(e)},getTweensOf:function(e,t){return Ut.getTweensOf(e,t)},getProperty:function(e,t,n,i){tn(e)&&(e=_i(e)[0]);var s=Cr(e||{}).get,a=n?ip:np;return n==="native"&&(n=""),e&&(t?a((Hn[t]&&Hn[t].get||s)(e,t,n,i)):function(o,l,c){return a((Hn[o]&&Hn[o].get||s)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=_i(e),e.length>1){var i=e.map(function(h){return yn.quickSetter(h,t,n)}),s=i.length;return function(h){for(var d=s;d--;)i[d](h)}}e=e[0]||{};var a=Hn[t],o=Cr(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var d=new a;Ns._pt=0,d.init(e,n?h+n:h,Ns,0,[e]),d.render(1,d),Ns._pt&&Cu(1,Ns)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,s=yn.to(e,ti((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(l,c,h){return s.resetTo(t,l,c,h)};return a.tween=s,a},isTweening:function(e){return Ut.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=is(e.ease,Ba.ease)),Vd(Ba,e||{})},config:function(e){return Vd(qn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!Hn[o]&&!ei[o]&&za(t+" effect requires "+o+" plugin.")}),Kh[t]=function(o,l,c){return n(_i(o),ti(l||{},s),c)},a&&(xn.prototype[t]=function(o,l,c){return this.add(Kh[t](o,Bi(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){rt[e]=is(t)},parseEase:function(e,t){return arguments.length?is(e,t):rt},getById:function(e){return Ut.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new xn(e),i,s;for(n.smoothChildTiming=Xn(e.smoothChildTiming),Ut.remove(n),n._dp=0,n._time=n._tTime=Ut._time,i=Ut._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Wt&&i.vars.onComplete===i._targets[0]))&&Fi(n,i,i._start-i._delay),i=s;return Fi(Ut,n,0),n},context:function(e,t){return e?new bp(e,t):Pt},matchMedia:function(e){return new N0(e)},matchMediaRefresh:function(){return rs.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Ha()},addEventListener:function(e,t){var n=rl[e]||(rl[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=rl[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:u0,wrapYoyo:f0,distribute:hp,random:fp,snap:up,normalize:h0,getUnit:dn,clamp:a0,splitColor:_p,toArray:_i,selector:lu,mapRange:pp,pipe:l0,unitize:c0,interpolate:d0,shuffle:cp},install:Qd,effects:Kh,ticker:Wn,updateRoot:xn.updateRoot,plugins:Hn,globalTimeline:Ut,core:{PropTween:Dn,globals:jd,Tween:Wt,Timeline:xn,Animation:Va,getCache:Cr,_removeLinkedListItem:pl,reverting:function(){return fn},context:function(e){return e&&Pt&&(Pt.data.push(e),e._ctx=Pt),Pt},suppressOverwrites:function(e){return uu=e}}};Ln("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return ul[r]=Wt[r]});Wn.add(xn.updateRoot);Ns=ul.to({},{duration:0});var U0=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},O0=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=U0(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},nu=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var l,c;if(tn(s)&&(l={},Ln(s,function(h){return l[h]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}O0(o,s)}}}},yn=ul.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)fn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},nu("roundProps",cu),nu("modifiers"),nu("snap",up))||ul;Wt.version=xn.version=yn.version="3.15.1";Kd=1;fu()&&Bs();var F0=rt.Power0,B0=rt.Power1,z0=rt.Power2,k0=rt.Power3,G0=rt.Power4,V0=rt.Linear,H0=rt.Quad,W0=rt.Cubic,X0=rt.Quart,q0=rt.Quint,Y0=rt.Strong,$0=rt.Elastic,Z0=rt.Back,J0=rt.SteppedEase,K0=rt.Bounce,Q0=rt.Sine,j0=rt.Expo,ex=rt.Circ;var Tp,Ir,Gs,Uu,us,tx,wp,Ou,nx=function(){return typeof window<"u"},rr={},hs=180/Math.PI,Vs=Math.PI/180,ks=Math.atan2,Ep=1e8,Fu=/([A-Z])/g,ix=/(left|right|width|margin|padding|x)/i,rx=/[\s,\(]\S/,zi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Iu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},sx=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ax=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},ox=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},lx=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},Np=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Up=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},cx=function(e,t,n){return e.style[t]=n},hx=function(e,t,n){return e.style.setProperty(t,n)},ux=function(e,t,n){return e._gsap[t]=n},fx=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},dx=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},px=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Ot="transform",Yn=Ot+"Origin",mx=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in rr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=zi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=ir(i,o)}):this.tfm[e]=a.x?a[e]:ir(i,e),e===Yn&&(this.tfm.zOrigin=a.zOrigin);else return zi.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Ot)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Yn,t,"")),e=Ot}(s||t)&&this.props.push(e,t,s[e])},Op=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},gx=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Fu,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Ou(),(!s||!s.isStart)&&!n[Ot]&&(Op(n),i.zOrigin&&n[Yn]&&(n[Yn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Fp=function(e,t){var n={target:e,props:[],revert:gx,save:mx};return e._gsap||yn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Bp,Lu=function(e,t){var n=Ir.createElementNS?Ir.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Ir.createElement(e);return n&&n.style?n:Ir.createElement(e)},ni=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Fu,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Hs(t)||t,1)||""},Ap="O,Moz,ms,Ms,Webkit".split(","),Hs=function(e,t,n){var i=t||us,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Ap[a]+e in s););return a<0?null:(a===3?"ms":a>=0?Ap[a]:"")+e},Du=function(){nx()&&window.document&&(Tp=window,Ir=Tp.document,Gs=Ir.documentElement,us=Lu("div")||{style:{}},tx=Lu("div"),Ot=Hs(Ot),Yn=Ot+"Origin",us.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Bp=!!Hs("perspective"),Ou=yn.core.reverting,Uu=1)},Cp=function(e){var t=e.ownerSVGElement,n=Lu("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Gs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Gs.removeChild(n),s},Rp=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},zp=function(e){var t,n;try{t=e.getBBox()}catch{t=Cp(e),n=1}return t&&(t.width||t.height)||n||(t=Cp(e)),t&&!t.width&&!t.x&&!t.y?{x:+Rp(e,["x","cx","x1"])||0,y:+Rp(e,["y","cy","y1"])||0,width:0,height:0}:t},kp=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&zp(e))},Dr=function(e,t){if(t){var n=e.style,i;t in rr&&t!==Yn&&(t=Ot),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Fu,"-$1").toLowerCase())):n.removeAttribute(t)}},Lr=function(e,t,n,i,s,a){var o=new Dn(e._pt,t,n,0,1,a?Up:Np);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Pp={deg:1,rad:1,turn:1},_x={grid:1,flex:1},Nr=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=us.style,l=ix.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",u=i==="%",_,x,p,g;if(i===a||!s||Pp[i]||Pp[a])return s;if(a!=="px"&&!f&&(s=r(e,t,n,"px")),g=e.getCTM&&kp(e),(u||a==="%")&&(rr[t]||~t.indexOf("adius")))return _=g?e.getBBox()[l?"width":"height"]:e[h],Gt(u?s/_*d:s/100*_);if(o[l?"width":"height"]=d+(f?a:i),x=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,g&&(x=(e.ownerSVGElement||{}).parentNode),(!x||x===Ir||!x.appendChild)&&(x=Ir.body),p=x._gsap,p&&u&&p.width&&l&&p.time===Wn.time&&!p.uncache)return Gt(s/p.width*d);if(u&&(t==="height"||t==="width")){var v=e.style[t];e.style[t]=d+i,_=e[h],v?e.style[t]=v:Dr(e,t)}else(u||a==="%")&&!_x[ni(x,"display")]&&(o.position=ni(e,"position")),x===e&&(o.position="static"),x.appendChild(us),_=us[h],x.removeChild(us),o.position="absolute";return l&&u&&(p=Cr(x),p.time=Wn.time,p.width=x[h]),Gt(f?_*s/d:_&&s?d/_*s:0)},ir=function(e,t,n,i){var s;return Uu||Du(),t in zi&&t!=="transform"&&(t=zi[t],~t.indexOf(",")&&(t=t.split(",")[0])),rr[t]&&t!=="transform"?(s=Ya(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:vl(ni(e,Yn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=xl[t]&&xl[t](e,t,n)||ni(e,t)||vu(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Nr(e,t,s,n)+n:s},xx=function(e,t,n,i){if(!n||n==="none"){var s=Hs(t,e,1),a=s&&ni(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=ni(e,"borderTopColor"))}var o=new Dn(this._pt,e.style,t,0,1,Au),l=0,c=0,h,d,f,u,_,x,p,g,v,T,y,w;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=ni(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(x=e.style[t],e.style[t]=i,i=ni(e,t)||i,x?e.style[t]=x:Dr(e,t)),h=[n,i],Su(h),n=h[0],i=h[1],f=n.match(ss)||[],w=i.match(ss)||[],w.length){for(;d=ss.exec(i);)p=d[0],v=i.substring(l,d.index),_?_=(_+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(_=1),p!==(x=f[c++]||"")&&(u=parseFloat(x)||0,y=x.substr((u+"").length),p.charAt(1)==="="&&(p=as(u,p)+y),g=parseFloat(p),T=p.substr((g+"").length),l=ss.lastIndex-T.length,T||(T=T||qn.units[t]||y,l===i.length&&(i+=T,o.e+=T)),y!==T&&(u=Nr(e,t,x,T)||0),o._pt={_next:o._pt,p:v||c===1?v:",",s:u,c:g-u,m:_&&_<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?Up:Np;return pu.test(i)&&(o.e=0),this._pt=o,o},Ip={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},vx=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Ip[n]||n,t[1]=Ip[i]||i,t.join(" ")},yx=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)o=s[c],rr[o]&&(l=1,o=o==="transformOrigin"?Yn:Ot),Dr(n,o);l&&(Dr(n,Ot),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Ya(n,1),a.uncache=1,Op(i)))}},xl={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new Dn(e._pt,t,n,0,0,yx);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},qa=[1,0,0,1,0,0],Gp={},Vp=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Lp=function(e){var t=ni(e,Ot);return Vp(t)?qa:t.substr(7).match(du).map(Gt)},Bu=function(e,t){var n=e._gsap||Cr(e),i=e.style,s=Lp(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?qa:s):(s===qa&&!e.offsetParent&&e!==Gs&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,o=e.nextElementSibling,Gs.appendChild(e)),s=Lp(e),l?i.display=l:Dr(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Gs.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Nu=function(e,t,n,i,s,a){var o=e._gsap,l=s||Bu(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,d=o.xOffset||0,f=o.yOffset||0,u=l[0],_=l[1],x=l[2],p=l[3],g=l[4],v=l[5],T=t.split(" "),y=parseFloat(T[0])||0,w=parseFloat(T[1])||0,E,m,S,R;n?l!==qa&&(m=u*p-_*x)&&(S=y*(p/m)+w*(-x/m)+(x*v-p*g)/m,R=y*(-_/m)+w*(u/m)-(u*v-_*g)/m,y=S,w=R):(E=zp(e),y=E.x+(~T[0].indexOf("%")?y/100*E.width:y),w=E.y+(~(T[1]||T[0]).indexOf("%")?w/100*E.height:w)),i||i!==!1&&o.smooth?(g=y-c,v=w-h,o.xOffset=d+(g*u+v*x)-g,o.yOffset=f+(g*_+v*p)-v):o.xOffset=o.yOffset=0,o.xOrigin=y,o.yOrigin=w,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[Yn]="0px 0px",a&&(Lr(a,o,"xOrigin",c,y),Lr(a,o,"yOrigin",h,w),Lr(a,o,"xOffset",d,o.xOffset),Lr(a,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",y+" "+w)},Ya=function(e,t){var n=e._gsap||new Mu(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=ni(e,Yn)||"0",h,d,f,u,_,x,p,g,v,T,y,w,E,m,S,R,A,D,N,X,I,B,V,F,j,W,P,ne,Se,Oe,Z,he;return h=d=f=x=p=g=v=T=y=0,u=_=1,n.svg=!!(e.getCTM&&kp(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Ot]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Ot]!=="none"?l[Ot]:"")),i.scale=i.rotate=i.translate="none"),m=Bu(e,n.svg),n.svg&&(n.uncache?(j=e.getBBox(),c=n.xOrigin-j.x+"px "+(n.yOrigin-j.y)+"px",F=""):F=!t&&e.getAttribute("data-svg-origin"),Nu(e,F||c,!!F||n.originIsAbsolute,n.smooth!==!1,m)),w=n.xOrigin||0,E=n.yOrigin||0,m!==qa&&(D=m[0],N=m[1],X=m[2],I=m[3],h=B=m[4],d=V=m[5],m.length===6?(u=Math.sqrt(D*D+N*N),_=Math.sqrt(I*I+X*X),x=D||N?ks(N,D)*hs:0,v=X||I?ks(X,I)*hs+x:0,v&&(_*=Math.abs(Math.cos(v*Vs))),n.svg&&(h-=w-(w*D+E*X),d-=E-(w*N+E*I))):(he=m[6],Oe=m[7],P=m[8],ne=m[9],Se=m[10],Z=m[11],h=m[12],d=m[13],f=m[14],S=ks(he,Se),p=S*hs,S&&(R=Math.cos(-S),A=Math.sin(-S),F=B*R+P*A,j=V*R+ne*A,W=he*R+Se*A,P=B*-A+P*R,ne=V*-A+ne*R,Se=he*-A+Se*R,Z=Oe*-A+Z*R,B=F,V=j,he=W),S=ks(-X,Se),g=S*hs,S&&(R=Math.cos(-S),A=Math.sin(-S),F=D*R-P*A,j=N*R-ne*A,W=X*R-Se*A,Z=I*A+Z*R,D=F,N=j,X=W),S=ks(N,D),x=S*hs,S&&(R=Math.cos(S),A=Math.sin(S),F=D*R+N*A,j=B*R+V*A,N=N*R-D*A,V=V*R-B*A,D=F,B=j),p&&Math.abs(p)+Math.abs(x)>359.9&&(p=x=0,g=180-g),u=Gt(Math.sqrt(D*D+N*N+X*X)),_=Gt(Math.sqrt(V*V+he*he)),S=ks(B,V),v=Math.abs(S)>2e-4?S*hs:0,y=Z?1/(Z<0?-Z:Z):0),n.svg&&(F=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Vp(ni(e,Ot)),F&&e.setAttribute("transform",F))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(u*=-1,v+=x<=0?180:-180,x+=x<=0?180:-180):(_*=-1,v+=v<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Gt(u),n.scaleY=Gt(_),n.rotation=Gt(x)+o,n.rotationX=Gt(p)+o,n.rotationY=Gt(g)+o,n.skewX=v+o,n.skewY=T+o,n.transformPerspective=y+a,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Yn]=vl(c)),n.xOffset=n.yOffset=0,n.force3D=qn.force3D,n.renderTransform=n.svg?Mx:Bp?Hp:Sx,n.uncache=0,n},vl=function(e){return(e=e.split(" "))[0]+" "+e[1]},Pu=function(e,t,n){var i=dn(t);return Gt(parseFloat(t)+parseFloat(Nr(e,"x",n+"px",i)))+i},Sx=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Hp(e,t)},ls="0deg",Xa="0px",cs=") ",Hp=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,f=n.skewX,u=n.skewY,_=n.scaleX,x=n.scaleY,p=n.transformPerspective,g=n.force3D,v=n.target,T=n.zOrigin,y="",w=g==="auto"&&e&&e!==1||g===!0;if(T&&(d!==ls||h!==ls)){var E=parseFloat(h)*Vs,m=Math.sin(E),S=Math.cos(E),R;E=parseFloat(d)*Vs,R=Math.cos(E),a=Pu(v,a,m*R*-T),o=Pu(v,o,-Math.sin(E)*-T),l=Pu(v,l,S*R*-T+T)}p!==Xa&&(y+="perspective("+p+cs),(i||s)&&(y+="translate("+i+"%, "+s+"%) "),(w||a!==Xa||o!==Xa||l!==Xa)&&(y+=l!==Xa||w?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+cs),c!==ls&&(y+="rotate("+c+cs),h!==ls&&(y+="rotateY("+h+cs),d!==ls&&(y+="rotateX("+d+cs),(f!==ls||u!==ls)&&(y+="skew("+f+", "+u+cs),(_!==1||x!==1)&&(y+="scale("+_+", "+x+cs),v.style[Ot]=y||"translate(0, 0)"},Mx=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,f=n.scaleY,u=n.target,_=n.xOrigin,x=n.yOrigin,p=n.xOffset,g=n.yOffset,v=n.forceCSS,T=parseFloat(a),y=parseFloat(o),w,E,m,S,R;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Vs,c*=Vs,w=Math.cos(l)*d,E=Math.sin(l)*d,m=Math.sin(l-c)*-f,S=Math.cos(l-c)*f,c&&(h*=Vs,R=Math.tan(c-h),R=Math.sqrt(1+R*R),m*=R,S*=R,h&&(R=Math.tan(h),R=Math.sqrt(1+R*R),w*=R,E*=R)),w=Gt(w),E=Gt(E),m=Gt(m),S=Gt(S)):(w=d,S=f,E=m=0),(T&&!~(a+"").indexOf("px")||y&&!~(o+"").indexOf("px"))&&(T=Nr(u,"x",a,"px"),y=Nr(u,"y",o,"px")),(_||x||p||g)&&(T=Gt(T+_-(_*w+x*m)+p),y=Gt(y+x-(_*E+x*S)+g)),(i||s)&&(R=u.getBBox(),T=Gt(T+i/100*R.width),y=Gt(y+s/100*R.height)),R="matrix("+w+","+E+","+m+","+S+","+T+","+y+")",u.setAttribute("transform",R),v&&(u.style[Ot]=R)},bx=function(e,t,n,i,s){var a=360,o=tn(s),l=parseFloat(s)*(o&&~s.indexOf("rad")?hs:1),c=l-i,h=i+c+"deg",d,f;return o&&(d=s.split("_")[1],d==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),d==="cw"&&c<0?c=(c+a*Ep)%a-~~(c/a)*a:d==="ccw"&&c>0&&(c=(c-a*Ep)%a-~~(c/a)*a)),e._pt=f=new Dn(e._pt,t,n,i,c,sx),f.e=h,f.u="deg",e._props.push(n),f},Dp=function(e,t){for(var n in t)e[n]=t[n];return e},Tx=function(e,t,n){var i=Dp({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,d,f,u,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ot]=t,o=Ya(n,1),Dr(n,Ot),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Ot],a[Ot]=t,o=Ya(n,1),a[Ot]=c);for(l in rr)c=i[l],h=o[l],c!==h&&s.indexOf(l)<0&&(u=dn(c),_=dn(h),d=u!==_?Nr(n,l,c,_):parseFloat(c),f=parseFloat(h),e._pt=new Dn(e._pt,o,l,d,f-d,Iu),e._pt.u=_||0,e._props.push(l));Dp(o,i)};Ln("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});xl[e>1?"border"+r:r]=function(o,l,c,h,d){var f,u;if(arguments.length<4)return f=a.map(function(_){return ir(o,_,c)}),u=f.join(" "),u.split(f[0]).length===5?f[0]:u;f=(h+"").split(" "),u={},a.forEach(function(_,x){return u[_]=f[x]=f[x]||f[(x-1)/2|0]}),o.init(l,u,d)}});var zu={name:"css",register:Du,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,l=n.vars.startAt,c,h,d,f,u,_,x,p,g,v,T,y,w,E,m,S,R;Uu||Du(),this.styles=this.styles||Fp(e),S=this.styles.props,this.tween=n;for(x in t)if(x!=="autoRound"&&(h=t[x],!(Hn[x]&&Tu(x,t,n,i,e,s)))){if(u=typeof h,_=xl[x],u==="function"&&(h=h.call(n,i,e,s),u=typeof h),u==="string"&&~h.indexOf("random(")&&(h=zs(h)),_)_(this,e,x,h,n)&&(m=1);else if(x.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(x)+"").trim(),h+="",tr.lastIndex=0,tr.test(c)||(p=dn(c),g=dn(h),g?p!==g&&(c=Nr(e,x,c,g)+g):p&&(h+=p)),this.add(o,"setProperty",c,h,i,s,0,0,x),a.push(x),S.push(x,0,o[x]);else if(u!=="undefined"){if(l&&x in l?(c=typeof l[x]=="function"?l[x].call(n,i,e,s):l[x],tn(c)&&~c.indexOf("random(")&&(c=zs(c)),dn(c+"")||c==="auto"||(c+=qn.units[x]||dn(ir(e,x))||""),(c+"").charAt(1)==="="&&(c=ir(e,x))):c=ir(e,x),f=parseFloat(c),v=u==="string"&&h.charAt(1)==="="&&h.substr(0,2),v&&(h=h.substr(2)),d=parseFloat(h),x in zi&&(x==="autoAlpha"&&(f===1&&ir(e,"visibility")==="hidden"&&d&&(f=0),S.push("visibility",0,o.visibility),Lr(this,o,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),x!=="scale"&&x!=="transform"&&(x=zi[x],~x.indexOf(",")&&(x=x.split(",")[0]))),T=x in rr,T){if(this.styles.save(x),R=h,u==="string"&&h.substring(0,6)==="var(--"){if(h=ni(e,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var A=e.style.perspective;e.style.perspective=h,h=ni(e,"perspective"),A?e.style.perspective=A:Dr(e,"perspective")}d=parseFloat(h)}if(y||(w=e._gsap,w.renderTransform&&!t.parseTransform||Ya(e,t.parseTransform),E=t.smoothOrigin!==!1&&w.smooth,y=this._pt=new Dn(this._pt,o,Ot,0,1,w.renderTransform,w,0,-1),y.dep=1),x==="scale")this._pt=new Dn(this._pt,w,"scaleY",w.scaleY,(v?as(w.scaleY,v+d):d)-w.scaleY||0,Iu),this._pt.u=0,a.push("scaleY",x),x+="X";else if(x==="transformOrigin"){S.push(Yn,0,o[Yn]),h=vx(h),w.svg?Nu(e,h,0,E,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==w.zOrigin&&Lr(this,w,"zOrigin",w.zOrigin,g),Lr(this,o,x,vl(c),vl(h)));continue}else if(x==="svgOrigin"){Nu(e,h,1,E,0,this);continue}else if(x in Gp){bx(this,w,x,f,v?as(f,v+h):h);continue}else if(x==="smoothOrigin"){Lr(this,w,"smooth",w.smooth,h);continue}else if(x==="force3D"){w[x]=h;continue}else if(x==="transform"){Tx(this,h,e);continue}}else x in o||(x=Hs(x)||x);if(T||(d||d===0)&&(f||f===0)&&!rx.test(h)&&x in o)p=(c+"").substr((f+"").length),d||(d=0),g=dn(h)||(x in qn.units?qn.units[x]:p),p!==g&&(f=Nr(e,x,c,g)),this._pt=new Dn(this._pt,T?w:o,x,f,(v?as(f,v+d):d)-f,!T&&(g==="px"||x==="zIndex")&&t.autoRound!==!1?lx:Iu),this._pt.u=g||0,T&&R!==h?(this._pt.b=c,this._pt.e=R,this._pt.r=ox):p!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=ax);else if(x in o)xx.call(this,e,x,c,v?v+h:h);else if(x in e)this.add(e,x,c||e[x],v?v+h:h,i,s);else if(x!=="parseTransform"){dl(x,h);continue}T||(x in o?S.push(x,0,o[x]):typeof e[x]=="function"?S.push(x,2,e[x]()):S.push(x,1,c||e[x])),a.push(x)}}m&&Ru(this)},render:function(e,t){if(t.tween._time||!Ou())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:ir,aliases:zi,getSetter:function(e,t,n){var i=zi[t];return i&&i.indexOf(",")<0&&(t=i),t in rr&&t!==Yn&&(e._gsap.x||ir(e,"x"))?n&&wp===n?t==="scale"?fx:ux:(wp=n||{})&&(t==="scale"?dx:px):e.style&&!fl(e.style[t])?cx:~t.indexOf("-")?hx:_l(e,t)},core:{_removeProperty:Dr,_getMatrix:Bu}};yn.utils.checkPrefix=Hs;yn.core.getStyleSaver=Fp;(function(r,e,t,n){var i=Ln(r+","+e+","+t,function(s){rr[s]=1});Ln(e,function(s){qn.units[s]="deg",Gp[s]=1}),zi[i[13]]=r+","+e,Ln(n,function(s){var a=s.split(":");zi[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Ln("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){qn.units[r]="px"});yn.registerPlugin(zu);var sr=yn.registerPlugin(zu)||yn,LT=sr.core.Tween;function Wp(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function wx(r,e,t){return e&&Wp(r.prototype,e),t&&Wp(r,t),r}var pn,Ml,Ex,$n,Ur,Or,Xs,qp,fs,qs,Yp,ar,wi,$p,Zp=function(){return pn||typeof window<"u"&&(pn=window.gsap)&&pn.registerPlugin&&pn},Jp=1,Ws=[],Xe=[],Ei=[],Za=Date.now,ku=function(e,t){return t},Ax=function(){var e=qs.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Xe),i.push.apply(i,Ei),Xe=n,Ei=i,ku=function(a,o){return t[a](o)}},lr=function(e,t){return~Ei.indexOf(e)&&Ei[Ei.indexOf(e)+1][t]},Ja=function(e){return!!~Yp.indexOf(e)},Un=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},Nn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},yl="scrollLeft",Sl="scrollTop",Gu=function(){return ar&&ar.isPressed||Xe.cache++},bl=function(e,t){var n=function i(s){if(s||s===0){Jp&&$n.history.scrollRestoration!=="manual"&&($n.history.scrollRestoration="manual");var a=ar&&ar.isPressed;s=i.v=Math.round(s)||(ar&&ar.iOS?1:0),e(s),i.cacheID=Xe.cache,a&&ku("ss",s)}else(t||Xe.cache!==i.cacheID||ku("ref"))&&(i.cacheID=Xe.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Sn={s:yl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:bl(function(r){return arguments.length?$n.scrollTo(r,Zt.sc()):$n.pageXOffset||Ur[yl]||Or[yl]||Xs[yl]||0})},Zt={s:Sl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Sn,sc:bl(function(r){return arguments.length?$n.scrollTo(Sn.sc(),r):$n.pageYOffset||Ur[Sl]||Or[Sl]||Xs[Sl]||0})},On=function(e,t){return(t&&t._ctx&&t._ctx.selector||pn.utils.toArray)(e)[0]||(typeof e=="string"&&pn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Cx=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},or=function(e,t){var n=t.s,i=t.sc;Ja(e)&&(e=Ur.scrollingElement||Or);var s=Xe.indexOf(e),a=i===Zt.sc?1:2;!~s&&(s=Xe.push(e)-1),Xe[s+a]||Un(e,"scroll",Gu);var o=Xe[s+a],l=o||(Xe[s+a]=bl(lr(e,n),!0)||(Ja(e)?i:bl(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,o||(l.smooth=pn.getProperty(e,"scrollBehavior")==="smooth"),l},Tl=function(e,t,n){var i=e,s=e,a=Za(),o=a,l=t||50,c=Math.max(500,l*3),h=function(_,x){var p=Za();x||p-a>l?(s=i,i=_,o=a,a=p):n?i+=_:i=s+(_-s)/(p-o)*(a-o)},d=function(){s=i=n?0:i,o=a=0},f=function(_){var x=o,p=s,g=Za();return(_||_===0)&&_!==i&&h(_),a===o||g-o>c?0:(i+(n?p:-p))/((n?g:a)-x)*1e3};return{update:h,reset:d,getVelocity:f}},$a=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Xp=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Kp=function(){qs=pn.core.globals().ScrollTrigger,qs&&qs.core&&Ax()},Qp=function(e){return pn=e||Zp(),!Ml&&pn&&typeof document<"u"&&document.body&&($n=window,Ur=document,Or=Ur.documentElement,Xs=Ur.body,Yp=[$n,Ur,Or,Xs],Ex=pn.utils.clamp,$p=pn.core.context||function(){},fs="onpointerenter"in Xs?"pointer":"mouse",qp=Vt.isTouch=$n.matchMedia&&$n.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in $n||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,wi=Vt.eventTypes=("ontouchstart"in Or?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Or?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Jp=0},500),Ml=1),qs||Kp(),Ml};Sn.op=Zt;Xe.cache=0;var Vt=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Ml||Qp(pn)||console.warn("Please gsap.registerPlugin(Observer)"),qs||Kp();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,d=n.onStop,f=n.onStopDelay,u=n.ignore,_=n.wheelSpeed,x=n.event,p=n.onDragStart,g=n.onDragEnd,v=n.onDrag,T=n.onPress,y=n.onRelease,w=n.onRight,E=n.onLeft,m=n.onUp,S=n.onDown,R=n.onChangeX,A=n.onChangeY,D=n.onChange,N=n.onToggleX,X=n.onToggleY,I=n.onHover,B=n.onHoverEnd,V=n.onMove,F=n.ignoreCheck,j=n.isNormalizer,W=n.onGestureStart,P=n.onGestureEnd,ne=n.onWheel,Se=n.onEnable,Oe=n.onDisable,Z=n.onClick,he=n.scrollSpeed,ye=n.capture,be=n.allowClicks,me=n.lockAxis,De=n.onLockAxis;this.target=o=On(o)||Or,this.vars=n,u&&(u=pn.utils.toArray(u)),i=i||1e-9,s=s||0,_=_||1,he=he||1,a=a||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat($n.getComputedStyle(Xs).lineHeight)||22);var _t,Ee,Ve,Ie,Ue,ct,at,$=this,Qe=0,Xt=0,yt=n.passive||!h&&n.passive!==!1,it=or(o,Sn),Ft=or(o,Zt),Ht=it(),O=Ft(),ft=~a.indexOf("touch")&&!~a.indexOf("pointer")&&wi[0]==="pointerdown",ot=Ja(o),ke=o.ownerDocument||Ur,ue=[0,0,0],ht=[0,0,0],Le=0,Fe=function(){return Le=Za()},C=function(pe,re){return($.event=pe)&&u&&Cx(pe.target,u)||re&&ft&&pe.pointerType!=="touch"||F&&F(pe,re)},M=function(){$._vx.reset(),$._vy.reset(),Ee.pause(),d&&d($)},k=function(){var pe=$.deltaX=Xp(ue),re=$.deltaY=Xp(ht),ee=Math.abs(pe)>=i,_e=Math.abs(re)>=i;D&&(ee||_e)&&D($,pe,re,ue,ht),ee&&(w&&$.deltaX>0&&w($),E&&$.deltaX<0&&E($),R&&R($),N&&$.deltaX<0!=Qe<0&&N($),Qe=$.deltaX,ue[0]=ue[1]=ue[2]=0),_e&&(S&&$.deltaY>0&&S($),m&&$.deltaY<0&&m($),A&&A($),X&&$.deltaY<0!=Xt<0&&X($),Xt=$.deltaY,ht[0]=ht[1]=ht[2]=0),(Ie||Ve)&&(V&&V($),Ve&&(p&&Ve===1&&p($),v&&v($),Ve=0),Ie=!1),ct&&!(ct=!1)&&De&&De($),Ue&&(ne($),Ue=!1),_t=0},se=function(pe,re,ee){ue[ee]+=pe,ht[ee]+=re,$._vx.update(pe),$._vy.update(re),c?_t||(_t=requestAnimationFrame(k)):k()},ie=function(pe,re){me&&!at&&($.axis=at=Math.abs(pe)>Math.abs(re)?"x":"y",ct=!0),at!=="y"&&(ue[2]+=pe,$._vx.update(pe,!0)),at!=="x"&&(ht[2]+=re,$._vy.update(re,!0)),c?_t||(_t=requestAnimationFrame(k)):k()},ce=function(pe){if(!C(pe,1)){pe=$a(pe,h);var re=pe.clientX,ee=pe.clientY,_e=re-$.x,te=ee-$.y,Te=$.isDragging;$.x=re,$.y=ee,(Te||(_e||te)&&(Math.abs($.startX-re)>=s||Math.abs($.startY-ee)>=s))&&(Ve||(Ve=Te?2:1),Te||($.isDragging=!0),ie(_e,te))}},ge=$.onPress=function(ae){C(ae,1)||ae&&ae.button||($.axis=at=null,Ee.pause(),$.isPressed=!0,ae=$a(ae),Qe=Xt=0,$.startX=$.x=ae.clientX,$.startY=$.y=ae.clientY,$._vx.reset(),$._vy.reset(),Un(j?o:ke,wi[1],ce,yt,!0),$.deltaX=$.deltaY=0,T&&T($))},H=$.onRelease=function(ae){if(!C(ae,1)){Nn(j?o:ke,wi[1],ce,!0);var pe=!isNaN($.y-$.startY),re=$.isDragging,ee=re&&(Math.abs($.x-$.startX)>3||Math.abs($.y-$.startY)>3),_e=$a(ae);!ee&&pe&&($._vx.reset(),$._vy.reset(),h&&be&&pn.delayedCall(.08,function(){if(Za()-Le>300&&!ae.defaultPrevented){if(ae.target.click)ae.target.click();else if(ke.createEvent){var te=ke.createEvent("MouseEvents");te.initMouseEvent("click",!0,!0,$n,1,_e.screenX,_e.screenY,_e.clientX,_e.clientY,!1,!1,!1,!1,0,null),ae.target.dispatchEvent(te)}}})),$.isDragging=$.isGesturing=$.isPressed=!1,d&&re&&!j&&Ee.restart(!0),Ve&&k(),g&&re&&g($),y&&y($,ee)}},Q=function(pe){return pe.touches&&pe.touches.length>1&&($.isGesturing=!0)&&W(pe,$.isDragging)},le=function(){return($.isGesturing=!1)||P($)},L=function(pe){if(!C(pe)){var re=it(),ee=Ft();se((re-Ht)*he,(ee-O)*he,1),Ht=re,O=ee,d&&Ee.restart(!0)}},K=function(pe){if(!C(pe)){pe=$a(pe,h),ne&&(Ue=!0);var re=(pe.deltaMode===1?l:pe.deltaMode===2?$n.innerHeight:1)*_;se(pe.deltaX*re,pe.deltaY*re,0),d&&!j&&Ee.restart(!0)}},J=function(pe){if(!C(pe)){var re=pe.clientX,ee=pe.clientY,_e=re-$.x,te=ee-$.y;$.x=re,$.y=ee,Ie=!0,d&&Ee.restart(!0),(_e||te)&&ie(_e,te)}},fe=function(pe){$.event=pe,I($)},oe=function(pe){$.event=pe,B($)},de=function(pe){return C(pe)||$a(pe,h)&&Z($)};Ee=$._dc=pn.delayedCall(f||.25,M).pause(),$.deltaX=$.deltaY=0,$._vx=Tl(0,50,!0),$._vy=Tl(0,50,!0),$.scrollX=it,$.scrollY=Ft,$.isDragging=$.isGesturing=$.isPressed=!1,$p(this),$.enable=function(ae){return $.isEnabled||(Un(ot?ke:o,"scroll",Gu),a.indexOf("scroll")>=0&&Un(ot?ke:o,"scroll",L,yt,ye),a.indexOf("wheel")>=0&&Un(o,"wheel",K,yt,ye),(a.indexOf("touch")>=0&&qp||a.indexOf("pointer")>=0)&&(Un(o,wi[0],ge,yt,ye),Un(ke,wi[2],H),Un(ke,wi[3],H),be&&Un(o,"click",Fe,!0,!0),Z&&Un(o,"click",de),W&&Un(ke,"gesturestart",Q),P&&Un(ke,"gestureend",le),I&&Un(o,fs+"enter",fe),B&&Un(o,fs+"leave",oe),V&&Un(o,fs+"move",J)),$.isEnabled=!0,$.isDragging=$.isGesturing=$.isPressed=Ie=Ve=!1,$._vx.reset(),$._vy.reset(),Ht=it(),O=Ft(),ae&&ae.type&&ge(ae),Se&&Se($)),$},$.disable=function(){$.isEnabled&&(Ws.filter(function(ae){return ae!==$&&Ja(ae.target)}).length||Nn(ot?ke:o,"scroll",Gu),$.isPressed&&($._vx.reset(),$._vy.reset(),Nn(j?o:ke,wi[1],ce,!0)),Nn(ot?ke:o,"scroll",L,ye),Nn(o,"wheel",K,ye),Nn(o,wi[0],ge,ye),Nn(ke,wi[2],H),Nn(ke,wi[3],H),Nn(o,"click",Fe,!0),Nn(o,"click",de),Nn(ke,"gesturestart",Q),Nn(ke,"gestureend",le),Nn(o,fs+"enter",fe),Nn(o,fs+"leave",oe),Nn(o,fs+"move",J),$.isEnabled=$.isPressed=$.isDragging=!1,Oe&&Oe($))},$.kill=$.revert=function(){$.disable();var ae=Ws.indexOf($);ae>=0&&Ws.splice(ae,1),ar===$&&(ar=0)},Ws.push($),j&&Ja(o)&&(ar=$),$.enable(x)},wx(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Vt.version="3.15.1";Vt.create=function(r){return new Vt(r)};Vt.register=Qp;Vt.getAll=function(){return Ws.slice()};Vt.getById=function(r){return Ws.filter(function(e){return e.vars.id===r})[0]};Zp()&&pn.registerPlugin(Vt);var Ae,Js,Je,xt,si,mt,tf,kl,co,io,Qa,wl,Mn,Hl,$u,Bn,jp,em,Ks,gm,Vu,_m,Fn,Zu,xm,vm,Fr,Ju,nf,Qs,rf,Br,Ku,Hu,El=1,bn=Date.now,Wu=bn(),yi=0,ja=0,tm=function(e,t,n){var i=ri(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},nm=function(e,t){return t&&(!ri(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Rx=function r(){return ja&&requestAnimationFrame(r)},im=function(){return Hl=1},rm=function(){return Hl=0},ki=function(e){return e},eo=function(e){return Math.round(e*1e5)/1e5||0},ym=function(){return typeof window<"u"},Sm=function(){return Ae||ym()&&(Ae=window.gsap)&&Ae.registerPlugin&&Ae},xs=function(e){return!!~tf.indexOf(e)},Mm=function(e){return(e==="Height"?rf:Je["inner"+e])||si["client"+e]||mt["client"+e]},bm=function(e){return lr(e,"getBoundingClientRect")||(xs(e)?function(){return zl.width=Je.innerWidth,zl.height=rf,zl}:function(){return cr(e)})},Px=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=lr(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?Mm(s):e["client"+s])||0}},Ix=function(e,t){return!t||~Ei.indexOf(e)?bm(e):function(){return zl}},Gi=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=lr(e,n))?a()-bm(e)()[s]:xs(e)?(si[n]||mt[n])-Mm(i):e[n]-e["offset"+i])},Al=function(e,t){for(var n=0;n<Ks.length;n+=3)(!t||~t.indexOf(Ks[n+1]))&&e(Ks[n],Ks[n+1],Ks[n+2])},ri=function(e){return typeof e=="string"},Tn=function(e){return typeof e=="function"},to=function(e){return typeof e=="number"},ds=function(e){return typeof e=="object"},Ka=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Ys=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},$s=Math.abs,Tm="left",wm="top",sf="right",af="bottom",ms="width",gs="height",ro="Right",so="Left",ao="Top",oo="Bottom",Jt="padding",xi="margin",ea="Width",of="Height",nn="px",vi=function(e){return Je.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Lx=function(e){var t=vi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},sm=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},cr=function(e,t){var n=t&&vi(e)[$u]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ae.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},Gl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Em=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},Dx=function(e){return function(t){return Ae.utils.snap(Em(e),t)}},lf=function(e){var t=Ae.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},Nx=function(e){return function(t,n){return lf(Em(e))(t,n.direction)}},Cl=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},ln=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},on=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Rl=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},am={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Pl={toggleActions:"play",anticipatePin:0},Vl={top:0,left:0,center:.5,bottom:1,right:1},Ul=function(e,t){if(ri(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Vl?Vl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Il=function(e,t,n,i,s,a,o,l){var c=s.startColor,h=s.endColor,d=s.fontSize,f=s.indent,u=s.fontWeight,_=xt.createElement("div"),x=xs(n)||lr(n,"pinType")==="fixed",p=e.indexOf("scroller")!==-1,g=x?mt:n.tagName==="IFRAME"?n.contentDocument.body:n,v=e.indexOf("start")!==-1,T=v?c:h,y="border-color:"+T+";font-size:"+d+";color:"+T+";font-weight:"+u+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((p||l)&&x?"fixed;":"absolute;"),(p||l||!x)&&(y+=(i===Zt?sf:af)+":"+(a+parseFloat(f))+"px;"),o&&(y+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),_._isStart=v,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=y,_.innerText=t||t===0?e+"-"+t:e,g.children[0]?g.insertBefore(_,g.children[0]):g.appendChild(_),_._offset=_["offset"+i.op.d2],Ol(_,0,i,v),_},Ol=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+ea]=1,s["border"+o+ea]=0,s[n.p]=t+"px",Ae.set(e,s)},Ze=[],Qu={},ho,om=function(){return bn()-yi>34&&(ho||(ho=requestAnimationFrame(hr)))},Zs=function(){(!Fn||!Fn.isPressed||Fn.startX>mt.clientWidth)&&(Xe.cache++,Fn?ho||(ho=requestAnimationFrame(hr)):hr(),yi||ys("scrollStart"),yi=bn())},Xu=function(){vm=Je.innerWidth,xm=Je.innerHeight},no=function(e){Xe.cache++,(e===!0||!Mn&&!_m&&!xt.fullscreenElement&&!xt.webkitFullscreenElement&&(!Zu||vm!==Je.innerWidth||Math.abs(Je.innerHeight-xm)>Je.innerHeight*.25))&&kl.restart(!0)},vs={},Ux=[],Am=function r(){return on(qe,"scrollEnd",r)||ps(!0)},ys=function(e){return vs[e]&&vs[e].map(function(t){return t()})||Ux},ii=[],Cm=function(e){for(var t=0;t<ii.length;t+=5)(!e||ii[t+4]&&ii[t+4].query===e)&&(ii[t].style.cssText=ii[t+1],ii[t].getBBox&&ii[t].setAttribute("transform",ii[t+2]||""),ii[t+3].uncache=1)},Rm=function(){Xe.cache++,Xe.forEach(function(e){return Tn(e)&&(e.rec=e())})},cf=function(e,t){var n;for(Bn=0;Bn<Ze.length;Bn++)n=Ze[Bn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Br=!0,t&&Cm(t),t||ys("revert")},Pm=function(e,t){Xe.cache++,(t||!zn)&&Xe.forEach(function(n){return Tn(n)&&n.cacheID++&&(n.rec=0)}),ri(e)&&(nf=e,Je.history.scrollRestoration!==e&&(Je.history.scrollRestoration=e))},zn,_s=0,lm,Ox=function(){if(lm!==_s){var e=lm=_s;requestAnimationFrame(function(){return e===_s&&ps(!0)})}},Im=function(){mt.appendChild(Qs),rf=!Fn&&Qs.offsetHeight||Je.innerHeight,mt.removeChild(Qs)},cm=function(e){return co(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},ps=function(e,t){if(si=xt.documentElement,mt=xt.body,tf=[Je,xt,si,mt],yi&&!e&&!Br){ln(qe,"scrollEnd",Am);return}Im(),zn=qe.isRefreshing=!0,Br||Rm();var n=ys("refreshInit");gm&&qe.sort(),t||cf(),Xe.forEach(function(i){Tn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Ze.slice(0).forEach(function(i){return i.refresh()}),Br=!1,Ze.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),Ku=1,cm(!0),Ze.forEach(function(i){var s=Gi(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),cm(!1),Ku=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Xe.forEach(function(i){Tn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Pm(nf,1),kl.pause(),_s++,zn=2,hr(2),Ze.forEach(function(i){return Tn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),zn=qe.isRefreshing=!1,ys("refresh")},ju=0,Fl=1,lo,hr=function(e){if(e===2||!zn&&!Br){qe.isUpdating=!0,lo&&lo.update(0);var t=Ze.length,n=bn(),i=n-Wu>=50,s=t&&Ze[0].scroll();if(Fl=ju>s?-1:1,zn||(ju=s),i&&(yi&&!Hl&&n-yi>200&&(yi=0,ys("scrollEnd")),Qa=Wu,Wu=n),Fl<0){for(Bn=t;Bn-- >0;)Ze[Bn]&&Ze[Bn].update(0,i);Fl=1}else for(Bn=0;Bn<t;Bn++)Ze[Bn]&&Ze[Bn].update(0,i);qe.isUpdating=!1}ho=0},ef=[Tm,wm,af,sf,xi+oo,xi+ro,xi+ao,xi+so,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Bl=ef.concat([ms,gs,"boxSizing","max"+ea,"max"+of,"position",xi,Jt,Jt+ao,Jt+ro,Jt+oo,Jt+so]),Fx=function(e,t,n){js(n);var i=e._gsap;if(i.spacerIsNative)js(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},qu=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=ef.length,a=t.style,o=e.style,l;s--;)l=ef[s],a[l]=n[l];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[af]=o[sf]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[ms]=Gl(e,Sn)+nn,a[gs]=Gl(e,Zt)+nn,a[Jt]=o[xi]=o[wm]=o[Tm]="0",js(i),o[ms]=o["max"+ea]=n[ms],o[gs]=o["max"+of]=n[gs],o[Jt]=n[Jt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Bx=/([A-Z])/g,js=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||Ae.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(Bx,"-$1").toLowerCase())}},Ll=function(e){for(var t=Bl.length,n=e.style,i=[],s=0;s<t;s++)i.push(Bl[s],n[Bl[s]]);return i.t=e,i},zx=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},zl={left:0,top:0},hm=function(e,t,n,i,s,a,o,l,c,h,d,f,u,_){Tn(e)&&(e=e(l)),ri(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Ul("0"+e.substr(3),n):0));var x=u?u.time():0,p,g,v;if(u&&u.seek(0),isNaN(e)||(e=+e),to(e))u&&(e=Ae.utils.mapRange(u.scrollTrigger.start,u.scrollTrigger.end,0,f,e)),o&&Ol(o,n,i,!0);else{Tn(t)&&(t=t(l));var T=(e||"0").split(" "),y,w,E,m;v=On(t,l)||mt,y=cr(v)||{},(!y||!y.left&&!y.top)&&vi(v).display==="none"&&(m=v.style.display,v.style.display="block",y=cr(v),m?v.style.display=m:v.style.removeProperty("display")),w=Ul(T[0],y[i.d]),E=Ul(T[1]||"0",n),e=y[i.p]-c[i.p]-h+w+s-E,o&&Ol(o,E,i,n-E<20||o._isStart&&E>20),n-=n-E}if(_&&(l[_]=e||-.001,e<0&&(e=0)),a){var S=e+n,R=a._isStart;p="scroll"+i.d2,Ol(a,S,i,R&&S>20||!R&&(d?Math.max(mt[p],si[p]):a.parentNode[p])<=S+1),d&&(c=cr(o),d&&(a.style[i.op.p]=c[i.op.p]-i.op.m-a._offset+nn))}return u&&v&&(p=cr(v),u.seek(f),g=cr(v),u._caScrollDist=p[i.p]-g[i.p],e=e/u._caScrollDist*f),u&&u.seek(x),u?e:Math.round(e)},kx=/(webkit|moz|length|cssText|inset)/i,um=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===mt){e._stOrig=s.cssText,o=vi(e);for(a in o)!+a&&!kx.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ae.core.getCache(e).uncache=1,t.appendChild(e)}},Lm=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},Dl=function(e,t,n){var i={};i[t.p]="+="+n,Ae.set(e,i)},fm=function(e,t){var n=or(e,t),i="_scroll"+t.p2,s=function a(o,l,c,h,d){var f=a.tween,u=l.onComplete,_={};c=c||n();var x=Lm(n,c,function(){f.kill(),a.tween=0});return d=h&&d||0,h=h||o-c,f&&f.kill(),l[i]=o,l.inherit=!1,l.modifiers=_,_[i]=function(){return x(c+h*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){Xe.cache++,a.tween&&hr()},l.onComplete=function(){a.tween=0,u&&u.call(f)},f=a.tween=Ae.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},ln(e,"wheel",n.wheelHandler),qe.isTouch&&ln(e,"touchmove",n.wheelHandler),s},qe=(function(){function r(t,n){Js||r.register(Ae)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ju(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ja){this.update=this.refresh=this.kill=ki;return}n=sm(ri(n)||to(n)||n.nodeType?{trigger:n}:n,Pl);var s=n,a=s.onUpdate,o=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,d=s.scrub,f=s.trigger,u=s.pin,_=s.pinSpacing,x=s.invalidateOnRefresh,p=s.anticipatePin,g=s.onScrubComplete,v=s.onSnapComplete,T=s.once,y=s.snap,w=s.pinReparent,E=s.pinSpacer,m=s.containerAnimation,S=s.fastScrollEnd,R=s.preventOverlaps,A=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Sn:Zt,D=!d&&d!==0,N=On(n.scroller||Je),X=Ae.core.getCache(N),I=xs(N),B=("pinType"in n?n.pinType:lr(N,"pinType")||I&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],F=D&&n.toggleActions.split(" "),j="markers"in n?n.markers:Pl.markers,W=I?0:parseFloat(vi(N)["border"+A.p2+ea])||0,P=this,ne=n.onRefreshInit&&function(){return n.onRefreshInit(P)},Se=Px(N,I,A),Oe=Ix(N,I),Z=0,he=0,ye=0,be=or(N,A),me,De,_t,Ee,Ve,Ie,Ue,ct,at,$,Qe,Xt,yt,it,Ft,Ht,O,ft,ot,ke,ue,ht,Le,Fe,C,M,k,se,ie,ce,ge,H,Q,le,L,K,J,fe,oe;if(P._startClamp=P._endClamp=!1,P._dir=A,p*=45,P.scroller=N,P.scroll=m?m.time.bind(m):be,Ee=be(),Br&&be.rec==null&&(be.rec=Ee),P.vars=n,i=i||n.animation,"refreshPriority"in n&&(gm=1,n.refreshPriority===-9999&&(lo=P)),X.tweenScroll=X.tweenScroll||{top:fm(N,Zt),left:fm(N,Sn)},P.tweenTo=me=X.tweenScroll[A.p],P.scrubDuration=function(ee){Q=to(ee)&&ee,Q?H?H.duration(ee):H=Ae.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Q,paused:!0,onComplete:function(){return g&&g(P)}}):(H&&H.progress(1).kill(),H=0)},i&&(i.vars.lazy=!1,i._initted&&!P.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),P.animation=i.pause(),i.scrollTrigger=P,P.scrubDuration(d),ce=0,l||(l=i.vars.id)),y&&((!ds(y)||y.push)&&(y={snapTo:y}),"scrollBehavior"in mt.style&&Ae.set(I?[mt,si]:N,{scrollBehavior:"auto"}),Xe.forEach(function(ee){return Tn(ee)&&ee.target===(I?xt.scrollingElement||si:N)&&(ee.smooth=!1)}),_t=Tn(y.snapTo)?y.snapTo:y.snapTo==="labels"?Dx(i):y.snapTo==="labelsDirectional"?Nx(i):y.directional!==!1?function(ee,_e){return lf(y.snapTo)(ee,bn()-he<500?0:_e.direction)}:Ae.utils.snap(y.snapTo),le=y.duration||{min:.1,max:2},le=ds(le)?io(le.min,le.max):io(le,le),L=Ae.delayedCall(y.delay||Q/2||.1,function(){var ee=be(),_e=bn()-he<500,te=me.tween;if((_e||Math.abs(P.getVelocity())<10)&&!te&&!Hl&&Z!==ee){var Te=(ee-Ie)/it,je=i&&!D?i.totalProgress():Te,He=_e?0:(je-ge)/(bn()-Qa)*1e3||0,Ct=Ae.utils.clamp(-Te,1-Te,$s(He/2)*He/.185),qt=Te+(y.inertia===!1?0:Ct),Rt,St,pt=y,Qt=pt.onStart,Mt=pt.onInterrupt,mn=pt.onComplete;if(Rt=_t(qt,P),to(Rt)||(Rt=qt),St=Math.max(0,Math.round(Ie+Rt*it)),ee<=Ue&&ee>=Ie&&St!==ee){if(te&&!te._initted&&te.data<=$s(St-ee))return;y.inertia===!1&&(Ct=Rt-Te),me(St,{duration:le($s(Math.max($s(qt-je),$s(Rt-je))*.185/He/.05||0)),ease:y.ease||"power3",data:$s(St-ee),onInterrupt:function(){return L.restart(!0)&&Mt&&Ys(P,Mt)},onComplete:function(){P.update(),Z=be(),i&&!D&&(H?H.resetTo("totalProgress",Rt,i._tTime/i._tDur):i.progress(Rt)),ce=ge=i&&!D?i.totalProgress():P.progress,v&&v(P),mn&&Ys(P,mn)}},ee,Ct*it,St-ee-Ct*it),Qt&&Ys(P,Qt,me.tween)}}else P.isActive&&Z!==ee&&L.restart(!0)}).pause()),l&&(Qu[l]=P),f=P.trigger=On(f||u!==!0&&u),oe=f&&f._gsap&&f._gsap.stRevert,oe&&(oe=oe(P)),u=u===!0?f:On(u),ri(o)&&(o={targets:f,className:o}),u&&(_===!1||_===xi||(_=!_&&u.parentNode&&u.parentNode.style&&vi(u.parentNode).display==="flex"?!1:Jt),P.pin=u,De=Ae.core.getCache(u),De.spacer?Ft=De.pinState:(E&&(E=On(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),De.spacerIsNative=!!E,E&&(De.spacerState=Ll(E))),De.spacer=ft=E||xt.createElement("div"),ft.classList.add("pin-spacer"),l&&ft.classList.add("pin-spacer-"+l),De.pinState=Ft=Ll(u)),n.force3D!==!1&&Ae.set(u,{force3D:!0}),P.spacer=ft=De.spacer,ie=vi(u),Fe=ie[_+A.os2],ke=Ae.getProperty(u),ue=Ae.quickSetter(u,A.a,nn),qu(u,ft,ie),O=Ll(u)),j){Xt=ds(j)?sm(j,am):am,$=Il("scroller-start",l,N,A,Xt,0),Qe=Il("scroller-end",l,N,A,Xt,0,$),ot=$["offset"+A.op.d2];var de=On(lr(N,"content")||N);ct=this.markerStart=Il("start",l,de,A,Xt,ot,0,m),at=this.markerEnd=Il("end",l,de,A,Xt,ot,0,m),m&&(fe=Ae.quickSetter([ct,at],A.a,nn)),!B&&!(Ei.length&&lr(N,"fixedMarkers")===!0)&&(Lx(I?mt:N),Ae.set([$,Qe],{force3D:!0}),M=Ae.quickSetter($,A.a,nn),se=Ae.quickSetter(Qe,A.a,nn))}if(m){var ae=m.vars.onUpdate,pe=m.vars.onUpdateParams;m.eventCallback("onUpdate",function(){P.update(0,0,1),ae&&ae.apply(m,pe||[])})}if(P.previous=function(){return Ze[Ze.indexOf(P)-1]},P.next=function(){return Ze[Ze.indexOf(P)+1]},P.revert=function(ee,_e){if(!_e)return P.kill(!0);var te=ee!==!1||!P.enabled,Te=Mn;te!==P.isReverted&&(te&&(K=Math.max(be(),P.scroll.rec||0),ye=P.progress,J=i&&i.progress()),ct&&[ct,at,$,Qe].forEach(function(je){return je.style.display=te?"none":"block"}),te&&(Mn=P,P.update(te)),u&&(!w||!P.isActive)&&(te?Fx(u,ft,Ft):qu(u,ft,vi(u),C)),te||P.update(te),Mn=Te,P.isReverted=te)},P.refresh=function(ee,_e,te,Te){if(!((Mn||!P.enabled)&&!_e)){if(u&&ee&&yi){ln(r,"scrollEnd",Am);return}!zn&&ne&&ne(P),Mn=P,me.tween&&!te&&(me.tween.kill(),me.tween=0),H&&H.pause(),x&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(z){return z.vars.immediateRender&&z.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),P.isReverted||P.revert(!0,!0),P._subPinOffset=!1;var je=Se(),He=Oe(),Ct=m?m.duration():Gi(N,A),qt=it<=.01||!it,Rt=0,St=Te||0,pt=ds(te)?te.end:n.end,Qt=n.endTrigger||f,Mt=ds(te)?te.start:n.start||(n.start===0||!f?0:u?"0 0":"0 100%"),mn=P.pinnedContainer=n.pinnedContainer&&On(n.pinnedContainer,P),Kn=f&&Math.max(0,Ze.indexOf(P))||0,Bt=Kn,Yt,jt,Qn,Ds,en,zt,pi,La,jo,Tr,b,U,Y;for(j&&ds(te)&&(U=Ae.getProperty($,A.p),Y=Ae.getProperty(Qe,A.p));Bt-- >0;)zt=Ze[Bt],zt.end||zt.refresh(0,1)||(Mn=P),pi=zt.pin,pi&&(pi===f||pi===u||pi===mn)&&!zt.isReverted&&(Tr||(Tr=[]),Tr.unshift(zt),zt.revert(!0,!0)),zt!==Ze[Bt]&&(Kn--,Bt--);for(Tn(Mt)&&(Mt=Mt(P)),Mt=tm(Mt,"start",P),Ie=hm(Mt,f,je,A,be(),ct,$,P,He,W,B,Ct,m,P._startClamp&&"_startClamp")||(u?-.001:0),Tn(pt)&&(pt=pt(P)),ri(pt)&&!pt.indexOf("+=")&&(~pt.indexOf(" ")?pt=(ri(Mt)?Mt.split(" ")[0]:"")+pt:(Rt=Ul(pt.substr(2),je),pt=ri(Mt)?Mt:(m?Ae.utils.mapRange(0,m.duration(),m.scrollTrigger.start,m.scrollTrigger.end,Ie):Ie)+Rt,Qt=f)),pt=tm(pt,"end",P),Ue=Math.max(Ie,hm(pt||(Qt?"100% 0":Ct),Qt,je,A,be()+Rt,at,Qe,P,He,W,B,Ct,m,P._endClamp&&"_endClamp"))||-.001,Rt=0,Bt=Kn;Bt--;)zt=Ze[Bt]||{},pi=zt.pin,pi&&zt.start-zt._pinPush<=Ie&&!m&&zt.end>0&&(Yt=zt.end-(P._startClamp?Math.max(0,zt.start):zt.start),(pi===f&&zt.start-zt._pinPush<Ie||pi===mn)&&isNaN(Mt)&&(Rt+=Yt*(1-zt.progress)),pi===u&&(St+=Yt));if(Ie+=Rt,Ue+=Rt,P._startClamp&&(P._startClamp+=Rt),P._endClamp&&!zn&&(P._endClamp=Ue||-.001,Ue=Math.min(Ue,Gi(N,A))),it=Ue-Ie||(Ie-=.01)&&.001,qt&&(ye=Ae.utils.clamp(0,1,Ae.utils.normalize(Ie,Ue,K))),P._pinPush=St,ct&&Rt&&(Yt={},Yt[A.a]="+="+Rt,mn&&(Yt[A.p]="-="+be()),Ae.set([ct,at],Yt)),u&&!(Ku&&P.end>=Gi(N,A)))Yt=vi(u),Ds=A===Zt,Qn=be(),ht=parseFloat(ke(A.a))+St,!Ct&&Ue>1&&(b=(I?xt.scrollingElement||si:N).style,b={style:b,value:b["overflow"+A.a.toUpperCase()]},I&&vi(mt)["overflow"+A.a.toUpperCase()]!=="scroll"&&(b.style["overflow"+A.a.toUpperCase()]="scroll")),qu(u,ft,Yt),O=Ll(u),jt=cr(u,!0),La=B&&or(N,Ds?Sn:Zt)(),_?(C=[_+A.os2,it+St+nn],C.t=ft,Bt=_===Jt?Gl(u,A)+it+St:0,Bt&&(C.push(A.d,Bt+nn),ft.style.flexBasis!=="auto"&&(ft.style.flexBasis=Bt+nn)),js(C),mn&&Ze.forEach(function(z){z.pin===mn&&z.vars.pinSpacing!==!1&&(z._subPinOffset=!0)}),B&&be(K)):(Bt=Gl(u,A),Bt&&ft.style.flexBasis!=="auto"&&(ft.style.flexBasis=Bt+nn)),B&&(en={top:jt.top+(Ds?Qn-Ie:La)+nn,left:jt.left+(Ds?La:Qn-Ie)+nn,boxSizing:"border-box",position:"fixed"},en[ms]=en["max"+ea]=Math.ceil(jt.width)+nn,en[gs]=en["max"+of]=Math.ceil(jt.height)+nn,en[xi]=en[xi+ao]=en[xi+ro]=en[xi+oo]=en[xi+so]="0",en[Jt]=Yt[Jt],en[Jt+ao]=Yt[Jt+ao],en[Jt+ro]=Yt[Jt+ro],en[Jt+oo]=Yt[Jt+oo],en[Jt+so]=Yt[Jt+so],Ht=zx(Ft,en,w),zn&&be(0)),i?(jo=i._initted,Vu(1),i.render(i.duration(),!0,!0),Le=ke(A.a)-ht+it+St,k=Math.abs(it-Le)>1,B&&k&&Ht.splice(Ht.length-2,2),i.render(0,!0,!0),jo||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Vu(0)):Le=it,b&&(b.value?b.style["overflow"+A.a.toUpperCase()]=b.value:b.style.removeProperty("overflow-"+A.a));else if(f&&be()&&!m)for(jt=f.parentNode;jt&&jt!==mt;)jt._pinOffset&&(Ie-=jt._pinOffset,Ue-=jt._pinOffset),jt=jt.parentNode;Tr&&Tr.forEach(function(z){return z.revert(!1,!0)}),P.start=Ie,P.end=Ue,Ee=Ve=zn?K:be(),!m&&!zn&&!Br&&(Ee<K&&be(K),P.scroll.rec=0),P.revert(!1,!0),he=bn(),L&&(Z=-1,L.restart(!0)),Mn=0,i&&D&&(i._initted||J)&&i.progress()!==J&&i.progress(J||0,!0).render(i.time(),!0,!0),(qt||ye!==P.progress||m||x||i&&!i._initted)&&(i&&!D&&(i._initted||ye||i.vars.immediateRender!==!1)&&i.totalProgress(m&&Ie<-.001&&!ye?Ae.utils.normalize(Ie,Ue,0):ye,!0),P.progress=qt||(Ee-Ie)/it===ye?0:ye),u&&_&&(ft._pinOffset=Math.round(P.progress*Le)),H&&H.invalidate(),isNaN(U)||(U-=Ae.getProperty($,A.p),Y-=Ae.getProperty(Qe,A.p),Dl($,A,U),Dl(ct,A,U-(Te||0)),Dl(Qe,A,Y),Dl(at,A,Y-(Te||0))),qt&&!zn&&P.update(),h&&!zn&&!yt&&(yt=!0,h(P),yt=!1)}},P.getVelocity=function(){return(be()-Ve)/(bn()-Qa)*1e3||0},P.endAnimation=function(){Ka(P.callbackAnimation),i&&(H?H.progress(1):i.paused()?D||Ka(i,P.direction<0,1):Ka(i,i.reversed()))},P.labelToScroll=function(ee){return i&&i.labels&&(Ie||P.refresh()||Ie)+i.labels[ee]/i.duration()*it||0},P.getTrailing=function(ee){var _e=Ze.indexOf(P),te=P.direction>0?Ze.slice(0,_e).reverse():Ze.slice(_e+1);return(ri(ee)?te.filter(function(Te){return Te.vars.preventOverlaps===ee}):te).filter(function(Te){return P.direction>0?Te.end<=Ie:Te.start>=Ue})},P.update=function(ee,_e,te){if(!(m&&!te&&!ee)){var Te=zn===!0?K:P.scroll(),je=ee?0:(Te-Ie)/it,He=je<0?0:je>1?1:je||0,Ct=P.progress,qt,Rt,St,pt,Qt,Mt,mn,Kn;if(_e&&(Ve=Ee,Ee=m?be():Te,y&&(ge=ce,ce=i&&!D?i.totalProgress():He)),p&&u&&!Mn&&!El&&yi&&(!He&&Ie<Te+(Te-Ve)/(bn()-Qa)*p?He=1e-4:He===1&&Ue>Te+(Te-Ve)/(bn()-Qa)*p&&(He=.9999)),He!==Ct&&P.enabled){if(qt=P.isActive=!!He&&He<1,Rt=!!Ct&&Ct<1,Mt=qt!==Rt,Qt=Mt||!!He!=!!Ct,P.direction=He>Ct?1:-1,P.progress=He,Qt&&!Mn&&(St=He&&!Ct?0:He===1?1:Ct===1?2:3,D&&(pt=!Mt&&F[St+1]!=="none"&&F[St+1]||F[St],Kn=i&&(pt==="complete"||pt==="reset"||pt in i))),R&&(Mt||Kn)&&(Kn||d||!i)&&(Tn(R)?R(P):P.getTrailing(R).forEach(function(Qn){return Qn.endAnimation()})),D||(H&&!Mn&&!El?(H._dp._time-H._start!==H._time&&H.render(H._dp._time-H._start),H.resetTo?H.resetTo("totalProgress",He,i._tTime/i._tDur):(H.vars.totalProgress=He,H.invalidate().restart())):i&&i.totalProgress(He,!!(Mn&&(he||ee)))),u){if(ee&&_&&(ft.style[_+A.os2]=Fe),!B)ue(eo(ht+Le*He));else if(Qt){if(mn=!ee&&He>Ct&&Ue+1>Te&&Te+1>=Gi(N,A),w)if(!ee&&(qt||mn)){var Bt=cr(u,!0),Yt=Te-Ie;um(u,mt,Bt.top+(A===Zt?Yt:0)+nn,Bt.left+(A===Zt?0:Yt)+nn)}else um(u,ft);js(qt||mn?Ht:O),k&&He<1&&qt||ue(ht+(He===1&&!mn?Le:0))}}y&&!me.tween&&!Mn&&!El&&L.restart(!0),o&&(Mt||T&&He&&(He<1||!Hu))&&co(o.targets).forEach(function(Qn){return Qn.classList[qt||T?"add":"remove"](o.className)}),a&&!D&&!ee&&a(P),Qt&&!Mn?(D&&(Kn&&(pt==="complete"?i.pause().totalProgress(1):pt==="reset"?i.restart(!0).pause():pt==="restart"?i.restart(!0):i[pt]()),a&&a(P)),(Mt||!Hu)&&(c&&Mt&&Ys(P,c),V[St]&&Ys(P,V[St]),T&&(He===1?P.kill(!1,1):V[St]=0),Mt||(St=He===1?1:3,V[St]&&Ys(P,V[St]))),S&&!qt&&Math.abs(P.getVelocity())>(to(S)?S:2500)&&(Ka(P.callbackAnimation),H?H.progress(1):Ka(i,pt==="reverse"?1:!He,1))):D&&a&&!Mn&&a(P)}if(se){var jt=m?Te/m.duration()*(m._caScrollDist||0):Te;M(jt+($._isFlipped?1:0)),se(jt)}fe&&fe(-Te/m.duration()*(m._caScrollDist||0))}},P.enable=function(ee,_e){P.enabled||(P.enabled=!0,ln(N,"resize",no),I||ln(N,"scroll",Zs),ne&&ln(r,"refreshInit",ne),ee!==!1&&(P.progress=ye=0,Ee=Ve=Z=be()),_e!==!1&&P.refresh())},P.getTween=function(ee){return ee&&me?me.tween:H},P.setPositions=function(ee,_e,te,Te){if(m){var je=m.scrollTrigger,He=m.duration(),Ct=je.end-je.start;ee=je.start+Ct*ee/He,_e=je.start+Ct*_e/He}P.refresh(!1,!1,{start:nm(ee,te&&!!P._startClamp),end:nm(_e,te&&!!P._endClamp)},Te),P.update()},P.adjustPinSpacing=function(ee){if(C&&ee){var _e=C.indexOf(A.d)+1;C[_e]=parseFloat(C[_e])+ee+nn,C[1]=parseFloat(C[1])+ee+nn,js(C)}},P.disable=function(ee,_e){if(ee!==!1&&P.revert(!0,!0),P.enabled&&(P.enabled=P.isActive=!1,_e||H&&H.pause(),K=0,De&&(De.uncache=1),ne&&on(r,"refreshInit",ne),L&&(L.pause(),me.tween&&me.tween.kill()&&(me.tween=0)),!I)){for(var te=Ze.length;te--;)if(Ze[te].scroller===N&&Ze[te]!==P)return;on(N,"resize",no),I||on(N,"scroll",Zs)}},P.kill=function(ee,_e){P.disable(ee,_e),H&&!_e&&H.kill(),l&&delete Qu[l];var te=Ze.indexOf(P);te>=0&&Ze.splice(te,1),te===Bn&&Fl>0&&Bn--,te=0,Ze.forEach(function(Te){return Te.scroller===P.scroller&&(te=1)}),te||zn||Br||(P.scroll.rec=0),i&&(i.scrollTrigger=null,ee&&i.revert({kill:!1}),_e||i.kill()),ct&&[ct,at,$,Qe].forEach(function(Te){return Te.parentNode&&Te.parentNode.removeChild(Te)}),lo===P&&(lo=0),u&&(De&&(De.uncache=1),te=0,Ze.forEach(function(Te){return Te.pin===u&&te++}),te||(De.spacer=0)),n.onKill&&n.onKill(P)},Ze.push(P),P.enable(!1,!1),oe&&oe(P),i&&i.add&&!it){var re=P.update;P.update=function(){P.update=re,Xe.cache++,Ie||Ue||P.refresh()},Ae.delayedCall(.01,P.update),it=.01,Ie=Ue=0}else P.refresh();u&&Ox()},r.register=function(n){return Js||(Ae=n||Sm(),ym()&&window.document&&r.enable(),Js=ja),Js},r.defaults=function(n){if(n)for(var i in n)Pl[i]=n[i];return Pl},r.disable=function(n,i){ja=0,Ze.forEach(function(a){return a[i?"kill":"disable"](n)}),on(Je,"wheel",Zs),on(xt,"scroll",Zs),clearInterval(wl),on(xt,"touchcancel",ki),on(mt,"touchstart",ki),Cl(on,xt,"pointerdown,touchstart,mousedown",im),Cl(on,xt,"pointerup,touchend,mouseup",rm),kl.kill(),Al(on);for(var s=0;s<Xe.length;s+=3)Rl(on,Xe[s],Xe[s+1]),Rl(on,Xe[s],Xe[s+2])},r.enable=function(){if(Je=window,xt=document,si=xt.documentElement,mt=xt.body,Ae){if(co=Ae.utils.toArray,io=Ae.utils.clamp,Ju=Ae.core.context||ki,Vu=Ae.core.suppressOverwrites||ki,nf=Je.history.scrollRestoration||"auto",ju=Je.pageYOffset||0,Ae.core.globals("ScrollTrigger",r),mt){ja=1,Qs=document.createElement("div"),Qs.style.height="100vh",Qs.style.position="absolute",Im(),Rx(),Vt.register(Ae),r.isTouch=Vt.isTouch,Fr=Vt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Zu=Vt.isTouch===1,ln(Je,"wheel",Zs),tf=[Je,xt,si,mt],Ae.matchMedia?(r.matchMedia=function(h){var d=Ae.matchMedia(),f;for(f in h)d.add(f,h[f]);return d},Ae.addEventListener("matchMediaInit",function(){Rm(),cf()}),Ae.addEventListener("matchMediaRevert",function(){return Cm()}),Ae.addEventListener("matchMedia",function(){ps(0,1),ys("matchMedia")}),Ae.matchMedia().add("(orientation: portrait)",function(){return Xu(),Xu})):console.warn("Requires GSAP 3.11.0 or later"),Xu(),ln(xt,"scroll",Zs);var n=mt.hasAttribute("style"),i=mt.style,s=i.borderTopStyle,a=Ae.core.Animation.prototype,o,l;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=cr(mt),Zt.m=Math.round(o.top+Zt.sc())||0,Sn.m=Math.round(o.left+Sn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(mt.setAttribute("style",""),mt.removeAttribute("style")),wl=setInterval(om,250),Ae.delayedCall(.5,function(){return El=0}),ln(xt,"touchcancel",ki),ln(mt,"touchstart",ki),Cl(ln,xt,"pointerdown,touchstart,mousedown",im),Cl(ln,xt,"pointerup,touchend,mouseup",rm),$u=Ae.utils.checkPrefix("transform"),Bl.push($u),Js=bn(),kl=Ae.delayedCall(.2,ps).pause(),Ks=[xt,"visibilitychange",function(){var h=Je.innerWidth,d=Je.innerHeight;xt.hidden?(jp=h,em=d):(jp!==h||em!==d)&&no()},xt,"DOMContentLoaded",ps,Je,"load",ps,Je,"resize",no],Al(ln),Ze.forEach(function(h){return h.enable(0,1)}),l=0;l<Xe.length;l+=3)Rl(on,Xe[l],Xe[l+1]),Rl(on,Xe[l],Xe[l+2])}else if(xt){var c=function h(){r.enable(),xt.removeEventListener("DOMContentLoaded",h)};xt.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Hu=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(wl)||(wl=i)&&setInterval(om,i),"ignoreMobileResize"in n&&(Zu=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Al(on)||Al(ln,n.autoRefreshEvents||"none"),_m=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=On(n),a=Xe.indexOf(s),o=xs(s);~a&&Xe.splice(a,o?6:2),i&&(o?Ei.unshift(Je,i,mt,i,si,i):Ei.unshift(s,i))},r.clearMatchMedia=function(n){Ze.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(ri(n)?On(n):n).getBoundingClientRect(),o=a[s?ms:gs]*i||0;return s?a.right-o>0&&a.left+o<Je.innerWidth:a.bottom-o>0&&a.top+o<Je.innerHeight},r.positionInViewport=function(n,i,s){ri(n)&&(n=On(n));var a=n.getBoundingClientRect(),o=a[s?ms:gs],l=i==null?o/2:i in Vl?Vl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+l)/Je.innerWidth:(a.top+l)/Je.innerHeight},r.killAll=function(n){if(Ze.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=vs.killAll||[];vs={},i.forEach(function(s){return s()})}},r})();qe.version="3.15.1";qe.saveStyles=function(r){return r?co(r).forEach(function(e){if(e&&e.style){var t=ii.indexOf(e);t>=0&&ii.splice(t,5),ii.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ae.core.getCache(e),Ju())}}):ii};qe.revert=function(r,e){return cf(!r,e)};qe.create=function(r,e){return new qe(r,e)};qe.refresh=function(r){return r?no(!0):(Js||qe.register())&&ps(!0)};qe.update=function(r){return++Xe.cache&&hr(r===!0?2:0)};qe.clearScrollMemory=Pm;qe.maxScroll=function(r,e){return Gi(r,e?Sn:Zt)};qe.getScrollFunc=function(r,e){return or(On(r),e?Sn:Zt)};qe.getById=function(r){return Qu[r]};qe.getAll=function(){return Ze.filter(function(r){return r.vars.id!=="ScrollSmoother"})};qe.isScrolling=function(){return!!yi};qe.snapDirectional=lf;qe.addEventListener=function(r,e){var t=vs[r]||(vs[r]=[]);~t.indexOf(e)||t.push(e)};qe.removeEventListener=function(r,e){var t=vs[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};qe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(c,h){var d=[],f=[],u=Ae.delayedCall(i,function(){h(d,f),d=[],f=[]}).pause();return function(_){d.length||u.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&u.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&Tn(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return Tn(s)&&(s=s(),ln(qe,"refresh",function(){return s=e.batchMax()})),co(r).forEach(function(l){var c={};for(o in n)c[o]=n[o];c.trigger=l,t.push(qe.create(c))}),t};var dm=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Yu=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Vt.isTouch?" pinch-zoom":""):"none",e===si&&r(mt,t)},Nl={auto:1,scroll:1},Gx=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Ae.core.getCache(s),o=bn(),l;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==mt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Nl[(l=vi(s)).overflowY]||Nl[l.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!xs(s)&&(Nl[(l=vi(s)).overflowY]||Nl[l.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Dm=function(e,t,n,i){return Vt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&Gx,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&ln(xt,Vt.eventTypes[0],mm,!1,!0)},onDisable:function(){return on(xt,Vt.eventTypes[0],mm,!0)}})},Vx=/(input|label|select|textarea)/i,pm,mm=function(e){var t=Vx.test(e.target.tagName);(t||pm)&&(e._gsapAllow=!0,pm=t)},Hx=function(e){ds(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,l,c=On(e.target)||si,h=Ae.core.globals().ScrollSmoother,d=h&&h.get(),f=Fr&&(e.content&&On(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),u=or(c,Zt),_=or(c,Sn),x=1,p=(Vt.isTouch&&Je.visualViewport?Je.visualViewport.scale*Je.visualViewport.width:Je.outerWidth)/Je.innerWidth,g=0,v=Tn(i)?function(){return i(o)}:function(){return i||2.8},T,y,w=Dm(c,e.type,!0,s),E=function(){return y=!1},m=ki,S=ki,R=function(){l=Gi(c,Zt),S=io(Fr?1:0,l),n&&(m=io(0,Gi(c,Sn))),T=_s},A=function(){f._gsap.y=eo(parseFloat(f._gsap.y)+u.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",u.offset=u.cacheID=0},D=function(){if(y){requestAnimationFrame(E);var j=eo(o.deltaY/2),W=S(u.v-j);if(f&&W!==u.v+u.offset){u.offset=W-u.v;var P=eo((parseFloat(f&&f._gsap.y)||0)-u.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+P+", 0, 1)",f._gsap.y=P+"px",u.cacheID=Xe.cache,hr()}return!0}u.offset&&A(),y=!0},N,X,I,B,V=function(){R(),N.isActive()&&N.vars.scrollY>l&&(u()>l?N.progress(1)&&u(l):N.resetTo("scrollY",l))};return f&&Ae.set(f,{y:"+=0"}),e.ignoreCheck=function(F){return Fr&&F.type==="touchmove"&&D(F)||x>1.05&&F.type!=="touchstart"||o.isGesturing||F.touches&&F.touches.length>1},e.onPress=function(){y=!1;var F=x;x=eo((Je.visualViewport&&Je.visualViewport.scale||1)/p),N.pause(),F!==x&&Yu(c,x>1.01?!0:n?!1:"x"),X=_(),I=u(),R(),T=_s},e.onRelease=e.onGestureStart=function(F,j){if(u.offset&&A(),!j)B.restart(!0);else{Xe.cache++;var W=v(),P,ne;n&&(P=_(),ne=P+W*.05*-F.velocityX/.227,W*=dm(_,P,ne,Gi(c,Sn)),N.vars.scrollX=m(ne)),P=u(),ne=P+W*.05*-F.velocityY/.227,W*=dm(u,P,ne,Gi(c,Zt)),N.vars.scrollY=S(ne),N.invalidate().duration(W).play(.01),(Fr&&N.vars.scrollY>=l||P>=l-1)&&Ae.to({},{onUpdate:V,duration:W})}a&&a(F)},e.onWheel=function(){N._ts&&N.pause(),bn()-g>1e3&&(T=0,g=bn())},e.onChange=function(F,j,W,P,ne){if(_s!==T&&R(),j&&n&&_(m(P[2]===j?X+(F.startX-F.x):_()+j-P[1])),W){u.offset&&A();var Se=ne[2]===W,Oe=Se?I+F.startY-F.y:u()+W-ne[1],Z=S(Oe);Se&&Oe!==Z&&(I+=Z-Oe),u(Z)}(W||j)&&hr()},e.onEnable=function(){Yu(c,n?!1:"x"),qe.addEventListener("refresh",V),ln(Je,"resize",V),u.smooth&&(u.target.style.scrollBehavior="auto",u.smooth=_.smooth=!1),w.enable()},e.onDisable=function(){Yu(c,!0),on(Je,"resize",V),qe.removeEventListener("refresh",V),w.kill()},e.lockAxis=e.lockAxis!==!1,o=new Vt(e),o.iOS=Fr,Fr&&!u()&&u(1),Fr&&Ae.ticker.add(ki),B=o._dc,N=Ae.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Lm(u,u(),function(){return N.pause()})},onUpdate:hr,onComplete:B.vars.onComplete}),o};qe.sort=function(r){if(Tn(r))return Ze.sort(r);var e=Je.pageYOffset||0;return qe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+Je.innerHeight}),Ze.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};qe.observe=function(r){return new Vt(r)};qe.normalizeScroll=function(r){if(typeof r>"u")return Fn;if(r===!0&&Fn)return Fn.enable();if(r===!1){Fn&&Fn.kill(),Fn=r;return}var e=r instanceof Vt?r:Hx(r);return Fn&&Fn.target===e.target&&Fn.kill(),xs(e.target)&&(Fn=e),e};qe.core={_getVelocityProp:Tl,_inputObserver:Dm,_scrollers:Xe,_proxies:Ei,bridge:{ss:function(){yi||ys("scrollStart"),yi=bn()},ref:function(){return Mn}}};Sm()&&Ae.registerPlugin(qe);var cg=0,Gf=1,hg=2;var zo=1,ug=2,Ea=3,Qr=0,Vn=1,Zi=2,Es=0,Aa=1,ko=2,Vf=3,Hf=4,fg=5;var As=100,dg=101,pg=102,mg=103,gg=104,_g=200,xg=201,vg=202,yg=203,Wf=204,Xf=205,Sg=206,Mg=207,bg=208,Tg=209,wg=210,Eg=211,Ag=212,Cg=213,Rg=214,yc=0,Sc=1,Mc=2,ma=3,bc=4,Tc=5,wc=6,Ec=7,qf=0,Pg=1,Ig=2,Ji=0,Yf=1,$f=2,Zf=3,Jf=4,Kf=5,Qf=6,jf=7;var ed=300,Cs=301,Ca=302,ih=303,rh=304,Ac=1e3,Hi=1001,Cc=1002,hn=1003,Lg=1004;var Go=1005;var kn=1006,sh=1007;var Sr=1008;var Jn=1009,td=1010,nd=1011,Ra=1012,ah=1013,Li=1014,Di=1015,Ni=1016,oh=1017,lh=1018,Rs=1020,id=35902,rd=35899,sd=1021,ad=1022,Ui=1023,xr=1026,Mr=1027,od=1028,ch=1029,jr=1030,hh=1031;var uh=1033,Vo=33776,Ho=33777,Wo=33778,Xo=33779,fh=35840,dh=35841,ph=35842,mh=35843,gh=36196,_h=37492,xh=37496,vh=37488,yh=37489,qo=37490,Sh=37491,Mh=37808,bh=37809,Th=37810,wh=37811,Eh=37812,Ah=37813,Ch=37814,Rh=37815,Ph=37816,Ih=37817,Lh=37818,Dh=37819,Nh=37820,Uh=37821,Oh=36492,Fh=36494,Bh=36495,zh=36283,kh=36284,Yo=36285,Gh=36286;var xo=2300,Rc=2301,_c=2302,Df=2303,Nf=2400,Uf=2401,Of=2402;var Dg=3200;var Vh=0,Ng=1,br="",li="srgb",vo="srgb-linear",yo="linear",gt="srgb";var xc=7680;var Ug=519,Og=512,Fg=513,Bg=514,ld=515,zg=516,kg=517,cd=518,hd=519,Gg=35044;var ud="300 es",Mi=2e3,ga=2001;function Wx(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Xx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function So(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Vg(){let r=So("canvas");return r.style.display="block",r}var Nm={},_a=null;function fd(...r){let e="THREE."+r.shift();_a?_a("log",e,...r):console.log(e,...r)}function Hg(r){let e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function Be(...r){r=Hg(r);let e="THREE."+r.shift();if(_a)_a("warn",e,...r);else{let t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function ze(...r){r=Hg(r);let e="THREE."+r.shift();if(_a)_a("error",e,...r);else{let t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function _o(...r){let e=r.join(" ");e in Nm||(Nm[e]=!0,Be(...r))}function Wg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}var Xg={[yc]:yc,[Mc]:wc,[bc]:bc,[ma]:Tc,[Sc]:Sc,[wc]:Mc,[Ec]:Ec,[Tc]:ma},Xi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}},wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var vc=Math.PI/180,Pc=180/Math.PI;function $o(){let r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wn[r&255]+wn[r>>8&255]+wn[r>>16&255]+wn[r>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[t&63|128]+wn[t>>8&255]+"-"+wn[t>>16&255]+wn[t>>24&255]+wn[n&255]+wn[n>>8&255]+wn[n>>16&255]+wn[n>>24&255]).toLowerCase()}function st(r,e,t){return Math.max(e,Math.min(t,r))}function qx(r,e){return(r%e+e)%e}function hf(r,e,t){return(1-t)*r+t*e}function qg(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function dd(r){switch(r.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Yx(r,e){if(e.constructor===Float32Array)return r;let t=dd(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(r/t,-1)}function $x(r,e){if(e.constructor===Float32Array)return r;let t=dd(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(r*t)}var xd=class xd{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};xd.prototype.isVector2=!0;var Ke=xd,qi=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],f=s[a+0],u=s[a+1],_=s[a+2],x=s[a+3];if(d!==x||l!==f||c!==u||h!==_){let p=l*f+c*u+h*_+d*x;p<0&&(f=-f,u=-u,_=-_,x=-x,p=-p);let g=1-o;if(p<.9995){let v=Math.acos(p),T=Math.sin(v);g=Math.sin(g*v)/T,o=Math.sin(o*v)/T,l=l*g+f*o,c=c*g+u*o,h=h*g+_*o,d=d*g+x*o}else{l=l*g+f*o,c=c*g+u*o,h=h*g+_*o,d=d*g+x*o;let v=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=v,c*=v,h*=v,d*=v}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=s[a],f=s[a+1],u=s[a+2],_=s[a+3];return e[t]=o*_+h*d+l*u-c*f,e[t+1]=l*_+h*f+c*d-o*u,e[t+2]=c*_+h*u+o*f-l*d,e[t+3]=h*_-o*d-l*f-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(s/2),f=l(n/2),u=l(i/2),_=l(s/2);switch(a){case"XYZ":this._x=f*h*d+c*u*_,this._y=c*u*d-f*h*_,this._z=c*h*_+f*u*d,this._w=c*h*d-f*u*_;break;case"YXZ":this._x=f*h*d+c*u*_,this._y=c*u*d-f*h*_,this._z=c*h*_-f*u*d,this._w=c*h*d+f*u*_;break;case"ZXY":this._x=f*h*d-c*u*_,this._y=c*u*d+f*h*_,this._z=c*h*_+f*u*d,this._w=c*h*d-f*u*_;break;case"ZYX":this._x=f*h*d-c*u*_,this._y=c*u*d+f*h*_,this._z=c*h*_-f*u*d,this._w=c*h*d+f*u*_;break;case"YZX":this._x=f*h*d+c*u*_,this._y=c*u*d+f*h*_,this._z=c*h*_-f*u*d,this._w=c*h*d-f*u*_;break;case"XZY":this._x=f*h*d-c*u*_,this._y=c*u*d-f*h*_,this._z=c*h*_+f*u*d,this._w=c*h*d+f*u*_;break;default:Be("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],f=n+o+d;if(f>0){let u=.5/Math.sqrt(f+1);this._w=.25/u,this._x=(h-l)*u,this._y=(s-c)*u,this._z=(a-i)*u}else if(n>o&&n>d){let u=2*Math.sqrt(1+n-o-d);this._w=(h-l)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(s+c)/u}else if(o>d){let u=2*Math.sqrt(1+o-n-d);this._w=(s-c)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(l+h)/u}else{let u=2*Math.sqrt(1+d-n-o);this._w=(a-i)/u,this._x=(s+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},vd=class vd{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Um.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Um.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-s*d,this.z=i+l*d+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uf.copy(this).projectOnVector(e),this.sub(uf)}reflect(e){return this.sub(uf.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};vd.prototype.isVector3=!0;var G=vd,uf=new G,Um=new qi,yd=class yd{constructor(e,t,n,i,s,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],f=n[2],u=n[5],_=n[8],x=i[0],p=i[3],g=i[6],v=i[1],T=i[4],y=i[7],w=i[2],E=i[5],m=i[8];return s[0]=a*x+o*v+l*w,s[3]=a*p+o*T+l*E,s[6]=a*g+o*y+l*m,s[1]=c*x+h*v+d*w,s[4]=c*p+h*T+d*E,s[7]=c*g+h*y+d*m,s[2]=f*x+u*v+_*w,s[5]=f*p+u*T+_*E,s[8]=f*g+u*y+_*m,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,f=o*l-h*s,u=c*s-a*l,_=t*d+n*f+i*u;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/_;return e[0]=d*x,e[1]=(i*c-h*n)*x,e[2]=(o*n-i*a)*x,e[3]=f*x,e[4]=(h*t-i*l)*x,e[5]=(i*s-o*t)*x,e[6]=u*x,e[7]=(n*l-c*t)*x,e[8]=(a*t-n*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return _o("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ff.makeScale(e,t)),this}rotate(e){return _o("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ff.makeRotation(-e)),this}translate(e,t){return _o("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ff.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};yd.prototype.isMatrix3=!0;var Ge=yd,ff=new Ge,Om=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fm=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zx(){let r={enabled:!0,workingColorSpace:vo,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===gt&&(i.r=_r(i.r),i.g=_r(i.g),i.b=_r(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(i.r=pa(i.r),i.g=pa(i.g),i.b=pa(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===br?yo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[vo]:{primaries:e,whitePoint:n,transfer:yo,toXYZ:Om,fromXYZ:Fm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:li},outputColorSpaceConfig:{drawingBufferColorSpace:li}},[li]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:Om,fromXYZ:Fm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:li}}}),r}var nt=Zx();function _r(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function pa(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}var ta,Ic=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ta===void 0&&(ta=So("canvas")),ta.width=e.width,ta.height=e.height;let i=ta.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ta}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=So("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=_r(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_r(t[n]/255)*255):t[n]=_r(t[n]);return{data:t,width:e.width,height:e.height}}else return Be("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Jx=0,xa=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Jx++}),this.uuid=$o(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(df(i[a].image)):s.push(df(i[a]))}else s=df(i);n.url=s}return t||(e.images[this.uuid]=n),n}};function df(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ic.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Be("Texture: Unable to serialize Texture."),{})}var Kx=0,pf=new G,Zn=class r extends Xi{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=Hi,i=Hi,s=kn,a=Sr,o=Ui,l=Jn,c=r.DEFAULT_ANISOTROPY,h=br){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=$o(),this.name="",this.source=new xa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(pf).x}get height(){return this.source.getSize(pf).y}get depth(){return this.source.getSize(pf).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Be(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Be(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ed)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ac:e.x=e.x-Math.floor(e.x);break;case Hi:e.x=e.x<0?0:1;break;case Cc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ac:e.y=e.y-Math.floor(e.y);break;case Hi:e.y=e.y<0?0:1;break;case Cc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Zn.DEFAULT_IMAGE=null;Zn.DEFAULT_MAPPING=ed;Zn.DEFAULT_ANISOTROPY=1;var Sd=class Sd{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],d=l[8],f=l[1],u=l[5],_=l[9],x=l[2],p=l[6],g=l[10];if(Math.abs(h-f)<.01&&Math.abs(d-x)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+x)<.1&&Math.abs(_+p)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let T=(c+1)/2,y=(u+1)/2,w=(g+1)/2,E=(h+f)/4,m=(d+x)/4,S=(_+p)/4;return T>y&&T>w?T<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(T),i=E/n,s=m/n):y>w?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=E/i,s=S/i):w<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(w),n=m/s,i=S/s),this.set(n,i,s,t),this}let v=Math.sqrt((p-_)*(p-_)+(d-x)*(d-x)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-_)/v,this.y=(d-x)/v,this.z=(f-h)/v,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Sd.prototype.isVector4=!0;var Lt=Sd,Lc=class extends Xi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t),this.textures=[];let i=n.count;for(let s=0;s<i;s++)this.textures[s]=new Zn({width:e,height:t,depth:n.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new xa(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},ci=class extends Lc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Mo=class extends Zn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Dc=class extends Zn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var nh=class nh{constructor(e,t,n,i,s,a,o,l,c,h,d,f,u,_,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,d,f,u,_,x,p)}set(e,t,n,i,s,a,o,l,c,h,d,f,u,_,x,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=f,g[3]=u,g[7]=_,g[11]=x,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nh().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/na.setFromMatrixColumn(e,0).length(),s=1/na.setFromMatrixColumn(e,1).length(),a=1/na.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){let f=a*h,u=a*d,_=o*h,x=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=u+_*c,t[5]=f-x*c,t[9]=-o*l,t[2]=x-f*c,t[6]=_+u*c,t[10]=a*l}else if(e.order==="YXZ"){let f=l*h,u=l*d,_=c*h,x=c*d;t[0]=f+x*o,t[4]=_*o-u,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=u*o-_,t[6]=x+f*o,t[10]=a*l}else if(e.order==="ZXY"){let f=l*h,u=l*d,_=c*h,x=c*d;t[0]=f-x*o,t[4]=-a*d,t[8]=_+u*o,t[1]=u+_*o,t[5]=a*h,t[9]=x-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let f=a*h,u=a*d,_=o*h,x=o*d;t[0]=l*h,t[4]=_*c-u,t[8]=f*c+x,t[1]=l*d,t[5]=x*c+f,t[9]=u*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let f=a*l,u=a*c,_=o*l,x=o*c;t[0]=l*h,t[4]=x-f*d,t[8]=_*d+u,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=u*d+_,t[10]=f-x*d}else if(e.order==="XZY"){let f=a*l,u=a*c,_=o*l,x=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=f*d+x,t[5]=a*h,t[9]=u*d-_,t[2]=_*d-u,t[6]=o*h,t[10]=x*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qx,e,jx)}lookAt(e,t,n){let i=this.elements;return ai.subVectors(e,t),ai.lengthSq()===0&&(ai.z=1),ai.normalize(),zr.crossVectors(n,ai),zr.lengthSq()===0&&(Math.abs(n.z)===1?ai.x+=1e-4:ai.z+=1e-4,ai.normalize(),zr.crossVectors(n,ai)),zr.normalize(),Wl.crossVectors(ai,zr),i[0]=zr.x,i[4]=Wl.x,i[8]=ai.x,i[1]=zr.y,i[5]=Wl.y,i[9]=ai.y,i[2]=zr.z,i[6]=Wl.z,i[10]=ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],f=n[9],u=n[13],_=n[2],x=n[6],p=n[10],g=n[14],v=n[3],T=n[7],y=n[11],w=n[15],E=i[0],m=i[4],S=i[8],R=i[12],A=i[1],D=i[5],N=i[9],X=i[13],I=i[2],B=i[6],V=i[10],F=i[14],j=i[3],W=i[7],P=i[11],ne=i[15];return s[0]=a*E+o*A+l*I+c*j,s[4]=a*m+o*D+l*B+c*W,s[8]=a*S+o*N+l*V+c*P,s[12]=a*R+o*X+l*F+c*ne,s[1]=h*E+d*A+f*I+u*j,s[5]=h*m+d*D+f*B+u*W,s[9]=h*S+d*N+f*V+u*P,s[13]=h*R+d*X+f*F+u*ne,s[2]=_*E+x*A+p*I+g*j,s[6]=_*m+x*D+p*B+g*W,s[10]=_*S+x*N+p*V+g*P,s[14]=_*R+x*X+p*F+g*ne,s[3]=v*E+T*A+y*I+w*j,s[7]=v*m+T*D+y*B+w*W,s[11]=v*S+T*N+y*V+w*P,s[15]=v*R+T*X+y*F+w*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],f=e[10],u=e[14],_=e[3],x=e[7],p=e[11],g=e[15],v=l*u-c*f,T=o*u-c*d,y=o*f-l*d,w=a*u-c*h,E=a*f-l*h,m=a*d-o*h;return t*(x*v-p*T+g*y)-n*(_*v-p*w+g*E)+i*(_*T-x*w+g*m)-s*(_*y-x*E+p*m)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(s*h-o*l)+i*(s*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],f=e[10],u=e[11],_=e[12],x=e[13],p=e[14],g=e[15],v=t*o-n*a,T=t*l-i*a,y=t*c-s*a,w=n*l-i*o,E=n*c-s*o,m=i*c-s*l,S=h*x-d*_,R=h*p-f*_,A=h*g-u*_,D=d*p-f*x,N=d*g-u*x,X=f*g-u*p,I=v*X-T*N+y*D+w*A-E*R+m*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/I;return e[0]=(o*X-l*N+c*D)*B,e[1]=(i*N-n*X-s*D)*B,e[2]=(x*m-p*E+g*w)*B,e[3]=(f*E-d*m-u*w)*B,e[4]=(l*A-a*X-c*R)*B,e[5]=(t*X-i*A+s*R)*B,e[6]=(p*y-_*m-g*T)*B,e[7]=(h*m-f*y+u*T)*B,e[8]=(a*N-o*A+c*S)*B,e[9]=(n*A-t*N-s*S)*B,e[10]=(_*E-x*y+g*v)*B,e[11]=(d*y-h*E-u*v)*B,e[12]=(o*R-a*D-l*S)*B,e[13]=(t*D-n*R+i*S)*B,e[14]=(x*T-_*w-p*v)*B,e[15]=(h*w-d*T+f*v)*B,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,d=o+o,f=s*c,u=s*h,_=s*d,x=a*h,p=a*d,g=o*d,v=l*c,T=l*h,y=l*d,w=n.x,E=n.y,m=n.z;return i[0]=(1-(x+g))*w,i[1]=(u+y)*w,i[2]=(_-T)*w,i[3]=0,i[4]=(u-y)*E,i[5]=(1-(f+g))*E,i[6]=(p+v)*E,i[7]=0,i[8]=(_+T)*m,i[9]=(p-v)*m,i[10]=(1-(f+x))*m,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=na.set(i[0],i[1],i[2]).length(),o=na.set(i[4],i[5],i[6]).length(),l=na.set(i[8],i[9],i[10]).length();s<0&&(a=-a),Ai.copy(this);let c=1/a,h=1/o,d=1/l;return Ai.elements[0]*=c,Ai.elements[1]*=c,Ai.elements[2]*=c,Ai.elements[4]*=h,Ai.elements[5]*=h,Ai.elements[6]*=h,Ai.elements[8]*=d,Ai.elements[9]*=d,Ai.elements[10]*=d,t.setFromRotationMatrix(Ai),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,s,a,o=Mi,l=!1){let c=this.elements,h=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),u=(n+i)/(n-i),_,x;if(l)_=s/(a-s),x=a*s/(a-s);else if(o===Mi)_=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===ga)_=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Mi,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),u=-(n+i)/(n-i),_,x;if(l)_=1/(a-s),x=a/(a-s);else if(o===Mi)_=-2/(a-s),x=-(a+s)/(a-s);else if(o===ga)_=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=_,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};nh.prototype.isMatrix4=!0;var Et=nh,na=new G,Ai=new Et,Qx=new G(0,0,0),jx=new G(1,1,1),zr=new G,Wl=new G,ai=new G,Bm=new Et,zm=new qi,vr=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],f=i[6],u=i[10];switch(t){case"XYZ":this._y=Math.asin(st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(st(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-st(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,u),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(st(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,u),this._y=0);break;default:Be("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zm.setFromEuler(this),this.setFromQuaternion(zm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};vr.DEFAULT_ORDER="XYZ";var bo=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ev=0,km=new G,ia=new qi,ur=new Et,Xl=new G,uo=new G,tv=new G,nv=new qi,Gm=new G(1,0,0),Vm=new G(0,1,0),Hm=new G(0,0,1),Wm={type:"added"},iv={type:"removed"},ra={type:"childadded",child:null},mf={type:"childremoved",child:null},Gn=class r extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ev++}),this.uuid=$o(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new G,t=new vr,n=new qi,i=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Et},normalMatrix:{value:new Ge}}),this.matrix=new Et,this.matrixWorld=new Et,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ia.setFromAxisAngle(e,t),this.quaternion.multiply(ia),this}rotateOnWorldAxis(e,t){return ia.setFromAxisAngle(e,t),this.quaternion.premultiply(ia),this}rotateX(e){return this.rotateOnAxis(Gm,e)}rotateY(e){return this.rotateOnAxis(Vm,e)}rotateZ(e){return this.rotateOnAxis(Hm,e)}translateOnAxis(e,t){return km.copy(e).applyQuaternion(this.quaternion),this.position.add(km.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gm,e)}translateY(e){return this.translateOnAxis(Vm,e)}translateZ(e){return this.translateOnAxis(Hm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ur.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Xl.copy(e):Xl.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ur.lookAt(uo,Xl,this.up):ur.lookAt(Xl,uo,this.up),this.quaternion.setFromRotationMatrix(ur),i&&(ur.extractRotation(i.matrixWorld),ia.setFromRotationMatrix(ur),this.quaternion.premultiply(ia.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wm),ra.child=e,this.dispatchEvent(ra),ra.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(iv),mf.child=e,this.dispatchEvent(mf),mf.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ur.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ur.multiply(e.parent.matrixWorld)),e.applyMatrix4(ur),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wm),ra.child=e,this.dispatchEvent(ra),ra.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,e,tv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,nv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),f=a(e.skeletons),u=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),u.length>0&&(n.animations=u),_.length>0&&(n.nodes=_)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Gn.DEFAULT_UP=new G(0,1,0);Gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ii=class extends Gn{constructor(){super(),this.isGroup=!0,this.type="Group"}},rv={type:"move"},va=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,n),g=this._getHandJoint(c,x);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),u=.02,_=.005;c.inputState.pinching&&f>u+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=u-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rv)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ii;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Yg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kr={h:0,s:0,l:0},ql={h:0,s:0,l:0};function gf(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}var Ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=li){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=nt.workingColorSpace){if(e=qx(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=gf(a,s,e+1/3),this.g=gf(a,s,e),this.b=gf(a,s,e-1/3)}return nt.colorSpaceToWorking(this,i),this}setStyle(e,t=li){function n(s){s!==void 0&&parseFloat(s)<1&&Be("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Be("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Be("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=li){let n=Yg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Be("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_r(e.r),this.g=_r(e.g),this.b=_r(e.b),this}copyLinearToSRGB(e){return this.r=pa(e.r),this.g=pa(e.g),this.b=pa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=li){return nt.workingToColorSpace(En.copy(this),e),Math.round(st(En.r*255,0,255))*65536+Math.round(st(En.g*255,0,255))*256+Math.round(st(En.b*255,0,255))}getHexString(e=li){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.workingToColorSpace(En.copy(this),t);let n=En.r,i=En.g,s=En.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=nt.workingColorSpace){return nt.workingToColorSpace(En.copy(this),t),e.r=En.r,e.g=En.g,e.b=En.b,e}getStyle(e=li){nt.workingToColorSpace(En.copy(this),e);let t=En.r,n=En.g,i=En.b;return e!==li?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(kr),this.setHSL(kr.h+e,kr.s+t,kr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kr),e.getHSL(ql);let n=hf(kr.h,ql.h,t),i=hf(kr.s,ql.s,t),s=hf(kr.l,ql.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},En=new Ye;Ye.NAMES=Yg;var To=class extends Gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vr,this.environmentIntensity=1,this.environmentRotation=new vr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ci=new G,fr=new G,_f=new G,dr=new G,sa=new G,aa=new G,Xm=new G,xf=new G,vf=new G,yf=new G,Sf=new Lt,Mf=new Lt,bf=new Lt,gr=class r{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ci.subVectors(e,t),i.cross(Ci);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Ci.subVectors(i,t),fr.subVectors(n,t),_f.subVectors(e,t);let a=Ci.dot(Ci),o=Ci.dot(fr),l=Ci.dot(_f),c=fr.dot(fr),h=fr.dot(_f),d=a*c-o*o;if(d===0)return s.set(0,0,0),null;let f=1/d,u=(c*l-o*h)*f,_=(a*h-o*l)*f;return s.set(1-u-_,_,u)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,dr)===null?!1:dr.x>=0&&dr.y>=0&&dr.x+dr.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,dr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,dr.x),l.addScaledVector(a,dr.y),l.addScaledVector(o,dr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Sf.setScalar(0),Mf.setScalar(0),bf.setScalar(0),Sf.fromBufferAttribute(e,t),Mf.fromBufferAttribute(e,n),bf.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Sf,s.x),a.addScaledVector(Mf,s.y),a.addScaledVector(bf,s.z),a}static isFrontFacing(e,t,n,i){return Ci.subVectors(n,t),fr.subVectors(e,t),Ci.cross(fr).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ci.subVectors(this.c,this.b),fr.subVectors(this.a,this.b),Ci.cross(fr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;sa.subVectors(i,n),aa.subVectors(s,n),xf.subVectors(e,n);let l=sa.dot(xf),c=aa.dot(xf);if(l<=0&&c<=0)return t.copy(n);vf.subVectors(e,i);let h=sa.dot(vf),d=aa.dot(vf);if(h>=0&&d<=h)return t.copy(i);let f=l*d-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),t.copy(n).addScaledVector(sa,a);yf.subVectors(e,s);let u=sa.dot(yf),_=aa.dot(yf);if(_>=0&&u<=_)return t.copy(s);let x=u*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(aa,o);let p=h*_-u*d;if(p<=0&&d-h>=0&&u-_>=0)return Xm.subVectors(s,i),o=(d-h)/(d-h+(u-_)),t.copy(i).addScaledVector(Xm,o);let g=1/(p+x+f);return a=x*g,o=f*g,t.copy(n).addScaledVector(sa,a).addScaledVector(aa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Wr=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ri.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ri.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ri.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ri):Ri.fromBufferAttribute(s,a),Ri.applyMatrix4(e.matrixWorld),this.expandByPoint(Ri);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yl.copy(n.boundingBox)),Yl.applyMatrix4(e.matrixWorld),this.union(Yl)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ri),Ri.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fo),$l.subVectors(this.max,fo),oa.subVectors(e.a,fo),la.subVectors(e.b,fo),ca.subVectors(e.c,fo),Gr.subVectors(la,oa),Vr.subVectors(ca,la),Ss.subVectors(oa,ca);let t=[0,-Gr.z,Gr.y,0,-Vr.z,Vr.y,0,-Ss.z,Ss.y,Gr.z,0,-Gr.x,Vr.z,0,-Vr.x,Ss.z,0,-Ss.x,-Gr.y,Gr.x,0,-Vr.y,Vr.x,0,-Ss.y,Ss.x,0];return!Tf(t,oa,la,ca,$l)||(t=[1,0,0,0,1,0,0,0,1],!Tf(t,oa,la,ca,$l))?!1:(Zl.crossVectors(Gr,Vr),t=[Zl.x,Zl.y,Zl.z],Tf(t,oa,la,ca,$l))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ri).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ri).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},pr=[new G,new G,new G,new G,new G,new G,new G,new G],Ri=new G,Yl=new Wr,oa=new G,la=new G,ca=new G,Gr=new G,Vr=new G,Ss=new G,fo=new G,$l=new G,Zl=new G,Ms=new G;function Tf(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Ms.fromArray(r,s);let o=i.x*Math.abs(Ms.x)+i.y*Math.abs(Ms.y)+i.z*Math.abs(Ms.z),l=e.dot(Ms),c=t.dot(Ms),h=n.dot(Ms);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Kt=new G,Jl=new Ke,sv=0,Wi=class extends Xi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Gg,this.updateRanges=[],this.gpuType=Di,this.version=0,this._normalizationScale=e!==void 0?dd(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Jl.fromBufferAttribute(this,t),Jl.applyMatrix3(e),this.setXY(t,Jl.x,Jl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Yx(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):$x(e,this.array)}};var wo=class extends Wi{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Eo=class extends Wi{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var It=class extends Wi{constructor(e,t,n){super(new Float32Array(e),t,n)}},av=new Wr,po=new G,wf=new G,Xr=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):av.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;po.subVectors(e,this.center);let t=po.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(po,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(po.copy(e.center).add(wf)),this.expandByPoint(po.copy(e.center).sub(wf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ov=0,Si=new Et,Ef=new Gn,ha=new G,oi=new Wr,mo=new Wr,cn=new G,Cn=class r extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ov++}),this.uuid=$o(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wx(e)?Eo:wo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Ge().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Si.makeRotationFromQuaternion(e),this.applyMatrix4(Si),this}rotateX(e){return Si.makeRotationX(e),this.applyMatrix4(Si),this}rotateY(e){return Si.makeRotationY(e),this.applyMatrix4(Si),this}rotateZ(e){return Si.makeRotationZ(e),this.applyMatrix4(Si),this}translate(e,t,n){return Si.makeTranslation(e,t,n),this.applyMatrix4(Si),this}scale(e,t,n){return Si.makeScale(e,t,n),this.applyMatrix4(Si),this}lookAt(e){return Ef.lookAt(e),Ef.updateMatrix(),this.applyMatrix4(Ef.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ha).negate(),this.translate(ha.x,ha.y,ha.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new It(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&Be("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];oi.setFromBufferAttribute(s),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,oi.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,oi.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(oi.min),this.boundingBox.expandByPoint(oi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(oi.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];mo.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(oi.min,mo.min),oi.expandByPoint(cn),cn.addVectors(oi.max,mo.max),oi.expandByPoint(cn)):(oi.expandByPoint(mo.min),oi.expandByPoint(mo.max))}oi.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)cn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(cn));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)cn.fromBufferAttribute(o,c),l&&(ha.fromBufferAttribute(e,c),cn.add(ha)),i=Math.max(i,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,s=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Wi(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(n.count);for(let R=0;R<n.count;R++)o[R]=new G,l[R]=new G;let h=new G,d=new G,f=new G,u=new Ke,_=new Ke,x=new Ke,p=new G,g=new G;function v(R,A,D){c[R]=c[A]=c[D]=1,h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,A),f.fromBufferAttribute(n,D),u.fromBufferAttribute(s,R),_.fromBufferAttribute(s,A),x.fromBufferAttribute(s,D),d.sub(h),f.sub(h),_.sub(u),x.sub(u);let N=1/(_.x*x.y-x.x*_.y);isFinite(N)&&(p.copy(d).multiplyScalar(x.y).addScaledVector(f,-_.y).multiplyScalar(N),g.copy(f).multiplyScalar(_.x).addScaledVector(d,-x.x).multiplyScalar(N),o[R].add(p),o[A].add(p),o[D].add(p),l[R].add(g),l[A].add(g),l[D].add(g))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let R=0,A=T.length;R<A;++R){let D=T[R],N=D.start,X=D.count;for(let I=N,B=N+X;I<B;I+=3)v(e.getX(I+0),e.getX(I+1),e.getX(I+2))}let y=new G,w=new G,E=new G,m=new G;function S(R){E.fromBufferAttribute(i,R),m.copy(E);let A=o[R];y.copy(A),y.sub(E.multiplyScalar(E.dot(A))).normalize(),w.crossVectors(m,A);let N=w.dot(l[R])<0?-1:1;a.setXYZW(R,y.x,y.y,y.z,N)}for(let R=0,A=n.count;R<A;++R)c[R]&&S(R);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Wi(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,u=n.count;f<u;f++)n.setXYZ(f,0,0,0);let i=new G,s=new G,a=new G,o=new G,l=new G,c=new G,h=new G,d=new G;if(e)for(let f=0,u=e.count;f<u;f+=3){let _=e.getX(f+0),x=e.getX(f+1),p=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,u=t.count;f<u;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,f=new c.constructor(l.length*h),u=0,_=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?u=l[x]*o.data.stride+o.offset:u=l[x]*h;for(let g=0;g<h;g++)f[_++]=c[u++]}return new Wi(f,h,d)}if(this.index===null)return Be("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,d=c.length;h<d;h++){let f=c[h],u=e(f,n);l.push(u)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,f=c.length;d<f;d++){let u=c[d];h.push(u.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],d=s[c];for(let f=0,u=d.length;f<u;f++)h.push(d[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Af=new G,lv=new G,cv=new Ge,Pi=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Af.subVectors(n,t).cross(lv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Af),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||cv.getNormalMatrix(e),i=this.coplanarPoint(Af).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},hv=0,Yi=class extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:hv++}),this.uuid=$o(),this.name="",this.type="Material",this.blending=Aa,this.side=Qr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wf,this.blendDst=Xf,this.blendEquation=As,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=ma,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ug,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xc,this.stencilZFail=xc,this.stencilZPass=xc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Be(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Be(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ye().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Pi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ke().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ke().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var mr=new G,Cf=new G,Kl=new G,Ql=new G,ya=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=mr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mr.copy(this.origin).addScaledVector(this.direction,t),mr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Cf.copy(e).add(t).multiplyScalar(.5),Kl.copy(t).sub(e).normalize(),Ql.copy(this.origin).sub(Cf);let s=e.distanceTo(t)*.5,a=-this.direction.dot(Kl),o=Ql.dot(this.direction),l=-Ql.dot(Kl),c=Ql.lengthSq(),h=Math.abs(1-a*a),d,f,u,_;if(h>0)if(d=a*l-o,f=a*o-l,_=s*h,d>=0)if(f>=-_)if(f<=_){let x=1/h;d*=x,f*=x,u=d*(d+a*f+2*o)+f*(a*d+f+2*l)+c}else f=s,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-l),s),u=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),u=f*(f+2*l)+c):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-l),s),u=-d*d+f*(f+2*l)+c);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),u=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Cf).addScaledVector(Kl,f),u}intersectSphere(e,t){if(e.radius<0)return null;mr.subVectors(e.center,this.origin);let n=mr.dot(this.direction),i=mr.dot(mr)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),h>=0?(s=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,mr)!==null}intersectTriangle(e,t,n,i,s){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,f=e.y-a.y,u=e.z-a.z,_=t.x-a.x,x=t.y-a.y,p=t.z-a.z,g=n.x-a.x,v=n.y-a.y,T=n.z-a.z,y=Math.abs(l),w=Math.abs(c),E=Math.abs(h),m,S,R,A,D,N,X,I,B,V,F,j;if(y>=w&&y>=E?(R=l,N=d,B=_,j=g,l>=0?(m=c,S=h,A=f,D=u,X=x,I=p,V=v,F=T):(m=h,S=c,A=u,D=f,X=p,I=x,V=T,F=v)):w>=E?(R=c,N=f,B=x,j=v,c>=0?(m=h,S=l,A=u,D=d,X=p,I=_,V=T,F=g):(m=l,S=h,A=d,D=u,X=_,I=p,V=g,F=T)):(R=h,N=u,B=p,j=T,h>=0?(m=l,S=c,A=d,D=f,X=_,I=x,V=g,F=v):(m=c,S=l,A=f,D=d,X=x,I=_,V=v,F=g)),R===0)return null;let W=m/R,P=S/R,ne=1/R,Se=A-W*N,Oe=D-P*N,Z=X-W*B,he=I-P*B,ye=V-W*j,be=F-P*j,me=ye*he-be*Z,De=Se*be-Oe*ye,_t=Z*Oe-he*Se;if(i){if(me<0||De<0||_t<0)return null}else if((me<0||De<0||_t<0)&&(me>0||De>0||_t>0))return null;let Ee=me+De+_t;if(Ee===0)return null;let Ve=ne*(me*N+De*B+_t*j);return(Ee>0?Ve<0:Ve>0)?null:this.at(Ve/Ee,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Sa=class extends Yi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vr,this.combine=qf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},qm=new Et,bs=new ya,jl=new Xr,Ym=new G,ec=new G,tc=new G,nc=new G,Rf=new G,ic=new G,$m=new G,rc=new G,hi=class extends Gn{constructor(e=new Cn,t=new Sa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){ic.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],d=s[l];h!==0&&(Rf.fromBufferAttribute(d,e),a?ic.addScaledVector(Rf,h):ic.addScaledVector(Rf.sub(t),h))}t.add(ic)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jl.copy(n.boundingSphere),jl.applyMatrix4(s),bs.copy(e.ray).recast(e.near),!(jl.containsPoint(bs.origin)===!1&&(bs.intersectSphere(jl,Ym)===null||bs.origin.distanceToSquared(Ym)>(e.far-e.near)**2))&&(qm.copy(s).invert(),bs.copy(e.ray).applyMatrix4(qm),!(n.boundingBox!==null&&bs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,bs)))}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,f=s.groups,u=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,x=f.length;_<x;_++){let p=f[_],g=a[p.materialIndex],v=Math.max(p.start,u.start),T=Math.min(o.count,Math.min(p.start+p.count,u.start+u.count));for(let y=v,w=T;y<w;y+=3){let E=o.getX(y),m=o.getX(y+1),S=o.getX(y+2);i=sc(this,g,e,n,c,h,d,E,m,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let _=Math.max(0,u.start),x=Math.min(o.count,u.start+u.count);for(let p=_,g=x;p<g;p+=3){let v=o.getX(p),T=o.getX(p+1),y=o.getX(p+2);i=sc(this,a,e,n,c,h,d,v,T,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,x=f.length;_<x;_++){let p=f[_],g=a[p.materialIndex],v=Math.max(p.start,u.start),T=Math.min(l.count,Math.min(p.start+p.count,u.start+u.count));for(let y=v,w=T;y<w;y+=3){let E=y,m=y+1,S=y+2;i=sc(this,g,e,n,c,h,d,E,m,S),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{let _=Math.max(0,u.start),x=Math.min(l.count,u.start+u.count);for(let p=_,g=x;p<g;p+=3){let v=p,T=p+1,y=p+2;i=sc(this,a,e,n,c,h,d,v,T,y),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}};function uv(r,e,t,n,i,s,a,o){let l;if(e.side===Vn?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===Qr,o),l===null)return null;rc.copy(o),rc.applyMatrix4(r.matrixWorld);let c=t.ray.origin.distanceTo(rc);return c<t.near||c>t.far?null:{distance:c,point:rc.clone(),object:r}}function sc(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,ec),r.getVertexPosition(l,tc),r.getVertexPosition(c,nc);let h=uv(r,e,t,n,ec,tc,nc,$m);if(h){let d=new G;gr.getBarycoord($m,ec,tc,nc,d),i&&(h.uv=gr.getInterpolatedAttribute(i,o,l,c,d,new Ke)),s&&(h.uv1=gr.getInterpolatedAttribute(s,o,l,c,d,new Ke)),a&&(h.normal=gr.getInterpolatedAttribute(a,o,l,c,d,new G),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a:o,b:l,c,normal:new G,materialIndex:0};gr.getNormal(ec,tc,nc,f.normal),h.face=f,h.barycoord=d}return h}var Nc=class extends Zn{constructor(e=null,t=1,n=1,i,s,a,o,l,c=hn,h=hn,d,f){super(null,a,o,l,c,h,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ts=new Xr,fv=new Ke(.5,.5),ac=new G,qr=class{constructor(e=new Pi,t=new Pi,n=new Pi,i=new Pi,s=new Pi,a=new Pi){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mi,n=!1){let i=this.planes,s=e.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],d=s[5],f=s[6],u=s[7],_=s[8],x=s[9],p=s[10],g=s[11],v=s[12],T=s[13],y=s[14],w=s[15];if(i[0].setComponents(c-a,u-h,g-_,w-v).normalize(),i[1].setComponents(c+a,u+h,g+_,w+v).normalize(),i[2].setComponents(c+o,u+d,g+x,w+T).normalize(),i[3].setComponents(c-o,u-d,g-x,w-T).normalize(),n)i[4].setComponents(l,f,p,y).normalize(),i[5].setComponents(c-l,u-f,g-p,w-y).normalize();else if(i[4].setComponents(c-l,u-f,g-p,w-y).normalize(),t===Mi)i[5].setComponents(c+l,u+f,g+p,w+y).normalize();else if(t===ga)i[5].setComponents(l,f,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ts.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ts.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ts)}intersectsSprite(e){Ts.center.set(0,0,0);let t=fv.distanceTo(e.center);return Ts.radius=.7071067811865476+t,Ts.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ts)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(ac.x=i.normal.x>0?e.max.x:e.min.x,ac.y=i.normal.y>0?e.max.y:e.min.y,ac.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ac)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Zm=new Et,Uc=class r{constructor(){this.coordinateSystem=Mi,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let s=t[i];Zm.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),n[i]===void 0&&(n[i]=new qr),n[i].setFromProjectionMatrix(Zm,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new qr),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new r().copy(this)}};var Yr=class extends Yi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Oc=new G,Fc=new G,Jm=new Et,go=new ya,oc=new Xr,Pf=new G,Km=new G,Bc=class extends Gn{constructor(e=new Cn,t=new Yr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Oc.fromBufferAttribute(t,i-1),Fc.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Oc.distanceTo(Fc);e.setAttribute("lineDistance",new It(n,1))}else Be("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oc.copy(n.boundingSphere),oc.applyMatrix4(i),oc.radius+=s,e.ray.intersectsSphere(oc)===!1)return;Jm.copy(i).invert(),go.copy(e.ray).applyMatrix4(Jm);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let u=Math.max(0,a.start),_=Math.min(h.count,a.start+a.count);for(let x=u,p=_-1;x<p;x+=c){let g=h.getX(x),v=h.getX(x+1),T=lc(this,e,go,l,g,v,x);T&&t.push(T)}if(this.isLineLoop){let x=h.getX(_-1),p=h.getX(u),g=lc(this,e,go,l,x,p,_-1);g&&t.push(g)}}else{let u=Math.max(0,a.start),_=Math.min(f.count,a.start+a.count);for(let x=u,p=_-1;x<p;x+=c){let g=lc(this,e,go,l,x,x+1,x);g&&t.push(g)}if(this.isLineLoop){let x=lc(this,e,go,l,_-1,u,_-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function lc(r,e,t,n,i,s,a){let o=r.geometry.attributes.position;if(Oc.fromBufferAttribute(o,i),Fc.fromBufferAttribute(o,s),t.distanceSqToSegment(Oc,Fc,Pf,Km)>n)return;Pf.applyMatrix4(r.matrixWorld);let c=e.ray.origin.distanceTo(Pf);if(!(c<e.near||c>e.far))return{distance:c,point:Km.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}var Qm=new G,jm=new G,ws=class extends Bc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Qm.fromBufferAttribute(t,i),jm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Qm.distanceTo(jm);e.setAttribute("lineDistance",new It(n,1))}else Be("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ma=class extends Yi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},eg=new Et,Ff=new ya,cc=new Xr,hc=new G,Ao=class extends Gn{constructor(e=new Cn,t=new Ma){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),cc.copy(n.boundingSphere),cc.applyMatrix4(i),cc.radius+=s,e.ray.intersectsSphere(cc)===!1)return;eg.copy(i).invert(),Ff.copy(e.ray).applyMatrix4(eg);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let f=Math.max(0,a.start),u=Math.min(c.count,a.start+a.count);for(let _=f,x=u;_<x;_++){let p=c.getX(_);hc.fromBufferAttribute(d,p),tg(hc,p,l,i,e,t,this)}}else{let f=Math.max(0,a.start),u=Math.min(d.count,a.start+a.count);for(let _=f,x=u;_<x;_++)hc.fromBufferAttribute(d,_),tg(hc,_,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){let o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}};function tg(r,e,t,n,i,s,a){let o=Ff.distanceSqToPoint(r);if(o<t){let l=new G;Ff.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Co=class extends Zn{constructor(e=[],t=Cs,n,i,s,a,o,l,c,h){super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var yr=class extends Zn{constructor(e,t,n=Li,i,s,a,o=hn,l=hn,c,h=xr,d=1){if(h!==xr&&h!==Mr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:d};super(f,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new xa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Ro=class extends yr{constructor(e,t=Li,n=Cs,i,s,a=hn,o=hn,l,c=xr){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,s,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Po=class extends Zn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},$r=class r extends Cn{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],d=[],f=0,u=0;_("z","y","x",-1,-1,n,t,e,a,s,0),_("z","y","x",1,-1,n,t,-e,a,s,1),_("x","z","y",1,1,e,n,t,i,a,2),_("x","z","y",1,-1,e,n,-t,i,a,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new It(c,3)),this.setAttribute("normal",new It(h,3)),this.setAttribute("uv",new It(d,2));function _(x,p,g,v,T,y,w,E,m,S,R){let A=y/m,D=w/S,N=y/2,X=w/2,I=E/2,B=m+1,V=S+1,F=0,j=0,W=new G;for(let P=0;P<V;P++){let ne=P*D-X;for(let Se=0;Se<B;Se++){let Oe=Se*A-N;W[x]=Oe*v,W[p]=ne*T,W[g]=I,c.push(W.x,W.y,W.z),W[x]=0,W[p]=0,W[g]=E>0?1:-1,h.push(W.x,W.y,W.z),d.push(Se/m),d.push(1-P/S),F+=1}}for(let P=0;P<S;P++)for(let ne=0;ne<m;ne++){let Se=f+ne+B*P,Oe=f+ne+B*(P+1),Z=f+(ne+1)+B*(P+1),he=f+(ne+1)+B*P;l.push(Se,Oe,he),l.push(Oe,Z,he),j+=6}o.addGroup(u,j,R),u+=j,f+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var zc=class r extends Cn{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new It(s,3)),this.setAttribute("normal",new It(s.slice(),3)),this.setAttribute("uv",new It(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let T=new G,y=new G,w=new G;for(let E=0;E<t.length;E+=3)u(t[E+0],T),u(t[E+1],y),u(t[E+2],w),l(T,y,w,v)}function l(v,T,y,w){let E=w+1,m=[];for(let S=0;S<=E;S++){m[S]=[];let R=v.clone().lerp(y,S/E),A=T.clone().lerp(y,S/E),D=E-S;for(let N=0;N<=D;N++)N===0&&S===E?m[S][N]=R:m[S][N]=R.clone().lerp(A,N/D)}for(let S=0;S<E;S++)for(let R=0;R<2*(E-S)-1;R++){let A=Math.floor(R/2);R%2===0?(f(m[S][A+1]),f(m[S+1][A]),f(m[S][A])):(f(m[S][A+1]),f(m[S+1][A+1]),f(m[S+1][A]))}}function c(v){let T=new G;for(let y=0;y<s.length;y+=3)T.x=s[y+0],T.y=s[y+1],T.z=s[y+2],T.normalize().multiplyScalar(v),s[y+0]=T.x,s[y+1]=T.y,s[y+2]=T.z}function h(){let v=new G;for(let T=0;T<s.length;T+=3){v.x=s[T+0],v.y=s[T+1],v.z=s[T+2];let y=p(v)/2/Math.PI+.5,w=g(v)/Math.PI+.5;a.push(y,1-w)}_(),d()}function d(){for(let v=0;v<a.length;v+=6){let T=a[v+0],y=a[v+2],w=a[v+4],E=Math.max(T,y,w),m=Math.min(T,y,w);E>.9&&m<.1&&(T<.2&&(a[v+0]+=1),y<.2&&(a[v+2]+=1),w<.2&&(a[v+4]+=1))}}function f(v){s.push(v.x,v.y,v.z)}function u(v,T){let y=v*3;T.x=e[y+0],T.y=e[y+1],T.z=e[y+2]}function _(){let v=new G,T=new G,y=new G,w=new G,E=new Ke,m=new Ke,S=new Ke;for(let R=0,A=0;R<s.length;R+=9,A+=6){v.set(s[R+0],s[R+1],s[R+2]),T.set(s[R+3],s[R+4],s[R+5]),y.set(s[R+6],s[R+7],s[R+8]),E.set(a[A+0],a[A+1]),m.set(a[A+2],a[A+3]),S.set(a[A+4],a[A+5]),w.copy(v).add(T).add(y).divideScalar(3);let D=p(w);x(E,A+0,v,D),x(m,A+2,T,D),x(S,A+4,y,D)}}function x(v,T,y,w){w<0&&v.x===1&&(a[T]=v.x-1),y.x===0&&y.z===0&&(a[T]=w/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.detail)}};var uc=new G,fc=new G,If=new G,dc=new gr,ba=class extends Cn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(vc*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),f=new Map,u=[];for(let _=0;_<l;_+=3){a?(c[0]=a.getX(_),c[1]=a.getX(_+1),c[2]=a.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);let{a:x,b:p,c:g}=dc;if(x.fromBufferAttribute(o,c[0]),p.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),dc.getNormal(If),d[0]=`${Math.round(x.x*i)},${Math.round(x.y*i)},${Math.round(x.z*i)}`,d[1]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,d[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){let T=(v+1)%3,y=d[v],w=d[T],E=dc[h[v]],m=dc[h[T]],S=`${y}_${w}`,R=`${w}_${y}`,A=f.get(R);A?(If.dot(A.normal)<=s&&(u.push(E.x,E.y,E.z),u.push(m.x,m.y,m.z)),f.set(R,null)):f.has(S)||f.set(S,{index0:c[v],index1:c[T],normal:If.clone()})}}for(let _ of f.values())if(_){let{index0:x,index1:p}=_;uc.fromBufferAttribute(o,x),fc.fromBufferAttribute(o,p),u.push(uc.x,uc.y,uc.z),u.push(fc.x,fc.y,fc.z)}this.setAttribute("position",new It(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var Ta=class r extends zc{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}};var Io=class r extends Cn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,f=t/l,u=[],_=[],x=[],p=[];for(let g=0;g<h;g++){let v=g*f-a;for(let T=0;T<c;T++){let y=T*d-s;_.push(y,-v,0),x.push(0,0,1),p.push(T/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){let T=v+c*g,y=v+c*(g+1),w=v+1+c*(g+1),E=v+1+c*g;u.push(T,y,E),u.push(y,w,E)}this.setIndex(u),this.setAttribute("position",new It(_,3)),this.setAttribute("normal",new It(x,3)),this.setAttribute("uv",new It(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}};var Lo=class r extends Cn{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new G,f=new G,u=[],_=[],x=[],p=[];for(let g=0;g<=n;g++){let v=[],T=g/n,y=a+T*o,w=e*Math.cos(y),E=Math.sqrt(e*e-w*w),m=0;g===0&&a===0?m=.5/t:g===n&&l===Math.PI&&(m=-.5/t);for(let S=0;S<=t;S++){let R=S/t,A=i+R*s;d.x=-E*Math.cos(A),d.y=w,d.z=E*Math.sin(A),_.push(d.x,d.y,d.z),f.copy(d).normalize(),x.push(f.x,f.y,f.z),p.push(R+m,1-T),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<t;v++){let T=h[g][v+1],y=h[g][v],w=h[g+1][v],E=h[g+1][v+1];(g!==0||a>0)&&u.push(T,y,E),(g!==n-1||l<Math.PI)&&u.push(y,w,E)}this.setIndex(u),this.setAttribute("position",new It(_,3)),this.setAttribute("normal",new It(x,3)),this.setAttribute("uv",new It(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Ps(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];if(ng(i))i.isRenderTargetTexture?(Be("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(ng(i[0])){let s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Rn(r){let e={};for(let t=0;t<r.length;t++){let n=Ps(r[t]);for(let i in n)e[i]=n[i]}return e}function ng(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function dv(r){let e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function pd(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}var $g={clone:Ps,merge:Rn},pv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$i=class extends Yi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pv,this.fragmentShader=mv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ps(e.uniforms),this.uniformsGroups=dv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Ye().setHex(i.value);break;case"v2":this.uniforms[n].value=new Ke().fromArray(i.value);break;case"v3":this.uniforms[n].value=new G().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Lt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Ge().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Et().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},kc=class extends $i{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Do=class extends Yi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vh,this.normalScale=new Ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var Gc=class extends Yi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Vc=class extends Yi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ua(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function pc(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}var Zr=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Hc=class extends Zr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Nf,endingEnd:Nf}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Uf:s=e,o=2*t-n;break;case Of:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Uf:a=e,l=2*n-t;break;case Of:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,u=this._weightNext,_=(n-t)/(i-t),x=_*_,p=x*_,g=-f*p+2*f*x-f*_,v=(1+f)*p+(-1.5-2*f)*x+(-.5+f)*_+1,T=(-1-u)*p+(1.5+u)*x+.5*_,y=u*p-u*x;for(let w=0;w!==o;++w)s[w]=g*a[h+w]+v*a[c+w]+T*a[l+w]+y*a[d+w];return s}},Wc=class extends Zr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),d=1-h;for(let f=0;f!==o;++f)s[f]=a[c+f]*d+a[l+f]*h;return s}},Xc=class extends Zr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},qc=class extends Zr{interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let _=(n-t)/(i-t),x=1-_;for(let p=0;p!==o;++p)s[p]=a[c+p]*x+a[l+p]*_;return s}let f=o*2,u=e-1;for(let _=0;_!==o;++_){let x=a[c+_],p=a[l+_],g=u*f+_*2,v=d[g],T=d[g+1],y=e*f+_*2,w=h[y],E=h[y+1],m=_v(n,t,v,w,i);s[_]=Zg(m,x,T,E,p)}return s}};function Zg(r,e,t,n,i){let s=1-r;return s*s*s*e+3*s*s*r*t+3*s*r*r*n+r*r*r*i}function gv(r,e,t,n,i){let s=1-r;return 3*s*s*(t-e)+6*s*r*(n-t)+3*r*r*(i-n)}function _v(r,e,t,n,i){let s=(r-e)/(i-e);for(let a=0;a<8;a++){let o=Zg(s,e,t,n,i)-r;if(Math.abs(o)<1e-10)break;let l=gv(s,e,t,n,i);if(Math.abs(l)<1e-10)break;s=Math.max(0,Math.min(1,s-o/l))}return s}var ui=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ua(t,this.TimeBufferType),this.values=ua(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ua(e.times,Array),values:ua(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),pc(e.settings)&&(n.settings={inTangents:ua(e.settings.inTangents,Array),outTangents:ua(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Xc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Wc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Hc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new qc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case xo:t=this.InterpolantFactoryMethodDiscrete;break;case Rc:t=this.InterpolantFactoryMethodLinear;break;case _c:t=this.InterpolantFactoryMethodSmooth;break;case Df:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Be("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xo;case this.InterpolantFactoryMethodLinear:return Rc;case this.InterpolantFactoryMethodSmooth:return _c;case this.InterpolantFactoryMethodBezier:return Df}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e;pc(this.settings)&&(ig(this.settings.inTangents,e),ig(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;pc(this.settings)&&(rg(this.settings.inTangents,e),rg(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(ze("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){ze("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){ze("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&Xx(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){ze("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===_c,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let d=o*n,f=d-n,u=d+n;for(let _=0;_!==n;++_){let x=t[d+_];if(x!==t[f+_]||x!==t[u+_]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,f=a*n;for(let u=0;u!==n;++u)t[f+u]=t[d+u]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,pc(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function ig(r,e){for(let t=0,n=r.length;t!==n;t+=2)r[t]+=e}function rg(r,e){for(let t=0,n=r.length;t!==n;t+=2)r[t]*=e}ui.prototype.ValueTypeName="";ui.prototype.TimeBufferType=Float32Array;ui.prototype.ValueBufferType=Float32Array;ui.prototype.DefaultInterpolation=Rc;var Jr=class extends ui{constructor(e,t,n){super(e,t,n)}};Jr.prototype.ValueTypeName="bool";Jr.prototype.ValueBufferType=Array;Jr.prototype.DefaultInterpolation=xo;Jr.prototype.InterpolantFactoryMethodLinear=void 0;Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var Yc=class extends ui{constructor(e,t,n,i){super(e,t,n,i)}};Yc.prototype.ValueTypeName="color";var $c=class extends ui{constructor(e,t,n,i){super(e,t,n,i)}};$c.prototype.ValueTypeName="number";var Zc=class extends Zr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)qi.slerpFlat(s,0,a,c-o,a,c,l);return s}},No=class extends ui{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Zc(this.times,this.values,this.getValueSize(),e)}};No.prototype.ValueTypeName="quaternion";No.prototype.InterpolantFactoryMethodSmooth=void 0;var Kr=class extends ui{constructor(e,t,n){super(e,t,n)}};Kr.prototype.ValueTypeName="string";Kr.prototype.ValueBufferType=Array;Kr.prototype.DefaultInterpolation=xo;Kr.prototype.InterpolantFactoryMethodLinear=void 0;Kr.prototype.InterpolantFactoryMethodSmooth=void 0;var Jc=class extends ui{constructor(e,t,n,i){super(e,t,n,i)}};Jc.prototype.ValueTypeName="vector";var Kc=class{constructor(e,t,n){let i=this,s=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,f=c.length;d<f;d+=2){let u=c[d],_=c[d+1];if(u.global&&(u.lastIndex=0),u.test(h))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Jg=new Kc,Qc=class{constructor(e){this.manager=e!==void 0?e:Jg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Qc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Uo=class extends Gn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Lf=new Et,sg=new G,ag=new G,jc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.mapType=Jn,this.map=null,this.mapPass=null,this.matrix=new Et,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qr,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;sg.setFromMatrixPosition(e.matrixWorld),t.position.copy(sg),ag.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ag),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Lf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Lf,e.coordinateSystem,e.reversedDepth);let s=this._frameExtents,a=i?i.z/s.x:1,o=i?i.w/s.y:1,l=i?i.x/s.x:0,c=i?i.y/s.y:0;e.coordinateSystem===ga||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Lf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},mc=new G,gc=new qi,Vi=new G,Oo=class extends Gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Et,this.projectionMatrix=new Et,this.projectionMatrixInverse=new Et,this.coordinateSystem=Mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(mc,gc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mc,gc,Vi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(mc,gc,Vi),Vi.x===1&&Vi.y===1&&Vi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mc,gc,Vi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hr=new G,og=new Ke,lg=new Ke,An=class extends Oo{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Pc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(vc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Pc*2*Math.atan(Math.tan(vc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hr.x,Hr.y).multiplyScalar(-e/Hr.z),Hr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hr.x,Hr.y).multiplyScalar(-e/Hr.z)}getViewSize(e,t){return this.getViewBounds(e,og,lg),t.subVectors(lg,og)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(vc*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Bf=class extends jc{constructor(){super(new An(90,1,.5,500)),this.isPointLightShadow=!0}},Fo=class extends Uo{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Bf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},eh=class extends Oo{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var Bo=class extends Uo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var fa=-90,da=1,wa=class extends Gn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new An(fa,da,e,t);i.layers=this.layers,this.add(i);let s=new An(fa,da,e,t);s.layers=this.layers,this.add(s);let a=new An(fa,da,e,t);a.layers=this.layers,this.add(a);let o=new An(fa,da,e,t);o.layers=this.layers,this.add(o);let l=new An(fa,da,e,t);l.layers=this.layers,this.add(l);let c=new An(fa,da,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===Mi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ga)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,i),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,f,u),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}},th=class extends An{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}};var md="\\[\\]\\.:\\/",xv=new RegExp("["+md+"]","g"),gd="[^"+md+"]",vv="[^"+md.replace("\\.","")+"]",yv=/((?:WC+[\/:])*)/.source.replace("WC",gd),Sv=/(WCOD+)?/.source.replace("WCOD",vv),Mv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gd),bv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gd),Tv=new RegExp("^"+yv+Sv+Mv+bv+"$"),wv=["material","materials","bones","map"],zf=class{constructor(e,t,n){let i=n||At.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},At=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(xv,"")}static parseTrackName(e){let t=Tv.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);wv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Be("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;ze("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};At.Composite=zf;At.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};At.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};At.prototype.GetterByBindingType=[At.prototype._getValue_direct,At.prototype._getValue_array,At.prototype._getValue_arrayElement,At.prototype._getValue_toArray];At.prototype.SetterByBindingTypeAndVersioning=[[At.prototype._setValue_direct,At.prototype._setValue_direct_setNeedsUpdate,At.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[At.prototype._setValue_array,At.prototype._setValue_array_setNeedsUpdate,At.prototype._setValue_array_setMatrixWorldNeedsUpdate],[At.prototype._setValue_arrayElement,At.prototype._setValue_arrayElement_setNeedsUpdate,At.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[At.prototype._setValue_fromArray,At.prototype._setValue_fromArray_setNeedsUpdate,At.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var FT=new Float32Array(1);var Md=class Md{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};Md.prototype.isMatrix2=!0;var kf=Md;function _d(r,e,t,n){let i=Ev(n);switch(t){case sd:return r*e;case od:return r*e/i.components*i.byteLength;case ch:return r*e/i.components*i.byteLength;case jr:return r*e*2/i.components*i.byteLength;case hh:return r*e*2/i.components*i.byteLength;case ad:return r*e*3/i.components*i.byteLength;case Ui:return r*e*4/i.components*i.byteLength;case uh:return r*e*4/i.components*i.byteLength;case Vo:case Ho:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Wo:case Xo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case dh:case mh:return Math.max(r,16)*Math.max(e,8)/4;case fh:case ph:return Math.max(r,8)*Math.max(e,8)/2;case gh:case _h:case vh:case yh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case xh:case qo:case Sh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Mh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Th:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case wh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Eh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ah:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ch:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Rh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Ph:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ih:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Lh:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Dh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Nh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Uh:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Oh:case Fh:case Bh:return Math.ceil(r/4)*Math.ceil(e/4)*16;case zh:case kh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Yo:case Gh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ev(r){switch(r){case Jn:case td:return{byteLength:1,components:1};case Ra:case nd:case Ni:return{byteLength:2,components:1};case oh:case lh:return{byteLength:2,components:4};case Li:case ah:case Di:return{byteLength:4,components:1};case id:case rd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Be("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function x_(){let r=null,e=!1,t=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),t(s,a)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Cv(r){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=r.HALF_FLOAT:u=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=r.SHORT;else if(c instanceof Uint32Array)u=r.UNSIGNED_INT;else if(c instanceof Int32Array)u=r.INT;else if(c instanceof Int8Array)u=r.BYTE;else if(c instanceof Uint8Array)u=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(r.bindBuffer(c,o),d.length===0)r.bufferSubData(c,0,h);else{d.sort((u,_)=>u.start-_.start);let f=0;for(let u=1;u<d.length;u++){let _=d[f],x=d[u];x.start<=_.start+_.count+1?_.count=Math.max(_.count,x.start+x.count-_.start):(++f,d[f]=x)}d.length=f+1;for(let u=0,_=d.length;u<_;u++){let x=d[u];r.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(r.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:s,update:a}}var Rv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pv=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Iv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Uv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ov=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Bv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gv=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Vv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Xv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,$v=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Zv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Jv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Kv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Qv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ey=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ty=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ny=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ry="gl_FragColor = linearToOutputTexel( gl_FragColor );",sy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ay=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,oy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,ly=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,py=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,my=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_y=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,yy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Sy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,My=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,by=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ty=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ey=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ay=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Cy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ry=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Py=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Iy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ly=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ny=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Oy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,By=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ky=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vy=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Hy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Yy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$y=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ky=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Qy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,rS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,aS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,uS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,fS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_S=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,yS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,SS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,MS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,TS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ES=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,AS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,CS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,RS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,IS=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,NS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,US=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,OS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,FS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,BS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,GS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,VS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,HS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,XS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,YS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$S=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ZS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,JS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,KS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,eM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,iM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,aM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:Rv,alphahash_pars_fragment:Pv,alphamap_fragment:Iv,alphamap_pars_fragment:Lv,alphatest_fragment:Dv,alphatest_pars_fragment:Nv,aomap_fragment:Uv,aomap_pars_fragment:Ov,batching_pars_vertex:Fv,batching_vertex:Bv,begin_vertex:zv,beginnormal_vertex:kv,bsdfs:Gv,iridescence_fragment:Vv,bumpmap_pars_fragment:Hv,clipping_planes_fragment:Wv,clipping_planes_pars_fragment:Xv,clipping_planes_pars_vertex:qv,clipping_planes_vertex:Yv,color_fragment:$v,color_pars_fragment:Zv,color_pars_vertex:Jv,color_vertex:Kv,common:Qv,defaultnormal_vertex:jv,displacementmap_pars_vertex:ey,displacementmap_vertex:ty,emissivemap_fragment:ny,emissivemap_pars_fragment:iy,colorspace_fragment:ry,colorspace_pars_fragment:sy,envmap_fragment:ay,envmap_common_pars_fragment:oy,envmap_pars_fragment:ly,envmap_pars_vertex:cy,envmap_physical_pars_fragment:yy,envmap_vertex:hy,fog_vertex:uy,fog_pars_vertex:fy,fog_fragment:dy,fog_pars_fragment:py,gradientmap_pars_fragment:my,lightmap_pars_fragment:gy,lights_lambert_fragment:_y,lights_lambert_pars_fragment:xy,lights_pars_begin:vy,lights_toon_fragment:Sy,lights_toon_pars_fragment:My,lights_phong_fragment:by,lights_phong_pars_fragment:Ty,lights_physical_fragment:wy,lights_physical_pars_fragment:Ey,lights_fragment_begin:Ay,lights_fragment_maps:Cy,lights_fragment_end:Ry,lightprobes_pars_fragment:Py,logdepthbuf_fragment:Iy,logdepthbuf_pars_fragment:Ly,logdepthbuf_pars_vertex:Dy,logdepthbuf_vertex:Ny,map_fragment:Uy,map_pars_fragment:Oy,map_particle_fragment:Fy,map_particle_pars_fragment:By,metalnessmap_fragment:zy,metalnessmap_pars_fragment:ky,morphinstance_vertex:Gy,morphcolor_vertex:Vy,morphnormal_vertex:Hy,morphtarget_pars_vertex:Wy,morphtarget_vertex:Xy,normal_fragment_begin:qy,normal_fragment_maps:Yy,normal_pars_fragment:$y,normal_pars_vertex:Zy,normal_vertex:Jy,normalmap_pars_fragment:Ky,clearcoat_normal_fragment_begin:Qy,clearcoat_normal_fragment_maps:jy,clearcoat_pars_fragment:eS,iridescence_pars_fragment:tS,opaque_fragment:nS,packing:iS,premultiplied_alpha_fragment:rS,project_vertex:sS,dithering_fragment:aS,dithering_pars_fragment:oS,roughnessmap_fragment:lS,roughnessmap_pars_fragment:cS,shadowmap_pars_fragment:hS,shadowmap_pars_vertex:uS,shadowmap_vertex:fS,shadowmask_pars_fragment:dS,skinbase_vertex:pS,skinning_pars_vertex:mS,skinning_vertex:gS,skinnormal_vertex:_S,specularmap_fragment:xS,specularmap_pars_fragment:vS,tonemapping_fragment:yS,tonemapping_pars_fragment:SS,transmission_fragment:MS,transmission_pars_fragment:bS,uv_pars_fragment:TS,uv_pars_vertex:wS,uv_vertex:ES,worldpos_vertex:AS,background_vert:CS,background_frag:RS,backgroundCube_vert:PS,backgroundCube_frag:IS,cube_vert:LS,cube_frag:DS,depth_vert:NS,depth_frag:US,distance_vert:OS,distance_frag:FS,equirect_vert:BS,equirect_frag:zS,linedashed_vert:kS,linedashed_frag:GS,meshbasic_vert:VS,meshbasic_frag:HS,meshlambert_vert:WS,meshlambert_frag:XS,meshmatcap_vert:qS,meshmatcap_frag:YS,meshnormal_vert:$S,meshnormal_frag:ZS,meshphong_vert:JS,meshphong_frag:KS,meshphysical_vert:QS,meshphysical_frag:jS,meshtoon_vert:eM,meshtoon_frag:tM,points_vert:nM,points_frag:iM,shadow_vert:rM,shadow_frag:sM,sprite_vert:aM,sprite_frag:oM},Me={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},Qi={basic:{uniforms:Rn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Rn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Rn([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Rn([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Rn([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new Ye(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Rn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Rn([Me.points,Me.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Rn([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Rn([Me.common,Me.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Rn([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Rn([Me.sprite,Me.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distance:{uniforms:Rn([Me.common,Me.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distance_vert,fragmentShader:$e.distance_frag},shadow:{uniforms:Rn([Me.lights,Me.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};Qi.physical={uniforms:Rn([Qi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ge},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};var Hh={r:0,b:0,g:0},lM=new Et,v_=new Ge;v_.set(-1,0,0,0,1,0,0,0,1);function cM(r,e,t,n,i,s){let a=new Ye(0),o=i===!0?0:1,l,c,h=null,d=0,f=null;function u(v){let T=v.isScene===!0?v.background:null;if(T&&T.isTexture){let y=v.backgroundBlurriness>0;T=e.get(T,y)}return T}function _(v){let T=!1,y=u(v);y===null?p(a,o):y&&y.isColor&&(p(y,1),T=!0);let w=r.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function x(v,T){let y=u(T);y&&y.isCubeTexture?(c===void 0&&(c=new hi(new $r(1,1,1),new $i({name:"BackgroundCubeMaterial",uniforms:Ps(Qi.backgroundCube.uniforms),vertexShader:Qi.backgroundCube.vertexShader,fragmentShader:Qi.backgroundCube.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,m){this.matrixWorld.copyPosition(m.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(lM.makeRotationFromEuler(T.backgroundRotation)).transpose(),y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(v_),c.material.toneMapped=nt.getTransfer(y.colorSpace)!==gt,(h!==y||d!==y.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,f=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new hi(new Io(2,2),new $i({name:"BackgroundMaterial",uniforms:Ps(Qi.background.uniforms),vertexShader:Qi.background.vertexShader,fragmentShader:Qi.background.fragmentShader,side:Qr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=nt.getTransfer(y.colorSpace)!==gt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,f=r.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,T){v.getRGB(Hh,pd(r)),t.buffers.color.setClear(Hh.r,Hh.g,Hh.b,T,s)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,T=1){a.set(v),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,p(a,o)},render:_,addToRenderList:x,dispose:g}}function hM(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null),s=i,a=!1;function o(D,N,X,I,B){let V=!1,F=d(D,I,X,N);s!==F&&(s=F,c(s.object)),V=u(D,I,X,B),V&&_(D,I,X,B),B!==null&&e.update(B,r.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,y(D,N,X,I),B!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return r.createVertexArray()}function c(D){return r.bindVertexArray(D)}function h(D){return r.deleteVertexArray(D)}function d(D,N,X,I){let B=I.wireframe===!0,V=n[N.id];V===void 0&&(V={},n[N.id]=V);let F=D.isInstancedMesh===!0?D.id:0,j=V[F];j===void 0&&(j={},V[F]=j);let W=j[X.id];W===void 0&&(W={},j[X.id]=W);let P=W[B];return P===void 0&&(P=f(l()),W[B]=P),P}function f(D){let N=[],X=[],I=[];for(let B=0;B<t;B++)N[B]=0,X[B]=0,I[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:X,attributeDivisors:I,object:D,attributes:{},index:null}}function u(D,N,X,I){let B=s.attributes,V=N.attributes,F=0,j=X.getAttributes();for(let W in j)if(j[W].location>=0){let ne=B[W],Se=V[W];if(Se===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(Se=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(Se=D.instanceColor)),ne===void 0||ne.attribute!==Se||Se&&ne.data!==Se.data)return!0;F++}return s.attributesNum!==F||s.index!==I}function _(D,N,X,I){let B={},V=N.attributes,F=0,j=X.getAttributes();for(let W in j)if(j[W].location>=0){let ne=V[W];ne===void 0&&(W==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),W==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor));let Se={};Se.attribute=ne,ne&&ne.data&&(Se.data=ne.data),B[W]=Se,F++}s.attributes=B,s.attributesNum=F,s.index=I}function x(){let D=s.newAttributes;for(let N=0,X=D.length;N<X;N++)D[N]=0}function p(D){g(D,0)}function g(D,N){let X=s.newAttributes,I=s.enabledAttributes,B=s.attributeDivisors;X[D]=1,I[D]===0&&(r.enableVertexAttribArray(D),I[D]=1),B[D]!==N&&(r.vertexAttribDivisor(D,N),B[D]=N)}function v(){let D=s.newAttributes,N=s.enabledAttributes;for(let X=0,I=N.length;X<I;X++)N[X]!==D[X]&&(r.disableVertexAttribArray(X),N[X]=0)}function T(D,N,X,I,B,V,F){F===!0?r.vertexAttribIPointer(D,N,X,B,V):r.vertexAttribPointer(D,N,X,I,B,V)}function y(D,N,X,I){x();let B=I.attributes,V=X.getAttributes(),F=N.defaultAttributeValues;for(let j in V){let W=V[j];if(W.location>=0){let P=B[j];if(P===void 0&&(j==="instanceMatrix"&&D.instanceMatrix&&(P=D.instanceMatrix),j==="instanceColor"&&D.instanceColor&&(P=D.instanceColor)),P!==void 0){let ne=P.normalized,Se=P.itemSize,Oe=e.get(P);if(Oe===void 0)continue;let Z=Oe.buffer,he=Oe.type,ye=Oe.bytesPerElement,be=he===r.INT||he===r.UNSIGNED_INT||P.gpuType===ah;if(P.isInterleavedBufferAttribute){let me=P.data,De=me.isInterleavedBuffer===!0?me.stride:me.itemSize,_t=P.offset;if(me.isInstancedInterleavedBuffer||me.isInstancedBufferAttribute){for(let Ee=0;Ee<W.locationSize;Ee++)g(W.location+Ee,me.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Ee=0;Ee<W.locationSize;Ee++)p(W.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,Z);for(let Ee=0;Ee<W.locationSize;Ee++)T(W.location+Ee,Se/W.locationSize,he,ne,De*ye,(_t+Se/W.locationSize*Ee)*ye,be)}else{if(P.isInstancedBufferAttribute){for(let me=0;me<W.locationSize;me++)g(W.location+me,P.meshPerAttribute);D.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=P.meshPerAttribute*P.count)}else for(let me=0;me<W.locationSize;me++)p(W.location+me);r.bindBuffer(r.ARRAY_BUFFER,Z);for(let me=0;me<W.locationSize;me++)T(W.location+me,Se/W.locationSize,he,ne,Se*ye,Se/W.locationSize*me*ye,be)}}else if(F!==void 0){let ne=F[j];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(W.location,ne);break;case 3:r.vertexAttrib3fv(W.location,ne);break;case 4:r.vertexAttrib4fv(W.location,ne);break;default:r.vertexAttrib1fv(W.location,ne)}}}}v()}function w(){R();for(let D in n){let N=n[D];for(let X in N){let I=N[X];for(let B in I){let V=I[B];for(let F in V)h(V[F].object),delete V[F];delete I[B]}}delete n[D]}}function E(D){if(n[D.id]===void 0)return;let N=n[D.id];for(let X in N){let I=N[X];for(let B in I){let V=I[B];for(let F in V)h(V[F].object),delete V[F];delete I[B]}}delete n[D.id]}function m(D){for(let N in n){let X=n[N];for(let I in X){let B=X[I];if(B[D.id]===void 0)continue;let V=B[D.id];for(let F in V)h(V[F].object),delete V[F];delete B[D.id]}}}function S(D){for(let N in n){let X=n[N],I=D.isInstancedMesh===!0?D.id:0,B=X[I];if(B!==void 0){for(let V in B){let F=B[V];for(let j in F)h(F[j].object),delete F[j];delete B[V]}delete X[I],Object.keys(X).length===0&&delete n[N]}}}function R(){A(),a=!0,s!==i&&(s=i,c(s.object))}function A(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:A,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:S,releaseStatesOfProgram:m,initAttributes:x,enableAttribute:p,disableUnusedAttributes:v}}function uM(r,e,t){let n;function i(l){n=l}function s(l,c){r.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(r.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let u=0;u<h;u++)f+=c[u];t.update(f,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function fM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let m=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(m.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(m){return!(m!==Ui&&n.convert(m)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(m){let S=m===Ni&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(m!==Jn&&m!==Di&&!S&&n.convert(m)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function l(m){if(m==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";m="mediump"}return m==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Be("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&d===!1;t.reversedDepthBuffer===!0&&d===!1&&Be("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&d===!0&&Be("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),p=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),g=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),T=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=r.getParameter(r.MAX_SAMPLES),E=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:u,maxVertexTextures:_,maxTextureSize:x,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:v,maxVaryings:T,maxFragmentUniforms:y,maxSamples:w,samples:E}}function dM(r){let e=this,t=null,n=0,i=!1,s=!1,a=new Pi,o=new Ge,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let u=d.length!==0||f||n!==0||i;return i=f,n=d.length,u},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=h(d,f,0)},this.setState=function(d,f,u){let _=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,g=r.get(d);if(!i||_===null||_.length===0||s&&!p)s?h(null):c();else{let v=s?0:n,T=v*4,y=g.clippingState||null;l.value=y,y=h(_,f,T,u);for(let w=0;w!==T;++w)y[w]=t[w];g.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,f,u,_){let x=d!==null?d.length:0,p=null;if(x!==0){if(p=l.value,_!==!0||p===null){let g=u+x*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(p===null||p.length<g)&&(p=new Float32Array(g));for(let T=0,y=u;T!==x;++T,y+=4)a.copy(d[T]).applyMatrix4(v,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}var Ko=class extends ci{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Co(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new $r(5,5,5),s=new $i({name:"CubemapFromEquirect",uniforms:Ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vn,blending:Es});s.uniforms.tEquirect.value=t;let a=new hi(i,s),o=t.minFilter;return t.minFilter===Sr&&(t.minFilter=kn),new wa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},Kg=256,pM=3,mM=20,y_=256,S_=16,gM=3,_M=new G,xM=new Ye,Xh=class r{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new wa(1,10,null),this._boxMesh=new hi(new $r(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){let{size:a=256,position:o=_M}=s,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,f=l.autoClearColor,u=l.autoClearDepth,_=l.autoClearStencil,x=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(e.background=l.getClearColor(xM));let p=new wa(n,i,h);return p.position.copy(o),p.update(l,e),l.autoClear=d,l.autoClearColor=f,l.autoClearDepth=u,l.autoClearStencil=_,e.background=x,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=e_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Kg,qg(e))}_fromTexture(e,t){e.mapping===Cs||e.mapping===Ca?this._setSize(e.image.length===0?Kg:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Qg(e,!1,!1),n=Math.log2(e)-pM;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Qg(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let i=this._boxMesh,s=this._cubeCamera;i.material=n,s.renderTarget=e,s.activeMipmapLevel=t;let a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Cs||e.mapping===Ca?(this._cubemapMaterial===null&&(this._cubemapMaterial=e_()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=jg()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=vM(),this._integrationMaterial=yM());let t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/S_);for(let a=0;a<=n;a++){let o=r.lodToRoughness(a,n);if(a>n-gM)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{let l=o>0?Math.log2(t)+.5*Math.log2(6/(y_*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=SM());let n=this._blurMaterial,i=n.uniforms,s=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=s.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(s,0,n)}};function Qg(r,e,t){return new Ko(r,{minFilter:Sr,generateMipmaps:e,type:Ni,colorSpace:vo,depthBuffer:t})}function Qo(r,e,t){return new $i({name:r,uniforms:e,vertexShader:$e.cube_vert,fragmentShader:t,side:Vn,blending:Es,depthTest:!1,depthWrite:!1})}function vM(){return Qo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${y_}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function yM(){return Qo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:S_}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function SM(){return Qo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${mM}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function jg(){return Qo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function e_(){return Qo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function MM(r){let e=new WeakMap,t=new WeakMap,n=null;function i(f,u=!1){return f==null?null:u?a(f):s(f)}function s(f){if(f&&f.isTexture){let u=f.mapping;if(u===ih||u===rh)if(e.has(f)){let _=e.get(f).texture;return o(_,f.mapping)}else{let _=f.image;if(_&&_.height>0){let x=new Ko(_.height);return x.fromEquirectangularTexture(r,f),e.set(f,x),f.addEventListener("dispose",c),o(x.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let u=f.mapping,_=u===ih||u===rh,x=u===Cs||u===Ca;if(_||x){let p=t.get(f),g=p!==void 0?p.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new Xh(r)),p=_?n.fromEquirectangular(f,p):n.fromCubemap(f,p),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),p.texture;if(p!==void 0)return p.texture;{let v=f.image;return _&&v&&v.height>0||x&&v&&l(v)?(n===null&&(n=new Xh(r)),p=_?n.fromEquirectangular(f):n.fromCubemap(f),p.texture.pmremVersion=f.pmremVersion,t.set(f,p),f.addEventListener("dispose",h),p.texture):null}}}return f}function o(f,u){return u===ih?f.mapping=Cs:u===rh&&(f.mapping=Ca),f}function l(f){let u=0,_=6;for(let x=0;x<_;x++)f[x]!==void 0&&u++;return u===_}function c(f){let u=f.target;u.removeEventListener("dispose",c);let _=e.get(u);_!==void 0&&(e.delete(u),_.dispose())}function h(f){let u=f.target;u.removeEventListener("dispose",h);let _=t.get(u);_!==void 0&&(t.delete(u),_.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function bM(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&_o("WebGLRenderer: "+n+" extension not supported."),i}}}function TM(r,e,t,n){let i={},s=new WeakMap,a=new FinalizationRegistry(_=>delete i[_]);function o(_){l(_.target)}function l(_){_.index!==null&&e.remove(_.index);for(let p in _.attributes)e.remove(_.attributes[p]);_.removeEventListener("dispose",o),delete i[_.id],a.unregister(_);let x=s.get(_);x&&(e.remove(x),s.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(_,x){return i[x.id]!==void 0||(x.addEventListener("dispose",o),i[x.id]=new WeakRef(x),a.register(x,x.id,x),t.memory.geometries++),x}function h(_){let x=_.attributes;for(let p in x)e.update(x[p],r.ARRAY_BUFFER)}function d(_){let x=_.index,p=_.attributes.position,g=0;if(p===void 0)return;let v=x!==null?x.array.length:p.array.length/3-1,T=p.count>=65535?Eo:wo,y=new T(Math.ceil(v/3)*6,1),w=y.array;if(x!==null){let m=x.array;g=x.version;for(let S=0,R=0;S<v;S+=3){let A=m[S+0],D=m[S+1],N=m[S+2];w[R++]=A,w[R++]=D,w[R++]=D,w[R++]=N,w[R++]=N,w[R++]=A}}else{g=p.version;for(let m=0,S=0;m<v;m+=3){let R=m+0,A=m+1,D=m+2;w[S++]=R,w[S++]=A,w[S++]=A,w[S++]=D,w[S++]=D,w[S++]=R}}y.version=g;let E=s.get(_);E&&e.remove(E),s.set(_,y)}function f(_){let x=s.get(_);if(x){let p=_.index;p!==null&&x.version<p.version&&d(_)}else d(_);return s.get(_)}function u(){for(let _ in i){let x=i[_].deref();x!==void 0&&l(x)}}return{get:c,update:h,getWireframeAttribute:f,dispose:u}}function wM(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function c(d,f,u){u!==0&&(r.drawElementsInstanced(n,f,s,d*a,u),t.update(f,n,u))}function h(d,f,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,u);let x=0;for(let p=0;p<u;p++)x+=f[p];t.update(x,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function EM(r){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:ze("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function AM(r,e,t){let n=new WeakMap,i=new Lt;function s(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,f=n.get(o);if(f===void 0||f.count!==d){let R=function(){m.dispose(),n.delete(o),o.removeEventListener("dispose",R)};f!==void 0&&f.texture.dispose();let u=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],T=0;u===!0&&(T=1),_===!0&&(T=2),x===!0&&(T=3);let y=o.attributes.position.count*T,w=1;y>e.maxTextureSize&&(w=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let E=new Float32Array(y*w*4*d),m=new Mo(E,y,w,d);m.type=Di,m.needsUpdate=!0;let S=T*4;for(let A=0;A<d;A++){let D=p[A],N=g[A],X=v[A],I=y*w*4*A;for(let B=0;B<D.count;B++){let V=B*S;u===!0&&(i.fromBufferAttribute(D,B),E[I+V+0]=i.x,E[I+V+1]=i.y,E[I+V+2]=i.z,E[I+V+3]=0),_===!0&&(i.fromBufferAttribute(N,B),E[I+V+4]=i.x,E[I+V+5]=i.y,E[I+V+6]=i.z,E[I+V+7]=0),x===!0&&(i.fromBufferAttribute(X,B),E[I+V+8]=i.x,E[I+V+9]=i.y,E[I+V+10]=i.z,E[I+V+11]=X.itemSize===4?i.w:1)}}f={count:d,texture:m,size:new Ke(y,w)},n.set(o,f),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let u=0;for(let x=0;x<c.length;x++)u+=c[x];let _=o.morphTargetsRelative?1:1-u;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function CM(r,e,t,n,i){let s=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==h&&(e.update(f),s.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){let u=c.skeleton;s.get(u)!==h&&(u.update(),s.set(u,h))}return f}function o(){s=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var RM={[Yf]:"LINEAR_TONE_MAPPING",[$f]:"REINHARD_TONE_MAPPING",[Zf]:"CINEON_TONE_MAPPING",[Jf]:"ACES_FILMIC_TONE_MAPPING",[Qf]:"AGX_TONE_MAPPING",[jf]:"NEUTRAL_TONE_MAPPING",[Kf]:"CUSTOM_TONE_MAPPING"};function PM(r,e,t,n,i,s){let a=new ci(e,t,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new Cn;h.setAttribute("position",new It([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new It([0,2,0,0,2,0],2));let d=new kc({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new hi(h,d),u=new eh(-1,1,1,-1,0,1),_=null,x=null,p=!1,g,v=null,T=[],y=!1;this.setSize=function(w,E){a.setSize(w,E),o!==null&&o.setSize(w,E),l!==null&&l.setSize(w,E);for(let m=0;m<T.length;m++){let S=T[m];S.setSize&&S.setSize(w,E)}},this.setEffects=function(w){T=w,y=T.length>0&&T[0].isRenderPass===!0;let E=a.width,m=a.height;T.length>0&&o===null&&(o=new ci(E,m,{type:Ni,depthBuffer:!1,stencilBuffer:!1}),l=new ci(E,m,{type:Ni,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&T.some(R=>R.needsDepthTexture===!0);S!==(a.depthTexture!==null)&&(S===!0&&c===null&&(c=new yr(E,m),s===!0&&(c.format=Mr,c.type=Rs)),a.dispose(),a.depthTexture=S?c:null,a.resolveDepthBuffer=S,a.storeMultisampledDepthBuffer=S);for(let R=0;R<T.length;R++){let A=T[R];A.setSize&&A.setSize(E,m),S&&A.needsDepthTexture===!0&&A.setDepthTexture&&A.setDepthTexture(c)}},this.begin=function(w,E){if(p||w.toneMapping===Ji&&T.length===0)return!1;if(v=E,E!==null){let m=E.width,S=E.height;(a.width!==m||a.height!==S)&&this.setSize(m,S)}return y===!1&&w.setRenderTarget(a),g=w.toneMapping,w.toneMapping=Ji,!0},this.hasRenderPass=function(){return y},this.end=function(w,E){w.toneMapping=g,p=!0;let m=a,S=o;for(let R=0;R<T.length;R++){let A=T[R];A.enabled!==!1&&(A.render(w,S,m,E),A.needsSwap!==!1&&(m=S,S=S===o?l:o))}if(_!==w.outputColorSpace||x!==w.toneMapping){_=w.outputColorSpace,x=w.toneMapping,d.defines={},nt.getTransfer(_)===gt&&(d.defines.SRGB_TRANSFER="");let R=RM[x];R&&(d.defines[R]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=m.texture,w.setRenderTarget(v),w.render(f,u),v=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var M_=new Zn,b_=new yr(1,1),T_=new Ro(1),w_=new Mo,E_=new Dc,A_=new Co,t_=[],n_=[],i_=new Float32Array(16),r_=new Float32Array(9),s_=new Float32Array(4);function Ia(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=t_[i];if(s===void 0&&(s=new Float32Array(i),t_[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function rn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function sn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Yh(r,e){let t=n_[e];t===void 0&&(t=new Int32Array(e),n_[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function IM(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function LM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;r.uniform2fv(this.addr,e),sn(t,e)}}function DM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;r.uniform3fv(this.addr,e),sn(t,e)}}function NM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;r.uniform4fv(this.addr,e),sn(t,e)}}function UM(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;s_.set(n),r.uniformMatrix2fv(this.addr,!1,s_),sn(t,n)}}function OM(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;r_.set(n),r.uniformMatrix3fv(this.addr,!1,r_),sn(t,n)}}function FM(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,n))return;i_.set(n),r.uniformMatrix4fv(this.addr,!1,i_),sn(t,n)}}function BM(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function zM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;r.uniform2iv(this.addr,e),sn(t,e)}}function kM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;r.uniform3iv(this.addr,e),sn(t,e)}}function GM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;r.uniform4iv(this.addr,e),sn(t,e)}}function VM(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function HM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;r.uniform2uiv(this.addr,e),sn(t,e)}}function WM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;r.uniform3uiv(this.addr,e),sn(t,e)}}function XM(r,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;r.uniform4uiv(this.addr,e),sn(t,e)}}function $h(r){return r.version===0&&(r.compareFunction=hd,r.needsUpdate=!0),r}function qM(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?s=$h(b_):s=M_,t.setTexture2D(e||s,i)}function YM(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||E_,i)}function $M(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_CUBE_SHADOW?s=$h(T_):s=A_,t.setTextureCube(e||s,i)}function ZM(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||w_,i)}function JM(r){switch(r){case 5126:return IM;case 35664:return LM;case 35665:return DM;case 35666:return NM;case 35674:return UM;case 35675:return OM;case 35676:return FM;case 5124:case 35670:return BM;case 35667:case 35671:return zM;case 35668:case 35672:return kM;case 35669:case 35673:return GM;case 5125:return VM;case 36294:return HM;case 36295:return WM;case 36296:return XM;case 35678:case 36198:case 36298:case 36306:case 35682:return qM;case 35679:case 36299:case 36307:return YM;case 35680:case 36300:case 36308:case 36293:return $M;case 36289:case 36303:case 36311:case 36292:return ZM}}function KM(r,e){r.uniform1fv(this.addr,e)}function QM(r,e){let t=Ia(e,this.size,2);r.uniform2fv(this.addr,t)}function jM(r,e){let t=Ia(e,this.size,3);r.uniform3fv(this.addr,t)}function eb(r,e){let t=Ia(e,this.size,4);r.uniform4fv(this.addr,t)}function tb(r,e){let t=Ia(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function nb(r,e){let t=Ia(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ib(r,e){let t=Ia(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function rb(r,e){r.uniform1iv(this.addr,e)}function sb(r,e){r.uniform2iv(this.addr,e)}function ab(r,e){r.uniform3iv(this.addr,e)}function ob(r,e){r.uniform4iv(this.addr,e)}function lb(r,e){r.uniform1uiv(this.addr,e)}function cb(r,e){r.uniform2uiv(this.addr,e)}function hb(r,e){r.uniform3uiv(this.addr,e)}function ub(r,e){r.uniform4uiv(this.addr,e)}function fb(r,e,t){let n=this.cache,i=e.length,s=Yh(t,i);rn(n,s)||(r.uniform1iv(this.addr,s),sn(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=$h(b_):a=M_;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function db(r,e,t){let n=this.cache,i=e.length,s=Yh(t,i);rn(n,s)||(r.uniform1iv(this.addr,s),sn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||E_,s[a])}function pb(r,e,t){let n=this.cache,i=e.length,s=Yh(t,i);rn(n,s)||(r.uniform1iv(this.addr,s),sn(n,s));let a;this.type===r.SAMPLER_CUBE_SHADOW?a=$h(T_):a=A_;for(let o=0;o!==i;++o)t.setTextureCube(e[o]||a,s[o])}function mb(r,e,t){let n=this.cache,i=e.length,s=Yh(t,i);rn(n,s)||(r.uniform1iv(this.addr,s),sn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||w_,s[a])}function gb(r){switch(r){case 5126:return KM;case 35664:return QM;case 35665:return jM;case 35666:return eb;case 35674:return tb;case 35675:return nb;case 35676:return ib;case 5124:case 35670:return rb;case 35667:case 35671:return sb;case 35668:case 35672:return ab;case 35669:case 35673:return ob;case 5125:return lb;case 36294:return cb;case 36295:return hb;case 36296:return ub;case 35678:case 36198:case 36298:case 36306:case 35682:return fb;case 35679:case 36299:case 36307:return db;case 35680:case 36300:case 36308:case 36293:return pb;case 36289:case 36303:case 36311:case 36292:return mb}}var wd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=JM(t.type)}},Ed=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=gb(t.type)}},Ad=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},bd=/(\w+)(\])?(\[|\.)?/g;function a_(r,e){r.seq.push(e),r.map[e.id]=e}function _b(r,e,t){let n=r.name,i=n.length;for(bd.lastIndex=0;;){let s=bd.exec(n),a=bd.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){a_(t,c===void 0?new wd(o,r,e):new Ed(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new Ad(o),a_(t,d)),t=d}}}var Pa=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);_b(o,l,this)}let i=[],s=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function o_(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}var xb=37297,vb=0;function yb(r,e){let t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var l_=new Ge;function Sb(r){nt._getMatrix(l_,nt.workingColorSpace,r);let e=`mat3( ${l_.elements.map(t=>t.toFixed(4))} )`;switch(nt.getTransfer(r)){case yo:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Be("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function c_(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";let a=/ERROR: 0:(\d+)/.exec(s);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+yb(r.getShaderSource(e),o)}else return s}function Mb(r,e){let t=Sb(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var bb={[Yf]:"Linear",[$f]:"Reinhard",[Zf]:"Cineon",[Jf]:"ACESFilmic",[Qf]:"AgX",[jf]:"Neutral",[Kf]:"Custom"};function Tb(r,e){let t=bb[e];return t===void 0?(Be("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Wh=new G;function wb(){nt.getLuminanceCoefficients(Wh);let r=Wh.x.toFixed(4),e=Wh.y.toFixed(4),t=Wh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Eb(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Jo).join(`
`)}function Ab(r){let e=[];for(let t in r){let n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Cb(r,e){let t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let s=r.getActiveAttrib(e,i),a=s.name,o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Jo(r){return r!==""}function h_(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function u_(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Rb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Cd(r){return r.replace(Rb,Pb)}function Pb(r,e){let t=$e[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Cd(t)}var Ib=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function f_(r){return r.replace(Ib,Lb)}function Lb(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function d_(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Db={[zo]:"SHADOWMAP_TYPE_PCF",[Ea]:"SHADOWMAP_TYPE_VSM"};function Nb(r){return Db[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ub={[Ca]:"ENVMAP_MODE_REFRACTION"};function Ob(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":Ub[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Fb={[qf]:"ENVMAP_BLENDING_MULTIPLY",[Pg]:"ENVMAP_BLENDING_MIX",[Ig]:"ENVMAP_BLENDING_ADD"};function Bb(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Fb[r.combine]||"ENVMAP_BLENDING_NONE"}function zb(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Nb(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Ob(t),d=Bb(t),f=Eb(t),u=Ab(s),_=i.createProgram(),x,p,g=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u].filter(Jo).join(`
`),x.length>0&&(x+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u].filter(Jo).join(`
`),p.length>0&&(p+=`
`)):(x=[d_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Jo).join(`
`),p=[d_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,u,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ji?"#define TONE_MAPPING":"",t.toneMapping!==Ji?$e.tonemapping_pars_fragment:"",t.toneMapping!==Ji?Tb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,Mb("linearToOutputTexel",t.outputColorSpace),wb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Jo).join(`
`)),a=Cd(a),a=h_(a,t),a=u_(a,t),o=Cd(o),o=h_(o,t),o=u_(o,t),a=f_(a),o=f_(o),t.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,p=["#define varying in",t.glslVersion===ud?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ud?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=g+x+a,T=g+p+o,y=o_(i,i.VERTEX_SHADER,v),w=o_(i,i.FRAGMENT_SHADER,T);i.attachShader(_,y),i.attachShader(_,w),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(A){if(r.debug.checkShaderErrors){let D=i.getProgramInfoLog(_)||"",N=i.getShaderInfoLog(y)||"",X=i.getShaderInfoLog(w)||"",I=D.trim(),B=N.trim(),V=X.trim(),F=!0,j=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,y,w);else{let W=c_(i,y,"vertex"),P=c_(i,w,"fragment");ze("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+I+`
`+W+`
`+P)}else I!==""?Be("WebGLProgram: Program Info Log:",I):(B===""||V==="")&&(j=!1);j&&(A.diagnostics={runnable:F,programLog:I,vertexShader:{log:B,prefix:x},fragmentShader:{log:V,prefix:p}})}i.deleteShader(y),i.deleteShader(w),m=new Pa(i,_),S=Cb(i,_)}let m;this.getUniforms=function(){return m===void 0&&E(this),m};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=i.getProgramParameter(_,xb)),R},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=vb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=y,this.fragmentShader=w,this}var kb=0,Rd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Pd(e),t.set(e,n)),n}},Pd=class{constructor(e){this.id=kb++,this.code=e,this.usedTimes=0}};function Gb(r){return r===jr||r===qo||r===Yo}function Vb(r,e,t,n,i,s){let a=new bo,o=new Rd,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(m){return l.add(m),m===0?"uv":`uv${m}`}function _(m,S,R,A,D,N){let X=A.fog,I=D.geometry,B=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?A.environment:null,V=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,F=e.get(m.envMap||B,V),j=f[m.type],W=n.precision;m.precision!==null&&(W=n.getMaxPrecision(m.precision),W!==m.precision&&Be("WebGLProgram.getParameters:",m.precision,"not supported, using",W,"instead."));let P=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ne=P!==void 0?P.length:0,Se=0;I.morphAttributes.position!==void 0&&(Se=1),I.morphAttributes.normal!==void 0&&(Se=2),I.morphAttributes.color!==void 0&&(Se=3);let Oe,Z,he,ye;if(j){let te=Qi[j];Oe=te.vertexShader,Z=te.fragmentShader}else{Oe=m.vertexShader,Z=m.fragmentShader;let te=o.getVertexShaderStage(m),Te=o.getFragmentShaderStage(m);o.update(m,te,Te),he=te.id,ye=Te.id}let be=r.getRenderTarget(),me=r.state.buffers.depth.getReversed(),De=D.isInstancedMesh===!0,_t=D.isBatchedMesh===!0,Ee=!!m.map,Ve=!!m.matcap,Ie=!!F,Ue=Ie&&F.isPMREMTexture===!0,ct=!!m.aoMap,at=!!m.lightMap,$=!!m.bumpMap&&m.wireframe===!1,Qe=!!m.normalMap,Xt=!!m.displacementMap,yt=!!m.emissiveMap,it=!!m.metalnessMap,Ft=!!m.roughnessMap,Ht=m.anisotropy>0,O=m.clearcoat>0,ft=m.diffuseRoughness>0,ot=m.dispersion>0,ke=m.retroreflectivity>0,ue=m.iridescence>0,ht=m.sheen>0,Le=m.transmission>0,Fe=Ht&&!!m.anisotropyMap,C=O&&!!m.clearcoatMap,M=O&&!!m.clearcoatNormalMap,k=O&&!!m.clearcoatRoughnessMap,se=ft&&!!m.diffuseRoughnessMap,ie=ue&&!!m.iridescenceMap,ce=ue&&!!m.iridescenceThicknessMap,ge=ht&&!!m.sheenColorMap,H=ht&&!!m.sheenRoughnessMap,Q=!!m.specularMap,le=!!m.specularColorMap,L=!!m.specularIntensityMap,K=Le&&!!m.transmissionMap,J=Le&&!!m.thicknessMap,fe=!!m.gradientMap,oe=!!m.alphaMap,de=m.alphaTest>0,ae=!!m.alphaHash,pe=!!m.extensions,re=Ji;m.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(re=r.toneMapping);let ee=Ue?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,_e={shaderID:j,shaderType:m.type,shaderName:m.name,vertexShader:Oe,fragmentShader:Z,defines:m.defines,customVertexShaderID:he,customFragmentShaderID:ye,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:W,batching:_t,batchingColor:_t&&D._colorsTexture!==null,instancing:De,instancingColor:De&&D.instanceColor!==null,instancingMorph:De&&D.morphTexture!==null,outputColorSpace:be===null?r.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:nt.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:Ee,matcap:Ve,envMap:Ie,envMapMode:Ie&&F.mapping,envMapPMREM:Ue,envMapMaxLod:Ue?ee.length-1:null,envMapSize:Ue?ee[0].width:null,aoMap:ct,lightMap:at,bumpMap:$,normalMap:Qe,displacementMap:Xt,emissiveMap:yt,normalMapObjectSpace:Qe&&m.normalMapType===Ng,normalMapTangentSpace:Qe&&m.normalMapType===Vh,packedNormalMap:Qe&&m.normalMapType===Vh&&Gb(m.normalMap.format),metalnessMap:it,roughnessMap:Ft,anisotropy:Ht,anisotropyMap:Fe,clearcoat:O,clearcoatMap:C,clearcoatNormalMap:M,clearcoatRoughnessMap:k,diffuseRoughness:ft,diffuseRoughnessMap:se,dispersion:ot,retroreflection:ke,iridescence:ue,iridescenceMap:ie,iridescenceThicknessMap:ce,sheen:ht,sheenColorMap:ge,sheenRoughnessMap:H,specularMap:Q,specularColorMap:le,specularIntensityMap:L,transmission:Le,transmissionMap:K,thicknessMap:J,gradientMap:fe,opaque:m.transparent===!1&&m.blending===Aa&&m.alphaToCoverage===!1,alphaMap:oe,alphaTest:de,alphaHash:ae,combine:m.combine,mapUv:Ee&&u(m.map.channel),aoMapUv:ct&&u(m.aoMap.channel),lightMapUv:at&&u(m.lightMap.channel),bumpMapUv:$&&u(m.bumpMap.channel),normalMapUv:Qe&&u(m.normalMap.channel),displacementMapUv:Xt&&u(m.displacementMap.channel),emissiveMapUv:yt&&u(m.emissiveMap.channel),metalnessMapUv:it&&u(m.metalnessMap.channel),roughnessMapUv:Ft&&u(m.roughnessMap.channel),anisotropyMapUv:Fe&&u(m.anisotropyMap.channel),clearcoatMapUv:C&&u(m.clearcoatMap.channel),clearcoatNormalMapUv:M&&u(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&u(m.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:se&&u(m.diffuseRoughnessMap.channel),iridescenceMapUv:ie&&u(m.iridescenceMap.channel),iridescenceThicknessMapUv:ce&&u(m.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&u(m.sheenColorMap.channel),sheenRoughnessMapUv:H&&u(m.sheenRoughnessMap.channel),specularMapUv:Q&&u(m.specularMap.channel),specularColorMapUv:le&&u(m.specularColorMap.channel),specularIntensityMapUv:L&&u(m.specularIntensityMap.channel),transmissionMapUv:K&&u(m.transmissionMap.channel),thicknessMapUv:J&&u(m.thicknessMap.channel),alphaMapUv:oe&&u(m.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Qe||Ht),vertexNormals:!!I.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!I.attributes.uv&&(Ee||oe),fog:!!X,useFog:m.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||I.attributes.normal===void 0&&Qe===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ne,morphTextureStride:Se,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:N.filter(te=>te.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:m.dithering,shadowMapEnabled:r.shadowMap.enabled&&R.length>0,shadowMapType:r.shadowMap.type,toneMapping:re,decodeVideoTexture:Ee&&m.map.isVideoTexture===!0&&nt.getTransfer(m.map.colorSpace)===gt,decodeVideoTextureEmissive:yt&&m.emissiveMap.isVideoTexture===!0&&nt.getTransfer(m.emissiveMap.colorSpace)===gt,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Zi,flipSided:m.side===Vn,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:pe&&m.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&m.extensions.multiDraw===!0||_t)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function x(m){let S=[];if(m.shaderID?S.push(m.shaderID):(S.push(m.customVertexShaderID),S.push(m.customFragmentShaderID)),m.defines!==void 0)for(let R in m.defines)S.push(R),S.push(m.defines[R]);return m.isRawShaderMaterial===!1&&(p(S,m),g(S,m),S.push(r.outputColorSpace)),S.push(m.customProgramCacheKey),S.join()}function p(m,S){m.push(S.precision),m.push(S.outputColorSpace),m.push(S.envMapMode),m.push(S.envMapPMREM),m.push(S.envMapMaxLod),m.push(S.envMapSize),m.push(S.mapUv),m.push(S.alphaMapUv),m.push(S.lightMapUv),m.push(S.aoMapUv),m.push(S.bumpMapUv),m.push(S.normalMapUv),m.push(S.displacementMapUv),m.push(S.emissiveMapUv),m.push(S.metalnessMapUv),m.push(S.roughnessMapUv),m.push(S.anisotropyMapUv),m.push(S.clearcoatMapUv),m.push(S.clearcoatNormalMapUv),m.push(S.clearcoatRoughnessMapUv),m.push(S.diffuseRoughnessMapUv),m.push(S.iridescenceMapUv),m.push(S.iridescenceThicknessMapUv),m.push(S.sheenColorMapUv),m.push(S.sheenRoughnessMapUv),m.push(S.specularMapUv),m.push(S.specularColorMapUv),m.push(S.specularIntensityMapUv),m.push(S.transmissionMapUv),m.push(S.thicknessMapUv),m.push(S.combine),m.push(S.fogExp2),m.push(S.sizeAttenuation),m.push(S.morphTargetsCount),m.push(S.numSunLights),m.push(S.numDirLights),m.push(S.numPointLights),m.push(S.numSpotLights),m.push(S.numSpotLightMaps),m.push(S.numHemiLights),m.push(S.numRectAreaLights),m.push(S.numSunLightShadows),m.push(S.numDirLightShadows),m.push(S.numPointLightShadows),m.push(S.numSpotLightShadows),m.push(S.numSpotLightShadowsWithMaps),m.push(S.numLightProbes),m.push(S.numLightProbeGrids),m.push(S.shadowMapType),m.push(S.toneMapping),m.push(S.numClippingPlanes),m.push(S.numClipIntersection),m.push(S.depthPacking)}function g(m,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.diffuseRoughness&&a.enable(25),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),m.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),m.push(a.mask)}function v(m){let S=f[m.type],R;if(S){let A=Qi[S];R=$g.clone(A.uniforms)}else R=m.uniforms;return R}function T(m,S){let R=h.get(S);return R!==void 0?++R.usedTimes:(R=new zb(r,S,m,i),c.push(R),h.set(S,R)),R}function y(m){if(--m.usedTimes===0){let S=c.indexOf(m);c[S]=c[c.length-1],c.pop(),h.delete(m.cacheKey),m.destroy()}}function w(m){o.remove(m)}function E(){o.dispose()}return{getParameters:_,getProgramCacheKey:x,getUniforms:v,acquireProgram:T,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:E}}function Hb(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Wb(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function p_(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function m_(){let r=[],e=0,t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(f){let u=0;return f.isInstancedMesh&&(u+=2),f.isSkinnedMesh&&(u+=1),u}function o(f,u,_,x,p,g){let v=r[e];return v===void 0?(v={id:f.id,object:f,geometry:u,material:_,materialVariant:a(f),groupOrder:x,renderOrder:f.renderOrder,z:p,group:g},r[e]=v):(v.id=f.id,v.object=f,v.geometry=u,v.material=_,v.materialVariant=a(f),v.groupOrder=x,v.renderOrder=f.renderOrder,v.z=p,v.group=g),e++,v}function l(f,u,_,x,p,g,v){v.reversedDepth===!0&&(p=-p);let T=o(f,u,_,x,p,g);_.transmission>0?n.push(T):_.transparent===!0?i.push(T):t.push(T)}function c(f,u,_,x,p,g){let v=o(f,u,_,x,p,g);_.transmission>0?n.unshift(v):_.transparent===!0?i.unshift(v):t.unshift(v)}function h(f,u){t.length>1&&t.sort(f||Wb),n.length>1&&n.sort(u||p_),i.length>1&&i.sort(u||p_)}function d(){for(let f=e,u=r.length;f<u;f++){let _=r[f];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:l,unshift:c,finish:d,sort:h}}function Xb(){let r=new WeakMap;function e(n,i){let s=r.get(n),a;return s===void 0?(a=new m_,r.set(n,[a])):i>=s.length?(a=new m_,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function qb(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new G,color:new Ye};break;case"SpotLight":t={position:new G,direction:new G,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new G,halfWidth:new G,halfHeight:new G};break}return r[e.id]=t,t}}}function Yb(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}var $b=0;function Zb(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Jb(r){let e=new qb,t=Yb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);let i=new G,s=new Et,a=new Et;function o(c){let h=0,d=0,f=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let u=0,_=0,x=0,p=0,g=0,v=0,T=0,y=0,w=0,E=0,m=0,S=0,R=0,A=0;c.sort(Zb);for(let N=0,X=c.length;N<X;N++){let I=c[N],B=I.color,V=I.intensity,F=I.distance,j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===jr?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=B.r*V,d+=B.g*V,f+=B.b*V;else if(I.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(I.sh.coefficients[W],V);A++}else if(I.isSunLight){let W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let P=I.shadow,ne=t.get(I);ne.shadowIntensity=P.intensity,ne.shadowBias=P.bias,ne.shadowNormalBias=P.normalBias,ne.shadowRadius=P.radius,ne.shadowMapSize.copy(P.mapSize).multiply(P.getFrameExtents()),n.sunShadow[_]=ne,n.sunShadowMap[_]=j;let Se=P.getViewportCount();for(let Oe=0;Oe<Se;Oe++)n.sunShadowMatrix[x+Oe]=P.getMatrix(Oe),n.sunShadowCascade[x+Oe]=P._cascadeData[Oe];x+=Se,_++}n.sun[u]=W,u++}else if(I.isDirectionalLight){let W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let P=I.shadow,ne=t.get(I);ne.shadowIntensity=P.intensity,ne.shadowBias=P.bias,ne.shadowNormalBias=P.normalBias,ne.shadowRadius=P.radius,ne.shadowMapSize=P.mapSize,n.directionalShadow[p]=ne,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=I.shadow.matrix,w++}n.directional[p]=W,p++}else if(I.isSpotLight){let W=e.get(I);W.position.setFromMatrixPosition(I.matrixWorld),W.color.copy(B).multiplyScalar(V),W.distance=F,W.coneCos=Math.cos(I.angle),W.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),W.decay=I.decay,n.spot[v]=W;let P=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,P.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[v]=P.matrix,I.castShadow){let ne=t.get(I);ne.shadowIntensity=P.intensity,ne.shadowBias=P.bias,ne.shadowNormalBias=P.normalBias,ne.shadowRadius=P.radius,ne.shadowMapSize=P.mapSize,n.spotShadow[v]=ne,n.spotShadowMap[v]=j,m++}v++}else if(I.isRectAreaLight){let W=e.get(I);W.color.copy(B).multiplyScalar(V),W.halfWidth.set(I.width*.5,0,0),W.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=W,T++}else if(I.isPointLight){let W=e.get(I);if(W.color.copy(I.color).multiplyScalar(I.intensity),W.distance=I.distance,W.decay=I.decay,I.castShadow){let P=I.shadow,ne=t.get(I);ne.shadowIntensity=P.intensity,ne.shadowBias=P.bias,ne.shadowNormalBias=P.normalBias,ne.shadowRadius=P.radius,ne.shadowMapSize=P.mapSize,ne.shadowCameraNear=P.camera.near,ne.shadowCameraFar=P.camera.far,n.pointShadow[g]=ne,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=I.shadow.matrix,E++}n.point[g]=W,g++}else if(I.isHemisphereLight){let W=e.get(I);W.skyColor.copy(I.color).multiplyScalar(V),W.groundColor.copy(I.groundColor).multiplyScalar(V),n.hemi[y]=W,y++}}T>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=f;let D=n.hash;(D.sunLength!==u||D.directionalLength!==p||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==T||D.hemiLength!==y||D.numSunShadows!==_||D.numDirectionalShadows!==w||D.numPointShadows!==E||D.numSpotShadows!==m||D.numSpotMaps!==S||D.numLightProbes!==A)&&(n.sun.length=u,n.directional.length=p,n.spot.length=v,n.rectArea.length=T,n.point.length=g,n.hemi.length=y,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.pointShadowMatrix.length=E,n.spotShadow.length=m,n.spotShadowMap.length=m,n.spotLightMatrix.length=m+S-R,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,D.sunLength=u,D.directionalLength=p,D.pointLength=g,D.spotLength=v,D.rectAreaLength=T,D.hemiLength=y,D.numSunShadows=_,D.numDirectionalShadows=w,D.numPointShadows=E,D.numSpotShadows=m,D.numSpotMaps=S,D.numLightProbes=A,n.version=$b++)}function l(c,h){let d=0,f=0,u=0,_=0,x=0,p=0,g=h.matrixWorldInverse;for(let v=0,T=c.length;v<T;v++){let y=c[v];if(y.isSunLight){let w=n.sun[d];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),d++}else if(y.isDirectionalLight){let w=n.directional[f];w.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(g),f++}else if(y.isSpotLight){let w=n.spot[_];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(g),_++}else if(y.isRectAreaLight){let w=n.rectArea[x];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),a.identity(),s.copy(y.matrixWorld),s.premultiply(g),a.extractRotation(s),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let w=n.point[u];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(g),u++}else if(y.isHemisphereLight){let w=n.hemi[p];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:n}}function g_(r){let e=new Jb(r),t=[],n=[],i=[];function s(d){h.camera=d,t.length=0,n.length=0,i.length=0}function a(d){d.isLightProbeGrid?i.push(d):t.push(d)}function o(d){n.push(d)}function l(){e.setup(t),i.sort((d,f)=>d.priority-f.priority||d.id-f.id)}function c(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Kb(r){let e=new WeakMap;function t(i,s=0){let a=e.get(i),o;return a===void 0?(o=new g_(r),e.set(i,[o])):s>=a.length?(o=new g_(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var Qb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,eT=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],tT=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],__=new Et,Zo=new G,Td=new G;function nT(r,e,t){let n=new qr,i=new Ke,s=new Ke,a=new Lt,o=new Gc,l=new Vc,c={},h=t.maxTextureSize,d={[Qr]:Vn,[Vn]:Qr,[Zi]:Zi},f=new $i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:Qb,fragmentShader:jb}),u=f.clone();u.defines.HORIZONTAL_PASS=1;let _=new Cn;_.setAttribute("position",new Wi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new hi(_,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zo;let g=this.type;this.render=function(E,m,S){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===ug&&(Be("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=zo);let R=r.getRenderTarget(),A=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Es),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let X=g!==this.type;X&&m.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(B=>B.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,B=E.length;I<B;I++){let V=E[I],F=V.shadow;if(F===void 0){Be("WebGLShadowMap:",V,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);let j=F.getFrameExtents();i.multiply(j),s.copy(F.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/j.x),i.x=s.x*j.x,F.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/j.y),i.y=s.y*j.y,F.mapSize.y=s.y));let W=r.state.buffers.depth.getReversed();if(F.camera._reversedDepth=W,F.map===null||X===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Ea){if(V.isPointLight){Be("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ci(i.x,i.y,{format:jr,type:Ni,minFilter:kn,magFilter:kn,generateMipmaps:!1}),F.map.texture.name=V.name+".shadowMap",F.map.depthTexture=new yr(i.x,i.y,Di),F.map.depthTexture.name=V.name+".shadowMapDepth",F.map.depthTexture.format=xr,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=hn,F.map.depthTexture.magFilter=hn}else V.isPointLight?(F.map=new Ko(i.x),F.map.depthTexture=new Ro(i.x,Li)):(F.map=new ci(i.x,i.y),F.map.depthTexture=new yr(i.x,i.y,Li)),F.map.depthTexture.name=V.name+".shadowMap",F.map.depthTexture.format=xr,this.type===zo?(F.map.depthTexture.compareFunction=W?cd:ld,F.map.depthTexture.minFilter=kn,F.map.depthTexture.magFilter=kn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=hn,F.map.depthTexture.magFilter=hn);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==i.x||F.map.height!==i.y)&&F.map.setSize(i.x,i.y);let P=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();V.isPointLight!==!0&&F.updateMatrices(V,S);let ne=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:S.layers;for(let Se=0;Se<P;Se++){let Oe=F.getCamera(Se);if(V.isPointLight){let Z=F.camera,he=F.matrix,ye=V.distance||Z.far;ye!==Z.far&&(Z.far=ye,Z.updateProjectionMatrix()),Zo.setFromMatrixPosition(V.matrixWorld),Z.position.copy(Zo),Td.copy(Z.position),Td.add(eT[Se]),Z.up.copy(tT[Se]),Z.lookAt(Td),Z.updateMatrixWorld(),he.makeTranslation(-Zo.x,-Zo.y,-Zo.z),__.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),F._frustum.setFromProjectionMatrix(__,Z.coordinateSystem,Z.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)r.setRenderTarget(F.map,Se),r.clear();else{Se===0&&(r.setRenderTarget(F.map),r.clear());let Z=F.getViewport(Se);a.set(s.x*Z.x,s.y*Z.y,s.x*Z.z,s.y*Z.w),N.viewport(a)}n=F.getFrustum(Se),y(m,S,Oe,V,ne,this.type)}F.isPointLightShadow!==!0&&this.type===Ea&&v(F,S),F.needsUpdate=!1}g=this.type,p.needsUpdate=!1,r.setRenderTarget(R,A,D)};function v(E,m){let S=e.update(x);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,u.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,u.needsUpdate=!0),E.mapPass===null?E.mapPass=new ci(i.x,i.y,{format:jr,type:Ni}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),f.uniforms.shadow_pass.value=E.map.depthTexture,f.uniforms.resolution.value.set(E.map.width,E.map.height),f.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(m,null,S,f,x,null),u.uniforms.shadow_pass.value=E.mapPass.texture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(m,null,S,u,x,null)}function T(E,m,S,R){let A=null,D=S.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(D!==void 0)A=D;else if(A=S.isPointLight===!0?l:o,r.localClippingEnabled&&m.clipShadows===!0&&Array.isArray(m.clippingPlanes)&&m.clippingPlanes.length!==0||m.displacementMap&&m.displacementScale!==0||m.alphaMap&&m.alphaTest>0||m.map&&m.alphaTest>0||m.alphaToCoverage===!0){let N=A.uuid,X=m.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let B=I[X];B===void 0&&(B=A.clone(),I[X]=B,m.addEventListener("dispose",w)),A=B}if(A.visible=m.visible,A.wireframe=m.wireframe,R===Ea?A.side=m.shadowSide!==null?m.shadowSide:m.side:A.side=m.shadowSide!==null?m.shadowSide:d[m.side],A.alphaMap=m.alphaMap,A.alphaTest=m.alphaToCoverage===!0?.5:m.alphaTest,A.map=m.map,A.clipShadows=m.clipShadows,A.clippingPlanes=m.clippingPlanes,A.clipIntersection=m.clipIntersection,A.displacementMap=m.displacementMap,A.displacementScale=m.displacementScale,A.displacementBias=m.displacementBias,A.wireframeLinewidth=m.wireframeLinewidth,A.linewidth=m.linewidth,S.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let N=r.properties.get(A);N.light=S}return A}function y(E,m,S,R,A,D){if(E.visible===!1)return;if(E.layers.test(A)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&D===Ea)&&(!E.frustumCulled||E.intersectsFrustum(n))){E.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,E.matrixWorld);let I=e.update(E),B=E.material;if(Array.isArray(B)){let V=I.groups;for(let F=0,j=V.length;F<j;F++){let W=V[F],P=B[W.materialIndex];if(P&&P.visible){let ne=T(E,P,R,D);E.onBeforeShadow(r,E,m,S,I,ne,W),r.renderBufferDirect(S,null,I,ne,E,W),E.onAfterShadow(r,E,m,S,I,ne,W)}}}else if(B.visible){let V=T(E,B,R,D);E.onBeforeShadow(r,E,m,S,I,V,null),r.renderBufferDirect(S,null,I,V,E,null),E.onAfterShadow(r,E,m,S,I,V,null)}}let X=E.children;for(let I=0,B=X.length;I<B;I++)y(X[I],m,S,R,A,D)}function w(E){E.target.removeEventListener("dispose",w);for(let S in c){let R=c[S],A=E.target.uuid;A in R&&(R[A].dispose(),delete R[A])}}}function iT(r,e){function t(){let L=!1,K=new Lt,J=null,fe=new Lt(0,0,0,0);return{setMask:function(oe){J!==oe&&!L&&(r.colorMask(oe,oe,oe,oe),J=oe)},setLocked:function(oe){L=oe},setClear:function(oe,de,ae,pe,re){re===!0&&(oe*=pe,de*=pe,ae*=pe),K.set(oe,de,ae,pe),fe.equals(K)===!1&&(r.clearColor(oe,de,ae,pe),fe.copy(K))},reset:function(){L=!1,J=null,fe.set(-1,0,0,0)}}}function n(){let L=!1,K=!1,J=null,fe=null,oe=null;return{setReversed:function(de){if(K!==de){let ae=e.get("EXT_clip_control");de?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT),K=de;let pe=oe;oe=null,this.setClear(pe)}},getReversed:function(){return K},setTest:function(de){de?me(r.DEPTH_TEST):De(r.DEPTH_TEST)},setMask:function(de){J!==de&&!L&&(r.depthMask(de),J=de)},setFunc:function(de){if(K&&(de=Xg[de]),fe!==de){switch(de){case yc:r.depthFunc(r.NEVER);break;case Sc:r.depthFunc(r.ALWAYS);break;case Mc:r.depthFunc(r.LESS);break;case ma:r.depthFunc(r.LEQUAL);break;case bc:r.depthFunc(r.EQUAL);break;case Tc:r.depthFunc(r.GEQUAL);break;case wc:r.depthFunc(r.GREATER);break;case Ec:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}fe=de}},setLocked:function(de){L=de},setClear:function(de){oe!==de&&(oe=de,K&&(de=1-de),r.clearDepth(de))},reset:function(){L=!1,J=null,fe=null,oe=null,K=!1}}}function i(){let L=!1,K=null,J=null,fe=null,oe=null,de=null,ae=null,pe=null,re=null;return{setTest:function(ee){L||(ee?me(r.STENCIL_TEST):De(r.STENCIL_TEST))},setMask:function(ee){K!==ee&&!L&&(r.stencilMask(ee),K=ee)},setFunc:function(ee,_e,te){(J!==ee||fe!==_e||oe!==te)&&(r.stencilFunc(ee,_e,te),J=ee,fe=_e,oe=te)},setOp:function(ee,_e,te){(de!==ee||ae!==_e||pe!==te)&&(r.stencilOp(ee,_e,te),de=ee,ae=_e,pe=te)},setLocked:function(ee){L=ee},setClear:function(ee){re!==ee&&(r.clearStencil(ee),re=ee)},reset:function(){L=!1,K=null,J=null,fe=null,oe=null,de=null,ae=null,pe=null,re=null}}}let s=new t,a=new n,o=new i,l={},c=new WeakMap,h={},d={},f={},u=new WeakMap,_=[],x=null,p=!1,g=null,v=null,T=null,y=null,w=null,E=null,m=null,S=new Ye(0,0,0),R=0,A=!1,D=null,N=null,X=null,I=null,B=null,V=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,j=0,W=r.getParameter(r.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),F=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),F=j>=2);let P=null,ne={},Se=r.getParameter(r.SCISSOR_BOX),Oe=r.getParameter(r.VIEWPORT),Z=new Lt().fromArray(Se),he=new Lt().fromArray(Oe);function ye(L,K,J,fe){let oe=new Uint8Array(4),de=r.createTexture();r.bindTexture(L,de),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ae=0;ae<J;ae++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(K,0,r.RGBA,1,1,fe,0,r.RGBA,r.UNSIGNED_BYTE,oe):r.texImage2D(K+ae,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,oe);return de}let be={};be[r.TEXTURE_2D]=ye(r.TEXTURE_2D,r.TEXTURE_2D,1),be[r.TEXTURE_CUBE_MAP]=ye(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),be[r.TEXTURE_2D_ARRAY]=ye(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),be[r.TEXTURE_3D]=ye(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),me(r.DEPTH_TEST),a.setFunc(ma),$(!1),Qe(Gf),me(r.CULL_FACE),ct(Es);function me(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function De(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function _t(L,K){return f[L]!==K?(r.bindFramebuffer(L,K),f[L]=K,L===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=K),L===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=K),!0):!1}function Ee(L,K){let J=_,fe=!1;if(L){J=u.get(K),J===void 0&&(J=[],u.set(K,J));let oe=L.textures;if(J.length!==oe.length||J[0]!==r.COLOR_ATTACHMENT0){for(let de=0,ae=oe.length;de<ae;de++)J[de]=r.COLOR_ATTACHMENT0+de;J.length=oe.length,fe=!0}}else J[0]!==r.BACK&&(J[0]=r.BACK,fe=!0);fe&&r.drawBuffers(J)}function Ve(L){return x!==L?(r.useProgram(L),x=L,!0):!1}let Ie={[As]:r.FUNC_ADD,[dg]:r.FUNC_SUBTRACT,[pg]:r.FUNC_REVERSE_SUBTRACT};Ie[mg]=r.MIN,Ie[gg]=r.MAX;let Ue={[_g]:r.ZERO,[xg]:r.ONE,[vg]:r.SRC_COLOR,[Wf]:r.SRC_ALPHA,[wg]:r.SRC_ALPHA_SATURATE,[bg]:r.DST_COLOR,[Sg]:r.DST_ALPHA,[yg]:r.ONE_MINUS_SRC_COLOR,[Xf]:r.ONE_MINUS_SRC_ALPHA,[Tg]:r.ONE_MINUS_DST_COLOR,[Mg]:r.ONE_MINUS_DST_ALPHA,[Eg]:r.CONSTANT_COLOR,[Ag]:r.ONE_MINUS_CONSTANT_COLOR,[Cg]:r.CONSTANT_ALPHA,[Rg]:r.ONE_MINUS_CONSTANT_ALPHA};function ct(L,K,J,fe,oe,de,ae,pe,re,ee){if(L===Es){p===!0&&(De(r.BLEND),p=!1);return}if(p===!1&&(me(r.BLEND),p=!0),L!==fg){if(L!==g||ee!==A){if((v!==As||w!==As)&&(r.blendEquation(r.FUNC_ADD),v=As,w=As),ee)switch(L){case Aa:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ko:r.blendFunc(r.ONE,r.ONE);break;case Vf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Hf:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:ze("WebGLState: Invalid blending: ",L);break}else switch(L){case Aa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ko:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Vf:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hf:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",L);break}T=null,y=null,E=null,m=null,S.set(0,0,0),R=0,g=L,A=ee}return}oe=oe||K,de=de||J,ae=ae||fe,(K!==v||oe!==w)&&(r.blendEquationSeparate(Ie[K],Ie[oe]),v=K,w=oe),(J!==T||fe!==y||de!==E||ae!==m)&&(r.blendFuncSeparate(Ue[J],Ue[fe],Ue[de],Ue[ae]),T=J,y=fe,E=de,m=ae),(pe.equals(S)===!1||re!==R)&&(r.blendColor(pe.r,pe.g,pe.b,re),S.copy(pe),R=re),g=L,A=!1}function at(L,K){L.side===Zi?De(r.CULL_FACE):me(r.CULL_FACE);let J=L.side===Vn;K&&(J=!J),$(J),L.blending===Aa&&L.transparent===!1?ct(Es):ct(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);let fe=L.stencilWrite;o.setTest(fe),fe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),yt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?me(r.SAMPLE_ALPHA_TO_COVERAGE):De(r.SAMPLE_ALPHA_TO_COVERAGE)}function $(L){D!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),D=L)}function Qe(L){L!==cg?(me(r.CULL_FACE),L!==N&&(L===Gf?r.cullFace(r.BACK):L===hg?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):De(r.CULL_FACE),N=L}function Xt(L){L!==X&&(F&&r.lineWidth(L),X=L)}function yt(L,K,J){L?(me(r.POLYGON_OFFSET_FILL),(I!==K||B!==J)&&(I=K,B=J,a.getReversed()&&(K=-K,J=-J),r.polygonOffset(K,J))):De(r.POLYGON_OFFSET_FILL)}function it(L){L?me(r.SCISSOR_TEST):De(r.SCISSOR_TEST)}function Ft(L){L===void 0&&(L=r.TEXTURE0+V-1),P!==L&&(r.activeTexture(L),P=L)}function Ht(L,K,J){J===void 0&&(P===null?J=r.TEXTURE0+V-1:J=P);let fe=ne[J];fe===void 0&&(fe={type:void 0,texture:void 0},ne[J]=fe),(fe.type!==L||fe.texture!==K)&&(P!==J&&(r.activeTexture(J),P=J),r.bindTexture(L,K||be[L]),fe.type=L,fe.texture=K)}function O(){let L=ne[P];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ft(){try{r.compressedTexImage2D(...arguments)}catch(L){ze("WebGLState:",L)}}function ot(){try{r.compressedTexImage3D(...arguments)}catch(L){ze("WebGLState:",L)}}function ke(){try{r.texSubImage2D(...arguments)}catch(L){ze("WebGLState:",L)}}function ue(){try{r.texSubImage3D(...arguments)}catch(L){ze("WebGLState:",L)}}function ht(){try{r.compressedTexSubImage2D(...arguments)}catch(L){ze("WebGLState:",L)}}function Le(){try{r.compressedTexSubImage3D(...arguments)}catch(L){ze("WebGLState:",L)}}function Fe(){try{r.texStorage2D(...arguments)}catch(L){ze("WebGLState:",L)}}function C(){try{r.texStorage3D(...arguments)}catch(L){ze("WebGLState:",L)}}function M(){try{r.texImage2D(...arguments)}catch(L){ze("WebGLState:",L)}}function k(){try{r.texImage3D(...arguments)}catch(L){ze("WebGLState:",L)}}function se(L){return d[L]!==void 0?d[L]:r.getParameter(L)}function ie(L,K){d[L]!==K&&(r.pixelStorei(L,K),d[L]=K)}function ce(L){Z.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),Z.copy(L))}function ge(L){he.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),he.copy(L))}function H(L,K){let J=c.get(K);J===void 0&&(J=new WeakMap,c.set(K,J));let fe=J.get(L);fe===void 0&&(fe=r.getUniformBlockIndex(K,L.name),r.uniformBlockBinding(K,fe,fe),J.set(L,fe))}function Q(L,K,J){let oe=c.get(K).get(L);l[oe]!==J&&(r.bindBufferBase(r.UNIFORM_BUFFER,oe,J),l[oe]=J)}function le(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},d={},P=null,ne={},f={},l={},u=new WeakMap,_=[],x=null,p=!1,g=null,v=null,T=null,y=null,w=null,E=null,m=null,S=new Ye(0,0,0),R=0,A=!1,D=null,N=null,X=null,I=null,B=null,Z.set(0,0,r.canvas.width,r.canvas.height),he.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:me,disable:De,bindFramebuffer:_t,drawBuffers:Ee,useProgram:Ve,setBlending:ct,setMaterial:at,setFlipSided:$,setCullFace:Qe,setLineWidth:Xt,setPolygonOffset:yt,setScissorTest:it,activeTexture:Ft,bindTexture:Ht,unbindTexture:O,compressedTexImage2D:ft,compressedTexImage3D:ot,texImage2D:M,texImage3D:k,pixelStorei:ie,getParameter:se,updateUBOMapping:H,uniformBlockBinding:Q,texStorage2D:Fe,texStorage3D:C,texSubImage2D:ke,texSubImage3D:ue,compressedTexSubImage2D:ht,compressedTexSubImage3D:Le,scissor:ce,viewport:ge,reset:le}}function rT(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ke,h=new WeakMap,d=new Set,f,u=new WeakMap,_=new Set,x=new FinalizationRegistry(C=>_.delete(C)),p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,M){return p?new OffscreenCanvas(C,M):So("canvas")}function v(C,M,k){let se=1,ie=Fe(C);if((ie.width>k||ie.height>k)&&(se=k/Math.max(ie.width,ie.height)),se<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ce=Math.floor(se*ie.width),ge=Math.floor(se*ie.height);f===void 0&&(f=g(ce,ge));let H=M?g(ce,ge):f;return H.width=ce,H.height=ge,H.getContext("2d").drawImage(C,0,0,ce,ge),Be("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ce+"x"+ge+")."),H}else return"data"in C&&Be("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),C;return C}function T(C){return C.generateMipmaps}function y(C){r.generateMipmap(C)}function w(C){return C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?r.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function E(C,M,k,se,ie,ce=!1){if(C!==null){if(r[C]!==void 0)return r[C];Be("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let ge;se&&(ge=e.get("EXT_texture_norm16"),ge||Be("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let H=M;if(M===r.RED&&(k===r.FLOAT&&(H=r.R32F),k===r.HALF_FLOAT&&(H=r.R16F),k===r.UNSIGNED_BYTE&&(H=r.R8),k===r.UNSIGNED_SHORT&&ge&&(H=ge.R16_EXT),k===r.SHORT&&ge&&(H=ge.R16_SNORM_EXT)),M===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(H=r.R8UI),k===r.UNSIGNED_SHORT&&(H=r.R16UI),k===r.UNSIGNED_INT&&(H=r.R32UI),k===r.BYTE&&(H=r.R8I),k===r.SHORT&&(H=r.R16I),k===r.INT&&(H=r.R32I)),M===r.RG&&(k===r.FLOAT&&(H=r.RG32F),k===r.HALF_FLOAT&&(H=r.RG16F),k===r.UNSIGNED_BYTE&&(H=r.RG8),k===r.UNSIGNED_SHORT&&ge&&(H=ge.RG16_EXT),k===r.SHORT&&ge&&(H=ge.RG16_SNORM_EXT)),M===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(H=r.RG8UI),k===r.UNSIGNED_SHORT&&(H=r.RG16UI),k===r.UNSIGNED_INT&&(H=r.RG32UI),k===r.BYTE&&(H=r.RG8I),k===r.SHORT&&(H=r.RG16I),k===r.INT&&(H=r.RG32I)),M===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(H=r.RGB8UI),k===r.UNSIGNED_SHORT&&(H=r.RGB16UI),k===r.UNSIGNED_INT&&(H=r.RGB32UI),k===r.BYTE&&(H=r.RGB8I),k===r.SHORT&&(H=r.RGB16I),k===r.INT&&(H=r.RGB32I)),M===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(H=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(H=r.RGBA16UI),k===r.UNSIGNED_INT&&(H=r.RGBA32UI),k===r.BYTE&&(H=r.RGBA8I),k===r.SHORT&&(H=r.RGBA16I),k===r.INT&&(H=r.RGBA32I)),M===r.RGB&&(k===r.UNSIGNED_SHORT&&ge&&(H=ge.RGB16_EXT),k===r.SHORT&&ge&&(H=ge.RGB16_SNORM_EXT),k===r.UNSIGNED_INT_5_9_9_9_REV&&(H=r.RGB9_E5),k===r.UNSIGNED_INT_10F_11F_11F_REV&&(H=r.R11F_G11F_B10F)),M===r.RGBA){let Q=ce?yo:nt.getTransfer(ie);k===r.FLOAT&&(H=r.RGBA32F),k===r.HALF_FLOAT&&(H=r.RGBA16F),k===r.UNSIGNED_BYTE&&(H=Q===gt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT&&ge&&(H=ge.RGBA16_EXT),k===r.SHORT&&ge&&(H=ge.RGBA16_SNORM_EXT),k===r.UNSIGNED_SHORT_4_4_4_4&&(H=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(H=r.RGB5_A1)}return(H===r.R16F||H===r.R32F||H===r.RG16F||H===r.RG32F||H===r.RGBA16F||H===r.RGBA32F)&&e.get("EXT_color_buffer_float"),H}function m(C,M){let k;return C?M===null||M===Li||M===Rs?k=r.DEPTH24_STENCIL8:M===Di?k=r.DEPTH32F_STENCIL8:M===Ra&&(k=r.DEPTH24_STENCIL8,Be("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Li||M===Rs?k=r.DEPTH_COMPONENT24:M===Di?k=r.DEPTH_COMPONENT32F:M===Ra&&(k=r.DEPTH_COMPONENT16),k}function S(C,M){return T(C)===!0||C.isFramebufferTexture&&C.minFilter!==hn&&C.minFilter!==kn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function R(C){let M=new WeakRef(C);n.get(C).__ref=M,_.add(M),x.register(C,M,M)}function A(C){let M=n.get(C).__ref;M!==void 0&&(_.delete(M),x.unregister(M))}function D(C){X(C.target)}function N(C){I(C.target)}function X(C){C.removeEventListener("dispose",D),A(C),V(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&d.delete(C)}function I(C){C.removeEventListener("dispose",N),A(C),j(C)}function B(){for(let C of _){let M=C.deref();M!==void 0&&(M.isRenderTarget===!0?I(M):X(M))}_.clear(),d.clear()}function V(C){let M=n.get(C);if(M.__webglInit===void 0)return;let k=C.source,se=u.get(k);if(se){let ie=se[M.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&F(C),Object.keys(se).length===0&&u.delete(k)}n.remove(C)}function F(C){let M=n.get(C);r.deleteTexture(M.__webglTexture);let k=C.source,se=u.get(k);delete se[M.__cacheKey],a.memory.textures--}function j(C){let M=n.get(C);M.__depthDisposeCallback&&M.__depthDisposeCallback();let k=C.depthTexture;if(k&&k.renderTarget===C&&X(k),C.isWebGLCubeRenderTarget)for(let ie=0;ie<6;ie++){if(Array.isArray(M.__webglFramebuffer[ie]))for(let ce=0;ce<M.__webglFramebuffer[ie].length;ce++)r.deleteFramebuffer(M.__webglFramebuffer[ie][ce]);else r.deleteFramebuffer(M.__webglFramebuffer[ie]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[ie])}else{if(Array.isArray(M.__webglFramebuffer))for(let ie=0;ie<M.__webglFramebuffer.length;ie++)r.deleteFramebuffer(M.__webglFramebuffer[ie]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ie=0;ie<M.__webglColorRenderbuffer.length;ie++)M.__webglColorRenderbuffer[ie]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[ie]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let se=C.textures;for(let ie=0,ce=se.length;ie<ce;ie++){let ge=n.get(se[ie]);ge.__webglTexture&&(r.deleteTexture(ge.__webglTexture),a.memory.textures--),n.remove(se[ie])}n.remove(C)}let W=0;function P(){W=0}function ne(){return W}function Se(C){W=C}function Oe(){let C=W;return C>=i.maxTextures&&Be("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),W+=1,C}function Z(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.mipmapsAutoUpdate),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function he(C,M){let k=n.get(C);if(C.isVideoTexture&&ht(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&k.__version!==C.version){let se=C.image;if(se===null)Be("WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)Be("WebGLRenderer: Texture marked for update but image is incomplete");else{at(k,C,M);return}}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+M)}function ye(C,M){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){at(k,C,M);return}else C.isExternalTexture&&(k.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+M)}function be(C,M){let k=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&k.__version!==C.version){at(k,C,M);return}t.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+M)}function me(C,M){let k=n.get(C);if(C.version>0&&k.__version!==C.version){$(k,C,M);return}t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+M)}let De={[Ac]:r.REPEAT,[Hi]:r.CLAMP_TO_EDGE,[Cc]:r.MIRRORED_REPEAT},_t={[hn]:r.NEAREST,[Lg]:r.NEAREST_MIPMAP_NEAREST,[Go]:r.NEAREST_MIPMAP_LINEAR,[kn]:r.LINEAR,[sh]:r.LINEAR_MIPMAP_NEAREST,[Sr]:r.LINEAR_MIPMAP_LINEAR},Ee={[Og]:r.NEVER,[hd]:r.ALWAYS,[Fg]:r.LESS,[ld]:r.LEQUAL,[Bg]:r.EQUAL,[cd]:r.GEQUAL,[zg]:r.GREATER,[kg]:r.NOTEQUAL};function Ve(C,M){if(M.type===Di&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===kn||M.magFilter===sh||M.magFilter===Go||M.magFilter===Sr||M.minFilter===kn||M.minFilter===sh||M.minFilter===Go||M.minFilter===Sr)&&Be("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,De[M.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,De[M.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,De[M.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,_t[M.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,_t[M.minFilter]),M.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,Ee[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===hn||M.minFilter!==Go&&M.minFilter!==Sr||M.type===Di&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");r.texParameterf(C,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ie(C,M){let k=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",D),R(M));let se=M.source,ie=u.get(se);ie===void 0&&(ie={},u.set(se,ie));let ce=Z(M);if(ce!==C.__cacheKey){ie[ce]===void 0&&(ie[ce]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,k=!0),ie[ce].usedTimes++;let ge=ie[C.__cacheKey];ge!==void 0&&(ie[C.__cacheKey].usedTimes--,ge.usedTimes===0&&F(M)),C.__cacheKey=ce,C.__webglTexture=ie[ce].texture}return k}function Ue(C,M,k){return Math.floor(Math.floor(C/k)/M)}function ct(C,M,k,se){let ce=C.updateRanges;if(ce.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,M.width,M.height,k,se,M.data);else{ce.sort((L,K)=>L.start-K.start);let ge=0;for(let L=1;L<ce.length;L++){let K=ce[ge],J=ce[L],fe=K.start+K.count,oe=Ue(J.start,M.width,4),de=Ue(K.start,M.width,4);J.start<=fe+1&&oe===de&&Ue(J.start+J.count-1,M.width,4)===oe?K.count=Math.max(K.count,J.start+J.count-K.start):(++ge,ce[ge]=J)}ce.length=ge+1;let H=t.getParameter(r.UNPACK_ROW_LENGTH),Q=t.getParameter(r.UNPACK_SKIP_PIXELS),le=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,M.width);for(let L=0,K=ce.length;L<K;L++){let J=ce[L],fe=Math.floor(J.start/4),oe=Math.ceil(J.count/4),de=fe%M.width,ae=Math.floor(fe/M.width),pe=oe,re=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,de),t.pixelStorei(r.UNPACK_SKIP_ROWS,ae),t.texSubImage2D(r.TEXTURE_2D,0,de,ae,pe,re,k,se,M.data)}C.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,H),t.pixelStorei(r.UNPACK_SKIP_PIXELS,Q),t.pixelStorei(r.UNPACK_SKIP_ROWS,le)}}function at(C,M,k){let se=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(se=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(se=r.TEXTURE_3D);let ie=Ie(C,M),ce=M.source;t.bindTexture(se,C.__webglTexture,r.TEXTURE0+k);let ge=n.get(ce);if(ce.version!==ge.__version||ie===!0){if(t.activeTexture(r.TEXTURE0+k),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let re=nt.getPrimaries(nt.workingColorSpace),ee=M.colorSpace===br?null:nt.getPrimaries(M.colorSpace),_e=M.colorSpace===br||re===ee?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e)}t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment);let Q=v(M.image,!1,i.maxTextureSize);Q=Le(M,Q);let le=s.convert(M.format,M.colorSpace),L=s.convert(M.type),K=E(M.internalFormat,le,L,M.normalized,M.colorSpace,M.isVideoTexture);Ve(se,M);let J,fe=M.mipmaps,oe=M.isVideoTexture!==!0,de=ge.__version===void 0||ie===!0,ae=ce.dataReady,pe=S(M,Q);if(M.isDepthTexture)K=m(M.format===Mr,M.type),de&&(oe?t.texStorage2D(r.TEXTURE_2D,1,K,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,K,Q.width,Q.height,0,le,L,null));else if(M.isDataTexture)if(fe.length>0){oe&&de&&t.texStorage2D(r.TEXTURE_2D,pe,K,fe[0].width,fe[0].height);for(let re=0,ee=fe.length;re<ee;re++)J=fe[re],oe?ae&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,J.width,J.height,le,L,J.data):t.texImage2D(r.TEXTURE_2D,re,K,J.width,J.height,0,le,L,J.data);M.generateMipmaps=!1}else oe?(de&&t.texStorage2D(r.TEXTURE_2D,pe,K,Q.width,Q.height),ae&&ct(M,Q,le,L)):t.texImage2D(r.TEXTURE_2D,0,K,Q.width,Q.height,0,le,L,Q.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){oe&&de&&t.texStorage3D(r.TEXTURE_2D_ARRAY,pe,K,fe[0].width,fe[0].height,Q.depth);for(let re=0,ee=fe.length;re<ee;re++)if(J=fe[re],M.format!==Ui)if(le!==null)if(oe){if(ae)if(M.layerUpdates.size>0){let _e=_d(J.width,J.height,M.format,M.type);for(let te of M.layerUpdates){let Te=J.data.subarray(te*_e/J.data.BYTES_PER_ELEMENT,(te+1)*_e/J.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,te,J.width,J.height,1,le,Te)}}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,J.width,J.height,Q.depth,le,J.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,K,J.width,J.height,Q.depth,0,J.data,0,0);else Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?ae&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,J.width,J.height,Q.depth,le,L,J.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,K,J.width,J.height,Q.depth,0,le,L,J.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{oe&&de&&t.texStorage2D(r.TEXTURE_2D,pe,K,fe[0].width,fe[0].height);for(let re=0,ee=fe.length;re<ee;re++)J=fe[re],M.format!==Ui?le!==null?oe?ae&&t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,J.width,J.height,le,J.data):t.compressedTexImage2D(r.TEXTURE_2D,re,K,J.width,J.height,0,J.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?ae&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,J.width,J.height,le,L,J.data):t.texImage2D(r.TEXTURE_2D,re,K,J.width,J.height,0,le,L,J.data)}else if(M.isDataArrayTexture)if(oe){if(de&&t.texStorage3D(r.TEXTURE_2D_ARRAY,pe,K,Q.width,Q.height,Q.depth),ae)if(M.layerUpdates.size>0){let re=_d(Q.width,Q.height,M.format,M.type);for(let ee of M.layerUpdates){let _e=Q.data.subarray(ee*re/Q.data.BYTES_PER_ELEMENT,(ee+1)*re/Q.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ee,Q.width,Q.height,1,le,L,_e)}M.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,le,L,Q.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,K,Q.width,Q.height,Q.depth,0,le,L,Q.data);else if(M.isData3DTexture)oe?(de&&t.texStorage3D(r.TEXTURE_3D,pe,K,Q.width,Q.height,Q.depth),ae&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,le,L,Q.data)):t.texImage3D(r.TEXTURE_3D,0,K,Q.width,Q.height,Q.depth,0,le,L,Q.data);else if(M.isFramebufferTexture){if(de)if(oe)t.texStorage2D(r.TEXTURE_2D,pe,K,Q.width,Q.height);else{let re=Q.width,ee=Q.height;for(let _e=0;_e<pe;_e++)t.texImage2D(r.TEXTURE_2D,_e,K,re,ee,0,le,L,null),re>>=1,ee>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in r){let re=r.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),Q.parentNode!==re){re.appendChild(Q),d.add(M),re.onpaint=ee=>{let _e=ee.changedElements;for(let te of d)_e.includes(te.image)&&(te.needsUpdate=!0)},re.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,Q);else{let _e=r.RGBA,te=r.RGBA,Te=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,_e,te,Te,Q)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(fe.length>0){if(oe&&de){let re=Fe(fe[0]);t.texStorage2D(r.TEXTURE_2D,pe,K,re.width,re.height)}for(let re=0,ee=fe.length;re<ee;re++)J=fe[re],oe?ae&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,le,L,J):t.texImage2D(r.TEXTURE_2D,re,K,le,L,J);M.generateMipmaps=!1}else if(oe){if(de){let re=Fe(Q);t.texStorage2D(r.TEXTURE_2D,pe,K,re.width,re.height)}ae&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le,L,Q)}else t.texImage2D(r.TEXTURE_2D,0,K,le,L,Q);T(M)&&M.mipmapsAutoUpdate===!0&&y(se),ge.__version=ce.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function $(C,M,k){if(M.image.length!==6)return;let se=Ie(C,M),ie=M.source;t.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+k);let ce=n.get(ie);if(ie.version!==ce.__version||se===!0){t.activeTexture(r.TEXTURE0+k);let ge=nt.getPrimaries(nt.workingColorSpace),H=M.colorSpace===br?null:nt.getPrimaries(M.colorSpace),Q=M.colorSpace===br||ge===H?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Q);let le=M.isCompressedTexture||M.image[0].isCompressedTexture,L=M.image[0]&&M.image[0].isDataTexture,K=[];for(let te=0;te<6;te++)!le&&!L?K[te]=v(M.image[te],!0,i.maxCubemapSize):K[te]=L?M.image[te].image:M.image[te],K[te]=Le(M,K[te]);let J=K[0],fe=s.convert(M.format,M.colorSpace),oe=s.convert(M.type),de=E(M.internalFormat,fe,oe,M.normalized,M.colorSpace),ae=M.isVideoTexture!==!0,pe=ce.__version===void 0||se===!0,re=ie.dataReady,ee=S(M,J);Ve(r.TEXTURE_CUBE_MAP,M);let _e;if(M.isDepthTexture){if(de=m(M.format===Mr,M.type),pe)if(ae)t.texStorage2D(r.TEXTURE_CUBE_MAP,1,de,J.width,J.height);else for(let te=0;te<6;te++)t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,de,J.width,J.height,0,fe,oe,null)}else if(le){ae&&pe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,de,J.width,J.height);for(let te=0;te<6;te++){_e=K[te].mipmaps;for(let Te=0;Te<_e.length;Te++){let je=_e[Te];M.format!==Ui?fe!==null?ae?re&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te,0,0,je.width,je.height,fe,je.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te,de,je.width,je.height,0,je.data):Be("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ae?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te,0,0,je.width,je.height,fe,oe,je.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te,de,je.width,je.height,0,fe,oe,je.data)}}}else{if(_e=M.mipmaps,ae&&pe){_e.length>0&&ee++;let te=Fe(K[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ee,de,te.width,te.height)}for(let te=0;te<6;te++)if(L){ae?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,K[te].width,K[te].height,fe,oe,K[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,de,K[te].width,K[te].height,0,fe,oe,K[te].data);for(let Te=0;Te<_e.length;Te++){let He=_e[Te].image[te].image;ae?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te+1,0,0,He.width,He.height,fe,oe,He.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te+1,de,He.width,He.height,0,fe,oe,He.data)}}else{ae?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,fe,oe,K[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,de,fe,oe,K[te]);for(let Te=0;Te<_e.length;Te++){let je=_e[Te];ae?re&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te+1,0,0,fe,oe,je.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Te+1,de,fe,oe,je.image[te])}}}T(M)&&M.mipmapsAutoUpdate===!0&&y(r.TEXTURE_CUBE_MAP),ce.__version=ie.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Qe(C,M,k,se,ie,ce){let ge=s.convert(k.format,k.colorSpace),H=s.convert(k.type),Q=E(k.internalFormat,ge,H,k.normalized,k.colorSpace),le=n.get(M),L=n.get(k);if(L.__renderTarget=M,!le.__hasExternalTextures){let K=Math.max(1,M.width>>ce),J=Math.max(1,M.height>>ce);ie===r.TEXTURE_3D||ie===r.TEXTURE_2D_ARRAY?t.texImage3D(ie,ce,Q,K,J,M.depth,0,ge,H,null):t.texImage2D(ie,ce,Q,K,J,0,ge,H,null)}t.bindFramebuffer(r.FRAMEBUFFER,C),ue(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,se,ie,L.__webglTexture,0,ke(M)):(ie===r.TEXTURE_2D||ie>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,se,ie,L.__webglTexture,ce),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Xt(C,M,k){if(r.bindRenderbuffer(r.RENDERBUFFER,C),M.depthBuffer){let se=M.depthTexture,ie=se&&se.isDepthTexture?se.type:null,ce=m(M.stencilBuffer,ie),ge=M.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;ue(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ke(M),ce,M.width,M.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ke(M),ce,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,ce,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ge,r.RENDERBUFFER,C)}else{let se=M.textures;for(let ie=0;ie<se.length;ie++){let ce=se[ie],ge=s.convert(ce.format,ce.colorSpace),H=s.convert(ce.type),Q=E(ce.internalFormat,ge,H,ce.normalized,ce.colorSpace);ue(M)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ke(M),Q,M.width,M.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ke(M),Q,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,Q,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function yt(C,M,k){let se=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=n.get(M.depthTexture);ie.__renderTarget=M;let ce=se?M.depthTexture.image[0]:M.depthTexture.image;(!ie.__webglTexture||ce.width!==M.width||ce.height!==M.height)&&(ce.width=M.width,ce.height=M.height,M.depthTexture.needsUpdate=!0),se?me(M.depthTexture,0):he(M.depthTexture,0);let ge=ie.__webglTexture,H=ke(M),Q=se?r.TEXTURE_CUBE_MAP_POSITIVE_X+k:r.TEXTURE_2D,le=M.depthTexture.format===Mr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(M.depthTexture.format===xr)ue(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,le,Q,ge,0,H):r.framebufferTexture2D(r.FRAMEBUFFER,le,Q,ge,0);else if(M.depthTexture.format===Mr)ue(M)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,le,Q,ge,0,H):r.framebufferTexture2D(r.FRAMEBUFFER,le,Q,ge,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(C){let M=n.get(C),k=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let se=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),se){let ie=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,se.removeEventListener("dispose",ie)};se.addEventListener("dispose",ie),M.__depthDisposeCallback=ie}M.__boundDepthTexture=se}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(k)for(let se=0;se<6;se++)yt(M.__webglFramebuffer[se],C,se);else C.texture.mipmaps.length>0?yt(M.__webglFramebuffer[0],C,0):yt(M.__webglFramebuffer,C,0);else if(k){M.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[se]),M.__webglDepthbuffer[se]===void 0)M.__webglDepthbuffer[se]=r.createRenderbuffer(),Xt(M.__webglDepthbuffer[se],C,!1);else{let ie=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer[se];r.bindRenderbuffer(r.RENDERBUFFER,ce),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,ce)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=r.createRenderbuffer(),Xt(M.__webglDepthbuffer,C,!1);else{let ie=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ce=M.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ce),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,ce)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ft(C,M,k){let se=n.get(C);M!==void 0&&Qe(se.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&it(C)}function Ht(C){let M=C.texture,k=n.get(C),se=n.get(M);C.addEventListener("dispose",N),R(C);let ie=C.textures,ce=C.isWebGLCubeRenderTarget===!0,ge=ie.length>1;if(ge||(se.__webglTexture===void 0&&(se.__webglTexture=r.createTexture()),se.__version=M.version,a.memory.textures++),ce){k.__webglFramebuffer=[];for(let H=0;H<6;H++)if(M.mipmaps.length>0){k.__webglFramebuffer[H]=[];for(let Q=0;Q<M.mipmaps.length;Q++)k.__webglFramebuffer[H][Q]=r.createFramebuffer()}else k.__webglFramebuffer[H]=r.createFramebuffer()}else{if(M.mipmaps.length>0){k.__webglFramebuffer=[];for(let H=0;H<M.mipmaps.length;H++)k.__webglFramebuffer[H]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(ge)for(let H=0,Q=ie.length;H<Q;H++){let le=n.get(ie[H]);le.__webglTexture===void 0&&(le.__webglTexture=r.createTexture(),a.memory.textures++)}if(C.samples>0&&ue(C)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let H=0;H<ie.length;H++){let Q=ie[H];k.__webglColorRenderbuffer[H]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[H]);let le=s.convert(Q.format,Q.colorSpace),L=s.convert(Q.type),K=E(Q.internalFormat,le,L,Q.normalized,Q.colorSpace,C.isXRRenderTarget===!0),J=ke(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,J,K,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+H,r.RENDERBUFFER,k.__webglColorRenderbuffer[H])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),Xt(k.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ce){t.bindTexture(r.TEXTURE_CUBE_MAP,se.__webglTexture),Ve(r.TEXTURE_CUBE_MAP,M);for(let H=0;H<6;H++)if(M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)Qe(k.__webglFramebuffer[H][Q],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+H,Q);else Qe(k.__webglFramebuffer[H],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);T(M)?y(r.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&r.texParameteri(r.TEXTURE_CUBE_MAP,r.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}else if(ge){for(let H=0,Q=ie.length;H<Q;H++){let le=ie[H],L=n.get(le),K=r.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(K=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(K,L.__webglTexture),Ve(K,le),Qe(k.__webglFramebuffer,C,le,r.COLOR_ATTACHMENT0+H,K,0),T(le)&&y(K)}t.unbindTexture()}else{let H=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(H=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(H,se.__webglTexture),Ve(H,M),M.mipmaps.length>0)for(let Q=0;Q<M.mipmaps.length;Q++)Qe(k.__webglFramebuffer[Q],C,M,r.COLOR_ATTACHMENT0,H,Q);else Qe(k.__webglFramebuffer,C,M,r.COLOR_ATTACHMENT0,H,0);T(M)?y(H):M.mipmaps.length>0&&r.texParameteri(H,r.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&it(C)}function O(C){let M=C.textures;for(let k=0,se=M.length;k<se;k++){let ie=M[k];if(T(ie)&&ie.mipmapsAutoUpdate===!0){let ce=w(C),ge=n.get(ie).__webglTexture;t.bindTexture(ce,ge),y(ce),t.unbindTexture()}}}let ft=[];function ot(C){if(C.samples>0){if(ue(C)===!1){let M=C.textures,k=C.width,se=C.height,ie=r.COLOR_BUFFER_BIT,ce=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=n.get(C),H=M.length>1;if(H)for(let le=0;le<M.length;le++)t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let le=0;le<M.length;le++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ie|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ie|=r.STENCIL_BUFFER_BIT)),H){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ge.__webglColorRenderbuffer[le]);let L=n.get(M[le]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,L,0)}r.blitFramebuffer(0,0,k,se,0,0,k,se,ie,r.NEAREST),l===!0&&(ft.length=0,ft.push(r.COLOR_ATTACHMENT0+le),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&ft.push(ce),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ft))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),H)for(let le=0;le<M.length;le++){t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.RENDERBUFFER,ge.__webglColorRenderbuffer[le]);let L=n.get(M[le]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ge.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+le,r.TEXTURE_2D,L,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let M=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[M])}}}function ke(C){return Math.min(i.maxSamples,C.samples)}function ue(C){let M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ht(C){let M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Le(C,M){let k=C.colorSpace,se=C.format,ie=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||k!==vo&&k!==br&&(nt.getTransfer(k)===gt?(se!==Ui||ie!==Jn)&&Be("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",k)),M}function Fe(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Oe,this.resetTextureUnits=P,this.getTextureUnits=ne,this.setTextureUnits=Se,this.setTexture2D=he,this.setTexture2DArray=ye,this.setTexture3D=be,this.setTextureCube=me,this.rebindTextures=Ft,this.setupRenderTarget=Ht,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=ue,this.dispose=B}function sT(r,e){function t(n,i=br){let s,a=nt.getTransfer(i);if(n===Jn)return r.UNSIGNED_BYTE;if(n===oh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===lh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===id)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===rd)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===td)return r.BYTE;if(n===nd)return r.SHORT;if(n===Ra)return r.UNSIGNED_SHORT;if(n===ah)return r.INT;if(n===Li)return r.UNSIGNED_INT;if(n===Di)return r.FLOAT;if(n===Ni)return r.HALF_FLOAT;if(n===sd)return r.ALPHA;if(n===ad)return r.RGB;if(n===Ui)return r.RGBA;if(n===xr)return r.DEPTH_COMPONENT;if(n===Mr)return r.DEPTH_STENCIL;if(n===od)return r.RED;if(n===ch)return r.RED_INTEGER;if(n===jr)return r.RG;if(n===hh)return r.RG_INTEGER;if(n===uh)return r.RGBA_INTEGER;if(n===Vo||n===Ho||n===Wo||n===Xo)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Vo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Vo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ho)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===fh||n===dh||n===ph||n===mh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===fh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===dh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ph)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gh||n===_h||n===xh||n===vh||n===yh||n===qo||n===Sh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===gh||n===_h)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===xh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===vh)return s.COMPRESSED_R11_EAC;if(n===yh)return s.COMPRESSED_SIGNED_R11_EAC;if(n===qo)return s.COMPRESSED_RG11_EAC;if(n===Sh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Mh||n===bh||n===Th||n===wh||n===Eh||n===Ah||n===Ch||n===Rh||n===Ph||n===Ih||n===Lh||n===Dh||n===Nh||n===Uh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Mh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Th)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Eh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ah)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ch)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Rh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ph)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ih)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uh)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Oh||n===Fh||n===Bh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Oh)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zh||n===kh||n===Yo||n===Gh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===zh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===kh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yo)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}var aT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,oT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Id=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Po(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new $i({vertexShader:aT,fragmentShader:oT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new hi(new Io(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ld=class extends Xi{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,f=null,u=null,_=null,x=typeof XRWebGLBinding<"u",p=new Id,g={},v=t.getContextAttributes(),T=null,y=null,w=[],E=[],m=new Ke,S=null,R=null,A=new An;A.viewport=new Lt;let D=new An;D.viewport=new Lt;let N=[A,D],X=new th,I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let he=w[Z];return he===void 0&&(he=new va,w[Z]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Z){let he=w[Z];return he===void 0&&(he=new va,w[Z]=he),he.getGripSpace()},this.getHand=function(Z){let he=w[Z];return he===void 0&&(he=new va,w[Z]=he),he.getHandSpace()};function V(Z){let he=E.indexOf(Z.inputSource);if(he===-1)return;let ye=w[he];ye!==void 0&&(ye.update(Z.inputSource,Z.frame,c||a),ye.dispatchEvent({type:Z.type,data:Z.inputSource}))}function F(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",j);for(let Z=0;Z<w.length;Z++){let he=E[Z];he!==null&&(E[Z]=null,w[Z].disconnect(he))}I=null,B=null,p.reset();for(let Z in g)delete g[Z];if(e.setRenderTarget(T),u=null,f=null,d=null,i=null,y=null,Oe.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(m.width,m.height,!1),R!==null){let Z=R.camera;Z.fov=R.fov,Z.zoom=R.zoom,Z.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){s=Z,n.isPresenting===!0&&Be("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,n.isPresenting===!0&&Be("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return f!==null?f:u},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(T=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",F),i.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(m),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,be=null,me=null;v.depth&&(me=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=v.stencil?Mr:xr,be=v.stencil?Rs:Li);let De={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(De),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),y=new ci(f.textureWidth,f.textureHeight,{format:Ui,type:Jn,depthTexture:new yr(f.textureWidth,f.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let ye={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};u=new XRWebGLLayer(i,t,ye),i.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),y=new ci(u.framebufferWidth,u.framebufferHeight,{format:Ui,type:Jn,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),Oe.setContext(i),Oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function j(Z){for(let he=0;he<Z.removed.length;he++){let ye=Z.removed[he],be=E.indexOf(ye);be>=0&&(E[be]=null,w[be].disconnect(ye))}for(let he=0;he<Z.added.length;he++){let ye=Z.added[he],be=E.indexOf(ye);if(be===-1){for(let De=0;De<w.length;De++)if(De>=E.length){E.push(ye),be=De;break}else if(E[De]===null){E[De]=ye,be=De;break}if(be===-1)break}let me=w[be];me&&me.connect(ye)}}function W(Z,he){he===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(he.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let he=Z.near,ye=Z.far;p.texture!==null&&(p.depthNear>0&&(he=p.depthNear),p.depthFar>0&&(ye=p.depthFar)),X.near=D.near=A.near=he,X.far=D.far=A.far=ye,(I!==X.near||B!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),I=X.near,B=X.far),X.layers.mask=Z.layers.mask|6,A.layers.mask=X.layers.mask&-5,D.layers.mask=X.layers.mask&-3;let be=Z.parent,me=X.cameras;W(X,be);for(let De=0;De<me.length;De++)W(me[De],be);X.projectionMatrix.copy(A.projectionMatrix),X.projectionMatrixInverse.copy(A.projectionMatrixInverse),R===null&&Z.isPerspectiveCamera&&(R={camera:Z,fov:Z.fov,zoom:Z.zoom}),P(Z,X,be)};function P(Z,he,ye){ye===null?Z.matrix.copy(he.matrixWorld):(Z.matrix.copy(ye.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(he.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(he.projectionMatrix),Z.projectionMatrixInverse.copy(he.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Pc*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(f===null&&u===null))return l},this.setFoveation=function(Z){l=Z,f!==null&&(f.fixedFoveation=Z),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=Z)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(X)},this.getCameraTexture=function(Z){return g[Z]};let ne=null;function Se(Z,he){if(h=he.getViewerPose(c||a),_=he,h!==null){let ye=h.views;u!==null&&(e.setRenderTargetFramebuffer(y,u.framebuffer),e.setRenderTarget(y));let be=!1;ye.length!==X.cameras.length&&(X.cameras.length=0,be=!0);for(let Ee=0;Ee<ye.length;Ee++){let Ve=ye[Ee],Ie=null;if(u!==null)Ie=u.getViewport(Ve);else{let ct=d.getViewSubImage(f,Ve);Ie=ct.viewport,Ee===0&&(e.setRenderTargetTextures(y,ct.colorTexture,ct.depthStencilTexture),e.setRenderTarget(y))}let Ue=N[Ee];Ue===void 0&&(Ue=new An,Ue.layers.enable(Ee),Ue.viewport=new Lt,N[Ee]=Ue),Ue.matrix.fromArray(Ve.transform.matrix),Ue.matrix.decompose(Ue.position,Ue.quaternion,Ue.scale),Ue.projectionMatrix.fromArray(Ve.projectionMatrix),Ue.projectionMatrixInverse.copy(Ue.projectionMatrix).invert(),Ue.viewport.set(Ie.x,Ie.y,Ie.width,Ie.height),Ee===0&&(X.matrix.copy(Ue.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),be===!0&&X.cameras.push(Ue)}let me=i.enabledFeatures;if(me&&me.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let Ee=d.getDepthInformation(ye[0]);Ee&&Ee.isValid&&Ee.texture&&p.init(Ee,i.renderState)}if(me&&me.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let Ee=0;Ee<ye.length;Ee++){let Ve=ye[Ee].camera;if(Ve){let Ie=g[Ve];Ie||(Ie=new Po,g[Ve]=Ie);let Ue=d.getCameraImage(Ve);Ie.sourceTexture=Ue}}}}for(let ye=0;ye<w.length;ye++){let be=E[ye],me=w[ye];be!==null&&me!==void 0&&me.update(be,he,c||a)}ne&&ne(Z,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),_=null}let Oe=new x_;Oe.setAnimationLoop(Se),this.setAnimationLoop=function(Z){ne=Z},this.dispose=function(){}}},lT=new Et,C_=new Ge;C_.set(-1,0,0,0,1,0,0,0,1);function cT(r,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,pd(r)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function i(p,g,v,T,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?s(p,g):g.isMeshLambertMaterial?(s(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(p,g),d(p,g)):g.isMeshPhongMaterial?(s(p,g),h(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(p,g),f(p,g),g.isMeshPhysicalMaterial&&u(p,g,y)):g.isMeshMatcapMaterial?(s(p,g),_(p,g)):g.isMeshDepthMaterial?s(p,g):g.isMeshDistanceMaterial?(s(p,g),x(p,g)):g.isMeshNormalMaterial?s(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,v,T):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Vn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Vn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let v=e.get(g),T=v.envMap,y=v.envMapRotation;T&&(p.envMap.value=T,p.envMapRotation.value.setFromMatrix4(lT.makeRotationFromEuler(y)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(C_),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,v,T){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*v,p.scale.value=T*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function f(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function u(p,g,v){p.ior.value=g.ior,g.diffuseRoughness>0&&(p.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=g.diffuseRoughnessMap,t(g.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Vn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,g){g.matcap&&(p.matcap.value=g.matcap)}function x(p,g){let v=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function hT(r,e,t,n){let i={},s={};function a(v,T){let y=T.program;n.uniformBlockBinding(v,y,i[v.id])}function o(v,T){let y=i[v.id];y===void 0&&(_(v),y=l(v),i[v.id]=y,v.addEventListener("dispose",p));let w=T.program;n.updateUBOMapping(v,w);let E=e.render.frame;s[v.id]!==E&&(c(v),s[v.id]=E)}function l(v){let T=r.createBuffer(),y=v.__size,w=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,T),r.bufferData(r.UNIFORM_BUFFER,y,w),r.bindBuffer(r.UNIFORM_BUFFER,null),T}function c(v){let T=i[v.id],y=v.uniforms,w=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,T);for(let E=0,m=y.length;E<m;E++){let S=y[E];if(Array.isArray(S))for(let R=0,A=S.length;R<A;R++)h(S[R],E,R,w);else h(S,E,0,w)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(v,T,y,w){if(f(v,T,y,w)===!0){let E=v.__offset,m=v.value;if(Array.isArray(m)){let S=0;for(let R=0;R<m.length;R++){let A=m[R],D=x(A,!0);d(A,v.__data,S),S+=D.storage/Float32Array.BYTES_PER_ELEMENT}}else d(m,v.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,E,v.__data)}}function d(v,T,y){typeof v=="number"||typeof v=="boolean"?T[y]=v:v.isMatrix3?(T[y]=v.elements[0],T[y+1]=v.elements[1],T[y+2]=v.elements[2],T[y+3]=0,T[y+4]=v.elements[3],T[y+5]=v.elements[4],T[y+6]=v.elements[5],T[y+7]=0,T[y+8]=v.elements[6],T[y+9]=v.elements[7],T[y+10]=v.elements[8],T[y+11]=0):ArrayBuffer.isView(v)?T.set(v.subarray(0,T.length-y),y):v.toArray(T,y)}function f(v,T,y,w){let E=v.value,m=T+"_"+y;if(Array.isArray(E)){w[m]===void 0&&(w[m]=[]);let S=w[m],R=!1;for(let A=0;A<E.length;A++)u(E[A],S,A)===!0&&(R=!0);return R}return u(E,w,m)}function u(v,T,y){if(T[y]===void 0)return typeof v=="number"||typeof v=="boolean"?T[y]=v:ArrayBuffer.isView(v)?T[y]=v.slice():T[y]=v.clone(),!0;{let w=T[y];if(typeof v=="number"||typeof v=="boolean"){if(w!==v)return T[y]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(w.equals(v)===!1)return w.copy(v),!0}}return!1}function _(v){let T=v.uniforms,y=0,w=16;for(let m=0,S=T.length;m<S;m++){let R=Array.isArray(T[m])?T[m]:[T[m]];for(let A=0,D=R.length;A<D;A++){let N=R[A],X=Array.isArray(N.value)?N.value:[N.value],I=Array.isArray(T[m])||Array.isArray(N.value),B=y;for(let F=0,j=X.length;F<j;F++){let W=X[F],P=x(W,I),ne=y%w,Se=ne%P.boundary,Oe=ne+Se;y+=Se,Oe!==0&&w-Oe<P.storage&&(y+=w-Oe),F===0&&(B=y),y+=P.storage}let V=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new V((y-B)/Float32Array.BYTES_PER_ELEMENT),N.__offset=B}}let E=y%w;return E>0&&(y+=w-E),v.__size=y,v.__cache={},this}function x(v,T){let y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=16,y.storage=48):v.isMatrix4?(y.boundary=16,y.storage=64):v.isTexture?Be("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(y.boundary=16,y.storage=v.byteLength):Be("WebGLRenderer: Unsupported uniform value type.",v),T===!0&&(y.boundary=16,y.storage=Math.ceil(y.storage/16)*16),y}function p(v){let T=v.target;T.removeEventListener("dispose",p),r.deleteBuffer(i[T.id]),delete i[T.id],delete s[T.id]}function g(){for(let v in i)r.deleteBuffer(i[v]);i={},s={}}return{bind:a,update:o,dispose:g}}var uT=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ki=null;function fT(){return Ki===null&&(Ki=new Nc(uT,16,16,jr,Ni),Ki.name="DFG_LUT",Ki.minFilter=kn,Ki.magFilter=kn,Ki.wrapS=Hi,Ki.wrapT=Hi,Ki.generateMipmaps=!1,Ki.needsUpdate=!0),Ki}var qh=class{constructor(e={}){let{canvas:t=Vg(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:u=Jn}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;let x=u,p=new Set([uh,hh,ch]),g=new Set([Jn,Li,Ra,Rs,oh,lh]),v=new Uint32Array(4),T=new Int32Array(4),y={textures:[],min:[],max:[],resolution:[]},w=null,E=null,m=[],S=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,D=!1,N=null,X=null,I=null,B=null;this._outputColorSpace=li;let V=0,F=0,j=null,W=-1,P=null,ne=new Lt,Se=new Lt,Oe=null,Z=new Ye(0),he=0,ye=t.width,be=t.height,me=1,De=null,_t=null,Ee=new Lt(0,0,ye,be),Ve=new Lt(0,0,ye,be),Ie=!1,Ue=new qr,ct=new Uc,at=!1,$=!1,Qe=new Et,Xt=new G,yt=new Lt,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ft=!1;function Ht(){return j===null?me:1}let O=n;function ft(b,U){return t.getContext(b,U)}let ot,ke,ue,ht,Le,Fe,C,M,k,se,ie,ce,ge,H,Q,le,L,K,J,fe,oe,de,ae;try{let b={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",te,!1),O===null){let U="webgl2";if(O=ft(U,b),O===null)throw ft(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}pe()}catch(b){throw t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",te,!1),ze("WebGLRenderer: "+b.message),b}function pe(){ot=new bM(O),ot.init(),oe=new sT(O,ot),ke=new fM(O,ot,e,oe),ue=new iT(O,ot),ke.reversedDepthBuffer&&f&&ue.buffers.depth.setReversed(!0),X=O.createFramebuffer(),I=O.createFramebuffer(),B=O.createFramebuffer(),ht=new EM(O),Le=new Hb,Fe=new rT(O,ot,ue,Le,ke,oe,ht),C=new MM(A),M=new Cv(O),de=new hM(O,M),k=new TM(O,M,ht,de),se=new CM(O,k,M,de,ht),K=new AM(O,ke,Fe),Q=new dM(Le),ie=new Vb(A,C,ot,ke,de,Q),ce=new cT(A,Le),ge=new Xb,H=new Kb(ot),L=new cM(A,C,ue,se,_,l),le=new nT(A,se,ke),ae=new hT(O,ht,ke,ue),J=new uM(O,ot,ht),fe=new wM(O,ot,ht),ht.programs=ie.programs,A.capabilities=ke,A.extensions=ot,A.properties=Le,A.renderLists=ge,A.shadowMap=le,A.state=ue,A.info=ht}x!==Jn&&(R=new PM(x,t.width,t.height,o,i,s));let re=new Ld(A,O);this.xr=re,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let b=ot.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ot.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(b){b!==void 0&&(me=b,this.setSize(ye,be,!1))},this.getSize=function(b){return b.set(ye,be)},this.setSize=function(b,U,Y=!0){if(re.isPresenting){Be("WebGLRenderer: Can't change size while VR device is presenting.");return}ye=b,be=U,t.width=Math.floor(b*me),t.height=Math.floor(U*me),Y===!0&&(t.style.width=b+"px",t.style.height=U+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(ye*me,be*me).floor()},this.setDrawingBufferSize=function(b,U,Y){ye=b,be=U,me=Y,t.width=Math.floor(b*Y),t.height=Math.floor(U*Y),this.setViewport(0,0,b,U)},this.setEffects=function(b){if(x===Jn){ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let U=0;U<b.length;U++)if(b[U].isOutputPass===!0){Be("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ne)},this.getViewport=function(b){return b.copy(Ee)},this.setViewport=function(b,U,Y,z){b.isVector4?Ee.set(b.x,b.y,b.z,b.w):Ee.set(b,U,Y,z),ue.viewport(ne.copy(Ee).multiplyScalar(Ht()).round())},this.getScissor=function(b){return b.copy(Ve)},this.setScissor=function(b,U,Y,z){b.isVector4?Ve.set(b.x,b.y,b.z,b.w):Ve.set(b,U,Y,z),ue.scissor(Se.copy(Ve).multiplyScalar(Ht()).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(b){ue.setScissorTest(Ie=b)},this.setOpaqueSort=function(b){De=b},this.setTransparentSort=function(b){_t=b},this.getClearColor=function(b){return b.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(b=!0,U=!0,Y=!0){let z=0;if(b){let q=!1;if(j!==null){let ve=j.texture.format;q=p.has(ve)}if(q){let ve=j.texture.type,Ce=g.has(ve),xe=L.getClearColor(),we=L.getClearAlpha(),Ne=xe.r,We=xe.g,et=xe.b;Ce?(v[0]=Ne,v[1]=We,v[2]=et,v[3]=we,O.clearBufferuiv(O.COLOR,0,v)):(T[0]=Ne,T[1]=We,T[2]=et,T[3]=we,O.clearBufferiv(O.COLOR,0,T))}else z|=O.COLOR_BUFFER_BIT}U&&(z|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&O.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),N=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",te,!1),L.dispose(),ge.dispose(),H.dispose(),Fe.dispose(),Le.dispose(),C.dispose(),se.dispose(),k.dispose(),de.dispose(),ae.dispose(),ie.dispose(),re.dispose(),re.removeEventListener("sessionstart",St),re.removeEventListener("sessionend",pt),Qt.stop()};function ee(b){b.preventDefault(),fd("WebGLRenderer: Context Lost."),D=!0}function _e(){fd("WebGLRenderer: Context Restored."),D=!1;let b=ht.autoReset,U=le.enabled,Y=le.autoUpdate,z=le.needsUpdate,q=le.type;pe(),ht.autoReset=b,le.enabled=U,le.autoUpdate=Y,le.needsUpdate=z,le.type=q}function te(b){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Te(b){let U=b.target;U.removeEventListener("dispose",Te),je(U)}function je(b){He(b),Le.remove(b)}function He(b){let U=Le.get(b).programs;U!==void 0&&(U.forEach(function(Y){ie.releaseProgram(Y)}),b.isShaderMaterial&&ie.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,Y,z,q,ve){U===null&&(U=it);let Ce=q.isMesh&&q.matrixWorld.determinantAffine()<0,xe=pi(b,U,Y,z,q);ue.setMaterial(z,Ce);let we=Y.index,Ne=1;if(z.wireframe===!0){if(we=k.getWireframeAttribute(Y),we===void 0)return;Ne=2}let We=Y.drawRange,et=Y.attributes.position,Re=We.start*Ne,tt=(We.start+We.count)*Ne;ve!==null&&(Re=Math.max(Re,ve.start*Ne),tt=Math.min(tt,(ve.start+ve.count)*Ne)),we!==null?(Re=Math.max(Re,0),tt=Math.min(tt,we.count)):et!=null&&(Re=Math.max(Re,0),tt=Math.min(tt,et.count));let $t=tt-Re;if($t<0||$t===1/0)return;de.setup(q,z,xe,Y,we);let wt,bt=J;if(we!==null&&(wt=M.get(we),bt=fe,bt.setIndex(wt)),q.isMesh)z.wireframe===!0?(ue.setLineWidth(z.wireframeLinewidth*Ht()),bt.setMode(O.LINES)):bt.setMode(O.TRIANGLES);else if(q.isLine){let gn=z.linewidth;gn===void 0&&(gn=1),ue.setLineWidth(gn*Ht()),q.isLineSegments?bt.setMode(O.LINES):q.isLineLoop?bt.setMode(O.LINE_LOOP):bt.setMode(O.LINE_STRIP)}else q.isPoints?bt.setMode(O.POINTS):q.isSprite&&bt.setMode(O.TRIANGLES);if(q.isBatchedMesh)if(ot.get("WEBGL_multi_draw"))bt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let gn=q._multiDrawStarts,Pe=q._multiDrawCounts,In=q._multiDrawCount,dt=we?M.get(we).bytesPerElement:1,es=Le.get(z).currentProgram.getUniforms();for(let _n=0;_n<In;_n++)es.setValue(O,"_gl_DrawID",_n),bt.render(gn[_n]/dt,Pe[_n])}else if(q.isInstancedMesh)bt.renderInstances(Re,$t,q.count);else if(Y.isInstancedBufferGeometry){let gn=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Pe=Math.min(Y.instanceCount,gn);bt.renderInstances(Re,$t,Pe)}else bt.render(Re,$t)};function Ct(b,U,Y,z){N!==null&&b.isNodeMaterial&&N.setObject(z,b),at===!0&&Q.setState(b,Y,!1),b.transparent===!0&&b.side===Zi&&b.forceSinglePass===!1?(b.side=Vn,b.needsUpdate=!0,Qn(b,U,z),b.side=Qr,b.needsUpdate=!0,Qn(b,U,z),b.side=Zi):Qn(b,U,z)}this.compile=function(b,U,Y=null){Y===null&&(Y=b),N!==null&&N.renderStart(b,U,Y),E=H.get(Y),E.init(U),S.push(E),Y.traverseVisible(function(q){q.isLight&&q.layers.test(U.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),b!==Y&&b.traverseVisible(function(q){q.isLight&&q.layers.test(U.layers)&&(E.pushLight(q),q.castShadow&&E.pushShadow(q))}),E.setupLights(),N!==null&&N.updateLights(E.state.lightsArray),$=this.localClippingEnabled,at=Q.init(this.clippingPlanes,$),at===!0&&Q.setGlobalState(this.clippingPlanes,U),N!==null&&le.render(E.state.shadowsArray,Y,U);let z=new Set;return b.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let ve=q.material;if(ve)if(Array.isArray(ve))for(let Ce=0;Ce<ve.length;Ce++){let xe=ve[Ce];Ct(xe,Y,U,q),z.add(xe)}else Ct(ve,Y,U,q),z.add(ve)}),E=S.pop(),N!==null&&N.renderEnd(),z},this.compileAsync=function(b,U,Y=null){let z=this.compile(b,U,Y);return new Promise(q=>{function ve(){if(z.forEach(function(Ce){let we=Le.get(Ce).currentProgram;(we===void 0||we.isReady())&&z.delete(Ce)}),z.size===0){q(b);return}setTimeout(ve,10)}ot.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let qt=null;function Rt(b){qt&&qt(b)}function St(){Qt.stop()}function pt(){Qt.start()}let Qt=new x_;Qt.setAnimationLoop(Rt),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(b){qt=b,re.setAnimationLoop(b),b===null?Qt.stop():Qt.start()},re.addEventListener("sessionstart",St),re.addEventListener("sessionend",pt),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;N!==null&&N.renderStart(b,U);let Y=re.enabled===!0&&re.isPresenting===!0,z=R!==null&&(j===null||Y)&&R.begin(A,j);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(re.cameraAutoUpdate===!0&&re.updateCamera(U),U=re.getCamera()),b.isScene===!0&&b.onBeforeRender(A,b,U,j),E=H.get(b,S.length),E.init(U),E.state.textureUnits=Fe.getTextureUnits(),S.push(E),Qe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?ct.setFromArrayCamera(U):Ue.setFromProjectionMatrix(Qe,Mi,U.reversedDepth),$=this.localClippingEnabled,at=Q.init(this.clippingPlanes,$),w=ge.get(b,m.length),w.init(),m.push(w),this.info.render.frame++,re.enabled===!0&&re.isPresenting===!0){let Ce=A.xr.getDepthSensingMesh();Ce!==null&&Mt(Ce,U,-1/0,A.sortObjects)}Mt(b,U,0,A.sortObjects),w.finish(),N!==null&&N.updateLights(E.state.lightsArray),A.sortObjects===!0&&w.sort(De,_t),Ft=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Ft&&L.addToRenderList(w,b),this.info.autoReset===!0&&this.info.reset(),at===!0&&Q.beginShadows();let q=E.state.shadowsArray;if(le.render(q,b,U),at===!0&&Q.endShadows(),(z&&R.hasRenderPass())===!1){let Ce=w.opaque,xe=w.transmissive;if(E.setupLights(),U.isArrayCamera){let we=U.cameras;if(xe.length>0)for(let Ne=0,We=we.length;Ne<We;Ne++){let et=we[Ne];Kn(Ce,xe,b,et)}Ft&&L.render(b);for(let Ne=0,We=we.length;Ne<We;Ne++){let et=we[Ne];mn(w,b,et,et.viewport)}}else xe.length>0&&Kn(Ce,xe,b,U),Ft&&L.render(b),mn(w,b,U)}j!==null&&F===0&&(Fe.updateMultisampleRenderTarget(j),Fe.updateRenderTargetMipmap(j)),z&&R.end(A),b.isScene===!0&&b.onAfterRender(A,b,U),de.resetDefaultState(),W=-1,P=null,S.pop(),S.length>0?(E=S[S.length-1],Fe.setTextureUnits(E.state.textureUnits),at===!0&&Q.setGlobalState(A.clippingPlanes,E.state.camera)):E=null,m.pop(),m.length>0?w=m[m.length-1]:w=null,N!==null&&N.renderEnd()};function Mt(b,U,Y,z){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){let Ce=U.isArrayCamera?ct:Ue;if(!b.frustumCulled||b.intersectsFrustum(Ce)){z&&yt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Qe);let xe=se.update(b),we=b.material;we.visible&&w.push(b,xe,we,Y,yt.z,null,U)}}else if(b.isMesh||b.isLine||b.isPoints){let Ce=U.isArrayCamera?ct:Ue;if(!b.frustumCulled||b.intersectsFrustum(Ce)){let xe=se.update(b),we=b.material;if(z&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),yt.copy(b.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),yt.copy(xe.boundingSphere.center)),yt.applyMatrix4(b.matrixWorld).applyMatrix4(Qe)),Array.isArray(we)){let Ne=xe.groups;for(let We=0,et=Ne.length;We<et;We++){let Re=Ne[We],tt=we[Re.materialIndex];tt&&tt.visible&&w.push(b,xe,tt,Y,yt.z,Re,U)}}else we.visible&&w.push(b,xe,we,Y,yt.z,null,U)}}}let ve=b.children;for(let Ce=0,xe=ve.length;Ce<xe;Ce++)Mt(ve[Ce],U,Y,z)}function mn(b,U,Y,z){let{opaque:q,transmissive:ve,transparent:Ce}=b;E.setupLightsView(Y),at===!0&&Q.setGlobalState(A.clippingPlanes,Y),z&&ue.viewport(ne.copy(z)),q.length>0&&Bt(q,U,Y),ve.length>0&&Bt(ve,U,Y),Ce.length>0&&Bt(Ce,U,Y),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function Kn(b,U,Y,z){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[z.id]===void 0){let Re=ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[z.id]=new ci(1,1,{generateMipmaps:!0,type:Re?Ni:Jn,minFilter:Sr,samples:Math.max(4,ke.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:nt.workingColorSpace})}let ve=E.state.transmissionRenderTarget[z.id],Ce=z.viewport||ne;ve.setSize(Ce.z*A.transmissionResolutionScale,Ce.w*A.transmissionResolutionScale);let xe=A.getRenderTarget(),we=A.getActiveCubeFace(),Ne=A.getActiveMipmapLevel();A.setRenderTarget(ve),A.getClearColor(Z),he=A.getClearAlpha(),he<1&&A.setClearColor(16777215,.5),A.clear(),Ft&&L.render(Y);let We=A.toneMapping;A.toneMapping=Ji;let et=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),E.setupLightsView(z),at===!0&&Q.setGlobalState(A.clippingPlanes,z),Bt(b,Y,z),Fe.updateMultisampleRenderTarget(ve),Fe.updateRenderTargetMipmap(ve),ot.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let tt=0,$t=U.length;tt<$t;tt++){let wt=U[tt],{object:bt,geometry:gn,material:Pe,group:In}=wt;if(Pe.side===Zi&&bt.layers.test(z.layers)){let dt=Pe.side;Pe.side=Vn,Pe.needsUpdate=!0,Yt(bt,Y,z,gn,Pe,In),Pe.side=dt,Pe.needsUpdate=!0,Re=!0}}Re===!0&&(Fe.updateMultisampleRenderTarget(ve),Fe.updateRenderTargetMipmap(ve))}A.setRenderTarget(xe,we,Ne),A.setClearColor(Z,he),et!==void 0&&(z.viewport=et),A.toneMapping=We}function Bt(b,U,Y){let z=U.isScene===!0?U.overrideMaterial:null;for(let q=0,ve=b.length;q<ve;q++){let Ce=b[q],{object:xe,geometry:we,group:Ne}=Ce,We=Ce.material;We.allowOverride===!0&&z!==null&&(We=z),xe.layers.test(Y.layers)&&Yt(xe,U,Y,we,We,Ne)}}function Yt(b,U,Y,z,q,ve){N!==null&&q.isNodeMaterial&&N.setObject(b,q),b.onBeforeRender(A,U,Y,z,q,ve),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(A,U,Y,z,b,ve),q.transparent===!0&&q.side===Zi&&q.forceSinglePass===!1?(q.side=Vn,q.needsUpdate=!0,A.renderBufferDirect(Y,U,z,q,b,ve),q.side=Qr,q.needsUpdate=!0,A.renderBufferDirect(Y,U,z,q,b,ve),q.side=Zi):A.renderBufferDirect(Y,U,z,q,b,ve),b.onAfterRender(A,U,Y,z,q,ve)}function jt(b){let U=0;for(let Y of b)Y.texture!==null&&U++;return U}function Qn(b,U,Y){U.isScene!==!0&&(U=it);let z=Le.get(b),q=E.state.lights,ve=E.state.shadowsArray,Ce=q.state.version,xe=ie.getParameters(b,q.state,ve,U,Y,E.state.lightProbeGridArray),we=ie.getProgramCacheKey(xe),Ne=z.programs;z.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?U.environment:null,z.fog=U.fog;let We=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;z.envMap=C.get(b.envMap||z.environment,We),z.envMapRotation=z.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Ne===void 0&&(b.addEventListener("dispose",Te),Ne=new Map,z.programs=Ne,z.programVariants=new Map);let et=Ne.get(we);if(et!==void 0){if(z.currentProgram===et&&z.lightsStateVersion===Ce)return zt(b,xe),et}else xe.uniforms=ie.getUniforms(b),N!==null&&b.isNodeMaterial&&N.build(b,Y,xe),b.onBeforeCompile(xe,A),et=ie.acquireProgram(xe,we),Ne.set(we,et),z.uniforms=xe.uniforms;let Re=z.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=Q.uniform),zt(b,xe),z.needsLights=jo(b),z.lightsStateVersion=Ce,z.needsLights&&(Re.ambientLightColor.value=q.state.ambient,Re.lightProbe.value=q.state.probe,Re.sunLights.value=q.state.sun,Re.sunLightShadows.value=q.state.sunShadow,Re.directionalLights.value=q.state.directional,Re.directionalLightShadows.value=q.state.directionalShadow,Re.spotLights.value=q.state.spot,Re.spotLightShadows.value=q.state.spotShadow,Re.rectAreaLights.value=q.state.rectArea,Re.ltc_1.value=q.state.rectAreaLTC1,Re.ltc_2.value=q.state.rectAreaLTC2,Re.pointLights.value=q.state.point,Re.pointLightShadows.value=q.state.pointShadow,Re.hemisphereLights.value=q.state.hemi,Re.sunShadowMatrix.value=q.state.sunShadowMatrix,Re.sunShadowCascade.value=q.state.sunShadowCascade,Re.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Re.spotLightMatrix.value=q.state.spotLightMatrix,Re.spotLightMap.value=q.state.spotLightMap,Re.pointShadowMatrix.value=q.state.pointShadowMatrix),z.numLightProbeGrids=jt(E.state.lightProbeGridArray),z.currentProgram=et,z.uniformsList=null,et}function Ds(b,U,Y,z,q){let ve=Le.get(b),Ce=ve.currentProgram.id+","+z+","+q,xe=ve.programVariants.get(Ce);return xe===void 0?(xe=Qn(b,U,Y),ve.programVariants.set(Ce,xe)):(ve.currentProgram=xe,ve.uniformsList=null,ve.outputColorSpace=z,ve.toneMapping=q),xe}function en(b){if(b.uniformsList===null){let U=b.currentProgram.getUniforms();b.uniformsList=Pa.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function zt(b,U){let Y=Le.get(b);Y.outputColorSpace=U.outputColorSpace,Y.batching=U.batching,Y.batchingColor=U.batchingColor,Y.instancing=U.instancing,Y.instancingColor=U.instancingColor,Y.instancingMorph=U.instancingMorph,Y.skinning=U.skinning,Y.morphTargets=U.morphTargets,Y.morphNormals=U.morphNormals,Y.morphColors=U.morphColors,Y.morphTargetsCount=U.morphTargetsCount,Y.numClippingPlanes=U.numClippingPlanes,Y.numIntersection=U.numClipIntersection,Y.vertexAlphas=U.vertexAlphas,Y.vertexTangents=U.vertexTangents,Y.toneMapping=U.toneMapping}function pi(b,U,Y,z,q){U.isScene!==!0&&(U=it),Fe.resetTextureUnits();let ve=U.fog,Ce=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?U.environment:null,xe=j===null?A.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:nt.workingColorSpace,we=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,Ne=C.get(z.envMap||Ce,we),We=z.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,et=!!Y.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Re=!!Y.morphAttributes.position,tt=!!Y.morphAttributes.normal,$t=!!Y.morphAttributes.color,wt=Ji;z.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(wt=A.toneMapping);let bt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,gn=bt!==void 0?bt.length:0,Pe=Le.get(z),In=E.state.lights;if(at===!0&&($===!0||b!==P)){let Dt=b===P&&z.id===W;Q.setState(z,b,Dt)}let dt=!1,es=!1;z.version===Pe.__version?Pe.needsLights&&Pe.lightsStateVersion!==In.state.version||q.isBatchedMesh&&Pe.batching===!1||!q.isBatchedMesh&&Pe.batching===!0||q.isBatchedMesh&&Pe.batchingColor===!0&&q._colorsTexture===null||q.isBatchedMesh&&Pe.batchingColor===!1&&q._colorsTexture!==null||q.isInstancedMesh&&Pe.instancing===!1||!q.isInstancedMesh&&Pe.instancing===!0||q.isSkinnedMesh&&Pe.skinning===!1||!q.isSkinnedMesh&&Pe.skinning===!0||q.isInstancedMesh&&Pe.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Pe.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Pe.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Pe.instancingMorph===!1&&q.morphTexture!==null||Pe.envMap!==Ne||z.fog===!0&&Pe.fog!==ve||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==Q.numPlanes||Pe.numIntersection!==Q.numIntersection)||Pe.vertexAlphas!==We||Pe.vertexTangents!==et||Pe.morphTargets!==Re||Pe.morphNormals!==tt||Pe.morphColors!==$t||Pe.morphTargetsCount!==gn||Pe.numLightProbeGrids!==jt(E.state.lightProbeGridArray)?dt=!0:(Pe.outputColorSpace!==xe||Pe.toneMapping!==wt)&&(es=!0):(dt=!0,Pe.__version=z.version);let _n=Pe.currentProgram;(dt===!0||es===!0)&&(_n=es===!0?Ds(z,U,q,xe,wt):Qn(z,U,q),N&&z.isNodeMaterial&&N.onUpdateProgram(z,_n,Pe));let el=!1,wr=!1,ts=!1,lt=_n.getUniforms(),un=Pe.uniforms;if(ue.useProgram(_n.program)&&(el=!0,wr=!0,ts=!0),z.id!==W&&(W=z.id,wr=!0),el||P!==b){ue.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),lt.setValue(O,"projectionMatrix",b.projectionMatrix),lt.setValue(O,"viewMatrix",b.matrixWorldInverse);let an=lt.map.cameraPosition;an!==void 0&&an.setValue(O,Xt.setFromMatrixPosition(b.matrixWorld)),ke.logarithmicDepthBuffer&&lt.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&lt.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),P!==b&&(P=b,wr=!0,ts=!0)}if(Pe.needsLights&&(In.state.sunShadowMap.length>0&&lt.setValue(O,"sunShadowMap",In.state.sunShadowMap,Fe),In.state.directionalShadowMap.length>0&&lt.setValue(O,"directionalShadowMap",In.state.directionalShadowMap,Fe),In.state.spotShadowMap.length>0&&lt.setValue(O,"spotShadowMap",In.state.spotShadowMap,Fe),In.state.pointShadowMap.length>0&&lt.setValue(O,"pointShadowMap",In.state.pointShadowMap,Fe)),q.isSkinnedMesh){lt.setOptional(O,q,"bindMatrix"),lt.setOptional(O,q,"bindMatrixInverse");let Dt=q.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),lt.setValue(O,"boneTexture",Dt.boneTexture,Fe))}q.isBatchedMesh&&(lt.setOptional(O,q,"batchingTexture"),lt.setValue(O,"batchingTexture",q._matricesTexture,Fe),lt.setOptional(O,q,"batchingIdTexture"),lt.setValue(O,"batchingIdTexture",q._indirectTexture,Fe),lt.setOptional(O,q,"batchingColorTexture"),q._colorsTexture!==null&&lt.setValue(O,"batchingColorTexture",q._colorsTexture,Fe));let Ti=Y.morphAttributes;if((Ti.position!==void 0||Ti.normal!==void 0||Ti.color!==void 0)&&K.update(q,Y,_n),(wr||Pe.receiveShadow!==q.receiveShadow)&&(Pe.receiveShadow=q.receiveShadow,lt.setValue(O,"receiveShadow",q.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&U.environment!==null&&(un.envMapIntensity.value=U.environmentIntensity),un.dfgLUT!==void 0&&(un.dfgLUT.value=fT()),wr){if(lt.setValue(O,"toneMappingExposure",A.toneMappingExposure),Pe.needsLights&&La(un,ts),ve&&z.fog===!0&&ce.refreshFogUniforms(un,ve),ce.refreshMaterialUniforms(un,z,me,be,E.state.transmissionRenderTarget[b.id]),Pe.needsLights&&Pe.numLightProbeGrids>0){let Dt=y,an=0;for(let ji of E.state.lightProbeGridArray)ji.texture!==null&&(Dt.textures[an]=ji.texture,Dt.min[an]=ji.boundingBox.min,Dt.max[an]=ji.boundingBox.max,Dt.resolution[an]=ji.resolution,an++);for(let ji in Dt)Dt[ji].length=an;un.probesSH.value=Dt.textures,un.probesMin.value=Dt.min,un.probesMax.value=Dt.max,un.probesResolution.value=Dt.resolution}Pa.upload(O,en(Pe),un,Fe)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Pa.upload(O,en(Pe),un,Fe),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&lt.setValue(O,"center",q.center),lt.setValue(O,"modelViewMatrix",q.modelViewMatrix),lt.setValue(O,"normalMatrix",q.normalMatrix),lt.setValue(O,"modelMatrix",q.matrixWorld),z.uniformsGroups!==void 0){let Dt=z.uniformsGroups;for(let an=0,ji=Dt.length;an<ji;an++){let zd=Dt[an];ae.update(zd,_n),ae.bind(zd,_n)}}return _n}function La(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.sunLights.needsUpdate=U,b.sunLightShadows.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function jo(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(b,U,Y){let z=Le.get(b);z.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),Le.get(b.texture).__webglTexture=U,Le.get(b.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:Y,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,U){let Y=Le.get(b);Y.__webglFramebuffer=U,Y.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,Y=0){j=b,V=U,F=Y;let z=null,q=!1,ve=!1;if(b){let xe=Le.get(b);if(xe.__useDefaultFramebuffer!==void 0){ue.bindFramebuffer(O.FRAMEBUFFER,xe.__webglFramebuffer),ne.copy(b.viewport),Se.copy(b.scissor),Oe=b.scissorTest,ue.viewport(ne),ue.scissor(Se),ue.setScissorTest(Oe),W=-1;return}else if(xe.__webglFramebuffer===void 0)Fe.setupRenderTarget(b);else if(xe.__hasExternalTextures)Fe.rebindTextures(b,Le.get(b.texture).__webglTexture,Le.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let We=b.depthTexture;if(xe.__boundDepthTexture!==We){if(We!==null&&Le.has(We)&&(b.width!==We.image.width||b.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(b)}}let we=b.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ve=!0);let Ne=Le.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ne[U])?z=Ne[U][Y]:z=Ne[U],q=!0):b.samples>0&&Fe.useMultisampledRTT(b)===!1?z=Le.get(b).__webglMultisampledFramebuffer:Array.isArray(Ne)?z=Ne[Y]:z=Ne,ne.copy(b.viewport),Se.copy(b.scissor),Oe=b.scissorTest}else ne.copy(Ee).multiplyScalar(me).floor(),Se.copy(Ve).multiplyScalar(me).floor(),Oe=Ie;if(Y!==0&&(z=X),ue.bindFramebuffer(O.FRAMEBUFFER,z)&&ue.drawBuffers(b,z),ue.viewport(ne),ue.scissor(Se),ue.setScissorTest(Oe),q){let xe=Le.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,Y)}else if(ve){let xe=U;for(let we=0;we<b.textures.length;we++){let Ne=Le.get(b.textures[we]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+we,Ne.__webglTexture,Y,xe)}}else if(b!==null&&Y!==0){let xe=Le.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,xe.__webglTexture,Y)}W=-1};function Tr(b){let U=Le.get(b);return(U.__readFormat!==b.format||U.__readType!==b.type)&&(U.__readFormat=b.format,U.__readType=b.type,U.__formatReadable=ke.textureFormatReadable(b.format),U.__typeReadable=ke.textureTypeReadable(b.type)),U}this.readRenderTargetPixels=function(b,U,Y,z,q,ve,Ce,xe=0){if(!(b&&b.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=Le.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(we=we[Ce],Array.isArray(we)&&(we=we[0])),we){ue.bindFramebuffer(O.FRAMEBUFFER,we);try{let Ne=b.textures[xe],We=Ne.format,et=Ne.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+xe);let Re=Tr(Ne);if(Re.__formatReadable===!1){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-z&&Y>=0&&Y<=b.height-q&&O.readPixels(U,Y,z,q,oe.convert(We),oe.convert(et),ve)}finally{let Ne=j!==null?Le.get(j).__webglFramebuffer:null;ue.bindFramebuffer(O.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(b,U,Y,z,q,ve,Ce,xe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=Le.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(we=we[Ce],Array.isArray(we)&&(we=we[0])),we)if(U>=0&&U<=b.width-z&&Y>=0&&Y<=b.height-q){ue.bindFramebuffer(O.FRAMEBUFFER,we);let Ne=b.textures[xe],We=Ne.format,et=Ne.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+xe);let Re=Tr(Ne);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let tt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,tt),O.bufferData(O.PIXEL_PACK_BUFFER,ve.byteLength,O.STREAM_READ),O.readPixels(U,Y,z,q,oe.convert(We),oe.convert(et),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let $t=j!==null?Le.get(j).__webglFramebuffer:null;ue.bindFramebuffer(O.FRAMEBUFFER,$t);let wt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Wg(O,wt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,tt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,ve),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(tt),O.deleteSync(wt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,U=null,Y=0){let z=Math.pow(2,-Y),q=Math.floor(b.image.width*z),ve=Math.floor(b.image.height*z),Ce=U!==null?U.x:0,xe=U!==null?U.y:0;Fe.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,Y,0,0,Ce,xe,q,ve),ue.unbindTexture()},this.copyTextureToTexture=function(b,U,Y=null,z=null,q=0,ve=0){let Ce,xe,we,Ne,We,et,Re,tt,$t,wt=b.isCompressedTexture?b.mipmaps[ve]:b.image;if(Y!==null)Ce=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,we=Y.isBox3?Y.max.z-Y.min.z:1,Ne=Y.min.x,We=Y.min.y,et=Y.isBox3?Y.min.z:0;else{let lt=Math.pow(2,-q);Ce=Math.floor(wt.width*lt),xe=Math.floor(wt.height*lt),b.isDataArrayTexture?we=wt.depth:b.isData3DTexture?we=Math.floor(wt.depth*lt):we=1,Ne=0,We=0,et=0}z!==null?(Re=z.x,tt=z.y,$t=z.z):(Re=0,tt=0,$t=0);let bt=oe.convert(U.format),gn=oe.convert(U.type),Pe;U.isData3DTexture?(Fe.setTexture3D(U,0),Pe=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Fe.setTexture2DArray(U,0),Pe=O.TEXTURE_2D_ARRAY):(Fe.setTexture2D(U,0),Pe=O.TEXTURE_2D),ue.activeTexture(O.TEXTURE0),ue.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),ue.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),ue.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);let In=ue.getParameter(O.UNPACK_ROW_LENGTH),dt=ue.getParameter(O.UNPACK_IMAGE_HEIGHT),es=ue.getParameter(O.UNPACK_SKIP_PIXELS),_n=ue.getParameter(O.UNPACK_SKIP_ROWS),el=ue.getParameter(O.UNPACK_SKIP_IMAGES);ue.pixelStorei(O.UNPACK_ROW_LENGTH,wt.width),ue.pixelStorei(O.UNPACK_IMAGE_HEIGHT,wt.height),ue.pixelStorei(O.UNPACK_SKIP_PIXELS,Ne),ue.pixelStorei(O.UNPACK_SKIP_ROWS,We),ue.pixelStorei(O.UNPACK_SKIP_IMAGES,et);let wr=b.isDataArrayTexture||b.isData3DTexture,ts=U.isDataArrayTexture||U.isData3DTexture;if(b.isDepthTexture){let lt=Le.get(b),un=Le.get(U),Ti=Le.get(lt.__renderTarget),Dt=Le.get(un.__renderTarget);ue.bindFramebuffer(O.READ_FRAMEBUFFER,Ti.__webglFramebuffer),ue.bindFramebuffer(O.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let an=0;an<we;an++)wr&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.get(b).__webglTexture,q,et+an),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Le.get(U).__webglTexture,ve,$t+an)),O.blitFramebuffer(Ne,We,Ne+Ce,We+xe,Re,tt,Re+Ce,tt+xe,O.DEPTH_BUFFER_BIT,O.NEAREST);ue.bindFramebuffer(O.READ_FRAMEBUFFER,null),ue.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(q!==0||b.isRenderTargetTexture||Le.has(b)){let lt=Le.get(b),un=Le.get(U);ue.bindFramebuffer(O.READ_FRAMEBUFFER,I),ue.bindFramebuffer(O.DRAW_FRAMEBUFFER,B);for(let Ti=0;Ti<we;Ti++)wr?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,lt.__webglTexture,q,et+Ti):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,lt.__webglTexture,q),ts?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,un.__webglTexture,ve,$t+Ti):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,un.__webglTexture,ve),q!==0?O.blitFramebuffer(Ne,We,Ne+Ce,We+xe,Re,tt,Re+Ce,tt+xe,O.COLOR_BUFFER_BIT,O.NEAREST):ts?O.copyTexSubImage3D(Pe,ve,Re,tt,$t+Ti,Ne,We,Ce,xe):O.copyTexSubImage2D(Pe,ve,Re,tt,Ne,We,Ce,xe);ue.bindFramebuffer(O.READ_FRAMEBUFFER,null),ue.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ts?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Pe,ve,Re,tt,$t,Ce,xe,we,bt,gn,wt.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(Pe,ve,Re,tt,$t,Ce,xe,we,bt,wt.data):O.texSubImage3D(Pe,ve,Re,tt,$t,Ce,xe,we,bt,gn,wt):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,ve,Re,tt,Ce,xe,bt,gn,wt.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,ve,Re,tt,wt.width,wt.height,bt,wt.data):O.texSubImage2D(O.TEXTURE_2D,ve,Re,tt,Ce,xe,bt,gn,wt);ue.pixelStorei(O.UNPACK_ROW_LENGTH,In),ue.pixelStorei(O.UNPACK_IMAGE_HEIGHT,dt),ue.pixelStorei(O.UNPACK_SKIP_PIXELS,es),ue.pixelStorei(O.UNPACK_SKIP_ROWS,_n),ue.pixelStorei(O.UNPACK_SKIP_IMAGES,el),ve===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&O.generateMipmap(Pe),ue.unbindTexture()},this.initRenderTarget=function(b){Le.get(b).__webglFramebuffer===void 0&&Fe.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Fe.setTextureCube(b,0):b.isData3DTexture?Fe.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Fe.setTexture2DArray(b,0):Fe.setTexture2D(b,0),ue.unbindTexture()},this.resetState=function(){V=0,F=0,j=null,ue.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=nt._getUnpackColorSpace()}};var R_=[{color:16096779,center:new G(-4.2,-.6,0),nodes:4,speed:.45},{color:1096065,center:new G(4.2,-.6,0),nodes:4,speed:.9},{color:3718648,center:new G(0,2.4,-1.5),nodes:4,speed:1.4}];function P_(r){let e;try{e=new qh({canvas:r,antialias:!0,alpha:!0,powerPreference:"low-power"})}catch{return null}let t=window.matchMedia("(prefers-reduced-motion: reduce)").matches;e.setPixelRatio(Math.min(window.devicePixelRatio,2));let n=new To,i=new An(50,1,.1,200);i.position.set(0,.5,15),n.add(new Bo(16777215,.35));let s=new Ii;n.add(s);let a=new Ta(.42,1),o=new ba(new Ta(.62,0)),l=new Lo(.07,8,8),c=[];R_.forEach((m,S)=>{let R=new Ii;R.position.copy(m.center);let A=new Fo(m.color,18,12,2);R.add(A);let D=[];for(let B=0;B<m.nodes;B++){let V=B/m.nodes*Math.PI*2+S,F=new G(Math.cos(V)*1.6,Math.sin(V)*1.6,Math.sin(V*2)*.6);D.push(F);let j=new hi(a,new Do({color:m.color,emissive:m.color,emissiveIntensity:.55,roughness:.35,metalness:.2}));j.position.copy(F),R.add(j);let W=new ws(o,new Yr({color:m.color,transparent:!0,opacity:.35}));W.position.copy(F),W.userData.spin=.3+Math.random()*.4,R.add(W)}let N=[],X=[];for(let B=0;B<D.length;B++)for(let V=B+1;V<D.length;V++)N.push([D[B],D[V]]),X.push(...D[B].toArray(),...D[V].toArray());let I=new Cn;I.setAttribute("position",new It(X,3)),R.add(new ws(I,new Yr({color:m.color,transparent:!0,opacity:.22})));for(let B=0;B<6;B++){let V=new hi(l,new Sa({color:m.color,transparent:!0,blending:ko}));R.add(V),c.push({mesh:V,edges:N,t:Math.random(),edge:N[B%N.length],speed:m.speed*(.6+Math.random()*.6)})}s.add(R)});let h=new Ii,d=new $r(.55,.55,.55),f=new ba(d),u=22;for(let m=0;m<u;m++){let S=m/u*Math.PI*2,R=new Ye(R_[m%3].color),A=new ws(f,new Yr({color:R,transparent:!0,opacity:.55}));A.position.set(Math.cos(S)*8.5,Math.sin(S*3)*.5-.3,Math.sin(S)*8.5-3),A.rotation.set(S,S*.5,0),h.add(A)}h.rotation.x=.28,s.add(h);let _=[];for(let m=0;m<900;m++)_.push((Math.random()-.5)*60,(Math.random()-.5)*36,-Math.random()*40-4);let x=new Cn;x.setAttribute("position",new It(_,3));let p=new Ao(x,new Ma({color:9741240,size:.05,transparent:!0,opacity:.6}));n.add(p);let g={x:0,y:0};window.addEventListener("pointermove",m=>{g.x=(m.clientX/window.innerWidth-.5)*2,g.y=(m.clientY/window.innerHeight-.5)*2},{passive:!0});let v=()=>{let{clientWidth:m,clientHeight:S}=r;!m||!S||(e.setSize(m,S,!1),i.aspect=m/S,i.position.z=m<640?21:15,i.updateProjectionMatrix())};new ResizeObserver(v).observe(r),v();let T=!0;new IntersectionObserver(([m])=>{T=m.isIntersecting}).observe(r);let y=new G,w=performance.now(),E=m=>{if(requestAnimationFrame(E),!T)return;let S=Math.min((m-w)/1e3,.05);w=m;let R=t?0:1;s.rotation.y+=(g.x*.25-s.rotation.y)*.04,s.rotation.x+=(g.y*.12-s.rotation.x)*.04,h.rotation.y+=S*.08*R,p.rotation.y+=S*.004*R,s.children.forEach((A,D)=>{A!==h&&(A.rotation.z+=S*.12*(D%2?1:-1)*R,A.children.forEach(N=>{N.userData.spin&&(N.rotation.y+=S*N.userData.spin*R)}))}),c.forEach(A=>{A.t+=S*A.speed*R,A.t>=1&&(A.t=0,A.edge=A.edges[Math.random()*A.edges.length|0],Math.random()<.5&&(A.edge=[A.edge[1],A.edge[0]])),y.lerpVectors(A.edge[0],A.edge[1],A.t),A.mesh.position.copy(y),A.mesh.material.opacity=Math.sin(A.t*Math.PI)}),e.render(n,i)};return requestAnimationFrame(E),{renderer:e}}var fi=["pow","pos","pbft"],Pn={pow:"PoW",pos:"PoS",pbft:"PBFT"},bi={pow:"#f59e0b",pos:"#10b981",pbft:"#38bdf8"},I_={zero:"#fb7185",partial:"#fbbf24",full:"#34d399"},Dd={3:"final_n3_baseline",4:"final_n4_baseline"};async function L_(r="data/results.json"){let e=await fetch(r,{cache:"no-cache"});if(!e.ok)throw new Error(`No se pudo cargar ${r}: HTTP ${e.status}`);return new Nd(await e.json())}var Nd=class{constructor(e){this.raw=e,this.groups=e.groups,this.runs=e.runs}group(e,t){return this.groups.find(n=>n.experiment===e&&n.algorithm===t)}baseline(e,t){return this.group(Dd[e],t)}sweep(){return this.groups.filter(e=>e.algorithm==="pow"&&e.nodes===3&&e.difficulty_bits!=null).sort((e,t)=>e.difficulty_bits-t.difficulty_bits)}baselineRuns(){return this.runs.filter(e=>Object.values(Dd).includes(e.experiment_name))}ratio(e,t){return this.baseline(e,"pow").j_per_tx.estimate/this.baseline(e,t).j_per_tx.estimate}},ut={num:(r,e=2)=>r==null||Number.isNaN(r)?"\u2014":Number(r).toFixed(e),p:r=>{if(r==null)return"\u2014";if(r>=.001)return r.toFixed(r>=.01?3:4);let[e,t]=r.toExponential(2).split("e");return`${e}\xD710<sup>${Number(t)}</sup>`}};var Ud=()=>window.echarts,U_=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches,di={axisLine:{lineStyle:{color:"rgba(148,163,184,.35)"}},axisLabel:{color:"#94a3b8"},splitLine:{lineStyle:{color:"rgba(148,163,184,.12)"}},nameTextStyle:{color:"#94a3b8"}},Is={backgroundColor:"rgba(2,6,23,.92)",borderColor:"rgba(255,255,255,.12)",textStyle:{color:"#e2e8f0",fontSize:12},extraCssText:"backdrop-filter: blur(6px); border-radius: 10px;"},O_={backgroundColor:"transparent",textStyle:{fontFamily:"Inter, ui-sans-serif, system-ui, sans-serif"},animationDuration:1100,animationEasing:"cubicOut"},Od=new Map;function F_(r,e){if(e.clientWidth>=520||!r.grid)return r;let t={...r.grid,right:Math.max(r.grid.right??0,48)};return r.legend&&(r.legend={...r.legend,top:"auto",bottom:0},t.bottom=(t.bottom??30)+34,t.top=Math.max((t.top??20)-14,30)),{...r,grid:t}}function Ls(r,e){let t=document.getElementById(r);if(!t)return;new IntersectionObserver(([i],s)=>{if(!i.isIntersecting)return;s.disconnect();let a=Ud().init(t,null,{renderer:"canvas"});a.setOption({...O_,animation:!U_(),...F_(e(),t)}),Od.set(r,{chart:a,build:e})},{rootMargin:"120px"}).observe(t)}function D_(r){let e=Od.get(r);e&&e.chart.setOption({...O_,...F_(e.build(),e.chart.getDom())},{notMerge:!0})}window.addEventListener("resize",()=>Od.forEach(({chart:r})=>r.resize()));function N_(r,e="#e2e8f0"){return{type:"custom",name:"IC 95 %",data:r,z:10,tooltip:{show:!1},renderItem(t,n){if(Number.isNaN(n.value(1))||Number.isNaN(n.value(2)))return null;let i=n.value(0),s=n.coord([i,n.value(1)]),a=n.value(3)===1,o=a?[s[0],t.coordSys.y]:n.coord([i,n.value(2)]),l=7,c={stroke:e,lineWidth:1.5,lineDash:a?[4,3]:null},h=[{type:"line",shape:{x1:s[0],y1:s[1],x2:o[0],y2:o[1]},style:c},{type:"line",shape:{x1:s[0]-l,y1:s[1],x2:s[0]+l,y2:s[1]},style:c}];return h.push(a?{type:"polygon",shape:{points:[[o[0]-5,o[1]+8],[o[0]+5,o[1]+8],[o[0],o[1]]]},style:{fill:e}}:{type:"line",shape:{x1:o[0]-l,y1:o[1],x2:o[0]+l,y2:o[1]},style:c}),{type:"group",children:h}}}}function dT(r,e){return{type:"custom",data:r.map(t=>({value:[t.x,t.value],color:t.color})),encode:{x:0,y:1},renderItem(t,n){let i=r[t.dataIndex],s=n.coord([i.x,i.value]),a=n.coord([i.x,e]),o=n.size([1,0])[0]*.46,l=Ud().graphic;return{type:"group",children:[{type:"rect",shape:{x:s[0]-o/2,y:s[1],width:o,height:a[1]-s[1],r:[8,8,0,0]},style:{fill:new l.LinearGradient(0,0,0,1,[{offset:0,color:i.color},{offset:1,color:`${i.color}22`}])},emphasis:{style:{shadowBlur:24,shadowColor:i.color}}},{type:"text",x:s[0]+o/2+8,y:s[1]-7,style:{text:ut.num(i.value,3),fill:"#fff",font:"600 13px Inter, sans-serif",align:"left"}}]}}}}function B_(r){let e={jtxNodes:3,res:"cpu"},t=document.getElementById("jtx-note");Ls("chart-jtx",()=>{let a=e.jtxNodes,o=fi.map(c=>r.baseline(a,c)),l=o[0];return t.textContent=l.j_per_tx.upper_unbounded?`PoW con ${a} nodos: solo ${l.committed_total} tx confirmadas en 10 ejecuciones; el IC no tiene l\xEDmite superior acotado (flecha).`:`Basado en ${o.map(c=>`${Pn[c.algorithm]} ${c.committed_total}`).join(", ")} tx confirmadas de 1000 por grupo.`,{grid:{left:64,right:24,top:24,bottom:40},tooltip:{...Is,trigger:"item",formatter:c=>{let h=o[c.dataIndex],[d,f]=h.j_per_tx.ci95;return`<b>${Pn[h.algorithm]} \xB7 ${a} nodos</b><br>J/tx: <b>${ut.num(h.j_per_tx.estimate,3)}</b><br>IC 95 %: ${ut.num(d,3)} \u2013 ${f==null?"no acotado":ut.num(f,3)}<br>Tx confirmadas: ${h.committed_total}/1000`}},xAxis:{type:"category",data:o.map(c=>Pn[c.algorithm]),...di,axisLabel:{color:"#e2e8f0",fontSize:13,fontWeight:600}},yAxis:{type:"log",name:"J / tx confirmada",min:.01,max:100,...di},series:[dT(o.map((c,h)=>({x:h,value:c.j_per_tx.estimate,color:bi[c.algorithm]})),.01),N_(o.map((c,h)=>[h,c.j_per_tx.ci95[0],c.j_per_tx.ci95[1]??100,c.j_per_tx.upper_unbounded?1:0]))]}});let i=()=>{document.getElementById("ratio-pos").textContent=Math.round(r.ratio(e.jtxNodes,"pos")),document.getElementById("ratio-pbft").textContent=Math.round(r.ratio(e.jtxNodes,"pbft"))};i(),Zh("[data-jtx-nodes]",a=>{e.jtxNodes=Number(a.dataset.jtxNodes),i(),D_("chart-jtx")}),Ls("chart-3d",()=>{let a=[3,4],o=Math.max(...fi.flatMap(l=>a.map(c=>r.baseline(c,l).metrics.energy_joules.mean)));return{tooltip:{...Is,formatter:l=>{let c=r.baseline(a[l.value[1]],fi[l.value[0]]),h=c.metrics.energy_joules;return`<b>${Pn[c.algorithm]} \xB7 ${c.nodes} nodos</b><br>Energ\xEDa media: <b>${ut.num(h.mean)} J</b> \xB1 ${ut.num(h.sd)}`}},xAxis3D:{type:"category",data:fi.map(l=>Pn[l]),name:"",axisLabel:{color:"#e2e8f0",fontSize:13}},yAxis3D:{type:"category",data:a.map(l=>`${l} nodos`),name:"",axisLabel:{color:"#94a3b8"}},zAxis3D:{type:"value",name:"J",max:Math.ceil(o/10)*10,axisLabel:{color:"#94a3b8"},nameTextStyle:{color:"#94a3b8"}},grid3D:{boxWidth:120,boxDepth:70,boxHeight:80,axisLine:{lineStyle:{color:"rgba(148,163,184,.4)"}},splitLine:{lineStyle:{color:"rgba(148,163,184,.12)"}},axisPointer:{lineStyle:{color:"#38bdf8"}},environment:"none",light:{main:{intensity:1.3,shadow:!0,alpha:40,beta:30},ambient:{intensity:.35}},viewControl:{autoRotate:!U_(),autoRotateSpeed:6,distance:210,alpha:22,beta:35,damping:.85},temporalSuperSampling:{enable:!0}},series:[{type:"bar3D",shading:"realistic",bevelSize:.35,bevelSmoothness:4,barSize:16,realisticMaterial:{roughness:.4,metalness:.1},label:{show:!0,distance:2,formatter:l=>ut.num(l.value[2],1),textStyle:{color:"#fff",fontSize:12,backgroundColor:"transparent"}},data:fi.flatMap((l,c)=>a.map((h,d)=>({value:[c,d,r.baseline(h,l).metrics.energy_joules.mean],itemStyle:{color:bi[l]}}))),animationDurationUpdate:1200}]}}),Ls("chart-outcomes",()=>{let a=[3,4].flatMap(c=>fi.map(h=>r.baseline(c,h))),o=a.map(c=>`${Pn[c.algorithm]} \xB7 ${c.nodes}n`),l=(c,h)=>({name:h,type:"bar",stack:"t",barWidth:22,itemStyle:{color:I_[c],borderRadius:3},label:{show:!0,color:"#020617",fontWeight:700,formatter:d=>d.value?d.value:""},emphasis:{focus:"series"},data:a.map(d=>d[c])});return{legend:{top:0,textStyle:{color:"#cbd5e1"},itemWidth:12,itemHeight:12},grid:{left:82,right:20,top:40,bottom:30},tooltip:{...Is,trigger:"axis",axisPointer:{type:"shadow"},formatter:c=>{let h=a[c[0].dataIndex];return`<b>${Pn[h.algorithm]} \xB7 ${h.nodes} nodos</b><br>${c.map(d=>`${d.marker}${d.seriesName}: ${d.value}`).join("<br>")}<br>Tx confirmadas: ${h.committed_total}/1000`}},xAxis:{type:"value",max:10,interval:2,name:"ejecuciones",nameLocation:"middle",nameGap:24,...di},yAxis:{type:"category",data:o,inverse:!0,...di,axisLabel:{color:"#e2e8f0"}},series:[l("zero","Cero"),l("partial","Parcial"),l("full","Completa")]}}),Ls("chart-scatter",()=>{let a=r.baselineRuns();return{grid:{left:64,right:24,top:20,bottom:52},tooltip:{...Is,trigger:"item",formatter:o=>{let l=o.data.run;return`<b>${Pn[l.algorithm]} \xB7 ${l.node_count} nodos \xB7 rep ${l.repetition}</b><br>Energ\xEDa: ${ut.num(l.energy_joules)} J<br>TPS: ${ut.num(l.throughput_observation_tps)}<br>Confirmadas: ${l.committed_by_quorum}/${l.submitted} (${l.completion_status})<br><span style="color:#64748b">${l.run_id.slice(0,12)}\u2026</span>`}},xAxis:{type:"value",name:"Throughput observado (TPS)",nameLocation:"middle",nameGap:32,min:0,max:15,...di},yAxis:{type:"log",name:"Energ\xEDa por ejecuci\xF3n (J)",min:1,max:100,...di},series:fi.flatMap(o=>[3,4].map(l=>({name:`${Pn[o]} ${l}`,type:"scatter",symbol:l===3?"circle":"diamond",symbolSize:l===3?13:15,itemStyle:{color:bi[o],opacity:.85,borderColor:"#020617",borderWidth:1},emphasis:{scale:1.5},data:a.filter(c=>c.algorithm===o&&c.node_count===l).map(c=>({value:[c.throughput_observation_tps,c.energy_joules],run:c}))})))}});let s={cpu:{key:"cpu_percent_sum_node_means",name:"% CPU (100 = 1 n\xFAcleo)",f:a=>a,d:1},mem:{key:"memory_mb_sum_node_means",name:"Memoria (MiB)",f:a=>a,d:1},rx:{key:"total_rx_bytes",name:"Red recibida (MB)",f:a=>a/1e6,d:2}};Ls("chart-resources",()=>{let a=s[e.res];return{legend:{top:0,textStyle:{color:"#cbd5e1"}},grid:{left:60,right:16,top:40,bottom:30},tooltip:{...Is,trigger:"axis",axisPointer:{type:"shadow"},valueFormatter:o=>ut.num(o,a.d)},xAxis:{type:"category",data:fi.map(o=>Pn[o]),...di,axisLabel:{color:"#e2e8f0",fontWeight:600}},yAxis:{type:"value",name:a.name,...di,nameTextStyle:{color:"#94a3b8",align:"left"}},series:[3,4].map(o=>({name:`${o} nodos`,type:"bar",barGap:"12%",data:fi.map(l=>({value:a.f(r.baseline(o,l).metrics[a.key].mean),itemStyle:{color:bi[l],opacity:o===3?.55:1,borderRadius:[6,6,0,0]}})),itemStyle:{color:o===3?"rgba(226,232,240,.55)":"#e2e8f0"},label:{show:!0,position:"top",color:"#cbd5e1",fontSize:11,formatter:l=>ut.num(l.value,a.d)}}))}}),Zh("[data-res]",a=>{e.res=a.dataset.res,D_("chart-resources")}),Ls("chart-scale",()=>({legend:{top:0,textStyle:{color:"#cbd5e1"}},grid:{left:52,right:110,top:40,bottom:30},tooltip:{...Is,trigger:"item",formatter:a=>{let o=r.baseline(a.dataIndex===0?3:4,a.seriesId);return`<b>${Pn[o.algorithm]} \xB7 ${o.nodes} nodos</b><br>TPS media: ${ut.num(o.metrics.throughput_observation_tps.mean)}<br>Ejecuciones sin progreso: ${o.zero}/10`}},xAxis:{type:"category",data:["3 nodos","4 nodos"],boundaryGap:!1,...di,axisLabel:{color:"#e2e8f0"}},yAxis:{type:"value",name:"TPS observado",min:0,max:15,...di},series:fi.map(a=>{let[o,l]=[r.baseline(3,a),r.baseline(4,a)],c=o.metrics.throughput_observation_tps.mean,h=l.metrics.throughput_observation_tps.mean,d=(h-c)/c*100;return{id:a,name:Pn[a],type:"line",symbolSize:14,lineStyle:{width:3,color:bi[a]},itemStyle:{color:bi[a]},data:[c,h],endLabel:{show:!0,color:bi[a],fontWeight:600,offset:[4,{pbft:-9,pos:9,pow:0}[a]],formatter:()=>`${Pn[a]} ${Math.abs(d)<.5?"\u2248 0 %":`${d>0?"+":"\u2212"}${Math.abs(d).toFixed(1)} %`}`}}})})),Ls("chart-difficulty",()=>{let a=r.sweep(),o=a.map(l=>l.difficulty_bits);return{legend:{top:0,textStyle:{color:"#cbd5e1"},data:["J/tx","Tx completadas","Ejecuciones sin progreso"]},grid:{left:64,right:64,top:44,bottom:44},tooltip:{...Is,trigger:"axis",formatter:l=>{let c=a[l[0].dataIndex],h=c.j_per_tx;return`<b>${c.difficulty_bits} bits</b><br>J/tx: ${h.estimate==null?"no definido (0 confirmadas)":`${ut.num(h.estimate,3)} [${ut.num(h.ci95[0],3)}\u2013${ut.num(h.ci95[1],3)}]`}<br>Tx confirmadas: ${c.committed_total}/1000<br>Sin progreso: ${c.zero}/10<br>Energ\xEDa/ejec.: ${ut.num(c.metrics.energy_joules.mean,1)} J`}},xAxis:{type:"category",data:o.map(l=>`${l} bits`),...di,axisLabel:{color:"#e2e8f0"}},yAxis:[{type:"log",name:"J / tx",min:.1,max:100,...di},{type:"value",name:"fracci\xF3n",min:0,max:1,...di,splitLine:{show:!1}}],series:[{name:"J/tx",type:"line",yAxisIndex:0,symbolSize:14,connectNulls:!1,lineStyle:{width:3,color:bi.pow},itemStyle:{color:bi.pow},areaStyle:{color:new(Ud()).graphic.LinearGradient(0,0,0,1,[{offset:0,color:"rgba(245,158,11,.35)"},{offset:1,color:"rgba(245,158,11,0)"}])},data:a.map(l=>l.j_per_tx.estimate),markPoint:{symbol:"pin",symbolSize:54,itemStyle:{color:"#fb7185"},label:{color:"#020617",fontWeight:700,formatter:"0 tx"},data:a.filter(l=>l.j_per_tx.estimate==null).map(l=>({coord:[`${l.difficulty_bits} bits`,12]}))}},N_(a.map((l,c)=>l.j_per_tx.estimate==null?[c,null,null,0]:[c,l.j_per_tx.ci95[0],l.j_per_tx.ci95[1],0]),"#fde68a"),{name:"Tx completadas",type:"bar",yAxisIndex:1,barWidth:18,itemStyle:{color:"rgba(52,211,153,.35)",borderColor:"rgba(52,211,153,.8)",borderWidth:1,borderRadius:[4,4,0,0]},data:a.map(l=>l.committed_total/l.submitted_total)},{name:"Ejecuciones sin progreso",type:"line",yAxisIndex:1,symbol:"rect",symbolSize:10,lineStyle:{type:"dashed",color:"#fb7185"},itemStyle:{color:"#fb7185"},data:a.map(l=>l.zero/l.n)}]}})}function Zh(r,e){let t=[...document.querySelectorAll(r)];t.forEach(n=>n.addEventListener("click",()=>{t.forEach(i=>{i.classList.toggle("is-active",i===n),i.setAttribute("aria-pressed",String(i===n))}),e(n)}))}sr.registerPlugin(qe);var Bd=window.matchMedia("(prefers-reduced-motion: reduce)").matches;Bd||document.documentElement.classList.add("js-motion");pT();mT();gT();P_(document.getElementById("hero-canvas"));_T();L_().then(r=>{xT(r),vT(r),ST(r),MT(r),TT(r),B_(r),qe.refresh()}).catch(r=>{console.error(r),document.getElementById("resultados")?.insertAdjacentHTML("afterbegin",`<div class="card mb-6 border-rose-500/40 text-rose-200"><i class="bi bi-exclamation-triangle"></i> No se pudieron cargar los datos (${r.message}). Si abriste el archivo localmente, sirve la carpeta con <code class="code-inline">python -m http.server</code>.</div>`)});function pT(){let r=document.getElementById("nav"),e=()=>r.classList.toggle("is-scrolled",window.scrollY>24);window.addEventListener("scroll",e,{passive:!0}),e();let t=document.getElementById("menu-btn"),n=document.getElementById("mobile-menu");t.addEventListener("click",()=>{let s=n.classList.toggle("hidden")===!1;t.setAttribute("aria-expanded",String(s))}),n.querySelectorAll("a").forEach(s=>s.addEventListener("click",()=>{n.classList.add("hidden"),t.setAttribute("aria-expanded","false")}));let i=[...document.querySelectorAll('.nav-link[href^="#"]')];document.querySelectorAll("main section[id]").forEach(s=>{qe.create({trigger:s,start:"top 45%",end:"bottom 45%",onToggle:({isActive:a})=>{a&&i.forEach(o=>o.classList.toggle("is-active",o.getAttribute("href")===`#${s.id}`))}})})}function mT(){let r=window.SITE_CONFIG?.repoUrl;document.querySelectorAll("[data-repo-link]").forEach(e=>{e.href=r})}function gT(){document.querySelectorAll("[data-copy]").forEach(r=>r.addEventListener("click",async()=>{let e=document.querySelector(r.dataset.copy).innerText;try{await navigator.clipboard.writeText(e),r.innerHTML='<i class="bi bi-check2"></i>'}catch{r.innerHTML='<i class="bi bi-x"></i>'}setTimeout(()=>{r.innerHTML='<i class="bi bi-clipboard"></i>'},1600)}))}function _T(){Bd||(sr.to(".hero-line",{opacity:1,y:0,duration:1,stagger:.12,ease:"power3.out",startAt:{y:28},delay:.15}),sr.utils.toArray(".reveal").forEach(r=>{sr.fromTo(r,{opacity:0,y:36},{opacity:1,y:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:r,start:"top 88%",once:!0}})}),sr.fromTo(".layer",{opacity:0,rotateX:-55,y:40,transformOrigin:"50% 0%"},{opacity:1,rotateX:0,y:0,duration:.8,stagger:.1,ease:"back.out(1.4)",scrollTrigger:{trigger:".layer-stack",start:"top 80%",once:!0}}),sr.to("#inicio .max-w-7xl",{yPercent:-12,opacity:.2,ease:"none",scrollTrigger:{trigger:"#inicio",start:"top top",end:"bottom top",scrub:!0}}))}function xT(r){let e=[3,4].flatMap(n=>["pos","pbft"].map(i=>r.ratio(n,i))),t={runs:r.raw.registered_runs,groups:new Set(r.runs.map(n=>`${n.experiment_name}:${n.algorithm}`)).size,ratioMin:Math.round(Math.min(...e)),ratioMax:Math.round(Math.max(...e)),audit:r.raw.audit_issues};document.querySelectorAll("[data-count]").forEach(n=>{let i=t[n.dataset.count];if(Bd){n.textContent=i;return}let s={v:0};sr.to(s,{v:i,duration:2,ease:"power2.out",delay:.6,onUpdate:()=>{n.textContent=Math.round(s.v)}})})}function vT(r){let e=r.raw.hardware,t=(n,i)=>{let s=document.querySelector(`[data-hw="${n}"]`);s&&(s.textContent=i)};t("name",e.Name.replace(/\(R\)|\(TM\)/g,"").replace(/\s+/g," ").trim()),t("logical",`${e.NumberOfLogicalProcessors} (${e.NumberOfCores} n\xFAcleos)`)}var k_=r=>`<span class="tag tag-zero">${r.zero}</span> <span class="tag tag-partial">${r.partial}</span> <span class="tag tag-full">${r.full}</span>`,Fd=r=>`<span class="legend-dot" style="background:${bi[r]}"></span><b class="text-white">${Pn[r]}</b>`,yT=r=>{let e=r.j_per_tx;return e.estimate==null?"no definido":`${ut.num(e.estimate,3)} <span class="text-slate-500">[${ut.num(e.ci95[0],3)}\u2013${e.ci95[1]==null?"n.a.":ut.num(e.ci95[1],3)}]</span>`};function ST(r){let e=[3,4].flatMap(t=>fi.map(n=>r.baseline(t,n)));document.querySelector("#table-perf tbody").innerHTML=e.map(t=>{let n=t.metrics.throughput_observation_tps,i=t.metrics.finality_ms_p50,s=t.metrics.energy_joules;return`<tr>
      <td>${Fd(t.algorithm)}</td><td>${t.nodes}</td><td>${k_(t)}</td><td>${t.committed_total}</td>
      <td>${ut.num(n.mean)} <span class="text-slate-500">(${ut.num(n.sd)})</span></td>
      <td>${i.mean==null?"\u2014":`${ut.num(i.mean,i.mean<10?1:0)} ms`} <span class="text-slate-500">(n=${i.n})</span></td>
      <td>${ut.num(s.mean)} \xB1 ${ut.num(s.sd)} J</td><td>${yT(t)}</td></tr>`}).join("")}function MT(r){document.getElementById("difficulty-cards").innerHTML=r.sweep().map(e=>`
    <div class="card !p-4">
      <div class="flex items-baseline justify-between">
        <p class="font-mono text-2xl font-bold text-pow">${e.difficulty_bits} <span class="text-sm text-slate-400">bits</span></p>
        <p class="text-sm">${k_(e)}</p>
      </div>
      <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
        <p><span class="text-slate-400">Tx conf.</span><br><b class="text-white">${e.committed_total}</b>/1000</p>
        <p><span class="text-slate-400">J/tx</span><br><b class="text-white">${e.j_per_tx.estimate==null?"no definido":ut.num(e.j_per_tx.estimate,3)}</b></p>
      </div>
    </div>`).join("")}var bT={energy_joules:"Energ\xEDa",throughput_observation_tps:"TPS",completion_fraction:"Completitud"},z_=r=>r.includes("n3")?3:4;function TT(r){document.querySelector("#table-primary tbody").innerHTML=r.raw.primary_tests.map(t=>`
    <tr><td>${z_(t.experiment)}</td><td>${bT[t.metric]}</td><td>${ut.num(t.statistic)}</td>
    <td>${ut.p(t.p_holm)} ${t.reject_at_0_05?'<i class="bi bi-check-circle-fill text-pos" title="significativo"></i>':""}</td></tr>`).join("");let e=t=>{document.querySelector("#table-pairwise tbody").innerHTML=r.raw.pairwise_tests.filter(n=>n.metric===t).map(n=>`<tr>
        <td>${z_(n.experiment)}</td>
        <td>${Fd(n.a)} <span class="text-slate-500">vs</span> ${Fd(n.b)}</td>
        <td>${ut.num(n.U,0)}</td><td>${ut.p(n.p_holm)}</td>
        <td class="text-white">${n.cliffs_delta_a_minus_b>0?"+":""}${ut.num(n.cliffs_delta_a_minus_b)}</td>
        <td>${n.reject_at_0_05?'<span class="tag tag-full">significativo</span>':'<span class="tag tag-partial">no detectado</span>'}</td>
      </tr>`).join("")};e("energy_joules"),Zh("[data-pair]",t=>e(t.dataset.pair))}
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.1
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
