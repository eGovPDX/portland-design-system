var zt = Object.create;
var J = Object.defineProperty;
var jt = Object.getOwnPropertyDescriptor;
var ct = (o, t) => (t = Symbol[o]) ? t : Symbol.for("Symbol." + o), T = (o) => {
  throw TypeError(o);
};
var ht = (o, t, e) => t in o ? J(o, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[t] = e;
var nt = (o, t) => J(o, "name", { value: t, configurable: !0 });
var lt = (o) => [, , , zt((o == null ? void 0 : o[ct("metadata")]) ?? null)], ut = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"], M = (o) => o !== void 0 && typeof o != "function" ? T("Function expected") : o, Dt = (o, t, e, s, i) => ({ kind: ut[o], name: t, metadata: s, addInitializer: (n) => e._ ? T("Already initialized") : i.push(M(n || null)) }), K = (o, t) => ht(t, ct("metadata"), o[3]), b = (o, t, e, s) => {
  for (var i = 0, n = o[t >> 1], r = n && n.length; i < r; i++) t & 1 ? n[i].call(e) : s = n[i].call(e, s);
  return s;
}, v = (o, t, e, s, i, n) => {
  var r, h, c, u, d, a = t & 7, f = !!(t & 8), p = !!(t & 16), w = a > 3 ? o.length + 1 : a ? f ? 1 : 2 : 0, it = ut[a + 5], ot = a > 3 && (o[w - 1] = []), It = o[w] || (o[w] = []), m = a && (!p && !f && (i = i.prototype), a < 5 && (a > 3 || !p) && jt(a < 4 ? i : { get [e]() {
    return rt(this, n);
  }, set [e](_) {
    return at(this, n, _);
  } }, e));
  a ? p && a < 4 && nt(n, (a > 2 ? "set " : a > 1 ? "get " : "") + e) : nt(i, e);
  for (var B = s.length - 1; B >= 0; B--)
    u = Dt(a, e, c = {}, o[3], It), a && (u.static = f, u.private = p, d = u.access = { has: p ? (_) => Lt(i, _) : (_) => e in _ }, a ^ 3 && (d.get = p ? (_) => (a ^ 1 ? rt : qt)(_, i, a ^ 4 ? n : m.get) : (_) => _[e]), a > 2 && (d.set = p ? (_, F) => at(_, i, F, a ^ 4 ? n : m.set) : (_, F) => _[e] = F)), h = (0, s[B])(a ? a < 4 ? p ? n : m[it] : a > 4 ? void 0 : { get: m.get, set: m.set } : i, u), c._ = 1, a ^ 4 || h === void 0 ? M(h) && (a > 4 ? ot.unshift(h) : a ? p ? n = h : m[it] = h : i = h) : typeof h != "object" || h === null ? T("Object expected") : (M(r = h.get) && (m.get = r), M(r = h.set) && (m.set = r), M(r = h.init) && ot.unshift(r));
  return a || K(o, i), m && J(i, e, m), p ? a ^ 4 ? n : m : i;
}, y = (o, t, e) => ht(o, typeof t != "symbol" ? t + "" : t, e), Z = (o, t, e) => t.has(o) || T("Cannot " + e), Lt = (o, t) => Object(t) !== t ? T('Cannot use the "in" operator on this value') : o.has(t), rt = (o, t, e) => (Z(o, t, "read from private field"), e ? e.call(o) : t.get(o));
var at = (o, t, e, s) => (Z(o, t, "write to private field"), s ? s.call(o, e) : t.set(o, e), e), qt = (o, t, e) => (Z(o, t, "access private method"), e);
import { LitElement as Vt, css as Wt, html as G } from "lit";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const j = globalThis, tt = j.ShadowRoot && (j.ShadyCSS === void 0 || j.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Tt = Symbol(), dt = /* @__PURE__ */ new WeakMap();
let Bt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Tt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (tt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = dt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && dt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ft = (o) => new Bt(typeof o == "string" ? o : o + "", void 0, Tt), Jt = (o, t) => {
  if (tt) o.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = j.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, o.appendChild(s);
  }
}, pt = tt ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ft(e);
})(o) : o;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Kt, defineProperty: Zt, getOwnPropertyDescriptor: Gt, getOwnPropertyNames: Qt, getOwnPropertySymbols: Xt, getPrototypeOf: Yt } = Object, E = globalThis, bt = E.trustedTypes, te = bt ? bt.emptyScript : "", Q = E.reactiveElementPolyfillSupport, N = (o, t) => o, D = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? te : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, et = (o, t) => !Kt(o, t), $t = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: et };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), E.litPropertyMetadata ?? (E.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class O extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = $t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Zt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Gt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get: i, set(r) {
      const h = i == null ? void 0 : i.call(this);
      n == null || n.call(this, r), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? $t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(N("elementProperties"))) return;
    const t = Yt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(N("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(N("properties"))) {
      const e = this.properties, s = [...Qt(e), ...Xt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(pt(i));
    } else t !== void 0 && e.push(pt(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Jt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    var n;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (((n = s.converter) == null ? void 0 : n.toAttribute) !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var n, r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const h = s.getPropertyOptions(i), c = typeof h.converter == "function" ? { fromAttribute: h.converter } : ((n = h.converter) == null ? void 0 : n.fromAttribute) !== void 0 ? h.converter : D;
      this._$Em = i;
      const u = c.fromAttribute(e, h.type);
      this[i] = u ?? ((r = this._$Ej) == null ? void 0 : r.get(i)) ?? u, this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    var i;
    if (t !== void 0) {
      const n = this.constructor, r = this[t];
      if (s ?? (s = n.getPropertyOptions(t)), !((s.hasChanged ?? et)(r, e) || s.useDefault && s.reflect && r === ((i = this._$Ej) == null ? void 0 : i.get(t)) && !this.hasAttribute(n._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, r) {
    s && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, r ?? e ?? this[t]), n !== !0 || r !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [n, r] of this._$Ep) this[n] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [n, r] of i) {
        const { wrapped: h } = r, c = this[n];
        h !== !0 || this._$AL.has(n) || c === void 0 || this.C(n, void 0, r, c);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var n;
        return (n = i.hostUpdate) == null ? void 0 : n.call(i);
      }), this.update(e)) : this._$EM();
    } catch (i) {
      throw t = !1, this._$EM(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
O.elementStyles = [], O.shadowRootOptions = { mode: "open" }, O[N("elementProperties")] = /* @__PURE__ */ new Map(), O[N("finalized")] = /* @__PURE__ */ new Map(), Q == null || Q({ ReactiveElement: O }), (E.reactiveElementVersions ?? (E.reactiveElementVersions = [])).push("2.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ee = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: et }, se = (o = ee, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((o = Object.create(o)).wrapped = !0), n.set(e.name, o), s === "accessor") {
    const { name: r } = e;
    return { set(h) {
      const c = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(r, c, o);
    }, init(h) {
      return h !== void 0 && this.C(r, void 0, o, h), h;
    } };
  }
  if (s === "setter") {
    const { name: r } = e;
    return function(h) {
      const c = this[r];
      t.call(this, h), this.requestUpdate(r, c, o);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function A(o) {
  return (t, e) => typeof e == "object" ? se(o, t, e) : ((s, i, n) => {
    const r = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), r ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(o, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const R = globalThis, L = R.trustedTypes, ft = L ? L.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Ot = "$lit$", S = `lit$${Math.random().toFixed(9).slice(2)}$`, Ht = "?" + S, ie = `<${Ht}>`, k = document, q = () => k.createComment(""), I = (o) => o === null || typeof o != "object" && typeof o != "function", st = Array.isArray, oe = (o) => st(o) || typeof (o == null ? void 0 : o[Symbol.iterator]) == "function", X = `[ 	
\f\r]`, H = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, _t = /-->/g, gt = />/g, C = RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), mt = /'/g, yt = /"/g, Nt = /^(?:script|style|textarea|title)$/i, U = Symbol.for("lit-noChange"), $ = Symbol.for("lit-nothing"), vt = /* @__PURE__ */ new WeakMap(), x = k.createTreeWalker(k, 129);
function Rt(o, t) {
  if (!st(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(t) : t;
}
const ne = (o, t) => {
  const e = o.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", r = H;
  for (let h = 0; h < e; h++) {
    const c = o[h];
    let u, d, a = -1, f = 0;
    for (; f < c.length && (r.lastIndex = f, d = r.exec(c), d !== null); ) f = r.lastIndex, r === H ? d[1] === "!--" ? r = _t : d[1] !== void 0 ? r = gt : d[2] !== void 0 ? (Nt.test(d[2]) && (i = RegExp("</" + d[2], "g")), r = C) : d[3] !== void 0 && (r = C) : r === C ? d[0] === ">" ? (r = i ?? H, a = -1) : d[1] === void 0 ? a = -2 : (a = r.lastIndex - d[2].length, u = d[1], r = d[3] === void 0 ? C : d[3] === '"' ? yt : mt) : r === yt || r === mt ? r = C : r === _t || r === gt ? r = H : (r = C, i = void 0);
    const p = r === C && o[h + 1].startsWith("/>") ? " " : "";
    n += r === H ? c + ie : a >= 0 ? (s.push(u), c.slice(0, a) + Ot + c.slice(a) + S + p) : c + S + (a === -2 ? h : p);
  }
  return [Rt(o, n + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, r = 0;
    const h = t.length - 1, c = this.parts, [u, d] = ne(t, e);
    if (this.el = z.createElement(u, s), x.currentNode = this.el.content, e === 2 || e === 3) {
      const a = this.el.content.firstChild;
      a.replaceWith(...a.childNodes);
    }
    for (; (i = x.nextNode()) !== null && c.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const a of i.getAttributeNames()) if (a.endsWith(Ot)) {
          const f = d[r++], p = i.getAttribute(a).split(S), w = /([.?@])?(.*)/.exec(f);
          c.push({ type: 1, index: n, name: w[2], strings: p, ctor: w[1] === "." ? ae : w[1] === "?" ? ce : w[1] === "@" ? he : W }), i.removeAttribute(a);
        } else a.startsWith(S) && (c.push({ type: 6, index: n }), i.removeAttribute(a));
        if (Nt.test(i.tagName)) {
          const a = i.textContent.split(S), f = a.length - 1;
          if (f > 0) {
            i.textContent = L ? L.emptyScript : "";
            for (let p = 0; p < f; p++) i.append(a[p], q()), x.nextNode(), c.push({ type: 2, index: ++n });
            i.append(a[f], q());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ht) c.push({ type: 2, index: n });
      else {
        let a = -1;
        for (; (a = i.data.indexOf(S, a + 1)) !== -1; ) c.push({ type: 7, index: n }), a += S.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = k.createElement("template");
    return s.innerHTML = t, s;
  }
}
function P(o, t, e = o, s) {
  var r, h;
  if (t === U) return t;
  let i = s !== void 0 ? (r = e._$Co) == null ? void 0 : r[s] : e._$Cl;
  const n = I(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== n && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), n === void 0 ? i = void 0 : (i = new n(o), i._$AT(o, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = P(o, i._$AS(o, t.values), i, s)), t;
}
class re {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    x.currentNode = i;
    let n = x.nextNode(), r = 0, h = 0, c = s[0];
    for (; c !== void 0; ) {
      if (r === c.index) {
        let u;
        c.type === 2 ? u = new V(n, n.nextSibling, this, t) : c.type === 1 ? u = new c.ctor(n, c.name, c.strings, this, t) : c.type === 6 && (u = new le(n, this, t)), this._$AV.push(u), c = s[++h];
      }
      r !== (c == null ? void 0 : c.index) && (n = x.nextNode(), r++);
    }
    return x.currentNode = k, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class V {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = $, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = P(this, t, e), I(t) ? t === $ || t == null || t === "" ? (this._$AH !== $ && this._$AR(), this._$AH = $) : t !== this._$AH && t !== U && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : oe(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== $ && I(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(Rt(s.h, s.h[0]), this.options)), s);
    if (((n = this._$AH) == null ? void 0 : n._$AD) === i) this._$AH.p(e);
    else {
      const r = new re(i, this), h = r.u(this.options);
      r.p(e), this.T(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = vt.get(t.strings);
    return e === void 0 && vt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    st(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new V(this.O(q()), this.O(q()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class W {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = $, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = $;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let r = !1;
    if (n === void 0) t = P(this, t, e, 0), r = !I(t) || t !== this._$AH && t !== U, r && (this._$AH = t);
    else {
      const h = t;
      let c, u;
      for (t = n[0], c = 0; c < n.length - 1; c++) u = P(this, h[s + c], e, c), u === U && (u = this._$AH[c]), r || (r = !I(u) || u !== this._$AH[c]), u === $ ? t = $ : t !== $ && (t += (u ?? "") + n[c + 1]), this._$AH[c] = u;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === $ ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ae extends W {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === $ ? void 0 : t;
  }
}
class ce extends W {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== $);
  }
}
class he extends W {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = P(this, t, e, 0) ?? $) === U) return;
    const s = this._$AH, i = t === $ && s !== $ || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== $ && (s === $ || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class le {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    P(this, t);
  }
}
const Y = R.litHtmlPolyfillSupport;
Y == null || Y(z, V), (R.litHtmlVersions ?? (R.litHtmlVersions = [])).push("3.3.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ue = { ATTRIBUTE: 1 }, de = (o) => (...t) => ({ _$litDirective$: o, values: t });
class pe {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, s) {
    this._$Ct = t, this._$AM = e, this._$Ci = s;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const be = de(class extends pe {
  constructor(o) {
    var t;
    if (super(o), o.type !== ue.ATTRIBUTE || o.name !== "class" || ((t = o.strings) == null ? void 0 : t.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(o) {
    return " " + Object.keys(o).filter((t) => o[t]).join(" ") + " ";
  }
  update(o, [t]) {
    var s, i;
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), o.strings !== void 0 && (this.nt = new Set(o.strings.join(" ").split(/\s/).filter((n) => n !== "")));
      for (const n in t) t[n] && !((s = this.nt) != null && s.has(n)) && this.st.add(n);
      return this.render(t);
    }
    const e = o.element.classList;
    for (const n of this.st) n in t || (e.remove(n), this.st.delete(n));
    for (const n in t) {
      const r = !!t[n];
      r === this.st.has(n) || (i = this.nt) != null && i.has(n) || (r ? (e.add(n), this.st.add(n)) : (e.remove(n), this.st.delete(n)));
    }
    return U;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $e = (o) => o ?? $;
var At, wt, St, Et, Ct, xt, kt, Ut, Pt, Mt, l;
class g extends (Mt = Vt, Pt = [A({ type: String })], Ut = [A({ type: String })], kt = [A({ type: Boolean })], xt = [A({ type: Boolean, attribute: "aria-disabled" })], Ct = [A({ type: Boolean })], Et = [A({ type: String })], St = [A({ type: String, attribute: "start-icon" })], wt = [A({ type: String, attribute: "end-icon" })], At = [A({ type: String, attribute: "class" })], Mt) {
  constructor() {
    super(...arguments);
    y(this, "variant", b(l, 8, this, "default")), b(l, 11, this);
    y(this, "size", b(l, 12, this, "default")), b(l, 15, this);
    y(this, "disabled", b(l, 16, this, !1)), b(l, 19, this);
    y(this, "ariaDisabled", b(l, 20, this, !1)), b(l, 23, this);
    y(this, "unstyled", b(l, 24, this, !1)), b(l, 27, this);
    y(this, "type", b(l, 28, this, "button")), b(l, 31, this);
    y(this, "startIcon", b(l, 32, this, "")), b(l, 35, this);
    y(this, "endIcon", b(l, 36, this, "")), b(l, 39, this);
    y(this, "className", b(l, 40, this, "")), b(l, 43, this);
  }
  _handleClick(e) {
    if (this.disabled || this.ariaDisabled) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("portland-button-click", {
      detail: { originalEvent: e },
      bubbles: !0,
      composed: !0
    }));
  }
  _renderIcon(e, s) {
    return e ? e.includes("fa-") ? G`
        <span class="fa-icon fa-icon--${s}">
          <i class="${e}"></i>
        </span>
      ` : G`
      <span class="usa-button__icon usa-button__icon--${s}">
        ${e}
      </span>
    ` : "";
  }
  render() {
    const e = "usa-button", s = this.variant !== "default" ? `${e}--${this.variant}` : "", i = this.size === "big" ? `${e}--big` : "", n = this.unstyled ? `${e}--unstyled` : "", r = {
      [e]: !0,
      [s]: !!s,
      [i]: !!i,
      [n]: !!n,
      [this.className]: !!this.className
    };
    return G`
      <button
        type="${this.type}"
        class="${be(r)}"
        ?disabled="${this.disabled}"
        aria-disabled="${$e(this.ariaDisabled || this.disabled ? "true" : void 0)}"
        @click="${this._handleClick}"
      >
        ${this._renderIcon(this.startIcon, "left")}
        <slot></slot>
        ${this._renderIcon(this.endIcon, "right")}
      </button>
    `;
  }
}
l = lt(Mt), v(l, 5, "variant", Pt, g), v(l, 5, "size", Ut, g), v(l, 5, "disabled", kt, g), v(l, 5, "ariaDisabled", xt, g), v(l, 5, "unstyled", Ct, g), v(l, 5, "type", Et, g), v(l, 5, "startIcon", St, g), v(l, 5, "endIcon", wt, g), v(l, 5, "className", At, g), K(l, g), y(g, "styles", Wt`
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
  `);
customElements.define("portland-button", g);
export {
  g as PortlandButton
};
