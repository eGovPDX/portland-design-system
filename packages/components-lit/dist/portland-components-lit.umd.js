(function(a,c){typeof exports=="object"&&typeof module<"u"?c(exports,require("lit")):typeof define=="function"&&define.amd?define(["exports","lit"],c):(a=typeof globalThis<"u"?globalThis:a||self,c(a.PortlandComponentsLit={},a.Lit))})(this,function(a,c){"use strict";var ie=Object.create;var ut=Object.defineProperty;var oe=Object.getOwnPropertyDescriptor;var jt=(a,c)=>(c=Symbol[a])?c:Symbol.for("Symbol."+a),X=a=>{throw TypeError(a)};var zt=(a,c,l)=>c in a?ut(a,c,{enumerable:!0,configurable:!0,writable:!0,value:l}):a[c]=l;var Nt=(a,c)=>ut(a,"name",{value:c,configurable:!0});var Dt=a=>[,,,ie((a==null?void 0:a[jt("metadata")])??null)],Lt=["class","method","getter","setter","accessor","field","value","get","set"],Q=a=>a!==void 0&&typeof a!="function"?X("Function expected"):a,ne=(a,c,l,A,$)=>({kind:Lt[a],name:c,metadata:A,addInitializer:y=>l._?X("Already initialized"):$.push(Q(y||null))}),dt=(a,c)=>zt(c,jt("metadata"),a[3]),m=(a,c,l,A)=>{for(var $=0,y=a[c>>1],U=y&&y.length;$<U;$++)c&1?y[$].call(l):A=y[$].call(l,A);return A},P=(a,c,l,A,$,y)=>{var U,S,Y,O,V,d=c&7,W=!!(c&8),C=!!(c&16),B=d>3?a.length+1:d?W?1:2:0,tt=Lt[d+5],x=d>3&&(a[B-1]=[]),et=a[B]||(a[B]=[]),w=d&&(!C&&!W&&($=$.prototype),d<5&&(d>3||!C)&&oe(d<4?$:{get[l](){return Rt(this,y)},set[l](_){return It(this,y,_)}},l));d?C&&d<4&&Nt(y,(d>2?"set ":d>1?"get ":"")+l):Nt($,l);for(var I=A.length-1;I>=0;I--)O=ne(d,l,Y={},a[3],et),d&&(O.static=W,O.private=C,V=O.access={has:C?_=>re($,_):_=>l in _},d^3&&(V.get=C?_=>(d^1?Rt:ae)(_,$,d^4?y:w.get):_=>_[l]),d>2&&(V.set=C?(_,H)=>It(_,$,H,d^4?y:w.set):(_,H)=>_[l]=H)),S=(0,A[I])(d?d<4?C?y:w[tt]:d>4?void 0:{get:w.get,set:w.set}:$,O),Y._=1,d^4||S===void 0?Q(S)&&(d>4?x.unshift(S):d?C?y=S:w[tt]=S:$=S):typeof S!="object"||S===null?X("Object expected"):(Q(U=S.get)&&(w.get=U),Q(U=S.set)&&(w.set=U),Q(U=S.init)&&x.unshift(U));return d||dt(a,$),w&&ut($,l,w),C?d^4?y:w:$},k=(a,c,l)=>zt(a,typeof c!="symbol"?c+"":c,l),pt=(a,c,l)=>c.has(a)||X("Cannot "+l),re=(a,c)=>Object(c)!==c?X('Cannot use the "in" operator on this value'):a.has(c),Rt=(a,c,l)=>(pt(a,c,"read from private field"),l?l.call(a):c.get(a));var It=(a,c,l,A)=>(pt(a,c,"write to private field"),A?A.call(a,l):c.set(a,l),l),ae=(a,c,l)=>(pt(a,c,"access private method"),l);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Et,Ct,xt,kt,Ut,Pt,Tt,Mt,Ot,Ht,p;const l=globalThis,A=l.ShadowRoot&&(l.ShadyCSS===void 0||l.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$=Symbol(),y=new WeakMap;let U=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==$)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(A&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=y.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&y.set(e,t))}return t}toString(){return this.cssText}};const S=o=>new U(typeof o=="string"?o:o+"",void 0,$),Y=(o,t)=>{if(A)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=l.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,o.appendChild(s)}},O=A?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return S(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:V,defineProperty:d,getOwnPropertyDescriptor:W,getOwnPropertyNames:C,getOwnPropertySymbols:B,getPrototypeOf:tt}=Object,x=globalThis,et=x.trustedTypes,w=et?et.emptyScript:"",I=x.reactiveElementPolyfillSupport,_=(o,t)=>o,H={toAttribute(o,t){switch(t){case Boolean:o=o?w:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},at=(o,t)=>!V(o,t),bt={attribute:!0,type:String,converter:H,reflect:!1,useDefault:!1,hasChanged:at};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),x.litPropertyMetadata??(x.litPropertyMetadata=new WeakMap);class F extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=bt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&d(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:n}=W(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:i,set(r){const u=i==null?void 0:i.call(this);n==null||n.call(this,r),this.requestUpdate(t,u,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??bt}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=tt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const e=this.properties,s=[...C(e),...B(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(O(i))}else t!==void 0&&e.push(O(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Y(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:H).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){var n,r;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const u=s.getPropertyOptions(i),h=typeof u.converter=="function"?{fromAttribute:u.converter}:((n=u.converter)==null?void 0:n.fromAttribute)!==void 0?u.converter:H;this._$Em=i;const f=h.fromAttribute(e,u.type);this[i]=f??((r=this._$Ej)==null?void 0:r.get(i))??f,this._$Em=null}}requestUpdate(t,e,s){var i;if(t!==void 0){const n=this.constructor,r=this[t];if(s??(s=n.getPropertyOptions(t)),!((s.hasChanged??at)(r,e)||s.useDefault&&s.reflect&&r===((i=this._$Ej)==null?void 0:i.get(t))&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[n,r]of i){const{wrapped:u}=r,h=this[n];u!==!0||this._$AL.has(n)||h===void 0||this.C(n,void 0,r,h)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var n;return(n=i.hostUpdate)==null?void 0:n.call(i)}),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}}F.elementStyles=[],F.shadowRootOptions={mode:"open"},F[_("elementProperties")]=new Map,F[_("finalized")]=new Map,I==null||I({ReactiveElement:F}),(x.reactiveElementVersions??(x.reactiveElementVersions=[])).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qt={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:at},Vt=(o=qt,t,e)=>{const{kind:s,metadata:i}=e;let n=globalThis.litPropertyMetadata.get(i);if(n===void 0&&globalThis.litPropertyMetadata.set(i,n=new Map),s==="setter"&&((o=Object.create(o)).wrapped=!0),n.set(e.name,o),s==="accessor"){const{name:r}=e;return{set(u){const h=t.get.call(this);t.set.call(this,u),this.requestUpdate(r,h,o)},init(u){return u!==void 0&&this.C(r,void 0,o,u),u}}}if(s==="setter"){const{name:r}=e;return function(u){const h=this[r];t.call(this,u),this.requestUpdate(r,h,o)}}throw Error("Unsupported decorator location: "+s)};function T(o){return(t,e)=>typeof e=="object"?Vt(o,t,e):((s,i,n)=>{const r=i.hasOwnProperty(n);return i.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(i,n):void 0})(o,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=globalThis,st=J.trustedTypes,$t=st?st.createPolicy("lit-html",{createHTML:o=>o}):void 0,ft="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,_t="?"+N,Wt=`<${_t}>`,j=document,it=()=>j.createComment(""),K=o=>o===null||typeof o!="object"&&typeof o!="function",ct=Array.isArray,Bt=o=>ct(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",ht=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,mt=/>/g,z=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,vt=/"/g,At=/^(?:script|style|textarea|title)$/i,L=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),St=new WeakMap,D=j.createTreeWalker(j,129);function wt(o,t){if(!ct(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return $t!==void 0?$t.createHTML(t):t}const Ft=(o,t)=>{const e=o.length-1,s=[];let i,n=t===2?"<svg>":t===3?"<math>":"",r=Z;for(let u=0;u<e;u++){const h=o[u];let f,v,b=-1,M=0;for(;M<h.length&&(r.lastIndex=M,v=r.exec(h),v!==null);)M=r.lastIndex,r===Z?v[1]==="!--"?r=gt:v[1]!==void 0?r=mt:v[2]!==void 0?(At.test(v[2])&&(i=RegExp("</"+v[2],"g")),r=z):v[3]!==void 0&&(r=z):r===z?v[0]===">"?(r=i??Z,b=-1):v[1]===void 0?b=-2:(b=r.lastIndex-v[2].length,f=v[1],r=v[3]===void 0?z:v[3]==='"'?vt:yt):r===vt||r===yt?r=z:r===gt||r===mt?r=Z:(r=z,i=void 0);const R=r===z&&o[u+1].startsWith("/>")?" ":"";n+=r===Z?h+Wt:b>=0?(s.push(f),h.slice(0,b)+ft+h.slice(b)+N+R):h+N+(b===-2?u:R)}return[wt(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,r=0;const u=t.length-1,h=this.parts,[f,v]=Ft(t,e);if(this.el=G.createElement(f,s),D.currentNode=this.el.content,e===2||e===3){const b=this.el.content.firstChild;b.replaceWith(...b.childNodes)}for(;(i=D.nextNode())!==null&&h.length<u;){if(i.nodeType===1){if(i.hasAttributes())for(const b of i.getAttributeNames())if(b.endsWith(ft)){const M=v[r++],R=i.getAttribute(b).split(N),rt=/([.?@])?(.*)/.exec(M);h.push({type:1,index:n,name:rt[2],strings:R,ctor:rt[1]==="."?Kt:rt[1]==="?"?Zt:rt[1]==="@"?Gt:nt}),i.removeAttribute(b)}else b.startsWith(N)&&(h.push({type:6,index:n}),i.removeAttribute(b));if(At.test(i.tagName)){const b=i.textContent.split(N),M=b.length-1;if(M>0){i.textContent=st?st.emptyScript:"";for(let R=0;R<M;R++)i.append(b[R],it()),D.nextNode(),h.push({type:2,index:++n});i.append(b[M],it())}}}else if(i.nodeType===8)if(i.data===_t)h.push({type:2,index:n});else{let b=-1;for(;(b=i.data.indexOf(N,b+1))!==-1;)h.push({type:7,index:n}),b+=N.length-1}n++}}static createElement(t,e){const s=j.createElement("template");return s.innerHTML=t,s}}function q(o,t,e=o,s){var r,u;if(t===L)return t;let i=s!==void 0?(r=e._$Co)==null?void 0:r[s]:e._$Cl;const n=K(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==n&&((u=i==null?void 0:i._$AO)==null||u.call(i,!1),n===void 0?i=void 0:(i=new n(o),i._$AT(o,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=q(o,i._$AS(o,t.values),i,s)),t}class Jt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??j).importNode(e,!0);D.currentNode=i;let n=D.nextNode(),r=0,u=0,h=s[0];for(;h!==void 0;){if(r===h.index){let f;h.type===2?f=new ot(n,n.nextSibling,this,t):h.type===1?f=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(f=new Qt(n,this,t)),this._$AV.push(f),h=s[++u]}r!==(h==null?void 0:h.index)&&(n=D.nextNode(),r++)}return D.currentNode=j,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class ot{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=q(this,t,e),K(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==g&&K(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=G.createElement(wt(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===i)this._$AH.p(e);else{const r=new Jt(i,this),u=r.u(this.options);r.p(e),this.T(u),this._$AH=r}}_$AC(t){let e=St.get(t.strings);return e===void 0&&St.set(t.strings,e=new G(t)),e}k(t){ct(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new ot(this.O(it()),this.O(it()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class nt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,n){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=g}_$AI(t,e=this,s,i){const n=this.strings;let r=!1;if(n===void 0)t=q(this,t,e,0),r=!K(t)||t!==this._$AH&&t!==L,r&&(this._$AH=t);else{const u=t;let h,f;for(t=n[0],h=0;h<n.length-1;h++)f=q(this,u[s+h],e,h),f===L&&(f=this._$AH[h]),r||(r=!K(f)||f!==this._$AH[h]),f===g?t=g:t!==g&&(t+=(f??"")+n[h+1]),this._$AH[h]=f}r&&!i&&this.j(t)}j(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kt extends nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===g?void 0:t}}class Zt extends nt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class Gt extends nt{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){if((t=q(this,t,e,0)??g)===L)return;const s=this._$AH,i=t===g&&s!==g||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==g&&(s===g||i);i&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Qt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){q(this,t)}}const lt=J.litHtmlPolyfillSupport;lt==null||lt(G,ot),(J.litHtmlVersions??(J.litHtmlVersions=[])).push("3.3.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xt={ATTRIBUTE:1},Yt=o=>(...t)=>({_$litDirective$:o,values:t});class te{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ee=Yt(class extends te{constructor(o){var t;if(super(o),o.type!==Xt.ATTRIBUTE||o.name!=="class"||((t=o.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(t=>o[t]).join(" ")+" "}update(o,[t]){var s,i;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in t)t[n]&&!((s=this.nt)!=null&&s.has(n))&&this.st.add(n);return this.render(t)}const e=o.element.classList;for(const n of this.st)n in t||(e.remove(n),this.st.delete(n));for(const n in t){const r=!!t[n];r===this.st.has(n)||(i=this.nt)!=null&&i.has(n)||(r?(e.add(n),this.st.add(n)):(e.remove(n),this.st.delete(n)))}return L}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const se=o=>o??g;class E extends(Ht=c.LitElement,Ot=[T({type:String})],Mt=[T({type:String})],Tt=[T({type:Boolean})],Pt=[T({type:Boolean,attribute:"aria-disabled"})],Ut=[T({type:Boolean})],kt=[T({type:String})],xt=[T({type:String,attribute:"start-icon"})],Ct=[T({type:String,attribute:"end-icon"})],Et=[T({type:String,attribute:"class"})],Ht){constructor(){super(...arguments);k(this,"variant",m(p,8,this,"default")),m(p,11,this);k(this,"size",m(p,12,this,"default")),m(p,15,this);k(this,"disabled",m(p,16,this,!1)),m(p,19,this);k(this,"ariaDisabled",m(p,20,this,!1)),m(p,23,this);k(this,"unstyled",m(p,24,this,!1)),m(p,27,this);k(this,"type",m(p,28,this,"button")),m(p,31,this);k(this,"startIcon",m(p,32,this,"")),m(p,35,this);k(this,"endIcon",m(p,36,this,"")),m(p,39,this);k(this,"className",m(p,40,this,"")),m(p,43,this)}_handleClick(e){if(this.disabled||this.ariaDisabled){e.preventDefault(),e.stopPropagation();return}this.dispatchEvent(new CustomEvent("portland-button-click",{detail:{originalEvent:e},bubbles:!0,composed:!0}))}_renderIcon(e,s){return e?e.includes("fa-")?c.html`
        <span class="fa-icon fa-icon--${s}">
          <i class="${e}"></i>
        </span>
      `:c.html`
      <span class="usa-button__icon usa-button__icon--${s}">
        ${e}
      </span>
    `:""}render(){const e="usa-button",s=this.variant!=="default"?`${e}--${this.variant}`:"",i=this.size==="big"?`${e}--big`:"",n=this.unstyled?`${e}--unstyled`:"",r={[e]:!0,[s]:!!s,[i]:!!i,[n]:!!n,[this.className]:!!this.className};return c.html`
      <button
        type="${this.type}"
        class="${ee(r)}"
        ?disabled="${this.disabled}"
        aria-disabled="${se(this.ariaDisabled||this.disabled?"true":void 0)}"
        @click="${this._handleClick}"
      >
        ${this._renderIcon(this.startIcon,"left")}
        <slot></slot>
        ${this._renderIcon(this.endIcon,"right")}
      </button>
    `}}p=Dt(Ht),P(p,5,"variant",Ot,E),P(p,5,"size",Mt,E),P(p,5,"disabled",Tt,E),P(p,5,"ariaDisabled",Pt,E),P(p,5,"unstyled",Ut,E),P(p,5,"type",kt,E),P(p,5,"startIcon",xt,E),P(p,5,"endIcon",Ct,E),P(p,5,"className",Et,E),dt(p,E),k(E,"styles",c.css`
    :host {
      display: inline-block;
    }

    .usa-button {
      font-family: 'Source Sans Pro', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: 1.06rem;
      line-height: 0.9;
      background-color: #005ea2;
      border: 0;
      border-radius: 0.25rem;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-weight: 700;
      margin-right: 0.5rem;
      padding: 0.75rem 1.25rem;
      text-align: center;
      text-decoration: none;
      width: auto;
      -webkit-font-smoothing: subpixel-antialiased;
    }

    .usa-button:visited {
      color: white;
    }

    .usa-button:hover,
    .usa-button.usa-button--hover {
      background-color: #1a4480;
      border-bottom: 0;
      color: white;
      text-decoration: none;
    }

    .usa-button:active,
    .usa-button.usa-button--active {
      background-color: #162e51;
      color: white;
    }

    .usa-button:focus,
    .usa-button.usa-button--focus {
      outline: 0.25rem solid #fd0;
      outline-offset: 0;
    }

    .usa-button:disabled,
    .usa-button.usa-button--disabled {
      background-color: #c9c9c9;
      color: #454545;
      cursor: not-allowed;
      opacity: 1;
    }

    .usa-button:disabled:hover,
    .usa-button.usa-button--disabled:hover,
    .usa-button:disabled:active,
    .usa-button.usa-button--disabled:active,
    .usa-button:disabled:focus,
    .usa-button.usa-button--disabled:focus {
      background-color: #c9c9c9;
      border: 0;
      color: #454545;
      outline: 0;
      pointer-events: none;
      text-decoration: none;
    }

    /* Button Variants */
    .usa-button--secondary {
      background-color: #d83933;
      color: white;
    }

    .usa-button--secondary:hover,
    .usa-button--secondary.usa-button--hover {
      background-color: #b50909;
    }

    .usa-button--secondary:active,
    .usa-button--secondary.usa-button--active {
      background-color: #8b0a03;
    }

    .usa-button--accent-cool {
      background-color: #00bde3;
      color: white;
    }

    .usa-button--accent-cool:hover,
    .usa-button--accent-cool.usa-button--hover {
      background-color: #28a0cb;
    }

    .usa-button--accent-cool:active,
    .usa-button--accent-cool.usa-button--active {
      background-color: #07648d;
    }

    .usa-button--accent-warm {
      background-color: #fa9441;
      color: white;
    }

    .usa-button--accent-warm:hover,
    .usa-button--accent-warm.usa-button--hover {
      background-color: #c05600;
    }

    .usa-button--accent-warm:active,
    .usa-button--accent-warm.usa-button--active {
      background-color: #775540;
    }

    .usa-button--base {
      background-color: #565c65;
      color: white;
    }

    .usa-button--base:hover,
    .usa-button--base.usa-button--hover {
      background-color: #3d4551;
    }

    .usa-button--base:active,
    .usa-button--base.usa-button--active {
      background-color: #2d2e2f;
    }

    .usa-button--outline {
      background-color: transparent;
      border: 2px solid #005ea2;
      color: #005ea2;
    }

    .usa-button--outline:hover,
    .usa-button--outline.usa-button--hover {
      background-color: #005ea2;
      border-color: #005ea2;
      color: white;
    }

    .usa-button--outline:active,
    .usa-button--outline.usa-button--active {
      background-color: #1a4480;
      border-color: #1a4480;
      color: white;
    }

    .usa-button--outline-inverse {
      background-color: transparent;
      border: 2px solid white;
      color: white;
    }

    .usa-button--outline-inverse:hover,
    .usa-button--outline-inverse.usa-button--hover {
      background-color: white;
      border-color: white;
      color: #1b1b1b;
    }

    .usa-button--outline-inverse:active,
    .usa-button--outline-inverse.usa-button--active {
      background-color: #c9c9c9;
      border-color: #c9c9c9;
      color: #1b1b1b;
    }

    /* Size Variants */
    .usa-button--big {
      font-size: 1.31rem;
      padding: 1rem 2rem;
    }

    /* Unstyled */
    .usa-button--unstyled {
      background-color: transparent;
      border: 0;
      border-radius: 0;
      color: #005ea2;
      font-weight: normal;
      margin: 0;
      padding: 0;
      text-align: left;
    }

    .usa-button--unstyled:hover,
    .usa-button--unstyled.usa-button--hover {
      background-color: transparent;
      color: #1a4480;
      text-decoration: underline;
    }

    /* Icon styles */
    .usa-button__icon {
      height: 1em;
      width: 1em;
      fill: currentColor;
      vertical-align: text-bottom;
    }

    .usa-button__icon--left {
      margin-right: 0.5rem;
    }

    .usa-button__icon--right {
      margin-left: 0.5rem;
    }

    /* FontAwesome icon support */
    .fa-icon {
      height: 1em;
      width: 1em;
      vertical-align: text-bottom;
    }

    .fa-icon--left {
      margin-right: 0.5rem;
    }

    .fa-icon--right {
      margin-left: 0.5rem;
    }
  `),customElements.define("portland-button",E),a.PortlandButton=E,Object.defineProperty(a,Symbol.toStringTag,{value:"Module"})});
