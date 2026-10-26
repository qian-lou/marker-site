import{c as h,j as l}from"./code-fold-state-BTA_V7N0.js";import{r as c}from"./document-store-cVRjWMvp.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=h("AlignCenterHorizontal",[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4",key:"11f1s0"}],["path",{d:"M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4",key:"t14dx9"}],["path",{d:"M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1",key:"1w07xs"}],["path",{d:"M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1",key:"1apec2"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=h("AlignCenterVertical",[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"M8 10H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h4",key:"14d6g8"}],["path",{d:"M16 10h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-4",key:"1e2lrw"}],["path",{d:"M8 20H7a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h1",key:"1fkdwx"}],["path",{d:"M16 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1",key:"1euafb"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=h("AlignEndHorizontal",[["rect",{width:"6",height:"16",x:"4",y:"2",rx:"2",key:"z5wdxg"}],["rect",{width:"6",height:"9",x:"14",y:"9",rx:"2",key:"um7a8w"}],["path",{d:"M22 22H2",key:"19qnx5"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=h("AlignEndVertical",[["rect",{width:"16",height:"6",x:"2",y:"4",rx:"2",key:"10wcwx"}],["rect",{width:"9",height:"6",x:"9",y:"14",rx:"2",key:"4p5bwg"}],["path",{d:"M22 22V2",key:"12ipfv"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=h("AlignStartHorizontal",[["rect",{width:"6",height:"16",x:"4",y:"6",rx:"2",key:"1n4dg1"}],["rect",{width:"6",height:"9",x:"14",y:"6",rx:"2",key:"17khns"}],["path",{d:"M22 2H2",key:"fhrpnj"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=h("AlignStartVertical",[["rect",{width:"9",height:"6",x:"6",y:"14",rx:"2",key:"lpm2y7"}],["rect",{width:"16",height:"6",x:"6",y:"4",rx:"2",key:"rdj6ps"}],["path",{d:"M2 2v20",key:"1ivd8o"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=h("Hand",[["path",{d:"M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2",key:"1fvzgz"}],["path",{d:"M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2",key:"1kc0my"}],["path",{d:"M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8",key:"10h0bg"}],["path",{d:"M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",key:"1s1gnw"}]]);/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=h("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);function u(i,t,n){if(!Number.isFinite(i)||!Number.isFinite(t)||t<=0||!Number.isFinite(n)||n<0)return[];const r=10**Math.floor(Math.log10(80/t)),a=80/t/r,e=(a<=1?1:a<=2?2:a<=5?5:10)*r,d=[],s=e/5,p=Math.floor((22-i)/t/s),x=Math.ceil((n-i)/t/s);for(let o=p;o<=x;o++)d.push({value:Math.round(o*s*1e3)/1e3,pixel:i+o*s*t,major:o%5===0});return d}function H({x:i,y:t,scale:n,width:r,height:a}){return l.jsxs("div",{className:"flow-rulers","aria-hidden":"true",children:[l.jsx("div",{className:"flow-ruler-corner",children:"px"}),l.jsx("svg",{className:"flow-ruler-horizontal",width:r,height:22,children:u(i,n,r).map(e=>l.jsxs("g",{children:[l.jsx("path",{d:`M ${e.pixel} ${e.major?15:18} V 22`}),e.major&&l.jsx("text",{x:e.pixel+4,y:11,children:e.value})]},e.value))}),l.jsx("svg",{className:"flow-ruler-vertical",width:22,height:a,children:u(t,n,a).map(e=>l.jsxs("g",{children:[l.jsx("path",{d:`M ${e.major?15:18} ${e.pixel} H 22`}),e.major&&l.jsx("text",{transform:`translate(10 ${e.pixel+4}) rotate(-90)`,textAnchor:"end",children:e.value})]},e.value))})]})}function V(i){const t=c.useRef(i);t.current=i;const n=c.useRef(null),r=c.useRef(null),a=c.useCallback(()=>{r.current!==null&&cancelAnimationFrame(r.current),r.current=null,n.current=null},[]),e=c.useCallback(()=>{const s=n.current;a(),s&&t.current(s)},[a]),d=c.useCallback(s=>{n.current=s,r.current===null&&(r.current=requestAnimationFrame(e))},[e]);return c.useEffect(()=>a,[a]),{schedule:d,flush:e,cancel:a}}export{w as A,H as D,j as H,A as P,k as a,M as b,f as c,m as d,v as e,V as u};
