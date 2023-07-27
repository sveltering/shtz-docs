var C=Object.defineProperty;var D=(t,n,e)=>n in t?C(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var f=(t,n,e)=>(D(t,typeof n!="symbol"?n+"":n,e),e);function B(){}function O(t,n){for(const e in n)t[e]=n[e];return t}function q(t){return t()}function et(){return Object.create(null)}function G(t){t.forEach(q)}function it(t){return typeof t=="function"}function lt(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function st(t){return Object.keys(t).length===0}function R(t,...n){if(t==null){for(const i of n)i(void 0);return B}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function ct(t,n,e){t.$$.on_destroy.push(R(n,e))}function rt(t,n,e,i){if(t){const l=H(t,n,e,i);return t[0](l)}}function H(t,n,e,i){return t[1]&&i?O(e.ctx.slice(),t[1](i(n))):e.ctx}function ot(t,n,e,i){if(t[2]&&i){const l=t[2](i(e));if(n.dirty===void 0)return l;if(typeof l=="object"){const r=[],s=Math.max(n.dirty.length,l.length);for(let o=0;o<s;o+=1)r[o]=n.dirty[o]|l[o];return r}return n.dirty|l}return n.dirty}function ut(t,n,e,i,l,r){if(l){const s=H(n,e,i,r);t.p(s,l)}}function at(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let p=!1;function ft(){p=!0}function _t(){p=!1}function z(t,n,e,i){for(;t<n;){const l=t+(n-t>>1);e(l)<=i?t=l+1:n=l}return t}function F(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&c.push(a)}n=c}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let l=0;for(let c=0;c<n.length;c++){const u=n[c].claim_order,a=(l>0&&n[e[l]].claim_order<=u?l+1:z(1,l,j=>n[e[j]].claim_order,u))-1;i[c]=e[a]+1;const N=a+1;e[N]=c,l=Math.max(N,l)}const r=[],s=[];let o=n.length-1;for(let c=e[l]+1;c!=0;c=i[c-1]){for(r.push(n[c-1]);o>=c;o--)s.push(n[o]);o--}for(;o>=0;o--)s.push(n[o]);r.reverse(),s.sort((c,u)=>c.claim_order-u.claim_order);for(let c=0,u=0;c<s.length;c++){for(;u<r.length&&s[c].claim_order>=r[u].claim_order;)u++;const a=u<r.length?r[u]:null;t.insertBefore(s[c],a)}}function W(t,n){if(p){for(F(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function I(t,n,e){t.insertBefore(n,e||null)}function J(t,n,e){p&&!e?W(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function x(t){t.parentNode&&t.parentNode.removeChild(t)}function dt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function L(t){return document.createElement(t)}function K(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function ht(){return T(" ")}function mt(){return T("")}function pt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function yt(t){return function(n){return n.stopPropagation(),t.call(this,n)}}function gt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function bt(t){return t.dataset.svelteH}function xt(t){return Array.from(t.childNodes)}function M(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function S(t,n,e,i,l=!1){M(t);const r=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(n(o)){const c=e(o);return c===void 0?t.splice(s,1):t[s]=c,l||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(n(o)){const c=e(o);return c===void 0?t.splice(s,1):t[s]=c,l?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,r}function Q(t,n,e,i){return S(t,l=>l.nodeName===n,l=>{const r=[];for(let s=0;s<l.attributes.length;s++){const o=l.attributes[s];e[o.name]||r.push(o.name)}r.forEach(s=>l.removeAttribute(s))},()=>i(n))}function Et(t,n,e){return Q(t,n,e,L)}function U(t,n){return S(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>T(n),!0)}function Tt(t){return U(t," ")}function v(t,n,e){for(let i=e;i<t.length;i+=1){const l=t[i];if(l.nodeType===8&&l.textContent.trim()===n)return i}return-1}function Nt(t,n){const e=v(t,"HTML_TAG_START",0),i=v(t,"HTML_TAG_END",e+1);if(e===-1||i===-1)return new w(n);M(t);const l=t.splice(e,i-e+1);x(l[0]),x(l[l.length-1]);const r=l.slice(1,l.length-1);for(const s of r)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new w(n,r)}function vt(t,n){n=""+n,t.data!==n&&(t.data=n)}function wt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function At(t,n,e){t.classList.toggle(n,!!e)}function V(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function kt(t,n){const e=[];let i=0;for(const l of n.childNodes)if(l.nodeType===8){const r=l.textContent.trim();r===`HEAD_${t}_END`?(i-=1,e.push(l)):r===`HEAD_${t}_START`&&(i+=1,e.push(l))}else i>0&&e.push(l);return e}class X{constructor(n=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=n,this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.is_svg?this.e=K(e.nodeName):this.e=L(e.nodeType===11?"TEMPLATE":e.nodeName),this.t=e.tagName!=="TEMPLATE"?e:e.content,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)I(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(x)}}class w extends X{constructor(e=!1,i){super(e);f(this,"l");this.e=this.n=null,this.l=i}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let i=0;i<this.n.length;i+=1)J(this.t,this.n[i],e)}}function Ht(t,n){return new t(n)}let m;function g(t){m=t}function y(){if(!m)throw new Error("Function called outside component initialization");return m}function Lt(t){y().$$.on_mount.push(t)}function Mt(t){y().$$.after_update.push(t)}function St(t){y().$$.on_destroy.push(t)}function Pt(){const t=y();return(n,e,{cancelable:i=!1}={})=>{const l=t.$$.callbacks[n];if(l){const r=V(n,e,{cancelable:i});return l.slice().forEach(s=>{s.call(t,r)}),!r.defaultPrevented}return!0}}const h=[],A=[];let d=[];const k=[],P=Promise.resolve();let E=!1;function Y(){E||(E=!0,P.then($))}function jt(){return Y(),P}function Z(t){d.push(t)}const b=new Set;let _=0;function $(){if(_!==0)return;const t=m;do{try{for(;_<h.length;){const n=h[_];_++,g(n),tt(n.$$)}}catch(n){throw h.length=0,_=0,n}for(g(null),h.length=0,_=0;A.length;)A.pop()();for(let n=0;n<d.length;n+=1){const e=d[n];b.has(e)||(b.add(e),e())}d.length=0}while(h.length);for(;k.length;)k.pop()();E=!1,b.clear(),g(t)}function tt(t){if(t.fragment!==null){t.update(),G(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(Z)}}function Ct(t){const n=[],e=[];d.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),d=n}export{bt as A,St as B,G as C,dt as D,Pt as E,pt as F,it as G,At as H,yt as I,w as J,kt as K,Nt as L,et as M,$ as N,st as O,Z as P,Ct as Q,m as R,g as S,q as T,h as U,Y as V,ft as W,_t as X,ht as a,Mt as b,Tt as c,x as d,mt as e,L as f,Et as g,xt as h,J as i,gt as j,wt as k,T as l,U as m,vt as n,Lt as o,A as p,Ht as q,rt as r,lt as s,jt as t,ut as u,at as v,ot as w,W as x,B as y,ct as z};
