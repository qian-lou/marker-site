import{r as a}from"./index-BxCVx93G.js";var i={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y=a,v=Symbol.for("react.element"),w=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,k=y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,b={key:!0,ref:!0,__self:!0,__source:!0};function p(t,e,o){var r,s={},n=null,u=null;o!==void 0&&(n=""+o),e.key!==void 0&&(n=""+e.key),e.ref!==void 0&&(u=e.ref);for(r in e)x.call(e,r)&&!b.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:v,type:t,key:n,ref:u,props:s,_owner:k.current}}l.Fragment=w;l.jsx=p;l.jsxs=p;i.exports=l;var j=i.exports;/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),c=(...t)=>t.filter((e,o,r)=>!!e&&r.indexOf(e)===o).join(" ");/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=a.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:o=2,absoluteStrokeWidth:r,className:s="",children:n,iconNode:u,...f},m)=>a.createElement("svg",{ref:m,...E,width:e,height:e,stroke:t,strokeWidth:r?Number(o)*24/Number(e):o,className:c("lucide",s),...f},[...u.map(([d,_])=>a.createElement(d,_)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=(t,e)=>{const o=a.forwardRef(({className:r,...s},n)=>a.createElement(R,{ref:n,iconNode:e,className:c(`lucide-${h(t)}`,r),...s}));return o.displayName=`${t}`,o};/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=O("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);export{C as X,O as c,j};
