import{s as u,f as v,a as h,g as d,h as $,A as b,c as y,d as m,j as f,i as w,x as g,y as c,o as x,B as L,p as T}from"../chunks/scheduler.035644c2.js";import{S as p,i as _,b as z,d as H,m as D,a as M,t as S,e as C}from"../chunks/index.80d11f80.js";function I(r){let e,s,t='<div class="i-logos"><div class="i-logo fade-svelte svelte-187b46b"><img src="/svelte-logo.svg" alt="svelte logo" class="svelte svelte-187b46b"/> <div class="i-letter fade-svelte svelte-187b46b">S</div></div> <div class="i-logo fade-hello not-first svelte-187b46b"><img src="/waving-logo.svg" alt="waving logo" class="svelte-187b46b"/> <div class="i-letter fade-hello not-first svelte-187b46b">H</div></div> <div class="i-logo fade-trpc not-first svelte-187b46b"><img src="/trpc-logo.svg" alt="trpc logo" class="svelte-187b46b"/> <div class="i-letter fade-trpc not-first svelte-187b46b">T</div></div> <div class="i-logo fade-zod not-first svelte-187b46b"><img src="/zod-logo.svg" alt="zod logo" class="zod svelte-187b46b"/> <div class="i-letter fade-zod not-first svelte-187b46b">Z</div></div></div>',a,i,l='<a href="/docs/v0/install" class="svelte-187b46b">DOCS</a>';return{c(){e=v("div"),s=v("div"),s.innerHTML=t,a=h(),i=v("div"),i.innerHTML=l,this.h()},l(o){e=d(o,"DIV",{class:!0});var n=$(e);s=d(n,"DIV",{class:!0,"data-svelte-h":!0}),b(s)!=="svelte-1xzff5g"&&(s.innerHTML=t),a=y(n),i=d(n,"DIV",{class:!0,"data-svelte-h":!0}),b(i)!=="svelte-gw55be"&&(i.innerHTML=l),n.forEach(m),this.h()},h(){f(s,"class","logo svelte-187b46b"),f(i,"class","docs svelte-187b46b"),f(e,"class","wrapper svelte-187b46b")},m(o,n){w(o,e,n),g(e,s),r[1](s),g(e,a),g(e,i)},p:c,i:c,o:c,d(o){o&&m(e),r[1](null)}}}function V(r,e,s){let t=[],a;x(function(){let l=a.querySelectorAll(".i-logo");t.push(setTimeout(function(){for(let o=0,n=l.length;o<n;o++)l[o].classList.add("animate")},500))}),L(function(){for(let l=0,o=t.length;l<o;l++)clearTimeout(t[l])});function i(l){T[l?"unshift":"push"](()=>{a=l,s(0,a)})}return[a,i]}class q extends p{constructor(e){super(),_(this,e,V,I,u,{})}}function A(r){let e,s;return e=new q({}),{c(){z(e.$$.fragment)},l(t){H(e.$$.fragment,t)},m(t,a){D(e,t,a),s=!0},p:c,i(t){s||(M(e.$$.fragment,t),s=!0)},o(t){S(e.$$.fragment,t),s=!1},d(t){C(e,t)}}}class k extends p{constructor(e){super(),_(this,e,null,A,u,{})}}export{k as component};