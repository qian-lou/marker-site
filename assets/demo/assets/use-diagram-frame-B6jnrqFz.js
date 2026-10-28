import{c as o}from"./code-fold-state-B8hkYh6t.js";import{r as e}from"./document-store-DIXJ_f6B.js";/**
 * @license lucide-react v0.446.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=o("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);function p(s){const l=e.useRef(s);l.current=s;const u=e.useRef(null),r=e.useRef(null),c=e.useCallback(()=>{r.current!==null&&cancelAnimationFrame(r.current),r.current=null,u.current=null},[]),t=e.useCallback(()=>{const n=u.current;c(),n&&l.current(n)},[c]),a=e.useCallback(n=>{u.current=n,r.current===null&&(r.current=requestAnimationFrame(t))},[t]);return e.useEffect(()=>c,[c]),{schedule:a,flush:t,cancel:c}}export{m as P,p as u};
