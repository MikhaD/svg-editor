var _t=Object.defineProperty;var gt=(t,e,n)=>e in t?_t(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var U=(t,e,n)=>(gt(t,typeof e!="symbol"?e+"":e,n),n),Ne=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)};var de=(t,e,n)=>(Ne(t,e,"read from private field"),n?n.call(t):e.get(t)),he=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},me=(t,e,n,s)=>(Ne(t,e,"write to private field"),s?s.call(t,n):e.set(t,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerpolicy&&(o.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?o.credentials="include":l.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(l){if(l.ep)return;l.ep=!0;const o=n(l);fetch(l.href,o)}})();function B(){}function $t(t,e){for(const n in e)t[n]=e[n];return t}function ct(t){return t()}function Pe(){return Object.create(null)}function Z(t){t.forEach(ct)}function ut(t){return typeof t=="function"}function q(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function bt(t){return Object.keys(t).length===0}function yt(t,...e){if(t==null)return B;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function ft(t,e,n){t.$$.on_destroy.push(yt(e,n))}function Ee(t,e,n,s){if(t){const l=at(t,e,n,s);return t[0](l)}}function at(t,e,n,s){return t[1]&&s?$t(n.ctx.slice(),t[1](s(e))):n.ctx}function Te(t,e,n,s){if(t[2]&&s){const l=t[2](s(n));if(e.dirty===void 0)return l;if(typeof l=="object"){const o=[],r=Math.max(e.dirty.length,l.length);for(let i=0;i<r;i+=1)o[i]=e.dirty[i]|l[i];return o}return e.dirty|l}return e.dirty}function Ce(t,e,n,s,l,o){if(l){const r=at(e,n,s,o);t.p(r,l)}}function Ae(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let s=0;s<n;s++)e[s]=-1;return e}return-1}function g(t,e){t.appendChild(e)}function v(t,e,n){t.insertBefore(e,n||null)}function y(t){t.parentNode&&t.parentNode.removeChild(t)}function Ke(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function w(t){return document.createElement(t)}function P(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function F(t){return document.createTextNode(t)}function C(){return F(" ")}function Re(){return F("")}function H(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function vt(t){return function(e){e.target===this&&t.call(this,e)}}function p(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function wt(t){return Array.from(t.childNodes)}function De(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function xe(t,e){t.value=e??""}function re(t,e,n,s){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}let _e;function kt(){if(_e===void 0){_e=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{_e=!0}}return _e}function St(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const s=w("iframe");s.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),s.setAttribute("aria-hidden","true"),s.tabIndex=-1;const l=kt();let o;return l?(s.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",o=H(window,"message",r=>{r.source===s.contentWindow&&e()})):(s.src="about:blank",s.onload=()=>{o=H(s.contentWindow,"resize",e)}),g(t,s),()=>{(l||o&&s.contentWindow)&&o(),y(s)}}function be(t,e,n){t.classList[n?"add":"remove"](e)}let He;function ce(t){He=t}const oe=[],te=[],ge=[],Me=[],Mt=Promise.resolve();let ze=!1;function zt(){ze||(ze=!0,Mt.then(pt))}function ye(t){ge.push(t)}function ve(t){Me.push(t)}const ke=new Set;let se=0;function pt(){if(se!==0)return;const t=He;do{try{for(;se<oe.length;){const e=oe[se];se++,ce(e),Lt(e.$$)}}catch(e){throw oe.length=0,se=0,e}for(ce(null),oe.length=0,se=0;te.length;)te.pop()();for(let e=0;e<ge.length;e+=1){const n=ge[e];ke.has(n)||(ke.add(n),n())}ge.length=0}while(oe.length);for(;Me.length;)Me.pop()();ze=!1,ke.clear(),ce(t)}function Lt(t){if(t.fragment!==null){t.update(),Z(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ye)}}const $e=new Set;let ee;function X(){ee={r:0,c:[],p:ee}}function J(){ee.r||Z(ee.c),ee=ee.p}function m(t,e){t&&t.i&&($e.delete(t),t.i(e))}function $(t,e,n,s){if(t&&t.o){if($e.has(t))return;$e.add(t),ee.c.push(()=>{$e.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}const Et=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function we(t,e,n){const s=t.$$.props[e];s!==void 0&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function A(t){t&&t.c()}function z(t,e,n,s){const{fragment:l,after_update:o}=t.$$;l&&l.m(e,n),s||ye(()=>{const r=t.$$.on_mount.map(ct).filter(ut);t.$$.on_destroy?t.$$.on_destroy.push(...r):Z(r),t.$$.on_mount=[]}),o.forEach(ye)}function L(t,e){const n=t.$$;n.fragment!==null&&(Z(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Tt(t,e){t.$$.dirty[0]===-1&&(oe.push(t),zt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function I(t,e,n,s,l,o,r,i=[-1]){const c=He;ce(t);const f=t.$$={fragment:null,ctx:[],props:o,update:B,not_equal:l,bound:Pe(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Pe(),dirty:i,skip_bound:!1,root:e.target||c.$$.root};r&&r(f.root);let u=!1;if(f.ctx=n?n(t,e.props||{},(a,h,...b)=>{const k=b.length?b[0]:h;return f.ctx&&l(f.ctx[a],f.ctx[a]=k)&&(!f.skip_bound&&f.bound[a]&&f.bound[a](k),u&&Tt(t,a)),h}):[],f.update(),u=!0,Z(f.before_update),f.fragment=s?s(f.ctx):!1,e.target){if(e.hydrate){const a=wt(e.target);f.fragment&&f.fragment.l(a),a.forEach(y)}else f.fragment&&f.fragment.c();e.intro&&m(t.$$.fragment),z(t,e.target,e.anchor,e.customElement),pt()}ce(c)}class Y{$destroy(){L(this,1),this.$destroy=B}$on(e,n){if(!ut(n))return B;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const l=s.indexOf(n);l!==-1&&s.splice(l,1)}}$set(e){this.$$set&&!bt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const le=[];function Ct(t,e=B){let n;const s=new Set;function l(i){if(q(t,i)&&(t=i,n)){const c=!le.length;for(const f of s)f[1](),le.push(f,t);if(c){for(let f=0;f<le.length;f+=2)le[f][0](le[f+1]);le.length=0}}}function o(i){l(i(t))}function r(i,c=B){const f=[i,c];return s.add(f),s.size===1&&(n=e(l)||B),i(t),()=>{s.delete(f),s.size===0&&(n(),n=null)}}return{set:l,update:o,subscribe:r}}function At(t){return t.replace(/\w\S*/g,e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase())}function Ie(t,e=1){return Math.round(t/e)*e}const ue=class{constructor(e,n,s,l){U(this,"key");U(this,"ctrl");U(this,"shift");U(this,"alt");arguments.length===1?this.parse(e):(this.key=e??"",this.ctrl=n??!1,this.shift=s??!1,this.alt=l??!1)}parse(e){let n=null;this.alt=!1,this.ctrl=!1,this.shift=!1;const s=e.trim().toLowerCase().split(/\s*\+\s*/);for(const l of s)switch(l){case"ctrl":this.ctrl=!0;break;case"shift":this.shift=!0;break;case"alt":this.alt=!0;break;default:n=l;break}this.key=this.shift&&n===""?"+":n}equals(e){return this.toString()==e.toString()}matches(e){const n=ue.IRREGULAR_KEYS[e.key.toLowerCase()]??e.key.toLowerCase();return this.key==n&&this.ctrl==e.ctrlKey&&this.shift==e.shiftKey&&this.alt==e.altKey}toString(){return`${this.ctrl?"Ctrl+":""}${this.shift?"Shift+":""}${this.alt?"Alt+":""}${At(ue.IRREGULAR_KEYS[this.key]??this.key)}`}copy(){return new ue(this.key,this.ctrl,this.shift,this.alt)}};let V=ue;U(V,"IRREGULAR_KEYS",{" ":"space",Control:"ctrl",OS:"windows",Escape:"esc",Delete:"del",ArrowUp:"⇧",ArrowRight:"⇨",ArrowDown:"⇩",ArrowLeft:"⇦"});const Oe=class{constructor(e){U(this,"description");U(this,"combo");U(this,"default_combo");U(this,"callback");this.combo=new V(e.combo??e.default_combo),this.default_combo=new V(e.default_combo),this.description=e.description,this.callback=e.callback,Oe.SHORTCUTS.set(this.toString(),this)}setCombo(e){this.combo=e}reset(){this.setCombo(this.default_combo)}try(e){return this.combo.matches(e)?(console.log(this.combo.toString()),this.callback(e),!0):!1}toString(){return this.combo.toString()}};let W=Oe;U(W,"SHORTCUTS",new Map);const Be=Ct();class Kt{constructor(e="move"){U(this,"state");U(this,"stateName");U(this,"states");this.states={move:new Rt,draw:new Dt},this.transition(e)}transition(e){if(this.state){if(this.state.name===e)return;this.state.onStateExit()}this.stateName=e,this.state=this.states[e],Be.set(this.state),this.state.onStateEnter()}}class dt{constructor(e){U(this,"name");U(this,"icon");U(this,"shortcuts",[]);this.name=e}noop(){}}class Rt extends dt{constructor(){super("move"),this.icon="M82.816 238.634l52.651-79.545 90.268-24.504L37.917 21.049l44.9 217.585zm107.122-109.07L58.425 50.062l31.403 152.206 36.736-55.495 63.374-17.209z"}onStateEnter(){console.log("Move state entered")}onStateExit(){console.log("Move state exited")}onMouseDown(e){console.log("Move state mouse down")}onMouseUp(e){console.log("Move state mouse up")}onMouseMove(e){console.log("Move state mouse move")}onKeyPress(e){console.log("Move state key press")}}class Dt extends dt{constructor(){super("draw"),this.icon="M188.843 238.62l50.289-50.275-36.579-36.58c2.375-7.495 3.669-15.488 3.669-23.765 0-36.409-24.86-66.987-58.524-75.719L14.222 14.222l37.163 129.65c7.353 35.584 38.855 62.35 76.615 62.35 8.562 0 16.811-1.379 24.519-3.925l36.324 36.323zM144.114 66.048L48.981 38.926l69.817 69.817a21.24 21.24 0 0 1 9.202-2.076c11.776 0 21.333 9.557 21.333 21.333s-9.557 21.333-21.333 21.333-21.333-9.557-21.333-21.333a21.24 21.24 0 0 1 2.076-9.202L39.012 49.067l26.311 91.932C71.324 170.112 97.124 192 128 192c7.396.043 13.397-.967 20.068-3.2l8.32-2.745 6.186 6.187 26.283 26.268 30.151-30.165-26.524-26.539-6.116-6.115 2.631-8.249c2.105-6.471 3.044-12.288 3.001-19.442 0-29.767-20.309-54.812-47.886-61.952z",this.shortcuts=[new W({default_combo:"Escape",description:"Cancel drawing",callback:()=>ie.transition("move")})]}onStateEnter(){console.log("Draw state entered")}onStateExit(){console.log("Draw state exited")}onMouseDown(e){console.log("Draw state mouse down")}onMouseUp(e){console.log("Draw state mouse up")}onMouseMove(e){console.log("Draw state mouse move")}onKeyPress(e){for(let n of this.shortcuts)n.try(e)}}const ie=new Kt("move");function Ht(t){let e,n;const s=t[1].default,l=Ee(s,t,t[0],null);return{c(){e=w("aside"),l&&l.c(),p(e,"class","svelte-1pzlsaf")},m(o,r){v(o,e,r),l&&l.m(e,null),n=!0},p(o,[r]){l&&l.p&&(!n||r&1)&&Ce(l,s,o,o[0],n?Te(s,o[0],r,null):Ae(o[0]),null)},i(o){n||(m(l,o),n=!0)},o(o){$(l,o),n=!1},d(o){o&&y(e),l&&l.d(o)}}}function Bt(t,e,n){let{$$slots:s={},$$scope:l}=e;return t.$$set=o=>{"$$scope"in o&&n(0,l=o.$$scope)},[l,s]}class Ye extends Y{constructor(e){super(),I(this,e,Bt,Ht,q,{})}}function Ut(t){let e,n,s,l,o,r,i;const c=t[3].default,f=Ee(c,t,t[2],null);return{c(){e=w("span"),n=w("input"),s=C(),l=w("label"),f&&f.c(),p(n,"type","checkbox"),p(n,"id",t[1]),p(l,"for",t[1]),p(e,"class","svelte-1nj6d01")},m(u,a){v(u,e,a),g(e,n),n.checked=t[0],g(e,s),g(e,l),f&&f.m(l,null),o=!0,r||(i=H(n,"change",t[4]),r=!0)},p(u,[a]){a&1&&(n.checked=u[0]),f&&f.p&&(!o||a&4)&&Ce(f,c,u,u[2],o?Te(c,u[2],a,null):Ae(u[2]),null)},i(u){o||(m(f,u),o=!0)},o(u){$(f,u),o=!1},d(u){u&&y(e),f&&f.d(u),r=!1,i()}}}function Ot(t,e,n){let{$$slots:s={},$$scope:l}=e,{checked:o=!1}=e;const r=Math.random().toString(36).slice(2);function i(){o=this.checked,n(0,o)}return t.$$set=c=>{"checked"in c&&n(0,o=c.checked),"$$scope"in c&&n(2,l=c.$$scope)},[o,r,l,s,i]}class ht extends Y{constructor(e){super(),I(this,e,Ot,Ut,q,{checked:0})}}var fe,ae,pe;const je=class{constructor(e,n,s=!1){he(this,fe,void 0);he(this,ae,void 0);he(this,pe,void 0);U(this,"selected");me(this,fe,e),me(this,ae,n),me(this,pe,s),this.selected=!1}get x(){return de(this,fe)}get y(){return de(this,ae)}get control(){return de(this,pe)}relativeTo(e){return new je(this.x-e.x,this.y-e.y)}compact(){return`${this.x}${this.y<0?"":" "}${this.y}`}toString(){return`${this.x},${this.y}`}};let Le=je;fe=new WeakMap,ae=new WeakMap,pe=new WeakMap;function jt(t){let e,n,s,l,o,r,i,c,f,u;return{c(){e=w("button"),n=P("svg"),s=P("mask"),l=P("rect"),o=P("path"),r=P("g"),i=P("path"),c=P("path"),p(l,"x","0"),p(l,"y","0"),p(l,"width","100%"),p(l,"height","100%"),p(l,"fill","#fff"),p(o,"fill","#000"),p(o,"id","cutout-path"),p(o,"d","M0 -11l70 51c7 5 7 15 0 20l-70 51z"),p(s,"id","cutout"),p(i,"class","cog svelte-up99lr"),p(i,"fill-rule","evenodd"),p(i,"d","M53.706 0h-7.41l-2.085 5.537-5.878 1.17-4.044-4.32-6.845 2.835.192 5.914-4.983 3.33-5.39-2.443-5.24 5.24 2.44 5.4-3.33 4.983-5.913-.195L2.4 34.287l4.318 4.046-1.17 5.878-5.538 2.083v7.41l5.537 2.085 1.17 5.878L2.4 65.713l2.835 6.845 5.913-.195 3.33 4.983-2.44 5.4 5.24 5.24 5.39-2.443 4.983 3.33-.192 5.914 6.845 2.835 4.044-4.32 5.878 1.17L46.297 100h7.41l2.083-5.538 5.878-1.17 4.046 4.318 6.845-2.835-.195-5.913 4.983-3.33 5.4 2.44 5.24-5.24-2.443-5.39 3.33-4.983 5.914.192 2.835-6.845-4.32-4.044 1.17-5.878L100 53.703v-7.41l-5.538-2.083-1.17-5.878 4.32-4.044-2.835-6.845-5.914.192-3.33-4.983 2.443-5.39-5.24-5.24-5.4 2.44-4.983-3.33.195-5.913-6.845-2.835-4.046 4.318-5.878-1.17L53.706 0zM50 83.213c18.343 0 33.214-14.87 33.214-33.213S68.344 16.787 50 16.787 16.787 31.657 16.787 50 31.657 83.213 50 83.213z"),p(r,"mask","url(#cutout)"),p(c,"class","m svelte-up99lr"),p(c,"d","M7.5 24v52h7v-39l13 39l13 -39v39h7v-52h-10l-10 32l-10 -32z"),p(n,"xmlns","http://www.w3.org/2000/svg"),p(n,"viewBox","0 0 100 100"),p(n,"class","svelte-up99lr"),p(e,"class","svelte-up99lr")},m(a,h){v(a,e,h),g(e,n),g(n,s),g(s,l),g(s,o),g(n,r),g(r,i),g(n,c),f||(u=H(i,"animationend",t[0]),f=!0)},p:B,i:B,o:B,d(a){a&&y(e),f=!1,u()}}}function qt(t){return[()=>console.log("animation ended")]}class Nt extends Y{constructor(e){super(),I(this,e,qt,jt,q,{})}}function Pt(t){let e,n,s,l,o,r;return{c(){e=w("button"),n=P("svg"),s=P("path"),p(s,"fill-rule","evenodd"),p(s,"d",l=t[0].icon),p(s,"class","svelte-vab1rb"),p(n,"xmlns","http://www.w3.org/2000/svg"),p(n,"viewBox","0 0 256 256"),p(n,"height","24"),p(n,"fill","none"),p(e,"class","toolbar-button svelte-vab1rb"),be(e,"active",t[1])},m(i,c){v(i,e,c),g(e,n),g(n,s),o||(r=H(e,"mousedown",t[2]),o=!0)},p(i,[c]){c&1&&l!==(l=i[0].icon)&&p(s,"d",l),c&2&&be(e,"active",i[1])},i:B,o:B,d(i){i&&y(e),o=!1,r()}}}function xt(t,e,n){let s,l;ft(t,Be,i=>n(3,l=i));let{thisState:o}=e;function r(){ie.transition(o.name)}return t.$$set=i=>{"thisState"in i&&n(0,o=i.thisState)},t.$$.update=()=>{t.$$.dirty&9&&n(1,s=o.name===l.name)},[o,s,r,l]}class It extends Y{constructor(e){super(),I(this,e,xt,Pt,q,{thisState:0})}}function Ge(t,e,n){const s=t.slice();return s[0]=e[n],s}function Ve(t){let e,n;return e=new It({props:{thisState:t[0]}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},p:B,i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function Yt(t){let e,n,s,l;n=new Nt({});let o=Object.values(ie.states),r=[];for(let c=0;c<o.length;c+=1)r[c]=Ve(Ge(t,o,c));const i=c=>$(r[c],1,1,()=>{r[c]=null});return{c(){e=w("div"),A(n.$$.fragment),s=C();for(let c=0;c<r.length;c+=1)r[c].c();p(e,"class","toolbar svelte-1ldks7c")},m(c,f){v(c,e,f),z(n,e,null),g(e,s);for(let u=0;u<r.length;u+=1)r[u].m(e,null);l=!0},p(c,[f]){if(f&0){o=Object.values(ie.states);let u;for(u=0;u<o.length;u+=1){const a=Ge(c,o,u);r[u]?(r[u].p(a,f),m(r[u],1)):(r[u]=Ve(a),r[u].c(),m(r[u],1),r[u].m(e,null))}for(X(),u=o.length;u<r.length;u+=1)i(u);J()}},i(c){if(!l){m(n.$$.fragment,c);for(let f=0;f<o.length;f+=1)m(r[f]);l=!0}},o(c){$(n.$$.fragment,c),r=r.filter(Boolean);for(let f=0;f<r.length;f+=1)$(r[f]);l=!1},d(c){c&&y(e),L(n),Ke(r,c)}}}class Gt extends Y{constructor(e){super(),I(this,e,null,Yt,q,{})}}function We(t){let e,n;return{c(){e=w("h2"),n=F(t[1]),p(e,"class","title svelte-jwoh95")},m(s,l){v(s,e,l),g(e,n)},p(s,l){l&2&&De(n,s[1])},d(s){s&&y(e)}}}function Vt(t){let e,n,s,l,o,r,i,c,f,u=t[1]&&We(t);const a=t[4].default,h=Ee(a,t,t[3],null);return{c(){e=w("dialog"),n=P("svg"),s=P("path"),l=C(),o=w("div"),u&&u.c(),r=C(),h&&h.c(),p(s,"d","M.35 .35L3.65 3.65M3.65 .35L.35 3.65"),p(n,"class","close svelte-jwoh95"),p(n,"viewBox","0 0 4 4"),p(n,"xmlns","http://www.w3.org/2000/svg"),p(o,"class","content svelte-jwoh95"),p(e,"class","modal svelte-jwoh95"),p(e,"data-block-shortcuts","true")},m(b,k){v(b,e,k),g(e,n),g(n,s),g(e,l),g(e,o),u&&u.m(o,null),g(o,r),h&&h.m(o,null),t[7](e),i=!0,c||(f=[H(n,"click",t[5]),H(e,"close",t[6]),H(e,"click",vt(t[8]))],c=!0)},p(b,[k]){b[1]?u?u.p(b,k):(u=We(b),u.c(),u.m(o,r)):u&&(u.d(1),u=null),h&&h.p&&(!i||k&8)&&Ce(h,a,b,b[3],i?Te(a,b[3],k,null):Ae(b[3]),null)},i(b){i||(m(h,b),i=!0)},o(b){$(h,b),i=!1},d(b){b&&y(e),u&&u.d(),h&&h.d(b),t[7](null),c=!1,Z(f)}}}function Wt(t,e,n){let{$$slots:s={},$$scope:l}=e,{open:o=!1}=e,{title:r=""}=e,i;const c=()=>n(0,o=!1),f=()=>n(0,o=!1);function u(h){te[h?"unshift":"push"](()=>{i=h,n(2,i)})}const a=()=>n(0,o=!1);return t.$$set=h=>{"open"in h&&n(0,o=h.open),"title"in h&&n(1,r=h.title),"$$scope"in h&&n(3,l=h.$$scope)},t.$$.update=()=>{t.$$.dirty&5&&(o?i==null||i.showModal():i==null||i.close())},[o,r,i,l,s,c,f,u,a]}class Ue extends Y{constructor(e){super(),I(this,e,Wt,Vt,q,{open:0,title:1})}}function Ft(t){let e,n;return{c(){e=w("span"),n=F(t[0]),p(e,"class","key svelte-171zywq")},m(s,l){v(s,e,l),g(e,n)},p(s,[l]){l&1&&De(n,s[0])},i:B,o:B,d(s){s&&y(e)}}}function Xt(t,e,n){let{key:s}=e;return t.$$set=l=>{"key"in l&&n(0,s=l.key)},[s]}class Q extends Y{constructor(e){super(),I(this,e,Xt,Ft,q,{key:0})}}function Fe(t){let e,n;return e=new Q({props:{key:"Ctrl"}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function Xe(t){let e,n;return e=new Q({props:{key:"Alt"}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function Je(t){let e,n;return e=new Q({props:{key:"Shift"}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function Qe(t){let e,n;return e=new Q({props:{key:V.IRREGULAR_KEYS[t[0].key]??t[0].key}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},p(s,l){const o={};l&1&&(o.key=V.IRREGULAR_KEYS[s[0].key]??s[0].key),e.$set(o)},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function Jt(t){let e,n,s,l,o,r=t[0].ctrl&&Fe(),i=t[0].alt&&Xe(),c=t[0].shift&&Je(),f=t[0].key&&Qe(t);return{c(){e=w("div"),r&&r.c(),n=C(),i&&i.c(),s=C(),c&&c.c(),l=C(),f&&f.c(),p(e,"class","shortcut svelte-1hyh641")},m(u,a){v(u,e,a),r&&r.m(e,null),g(e,n),i&&i.m(e,null),g(e,s),c&&c.m(e,null),g(e,l),f&&f.m(e,null),o=!0},p(u,[a]){u[0].ctrl?r?a&1&&m(r,1):(r=Fe(),r.c(),m(r,1),r.m(e,n)):r&&(X(),$(r,1,1,()=>{r=null}),J()),u[0].alt?i?a&1&&m(i,1):(i=Xe(),i.c(),m(i,1),i.m(e,s)):i&&(X(),$(i,1,1,()=>{i=null}),J()),u[0].shift?c?a&1&&m(c,1):(c=Je(),c.c(),m(c,1),c.m(e,l)):c&&(X(),$(c,1,1,()=>{c=null}),J()),u[0].key?f?(f.p(u,a),a&1&&m(f,1)):(f=Qe(u),f.c(),m(f,1),f.m(e,null)):f&&(X(),$(f,1,1,()=>{f=null}),J())},i(u){o||(m(r),m(i),m(c),m(f),o=!0)},o(u){$(r),$(i),$(c),$(f),o=!1},d(u){u&&y(e),r&&r.d(),i&&i.d(),c&&c.d(),f&&f.d()}}}function Qt(t,e,n){let{combo:s}=e;return t.$$set=l=>{"combo"in l&&n(0,s=l.combo)},[s]}class mt extends Y{constructor(e){super(),I(this,e,Qt,Jt,q,{combo:0})}}function Zt(t){let e,n,s,l,o;return n=new Q({props:{key:"Enter"}}),l=new Q({props:{key:"Esc"}}),{c(){e=F("Shortcut contains "),A(n.$$.fragment),s=F(" and / or "),A(l.$$.fragment)},m(r,i){v(r,e,i),z(n,r,i),v(r,s,i),z(l,r,i),o=!0},p:B,i(r){o||(m(n.$$.fragment,r),m(l.$$.fragment,r),o=!0)},o(r){$(n.$$.fragment,r),$(l.$$.fragment,r),o=!1},d(r){r&&y(e),L(n,r),r&&y(s),L(l,r)}}}function en(t){let e,n,s,l,o,r,i,c,f,u,a,h,b,k,O,N,j;return l=new Q({props:{key:"Enter"}}),i=new ht({props:{$$slots:{default:[Zt]},$$scope:{ctx:t}}}),k=new mt({props:{combo:t[0]}}),{c(){e=w("div"),n=w("div"),s=F("Press the desired key combination, then press "),A(l.$$.fragment),o=C(),r=w("div"),A(i.$$.fragment),c=C(),f=w("form"),u=w("input"),h=C(),b=w("div"),A(k.$$.fragment),p(r,"class","freeze svelte-1i9i5s"),p(u,"type","text"),u.value=a=t[0].toString(),u.autofocus=!0,p(u,"class","svelte-1i9i5s"),p(f,"method","dialog"),p(b,"class","display svelte-1i9i5s"),p(e,"class","set-shortcut svelte-1i9i5s")},m(E,S){v(E,e,S),g(e,n),g(n,s),z(l,n,null),g(e,o),g(e,r),z(i,r,null),g(e,c),g(e,f),g(f,u),g(e,h),g(e,b),z(k,b,null),O=!0,u.focus(),N||(j=[H(u,"keydown",t[1]),H(f,"submit",t[2])],N=!0)},p(E,[S]){const R={};S&16&&(R.$$scope={dirty:S,ctx:E}),i.$set(R),(!O||S&1&&a!==(a=E[0].toString())&&u.value!==a)&&(u.value=a);const M={};S&1&&(M.combo=E[0]),k.$set(M)},i(E){O||(m(l.$$.fragment,E),m(i.$$.fragment,E),m(k.$$.fragment,E),O=!0)},o(E){$(l.$$.fragment,E),$(i.$$.fragment,E),$(k.$$.fragment,E),O=!1},d(E){E&&y(e),L(l),L(i),L(k),N=!1,Z(j)}}}const tn=new Set([..."`1234567890-=~!@#$%^&*()_+qwertyuiop[]\\{}|asdfghjkl;':\"zxcvbnm,./<>? ","arrowup","arrowright","arrowdown","arrowleft","backspace","delete","end","home","pageup","pagedown"]);function nn(t,e,n){let{shortcut:s}=e,l=new V;function o(i){if(i.key!=="Enter"&&i.key!=="Escape")i.preventDefault();else return;n(0,l=new V(tn.has(i.key.toLowerCase())?i.key:"",i.ctrlKey,i.shiftKey,i.altKey))}function r(i){s.setCombo(l),n(0,l=new V)}return t.$$set=i=>{"shortcut"in i&&n(3,s=i.shortcut)},[l,o,r,s]}class sn extends Y{constructor(e){super(),I(this,e,nn,en,q,{shortcut:3})}}function Ze(t){let e,n,s;return n=new mt({props:{combo:t[0].combo}}),{c(){e=w("span"),A(n.$$.fragment),p(e,"class","keys svelte-1v3xkrn")},m(l,o){v(l,e,o),z(n,e,null),s=!0},p(l,o){const r={};o&1&&(r.combo=l[0].combo),n.$set(r)},i(l){s||(m(n.$$.fragment,l),s=!0)},o(l){$(n.$$.fragment,l),s=!1},d(l){l&&y(e),L(n)}}}function et(t){let e,n,s;return{c(){e=w("button"),e.innerHTML='<svg class="reset svelte-1v3xkrn" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M5 12A12 12 0 1 1 5 20M5 12l0-4l3.3 2.2z"></path></svg>'},m(l,o){v(l,e,o),n||(s=H(e,"click",t[2]),n=!0)},p:B,d(l){l&&y(e),n=!1,s()}}}function tt(t){let e=!t[0].default_combo.equals(t[0].combo),n,s=e&&et(t);return{c(){s&&s.c(),n=Re()},m(l,o){s&&s.m(l,o),v(l,n,o)},p(l,o){o&1&&(e=!l[0].default_combo.equals(l[0].combo)),e?s?s.p(l,o):(s=et(l),s.c(),s.m(n.parentNode,n)):s&&(s.d(1),s=null)},d(l){s&&s.d(l),l&&y(n)}}}function ln(t){let e,n;return e=new sn({props:{shortcut:t[0]}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},p(s,l){const o={};l&1&&(o.shortcut=s[0]),e.$set(o)},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function on(t){let e,n,s=t[0].description+"",l,o,r=t[1],i,c,f=t[1],u,a,h,b,k,O,N,j,E,S=Ze(t),R=tt(t);function M(_){t[4](_)}let x={$$slots:{default:[ln]},$$scope:{ctx:t}};return t[1]!==void 0&&(x.open=t[1]),b=new Ue({props:x}),te.push(()=>we(b,"open",M)),{c(){e=w("div"),n=w("span"),l=F(s),o=C(),S.c(),i=C(),c=w("span"),R.c(),u=C(),a=w("button"),a.innerHTML='<svg class="edit svelte-1v3xkrn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M188.873 16l4.226.377c11.952 1.065 23.058 7.183 31.312 15.438s14.373 19.361 15.439 31.313l.376 4.225-147.55 147.55-82.949 31.596 31.596-82.949L188.873 16zm6.545 19.131L61.954 168.596l25.676 25.676L221.095 60.808c-1.418-5.678-4.759-11.392-9.522-16.155s-10.477-8.103-16.155-9.522zM71.298 203.617l-18.69-18.689-11.499 30.188 30.189-11.499z"></path></svg>',h=C(),k=w("div"),A(b.$$.fragment),p(c,"class","options svelte-1v3xkrn"),p(e,"class","shortcut svelte-1v3xkrn"),re(k,"display","contents"),re(k,"--modal-width","40vw")},m(_,T){v(_,e,T),g(e,n),g(n,l),g(e,o),S.m(e,null),g(e,i),g(e,c),R.m(c,null),g(c,u),g(c,a),v(_,h,T),v(_,k,T),z(b,k,null),N=!0,j||(E=H(a,"click",t[3]),j=!0)},p(_,[T]){(!N||T&1)&&s!==(s=_[0].description+"")&&De(l,s),T&2&&q(r,r=_[1])?(X(),$(S,1,1,B),J(),S=Ze(_),S.c(),m(S,1),S.m(e,i)):S.p(_,T),T&2&&q(f,f=_[1])?(R.d(1),R=tt(_),R.c(),R.m(c,u)):R.p(_,T);const D={};T&33&&(D.$$scope={dirty:T,ctx:_}),!O&&T&2&&(O=!0,D.open=_[1],ve(()=>O=!1)),b.$set(D)},i(_){N||(m(S),m(b.$$.fragment,_),N=!0)},o(_){$(S),$(b.$$.fragment,_),N=!1},d(_){_&&y(e),S.d(_),R.d(_),_&&y(h),_&&b&&y(k),L(b,_),j=!1,E()}}}function rn(t,e,n){let{shortcut:s}=e,l=!1;function o(){s.reset(),n(0,s)}function r(){n(1,l=!0)}function i(c){l=c,n(1,l)}return t.$$set=c=>{"shortcut"in c&&n(0,s=c.shortcut)},[s,l,o,r,i]}class cn extends Y{constructor(e){super(),I(this,e,rn,on,q,{shortcut:0})}}function nt(t,e,n){const s=t.slice();return s[3]=e[n],s}function st(t){let e,n;return e=new cn({props:{shortcut:t[3]}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},p:B,i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function un(t){let e,n,s=[...W.SHORTCUTS.values()],l=[];for(let r=0;r<s.length;r+=1)l[r]=st(nt(t,s,r));const o=r=>$(l[r],1,1,()=>{l[r]=null});return{c(){for(let r=0;r<l.length;r+=1)l[r].c();e=Re()},m(r,i){for(let c=0;c<l.length;c+=1)l[c].m(r,i);v(r,e,i),n=!0},p(r,i){if(i&0){s=[...W.SHORTCUTS.values()];let c;for(c=0;c<s.length;c+=1){const f=nt(r,s,c);l[c]?(l[c].p(f,i),m(l[c],1)):(l[c]=st(f),l[c].c(),m(l[c],1),l[c].m(e.parentNode,e))}for(X(),c=s.length;c<l.length;c+=1)o(c);J()}},i(r){if(!n){for(let i=0;i<s.length;i+=1)m(l[i]);n=!0}},o(r){l=l.filter(Boolean);for(let i=0;i<l.length;i+=1)$(l[i]);n=!1},d(r){Ke(l,r),r&&y(e)}}}function fn(t){let e,n,s,l,o,r,i;function c(u){t[1](u)}let f={title:"Keyboard Shortcuts",$$slots:{default:[un]},$$scope:{ctx:t}};return t[0]!==void 0&&(f.open=t[0]),e=new Ue({props:f}),te.push(()=>we(e,"open",c)),{c(){A(e.$$.fragment),s=C(),l=w("button"),l.innerHTML='<svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" class="svelte-hyimv1"><path d="M1 5h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3zm4 0h3v3h-3z"></path><path d="M1 9h5v3h-5zm6 0h3v3h-3zm4 0h3v3h-3zm4 0h5v3h-5z"></path><path d="M4 13h13v3h-13z"></path></svg>',p(l,"class","svelte-hyimv1")},m(u,a){z(e,u,a),v(u,s,a),v(u,l,a),o=!0,r||(i=H(l,"click",t[2]),r=!0)},p(u,[a]){const h={};a&64&&(h.$$scope={dirty:a,ctx:u}),!n&&a&1&&(n=!0,h.open=u[0],ve(()=>n=!1)),e.$set(h)},i(u){o||(m(e.$$.fragment,u),o=!0)},o(u){$(e.$$.fragment,u),o=!1},d(u){L(e,u),u&&y(s),u&&y(l),r=!1,i()}}}function an(t,e,n){let s=!1;function l(r){s=r,n(0,s)}return[s,l,()=>n(0,s=!0)]}class pn extends Y{constructor(e){super(),I(this,e,an,fn,q,{})}}function lt(t){let e,n;return e=new Q({props:{key:t[1]}}),{c(){A(e.$$.fragment)},m(s,l){z(e,s,l),n=!0},p(s,l){const o={};l&2&&(o.key=s[1]),e.$set(o)},i(s){n||(m(e.$$.fragment,s),n=!0)},o(s){$(e.$$.fragment,s),n=!1},d(s){L(e,s)}}}function dn(t){let e,n,s,l,o,r,i=t[1]!=""&&lt(t);return{c(){e=w("input"),n=C(),s=w("div"),i&&i.c(),p(e,"type","text"),p(e,"class","svelte-1f9keg0"),p(s,"class","keys svelte-1f9keg0")},m(c,f){v(c,e,f),v(c,n,f),v(c,s,f),i&&i.m(s,null),l=!0,o||(r=H(e,"keydown",t[2]),o=!0)},p(c,f){c[1]!=""?i?(i.p(c,f),f&2&&m(i,1)):(i=lt(c),i.c(),m(i,1),i.m(s,null)):i&&(X(),$(i,1,1,()=>{i=null}),J())},i(c){l||(m(i),l=!0)},o(c){$(i),l=!1},d(c){c&&y(e),c&&y(n),c&&y(s),i&&i.d(),o=!1,r()}}}function hn(t){let e,n,s,l,o,r,i;function c(u){t[3](u)}let f={title:"key testing",$$slots:{default:[dn]},$$scope:{ctx:t}};return t[0]!==void 0&&(f.open=t[0]),e=new Ue({props:f}),te.push(()=>we(e,"open",c)),{c(){A(e.$$.fragment),s=C(),l=w("button"),l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="none"><g fill="#5dd3e3"><ellipse cx="120.812" cy="54.745" rx="9.836" ry="9.846"></ellipse><ellipse cx="110.583" cy="172.111" rx="9.836" ry="9.846"></ellipse><ellipse cx="144.811" cy="35.446" rx="7.082" ry="7.089"></ellipse><ellipse cx="152.68" cy="185.895" rx="7.082" ry="7.089"></ellipse><ellipse cx="123.566" cy="89.797" rx="7.082" ry="7.089"></ellipse><ellipse cx="130.647" cy="136.271" rx="7.082" ry="7.089"></ellipse><ellipse cx="125.533" cy="5.12" rx="5.115" ry="5.12"></ellipse><ellipse cx="135.762" cy="167.385" rx="5.115" ry="5.12"></ellipse><ellipse cx="120.025" cy="197.317" rx="5.115" ry="5.12"></ellipse><ellipse cx="116.091" cy="152.418" rx="3.541" ry="3.545"></ellipse><ellipse cx="120.812" cy="119.335" rx="3.541" ry="3.545"></ellipse><ellipse cx="87.764" cy="194.166" rx="3.541" ry="3.545"></ellipse><ellipse cx="132.615" cy="109.095" rx="5.115" ry="5.12"></ellipse><path d="M183.611 213.12l-13.227-13.834c-13.377 8.271-20.065 4.726-32.655 6.696s-17.189 4.332-27.54 4.332l-33.048-1.364-12.043 15.151c-3.409 6.877 1.562 15.116 9.379 15.116h106.048c8.045 0 13.076-8.729 9.057-15.717l-5.97-10.38z"></path></g><path fill-rule="evenodd" d="M155.04 72.468v56.48l52.769 91.618c9.074 15.754-2.284 35.434-20.45 35.434H67.641c-18.166 0-29.524-19.68-20.45-35.434l52.769-91.618v-56.48H88.157V60.652h78.686v11.815H155.04zm-97.624 154l54.347-94.358V72.468h31.474v59.642l54.347 94.358c4.537 7.876-1.142 17.717-10.225 17.717H67.641c-9.083 0-14.762-9.841-10.225-17.717z" fill="#fff"></path></svg>',p(l,"class","svelte-1f9keg0")},m(u,a){z(e,u,a),v(u,s,a),v(u,l,a),o=!0,r||(i=H(l,"click",t[4]),r=!0)},p(u,[a]){const h={};a&34&&(h.$$scope={dirty:a,ctx:u}),!n&&a&1&&(n=!0,h.open=u[0],ve(()=>n=!1)),e.$set(h)},i(u){o||(m(e.$$.fragment,u),o=!0)},o(u){$(e.$$.fragment,u),o=!1},d(u){L(e,u),u&&y(s),u&&y(l),r=!1,i()}}}function mn(t,e,n){let s=!1,l="";function o(c){c.preventDefault(),n(1,l=c.key)}function r(c){s=c,n(0,s)}const i=()=>n(0,s=!0);return t.$$.update=()=>{t.$$.dirty&1&&(s||n(1,l=""))},[s,l,o,r,i]}class _n extends Y{constructor(e){super(),I(this,e,mn,hn,q,{})}}const{document:gn}=Et;function ot(t,e,n){const s=t.slice();return s[18]=e[n],s[20]=n,s}function Se(t){const e=t.slice(),n=e[6].at(-1);return e[21]=n,e}function rt(t){let e,n;return{c(){e=P("path"),p(e,"d",n="M"+t[21].x+" "+t[21].y+"H"+t[4]+"V"+t[5]+"H"+t[21].x+"z"),p(e,"class","selection svelte-1q0u0k8"),p(e,"fill","#0D99FF20"),p(e,"stroke-width","1")},m(s,l){v(s,e,l)},p(s,l){l&112&&n!==(n="M"+s[21].x+" "+s[21].y+"H"+s[4]+"V"+s[5]+"H"+s[21].x+"z")&&p(e,"d",n)},d(s){s&&y(e)}}}function it(t){let e,n,s,l;return{c(){e=P("circle"),p(e,"cx",n=t[18].x),p(e,"cy",s=t[18].y),p(e,"r",l=t[20]===t[6].length-1?5:3.5),p(e,"class","point svelte-1q0u0k8"),be(e,"last",t[20]===t[6].length-1)},m(o,r){v(o,e,r)},p(o,r){r&64&&n!==(n=o[18].x)&&p(e,"cx",n),r&64&&s!==(s=o[18].y)&&p(e,"cy",s),r&64&&l!==(l=o[20]===o[6].length-1?5:3.5)&&p(e,"r",l),r&64&&be(e,"last",o[20]===o[6].length-1)},d(o){o&&y(e)}}}function $n(t){let e;return{c(){e=F("Snap to grid")},m(n,s){v(n,e,s)},d(n){n&&y(e)}}}function bn(t){let e,n,s,l,o,r,i;function c(u){t[14](u)}let f={$$slots:{default:[$n]},$$scope:{ctx:t}};return t[3]!==void 0&&(f.checked=t[3]),e=new ht({props:f}),te.push(()=>we(e,"checked",c)),{c(){A(e.$$.fragment),s=C(),l=w("input"),p(l,"type","text"),p(l,"inputmode","numeric")},m(u,a){z(e,u,a),v(u,s,a),v(u,l,a),xe(l,t[0]),o=!0,r||(i=H(l,"input",t[15]),r=!0)},p(u,a){const h={};a&4194304&&(h.$$scope={dirty:a,ctx:u}),!n&&a&8&&(n=!0,h.checked=u[3],ve(()=>n=!1)),e.$set(h),a&1&&l.value!==u[0]&&xe(l,u[0])},i(u){o||(m(e.$$.fragment,u),o=!0)},o(u){$(e.$$.fragment,u),o=!1},d(u){L(e,u),u&&y(s),u&&y(l),r=!1,i()}}}function yn(t){let e,n,s,l,o,r,i,c,f,u,a,h,b=`url('cursor/svg/${t[8].name}.svg')`,k,O=`${t[0]}px`,N,j,E,S,R,M,x;n=new _n({}),l=new Gt({}),r=new Ye({});let _=t[7]&&rt(Se(t)),T=t[6],D=[];for(let d=0;d<T.length;d+=1)D[d]=it(ot(t,T,d));return j=new Ye({props:{$$slots:{default:[bn]},$$scope:{ctx:t}}}),S=new pn({}),{c(){e=C(),A(n.$$.fragment),s=C(),A(l.$$.fragment),o=C(),A(r.$$.fragment),i=C(),c=w("main"),f=P("svg"),_&&_.c(),u=Re();for(let d=0;d<D.length;d+=1)D[d].c();a=P("circle"),N=C(),A(j.$$.fragment),E=C(),A(S.$$.fragment),p(a,"cx",t[4]),p(a,"cy",t[5]),p(a,"r","3.5"),p(a,"class","point svelte-1q0u0k8"),p(f,"xmlns","http://www.w3.org/2000/svg"),p(f,"viewBox",h="0 0 "+t[2]+" "+t[1]),p(f,"fill","none"),p(f,"class","svelte-1q0u0k8"),re(f,"--cursor-0",b),p(c,"class","svelte-1q0u0k8"),ye(()=>t[13].call(c)),re(c,"--grid-size",O)},m(d,K){v(d,e,K),z(n,d,K),v(d,s,K),z(l,d,K),v(d,o,K),z(r,d,K),v(d,i,K),v(d,c,K),g(c,f),_&&_.m(f,null),g(f,u);for(let ne=0;ne<D.length;ne+=1)D[ne].m(f,null);g(f,a),k=St(c,t[13].bind(c)),v(d,N,K),z(j,d,K),v(d,E,K),z(S,d,K),R=!0,M||(x=[H(gn.body,"keydown",t[12]),H(f,"mousedown",t[10]),H(f,"mouseup",t[11]),H(c,"mousemove",t[9])],M=!0)},p(d,[K]){if(d[7]?_?_.p(Se(d),K):(_=rt(Se(d)),_.c(),_.m(f,u)):_&&(_.d(1),_=null),K&64){T=d[6];let G;for(G=0;G<T.length;G+=1){const qe=ot(d,T,G);D[G]?D[G].p(qe,K):(D[G]=it(qe),D[G].c(),D[G].m(f,a))}for(;G<D.length;G+=1)D[G].d(1);D.length=T.length}(!R||K&16)&&p(a,"cx",d[4]),(!R||K&32)&&p(a,"cy",d[5]),(!R||K&6&&h!==(h="0 0 "+d[2]+" "+d[1]))&&p(f,"viewBox",h),K&256&&b!==(b=`url('cursor/svg/${d[8].name}.svg')`)&&re(f,"--cursor-0",b),K&1&&O!==(O=`${d[0]}px`)&&re(c,"--grid-size",O);const ne={};K&4194313&&(ne.$$scope={dirty:K,ctx:d}),j.$set(ne)},i(d){R||(m(n.$$.fragment,d),m(l.$$.fragment,d),m(r.$$.fragment,d),m(j.$$.fragment,d),m(S.$$.fragment,d),R=!0)},o(d){$(n.$$.fragment,d),$(l.$$.fragment,d),$(r.$$.fragment,d),$(j.$$.fragment,d),$(S.$$.fragment,d),R=!1},d(d){d&&y(e),L(n,d),d&&y(s),L(l,d),d&&y(o),L(r,d),d&&y(i),d&&y(c),_&&_.d(),Ke(D,d),k(),d&&y(N),L(j,d),d&&y(E),L(S,d),M=!1,Z(x)}}}function vn(t,e,n){let s,l;ft(t,Be,M=>n(8,l=M));let o=0,r=0,i=!0,c=50,f=0,u=0,a=[];const h=[new W({default_combo:"v",combo:"shift + alt + y",description:"Move mode",callback:()=>ie.transition("move")}),new W({default_combo:"p",description:"Draw mode",callback:()=>ie.transition("draw")}),new W({default_combo:"ctrl+z",description:"Undo",callback:()=>{a.pop(),n(6,a)}})];function b(M){l.onMouseMove(M);const{clientX:x,clientY:_}=M,{left:T,top:D}=M.currentTarget.getBoundingClientRect();i?(n(4,f=Ie(x,s)-T),n(5,u=Ie(_,s)-D)):(n(4,f=x-T),n(5,u=_-D))}let k=!1;function O(M){l.onMouseDown(M),a.push(new Le(f,u)),n(6,a),n(7,k=!0)}function N(M){l.onMouseUp(M),n(7,k=!1)}function j(M){var _;const x=document.activeElement;if(x instanceof HTMLInputElement&&x.dataset.blockShortcuts!=="false"||((_=x==null?void 0:x.dataset)==null?void 0:_.blockShortcuts)==="true"){M.currentTarget===document.activeElement&&l.onKeyPress(M);return}l.onKeyPress(M);for(const T of h)T.try(M)}function E(){r=this.clientWidth,o=this.clientHeight,n(2,r),n(1,o)}function S(M){i=M,n(3,i)}function R(){c=this.value,n(0,c)}return t.$$.update=()=>{t.$$.dirty&1&&(s=c/4)},[c,o,r,i,f,u,a,k,l,b,O,N,j,E,S,R]}class wn extends Y{constructor(e){super(),I(this,e,vn,yn,q,{})}}new wn({target:document.body});
