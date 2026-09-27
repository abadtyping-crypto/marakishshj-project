import {
  r as q,
  j as u,
  B as me,
  T as Se,
  I as St,
  b as Oe,
  D as go,
  e as fr,
  aD as gs,
  aE as vs,
  am as ot,
  u as Wn,
  aF as Si,
  d as or,
  aS as vo,
  q as ar,
  c as Ve,
  a as pe,
  o as _s,
  g as Ye,
  w as er,
  f as rn,
  h as Qe,
  i as aa,
  S as Ts,
  x as Es,
  P as Ss,
  E as Ht,
  O as ws,
  a9 as Ta,
  z as Ea,
  y as Sa,
  C as Ja,
  J as Qa,
  bB as _o,
  K as As,
  F as bn,
  M as on,
  G as wa,
  ag as wi,
  al as Ai,
  aU as ys,
  H as To,
  ak as Eo,
  aa as So,
  av as mn,
  aT as wo,
  bC as Ao,
  be as yo,
  ar as Co,
  m as Fo,
} from "./index-3A1bNl_N.js";
import { C as bo } from "./config-global-DP6GPWGe.js";
import { E as Cs, a as Fs } from "./jspdf.plugin.autotable-C1sVUKys.js";
import { u as ko, T as Do } from "./table-empty-rows-CeKTIPDR.js";
import { a as kn } from "./notifications-CPU2Sa3R.js";
import { s as Aa, f as Zt } from "./google-chat-DifJ-fPr.js";
import { D as No } from "./content-C66GNNeH.js";
import {
  L as En,
  T as Dt,
  a as Le,
  d as bs,
  g as Po,
  b as ks,
  c as Za,
  e as ei,
  f as yi,
} from "./TableHead-B7CK-Pny.js";
import { C as Ya } from "./Card-DMw9IfYd.js";
import { T as Oo } from "./table-no-data-CVCxndHi.js";
import { C as Ds } from "./Checkbox-CoP4AhHP.js";
import { v as Ro, a as Io, g as Lo, e as Mo } from "./utils-Bb00Tb94.js";
import { T as Bo } from "./TableSortLabel-VvrkXvY9.js";
import { V as jo } from "./vehicle-sell-dialog-BpTISb5X.js";
import {
  D as Dn,
  a as Nn,
  b as Pn,
  c as ia,
} from "./DialogContent-B5Z-fe0N.js";
import { T as Ze, F as Uo, a as Wo } from "./TextField-DvUF2KV8.js";
import { A as Ir } from "./Autocomplete-BOFcAGPo.js";
import { S as Et } from "./Stack-Bt48QR-d.js";
import { T as Vo, a as Ra } from "./Tabs--gR7A2DK.js";
import { S as Ho } from "./SwitchBase-1JUZrRZd.js";
import "./KeyboardArrowRight-BCUOYiGm.js";
import "./Select-C2fGbBme.js";
import "./Chip-4_ayXpwf.js";
/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */ var sa = {};
sa.version = "0.18.5";
var Ns = 1252,
  Go = [
    874, 932, 936, 949, 950, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257,
    1258, 1e4,
  ],
  Ps = function (e) {
    Go.indexOf(e) != -1 && (Ns = e);
  };
function $o() {
  Ps(1252);
}
var On = function (e) {
  Ps(e);
};
function Yo() {
  (On(1200), $o());
}
var Xn = function (t) {
    return String.fromCharCode(t);
  },
  Ci = function (t) {
    return String.fromCharCode(t);
  },
  Fi,
  Nt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function Rn(e) {
  for (
    var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, o = 0, c = 0, l = 0;
    l < e.length;
  )
    ((r = e.charCodeAt(l++)),
      (i = r >> 2),
      (n = e.charCodeAt(l++)),
      (s = ((r & 3) << 4) | (n >> 4)),
      (a = e.charCodeAt(l++)),
      (o = ((n & 15) << 2) | (a >> 6)),
      (c = a & 63),
      isNaN(n) ? (o = c = 64) : isNaN(a) && (c = 64),
      (t += Nt.charAt(i) + Nt.charAt(s) + Nt.charAt(o) + Nt.charAt(c)));
  return t;
}
function Ct(e) {
  var t = "",
    r = 0,
    n = 0,
    a = 0,
    i = 0,
    s = 0,
    o = 0,
    c = 0;
  e = e.replace(/[^\w\+\/\=]/g, "");
  for (var l = 0; l < e.length;)
    ((i = Nt.indexOf(e.charAt(l++))),
      (s = Nt.indexOf(e.charAt(l++))),
      (r = (i << 2) | (s >> 4)),
      (t += String.fromCharCode(r)),
      (o = Nt.indexOf(e.charAt(l++))),
      (n = ((s & 15) << 4) | (o >> 2)),
      o !== 64 && (t += String.fromCharCode(n)),
      (c = Nt.indexOf(e.charAt(l++))),
      (a = ((o & 3) << 6) | c),
      c !== 64 && (t += String.fromCharCode(a)));
  return t;
}
var We = (function () {
    return (
      typeof Buffer < "u" &&
      typeof process < "u" &&
      typeof process.versions < "u" &&
      !!process.versions.node
    );
  })(),
  bt = (function () {
    if (typeof Buffer < "u") {
      var e = !Buffer.from;
      if (!e)
        try {
          Buffer.from("foo", "utf8");
        } catch {
          e = !0;
        }
      return e
        ? function (t, r) {
            return r ? new Buffer(t, r) : new Buffer(t);
          }
        : Buffer.from.bind(Buffer);
    }
    return function () {};
  })();
function Ut(e) {
  return We
    ? Buffer.alloc
      ? Buffer.alloc(e)
      : new Buffer(e)
    : typeof Uint8Array < "u"
      ? new Uint8Array(e)
      : new Array(e);
}
function bi(e) {
  return We
    ? Buffer.allocUnsafe
      ? Buffer.allocUnsafe(e)
      : new Buffer(e)
    : typeof Uint8Array < "u"
      ? new Uint8Array(e)
      : new Array(e);
}
var dt = function (t) {
  return We
    ? bt(t, "binary")
    : t.split("").map(function (r) {
        return r.charCodeAt(0) & 255;
      });
};
function ya(e) {
  if (typeof ArrayBuffer > "u") return dt(e);
  for (
    var t = new ArrayBuffer(e.length), r = new Uint8Array(t), n = 0;
    n != e.length;
    ++n
  )
    r[n] = e.charCodeAt(n) & 255;
  return t;
}
function Vn(e) {
  if (Array.isArray(e))
    return e
      .map(function (n) {
        return String.fromCharCode(n);
      })
      .join("");
  for (var t = [], r = 0; r < e.length; ++r) t[r] = String.fromCharCode(e[r]);
  return t.join("");
}
function zo(e) {
  if (typeof Uint8Array > "u") throw new Error("Unsupported");
  return new Uint8Array(e);
}
var Lr = We
  ? function (e) {
      return Buffer.concat(
        e.map(function (t) {
          return Buffer.isBuffer(t) ? t : bt(t);
        }),
      );
    }
  : function (e) {
      if (typeof Uint8Array < "u") {
        var t = 0,
          r = 0;
        for (t = 0; t < e.length; ++t) r += e[t].length;
        var n = new Uint8Array(r),
          a = 0;
        for (t = 0, r = 0; t < e.length; r += a, ++t)
          if (((a = e[t].length), e[t] instanceof Uint8Array)) n.set(e[t], r);
          else {
            if (typeof e[t] == "string") throw "wtf";
            n.set(new Uint8Array(e[t]), r);
          }
        return n;
      }
      return [].concat.apply(
        [],
        e.map(function (i) {
          return Array.isArray(i) ? i : [].slice.call(i);
        }),
      );
    };
function Xo(e) {
  for (
    var t = [], r = 0, n = e.length + 250, a = Ut(e.length + 255), i = 0;
    i < e.length;
    ++i
  ) {
    var s = e.charCodeAt(i);
    if (s < 128) a[r++] = s;
    else if (s < 2048)
      ((a[r++] = 192 | ((s >> 6) & 31)), (a[r++] = 128 | (s & 63)));
    else if (s >= 55296 && s < 57344) {
      s = (s & 1023) + 64;
      var o = e.charCodeAt(++i) & 1023;
      ((a[r++] = 240 | ((s >> 8) & 7)),
        (a[r++] = 128 | ((s >> 2) & 63)),
        (a[r++] = 128 | ((o >> 6) & 15) | ((s & 3) << 4)),
        (a[r++] = 128 | (o & 63)));
    } else
      ((a[r++] = 224 | ((s >> 12) & 15)),
        (a[r++] = 128 | ((s >> 6) & 63)),
        (a[r++] = 128 | (s & 63)));
    r > n && (t.push(a.slice(0, r)), (r = 0), (a = Ut(65535)), (n = 65530));
  }
  return (t.push(a.slice(0, r)), Lr(t));
}
var Sn = /\u0000/g,
  Kn = /[\u0001-\u0006]/g;
function tn(e) {
  for (var t = "", r = e.length - 1; r >= 0;) t += e.charAt(r--);
  return t;
}
function xt(e, t) {
  var r = "" + e;
  return r.length >= t ? r : mr("0", t - r.length) + r;
}
function ri(e, t) {
  var r = "" + e;
  return r.length >= t ? r : mr(" ", t - r.length) + r;
}
function oa(e, t) {
  var r = "" + e;
  return r.length >= t ? r : r + mr(" ", t - r.length);
}
function Ko(e, t) {
  var r = "" + Math.round(e);
  return r.length >= t ? r : mr("0", t - r.length) + r;
}
function qo(e, t) {
  var r = "" + e;
  return r.length >= t ? r : mr("0", t - r.length) + r;
}
var ki = Math.pow(2, 32);
function Kt(e, t) {
  if (e > ki || e < -ki) return Ko(e, t);
  var r = Math.round(e);
  return qo(r, t);
}
function la(e, t) {
  return (
    (t = t || 0),
    e.length >= 7 + t &&
      (e.charCodeAt(t) | 32) === 103 &&
      (e.charCodeAt(t + 1) | 32) === 101 &&
      (e.charCodeAt(t + 2) | 32) === 110 &&
      (e.charCodeAt(t + 3) | 32) === 101 &&
      (e.charCodeAt(t + 4) | 32) === 114 &&
      (e.charCodeAt(t + 5) | 32) === 97 &&
      (e.charCodeAt(t + 6) | 32) === 108
  );
}
var Di = [
    ["Sun", "Sunday"],
    ["Mon", "Monday"],
    ["Tue", "Tuesday"],
    ["Wed", "Wednesday"],
    ["Thu", "Thursday"],
    ["Fri", "Friday"],
    ["Sat", "Saturday"],
  ],
  Ia = [
    ["J", "Jan", "January"],
    ["F", "Feb", "February"],
    ["M", "Mar", "March"],
    ["A", "Apr", "April"],
    ["M", "May", "May"],
    ["J", "Jun", "June"],
    ["J", "Jul", "July"],
    ["A", "Aug", "August"],
    ["S", "Sep", "September"],
    ["O", "Oct", "October"],
    ["N", "Nov", "November"],
    ["D", "Dec", "December"],
  ];
function Jo(e) {
  return (
    e || (e = {}),
    (e[0] = "General"),
    (e[1] = "0"),
    (e[2] = "0.00"),
    (e[3] = "#,##0"),
    (e[4] = "#,##0.00"),
    (e[9] = "0%"),
    (e[10] = "0.00%"),
    (e[11] = "0.00E+00"),
    (e[12] = "# ?/?"),
    (e[13] = "# ??/??"),
    (e[14] = "m/d/yy"),
    (e[15] = "d-mmm-yy"),
    (e[16] = "d-mmm"),
    (e[17] = "mmm-yy"),
    (e[18] = "h:mm AM/PM"),
    (e[19] = "h:mm:ss AM/PM"),
    (e[20] = "h:mm"),
    (e[21] = "h:mm:ss"),
    (e[22] = "m/d/yy h:mm"),
    (e[37] = "#,##0 ;(#,##0)"),
    (e[38] = "#,##0 ;[Red](#,##0)"),
    (e[39] = "#,##0.00;(#,##0.00)"),
    (e[40] = "#,##0.00;[Red](#,##0.00)"),
    (e[45] = "mm:ss"),
    (e[46] = "[h]:mm:ss"),
    (e[47] = "mmss.0"),
    (e[48] = "##0.0E+0"),
    (e[49] = "@"),
    (e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "'),
    e
  );
}
var gr = {
    0: "General",
    1: "0",
    2: "0.00",
    3: "#,##0",
    4: "#,##0.00",
    9: "0%",
    10: "0.00%",
    11: "0.00E+00",
    12: "# ?/?",
    13: "# ??/??",
    14: "m/d/yy",
    15: "d-mmm-yy",
    16: "d-mmm",
    17: "mmm-yy",
    18: "h:mm AM/PM",
    19: "h:mm:ss AM/PM",
    20: "h:mm",
    21: "h:mm:ss",
    22: "m/d/yy h:mm",
    37: "#,##0 ;(#,##0)",
    38: "#,##0 ;[Red](#,##0)",
    39: "#,##0.00;(#,##0.00)",
    40: "#,##0.00;[Red](#,##0.00)",
    45: "mm:ss",
    46: "[h]:mm:ss",
    47: "mmss.0",
    48: "##0.0E+0",
    49: "@",
    56: '"上午/下午 "hh"時"mm"分"ss"秒 "',
  },
  Ni = {
    5: 37,
    6: 38,
    7: 39,
    8: 40,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 14,
    28: 14,
    29: 14,
    30: 14,
    31: 14,
    50: 14,
    51: 14,
    52: 14,
    53: 14,
    54: 14,
    55: 14,
    56: 14,
    57: 14,
    58: 14,
    59: 1,
    60: 2,
    61: 3,
    62: 4,
    67: 9,
    68: 10,
    69: 12,
    70: 13,
    71: 14,
    72: 14,
    73: 15,
    74: 16,
    75: 17,
    76: 20,
    77: 21,
    78: 22,
    79: 45,
    80: 46,
    81: 47,
    82: 0,
  },
  Qo = {
    5: '"$"#,##0_);\\("$"#,##0\\)',
    63: '"$"#,##0_);\\("$"#,##0\\)',
    6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
    7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
    8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
    41: '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)',
    42: '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)',
    43: '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)',
    44: '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)',
  };
function ca(e, t, r) {
  for (
    var n = e < 0 ? -1 : 1,
      a = e * n,
      i = 0,
      s = 1,
      o = 0,
      c = 1,
      l = 0,
      f = 0,
      m = Math.floor(a);
    l < t &&
    ((m = Math.floor(a)), (o = m * s + i), (f = m * l + c), !(a - m < 5e-8));
  )
    ((a = 1 / (a - m)), (i = s), (s = o), (c = l), (l = f));
  if ((f > t && (l > t ? ((f = c), (o = i)) : ((f = l), (o = s))), !r))
    return [0, n * o, f];
  var p = Math.floor((n * o) / f);
  return [p, n * o - p * f, f];
}
function qn(e, t, r) {
  if (e > 2958465 || e < 0) return null;
  var n = e | 0,
    a = Math.floor(86400 * (e - n)),
    i = 0,
    s = [],
    o = {
      D: n,
      T: a,
      u: 86400 * (e - n) - a,
      y: 0,
      m: 0,
      d: 0,
      H: 0,
      M: 0,
      S: 0,
      q: 0,
    };
  if (
    (Math.abs(o.u) < 1e-6 && (o.u = 0),
    t && t.date1904 && (n += 1462),
    o.u > 0.9999 && ((o.u = 0), ++a == 86400 && ((o.T = a = 0), ++n, ++o.D)),
    n === 60)
  )
    ((s = r ? [1317, 10, 29] : [1900, 2, 29]), (i = 3));
  else if (n === 0) ((s = r ? [1317, 8, 29] : [1900, 1, 0]), (i = 6));
  else {
    n > 60 && --n;
    var c = new Date(1900, 0, 1);
    (c.setDate(c.getDate() + n - 1),
      (s = [c.getFullYear(), c.getMonth() + 1, c.getDate()]),
      (i = c.getDay()),
      n < 60 && (i = (i + 6) % 7),
      r && (i = il(c, s)));
  }
  return (
    (o.y = s[0]),
    (o.m = s[1]),
    (o.d = s[2]),
    (o.S = a % 60),
    (a = Math.floor(a / 60)),
    (o.M = a % 60),
    (a = Math.floor(a / 60)),
    (o.H = a),
    (o.q = i),
    o
  );
}
var Os = new Date(1899, 11, 31, 0, 0, 0),
  Zo = Os.getTime(),
  el = new Date(1900, 2, 1, 0, 0, 0);
function Rs(e, t) {
  var r = e.getTime();
  return (
    t ? (r -= 1461 * 24 * 60 * 60 * 1e3) : e >= el && (r += 24 * 60 * 60 * 1e3),
    (r - (Zo + (e.getTimezoneOffset() - Os.getTimezoneOffset()) * 6e4)) /
      (24 * 60 * 60 * 1e3)
  );
}
function ti(e) {
  return e.indexOf(".") == -1 ? e : e.replace(/(?:\.0*|(\.\d*[1-9])0+)$/, "$1");
}
function rl(e) {
  return e.indexOf("E") == -1
    ? e
    : e
        .replace(/(?:\.0*|(\.\d*[1-9])0+)[Ee]/, "$1E")
        .replace(/(E[+-])(\d)$/, "$10$2");
}
function tl(e) {
  var t = e < 0 ? 12 : 11,
    r = ti(e.toFixed(12));
  return r.length <= t || ((r = e.toPrecision(10)), r.length <= t)
    ? r
    : e.toExponential(5);
}
function nl(e) {
  var t = ti(e.toFixed(11));
  return t.length > (e < 0 ? 12 : 11) || t === "0" || t === "-0"
    ? e.toPrecision(6)
    : t;
}
function al(e) {
  var t = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
    r;
  return (
    t >= -4 && t <= -1
      ? (r = e.toPrecision(10 + t))
      : Math.abs(t) <= 9
        ? (r = tl(e))
        : t === 10
          ? (r = e.toFixed(10).substr(0, 12))
          : (r = nl(e)),
    ti(rl(r.toUpperCase()))
  );
}
function za(e, t) {
  switch (typeof e) {
    case "string":
      return e;
    case "boolean":
      return e ? "TRUE" : "FALSE";
    case "number":
      return (e | 0) === e ? e.toString(10) : al(e);
    case "undefined":
      return "";
    case "object":
      if (e == null) return "";
      if (e instanceof Date) return Ot(14, Rs(e, t && t.date1904), t);
  }
  throw new Error("unsupported value in General format: " + e);
}
function il(e, t) {
  t[0] -= 581;
  var r = e.getDay();
  return (e < 60 && (r = (r + 6) % 7), r);
}
function sl(e, t, r, n) {
  var a = "",
    i = 0,
    s = 0,
    o = r.y,
    c,
    l = 0;
  switch (e) {
    case 98:
      o = r.y + 543;
    case 121:
      switch (t.length) {
        case 1:
        case 2:
          ((c = o % 100), (l = 2));
          break;
        default:
          ((c = o % 1e4), (l = 4));
          break;
      }
      break;
    case 109:
      switch (t.length) {
        case 1:
        case 2:
          ((c = r.m), (l = t.length));
          break;
        case 3:
          return Ia[r.m - 1][1];
        case 5:
          return Ia[r.m - 1][0];
        default:
          return Ia[r.m - 1][2];
      }
      break;
    case 100:
      switch (t.length) {
        case 1:
        case 2:
          ((c = r.d), (l = t.length));
          break;
        case 3:
          return Di[r.q][0];
        default:
          return Di[r.q][1];
      }
      break;
    case 104:
      switch (t.length) {
        case 1:
        case 2:
          ((c = 1 + ((r.H + 11) % 12)), (l = t.length));
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 72:
      switch (t.length) {
        case 1:
        case 2:
          ((c = r.H), (l = t.length));
          break;
        default:
          throw "bad hour format: " + t;
      }
      break;
    case 77:
      switch (t.length) {
        case 1:
        case 2:
          ((c = r.M), (l = t.length));
          break;
        default:
          throw "bad minute format: " + t;
      }
      break;
    case 115:
      if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000")
        throw "bad second format: " + t;
      return r.u === 0 && (t == "s" || t == "ss")
        ? xt(r.S, t.length)
        : (n >= 2 ? (s = n === 3 ? 1e3 : 100) : (s = n === 1 ? 10 : 1),
          (i = Math.round(s * (r.S + r.u))),
          i >= 60 * s && (i = 0),
          t === "s"
            ? i === 0
              ? "0"
              : "" + i / s
            : ((a = xt(i, 2 + n)),
              t === "ss" ? a.substr(0, 2) : "." + a.substr(2, t.length - 1)));
    case 90:
      switch (t) {
        case "[h]":
        case "[hh]":
          c = r.D * 24 + r.H;
          break;
        case "[m]":
        case "[mm]":
          c = (r.D * 24 + r.H) * 60 + r.M;
          break;
        case "[s]":
        case "[ss]":
          c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
          break;
        default:
          throw "bad abstime format: " + t;
      }
      l = t.length === 3 ? 1 : 2;
      break;
    case 101:
      ((c = o), (l = 1));
      break;
  }
  var f = l > 0 ? xt(c, l) : "";
  return f;
}
function Pt(e) {
  var t = 3;
  if (e.length <= t) return e;
  for (var r = e.length % t, n = e.substr(0, r); r != e.length; r += t)
    n += (n.length > 0 ? "," : "") + e.substr(r, t);
  return n;
}
var Is = /%/g;
function ol(e, t, r) {
  var n = t.replace(Is, ""),
    a = t.length - n.length;
  return wt(e, n, r * Math.pow(10, 2 * a)) + mr("%", a);
}
function ll(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44;) --n;
  return wt(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function Ls(e, t) {
  var r,
    n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Ls(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (
      (i < 0 && (i += a),
      (r = (t / Math.pow(10, i)).toPrecision(n + 1 + ((a + i) % a))),
      r.indexOf("e") === -1)
    ) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      for (
        r.indexOf(".") === -1
          ? (r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i))
          : (r += "E+" + (s - i));
        r.substr(0, 2) === "0.";
      )
        ((r = r.charAt(0) + r.substr(2, a) + "." + r.substr(2 + a)),
          (r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")));
      r = r.replace(/\+-/, "-");
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (o, c, l, f) {
      return c + l + f.substr(0, (a + i) % a) + "." + f.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return (
    e.match(/E\+00$/) &&
      r.match(/e[+-]\d$/) &&
      (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)),
    e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")),
    r.replace("e", "E")
  );
}
var Ms = /# (\?+)( ?)\/( ?)(\d+)/;
function cl(e, t, r) {
  var n = parseInt(e[4], 10),
    a = Math.round(t * n),
    i = Math.floor(a / n),
    s = a - i * n,
    o = n;
  return (
    r +
    (i === 0 ? "" : "" + i) +
    " " +
    (s === 0
      ? mr(" ", e[1].length + 1 + e[4].length)
      : ri(s, e[1].length) + e[2] + "/" + e[3] + xt(o, e[4].length))
  );
}
function fl(e, t, r) {
  return r + (t === 0 ? "" : "" + t) + mr(" ", e[1].length + 2 + e[4].length);
}
var Bs = /^#*0*\.([0#]+)/,
  js = /\).*[0#]/,
  Us = /\(###\) ###\\?-####/;
function Gr(e) {
  for (var t = "", r, n = 0; n != e.length; ++n)
    switch ((r = e.charCodeAt(n))) {
      case 35:
        break;
      case 63:
        t += " ";
        break;
      case 48:
        t += "0";
        break;
      default:
        t += String.fromCharCode(r);
    }
  return t;
}
function Pi(e, t) {
  var r = Math.pow(10, t);
  return "" + Math.round(e * r) / r;
}
function Oi(e, t) {
  var r = e - Math.floor(e),
    n = Math.pow(10, t);
  return t < ("" + Math.round(r * n)).length ? 0 : Math.round(r * n);
}
function ul(e, t) {
  return t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length
    ? 1
    : 0;
}
function hl(e) {
  return e < 2147483647 && e > -2147483648
    ? "" + (e >= 0 ? e | 0 : (e - 1) | 0)
    : "" + Math.floor(e);
}
function it(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(js)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? it("n", n, r) : "(" + it("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return ll(e, t, r);
  if (t.indexOf("%") !== -1) return ol(e, t, r);
  if (t.indexOf("E") !== -1) return Ls(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + it(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a,
    i,
    s,
    o,
    c = Math.abs(r),
    l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + Kt(c, t.length);
  if (t.match(/^[#?]+$/))
    return (
      (a = Kt(r, 0)),
      a === "0" && (a = ""),
      a.length > t.length ? a : Gr(t.substr(0, t.length - a.length)) + a
    );
  if ((i = t.match(Ms))) return cl(i, c, l);
  if (t.match(/^#+0+$/)) return l + Kt(c, t.length - t.indexOf("0"));
  if ((i = t.match(Bs)))
    return (
      (a = Pi(r, i[1].length)
        .replace(/^([^\.]+)$/, "$1." + Gr(i[1]))
        .replace(/\.$/, "." + Gr(i[1]))
        .replace(/\.(\d*)$/, function (_, h) {
          return "." + h + mr("0", Gr(i[1]).length - h.length);
        })),
      t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".")
    );
  if (((t = t.replace(/^#+([0.])/, "$1")), (i = t.match(/^(0*)\.(#*)$/))))
    return (
      l +
      Pi(c, i[2].length)
        .replace(/\.(\d*[1-9])0*$/, ".$1")
        .replace(/^(-?\d*)$/, "$1.")
        .replace(/^0\./, i[1].length ? "0." : ".")
    );
  if ((i = t.match(/^#{1,3},##0(\.?)$/))) return l + Pt(Kt(c, 0));
  if ((i = t.match(/^#,##0\.([#0]*0)$/)))
    return r < 0
      ? "-" + it(e, t, -r)
      : Pt("" + (Math.floor(r) + ul(r, i[1].length))) +
          "." +
          xt(Oi(r, i[1].length), i[1].length);
  if ((i = t.match(/^#,#*,#0/))) return it(e, t.replace(/^#,#*,/, ""), r);
  if ((i = t.match(/^([0#]+)(\\?-([0#]+))+$/)))
    return (
      (a = tn(it(e, t.replace(/[\\-]/g, ""), r))),
      (s = 0),
      tn(
        tn(t.replace(/\\/g, "")).replace(/[0#]/g, function (_) {
          return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
        }),
      )
    );
  if (t.match(Us))
    return (
      (a = it(e, "##########", r)),
      "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6)
    );
  var f = "";
  if ((i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)))
    return (
      (s = Math.min(i[4].length, 7)),
      (o = ca(c, Math.pow(10, s) - 1, !1)),
      (a = "" + l),
      (f = wt("n", i[1], o[1])),
      f.charAt(f.length - 1) == " " && (f = f.substr(0, f.length - 1) + "0"),
      (a += f + i[2] + "/" + i[3]),
      (f = oa(o[2], s)),
      f.length < i[4].length &&
        (f = Gr(i[4].substr(i[4].length - f.length)) + f),
      (a += f),
      a
    );
  if ((i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)))
    return (
      (s = Math.min(Math.max(i[1].length, i[4].length), 7)),
      (o = ca(c, Math.pow(10, s) - 1, !0)),
      l +
        (o[0] || (o[1] ? "" : "0")) +
        " " +
        (o[1]
          ? ri(o[1], s) + i[2] + "/" + i[3] + oa(o[2], s)
          : mr(" ", 2 * s + 1 + i[2].length + i[3].length))
    );
  if ((i = t.match(/^[#0?]+$/)))
    return (
      (a = Kt(r, 0)),
      t.length <= a.length ? a : Gr(t.substr(0, t.length - a.length)) + a
    );
  if ((i = t.match(/^([#0?]+)\.([#0]+)$/))) {
    ((a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1")),
      (s = a.indexOf(".")));
    var m = t.indexOf(".") - s,
      p = t.length - a.length - m;
    return Gr(t.substr(0, m) + a + t.substr(t.length - p));
  }
  if ((i = t.match(/^00,000\.([#0]*0)$/)))
    return (
      (s = Oi(r, i[1].length)),
      r < 0
        ? "-" + it(e, t, -r)
        : Pt(hl(r))
            .replace(/^\d,\d{3}$/, "0$&")
            .replace(/^\d*$/, function (_) {
              return "00," + (_.length < 3 ? xt(0, 3 - _.length) : "") + _;
            }) +
          "." +
          xt(s, i[1].length)
    );
  switch (t) {
    case "###,##0.00":
      return it(e, "#,##0.00", r);
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Pt(Kt(c, 0));
      return d !== "0" ? l + d : "";
    case "###,###.00":
      return it(e, "###,##0.00", r).replace(/^0\./, ".");
    case "#,###.00":
      return it(e, "#,##0.00", r).replace(/^0\./, ".");
  }
  throw new Error("unsupported format |" + t + "|");
}
function dl(e, t, r) {
  for (var n = t.length - 1; t.charCodeAt(n - 1) === 44;) --n;
  return wt(e, t.substr(0, n), r / Math.pow(10, 3 * (t.length - n)));
}
function xl(e, t, r) {
  var n = t.replace(Is, ""),
    a = t.length - n.length;
  return wt(e, n, r * Math.pow(10, 2 * a)) + mr("%", a);
}
function Ws(e, t) {
  var r,
    n = e.indexOf("E") - e.indexOf(".") - 1;
  if (e.match(/^#+0.0E\+0$/)) {
    if (t == 0) return "0.0E+0";
    if (t < 0) return "-" + Ws(e, -t);
    var a = e.indexOf(".");
    a === -1 && (a = e.indexOf("E"));
    var i = Math.floor(Math.log(t) * Math.LOG10E) % a;
    if (
      (i < 0 && (i += a),
      (r = (t / Math.pow(10, i)).toPrecision(n + 1 + ((a + i) % a))),
      !r.match(/[Ee]/))
    ) {
      var s = Math.floor(Math.log(t) * Math.LOG10E);
      (r.indexOf(".") === -1
        ? (r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i))
        : (r += "E+" + (s - i)),
        (r = r.replace(/\+-/, "-")));
    }
    r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (o, c, l, f) {
      return c + l + f.substr(0, (a + i) % a) + "." + f.substr(i) + "E";
    });
  } else r = t.toExponential(n);
  return (
    e.match(/E\+00$/) &&
      r.match(/e[+-]\d$/) &&
      (r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1)),
    e.match(/E\-/) && r.match(/e\+/) && (r = r.replace(/e\+/, "e")),
    r.replace("e", "E")
  );
}
function mt(e, t, r) {
  if (e.charCodeAt(0) === 40 && !t.match(js)) {
    var n = t.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
    return r >= 0 ? mt("n", n, r) : "(" + mt("n", n, -r) + ")";
  }
  if (t.charCodeAt(t.length - 1) === 44) return dl(e, t, r);
  if (t.indexOf("%") !== -1) return xl(e, t, r);
  if (t.indexOf("E") !== -1) return Ws(t, r);
  if (t.charCodeAt(0) === 36)
    return "$" + mt(e, t.substr(t.charAt(1) == " " ? 2 : 1), r);
  var a,
    i,
    s,
    o,
    c = Math.abs(r),
    l = r < 0 ? "-" : "";
  if (t.match(/^00+$/)) return l + xt(c, t.length);
  if (t.match(/^[#?]+$/))
    return (
      (a = "" + r),
      r === 0 && (a = ""),
      a.length > t.length ? a : Gr(t.substr(0, t.length - a.length)) + a
    );
  if ((i = t.match(Ms))) return fl(i, c, l);
  if (t.match(/^#+0+$/)) return l + xt(c, t.length - t.indexOf("0"));
  if ((i = t.match(Bs)))
    return (
      (a = ("" + r)
        .replace(/^([^\.]+)$/, "$1." + Gr(i[1]))
        .replace(/\.$/, "." + Gr(i[1]))),
      (a = a.replace(/\.(\d*)$/, function (_, h) {
        return "." + h + mr("0", Gr(i[1]).length - h.length);
      })),
      t.indexOf("0.") !== -1 ? a : a.replace(/^0\./, ".")
    );
  if (((t = t.replace(/^#+([0.])/, "$1")), (i = t.match(/^(0*)\.(#*)$/))))
    return (
      l +
      ("" + c)
        .replace(/\.(\d*[1-9])0*$/, ".$1")
        .replace(/^(-?\d*)$/, "$1.")
        .replace(/^0\./, i[1].length ? "0." : ".")
    );
  if ((i = t.match(/^#{1,3},##0(\.?)$/))) return l + Pt("" + c);
  if ((i = t.match(/^#,##0\.([#0]*0)$/)))
    return r < 0 ? "-" + mt(e, t, -r) : Pt("" + r) + "." + mr("0", i[1].length);
  if ((i = t.match(/^#,#*,#0/))) return mt(e, t.replace(/^#,#*,/, ""), r);
  if ((i = t.match(/^([0#]+)(\\?-([0#]+))+$/)))
    return (
      (a = tn(mt(e, t.replace(/[\\-]/g, ""), r))),
      (s = 0),
      tn(
        tn(t.replace(/\\/g, "")).replace(/[0#]/g, function (_) {
          return s < a.length ? a.charAt(s++) : _ === "0" ? "0" : "";
        }),
      )
    );
  if (t.match(Us))
    return (
      (a = mt(e, "##########", r)),
      "(" + a.substr(0, 3) + ") " + a.substr(3, 3) + "-" + a.substr(6)
    );
  var f = "";
  if ((i = t.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)))
    return (
      (s = Math.min(i[4].length, 7)),
      (o = ca(c, Math.pow(10, s) - 1, !1)),
      (a = "" + l),
      (f = wt("n", i[1], o[1])),
      f.charAt(f.length - 1) == " " && (f = f.substr(0, f.length - 1) + "0"),
      (a += f + i[2] + "/" + i[3]),
      (f = oa(o[2], s)),
      f.length < i[4].length &&
        (f = Gr(i[4].substr(i[4].length - f.length)) + f),
      (a += f),
      a
    );
  if ((i = t.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)))
    return (
      (s = Math.min(Math.max(i[1].length, i[4].length), 7)),
      (o = ca(c, Math.pow(10, s) - 1, !0)),
      l +
        (o[0] || (o[1] ? "" : "0")) +
        " " +
        (o[1]
          ? ri(o[1], s) + i[2] + "/" + i[3] + oa(o[2], s)
          : mr(" ", 2 * s + 1 + i[2].length + i[3].length))
    );
  if ((i = t.match(/^[#0?]+$/)))
    return (
      (a = "" + r),
      t.length <= a.length ? a : Gr(t.substr(0, t.length - a.length)) + a
    );
  if ((i = t.match(/^([#0]+)\.([#0]+)$/))) {
    ((a = "" + r.toFixed(Math.min(i[2].length, 10)).replace(/([^0])0+$/, "$1")),
      (s = a.indexOf(".")));
    var m = t.indexOf(".") - s,
      p = t.length - a.length - m;
    return Gr(t.substr(0, m) + a + t.substr(t.length - p));
  }
  if ((i = t.match(/^00,000\.([#0]*0)$/)))
    return r < 0
      ? "-" + mt(e, t, -r)
      : Pt("" + r)
          .replace(/^\d,\d{3}$/, "0$&")
          .replace(/^\d*$/, function (_) {
            return "00," + (_.length < 3 ? xt(0, 3 - _.length) : "") + _;
          }) +
          "." +
          xt(0, i[1].length);
  switch (t) {
    case "###,###":
    case "##,###":
    case "#,###":
      var d = Pt("" + c);
      return d !== "0" ? l + d : "";
    default:
      if (t.match(/\.[0#?]*$/))
        return (
          mt(e, t.slice(0, t.lastIndexOf(".")), r) +
          Gr(t.slice(t.lastIndexOf(".")))
        );
  }
  throw new Error("unsupported format |" + t + "|");
}
function wt(e, t, r) {
  return (r | 0) === r ? mt(e, t, r) : it(e, t, r);
}
function pl(e) {
  for (var t = [], r = !1, n = 0, a = 0; n < e.length; ++n)
    switch (e.charCodeAt(n)) {
      case 34:
        r = !r;
        break;
      case 95:
      case 42:
      case 92:
        ++n;
        break;
      case 59:
        ((t[t.length] = e.substr(a, n - a)), (a = n + 1));
    }
  if (((t[t.length] = e.substr(a)), r === !0))
    throw new Error("Format |" + e + "| unterminated string ");
  return t;
}
var Vs = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
function Hs(e) {
  for (var t = 0, r = "", n = ""; t < e.length;)
    switch ((r = e.charAt(t))) {
      case "G":
        (la(e, t) && (t += 6), t++);
        break;
      case '"':
        for (; e.charCodeAt(++t) !== 34 && t < e.length;);
        ++t;
        break;
      case "\\":
        t += 2;
        break;
      case "_":
        t += 2;
        break;
      case "@":
        ++t;
        break;
      case "B":
      case "b":
        if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2") return !0;
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        return !0;
      case "A":
      case "a":
      case "上":
        if (
          e.substr(t, 3).toUpperCase() === "A/P" ||
          e.substr(t, 5).toUpperCase() === "AM/PM" ||
          e.substr(t, 5).toUpperCase() === "上午/下午"
        )
          return !0;
        ++t;
        break;
      case "[":
        for (n = r; e.charAt(t++) !== "]" && t < e.length;) n += e.charAt(t);
        if (n.match(Vs)) return !0;
        break;
      case ".":
      case "0":
      case "#":
        for (
          ;
          t < e.length &&
          ("0#?.,E+-%".indexOf((r = e.charAt(++t))) > -1 ||
            (r == "\\" &&
              e.charAt(t + 1) == "-" &&
              "0#".indexOf(e.charAt(t + 2)) > -1));
        );
        break;
      case "?":
        for (; e.charAt(++t) === r;);
        break;
      case "*":
        (++t, (e.charAt(t) == " " || e.charAt(t) == "*") && ++t);
        break;
      case "(":
      case ")":
        ++t;
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (; t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1;);
        break;
      case " ":
        ++t;
        break;
      default:
        ++t;
        break;
    }
  return !1;
}
function ml(e, t, r, n) {
  for (
    var a = [], i = "", s = 0, o = "", c = "t", l, f, m, p = "H";
    s < e.length;
  )
    switch ((o = e.charAt(s))) {
      case "G":
        if (!la(e, s))
          throw new Error("unrecognized character " + o + " in " + e);
        ((a[a.length] = { t: "G", v: "General" }), (s += 7));
        break;
      case '"':
        for (i = ""; (m = e.charCodeAt(++s)) !== 34 && s < e.length;)
          i += String.fromCharCode(m);
        ((a[a.length] = { t: "t", v: i }), ++s);
        break;
      case "\\":
        var d = e.charAt(++s),
          _ = d === "(" || d === ")" ? d : "t";
        ((a[a.length] = { t: _, v: d }), ++s);
        break;
      case "_":
        ((a[a.length] = { t: "t", v: " " }), (s += 2));
        break;
      case "@":
        ((a[a.length] = { t: "T", v: t }), ++s);
        break;
      case "B":
      case "b":
        if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
          if (l == null && ((l = qn(t, r, e.charAt(s + 1) === "2")), l == null))
            return "";
          ((a[a.length] = { t: "X", v: e.substr(s, 2) }), (c = o), (s += 2));
          break;
        }
      case "M":
      case "D":
      case "Y":
      case "H":
      case "S":
      case "E":
        o = o.toLowerCase();
      case "m":
      case "d":
      case "y":
      case "h":
      case "s":
      case "e":
      case "g":
        if (t < 0 || (l == null && ((l = qn(t, r)), l == null))) return "";
        for (i = o; ++s < e.length && e.charAt(s).toLowerCase() === o;) i += o;
        (o === "m" && c.toLowerCase() === "h" && (o = "M"),
          o === "h" && (o = p),
          (a[a.length] = { t: o, v: i }),
          (c = o));
        break;
      case "A":
      case "a":
      case "上":
        var h = { t: o, v: o };
        if (
          (l == null && (l = qn(t, r)),
          e.substr(s, 3).toUpperCase() === "A/P"
            ? (l != null && (h.v = l.H >= 12 ? "P" : "A"),
              (h.t = "T"),
              (p = "h"),
              (s += 3))
            : e.substr(s, 5).toUpperCase() === "AM/PM"
              ? (l != null && (h.v = l.H >= 12 ? "PM" : "AM"),
                (h.t = "T"),
                (s += 5),
                (p = "h"))
              : e.substr(s, 5).toUpperCase() === "上午/下午"
                ? (l != null && (h.v = l.H >= 12 ? "下午" : "上午"),
                  (h.t = "T"),
                  (s += 5),
                  (p = "h"))
                : ((h.t = "t"), ++s),
          l == null && h.t === "T")
        )
          return "";
        ((a[a.length] = h), (c = o));
        break;
      case "[":
        for (i = o; e.charAt(s++) !== "]" && s < e.length;) i += e.charAt(s);
        if (i.slice(-1) !== "]") throw 'unterminated "[" block: |' + i + "|";
        if (i.match(Vs)) {
          if (l == null && ((l = qn(t, r)), l == null)) return "";
          ((a[a.length] = { t: "Z", v: i.toLowerCase() }), (c = i.charAt(1)));
        } else
          i.indexOf("$") > -1 &&
            ((i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$"),
            Hs(e) || (a[a.length] = { t: "t", v: i }));
        break;
      case ".":
        if (l != null) {
          for (i = o; ++s < e.length && (o = e.charAt(s)) === "0";) i += o;
          a[a.length] = { t: "s", v: i };
          break;
        }
      case "0":
      case "#":
        for (
          i = o;
          ++s < e.length && "0#?.,E+-%".indexOf((o = e.charAt(s))) > -1;
        )
          i += o;
        a[a.length] = { t: "n", v: i };
        break;
      case "?":
        for (i = o; e.charAt(++s) === o;) i += o;
        ((a[a.length] = { t: o, v: i }), (c = o));
        break;
      case "*":
        (++s, (e.charAt(s) == " " || e.charAt(s) == "*") && ++s);
        break;
      case "(":
      case ")":
        ((a[a.length] = { t: n === 1 ? "t" : o, v: o }), ++s);
        break;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        for (i = o; s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1;)
          i += e.charAt(s);
        a[a.length] = { t: "D", v: i };
        break;
      case " ":
        ((a[a.length] = { t: o, v: o }), ++s);
        break;
      case "$":
        ((a[a.length] = { t: "t", v: "$" }), ++s);
        break;
      default:
        if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(o) === -1)
          throw new Error("unrecognized character " + o + " in " + e);
        ((a[a.length] = { t: "t", v: o }), ++s);
        break;
    }
  var x = 0,
    C = 0,
    F;
  for (s = a.length - 1, c = "t"; s >= 0; --s)
    switch (a[s].t) {
      case "h":
      case "H":
        ((a[s].t = p), (c = "h"), x < 1 && (x = 1));
        break;
      case "s":
        ((F = a[s].v.match(/\.0+$/)) && (C = Math.max(C, F[0].length - 1)),
          x < 3 && (x = 3));
      case "d":
      case "y":
      case "M":
      case "e":
        c = a[s].t;
        break;
      case "m":
        c === "s" && ((a[s].t = "M"), x < 2 && (x = 2));
        break;
      case "X":
        break;
      case "Z":
        (x < 1 && a[s].v.match(/[Hh]/) && (x = 1),
          x < 2 && a[s].v.match(/[Mm]/) && (x = 2),
          x < 3 && a[s].v.match(/[Ss]/) && (x = 3));
    }
  switch (x) {
    case 0:
      break;
    case 1:
      (l.u >= 0.5 && ((l.u = 0), ++l.S),
        l.S >= 60 && ((l.S = 0), ++l.M),
        l.M >= 60 && ((l.M = 0), ++l.H));
      break;
    case 2:
      (l.u >= 0.5 && ((l.u = 0), ++l.S), l.S >= 60 && ((l.S = 0), ++l.M));
      break;
  }
  var y = "",
    P;
  for (s = 0; s < a.length; ++s)
    switch (a[s].t) {
      case "t":
      case "T":
      case " ":
      case "D":
        break;
      case "X":
        ((a[s].v = ""), (a[s].t = ";"));
        break;
      case "d":
      case "m":
      case "y":
      case "h":
      case "H":
      case "M":
      case "s":
      case "e":
      case "b":
      case "Z":
        ((a[s].v = sl(a[s].t.charCodeAt(0), a[s].v, l, C)), (a[s].t = "t"));
        break;
      case "n":
      case "?":
        for (
          P = s + 1;
          a[P] != null &&
          ((o = a[P].t) === "?" ||
            o === "D" ||
            ((o === " " || o === "t") &&
              a[P + 1] != null &&
              (a[P + 1].t === "?" ||
                (a[P + 1].t === "t" && a[P + 1].v === "/"))) ||
            (a[s].t === "(" && (o === " " || o === "n" || o === ")")) ||
            (o === "t" &&
              (a[P].v === "/" ||
                (a[P].v === " " && a[P + 1] != null && a[P + 1].t == "?"))));
        )
          ((a[s].v += a[P].v), (a[P] = { v: "", t: ";" }), ++P);
        ((y += a[s].v), (s = P - 1));
        break;
      case "G":
        ((a[s].t = "t"), (a[s].v = za(t, r)));
        break;
    }
  var G = "",
    Q,
    k;
  if (y.length > 0) {
    (y.charCodeAt(0) == 40
      ? ((Q = t < 0 && y.charCodeAt(0) === 45 ? -t : t), (k = wt("n", y, Q)))
      : ((Q = t < 0 && n > 1 ? -t : t),
        (k = wt("n", y, Q)),
        Q < 0 &&
          a[0] &&
          a[0].t == "t" &&
          ((k = k.substr(1)), (a[0].v = "-" + a[0].v))),
      (P = k.length - 1));
    var j = a.length;
    for (s = 0; s < a.length; ++s)
      if (a[s] != null && a[s].t != "t" && a[s].v.indexOf(".") > -1) {
        j = s;
        break;
      }
    var N = a.length;
    if (j === a.length && k.indexOf("E") === -1) {
      for (s = a.length - 1; s >= 0; --s)
        a[s] == null ||
          "n?".indexOf(a[s].t) === -1 ||
          (P >= a[s].v.length - 1
            ? ((P -= a[s].v.length), (a[s].v = k.substr(P + 1, a[s].v.length)))
            : P < 0
              ? (a[s].v = "")
              : ((a[s].v = k.substr(0, P + 1)), (P = -1)),
          (a[s].t = "t"),
          (N = s));
      P >= 0 && N < a.length && (a[N].v = k.substr(0, P + 1) + a[N].v);
    } else if (j !== a.length && k.indexOf("E") === -1) {
      for (P = k.indexOf(".") - 1, s = j; s >= 0; --s)
        if (!(a[s] == null || "n?".indexOf(a[s].t) === -1)) {
          for (
            f =
              a[s].v.indexOf(".") > -1 && s === j
                ? a[s].v.indexOf(".") - 1
                : a[s].v.length - 1,
              G = a[s].v.substr(f + 1);
            f >= 0;
            --f
          )
            P >= 0 &&
              (a[s].v.charAt(f) === "0" || a[s].v.charAt(f) === "#") &&
              (G = k.charAt(P--) + G);
          ((a[s].v = G), (a[s].t = "t"), (N = s));
        }
      for (
        P >= 0 && N < a.length && (a[N].v = k.substr(0, P + 1) + a[N].v),
          P = k.indexOf(".") + 1,
          s = j;
        s < a.length;
        ++s
      )
        if (!(a[s] == null || ("n?(".indexOf(a[s].t) === -1 && s !== j))) {
          for (
            f =
              a[s].v.indexOf(".") > -1 && s === j ? a[s].v.indexOf(".") + 1 : 0,
              G = a[s].v.substr(0, f);
            f < a[s].v.length;
            ++f
          )
            P < k.length && (G += k.charAt(P++));
          ((a[s].v = G), (a[s].t = "t"), (N = s));
        }
    }
  }
  for (s = 0; s < a.length; ++s)
    a[s] != null &&
      "n?".indexOf(a[s].t) > -1 &&
      ((Q = n > 1 && t < 0 && s > 0 && a[s - 1].v === "-" ? -t : t),
      (a[s].v = wt(a[s].t, a[s].v, Q)),
      (a[s].t = "t"));
  var V = "";
  for (s = 0; s !== a.length; ++s) a[s] != null && (V += a[s].v);
  return V;
}
var Ri = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
function Ii(e, t) {
  if (t == null) return !1;
  var r = parseFloat(t[2]);
  switch (t[1]) {
    case "=":
      if (e == r) return !0;
      break;
    case ">":
      if (e > r) return !0;
      break;
    case "<":
      if (e < r) return !0;
      break;
    case "<>":
      if (e != r) return !0;
      break;
    case ">=":
      if (e >= r) return !0;
      break;
    case "<=":
      if (e <= r) return !0;
      break;
  }
  return !1;
}
function gl(e, t) {
  var r = pl(e),
    n = r.length,
    a = r[n - 1].indexOf("@");
  if ((n < 4 && a > -1 && --n, r.length > 4))
    throw new Error("cannot find right format for |" + r.join("|") + "|");
  if (typeof t != "number")
    return [4, r.length === 4 || a > -1 ? r[r.length - 1] : "@"];
  switch (r.length) {
    case 1:
      r =
        a > -1
          ? ["General", "General", "General", r[0]]
          : [r[0], r[0], r[0], "@"];
      break;
    case 2:
      r = a > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
      break;
    case 3:
      r = a > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
      break;
  }
  var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
  if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1) return [n, i];
  if (r[0].match(/\[[=<>]/) != null || r[1].match(/\[[=<>]/) != null) {
    var s = r[0].match(Ri),
      o = r[1].match(Ri);
    return Ii(t, s)
      ? [n, r[0]]
      : Ii(t, o)
        ? [n, r[1]]
        : [n, r[s != null && o != null ? 2 : 1]];
  }
  return [n, i];
}
function Ot(e, t, r) {
  r == null && (r = {});
  var n = "";
  switch (typeof e) {
    case "string":
      e == "m/d/yy" && r.dateNF ? (n = r.dateNF) : (n = e);
      break;
    case "number":
      (e == 14 && r.dateNF
        ? (n = r.dateNF)
        : (n = (r.table != null ? r.table : gr)[e]),
        n == null && (n = (r.table && r.table[Ni[e]]) || gr[Ni[e]]),
        n == null && (n = Qo[e] || "General"));
      break;
  }
  if (la(n, 0)) return za(t, r);
  t instanceof Date && (t = Rs(t, r.date1904));
  var a = gl(n, t);
  if (la(a[1])) return za(t, r);
  if (t === !0) t = "TRUE";
  else if (t === !1) t = "FALSE";
  else if (t === "" || t == null) return "";
  return ml(a[1], t, r, a[0]);
}
function Gs(e, t) {
  if (typeof t != "number") {
    t = +t || -1;
    for (var r = 0; r < 392; ++r) {
      if (gr[r] == null) {
        t < 0 && (t = r);
        continue;
      }
      if (gr[r] == e) {
        t = r;
        break;
      }
    }
    t < 0 && (t = 391);
  }
  return ((gr[t] = e), t);
}
function Ca(e) {
  for (var t = 0; t != 392; ++t) e[t] !== void 0 && Gs(e[t], t);
}
function Fa() {
  gr = Jo();
}
var $s = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
function vl(e) {
  var t = typeof e == "number" ? gr[e] : e;
  return ((t = t.replace($s, "(\\d+)")), new RegExp("^" + t + "$"));
}
function _l(e, t, r) {
  var n = -1,
    a = -1,
    i = -1,
    s = -1,
    o = -1,
    c = -1;
  ((t.match($s) || []).forEach(function (m, p) {
    var d = parseInt(r[p + 1], 10);
    switch (m.toLowerCase().charAt(0)) {
      case "y":
        n = d;
        break;
      case "d":
        i = d;
        break;
      case "h":
        s = d;
        break;
      case "s":
        c = d;
        break;
      case "m":
        s >= 0 ? (o = d) : (a = d);
        break;
    }
  }),
    c >= 0 && o == -1 && a >= 0 && ((o = a), (a = -1)));
  var l =
    ("" + (n >= 0 ? n : new Date().getFullYear())).slice(-4) +
    "-" +
    ("00" + (a >= 1 ? a : 1)).slice(-2) +
    "-" +
    ("00" + (i >= 1 ? i : 1)).slice(-2);
  (l.length == 7 && (l = "0" + l), l.length == 8 && (l = "20" + l));
  var f =
    ("00" + (s >= 0 ? s : 0)).slice(-2) +
    ":" +
    ("00" + (o >= 0 ? o : 0)).slice(-2) +
    ":" +
    ("00" + (c >= 0 ? c : 0)).slice(-2);
  return s == -1 && o == -1 && c == -1
    ? l
    : n == -1 && a == -1 && i == -1
      ? f
      : l + "T" + f;
}
var Tl = (function () {
    var e = {};
    e.version = "1.2.0";
    function t() {
      for (var k = 0, j = new Array(256), N = 0; N != 256; ++N)
        ((k = N),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (k = k & 1 ? -306674912 ^ (k >>> 1) : k >>> 1),
          (j[N] = k));
      return typeof Int32Array < "u" ? new Int32Array(j) : j;
    }
    var r = t();
    function n(k) {
      var j = 0,
        N = 0,
        V = 0,
        H = typeof Int32Array < "u" ? new Int32Array(4096) : new Array(4096);
      for (V = 0; V != 256; ++V) H[V] = k[V];
      for (V = 0; V != 256; ++V)
        for (N = k[V], j = 256 + V; j < 4096; j += 256)
          N = H[j] = (N >>> 8) ^ k[N & 255];
      var Y = [];
      for (V = 1; V != 16; ++V)
        Y[V - 1] =
          typeof Int32Array < "u"
            ? H.subarray(V * 256, V * 256 + 256)
            : H.slice(V * 256, V * 256 + 256);
      return Y;
    }
    var a = n(r),
      i = a[0],
      s = a[1],
      o = a[2],
      c = a[3],
      l = a[4],
      f = a[5],
      m = a[6],
      p = a[7],
      d = a[8],
      _ = a[9],
      h = a[10],
      x = a[11],
      C = a[12],
      F = a[13],
      y = a[14];
    function P(k, j) {
      for (var N = j ^ -1, V = 0, H = k.length; V < H;)
        N = (N >>> 8) ^ r[(N ^ k.charCodeAt(V++)) & 255];
      return ~N;
    }
    function G(k, j) {
      for (var N = j ^ -1, V = k.length - 15, H = 0; H < V;)
        N =
          y[k[H++] ^ (N & 255)] ^
          F[k[H++] ^ ((N >> 8) & 255)] ^
          C[k[H++] ^ ((N >> 16) & 255)] ^
          x[k[H++] ^ (N >>> 24)] ^
          h[k[H++]] ^
          _[k[H++]] ^
          d[k[H++]] ^
          p[k[H++]] ^
          m[k[H++]] ^
          f[k[H++]] ^
          l[k[H++]] ^
          c[k[H++]] ^
          o[k[H++]] ^
          s[k[H++]] ^
          i[k[H++]] ^
          r[k[H++]];
      for (V += 15; H < V;) N = (N >>> 8) ^ r[(N ^ k[H++]) & 255];
      return ~N;
    }
    function Q(k, j) {
      for (var N = j ^ -1, V = 0, H = k.length, Y = 0, Z = 0; V < H;)
        ((Y = k.charCodeAt(V++)),
          Y < 128
            ? (N = (N >>> 8) ^ r[(N ^ Y) & 255])
            : Y < 2048
              ? ((N = (N >>> 8) ^ r[(N ^ (192 | ((Y >> 6) & 31))) & 255]),
                (N = (N >>> 8) ^ r[(N ^ (128 | (Y & 63))) & 255]))
              : Y >= 55296 && Y < 57344
                ? ((Y = (Y & 1023) + 64),
                  (Z = k.charCodeAt(V++) & 1023),
                  (N = (N >>> 8) ^ r[(N ^ (240 | ((Y >> 8) & 7))) & 255]),
                  (N = (N >>> 8) ^ r[(N ^ (128 | ((Y >> 2) & 63))) & 255]),
                  (N =
                    (N >>> 8) ^
                    r[(N ^ (128 | ((Z >> 6) & 15) | ((Y & 3) << 4))) & 255]),
                  (N = (N >>> 8) ^ r[(N ^ (128 | (Z & 63))) & 255]))
                : ((N = (N >>> 8) ^ r[(N ^ (224 | ((Y >> 12) & 15))) & 255]),
                  (N = (N >>> 8) ^ r[(N ^ (128 | ((Y >> 6) & 63))) & 255]),
                  (N = (N >>> 8) ^ r[(N ^ (128 | (Y & 63))) & 255])));
      return ~N;
    }
    return ((e.table = r), (e.bstr = P), (e.buf = G), (e.str = Q), e);
  })(),
  rr = (function () {
    var t = {};
    t.version = "1.2.1";
    function r(g, E) {
      for (
        var v = g.split("/"),
          T = E.split("/"),
          S = 0,
          w = 0,
          I = Math.min(v.length, T.length);
        S < I;
        ++S
      ) {
        if ((w = v[S].length - T[S].length)) return w;
        if (v[S] != T[S]) return v[S] < T[S] ? -1 : 1;
      }
      return v.length - T.length;
    }
    function n(g) {
      if (g.charAt(g.length - 1) == "/")
        return g.slice(0, -1).indexOf("/") === -1 ? g : n(g.slice(0, -1));
      var E = g.lastIndexOf("/");
      return E === -1 ? g : g.slice(0, E + 1);
    }
    function a(g) {
      if (g.charAt(g.length - 1) == "/") return a(g.slice(0, -1));
      var E = g.lastIndexOf("/");
      return E === -1 ? g : g.slice(E + 1);
    }
    function i(g, E) {
      typeof E == "string" && (E = new Date(E));
      var v = E.getHours();
      ((v = (v << 6) | E.getMinutes()),
        (v = (v << 5) | (E.getSeconds() >>> 1)),
        g.write_shift(2, v));
      var T = E.getFullYear() - 1980;
      ((T = (T << 4) | (E.getMonth() + 1)),
        (T = (T << 5) | E.getDate()),
        g.write_shift(2, T));
    }
    function s(g) {
      var E = g.read_shift(2) & 65535,
        v = g.read_shift(2) & 65535,
        T = new Date(),
        S = v & 31;
      v >>>= 5;
      var w = v & 15;
      ((v >>>= 4),
        T.setMilliseconds(0),
        T.setFullYear(v + 1980),
        T.setMonth(w - 1),
        T.setDate(S));
      var I = E & 31;
      E >>>= 5;
      var U = E & 63;
      return (
        (E >>>= 6),
        T.setHours(E),
        T.setMinutes(U),
        T.setSeconds(I << 1),
        T
      );
    }
    function o(g) {
      et(g, 0);
      for (var E = {}, v = 0; g.l <= g.length - 4;) {
        var T = g.read_shift(2),
          S = g.read_shift(2),
          w = g.l + S,
          I = {};
        switch (T) {
          case 21589:
            ((v = g.read_shift(1)),
              v & 1 && (I.mtime = g.read_shift(4)),
              S > 5 &&
                (v & 2 && (I.atime = g.read_shift(4)),
                v & 4 && (I.ctime = g.read_shift(4))),
              I.mtime && (I.mt = new Date(I.mtime * 1e3)));
            break;
        }
        ((g.l = w), (E[T] = I));
      }
      return E;
    }
    var c;
    function l() {
      return c || (c = {});
    }
    function f(g, E) {
      if (g[0] == 80 && g[1] == 75) return Je(g, E);
      if ((g[0] | 32) == 109 && (g[1] | 32) == 105) return tr(g, E);
      if (g.length < 512)
        throw new Error("CFB file size " + g.length + " < 512");
      var v = 3,
        T = 512,
        S = 0,
        w = 0,
        I = 0,
        U = 0,
        R = 0,
        M = [],
        B = g.slice(0, 512);
      et(B, 0);
      var J = m(B);
      switch (((v = J[0]), v)) {
        case 3:
          T = 512;
          break;
        case 4:
          T = 4096;
          break;
        case 0:
          if (J[1] == 0) return Je(g, E);
        default:
          throw new Error("Major Version: Expected 3 or 4 saw " + v);
      }
      T !== 512 && ((B = g.slice(0, T)), et(B, 28));
      var ae = g.slice(0, T);
      p(B, v);
      var ue = B.read_shift(4, "i");
      if (v === 3 && ue !== 0)
        throw new Error("# Directory Sectors: Expected 0 saw " + ue);
      ((B.l += 4),
        (I = B.read_shift(4, "i")),
        (B.l += 4),
        B.chk("00100000", "Mini Stream Cutoff Size: "),
        (U = B.read_shift(4, "i")),
        (S = B.read_shift(4, "i")),
        (R = B.read_shift(4, "i")),
        (w = B.read_shift(4, "i")));
      for (
        var ee = -1, ce = 0;
        ce < 109 && ((ee = B.read_shift(4, "i")), !(ee < 0));
        ++ce
      )
        M[ce] = ee;
      var De = d(g, T);
      x(R, w, De, T, M);
      var hr = F(De, I, M, T);
      ((hr[I].name = "!Directory"),
        S > 0 && U !== Z && (hr[U].name = "!MiniFAT"),
        (hr[M[0]].name = "!FAT"),
        (hr.fat_addrs = M),
        (hr.ssz = T));
      var dr = {},
        Ur = [],
        dn = [],
        xn = [];
      (y(I, hr, De, Ur, S, dr, dn, U), _(dn, xn, Ur), Ur.shift());
      var pn = { FileIndex: dn, FullPaths: xn };
      return (E && E.raw && (pn.raw = { header: ae, sectors: De }), pn);
    }
    function m(g) {
      if (g[g.l] == 80 && g[g.l + 1] == 75) return [0, 0];
      (g.chk(Te, "Header Signature: "), (g.l += 16));
      var E = g.read_shift(2, "u");
      return [g.read_shift(2, "u"), E];
    }
    function p(g, E) {
      var v = 9;
      switch (((g.l += 2), (v = g.read_shift(2)))) {
        case 9:
          if (E != 3) throw new Error("Sector Shift: Expected 9 saw " + v);
          break;
        case 12:
          if (E != 4) throw new Error("Sector Shift: Expected 12 saw " + v);
          break;
        default:
          throw new Error("Sector Shift: Expected 9 or 12 saw " + v);
      }
      (g.chk("0600", "Mini Sector Shift: "),
        g.chk("000000000000", "Reserved: "));
    }
    function d(g, E) {
      for (var v = Math.ceil(g.length / E) - 1, T = [], S = 1; S < v; ++S)
        T[S - 1] = g.slice(S * E, (S + 1) * E);
      return ((T[v - 1] = g.slice(v * E)), T);
    }
    function _(g, E, v) {
      for (
        var T = 0, S = 0, w = 0, I = 0, U = 0, R = v.length, M = [], B = [];
        T < R;
        ++T
      )
        ((M[T] = B[T] = T), (E[T] = v[T]));
      for (; U < B.length; ++U)
        ((T = B[U]),
          (S = g[T].L),
          (w = g[T].R),
          (I = g[T].C),
          M[T] === T &&
            (S !== -1 && M[S] !== S && (M[T] = M[S]),
            w !== -1 && M[w] !== w && (M[T] = M[w])),
          I !== -1 && (M[I] = T),
          S !== -1 &&
            T != M[T] &&
            ((M[S] = M[T]), B.lastIndexOf(S) < U && B.push(S)),
          w !== -1 &&
            T != M[T] &&
            ((M[w] = M[T]), B.lastIndexOf(w) < U && B.push(w)));
      for (T = 1; T < R; ++T)
        M[T] === T &&
          (w !== -1 && M[w] !== w
            ? (M[T] = M[w])
            : S !== -1 && M[S] !== S && (M[T] = M[S]));
      for (T = 1; T < R; ++T)
        if (g[T].type !== 0) {
          if (((U = T), U != M[U]))
            do ((U = M[U]), (E[T] = E[U] + "/" + E[T]));
            while (U !== 0 && M[U] !== -1 && U != M[U]);
          M[T] = -1;
        }
      for (E[0] += "/", T = 1; T < R; ++T) g[T].type !== 2 && (E[T] += "/");
    }
    function h(g, E, v) {
      for (var T = g.start, S = g.size, w = [], I = T; v && S > 0 && I >= 0;)
        (w.push(E.slice(I * Y, I * Y + Y)), (S -= Y), (I = Bt(v, I * 4)));
      return w.length === 0 ? W(0) : Lr(w).slice(0, g.size);
    }
    function x(g, E, v, T, S) {
      var w = Z;
      if (g === Z) {
        if (E !== 0) throw new Error("DIFAT chain shorter than expected");
      } else if (g !== -1) {
        var I = v[g],
          U = (T >>> 2) - 1;
        if (!I) return;
        for (var R = 0; R < U && (w = Bt(I, R * 4)) !== Z; ++R) S.push(w);
        x(Bt(I, T - 4), E - 1, v, T, S);
      }
    }
    function C(g, E, v, T, S) {
      var w = [],
        I = [];
      S || (S = []);
      var U = T - 1,
        R = 0,
        M = 0;
      for (R = E; R >= 0;) {
        ((S[R] = !0), (w[w.length] = R), I.push(g[R]));
        var B = v[Math.floor((R * 4) / T)];
        if (((M = (R * 4) & U), T < 4 + M))
          throw new Error("FAT boundary crossed: " + R + " 4 " + T);
        if (!g[B]) break;
        R = Bt(g[B], M);
      }
      return { nodes: w, data: Hi([I]) };
    }
    function F(g, E, v, T) {
      var S = g.length,
        w = [],
        I = [],
        U = [],
        R = [],
        M = T - 1,
        B = 0,
        J = 0,
        ae = 0,
        ue = 0;
      for (B = 0; B < S; ++B)
        if (((U = []), (ae = B + E), ae >= S && (ae -= S), !I[ae])) {
          R = [];
          var ee = [];
          for (J = ae; J >= 0;) {
            ((ee[J] = !0), (I[J] = !0), (U[U.length] = J), R.push(g[J]));
            var ce = v[Math.floor((J * 4) / T)];
            if (((ue = (J * 4) & M), T < 4 + ue))
              throw new Error("FAT boundary crossed: " + J + " 4 " + T);
            if (!g[ce] || ((J = Bt(g[ce], ue)), ee[J])) break;
          }
          w[ae] = { nodes: U, data: Hi([R]) };
        }
      return w;
    }
    function y(g, E, v, T, S, w, I, U) {
      for (
        var R = 0, M = T.length ? 2 : 0, B = E[g].data, J = 0, ae = 0, ue;
        J < B.length;
        J += 128
      ) {
        var ee = B.slice(J, J + 128);
        (et(ee, 64),
          (ae = ee.read_shift(2)),
          (ue = oi(ee, 0, ae - M)),
          T.push(ue));
        var ce = {
            name: ue,
            type: ee.read_shift(1),
            color: ee.read_shift(1),
            L: ee.read_shift(4, "i"),
            R: ee.read_shift(4, "i"),
            C: ee.read_shift(4, "i"),
            clsid: ee.read_shift(16),
            state: ee.read_shift(4, "i"),
            start: 0,
            size: 0,
          },
          De =
            ee.read_shift(2) +
            ee.read_shift(2) +
            ee.read_shift(2) +
            ee.read_shift(2);
        De !== 0 && (ce.ct = P(ee, ee.l - 8));
        var hr =
          ee.read_shift(2) +
          ee.read_shift(2) +
          ee.read_shift(2) +
          ee.read_shift(2);
        (hr !== 0 && (ce.mt = P(ee, ee.l - 8)),
          (ce.start = ee.read_shift(4, "i")),
          (ce.size = ee.read_shift(4, "i")),
          ce.size < 0 &&
            ce.start < 0 &&
            ((ce.size = ce.type = 0), (ce.start = Z), (ce.name = "")),
          ce.type === 5
            ? ((R = ce.start), S > 0 && R !== Z && (E[R].name = "!StreamData"))
            : ce.size >= 4096
              ? ((ce.storage = "fat"),
                E[ce.start] === void 0 &&
                  (E[ce.start] = C(v, ce.start, E.fat_addrs, E.ssz)),
                (E[ce.start].name = ce.name),
                (ce.content = E[ce.start].data.slice(0, ce.size)))
              : ((ce.storage = "minifat"),
                ce.size < 0
                  ? (ce.size = 0)
                  : R !== Z &&
                    ce.start !== Z &&
                    E[R] &&
                    (ce.content = h(ce, E[R].data, (E[U] || {}).data))),
          ce.content && et(ce.content, 0),
          (w[ue] = ce),
          I.push(ce));
      }
    }
    function P(g, E) {
      return new Date(
        ((tt(g, E + 4) / 1e7) * Math.pow(2, 32) +
          tt(g, E) / 1e7 -
          11644473600) *
          1e3,
      );
    }
    function G(g, E) {
      return (l(), f(c.readFileSync(g), E));
    }
    function Q(g, E) {
      var v = E && E.type;
      switch (
        (v || (We && Buffer.isBuffer(g) && (v = "buffer")), v || "base64")
      ) {
        case "file":
          return G(g, E);
        case "base64":
          return f(dt(Ct(g)), E);
        case "binary":
          return f(dt(g), E);
      }
      return f(g, E);
    }
    function k(g, E) {
      var v = E || {},
        T = v.root || "Root Entry";
      if (
        (g.FullPaths || (g.FullPaths = []),
        g.FileIndex || (g.FileIndex = []),
        g.FullPaths.length !== g.FileIndex.length)
      )
        throw new Error("inconsistent CFB structure");
      (g.FullPaths.length === 0 &&
        ((g.FullPaths[0] = T + "/"), (g.FileIndex[0] = { name: T, type: 5 })),
        v.CLSID && (g.FileIndex[0].clsid = v.CLSID),
        j(g));
    }
    function j(g) {
      var E = "Sh33tJ5";
      if (!rr.find(g, "/" + E)) {
        var v = W(4);
        ((v[0] = 55),
          (v[1] = v[3] = 50),
          (v[2] = 54),
          g.FileIndex.push({
            name: E,
            type: 2,
            content: v,
            size: 4,
            L: 69,
            R: 69,
            C: 69,
          }),
          g.FullPaths.push(g.FullPaths[0] + E),
          N(g));
      }
    }
    function N(g, E) {
      k(g);
      for (var v = !1, T = !1, S = g.FullPaths.length - 1; S >= 0; --S) {
        var w = g.FileIndex[S];
        switch (w.type) {
          case 0:
            T ? (v = !0) : (g.FileIndex.pop(), g.FullPaths.pop());
            break;
          case 1:
          case 2:
          case 5:
            ((T = !0),
              isNaN(w.R * w.L * w.C) && (v = !0),
              w.R > -1 && w.L > -1 && w.R == w.L && (v = !0));
            break;
          default:
            v = !0;
            break;
        }
      }
      if (!(!v && !E)) {
        var I = new Date(1987, 1, 19),
          U = 0,
          R = Object.create ? Object.create(null) : {},
          M = [];
        for (S = 0; S < g.FullPaths.length; ++S)
          ((R[g.FullPaths[S]] = !0),
            g.FileIndex[S].type !== 0 &&
              M.push([g.FullPaths[S], g.FileIndex[S]]));
        for (S = 0; S < M.length; ++S) {
          var B = n(M[S][0]);
          ((T = R[B]),
            T ||
              (M.push([
                B,
                {
                  name: a(B).replace("/", ""),
                  type: 1,
                  clsid: le,
                  ct: I,
                  mt: I,
                  content: null,
                },
              ]),
              (R[B] = !0)));
        }
        for (
          M.sort(function (ue, ee) {
            return r(ue[0], ee[0]);
          }),
            g.FullPaths = [],
            g.FileIndex = [],
            S = 0;
          S < M.length;
          ++S
        )
          ((g.FullPaths[S] = M[S][0]), (g.FileIndex[S] = M[S][1]));
        for (S = 0; S < M.length; ++S) {
          var J = g.FileIndex[S],
            ae = g.FullPaths[S];
          if (
            ((J.name = a(ae).replace("/", "")),
            (J.L = J.R = J.C = -(J.color = 1)),
            (J.size = J.content ? J.content.length : 0),
            (J.start = 0),
            (J.clsid = J.clsid || le),
            S === 0)
          )
            ((J.C = M.length > 1 ? 1 : -1), (J.size = 0), (J.type = 5));
          else if (ae.slice(-1) == "/") {
            for (U = S + 1; U < M.length && n(g.FullPaths[U]) != ae; ++U);
            for (
              J.C = U >= M.length ? -1 : U, U = S + 1;
              U < M.length && n(g.FullPaths[U]) != n(ae);
              ++U
            );
            ((J.R = U >= M.length ? -1 : U), (J.type = 1));
          } else
            (n(g.FullPaths[S + 1] || "") == n(ae) && (J.R = S + 1),
              (J.type = 2));
        }
      }
    }
    function V(g, E) {
      var v = E || {};
      if (v.fileType == "mad") return ur(g, v);
      switch ((N(g), v.fileType)) {
        case "zip":
          return sr(g, v);
      }
      var T = (function (ue) {
          for (var ee = 0, ce = 0, De = 0; De < ue.FileIndex.length; ++De) {
            var hr = ue.FileIndex[De];
            if (hr.content) {
              var dr = hr.content.length;
              dr > 0 &&
                (dr < 4096 ? (ee += (dr + 63) >> 6) : (ce += (dr + 511) >> 9));
            }
          }
          for (
            var Ur = (ue.FullPaths.length + 3) >> 2,
              dn = (ee + 7) >> 3,
              xn = (ee + 127) >> 7,
              pn = dn + ce + Ur + xn,
              Mt = (pn + 127) >> 7,
              Oa = Mt <= 109 ? 0 : Math.ceil((Mt - 109) / 127);
            (pn + Mt + Oa + 127) >> 7 > Mt;
          )
            Oa = ++Mt <= 109 ? 0 : Math.ceil((Mt - 109) / 127);
          var Tt = [1, Oa, Mt, xn, Ur, ce, ee, 0];
          return (
            (ue.FileIndex[0].size = ee << 6),
            (Tt[7] =
              (ue.FileIndex[0].start =
                Tt[0] + Tt[1] + Tt[2] + Tt[3] + Tt[4] + Tt[5]) +
              ((Tt[6] + 7) >> 3)),
            Tt
          );
        })(g),
        S = W(T[7] << 9),
        w = 0,
        I = 0;
      {
        for (w = 0; w < 8; ++w) S.write_shift(1, he[w]);
        for (w = 0; w < 8; ++w) S.write_shift(2, 0);
        for (
          S.write_shift(2, 62),
            S.write_shift(2, 3),
            S.write_shift(2, 65534),
            S.write_shift(2, 9),
            S.write_shift(2, 6),
            w = 0;
          w < 3;
          ++w
        )
          S.write_shift(2, 0);
        for (
          S.write_shift(4, 0),
            S.write_shift(4, T[2]),
            S.write_shift(4, T[0] + T[1] + T[2] + T[3] - 1),
            S.write_shift(4, 0),
            S.write_shift(4, 4096),
            S.write_shift(4, T[3] ? T[0] + T[1] + T[2] - 1 : Z),
            S.write_shift(4, T[3]),
            S.write_shift(-4, T[1] ? T[0] - 1 : Z),
            S.write_shift(4, T[1]),
            w = 0;
          w < 109;
          ++w
        )
          S.write_shift(-4, w < T[2] ? T[1] + w : -1);
      }
      if (T[1])
        for (I = 0; I < T[1]; ++I) {
          for (; w < 236 + I * 127; ++w)
            S.write_shift(-4, w < T[2] ? T[1] + w : -1);
          S.write_shift(-4, I === T[1] - 1 ? Z : I + 1);
        }
      var U = function (ue) {
        for (I += ue; w < I - 1; ++w) S.write_shift(-4, w + 1);
        ue && (++w, S.write_shift(-4, Z));
      };
      for (I = w = 0, I += T[1]; w < I; ++w) S.write_shift(-4, _e.DIFSECT);
      for (I += T[2]; w < I; ++w) S.write_shift(-4, _e.FATSECT);
      (U(T[3]), U(T[4]));
      for (var R = 0, M = 0, B = g.FileIndex[0]; R < g.FileIndex.length; ++R)
        ((B = g.FileIndex[R]),
          B.content &&
            ((M = B.content.length),
            !(M < 4096) && ((B.start = I), U((M + 511) >> 9))));
      for (U((T[6] + 7) >> 3); S.l & 511;) S.write_shift(-4, _e.ENDOFCHAIN);
      for (I = w = 0, R = 0; R < g.FileIndex.length; ++R)
        ((B = g.FileIndex[R]),
          B.content &&
            ((M = B.content.length),
            !(!M || M >= 4096) && ((B.start = I), U((M + 63) >> 6))));
      for (; S.l & 511;) S.write_shift(-4, _e.ENDOFCHAIN);
      for (w = 0; w < T[4] << 2; ++w) {
        var J = g.FullPaths[w];
        if (!J || J.length === 0) {
          for (R = 0; R < 17; ++R) S.write_shift(4, 0);
          for (R = 0; R < 3; ++R) S.write_shift(4, -1);
          for (R = 0; R < 12; ++R) S.write_shift(4, 0);
          continue;
        }
        ((B = g.FileIndex[w]), w === 0 && (B.start = B.size ? B.start - 1 : Z));
        var ae = (w === 0 && v.root) || B.name;
        if (
          ((M = 2 * (ae.length + 1)),
          S.write_shift(64, ae, "utf16le"),
          S.write_shift(2, M),
          S.write_shift(1, B.type),
          S.write_shift(1, B.color),
          S.write_shift(-4, B.L),
          S.write_shift(-4, B.R),
          S.write_shift(-4, B.C),
          B.clsid)
        )
          S.write_shift(16, B.clsid, "hex");
        else for (R = 0; R < 4; ++R) S.write_shift(4, 0);
        (S.write_shift(4, B.state || 0),
          S.write_shift(4, 0),
          S.write_shift(4, 0),
          S.write_shift(4, 0),
          S.write_shift(4, 0),
          S.write_shift(4, B.start),
          S.write_shift(4, B.size),
          S.write_shift(4, 0));
      }
      for (w = 1; w < g.FileIndex.length; ++w)
        if (((B = g.FileIndex[w]), B.size >= 4096))
          if (((S.l = (B.start + 1) << 9), We && Buffer.isBuffer(B.content)))
            (B.content.copy(S, S.l, 0, B.size), (S.l += (B.size + 511) & -512));
          else {
            for (R = 0; R < B.size; ++R) S.write_shift(1, B.content[R]);
            for (; R & 511; ++R) S.write_shift(1, 0);
          }
      for (w = 1; w < g.FileIndex.length; ++w)
        if (((B = g.FileIndex[w]), B.size > 0 && B.size < 4096))
          if (We && Buffer.isBuffer(B.content))
            (B.content.copy(S, S.l, 0, B.size), (S.l += (B.size + 63) & -64));
          else {
            for (R = 0; R < B.size; ++R) S.write_shift(1, B.content[R]);
            for (; R & 63; ++R) S.write_shift(1, 0);
          }
      if (We) S.l = S.length;
      else for (; S.l < S.length;) S.write_shift(1, 0);
      return S;
    }
    function H(g, E) {
      var v = g.FullPaths.map(function (R) {
          return R.toUpperCase();
        }),
        T = v.map(function (R) {
          var M = R.split("/");
          return M[M.length - (R.slice(-1) == "/" ? 2 : 1)];
        }),
        S = !1;
      E.charCodeAt(0) === 47
        ? ((S = !0), (E = v[0].slice(0, -1) + E))
        : (S = E.indexOf("/") !== -1);
      var w = E.toUpperCase(),
        I = S === !0 ? v.indexOf(w) : T.indexOf(w);
      if (I !== -1) return g.FileIndex[I];
      var U = !w.match(Kn);
      for (
        w = w.replace(Sn, ""), U && (w = w.replace(Kn, "!")), I = 0;
        I < v.length;
        ++I
      )
        if (
          (U ? v[I].replace(Kn, "!") : v[I]).replace(Sn, "") == w ||
          (U ? T[I].replace(Kn, "!") : T[I]).replace(Sn, "") == w
        )
          return g.FileIndex[I];
      return null;
    }
    var Y = 64,
      Z = -2,
      Te = "d0cf11e0a1b11ae1",
      he = [208, 207, 17, 224, 161, 177, 26, 225],
      le = "00000000000000000000000000000000",
      _e = {
        MAXREGSECT: -6,
        DIFSECT: -4,
        FATSECT: -3,
        ENDOFCHAIN: Z,
        FREESECT: -1,
        HEADER_SIGNATURE: Te,
        HEADER_MINOR_VERSION: "3e00",
        MAXREGSID: -6,
        NOSTREAM: -1,
        HEADER_CLSID: le,
        EntryTypes: [
          "unknown",
          "storage",
          "stream",
          "lockbytes",
          "property",
          "root",
        ],
      };
    function ye(g, E, v) {
      l();
      var T = V(g, v);
      c.writeFileSync(E, T);
    }
    function Be(g) {
      for (var E = new Array(g.length), v = 0; v < g.length; ++v)
        E[v] = String.fromCharCode(g[v]);
      return E.join("");
    }
    function Ie(g, E) {
      var v = V(g, E);
      switch ((E && E.type) || "buffer") {
        case "file":
          return (l(), c.writeFileSync(E.filename, v), v);
        case "binary":
          return typeof v == "string" ? v : Be(v);
        case "base64":
          return Rn(typeof v == "string" ? v : Be(v));
        case "buffer":
          if (We) return Buffer.isBuffer(v) ? v : bt(v);
        case "array":
          return typeof v == "string" ? dt(v) : v;
      }
      return v;
    }
    var Pe;
    function A(g) {
      try {
        var E = g.InflateRaw,
          v = new E();
        if (
          (v._processChunk(new Uint8Array([3, 0]), v._finishFlushFlag),
          v.bytesRead)
        )
          Pe = g;
        else throw new Error("zlib does not expose bytesRead");
      } catch (T) {
        console.error("cannot use native zlib: " + (T.message || T));
      }
    }
    function O(g, E) {
      if (!Pe) return Me(g, E);
      var v = Pe.InflateRaw,
        T = new v(),
        S = T._processChunk(g.slice(g.l), T._finishFlushFlag);
      return ((g.l += T.bytesRead), S);
    }
    function D(g) {
      return Pe ? Pe.deflateRawSync(g) : Ue(g);
    }
    var b = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
      z = [
        3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59,
        67, 83, 99, 115, 131, 163, 195, 227, 258,
      ],
      fe = [
        1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385,
        513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
      ];
    function xe(g) {
      var E =
        (((g << 1) | (g << 11)) & 139536) | (((g << 5) | (g << 15)) & 558144);
      return ((E >> 16) | (E >> 8) | E) & 255;
    }
    for (
      var ie = typeof Uint8Array < "u",
        re = ie ? new Uint8Array(256) : [],
        Ce = 0;
      Ce < 256;
      ++Ce
    )
      re[Ce] = xe(Ce);
    function Ee(g, E) {
      var v = re[g & 255];
      return E <= 8
        ? v >>> (8 - E)
        : ((v = (v << 8) | re[(g >> 8) & 255]),
          E <= 16
            ? v >>> (16 - E)
            : ((v = (v << 8) | re[(g >> 16) & 255]), v >>> (24 - E)));
    }
    function qe(g, E) {
      var v = E & 7,
        T = E >>> 3;
      return ((g[T] | (v <= 6 ? 0 : g[T + 1] << 8)) >>> v) & 3;
    }
    function Fe(g, E) {
      var v = E & 7,
        T = E >>> 3;
      return ((g[T] | (v <= 5 ? 0 : g[T + 1] << 8)) >>> v) & 7;
    }
    function ir(g, E) {
      var v = E & 7,
        T = E >>> 3;
      return ((g[T] | (v <= 4 ? 0 : g[T + 1] << 8)) >>> v) & 15;
    }
    function He(g, E) {
      var v = E & 7,
        T = E >>> 3;
      return ((g[T] | (v <= 3 ? 0 : g[T + 1] << 8)) >>> v) & 31;
    }
    function se(g, E) {
      var v = E & 7,
        T = E >>> 3;
      return ((g[T] | (v <= 1 ? 0 : g[T + 1] << 8)) >>> v) & 127;
    }
    function vr(g, E, v) {
      var T = E & 7,
        S = E >>> 3,
        w = (1 << v) - 1,
        I = g[S] >>> T;
      return (
        v < 8 - T ||
          ((I |= g[S + 1] << (8 - T)), v < 16 - T) ||
          ((I |= g[S + 2] << (16 - T)), v < 24 - T) ||
          (I |= g[S + 3] << (24 - T)),
        I & w
      );
    }
    function Cr(g, E, v) {
      var T = E & 7,
        S = E >>> 3;
      return (
        T <= 5
          ? (g[S] |= (v & 7) << T)
          : ((g[S] |= (v << T) & 255), (g[S + 1] = (v & 7) >> (8 - T))),
        E + 3
      );
    }
    function zr(g, E, v) {
      var T = E & 7,
        S = E >>> 3;
      return ((v = (v & 1) << T), (g[S] |= v), E + 1);
    }
    function Jr(g, E, v) {
      var T = E & 7,
        S = E >>> 3;
      return ((v <<= T), (g[S] |= v & 255), (v >>>= 8), (g[S + 1] = v), E + 8);
    }
    function _t(g, E, v) {
      var T = E & 7,
        S = E >>> 3;
      return (
        (v <<= T),
        (g[S] |= v & 255),
        (v >>>= 8),
        (g[S + 1] = v & 255),
        (g[S + 2] = v >>> 8),
        E + 16
      );
    }
    function ct(g, E) {
      var v = g.length,
        T = 2 * v > E ? 2 * v : E + 5,
        S = 0;
      if (v >= E) return g;
      if (We) {
        var w = bi(T);
        if (g.copy) g.copy(w);
        else for (; S < g.length; ++S) w[S] = g[S];
        return w;
      } else if (ie) {
        var I = new Uint8Array(T);
        if (I.set) I.set(g);
        else for (; S < v; ++S) I[S] = g[S];
        return I;
      }
      return ((g.length = T), g);
    }
    function xr(g) {
      for (var E = new Array(g), v = 0; v < g; ++v) E[v] = 0;
      return E;
    }
    function ft(g, E, v) {
      var T = 1,
        S = 0,
        w = 0,
        I = 0,
        U = 0,
        R = g.length,
        M = ie ? new Uint16Array(32) : xr(32);
      for (w = 0; w < 32; ++w) M[w] = 0;
      for (w = R; w < v; ++w) g[w] = 0;
      R = g.length;
      var B = ie ? new Uint16Array(R) : xr(R);
      for (w = 0; w < R; ++w) (M[(S = g[w])]++, T < S && (T = S), (B[w] = 0));
      for (M[0] = 0, w = 1; w <= T; ++w) M[w + 16] = U = (U + M[w - 1]) << 1;
      for (w = 0; w < R; ++w) ((U = g[w]), U != 0 && (B[w] = M[U + 16]++));
      var J = 0;
      for (w = 0; w < R; ++w)
        if (((J = g[w]), J != 0))
          for (
            U = Ee(B[w], T) >> (T - J), I = (1 << (T + 4 - J)) - 1;
            I >= 0;
            --I
          )
            E[U | (I << J)] = (J & 15) | (w << 4);
      return T;
    }
    var at = ie ? new Uint16Array(512) : xr(512),
      X = ie ? new Uint16Array(32) : xr(32);
    if (!ie) {
      for (var ge = 0; ge < 512; ++ge) at[ge] = 0;
      for (ge = 0; ge < 32; ++ge) X[ge] = 0;
    }
    (function () {
      for (var g = [], E = 0; E < 32; E++) g.push(5);
      ft(g, X, 32);
      var v = [];
      for (E = 0; E <= 143; E++) v.push(8);
      for (; E <= 255; E++) v.push(9);
      for (; E <= 279; E++) v.push(7);
      for (; E <= 287; E++) v.push(8);
      ft(v, at, 288);
    })();
    var ke = (function () {
      for (
        var E = ie ? new Uint8Array(32768) : [], v = 0, T = 0;
        v < fe.length - 1;
        ++v
      )
        for (; T < fe[v + 1]; ++T) E[T] = v;
      for (; T < 32768; ++T) E[T] = 29;
      var S = ie ? new Uint8Array(259) : [];
      for (v = 0, T = 0; v < z.length - 1; ++v)
        for (; T < z[v + 1]; ++T) S[T] = v;
      function w(U, R) {
        for (var M = 0; M < U.length;) {
          var B = Math.min(65535, U.length - M),
            J = M + B == U.length;
          for (
            R.write_shift(1, +J),
              R.write_shift(2, B),
              R.write_shift(2, ~B & 65535);
            B-- > 0;
          )
            R[R.l++] = U[M++];
        }
        return R.l;
      }
      function I(U, R) {
        for (
          var M = 0, B = 0, J = ie ? new Uint16Array(32768) : [];
          B < U.length;
        ) {
          var ae = Math.min(65535, U.length - B);
          if (ae < 10) {
            for (
              M = Cr(R, M, +(B + ae == U.length)),
                M & 7 && (M += 8 - (M & 7)),
                R.l = (M / 8) | 0,
                R.write_shift(2, ae),
                R.write_shift(2, ~ae & 65535);
              ae-- > 0;
            )
              R[R.l++] = U[B++];
            M = R.l * 8;
            continue;
          }
          M = Cr(R, M, +(B + ae == U.length) + 2);
          for (var ue = 0; ae-- > 0;) {
            var ee = U[B];
            ue = ((ue << 5) ^ ee) & 32767;
            var ce = -1,
              De = 0;
            if (
              (ce = J[ue]) &&
              ((ce |= B & -32768), ce > B && (ce -= 32768), ce < B)
            )
              for (; U[ce + De] == U[B + De] && De < 250;) ++De;
            if (De > 2) {
              ((ee = S[De]),
                ee <= 22
                  ? (M = Jr(R, M, re[ee + 1] >> 1) - 1)
                  : (Jr(R, M, 3),
                    (M += 5),
                    Jr(R, M, re[ee - 23] >> 5),
                    (M += 3)));
              var hr = ee < 8 ? 0 : (ee - 4) >> 2;
              (hr > 0 && (_t(R, M, De - z[ee]), (M += hr)),
                (ee = E[B - ce]),
                (M = Jr(R, M, re[ee] >> 3)),
                (M -= 3));
              var dr = ee < 4 ? 0 : (ee - 2) >> 1;
              dr > 0 && (_t(R, M, B - ce - fe[ee]), (M += dr));
              for (var Ur = 0; Ur < De; ++Ur)
                ((J[ue] = B & 32767), (ue = ((ue << 5) ^ U[B]) & 32767), ++B);
              ae -= De - 1;
            } else
              (ee <= 143 ? (ee = ee + 48) : (M = zr(R, M, 1)),
                (M = Jr(R, M, re[ee])),
                (J[ue] = B & 32767),
                ++B);
          }
          M = Jr(R, M, 0) - 1;
        }
        return ((R.l = ((M + 7) / 8) | 0), R.l);
      }
      return function (R, M) {
        return R.length < 8 ? w(R, M) : I(R, M);
      };
    })();
    function Ue(g) {
      var E = W(50 + Math.floor(g.length * 1.1)),
        v = ke(g, E);
      return E.slice(0, v);
    }
    var be = ie ? new Uint16Array(32768) : xr(32768),
      ve = ie ? new Uint16Array(32768) : xr(32768),
      nr = ie ? new Uint16Array(128) : xr(128),
      L = 1,
      oe = 1;
    function we(g, E) {
      var v = He(g, E) + 257;
      E += 5;
      var T = He(g, E) + 1;
      E += 5;
      var S = ir(g, E) + 4;
      E += 4;
      for (
        var w = 0,
          I = ie ? new Uint8Array(19) : xr(19),
          U = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          R = 1,
          M = ie ? new Uint8Array(8) : xr(8),
          B = ie ? new Uint8Array(8) : xr(8),
          J = I.length,
          ae = 0;
        ae < S;
        ++ae
      )
        ((I[b[ae]] = w = Fe(g, E)), R < w && (R = w), M[w]++, (E += 3));
      var ue = 0;
      for (M[0] = 0, ae = 1; ae <= R; ++ae) B[ae] = ue = (ue + M[ae - 1]) << 1;
      for (ae = 0; ae < J; ++ae) (ue = I[ae]) != 0 && (U[ae] = B[ue]++);
      var ee = 0;
      for (ae = 0; ae < J; ++ae)
        if (((ee = I[ae]), ee != 0)) {
          ue = re[U[ae]] >> (8 - ee);
          for (var ce = (1 << (7 - ee)) - 1; ce >= 0; --ce)
            nr[ue | (ce << ee)] = (ee & 7) | (ae << 3);
        }
      var De = [];
      for (R = 1; De.length < v + T;)
        switch (((ue = nr[se(g, E)]), (E += ue & 7), (ue >>>= 3))) {
          case 16:
            for (w = 3 + qe(g, E), E += 2, ue = De[De.length - 1]; w-- > 0;)
              De.push(ue);
            break;
          case 17:
            for (w = 3 + Fe(g, E), E += 3; w-- > 0;) De.push(0);
            break;
          case 18:
            for (w = 11 + se(g, E), E += 7; w-- > 0;) De.push(0);
            break;
          default:
            (De.push(ue), R < ue && (R = ue));
            break;
        }
      var hr = De.slice(0, v),
        dr = De.slice(v);
      for (ae = v; ae < 286; ++ae) hr[ae] = 0;
      for (ae = T; ae < 30; ++ae) dr[ae] = 0;
      return ((L = ft(hr, be, 286)), (oe = ft(dr, ve, 30)), E);
    }
    function Nr(g, E) {
      if (g[0] == 3 && !(g[1] & 3)) return [Ut(E), 2];
      for (
        var v = 0,
          T = 0,
          S = bi(E || 1 << 18),
          w = 0,
          I = S.length >>> 0,
          U = 0,
          R = 0;
        (T & 1) == 0;
      ) {
        if (((T = Fe(g, v)), (v += 3), T >>> 1))
          T >> 1 == 1
            ? ((U = 9), (R = 5))
            : ((v = we(g, v)), (U = L), (R = oe));
        else {
          v & 7 && (v += 8 - (v & 7));
          var M = g[v >>> 3] | (g[(v >>> 3) + 1] << 8);
          if (((v += 32), M > 0))
            for (
              !E && I < w + M && ((S = ct(S, w + M)), (I = S.length));
              M-- > 0;
            )
              ((S[w++] = g[v >>> 3]), (v += 8));
          continue;
        }
        for (;;) {
          !E && I < w + 32767 && ((S = ct(S, w + 32767)), (I = S.length));
          var B = vr(g, v, U),
            J = T >>> 1 == 1 ? at[B] : be[B];
          if (((v += J & 15), (J >>>= 4), ((J >>> 8) & 255) === 0)) S[w++] = J;
          else {
            if (J == 256) break;
            J -= 257;
            var ae = J < 8 ? 0 : (J - 4) >> 2;
            ae > 5 && (ae = 0);
            var ue = w + z[J];
            (ae > 0 && ((ue += vr(g, v, ae)), (v += ae)),
              (B = vr(g, v, R)),
              (J = T >>> 1 == 1 ? X[B] : ve[B]),
              (v += J & 15),
              (J >>>= 4));
            var ee = J < 4 ? 0 : (J - 2) >> 1,
              ce = fe[J];
            for (
              ee > 0 && ((ce += vr(g, v, ee)), (v += ee)),
                !E && I < ue && ((S = ct(S, ue + 100)), (I = S.length));
              w < ue;
            )
              ((S[w] = S[w - ce]), ++w);
          }
        }
      }
      return E ? [S, (v + 7) >>> 3] : [S.slice(0, w), (v + 7) >>> 3];
    }
    function Me(g, E) {
      var v = g.slice(g.l || 0),
        T = Nr(v, E);
      return ((g.l += T[1]), T[0]);
    }
    function Re(g, E) {
      if (g) typeof console < "u" && console.error(E);
      else throw new Error(E);
    }
    function Je(g, E) {
      var v = g;
      et(v, 0);
      var T = [],
        S = [],
        w = { FileIndex: T, FullPaths: S };
      k(w, { root: E.root });
      for (
        var I = v.length - 4;
        (v[I] != 80 || v[I + 1] != 75 || v[I + 2] != 5 || v[I + 3] != 6) &&
        I >= 0;
      )
        --I;
      ((v.l = I + 4), (v.l += 4));
      var U = v.read_shift(2);
      v.l += 6;
      var R = v.read_shift(4);
      for (v.l = R, I = 0; I < U; ++I) {
        v.l += 20;
        var M = v.read_shift(4),
          B = v.read_shift(4),
          J = v.read_shift(2),
          ae = v.read_shift(2),
          ue = v.read_shift(2);
        v.l += 8;
        var ee = v.read_shift(4),
          ce = o(v.slice(v.l + J, v.l + J + ae));
        v.l += J + ae + ue;
        var De = v.l;
        ((v.l = ee + 4), de(v, M, B, w, ce), (v.l = De));
      }
      return w;
    }
    function de(g, E, v, T, S) {
      g.l += 2;
      var w = g.read_shift(2),
        I = g.read_shift(2),
        U = s(g);
      if (w & 8257) throw new Error("Unsupported ZIP encryption");
      for (
        var R = g.read_shift(4),
          M = g.read_shift(4),
          B = g.read_shift(4),
          J = g.read_shift(2),
          ae = g.read_shift(2),
          ue = "",
          ee = 0;
        ee < J;
        ++ee
      )
        ue += String.fromCharCode(g[g.l++]);
      if (ae) {
        var ce = o(g.slice(g.l, g.l + ae));
        ((ce[21589] || {}).mt && (U = ce[21589].mt),
          ((S || {})[21589] || {}).mt && (U = S[21589].mt));
      }
      g.l += ae;
      var De = g.slice(g.l, g.l + M);
      switch (I) {
        case 8:
          De = O(g, B);
          break;
        case 0:
          break;
        default:
          throw new Error("Unsupported ZIP Compression method " + I);
      }
      var hr = !1;
      (w & 8 &&
        ((R = g.read_shift(4)),
        R == 134695760 && ((R = g.read_shift(4)), (hr = !0)),
        (M = g.read_shift(4)),
        (B = g.read_shift(4))),
        M != E && Re(hr, "Bad compressed size: " + E + " != " + M),
        B != v && Re(hr, "Bad uncompressed size: " + v + " != " + B),
        Fr(T, ue, De, { unsafe: !0, mt: U }));
    }
    function sr(g, E) {
      var v = E || {},
        T = [],
        S = [],
        w = W(1),
        I = v.compression ? 8 : 0,
        U = 0,
        R = 0,
        M = 0,
        B = 0,
        J = 0,
        ae = g.FullPaths[0],
        ue = ae,
        ee = g.FileIndex[0],
        ce = [],
        De = 0;
      for (R = 1; R < g.FullPaths.length; ++R)
        if (
          ((ue = g.FullPaths[R].slice(ae.length)),
          (ee = g.FileIndex[R]),
          !(!ee.size || !ee.content || ue == "Sh33tJ5"))
        ) {
          var hr = B,
            dr = W(ue.length);
          for (M = 0; M < ue.length; ++M)
            dr.write_shift(1, ue.charCodeAt(M) & 127);
          ((dr = dr.slice(0, dr.l)), (ce[J] = Tl.buf(ee.content, 0)));
          var Ur = ee.content;
          (I == 8 && (Ur = D(Ur)),
            (w = W(30)),
            w.write_shift(4, 67324752),
            w.write_shift(2, 20),
            w.write_shift(2, U),
            w.write_shift(2, I),
            ee.mt ? i(w, ee.mt) : w.write_shift(4, 0),
            w.write_shift(-4, ce[J]),
            w.write_shift(4, Ur.length),
            w.write_shift(4, ee.content.length),
            w.write_shift(2, dr.length),
            w.write_shift(2, 0),
            (B += w.length),
            T.push(w),
            (B += dr.length),
            T.push(dr),
            (B += Ur.length),
            T.push(Ur),
            (w = W(46)),
            w.write_shift(4, 33639248),
            w.write_shift(2, 0),
            w.write_shift(2, 20),
            w.write_shift(2, U),
            w.write_shift(2, I),
            w.write_shift(4, 0),
            w.write_shift(-4, ce[J]),
            w.write_shift(4, Ur.length),
            w.write_shift(4, ee.content.length),
            w.write_shift(2, dr.length),
            w.write_shift(2, 0),
            w.write_shift(2, 0),
            w.write_shift(2, 0),
            w.write_shift(2, 0),
            w.write_shift(4, 0),
            w.write_shift(4, hr),
            (De += w.l),
            S.push(w),
            (De += dr.length),
            S.push(dr),
            ++J);
        }
      return (
        (w = W(22)),
        w.write_shift(4, 101010256),
        w.write_shift(2, 0),
        w.write_shift(2, 0),
        w.write_shift(2, J),
        w.write_shift(2, J),
        w.write_shift(4, De),
        w.write_shift(4, B),
        w.write_shift(2, 0),
        Lr([Lr(T), Lr(S), w])
      );
    }
    var wr = {
      htm: "text/html",
      xml: "text/xml",
      gif: "image/gif",
      jpg: "image/jpeg",
      png: "image/png",
      mso: "application/x-mso",
      thmx: "application/vnd.ms-officetheme",
      sh33tj5: "application/octet-stream",
    };
    function Pr(g, E) {
      if (g.ctype) return g.ctype;
      var v = g.name || "",
        T = v.match(/\.([^\.]+)$/);
      return (T && wr[T[1]]) ||
        (E && ((T = (v = E).match(/[\.\\]([^\.\\])+$/)), T && wr[T[1]]))
        ? wr[T[1]]
        : "application/octet-stream";
    }
    function Ar(g) {
      for (var E = Rn(g), v = [], T = 0; T < E.length; T += 76)
        v.push(E.slice(T, T + 76));
      return (
        v.join(`\r
`) +
        `\r
`
      );
    }
    function Ge(g) {
      var E = g.replace(
        /[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g,
        function (M) {
          var B = M.charCodeAt(0).toString(16).toUpperCase();
          return "=" + (B.length == 1 ? "0" + B : B);
        },
      );
      ((E = E.replace(/ $/gm, "=20").replace(/\t$/gm, "=09")),
        E.charAt(0) ==
          `
` && (E = "=0D" + E.slice(1)),
        (E = E.replace(/\r(?!\n)/gm, "=0D")
          .replace(
            /\n\n/gm,
            `
=0A`,
          )
          .replace(/([^\r\n])\n/gm, "$1=0A")));
      for (
        var v = [],
          T = E.split(`\r
`),
          S = 0;
        S < T.length;
        ++S
      ) {
        var w = T[S];
        if (w.length == 0) {
          v.push("");
          continue;
        }
        for (var I = 0; I < w.length;) {
          var U = 76,
            R = w.slice(I, I + U);
          (R.charAt(U - 1) == "="
            ? U--
            : R.charAt(U - 2) == "="
              ? (U -= 2)
              : R.charAt(U - 3) == "=" && (U -= 3),
            (R = w.slice(I, I + U)),
            (I += U),
            I < w.length && (R += "="),
            v.push(R));
        }
      }
      return v.join(`\r
`);
    }
    function cr(g) {
      for (var E = [], v = 0; v < g.length; ++v) {
        for (var T = g[v]; v <= g.length && T.charAt(T.length - 1) == "=";)
          T = T.slice(0, T.length - 1) + g[++v];
        E.push(T);
      }
      for (var S = 0; S < E.length; ++S)
        E[S] = E[S].replace(/[=][0-9A-Fa-f]{2}/g, function (w) {
          return String.fromCharCode(parseInt(w.slice(1), 16));
        });
      return dt(
        E.join(`\r
`),
      );
    }
    function Ae(g, E, v) {
      for (var T = "", S = "", w = "", I, U = 0; U < 10; ++U) {
        var R = E[U];
        if (!R || R.match(/^\s*$/)) break;
        var M = R.match(/^(.*?):\s*([^\s].*)$/);
        if (M)
          switch (M[1].toLowerCase()) {
            case "content-location":
              T = M[2].trim();
              break;
            case "content-type":
              w = M[2].trim();
              break;
            case "content-transfer-encoding":
              S = M[2].trim();
              break;
          }
      }
      switch ((++U, S.toLowerCase())) {
        case "base64":
          I = dt(Ct(E.slice(U).join("")));
          break;
        case "quoted-printable":
          I = cr(E.slice(U));
          break;
        default:
          throw new Error("Unsupported Content-Transfer-Encoding " + S);
      }
      var B = Fr(g, T.slice(v.length), I, { unsafe: !0 });
      w && (B.ctype = w);
    }
    function tr(g, E) {
      if (Be(g.slice(0, 13)).toLowerCase() != "mime-version:")
        throw new Error("Unsupported MAD header");
      var v = (E && E.root) || "",
        T = (We && Buffer.isBuffer(g) ? g.toString("binary") : Be(g)).split(`\r
`),
        S = 0,
        w = "";
      for (S = 0; S < T.length; ++S)
        if (
          ((w = T[S]),
          !!/^Content-Location:/i.test(w) &&
            ((w = w.slice(w.indexOf("file"))),
            v || (v = w.slice(0, w.lastIndexOf("/") + 1)),
            w.slice(0, v.length) != v))
        )
          for (
            ;
            v.length > 0 &&
            ((v = v.slice(0, v.length - 1)),
            (v = v.slice(0, v.lastIndexOf("/") + 1)),
            w.slice(0, v.length) != v);
          );
      var I = (T[1] || "").match(/boundary="(.*?)"/);
      if (!I) throw new Error("MAD cannot find boundary");
      var U = "--" + (I[1] || ""),
        R = [],
        M = [],
        B = { FileIndex: R, FullPaths: M };
      k(B);
      var J,
        ae = 0;
      for (S = 0; S < T.length; ++S) {
        var ue = T[S];
        (ue !== U && ue !== U + "--") ||
          (ae++ && Ae(B, T.slice(J, S), v), (J = S));
      }
      return B;
    }
    function ur(g, E) {
      var v = E || {},
        T = v.boundary || "SheetJS";
      T = "------=" + T;
      for (
        var S = [
            "MIME-Version: 1.0",
            'Content-Type: multipart/related; boundary="' + T.slice(2) + '"',
            "",
            "",
            "",
          ],
          w = g.FullPaths[0],
          I = w,
          U = g.FileIndex[0],
          R = 1;
        R < g.FullPaths.length;
        ++R
      )
        if (
          ((I = g.FullPaths[R].slice(w.length)),
          (U = g.FileIndex[R]),
          !(!U.size || !U.content || I == "Sh33tJ5"))
        ) {
          I = I.replace(
            /[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g,
            function (De) {
              return "_x" + De.charCodeAt(0).toString(16) + "_";
            },
          ).replace(/[\u0080-\uFFFF]/g, function (De) {
            return "_u" + De.charCodeAt(0).toString(16) + "_";
          });
          for (
            var M = U.content,
              B = We && Buffer.isBuffer(M) ? M.toString("binary") : Be(M),
              J = 0,
              ae = Math.min(1024, B.length),
              ue = 0,
              ee = 0;
            ee <= ae;
            ++ee
          )
            (ue = B.charCodeAt(ee)) >= 32 && ue < 128 && ++J;
          var ce = J >= (ae * 4) / 5;
          (S.push(T),
            S.push(
              "Content-Location: " + (v.root || "file:///C:/SheetJS/") + I,
            ),
            S.push(
              "Content-Transfer-Encoding: " +
                (ce ? "quoted-printable" : "base64"),
            ),
            S.push("Content-Type: " + Pr(U, I)),
            S.push(""),
            S.push(ce ? Ge(B) : Ar(B)));
        }
      return (
        S.push(
          T +
            `--\r
`,
        ),
        S.join(`\r
`)
      );
    }
    function pr(g) {
      var E = {};
      return (k(E, g), E);
    }
    function Fr(g, E, v, T) {
      var S = T && T.unsafe;
      S || k(g);
      var w = !S && rr.find(g, E);
      if (!w) {
        var I = g.FullPaths[0];
        (E.slice(0, I.length) == I
          ? (I = E)
          : (I.slice(-1) != "/" && (I += "/"),
            (I = (I + E).replace("//", "/"))),
          (w = { name: a(E), type: 2 }),
          g.FileIndex.push(w),
          g.FullPaths.push(I),
          S || rr.utils.cfb_gc(g));
      }
      return (
        (w.content = v),
        (w.size = v ? v.length : 0),
        T &&
          (T.CLSID && (w.clsid = T.CLSID),
          T.mt && (w.mt = T.mt),
          T.ct && (w.ct = T.ct)),
        w
      );
    }
    function _r(g, E) {
      k(g);
      var v = rr.find(g, E);
      if (v) {
        for (var T = 0; T < g.FileIndex.length; ++T)
          if (g.FileIndex[T] == v)
            return (g.FileIndex.splice(T, 1), g.FullPaths.splice(T, 1), !0);
      }
      return !1;
    }
    function Hr(g, E, v) {
      k(g);
      var T = rr.find(g, E);
      if (T) {
        for (var S = 0; S < g.FileIndex.length; ++S)
          if (g.FileIndex[S] == T)
            return ((g.FileIndex[S].name = a(v)), (g.FullPaths[S] = v), !0);
      }
      return !1;
    }
    function Qr(g) {
      N(g, !0);
    }
    return (
      (t.find = H),
      (t.read = Q),
      (t.parse = f),
      (t.write = Ie),
      (t.writeFile = ye),
      (t.utils = {
        cfb_new: pr,
        cfb_add: Fr,
        cfb_del: _r,
        cfb_mov: Hr,
        cfb_gc: Qr,
        ReadShift: An,
        CheckField: c0,
        prep_blob: et,
        bconcat: Lr,
        use_zlib: A,
        _deflateRaw: Ue,
        _inflateRaw: Me,
        consts: _e,
      }),
      t
    );
  })();
function El(e) {
  return typeof e == "string" ? ya(e) : Array.isArray(e) ? zo(e) : e;
}
function Hn(e, t, r) {
  if (typeof Deno < "u") {
    if (r && typeof t == "string")
      switch (r) {
        case "utf8":
          t = new TextEncoder(r).encode(t);
          break;
        case "binary":
          t = ya(t);
          break;
        default:
          throw new Error("Unsupported encoding " + r);
      }
    return Deno.writeFileSync(e, t);
  }
  var n = r == "utf8" ? Ln(t) : t;
  if (typeof IE_SaveFile < "u") return IE_SaveFile(n, e);
  if (typeof Blob < "u") {
    var a = new Blob([El(n)], { type: "application/octet-stream" });
    if (typeof navigator < "u" && navigator.msSaveBlob)
      return navigator.msSaveBlob(a, e);
    if (typeof saveAs < "u") return saveAs(a, e);
    if (
      typeof URL < "u" &&
      typeof document < "u" &&
      document.createElement &&
      URL.createObjectURL
    ) {
      var i = URL.createObjectURL(a);
      if (
        typeof chrome == "object" &&
        typeof (chrome.downloads || {}).download == "function"
      )
        return (
          URL.revokeObjectURL &&
            typeof setTimeout < "u" &&
            setTimeout(function () {
              URL.revokeObjectURL(i);
            }, 6e4),
          chrome.downloads.download({ url: i, filename: e, saveAs: !0 })
        );
      var s = document.createElement("a");
      if (s.download != null)
        return (
          (s.download = e),
          (s.href = i),
          document.body.appendChild(s),
          s.click(),
          document.body.removeChild(s),
          URL.revokeObjectURL &&
            typeof setTimeout < "u" &&
            setTimeout(function () {
              URL.revokeObjectURL(i);
            }, 6e4),
          i
        );
    }
  }
  if (typeof $ < "u" && typeof File < "u" && typeof Folder < "u")
    try {
      var o = File(e);
      return (
        o.open("w"),
        (o.encoding = "binary"),
        Array.isArray(t) && (t = Vn(t)),
        o.write(t),
        o.close(),
        t
      );
    } catch (c) {
      if (!c.message || !c.message.match(/onstruct/)) throw c;
    }
  throw new Error("cannot save file " + e);
}
function jr(e) {
  for (var t = Object.keys(e), r = [], n = 0; n < t.length; ++n)
    Object.prototype.hasOwnProperty.call(e, t[n]) && r.push(t[n]);
  return r;
}
function Li(e, t) {
  for (var r = [], n = jr(e), a = 0; a !== n.length; ++a)
    r[e[n[a]][t]] == null && (r[e[n[a]][t]] = n[a]);
  return r;
}
function ni(e) {
  for (var t = [], r = jr(e), n = 0; n !== r.length; ++n) t[e[r[n]]] = r[n];
  return t;
}
function ba(e) {
  for (var t = [], r = jr(e), n = 0; n !== r.length; ++n)
    t[e[r[n]]] = parseInt(r[n], 10);
  return t;
}
function Sl(e) {
  for (var t = [], r = jr(e), n = 0; n !== r.length; ++n)
    (t[e[r[n]]] == null && (t[e[r[n]]] = []), t[e[r[n]]].push(r[n]));
  return t;
}
var fa = new Date(1899, 11, 30, 0, 0, 0);
function Kr(e, t) {
  var r = e.getTime(),
    n = fa.getTime() + (e.getTimezoneOffset() - fa.getTimezoneOffset()) * 6e4;
  return (r - n) / (24 * 60 * 60 * 1e3);
}
var Ys = new Date(),
  wl = fa.getTime() + (Ys.getTimezoneOffset() - fa.getTimezoneOffset()) * 6e4,
  Mi = Ys.getTimezoneOffset();
function zs(e) {
  var t = new Date();
  return (
    t.setTime(e * 24 * 60 * 60 * 1e3 + wl),
    t.getTimezoneOffset() !== Mi &&
      t.setTime(t.getTime() + (t.getTimezoneOffset() - Mi) * 6e4),
    t
  );
}
var Bi = new Date("2017-02-19T19:06:09.000Z"),
  Xs = isNaN(Bi.getFullYear()) ? new Date("2/19/17") : Bi,
  Al = Xs.getFullYear() == 2017;
function Yr(e, t) {
  var r = new Date(e);
  if (Al)
    return (
      t > 0
        ? r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3)
        : t < 0 && r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3),
      r
    );
  if (e instanceof Date) return e;
  if (Xs.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
    var n = r.getFullYear();
    return (e.indexOf("" + n) > -1 || r.setFullYear(r.getFullYear() + 100), r);
  }
  var a = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"],
    i = new Date(+a[0], +a[1] - 1, +a[2], +a[3] || 0, +a[4] || 0, +a[5] || 0);
  return (
    e.indexOf("Z") > -1 &&
      (i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3)),
    i
  );
}
function ka(e, t) {
  if (We && Buffer.isBuffer(e)) return e.toString("binary");
  if (typeof TextDecoder < "u")
    try {
      var r = {
        "€": "",
        "‚": "",
        ƒ: "",
        "„": "",
        "…": "",
        "†": "",
        "‡": "",
        ˆ: "",
        "‰": "",
        Š: "",
        "‹": "",
        Œ: "",
        Ž: "",
        "‘": "",
        "’": "",
        "“": "",
        "”": "",
        "•": "",
        "–": "",
        "—": "",
        "˜": "",
        "™": "",
        š: "",
        "›": "",
        œ: "",
        ž: "",
        Ÿ: "",
      };
      return (
        Array.isArray(e) && (e = new Uint8Array(e)),
        new TextDecoder("latin1")
          .decode(e)
          .replace(/[€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ]/g, function (i) {
            return r[i] || i;
          })
      );
    } catch {}
  for (var n = [], a = 0; a != e.length; ++a) n.push(String.fromCharCode(e[a]));
  return n.join("");
}
function qr(e) {
  if (typeof JSON < "u" && !Array.isArray(e))
    return JSON.parse(JSON.stringify(e));
  if (typeof e != "object" || e == null) return e;
  if (e instanceof Date) return new Date(e.getTime());
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (t[r] = qr(e[r]));
  return t;
}
function mr(e, t) {
  for (var r = ""; r.length < t;) r += e;
  return r;
}
function At(e) {
  var t = Number(e);
  if (!isNaN(t)) return isFinite(t) ? t : NaN;
  if (!/\d/.test(e)) return t;
  var r = 1,
    n = e
      .replace(/([\d]),([\d])/g, "$1$2")
      .replace(/[$]/g, "")
      .replace(/[%]/g, function () {
        return ((r *= 100), "");
      });
  return !isNaN((t = Number(n))) ||
    ((n = n.replace(/[(](.*)[)]/, function (a, i) {
      return ((r = -r), i);
    })),
    !isNaN((t = Number(n))))
    ? t / r
    : t;
}
var yl = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
function In(e) {
  var t = new Date(e),
    r = new Date(NaN),
    n = t.getYear(),
    a = t.getMonth(),
    i = t.getDate();
  if (isNaN(i)) return r;
  var s = e.toLowerCase();
  if (s.match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/)) {
    if (
      ((s = s.replace(/[^a-z]/g, "").replace(/([^a-z]|^)[ap]m?([^a-z]|$)/, "")),
      s.length > 3 && yl.indexOf(s) == -1)
    )
      return r;
  } else if (s.match(/[a-z]/)) return r;
  return n < 0 || n > 8099
    ? r
    : (a > 0 || i > 1) && n != 101
      ? t
      : e.match(/[^-0-9:,\/\\]/)
        ? r
        : t;
}
function Ne(e, t, r) {
  if (e.FullPaths) {
    if (typeof r == "string") {
      var n;
      return (We ? (n = bt(r)) : (n = Xo(r)), rr.utils.cfb_add(e, t, n));
    }
    rr.utils.cfb_add(e, t, r);
  } else e.file(t, r);
}
function ai() {
  return rr.utils.cfb_new();
}
var Sr = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r
`,
  Cl = { "&quot;": '"', "&apos;": "'", "&gt;": ">", "&lt;": "<", "&amp;": "&" },
  ii = ni(Cl),
  si = /[&<>'"]/g,
  Fl = /[\u0000-\u0008\u000b-\u001f]/g;
function Xe(e) {
  var t = e + "";
  return t
    .replace(si, function (r) {
      return ii[r];
    })
    .replace(Fl, function (r) {
      return "_x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + "_";
    });
}
function ji(e) {
  return Xe(e).replace(/ /g, "_x0020_");
}
var Ks = /[\u0000-\u001f]/g;
function bl(e) {
  var t = e + "";
  return t
    .replace(si, function (r) {
      return ii[r];
    })
    .replace(/\n/g, "<br/>")
    .replace(Ks, function (r) {
      return "&#x" + ("000" + r.charCodeAt(0).toString(16)).slice(-4) + ";";
    });
}
function kl(e) {
  var t = e + "";
  return t
    .replace(si, function (r) {
      return ii[r];
    })
    .replace(Ks, function (r) {
      return "&#x" + r.charCodeAt(0).toString(16).toUpperCase() + ";";
    });
}
function Dl(e) {
  return e.replace(/(\r\n|[\r\n])/g, "&#10;");
}
function Nl(e) {
  switch (e) {
    case 1:
    case !0:
    case "1":
    case "true":
    case "TRUE":
      return !0;
    default:
      return !1;
  }
}
function La(e) {
  for (var t = "", r = 0, n = 0, a = 0, i = 0, s = 0, o = 0; r < e.length;) {
    if (((n = e.charCodeAt(r++)), n < 128)) {
      t += String.fromCharCode(n);
      continue;
    }
    if (((a = e.charCodeAt(r++)), n > 191 && n < 224)) {
      ((s = (n & 31) << 6), (s |= a & 63), (t += String.fromCharCode(s)));
      continue;
    }
    if (((i = e.charCodeAt(r++)), n < 240)) {
      t += String.fromCharCode(((n & 15) << 12) | ((a & 63) << 6) | (i & 63));
      continue;
    }
    ((s = e.charCodeAt(r++)),
      (o =
        (((n & 7) << 18) | ((a & 63) << 12) | ((i & 63) << 6) | (s & 63)) -
        65536),
      (t += String.fromCharCode(55296 + ((o >>> 10) & 1023))),
      (t += String.fromCharCode(56320 + (o & 1023))));
  }
  return t;
}
function Ui(e) {
  var t = Ut(2 * e.length),
    r,
    n,
    a = 1,
    i = 0,
    s = 0,
    o;
  for (n = 0; n < e.length; n += a)
    ((a = 1),
      (o = e.charCodeAt(n)) < 128
        ? (r = o)
        : o < 224
          ? ((r = (o & 31) * 64 + (e.charCodeAt(n + 1) & 63)), (a = 2))
          : o < 240
            ? ((r =
                (o & 15) * 4096 +
                (e.charCodeAt(n + 1) & 63) * 64 +
                (e.charCodeAt(n + 2) & 63)),
              (a = 3))
            : ((a = 4),
              (r =
                (o & 7) * 262144 +
                (e.charCodeAt(n + 1) & 63) * 4096 +
                (e.charCodeAt(n + 2) & 63) * 64 +
                (e.charCodeAt(n + 3) & 63)),
              (r -= 65536),
              (s = 55296 + ((r >>> 10) & 1023)),
              (r = 56320 + (r & 1023))),
      s !== 0 && ((t[i++] = s & 255), (t[i++] = s >>> 8), (s = 0)),
      (t[i++] = r % 256),
      (t[i++] = r >>> 8));
  return t.slice(0, i).toString("ucs2");
}
function Wi(e) {
  return bt(e, "binary").toString("utf8");
}
var Jn = "foo bar bazâð£",
  wn = (We && ((Wi(Jn) == La(Jn) && Wi) || (Ui(Jn) == La(Jn) && Ui))) || La,
  Ln = We
    ? function (e) {
        return bt(e, "utf8").toString("binary");
      }
    : function (e) {
        for (var t = [], r = 0, n = 0, a = 0; r < e.length;)
          switch (((n = e.charCodeAt(r++)), !0)) {
            case n < 128:
              t.push(String.fromCharCode(n));
              break;
            case n < 2048:
              (t.push(String.fromCharCode(192 + (n >> 6))),
                t.push(String.fromCharCode(128 + (n & 63))));
              break;
            case n >= 55296 && n < 57344:
              ((n -= 55296),
                (a = e.charCodeAt(r++) - 56320 + (n << 10)),
                t.push(String.fromCharCode(240 + ((a >> 18) & 7))),
                t.push(String.fromCharCode(144 + ((a >> 12) & 63))),
                t.push(String.fromCharCode(128 + ((a >> 6) & 63))),
                t.push(String.fromCharCode(128 + (a & 63))));
              break;
            default:
              (t.push(String.fromCharCode(224 + (n >> 12))),
                t.push(String.fromCharCode(128 + ((n >> 6) & 63))),
                t.push(String.fromCharCode(128 + (n & 63))));
          }
        return t.join("");
      },
  Pl = (function () {
    var e = [
      ["nbsp", " "],
      ["middot", "·"],
      ["quot", '"'],
      ["apos", "'"],
      ["gt", ">"],
      ["lt", "<"],
      ["amp", "&"],
    ].map(function (t) {
      return [new RegExp("&" + t[0] + ";", "ig"), t[1]];
    });
    return function (r) {
      for (
        var n = r
            .replace(/^[\t\n\r ]+/, "")
            .replace(/[\t\n\r ]+$/, "")
            .replace(/>\s+/g, ">")
            .replace(/\s+</g, "<")
            .replace(/[\t\n\r ]+/g, " ")
            .replace(
              /<\s*[bB][rR]\s*\/?>/g,
              `
`,
            )
            .replace(/<[^>]*>/g, ""),
          a = 0;
        a < e.length;
        ++a
      )
        n = n.replace(e[a][0], e[a][1]);
      return n;
    };
  })(),
  qs = /(^\s|\s$|\n)/;
function Mr(e, t) {
  return (
    "<" +
    e +
    (t.match(qs) ? ' xml:space="preserve"' : "") +
    ">" +
    t +
    "</" +
    e +
    ">"
  );
}
function Mn(e) {
  return jr(e)
    .map(function (t) {
      return " " + t + '="' + e[t] + '"';
    })
    .join("");
}
function te(e, t, r) {
  return (
    "<" +
    e +
    (r != null ? Mn(r) : "") +
    (t != null
      ? (t.match(qs) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e
      : "/") +
    ">"
  );
}
function Xa(e, t) {
  try {
    return e.toISOString().replace(/\.\d*/, "");
  } catch (r) {
    if (t) throw r;
  }
  return "";
}
function Ol(e, t) {
  switch (typeof e) {
    case "string":
      var r = te("vt:lpwstr", Xe(e));
      return ((r = r.replace(/&quot;/g, "_x0022_")), r);
    case "number":
      return te((e | 0) == e ? "vt:i4" : "vt:r8", Xe(String(e)));
    case "boolean":
      return te("vt:bool", e ? "true" : "false");
  }
  if (e instanceof Date) return te("vt:filetime", Xa(e));
  throw new Error("Unable to serialize " + e);
}
var br = {
    CORE_PROPS:
      "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
    CUST_PROPS:
      "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
    EXT_PROPS:
      "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
    CT: "http://schemas.openxmlformats.org/package/2006/content-types",
    RELS: "http://schemas.openxmlformats.org/package/2006/relationships",
    TCMNT:
      "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments",
    dc: "http://purl.org/dc/elements/1.1/",
    dcterms: "http://purl.org/dc/terms/",
    dcmitype: "http://purl.org/dc/dcmitype/",
    r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
    xsi: "http://www.w3.org/2001/XMLSchema-instance",
    xsd: "http://www.w3.org/2001/XMLSchema",
  },
  cn = [
    "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "http://purl.oclc.org/ooxml/spreadsheetml/main",
    "http://schemas.microsoft.com/office/excel/2006/main",
    "http://schemas.microsoft.com/office/excel/2006/2",
  ],
  rt = {
    o: "urn:schemas-microsoft-com:office:office",
    x: "urn:schemas-microsoft-com:office:excel",
    ss: "urn:schemas-microsoft-com:office:spreadsheet",
    dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
    mv: "http://macVmlSchemaUri",
    v: "urn:schemas-microsoft-com:vml",
    html: "http://www.w3.org/TR/REC-html40",
  };
function Rl(e, t) {
  for (
    var r = 1 - 2 * (e[t + 7] >>> 7),
      n = ((e[t + 7] & 127) << 4) + ((e[t + 6] >>> 4) & 15),
      a = e[t + 6] & 15,
      i = 5;
    i >= 0;
    --i
  )
    a = a * 256 + e[t + i];
  return n == 2047
    ? a == 0
      ? r * (1 / 0)
      : NaN
    : (n == 0 ? (n = -1022) : ((n -= 1023), (a += Math.pow(2, 52))),
      r * Math.pow(2, n - 52) * a);
}
function Il(e, t, r) {
  var n = (t < 0 || 1 / t == -1 / 0 ? 1 : 0) << 7,
    a = 0,
    i = 0,
    s = n ? -t : t;
  isFinite(s)
    ? s == 0
      ? (a = i = 0)
      : ((a = Math.floor(Math.log(s) / Math.LN2)),
        (i = s * Math.pow(2, 52 - a)),
        a <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))
          ? (a = -1022)
          : ((i -= Math.pow(2, 52)), (a += 1023)))
    : ((a = 2047), (i = isNaN(t) ? 26985 : 0));
  for (var o = 0; o <= 5; ++o, i /= 256) e[r + o] = i & 255;
  ((e[r + 6] = ((a & 15) << 4) | (i & 15)), (e[r + 7] = (a >> 4) | n));
}
var Vi = function (e) {
    for (var t = [], r = 10240, n = 0; n < e[0].length; ++n)
      if (e[0][n])
        for (var a = 0, i = e[0][n].length; a < i; a += r)
          t.push.apply(t, e[0][n].slice(a, a + r));
    return t;
  },
  Hi = We
    ? function (e) {
        return e[0].length > 0 && Buffer.isBuffer(e[0][0])
          ? Buffer.concat(
              e[0].map(function (t) {
                return Buffer.isBuffer(t) ? t : bt(t);
              }),
            )
          : Vi(e);
      }
    : Vi,
  Gi = function (e, t, r) {
    for (var n = [], a = t; a < r; a += 2)
      n.push(String.fromCharCode(_n(e, a)));
    return n.join("").replace(Sn, "");
  },
  oi = We
    ? function (e, t, r) {
        return Buffer.isBuffer(e)
          ? e.toString("utf16le", t, r).replace(Sn, "")
          : Gi(e, t, r);
      }
    : Gi,
  $i = function (e, t, r) {
    for (var n = [], a = t; a < t + r; ++a)
      n.push(("0" + e[a].toString(16)).slice(-2));
    return n.join("");
  },
  Js = We
    ? function (e, t, r) {
        return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : $i(e, t, r);
      }
    : $i,
  Yi = function (e, t, r) {
    for (var n = [], a = t; a < r; a++) n.push(String.fromCharCode(Qt(e, a)));
    return n.join("");
  },
  Gn = We
    ? function (t, r, n) {
        return Buffer.isBuffer(t) ? t.toString("utf8", r, n) : Yi(t, r, n);
      }
    : Yi,
  Qs = function (e, t) {
    var r = tt(e, t);
    return r > 0 ? Gn(e, t + 4, t + 4 + r - 1) : "";
  },
  Zs = Qs,
  e0 = function (e, t) {
    var r = tt(e, t);
    return r > 0 ? Gn(e, t + 4, t + 4 + r - 1) : "";
  },
  r0 = e0,
  t0 = function (e, t) {
    var r = 2 * tt(e, t);
    return r > 0 ? Gn(e, t + 4, t + 4 + r - 1) : "";
  },
  n0 = t0,
  a0 = function (t, r) {
    var n = tt(t, r);
    return n > 0 ? oi(t, r + 4, r + 4 + n) : "";
  },
  i0 = a0,
  s0 = function (e, t) {
    var r = tt(e, t);
    return r > 0 ? Gn(e, t + 4, t + 4 + r) : "";
  },
  o0 = s0,
  l0 = function (e, t) {
    return Rl(e, t);
  },
  ua = l0,
  li = function (t) {
    return (
      Array.isArray(t) || (typeof Uint8Array < "u" && t instanceof Uint8Array)
    );
  };
We &&
  ((Zs = function (t, r) {
    if (!Buffer.isBuffer(t)) return Qs(t, r);
    var n = t.readUInt32LE(r);
    return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
  }),
  (r0 = function (t, r) {
    if (!Buffer.isBuffer(t)) return e0(t, r);
    var n = t.readUInt32LE(r);
    return n > 0 ? t.toString("utf8", r + 4, r + 4 + n - 1) : "";
  }),
  (n0 = function (t, r) {
    if (!Buffer.isBuffer(t)) return t0(t, r);
    var n = 2 * t.readUInt32LE(r);
    return t.toString("utf16le", r + 4, r + 4 + n - 1);
  }),
  (i0 = function (t, r) {
    if (!Buffer.isBuffer(t)) return a0(t, r);
    var n = t.readUInt32LE(r);
    return t.toString("utf16le", r + 4, r + 4 + n);
  }),
  (o0 = function (t, r) {
    if (!Buffer.isBuffer(t)) return s0(t, r);
    var n = t.readUInt32LE(r);
    return t.toString("utf8", r + 4, r + 4 + n);
  }),
  (ua = function (t, r) {
    return Buffer.isBuffer(t) ? t.readDoubleLE(r) : l0(t, r);
  }),
  (li = function (t) {
    return (
      Buffer.isBuffer(t) ||
      Array.isArray(t) ||
      (typeof Uint8Array < "u" && t instanceof Uint8Array)
    );
  }));
var Qt = function (e, t) {
    return e[t];
  },
  _n = function (e, t) {
    return e[t + 1] * 256 + e[t];
  },
  Ll = function (e, t) {
    var r = e[t + 1] * 256 + e[t];
    return r < 32768 ? r : (65535 - r + 1) * -1;
  },
  tt = function (e, t) {
    return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t];
  },
  Bt = function (e, t) {
    return (e[t + 3] << 24) | (e[t + 2] << 16) | (e[t + 1] << 8) | e[t];
  },
  Ml = function (e, t) {
    return (e[t] << 24) | (e[t + 1] << 16) | (e[t + 2] << 8) | e[t + 3];
  };
function An(e, t) {
  var r = "",
    n,
    a,
    i = [],
    s,
    o,
    c,
    l;
  switch (t) {
    case "dbcs":
      if (((l = this.l), We && Buffer.isBuffer(this)))
        r = this.slice(this.l, this.l + 2 * e).toString("utf16le");
      else
        for (c = 0; c < e; ++c)
          ((r += String.fromCharCode(_n(this, l))), (l += 2));
      e *= 2;
      break;
    case "utf8":
      r = Gn(this, this.l, this.l + e);
      break;
    case "utf16le":
      ((e *= 2), (r = oi(this, this.l, this.l + e)));
      break;
    case "wstr":
      return An.call(this, e, "dbcs");
    case "lpstr-ansi":
      ((r = Zs(this, this.l)), (e = 4 + tt(this, this.l)));
      break;
    case "lpstr-cp":
      ((r = r0(this, this.l)), (e = 4 + tt(this, this.l)));
      break;
    case "lpwstr":
      ((r = n0(this, this.l)), (e = 4 + 2 * tt(this, this.l)));
      break;
    case "lpp4":
      ((e = 4 + tt(this, this.l)), (r = i0(this, this.l)), e & 2 && (e += 2));
      break;
    case "8lpp4":
      ((e = 4 + tt(this, this.l)),
        (r = o0(this, this.l)),
        e & 3 && (e += 4 - (e & 3)));
      break;
    case "cstr":
      for (e = 0, r = ""; (s = Qt(this, this.l + e++)) !== 0;) i.push(Xn(s));
      r = i.join("");
      break;
    case "_wstr":
      for (e = 0, r = ""; (s = _n(this, this.l + e)) !== 0;)
        (i.push(Xn(s)), (e += 2));
      ((e += 2), (r = i.join("")));
      break;
    case "dbcs-cont":
      for (r = "", l = this.l, c = 0; c < e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return (
            (s = Qt(this, l)),
            (this.l = l + 1),
            (o = An.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont")),
            i.join("") + o
          );
        (i.push(Xn(_n(this, l))), (l += 2));
      }
      ((r = i.join("")), (e *= 2));
      break;
    case "cpstr":
    case "sbcs-cont":
      for (r = "", l = this.l, c = 0; c != e; ++c) {
        if (this.lens && this.lens.indexOf(l) !== -1)
          return (
            (s = Qt(this, l)),
            (this.l = l + 1),
            (o = An.call(this, e - c, s ? "dbcs-cont" : "sbcs-cont")),
            i.join("") + o
          );
        (i.push(Xn(Qt(this, l))), (l += 1));
      }
      r = i.join("");
      break;
    default:
      switch (e) {
        case 1:
          return ((n = Qt(this, this.l)), this.l++, n);
        case 2:
          return ((n = (t === "i" ? Ll : _n)(this, this.l)), (this.l += 2), n);
        case 4:
        case -4:
          return t === "i" || (this[this.l + 3] & 128) === 0
            ? ((n = (e > 0 ? Bt : Ml)(this, this.l)), (this.l += 4), n)
            : ((a = tt(this, this.l)), (this.l += 4), a);
        case 8:
        case -8:
          if (t === "f")
            return (
              e == 8
                ? (a = ua(this, this.l))
                : (a = ua(
                    [
                      this[this.l + 7],
                      this[this.l + 6],
                      this[this.l + 5],
                      this[this.l + 4],
                      this[this.l + 3],
                      this[this.l + 2],
                      this[this.l + 1],
                      this[this.l + 0],
                    ],
                    0,
                  )),
              (this.l += 8),
              a
            );
          e = 8;
        case 16:
          r = Js(this, this.l, e);
          break;
      }
  }
  return ((this.l += e), r);
}
var Bl = function (e, t, r) {
    ((e[r] = t & 255),
      (e[r + 1] = (t >>> 8) & 255),
      (e[r + 2] = (t >>> 16) & 255),
      (e[r + 3] = (t >>> 24) & 255));
  },
  jl = function (e, t, r) {
    ((e[r] = t & 255),
      (e[r + 1] = (t >> 8) & 255),
      (e[r + 2] = (t >> 16) & 255),
      (e[r + 3] = (t >> 24) & 255));
  },
  Ul = function (e, t, r) {
    ((e[r] = t & 255), (e[r + 1] = (t >>> 8) & 255));
  };
function Wl(e, t, r) {
  var n = 0,
    a = 0;
  if (r === "dbcs") {
    for (a = 0; a != t.length; ++a) Ul(this, t.charCodeAt(a), this.l + 2 * a);
    n = 2 * t.length;
  } else if (r === "sbcs") {
    for (t = t.replace(/[^\x00-\x7F]/g, "_"), a = 0; a != t.length; ++a)
      this[this.l + a] = t.charCodeAt(a) & 255;
    n = t.length;
  } else if (r === "hex") {
    for (; a < e; ++a)
      this[this.l++] = parseInt(t.slice(2 * a, 2 * a + 2), 16) || 0;
    return this;
  } else if (r === "utf16le") {
    var i = Math.min(this.l + e, this.length);
    for (a = 0; a < Math.min(t.length, e); ++a) {
      var s = t.charCodeAt(a);
      ((this[this.l++] = s & 255), (this[this.l++] = s >> 8));
    }
    for (; this.l < i;) this[this.l++] = 0;
    return this;
  } else
    switch (e) {
      case 1:
        ((n = 1), (this[this.l] = t & 255));
        break;
      case 2:
        ((n = 2),
          (this[this.l] = t & 255),
          (t >>>= 8),
          (this[this.l + 1] = t & 255));
        break;
      case 3:
        ((n = 3),
          (this[this.l] = t & 255),
          (t >>>= 8),
          (this[this.l + 1] = t & 255),
          (t >>>= 8),
          (this[this.l + 2] = t & 255));
        break;
      case 4:
        ((n = 4), Bl(this, t, this.l));
        break;
      case 8:
        if (((n = 8), r === "f")) {
          Il(this, t, this.l);
          break;
        }
      case 16:
        break;
      case -4:
        ((n = 4), jl(this, t, this.l));
        break;
    }
  return ((this.l += n), this);
}
function c0(e, t) {
  var r = Js(this, this.l, e.length >> 1);
  if (r !== e) throw new Error(t + "Expected " + e + " saw " + r);
  this.l += e.length >> 1;
}
function et(e, t) {
  ((e.l = t), (e.read_shift = An), (e.chk = c0), (e.write_shift = Wl));
}
function vt(e, t) {
  e.l += t;
}
function W(e) {
  var t = Ut(e);
  return (et(t, 0), t);
}
function Xr() {
  var e = [],
    t = We ? 256 : 2048,
    r = function (l) {
      var f = W(l);
      return (et(f, 0), f);
    },
    n = r(t),
    a = function () {
      n &&
        (n.length > n.l && ((n = n.slice(0, n.l)), (n.l = n.length)),
        n.length > 0 && e.push(n),
        (n = null));
    },
    i = function (l) {
      return n && l < n.length - n.l ? n : (a(), (n = r(Math.max(l + 1, t))));
    },
    s = function () {
      return (a(), Lr(e));
    },
    o = function (l) {
      (a(), (n = l), n.l == null && (n.l = n.length), i(t));
    };
  return { next: i, push: o, end: s, _bufs: e };
}
function K(e, t, r, n) {
  var a = +t,
    i;
  if (!isNaN(a)) {
    (n || (n = Id[a].p || (r || []).length || 0),
      (i = 1 + (a >= 128 ? 1 : 0) + 1),
      n >= 128 && ++i,
      n >= 16384 && ++i,
      n >= 2097152 && ++i);
    var s = e.next(i);
    a <= 127
      ? s.write_shift(1, a)
      : (s.write_shift(1, (a & 127) + 128), s.write_shift(1, a >> 7));
    for (var o = 0; o != 4; ++o)
      if (n >= 128) (s.write_shift(1, (n & 127) + 128), (n >>= 7));
      else {
        s.write_shift(1, n);
        break;
      }
    n > 0 && li(r) && e.push(r);
  }
}
function yn(e, t, r) {
  var n = qr(e);
  if (
    (t.s
      ? (n.cRel && (n.c += t.s.c), n.rRel && (n.r += t.s.r))
      : (n.cRel && (n.c += t.c), n.rRel && (n.r += t.r)),
    !r || r.biff < 12)
  ) {
    for (; n.c >= 256;) n.c -= 256;
    for (; n.r >= 65536;) n.r -= 65536;
  }
  return n;
}
function zi(e, t, r) {
  var n = qr(e);
  return ((n.s = yn(n.s, t.s, r)), (n.e = yn(n.e, t.s, r)), n);
}
function Cn(e, t) {
  if (e.cRel && e.c < 0) for (e = qr(e); e.c < 0;) e.c += t > 8 ? 16384 : 256;
  if (e.rRel && e.r < 0)
    for (e = qr(e); e.r < 0;) e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384;
  var r = Ke(e);
  return (
    !e.cRel && e.cRel != null && (r = Gl(r)),
    !e.rRel && e.rRel != null && (r = Vl(r)),
    r
  );
}
function Ma(e, t) {
  return e.s.r == 0 &&
    !e.s.rRel &&
    e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) &&
    !e.e.rRel
    ? (e.s.cRel ? "" : "$") +
        Wr(e.s.c) +
        ":" +
        (e.e.cRel ? "" : "$") +
        Wr(e.e.c)
    : e.s.c == 0 &&
        !e.s.cRel &&
        e.e.c == (t.biff >= 12 ? 16383 : 255) &&
        !e.e.cRel
      ? (e.s.rRel ? "" : "$") +
        Br(e.s.r) +
        ":" +
        (e.e.rRel ? "" : "$") +
        Br(e.e.r)
      : Cn(e.s, t.biff) + ":" + Cn(e.e, t.biff);
}
function ci(e) {
  return parseInt(Hl(e), 10) - 1;
}
function Br(e) {
  return "" + (e + 1);
}
function Vl(e) {
  return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2");
}
function Hl(e) {
  return e.replace(/\$(\d+)$/, "$1");
}
function fi(e) {
  for (var t = $l(e), r = 0, n = 0; n !== t.length; ++n)
    r = 26 * r + t.charCodeAt(n) - 64;
  return r - 1;
}
function Wr(e) {
  if (e < 0) throw new Error("invalid column " + e);
  var t = "";
  for (++e; e; e = Math.floor((e - 1) / 26))
    t = String.fromCharCode(((e - 1) % 26) + 65) + t;
  return t;
}
function Gl(e) {
  return e.replace(/^([A-Z])/, "$$$1");
}
function $l(e) {
  return e.replace(/^\$([A-Z])/, "$1");
}
function Yl(e) {
  return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}
function kr(e) {
  for (var t = 0, r = 0, n = 0; n < e.length; ++n) {
    var a = e.charCodeAt(n);
    a >= 48 && a <= 57
      ? (t = 10 * t + (a - 48))
      : a >= 65 && a <= 90 && (r = 26 * r + (a - 64));
  }
  return { c: r - 1, r: t - 1 };
}
function Ke(e) {
  for (var t = e.c + 1, r = ""; t; t = ((t - 1) / 26) | 0)
    r = String.fromCharCode(((t - 1) % 26) + 65) + r;
  return r + (e.r + 1);
}
function nt(e) {
  var t = e.indexOf(":");
  return t == -1
    ? { s: kr(e), e: kr(e) }
    : { s: kr(e.slice(0, t)), e: kr(e.slice(t + 1)) };
}
function Er(e, t) {
  return typeof t > "u" || typeof t == "number"
    ? Er(e.s, e.e)
    : (typeof e != "string" && (e = Ke(e)),
      typeof t != "string" && (t = Ke(t)),
      e == t ? e : e + ":" + t);
}
function lr(e) {
  var t = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } },
    r = 0,
    n = 0,
    a = 0,
    i = e.length;
  for (r = 0; n < i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (
    t.s.c = --r, r = 0;
    n < i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9);
    ++n
  )
    r = 10 * r + a;
  if (((t.s.r = --r), n === i || a != 10))
    return ((t.e.c = t.s.c), (t.e.r = t.s.r), t);
  for (++n, r = 0; n != i && !((a = e.charCodeAt(n) - 64) < 1 || a > 26); ++n)
    r = 26 * r + a;
  for (
    t.e.c = --r, r = 0;
    n != i && !((a = e.charCodeAt(n) - 48) < 0 || a > 9);
    ++n
  )
    r = 10 * r + a;
  return ((t.e.r = --r), t);
}
function Xi(e, t) {
  var r = e.t == "d" && t instanceof Date;
  if (e.z != null)
    try {
      return (e.w = Ot(e.z, r ? Kr(t) : t));
    } catch {}
  try {
    return (e.w = Ot((e.XF || {}).numFmtId || (r ? 14 : 0), r ? Kr(t) : t));
  } catch {
    return "" + t;
  }
}
function Ft(e, t, r) {
  return e == null || e.t == null || e.t == "z"
    ? ""
    : e.w !== void 0
      ? e.w
      : (e.t == "d" && !e.z && r && r.dateNF && (e.z = r.dateNF),
        e.t == "e" ? $n[e.v] || e.v : t == null ? Xi(e, e.v) : Xi(e, t));
}
function Gt(e, t) {
  var r = t && t.sheet ? t.sheet : "Sheet1",
    n = {};
  return ((n[r] = e), { SheetNames: [r], Sheets: n });
}
function f0(e, t, r) {
  var n = r || {},
    a = e ? Array.isArray(e) : n.dense,
    i = e || (a ? [] : {}),
    s = 0,
    o = 0;
  if (i && n.origin != null) {
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? kr(n.origin) : n.origin;
      ((s = c.r), (o = c.c));
    }
    i["!ref"] || (i["!ref"] = "A1:A1");
  }
  var l = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } };
  if (i["!ref"]) {
    var f = lr(i["!ref"]);
    ((l.s.c = f.s.c),
      (l.s.r = f.s.r),
      (l.e.c = Math.max(l.e.c, f.e.c)),
      (l.e.r = Math.max(l.e.r, f.e.r)),
      s == -1 && (l.e.r = s = f.e.r + 1));
  }
  for (var m = 0; m != t.length; ++m)
    if (t[m]) {
      if (!Array.isArray(t[m]))
        throw new Error("aoa_to_sheet expects an array of arrays");
      for (var p = 0; p != t[m].length; ++p)
        if (!(typeof t[m][p] > "u")) {
          var d = { v: t[m][p] },
            _ = s + m,
            h = o + p;
          if (
            (l.s.r > _ && (l.s.r = _),
            l.s.c > h && (l.s.c = h),
            l.e.r < _ && (l.e.r = _),
            l.e.c < h && (l.e.c = h),
            t[m][p] &&
              typeof t[m][p] == "object" &&
              !Array.isArray(t[m][p]) &&
              !(t[m][p] instanceof Date))
          )
            d = t[m][p];
          else if (
            (Array.isArray(d.v) && ((d.f = t[m][p][1]), (d.v = d.v[0])),
            d.v === null)
          )
            if (d.f) d.t = "n";
            else if (n.nullError) ((d.t = "e"), (d.v = 0));
            else if (n.sheetStubs) d.t = "z";
            else continue;
          else
            typeof d.v == "number"
              ? (d.t = "n")
              : typeof d.v == "boolean"
                ? (d.t = "b")
                : d.v instanceof Date
                  ? ((d.z = n.dateNF || gr[14]),
                    n.cellDates
                      ? ((d.t = "d"), (d.w = Ot(d.z, Kr(d.v))))
                      : ((d.t = "n"), (d.v = Kr(d.v)), (d.w = Ot(d.z, d.v))))
                  : (d.t = "s");
          if (a)
            (i[_] || (i[_] = []),
              i[_][h] && i[_][h].z && (d.z = i[_][h].z),
              (i[_][h] = d));
          else {
            var x = Ke({ c: h, r: _ });
            (i[x] && i[x].z && (d.z = i[x].z), (i[x] = d));
          }
        }
    }
  return (l.s.c < 1e7 && (i["!ref"] = Er(l)), i);
}
function fn(e, t) {
  return f0(null, e, t);
}
function zl(e) {
  return e.read_shift(4, "i");
}
function pt(e, t) {
  return (t || (t = W(4)), t.write_shift(4, e), t);
}
function Vr(e) {
  var t = e.read_shift(4);
  return t === 0 ? "" : e.read_shift(t, "dbcs");
}
function Dr(e, t) {
  var r = !1;
  return (
    t == null && ((r = !0), (t = W(4 + 2 * e.length))),
    t.write_shift(4, e.length),
    e.length > 0 && t.write_shift(0, e, "dbcs"),
    r ? t.slice(0, t.l) : t
  );
}
function Xl(e) {
  return { ich: e.read_shift(2), ifnt: e.read_shift(2) };
}
function Kl(e, t) {
  return (t || (t = W(4)), t.write_shift(2, 0), t.write_shift(2, 0), t);
}
function ui(e, t) {
  var r = e.l,
    n = e.read_shift(1),
    a = Vr(e),
    i = [],
    s = { t: a, h: a };
  if ((n & 1) !== 0) {
    for (var o = e.read_shift(4), c = 0; c != o; ++c) i.push(Xl(e));
    s.r = i;
  } else s.r = [{ ich: 0, ifnt: 0 }];
  return ((e.l = r + t), s);
}
function ql(e, t) {
  var r = !1;
  return (
    t == null && ((r = !0), (t = W(15 + 4 * e.t.length))),
    t.write_shift(1, 0),
    Dr(e.t, t),
    r ? t.slice(0, t.l) : t
  );
}
var Jl = ui;
function Ql(e, t) {
  var r = !1;
  return (
    t == null && ((r = !0), (t = W(23 + 4 * e.t.length))),
    t.write_shift(1, 1),
    Dr(e.t, t),
    t.write_shift(4, 1),
    Kl({}, t),
    r ? t.slice(0, t.l) : t
  );
}
function lt(e) {
  var t = e.read_shift(4),
    r = e.read_shift(2);
  return ((r += e.read_shift(1) << 16), e.l++, { c: t, iStyleRef: r });
}
function $t(e, t) {
  return (
    t == null && (t = W(8)),
    t.write_shift(-4, e.c),
    t.write_shift(3, e.iStyleRef || e.s),
    t.write_shift(1, 0),
    t
  );
}
function Yt(e) {
  var t = e.read_shift(2);
  return ((t += e.read_shift(1) << 16), e.l++, { c: -1, iStyleRef: t });
}
function zt(e, t) {
  return (
    t == null && (t = W(4)),
    t.write_shift(3, e.iStyleRef || e.s),
    t.write_shift(1, 0),
    t
  );
}
var Zl = Vr,
  u0 = Dr;
function hi(e) {
  var t = e.read_shift(4);
  return t === 0 || t === 4294967295 ? "" : e.read_shift(t, "dbcs");
}
function ha(e, t) {
  var r = !1;
  return (
    t == null && ((r = !0), (t = W(127))),
    t.write_shift(4, e.length > 0 ? e.length : 4294967295),
    e.length > 0 && t.write_shift(0, e, "dbcs"),
    r ? t.slice(0, t.l) : t
  );
}
var ec = Vr,
  Ka = hi,
  di = ha;
function h0(e) {
  var t = e.slice(e.l, e.l + 4),
    r = t[0] & 1,
    n = t[0] & 2;
  e.l += 4;
  var a =
    n === 0 ? ua([0, 0, 0, 0, t[0] & 252, t[1], t[2], t[3]], 0) : Bt(t, 0) >> 2;
  return r ? a / 100 : a;
}
function d0(e, t) {
  t == null && (t = W(4));
  var r = 0,
    n = 0,
    a = e * 100;
  if (
    (e == (e | 0) && e >= -536870912 && e < 1 << 29
      ? (n = 1)
      : a == (a | 0) && a >= -536870912 && a < 1 << 29 && ((n = 1), (r = 1)),
    n)
  )
    t.write_shift(-4, ((r ? a : e) << 2) + (r + 2));
  else throw new Error("unsupported RkNumber " + e);
}
function x0(e) {
  var t = { s: {}, e: {} };
  return (
    (t.s.r = e.read_shift(4)),
    (t.e.r = e.read_shift(4)),
    (t.s.c = e.read_shift(4)),
    (t.e.c = e.read_shift(4)),
    t
  );
}
function rc(e, t) {
  return (
    t || (t = W(16)),
    t.write_shift(4, e.s.r),
    t.write_shift(4, e.e.r),
    t.write_shift(4, e.s.c),
    t.write_shift(4, e.e.c),
    t
  );
}
var Xt = x0,
  un = rc;
function hn(e) {
  if (e.length - e.l < 8) throw "XLS Xnum Buffer underflow";
  return e.read_shift(8, "f");
}
function Wt(e, t) {
  return (t || W(8)).write_shift(8, e, "f");
}
function tc(e) {
  var t = {},
    r = e.read_shift(1),
    n = r >>> 1,
    a = e.read_shift(1),
    i = e.read_shift(2, "i"),
    s = e.read_shift(1),
    o = e.read_shift(1),
    c = e.read_shift(1);
  switch ((e.l++, n)) {
    case 0:
      t.auto = 1;
      break;
    case 1:
      t.index = a;
      var l = uc[a];
      l && (t.rgb = is(l));
      break;
    case 2:
      t.rgb = is([s, o, c]);
      break;
    case 3:
      t.theme = a;
      break;
  }
  return (i != 0 && (t.tint = i > 0 ? i / 32767 : i / 32768), t);
}
function da(e, t) {
  if ((t || (t = W(8)), !e || e.auto))
    return (t.write_shift(4, 0), t.write_shift(4, 0), t);
  e.index != null
    ? (t.write_shift(1, 2), t.write_shift(1, e.index))
    : e.theme != null
      ? (t.write_shift(1, 6), t.write_shift(1, e.theme))
      : (t.write_shift(1, 5), t.write_shift(1, 0));
  var r = e.tint || 0;
  if (
    (r > 0 ? (r *= 32767) : r < 0 && (r *= 32768),
    t.write_shift(2, r),
    !e.rgb || e.theme != null)
  )
    (t.write_shift(2, 0), t.write_shift(1, 0), t.write_shift(1, 0));
  else {
    var n = e.rgb || "FFFFFF";
    (typeof n == "number" && (n = ("000000" + n.toString(16)).slice(-6)),
      t.write_shift(1, parseInt(n.slice(0, 2), 16)),
      t.write_shift(1, parseInt(n.slice(2, 4), 16)),
      t.write_shift(1, parseInt(n.slice(4, 6), 16)),
      t.write_shift(1, 255));
  }
  return t;
}
function nc(e) {
  var t = e.read_shift(1);
  e.l++;
  var r = {
    fBold: t & 1,
    fItalic: t & 2,
    fUnderline: t & 4,
    fStrikeout: t & 8,
    fOutline: t & 16,
    fShadow: t & 32,
    fCondense: t & 64,
    fExtend: t & 128,
  };
  return r;
}
function ac(e, t) {
  t || (t = W(2));
  var r =
    (e.italic ? 2 : 0) |
    (e.strike ? 8 : 0) |
    (e.outline ? 16 : 0) |
    (e.shadow ? 32 : 0) |
    (e.condense ? 64 : 0) |
    (e.extend ? 128 : 0);
  return (t.write_shift(1, r), t.write_shift(1, 0), t);
}
var p0 = 2,
  Zr = 3,
  Qn = 11,
  xa = 19,
  Zn = 64,
  ic = 65,
  sc = 71,
  oc = 4108,
  lc = 4126,
  Rr = 80,
  Ki = {
    1: { n: "CodePage", t: p0 },
    2: { n: "Category", t: Rr },
    3: { n: "PresentationFormat", t: Rr },
    4: { n: "ByteCount", t: Zr },
    5: { n: "LineCount", t: Zr },
    6: { n: "ParagraphCount", t: Zr },
    7: { n: "SlideCount", t: Zr },
    8: { n: "NoteCount", t: Zr },
    9: { n: "HiddenCount", t: Zr },
    10: { n: "MultimediaClipCount", t: Zr },
    11: { n: "ScaleCrop", t: Qn },
    12: { n: "HeadingPairs", t: oc },
    13: { n: "TitlesOfParts", t: lc },
    14: { n: "Manager", t: Rr },
    15: { n: "Company", t: Rr },
    16: { n: "LinksUpToDate", t: Qn },
    17: { n: "CharacterCount", t: Zr },
    19: { n: "SharedDoc", t: Qn },
    22: { n: "HyperlinksChanged", t: Qn },
    23: { n: "AppVersion", t: Zr, p: "version" },
    24: { n: "DigSig", t: ic },
    26: { n: "ContentType", t: Rr },
    27: { n: "ContentStatus", t: Rr },
    28: { n: "Language", t: Rr },
    29: { n: "Version", t: Rr },
    255: {},
    2147483648: { n: "Locale", t: xa },
    2147483651: { n: "Behavior", t: xa },
    1919054434: {},
  },
  qi = {
    1: { n: "CodePage", t: p0 },
    2: { n: "Title", t: Rr },
    3: { n: "Subject", t: Rr },
    4: { n: "Author", t: Rr },
    5: { n: "Keywords", t: Rr },
    6: { n: "Comments", t: Rr },
    7: { n: "Template", t: Rr },
    8: { n: "LastAuthor", t: Rr },
    9: { n: "RevNumber", t: Rr },
    10: { n: "EditTime", t: Zn },
    11: { n: "LastPrinted", t: Zn },
    12: { n: "CreatedDate", t: Zn },
    13: { n: "ModifiedDate", t: Zn },
    14: { n: "PageCount", t: Zr },
    15: { n: "WordCount", t: Zr },
    16: { n: "CharCount", t: Zr },
    17: { n: "Thumbnail", t: sc },
    18: { n: "Application", t: Rr },
    19: { n: "DocSecurity", t: Zr },
    255: {},
    2147483648: { n: "Locale", t: xa },
    2147483651: { n: "Behavior", t: xa },
    1919054434: {},
  };
function cc(e) {
  return e.map(function (t) {
    return [(t >> 16) & 255, (t >> 8) & 255, t & 255];
  });
}
var fc = cc([
    0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215,
    16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128,
    8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164,
    13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960,
    65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113,
    10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232,
    16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056,
    3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]),
  uc = qr(fc),
  $n = {
    0: "#NULL!",
    7: "#DIV/0!",
    15: "#VALUE!",
    23: "#REF!",
    29: "#NAME?",
    36: "#NUM!",
    42: "#N/A",
    43: "#GETTING_DATA",
    255: "#WTF?",
  },
  hc = {
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":
      "workbooks",
    "application/vnd.ms-excel.sheet.macroEnabled.main+xml": "workbooks",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.main": "workbooks",
    "application/vnd.ms-excel.addin.macroEnabled.main+xml": "workbooks",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":
      "workbooks",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":
      "sheets",
    "application/vnd.ms-excel.worksheet": "sheets",
    "application/vnd.ms-excel.binIndexWs": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":
      "charts",
    "application/vnd.ms-excel.chartsheet": "charts",
    "application/vnd.ms-excel.macrosheet+xml": "macros",
    "application/vnd.ms-excel.macrosheet": "macros",
    "application/vnd.ms-excel.intlmacrosheet": "TODO",
    "application/vnd.ms-excel.binIndexMs": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":
      "dialogs",
    "application/vnd.ms-excel.dialogsheet": "dialogs",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml":
      "strs",
    "application/vnd.ms-excel.sharedStrings": "strs",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":
      "styles",
    "application/vnd.ms-excel.styles": "styles",
    "application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
    "application/vnd.openxmlformats-officedocument.custom-properties+xml":
      "custprops",
    "application/vnd.openxmlformats-officedocument.extended-properties+xml":
      "extprops",
    "application/vnd.openxmlformats-officedocument.customXmlProperties+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty":
      "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":
      "comments",
    "application/vnd.ms-excel.comments": "comments",
    "application/vnd.ms-excel.threadedcomments+xml": "threadedcomments",
    "application/vnd.ms-excel.person+xml": "people",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml":
      "metadata",
    "application/vnd.ms-excel.sheetMetadata": "metadata",
    "application/vnd.ms-excel.pivotTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "TODO",
    "application/vnd.ms-office.chartcolorstyle+xml": "TODO",
    "application/vnd.ms-office.chartstyle+xml": "TODO",
    "application/vnd.ms-office.chartex+xml": "TODO",
    "application/vnd.ms-excel.calcChain": "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml":
      "calcchains",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings":
      "TODO",
    "application/vnd.ms-office.activeX": "TODO",
    "application/vnd.ms-office.activeX+xml": "TODO",
    "application/vnd.ms-excel.attachedToolbars": "TODO",
    "application/vnd.ms-excel.connections": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":
      "TODO",
    "application/vnd.ms-excel.externalLink": "links",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml":
      "links",
    "application/vnd.ms-excel.pivotCacheDefinition": "TODO",
    "application/vnd.ms-excel.pivotCacheRecords": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml":
      "TODO",
    "application/vnd.ms-excel.queryTable": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml":
      "TODO",
    "application/vnd.ms-excel.userNames": "TODO",
    "application/vnd.ms-excel.revisionHeaders": "TODO",
    "application/vnd.ms-excel.revisionLog": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml":
      "TODO",
    "application/vnd.ms-excel.tableSingleCells": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml":
      "TODO",
    "application/vnd.ms-excel.slicer": "TODO",
    "application/vnd.ms-excel.slicerCache": "TODO",
    "application/vnd.ms-excel.slicer+xml": "TODO",
    "application/vnd.ms-excel.slicerCache+xml": "TODO",
    "application/vnd.ms-excel.wsSortMap": "TODO",
    "application/vnd.ms-excel.table": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.theme+xml": "themes",
    "application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
    "application/vnd.ms-excel.Timeline+xml": "TODO",
    "application/vnd.ms-excel.TimelineCache+xml": "TODO",
    "application/vnd.ms-office.vbaProject": "vba",
    "application/vnd.ms-office.vbaProjectSignature": "TODO",
    "application/vnd.ms-office.volatileDependencies": "TODO",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml":
      "TODO",
    "application/vnd.ms-excel.controlproperties+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.model+data": "TODO",
    "application/vnd.ms-excel.Survey+xml": "TODO",
    "application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
    "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml":
      "TODO",
    "application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
    "application/vnd.openxmlformats-package.relationships+xml": "rels",
    "application/vnd.openxmlformats-officedocument.oleObject": "TODO",
    "image/png": "TODO",
    sheet: "js",
  },
  ea = {
    workbooks: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
      xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
      xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
      xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
      xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml",
    },
    strs: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
      xlsb: "application/vnd.ms-excel.sharedStrings",
    },
    comments: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
      xlsb: "application/vnd.ms-excel.comments",
    },
    sheets: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
      xlsb: "application/vnd.ms-excel.worksheet",
    },
    charts: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
      xlsb: "application/vnd.ms-excel.chartsheet",
    },
    dialogs: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
      xlsb: "application/vnd.ms-excel.dialogsheet",
    },
    macros: {
      xlsx: "application/vnd.ms-excel.macrosheet+xml",
      xlsb: "application/vnd.ms-excel.macrosheet",
    },
    metadata: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml",
      xlsb: "application/vnd.ms-excel.sheetMetadata",
    },
    styles: {
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
      xlsb: "application/vnd.ms-excel.styles",
    },
  };
function m0() {
  return {
    workbooks: [],
    sheets: [],
    charts: [],
    dialogs: [],
    macros: [],
    rels: [],
    strs: [],
    comments: [],
    threadedcomments: [],
    links: [],
    coreprops: [],
    extprops: [],
    custprops: [],
    themes: [],
    styles: [],
    calcchains: [],
    vba: [],
    drawings: [],
    metadata: [],
    people: [],
    TODO: [],
    xmlns: "",
  };
}
function g0(e, t) {
  var r = Sl(hc),
    n = [],
    a;
  ((n[n.length] = Sr),
    (n[n.length] = te("Types", null, {
      xmlns: br.CT,
      "xmlns:xsd": br.xsd,
      "xmlns:xsi": br.xsi,
    })),
    (n = n.concat(
      [
        ["xml", "application/xml"],
        ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"],
        ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"],
        ["data", "application/vnd.openxmlformats-officedocument.model+data"],
        ["bmp", "image/bmp"],
        ["png", "image/png"],
        ["gif", "image/gif"],
        ["emf", "image/x-emf"],
        ["wmf", "image/x-wmf"],
        ["jpg", "image/jpeg"],
        ["jpeg", "image/jpeg"],
        ["tif", "image/tiff"],
        ["tiff", "image/tiff"],
        ["pdf", "application/pdf"],
        ["rels", "application/vnd.openxmlformats-package.relationships+xml"],
      ].map(function (c) {
        return te("Default", null, { Extension: c[0], ContentType: c[1] });
      }),
    )));
  var i = function (c) {
      e[c] &&
        e[c].length > 0 &&
        ((a = e[c][0]),
        (n[n.length] = te("Override", null, {
          PartName: (a[0] == "/" ? "" : "/") + a,
          ContentType: ea[c][t.bookType] || ea[c].xlsx,
        })));
    },
    s = function (c) {
      (e[c] || []).forEach(function (l) {
        n[n.length] = te("Override", null, {
          PartName: (l[0] == "/" ? "" : "/") + l,
          ContentType: ea[c][t.bookType] || ea[c].xlsx,
        });
      });
    },
    o = function (c) {
      (e[c] || []).forEach(function (l) {
        n[n.length] = te("Override", null, {
          PartName: (l[0] == "/" ? "" : "/") + l,
          ContentType: r[c][0],
        });
      });
    };
  return (
    i("workbooks"),
    s("sheets"),
    s("charts"),
    o("themes"),
    ["strs", "styles"].forEach(i),
    ["coreprops", "extprops", "custprops"].forEach(o),
    o("vba"),
    o("comments"),
    o("threadedcomments"),
    o("drawings"),
    s("metadata"),
    o("people"),
    n.length > 2 &&
      ((n[n.length] = "</Types>"), (n[1] = n[1].replace("/>", ">"))),
    n.join("")
  );
}
var je = {
  WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
  HLINK:
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
  VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
  XPATH:
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
  XMISS:
    "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
  CMNT: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments",
  CORE_PROPS:
    "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties",
  EXT_PROPS:
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties",
  CUST_PROPS:
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties",
  SST: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings",
  STY: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles",
  THEME:
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
  WS: [
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet",
  ],
  DRAW: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing",
  XLMETA:
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sheetMetadata",
  TCMNT:
    "http://schemas.microsoft.com/office/2017/10/relationships/threadedComment",
  PEOPLE: "http://schemas.microsoft.com/office/2017/10/relationships/person",
  VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject",
};
function v0(e) {
  var t = e.lastIndexOf("/");
  return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels";
}
function nn(e) {
  var t = [Sr, te("Relationships", null, { xmlns: br.RELS })];
  return (
    jr(e["!id"]).forEach(function (r) {
      t[t.length] = te("Relationship", null, e["!id"][r]);
    }),
    t.length > 2 &&
      ((t[t.length] = "</Relationships>"), (t[1] = t[1].replace("/>", ">"))),
    t.join("")
  );
}
function ze(e, t, r, n, a, i) {
  if (
    (a || (a = {}),
    e["!id"] || (e["!id"] = {}),
    e["!idx"] || (e["!idx"] = 1),
    t < 0)
  )
    for (t = e["!idx"]; e["!id"]["rId" + t]; ++t);
  if (
    ((e["!idx"] = t + 1),
    (a.Id = "rId" + t),
    (a.Type = n),
    (a.Target = r),
    [je.HLINK, je.XPATH, je.XMISS].indexOf(a.Type) > -1 &&
      (a.TargetMode = "External"),
    e["!id"][a.Id])
  )
    throw new Error("Cannot rewrite rId " + t);
  return (
    (e["!id"][a.Id] = a),
    (e[("/" + a.Target).replace("//", "/")] = a),
    t
  );
}
function dc(e) {
  var t = [Sr];
  (t.push(`<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">
`),
    t.push(`  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>
`));
  for (var r = 0; r < e.length; ++r)
    t.push(
      '  <manifest:file-entry manifest:full-path="' +
        e[r][0] +
        '" manifest:media-type="' +
        e[r][1] +
        `"/>
`,
    );
  return (t.push("</manifest:manifest>"), t.join(""));
}
function Ji(e, t, r) {
  return [
    '  <rdf:Description rdf:about="' +
      e +
      `">
`,
    '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' +
      (r || "odf") +
      "#" +
      t +
      `"/>
`,
    `  </rdf:Description>
`,
  ].join("");
}
function xc(e, t) {
  return [
    '  <rdf:Description rdf:about="' +
      e +
      `">
`,
    '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' +
      t +
      `"/>
`,
    `  </rdf:Description>
`,
  ].join("");
}
function pc(e) {
  var t = [Sr];
  t.push(`<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
`);
  for (var r = 0; r != e.length; ++r)
    (t.push(Ji(e[r][0], e[r][1])), t.push(xc("", e[r][0])));
  return (t.push(Ji("", "Document", "pkg")), t.push("</rdf:RDF>"), t.join(""));
}
function _0() {
  return (
    '<office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>SheetJS ' +
    sa.version +
    "</meta:generator></office:meta></office:document-meta>"
  );
}
var jt = [
  ["cp:category", "Category"],
  ["cp:contentStatus", "ContentStatus"],
  ["cp:keywords", "Keywords"],
  ["cp:lastModifiedBy", "LastAuthor"],
  ["cp:lastPrinted", "LastPrinted"],
  ["cp:revision", "RevNumber"],
  ["cp:version", "Version"],
  ["dc:creator", "Author"],
  ["dc:description", "Comments"],
  ["dc:identifier", "Identifier"],
  ["dc:language", "Language"],
  ["dc:subject", "Subject"],
  ["dc:title", "Title"],
  ["dcterms:created", "CreatedDate", "date"],
  ["dcterms:modified", "ModifiedDate", "date"],
];
function Ba(e, t, r, n, a) {
  a[e] != null ||
    t == null ||
    t === "" ||
    ((a[e] = t), (t = Xe(t)), (n[n.length] = r ? te(e, t, r) : Mr(e, t)));
}
function T0(e, t) {
  var r = t || {},
    n = [
      Sr,
      te("cp:coreProperties", null, {
        "xmlns:cp": br.CORE_PROPS,
        "xmlns:dc": br.dc,
        "xmlns:dcterms": br.dcterms,
        "xmlns:dcmitype": br.dcmitype,
        "xmlns:xsi": br.xsi,
      }),
    ],
    a = {};
  if (!e && !r.Props) return n.join("");
  e &&
    (e.CreatedDate != null &&
      Ba(
        "dcterms:created",
        typeof e.CreatedDate == "string"
          ? e.CreatedDate
          : Xa(e.CreatedDate, r.WTF),
        { "xsi:type": "dcterms:W3CDTF" },
        n,
        a,
      ),
    e.ModifiedDate != null &&
      Ba(
        "dcterms:modified",
        typeof e.ModifiedDate == "string"
          ? e.ModifiedDate
          : Xa(e.ModifiedDate, r.WTF),
        { "xsi:type": "dcterms:W3CDTF" },
        n,
        a,
      ));
  for (var i = 0; i != jt.length; ++i) {
    var s = jt[i],
      o = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
    (o === !0
      ? (o = "1")
      : o === !1
        ? (o = "0")
        : typeof o == "number" && (o = String(o)),
      o != null && Ba(s[0], o, null, n, a));
  }
  return (
    n.length > 2 &&
      ((n[n.length] = "</cp:coreProperties>"),
      (n[1] = n[1].replace("/>", ">"))),
    n.join("")
  );
}
var an = [
    ["Application", "Application", "string"],
    ["AppVersion", "AppVersion", "string"],
    ["Company", "Company", "string"],
    ["DocSecurity", "DocSecurity", "string"],
    ["Manager", "Manager", "string"],
    ["HyperlinksChanged", "HyperlinksChanged", "bool"],
    ["SharedDoc", "SharedDoc", "bool"],
    ["LinksUpToDate", "LinksUpToDate", "bool"],
    ["ScaleCrop", "ScaleCrop", "bool"],
    ["HeadingPairs", "HeadingPairs", "raw"],
    ["TitlesOfParts", "TitlesOfParts", "raw"],
  ],
  E0 = [
    "Worksheets",
    "SheetNames",
    "NamedRanges",
    "DefinedNames",
    "Chartsheets",
    "ChartNames",
  ];
function S0(e) {
  var t = [],
    r = te;
  return (
    e || (e = {}),
    (e.Application = "SheetJS"),
    (t[t.length] = Sr),
    (t[t.length] = te("Properties", null, {
      xmlns: br.EXT_PROPS,
      "xmlns:vt": br.vt,
    })),
    an.forEach(function (n) {
      if (e[n[1]] !== void 0) {
        var a;
        switch (n[2]) {
          case "string":
            a = Xe(String(e[n[1]]));
            break;
          case "bool":
            a = e[n[1]] ? "true" : "false";
            break;
        }
        a !== void 0 && (t[t.length] = r(n[0], a));
      }
    }),
    (t[t.length] = r(
      "HeadingPairs",
      r(
        "vt:vector",
        r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") +
          r("vt:variant", r("vt:i4", String(e.Worksheets))),
        { size: 2, baseType: "variant" },
      ),
    )),
    (t[t.length] = r(
      "TitlesOfParts",
      r(
        "vt:vector",
        e.SheetNames.map(function (n) {
          return "<vt:lpstr>" + Xe(n) + "</vt:lpstr>";
        }).join(""),
        { size: e.Worksheets, baseType: "lpstr" },
      ),
    )),
    t.length > 2 &&
      ((t[t.length] = "</Properties>"), (t[1] = t[1].replace("/>", ">"))),
    t.join("")
  );
}
function w0(e) {
  var t = [
    Sr,
    te("Properties", null, { xmlns: br.CUST_PROPS, "xmlns:vt": br.vt }),
  ];
  if (!e) return t.join("");
  var r = 1;
  return (
    jr(e).forEach(function (a) {
      (++r,
        (t[t.length] = te("property", Ol(e[a]), {
          fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
          pid: r,
          name: Xe(a),
        })));
    }),
    t.length > 2 &&
      ((t[t.length] = "</Properties>"), (t[1] = t[1].replace("/>", ">"))),
    t.join("")
  );
}
var Qi = {
  Title: "Title",
  Subject: "Subject",
  Author: "Author",
  Keywords: "Keywords",
  Comments: "Description",
  LastAuthor: "LastAuthor",
  RevNumber: "Revision",
  Application: "AppName",
  LastPrinted: "LastPrinted",
  CreatedDate: "Created",
  ModifiedDate: "LastSaved",
  Category: "Category",
  Manager: "Manager",
  Company: "Company",
  AppVersion: "Version",
  ContentStatus: "ContentStatus",
  Identifier: "Identifier",
  Language: "Language",
};
function mc(e, t) {
  var r = [];
  return (
    jr(Qi)
      .map(function (n) {
        for (var a = 0; a < jt.length; ++a) if (jt[a][1] == n) return jt[a];
        for (a = 0; a < an.length; ++a) if (an[a][1] == n) return an[a];
        throw n;
      })
      .forEach(function (n) {
        if (e[n[1]] != null) {
          var a =
            t && t.Props && t.Props[n[1]] != null ? t.Props[n[1]] : e[n[1]];
          switch (n[2]) {
            case "date":
              a = new Date(a).toISOString().replace(/\.\d*Z/, "Z");
              break;
          }
          (typeof a == "number"
            ? (a = String(a))
            : a === !0 || a === !1
              ? (a = a ? "1" : "0")
              : a instanceof Date &&
                (a = new Date(a).toISOString().replace(/\.\d*Z/, "")),
            r.push(Mr(Qi[n[1]] || n[1], a)));
        }
      }),
    te("DocumentProperties", r.join(""), { xmlns: rt.o })
  );
}
function gc(e, t) {
  var r = ["Worksheets", "SheetNames"],
    n = "CustomDocumentProperties",
    a = [];
  return (
    e &&
      jr(e).forEach(function (i) {
        if (Object.prototype.hasOwnProperty.call(e, i)) {
          for (var s = 0; s < jt.length; ++s) if (i == jt[s][1]) return;
          for (s = 0; s < an.length; ++s) if (i == an[s][1]) return;
          for (s = 0; s < r.length; ++s) if (i == r[s]) return;
          var o = e[i],
            c = "string";
          (typeof o == "number"
            ? ((c = "float"), (o = String(o)))
            : o === !0 || o === !1
              ? ((c = "boolean"), (o = o ? "1" : "0"))
              : (o = String(o)),
            a.push(te(ji(i), o, { "dt:dt": c })));
        }
      }),
    t &&
      jr(t).forEach(function (i) {
        if (
          Object.prototype.hasOwnProperty.call(t, i) &&
          !(e && Object.prototype.hasOwnProperty.call(e, i))
        ) {
          var s = t[i],
            o = "string";
          (typeof s == "number"
            ? ((o = "float"), (s = String(s)))
            : s === !0 || s === !1
              ? ((o = "boolean"), (s = s ? "1" : "0"))
              : s instanceof Date
                ? ((o = "dateTime.tz"), (s = s.toISOString()))
                : (s = String(s)),
            a.push(te(ji(i), s, { "dt:dt": o })));
        }
      }),
    "<" + n + ' xmlns="' + rt.o + '">' + a.join("") + "</" + n + ">"
  );
}
function vc(e) {
  var t = typeof e == "string" ? new Date(Date.parse(e)) : e,
    r = t.getTime() / 1e3 + 11644473600,
    n = r % Math.pow(2, 32),
    a = (r - n) / Math.pow(2, 32);
  ((n *= 1e7), (a *= 1e7));
  var i = (n / Math.pow(2, 32)) | 0;
  i > 0 && ((n = n % Math.pow(2, 32)), (a += i));
  var s = W(8);
  return (s.write_shift(4, n), s.write_shift(4, a), s);
}
function Zi(e, t) {
  var r = W(4),
    n = W(4);
  switch ((r.write_shift(4, e == 80 ? 31 : e), e)) {
    case 3:
      n.write_shift(-4, t);
      break;
    case 5:
      ((n = W(8)), n.write_shift(8, t, "f"));
      break;
    case 11:
      n.write_shift(4, t ? 1 : 0);
      break;
    case 64:
      n = vc(t);
      break;
    case 31:
    case 80:
      for (
        n = W(4 + 2 * (t.length + 1) + (t.length % 2 ? 0 : 2)),
          n.write_shift(4, t.length + 1),
          n.write_shift(0, t, "dbcs");
        n.l != n.length;
      )
        n.write_shift(1, 0);
      break;
    default:
      throw new Error("TypedPropertyValue unrecognized type " + e + " " + t);
  }
  return Lr([r, n]);
}
var A0 = [
  "CodePage",
  "Thumbnail",
  "_PID_LINKBASE",
  "_PID_HLINKS",
  "SystemIdentifier",
  "FMTID",
];
function _c(e) {
  switch (typeof e) {
    case "boolean":
      return 11;
    case "number":
      return (e | 0) == e ? 3 : 5;
    case "string":
      return 31;
    case "object":
      if (e instanceof Date) return 64;
      break;
  }
  return -1;
}
function es(e, t, r) {
  var n = W(8),
    a = [],
    i = [],
    s = 8,
    o = 0,
    c = W(8),
    l = W(8);
  if (
    (c.write_shift(4, 2),
    c.write_shift(4, 1200),
    l.write_shift(4, 1),
    i.push(c),
    a.push(l),
    (s += 8 + c.length),
    !t)
  ) {
    ((l = W(8)), l.write_shift(4, 0), a.unshift(l));
    var f = [W(4)];
    for (f[0].write_shift(4, e.length), o = 0; o < e.length; ++o) {
      var m = e[o][0];
      for (
        c = W(8 + 2 * (m.length + 1) + (m.length % 2 ? 0 : 2)),
          c.write_shift(4, o + 2),
          c.write_shift(4, m.length + 1),
          c.write_shift(0, m, "dbcs");
        c.l != c.length;
      )
        c.write_shift(1, 0);
      f.push(c);
    }
    ((c = Lr(f)), i.unshift(c), (s += 8 + c.length));
  }
  for (o = 0; o < e.length; ++o)
    if (
      !(t && !t[e[o][0]]) &&
      !(A0.indexOf(e[o][0]) > -1 || E0.indexOf(e[o][0]) > -1) &&
      e[o][1] != null
    ) {
      var p = e[o][1],
        d = 0;
      if (t) {
        d = +t[e[o][0]];
        var _ = r[d];
        if (_.p == "version" && typeof p == "string") {
          var h = p.split(".");
          p = (+h[0] << 16) + (+h[1] || 0);
        }
        c = Zi(_.t, p);
      } else {
        var x = _c(p);
        (x == -1 && ((x = 31), (p = String(p))), (c = Zi(x, p)));
      }
      (i.push(c),
        (l = W(8)),
        l.write_shift(4, t ? d : 2 + o),
        a.push(l),
        (s += 8 + c.length));
    }
  var C = 8 * (i.length + 1);
  for (o = 0; o < i.length; ++o) (a[o].write_shift(4, C), (C += i[o].length));
  return (
    n.write_shift(4, s),
    n.write_shift(4, i.length),
    Lr([n].concat(a).concat(i))
  );
}
function rs(e, t, r, n, a, i) {
  var s = W(a ? 68 : 48),
    o = [s];
  (s.write_shift(2, 65534),
    s.write_shift(2, 0),
    s.write_shift(4, 842412599),
    s.write_shift(16, rr.utils.consts.HEADER_CLSID, "hex"),
    s.write_shift(4, a ? 2 : 1),
    s.write_shift(16, t, "hex"),
    s.write_shift(4, a ? 68 : 48));
  var c = es(e, r, n);
  if ((o.push(c), a)) {
    var l = es(a, null, null);
    (s.write_shift(16, i, "hex"), s.write_shift(4, 68 + c.length), o.push(l));
  }
  return Lr(o);
}
function Tc(e, t) {
  t || (t = W(e));
  for (var r = 0; r < e; ++r) t.write_shift(1, 0);
  return t;
}
function Ec(e, t) {
  return e.read_shift(t) === 1;
}
function $r(e, t) {
  return (t || (t = W(2)), t.write_shift(2, +!!e), t);
}
function y0(e) {
  return e.read_shift(2, "u");
}
function st(e, t) {
  return (t || (t = W(2)), t.write_shift(2, e), t);
}
function C0(e, t, r) {
  return (
    r || (r = W(2)),
    r.write_shift(1, t == "e" ? +e : +!!e),
    r.write_shift(1, t == "e" ? 1 : 0),
    r
  );
}
function F0(e, t, r) {
  var n = e.read_shift(r && r.biff >= 12 ? 2 : 1),
    a = "sbcs-cont";
  if ((r && r.biff >= 8, !r || r.biff == 8)) {
    var i = e.read_shift(1);
    i && (a = "dbcs-cont");
  } else r.biff == 12 && (a = "wstr");
  r.biff >= 2 && r.biff <= 5 && (a = "cpstr");
  var s = n ? e.read_shift(n, a) : "";
  return s;
}
function Sc(e) {
  var t = e.t || "",
    r = W(3);
  (r.write_shift(2, t.length), r.write_shift(1, 1));
  var n = W(2 * t.length);
  n.write_shift(2 * t.length, t, "utf16le");
  var a = [r, n];
  return Lr(a);
}
function wc(e, t, r) {
  var n;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return e.read_shift(t, "cpstr");
    if (r.biff >= 12) return e.read_shift(t, "dbcs-cont");
  }
  var a = e.read_shift(1);
  return (
    a === 0
      ? (n = e.read_shift(t, "sbcs-cont"))
      : (n = e.read_shift(t, "dbcs-cont")),
    n
  );
}
function Ac(e, t, r) {
  var n = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return n === 0 ? (e.l++, "") : wc(e, n, r);
}
function yc(e, t, r) {
  if (r.biff > 5) return Ac(e, t, r);
  var n = e.read_shift(1);
  return n === 0
    ? (e.l++, "")
    : e.read_shift(n, r.biff <= 4 || !e.lens ? "cpstr" : "sbcs-cont");
}
function b0(e, t, r) {
  return (
    r || (r = W(3 + 2 * e.length)),
    r.write_shift(2, e.length),
    r.write_shift(1, 1),
    r.write_shift(31, e, "utf16le"),
    r
  );
}
function ts(e, t) {
  (t || (t = W(6 + e.length * 2)), t.write_shift(4, 1 + e.length));
  for (var r = 0; r < e.length; ++r) t.write_shift(2, e.charCodeAt(r));
  return (t.write_shift(2, 0), t);
}
function Cc(e) {
  var t = W(512),
    r = 0,
    n = e.Target;
  n.slice(0, 7) == "file://" && (n = n.slice(7));
  var a = n.indexOf("#"),
    i = a > -1 ? 31 : 23;
  switch (n.charAt(0)) {
    case "#":
      i = 28;
      break;
    case ".":
      i &= -3;
      break;
  }
  (t.write_shift(4, 2), t.write_shift(4, i));
  var s = [8, 6815827, 6619237, 4849780, 83];
  for (r = 0; r < s.length; ++r) t.write_shift(4, s[r]);
  if (i == 28) ((n = n.slice(1)), ts(n, t));
  else if (i & 2) {
    for (
      s = "e0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), r = 0;
      r < s.length;
      ++r
    )
      t.write_shift(1, parseInt(s[r], 16));
    var o = a > -1 ? n.slice(0, a) : n;
    for (t.write_shift(4, 2 * (o.length + 1)), r = 0; r < o.length; ++r)
      t.write_shift(2, o.charCodeAt(r));
    (t.write_shift(2, 0), i & 8 && ts(a > -1 ? n.slice(a + 1) : "", t));
  } else {
    for (
      s = "03 03 00 00 00 00 00 00 c0 00 00 00 00 00 00 46".split(" "), r = 0;
      r < s.length;
      ++r
    )
      t.write_shift(1, parseInt(s[r], 16));
    for (
      var c = 0;
      n.slice(c * 3, c * 3 + 3) == "../" || n.slice(c * 3, c * 3 + 3) == "..\\";
    )
      ++c;
    for (
      t.write_shift(2, c), t.write_shift(4, n.length - 3 * c + 1), r = 0;
      r < n.length - 3 * c;
      ++r
    )
      t.write_shift(1, n.charCodeAt(r + 3 * c) & 255);
    for (
      t.write_shift(1, 0),
        t.write_shift(2, 65535),
        t.write_shift(2, 57005),
        r = 0;
      r < 6;
      ++r
    )
      t.write_shift(4, 0);
  }
  return t.slice(0, t.l);
}
function Vt(e, t, r, n) {
  return (
    n || (n = W(6)),
    n.write_shift(2, e),
    n.write_shift(2, t),
    n.write_shift(2, r || 0),
    n
  );
}
function Fc(e, t, r) {
  var n = r.biff > 8 ? 4 : 2,
    a = e.read_shift(n),
    i = e.read_shift(n, "i"),
    s = e.read_shift(n, "i");
  return [a, i, s];
}
function bc(e) {
  var t = e.read_shift(2),
    r = e.read_shift(2),
    n = e.read_shift(2),
    a = e.read_shift(2);
  return { s: { c: n, r: t }, e: { c: a, r } };
}
function k0(e, t) {
  return (
    t || (t = W(8)),
    t.write_shift(2, e.s.r),
    t.write_shift(2, e.e.r),
    t.write_shift(2, e.s.c),
    t.write_shift(2, e.e.c),
    t
  );
}
function xi(e, t, r) {
  var n = 1536,
    a = 16;
  switch (r.bookType) {
    case "biff8":
      break;
    case "biff5":
      ((n = 1280), (a = 8));
      break;
    case "biff4":
      ((n = 4), (a = 6));
      break;
    case "biff3":
      ((n = 3), (a = 6));
      break;
    case "biff2":
      ((n = 2), (a = 4));
      break;
    case "xla":
      break;
    default:
      throw new Error("unsupported BIFF version");
  }
  var i = W(a);
  return (
    i.write_shift(2, n),
    i.write_shift(2, t),
    a > 4 && i.write_shift(2, 29282),
    a > 6 && i.write_shift(2, 1997),
    a > 8 &&
      (i.write_shift(2, 49161),
      i.write_shift(2, 1),
      i.write_shift(2, 1798),
      i.write_shift(2, 0)),
    i
  );
}
function kc(e, t) {
  var r = !t || t.biff == 8,
    n = W(r ? 112 : 54);
  for (
    n.write_shift(t.biff == 8 ? 2 : 1, 7),
      r && n.write_shift(1, 0),
      n.write_shift(4, 859007059),
      n.write_shift(4, 5458548 | (r ? 0 : 536870912));
    n.l < n.length;
  )
    n.write_shift(1, r ? 0 : 32);
  return n;
}
function Dc(e, t) {
  var r = !t || t.biff >= 8 ? 2 : 1,
    n = W(8 + r * e.name.length);
  (n.write_shift(4, e.pos),
    n.write_shift(1, e.hs || 0),
    n.write_shift(1, e.dt),
    n.write_shift(1, e.name.length),
    t.biff >= 8 && n.write_shift(1, 1),
    n.write_shift(r * e.name.length, e.name, t.biff < 8 ? "sbcs" : "utf16le"));
  var a = n.slice(0, n.l);
  return ((a.l = n.l), a);
}
function Nc(e, t) {
  var r = W(8);
  (r.write_shift(4, e.Count), r.write_shift(4, e.Unique));
  for (var n = [], a = 0; a < e.length; ++a) n[a] = Sc(e[a]);
  var i = Lr([r].concat(n));
  return (
    (i.parts = [r.length].concat(
      n.map(function (s) {
        return s.length;
      }),
    )),
    i
  );
}
function Pc() {
  var e = W(18);
  return (
    e.write_shift(2, 0),
    e.write_shift(2, 0),
    e.write_shift(2, 29280),
    e.write_shift(2, 17600),
    e.write_shift(2, 56),
    e.write_shift(2, 0),
    e.write_shift(2, 0),
    e.write_shift(2, 1),
    e.write_shift(2, 500),
    e
  );
}
function Oc(e) {
  var t = W(18),
    r = 1718;
  return (
    e && e.RTL && (r |= 64),
    t.write_shift(2, r),
    t.write_shift(4, 0),
    t.write_shift(4, 64),
    t.write_shift(4, 0),
    t.write_shift(4, 0),
    t
  );
}
function Rc(e, t) {
  var r = e.name || "Arial",
    n = t && t.biff == 5,
    a = n ? 15 + r.length : 16 + 2 * r.length,
    i = W(a);
  return (
    i.write_shift(2, e.sz * 20),
    i.write_shift(4, 0),
    i.write_shift(2, 400),
    i.write_shift(4, 0),
    i.write_shift(2, 0),
    i.write_shift(1, r.length),
    n || i.write_shift(1, 1),
    i.write_shift((n ? 1 : 2) * r.length, r, n ? "sbcs" : "utf16le"),
    i
  );
}
function Ic(e, t, r, n) {
  var a = W(10);
  return (Vt(e, t, n, a), a.write_shift(4, r), a);
}
function Lc(e, t, r, n, a) {
  var i = !a || a.biff == 8,
    s = W(8 + +i + (1 + i) * r.length);
  return (
    Vt(e, t, n, s),
    s.write_shift(2, r.length),
    i && s.write_shift(1, 1),
    s.write_shift((1 + i) * r.length, r, i ? "utf16le" : "sbcs"),
    s
  );
}
function Mc(e, t, r, n) {
  var a = r && r.biff == 5;
  (n || (n = W(a ? 3 + t.length : 5 + 2 * t.length)),
    n.write_shift(2, e),
    n.write_shift(a ? 1 : 2, t.length),
    a || n.write_shift(1, 1),
    n.write_shift((a ? 1 : 2) * t.length, t, a ? "sbcs" : "utf16le"));
  var i = n.length > n.l ? n.slice(0, n.l) : n;
  return (i.l == null && (i.l = i.length), i);
}
function Bc(e, t) {
  var r = t.biff == 8 || !t.biff ? 4 : 2,
    n = W(2 * r + 6);
  return (
    n.write_shift(r, e.s.r),
    n.write_shift(r, e.e.r + 1),
    n.write_shift(2, e.s.c),
    n.write_shift(2, e.e.c + 1),
    n.write_shift(2, 0),
    n
  );
}
function ns(e, t, r, n) {
  var a = r && r.biff == 5;
  (n || (n = W(a ? 16 : 20)),
    n.write_shift(2, 0),
    e.style
      ? (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, 65524))
      : (n.write_shift(2, e.numFmtId || 0), n.write_shift(2, t << 4)));
  var i = 0;
  return (
    e.numFmtId > 0 && a && (i |= 1024),
    n.write_shift(4, i),
    n.write_shift(4, 0),
    a || n.write_shift(4, 0),
    n.write_shift(2, 0),
    n
  );
}
function jc(e) {
  var t = W(8);
  return (t.write_shift(4, 0), t.write_shift(2, 0), t.write_shift(2, 0), t);
}
function Uc(e, t, r, n, a, i) {
  var s = W(8);
  return (Vt(e, t, n, s), C0(r, i, s), s);
}
function Wc(e, t, r, n) {
  var a = W(14);
  return (Vt(e, t, n, a), Wt(r, a), a);
}
function Vc(e, t, r) {
  if (r.biff < 8) return Hc(e, t, r);
  for (
    var n = [], a = e.l + t, i = e.read_shift(r.biff > 8 ? 4 : 2);
    i-- !== 0;
  )
    n.push(Fc(e, r.biff > 8 ? 12 : 6, r));
  if (e.l != a) throw new Error("Bad ExternSheet: " + e.l + " != " + a);
  return n;
}
function Hc(e, t, r) {
  e[e.l + 1] == 3 && e[e.l]++;
  var n = F0(e, t, r);
  return n.charCodeAt(0) == 3 ? n.slice(1) : n;
}
function Gc(e) {
  var t = W(2 + e.length * 8);
  t.write_shift(2, e.length);
  for (var r = 0; r < e.length; ++r) k0(e[r], t);
  return t;
}
function $c(e) {
  var t = W(24),
    r = kr(e[0]);
  (t.write_shift(2, r.r),
    t.write_shift(2, r.r),
    t.write_shift(2, r.c),
    t.write_shift(2, r.c));
  for (
    var n = "d0 c9 ea 79 f9 ba ce 11 8c 82 00 aa 00 4b a9 0b".split(" "), a = 0;
    a < 16;
    ++a
  )
    t.write_shift(1, parseInt(n[a], 16));
  return Lr([t, Cc(e[1])]);
}
function Yc(e) {
  var t = e[1].Tooltip,
    r = W(10 + 2 * (t.length + 1));
  r.write_shift(2, 2048);
  var n = kr(e[0]);
  (r.write_shift(2, n.r),
    r.write_shift(2, n.r),
    r.write_shift(2, n.c),
    r.write_shift(2, n.c));
  for (var a = 0; a < t.length; ++a) r.write_shift(2, t.charCodeAt(a));
  return (r.write_shift(2, 0), r);
}
function zc(e) {
  return (e || (e = W(4)), e.write_shift(2, 1), e.write_shift(2, 1), e);
}
function Xc(e, t, r) {
  if (!r.cellStyles) return vt(e, t);
  var n = r && r.biff >= 12 ? 4 : 2,
    a = e.read_shift(n),
    i = e.read_shift(n),
    s = e.read_shift(n),
    o = e.read_shift(n),
    c = e.read_shift(2);
  n == 2 && (e.l += 2);
  var l = { s: a, e: i, w: s, ixfe: o, flags: c };
  return ((r.biff >= 5 || !r.biff) && (l.level = (c >> 8) & 7), l);
}
function Kc(e, t) {
  var r = W(12);
  (r.write_shift(2, t),
    r.write_shift(2, t),
    r.write_shift(2, e.width * 256),
    r.write_shift(2, 0));
  var n = 0;
  return (
    e.hidden && (n |= 1),
    r.write_shift(1, n),
    (n = e.level || 0),
    r.write_shift(1, n),
    r.write_shift(2, 0),
    r
  );
}
function qc(e) {
  for (var t = W(2 * e), r = 0; r < e; ++r) t.write_shift(2, r + 1);
  return t;
}
function Jc(e, t, r) {
  var n = W(15);
  return (zn(n, e, t), n.write_shift(8, r, "f"), n);
}
function Qc(e, t, r) {
  var n = W(9);
  return (zn(n, e, t), n.write_shift(2, r), n);
}
var Zc = (function () {
    var e = {
        1: 437,
        2: 850,
        3: 1252,
        4: 1e4,
        100: 852,
        101: 866,
        102: 865,
        103: 861,
        104: 895,
        105: 620,
        106: 737,
        107: 857,
        120: 950,
        121: 949,
        122: 936,
        123: 932,
        124: 874,
        125: 1255,
        126: 1256,
        150: 10007,
        151: 10029,
        152: 10006,
        200: 1250,
        201: 1251,
        202: 1254,
        203: 1253,
        0: 20127,
        8: 865,
        9: 437,
        10: 850,
        11: 437,
        13: 437,
        14: 850,
        15: 437,
        16: 850,
        17: 437,
        18: 850,
        19: 932,
        20: 850,
        21: 437,
        22: 850,
        23: 865,
        24: 437,
        25: 437,
        26: 850,
        27: 437,
        28: 863,
        29: 850,
        31: 852,
        34: 852,
        35: 852,
        36: 860,
        37: 850,
        38: 866,
        55: 850,
        64: 852,
        77: 936,
        78: 949,
        79: 950,
        80: 874,
        87: 1252,
        88: 1252,
        89: 1252,
        108: 863,
        134: 737,
        135: 852,
        136: 857,
        204: 1257,
        255: 16969,
      },
      t = ni({
        1: 437,
        2: 850,
        3: 1252,
        4: 1e4,
        100: 852,
        101: 866,
        102: 865,
        103: 861,
        104: 895,
        105: 620,
        106: 737,
        107: 857,
        120: 950,
        121: 949,
        122: 936,
        123: 932,
        124: 874,
        125: 1255,
        126: 1256,
        150: 10007,
        151: 10029,
        152: 10006,
        200: 1250,
        201: 1251,
        202: 1254,
        203: 1253,
        0: 20127,
      });
    function r(o, c) {
      var l = [],
        f = Ut(1);
      switch (c.type) {
        case "base64":
          f = dt(Ct(o));
          break;
        case "binary":
          f = dt(o);
          break;
        case "buffer":
        case "array":
          f = o;
          break;
      }
      et(f, 0);
      var m = f.read_shift(1),
        p = !!(m & 136),
        d = !1,
        _ = !1;
      switch (m) {
        case 2:
          break;
        case 3:
          break;
        case 48:
          ((d = !0), (p = !0));
          break;
        case 49:
          ((d = !0), (p = !0));
          break;
        case 131:
          break;
        case 139:
          break;
        case 140:
          _ = !0;
          break;
        case 245:
          break;
        default:
          throw new Error("DBF Unsupported Version: " + m.toString(16));
      }
      var h = 0,
        x = 521;
      (m == 2 && (h = f.read_shift(2)),
        (f.l += 3),
        m != 2 && (h = f.read_shift(4)),
        h > 1048576 && (h = 1e6),
        m != 2 && (x = f.read_shift(2)));
      var C = f.read_shift(2),
        F = c.codepage || 1252;
      (m != 2 &&
        ((f.l += 16),
        f.read_shift(1),
        f[f.l] !== 0 && (F = e[f[f.l]]),
        (f.l += 1),
        (f.l += 2)),
        _ && (f.l += 36));
      for (
        var y = [],
          P = {},
          G = Math.min(f.length, m == 2 ? 521 : x - 10 - (d ? 264 : 0)),
          Q = _ ? 32 : 11;
        f.l < G && f[f.l] != 13;
      )
        switch (
          ((P = {}),
          (P.name = Fi.utils
            .decode(F, f.slice(f.l, f.l + Q))
            .replace(/[\u0000\r\n].*$/g, "")),
          (f.l += Q),
          (P.type = String.fromCharCode(f.read_shift(1))),
          m != 2 && !_ && (P.offset = f.read_shift(4)),
          (P.len = f.read_shift(1)),
          m == 2 && (P.offset = f.read_shift(2)),
          (P.dec = f.read_shift(1)),
          P.name.length && y.push(P),
          m != 2 && (f.l += _ ? 13 : 14),
          P.type)
        ) {
          case "B":
            (!d || P.len != 8) &&
              c.WTF &&
              console.log("Skipping " + P.name + ":" + P.type);
            break;
          case "G":
          case "P":
            c.WTF && console.log("Skipping " + P.name + ":" + P.type);
            break;
          case "+":
          case "0":
          case "@":
          case "C":
          case "D":
          case "F":
          case "I":
          case "L":
          case "M":
          case "N":
          case "O":
          case "T":
          case "Y":
            break;
          default:
            throw new Error("Unknown Field Type: " + P.type);
        }
      if ((f[f.l] !== 13 && (f.l = x - 1), f.read_shift(1) !== 13))
        throw new Error("DBF Terminator not found " + f.l + " " + f[f.l]);
      f.l = x;
      var k = 0,
        j = 0;
      for (l[0] = [], j = 0; j != y.length; ++j) l[0][j] = y[j].name;
      for (; h-- > 0;) {
        if (f[f.l] === 42) {
          f.l += C;
          continue;
        }
        for (++f.l, l[++k] = [], j = 0, j = 0; j != y.length; ++j) {
          var N = f.slice(f.l, f.l + y[j].len);
          ((f.l += y[j].len), et(N, 0));
          var V = Fi.utils.decode(F, N);
          switch (y[j].type) {
            case "C":
              V.trim().length && (l[k][j] = V.replace(/\s+$/, ""));
              break;
            case "D":
              V.length === 8
                ? (l[k][j] = new Date(
                    +V.slice(0, 4),
                    +V.slice(4, 6) - 1,
                    +V.slice(6, 8),
                  ))
                : (l[k][j] = V);
              break;
            case "F":
              l[k][j] = parseFloat(V.trim());
              break;
            case "+":
            case "I":
              l[k][j] = _
                ? N.read_shift(-4, "i") ^ 2147483648
                : N.read_shift(4, "i");
              break;
            case "L":
              switch (V.trim().toUpperCase()) {
                case "Y":
                case "T":
                  l[k][j] = !0;
                  break;
                case "N":
                case "F":
                  l[k][j] = !1;
                  break;
                case "":
                case "?":
                  break;
                default:
                  throw new Error("DBF Unrecognized L:|" + V + "|");
              }
              break;
            case "M":
              if (!p)
                throw new Error(
                  "DBF Unexpected MEMO for type " + m.toString(16),
                );
              l[k][j] =
                "##MEMO##" + (_ ? parseInt(V.trim(), 10) : N.read_shift(4));
              break;
            case "N":
              ((V = V.replace(/\u0000/g, "").trim()),
                V && V != "." && (l[k][j] = +V || 0));
              break;
            case "@":
              l[k][j] = new Date(N.read_shift(-8, "f") - 621356832e5);
              break;
            case "T":
              l[k][j] = new Date(
                (N.read_shift(4) - 2440588) * 864e5 + N.read_shift(4),
              );
              break;
            case "Y":
              l[k][j] =
                N.read_shift(4, "i") / 1e4 +
                (N.read_shift(4, "i") / 1e4) * Math.pow(2, 32);
              break;
            case "O":
              l[k][j] = -N.read_shift(-8, "f");
              break;
            case "B":
              if (d && y[j].len == 8) {
                l[k][j] = N.read_shift(8, "f");
                break;
              }
            case "G":
            case "P":
              N.l += y[j].len;
              break;
            case "0":
              if (y[j].name === "_NullFlags") break;
            default:
              throw new Error("DBF Unsupported data type " + y[j].type);
          }
        }
      }
      if (m != 2 && f.l < f.length && f[f.l++] != 26)
        throw new Error(
          "DBF EOF Marker missing " +
            (f.l - 1) +
            " of " +
            f.length +
            " " +
            f[f.l - 1].toString(16),
        );
      return (
        c && c.sheetRows && (l = l.slice(0, c.sheetRows)),
        (c.DBF = y),
        l
      );
    }
    function n(o, c) {
      var l = c || {};
      l.dateNF || (l.dateNF = "yyyymmdd");
      var f = fn(r(o, l), l);
      return (
        (f["!cols"] = l.DBF.map(function (m) {
          return { wch: m.len, DBF: m };
        })),
        delete l.DBF,
        f
      );
    }
    function a(o, c) {
      try {
        return Gt(n(o, c), c);
      } catch (l) {
        if (c && c.WTF) throw l;
      }
      return { SheetNames: [], Sheets: {} };
    }
    var i = { B: 8, C: 250, L: 1, D: 8, "?": 0, "": 0 };
    function s(o, c) {
      var l = c || {};
      if ((+l.codepage >= 0 && On(+l.codepage), l.type == "string"))
        throw new Error("Cannot write DBF to JS string");
      var f = Xr(),
        m = _a(o, { header: 1, raw: !0, cellDates: !0 }),
        p = m[0],
        d = m.slice(1),
        _ = o["!cols"] || [],
        h = 0,
        x = 0,
        C = 0,
        F = 1;
      for (h = 0; h < p.length; ++h) {
        if (((_[h] || {}).DBF || {}).name) {
          ((p[h] = _[h].DBF.name), ++C);
          continue;
        }
        if (p[h] != null) {
          if (
            (++C,
            typeof p[h] == "number" && (p[h] = p[h].toString(10)),
            typeof p[h] != "string")
          )
            throw new Error(
              "DBF Invalid column name " + p[h] + " |" + typeof p[h] + "|",
            );
          if (p.indexOf(p[h]) !== h) {
            for (x = 0; x < 1024; ++x)
              if (p.indexOf(p[h] + "_" + x) == -1) {
                p[h] += "_" + x;
                break;
              }
          }
        }
      }
      var y = lr(o["!ref"]),
        P = [],
        G = [],
        Q = [];
      for (h = 0; h <= y.e.c - y.s.c; ++h) {
        var k = "",
          j = "",
          N = 0,
          V = [];
        for (x = 0; x < d.length; ++x) d[x][h] != null && V.push(d[x][h]);
        if (V.length == 0 || p[h] == null) {
          P[h] = "?";
          continue;
        }
        for (x = 0; x < V.length; ++x) {
          switch (typeof V[x]) {
            case "number":
              j = "B";
              break;
            case "string":
              j = "C";
              break;
            case "boolean":
              j = "L";
              break;
            case "object":
              j = V[x] instanceof Date ? "D" : "C";
              break;
            default:
              j = "C";
          }
          ((N = Math.max(N, String(V[x]).length)), (k = k && k != j ? "C" : j));
        }
        (N > 250 && (N = 250),
          (j = ((_[h] || {}).DBF || {}).type),
          j == "C" && _[h].DBF.len > N && (N = _[h].DBF.len),
          k == "B" &&
            j == "N" &&
            ((k = "N"), (Q[h] = _[h].DBF.dec), (N = _[h].DBF.len)),
          (G[h] = k == "C" || j == "N" ? N : i[k] || 0),
          (F += G[h]),
          (P[h] = k));
      }
      var H = f.next(32);
      for (
        H.write_shift(4, 318902576),
          H.write_shift(4, d.length),
          H.write_shift(2, 296 + 32 * C),
          H.write_shift(2, F),
          h = 0;
        h < 4;
        ++h
      )
        H.write_shift(4, 0);
      for (
        H.write_shift(4, 0 | ((+t[Ns] || 3) << 8)), h = 0, x = 0;
        h < p.length;
        ++h
      )
        if (p[h] != null) {
          var Y = f.next(32),
            Z = (p[h].slice(-10) + "\0\0\0\0\0\0\0\0\0\0\0").slice(0, 11);
          (Y.write_shift(1, Z, "sbcs"),
            Y.write_shift(1, P[h] == "?" ? "C" : P[h], "sbcs"),
            Y.write_shift(4, x),
            Y.write_shift(1, G[h] || i[P[h]] || 0),
            Y.write_shift(1, Q[h] || 0),
            Y.write_shift(1, 2),
            Y.write_shift(4, 0),
            Y.write_shift(1, 0),
            Y.write_shift(4, 0),
            Y.write_shift(4, 0),
            (x += G[h] || i[P[h]] || 0));
        }
      var Te = f.next(264);
      for (Te.write_shift(4, 13), h = 0; h < 65; ++h) Te.write_shift(4, 0);
      for (h = 0; h < d.length; ++h) {
        var he = f.next(F);
        for (he.write_shift(1, 0), x = 0; x < p.length; ++x)
          if (p[x] != null)
            switch (P[x]) {
              case "L":
                he.write_shift(1, d[h][x] == null ? 63 : d[h][x] ? 84 : 70);
                break;
              case "B":
                he.write_shift(8, d[h][x] || 0, "f");
                break;
              case "N":
                var le = "0";
                for (
                  typeof d[h][x] == "number" &&
                    (le = d[h][x].toFixed(Q[x] || 0)),
                    C = 0;
                  C < G[x] - le.length;
                  ++C
                )
                  he.write_shift(1, 32);
                he.write_shift(1, le, "sbcs");
                break;
              case "D":
                d[h][x]
                  ? (he.write_shift(
                      4,
                      ("0000" + d[h][x].getFullYear()).slice(-4),
                      "sbcs",
                    ),
                    he.write_shift(
                      2,
                      ("00" + (d[h][x].getMonth() + 1)).slice(-2),
                      "sbcs",
                    ),
                    he.write_shift(
                      2,
                      ("00" + d[h][x].getDate()).slice(-2),
                      "sbcs",
                    ))
                  : he.write_shift(8, "00000000", "sbcs");
                break;
              case "C":
                var _e = String(d[h][x] != null ? d[h][x] : "").slice(0, G[x]);
                for (
                  he.write_shift(1, _e, "sbcs"), C = 0;
                  C < G[x] - _e.length;
                  ++C
                )
                  he.write_shift(1, 32);
                break;
            }
      }
      return (f.next(1).write_shift(1, 26), f.end());
    }
    return { to_workbook: a, to_sheet: n, from_sheet: s };
  })(),
  ef = (function () {
    var e = {
        AA: "À",
        BA: "Á",
        CA: "Â",
        DA: 195,
        HA: "Ä",
        JA: 197,
        AE: "È",
        BE: "É",
        CE: "Ê",
        HE: "Ë",
        AI: "Ì",
        BI: "Í",
        CI: "Î",
        HI: "Ï",
        AO: "Ò",
        BO: "Ó",
        CO: "Ô",
        DO: 213,
        HO: "Ö",
        AU: "Ù",
        BU: "Ú",
        CU: "Û",
        HU: "Ü",
        Aa: "à",
        Ba: "á",
        Ca: "â",
        Da: 227,
        Ha: "ä",
        Ja: 229,
        Ae: "è",
        Be: "é",
        Ce: "ê",
        He: "ë",
        Ai: "ì",
        Bi: "í",
        Ci: "î",
        Hi: "ï",
        Ao: "ò",
        Bo: "ó",
        Co: "ô",
        Do: 245,
        Ho: "ö",
        Au: "ù",
        Bu: "ú",
        Cu: "û",
        Hu: "ü",
        KC: "Ç",
        Kc: "ç",
        q: "æ",
        z: "œ",
        a: "Æ",
        j: "Œ",
        DN: 209,
        Dn: 241,
        Hy: 255,
        S: 169,
        c: 170,
        R: 174,
        "B ": 180,
        0: 176,
        1: 177,
        2: 178,
        3: 179,
        5: 181,
        6: 182,
        7: 183,
        Q: 185,
        k: 186,
        b: 208,
        i: 216,
        l: 222,
        s: 240,
        y: 248,
        "!": 161,
        '"': 162,
        "#": 163,
        "(": 164,
        "%": 165,
        "'": 167,
        "H ": 168,
        "+": 171,
        ";": 187,
        "<": 188,
        "=": 189,
        ">": 190,
        "?": 191,
        "{": 223,
      },
      t = new RegExp(
        "\x1BN(" +
          jr(e)
            .join("|")
            .replace(/\|\|\|/, "|\\||")
            .replace(/([?()+])/g, "\\$1") +
          "|\\|)",
        "gm",
      ),
      r = function (p, d) {
        var _ = e[d];
        return typeof _ == "number" ? Ci(_) : _;
      },
      n = function (p, d, _) {
        var h = ((d.charCodeAt(0) - 32) << 4) | (_.charCodeAt(0) - 48);
        return h == 59 ? p : Ci(h);
      };
    e["|"] = 254;
    function a(p, d) {
      switch (d.type) {
        case "base64":
          return i(Ct(p), d);
        case "binary":
          return i(p, d);
        case "buffer":
          return i(We && Buffer.isBuffer(p) ? p.toString("binary") : Vn(p), d);
        case "array":
          return i(ka(p), d);
      }
      throw new Error("Unrecognized type " + d.type);
    }
    function i(p, d) {
      var _ = p.split(/[\n\r]+/),
        h = -1,
        x = -1,
        C = 0,
        F = 0,
        y = [],
        P = [],
        G = null,
        Q = {},
        k = [],
        j = [],
        N = [],
        V = 0,
        H;
      for (+d.codepage >= 0 && On(+d.codepage); C !== _.length; ++C) {
        V = 0;
        var Y = _[C].trim()
            .replace(/\x1B([\x20-\x2F])([\x30-\x3F])/g, n)
            .replace(t, r),
          Z = Y.replace(/;;/g, "\0")
            .split(";")
            .map(function (b) {
              return b.replace(/\u0000/g, ";");
            }),
          Te = Z[0],
          he;
        if (Y.length > 0)
          switch (Te) {
            case "ID":
              break;
            case "E":
              break;
            case "B":
              break;
            case "O":
              break;
            case "W":
              break;
            case "P":
              Z[1].charAt(0) == "P" && P.push(Y.slice(3).replace(/;;/g, ";"));
              break;
            case "C":
              var le = !1,
                _e = !1,
                ye = !1,
                Be = !1,
                Ie = -1,
                Pe = -1;
              for (F = 1; F < Z.length; ++F)
                switch (Z[F].charAt(0)) {
                  case "A":
                    break;
                  case "X":
                    ((x = parseInt(Z[F].slice(1)) - 1), (_e = !0));
                    break;
                  case "Y":
                    for (
                      h = parseInt(Z[F].slice(1)) - 1,
                        _e || (x = 0),
                        H = y.length;
                      H <= h;
                      ++H
                    )
                      y[H] = [];
                    break;
                  case "K":
                    ((he = Z[F].slice(1)),
                      he.charAt(0) === '"'
                        ? (he = he.slice(1, he.length - 1))
                        : he === "TRUE"
                          ? (he = !0)
                          : he === "FALSE"
                            ? (he = !1)
                            : isNaN(At(he))
                              ? isNaN(In(he).getDate()) || (he = Yr(he))
                              : ((he = At(he)),
                                G !== null && Hs(G) && (he = zs(he))),
                      (le = !0));
                    break;
                  case "E":
                    Be = !0;
                    var A = Zf(Z[F].slice(1), { r: h, c: x });
                    y[h][x] = [y[h][x], A];
                    break;
                  case "S":
                    ((ye = !0), (y[h][x] = [y[h][x], "S5S"]));
                    break;
                  case "G":
                    break;
                  case "R":
                    Ie = parseInt(Z[F].slice(1)) - 1;
                    break;
                  case "C":
                    Pe = parseInt(Z[F].slice(1)) - 1;
                    break;
                  default:
                    if (d && d.WTF) throw new Error("SYLK bad record " + Y);
                }
              if (
                (le &&
                  (y[h][x] && y[h][x].length == 2
                    ? (y[h][x][0] = he)
                    : (y[h][x] = he),
                  (G = null)),
                ye)
              ) {
                if (Be)
                  throw new Error(
                    "SYLK shared formula cannot have own formula",
                  );
                var O = Ie > -1 && y[Ie][Pe];
                if (!O || !O[1])
                  throw new Error("SYLK shared formula cannot find base");
                y[h][x][1] = eu(O[1], { r: h - Ie, c: x - Pe });
              }
              break;
            case "F":
              var D = 0;
              for (F = 1; F < Z.length; ++F)
                switch (Z[F].charAt(0)) {
                  case "X":
                    ((x = parseInt(Z[F].slice(1)) - 1), ++D);
                    break;
                  case "Y":
                    for (
                      h = parseInt(Z[F].slice(1)) - 1, H = y.length;
                      H <= h;
                      ++H
                    )
                      y[H] = [];
                    break;
                  case "M":
                    V = parseInt(Z[F].slice(1)) / 20;
                    break;
                  case "F":
                    break;
                  case "G":
                    break;
                  case "P":
                    G = P[parseInt(Z[F].slice(1))];
                    break;
                  case "S":
                    break;
                  case "D":
                    break;
                  case "N":
                    break;
                  case "W":
                    for (
                      N = Z[F].slice(1).split(" "), H = parseInt(N[0], 10);
                      H <= parseInt(N[1], 10);
                      ++H
                    )
                      ((V = parseInt(N[2], 10)),
                        (j[H - 1] = V === 0 ? { hidden: !0 } : { wch: V }),
                        pi(j[H - 1]));
                    break;
                  case "C":
                    ((x = parseInt(Z[F].slice(1)) - 1), j[x] || (j[x] = {}));
                    break;
                  case "R":
                    ((h = parseInt(Z[F].slice(1)) - 1),
                      k[h] || (k[h] = {}),
                      V > 0
                        ? ((k[h].hpt = V), (k[h].hpx = R0(V)))
                        : V === 0 && (k[h].hidden = !0));
                    break;
                  default:
                    if (d && d.WTF) throw new Error("SYLK bad record " + Y);
                }
              D < 1 && (G = null);
              break;
            default:
              if (d && d.WTF) throw new Error("SYLK bad record " + Y);
          }
      }
      return (
        k.length > 0 && (Q["!rows"] = k),
        j.length > 0 && (Q["!cols"] = j),
        d && d.sheetRows && (y = y.slice(0, d.sheetRows)),
        [y, Q]
      );
    }
    function s(p, d) {
      var _ = a(p, d),
        h = _[0],
        x = _[1],
        C = fn(h, d);
      return (
        jr(x).forEach(function (F) {
          C[F] = x[F];
        }),
        C
      );
    }
    function o(p, d) {
      return Gt(s(p, d), d);
    }
    function c(p, d, _, h) {
      var x = "C;Y" + (_ + 1) + ";X" + (h + 1) + ";K";
      switch (p.t) {
        case "n":
          ((x += p.v || 0),
            p.f && !p.F && (x += ";E" + gi(p.f, { r: _, c: h })));
          break;
        case "b":
          x += p.v ? "TRUE" : "FALSE";
          break;
        case "e":
          x += p.w || p.v;
          break;
        case "d":
          x += '"' + (p.w || p.v) + '"';
          break;
        case "s":
          x += '"' + p.v.replace(/"/g, "").replace(/;/g, ";;") + '"';
          break;
      }
      return x;
    }
    function l(p, d) {
      d.forEach(function (_, h) {
        var x = "F;W" + (h + 1) + " " + (h + 1) + " ";
        (_.hidden
          ? (x += "0")
          : (typeof _.width == "number" && !_.wpx && (_.wpx = pa(_.width)),
            typeof _.wpx == "number" && !_.wch && (_.wch = ma(_.wpx)),
            typeof _.wch == "number" && (x += Math.round(_.wch))),
          x.charAt(x.length - 1) != " " && p.push(x));
      });
    }
    function f(p, d) {
      d.forEach(function (_, h) {
        var x = "F;";
        (_.hidden
          ? (x += "M0;")
          : _.hpt
            ? (x += "M" + 20 * _.hpt + ";")
            : _.hpx && (x += "M" + 20 * ga(_.hpx) + ";"),
          x.length > 2 && p.push(x + "R" + (h + 1)));
      });
    }
    function m(p, d) {
      var _ = ["ID;PWXL;N;E"],
        h = [],
        x = lr(p["!ref"]),
        C,
        F = Array.isArray(p),
        y = `\r
`;
      (_.push("P;PGeneral"),
        _.push("F;P0;DG0G8;M255"),
        p["!cols"] && l(_, p["!cols"]),
        p["!rows"] && f(_, p["!rows"]),
        _.push(
          "B;Y" +
            (x.e.r - x.s.r + 1) +
            ";X" +
            (x.e.c - x.s.c + 1) +
            ";D" +
            [x.s.c, x.s.r, x.e.c, x.e.r].join(" "),
        ));
      for (var P = x.s.r; P <= x.e.r; ++P)
        for (var G = x.s.c; G <= x.e.c; ++G) {
          var Q = Ke({ r: P, c: G });
          ((C = F ? (p[P] || [])[G] : p[Q]),
            !(!C || (C.v == null && (!C.f || C.F))) && h.push(c(C, p, P, G)));
        }
      return _.join(y) + y + h.join(y) + y + "E" + y;
    }
    return { to_workbook: o, to_sheet: s, from_sheet: m };
  })(),
  rf = (function () {
    function e(i, s) {
      switch (s.type) {
        case "base64":
          return t(Ct(i), s);
        case "binary":
          return t(i, s);
        case "buffer":
          return t(We && Buffer.isBuffer(i) ? i.toString("binary") : Vn(i), s);
        case "array":
          return t(ka(i), s);
      }
      throw new Error("Unrecognized type " + s.type);
    }
    function t(i, s) {
      for (
        var o = i.split(`
`),
          c = -1,
          l = -1,
          f = 0,
          m = [];
        f !== o.length;
        ++f
      ) {
        if (o[f].trim() === "BOT") {
          ((m[++c] = []), (l = 0));
          continue;
        }
        if (!(c < 0)) {
          var p = o[f].trim().split(","),
            d = p[0],
            _ = p[1];
          ++f;
          for (
            var h = o[f] || "";
            (h.match(/["]/g) || []).length & 1 && f < o.length - 1;
          )
            h +=
              `
` + o[++f];
          switch (((h = h.trim()), +d)) {
            case -1:
              if (h === "BOT") {
                ((m[++c] = []), (l = 0));
                continue;
              } else if (h !== "EOD")
                throw new Error("Unrecognized DIF special command " + h);
              break;
            case 0:
              (h === "TRUE"
                ? (m[c][l] = !0)
                : h === "FALSE"
                  ? (m[c][l] = !1)
                  : isNaN(At(_))
                    ? isNaN(In(_).getDate())
                      ? (m[c][l] = _)
                      : (m[c][l] = Yr(_))
                    : (m[c][l] = At(_)),
                ++l);
              break;
            case 1:
              ((h = h.slice(1, h.length - 1)),
                (h = h.replace(/""/g, '"')),
                h && h.match(/^=".*"$/) && (h = h.slice(2, -1)),
                (m[c][l++] = h !== "" ? h : null));
              break;
          }
          if (h === "EOD") break;
        }
      }
      return (s && s.sheetRows && (m = m.slice(0, s.sheetRows)), m);
    }
    function r(i, s) {
      return fn(e(i, s), s);
    }
    function n(i, s) {
      return Gt(r(i, s), s);
    }
    var a = (function () {
      var i = function (c, l, f, m, p) {
          (c.push(l),
            c.push(f + "," + m),
            c.push('"' + p.replace(/"/g, '""') + '"'));
        },
        s = function (c, l, f, m) {
          (c.push(l + "," + f),
            c.push(l == 1 ? '"' + m.replace(/"/g, '""') + '"' : m));
        };
      return function (c) {
        var l = [],
          f = lr(c["!ref"]),
          m,
          p = Array.isArray(c);
        (i(l, "TABLE", 0, 1, "sheetjs"),
          i(l, "VECTORS", 0, f.e.r - f.s.r + 1, ""),
          i(l, "TUPLES", 0, f.e.c - f.s.c + 1, ""),
          i(l, "DATA", 0, 0, ""));
        for (var d = f.s.r; d <= f.e.r; ++d) {
          s(l, -1, 0, "BOT");
          for (var _ = f.s.c; _ <= f.e.c; ++_) {
            var h = Ke({ r: d, c: _ });
            if (((m = p ? (c[d] || [])[_] : c[h]), !m)) {
              s(l, 1, 0, "");
              continue;
            }
            switch (m.t) {
              case "n":
                var x = m.w;
                (!x && m.v != null && (x = m.v),
                  x == null
                    ? m.f && !m.F
                      ? s(l, 1, 0, "=" + m.f)
                      : s(l, 1, 0, "")
                    : s(l, 0, x, "V"));
                break;
              case "b":
                s(l, 0, m.v ? 1 : 0, m.v ? "TRUE" : "FALSE");
                break;
              case "s":
                s(l, 1, 0, isNaN(m.v) ? m.v : '="' + m.v + '"');
                break;
              case "d":
                (m.w || (m.w = Ot(m.z || gr[14], Kr(Yr(m.v)))),
                  s(l, 0, m.w, "V"));
                break;
              default:
                s(l, 1, 0, "");
            }
          }
        }
        s(l, -1, 0, "EOD");
        var C = `\r
`,
          F = l.join(C);
        return F;
      };
    })();
    return { to_workbook: n, to_sheet: r, from_sheet: a };
  })(),
  D0 = (function () {
    function e(m) {
      return m
        .replace(/\\b/g, "\\")
        .replace(/\\c/g, ":")
        .replace(
          /\\n/g,
          `
`,
        );
    }
    function t(m) {
      return m.replace(/\\/g, "\\b").replace(/:/g, "\\c").replace(/\n/g, "\\n");
    }
    function r(m, p) {
      for (
        var d = m.split(`
`),
          _ = -1,
          h = -1,
          x = 0,
          C = [];
        x !== d.length;
        ++x
      ) {
        var F = d[x].trim().split(":");
        if (F[0] === "cell") {
          var y = kr(F[1]);
          if (C.length <= y.r)
            for (_ = C.length; _ <= y.r; ++_) C[_] || (C[_] = []);
          switch (((_ = y.r), (h = y.c), F[2])) {
            case "t":
              C[_][h] = e(F[3]);
              break;
            case "v":
              C[_][h] = +F[3];
              break;
            case "vtf":
              var P = F[F.length - 1];
            case "vtc":
              switch (F[3]) {
                case "nl":
                  C[_][h] = !!+F[4];
                  break;
                default:
                  C[_][h] = +F[4];
                  break;
              }
              F[2] == "vtf" && (C[_][h] = [C[_][h], P]);
          }
        }
      }
      return (p && p.sheetRows && (C = C.slice(0, p.sheetRows)), C);
    }
    function n(m, p) {
      return fn(r(m, p), p);
    }
    function a(m, p) {
      return Gt(n(m, p), p);
    }
    var i = [
        "socialcalc:version:1.5",
        "MIME-Version: 1.0",
        "Content-Type: multipart/mixed; boundary=SocialCalcSpreadsheetControlSave",
      ].join(`
`),
      s =
        [
          "--SocialCalcSpreadsheetControlSave",
          "Content-type: text/plain; charset=UTF-8",
        ].join(`
`) +
        `
`,
      o = ["# SocialCalc Spreadsheet Control Save", "part:sheet"].join(`
`),
      c = "--SocialCalcSpreadsheetControlSave--";
    function l(m) {
      if (!m || !m["!ref"]) return "";
      for (
        var p = [],
          d = [],
          _,
          h = "",
          x = nt(m["!ref"]),
          C = Array.isArray(m),
          F = x.s.r;
        F <= x.e.r;
        ++F
      )
        for (var y = x.s.c; y <= x.e.c; ++y)
          if (
            ((h = Ke({ r: F, c: y })),
            (_ = C ? (m[F] || [])[y] : m[h]),
            !(!_ || _.v == null || _.t === "z"))
          ) {
            switch (((d = ["cell", h, "t"]), _.t)) {
              case "s":
              case "str":
                d.push(t(_.v));
                break;
              case "n":
                _.f
                  ? ((d[2] = "vtf"),
                    (d[3] = "n"),
                    (d[4] = _.v),
                    (d[5] = t(_.f)))
                  : ((d[2] = "v"), (d[3] = _.v));
                break;
              case "b":
                ((d[2] = "vt" + (_.f ? "f" : "c")),
                  (d[3] = "nl"),
                  (d[4] = _.v ? "1" : "0"),
                  (d[5] = t(_.f || (_.v ? "TRUE" : "FALSE"))));
                break;
              case "d":
                var P = Kr(Yr(_.v));
                ((d[2] = "vtc"),
                  (d[3] = "nd"),
                  (d[4] = "" + P),
                  (d[5] = _.w || Ot(_.z || gr[14], P)));
                break;
              case "e":
                continue;
            }
            p.push(d.join(":"));
          }
      return (
        p.push(
          "sheet:c:" +
            (x.e.c - x.s.c + 1) +
            ":r:" +
            (x.e.r - x.s.r + 1) +
            ":tvf:1",
        ),
        p.push("valueformat:1:text-wiki"),
        p.join(`
`)
      );
    }
    function f(m) {
      return [i, s, o, s, l(m), c].join(`
`);
    }
    return { to_workbook: a, to_sheet: n, from_sheet: f };
  })(),
  tf = (function () {
    function e(f, m, p, d, _) {
      _.raw
        ? (m[p][d] = f)
        : f === "" ||
          (f === "TRUE"
            ? (m[p][d] = !0)
            : f === "FALSE"
              ? (m[p][d] = !1)
              : isNaN(At(f))
                ? isNaN(In(f).getDate())
                  ? (m[p][d] = f)
                  : (m[p][d] = Yr(f))
                : (m[p][d] = At(f)));
    }
    function t(f, m) {
      var p = m || {},
        d = [];
      if (!f || f.length === 0) return d;
      for (
        var _ = f.split(/[\r\n]/), h = _.length - 1;
        h >= 0 && _[h].length === 0;
      )
        --h;
      for (var x = 10, C = 0, F = 0; F <= h; ++F)
        ((C = _[F].indexOf(" ")),
          C == -1 ? (C = _[F].length) : C++,
          (x = Math.max(x, C)));
      for (F = 0; F <= h; ++F) {
        d[F] = [];
        var y = 0;
        for (
          e(_[F].slice(0, x).trim(), d, F, y, p), y = 1;
          y <= (_[F].length - x) / 10 + 1;
          ++y
        )
          e(_[F].slice(x + (y - 1) * 10, x + y * 10).trim(), d, F, y, p);
      }
      return (p.sheetRows && (d = d.slice(0, p.sheetRows)), d);
    }
    var r = { 44: ",", 9: "	", 59: ";", 124: "|" },
      n = { 44: 3, 9: 2, 59: 1, 124: 0 };
    function a(f) {
      for (var m = {}, p = !1, d = 0, _ = 0; d < f.length; ++d)
        (_ = f.charCodeAt(d)) == 34
          ? (p = !p)
          : !p && _ in r && (m[_] = (m[_] || 0) + 1);
      _ = [];
      for (d in m)
        Object.prototype.hasOwnProperty.call(m, d) && _.push([m[d], d]);
      if (!_.length) {
        m = n;
        for (d in m)
          Object.prototype.hasOwnProperty.call(m, d) && _.push([m[d], d]);
      }
      return (
        _.sort(function (h, x) {
          return h[0] - x[0] || n[h[1]] - n[x[1]];
        }),
        r[_.pop()[1]] || 44
      );
    }
    function i(f, m) {
      var p = m || {},
        d = "",
        _ = p.dense ? [] : {},
        h = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
      f.slice(0, 4) == "sep="
        ? f.charCodeAt(5) == 13 && f.charCodeAt(6) == 10
          ? ((d = f.charAt(4)), (f = f.slice(7)))
          : f.charCodeAt(5) == 13 || f.charCodeAt(5) == 10
            ? ((d = f.charAt(4)), (f = f.slice(6)))
            : (d = a(f.slice(0, 1024)))
        : p && p.FS
          ? (d = p.FS)
          : (d = a(f.slice(0, 1024)));
      var x = 0,
        C = 0,
        F = 0,
        y = 0,
        P = 0,
        G = d.charCodeAt(0),
        Q = !1,
        k = 0,
        j = f.charCodeAt(0);
      f = f.replace(
        /\r\n/gm,
        `
`,
      );
      var N = p.dateNF != null ? vl(p.dateNF) : null;
      function V() {
        var H = f.slice(y, P),
          Y = {};
        if (
          (H.charAt(0) == '"' &&
            H.charAt(H.length - 1) == '"' &&
            (H = H.slice(1, -1).replace(/""/g, '"')),
          H.length === 0)
        )
          Y.t = "z";
        else if (p.raw) ((Y.t = "s"), (Y.v = H));
        else if (H.trim().length === 0) ((Y.t = "s"), (Y.v = H));
        else if (H.charCodeAt(0) == 61)
          H.charCodeAt(1) == 34 && H.charCodeAt(H.length - 1) == 34
            ? ((Y.t = "s"), (Y.v = H.slice(2, -1).replace(/""/g, '"')))
            : ru(H)
              ? ((Y.t = "n"), (Y.f = H.slice(1)))
              : ((Y.t = "s"), (Y.v = H));
        else if (H == "TRUE") ((Y.t = "b"), (Y.v = !0));
        else if (H == "FALSE") ((Y.t = "b"), (Y.v = !1));
        else if (!isNaN((F = At(H))))
          ((Y.t = "n"), p.cellText !== !1 && (Y.w = H), (Y.v = F));
        else if (!isNaN(In(H).getDate()) || (N && H.match(N))) {
          Y.z = p.dateNF || gr[14];
          var Z = 0;
          (N &&
            H.match(N) &&
            ((H = _l(H, p.dateNF, H.match(N) || [])), (Z = 1)),
            p.cellDates
              ? ((Y.t = "d"), (Y.v = Yr(H, Z)))
              : ((Y.t = "n"), (Y.v = Kr(Yr(H, Z)))),
            p.cellText !== !1 &&
              (Y.w = Ot(Y.z, Y.v instanceof Date ? Kr(Y.v) : Y.v)),
            p.cellNF || delete Y.z);
        } else ((Y.t = "s"), (Y.v = H));
        if (
          (Y.t == "z" ||
            (p.dense
              ? (_[x] || (_[x] = []), (_[x][C] = Y))
              : (_[Ke({ c: C, r: x })] = Y)),
          (y = P + 1),
          (j = f.charCodeAt(y)),
          h.e.c < C && (h.e.c = C),
          h.e.r < x && (h.e.r = x),
          k == G)
        )
          ++C;
        else if (((C = 0), ++x, p.sheetRows && p.sheetRows <= x)) return !0;
      }
      e: for (; P < f.length; ++P)
        switch ((k = f.charCodeAt(P))) {
          case 34:
            j === 34 && (Q = !Q);
            break;
          case G:
          case 10:
          case 13:
            if (!Q && V()) break e;
            break;
        }
      return (P - y > 0 && V(), (_["!ref"] = Er(h)), _);
    }
    function s(f, m) {
      return !(m && m.PRN) ||
        m.FS ||
        f.slice(0, 4) == "sep=" ||
        f.indexOf("	") >= 0 ||
        f.indexOf(",") >= 0 ||
        f.indexOf(";") >= 0
        ? i(f, m)
        : fn(t(f, m), m);
    }
    function o(f, m) {
      var p = "",
        d = m.type == "string" ? [0, 0, 0, 0] : px(f, m);
      switch (m.type) {
        case "base64":
          p = Ct(f);
          break;
        case "binary":
          p = f;
          break;
        case "buffer":
          m.codepage == 65001
            ? (p = f.toString("utf8"))
            : (m.codepage,
              (p = We && Buffer.isBuffer(f) ? f.toString("binary") : Vn(f)));
          break;
        case "array":
          p = ka(f);
          break;
        case "string":
          p = f;
          break;
        default:
          throw new Error("Unrecognized type " + m.type);
      }
      return (
        d[0] == 239 && d[1] == 187 && d[2] == 191
          ? (p = wn(p.slice(3)))
          : m.type != "string" && m.type != "buffer" && m.codepage == 65001
            ? (p = wn(p))
            : m.type == "binary",
        p.slice(0, 19) == "socialcalc:version:"
          ? D0.to_sheet(m.type == "string" ? p : wn(p), m)
          : s(p, m)
      );
    }
    function c(f, m) {
      return Gt(o(f, m), m);
    }
    function l(f) {
      for (
        var m = [], p = lr(f["!ref"]), d, _ = Array.isArray(f), h = p.s.r;
        h <= p.e.r;
        ++h
      ) {
        for (var x = [], C = p.s.c; C <= p.e.c; ++C) {
          var F = Ke({ r: h, c: C });
          if (((d = _ ? (f[h] || [])[C] : f[F]), !d || d.v == null)) {
            x.push("          ");
            continue;
          }
          for (var y = (d.w || (Ft(d), d.w) || "").slice(0, 10); y.length < 10;)
            y += " ";
          x.push(y + (C === 0 ? " " : ""));
        }
        m.push(x.join(""));
      }
      return m.join(`
`);
    }
    return { to_workbook: c, to_sheet: o, from_sheet: l };
  })(),
  as = (function () {
    function e(A, O, D) {
      if (A) {
        et(A, A.l || 0);
        for (var b = D.Enum || Ie; A.l < A.length;) {
          var z = A.read_shift(2),
            fe = b[z] || b[65535],
            xe = A.read_shift(2),
            ie = A.l + xe,
            re = fe.f && fe.f(A, xe, D);
          if (((A.l = ie), O(re, fe, z))) return;
        }
      }
    }
    function t(A, O) {
      switch (O.type) {
        case "base64":
          return r(dt(Ct(A)), O);
        case "binary":
          return r(dt(A), O);
        case "buffer":
        case "array":
          return r(A, O);
      }
      throw "Unsupported type " + O.type;
    }
    function r(A, O) {
      if (!A) return A;
      var D = O || {},
        b = D.dense ? [] : {},
        z = "Sheet1",
        fe = "",
        xe = 0,
        ie = {},
        re = [],
        Ce = [],
        Ee = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } },
        qe = D.sheetRows || 0;
      if (
        A[2] == 0 &&
        (A[3] == 8 || A[3] == 9) &&
        A.length >= 16 &&
        A[14] == 5 &&
        A[15] === 108
      )
        throw new Error("Unsupported Works 3 for Mac file");
      if (A[2] == 2)
        ((D.Enum = Ie),
          e(
            A,
            function (se, vr, Cr) {
              switch (Cr) {
                case 0:
                  ((D.vers = se), se >= 4096 && (D.qpro = !0));
                  break;
                case 6:
                  Ee = se;
                  break;
                case 204:
                  se && (fe = se);
                  break;
                case 222:
                  fe = se;
                  break;
                case 15:
                case 51:
                  D.qpro || (se[1].v = se[1].v.slice(1));
                case 13:
                case 14:
                case 16:
                  (Cr == 14 &&
                    (se[2] & 112) == 112 &&
                    (se[2] & 15) > 1 &&
                    (se[2] & 15) < 15 &&
                    ((se[1].z = D.dateNF || gr[14]),
                    D.cellDates && ((se[1].t = "d"), (se[1].v = zs(se[1].v)))),
                    D.qpro &&
                      se[3] > xe &&
                      ((b["!ref"] = Er(Ee)),
                      (ie[z] = b),
                      re.push(z),
                      (b = D.dense ? [] : {}),
                      (Ee = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }),
                      (xe = se[3]),
                      (z = fe || "Sheet" + (xe + 1)),
                      (fe = "")));
                  var zr = D.dense ? (b[se[0].r] || [])[se[0].c] : b[Ke(se[0])];
                  if (zr) {
                    ((zr.t = se[1].t),
                      (zr.v = se[1].v),
                      se[1].z != null && (zr.z = se[1].z),
                      se[1].f != null && (zr.f = se[1].f));
                    break;
                  }
                  D.dense
                    ? (b[se[0].r] || (b[se[0].r] = []),
                      (b[se[0].r][se[0].c] = se[1]))
                    : (b[Ke(se[0])] = se[1]);
                  break;
              }
            },
            D,
          ));
      else if (A[2] == 26 || A[2] == 14)
        ((D.Enum = Pe),
          A[2] == 14 && ((D.qpro = !0), (A.l = 0)),
          e(
            A,
            function (se, vr, Cr) {
              switch (Cr) {
                case 204:
                  z = se;
                  break;
                case 22:
                  se[1].v = se[1].v.slice(1);
                case 23:
                case 24:
                case 25:
                case 37:
                case 39:
                case 40:
                  if (
                    (se[3] > xe &&
                      ((b["!ref"] = Er(Ee)),
                      (ie[z] = b),
                      re.push(z),
                      (b = D.dense ? [] : {}),
                      (Ee = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } }),
                      (xe = se[3]),
                      (z = "Sheet" + (xe + 1))),
                    qe > 0 && se[0].r >= qe)
                  )
                    break;
                  (D.dense
                    ? (b[se[0].r] || (b[se[0].r] = []),
                      (b[se[0].r][se[0].c] = se[1]))
                    : (b[Ke(se[0])] = se[1]),
                    Ee.e.c < se[0].c && (Ee.e.c = se[0].c),
                    Ee.e.r < se[0].r && (Ee.e.r = se[0].r));
                  break;
                case 27:
                  se[14e3] && (Ce[se[14e3][0]] = se[14e3][1]);
                  break;
                case 1537:
                  ((Ce[se[0]] = se[1]), se[0] == xe && (z = se[1]));
                  break;
              }
            },
            D,
          ));
      else throw new Error("Unrecognized LOTUS BOF " + A[2]);
      if (
        ((b["!ref"] = Er(Ee)), (ie[fe || z] = b), re.push(fe || z), !Ce.length)
      )
        return { SheetNames: re, Sheets: ie };
      for (var Fe = {}, ir = [], He = 0; He < Ce.length; ++He)
        ie[re[He]]
          ? (ir.push(Ce[He] || re[He]), (Fe[Ce[He]] = ie[Ce[He]] || ie[re[He]]))
          : (ir.push(Ce[He]), (Fe[Ce[He]] = { "!ref": "A1" }));
      return { SheetNames: ir, Sheets: Fe };
    }
    function n(A, O) {
      var D = O || {};
      if ((+D.codepage >= 0 && On(+D.codepage), D.type == "string"))
        throw new Error("Cannot write WK1 to JS string");
      var b = Xr(),
        z = lr(A["!ref"]),
        fe = Array.isArray(A),
        xe = [];
      (ne(b, 0, i(1030)), ne(b, 6, c(z)));
      for (var ie = Math.min(z.e.r, 8191), re = z.s.r; re <= ie; ++re)
        for (var Ce = Br(re), Ee = z.s.c; Ee <= z.e.c; ++Ee) {
          re === z.s.r && (xe[Ee] = Wr(Ee));
          var qe = xe[Ee] + Ce,
            Fe = fe ? (A[re] || [])[Ee] : A[qe];
          if (!(!Fe || Fe.t == "z"))
            if (Fe.t == "n")
              (Fe.v | 0) == Fe.v && Fe.v >= -32768 && Fe.v <= 32767
                ? ne(b, 13, d(re, Ee, Fe.v))
                : ne(b, 14, h(re, Ee, Fe.v));
            else {
              var ir = Ft(Fe);
              ne(b, 15, m(re, Ee, ir.slice(0, 239)));
            }
        }
      return (ne(b, 1), b.end());
    }
    function a(A, O) {
      var D = O || {};
      if ((+D.codepage >= 0 && On(+D.codepage), D.type == "string"))
        throw new Error("Cannot write WK3 to JS string");
      var b = Xr();
      ne(b, 0, s(A));
      for (var z = 0, fe = 0; z < A.SheetNames.length; ++z)
        (A.Sheets[A.SheetNames[z]] || {})["!ref"] &&
          ne(b, 27, Be(A.SheetNames[z], fe++));
      var xe = 0;
      for (z = 0; z < A.SheetNames.length; ++z) {
        var ie = A.Sheets[A.SheetNames[z]];
        if (!(!ie || !ie["!ref"])) {
          for (
            var re = lr(ie["!ref"]),
              Ce = Array.isArray(ie),
              Ee = [],
              qe = Math.min(re.e.r, 8191),
              Fe = re.s.r;
            Fe <= qe;
            ++Fe
          )
            for (var ir = Br(Fe), He = re.s.c; He <= re.e.c; ++He) {
              Fe === re.s.r && (Ee[He] = Wr(He));
              var se = Ee[He] + ir,
                vr = Ce ? (ie[Fe] || [])[He] : ie[se];
              if (!(!vr || vr.t == "z"))
                if (vr.t == "n") ne(b, 23, V(Fe, He, xe, vr.v));
                else {
                  var Cr = Ft(vr);
                  ne(b, 22, k(Fe, He, xe, Cr.slice(0, 239)));
                }
            }
          ++xe;
        }
      }
      return (ne(b, 1), b.end());
    }
    function i(A) {
      var O = W(2);
      return (O.write_shift(2, A), O);
    }
    function s(A) {
      var O = W(26);
      (O.write_shift(2, 4096), O.write_shift(2, 4), O.write_shift(4, 0));
      for (var D = 0, b = 0, z = 0, fe = 0; fe < A.SheetNames.length; ++fe) {
        var xe = A.SheetNames[fe],
          ie = A.Sheets[xe];
        if (!(!ie || !ie["!ref"])) {
          ++z;
          var re = nt(ie["!ref"]);
          (D < re.e.r && (D = re.e.r), b < re.e.c && (b = re.e.c));
        }
      }
      return (
        D > 8191 && (D = 8191),
        O.write_shift(2, D),
        O.write_shift(1, z),
        O.write_shift(1, b),
        O.write_shift(2, 0),
        O.write_shift(2, 0),
        O.write_shift(1, 1),
        O.write_shift(1, 2),
        O.write_shift(4, 0),
        O.write_shift(4, 0),
        O
      );
    }
    function o(A, O, D) {
      var b = { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
      return O == 8 && D.qpro
        ? ((b.s.c = A.read_shift(1)),
          A.l++,
          (b.s.r = A.read_shift(2)),
          (b.e.c = A.read_shift(1)),
          A.l++,
          (b.e.r = A.read_shift(2)),
          b)
        : ((b.s.c = A.read_shift(2)),
          (b.s.r = A.read_shift(2)),
          O == 12 && D.qpro && (A.l += 2),
          (b.e.c = A.read_shift(2)),
          (b.e.r = A.read_shift(2)),
          O == 12 && D.qpro && (A.l += 2),
          b.s.c == 65535 && (b.s.c = b.e.c = b.s.r = b.e.r = 0),
          b);
    }
    function c(A) {
      var O = W(8);
      return (
        O.write_shift(2, A.s.c),
        O.write_shift(2, A.s.r),
        O.write_shift(2, A.e.c),
        O.write_shift(2, A.e.r),
        O
      );
    }
    function l(A, O, D) {
      var b = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0, 0];
      return (
        D.qpro && D.vers != 20768
          ? ((b[0].c = A.read_shift(1)),
            (b[3] = A.read_shift(1)),
            (b[0].r = A.read_shift(2)),
            (A.l += 2))
          : ((b[2] = A.read_shift(1)),
            (b[0].c = A.read_shift(2)),
            (b[0].r = A.read_shift(2))),
        b
      );
    }
    function f(A, O, D) {
      var b = A.l + O,
        z = l(A, O, D);
      if (((z[1].t = "s"), D.vers == 20768)) {
        A.l++;
        var fe = A.read_shift(1);
        return ((z[1].v = A.read_shift(fe, "utf8")), z);
      }
      return (D.qpro && A.l++, (z[1].v = A.read_shift(b - A.l, "cstr")), z);
    }
    function m(A, O, D) {
      var b = W(7 + D.length);
      (b.write_shift(1, 255),
        b.write_shift(2, O),
        b.write_shift(2, A),
        b.write_shift(1, 39));
      for (var z = 0; z < b.length; ++z) {
        var fe = D.charCodeAt(z);
        b.write_shift(1, fe >= 128 ? 95 : fe);
      }
      return (b.write_shift(1, 0), b);
    }
    function p(A, O, D) {
      var b = l(A, O, D);
      return ((b[1].v = A.read_shift(2, "i")), b);
    }
    function d(A, O, D) {
      var b = W(7);
      return (
        b.write_shift(1, 255),
        b.write_shift(2, O),
        b.write_shift(2, A),
        b.write_shift(2, D, "i"),
        b
      );
    }
    function _(A, O, D) {
      var b = l(A, O, D);
      return ((b[1].v = A.read_shift(8, "f")), b);
    }
    function h(A, O, D) {
      var b = W(13);
      return (
        b.write_shift(1, 255),
        b.write_shift(2, O),
        b.write_shift(2, A),
        b.write_shift(8, D, "f"),
        b
      );
    }
    function x(A, O, D) {
      var b = A.l + O,
        z = l(A, O, D);
      if (((z[1].v = A.read_shift(8, "f")), D.qpro)) A.l = b;
      else {
        var fe = A.read_shift(2);
        (P(A.slice(A.l, A.l + fe), z), (A.l += fe));
      }
      return z;
    }
    function C(A, O, D) {
      var b = O & 32768;
      return (
        (O &= -32769),
        (O = (b ? A : 0) + (O >= 8192 ? O - 16384 : O)),
        (b ? "" : "$") + (D ? Wr(O) : Br(O))
      );
    }
    var F = {
        51: ["FALSE", 0],
        52: ["TRUE", 0],
        70: ["LEN", 1],
        80: ["SUM", 69],
        81: ["AVERAGEA", 69],
        82: ["COUNTA", 69],
        83: ["MINA", 69],
        84: ["MAXA", 69],
        111: ["T", 1],
      },
      y = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "+",
        "-",
        "*",
        "/",
        "^",
        "=",
        "<>",
        "<=",
        ">=",
        "<",
        ">",
        "",
        "",
        "",
        "",
        "&",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ];
    function P(A, O) {
      et(A, 0);
      for (
        var D = [], b = 0, z = "", fe = "", xe = "", ie = "";
        A.l < A.length;
      ) {
        var re = A[A.l++];
        switch (re) {
          case 0:
            D.push(A.read_shift(8, "f"));
            break;
          case 1:
            ((fe = C(O[0].c, A.read_shift(2), !0)),
              (z = C(O[0].r, A.read_shift(2), !1)),
              D.push(fe + z));
            break;
          case 2:
            {
              var Ce = C(O[0].c, A.read_shift(2), !0),
                Ee = C(O[0].r, A.read_shift(2), !1);
              ((fe = C(O[0].c, A.read_shift(2), !0)),
                (z = C(O[0].r, A.read_shift(2), !1)),
                D.push(Ce + Ee + ":" + fe + z));
            }
            break;
          case 3:
            if (A.l < A.length) {
              console.error("WK1 premature formula end");
              return;
            }
            break;
          case 4:
            D.push("(" + D.pop() + ")");
            break;
          case 5:
            D.push(A.read_shift(2));
            break;
          case 6:
            {
              for (var qe = ""; (re = A[A.l++]);) qe += String.fromCharCode(re);
              D.push('"' + qe.replace(/"/g, '""') + '"');
            }
            break;
          case 8:
            D.push("-" + D.pop());
            break;
          case 23:
            D.push("+" + D.pop());
            break;
          case 22:
            D.push("NOT(" + D.pop() + ")");
            break;
          case 20:
          case 21:
            ((ie = D.pop()),
              (xe = D.pop()),
              D.push(["AND", "OR"][re - 20] + "(" + xe + "," + ie + ")"));
            break;
          default:
            if (re < 32 && y[re])
              ((ie = D.pop()), (xe = D.pop()), D.push(xe + y[re] + ie));
            else if (F[re]) {
              if (((b = F[re][1]), b == 69 && (b = A[A.l++]), b > D.length)) {
                console.error(
                  "WK1 bad formula parse 0x" +
                    re.toString(16) +
                    ":|" +
                    D.join("|") +
                    "|",
                );
                return;
              }
              var Fe = D.slice(-b);
              ((D.length -= b), D.push(F[re][0] + "(" + Fe.join(",") + ")"));
            } else
              return re <= 7
                ? console.error("WK1 invalid opcode " + re.toString(16))
                : re <= 24
                  ? console.error("WK1 unsupported op " + re.toString(16))
                  : re <= 30
                    ? console.error("WK1 invalid opcode " + re.toString(16))
                    : re <= 115
                      ? console.error(
                          "WK1 unsupported function opcode " + re.toString(16),
                        )
                      : console.error(
                          "WK1 unrecognized opcode " + re.toString(16),
                        );
        }
      }
      D.length == 1
        ? (O[1].f = "" + D[0])
        : console.error("WK1 bad formula parse |" + D.join("|") + "|");
    }
    function G(A) {
      var O = [{ c: 0, r: 0 }, { t: "n", v: 0 }, 0];
      return (
        (O[0].r = A.read_shift(2)),
        (O[3] = A[A.l++]),
        (O[0].c = A[A.l++]),
        O
      );
    }
    function Q(A, O) {
      var D = G(A);
      return ((D[1].t = "s"), (D[1].v = A.read_shift(O - 4, "cstr")), D);
    }
    function k(A, O, D, b) {
      var z = W(6 + b.length);
      (z.write_shift(2, A),
        z.write_shift(1, D),
        z.write_shift(1, O),
        z.write_shift(1, 39));
      for (var fe = 0; fe < b.length; ++fe) {
        var xe = b.charCodeAt(fe);
        z.write_shift(1, xe >= 128 ? 95 : xe);
      }
      return (z.write_shift(1, 0), z);
    }
    function j(A, O) {
      var D = G(A);
      D[1].v = A.read_shift(2);
      var b = D[1].v >> 1;
      if (D[1].v & 1)
        switch (b & 7) {
          case 0:
            b = (b >> 3) * 5e3;
            break;
          case 1:
            b = (b >> 3) * 500;
            break;
          case 2:
            b = (b >> 3) / 20;
            break;
          case 3:
            b = (b >> 3) / 200;
            break;
          case 4:
            b = (b >> 3) / 2e3;
            break;
          case 5:
            b = (b >> 3) / 2e4;
            break;
          case 6:
            b = (b >> 3) / 16;
            break;
          case 7:
            b = (b >> 3) / 64;
            break;
        }
      return ((D[1].v = b), D);
    }
    function N(A, O) {
      var D = G(A),
        b = A.read_shift(4),
        z = A.read_shift(4),
        fe = A.read_shift(2);
      if (fe == 65535)
        return (
          b === 0 && z === 3221225472
            ? ((D[1].t = "e"), (D[1].v = 15))
            : b === 0 && z === 3489660928
              ? ((D[1].t = "e"), (D[1].v = 42))
              : (D[1].v = 0),
          D
        );
      var xe = fe & 32768;
      return (
        (fe = (fe & 32767) - 16446),
        (D[1].v =
          (1 - xe * 2) * (z * Math.pow(2, fe + 32) + b * Math.pow(2, fe))),
        D
      );
    }
    function V(A, O, D, b) {
      var z = W(14);
      if (
        (z.write_shift(2, A), z.write_shift(1, D), z.write_shift(1, O), b == 0)
      )
        return (
          z.write_shift(4, 0),
          z.write_shift(4, 0),
          z.write_shift(2, 65535),
          z
        );
      var fe = 0,
        xe = 0,
        ie = 0,
        re = 0;
      return (
        b < 0 && ((fe = 1), (b = -b)),
        (xe = Math.log2(b) | 0),
        (b /= Math.pow(2, xe - 31)),
        (re = b >>> 0),
        (re & 2147483648) == 0 && ((b /= 2), ++xe, (re = b >>> 0)),
        (b -= re),
        (re |= 2147483648),
        (re >>>= 0),
        (b *= Math.pow(2, 32)),
        (ie = b >>> 0),
        z.write_shift(4, ie),
        z.write_shift(4, re),
        (xe += 16383 + (fe ? 32768 : 0)),
        z.write_shift(2, xe),
        z
      );
    }
    function H(A, O) {
      var D = N(A);
      return ((A.l += O - 14), D);
    }
    function Y(A, O) {
      var D = G(A),
        b = A.read_shift(4);
      return ((D[1].v = b >> 6), D);
    }
    function Z(A, O) {
      var D = G(A),
        b = A.read_shift(8, "f");
      return ((D[1].v = b), D);
    }
    function Te(A, O) {
      var D = Z(A);
      return ((A.l += O - 10), D);
    }
    function he(A, O) {
      return A[A.l + O - 1] == 0 ? A.read_shift(O, "cstr") : "";
    }
    function le(A, O) {
      var D = A[A.l++];
      D > O - 1 && (D = O - 1);
      for (var b = ""; b.length < D;) b += String.fromCharCode(A[A.l++]);
      return b;
    }
    function _e(A, O, D) {
      if (!(!D.qpro || O < 21)) {
        var b = A.read_shift(1);
        ((A.l += 17), (A.l += 1), (A.l += 2));
        var z = A.read_shift(O - 21, "cstr");
        return [b, z];
      }
    }
    function ye(A, O) {
      for (var D = {}, b = A.l + O; A.l < b;) {
        var z = A.read_shift(2);
        if (z == 14e3) {
          for (D[z] = [0, ""], D[z][0] = A.read_shift(2); A[A.l];)
            ((D[z][1] += String.fromCharCode(A[A.l])), A.l++);
          A.l++;
        }
      }
      return D;
    }
    function Be(A, O) {
      var D = W(5 + A.length);
      (D.write_shift(2, 14e3), D.write_shift(2, O));
      for (var b = 0; b < A.length; ++b) {
        var z = A.charCodeAt(b);
        D[D.l++] = z > 127 ? 95 : z;
      }
      return ((D[D.l++] = 0), D);
    }
    var Ie = {
        0: { n: "BOF", f: y0 },
        1: { n: "EOF" },
        2: { n: "CALCMODE" },
        3: { n: "CALCORDER" },
        4: { n: "SPLIT" },
        5: { n: "SYNC" },
        6: { n: "RANGE", f: o },
        7: { n: "WINDOW1" },
        8: { n: "COLW1" },
        9: { n: "WINTWO" },
        10: { n: "COLW2" },
        11: { n: "NAME" },
        12: { n: "BLANK" },
        13: { n: "INTEGER", f: p },
        14: { n: "NUMBER", f: _ },
        15: { n: "LABEL", f },
        16: { n: "FORMULA", f: x },
        24: { n: "TABLE" },
        25: { n: "ORANGE" },
        26: { n: "PRANGE" },
        27: { n: "SRANGE" },
        28: { n: "FRANGE" },
        29: { n: "KRANGE1" },
        32: { n: "HRANGE" },
        35: { n: "KRANGE2" },
        36: { n: "PROTEC" },
        37: { n: "FOOTER" },
        38: { n: "HEADER" },
        39: { n: "SETUP" },
        40: { n: "MARGINS" },
        41: { n: "LABELFMT" },
        42: { n: "TITLES" },
        43: { n: "SHEETJS" },
        45: { n: "GRAPH" },
        46: { n: "NGRAPH" },
        47: { n: "CALCCOUNT" },
        48: { n: "UNFORMATTED" },
        49: { n: "CURSORW12" },
        50: { n: "WINDOW" },
        51: { n: "STRING", f },
        55: { n: "PASSWORD" },
        56: { n: "LOCKED" },
        60: { n: "QUERY" },
        61: { n: "QUERYNAME" },
        62: { n: "PRINT" },
        63: { n: "PRINTNAME" },
        64: { n: "GRAPH2" },
        65: { n: "GRAPHNAME" },
        66: { n: "ZOOM" },
        67: { n: "SYMSPLIT" },
        68: { n: "NSROWS" },
        69: { n: "NSCOLS" },
        70: { n: "RULER" },
        71: { n: "NNAME" },
        72: { n: "ACOMM" },
        73: { n: "AMACRO" },
        74: { n: "PARSE" },
        102: { n: "PRANGES??" },
        103: { n: "RRANGES??" },
        104: { n: "FNAME??" },
        105: { n: "MRANGES??" },
        204: { n: "SHEETNAMECS", f: he },
        222: { n: "SHEETNAMELP", f: le },
        65535: { n: "" },
      },
      Pe = {
        0: { n: "BOF" },
        1: { n: "EOF" },
        2: { n: "PASSWORD" },
        3: { n: "CALCSET" },
        4: { n: "WINDOWSET" },
        5: { n: "SHEETCELLPTR" },
        6: { n: "SHEETLAYOUT" },
        7: { n: "COLUMNWIDTH" },
        8: { n: "HIDDENCOLUMN" },
        9: { n: "USERRANGE" },
        10: { n: "SYSTEMRANGE" },
        11: { n: "ZEROFORCE" },
        12: { n: "SORTKEYDIR" },
        13: { n: "FILESEAL" },
        14: { n: "DATAFILLNUMS" },
        15: { n: "PRINTMAIN" },
        16: { n: "PRINTSTRING" },
        17: { n: "GRAPHMAIN" },
        18: { n: "GRAPHSTRING" },
        19: { n: "??" },
        20: { n: "ERRCELL" },
        21: { n: "NACELL" },
        22: { n: "LABEL16", f: Q },
        23: { n: "NUMBER17", f: N },
        24: { n: "NUMBER18", f: j },
        25: { n: "FORMULA19", f: H },
        26: { n: "FORMULA1A" },
        27: { n: "XFORMAT", f: ye },
        28: { n: "DTLABELMISC" },
        29: { n: "DTLABELCELL" },
        30: { n: "GRAPHWINDOW" },
        31: { n: "CPA" },
        32: { n: "LPLAUTO" },
        33: { n: "QUERY" },
        34: { n: "HIDDENSHEET" },
        35: { n: "??" },
        37: { n: "NUMBER25", f: Y },
        38: { n: "??" },
        39: { n: "NUMBER27", f: Z },
        40: { n: "FORMULA28", f: Te },
        142: { n: "??" },
        147: { n: "??" },
        150: { n: "??" },
        151: { n: "??" },
        152: { n: "??" },
        153: { n: "??" },
        154: { n: "??" },
        155: { n: "??" },
        156: { n: "??" },
        163: { n: "??" },
        174: { n: "??" },
        175: { n: "??" },
        176: { n: "??" },
        177: { n: "??" },
        184: { n: "??" },
        185: { n: "??" },
        186: { n: "??" },
        187: { n: "??" },
        188: { n: "??" },
        195: { n: "??" },
        201: { n: "??" },
        204: { n: "SHEETNAMECS", f: he },
        205: { n: "??" },
        206: { n: "??" },
        207: { n: "??" },
        208: { n: "??" },
        256: { n: "??" },
        259: { n: "??" },
        260: { n: "??" },
        261: { n: "??" },
        262: { n: "??" },
        263: { n: "??" },
        265: { n: "??" },
        266: { n: "??" },
        267: { n: "??" },
        268: { n: "??" },
        270: { n: "??" },
        271: { n: "??" },
        384: { n: "??" },
        389: { n: "??" },
        390: { n: "??" },
        393: { n: "??" },
        396: { n: "??" },
        512: { n: "??" },
        514: { n: "??" },
        513: { n: "??" },
        516: { n: "??" },
        517: { n: "??" },
        640: { n: "??" },
        641: { n: "??" },
        642: { n: "??" },
        643: { n: "??" },
        644: { n: "??" },
        645: { n: "??" },
        646: { n: "??" },
        647: { n: "??" },
        648: { n: "??" },
        658: { n: "??" },
        659: { n: "??" },
        660: { n: "??" },
        661: { n: "??" },
        662: { n: "??" },
        665: { n: "??" },
        666: { n: "??" },
        768: { n: "??" },
        772: { n: "??" },
        1537: { n: "SHEETINFOQP", f: _e },
        1600: { n: "??" },
        1602: { n: "??" },
        1793: { n: "??" },
        1794: { n: "??" },
        1795: { n: "??" },
        1796: { n: "??" },
        1920: { n: "??" },
        2048: { n: "??" },
        2049: { n: "??" },
        2052: { n: "??" },
        2688: { n: "??" },
        10998: { n: "??" },
        12849: { n: "??" },
        28233: { n: "??" },
        28484: { n: "??" },
        65535: { n: "" },
      };
    return { sheet_to_wk1: n, book_to_wk3: a, to_workbook: t };
  })(),
  nf = /^\s|\s$|[\t\n\r]/;
function N0(e, t) {
  if (!t.bookSST) return "";
  var r = [Sr];
  r[r.length] = te("sst", null, {
    xmlns: cn[0],
    count: e.Count,
    uniqueCount: e.Unique,
  });
  for (var n = 0; n != e.length; ++n)
    if (e[n] != null) {
      var a = e[n],
        i = "<si>";
      (a.r
        ? (i += a.r)
        : ((i += "<t"),
          a.t || (a.t = ""),
          a.t.match(nf) && (i += ' xml:space="preserve"'),
          (i += ">" + Xe(a.t) + "</t>")),
        (i += "</si>"),
        (r[r.length] = i));
    }
  return (
    r.length > 2 &&
      ((r[r.length] = "</sst>"), (r[1] = r[1].replace("/>", ">"))),
    r.join("")
  );
}
function af(e) {
  return [e.read_shift(4), e.read_shift(4)];
}
function sf(e, t) {
  return (
    t || (t = W(8)),
    t.write_shift(4, e.Count),
    t.write_shift(4, e.Unique),
    t
  );
}
var of = ql;
function lf(e) {
  var t = Xr();
  K(t, 159, sf(e));
  for (var r = 0; r < e.length; ++r) K(t, 19, of(e[r]));
  return (K(t, 160), t.end());
}
function cf(e) {
  for (var t = [], r = e.split(""), n = 0; n < r.length; ++n)
    t[n] = r[n].charCodeAt(0);
  return t;
}
function P0(e) {
  var t = 0,
    r,
    n = cf(e),
    a = n.length + 1,
    i,
    s,
    o,
    c,
    l;
  for (r = Ut(a), r[0] = n.length, i = 1; i != a; ++i) r[i] = n[i - 1];
  for (i = a - 1; i >= 0; --i)
    ((s = r[i]),
      (o = (t & 16384) === 0 ? 0 : 1),
      (c = (t << 1) & 32767),
      (l = o | c),
      (t = l ^ s));
  return t ^ 52811;
}
var ff = (function () {
  function e(a, i) {
    switch (i.type) {
      case "base64":
        return t(Ct(a), i);
      case "binary":
        return t(a, i);
      case "buffer":
        return t(We && Buffer.isBuffer(a) ? a.toString("binary") : Vn(a), i);
      case "array":
        return t(ka(a), i);
    }
    throw new Error("Unrecognized type " + i.type);
  }
  function t(a, i) {
    var s = i || {},
      o = s.dense ? [] : {},
      c = a.match(/\\trowd.*?\\row\b/g);
    if (!c.length) throw new Error("RTF missing table");
    var l = { s: { c: 0, r: 0 }, e: { c: 0, r: c.length - 1 } };
    return (
      c.forEach(function (f, m) {
        Array.isArray(o) && (o[m] = []);
        for (var p = /\\\w+\b/g, d = 0, _, h = -1; (_ = p.exec(f));) {
          switch (_[0]) {
            case "\\cell":
              var x = f.slice(d, p.lastIndex - _[0].length);
              if ((x[0] == " " && (x = x.slice(1)), ++h, x.length)) {
                var C = { v: x, t: "s" };
                Array.isArray(o) ? (o[m][h] = C) : (o[Ke({ r: m, c: h })] = C);
              }
              break;
          }
          d = p.lastIndex;
        }
        h > l.e.c && (l.e.c = h);
      }),
      (o["!ref"] = Er(l)),
      o
    );
  }
  function r(a, i) {
    return Gt(e(a, i), i);
  }
  function n(a) {
    for (
      var i = ["{\\rtf1\\ansi"],
        s = lr(a["!ref"]),
        o,
        c = Array.isArray(a),
        l = s.s.r;
      l <= s.e.r;
      ++l
    ) {
      i.push("\\trowd\\trautofit1");
      for (var f = s.s.c; f <= s.e.c; ++f) i.push("\\cellx" + (f + 1));
      for (i.push("\\pard\\intbl"), f = s.s.c; f <= s.e.c; ++f) {
        var m = Ke({ r: l, c: f });
        ((o = c ? (a[l] || [])[f] : a[m]),
          !(!o || (o.v == null && (!o.f || o.F))) &&
            (i.push(" " + (o.w || (Ft(o), o.w))), i.push("\\cell")));
      }
      i.push("\\pard\\intbl\\row");
    }
    return i.join("") + "}";
  }
  return { to_workbook: r, to_sheet: e, from_sheet: n };
})();
function is(e) {
  for (var t = 0, r = 1; t != 3; ++t)
    r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
  return r.toString(16).toUpperCase().slice(1);
}
var uf = 6,
  yt = uf;
function pa(e) {
  return Math.floor((e + Math.round(128 / yt) / 256) * yt);
}
function ma(e) {
  return Math.floor(((e - 5) / yt) * 100 + 0.5) / 100;
}
function qa(e) {
  return Math.round(((e * yt + 5) / yt) * 256) / 256;
}
function pi(e) {
  (e.width
    ? ((e.wpx = pa(e.width)), (e.wch = ma(e.wpx)), (e.MDW = yt))
    : e.wpx
      ? ((e.wch = ma(e.wpx)), (e.width = qa(e.wch)), (e.MDW = yt))
      : typeof e.wch == "number" &&
        ((e.width = qa(e.wch)), (e.wpx = pa(e.width)), (e.MDW = yt)),
    e.customWidth && delete e.customWidth);
}
var hf = 96,
  O0 = hf;
function ga(e) {
  return (e * 96) / O0;
}
function R0(e) {
  return (e * O0) / 96;
}
function df(e) {
  var t = ["<numFmts>"];
  return (
    [
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392],
    ].forEach(function (r) {
      for (var n = r[0]; n <= r[1]; ++n)
        e[n] != null &&
          (t[t.length] = te("numFmt", null, {
            numFmtId: n,
            formatCode: Xe(e[n]),
          }));
    }),
    t.length === 1
      ? ""
      : ((t[t.length] = "</numFmts>"),
        (t[0] = te("numFmts", null, { count: t.length - 2 }).replace(
          "/>",
          ">",
        )),
        t.join(""))
  );
}
function xf(e) {
  var t = [];
  return (
    (t[t.length] = te("cellXfs", null)),
    e.forEach(function (r) {
      t[t.length] = te("xf", null, r);
    }),
    (t[t.length] = "</cellXfs>"),
    t.length === 2
      ? ""
      : ((t[0] = te("cellXfs", null, { count: t.length - 2 }).replace(
          "/>",
          ">",
        )),
        t.join(""))
  );
}
function I0(e, t) {
  var r = [Sr, te("styleSheet", null, { xmlns: cn[0], "xmlns:vt": br.vt })],
    n;
  return (
    e.SSF && (n = df(e.SSF)) != null && (r[r.length] = n),
    (r[r.length] =
      '<fonts count="1"><font><sz val="12"/><color theme="1"/><name val="Calibri"/><family val="2"/><scheme val="minor"/></font></fonts>'),
    (r[r.length] =
      '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>'),
    (r[r.length] =
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>'),
    (r[r.length] =
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>'),
    (n = xf(t.cellXfs)) && (r[r.length] = n),
    (r[r.length] =
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>'),
    (r[r.length] = '<dxfs count="0"/>'),
    (r[r.length] =
      '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>'),
    r.length > 2 &&
      ((r[r.length] = "</styleSheet>"), (r[1] = r[1].replace("/>", ">"))),
    r.join("")
  );
}
function pf(e, t) {
  var r = e.read_shift(2),
    n = Vr(e);
  return [r, n];
}
function mf(e, t, r) {
  (r || (r = W(6 + 4 * t.length)), r.write_shift(2, e), Dr(t, r));
  var n = r.length > r.l ? r.slice(0, r.l) : r;
  return (r.l == null && (r.l = r.length), n);
}
function gf(e, t, r) {
  var n = {};
  n.sz = e.read_shift(2) / 20;
  var a = nc(e);
  (a.fItalic && (n.italic = 1),
    a.fCondense && (n.condense = 1),
    a.fExtend && (n.extend = 1),
    a.fShadow && (n.shadow = 1),
    a.fOutline && (n.outline = 1),
    a.fStrikeout && (n.strike = 1));
  var i = e.read_shift(2);
  switch ((i === 700 && (n.bold = 1), e.read_shift(2))) {
    case 1:
      n.vertAlign = "superscript";
      break;
    case 2:
      n.vertAlign = "subscript";
      break;
  }
  var s = e.read_shift(1);
  s != 0 && (n.underline = s);
  var o = e.read_shift(1);
  o > 0 && (n.family = o);
  var c = e.read_shift(1);
  switch (
    (c > 0 && (n.charset = c), e.l++, (n.color = tc(e)), e.read_shift(1))
  ) {
    case 1:
      n.scheme = "major";
      break;
    case 2:
      n.scheme = "minor";
      break;
  }
  return ((n.name = Vr(e)), n);
}
function vf(e, t) {
  (t || (t = W(25 + 4 * 32)),
    t.write_shift(2, e.sz * 20),
    ac(e, t),
    t.write_shift(2, e.bold ? 700 : 400));
  var r = 0;
  (e.vertAlign == "superscript"
    ? (r = 1)
    : e.vertAlign == "subscript" && (r = 2),
    t.write_shift(2, r),
    t.write_shift(1, e.underline || 0),
    t.write_shift(1, e.family || 0),
    t.write_shift(1, e.charset || 0),
    t.write_shift(1, 0),
    da(e.color, t));
  var n = 0;
  return (
    (n = 2),
    t.write_shift(1, n),
    Dr(e.name, t),
    t.length > t.l ? t.slice(0, t.l) : t
  );
}
var _f = [
    "none",
    "solid",
    "mediumGray",
    "darkGray",
    "lightGray",
    "darkHorizontal",
    "darkVertical",
    "darkDown",
    "darkUp",
    "darkGrid",
    "darkTrellis",
    "lightHorizontal",
    "lightVertical",
    "lightDown",
    "lightUp",
    "lightGrid",
    "lightTrellis",
    "gray125",
    "gray0625",
  ],
  ja,
  Tf = vt;
function ss(e, t) {
  (t || (t = W(4 * 3 + 8 * 7 + 16 * 1)), ja || (ja = ni(_f)));
  var r = ja[e.patternType];
  (r == null && (r = 40), t.write_shift(4, r));
  var n = 0;
  if (r != 40)
    for (da({ auto: 1 }, t), da({ auto: 1 }, t); n < 12; ++n)
      t.write_shift(4, 0);
  else {
    for (; n < 4; ++n) t.write_shift(4, 0);
    for (; n < 12; ++n) t.write_shift(4, 0);
  }
  return t.length > t.l ? t.slice(0, t.l) : t;
}
function Ef(e, t) {
  var r = e.l + t,
    n = e.read_shift(2),
    a = e.read_shift(2);
  return ((e.l = r), { ixfe: n, numFmtId: a });
}
function L0(e, t, r) {
  (r || (r = W(16)),
    r.write_shift(2, t || 0),
    r.write_shift(2, e.numFmtId || 0),
    r.write_shift(2, 0),
    r.write_shift(2, 0),
    r.write_shift(2, 0),
    r.write_shift(1, 0),
    r.write_shift(1, 0));
  var n = 0;
  return (
    r.write_shift(1, n),
    r.write_shift(1, 0),
    r.write_shift(1, 0),
    r.write_shift(1, 0),
    r
  );
}
function gn(e, t) {
  return (
    t || (t = W(10)),
    t.write_shift(1, 0),
    t.write_shift(1, 0),
    t.write_shift(4, 0),
    t.write_shift(4, 0),
    t
  );
}
var Sf = vt;
function wf(e, t) {
  return (
    t || (t = W(51)),
    t.write_shift(1, 0),
    gn(null, t),
    gn(null, t),
    gn(null, t),
    gn(null, t),
    gn(null, t),
    t.length > t.l ? t.slice(0, t.l) : t
  );
}
function Af(e, t) {
  return (
    t || (t = W(12 + 4 * 10)),
    t.write_shift(4, e.xfId),
    t.write_shift(2, 1),
    t.write_shift(1, 0),
    t.write_shift(1, 0),
    ha(e.name || "", t),
    t.length > t.l ? t.slice(0, t.l) : t
  );
}
function yf(e, t, r) {
  var n = W(2052);
  return (
    n.write_shift(4, e),
    ha(t, n),
    ha(r, n),
    n.length > n.l ? n.slice(0, n.l) : n
  );
}
function Cf(e, t) {
  if (t) {
    var r = 0;
    ([
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392],
    ].forEach(function (n) {
      for (var a = n[0]; a <= n[1]; ++a) t[a] != null && ++r;
    }),
      r != 0 &&
        (K(e, 615, pt(r)),
        [
          [5, 8],
          [23, 26],
          [41, 44],
          [50, 392],
        ].forEach(function (n) {
          for (var a = n[0]; a <= n[1]; ++a)
            t[a] != null && K(e, 44, mf(a, t[a]));
        }),
        K(e, 616)));
  }
}
function Ff(e) {
  var t = 1;
  (K(e, 611, pt(t)),
    K(e, 43, vf({ sz: 12, color: { theme: 1 }, name: "Calibri", family: 2 })),
    K(e, 612));
}
function bf(e) {
  var t = 2;
  (K(e, 603, pt(t)),
    K(e, 45, ss({ patternType: "none" })),
    K(e, 45, ss({ patternType: "gray125" })),
    K(e, 604));
}
function kf(e) {
  var t = 1;
  (K(e, 613, pt(t)), K(e, 46, wf()), K(e, 614));
}
function Df(e) {
  var t = 1;
  (K(e, 626, pt(t)), K(e, 47, L0({ numFmtId: 0 }, 65535)), K(e, 627));
}
function Nf(e, t) {
  (K(e, 617, pt(t.length)),
    t.forEach(function (r) {
      K(e, 47, L0(r, 0));
    }),
    K(e, 618));
}
function Pf(e) {
  var t = 1;
  (K(e, 619, pt(t)), K(e, 48, Af({ xfId: 0, name: "Normal" })), K(e, 620));
}
function Of(e) {
  var t = 0;
  (K(e, 505, pt(t)), K(e, 506));
}
function Rf(e) {
  var t = 0;
  (K(e, 508, yf(t, "TableStyleMedium9", "PivotStyleMedium4")), K(e, 509));
}
function If(e, t) {
  var r = Xr();
  return (
    K(r, 278),
    Cf(r, e.SSF),
    Ff(r),
    bf(r),
    kf(r),
    Df(r),
    Nf(r, t.cellXfs),
    Pf(r),
    Of(r),
    Rf(r),
    K(r, 279),
    r.end()
  );
}
function M0(e, t) {
  if (t && t.themeXLSX) return t.themeXLSX;
  if (e && typeof e.raw == "string") return e.raw;
  var r = [Sr];
  return (
    (r[r.length] =
      '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">'),
    (r[r.length] = "<a:themeElements>"),
    (r[r.length] = '<a:clrScheme name="Office">'),
    (r[r.length] =
      '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>'),
    (r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>'),
    (r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>'),
    (r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>'),
    (r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>'),
    (r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>'),
    (r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>'),
    (r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>'),
    (r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>'),
    (r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>'),
    (r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>'),
    (r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>'),
    (r[r.length] = "</a:clrScheme>"),
    (r[r.length] = '<a:fontScheme name="Office">'),
    (r[r.length] = "<a:majorFont>"),
    (r[r.length] = '<a:latin typeface="Cambria"/>'),
    (r[r.length] = '<a:ea typeface=""/>'),
    (r[r.length] = '<a:cs typeface=""/>'),
    (r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>'),
    (r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>'),
    (r[r.length] = '<a:font script="Hans" typeface="宋体"/>'),
    (r[r.length] = '<a:font script="Hant" typeface="新細明體"/>'),
    (r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>'),
    (r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>'),
    (r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>'),
    (r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>'),
    (r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>'),
    (r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>'),
    (r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>'),
    (r[r.length] = '<a:font script="Knda" typeface="Tunga"/>'),
    (r[r.length] = '<a:font script="Guru" typeface="Raavi"/>'),
    (r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>'),
    (r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>'),
    (r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>'),
    (r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>'),
    (r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>'),
    (r[r.length] = '<a:font script="Deva" typeface="Mangal"/>'),
    (r[r.length] = '<a:font script="Telu" typeface="Gautami"/>'),
    (r[r.length] = '<a:font script="Taml" typeface="Latha"/>'),
    (r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>'),
    (r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>'),
    (r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>'),
    (r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>'),
    (r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>'),
    (r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>'),
    (r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>'),
    (r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>'),
    (r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>'),
    (r[r.length] = "</a:majorFont>"),
    (r[r.length] = "<a:minorFont>"),
    (r[r.length] = '<a:latin typeface="Calibri"/>'),
    (r[r.length] = '<a:ea typeface=""/>'),
    (r[r.length] = '<a:cs typeface=""/>'),
    (r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>'),
    (r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>'),
    (r[r.length] = '<a:font script="Hans" typeface="宋体"/>'),
    (r[r.length] = '<a:font script="Hant" typeface="新細明體"/>'),
    (r[r.length] = '<a:font script="Arab" typeface="Arial"/>'),
    (r[r.length] = '<a:font script="Hebr" typeface="Arial"/>'),
    (r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>'),
    (r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>'),
    (r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>'),
    (r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>'),
    (r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>'),
    (r[r.length] = '<a:font script="Knda" typeface="Tunga"/>'),
    (r[r.length] = '<a:font script="Guru" typeface="Raavi"/>'),
    (r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>'),
    (r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>'),
    (r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>'),
    (r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>'),
    (r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>'),
    (r[r.length] = '<a:font script="Deva" typeface="Mangal"/>'),
    (r[r.length] = '<a:font script="Telu" typeface="Gautami"/>'),
    (r[r.length] = '<a:font script="Taml" typeface="Latha"/>'),
    (r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>'),
    (r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>'),
    (r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>'),
    (r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>'),
    (r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>'),
    (r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>'),
    (r[r.length] = '<a:font script="Viet" typeface="Arial"/>'),
    (r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>'),
    (r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>'),
    (r[r.length] = "</a:minorFont>"),
    (r[r.length] = "</a:fontScheme>"),
    (r[r.length] = '<a:fmtScheme name="Office">'),
    (r[r.length] = "<a:fillStyleLst>"),
    (r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'),
    (r[r.length] = '<a:gradFill rotWithShape="1">'),
    (r[r.length] = "<a:gsLst>"),
    (r[r.length] =
      '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>'),
    (r[r.length] =
      '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>'),
    (r[r.length] =
      '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>'),
    (r[r.length] = "</a:gsLst>"),
    (r[r.length] = '<a:lin ang="16200000" scaled="1"/>'),
    (r[r.length] = "</a:gradFill>"),
    (r[r.length] = '<a:gradFill rotWithShape="1">'),
    (r[r.length] = "<a:gsLst>"),
    (r[r.length] =
      '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>'),
    (r[r.length] =
      '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>'),
    (r[r.length] = "</a:gsLst>"),
    (r[r.length] = '<a:lin ang="16200000" scaled="0"/>'),
    (r[r.length] = "</a:gradFill>"),
    (r[r.length] = "</a:fillStyleLst>"),
    (r[r.length] = "<a:lnStyleLst>"),
    (r[r.length] =
      '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>'),
    (r[r.length] =
      '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>'),
    (r[r.length] =
      '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>'),
    (r[r.length] = "</a:lnStyleLst>"),
    (r[r.length] = "<a:effectStyleLst>"),
    (r[r.length] = "<a:effectStyle>"),
    (r[r.length] = "<a:effectLst>"),
    (r[r.length] =
      '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>'),
    (r[r.length] = "</a:effectLst>"),
    (r[r.length] = "</a:effectStyle>"),
    (r[r.length] = "<a:effectStyle>"),
    (r[r.length] = "<a:effectLst>"),
    (r[r.length] =
      '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>'),
    (r[r.length] = "</a:effectLst>"),
    (r[r.length] = "</a:effectStyle>"),
    (r[r.length] = "<a:effectStyle>"),
    (r[r.length] = "<a:effectLst>"),
    (r[r.length] =
      '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>'),
    (r[r.length] = "</a:effectLst>"),
    (r[r.length] =
      '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>'),
    (r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>'),
    (r[r.length] = "</a:effectStyle>"),
    (r[r.length] = "</a:effectStyleLst>"),
    (r[r.length] = "<a:bgFillStyleLst>"),
    (r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>'),
    (r[r.length] = '<a:gradFill rotWithShape="1">'),
    (r[r.length] = "<a:gsLst>"),
    (r[r.length] =
      '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>'),
    (r[r.length] =
      '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>'),
    (r[r.length] =
      '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>'),
    (r[r.length] = "</a:gsLst>"),
    (r[r.length] =
      '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>'),
    (r[r.length] = "</a:gradFill>"),
    (r[r.length] = '<a:gradFill rotWithShape="1">'),
    (r[r.length] = "<a:gsLst>"),
    (r[r.length] =
      '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>'),
    (r[r.length] =
      '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>'),
    (r[r.length] = "</a:gsLst>"),
    (r[r.length] =
      '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>'),
    (r[r.length] = "</a:gradFill>"),
    (r[r.length] = "</a:bgFillStyleLst>"),
    (r[r.length] = "</a:fmtScheme>"),
    (r[r.length] = "</a:themeElements>"),
    (r[r.length] = "<a:objectDefaults>"),
    (r[r.length] = "<a:spDef>"),
    (r[r.length] =
      '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>'),
    (r[r.length] = "</a:spDef>"),
    (r[r.length] = "<a:lnDef>"),
    (r[r.length] =
      '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>'),
    (r[r.length] = "</a:lnDef>"),
    (r[r.length] = "</a:objectDefaults>"),
    (r[r.length] = "<a:extraClrSchemeLst/>"),
    (r[r.length] = "</a:theme>"),
    r.join("")
  );
}
function Lf(e, t) {
  return { flags: e.read_shift(4), version: e.read_shift(4), name: Vr(e) };
}
function Mf(e) {
  var t = W(12 + 2 * e.name.length);
  return (
    t.write_shift(4, e.flags),
    t.write_shift(4, e.version),
    Dr(e.name, t),
    t.slice(0, t.l)
  );
}
function Bf(e) {
  for (var t = [], r = e.read_shift(4); r-- > 0;)
    t.push([e.read_shift(4), e.read_shift(4)]);
  return t;
}
function jf(e) {
  var t = W(4 + 8 * e.length);
  t.write_shift(4, e.length);
  for (var r = 0; r < e.length; ++r)
    (t.write_shift(4, e[r][0]), t.write_shift(4, e[r][1]));
  return t;
}
function Uf(e, t) {
  var r = W(8 + 2 * t.length);
  return (r.write_shift(4, e), Dr(t, r), r.slice(0, r.l));
}
function Wf(e) {
  return ((e.l += 4), e.read_shift(4) != 0);
}
function Vf(e, t) {
  var r = W(8);
  return (r.write_shift(4, e), r.write_shift(4, 1), r);
}
function Hf() {
  var e = Xr();
  return (
    K(e, 332),
    K(e, 334, pt(1)),
    K(e, 335, Mf({ name: "XLDAPR", version: 12e4, flags: 3496657072 })),
    K(e, 336),
    K(e, 339, Uf(1, "XLDAPR")),
    K(e, 52),
    K(e, 35, pt(514)),
    K(e, 4096, pt(0)),
    K(e, 4097, st(1)),
    K(e, 36),
    K(e, 53),
    K(e, 340),
    K(e, 337, Vf(1)),
    K(e, 51, jf([[1, 0]])),
    K(e, 338),
    K(e, 333),
    e.end()
  );
}
function B0() {
  var e = [Sr];
  return (
    e.push(`<metadata xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:xlrd="http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" xmlns:xda="http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray">
  <metadataTypes count="1">
    <metadataType name="XLDAPR" minSupportedVersion="120000" copy="1" pasteAll="1" pasteValues="1" merge="1" splitFirst="1" rowColShift="1" clearFormats="1" clearComments="1" assign="1" coerce="1" cellMeta="1"/>
  </metadataTypes>
  <futureMetadata name="XLDAPR" count="1">
    <bk>
      <extLst>
        <ext uri="{bdbb8cdc-fa1e-496e-a857-3c3f30c029c3}">
          <xda:dynamicArrayProperties fDynamic="1" fCollapsed="0"/>
        </ext>
      </extLst>
    </bk>
  </futureMetadata>
  <cellMetadata count="1">
    <bk>
      <rc t="1" v="0"/>
    </bk>
  </cellMetadata>
</metadata>`),
    e.join("")
  );
}
function Gf(e) {
  var t = {};
  t.i = e.read_shift(4);
  var r = {};
  ((r.r = e.read_shift(4)), (r.c = e.read_shift(4)), (t.r = Ke(r)));
  var n = e.read_shift(1);
  return (n & 2 && (t.l = "1"), n & 8 && (t.a = "1"), t);
}
var en = 1024;
function j0(e, t) {
  for (
    var r = [21600, 21600],
      n = ["m0,0l0", r[1], r[0], r[1], r[0], "0xe"].join(","),
      a = [
        te("xml", null, {
          "xmlns:v": rt.v,
          "xmlns:o": rt.o,
          "xmlns:x": rt.x,
          "xmlns:mv": rt.mv,
        }).replace(/\/>/, ">"),
        te("o:shapelayout", te("o:idmap", null, { "v:ext": "edit", data: e }), {
          "v:ext": "edit",
        }),
        te(
          "v:shapetype",
          [
            te("v:stroke", null, { joinstyle: "miter" }),
            te("v:path", null, {
              gradientshapeok: "t",
              "o:connecttype": "rect",
            }),
          ].join(""),
          { id: "_x0000_t202", "o:spt": 202, coordsize: r.join(","), path: n },
        ),
      ];
    en < e * 1e3;
  )
    en += 1e3;
  return (
    t.forEach(function (i) {
      var s = kr(i[0]),
        o = { color2: "#BEFF82", type: "gradient" };
      o.type == "gradient" && (o.angle = "-180");
      var c =
          o.type == "gradient"
            ? te("o:fill", null, { type: "gradientUnscaled", "v:ext": "view" })
            : null,
        l = te("v:fill", c, o),
        f = { on: "t", obscured: "t" };
      (++en,
        (a = a.concat([
          "<v:shape" +
            Mn({
              id: "_x0000_s" + en,
              type: "#_x0000_t202",
              style:
                "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" +
                (i[1].hidden ? ";visibility:hidden" : ""),
              fillcolor: "#ECFAD4",
              strokecolor: "#edeaa1",
            }) +
            ">",
          l,
          te("v:shadow", null, f),
          te("v:path", null, { "o:connecttype": "none" }),
          '<v:textbox><div style="text-align:left"></div></v:textbox>',
          '<x:ClientData ObjectType="Note">',
          "<x:MoveWithCells/>",
          "<x:SizeWithCells/>",
          Mr(
            "x:Anchor",
            [s.c + 1, 0, s.r + 1, 0, s.c + 3, 20, s.r + 5, 20].join(","),
          ),
          Mr("x:AutoFill", "False"),
          Mr("x:Row", String(s.r)),
          Mr("x:Column", String(s.c)),
          i[1].hidden ? "" : "<x:Visible/>",
          "</x:ClientData>",
          "</v:shape>",
        ])));
    }),
    a.push("</xml>"),
    a.join("")
  );
}
function U0(e) {
  var t = [Sr, te("comments", null, { xmlns: cn[0] })],
    r = [];
  return (
    t.push("<authors>"),
    e.forEach(function (n) {
      n[1].forEach(function (a) {
        var i = Xe(a.a);
        (r.indexOf(i) == -1 &&
          (r.push(i), t.push("<author>" + i + "</author>")),
          a.T &&
            a.ID &&
            r.indexOf("tc=" + a.ID) == -1 &&
            (r.push("tc=" + a.ID), t.push("<author>tc=" + a.ID + "</author>")));
      });
    }),
    r.length == 0 && (r.push("SheetJ5"), t.push("<author>SheetJ5</author>")),
    t.push("</authors>"),
    t.push("<commentList>"),
    e.forEach(function (n) {
      var a = 0,
        i = [];
      if (
        (n[1][0] && n[1][0].T && n[1][0].ID
          ? (a = r.indexOf("tc=" + n[1][0].ID))
          : n[1].forEach(function (c) {
              (c.a && (a = r.indexOf(Xe(c.a))), i.push(c.t || ""));
            }),
        t.push('<comment ref="' + n[0] + '" authorId="' + a + '"><text>'),
        i.length <= 1)
      )
        t.push(Mr("t", Xe(i[0] || "")));
      else {
        for (
          var s =
              `Comment:
    ` +
              i[0] +
              `
`,
            o = 1;
          o < i.length;
          ++o
        )
          s +=
            `Reply:
    ` +
            i[o] +
            `
`;
        t.push(Mr("t", Xe(s)));
      }
      t.push("</text></comment>");
    }),
    t.push("</commentList>"),
    t.length > 2 &&
      ((t[t.length] = "</comments>"), (t[1] = t[1].replace("/>", ">"))),
    t.join("")
  );
}
function $f(e, t, r) {
  var n = [
    Sr,
    te("ThreadedComments", null, { xmlns: br.TCMNT }).replace(/[\/]>/, ">"),
  ];
  return (
    e.forEach(function (a) {
      var i = "";
      (a[1] || []).forEach(function (s, o) {
        if (!s.T) {
          delete s.ID;
          return;
        }
        s.a && t.indexOf(s.a) == -1 && t.push(s.a);
        var c = {
          ref: a[0],
          id:
            "{54EE7951-7262-4200-6969-" +
            ("000000000000" + r.tcid++).slice(-12) +
            "}",
        };
        (o == 0 ? (i = c.id) : (c.parentId = i),
          (s.ID = c.id),
          s.a &&
            (c.personId =
              "{54EE7950-7262-4200-6969-" +
              ("000000000000" + t.indexOf(s.a)).slice(-12) +
              "}"),
          n.push(te("threadedComment", Mr("text", s.t || ""), c)));
      });
    }),
    n.push("</ThreadedComments>"),
    n.join("")
  );
}
function Yf(e) {
  var t = [
    Sr,
    te("personList", null, { xmlns: br.TCMNT, "xmlns:x": cn[0] }).replace(
      /[\/]>/,
      ">",
    ),
  ];
  return (
    e.forEach(function (r, n) {
      t.push(
        te("person", null, {
          displayName: r,
          id:
            "{54EE7950-7262-4200-6969-" + ("000000000000" + n).slice(-12) + "}",
          userId: r,
          providerId: "None",
        }),
      );
    }),
    t.push("</personList>"),
    t.join("")
  );
}
function zf(e) {
  var t = {};
  t.iauthor = e.read_shift(4);
  var r = Xt(e);
  return ((t.rfx = r.s), (t.ref = Ke(r.s)), (e.l += 16), t);
}
function Xf(e, t) {
  return (
    t == null && (t = W(36)),
    t.write_shift(4, e[1].iauthor),
    un(e[0], t),
    t.write_shift(4, 0),
    t.write_shift(4, 0),
    t.write_shift(4, 0),
    t.write_shift(4, 0),
    t
  );
}
var Kf = Vr;
function qf(e) {
  return Dr(e.slice(0, 54));
}
function Jf(e) {
  var t = Xr(),
    r = [];
  return (
    K(t, 628),
    K(t, 630),
    e.forEach(function (n) {
      n[1].forEach(function (a) {
        r.indexOf(a.a) > -1 || (r.push(a.a.slice(0, 54)), K(t, 632, qf(a.a)));
      });
    }),
    K(t, 631),
    K(t, 633),
    e.forEach(function (n) {
      n[1].forEach(function (a) {
        a.iauthor = r.indexOf(a.a);
        var i = { s: kr(n[0]), e: kr(n[0]) };
        (K(t, 635, Xf([i, a])),
          a.t && a.t.length > 0 && K(t, 637, Ql(a)),
          K(t, 636),
          delete a.iauthor);
      });
    }),
    K(t, 634),
    K(t, 629),
    t.end()
  );
}
function Qf(e, t) {
  t.FullPaths.forEach(function (r, n) {
    if (n != 0) {
      var a = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
      a.slice(-1) !== "/" && rr.utils.cfb_add(e, a, t.FileIndex[n].content);
    }
  });
}
var W0 = ["xlsb", "xlsm", "xlam", "biff8", "xla"],
  Zf = (function () {
    var e =
        /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g,
      t = { r: 0, c: 0 };
    function r(n, a, i, s) {
      var o = !1,
        c = !1;
      (i.length == 0
        ? (c = !0)
        : i.charAt(0) == "[" && ((c = !0), (i = i.slice(1, -1))),
        s.length == 0
          ? (o = !0)
          : s.charAt(0) == "[" && ((o = !0), (s = s.slice(1, -1))));
      var l = i.length > 0 ? parseInt(i, 10) | 0 : 0,
        f = s.length > 0 ? parseInt(s, 10) | 0 : 0;
      return (
        o ? (f += t.c) : --f,
        c ? (l += t.r) : --l,
        a + (o ? "" : "$") + Wr(f) + (c ? "" : "$") + Br(l)
      );
    }
    return function (a, i) {
      return ((t = i), a.replace(e, r));
    };
  })(),
  mi =
    /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g,
  gi = (function () {
    return function (t, r) {
      return t.replace(mi, function (n, a, i, s, o, c) {
        var l = fi(s) - (i ? 0 : r.c),
          f = ci(c) - (o ? 0 : r.r),
          m = f == 0 ? "" : o ? f + 1 : "[" + f + "]",
          p = l == 0 ? "" : i ? l + 1 : "[" + l + "]";
        return a + "R" + m + "C" + p;
      });
    };
  })();
function eu(e, t) {
  return e.replace(mi, function (r, n, a, i, s, o) {
    return (
      n +
      (a == "$" ? a + i : Wr(fi(i) + t.c)) +
      (s == "$" ? s + o : Br(ci(o) + t.r))
    );
  });
}
function ru(e) {
  return e.length != 1;
}
function Tr(e) {
  e.l += 1;
}
function Rt(e, t) {
  var r = e.read_shift(2);
  return [r & 16383, (r >> 14) & 1, (r >> 15) & 1];
}
function V0(e, t, r) {
  var n = 2;
  if (r) {
    if (r.biff >= 2 && r.biff <= 5) return H0(e);
    r.biff == 12 && (n = 4);
  }
  var a = e.read_shift(n),
    i = e.read_shift(n),
    s = Rt(e),
    o = Rt(e);
  return {
    s: { r: a, c: s[0], cRel: s[1], rRel: s[2] },
    e: { r: i, c: o[0], cRel: o[1], rRel: o[2] },
  };
}
function H0(e) {
  var t = Rt(e),
    r = Rt(e),
    n = e.read_shift(1),
    a = e.read_shift(1);
  return {
    s: { r: t[0], c: n, cRel: t[1], rRel: t[2] },
    e: { r: r[0], c: a, cRel: r[1], rRel: r[2] },
  };
}
function tu(e, t, r) {
  if (r.biff < 8) return H0(e);
  var n = e.read_shift(r.biff == 12 ? 4 : 2),
    a = e.read_shift(r.biff == 12 ? 4 : 2),
    i = Rt(e),
    s = Rt(e);
  return {
    s: { r: n, c: i[0], cRel: i[1], rRel: i[2] },
    e: { r: a, c: s[0], cRel: s[1], rRel: s[2] },
  };
}
function G0(e, t, r) {
  if (r && r.biff >= 2 && r.biff <= 5) return nu(e);
  var n = e.read_shift(r && r.biff == 12 ? 4 : 2),
    a = Rt(e);
  return { r: n, c: a[0], cRel: a[1], rRel: a[2] };
}
function nu(e) {
  var t = Rt(e),
    r = e.read_shift(1);
  return { r: t[0], c: r, cRel: t[1], rRel: t[2] };
}
function au(e) {
  var t = e.read_shift(2),
    r = e.read_shift(2);
  return {
    r: t,
    c: r & 255,
    fQuoted: !!(r & 16384),
    cRel: r >> 15,
    rRel: r >> 15,
  };
}
function iu(e, t, r) {
  var n = r && r.biff ? r.biff : 8;
  if (n >= 2 && n <= 5) return su(e);
  var a = e.read_shift(n >= 12 ? 4 : 2),
    i = e.read_shift(2),
    s = (i & 16384) >> 14,
    o = (i & 32768) >> 15;
  if (((i &= 16383), o == 1)) for (; a > 524287;) a -= 1048576;
  if (s == 1) for (; i > 8191;) i = i - 16384;
  return { r: a, c: i, cRel: s, rRel: o };
}
function su(e) {
  var t = e.read_shift(2),
    r = e.read_shift(1),
    n = (t & 32768) >> 15,
    a = (t & 16384) >> 14;
  return (
    (t &= 16383),
    n == 1 && t >= 8192 && (t = t - 16384),
    a == 1 && r >= 128 && (r = r - 256),
    { r: t, c: r, cRel: a, rRel: n }
  );
}
function ou(e, t, r) {
  var n = (e[e.l++] & 96) >> 5,
    a = V0(e, r.biff >= 2 && r.biff <= 5 ? 6 : 8, r);
  return [n, a];
}
function lu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5,
    a = e.read_shift(2, "i"),
    i = 8;
  if (r)
    switch (r.biff) {
      case 5:
        ((e.l += 12), (i = 6));
        break;
      case 12:
        i = 12;
        break;
    }
  var s = V0(e, i, r);
  return [n, a, s];
}
function cu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return ((e.l += r && r.biff > 8 ? 12 : r.biff < 8 ? 6 : 8), [n]);
}
function fu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5,
    a = e.read_shift(2),
    i = 8;
  if (r)
    switch (r.biff) {
      case 5:
        ((e.l += 12), (i = 6));
        break;
      case 12:
        i = 12;
        break;
    }
  return ((e.l += i), [n, a]);
}
function uu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5,
    a = tu(e, t - 1, r);
  return [n, a];
}
function hu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5;
  return ((e.l += r.biff == 2 ? 6 : r.biff == 12 ? 14 : 7), [n]);
}
function os(e) {
  var t = e[e.l + 1] & 1,
    r = 1;
  return ((e.l += 4), [t, r]);
}
function du(e, t, r) {
  e.l += 2;
  for (
    var n = e.read_shift(r && r.biff == 2 ? 1 : 2), a = [], i = 0;
    i <= n;
    ++i
  )
    a.push(e.read_shift(r && r.biff == 2 ? 1 : 2));
  return a;
}
function xu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return ((e.l += 2), [n, e.read_shift(r && r.biff == 2 ? 1 : 2)]);
}
function pu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return ((e.l += 2), [n, e.read_shift(r && r.biff == 2 ? 1 : 2)]);
}
function mu(e) {
  var t = e[e.l + 1] & 255 ? 1 : 0;
  return ((e.l += 2), [t, e.read_shift(2)]);
}
function gu(e, t, r) {
  var n = e[e.l + 1] & 255 ? 1 : 0;
  return ((e.l += r && r.biff == 2 ? 3 : 4), [n]);
}
function $0(e) {
  var t = e.read_shift(1),
    r = e.read_shift(1);
  return [t, r];
}
function vu(e) {
  return (e.read_shift(2), $0(e));
}
function _u(e) {
  return (e.read_shift(2), $0(e));
}
function Tu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = G0(e, 0, r);
  return [n, a];
}
function Eu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = iu(e, 0, r);
  return [n, a];
}
function Su(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(2);
  r && r.biff == 5 && (e.l += 12);
  var i = G0(e, 0, r);
  return [n, a, i];
}
function wu(e, t, r) {
  var n = (e[e.l] & 96) >> 5;
  e.l += 1;
  var a = e.read_shift(r && r.biff <= 3 ? 1 : 2);
  return [wh[a], X0[a], n];
}
function Au(e, t, r) {
  var n = e[e.l++],
    a = e.read_shift(1),
    i = r && r.biff <= 3 ? [n == 88 ? -1 : 0, e.read_shift(1)] : yu(e);
  return [a, (i[0] === 0 ? X0 : Sh)[i[1]]];
}
function yu(e) {
  return [e[e.l + 1] >> 7, e.read_shift(2) & 32767];
}
function Cu(e, t, r) {
  e.l += r && r.biff == 2 ? 3 : 4;
}
function Fu(e, t, r) {
  if ((e.l++, r && r.biff == 12)) return [e.read_shift(4, "i"), 0];
  var n = e.read_shift(2),
    a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function bu(e) {
  return (e.l++, $n[e.read_shift(1)]);
}
function ku(e) {
  return (e.l++, e.read_shift(2));
}
function Du(e) {
  return (e.l++, e.read_shift(1) !== 0);
}
function Nu(e) {
  return (e.l++, hn(e));
}
function Pu(e, t, r) {
  return (e.l++, F0(e, t - 1, r));
}
function Ou(e, t) {
  var r = [e.read_shift(1)];
  if (t == 12)
    switch (r[0]) {
      case 2:
        r[0] = 4;
        break;
      case 4:
        r[0] = 16;
        break;
      case 0:
        r[0] = 1;
        break;
      case 1:
        r[0] = 2;
        break;
    }
  switch (r[0]) {
    case 4:
      ((r[1] = Ec(e, 1) ? "TRUE" : "FALSE"), t != 12 && (e.l += 7));
      break;
    case 37:
    case 16:
      ((r[1] = $n[e[e.l]]), (e.l += t == 12 ? 4 : 8));
      break;
    case 0:
      e.l += 8;
      break;
    case 1:
      r[1] = hn(e);
      break;
    case 2:
      r[1] = yc(e, 0, { biff: t > 0 && t < 8 ? 2 : t });
      break;
    default:
      throw new Error("Bad SerAr: " + r[0]);
  }
  return r;
}
function Ru(e, t, r) {
  for (var n = e.read_shift(r.biff == 12 ? 4 : 2), a = [], i = 0; i != n; ++i)
    a.push((r.biff == 12 ? Xt : bc)(e));
  return a;
}
function Iu(e, t, r) {
  var n = 0,
    a = 0;
  (r.biff == 12
    ? ((n = e.read_shift(4)), (a = e.read_shift(4)))
    : ((a = 1 + e.read_shift(1)), (n = 1 + e.read_shift(2))),
    r.biff >= 2 && r.biff < 8 && (--n, --a == 0 && (a = 256)));
  for (var i = 0, s = []; i != n && (s[i] = []); ++i)
    for (var o = 0; o != a; ++o) s[i][o] = Ou(e, r.biff);
  return s;
}
function Lu(e, t, r) {
  var n = (e.read_shift(1) >>> 5) & 3,
    a = !r || r.biff >= 8 ? 4 : 2,
    i = e.read_shift(a);
  switch (r.biff) {
    case 2:
      e.l += 5;
      break;
    case 3:
    case 4:
      e.l += 8;
      break;
    case 5:
      e.l += 12;
      break;
  }
  return [n, 0, i];
}
function Mu(e, t, r) {
  if (r.biff == 5) return Bu(e);
  var n = (e.read_shift(1) >>> 5) & 3,
    a = e.read_shift(2),
    i = e.read_shift(4);
  return [n, a, i];
}
function Bu(e) {
  var t = (e.read_shift(1) >>> 5) & 3,
    r = e.read_shift(2, "i");
  e.l += 8;
  var n = e.read_shift(2);
  return ((e.l += 12), [t, r, n]);
}
function ju(e, t, r) {
  var n = (e.read_shift(1) >>> 5) & 3;
  e.l += r && r.biff == 2 ? 3 : 4;
  var a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Uu(e, t, r) {
  var n = (e.read_shift(1) >>> 5) & 3,
    a = e.read_shift(r && r.biff == 2 ? 1 : 2);
  return [n, a];
}
function Wu(e, t, r) {
  var n = (e.read_shift(1) >>> 5) & 3;
  return ((e.l += 4), r.biff < 8 && e.l--, r.biff == 12 && (e.l += 2), [n]);
}
function Vu(e, t, r) {
  var n = (e[e.l++] & 96) >> 5,
    a = e.read_shift(2),
    i = 4;
  if (r)
    switch (r.biff) {
      case 5:
        i = 15;
        break;
      case 12:
        i = 6;
        break;
    }
  return ((e.l += i), [n, a]);
}
var Hu = vt,
  Gu = vt,
  $u = vt;
function Yn(e, t, r) {
  return ((e.l += 2), [au(e)]);
}
function vi(e) {
  return ((e.l += 6), []);
}
var Yu = Yn,
  zu = vi,
  Xu = vi,
  Ku = Yn;
function Y0(e) {
  return ((e.l += 2), [y0(e), e.read_shift(2) & 1]);
}
var qu = Yn,
  Ju = Y0,
  Qu = vi,
  Zu = Yn,
  eh = Yn,
  rh = [
    "Data",
    "All",
    "Headers",
    "??",
    "?Data2",
    "??",
    "?DataHeaders",
    "??",
    "Totals",
    "??",
    "??",
    "??",
    "?DataTotals",
    "??",
    "??",
    "??",
    "?Current",
  ];
function th(e) {
  e.l += 2;
  var t = e.read_shift(2),
    r = e.read_shift(2),
    n = e.read_shift(4),
    a = e.read_shift(2),
    i = e.read_shift(2),
    s = rh[(r >> 2) & 31];
  return { ixti: t, coltype: r & 3, rt: s, idx: n, c: a, C: i };
}
function nh(e) {
  return ((e.l += 2), [e.read_shift(4)]);
}
function ah(e, t, r) {
  return ((e.l += 5), (e.l += 2), (e.l += r.biff == 2 ? 1 : 4), ["PTGSHEET"]);
}
function ih(e, t, r) {
  return ((e.l += r.biff == 2 ? 4 : 5), ["PTGENDSHEET"]);
}
function sh(e) {
  var t = (e.read_shift(1) >>> 5) & 3,
    r = e.read_shift(2);
  return [t, r];
}
function oh(e) {
  var t = (e.read_shift(1) >>> 5) & 3,
    r = e.read_shift(2);
  return [t, r];
}
function lh(e) {
  return ((e.l += 4), [0, 0]);
}
var ls = {
    1: { n: "PtgExp", f: Fu },
    2: { n: "PtgTbl", f: $u },
    3: { n: "PtgAdd", f: Tr },
    4: { n: "PtgSub", f: Tr },
    5: { n: "PtgMul", f: Tr },
    6: { n: "PtgDiv", f: Tr },
    7: { n: "PtgPower", f: Tr },
    8: { n: "PtgConcat", f: Tr },
    9: { n: "PtgLt", f: Tr },
    10: { n: "PtgLe", f: Tr },
    11: { n: "PtgEq", f: Tr },
    12: { n: "PtgGe", f: Tr },
    13: { n: "PtgGt", f: Tr },
    14: { n: "PtgNe", f: Tr },
    15: { n: "PtgIsect", f: Tr },
    16: { n: "PtgUnion", f: Tr },
    17: { n: "PtgRange", f: Tr },
    18: { n: "PtgUplus", f: Tr },
    19: { n: "PtgUminus", f: Tr },
    20: { n: "PtgPercent", f: Tr },
    21: { n: "PtgParen", f: Tr },
    22: { n: "PtgMissArg", f: Tr },
    23: { n: "PtgStr", f: Pu },
    26: { n: "PtgSheet", f: ah },
    27: { n: "PtgEndSheet", f: ih },
    28: { n: "PtgErr", f: bu },
    29: { n: "PtgBool", f: Du },
    30: { n: "PtgInt", f: ku },
    31: { n: "PtgNum", f: Nu },
    32: { n: "PtgArray", f: hu },
    33: { n: "PtgFunc", f: wu },
    34: { n: "PtgFuncVar", f: Au },
    35: { n: "PtgName", f: Lu },
    36: { n: "PtgRef", f: Tu },
    37: { n: "PtgArea", f: ou },
    38: { n: "PtgMemArea", f: ju },
    39: { n: "PtgMemErr", f: Hu },
    40: { n: "PtgMemNoMem", f: Gu },
    41: { n: "PtgMemFunc", f: Uu },
    42: { n: "PtgRefErr", f: Wu },
    43: { n: "PtgAreaErr", f: cu },
    44: { n: "PtgRefN", f: Eu },
    45: { n: "PtgAreaN", f: uu },
    46: { n: "PtgMemAreaN", f: sh },
    47: { n: "PtgMemNoMemN", f: oh },
    57: { n: "PtgNameX", f: Mu },
    58: { n: "PtgRef3d", f: Su },
    59: { n: "PtgArea3d", f: lu },
    60: { n: "PtgRefErr3d", f: Vu },
    61: { n: "PtgAreaErr3d", f: fu },
    255: {},
  },
  ch = {
    64: 32,
    96: 32,
    65: 33,
    97: 33,
    66: 34,
    98: 34,
    67: 35,
    99: 35,
    68: 36,
    100: 36,
    69: 37,
    101: 37,
    70: 38,
    102: 38,
    71: 39,
    103: 39,
    72: 40,
    104: 40,
    73: 41,
    105: 41,
    74: 42,
    106: 42,
    75: 43,
    107: 43,
    76: 44,
    108: 44,
    77: 45,
    109: 45,
    78: 46,
    110: 46,
    79: 47,
    111: 47,
    88: 34,
    120: 34,
    89: 57,
    121: 57,
    90: 58,
    122: 58,
    91: 59,
    123: 59,
    92: 60,
    124: 60,
    93: 61,
    125: 61,
  },
  fh = {
    1: { n: "PtgElfLel", f: Y0 },
    2: { n: "PtgElfRw", f: Zu },
    3: { n: "PtgElfCol", f: Yu },
    6: { n: "PtgElfRwV", f: eh },
    7: { n: "PtgElfColV", f: Ku },
    10: { n: "PtgElfRadical", f: qu },
    11: { n: "PtgElfRadicalS", f: Qu },
    13: { n: "PtgElfColS", f: zu },
    15: { n: "PtgElfColSV", f: Xu },
    16: { n: "PtgElfRadicalLel", f: Ju },
    25: { n: "PtgList", f: th },
    29: { n: "PtgSxName", f: nh },
    255: {},
  },
  uh = {
    0: { n: "PtgAttrNoop", f: lh },
    1: { n: "PtgAttrSemi", f: gu },
    2: { n: "PtgAttrIf", f: pu },
    4: { n: "PtgAttrChoose", f: du },
    8: { n: "PtgAttrGoto", f: xu },
    16: { n: "PtgAttrSum", f: Cu },
    32: { n: "PtgAttrBaxcel", f: os },
    33: { n: "PtgAttrBaxcel", f: os },
    64: { n: "PtgAttrSpace", f: vu },
    65: { n: "PtgAttrSpaceSemi", f: _u },
    128: { n: "PtgAttrIfError", f: mu },
    255: {},
  };
function hh(e, t, r, n) {
  if (n.biff < 8) return vt(e, t);
  for (var a = e.l + t, i = [], s = 0; s !== r.length; ++s)
    switch (r[s][0]) {
      case "PtgArray":
        ((r[s][1] = Iu(e, 0, n)), i.push(r[s][1]));
        break;
      case "PtgMemArea":
        ((r[s][2] = Ru(e, r[s][1], n)), i.push(r[s][2]));
        break;
      case "PtgExp":
        n && n.biff == 12 && ((r[s][1][1] = e.read_shift(4)), i.push(r[s][1]));
        break;
      case "PtgList":
      case "PtgElfRadicalS":
      case "PtgElfColS":
      case "PtgElfColSV":
        throw "Unsupported " + r[s][0];
    }
  return ((t = a - e.l), t !== 0 && i.push(vt(e, t)), i);
}
function dh(e, t, r) {
  for (var n = e.l + t, a, i, s = []; n != e.l;)
    ((t = n - e.l),
      (i = e[e.l]),
      (a = ls[i] || ls[ch[i]]),
      (i === 24 || i === 25) && (a = (i === 24 ? fh : uh)[e[e.l + 1]]),
      !a || !a.f ? vt(e, t) : s.push([a.n, a.f(e, t, r)]));
  return s;
}
function xh(e) {
  for (var t = [], r = 0; r < e.length; ++r) {
    for (var n = e[r], a = [], i = 0; i < n.length; ++i) {
      var s = n[i];
      if (s)
        switch (s[0]) {
          case 2:
            a.push('"' + s[1].replace(/"/g, '""') + '"');
            break;
          default:
            a.push(s[1]);
        }
      else a.push("");
    }
    t.push(a.join(","));
  }
  return t.join(";");
}
var ph = {
  PtgAdd: "+",
  PtgConcat: "&",
  PtgDiv: "/",
  PtgEq: "=",
  PtgGe: ">=",
  PtgGt: ">",
  PtgLe: "<=",
  PtgLt: "<",
  PtgMul: "*",
  PtgNe: "<>",
  PtgPower: "^",
  PtgSub: "-",
};
function mh(e, t) {
  if (!e && !(t && t.biff <= 5 && t.biff >= 2))
    throw new Error("empty sheet name");
  return /[^\w\u4E00-\u9FFF\u3040-\u30FF]/.test(e) ? "'" + e + "'" : e;
}
function z0(e, t, r) {
  if (!e) return "SH33TJSERR0";
  if (r.biff > 8 && (!e.XTI || !e.XTI[t])) return e.SheetNames[t];
  if (!e.XTI) return "SH33TJSERR6";
  var n = e.XTI[t];
  if (r.biff < 8)
    return (
      t > 1e4 && (t -= 65536),
      t < 0 && (t = -t),
      t == 0 ? "" : e.XTI[t - 1]
    );
  if (!n) return "SH33TJSERR1";
  var a = "";
  if (r.biff > 8)
    switch (e[n[0]][0]) {
      case 357:
        return (
          (a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]]),
          n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]]
        );
      case 358:
        return r.SID != null ? e.SheetNames[r.SID] : "SH33TJSSAME" + e[n[0]][0];
      case 355:
      default:
        return "SH33TJSSRC" + e[n[0]][0];
    }
  switch (e[n[0]][0][0]) {
    case 1025:
      return (
        (a = n[1] == -1 ? "#REF" : e.SheetNames[n[1]] || "SH33TJSERR3"),
        n[1] == n[2] ? a : a + ":" + e.SheetNames[n[2]]
      );
    case 14849:
      return e[n[0]]
        .slice(1)
        .map(function (i) {
          return i.Name;
        })
        .join(";;");
    default:
      return e[n[0]][0][3]
        ? ((a = n[1] == -1 ? "#REF" : e[n[0]][0][3][n[1]] || "SH33TJSERR4"),
          n[1] == n[2] ? a : a + ":" + e[n[0]][0][3][n[2]])
        : "SH33TJSERR2";
  }
}
function cs(e, t, r) {
  var n = z0(e, t, r);
  return n == "#REF" ? n : mh(n, r);
}
function ln(e, t, r, n, a) {
  var i = (a && a.biff) || 8,
    s = { s: { c: 0, r: 0 } },
    o = [],
    c,
    l,
    f,
    m = 0,
    p = 0,
    d,
    _ = "";
  if (!e[0] || !e[0][0]) return "";
  for (var h = -1, x = "", C = 0, F = e[0].length; C < F; ++C) {
    var y = e[0][C];
    switch (y[0]) {
      case "PtgUminus":
        o.push("-" + o.pop());
        break;
      case "PtgUplus":
        o.push("+" + o.pop());
        break;
      case "PtgPercent":
        o.push(o.pop() + "%");
        break;
      case "PtgAdd":
      case "PtgConcat":
      case "PtgDiv":
      case "PtgEq":
      case "PtgGe":
      case "PtgGt":
      case "PtgLe":
      case "PtgLt":
      case "PtgMul":
      case "PtgNe":
      case "PtgPower":
      case "PtgSub":
        if (((c = o.pop()), (l = o.pop()), h >= 0)) {
          switch (e[0][h][1][0]) {
            case 0:
              x = mr(" ", e[0][h][1][1]);
              break;
            case 1:
              x = mr("\r", e[0][h][1][1]);
              break;
            default:
              if (((x = ""), a.WTF))
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          ((l = l + x), (h = -1));
        }
        o.push(l + ph[y[0]] + c);
        break;
      case "PtgIsect":
        ((c = o.pop()), (l = o.pop()), o.push(l + " " + c));
        break;
      case "PtgUnion":
        ((c = o.pop()), (l = o.pop()), o.push(l + "," + c));
        break;
      case "PtgRange":
        ((c = o.pop()), (l = o.pop()), o.push(l + ":" + c));
        break;
      case "PtgAttrChoose":
        break;
      case "PtgAttrGoto":
        break;
      case "PtgAttrIf":
        break;
      case "PtgAttrIfError":
        break;
      case "PtgRef":
        ((f = yn(y[1][1], s, a)), o.push(Cn(f, i)));
        break;
      case "PtgRefN":
        ((f = r ? yn(y[1][1], r, a) : y[1][1]), o.push(Cn(f, i)));
        break;
      case "PtgRef3d":
        ((m = y[1][1]),
          (f = yn(y[1][2], s, a)),
          (_ = cs(n, m, a)),
          o.push(_ + "!" + Cn(f, i)));
        break;
      case "PtgFunc":
      case "PtgFuncVar":
        var P = y[1][0],
          G = y[1][1];
        (P || (P = 0), (P &= 127));
        var Q = P == 0 ? [] : o.slice(-P);
        ((o.length -= P),
          G === "User" && (G = Q.shift()),
          o.push(G + "(" + Q.join(",") + ")"));
        break;
      case "PtgBool":
        o.push(y[1] ? "TRUE" : "FALSE");
        break;
      case "PtgInt":
        o.push(y[1]);
        break;
      case "PtgNum":
        o.push(String(y[1]));
        break;
      case "PtgStr":
        o.push('"' + y[1].replace(/"/g, '""') + '"');
        break;
      case "PtgErr":
        o.push(y[1]);
        break;
      case "PtgAreaN":
        ((d = zi(y[1][1], r ? { s: r } : s, a)), o.push(Ma(d, a)));
        break;
      case "PtgArea":
        ((d = zi(y[1][1], s, a)), o.push(Ma(d, a)));
        break;
      case "PtgArea3d":
        ((m = y[1][1]),
          (d = y[1][2]),
          (_ = cs(n, m, a)),
          o.push(_ + "!" + Ma(d, a)));
        break;
      case "PtgAttrSum":
        o.push("SUM(" + o.pop() + ")");
        break;
      case "PtgAttrBaxcel":
      case "PtgAttrSemi":
        break;
      case "PtgName":
        p = y[1][2];
        var k = (n.names || [])[p - 1] || (n[0] || [])[p],
          j = k ? k.Name : "SH33TJSNAME" + String(p);
        (j && j.slice(0, 6) == "_xlfn." && !a.xlfn && (j = j.slice(6)),
          o.push(j));
        break;
      case "PtgNameX":
        var N = y[1][1];
        p = y[1][2];
        var V;
        if (a.biff <= 5) (N < 0 && (N = -N), n[N] && (V = n[N][p]));
        else {
          var H = "";
          if (
            (((n[N] || [])[0] || [])[0] == 14849 ||
              (((n[N] || [])[0] || [])[0] == 1025
                ? n[N][p] &&
                  n[N][p].itab > 0 &&
                  (H = n.SheetNames[n[N][p].itab - 1] + "!")
                : (H = n.SheetNames[p - 1] + "!")),
            n[N] && n[N][p])
          )
            H += n[N][p].Name;
          else if (n[0] && n[0][p]) H += n[0][p].Name;
          else {
            var Y = (z0(n, N, a) || "").split(";;");
            Y[p - 1] ? (H = Y[p - 1]) : (H += "SH33TJSERRX");
          }
          o.push(H);
          break;
        }
        (V || (V = { Name: "SH33TJSERRY" }), o.push(V.Name));
        break;
      case "PtgParen":
        var Z = "(",
          Te = ")";
        if (h >= 0) {
          switch (((x = ""), e[0][h][1][0])) {
            case 2:
              Z = mr(" ", e[0][h][1][1]) + Z;
              break;
            case 3:
              Z = mr("\r", e[0][h][1][1]) + Z;
              break;
            case 4:
              Te = mr(" ", e[0][h][1][1]) + Te;
              break;
            case 5:
              Te = mr("\r", e[0][h][1][1]) + Te;
              break;
            default:
              if (a.WTF)
                throw new Error("Unexpected PtgAttrSpaceType " + e[0][h][1][0]);
          }
          h = -1;
        }
        o.push(Z + o.pop() + Te);
        break;
      case "PtgRefErr":
        o.push("#REF!");
        break;
      case "PtgRefErr3d":
        o.push("#REF!");
        break;
      case "PtgExp":
        f = { c: y[1][1], r: y[1][0] };
        var he = { c: r.c, r: r.r };
        if (n.sharedf[Ke(f)]) {
          var le = n.sharedf[Ke(f)];
          o.push(ln(le, s, he, n, a));
        } else {
          var _e = !1;
          for (c = 0; c != n.arrayf.length; ++c)
            if (
              ((l = n.arrayf[c]),
              !(f.c < l[0].s.c || f.c > l[0].e.c) &&
                !(f.r < l[0].s.r || f.r > l[0].e.r))
            ) {
              (o.push(ln(l[1], s, he, n, a)), (_e = !0));
              break;
            }
          _e || o.push(y[1]);
        }
        break;
      case "PtgArray":
        o.push("{" + xh(y[1]) + "}");
        break;
      case "PtgMemArea":
        break;
      case "PtgAttrSpace":
      case "PtgAttrSpaceSemi":
        h = C;
        break;
      case "PtgTbl":
        break;
      case "PtgMemErr":
        break;
      case "PtgMissArg":
        o.push("");
        break;
      case "PtgAreaErr":
        o.push("#REF!");
        break;
      case "PtgAreaErr3d":
        o.push("#REF!");
        break;
      case "PtgList":
        o.push("Table" + y[1].idx + "[#" + y[1].rt + "]");
        break;
      case "PtgMemAreaN":
      case "PtgMemNoMemN":
      case "PtgAttrNoop":
      case "PtgSheet":
      case "PtgEndSheet":
        break;
      case "PtgMemFunc":
        break;
      case "PtgMemNoMem":
        break;
      case "PtgElfCol":
      case "PtgElfColS":
      case "PtgElfColSV":
      case "PtgElfColV":
      case "PtgElfLel":
      case "PtgElfRadical":
      case "PtgElfRadicalLel":
      case "PtgElfRadicalS":
      case "PtgElfRw":
      case "PtgElfRwV":
        throw new Error("Unsupported ELFs");
      case "PtgSxName":
        throw new Error("Unrecognized Formula Token: " + String(y));
      default:
        throw new Error("Unrecognized Formula Token: " + String(y));
    }
    var ye = ["PtgAttrSpace", "PtgAttrSpaceSemi", "PtgAttrGoto"];
    if (a.biff != 3 && h >= 0 && ye.indexOf(e[0][C][0]) == -1) {
      y = e[0][h];
      var Be = !0;
      switch (y[1][0]) {
        case 4:
          Be = !1;
        case 0:
          x = mr(" ", y[1][1]);
          break;
        case 5:
          Be = !1;
        case 1:
          x = mr("\r", y[1][1]);
          break;
        default:
          if (((x = ""), a.WTF))
            throw new Error("Unexpected PtgAttrSpaceType " + y[1][0]);
      }
      (o.push((Be ? x : "") + o.pop() + (Be ? "" : x)), (h = -1));
    }
  }
  if (o.length > 1 && a.WTF) throw new Error("bad formula stack");
  return o[0];
}
function gh(e) {
  if (e == null) {
    var t = W(8);
    return (
      t.write_shift(1, 3),
      t.write_shift(1, 0),
      t.write_shift(2, 0),
      t.write_shift(2, 0),
      t.write_shift(2, 65535),
      t
    );
  } else if (typeof e == "number") return Wt(e);
  return Wt(0);
}
function vh(e, t, r, n, a) {
  var i = Vt(t, r, a),
    s = gh(e.v),
    o = W(6),
    c = 33;
  (o.write_shift(2, c), o.write_shift(4, 0));
  for (var l = W(e.bf.length), f = 0; f < e.bf.length; ++f) l[f] = e.bf[f];
  var m = Lr([i, s, o, l]);
  return m;
}
function Da(e, t, r) {
  var n = e.read_shift(4),
    a = dh(e, n, r),
    i = e.read_shift(4),
    s = i > 0 ? hh(e, i, a, r) : null;
  return [a, s];
}
var _h = Da,
  Na = Da,
  Th = Da,
  Eh = Da,
  Sh = {
    0: "BEEP",
    1: "OPEN",
    2: "OPEN.LINKS",
    3: "CLOSE.ALL",
    4: "SAVE",
    5: "SAVE.AS",
    6: "FILE.DELETE",
    7: "PAGE.SETUP",
    8: "PRINT",
    9: "PRINTER.SETUP",
    10: "QUIT",
    11: "NEW.WINDOW",
    12: "ARRANGE.ALL",
    13: "WINDOW.SIZE",
    14: "WINDOW.MOVE",
    15: "FULL",
    16: "CLOSE",
    17: "RUN",
    22: "SET.PRINT.AREA",
    23: "SET.PRINT.TITLES",
    24: "SET.PAGE.BREAK",
    25: "REMOVE.PAGE.BREAK",
    26: "FONT",
    27: "DISPLAY",
    28: "PROTECT.DOCUMENT",
    29: "PRECISION",
    30: "A1.R1C1",
    31: "CALCULATE.NOW",
    32: "CALCULATION",
    34: "DATA.FIND",
    35: "EXTRACT",
    36: "DATA.DELETE",
    37: "SET.DATABASE",
    38: "SET.CRITERIA",
    39: "SORT",
    40: "DATA.SERIES",
    41: "TABLE",
    42: "FORMAT.NUMBER",
    43: "ALIGNMENT",
    44: "STYLE",
    45: "BORDER",
    46: "CELL.PROTECTION",
    47: "COLUMN.WIDTH",
    48: "UNDO",
    49: "CUT",
    50: "COPY",
    51: "PASTE",
    52: "CLEAR",
    53: "PASTE.SPECIAL",
    54: "EDIT.DELETE",
    55: "INSERT",
    56: "FILL.RIGHT",
    57: "FILL.DOWN",
    61: "DEFINE.NAME",
    62: "CREATE.NAMES",
    63: "FORMULA.GOTO",
    64: "FORMULA.FIND",
    65: "SELECT.LAST.CELL",
    66: "SHOW.ACTIVE.CELL",
    67: "GALLERY.AREA",
    68: "GALLERY.BAR",
    69: "GALLERY.COLUMN",
    70: "GALLERY.LINE",
    71: "GALLERY.PIE",
    72: "GALLERY.SCATTER",
    73: "COMBINATION",
    74: "PREFERRED",
    75: "ADD.OVERLAY",
    76: "GRIDLINES",
    77: "SET.PREFERRED",
    78: "AXES",
    79: "LEGEND",
    80: "ATTACH.TEXT",
    81: "ADD.ARROW",
    82: "SELECT.CHART",
    83: "SELECT.PLOT.AREA",
    84: "PATTERNS",
    85: "MAIN.CHART",
    86: "OVERLAY",
    87: "SCALE",
    88: "FORMAT.LEGEND",
    89: "FORMAT.TEXT",
    90: "EDIT.REPEAT",
    91: "PARSE",
    92: "JUSTIFY",
    93: "HIDE",
    94: "UNHIDE",
    95: "WORKSPACE",
    96: "FORMULA",
    97: "FORMULA.FILL",
    98: "FORMULA.ARRAY",
    99: "DATA.FIND.NEXT",
    100: "DATA.FIND.PREV",
    101: "FORMULA.FIND.NEXT",
    102: "FORMULA.FIND.PREV",
    103: "ACTIVATE",
    104: "ACTIVATE.NEXT",
    105: "ACTIVATE.PREV",
    106: "UNLOCKED.NEXT",
    107: "UNLOCKED.PREV",
    108: "COPY.PICTURE",
    109: "SELECT",
    110: "DELETE.NAME",
    111: "DELETE.FORMAT",
    112: "VLINE",
    113: "HLINE",
    114: "VPAGE",
    115: "HPAGE",
    116: "VSCROLL",
    117: "HSCROLL",
    118: "ALERT",
    119: "NEW",
    120: "CANCEL.COPY",
    121: "SHOW.CLIPBOARD",
    122: "MESSAGE",
    124: "PASTE.LINK",
    125: "APP.ACTIVATE",
    126: "DELETE.ARROW",
    127: "ROW.HEIGHT",
    128: "FORMAT.MOVE",
    129: "FORMAT.SIZE",
    130: "FORMULA.REPLACE",
    131: "SEND.KEYS",
    132: "SELECT.SPECIAL",
    133: "APPLY.NAMES",
    134: "REPLACE.FONT",
    135: "FREEZE.PANES",
    136: "SHOW.INFO",
    137: "SPLIT",
    138: "ON.WINDOW",
    139: "ON.DATA",
    140: "DISABLE.INPUT",
    142: "OUTLINE",
    143: "LIST.NAMES",
    144: "FILE.CLOSE",
    145: "SAVE.WORKBOOK",
    146: "DATA.FORM",
    147: "COPY.CHART",
    148: "ON.TIME",
    149: "WAIT",
    150: "FORMAT.FONT",
    151: "FILL.UP",
    152: "FILL.LEFT",
    153: "DELETE.OVERLAY",
    155: "SHORT.MENUS",
    159: "SET.UPDATE.STATUS",
    161: "COLOR.PALETTE",
    162: "DELETE.STYLE",
    163: "WINDOW.RESTORE",
    164: "WINDOW.MAXIMIZE",
    166: "CHANGE.LINK",
    167: "CALCULATE.DOCUMENT",
    168: "ON.KEY",
    169: "APP.RESTORE",
    170: "APP.MOVE",
    171: "APP.SIZE",
    172: "APP.MINIMIZE",
    173: "APP.MAXIMIZE",
    174: "BRING.TO.FRONT",
    175: "SEND.TO.BACK",
    185: "MAIN.CHART.TYPE",
    186: "OVERLAY.CHART.TYPE",
    187: "SELECT.END",
    188: "OPEN.MAIL",
    189: "SEND.MAIL",
    190: "STANDARD.FONT",
    191: "CONSOLIDATE",
    192: "SORT.SPECIAL",
    193: "GALLERY.3D.AREA",
    194: "GALLERY.3D.COLUMN",
    195: "GALLERY.3D.LINE",
    196: "GALLERY.3D.PIE",
    197: "VIEW.3D",
    198: "GOAL.SEEK",
    199: "WORKGROUP",
    200: "FILL.GROUP",
    201: "UPDATE.LINK",
    202: "PROMOTE",
    203: "DEMOTE",
    204: "SHOW.DETAIL",
    206: "UNGROUP",
    207: "OBJECT.PROPERTIES",
    208: "SAVE.NEW.OBJECT",
    209: "SHARE",
    210: "SHARE.NAME",
    211: "DUPLICATE",
    212: "APPLY.STYLE",
    213: "ASSIGN.TO.OBJECT",
    214: "OBJECT.PROTECTION",
    215: "HIDE.OBJECT",
    216: "SET.EXTRACT",
    217: "CREATE.PUBLISHER",
    218: "SUBSCRIBE.TO",
    219: "ATTRIBUTES",
    220: "SHOW.TOOLBAR",
    222: "PRINT.PREVIEW",
    223: "EDIT.COLOR",
    224: "SHOW.LEVELS",
    225: "FORMAT.MAIN",
    226: "FORMAT.OVERLAY",
    227: "ON.RECALC",
    228: "EDIT.SERIES",
    229: "DEFINE.STYLE",
    240: "LINE.PRINT",
    243: "ENTER.DATA",
    249: "GALLERY.RADAR",
    250: "MERGE.STYLES",
    251: "EDITION.OPTIONS",
    252: "PASTE.PICTURE",
    253: "PASTE.PICTURE.LINK",
    254: "SPELLING",
    256: "ZOOM",
    259: "INSERT.OBJECT",
    260: "WINDOW.MINIMIZE",
    265: "SOUND.NOTE",
    266: "SOUND.PLAY",
    267: "FORMAT.SHAPE",
    268: "EXTEND.POLYGON",
    269: "FORMAT.AUTO",
    272: "GALLERY.3D.BAR",
    273: "GALLERY.3D.SURFACE",
    274: "FILL.AUTO",
    276: "CUSTOMIZE.TOOLBAR",
    277: "ADD.TOOL",
    278: "EDIT.OBJECT",
    279: "ON.DOUBLECLICK",
    280: "ON.ENTRY",
    281: "WORKBOOK.ADD",
    282: "WORKBOOK.MOVE",
    283: "WORKBOOK.COPY",
    284: "WORKBOOK.OPTIONS",
    285: "SAVE.WORKSPACE",
    288: "CHART.WIZARD",
    289: "DELETE.TOOL",
    290: "MOVE.TOOL",
    291: "WORKBOOK.SELECT",
    292: "WORKBOOK.ACTIVATE",
    293: "ASSIGN.TO.TOOL",
    295: "COPY.TOOL",
    296: "RESET.TOOL",
    297: "CONSTRAIN.NUMERIC",
    298: "PASTE.TOOL",
    302: "WORKBOOK.NEW",
    305: "SCENARIO.CELLS",
    306: "SCENARIO.DELETE",
    307: "SCENARIO.ADD",
    308: "SCENARIO.EDIT",
    309: "SCENARIO.SHOW",
    310: "SCENARIO.SHOW.NEXT",
    311: "SCENARIO.SUMMARY",
    312: "PIVOT.TABLE.WIZARD",
    313: "PIVOT.FIELD.PROPERTIES",
    314: "PIVOT.FIELD",
    315: "PIVOT.ITEM",
    316: "PIVOT.ADD.FIELDS",
    318: "OPTIONS.CALCULATION",
    319: "OPTIONS.EDIT",
    320: "OPTIONS.VIEW",
    321: "ADDIN.MANAGER",
    322: "MENU.EDITOR",
    323: "ATTACH.TOOLBARS",
    324: "VBAActivate",
    325: "OPTIONS.CHART",
    328: "VBA.INSERT.FILE",
    330: "VBA.PROCEDURE.DEFINITION",
    336: "ROUTING.SLIP",
    338: "ROUTE.DOCUMENT",
    339: "MAIL.LOGON",
    342: "INSERT.PICTURE",
    343: "EDIT.TOOL",
    344: "GALLERY.DOUGHNUT",
    350: "CHART.TREND",
    352: "PIVOT.ITEM.PROPERTIES",
    354: "WORKBOOK.INSERT",
    355: "OPTIONS.TRANSITION",
    356: "OPTIONS.GENERAL",
    370: "FILTER.ADVANCED",
    373: "MAIL.ADD.MAILER",
    374: "MAIL.DELETE.MAILER",
    375: "MAIL.REPLY",
    376: "MAIL.REPLY.ALL",
    377: "MAIL.FORWARD",
    378: "MAIL.NEXT.LETTER",
    379: "DATA.LABEL",
    380: "INSERT.TITLE",
    381: "FONT.PROPERTIES",
    382: "MACRO.OPTIONS",
    383: "WORKBOOK.HIDE",
    384: "WORKBOOK.UNHIDE",
    385: "WORKBOOK.DELETE",
    386: "WORKBOOK.NAME",
    388: "GALLERY.CUSTOM",
    390: "ADD.CHART.AUTOFORMAT",
    391: "DELETE.CHART.AUTOFORMAT",
    392: "CHART.ADD.DATA",
    393: "AUTO.OUTLINE",
    394: "TAB.ORDER",
    395: "SHOW.DIALOG",
    396: "SELECT.ALL",
    397: "UNGROUP.SHEETS",
    398: "SUBTOTAL.CREATE",
    399: "SUBTOTAL.REMOVE",
    400: "RENAME.OBJECT",
    412: "WORKBOOK.SCROLL",
    413: "WORKBOOK.NEXT",
    414: "WORKBOOK.PREV",
    415: "WORKBOOK.TAB.SPLIT",
    416: "FULL.SCREEN",
    417: "WORKBOOK.PROTECT",
    420: "SCROLLBAR.PROPERTIES",
    421: "PIVOT.SHOW.PAGES",
    422: "TEXT.TO.COLUMNS",
    423: "FORMAT.CHARTTYPE",
    424: "LINK.FORMAT",
    425: "TRACER.DISPLAY",
    430: "TRACER.NAVIGATE",
    431: "TRACER.CLEAR",
    432: "TRACER.ERROR",
    433: "PIVOT.FIELD.GROUP",
    434: "PIVOT.FIELD.UNGROUP",
    435: "CHECKBOX.PROPERTIES",
    436: "LABEL.PROPERTIES",
    437: "LISTBOX.PROPERTIES",
    438: "EDITBOX.PROPERTIES",
    439: "PIVOT.REFRESH",
    440: "LINK.COMBO",
    441: "OPEN.TEXT",
    442: "HIDE.DIALOG",
    443: "SET.DIALOG.FOCUS",
    444: "ENABLE.OBJECT",
    445: "PUSHBUTTON.PROPERTIES",
    446: "SET.DIALOG.DEFAULT",
    447: "FILTER",
    448: "FILTER.SHOW.ALL",
    449: "CLEAR.OUTLINE",
    450: "FUNCTION.WIZARD",
    451: "ADD.LIST.ITEM",
    452: "SET.LIST.ITEM",
    453: "REMOVE.LIST.ITEM",
    454: "SELECT.LIST.ITEM",
    455: "SET.CONTROL.VALUE",
    456: "SAVE.COPY.AS",
    458: "OPTIONS.LISTS.ADD",
    459: "OPTIONS.LISTS.DELETE",
    460: "SERIES.AXES",
    461: "SERIES.X",
    462: "SERIES.Y",
    463: "ERRORBAR.X",
    464: "ERRORBAR.Y",
    465: "FORMAT.CHART",
    466: "SERIES.ORDER",
    467: "MAIL.LOGOFF",
    468: "CLEAR.ROUTING.SLIP",
    469: "APP.ACTIVATE.MICROSOFT",
    470: "MAIL.EDIT.MAILER",
    471: "ON.SHEET",
    472: "STANDARD.WIDTH",
    473: "SCENARIO.MERGE",
    474: "SUMMARY.INFO",
    475: "FIND.FILE",
    476: "ACTIVE.CELL.FONT",
    477: "ENABLE.TIPWIZARD",
    478: "VBA.MAKE.ADDIN",
    480: "INSERTDATATABLE",
    481: "WORKGROUP.OPTIONS",
    482: "MAIL.SEND.MAILER",
    485: "AUTOCORRECT",
    489: "POST.DOCUMENT",
    491: "PICKLIST",
    493: "VIEW.SHOW",
    494: "VIEW.DEFINE",
    495: "VIEW.DELETE",
    509: "SHEET.BACKGROUND",
    510: "INSERT.MAP.OBJECT",
    511: "OPTIONS.MENONO",
    517: "MSOCHECKS",
    518: "NORMAL",
    519: "LAYOUT",
    520: "RM.PRINT.AREA",
    521: "CLEAR.PRINT.AREA",
    522: "ADD.PRINT.AREA",
    523: "MOVE.BRK",
    545: "HIDECURR.NOTE",
    546: "HIDEALL.NOTES",
    547: "DELETE.NOTE",
    548: "TRAVERSE.NOTES",
    549: "ACTIVATE.NOTES",
    620: "PROTECT.REVISIONS",
    621: "UNPROTECT.REVISIONS",
    647: "OPTIONS.ME",
    653: "WEB.PUBLISH",
    667: "NEWWEBQUERY",
    673: "PIVOT.TABLE.CHART",
    753: "OPTIONS.SAVE",
    755: "OPTIONS.SPELL",
    808: "HIDEALL.INKANNOTS",
  },
  X0 = {
    0: "COUNT",
    1: "IF",
    2: "ISNA",
    3: "ISERROR",
    4: "SUM",
    5: "AVERAGE",
    6: "MIN",
    7: "MAX",
    8: "ROW",
    9: "COLUMN",
    10: "NA",
    11: "NPV",
    12: "STDEV",
    13: "DOLLAR",
    14: "FIXED",
    15: "SIN",
    16: "COS",
    17: "TAN",
    18: "ATAN",
    19: "PI",
    20: "SQRT",
    21: "EXP",
    22: "LN",
    23: "LOG10",
    24: "ABS",
    25: "INT",
    26: "SIGN",
    27: "ROUND",
    28: "LOOKUP",
    29: "INDEX",
    30: "REPT",
    31: "MID",
    32: "LEN",
    33: "VALUE",
    34: "TRUE",
    35: "FALSE",
    36: "AND",
    37: "OR",
    38: "NOT",
    39: "MOD",
    40: "DCOUNT",
    41: "DSUM",
    42: "DAVERAGE",
    43: "DMIN",
    44: "DMAX",
    45: "DSTDEV",
    46: "VAR",
    47: "DVAR",
    48: "TEXT",
    49: "LINEST",
    50: "TREND",
    51: "LOGEST",
    52: "GROWTH",
    53: "GOTO",
    54: "HALT",
    55: "RETURN",
    56: "PV",
    57: "FV",
    58: "NPER",
    59: "PMT",
    60: "RATE",
    61: "MIRR",
    62: "IRR",
    63: "RAND",
    64: "MATCH",
    65: "DATE",
    66: "TIME",
    67: "DAY",
    68: "MONTH",
    69: "YEAR",
    70: "WEEKDAY",
    71: "HOUR",
    72: "MINUTE",
    73: "SECOND",
    74: "NOW",
    75: "AREAS",
    76: "ROWS",
    77: "COLUMNS",
    78: "OFFSET",
    79: "ABSREF",
    80: "RELREF",
    81: "ARGUMENT",
    82: "SEARCH",
    83: "TRANSPOSE",
    84: "ERROR",
    85: "STEP",
    86: "TYPE",
    87: "ECHO",
    88: "SET.NAME",
    89: "CALLER",
    90: "DEREF",
    91: "WINDOWS",
    92: "SERIES",
    93: "DOCUMENTS",
    94: "ACTIVE.CELL",
    95: "SELECTION",
    96: "RESULT",
    97: "ATAN2",
    98: "ASIN",
    99: "ACOS",
    100: "CHOOSE",
    101: "HLOOKUP",
    102: "VLOOKUP",
    103: "LINKS",
    104: "INPUT",
    105: "ISREF",
    106: "GET.FORMULA",
    107: "GET.NAME",
    108: "SET.VALUE",
    109: "LOG",
    110: "EXEC",
    111: "CHAR",
    112: "LOWER",
    113: "UPPER",
    114: "PROPER",
    115: "LEFT",
    116: "RIGHT",
    117: "EXACT",
    118: "TRIM",
    119: "REPLACE",
    120: "SUBSTITUTE",
    121: "CODE",
    122: "NAMES",
    123: "DIRECTORY",
    124: "FIND",
    125: "CELL",
    126: "ISERR",
    127: "ISTEXT",
    128: "ISNUMBER",
    129: "ISBLANK",
    130: "T",
    131: "N",
    132: "FOPEN",
    133: "FCLOSE",
    134: "FSIZE",
    135: "FREADLN",
    136: "FREAD",
    137: "FWRITELN",
    138: "FWRITE",
    139: "FPOS",
    140: "DATEVALUE",
    141: "TIMEVALUE",
    142: "SLN",
    143: "SYD",
    144: "DDB",
    145: "GET.DEF",
    146: "REFTEXT",
    147: "TEXTREF",
    148: "INDIRECT",
    149: "REGISTER",
    150: "CALL",
    151: "ADD.BAR",
    152: "ADD.MENU",
    153: "ADD.COMMAND",
    154: "ENABLE.COMMAND",
    155: "CHECK.COMMAND",
    156: "RENAME.COMMAND",
    157: "SHOW.BAR",
    158: "DELETE.MENU",
    159: "DELETE.COMMAND",
    160: "GET.CHART.ITEM",
    161: "DIALOG.BOX",
    162: "CLEAN",
    163: "MDETERM",
    164: "MINVERSE",
    165: "MMULT",
    166: "FILES",
    167: "IPMT",
    168: "PPMT",
    169: "COUNTA",
    170: "CANCEL.KEY",
    171: "FOR",
    172: "WHILE",
    173: "BREAK",
    174: "NEXT",
    175: "INITIATE",
    176: "REQUEST",
    177: "POKE",
    178: "EXECUTE",
    179: "TERMINATE",
    180: "RESTART",
    181: "HELP",
    182: "GET.BAR",
    183: "PRODUCT",
    184: "FACT",
    185: "GET.CELL",
    186: "GET.WORKSPACE",
    187: "GET.WINDOW",
    188: "GET.DOCUMENT",
    189: "DPRODUCT",
    190: "ISNONTEXT",
    191: "GET.NOTE",
    192: "NOTE",
    193: "STDEVP",
    194: "VARP",
    195: "DSTDEVP",
    196: "DVARP",
    197: "TRUNC",
    198: "ISLOGICAL",
    199: "DCOUNTA",
    200: "DELETE.BAR",
    201: "UNREGISTER",
    204: "USDOLLAR",
    205: "FINDB",
    206: "SEARCHB",
    207: "REPLACEB",
    208: "LEFTB",
    209: "RIGHTB",
    210: "MIDB",
    211: "LENB",
    212: "ROUNDUP",
    213: "ROUNDDOWN",
    214: "ASC",
    215: "DBCS",
    216: "RANK",
    219: "ADDRESS",
    220: "DAYS360",
    221: "TODAY",
    222: "VDB",
    223: "ELSE",
    224: "ELSE.IF",
    225: "END.IF",
    226: "FOR.CELL",
    227: "MEDIAN",
    228: "SUMPRODUCT",
    229: "SINH",
    230: "COSH",
    231: "TANH",
    232: "ASINH",
    233: "ACOSH",
    234: "ATANH",
    235: "DGET",
    236: "CREATE.OBJECT",
    237: "VOLATILE",
    238: "LAST.ERROR",
    239: "CUSTOM.UNDO",
    240: "CUSTOM.REPEAT",
    241: "FORMULA.CONVERT",
    242: "GET.LINK.INFO",
    243: "TEXT.BOX",
    244: "INFO",
    245: "GROUP",
    246: "GET.OBJECT",
    247: "DB",
    248: "PAUSE",
    251: "RESUME",
    252: "FREQUENCY",
    253: "ADD.TOOLBAR",
    254: "DELETE.TOOLBAR",
    255: "User",
    256: "RESET.TOOLBAR",
    257: "EVALUATE",
    258: "GET.TOOLBAR",
    259: "GET.TOOL",
    260: "SPELLING.CHECK",
    261: "ERROR.TYPE",
    262: "APP.TITLE",
    263: "WINDOW.TITLE",
    264: "SAVE.TOOLBAR",
    265: "ENABLE.TOOL",
    266: "PRESS.TOOL",
    267: "REGISTER.ID",
    268: "GET.WORKBOOK",
    269: "AVEDEV",
    270: "BETADIST",
    271: "GAMMALN",
    272: "BETAINV",
    273: "BINOMDIST",
    274: "CHIDIST",
    275: "CHIINV",
    276: "COMBIN",
    277: "CONFIDENCE",
    278: "CRITBINOM",
    279: "EVEN",
    280: "EXPONDIST",
    281: "FDIST",
    282: "FINV",
    283: "FISHER",
    284: "FISHERINV",
    285: "FLOOR",
    286: "GAMMADIST",
    287: "GAMMAINV",
    288: "CEILING",
    289: "HYPGEOMDIST",
    290: "LOGNORMDIST",
    291: "LOGINV",
    292: "NEGBINOMDIST",
    293: "NORMDIST",
    294: "NORMSDIST",
    295: "NORMINV",
    296: "NORMSINV",
    297: "STANDARDIZE",
    298: "ODD",
    299: "PERMUT",
    300: "POISSON",
    301: "TDIST",
    302: "WEIBULL",
    303: "SUMXMY2",
    304: "SUMX2MY2",
    305: "SUMX2PY2",
    306: "CHITEST",
    307: "CORREL",
    308: "COVAR",
    309: "FORECAST",
    310: "FTEST",
    311: "INTERCEPT",
    312: "PEARSON",
    313: "RSQ",
    314: "STEYX",
    315: "SLOPE",
    316: "TTEST",
    317: "PROB",
    318: "DEVSQ",
    319: "GEOMEAN",
    320: "HARMEAN",
    321: "SUMSQ",
    322: "KURT",
    323: "SKEW",
    324: "ZTEST",
    325: "LARGE",
    326: "SMALL",
    327: "QUARTILE",
    328: "PERCENTILE",
    329: "PERCENTRANK",
    330: "MODE",
    331: "TRIMMEAN",
    332: "TINV",
    334: "MOVIE.COMMAND",
    335: "GET.MOVIE",
    336: "CONCATENATE",
    337: "POWER",
    338: "PIVOT.ADD.DATA",
    339: "GET.PIVOT.TABLE",
    340: "GET.PIVOT.FIELD",
    341: "GET.PIVOT.ITEM",
    342: "RADIANS",
    343: "DEGREES",
    344: "SUBTOTAL",
    345: "SUMIF",
    346: "COUNTIF",
    347: "COUNTBLANK",
    348: "SCENARIO.GET",
    349: "OPTIONS.LISTS.GET",
    350: "ISPMT",
    351: "DATEDIF",
    352: "DATESTRING",
    353: "NUMBERSTRING",
    354: "ROMAN",
    355: "OPEN.DIALOG",
    356: "SAVE.DIALOG",
    357: "VIEW.GET",
    358: "GETPIVOTDATA",
    359: "HYPERLINK",
    360: "PHONETIC",
    361: "AVERAGEA",
    362: "MAXA",
    363: "MINA",
    364: "STDEVPA",
    365: "VARPA",
    366: "STDEVA",
    367: "VARA",
    368: "BAHTTEXT",
    369: "THAIDAYOFWEEK",
    370: "THAIDIGIT",
    371: "THAIMONTHOFYEAR",
    372: "THAINUMSOUND",
    373: "THAINUMSTRING",
    374: "THAISTRINGLENGTH",
    375: "ISTHAIDIGIT",
    376: "ROUNDBAHTDOWN",
    377: "ROUNDBAHTUP",
    378: "THAIYEAR",
    379: "RTD",
    380: "CUBEVALUE",
    381: "CUBEMEMBER",
    382: "CUBEMEMBERPROPERTY",
    383: "CUBERANKEDMEMBER",
    384: "HEX2BIN",
    385: "HEX2DEC",
    386: "HEX2OCT",
    387: "DEC2BIN",
    388: "DEC2HEX",
    389: "DEC2OCT",
    390: "OCT2BIN",
    391: "OCT2HEX",
    392: "OCT2DEC",
    393: "BIN2DEC",
    394: "BIN2OCT",
    395: "BIN2HEX",
    396: "IMSUB",
    397: "IMDIV",
    398: "IMPOWER",
    399: "IMABS",
    400: "IMSQRT",
    401: "IMLN",
    402: "IMLOG2",
    403: "IMLOG10",
    404: "IMSIN",
    405: "IMCOS",
    406: "IMEXP",
    407: "IMARGUMENT",
    408: "IMCONJUGATE",
    409: "IMAGINARY",
    410: "IMREAL",
    411: "COMPLEX",
    412: "IMSUM",
    413: "IMPRODUCT",
    414: "SERIESSUM",
    415: "FACTDOUBLE",
    416: "SQRTPI",
    417: "QUOTIENT",
    418: "DELTA",
    419: "GESTEP",
    420: "ISEVEN",
    421: "ISODD",
    422: "MROUND",
    423: "ERF",
    424: "ERFC",
    425: "BESSELJ",
    426: "BESSELK",
    427: "BESSELY",
    428: "BESSELI",
    429: "XIRR",
    430: "XNPV",
    431: "PRICEMAT",
    432: "YIELDMAT",
    433: "INTRATE",
    434: "RECEIVED",
    435: "DISC",
    436: "PRICEDISC",
    437: "YIELDDISC",
    438: "TBILLEQ",
    439: "TBILLPRICE",
    440: "TBILLYIELD",
    441: "PRICE",
    442: "YIELD",
    443: "DOLLARDE",
    444: "DOLLARFR",
    445: "NOMINAL",
    446: "EFFECT",
    447: "CUMPRINC",
    448: "CUMIPMT",
    449: "EDATE",
    450: "EOMONTH",
    451: "YEARFRAC",
    452: "COUPDAYBS",
    453: "COUPDAYS",
    454: "COUPDAYSNC",
    455: "COUPNCD",
    456: "COUPNUM",
    457: "COUPPCD",
    458: "DURATION",
    459: "MDURATION",
    460: "ODDLPRICE",
    461: "ODDLYIELD",
    462: "ODDFPRICE",
    463: "ODDFYIELD",
    464: "RANDBETWEEN",
    465: "WEEKNUM",
    466: "AMORDEGRC",
    467: "AMORLINC",
    468: "CONVERT",
    724: "SHEETJS",
    469: "ACCRINT",
    470: "ACCRINTM",
    471: "WORKDAY",
    472: "NETWORKDAYS",
    473: "GCD",
    474: "MULTINOMIAL",
    475: "LCM",
    476: "FVSCHEDULE",
    477: "CUBEKPIMEMBER",
    478: "CUBESET",
    479: "CUBESETCOUNT",
    480: "IFERROR",
    481: "COUNTIFS",
    482: "SUMIFS",
    483: "AVERAGEIF",
    484: "AVERAGEIFS",
  },
  wh = {
    2: 1,
    3: 1,
    10: 0,
    15: 1,
    16: 1,
    17: 1,
    18: 1,
    19: 0,
    20: 1,
    21: 1,
    22: 1,
    23: 1,
    24: 1,
    25: 1,
    26: 1,
    27: 2,
    30: 2,
    31: 3,
    32: 1,
    33: 1,
    34: 0,
    35: 0,
    38: 1,
    39: 2,
    40: 3,
    41: 3,
    42: 3,
    43: 3,
    44: 3,
    45: 3,
    47: 3,
    48: 2,
    53: 1,
    61: 3,
    63: 0,
    65: 3,
    66: 3,
    67: 1,
    68: 1,
    69: 1,
    70: 1,
    71: 1,
    72: 1,
    73: 1,
    74: 0,
    75: 1,
    76: 1,
    77: 1,
    79: 2,
    80: 2,
    83: 1,
    85: 0,
    86: 1,
    89: 0,
    90: 1,
    94: 0,
    95: 0,
    97: 2,
    98: 1,
    99: 1,
    101: 3,
    102: 3,
    105: 1,
    106: 1,
    108: 2,
    111: 1,
    112: 1,
    113: 1,
    114: 1,
    117: 2,
    118: 1,
    119: 4,
    121: 1,
    126: 1,
    127: 1,
    128: 1,
    129: 1,
    130: 1,
    131: 1,
    133: 1,
    134: 1,
    135: 1,
    136: 2,
    137: 2,
    138: 2,
    140: 1,
    141: 1,
    142: 3,
    143: 4,
    144: 4,
    161: 1,
    162: 1,
    163: 1,
    164: 1,
    165: 2,
    172: 1,
    175: 2,
    176: 2,
    177: 3,
    178: 2,
    179: 1,
    184: 1,
    186: 1,
    189: 3,
    190: 1,
    195: 3,
    196: 3,
    197: 1,
    198: 1,
    199: 3,
    201: 1,
    207: 4,
    210: 3,
    211: 1,
    212: 2,
    213: 2,
    214: 1,
    215: 1,
    225: 0,
    229: 1,
    230: 1,
    231: 1,
    232: 1,
    233: 1,
    234: 1,
    235: 3,
    244: 1,
    247: 4,
    252: 2,
    257: 1,
    261: 1,
    271: 1,
    273: 4,
    274: 2,
    275: 2,
    276: 2,
    277: 3,
    278: 3,
    279: 1,
    280: 3,
    281: 3,
    282: 3,
    283: 1,
    284: 1,
    285: 2,
    286: 4,
    287: 3,
    288: 2,
    289: 4,
    290: 3,
    291: 3,
    292: 3,
    293: 4,
    294: 1,
    295: 3,
    296: 1,
    297: 3,
    298: 1,
    299: 2,
    300: 3,
    301: 3,
    302: 4,
    303: 2,
    304: 2,
    305: 2,
    306: 2,
    307: 2,
    308: 2,
    309: 3,
    310: 2,
    311: 2,
    312: 2,
    313: 2,
    314: 2,
    315: 2,
    316: 4,
    325: 2,
    326: 2,
    327: 2,
    328: 2,
    331: 2,
    332: 2,
    337: 2,
    342: 1,
    343: 1,
    346: 2,
    347: 1,
    350: 4,
    351: 3,
    352: 1,
    353: 2,
    360: 1,
    368: 1,
    369: 1,
    370: 1,
    371: 1,
    372: 1,
    373: 1,
    374: 1,
    375: 1,
    376: 1,
    377: 1,
    378: 1,
    382: 3,
    385: 1,
    392: 1,
    393: 1,
    396: 2,
    397: 2,
    398: 2,
    399: 1,
    400: 1,
    401: 1,
    402: 1,
    403: 1,
    404: 1,
    405: 1,
    406: 1,
    407: 1,
    408: 1,
    409: 1,
    410: 1,
    414: 4,
    415: 1,
    416: 1,
    417: 2,
    420: 1,
    421: 1,
    422: 2,
    424: 1,
    425: 2,
    426: 2,
    427: 2,
    428: 2,
    430: 3,
    438: 3,
    439: 3,
    440: 3,
    443: 2,
    444: 2,
    445: 2,
    446: 2,
    447: 6,
    448: 6,
    449: 2,
    450: 2,
    464: 2,
    468: 3,
    476: 2,
    479: 1,
    480: 2,
    65535: 0,
  };
function Ah(e) {
  var t = "of:=" + e.replace(mi, "$1[.$2$3$4$5]").replace(/\]:\[/g, ":");
  return t.replace(/;/g, "|").replace(/,/g, ";");
}
function yh(e) {
  return e.replace(/\./, "!");
}
var Fn = typeof Map < "u";
function _i(e, t, r) {
  var n = 0,
    a = e.length;
  if (r) {
    if (Fn ? r.has(t) : Object.prototype.hasOwnProperty.call(r, t)) {
      for (var i = Fn ? r.get(t) : r[t]; n < i.length; ++n)
        if (e[i[n]].t === t) return (e.Count++, i[n]);
    }
  } else for (; n < a; ++n) if (e[n].t === t) return (e.Count++, n);
  return (
    (e[a] = { t }),
    e.Count++,
    e.Unique++,
    r &&
      (Fn
        ? (r.has(t) || r.set(t, []), r.get(t).push(a))
        : (Object.prototype.hasOwnProperty.call(r, t) || (r[t] = []),
          r[t].push(a))),
    a
  );
}
function Pa(e, t) {
  var r = { min: e + 1, max: e + 1 },
    n = -1;
  return (
    t.MDW && (yt = t.MDW),
    t.width != null
      ? (r.customWidth = 1)
      : t.wpx != null
        ? (n = ma(t.wpx))
        : t.wch != null && (n = t.wch),
    n > -1
      ? ((r.width = qa(n)), (r.customWidth = 1))
      : t.width != null && (r.width = t.width),
    t.hidden && (r.hidden = !0),
    t.level != null && (r.outlineLevel = r.level = t.level),
    r
  );
}
function K0(e, t) {
  if (e) {
    var r = [0.7, 0.7, 0.75, 0.75, 0.3, 0.3];
    (e.left == null && (e.left = r[0]),
      e.right == null && (e.right = r[1]),
      e.top == null && (e.top = r[2]),
      e.bottom == null && (e.bottom = r[3]),
      e.header == null && (e.header = r[4]),
      e.footer == null && (e.footer = r[5]));
  }
}
function Lt(e, t, r) {
  var n = r.revssf[t.z != null ? t.z : "General"],
    a = 60,
    i = e.length;
  if (n == null && r.ssf) {
    for (; a < 392; ++a)
      if (r.ssf[a] == null) {
        (Gs(t.z, a), (r.ssf[a] = t.z), (r.revssf[t.z] = n = a));
        break;
      }
  }
  for (a = 0; a != i; ++a) if (e[a].numFmtId === n) return a;
  return (
    (e[i] = {
      numFmtId: n,
      fontId: 0,
      fillId: 0,
      borderId: 0,
      xfId: 0,
      applyNumberFormat: 1,
    }),
    i
  );
}
function Ch(e, t, r) {
  if (e && e["!ref"]) {
    var n = lr(e["!ref"]);
    if (n.e.c < n.s.c || n.e.r < n.s.r)
      throw new Error("Bad range (" + r + "): " + e["!ref"]);
  }
}
function Fh(e) {
  if (e.length === 0) return "";
  for (
    var t = '<mergeCells count="' + e.length + '">', r = 0;
    r != e.length;
    ++r
  )
    t += '<mergeCell ref="' + Er(e[r]) + '"/>';
  return t + "</mergeCells>";
}
function bh(e, t, r, n, a) {
  var i = !1,
    s = {},
    o = null;
  if (n.bookType !== "xlsx" && t.vbaraw) {
    var c = t.SheetNames[r];
    try {
      t.Workbook && (c = t.Workbook.Sheets[r].CodeName || c);
    } catch {}
    ((i = !0), (s.codeName = Ln(Xe(c))));
  }
  if (e && e["!outline"]) {
    var l = { summaryBelow: 1, summaryRight: 1 };
    (e["!outline"].above && (l.summaryBelow = 0),
      e["!outline"].left && (l.summaryRight = 0),
      (o = (o || "") + te("outlinePr", null, l)));
  }
  (!i && !o) || (a[a.length] = te("sheetPr", o, s));
}
var kh = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"],
  Dh = [
    "formatColumns",
    "formatRows",
    "formatCells",
    "insertColumns",
    "insertRows",
    "insertHyperlinks",
    "deleteColumns",
    "deleteRows",
    "sort",
    "autoFilter",
    "pivotTables",
  ];
function Nh(e) {
  var t = { sheet: 1 };
  return (
    kh.forEach(function (r) {
      e[r] != null && e[r] && (t[r] = "1");
    }),
    Dh.forEach(function (r) {
      e[r] != null && !e[r] && (t[r] = "0");
    }),
    e.password && (t.password = P0(e.password).toString(16).toUpperCase()),
    te("sheetProtection", null, t)
  );
}
function Ph(e) {
  return (K0(e), te("pageMargins", null, e));
}
function Oh(e, t) {
  for (var r = ["<cols>"], n, a = 0; a != t.length; ++a)
    (n = t[a]) && (r[r.length] = te("col", null, Pa(a, n)));
  return ((r[r.length] = "</cols>"), r.join(""));
}
function Rh(e, t, r, n) {
  var a = typeof e.ref == "string" ? e.ref : Er(e.ref);
  (r.Workbook || (r.Workbook = { Sheets: [] }),
    r.Workbook.Names || (r.Workbook.Names = []));
  var i = r.Workbook.Names,
    s = nt(a);
  s.s.r == s.e.r && ((s.e.r = nt(t["!ref"]).e.r), (a = Er(s)));
  for (var o = 0; o < i.length; ++o) {
    var c = i[o];
    if (c.Name == "_xlnm._FilterDatabase" && c.Sheet == n) {
      c.Ref = "'" + r.SheetNames[n] + "'!" + a;
      break;
    }
  }
  return (
    o == i.length &&
      i.push({
        Name: "_xlnm._FilterDatabase",
        Sheet: n,
        Ref: "'" + r.SheetNames[n] + "'!" + a,
      }),
    te("autoFilter", null, { ref: a })
  );
}
function Ih(e, t, r, n) {
  var a = { workbookViewId: "0" };
  return (
    (((n || {}).Workbook || {}).Views || [])[0] &&
      (a.rightToLeft = n.Workbook.Views[0].RTL ? "1" : "0"),
    te("sheetViews", te("sheetView", null, a), {})
  );
}
function Lh(e, t, r, n) {
  if (
    (e.c && r["!comments"].push([t, e.c]),
    (e.v === void 0 && typeof e.f != "string") || (e.t === "z" && !e.f))
  )
    return "";
  var a = "",
    i = e.t,
    s = e.v;
  if (e.t !== "z")
    switch (e.t) {
      case "b":
        a = e.v ? "1" : "0";
        break;
      case "n":
        a = "" + e.v;
        break;
      case "e":
        a = $n[e.v];
        break;
      case "d":
        (n && n.cellDates
          ? (a = Yr(e.v, -1).toISOString())
          : ((e = qr(e)), (e.t = "n"), (a = "" + (e.v = Kr(Yr(e.v))))),
          typeof e.z > "u" && (e.z = gr[14]));
        break;
      default:
        a = e.v;
        break;
    }
  var o = Mr("v", Xe(a)),
    c = { r: t },
    l = Lt(n.cellXfs, e, n);
  switch ((l !== 0 && (c.s = l), e.t)) {
    case "n":
      break;
    case "d":
      c.t = "d";
      break;
    case "b":
      c.t = "b";
      break;
    case "e":
      c.t = "e";
      break;
    case "z":
      break;
    default:
      if (e.v == null) {
        delete e.t;
        break;
      }
      if (e.v.length > 32767)
        throw new Error("Text length must not exceed 32767 characters");
      if (n && n.bookSST) {
        ((o = Mr("v", "" + _i(n.Strings, e.v, n.revStrings))), (c.t = "s"));
        break;
      }
      c.t = "str";
      break;
  }
  if ((e.t != i && ((e.t = i), (e.v = s)), typeof e.f == "string" && e.f)) {
    var f =
      e.F && e.F.slice(0, t.length) == t ? { t: "array", ref: e.F } : null;
    o = te("f", Xe(e.f), f) + (e.v != null ? o : "");
  }
  return (e.l && r["!links"].push([t, e.l]), e.D && (c.cm = 1), te("c", o, c));
}
function Mh(e, t, r, n) {
  var a = [],
    i = [],
    s = lr(e["!ref"]),
    o = "",
    c,
    l = "",
    f = [],
    m = 0,
    p = 0,
    d = e["!rows"],
    _ = Array.isArray(e),
    h = { r: l },
    x,
    C = -1;
  for (p = s.s.c; p <= s.e.c; ++p) f[p] = Wr(p);
  for (m = s.s.r; m <= s.e.r; ++m) {
    for (i = [], l = Br(m), p = s.s.c; p <= s.e.c; ++p) {
      c = f[p] + l;
      var F = _ ? (e[m] || [])[p] : e[c];
      F !== void 0 && (o = Lh(F, c, e, t)) != null && i.push(o);
    }
    (i.length > 0 || (d && d[m])) &&
      ((h = { r: l }),
      d &&
        d[m] &&
        ((x = d[m]),
        x.hidden && (h.hidden = 1),
        (C = -1),
        x.hpx ? (C = ga(x.hpx)) : x.hpt && (C = x.hpt),
        C > -1 && ((h.ht = C), (h.customHeight = 1)),
        x.level && (h.outlineLevel = x.level)),
      (a[a.length] = te("row", i.join(""), h)));
  }
  if (d)
    for (; m < d.length; ++m)
      d &&
        d[m] &&
        ((h = { r: m + 1 }),
        (x = d[m]),
        x.hidden && (h.hidden = 1),
        (C = -1),
        x.hpx ? (C = ga(x.hpx)) : x.hpt && (C = x.hpt),
        C > -1 && ((h.ht = C), (h.customHeight = 1)),
        x.level && (h.outlineLevel = x.level),
        (a[a.length] = te("row", "", h)));
  return a.join("");
}
function q0(e, t, r, n) {
  var a = [Sr, te("worksheet", null, { xmlns: cn[0], "xmlns:r": br.r })],
    i = r.SheetNames[e],
    s = 0,
    o = "",
    c = r.Sheets[i];
  c == null && (c = {});
  var l = c["!ref"] || "A1",
    f = lr(l);
  if (f.e.c > 16383 || f.e.r > 1048575) {
    if (t.WTF)
      throw new Error("Range " + l + " exceeds format limit A1:XFD1048576");
    ((f.e.c = Math.min(f.e.c, 16383)),
      (f.e.r = Math.min(f.e.c, 1048575)),
      (l = Er(f)));
  }
  (n || (n = {}), (c["!comments"] = []));
  var m = [];
  (bh(c, r, e, t, a),
    (a[a.length] = te("dimension", null, { ref: l })),
    (a[a.length] = Ih(c, t, e, r)),
    t.sheetFormat &&
      (a[a.length] = te("sheetFormatPr", null, {
        defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
        baseColWidth: t.sheetFormat.baseColWidth || "10",
        outlineLevelRow: t.sheetFormat.outlineLevelRow || "7",
      })),
    c["!cols"] != null &&
      c["!cols"].length > 0 &&
      (a[a.length] = Oh(c, c["!cols"])),
    (a[(s = a.length)] = "<sheetData/>"),
    (c["!links"] = []),
    c["!ref"] != null && ((o = Mh(c, t)), o.length > 0 && (a[a.length] = o)),
    a.length > s + 1 &&
      ((a[a.length] = "</sheetData>"), (a[s] = a[s].replace("/>", ">"))),
    c["!protect"] && (a[a.length] = Nh(c["!protect"])),
    c["!autofilter"] != null && (a[a.length] = Rh(c["!autofilter"], c, r, e)),
    c["!merges"] != null &&
      c["!merges"].length > 0 &&
      (a[a.length] = Fh(c["!merges"])));
  var p = -1,
    d,
    _ = -1;
  return (
    c["!links"].length > 0 &&
      ((a[a.length] = "<hyperlinks>"),
      c["!links"].forEach(function (h) {
        h[1].Target &&
          ((d = { ref: h[0] }),
          h[1].Target.charAt(0) != "#" &&
            ((_ = ze(n, -1, Xe(h[1].Target).replace(/#.*$/, ""), je.HLINK)),
            (d["r:id"] = "rId" + _)),
          (p = h[1].Target.indexOf("#")) > -1 &&
            (d.location = Xe(h[1].Target.slice(p + 1))),
          h[1].Tooltip && (d.tooltip = Xe(h[1].Tooltip)),
          (a[a.length] = te("hyperlink", null, d)));
      }),
      (a[a.length] = "</hyperlinks>")),
    delete c["!links"],
    c["!margins"] != null && (a[a.length] = Ph(c["!margins"])),
    (!t || t.ignoreEC || t.ignoreEC == null) &&
      (a[a.length] = Mr(
        "ignoredErrors",
        te("ignoredError", null, { numberStoredAsText: 1, sqref: l }),
      )),
    m.length > 0 &&
      ((_ = ze(n, -1, "../drawings/drawing" + (e + 1) + ".xml", je.DRAW)),
      (a[a.length] = te("drawing", null, { "r:id": "rId" + _ })),
      (c["!drawing"] = m)),
    c["!comments"].length > 0 &&
      ((_ = ze(n, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", je.VML)),
      (a[a.length] = te("legacyDrawing", null, { "r:id": "rId" + _ })),
      (c["!legacy"] = _)),
    a.length > 1 &&
      ((a[a.length] = "</worksheet>"), (a[1] = a[1].replace("/>", ">"))),
    a.join("")
  );
}
function Bh(e, t) {
  var r = {},
    n = e.l + t;
  ((r.r = e.read_shift(4)), (e.l += 4));
  var a = e.read_shift(2);
  e.l += 1;
  var i = e.read_shift(1);
  return (
    (e.l = n),
    i & 7 && (r.level = i & 7),
    i & 16 && (r.hidden = !0),
    i & 32 && (r.hpt = a / 20),
    r
  );
}
function jh(e, t, r) {
  var n = W(145),
    a = (r["!rows"] || [])[e] || {};
  (n.write_shift(4, e), n.write_shift(4, 0));
  var i = 320;
  (a.hpx ? (i = ga(a.hpx) * 20) : a.hpt && (i = a.hpt * 20),
    n.write_shift(2, i),
    n.write_shift(1, 0));
  var s = 0;
  (a.level && (s |= a.level),
    a.hidden && (s |= 16),
    (a.hpx || a.hpt) && (s |= 32),
    n.write_shift(1, s),
    n.write_shift(1, 0));
  var o = 0,
    c = n.l;
  n.l += 4;
  for (var l = { r: e, c: 0 }, f = 0; f < 16; ++f)
    if (!(t.s.c > (f + 1) << 10 || t.e.c < f << 10)) {
      for (var m = -1, p = -1, d = f << 10; d < (f + 1) << 10; ++d) {
        l.c = d;
        var _ = Array.isArray(r) ? (r[l.r] || [])[l.c] : r[Ke(l)];
        _ && (m < 0 && (m = d), (p = d));
      }
      m < 0 || (++o, n.write_shift(4, m), n.write_shift(4, p));
    }
  var h = n.l;
  return (
    (n.l = c),
    n.write_shift(4, o),
    (n.l = h),
    n.length > n.l ? n.slice(0, n.l) : n
  );
}
function Uh(e, t, r, n) {
  var a = jh(n, r, t);
  (a.length > 17 || (t["!rows"] || [])[n]) && K(e, 0, a);
}
var Wh = Xt,
  Vh = un;
function Hh() {}
function Gh(e, t) {
  var r = {},
    n = e[e.l];
  return (
    ++e.l,
    (r.above = !(n & 64)),
    (r.left = !(n & 128)),
    (e.l += 18),
    (r.name = Zl(e)),
    r
  );
}
function $h(e, t, r) {
  r == null && (r = W(84 + 4 * e.length));
  var n = 192;
  (t && (t.above && (n &= -65), t.left && (n &= -129)), r.write_shift(1, n));
  for (var a = 1; a < 3; ++a) r.write_shift(1, 0);
  return (
    da({ auto: 1 }, r),
    r.write_shift(-4, -1),
    r.write_shift(-4, -1),
    u0(e, r),
    r.slice(0, r.l)
  );
}
function Yh(e) {
  var t = lt(e);
  return [t];
}
function zh(e, t, r) {
  return (r == null && (r = W(8)), $t(t, r));
}
function Xh(e) {
  var t = Yt(e);
  return [t];
}
function Kh(e, t, r) {
  return (r == null && (r = W(4)), zt(t, r));
}
function qh(e) {
  var t = lt(e),
    r = e.read_shift(1);
  return [t, r, "b"];
}
function Jh(e, t, r) {
  return (r == null && (r = W(9)), $t(t, r), r.write_shift(1, e.v ? 1 : 0), r);
}
function Qh(e) {
  var t = Yt(e),
    r = e.read_shift(1);
  return [t, r, "b"];
}
function Zh(e, t, r) {
  return (r == null && (r = W(5)), zt(t, r), r.write_shift(1, e.v ? 1 : 0), r);
}
function e1(e) {
  var t = lt(e),
    r = e.read_shift(1);
  return [t, r, "e"];
}
function r1(e, t, r) {
  return (r == null && (r = W(9)), $t(t, r), r.write_shift(1, e.v), r);
}
function t1(e) {
  var t = Yt(e),
    r = e.read_shift(1);
  return [t, r, "e"];
}
function n1(e, t, r) {
  return (
    r == null && (r = W(8)),
    zt(t, r),
    r.write_shift(1, e.v),
    r.write_shift(2, 0),
    r.write_shift(1, 0),
    r
  );
}
function a1(e) {
  var t = lt(e),
    r = e.read_shift(4);
  return [t, r, "s"];
}
function i1(e, t, r) {
  return (r == null && (r = W(12)), $t(t, r), r.write_shift(4, t.v), r);
}
function s1(e) {
  var t = Yt(e),
    r = e.read_shift(4);
  return [t, r, "s"];
}
function o1(e, t, r) {
  return (r == null && (r = W(8)), zt(t, r), r.write_shift(4, t.v), r);
}
function l1(e) {
  var t = lt(e),
    r = hn(e);
  return [t, r, "n"];
}
function c1(e, t, r) {
  return (r == null && (r = W(16)), $t(t, r), Wt(e.v, r), r);
}
function f1(e) {
  var t = Yt(e),
    r = hn(e);
  return [t, r, "n"];
}
function u1(e, t, r) {
  return (r == null && (r = W(12)), zt(t, r), Wt(e.v, r), r);
}
function h1(e) {
  var t = lt(e),
    r = h0(e);
  return [t, r, "n"];
}
function d1(e, t, r) {
  return (r == null && (r = W(12)), $t(t, r), d0(e.v, r), r);
}
function x1(e) {
  var t = Yt(e),
    r = h0(e);
  return [t, r, "n"];
}
function p1(e, t, r) {
  return (r == null && (r = W(8)), zt(t, r), d0(e.v, r), r);
}
function m1(e) {
  var t = lt(e),
    r = ui(e);
  return [t, r, "is"];
}
function g1(e) {
  var t = lt(e),
    r = Vr(e);
  return [t, r, "str"];
}
function v1(e, t, r) {
  return (
    r == null && (r = W(12 + 4 * e.v.length)),
    $t(t, r),
    Dr(e.v, r),
    r.length > r.l ? r.slice(0, r.l) : r
  );
}
function _1(e) {
  var t = Yt(e),
    r = Vr(e);
  return [t, r, "str"];
}
function T1(e, t, r) {
  return (
    r == null && (r = W(8 + 4 * e.v.length)),
    zt(t, r),
    Dr(e.v, r),
    r.length > r.l ? r.slice(0, r.l) : r
  );
}
function E1(e, t, r) {
  var n = e.l + t,
    a = lt(e);
  a.r = r["!row"];
  var i = e.read_shift(1),
    s = [a, i, "b"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Na(e, n - e.l, r);
    s[3] = ln(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function S1(e, t, r) {
  var n = e.l + t,
    a = lt(e);
  a.r = r["!row"];
  var i = e.read_shift(1),
    s = [a, i, "e"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Na(e, n - e.l, r);
    s[3] = ln(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function w1(e, t, r) {
  var n = e.l + t,
    a = lt(e);
  a.r = r["!row"];
  var i = hn(e),
    s = [a, i, "n"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Na(e, n - e.l, r);
    s[3] = ln(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
function A1(e, t, r) {
  var n = e.l + t,
    a = lt(e);
  a.r = r["!row"];
  var i = Vr(e),
    s = [a, i, "str"];
  if (r.cellFormula) {
    e.l += 2;
    var o = Na(e, n - e.l, r);
    s[3] = ln(o, null, a, r.supbooks, r);
  } else e.l = n;
  return s;
}
var y1 = Xt,
  C1 = un;
function F1(e, t) {
  return (t == null && (t = W(4)), t.write_shift(4, e), t);
}
function b1(e, t) {
  var r = e.l + t,
    n = Xt(e),
    a = hi(e),
    i = Vr(e),
    s = Vr(e),
    o = Vr(e);
  e.l = r;
  var c = { rfx: n, relId: a, loc: i, display: o };
  return (s && (c.Tooltip = s), c);
}
function k1(e, t) {
  var r = W(50 + 4 * (e[1].Target.length + (e[1].Tooltip || "").length));
  (un({ s: kr(e[0]), e: kr(e[0]) }, r), di("rId" + t, r));
  var n = e[1].Target.indexOf("#"),
    a = n == -1 ? "" : e[1].Target.slice(n + 1);
  return (
    Dr(a || "", r),
    Dr(e[1].Tooltip || "", r),
    Dr("", r),
    r.slice(0, r.l)
  );
}
function D1() {}
function N1(e, t, r) {
  var n = e.l + t,
    a = x0(e),
    i = e.read_shift(1),
    s = [a];
  if (((s[2] = i), r.cellFormula)) {
    var o = _h(e, n - e.l, r);
    s[1] = o;
  } else e.l = n;
  return s;
}
function P1(e, t, r) {
  var n = e.l + t,
    a = Xt(e),
    i = [a];
  if (r.cellFormula) {
    var s = Eh(e, n - e.l, r);
    ((i[1] = s), (e.l = n));
  } else e.l = n;
  return i;
}
function O1(e, t, r) {
  r == null && (r = W(18));
  var n = Pa(e, t);
  (r.write_shift(-4, e),
    r.write_shift(-4, e),
    r.write_shift(4, (n.width || 10) * 256),
    r.write_shift(4, 0));
  var a = 0;
  return (
    t.hidden && (a |= 1),
    typeof n.width == "number" && (a |= 2),
    t.level && (a |= t.level << 8),
    r.write_shift(2, a),
    r
  );
}
var J0 = ["left", "right", "top", "bottom", "header", "footer"];
function R1(e) {
  var t = {};
  return (
    J0.forEach(function (r) {
      t[r] = hn(e);
    }),
    t
  );
}
function I1(e, t) {
  return (
    t == null && (t = W(6 * 8)),
    K0(e),
    J0.forEach(function (r) {
      Wt(e[r], t);
    }),
    t
  );
}
function L1(e) {
  var t = e.read_shift(2);
  return ((e.l += 28), { RTL: t & 32 });
}
function M1(e, t, r) {
  r == null && (r = W(30));
  var n = 924;
  return (
    (((t || {}).Views || [])[0] || {}).RTL && (n |= 32),
    r.write_shift(2, n),
    r.write_shift(4, 0),
    r.write_shift(4, 0),
    r.write_shift(4, 0),
    r.write_shift(1, 0),
    r.write_shift(1, 0),
    r.write_shift(2, 0),
    r.write_shift(2, 100),
    r.write_shift(2, 0),
    r.write_shift(2, 0),
    r.write_shift(2, 0),
    r.write_shift(4, 0),
    r
  );
}
function B1(e) {
  var t = W(24);
  return (t.write_shift(4, 4), t.write_shift(4, 1), un(e, t), t);
}
function j1(e, t) {
  return (
    t == null && (t = W(16 * 4 + 2)),
    t.write_shift(2, e.password ? P0(e.password) : 0),
    t.write_shift(4, 1),
    [
      ["objects", !1],
      ["scenarios", !1],
      ["formatCells", !0],
      ["formatColumns", !0],
      ["formatRows", !0],
      ["insertColumns", !0],
      ["insertRows", !0],
      ["insertHyperlinks", !0],
      ["deleteColumns", !0],
      ["deleteRows", !0],
      ["selectLockedCells", !1],
      ["sort", !0],
      ["autoFilter", !0],
      ["pivotTables", !0],
      ["selectUnlockedCells", !1],
    ].forEach(function (r) {
      r[1]
        ? t.write_shift(4, e[r[0]] != null && !e[r[0]] ? 1 : 0)
        : t.write_shift(4, e[r[0]] != null && e[r[0]] ? 0 : 1);
    }),
    t
  );
}
function U1() {}
function W1() {}
function V1(e, t, r, n, a, i, s) {
  if (t.v === void 0) return !1;
  var o = "";
  switch (t.t) {
    case "b":
      o = t.v ? "1" : "0";
      break;
    case "d":
      ((t = qr(t)), (t.z = t.z || gr[14]), (t.v = Kr(Yr(t.v))), (t.t = "n"));
      break;
    case "n":
    case "e":
      o = "" + t.v;
      break;
    default:
      o = t.v;
      break;
  }
  var c = { r, c: n };
  switch (
    ((c.s = Lt(a.cellXfs, t, a)),
    t.l && i["!links"].push([Ke(c), t.l]),
    t.c && i["!comments"].push([Ke(c), t.c]),
    t.t)
  ) {
    case "s":
    case "str":
      return (
        a.bookSST
          ? ((o = _i(a.Strings, t.v, a.revStrings)),
            (c.t = "s"),
            (c.v = o),
            s ? K(e, 18, o1(t, c)) : K(e, 7, i1(t, c)))
          : ((c.t = "str"), s ? K(e, 17, T1(t, c)) : K(e, 6, v1(t, c))),
        !0
      );
    case "n":
      return (
        t.v == (t.v | 0) && t.v > -1e3 && t.v < 1e3
          ? s
            ? K(e, 13, p1(t, c))
            : K(e, 2, d1(t, c))
          : s
            ? K(e, 16, u1(t, c))
            : K(e, 5, c1(t, c)),
        !0
      );
    case "b":
      return ((c.t = "b"), s ? K(e, 15, Zh(t, c)) : K(e, 4, Jh(t, c)), !0);
    case "e":
      return ((c.t = "e"), s ? K(e, 14, n1(t, c)) : K(e, 3, r1(t, c)), !0);
  }
  return (s ? K(e, 12, Kh(t, c)) : K(e, 1, zh(t, c)), !0);
}
function H1(e, t, r, n) {
  var a = lr(t["!ref"] || "A1"),
    i,
    s = "",
    o = [];
  K(e, 145);
  var c = Array.isArray(t),
    l = a.e.r;
  t["!rows"] && (l = Math.max(a.e.r, t["!rows"].length - 1));
  for (var f = a.s.r; f <= l; ++f) {
    ((s = Br(f)), Uh(e, t, a, f));
    var m = !1;
    if (f <= a.e.r)
      for (var p = a.s.c; p <= a.e.c; ++p) {
        (f === a.s.r && (o[p] = Wr(p)), (i = o[p] + s));
        var d = c ? (t[f] || [])[p] : t[i];
        if (!d) {
          m = !1;
          continue;
        }
        m = V1(e, d, f, p, n, t, m);
      }
  }
  K(e, 146);
}
function G1(e, t) {
  !t ||
    !t["!merges"] ||
    (K(e, 177, F1(t["!merges"].length)),
    t["!merges"].forEach(function (r) {
      K(e, 176, C1(r));
    }),
    K(e, 178));
}
function $1(e, t) {
  !t ||
    !t["!cols"] ||
    (K(e, 390),
    t["!cols"].forEach(function (r, n) {
      r && K(e, 60, O1(n, r));
    }),
    K(e, 391));
}
function Y1(e, t) {
  !t || !t["!ref"] || (K(e, 648), K(e, 649, B1(lr(t["!ref"]))), K(e, 650));
}
function z1(e, t, r) {
  (t["!links"].forEach(function (n) {
    if (n[1].Target) {
      var a = ze(r, -1, n[1].Target.replace(/#.*$/, ""), je.HLINK);
      K(e, 494, k1(n, a));
    }
  }),
    delete t["!links"]);
}
function X1(e, t, r, n) {
  if (t["!comments"].length > 0) {
    var a = ze(n, -1, "../drawings/vmlDrawing" + (r + 1) + ".vml", je.VML);
    (K(e, 551, di("rId" + a)), (t["!legacy"] = a));
  }
}
function K1(e, t, r, n) {
  if (t["!autofilter"]) {
    var a = t["!autofilter"],
      i = typeof a.ref == "string" ? a.ref : Er(a.ref);
    (r.Workbook || (r.Workbook = { Sheets: [] }),
      r.Workbook.Names || (r.Workbook.Names = []));
    var s = r.Workbook.Names,
      o = nt(i);
    o.s.r == o.e.r && ((o.e.r = nt(t["!ref"]).e.r), (i = Er(o)));
    for (var c = 0; c < s.length; ++c) {
      var l = s[c];
      if (l.Name == "_xlnm._FilterDatabase" && l.Sheet == n) {
        l.Ref = "'" + r.SheetNames[n] + "'!" + i;
        break;
      }
    }
    (c == s.length &&
      s.push({
        Name: "_xlnm._FilterDatabase",
        Sheet: n,
        Ref: "'" + r.SheetNames[n] + "'!" + i,
      }),
      K(e, 161, un(lr(i))),
      K(e, 162));
  }
}
function q1(e, t, r) {
  (K(e, 133), K(e, 137, M1(t, r)), K(e, 138), K(e, 134));
}
function J1(e, t) {
  t["!protect"] && K(e, 535, j1(t["!protect"]));
}
function Q1(e, t, r, n) {
  var a = Xr(),
    i = r.SheetNames[e],
    s = r.Sheets[i] || {},
    o = i;
  try {
    r && r.Workbook && (o = r.Workbook.Sheets[e].CodeName || o);
  } catch {}
  var c = lr(s["!ref"] || "A1");
  if (c.e.c > 16383 || c.e.r > 1048575) {
    if (t.WTF)
      throw new Error(
        "Range " + (s["!ref"] || "A1") + " exceeds format limit A1:XFD1048576",
      );
    ((c.e.c = Math.min(c.e.c, 16383)), (c.e.r = Math.min(c.e.c, 1048575)));
  }
  return (
    (s["!links"] = []),
    (s["!comments"] = []),
    K(a, 129),
    (r.vbaraw || s["!outline"]) && K(a, 147, $h(o, s["!outline"])),
    K(a, 148, Vh(c)),
    q1(a, s, r.Workbook),
    $1(a, s),
    H1(a, s, e, t),
    J1(a, s),
    K1(a, s, r, e),
    G1(a, s),
    z1(a, s, n),
    s["!margins"] && K(a, 476, I1(s["!margins"])),
    (!t || t.ignoreEC || t.ignoreEC == null) && Y1(a, s),
    X1(a, s, e, n),
    K(a, 130),
    a.end()
  );
}
function Z1(e, t) {
  e.l += 10;
  var r = Vr(e);
  return { name: r };
}
var ed = [
  ["allowRefreshQuery", !1, "bool"],
  ["autoCompressPictures", !0, "bool"],
  ["backupFile", !1, "bool"],
  ["checkCompatibility", !1, "bool"],
  ["CodeName", ""],
  ["date1904", !1, "bool"],
  ["defaultThemeVersion", 0, "int"],
  ["filterPrivacy", !1, "bool"],
  ["hidePivotFieldList", !1, "bool"],
  ["promptedSolutions", !1, "bool"],
  ["publishItems", !1, "bool"],
  ["refreshAllConnections", !1, "bool"],
  ["saveExternalLinkValues", !0, "bool"],
  ["showBorderUnselectedTables", !0, "bool"],
  ["showInkAnnotation", !0, "bool"],
  ["showObjects", "all"],
  ["showPivotChartFilter", !1, "bool"],
  ["updateLinks", "userSet"],
];
function rd(e) {
  return !e.Workbook || !e.Workbook.WBProps
    ? "false"
    : Nl(e.Workbook.WBProps.date1904)
      ? "true"
      : "false";
}
var td = "][*?/\\".split("");
function Q0(e, t) {
  if (e.length > 31) throw new Error("Sheet names cannot exceed 31 chars");
  var r = !0;
  return (
    td.forEach(function (n) {
      if (e.indexOf(n) != -1)
        throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
    }),
    r
  );
}
function nd(e, t, r) {
  e.forEach(function (n, a) {
    Q0(n);
    for (var i = 0; i < a; ++i)
      if (n == e[i]) throw new Error("Duplicate Sheet Name: " + n);
    if (r) {
      var s = (t && t[a] && t[a].CodeName) || n;
      if (s.charCodeAt(0) == 95 && s.length > 22)
        throw new Error("Bad Code Name: Worksheet" + s);
    }
  });
}
function ad(e) {
  if (!e || !e.SheetNames || !e.Sheets) throw new Error("Invalid Workbook");
  if (!e.SheetNames.length) throw new Error("Workbook is empty");
  var t = (e.Workbook && e.Workbook.Sheets) || [];
  nd(e.SheetNames, t, !!e.vbaraw);
  for (var r = 0; r < e.SheetNames.length; ++r)
    Ch(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r);
}
function Z0(e) {
  var t = [Sr];
  t[t.length] = te("workbook", null, { xmlns: cn[0], "xmlns:r": br.r });
  var r = e.Workbook && (e.Workbook.Names || []).length > 0,
    n = { codeName: "ThisWorkbook" };
  (e.Workbook &&
    e.Workbook.WBProps &&
    (ed.forEach(function (o) {
      e.Workbook.WBProps[o[0]] != null &&
        e.Workbook.WBProps[o[0]] != o[1] &&
        (n[o[0]] = e.Workbook.WBProps[o[0]]);
    }),
    e.Workbook.WBProps.CodeName &&
      ((n.codeName = e.Workbook.WBProps.CodeName), delete n.CodeName)),
    (t[t.length] = te("workbookPr", null, n)));
  var a = (e.Workbook && e.Workbook.Sheets) || [],
    i = 0;
  if (a && a[0] && a[0].Hidden) {
    for (
      t[t.length] = "<bookViews>", i = 0;
      i != e.SheetNames.length && !(!a[i] || !a[i].Hidden);
      ++i
    );
    (i == e.SheetNames.length && (i = 0),
      (t[t.length] =
        '<workbookView firstSheet="' + i + '" activeTab="' + i + '"/>'),
      (t[t.length] = "</bookViews>"));
  }
  for (t[t.length] = "<sheets>", i = 0; i != e.SheetNames.length; ++i) {
    var s = { name: Xe(e.SheetNames[i].slice(0, 31)) };
    if (((s.sheetId = "" + (i + 1)), (s["r:id"] = "rId" + (i + 1)), a[i]))
      switch (a[i].Hidden) {
        case 1:
          s.state = "hidden";
          break;
        case 2:
          s.state = "veryHidden";
          break;
      }
    t[t.length] = te("sheet", null, s);
  }
  return (
    (t[t.length] = "</sheets>"),
    r &&
      ((t[t.length] = "<definedNames>"),
      e.Workbook &&
        e.Workbook.Names &&
        e.Workbook.Names.forEach(function (o) {
          var c = { name: o.Name };
          (o.Comment && (c.comment = o.Comment),
            o.Sheet != null && (c.localSheetId = "" + o.Sheet),
            o.Hidden && (c.hidden = "1"),
            o.Ref && (t[t.length] = te("definedName", Xe(o.Ref), c)));
        }),
      (t[t.length] = "</definedNames>")),
    t.length > 2 &&
      ((t[t.length] = "</workbook>"), (t[1] = t[1].replace("/>", ">"))),
    t.join("")
  );
}
function id(e, t) {
  var r = {};
  return (
    (r.Hidden = e.read_shift(4)),
    (r.iTabID = e.read_shift(4)),
    (r.strRelID = Ka(e)),
    (r.name = Vr(e)),
    r
  );
}
function sd(e, t) {
  return (
    t || (t = W(127)),
    t.write_shift(4, e.Hidden),
    t.write_shift(4, e.iTabID),
    di(e.strRelID, t),
    Dr(e.name.slice(0, 31), t),
    t.length > t.l ? t.slice(0, t.l) : t
  );
}
function od(e, t) {
  var r = {},
    n = e.read_shift(4);
  r.defaultThemeVersion = e.read_shift(4);
  var a = t > 8 ? Vr(e) : "";
  return (
    a.length > 0 && (r.CodeName = a),
    (r.autoCompressPictures = !!(n & 65536)),
    (r.backupFile = !!(n & 64)),
    (r.checkCompatibility = !!(n & 4096)),
    (r.date1904 = !!(n & 1)),
    (r.filterPrivacy = !!(n & 8)),
    (r.hidePivotFieldList = !!(n & 1024)),
    (r.promptedSolutions = !!(n & 16)),
    (r.publishItems = !!(n & 2048)),
    (r.refreshAllConnections = !!(n & 262144)),
    (r.saveExternalLinkValues = !!(n & 128)),
    (r.showBorderUnselectedTables = !!(n & 4)),
    (r.showInkAnnotation = !!(n & 32)),
    (r.showObjects = ["all", "placeholders", "none"][(n >> 13) & 3]),
    (r.showPivotChartFilter = !!(n & 32768)),
    (r.updateLinks = ["userSet", "never", "always"][(n >> 8) & 3]),
    r
  );
}
function ld(e, t) {
  t || (t = W(72));
  var r = 0;
  return (
    e && e.filterPrivacy && (r |= 8),
    t.write_shift(4, r),
    t.write_shift(4, 0),
    u0((e && e.CodeName) || "ThisWorkbook", t),
    t.slice(0, t.l)
  );
}
function cd(e, t, r) {
  var n = e.l + t;
  ((e.l += 4), (e.l += 1));
  var a = e.read_shift(4),
    i = ec(e),
    s = Th(e, 0, r),
    o = hi(e);
  e.l = n;
  var c = { Name: i, Ptg: s };
  return (a < 268435455 && (c.Sheet = a), o && (c.Comment = o), c);
}
function fd(e, t) {
  K(e, 143);
  for (var r = 0; r != t.SheetNames.length; ++r) {
    var n =
        (t.Workbook &&
          t.Workbook.Sheets &&
          t.Workbook.Sheets[r] &&
          t.Workbook.Sheets[r].Hidden) ||
        0,
      a = {
        Hidden: n,
        iTabID: r + 1,
        strRelID: "rId" + (r + 1),
        name: t.SheetNames[r],
      };
    K(e, 156, sd(a));
  }
  K(e, 144);
}
function ud(e, t) {
  t || (t = W(127));
  for (var r = 0; r != 4; ++r) t.write_shift(4, 0);
  return (
    Dr("SheetJS", t),
    Dr(sa.version, t),
    Dr(sa.version, t),
    Dr("7262", t),
    t.length > t.l ? t.slice(0, t.l) : t
  );
}
function hd(e, t) {
  (t || (t = W(29)),
    t.write_shift(-4, 0),
    t.write_shift(-4, 460),
    t.write_shift(4, 28800),
    t.write_shift(4, 17600),
    t.write_shift(4, 500),
    t.write_shift(4, e),
    t.write_shift(4, e));
  var r = 120;
  return (t.write_shift(1, r), t.length > t.l ? t.slice(0, t.l) : t);
}
function dd(e, t) {
  if (!(!t.Workbook || !t.Workbook.Sheets)) {
    for (var r = t.Workbook.Sheets, n = 0, a = -1, i = -1; n < r.length; ++n)
      !r[n] || (!r[n].Hidden && a == -1)
        ? (a = n)
        : r[n].Hidden == 1 && i == -1 && (i = n);
    i > a || (K(e, 135), K(e, 158, hd(a)), K(e, 136));
  }
}
function xd(e, t) {
  var r = Xr();
  return (
    K(r, 131),
    K(r, 128, ud()),
    K(r, 153, ld((e.Workbook && e.Workbook.WBProps) || null)),
    dd(r, e),
    fd(r, e),
    K(r, 132),
    r.end()
  );
}
function pd(e, t, r) {
  return (t.slice(-4) === ".bin" ? xd : Z0)(e);
}
function md(e, t, r, n, a) {
  return (t.slice(-4) === ".bin" ? Q1 : q0)(e, r, n, a);
}
function gd(e, t, r) {
  return (t.slice(-4) === ".bin" ? If : I0)(e, r);
}
function vd(e, t, r) {
  return (t.slice(-4) === ".bin" ? lf : N0)(e, r);
}
function _d(e, t, r) {
  return (t.slice(-4) === ".bin" ? Jf : U0)(e);
}
function Td(e) {
  return (e.slice(-4) === ".bin" ? Hf : B0)();
}
function Ed(e, t) {
  var r = [];
  return (
    e.Props && r.push(mc(e.Props, t)),
    e.Custprops && r.push(gc(e.Props, e.Custprops)),
    r.join("")
  );
}
function Sd() {
  return "";
}
function wd(e, t) {
  var r = ['<Style ss:ID="Default" ss:Name="Normal"><NumberFormat/></Style>'];
  return (
    t.cellXfs.forEach(function (n, a) {
      var i = [];
      i.push(te("NumberFormat", null, { "ss:Format": Xe(gr[n.numFmtId]) }));
      var s = { "ss:ID": "s" + (21 + a) };
      r.push(te("Style", i.join(""), s));
    }),
    te("Styles", r.join(""))
  );
}
function eo(e) {
  return te("NamedRange", null, {
    "ss:Name": e.Name,
    "ss:RefersTo": "=" + gi(e.Ref, { r: 0, c: 0 }),
  });
}
function Ad(e) {
  if (!((e || {}).Workbook || {}).Names) return "";
  for (var t = e.Workbook.Names, r = [], n = 0; n < t.length; ++n) {
    var a = t[n];
    a.Sheet == null && (a.Name.match(/^_xlfn\./) || r.push(eo(a)));
  }
  return te("Names", r.join(""));
}
function yd(e, t, r, n) {
  if (!e || !((n || {}).Workbook || {}).Names) return "";
  for (var a = n.Workbook.Names, i = [], s = 0; s < a.length; ++s) {
    var o = a[s];
    o.Sheet == r && (o.Name.match(/^_xlfn\./) || i.push(eo(o)));
  }
  return i.join("");
}
function Cd(e, t, r, n) {
  if (!e) return "";
  var a = [];
  if (
    (e["!margins"] &&
      (a.push("<PageSetup>"),
      e["!margins"].header &&
        a.push(te("Header", null, { "x:Margin": e["!margins"].header })),
      e["!margins"].footer &&
        a.push(te("Footer", null, { "x:Margin": e["!margins"].footer })),
      a.push(
        te("PageMargins", null, {
          "x:Bottom": e["!margins"].bottom || "0.75",
          "x:Left": e["!margins"].left || "0.7",
          "x:Right": e["!margins"].right || "0.7",
          "x:Top": e["!margins"].top || "0.75",
        }),
      ),
      a.push("</PageSetup>")),
    n && n.Workbook && n.Workbook.Sheets && n.Workbook.Sheets[r])
  )
    if (n.Workbook.Sheets[r].Hidden)
      a.push(
        te(
          "Visible",
          n.Workbook.Sheets[r].Hidden == 1 ? "SheetHidden" : "SheetVeryHidden",
          {},
        ),
      );
    else {
      for (
        var i = 0;
        i < r && !(n.Workbook.Sheets[i] && !n.Workbook.Sheets[i].Hidden);
        ++i
      );
      i == r && a.push("<Selected/>");
    }
  return (
    ((((n || {}).Workbook || {}).Views || [])[0] || {}).RTL &&
      a.push("<DisplayRightToLeft/>"),
    e["!protect"] &&
      (a.push(Mr("ProtectContents", "True")),
      e["!protect"].objects && a.push(Mr("ProtectObjects", "True")),
      e["!protect"].scenarios && a.push(Mr("ProtectScenarios", "True")),
      e["!protect"].selectLockedCells != null &&
      !e["!protect"].selectLockedCells
        ? a.push(Mr("EnableSelection", "NoSelection"))
        : e["!protect"].selectUnlockedCells != null &&
          !e["!protect"].selectUnlockedCells &&
          a.push(Mr("EnableSelection", "UnlockedCells")),
      [
        ["formatCells", "AllowFormatCells"],
        ["formatColumns", "AllowSizeCols"],
        ["formatRows", "AllowSizeRows"],
        ["insertColumns", "AllowInsertCols"],
        ["insertRows", "AllowInsertRows"],
        ["insertHyperlinks", "AllowInsertHyperlinks"],
        ["deleteColumns", "AllowDeleteCols"],
        ["deleteRows", "AllowDeleteRows"],
        ["sort", "AllowSort"],
        ["autoFilter", "AllowFilter"],
        ["pivotTables", "AllowUsePivotTables"],
      ].forEach(function (s) {
        e["!protect"][s[0]] && a.push("<" + s[1] + "/>");
      })),
    a.length == 0 ? "" : te("WorksheetOptions", a.join(""), { xmlns: rt.x })
  );
}
function Fd(e) {
  return e
    .map(function (t) {
      var r = Dl(t.t || ""),
        n = te("ss:Data", r, { xmlns: "http://www.w3.org/TR/REC-html40" });
      return te("Comment", n, { "ss:Author": t.a });
    })
    .join("");
}
function bd(e, t, r, n, a, i, s) {
  if (!e || (e.v == null && e.f == null)) return "";
  var o = {};
  if (
    (e.f && (o["ss:Formula"] = "=" + Xe(gi(e.f, s))),
    e.F && e.F.slice(0, t.length) == t)
  ) {
    var c = kr(e.F.slice(t.length + 1));
    o["ss:ArrayRange"] =
      "RC:R" +
      (c.r == s.r ? "" : "[" + (c.r - s.r) + "]") +
      "C" +
      (c.c == s.c ? "" : "[" + (c.c - s.c) + "]");
  }
  if (
    (e.l &&
      e.l.Target &&
      ((o["ss:HRef"] = Xe(e.l.Target)),
      e.l.Tooltip && (o["x:HRefScreenTip"] = Xe(e.l.Tooltip))),
    r["!merges"])
  )
    for (var l = r["!merges"], f = 0; f != l.length; ++f)
      l[f].s.c != s.c ||
        l[f].s.r != s.r ||
        (l[f].e.c > l[f].s.c && (o["ss:MergeAcross"] = l[f].e.c - l[f].s.c),
        l[f].e.r > l[f].s.r && (o["ss:MergeDown"] = l[f].e.r - l[f].s.r));
  var m = "",
    p = "";
  switch (e.t) {
    case "z":
      if (!n.sheetStubs) return "";
      break;
    case "n":
      ((m = "Number"), (p = String(e.v)));
      break;
    case "b":
      ((m = "Boolean"), (p = e.v ? "1" : "0"));
      break;
    case "e":
      ((m = "Error"), (p = $n[e.v]));
      break;
    case "d":
      ((m = "DateTime"),
        (p = new Date(e.v).toISOString()),
        e.z == null && (e.z = e.z || gr[14]));
      break;
    case "s":
      ((m = "String"), (p = kl(e.v || "")));
      break;
  }
  var d = Lt(n.cellXfs, e, n);
  ((o["ss:StyleID"] = "s" + (21 + d)), (o["ss:Index"] = s.c + 1));
  var _ = e.v != null ? p : "",
    h = e.t == "z" ? "" : '<Data ss:Type="' + m + '">' + _ + "</Data>";
  return ((e.c || []).length > 0 && (h += Fd(e.c)), te("Cell", h, o));
}
function kd(e, t) {
  var r = '<Row ss:Index="' + (e + 1) + '"';
  return (
    t &&
      (t.hpt && !t.hpx && (t.hpx = R0(t.hpt)),
      t.hpx && (r += ' ss:AutoFitHeight="0" ss:Height="' + t.hpx + '"'),
      t.hidden && (r += ' ss:Hidden="1"')),
    r + ">"
  );
}
function Dd(e, t, r, n) {
  if (!e["!ref"]) return "";
  var a = lr(e["!ref"]),
    i = e["!merges"] || [],
    s = 0,
    o = [];
  e["!cols"] &&
    e["!cols"].forEach(function (x, C) {
      pi(x);
      var F = !!x.width,
        y = Pa(C, x),
        P = { "ss:Index": C + 1 };
      (F && (P["ss:Width"] = pa(y.width)),
        x.hidden && (P["ss:Hidden"] = "1"),
        o.push(te("Column", null, P)));
    });
  for (var c = Array.isArray(e), l = a.s.r; l <= a.e.r; ++l) {
    for (var f = [kd(l, (e["!rows"] || [])[l])], m = a.s.c; m <= a.e.c; ++m) {
      var p = !1;
      for (s = 0; s != i.length; ++s)
        if (
          !(i[s].s.c > m) &&
          !(i[s].s.r > l) &&
          !(i[s].e.c < m) &&
          !(i[s].e.r < l)
        ) {
          (i[s].s.c != m || i[s].s.r != l) && (p = !0);
          break;
        }
      if (!p) {
        var d = { r: l, c: m },
          _ = Ke(d),
          h = c ? (e[l] || [])[m] : e[_];
        f.push(bd(h, _, e, t, r, n, d));
      }
    }
    (f.push("</Row>"), f.length > 2 && o.push(f.join("")));
  }
  return o.join("");
}
function Nd(e, t, r) {
  var n = [],
    a = r.SheetNames[e],
    i = r.Sheets[a],
    s = i ? yd(i, t, e, r) : "";
  return (
    s.length > 0 && n.push("<Names>" + s + "</Names>"),
    (s = i ? Dd(i, t, e, r) : ""),
    s.length > 0 && n.push("<Table>" + s + "</Table>"),
    n.push(Cd(i, t, e, r)),
    n.join("")
  );
}
function Pd(e, t) {
  (t || (t = {}),
    e.SSF || (e.SSF = qr(gr)),
    e.SSF &&
      (Fa(),
      Ca(e.SSF),
      (t.revssf = ba(e.SSF)),
      (t.revssf[e.SSF[65535]] = 0),
      (t.ssf = e.SSF),
      (t.cellXfs = []),
      Lt(t.cellXfs, {}, { revssf: { General: 0 } })));
  var r = [];
  (r.push(Ed(e, t)), r.push(Sd()), r.push(""), r.push(""));
  for (var n = 0; n < e.SheetNames.length; ++n)
    r.push(te("Worksheet", Nd(n, t, e), { "ss:Name": Xe(e.SheetNames[n]) }));
  return (
    (r[2] = wd(e, t)),
    (r[3] = Ad(e)),
    Sr +
      te("Workbook", r.join(""), {
        xmlns: rt.ss,
        "xmlns:o": rt.o,
        "xmlns:x": rt.x,
        "xmlns:ss": rt.ss,
        "xmlns:dt": rt.dt,
        "xmlns:html": rt.html,
      })
  );
}
var Ua = {
  SI: "e0859ff2f94f6810ab9108002b27b3d9",
  DSI: "02d5cdd59c2e1b10939708002b2cf9ae",
  UDI: "05d5cdd59c2e1b10939708002b2cf9ae",
};
function Od(e, t) {
  var r = [],
    n = [],
    a = [],
    i = 0,
    s,
    o = Li(Ki, "n"),
    c = Li(qi, "n");
  if (e.Props)
    for (s = jr(e.Props), i = 0; i < s.length; ++i)
      (Object.prototype.hasOwnProperty.call(o, s[i])
        ? r
        : Object.prototype.hasOwnProperty.call(c, s[i])
          ? n
          : a
      ).push([s[i], e.Props[s[i]]]);
  if (e.Custprops)
    for (s = jr(e.Custprops), i = 0; i < s.length; ++i)
      Object.prototype.hasOwnProperty.call(e.Props || {}, s[i]) ||
        (Object.prototype.hasOwnProperty.call(o, s[i])
          ? r
          : Object.prototype.hasOwnProperty.call(c, s[i])
            ? n
            : a
        ).push([s[i], e.Custprops[s[i]]]);
  var l = [];
  for (i = 0; i < a.length; ++i)
    A0.indexOf(a[i][0]) > -1 ||
      E0.indexOf(a[i][0]) > -1 ||
      (a[i][1] != null && l.push(a[i]));
  (n.length && rr.utils.cfb_add(t, "/SummaryInformation", rs(n, Ua.SI, c, qi)),
    (r.length || l.length) &&
      rr.utils.cfb_add(
        t,
        "/DocumentSummaryInformation",
        rs(r, Ua.DSI, o, Ki, l.length ? l : null, Ua.UDI),
      ));
}
function Rd(e, t) {
  var r = t || {},
    n = rr.utils.cfb_new({ root: "R" }),
    a = "/Workbook";
  switch (r.bookType || "xls") {
    case "xls":
      r.bookType = "biff8";
    case "xla":
      r.bookType || (r.bookType = "xla");
    case "biff8":
      ((a = "/Workbook"), (r.biff = 8));
      break;
    case "biff5":
      ((a = "/Book"), (r.biff = 5));
      break;
    default:
      throw new Error("invalid type " + r.bookType + " for XLS CFB");
  }
  return (
    rr.utils.cfb_add(n, a, ro(e, r)),
    r.biff == 8 && (e.Props || e.Custprops) && Od(e, n),
    r.biff == 8 &&
      e.vbaraw &&
      Qf(
        n,
        rr.read(e.vbaraw, {
          type: typeof e.vbaraw == "string" ? "binary" : "buffer",
        }),
      ),
    n
  );
}
var Id = {
  0: { f: Bh },
  1: { f: Yh },
  2: { f: h1 },
  3: { f: e1 },
  4: { f: qh },
  5: { f: l1 },
  6: { f: g1 },
  7: { f: a1 },
  8: { f: A1 },
  9: { f: w1 },
  10: { f: E1 },
  11: { f: S1 },
  12: { f: Xh },
  13: { f: x1 },
  14: { f: t1 },
  15: { f: Qh },
  16: { f: f1 },
  17: { f: _1 },
  18: { f: s1 },
  19: { f: ui },
  20: {},
  21: {},
  22: {},
  23: {},
  24: {},
  25: {},
  26: {},
  27: {},
  28: {},
  29: {},
  30: {},
  31: {},
  32: {},
  33: {},
  34: {},
  35: { T: 1 },
  36: { T: -1 },
  37: { T: 1 },
  38: { T: -1 },
  39: { f: cd },
  40: {},
  42: {},
  43: { f: gf },
  44: { f: pf },
  45: { f: Tf },
  46: { f: Sf },
  47: { f: Ef },
  48: {},
  49: { f: zl },
  50: {},
  51: { f: Bf },
  52: { T: 1 },
  53: { T: -1 },
  54: { T: 1 },
  55: { T: -1 },
  56: { T: 1 },
  57: { T: -1 },
  58: {},
  59: {},
  60: { f: Xc },
  62: { f: m1 },
  63: { f: Gf },
  64: { f: U1 },
  65: {},
  66: {},
  67: {},
  68: {},
  69: {},
  70: {},
  128: {},
  129: { T: 1 },
  130: { T: -1 },
  131: { T: 1, f: vt, p: 0 },
  132: { T: -1 },
  133: { T: 1 },
  134: { T: -1 },
  135: { T: 1 },
  136: { T: -1 },
  137: { T: 1, f: L1 },
  138: { T: -1 },
  139: { T: 1 },
  140: { T: -1 },
  141: { T: 1 },
  142: { T: -1 },
  143: { T: 1 },
  144: { T: -1 },
  145: { T: 1 },
  146: { T: -1 },
  147: { f: Gh },
  148: { f: Wh, p: 16 },
  151: { f: D1 },
  152: {},
  153: { f: od },
  154: {},
  155: {},
  156: { f: id },
  157: {},
  158: {},
  159: { T: 1, f: af },
  160: { T: -1 },
  161: { T: 1, f: Xt },
  162: { T: -1 },
  163: { T: 1 },
  164: { T: -1 },
  165: { T: 1 },
  166: { T: -1 },
  167: {},
  168: {},
  169: {},
  170: {},
  171: {},
  172: { T: 1 },
  173: { T: -1 },
  174: {},
  175: {},
  176: { f: y1 },
  177: { T: 1 },
  178: { T: -1 },
  179: { T: 1 },
  180: { T: -1 },
  181: { T: 1 },
  182: { T: -1 },
  183: { T: 1 },
  184: { T: -1 },
  185: { T: 1 },
  186: { T: -1 },
  187: { T: 1 },
  188: { T: -1 },
  189: { T: 1 },
  190: { T: -1 },
  191: { T: 1 },
  192: { T: -1 },
  193: { T: 1 },
  194: { T: -1 },
  195: { T: 1 },
  196: { T: -1 },
  197: { T: 1 },
  198: { T: -1 },
  199: { T: 1 },
  200: { T: -1 },
  201: { T: 1 },
  202: { T: -1 },
  203: { T: 1 },
  204: { T: -1 },
  205: { T: 1 },
  206: { T: -1 },
  207: { T: 1 },
  208: { T: -1 },
  209: { T: 1 },
  210: { T: -1 },
  211: { T: 1 },
  212: { T: -1 },
  213: { T: 1 },
  214: { T: -1 },
  215: { T: 1 },
  216: { T: -1 },
  217: { T: 1 },
  218: { T: -1 },
  219: { T: 1 },
  220: { T: -1 },
  221: { T: 1 },
  222: { T: -1 },
  223: { T: 1 },
  224: { T: -1 },
  225: { T: 1 },
  226: { T: -1 },
  227: { T: 1 },
  228: { T: -1 },
  229: { T: 1 },
  230: { T: -1 },
  231: { T: 1 },
  232: { T: -1 },
  233: { T: 1 },
  234: { T: -1 },
  235: { T: 1 },
  236: { T: -1 },
  237: { T: 1 },
  238: { T: -1 },
  239: { T: 1 },
  240: { T: -1 },
  241: { T: 1 },
  242: { T: -1 },
  243: { T: 1 },
  244: { T: -1 },
  245: { T: 1 },
  246: { T: -1 },
  247: { T: 1 },
  248: { T: -1 },
  249: { T: 1 },
  250: { T: -1 },
  251: { T: 1 },
  252: { T: -1 },
  253: { T: 1 },
  254: { T: -1 },
  255: { T: 1 },
  256: { T: -1 },
  257: { T: 1 },
  258: { T: -1 },
  259: { T: 1 },
  260: { T: -1 },
  261: { T: 1 },
  262: { T: -1 },
  263: { T: 1 },
  264: { T: -1 },
  265: { T: 1 },
  266: { T: -1 },
  267: { T: 1 },
  268: { T: -1 },
  269: { T: 1 },
  270: { T: -1 },
  271: { T: 1 },
  272: { T: -1 },
  273: { T: 1 },
  274: { T: -1 },
  275: { T: 1 },
  276: { T: -1 },
  277: {},
  278: { T: 1 },
  279: { T: -1 },
  280: { T: 1 },
  281: { T: -1 },
  282: { T: 1 },
  283: { T: 1 },
  284: { T: -1 },
  285: { T: 1 },
  286: { T: -1 },
  287: { T: 1 },
  288: { T: -1 },
  289: { T: 1 },
  290: { T: -1 },
  291: { T: 1 },
  292: { T: -1 },
  293: { T: 1 },
  294: { T: -1 },
  295: { T: 1 },
  296: { T: -1 },
  297: { T: 1 },
  298: { T: -1 },
  299: { T: 1 },
  300: { T: -1 },
  301: { T: 1 },
  302: { T: -1 },
  303: { T: 1 },
  304: { T: -1 },
  305: { T: 1 },
  306: { T: -1 },
  307: { T: 1 },
  308: { T: -1 },
  309: { T: 1 },
  310: { T: -1 },
  311: { T: 1 },
  312: { T: -1 },
  313: { T: -1 },
  314: { T: 1 },
  315: { T: -1 },
  316: { T: 1 },
  317: { T: -1 },
  318: { T: 1 },
  319: { T: -1 },
  320: { T: 1 },
  321: { T: -1 },
  322: { T: 1 },
  323: { T: -1 },
  324: { T: 1 },
  325: { T: -1 },
  326: { T: 1 },
  327: { T: -1 },
  328: { T: 1 },
  329: { T: -1 },
  330: { T: 1 },
  331: { T: -1 },
  332: { T: 1 },
  333: { T: -1 },
  334: { T: 1 },
  335: { f: Lf },
  336: { T: -1 },
  337: { f: Wf, T: 1 },
  338: { T: -1 },
  339: { T: 1 },
  340: { T: -1 },
  341: { T: 1 },
  342: { T: -1 },
  343: { T: 1 },
  344: { T: -1 },
  345: { T: 1 },
  346: { T: -1 },
  347: { T: 1 },
  348: { T: -1 },
  349: { T: 1 },
  350: { T: -1 },
  351: {},
  352: {},
  353: { T: 1 },
  354: { T: -1 },
  355: { f: Ka },
  357: {},
  358: {},
  359: {},
  360: { T: 1 },
  361: {},
  362: { f: Vc },
  363: {},
  364: {},
  366: {},
  367: {},
  368: {},
  369: {},
  370: {},
  371: {},
  372: { T: 1 },
  373: { T: -1 },
  374: { T: 1 },
  375: { T: -1 },
  376: { T: 1 },
  377: { T: -1 },
  378: { T: 1 },
  379: { T: -1 },
  380: { T: 1 },
  381: { T: -1 },
  382: { T: 1 },
  383: { T: -1 },
  384: { T: 1 },
  385: { T: -1 },
  386: { T: 1 },
  387: { T: -1 },
  388: { T: 1 },
  389: { T: -1 },
  390: { T: 1 },
  391: { T: -1 },
  392: { T: 1 },
  393: { T: -1 },
  394: { T: 1 },
  395: { T: -1 },
  396: {},
  397: {},
  398: {},
  399: {},
  400: {},
  401: { T: 1 },
  403: {},
  404: {},
  405: {},
  406: {},
  407: {},
  408: {},
  409: {},
  410: {},
  411: {},
  412: {},
  413: {},
  414: {},
  415: {},
  416: {},
  417: {},
  418: {},
  419: {},
  420: {},
  421: {},
  422: { T: 1 },
  423: { T: 1 },
  424: { T: -1 },
  425: { T: -1 },
  426: { f: N1 },
  427: { f: P1 },
  428: {},
  429: { T: 1 },
  430: { T: -1 },
  431: { T: 1 },
  432: { T: -1 },
  433: { T: 1 },
  434: { T: -1 },
  435: { T: 1 },
  436: { T: -1 },
  437: { T: 1 },
  438: { T: -1 },
  439: { T: 1 },
  440: { T: -1 },
  441: { T: 1 },
  442: { T: -1 },
  443: { T: 1 },
  444: { T: -1 },
  445: { T: 1 },
  446: { T: -1 },
  447: { T: 1 },
  448: { T: -1 },
  449: { T: 1 },
  450: { T: -1 },
  451: { T: 1 },
  452: { T: -1 },
  453: { T: 1 },
  454: { T: -1 },
  455: { T: 1 },
  456: { T: -1 },
  457: { T: 1 },
  458: { T: -1 },
  459: { T: 1 },
  460: { T: -1 },
  461: { T: 1 },
  462: { T: -1 },
  463: { T: 1 },
  464: { T: -1 },
  465: { T: 1 },
  466: { T: -1 },
  467: { T: 1 },
  468: { T: -1 },
  469: { T: 1 },
  470: { T: -1 },
  471: {},
  472: {},
  473: { T: 1 },
  474: { T: -1 },
  475: {},
  476: { f: R1 },
  477: {},
  478: {},
  479: { T: 1 },
  480: { T: -1 },
  481: { T: 1 },
  482: { T: -1 },
  483: { T: 1 },
  484: { T: -1 },
  485: { f: Hh },
  486: { T: 1 },
  487: { T: -1 },
  488: { T: 1 },
  489: { T: -1 },
  490: { T: 1 },
  491: { T: -1 },
  492: { T: 1 },
  493: { T: -1 },
  494: { f: b1 },
  495: { T: 1 },
  496: { T: -1 },
  497: { T: 1 },
  498: { T: -1 },
  499: {},
  500: { T: 1 },
  501: { T: -1 },
  502: { T: 1 },
  503: { T: -1 },
  504: {},
  505: { T: 1 },
  506: { T: -1 },
  507: {},
  508: { T: 1 },
  509: { T: -1 },
  510: { T: 1 },
  511: { T: -1 },
  512: {},
  513: {},
  514: { T: 1 },
  515: { T: -1 },
  516: { T: 1 },
  517: { T: -1 },
  518: { T: 1 },
  519: { T: -1 },
  520: { T: 1 },
  521: { T: -1 },
  522: {},
  523: {},
  524: {},
  525: {},
  526: {},
  527: {},
  528: { T: 1 },
  529: { T: -1 },
  530: { T: 1 },
  531: { T: -1 },
  532: { T: 1 },
  533: { T: -1 },
  534: {},
  535: {},
  536: {},
  537: {},
  538: { T: 1 },
  539: { T: -1 },
  540: { T: 1 },
  541: { T: -1 },
  542: { T: 1 },
  548: {},
  549: {},
  550: { f: Ka },
  551: {},
  552: {},
  553: {},
  554: { T: 1 },
  555: { T: -1 },
  556: { T: 1 },
  557: { T: -1 },
  558: { T: 1 },
  559: { T: -1 },
  560: { T: 1 },
  561: { T: -1 },
  562: {},
  564: {},
  565: { T: 1 },
  566: { T: -1 },
  569: { T: 1 },
  570: { T: -1 },
  572: {},
  573: { T: 1 },
  574: { T: -1 },
  577: {},
  578: {},
  579: {},
  580: {},
  581: {},
  582: {},
  583: {},
  584: {},
  585: {},
  586: {},
  587: {},
  588: { T: -1 },
  589: {},
  590: { T: 1 },
  591: { T: -1 },
  592: { T: 1 },
  593: { T: -1 },
  594: { T: 1 },
  595: { T: -1 },
  596: {},
  597: { T: 1 },
  598: { T: -1 },
  599: { T: 1 },
  600: { T: -1 },
  601: { T: 1 },
  602: { T: -1 },
  603: { T: 1 },
  604: { T: -1 },
  605: { T: 1 },
  606: { T: -1 },
  607: {},
  608: { T: 1 },
  609: { T: -1 },
  610: {},
  611: { T: 1 },
  612: { T: -1 },
  613: { T: 1 },
  614: { T: -1 },
  615: { T: 1 },
  616: { T: -1 },
  617: { T: 1 },
  618: { T: -1 },
  619: { T: 1 },
  620: { T: -1 },
  625: {},
  626: { T: 1 },
  627: { T: -1 },
  628: { T: 1 },
  629: { T: -1 },
  630: { T: 1 },
  631: { T: -1 },
  632: { f: Kf },
  633: { T: 1 },
  634: { T: -1 },
  635: { T: 1, f: zf },
  636: { T: -1 },
  637: { f: Jl },
  638: { T: 1 },
  639: {},
  640: { T: -1 },
  641: { T: 1 },
  642: { T: -1 },
  643: { T: 1 },
  644: {},
  645: { T: -1 },
  646: { T: 1 },
  648: { T: 1 },
  649: {},
  650: { T: -1 },
  651: { f: Z1 },
  652: {},
  653: { T: 1 },
  654: { T: -1 },
  655: { T: 1 },
  656: { T: -1 },
  657: { T: 1 },
  658: { T: -1 },
  659: {},
  660: { T: 1 },
  661: {},
  662: { T: -1 },
  663: {},
  664: { T: 1 },
  665: {},
  666: { T: -1 },
  667: {},
  668: {},
  669: {},
  671: { T: 1 },
  672: { T: -1 },
  673: { T: 1 },
  674: { T: -1 },
  675: {},
  676: {},
  677: {},
  678: {},
  679: {},
  680: {},
  681: {},
  1024: {},
  1025: {},
  1026: { T: 1 },
  1027: { T: -1 },
  1028: { T: 1 },
  1029: { T: -1 },
  1030: {},
  1031: { T: 1 },
  1032: { T: -1 },
  1033: { T: 1 },
  1034: { T: -1 },
  1035: {},
  1036: {},
  1037: {},
  1038: { T: 1 },
  1039: { T: -1 },
  1040: {},
  1041: { T: 1 },
  1042: { T: -1 },
  1043: {},
  1044: {},
  1045: {},
  1046: { T: 1 },
  1047: { T: -1 },
  1048: { T: 1 },
  1049: { T: -1 },
  1050: {},
  1051: { T: 1 },
  1052: { T: 1 },
  1053: { f: W1 },
  1054: { T: 1 },
  1055: {},
  1056: { T: 1 },
  1057: { T: -1 },
  1058: { T: 1 },
  1059: { T: -1 },
  1061: {},
  1062: { T: 1 },
  1063: { T: -1 },
  1064: { T: 1 },
  1065: { T: -1 },
  1066: { T: 1 },
  1067: { T: -1 },
  1068: { T: 1 },
  1069: { T: -1 },
  1070: { T: 1 },
  1071: { T: -1 },
  1072: { T: 1 },
  1073: { T: -1 },
  1075: { T: 1 },
  1076: { T: -1 },
  1077: { T: 1 },
  1078: { T: -1 },
  1079: { T: 1 },
  1080: { T: -1 },
  1081: { T: 1 },
  1082: { T: -1 },
  1083: { T: 1 },
  1084: { T: -1 },
  1085: {},
  1086: { T: 1 },
  1087: { T: -1 },
  1088: { T: 1 },
  1089: { T: -1 },
  1090: { T: 1 },
  1091: { T: -1 },
  1092: { T: 1 },
  1093: { T: -1 },
  1094: { T: 1 },
  1095: { T: -1 },
  1096: {},
  1097: { T: 1 },
  1098: {},
  1099: { T: -1 },
  1100: { T: 1 },
  1101: { T: -1 },
  1102: {},
  1103: {},
  1104: {},
  1105: {},
  1111: {},
  1112: {},
  1113: { T: 1 },
  1114: { T: -1 },
  1115: { T: 1 },
  1116: { T: -1 },
  1117: {},
  1118: { T: 1 },
  1119: { T: -1 },
  1120: { T: 1 },
  1121: { T: -1 },
  1122: { T: 1 },
  1123: { T: -1 },
  1124: { T: 1 },
  1125: { T: -1 },
  1126: {},
  1128: { T: 1 },
  1129: { T: -1 },
  1130: {},
  1131: { T: 1 },
  1132: { T: -1 },
  1133: { T: 1 },
  1134: { T: -1 },
  1135: { T: 1 },
  1136: { T: -1 },
  1137: { T: 1 },
  1138: { T: -1 },
  1139: { T: 1 },
  1140: { T: -1 },
  1141: {},
  1142: { T: 1 },
  1143: { T: -1 },
  1144: { T: 1 },
  1145: { T: -1 },
  1146: {},
  1147: { T: 1 },
  1148: { T: -1 },
  1149: { T: 1 },
  1150: { T: -1 },
  1152: { T: 1 },
  1153: { T: -1 },
  1154: { T: -1 },
  1155: { T: -1 },
  1156: { T: -1 },
  1157: { T: 1 },
  1158: { T: -1 },
  1159: { T: 1 },
  1160: { T: -1 },
  1161: { T: 1 },
  1162: { T: -1 },
  1163: { T: 1 },
  1164: { T: -1 },
  1165: { T: 1 },
  1166: { T: -1 },
  1167: { T: 1 },
  1168: { T: -1 },
  1169: { T: 1 },
  1170: { T: -1 },
  1171: {},
  1172: { T: 1 },
  1173: { T: -1 },
  1177: {},
  1178: { T: 1 },
  1180: {},
  1181: {},
  1182: {},
  2048: { T: 1 },
  2049: { T: -1 },
  2050: {},
  2051: { T: 1 },
  2052: { T: -1 },
  2053: {},
  2054: {},
  2055: { T: 1 },
  2056: { T: -1 },
  2057: { T: 1 },
  2058: { T: -1 },
  2060: {},
  2067: {},
  2068: { T: 1 },
  2069: { T: -1 },
  2070: {},
  2071: {},
  2072: { T: 1 },
  2073: { T: -1 },
  2075: {},
  2076: {},
  2077: { T: 1 },
  2078: { T: -1 },
  2079: {},
  2080: { T: 1 },
  2081: { T: -1 },
  2082: {},
  2083: { T: 1 },
  2084: { T: -1 },
  2085: { T: 1 },
  2086: { T: -1 },
  2087: { T: 1 },
  2088: { T: -1 },
  2089: { T: 1 },
  2090: { T: -1 },
  2091: {},
  2092: {},
  2093: { T: 1 },
  2094: { T: -1 },
  2095: {},
  2096: { T: 1 },
  2097: { T: -1 },
  2098: { T: 1 },
  2099: { T: -1 },
  2100: { T: 1 },
  2101: { T: -1 },
  2102: {},
  2103: { T: 1 },
  2104: { T: -1 },
  2105: {},
  2106: { T: 1 },
  2107: { T: -1 },
  2108: {},
  2109: { T: 1 },
  2110: { T: -1 },
  2111: { T: 1 },
  2112: { T: -1 },
  2113: { T: 1 },
  2114: { T: -1 },
  2115: {},
  2116: {},
  2117: {},
  2118: { T: 1 },
  2119: { T: -1 },
  2120: {},
  2121: { T: 1 },
  2122: { T: -1 },
  2123: { T: 1 },
  2124: { T: -1 },
  2125: {},
  2126: { T: 1 },
  2127: { T: -1 },
  2128: {},
  2129: { T: 1 },
  2130: { T: -1 },
  2131: { T: 1 },
  2132: { T: -1 },
  2133: { T: 1 },
  2134: {},
  2135: {},
  2136: {},
  2137: { T: 1 },
  2138: { T: -1 },
  2139: { T: 1 },
  2140: { T: -1 },
  2141: {},
  3072: {},
  3073: {},
  4096: { T: 1 },
  4097: { T: -1 },
  5002: { T: 1 },
  5003: { T: -1 },
  5081: { T: 1 },
  5082: { T: -1 },
  5083: {},
  5084: { T: 1 },
  5085: { T: -1 },
  5086: { T: 1 },
  5087: { T: -1 },
  5088: {},
  5089: {},
  5090: {},
  5092: { T: 1 },
  5093: { T: -1 },
  5094: {},
  5095: { T: 1 },
  5096: { T: -1 },
  5097: {},
  5099: {},
  65535: { n: "" },
};
function ne(e, t, r, n) {
  var a = t;
  if (!isNaN(a)) {
    var i = n || (r || []).length || 0,
      s = e.next(4);
    (s.write_shift(2, a), s.write_shift(2, i), i > 0 && li(r) && e.push(r));
  }
}
function Ld(e, t, r, n) {
  var a = (r || []).length || 0;
  if (a <= 8224) return ne(e, t, r, a);
  var i = t;
  if (!isNaN(i)) {
    for (
      var s = r.parts || [], o = 0, c = 0, l = 0;
      l + (s[o] || 8224) <= 8224;
    )
      ((l += s[o] || 8224), o++);
    var f = e.next(4);
    for (
      f.write_shift(2, i),
        f.write_shift(2, l),
        e.push(r.slice(c, c + l)),
        c += l;
      c < a;
    ) {
      for (
        f = e.next(4), f.write_shift(2, 60), l = 0;
        l + (s[o] || 8224) <= 8224;
      )
        ((l += s[o] || 8224), o++);
      (f.write_shift(2, l), e.push(r.slice(c, c + l)), (c += l));
    }
  }
}
function zn(e, t, r) {
  return (
    e || (e = W(7)),
    e.write_shift(2, t),
    e.write_shift(2, r),
    e.write_shift(2, 0),
    e.write_shift(1, 0),
    e
  );
}
function Md(e, t, r, n) {
  var a = W(9);
  return (zn(a, e, t), C0(r, n || "b", a), a);
}
function Bd(e, t, r) {
  var n = W(8 + 2 * r.length);
  return (
    zn(n, e, t),
    n.write_shift(1, r.length),
    n.write_shift(r.length, r, "sbcs"),
    n.l < n.length ? n.slice(0, n.l) : n
  );
}
function jd(e, t, r, n) {
  if (t.v != null)
    switch (t.t) {
      case "d":
      case "n":
        var a = t.t == "d" ? Kr(Yr(t.v)) : t.v;
        a == (a | 0) && a >= 0 && a < 65536
          ? ne(e, 2, Qc(r, n, a))
          : ne(e, 3, Jc(r, n, a));
        return;
      case "b":
      case "e":
        ne(e, 5, Md(r, n, t.v, t.t));
        return;
      case "s":
      case "str":
        ne(e, 4, Bd(r, n, (t.v || "").slice(0, 255)));
        return;
    }
  ne(e, 1, zn(null, r, n));
}
function Ud(e, t, r, n) {
  var a = Array.isArray(t),
    i = lr(t["!ref"] || "A1"),
    s,
    o = "",
    c = [];
  if (i.e.c > 255 || i.e.r > 16383) {
    if (n.WTF)
      throw new Error(
        "Range " + (t["!ref"] || "A1") + " exceeds format limit A1:IV16384",
      );
    ((i.e.c = Math.min(i.e.c, 255)),
      (i.e.r = Math.min(i.e.c, 16383)),
      (s = Er(i)));
  }
  for (var l = i.s.r; l <= i.e.r; ++l) {
    o = Br(l);
    for (var f = i.s.c; f <= i.e.c; ++f) {
      (l === i.s.r && (c[f] = Wr(f)), (s = c[f] + o));
      var m = a ? (t[l] || [])[f] : t[s];
      m && jd(e, m, l, f);
    }
  }
}
function Wd(e, t) {
  for (var r = t || {}, n = Xr(), a = 0, i = 0; i < e.SheetNames.length; ++i)
    e.SheetNames[i] == r.sheet && (a = i);
  if (a == 0 && r.sheet && e.SheetNames[0] != r.sheet)
    throw new Error("Sheet not found: " + r.sheet);
  return (
    ne(n, r.biff == 4 ? 1033 : r.biff == 3 ? 521 : 9, xi(e, 16, r)),
    Ud(n, e.Sheets[e.SheetNames[a]], a, r),
    ne(n, 10),
    n.end()
  );
}
function Vd(e, t, r) {
  ne(e, 49, Rc({ sz: 12, name: "Arial" }, r));
}
function Hd(e, t, r) {
  t &&
    [
      [5, 8],
      [23, 26],
      [41, 44],
      [50, 392],
    ].forEach(function (n) {
      for (var a = n[0]; a <= n[1]; ++a)
        t[a] != null && ne(e, 1054, Mc(a, t[a], r));
    });
}
function Gd(e, t) {
  var r = W(19);
  (r.write_shift(4, 2151),
    r.write_shift(4, 0),
    r.write_shift(4, 0),
    r.write_shift(2, 3),
    r.write_shift(1, 1),
    r.write_shift(4, 0),
    ne(e, 2151, r),
    (r = W(39)),
    r.write_shift(4, 2152),
    r.write_shift(4, 0),
    r.write_shift(4, 0),
    r.write_shift(2, 3),
    r.write_shift(1, 0),
    r.write_shift(4, 0),
    r.write_shift(2, 1),
    r.write_shift(4, 4),
    r.write_shift(2, 0),
    k0(lr(t["!ref"] || "A1"), r),
    r.write_shift(4, 4),
    ne(e, 2152, r));
}
function $d(e, t) {
  for (var r = 0; r < 16; ++r) ne(e, 224, ns({ numFmtId: 0, style: !0 }, 0, t));
  t.cellXfs.forEach(function (n) {
    ne(e, 224, ns(n, 0, t));
  });
}
function Yd(e, t) {
  for (var r = 0; r < t["!links"].length; ++r) {
    var n = t["!links"][r];
    (ne(e, 440, $c(n)), n[1].Tooltip && ne(e, 2048, Yc(n)));
  }
  delete t["!links"];
}
function zd(e, t) {
  if (t) {
    var r = 0;
    t.forEach(function (n, a) {
      ++r <= 256 && n && ne(e, 125, Kc(Pa(a, n), a));
    });
  }
}
function Xd(e, t, r, n, a) {
  var i = 16 + Lt(a.cellXfs, t, a);
  if (t.v == null && !t.bf) {
    ne(e, 513, Vt(r, n, i));
    return;
  }
  if (t.bf) ne(e, 6, vh(t, r, n, a, i));
  else
    switch (t.t) {
      case "d":
      case "n":
        var s = t.t == "d" ? Kr(Yr(t.v)) : t.v;
        ne(e, 515, Wc(r, n, s, i));
        break;
      case "b":
      case "e":
        ne(e, 517, Uc(r, n, t.v, i, a, t.t));
        break;
      case "s":
      case "str":
        if (a.bookSST) {
          var o = _i(a.Strings, t.v, a.revStrings);
          ne(e, 253, Ic(r, n, o, i));
        } else ne(e, 516, Lc(r, n, (t.v || "").slice(0, 255), i, a));
        break;
      default:
        ne(e, 513, Vt(r, n, i));
    }
}
function Kd(e, t, r) {
  var n = Xr(),
    a = r.SheetNames[e],
    i = r.Sheets[a] || {},
    s = (r || {}).Workbook || {},
    o = (s.Sheets || [])[e] || {},
    c = Array.isArray(i),
    l = t.biff == 8,
    f,
    m = "",
    p = [],
    d = lr(i["!ref"] || "A1"),
    _ = l ? 65536 : 16384;
  if (d.e.c > 255 || d.e.r >= _) {
    if (t.WTF)
      throw new Error(
        "Range " + (i["!ref"] || "A1") + " exceeds format limit A1:IV16384",
      );
    ((d.e.c = Math.min(d.e.c, 255)), (d.e.r = Math.min(d.e.c, _ - 1)));
  }
  (ne(n, 2057, xi(r, 16, t)),
    ne(n, 13, st(1)),
    ne(n, 12, st(100)),
    ne(n, 15, $r(!0)),
    ne(n, 17, $r(!1)),
    ne(n, 16, Wt(0.001)),
    ne(n, 95, $r(!0)),
    ne(n, 42, $r(!1)),
    ne(n, 43, $r(!1)),
    ne(n, 130, st(1)),
    ne(n, 128, jc()),
    ne(n, 131, $r(!1)),
    ne(n, 132, $r(!1)),
    l && zd(n, i["!cols"]),
    ne(n, 512, Bc(d, t)),
    l && (i["!links"] = []));
  for (var h = d.s.r; h <= d.e.r; ++h) {
    m = Br(h);
    for (var x = d.s.c; x <= d.e.c; ++x) {
      (h === d.s.r && (p[x] = Wr(x)), (f = p[x] + m));
      var C = c ? (i[h] || [])[x] : i[f];
      C && (Xd(n, C, h, x, t), l && C.l && i["!links"].push([f, C.l]));
    }
  }
  var F = o.CodeName || o.name || a;
  return (
    l && ne(n, 574, Oc((s.Views || [])[0])),
    l && (i["!merges"] || []).length && ne(n, 229, Gc(i["!merges"])),
    l && Yd(n, i),
    ne(n, 442, b0(F)),
    l && Gd(n, i),
    ne(n, 10),
    n.end()
  );
}
function qd(e, t, r) {
  var n = Xr(),
    a = (e || {}).Workbook || {},
    i = a.Sheets || [],
    s = a.WBProps || {},
    o = r.biff == 8,
    c = r.biff == 5;
  if (
    (ne(n, 2057, xi(e, 5, r)),
    r.bookType == "xla" && ne(n, 135),
    ne(n, 225, o ? st(1200) : null),
    ne(n, 193, Tc(2)),
    c && ne(n, 191),
    c && ne(n, 192),
    ne(n, 226),
    ne(n, 92, kc("SheetJS", r)),
    ne(n, 66, st(o ? 1200 : 1252)),
    o && ne(n, 353, st(0)),
    o && ne(n, 448),
    ne(n, 317, qc(e.SheetNames.length)),
    o && e.vbaraw && ne(n, 211),
    o && e.vbaraw)
  ) {
    var l = s.CodeName || "ThisWorkbook";
    ne(n, 442, b0(l));
  }
  (ne(n, 156, st(17)),
    ne(n, 25, $r(!1)),
    ne(n, 18, $r(!1)),
    ne(n, 19, st(0)),
    o && ne(n, 431, $r(!1)),
    o && ne(n, 444, st(0)),
    ne(n, 61, Pc()),
    ne(n, 64, $r(!1)),
    ne(n, 141, st(0)),
    ne(n, 34, $r(rd(e) == "true")),
    ne(n, 14, $r(!0)),
    o && ne(n, 439, $r(!1)),
    ne(n, 218, st(0)),
    Vd(n, e, r),
    Hd(n, e.SSF, r),
    $d(n, r),
    o && ne(n, 352, $r(!1)));
  var f = n.end(),
    m = Xr();
  (o && ne(m, 140, zc()),
    o && r.Strings && Ld(m, 252, Nc(r.Strings)),
    ne(m, 10));
  var p = m.end(),
    d = Xr(),
    _ = 0,
    h = 0;
  for (h = 0; h < e.SheetNames.length; ++h)
    _ += (o ? 12 : 11) + (o ? 2 : 1) * e.SheetNames[h].length;
  var x = f.length + _ + p.length;
  for (h = 0; h < e.SheetNames.length; ++h) {
    var C = i[h] || {};
    (ne(
      d,
      133,
      Dc({ pos: x, hs: C.Hidden || 0, dt: 0, name: e.SheetNames[h] }, r),
    ),
      (x += t[h].length));
  }
  var F = d.end();
  if (_ != F.length) throw new Error("BS8 " + _ + " != " + F.length);
  var y = [];
  return (
    f.length && y.push(f),
    F.length && y.push(F),
    p.length && y.push(p),
    Lr(y)
  );
}
function Jd(e, t) {
  var r = t || {},
    n = [];
  (e && !e.SSF && (e.SSF = qr(gr)),
    e &&
      e.SSF &&
      (Fa(),
      Ca(e.SSF),
      (r.revssf = ba(e.SSF)),
      (r.revssf[e.SSF[65535]] = 0),
      (r.ssf = e.SSF)),
    (r.Strings = []),
    (r.Strings.Count = 0),
    (r.Strings.Unique = 0),
    Ti(r),
    (r.cellXfs = []),
    Lt(r.cellXfs, {}, { revssf: { General: 0 } }),
    e.Props || (e.Props = {}));
  for (var a = 0; a < e.SheetNames.length; ++a) n[n.length] = Kd(a, r, e);
  return (n.unshift(qd(e, n, r)), Lr(n));
}
function ro(e, t) {
  for (var r = 0; r <= e.SheetNames.length; ++r) {
    var n = e.Sheets[e.SheetNames[r]];
    if (!(!n || !n["!ref"])) {
      var a = nt(n["!ref"]);
      a.e.c > 255 &&
        typeof console < "u" &&
        console.error &&
        console.error(
          "Worksheet '" +
            e.SheetNames[r] +
            "' extends beyond column IV (255).  Data may be lost.",
        );
    }
  }
  var i = t || {};
  switch (i.biff || 2) {
    case 8:
    case 5:
      return Jd(e, t);
    case 4:
    case 3:
    case 2:
      return Wd(e, t);
  }
  throw new Error("invalid type " + i.bookType + " for BIFF");
}
function Qd(e, t, r, n) {
  for (var a = e["!merges"] || [], i = [], s = t.s.c; s <= t.e.c; ++s) {
    for (var o = 0, c = 0, l = 0; l < a.length; ++l)
      if (!(a[l].s.r > r || a[l].s.c > s) && !(a[l].e.r < r || a[l].e.c < s)) {
        if (a[l].s.r < r || a[l].s.c < s) {
          o = -1;
          break;
        }
        ((o = a[l].e.r - a[l].s.r + 1), (c = a[l].e.c - a[l].s.c + 1));
        break;
      }
    if (!(o < 0)) {
      var f = Ke({ r, c: s }),
        m = n.dense ? (e[r] || [])[s] : e[f],
        p = (m && m.v != null && (m.h || bl(m.w || (Ft(m), m.w) || ""))) || "",
        d = {};
      (o > 1 && (d.rowspan = o),
        c > 1 && (d.colspan = c),
        n.editable
          ? (p = '<span contenteditable="true">' + p + "</span>")
          : m &&
            ((d["data-t"] = (m && m.t) || "z"),
            m.v != null && (d["data-v"] = m.v),
            m.z != null && (d["data-z"] = m.z),
            m.l &&
              (m.l.Target || "#").charAt(0) != "#" &&
              (p = '<a href="' + m.l.Target + '">' + p + "</a>")),
        (d.id = (n.id || "sjs") + "-" + f),
        i.push(te("td", p, d)));
    }
  }
  var _ = "<tr>";
  return _ + i.join("") + "</tr>";
}
var Zd =
    '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>',
  ex = "</body></html>";
function rx(e, t, r) {
  var n = [];
  return n.join("") + "<table" + (r && r.id ? ' id="' + r.id + '"' : "") + ">";
}
function to(e, t) {
  var r = t || {},
    n = r.header != null ? r.header : Zd,
    a = r.footer != null ? r.footer : ex,
    i = [n],
    s = nt(e["!ref"]);
  ((r.dense = Array.isArray(e)), i.push(rx(e, s, r)));
  for (var o = s.s.r; o <= s.e.r; ++o) i.push(Qd(e, s, o, r));
  return (i.push("</table>" + a), i.join(""));
}
function no(e, t, r) {
  var n = r || {},
    a = 0,
    i = 0;
  if (n.origin != null)
    if (typeof n.origin == "number") a = n.origin;
    else {
      var s = typeof n.origin == "string" ? kr(n.origin) : n.origin;
      ((a = s.r), (i = s.c));
    }
  var o = t.getElementsByTagName("tr"),
    c = Math.min(n.sheetRows || 1e7, o.length),
    l = { s: { r: 0, c: 0 }, e: { r: a, c: i } };
  if (e["!ref"]) {
    var f = nt(e["!ref"]);
    ((l.s.r = Math.min(l.s.r, f.s.r)),
      (l.s.c = Math.min(l.s.c, f.s.c)),
      (l.e.r = Math.max(l.e.r, f.e.r)),
      (l.e.c = Math.max(l.e.c, f.e.c)),
      a == -1 && (l.e.r = a = f.e.r + 1));
  }
  var m = [],
    p = 0,
    d = e["!rows"] || (e["!rows"] = []),
    _ = 0,
    h = 0,
    x = 0,
    C = 0,
    F = 0,
    y = 0;
  for (e["!cols"] || (e["!cols"] = []); _ < o.length && h < c; ++_) {
    var P = o[_];
    if (fs(P)) {
      if (n.display) continue;
      d[h] = { hidden: !0 };
    }
    var G = P.children;
    for (x = C = 0; x < G.length; ++x) {
      var Q = G[x];
      if (!(n.display && fs(Q))) {
        var k = Q.hasAttribute("data-v")
            ? Q.getAttribute("data-v")
            : Q.hasAttribute("v")
              ? Q.getAttribute("v")
              : Pl(Q.innerHTML),
          j = Q.getAttribute("data-z") || Q.getAttribute("z");
        for (p = 0; p < m.length; ++p) {
          var N = m[p];
          N.s.c == C + i &&
            N.s.r < h + a &&
            h + a <= N.e.r &&
            ((C = N.e.c + 1 - i), (p = -1));
        }
        ((y = +Q.getAttribute("colspan") || 1),
          ((F = +Q.getAttribute("rowspan") || 1) > 1 || y > 1) &&
            m.push({
              s: { r: h + a, c: C + i },
              e: { r: h + a + (F || 1) - 1, c: C + i + (y || 1) - 1 },
            }));
        var V = { t: "s", v: k },
          H = Q.getAttribute("data-t") || Q.getAttribute("t") || "";
        (k != null &&
          (k.length == 0
            ? (V.t = H || "z")
            : n.raw ||
              k.trim().length == 0 ||
              H == "s" ||
              (k === "TRUE"
                ? (V = { t: "b", v: !0 })
                : k === "FALSE"
                  ? (V = { t: "b", v: !1 })
                  : isNaN(At(k))
                    ? isNaN(In(k).getDate()) ||
                      ((V = { t: "d", v: Yr(k) }),
                      n.cellDates || (V = { t: "n", v: Kr(V.v) }),
                      (V.z = n.dateNF || gr[14]))
                    : (V = { t: "n", v: At(k) }))),
          V.z === void 0 && j != null && (V.z = j));
        var Y = "",
          Z = Q.getElementsByTagName("A");
        if (Z && Z.length)
          for (
            var Te = 0;
            Te < Z.length &&
            !(
              Z[Te].hasAttribute("href") &&
              ((Y = Z[Te].getAttribute("href")), Y.charAt(0) != "#")
            );
            ++Te
          );
        (Y && Y.charAt(0) != "#" && (V.l = { Target: Y }),
          n.dense
            ? (e[h + a] || (e[h + a] = []), (e[h + a][C + i] = V))
            : (e[Ke({ c: C + i, r: h + a })] = V),
          l.e.c < C + i && (l.e.c = C + i),
          (C += y));
      }
    }
    ++h;
  }
  return (
    m.length && (e["!merges"] = (e["!merges"] || []).concat(m)),
    (l.e.r = Math.max(l.e.r, h - 1 + a)),
    (e["!ref"] = Er(l)),
    h >= c && (e["!fullref"] = Er(((l.e.r = o.length - _ + h - 1 + a), l))),
    e
  );
}
function ao(e, t) {
  var r = t || {},
    n = r.dense ? [] : {};
  return no(n, e, t);
}
function tx(e, t) {
  return Gt(ao(e, t), t);
}
function fs(e) {
  var t = "",
    r = nx(e);
  return (
    r && (t = r(e).getPropertyValue("display")),
    t || (t = e.style && e.style.display),
    t === "none"
  );
}
function nx(e) {
  return e.ownerDocument.defaultView &&
    typeof e.ownerDocument.defaultView.getComputedStyle == "function"
    ? e.ownerDocument.defaultView.getComputedStyle
    : typeof getComputedStyle == "function"
      ? getComputedStyle
      : null;
}
var ax = (function () {
    var e = [
        "<office:master-styles>",
        '<style:master-page style:name="mp1" style:page-layout-name="mp1">',
        "<style:header/>",
        '<style:header-left style:display="false"/>',
        "<style:footer/>",
        '<style:footer-left style:display="false"/>',
        "</style:master-page>",
        "</office:master-styles>",
      ].join(""),
      t =
        "<office:document-styles " +
        Mn({
          "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
          "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
          "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
          "xmlns:fo":
            "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:dc": "http://purl.org/dc/elements/1.1/",
          "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
          "xmlns:svg":
            "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
          "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
          "office:version": "1.2",
        }) +
        ">" +
        e +
        "</office:document-styles>";
    return function () {
      return Sr + t;
    };
  })(),
  us = (function () {
    var e = function (i) {
        return Xe(i)
          .replace(/  +/g, function (s) {
            return '<text:s text:c="' + s.length + '"/>';
          })
          .replace(/\t/g, "<text:tab/>")
          .replace(/\n/g, "</text:p><text:p>")
          .replace(/^ /, "<text:s/>")
          .replace(/ $/, "<text:s/>");
      },
      t = `          <table:table-cell />
`,
      r = `          <table:covered-table-cell/>
`,
      n = function (i, s, o) {
        var c = [];
        c.push(
          '      <table:table table:name="' +
            Xe(s.SheetNames[o]) +
            `" table:style-name="ta1">
`,
        );
        var l = 0,
          f = 0,
          m = nt(i["!ref"] || "A1"),
          p = i["!merges"] || [],
          d = 0,
          _ = Array.isArray(i);
        if (i["!cols"])
          for (f = 0; f <= m.e.c; ++f)
            c.push(
              "        <table:table-column" +
                (i["!cols"][f]
                  ? ' table:style-name="co' + i["!cols"][f].ods + '"'
                  : "") +
                `></table:table-column>
`,
            );
        var h = "",
          x = i["!rows"] || [];
        for (l = 0; l < m.s.r; ++l)
          ((h = x[l] ? ' table:style-name="ro' + x[l].ods + '"' : ""),
            c.push(
              "        <table:table-row" +
                h +
                `></table:table-row>
`,
            ));
        for (; l <= m.e.r; ++l) {
          for (
            h = x[l] ? ' table:style-name="ro' + x[l].ods + '"' : "",
              c.push(
                "        <table:table-row" +
                  h +
                  `>
`,
              ),
              f = 0;
            f < m.s.c;
            ++f
          )
            c.push(t);
          for (; f <= m.e.c; ++f) {
            var C = !1,
              F = {},
              y = "";
            for (d = 0; d != p.length; ++d)
              if (
                !(p[d].s.c > f) &&
                !(p[d].s.r > l) &&
                !(p[d].e.c < f) &&
                !(p[d].e.r < l)
              ) {
                ((p[d].s.c != f || p[d].s.r != l) && (C = !0),
                  (F["table:number-columns-spanned"] = p[d].e.c - p[d].s.c + 1),
                  (F["table:number-rows-spanned"] = p[d].e.r - p[d].s.r + 1));
                break;
              }
            if (C) {
              c.push(r);
              continue;
            }
            var P = Ke({ r: l, c: f }),
              G = _ ? (i[l] || [])[f] : i[P];
            if (
              G &&
              G.f &&
              ((F["table:formula"] = Xe(Ah(G.f))),
              G.F && G.F.slice(0, P.length) == P)
            ) {
              var Q = nt(G.F);
              ((F["table:number-matrix-columns-spanned"] = Q.e.c - Q.s.c + 1),
                (F["table:number-matrix-rows-spanned"] = Q.e.r - Q.s.r + 1));
            }
            if (!G) {
              c.push(t);
              continue;
            }
            switch (G.t) {
              case "b":
                ((y = G.v ? "TRUE" : "FALSE"),
                  (F["office:value-type"] = "boolean"),
                  (F["office:boolean-value"] = G.v ? "true" : "false"));
                break;
              case "n":
                ((y = G.w || String(G.v || 0)),
                  (F["office:value-type"] = "float"),
                  (F["office:value"] = G.v || 0));
                break;
              case "s":
              case "str":
                ((y = G.v == null ? "" : G.v),
                  (F["office:value-type"] = "string"));
                break;
              case "d":
                ((y = G.w || Yr(G.v).toISOString()),
                  (F["office:value-type"] = "date"),
                  (F["office:date-value"] = Yr(G.v).toISOString()),
                  (F["table:style-name"] = "ce1"));
                break;
              default:
                c.push(t);
                continue;
            }
            var k = e(y);
            if (G.l && G.l.Target) {
              var j = G.l.Target;
              ((j = j.charAt(0) == "#" ? "#" + yh(j.slice(1)) : j),
                j.charAt(0) != "#" && !j.match(/^\w+:/) && (j = "../" + j),
                (k = te("text:a", k, {
                  "xlink:href": j.replace(/&/g, "&amp;"),
                })));
            }
            c.push(
              "          " +
                te("table:table-cell", te("text:p", k, {}), F) +
                `
`,
            );
          }
          c.push(`        </table:table-row>
`);
        }
        return (
          c.push(`      </table:table>
`),
          c.join("")
        );
      },
      a = function (i, s) {
        (i.push(` <office:automatic-styles>
`),
          i.push(`  <number:date-style style:name="N37" number:automatic-order="true">
`),
          i.push(`   <number:month number:style="long"/>
`),
          i.push(`   <number:text>/</number:text>
`),
          i.push(`   <number:day number:style="long"/>
`),
          i.push(`   <number:text>/</number:text>
`),
          i.push(`   <number:year/>
`),
          i.push(`  </number:date-style>
`));
        var o = 0;
        s.SheetNames.map(function (l) {
          return s.Sheets[l];
        }).forEach(function (l) {
          if (l && l["!cols"]) {
            for (var f = 0; f < l["!cols"].length; ++f)
              if (l["!cols"][f]) {
                var m = l["!cols"][f];
                if (m.width == null && m.wpx == null && m.wch == null) continue;
                (pi(m), (m.ods = o));
                var p = l["!cols"][f].wpx + "px";
                (i.push(
                  '  <style:style style:name="co' +
                    o +
                    `" style:family="table-column">
`,
                ),
                  i.push(
                    '   <style:table-column-properties fo:break-before="auto" style:column-width="' +
                      p +
                      `"/>
`,
                  ),
                  i.push(`  </style:style>
`),
                  ++o);
              }
          }
        });
        var c = 0;
        (s.SheetNames.map(function (l) {
          return s.Sheets[l];
        }).forEach(function (l) {
          if (l && l["!rows"]) {
            for (var f = 0; f < l["!rows"].length; ++f)
              if (l["!rows"][f]) {
                l["!rows"][f].ods = c;
                var m = l["!rows"][f].hpx + "px";
                (i.push(
                  '  <style:style style:name="ro' +
                    c +
                    `" style:family="table-row">
`,
                ),
                  i.push(
                    '   <style:table-row-properties fo:break-before="auto" style:row-height="' +
                      m +
                      `"/>
`,
                  ),
                  i.push(`  </style:style>
`),
                  ++c);
              }
          }
        }),
          i.push(`  <style:style style:name="ta1" style:family="table" style:master-page-name="mp1">
`),
          i.push(`   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>
`),
          i.push(`  </style:style>
`),
          i.push(`  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>
`),
          i.push(` </office:automatic-styles>
`));
      };
    return function (s, o) {
      var c = [Sr],
        l = Mn({
          "xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
          "xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
          "xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
          "xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
          "xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
          "xmlns:fo":
            "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          "xmlns:dc": "http://purl.org/dc/elements/1.1/",
          "xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
          "xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
          "xmlns:presentation":
            "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
          "xmlns:svg":
            "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
          "xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
          "xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
          "xmlns:math": "http://www.w3.org/1998/Math/MathML",
          "xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
          "xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
          "xmlns:ooo": "http://openoffice.org/2004/office",
          "xmlns:ooow": "http://openoffice.org/2004/writer",
          "xmlns:oooc": "http://openoffice.org/2004/calc",
          "xmlns:dom": "http://www.w3.org/2001/xml-events",
          "xmlns:xforms": "http://www.w3.org/2002/xforms",
          "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
          "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
          "xmlns:rpt": "http://openoffice.org/2005/report",
          "xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
          "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
          "xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
          "xmlns:tableooo": "http://openoffice.org/2009/table",
          "xmlns:drawooo": "http://openoffice.org/2010/draw",
          "xmlns:calcext":
            "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
          "xmlns:loext":
            "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
          "xmlns:field":
            "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
          "xmlns:formx":
            "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
          "xmlns:css3t": "http://www.w3.org/TR/css3-text/",
          "office:version": "1.2",
        }),
        f = Mn({
          "xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
          "office:mimetype": "application/vnd.oasis.opendocument.spreadsheet",
        });
      (o.bookType == "fods"
        ? (c.push(
            "<office:document" +
              l +
              f +
              `>
`,
          ),
          c.push(_0().replace(/office:document-meta/g, "office:meta")))
        : c.push(
            "<office:document-content" +
              l +
              `>
`,
          ),
        a(c, s),
        c.push(`  <office:body>
`),
        c.push(`    <office:spreadsheet>
`));
      for (var m = 0; m != s.SheetNames.length; ++m)
        c.push(n(s.Sheets[s.SheetNames[m]], s, m));
      return (
        c.push(`    </office:spreadsheet>
`),
        c.push(`  </office:body>
`),
        o.bookType == "fods"
          ? c.push("</office:document>")
          : c.push("</office:document-content>"),
        c.join("")
      );
    };
  })();
function io(e, t) {
  if (t.bookType == "fods") return us(e, t);
  var r = ai(),
    n = "",
    a = [],
    i = [];
  return (
    (n = "mimetype"),
    Ne(r, n, "application/vnd.oasis.opendocument.spreadsheet"),
    (n = "content.xml"),
    Ne(r, n, us(e, t)),
    a.push([n, "text/xml"]),
    i.push([n, "ContentFile"]),
    (n = "styles.xml"),
    Ne(r, n, ax(e, t)),
    a.push([n, "text/xml"]),
    i.push([n, "StylesFile"]),
    (n = "meta.xml"),
    Ne(r, n, Sr + _0()),
    a.push([n, "text/xml"]),
    i.push([n, "MetadataFile"]),
    (n = "manifest.rdf"),
    Ne(r, n, pc(i)),
    a.push([n, "application/rdf+xml"]),
    (n = "META-INF/manifest.xml"),
    Ne(r, n, dc(a)),
    r
  );
}
/*! sheetjs (C) 2013-present SheetJS -- http://sheetjs.com */ function va(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ix(e) {
  return typeof TextEncoder < "u" ? new TextEncoder().encode(e) : dt(Ln(e));
}
function sx(e, t) {
  e: for (var r = 0; r <= e.length - t.length; ++r) {
    for (var n = 0; n < t.length; ++n) if (e[r + n] != t[n]) continue e;
    return !0;
  }
  return !1;
}
function It(e) {
  var t = e.reduce(function (a, i) {
      return a + i.length;
    }, 0),
    r = new Uint8Array(t),
    n = 0;
  return (
    e.forEach(function (a) {
      (r.set(a, n), (n += a.length));
    }),
    r
  );
}
function ox(e, t, r) {
  var n =
      Math.floor(r == 0 ? 0 : Math.LOG10E * Math.log(Math.abs(r))) + 6176 - 20,
    a = r / Math.pow(10, n - 6176);
  ((e[t + 15] |= n >> 7), (e[t + 14] |= (n & 127) << 1));
  for (var i = 0; a >= 1; ++i, a /= 256) e[t + i] = a & 255;
  e[t + 15] |= r >= 0 ? 0 : 128;
}
function Bn(e, t) {
  var r = t ? t[0] : 0,
    n = e[r] & 127;
  e: if (
    e[r++] >= 128 &&
    ((n |= (e[r] & 127) << 7),
    e[r++] < 128 ||
      ((n |= (e[r] & 127) << 14), e[r++] < 128) ||
      ((n |= (e[r] & 127) << 21), e[r++] < 128) ||
      ((n += (e[r] & 127) * Math.pow(2, 28)), ++r, e[r++] < 128) ||
      ((n += (e[r] & 127) * Math.pow(2, 35)), ++r, e[r++] < 128) ||
      ((n += (e[r] & 127) * Math.pow(2, 42)), ++r, e[r++] < 128))
  )
    break e;
  return (t && (t[0] = r), n);
}
function $e(e) {
  var t = new Uint8Array(7);
  t[0] = e & 127;
  var r = 1;
  e: if (e > 127) {
    if (
      ((t[r - 1] |= 128),
      (t[r] = (e >> 7) & 127),
      ++r,
      e <= 16383 ||
        ((t[r - 1] |= 128), (t[r] = (e >> 14) & 127), ++r, e <= 2097151) ||
        ((t[r - 1] |= 128), (t[r] = (e >> 21) & 127), ++r, e <= 268435455) ||
        ((t[r - 1] |= 128),
        (t[r] = ((e / 256) >>> 21) & 127),
        ++r,
        e <= 34359738367) ||
        ((t[r - 1] |= 128),
        (t[r] = ((e / 65536) >>> 21) & 127),
        ++r,
        e <= 4398046511103))
    )
      break e;
    ((t[r - 1] |= 128), (t[r] = ((e / 16777216) >>> 21) & 127), ++r);
  }
  return t.slice(0, r);
}
function sn(e) {
  var t = 0,
    r = e[t] & 127;
  e: if (e[t++] >= 128) {
    if (
      ((r |= (e[t] & 127) << 7),
      e[t++] < 128 ||
        ((r |= (e[t] & 127) << 14), e[t++] < 128) ||
        ((r |= (e[t] & 127) << 21), e[t++] < 128))
    )
      break e;
    r |= (e[t] & 127) << 28;
  }
  return r;
}
function yr(e) {
  for (var t = [], r = [0]; r[0] < e.length;) {
    var n = r[0],
      a = Bn(e, r),
      i = a & 7;
    a = Math.floor(a / 8);
    var s = 0,
      o;
    if (a == 0) break;
    switch (i) {
      case 0:
        {
          for (var c = r[0]; e[r[0]++] >= 128;);
          o = e.slice(c, r[0]);
        }
        break;
      case 5:
        ((s = 4), (o = e.slice(r[0], r[0] + s)), (r[0] += s));
        break;
      case 1:
        ((s = 8), (o = e.slice(r[0], r[0] + s)), (r[0] += s));
        break;
      case 2:
        ((s = Bn(e, r)), (o = e.slice(r[0], r[0] + s)), (r[0] += s));
        break;
      case 3:
      case 4:
      default:
        throw new Error(
          "PB Type "
            .concat(i, " for Field ")
            .concat(a, " at offset ")
            .concat(n),
        );
    }
    var l = { data: o, type: i };
    t[a] == null ? (t[a] = [l]) : t[a].push(l);
  }
  return t;
}
function Or(e) {
  var t = [];
  return (
    e.forEach(function (r, n) {
      r.forEach(function (a) {
        a.data &&
          (t.push($e(n * 8 + a.type)),
          a.type == 2 && t.push($e(a.data.length)),
          t.push(a.data));
      });
    }),
    It(t)
  );
}
function ut(e) {
  for (var t, r = [], n = [0]; n[0] < e.length;) {
    var a = Bn(e, n),
      i = yr(e.slice(n[0], n[0] + a));
    n[0] += a;
    var s = { id: sn(i[1][0].data), messages: [] };
    (i[2].forEach(function (o) {
      var c = yr(o.data),
        l = sn(c[3][0].data);
      (s.messages.push({ meta: c, data: e.slice(n[0], n[0] + l) }),
        (n[0] += l));
    }),
      (t = i[3]) != null && t[0] && (s.merge = sn(i[3][0].data) >>> 0 > 0),
      r.push(s));
  }
  return r;
}
function qt(e) {
  var t = [];
  return (
    e.forEach(function (r) {
      var n = [];
      ((n[1] = [{ data: $e(r.id), type: 0 }]),
        (n[2] = []),
        r.merge != null && (n[3] = [{ data: $e(+!!r.merge), type: 0 }]));
      var a = [];
      r.messages.forEach(function (s) {
        (a.push(s.data),
          (s.meta[3] = [{ type: 0, data: $e(s.data.length) }]),
          n[2].push({ data: Or(s.meta), type: 2 }));
      });
      var i = Or(n);
      (t.push($e(i.length)),
        t.push(i),
        a.forEach(function (s) {
          return t.push(s);
        }));
    }),
    It(t)
  );
}
function lx(e, t) {
  if (e != 0) throw new Error("Unexpected Snappy chunk type ".concat(e));
  for (var r = [0], n = Bn(t, r), a = []; r[0] < t.length;) {
    var i = t[r[0]] & 3;
    if (i == 0) {
      var s = t[r[0]++] >> 2;
      if (s < 60) ++s;
      else {
        var o = s - 59;
        ((s = t[r[0]]),
          o > 1 && (s |= t[r[0] + 1] << 8),
          o > 2 && (s |= t[r[0] + 2] << 16),
          o > 3 && (s |= t[r[0] + 3] << 24),
          (s >>>= 0),
          s++,
          (r[0] += o));
      }
      (a.push(t.slice(r[0], r[0] + s)), (r[0] += s));
      continue;
    } else {
      var c = 0,
        l = 0;
      if (
        (i == 1
          ? ((l = ((t[r[0]] >> 2) & 7) + 4),
            (c = (t[r[0]++] & 224) << 3),
            (c |= t[r[0]++]))
          : ((l = (t[r[0]++] >> 2) + 1),
            i == 2
              ? ((c = t[r[0]] | (t[r[0] + 1] << 8)), (r[0] += 2))
              : ((c =
                  (t[r[0]] |
                    (t[r[0] + 1] << 8) |
                    (t[r[0] + 2] << 16) |
                    (t[r[0] + 3] << 24)) >>>
                  0),
                (r[0] += 4))),
        (a = [It(a)]),
        c == 0)
      )
        throw new Error("Invalid offset 0");
      if (c > a[0].length) throw new Error("Invalid offset beyond length");
      if (l >= c)
        for (a.push(a[0].slice(-c)), l -= c; l >= a[a.length - 1].length;)
          (a.push(a[a.length - 1]), (l -= a[a.length - 1].length));
      a.push(a[0].slice(-c, -c + l));
    }
  }
  var f = It(a);
  if (f.length != n)
    throw new Error("Unexpected length: ".concat(f.length, " != ").concat(n));
  return f;
}
function ht(e) {
  for (var t = [], r = 0; r < e.length;) {
    var n = e[r++],
      a = e[r] | (e[r + 1] << 8) | (e[r + 2] << 16);
    ((r += 3), t.push(lx(n, e.slice(r, r + a))), (r += a));
  }
  if (r !== e.length) throw new Error("data is not a valid framed stream!");
  return It(t);
}
function Jt(e) {
  for (var t = [], r = 0; r < e.length;) {
    var n = Math.min(e.length - r, 268435455),
      a = new Uint8Array(4);
    t.push(a);
    var i = $e(n),
      s = i.length;
    (t.push(i),
      n <= 60
        ? (s++, t.push(new Uint8Array([(n - 1) << 2])))
        : n <= 256
          ? ((s += 2), t.push(new Uint8Array([240, (n - 1) & 255])))
          : n <= 65536
            ? ((s += 3),
              t.push(
                new Uint8Array([244, (n - 1) & 255, ((n - 1) >> 8) & 255]),
              ))
            : n <= 16777216
              ? ((s += 4),
                t.push(
                  new Uint8Array([
                    248,
                    (n - 1) & 255,
                    ((n - 1) >> 8) & 255,
                    ((n - 1) >> 16) & 255,
                  ]),
                ))
              : n <= 4294967296 &&
                ((s += 5),
                t.push(
                  new Uint8Array([
                    252,
                    (n - 1) & 255,
                    ((n - 1) >> 8) & 255,
                    ((n - 1) >> 16) & 255,
                    ((n - 1) >>> 24) & 255,
                  ]),
                )),
      t.push(e.slice(r, r + n)),
      (s += n),
      (a[0] = 0),
      (a[1] = s & 255),
      (a[2] = (s >> 8) & 255),
      (a[3] = (s >> 16) & 255),
      (r += n));
  }
  return It(t);
}
function Wa(e, t) {
  var r = new Uint8Array(32),
    n = va(r),
    a = 12,
    i = 0;
  switch (((r[0] = 5), e.t)) {
    case "n":
      ((r[1] = 2), ox(r, a, e.v), (i |= 1), (a += 16));
      break;
    case "b":
      ((r[1] = 6), n.setFloat64(a, e.v ? 1 : 0, !0), (i |= 2), (a += 8));
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      ((r[1] = 3), n.setUint32(a, t.indexOf(e.v), !0), (i |= 8), (a += 4));
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return (n.setUint32(8, i, !0), r.slice(0, a));
}
function Va(e, t) {
  var r = new Uint8Array(32),
    n = va(r),
    a = 12,
    i = 0;
  switch (((r[0] = 3), e.t)) {
    case "n":
      ((r[2] = 2), n.setFloat64(a, e.v, !0), (i |= 32), (a += 8));
      break;
    case "b":
      ((r[2] = 6), n.setFloat64(a, e.v ? 1 : 0, !0), (i |= 32), (a += 8));
      break;
    case "s":
      if (t.indexOf(e.v) == -1)
        throw new Error("Value ".concat(e.v, " missing from SST!"));
      ((r[2] = 3), n.setUint32(a, t.indexOf(e.v), !0), (i |= 16), (a += 4));
      break;
    default:
      throw "unsupported cell type " + e.t;
  }
  return (n.setUint32(4, i, !0), r.slice(0, a));
}
function kt(e) {
  var t = yr(e);
  return Bn(t[1][0].data);
}
function cx(e, t, r) {
  var n, a, i, s;
  if (!((n = e[6]) != null && n[0]) || !((a = e[7]) != null && a[0]))
    throw "Mutation only works on post-BNC storages!";
  var o =
    (((s = (i = e[8]) == null ? void 0 : i[0]) == null ? void 0 : s.data) &&
      sn(e[8][0].data) > 0) ||
    !1;
  if (o) throw "Math only works with normal offsets";
  for (
    var c = 0,
      l = va(e[7][0].data),
      f = 0,
      m = [],
      p = va(e[4][0].data),
      d = 0,
      _ = [],
      h = 0;
    h < t.length;
    ++h
  ) {
    if (t[h] == null) {
      (l.setUint16(h * 2, 65535, !0), p.setUint16(h * 2, 65535));
      continue;
    }
    (l.setUint16(h * 2, f, !0), p.setUint16(h * 2, d, !0));
    var x, C;
    switch (typeof t[h]) {
      case "string":
        ((x = Wa({ t: "s", v: t[h] }, r)), (C = Va({ t: "s", v: t[h] }, r)));
        break;
      case "number":
        ((x = Wa({ t: "n", v: t[h] }, r)), (C = Va({ t: "n", v: t[h] }, r)));
        break;
      case "boolean":
        ((x = Wa({ t: "b", v: t[h] }, r)), (C = Va({ t: "b", v: t[h] }, r)));
        break;
      default:
        throw new Error("Unsupported value " + t[h]);
    }
    (m.push(x), (f += x.length), _.push(C), (d += C.length), ++c);
  }
  for (e[2][0].data = $e(c); h < e[7][0].data.length / 2; ++h)
    (l.setUint16(h * 2, 65535, !0), p.setUint16(h * 2, 65535, !0));
  return ((e[6][0].data = It(m)), (e[3][0].data = It(_)), c);
}
function fx(e, t) {
  if (!t || !t.numbers)
    throw new Error("Must pass a `numbers` option -- check the README");
  var r = e.Sheets[e.SheetNames[0]];
  e.SheetNames.length > 1 &&
    console.error("The Numbers writer currently writes only the first table");
  var n = nt(r["!ref"]);
  n.s.r = n.s.c = 0;
  var a = !1;
  (n.e.c > 9 && ((a = !0), (n.e.c = 9)),
    n.e.r > 49 && ((a = !0), (n.e.r = 49)),
    a &&
      console.error(
        "The Numbers writer is currently limited to ".concat(Er(n)),
      ));
  var i = _a(r, { range: n, header: 1 }),
    s = ["~Sh33tJ5~"];
  i.forEach(function (O) {
    return O.forEach(function (D) {
      typeof D == "string" && s.push(D);
    });
  });
  var o = {},
    c = [],
    l = rr.read(t.numbers, { type: "base64" });
  (l.FileIndex.map(function (O, D) {
    return [O, l.FullPaths[D]];
  }).forEach(function (O) {
    var D = O[0],
      b = O[1];
    if (D.type == 2 && D.name.match(/\.iwa/)) {
      var z = D.content,
        fe = ht(z),
        xe = ut(fe);
      xe.forEach(function (ie) {
        (c.push(ie.id),
          (o[ie.id] = {
            deps: [],
            location: b,
            type: sn(ie.messages[0].meta[1][0].data),
          }));
      });
    }
  }),
    c.sort(function (O, D) {
      return O - D;
    }));
  var f = c
    .filter(function (O) {
      return O > 1;
    })
    .map(function (O) {
      return [O, $e(O)];
    });
  l.FileIndex.map(function (O, D) {
    return [O, l.FullPaths[D]];
  }).forEach(function (O) {
    var D = O[0];
    if ((O[1], !!D.name.match(/\.iwa/))) {
      var b = ut(ht(D.content));
      b.forEach(function (z) {
        z.messages.forEach(function (fe) {
          f.forEach(function (xe) {
            z.messages.some(function (ie) {
              return sn(ie.meta[1][0].data) != 11006 && sx(ie.data, xe[1]);
            }) && o[xe[0]].deps.push(z.id);
          });
        });
      });
    }
  });
  for (
    var m = rr.find(l, o[1].location), p = ut(ht(m.content)), d, _ = 0;
    _ < p.length;
    ++_
  ) {
    var h = p[_];
    h.id == 1 && (d = h);
  }
  var x = kt(yr(d.messages[0].data)[1][0].data);
  for (
    m = rr.find(l, o[x].location), p = ut(ht(m.content)), _ = 0;
    _ < p.length;
    ++_
  )
    ((h = p[_]), h.id == x && (d = h));
  for (
    x = kt(yr(d.messages[0].data)[2][0].data),
      m = rr.find(l, o[x].location),
      p = ut(ht(m.content)),
      _ = 0;
    _ < p.length;
    ++_
  )
    ((h = p[_]), h.id == x && (d = h));
  for (
    x = kt(yr(d.messages[0].data)[2][0].data),
      m = rr.find(l, o[x].location),
      p = ut(ht(m.content)),
      _ = 0;
    _ < p.length;
    ++_
  )
    ((h = p[_]), h.id == x && (d = h));
  var C = yr(d.messages[0].data);
  {
    ((C[6][0].data = $e(n.e.r + 1)), (C[7][0].data = $e(n.e.c + 1)));
    var F = kt(C[46][0].data),
      y = rr.find(l, o[F].location),
      P = ut(ht(y.content));
    {
      for (var G = 0; G < P.length && P[G].id != F; ++G);
      if (P[G].id != F) throw "Bad ColumnRowUIDMapArchive";
      var Q = yr(P[G].messages[0].data);
      ((Q[1] = []), (Q[2] = []), (Q[3] = []));
      for (var k = 0; k <= n.e.c; ++k) {
        var j = [];
        ((j[1] = j[2] = [{ type: 0, data: $e(k + 420690) }]),
          Q[1].push({ type: 2, data: Or(j) }),
          Q[2].push({ type: 0, data: $e(k) }),
          Q[3].push({ type: 0, data: $e(k) }));
      }
      ((Q[4] = []), (Q[5] = []), (Q[6] = []));
      for (var N = 0; N <= n.e.r; ++N)
        ((j = []),
          (j[1] = j[2] = [{ type: 0, data: $e(N + 726270) }]),
          Q[4].push({ type: 2, data: Or(j) }),
          Q[5].push({ type: 0, data: $e(N) }),
          Q[6].push({ type: 0, data: $e(N) }));
      P[G].messages[0].data = Or(Q);
    }
    ((y.content = Jt(qt(P))), (y.size = y.content.length), delete C[46]);
    var V = yr(C[4][0].data);
    {
      V[7][0].data = $e(n.e.r + 1);
      var H = yr(V[1][0].data),
        Y = kt(H[2][0].data);
      ((y = rr.find(l, o[Y].location)), (P = ut(ht(y.content))));
      {
        if (P[0].id != Y) throw "Bad HeaderStorageBucket";
        var Z = yr(P[0].messages[0].data);
        for (N = 0; N < i.length; ++N) {
          var Te = yr(Z[2][0].data);
          ((Te[1][0].data = $e(N)),
            (Te[4][0].data = $e(i[N].length)),
            (Z[2][N] = { type: Z[2][0].type, data: Or(Te) }));
        }
        P[0].messages[0].data = Or(Z);
      }
      ((y.content = Jt(qt(P))), (y.size = y.content.length));
      var he = kt(V[2][0].data);
      ((y = rr.find(l, o[he].location)), (P = ut(ht(y.content))));
      {
        if (P[0].id != he) throw "Bad HeaderStorageBucket";
        for (Z = yr(P[0].messages[0].data), k = 0; k <= n.e.c; ++k)
          ((Te = yr(Z[2][0].data)),
            (Te[1][0].data = $e(k)),
            (Te[4][0].data = $e(n.e.r + 1)),
            (Z[2][k] = { type: Z[2][0].type, data: Or(Te) }));
        P[0].messages[0].data = Or(Z);
      }
      ((y.content = Jt(qt(P))), (y.size = y.content.length));
      var le = kt(V[4][0].data);
      (function () {
        for (
          var O = rr.find(l, o[le].location), D = ut(ht(O.content)), b, z = 0;
          z < D.length;
          ++z
        ) {
          var fe = D[z];
          fe.id == le && (b = fe);
        }
        var xe = yr(b.messages[0].data);
        {
          xe[3] = [];
          var ie = [];
          s.forEach(function (Ee, qe) {
            ((ie[1] = [{ type: 0, data: $e(qe) }]),
              (ie[2] = [{ type: 0, data: $e(1) }]),
              (ie[3] = [{ type: 2, data: ix(Ee) }]),
              xe[3].push({ type: 2, data: Or(ie) }));
          });
        }
        b.messages[0].data = Or(xe);
        var re = qt(D),
          Ce = Jt(re);
        ((O.content = Ce), (O.size = O.content.length));
      })();
      var _e = yr(V[3][0].data);
      {
        var ye = _e[1][0];
        delete _e[2];
        var Be = yr(ye.data);
        {
          var Ie = kt(Be[2][0].data);
          (function () {
            for (
              var O = rr.find(l, o[Ie].location),
                D = ut(ht(O.content)),
                b,
                z = 0;
              z < D.length;
              ++z
            ) {
              var fe = D[z];
              fe.id == Ie && (b = fe);
            }
            var xe = yr(b.messages[0].data);
            {
              (delete xe[6], delete _e[7]);
              var ie = new Uint8Array(xe[5][0].data);
              xe[5] = [];
              for (var re = 0, Ce = 0; Ce <= n.e.r; ++Ce) {
                var Ee = yr(ie);
                ((re += cx(Ee, i[Ce], s)),
                  (Ee[1][0].data = $e(Ce)),
                  xe[5].push({ data: Or(Ee), type: 2 }));
              }
              ((xe[1] = [{ type: 0, data: $e(n.e.c + 1) }]),
                (xe[2] = [{ type: 0, data: $e(n.e.r + 1) }]),
                (xe[3] = [{ type: 0, data: $e(re) }]),
                (xe[4] = [{ type: 0, data: $e(n.e.r + 1) }]));
            }
            b.messages[0].data = Or(xe);
            var qe = qt(D),
              Fe = Jt(qe);
            ((O.content = Fe), (O.size = O.content.length));
          })();
        }
        ye.data = Or(Be);
      }
      V[3][0].data = Or(_e);
    }
    C[4][0].data = Or(V);
  }
  d.messages[0].data = Or(C);
  var Pe = qt(p),
    A = Jt(Pe);
  return ((m.content = A), (m.size = m.content.length), l);
}
function ux(e) {
  return function (r) {
    for (var n = 0; n != e.length; ++n) {
      var a = e[n];
      (r[a[0]] === void 0 && (r[a[0]] = a[1]),
        a[2] === "n" && (r[a[0]] = Number(r[a[0]])));
    }
  };
}
function Ti(e) {
  ux([
    ["cellDates", !1],
    ["bookSST", !1],
    ["bookType", "xlsx"],
    ["compression", !1],
    ["WTF", !1],
  ])(e);
}
function hx(e, t) {
  return t.bookType == "ods"
    ? io(e, t)
    : t.bookType == "numbers"
      ? fx(e, t)
      : t.bookType == "xlsb"
        ? dx(e, t)
        : xx(e, t);
}
function dx(e, t) {
  ((en = 1024),
    e && !e.SSF && (e.SSF = qr(gr)),
    e &&
      e.SSF &&
      (Fa(),
      Ca(e.SSF),
      (t.revssf = ba(e.SSF)),
      (t.revssf[e.SSF[65535]] = 0),
      (t.ssf = e.SSF)),
    (t.rels = {}),
    (t.wbrels = {}),
    (t.Strings = []),
    (t.Strings.Count = 0),
    (t.Strings.Unique = 0),
    Fn
      ? (t.revStrings = new Map())
      : ((t.revStrings = {}),
        (t.revStrings.foo = []),
        delete t.revStrings.foo));
  var r = t.bookType == "xlsb" ? "bin" : "xml",
    n = W0.indexOf(t.bookType) > -1,
    a = m0();
  Ti((t = t || {}));
  var i = ai(),
    s = "",
    o = 0;
  if (
    ((t.cellXfs = []),
    Lt(t.cellXfs, {}, { revssf: { General: 0 } }),
    e.Props || (e.Props = {}),
    (s = "docProps/core.xml"),
    Ne(i, s, T0(e.Props, t)),
    a.coreprops.push(s),
    ze(t.rels, 2, s, je.CORE_PROPS),
    (s = "docProps/app.xml"),
    !(e.Props && e.Props.SheetNames))
  )
    if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
    else {
      for (var c = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
      e.Props.SheetNames = c;
    }
  for (
    e.Props.Worksheets = e.Props.SheetNames.length,
      Ne(i, s, S0(e.Props)),
      a.extprops.push(s),
      ze(t.rels, 3, s, je.EXT_PROPS),
      e.Custprops !== e.Props &&
        jr(e.Custprops || {}).length > 0 &&
        ((s = "docProps/custom.xml"),
        Ne(i, s, w0(e.Custprops)),
        a.custprops.push(s),
        ze(t.rels, 4, s, je.CUST_PROPS)),
      o = 1;
    o <= e.SheetNames.length;
    ++o
  ) {
    var f = { "!id": {} },
      m = e.Sheets[e.SheetNames[o - 1]],
      p = (m || {})["!type"] || "sheet";
    switch (p) {
      case "chart":
      default:
        ((s = "xl/worksheets/sheet" + o + "." + r),
          Ne(i, s, md(o - 1, s, t, e, f)),
          a.sheets.push(s),
          ze(t.wbrels, -1, "worksheets/sheet" + o + "." + r, je.WS[0]));
    }
    if (m) {
      var d = m["!comments"],
        _ = !1,
        h = "";
      (d &&
        d.length > 0 &&
        ((h = "xl/comments" + o + "." + r),
        Ne(i, h, _d(d, h)),
        a.comments.push(h),
        ze(f, -1, "../comments" + o + "." + r, je.CMNT),
        (_ = !0)),
        m["!legacy"] &&
          _ &&
          Ne(i, "xl/drawings/vmlDrawing" + o + ".vml", j0(o, m["!comments"])),
        delete m["!comments"],
        delete m["!legacy"]);
    }
    f["!id"].rId1 && Ne(i, v0(s), nn(f));
  }
  return (
    t.Strings != null &&
      t.Strings.length > 0 &&
      ((s = "xl/sharedStrings." + r),
      Ne(i, s, vd(t.Strings, s, t)),
      a.strs.push(s),
      ze(t.wbrels, -1, "sharedStrings." + r, je.SST)),
    (s = "xl/workbook." + r),
    Ne(i, s, pd(e, s)),
    a.workbooks.push(s),
    ze(t.rels, 1, s, je.WB),
    (s = "xl/theme/theme1.xml"),
    Ne(i, s, M0(e.Themes, t)),
    a.themes.push(s),
    ze(t.wbrels, -1, "theme/theme1.xml", je.THEME),
    (s = "xl/styles." + r),
    Ne(i, s, gd(e, s, t)),
    a.styles.push(s),
    ze(t.wbrels, -1, "styles." + r, je.STY),
    e.vbaraw &&
      n &&
      ((s = "xl/vbaProject.bin"),
      Ne(i, s, e.vbaraw),
      a.vba.push(s),
      ze(t.wbrels, -1, "vbaProject.bin", je.VBA)),
    (s = "xl/metadata." + r),
    Ne(i, s, Td(s)),
    a.metadata.push(s),
    ze(t.wbrels, -1, "metadata." + r, je.XLMETA),
    Ne(i, "[Content_Types].xml", g0(a, t)),
    Ne(i, "_rels/.rels", nn(t.rels)),
    Ne(i, "xl/_rels/workbook." + r + ".rels", nn(t.wbrels)),
    delete t.revssf,
    delete t.ssf,
    i
  );
}
function xx(e, t) {
  ((en = 1024),
    e && !e.SSF && (e.SSF = qr(gr)),
    e &&
      e.SSF &&
      (Fa(),
      Ca(e.SSF),
      (t.revssf = ba(e.SSF)),
      (t.revssf[e.SSF[65535]] = 0),
      (t.ssf = e.SSF)),
    (t.rels = {}),
    (t.wbrels = {}),
    (t.Strings = []),
    (t.Strings.Count = 0),
    (t.Strings.Unique = 0),
    Fn
      ? (t.revStrings = new Map())
      : ((t.revStrings = {}),
        (t.revStrings.foo = []),
        delete t.revStrings.foo));
  var r = "xml",
    n = W0.indexOf(t.bookType) > -1,
    a = m0();
  Ti((t = t || {}));
  var i = ai(),
    s = "",
    o = 0;
  if (
    ((t.cellXfs = []),
    Lt(t.cellXfs, {}, { revssf: { General: 0 } }),
    e.Props || (e.Props = {}),
    (s = "docProps/core.xml"),
    Ne(i, s, T0(e.Props, t)),
    a.coreprops.push(s),
    ze(t.rels, 2, s, je.CORE_PROPS),
    (s = "docProps/app.xml"),
    !(e.Props && e.Props.SheetNames))
  )
    if (!e.Workbook || !e.Workbook.Sheets) e.Props.SheetNames = e.SheetNames;
    else {
      for (var c = [], l = 0; l < e.SheetNames.length; ++l)
        (e.Workbook.Sheets[l] || {}).Hidden != 2 && c.push(e.SheetNames[l]);
      e.Props.SheetNames = c;
    }
  ((e.Props.Worksheets = e.Props.SheetNames.length),
    Ne(i, s, S0(e.Props)),
    a.extprops.push(s),
    ze(t.rels, 3, s, je.EXT_PROPS),
    e.Custprops !== e.Props &&
      jr(e.Custprops || {}).length > 0 &&
      ((s = "docProps/custom.xml"),
      Ne(i, s, w0(e.Custprops)),
      a.custprops.push(s),
      ze(t.rels, 4, s, je.CUST_PROPS)));
  var f = ["SheetJ5"];
  for (t.tcid = 0, o = 1; o <= e.SheetNames.length; ++o) {
    var m = { "!id": {} },
      p = e.Sheets[e.SheetNames[o - 1]],
      d = (p || {})["!type"] || "sheet";
    switch (d) {
      case "chart":
      default:
        ((s = "xl/worksheets/sheet" + o + "." + r),
          Ne(i, s, q0(o - 1, t, e, m)),
          a.sheets.push(s),
          ze(t.wbrels, -1, "worksheets/sheet" + o + "." + r, je.WS[0]));
    }
    if (p) {
      var _ = p["!comments"],
        h = !1,
        x = "";
      if (_ && _.length > 0) {
        var C = !1;
        (_.forEach(function (F) {
          F[1].forEach(function (y) {
            y.T == !0 && (C = !0);
          });
        }),
          C &&
            ((x = "xl/threadedComments/threadedComment" + o + "." + r),
            Ne(i, x, $f(_, f, t)),
            a.threadedcomments.push(x),
            ze(
              m,
              -1,
              "../threadedComments/threadedComment" + o + "." + r,
              je.TCMNT,
            )),
          (x = "xl/comments" + o + "." + r),
          Ne(i, x, U0(_)),
          a.comments.push(x),
          ze(m, -1, "../comments" + o + "." + r, je.CMNT),
          (h = !0));
      }
      (p["!legacy"] &&
        h &&
        Ne(i, "xl/drawings/vmlDrawing" + o + ".vml", j0(o, p["!comments"])),
        delete p["!comments"],
        delete p["!legacy"]);
    }
    m["!id"].rId1 && Ne(i, v0(s), nn(m));
  }
  return (
    t.Strings != null &&
      t.Strings.length > 0 &&
      ((s = "xl/sharedStrings." + r),
      Ne(i, s, N0(t.Strings, t)),
      a.strs.push(s),
      ze(t.wbrels, -1, "sharedStrings." + r, je.SST)),
    (s = "xl/workbook." + r),
    Ne(i, s, Z0(e)),
    a.workbooks.push(s),
    ze(t.rels, 1, s, je.WB),
    (s = "xl/theme/theme1.xml"),
    Ne(i, s, M0(e.Themes, t)),
    a.themes.push(s),
    ze(t.wbrels, -1, "theme/theme1.xml", je.THEME),
    (s = "xl/styles." + r),
    Ne(i, s, I0(e, t)),
    a.styles.push(s),
    ze(t.wbrels, -1, "styles." + r, je.STY),
    e.vbaraw &&
      n &&
      ((s = "xl/vbaProject.bin"),
      Ne(i, s, e.vbaraw),
      a.vba.push(s),
      ze(t.wbrels, -1, "vbaProject.bin", je.VBA)),
    (s = "xl/metadata." + r),
    Ne(i, s, B0()),
    a.metadata.push(s),
    ze(t.wbrels, -1, "metadata." + r, je.XLMETA),
    f.length > 1 &&
      ((s = "xl/persons/person.xml"),
      Ne(i, s, Yf(f)),
      a.people.push(s),
      ze(t.wbrels, -1, "persons/person.xml", je.PEOPLE)),
    Ne(i, "[Content_Types].xml", g0(a, t)),
    Ne(i, "_rels/.rels", nn(t.rels)),
    Ne(i, "xl/_rels/workbook." + r + ".rels", nn(t.wbrels)),
    delete t.revssf,
    delete t.ssf,
    i
  );
}
function px(e, t) {
  var r = "";
  switch ((t || {}).type || "base64") {
    case "buffer":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    case "base64":
      r = Ct(e.slice(0, 12));
      break;
    case "binary":
      r = e;
      break;
    case "array":
      return [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7]];
    default:
      throw new Error("Unrecognized type " + ((t && t.type) || "undefined"));
  }
  return [
    r.charCodeAt(0),
    r.charCodeAt(1),
    r.charCodeAt(2),
    r.charCodeAt(3),
    r.charCodeAt(4),
    r.charCodeAt(5),
    r.charCodeAt(6),
    r.charCodeAt(7),
  ];
}
function so(e, t) {
  switch (t.type) {
    case "base64":
    case "binary":
      break;
    case "buffer":
    case "array":
      t.type = "";
      break;
    case "file":
      return Hn(t.file, rr.write(e, { type: We ? "buffer" : "" }));
    case "string":
      throw new Error(
        "'string' output type invalid for '" + t.bookType + "' files",
      );
    default:
      throw new Error("Unrecognized type " + t.type);
  }
  return rr.write(e, t);
}
function mx(e, t) {
  var r = qr(t || {}),
    n = hx(e, r);
  return gx(n, r);
}
function gx(e, t) {
  var r = {},
    n = We ? "nodebuffer" : typeof Uint8Array < "u" ? "array" : "string";
  if ((t.compression && (r.compression = "DEFLATE"), t.password)) r.type = n;
  else
    switch (t.type) {
      case "base64":
        r.type = "base64";
        break;
      case "binary":
        r.type = "string";
        break;
      case "string":
        throw new Error(
          "'string' output type invalid for '" + t.bookType + "' files",
        );
      case "buffer":
      case "file":
        r.type = n;
        break;
      default:
        throw new Error("Unrecognized type " + t.type);
    }
  var a = e.FullPaths
    ? rr.write(e, {
        fileType: "zip",
        type: { nodebuffer: "buffer", string: "binary" }[r.type] || r.type,
        compression: !!t.compression,
      })
    : e.generate(r);
  if (typeof Deno < "u" && typeof a == "string") {
    if (t.type == "binary" || t.type == "base64") return a;
    a = new Uint8Array(ya(a));
  }
  return t.password && typeof encrypt_agile < "u"
    ? so(encrypt_agile(a, t.password), t)
    : t.type === "file"
      ? Hn(t.file, a)
      : t.type == "string"
        ? wn(a)
        : a;
}
function vx(e, t) {
  var r = t || {},
    n = Rd(e, r);
  return so(n, r);
}
function gt(e, t, r) {
  r || (r = "");
  var n = r + e;
  switch (t.type) {
    case "base64":
      return Rn(Ln(n));
    case "binary":
      return Ln(n);
    case "string":
      return e;
    case "file":
      return Hn(t.file, n, "utf8");
    case "buffer":
      return We
        ? bt(n, "utf8")
        : typeof TextEncoder < "u"
          ? new TextEncoder().encode(n)
          : gt(n, { type: "binary" })
              .split("")
              .map(function (a) {
                return a.charCodeAt(0);
              });
  }
  throw new Error("Unrecognized type " + t.type);
}
function _x(e, t) {
  switch (t.type) {
    case "base64":
      return Rn(e);
    case "binary":
      return e;
    case "string":
      return e;
    case "file":
      return Hn(t.file, e, "binary");
    case "buffer":
      return We
        ? bt(e, "binary")
        : e.split("").map(function (r) {
            return r.charCodeAt(0);
          });
  }
  throw new Error("Unrecognized type " + t.type);
}
function ra(e, t) {
  switch (t.type) {
    case "string":
    case "base64":
    case "binary":
      for (var r = "", n = 0; n < e.length; ++n) r += String.fromCharCode(e[n]);
      return t.type == "base64" ? Rn(r) : t.type == "string" ? wn(r) : r;
    case "file":
      return Hn(t.file, e);
    case "buffer":
      return e;
    default:
      throw new Error("Unrecognized type " + t.type);
  }
}
function oo(e, t) {
  (Yo(), ad(e));
  var r = qr(t || {});
  if (
    (r.cellStyles && ((r.cellNF = !0), (r.sheetStubs = !0)), r.type == "array")
  ) {
    r.type = "binary";
    var n = oo(e, r);
    return ((r.type = "array"), ya(n));
  }
  var a = 0;
  if (
    r.sheet &&
    (typeof r.sheet == "number"
      ? (a = r.sheet)
      : (a = e.SheetNames.indexOf(r.sheet)),
    !e.SheetNames[a])
  )
    throw new Error("Sheet not found: " + r.sheet + " : " + typeof r.sheet);
  switch (r.bookType || "xlsb") {
    case "xml":
    case "xlml":
      return gt(Pd(e, r), r);
    case "slk":
    case "sylk":
      return gt(ef.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "htm":
    case "html":
      return gt(to(e.Sheets[e.SheetNames[a]], r), r);
    case "txt":
      return _x(lo(e.Sheets[e.SheetNames[a]], r), r);
    case "csv":
      return gt(Ei(e.Sheets[e.SheetNames[a]], r), r, "\uFEFF");
    case "dif":
      return gt(rf.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "dbf":
      return ra(Zc.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "prn":
      return gt(tf.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "rtf":
      return gt(ff.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "eth":
      return gt(D0.from_sheet(e.Sheets[e.SheetNames[a]], r), r);
    case "fods":
      return gt(io(e, r), r);
    case "wk1":
      return ra(as.sheet_to_wk1(e.Sheets[e.SheetNames[a]], r), r);
    case "wk3":
      return ra(as.book_to_wk3(e, r), r);
    case "biff2":
      r.biff || (r.biff = 2);
    case "biff3":
      r.biff || (r.biff = 3);
    case "biff4":
      return (r.biff || (r.biff = 4), ra(ro(e, r), r));
    case "biff5":
      r.biff || (r.biff = 5);
    case "biff8":
    case "xla":
    case "xls":
      return (r.biff || (r.biff = 8), vx(e, r));
    case "xlsx":
    case "xlsm":
    case "xlam":
    case "xlsb":
    case "numbers":
    case "ods":
      return mx(e, r);
    default:
      throw new Error("Unrecognized bookType |" + r.bookType + "|");
  }
}
function Tx(e) {
  if (!e.bookType) {
    var t = {
        xls: "biff8",
        htm: "html",
        slk: "sylk",
        socialcalc: "eth",
        Sh33tJS: "WTF",
      },
      r = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
    (r.match(/^\.[a-z]+$/) && (e.bookType = r.slice(1)),
      (e.bookType = t[e.bookType] || e.bookType));
  }
}
function Ex(e, t, r) {
  var n = {};
  return ((n.type = "file"), (n.file = t), Tx(n), oo(e, n));
}
function Sx(e, t, r, n, a, i, s, o) {
  var c = Br(r),
    l = o.defval,
    f = o.raw || !Object.prototype.hasOwnProperty.call(o, "raw"),
    m = !0,
    p = a === 1 ? [] : {};
  if (a !== 1)
    if (Object.defineProperty)
      try {
        Object.defineProperty(p, "__rowNum__", { value: r, enumerable: !1 });
      } catch {
        p.__rowNum__ = r;
      }
    else p.__rowNum__ = r;
  if (!s || e[r])
    for (var d = t.s.c; d <= t.e.c; ++d) {
      var _ = s ? e[r][d] : e[n[d] + c];
      if (_ === void 0 || _.t === void 0) {
        if (l === void 0) continue;
        i[d] != null && (p[i[d]] = l);
        continue;
      }
      var h = _.v;
      switch (_.t) {
        case "z":
          if (h == null) break;
          continue;
        case "e":
          h = h == 0 ? null : void 0;
          break;
        case "s":
        case "d":
        case "b":
        case "n":
          break;
        default:
          throw new Error("unrecognized type " + _.t);
      }
      if (i[d] != null) {
        if (h == null)
          if (_.t == "e" && h === null) p[i[d]] = null;
          else if (l !== void 0) p[i[d]] = l;
          else if (f && h === null) p[i[d]] = null;
          else continue;
        else
          p[i[d]] =
            f && (_.t !== "n" || (_.t === "n" && o.rawNumbers !== !1))
              ? h
              : Ft(_, h, o);
        h != null && (m = !1);
      }
    }
  return { row: p, isempty: m };
}
function _a(e, t) {
  if (e == null || e["!ref"] == null) return [];
  var r = { t: "n", v: 0 },
    n = 0,
    a = 1,
    i = [],
    s = 0,
    o = "",
    c = { s: { r: 0, c: 0 }, e: { r: 0, c: 0 } },
    l = t || {},
    f = l.range != null ? l.range : e["!ref"];
  switch (
    (l.header === 1
      ? (n = 1)
      : l.header === "A"
        ? (n = 2)
        : Array.isArray(l.header)
          ? (n = 3)
          : l.header == null && (n = 0),
    typeof f)
  ) {
    case "string":
      c = lr(f);
      break;
    case "number":
      ((c = lr(e["!ref"])), (c.s.r = f));
      break;
    default:
      c = f;
  }
  n > 0 && (a = 0);
  var m = Br(c.s.r),
    p = [],
    d = [],
    _ = 0,
    h = 0,
    x = Array.isArray(e),
    C = c.s.r,
    F = 0,
    y = {};
  x && !e[C] && (e[C] = []);
  var P = (l.skipHidden && e["!cols"]) || [],
    G = (l.skipHidden && e["!rows"]) || [];
  for (F = c.s.c; F <= c.e.c; ++F)
    if (!(P[F] || {}).hidden)
      switch (((p[F] = Wr(F)), (r = x ? e[C][F] : e[p[F] + m]), n)) {
        case 1:
          i[F] = F - c.s.c;
          break;
        case 2:
          i[F] = p[F];
          break;
        case 3:
          i[F] = l.header[F - c.s.c];
          break;
        default:
          if (
            (r == null && (r = { w: "__EMPTY", t: "s" }),
            (o = s = Ft(r, null, l)),
            (h = y[s] || 0),
            !h)
          )
            y[s] = 1;
          else {
            do o = s + "_" + h++;
            while (y[o]);
            ((y[s] = h), (y[o] = 1));
          }
          i[F] = o;
      }
  for (C = c.s.r + a; C <= c.e.r; ++C)
    if (!(G[C] || {}).hidden) {
      var Q = Sx(e, c, C, p, n, i, x, l);
      (Q.isempty === !1 || (n === 1 ? l.blankrows !== !1 : l.blankrows)) &&
        (d[_++] = Q.row);
    }
  return ((d.length = _), d);
}
var hs = /"/g;
function wx(e, t, r, n, a, i, s, o) {
  for (var c = !0, l = [], f = "", m = Br(r), p = t.s.c; p <= t.e.c; ++p)
    if (n[p]) {
      var d = o.dense ? (e[r] || [])[p] : e[n[p] + m];
      if (d == null) f = "";
      else if (d.v != null) {
        ((c = !1),
          (f = "" + (o.rawNumbers && d.t == "n" ? d.v : Ft(d, null, o))));
        for (var _ = 0, h = 0; _ !== f.length; ++_)
          if (
            (h = f.charCodeAt(_)) === a ||
            h === i ||
            h === 34 ||
            o.forceQuotes
          ) {
            f = '"' + f.replace(hs, '""') + '"';
            break;
          }
        f == "ID" && (f = '"ID"');
      } else
        d.f != null && !d.F
          ? ((c = !1),
            (f = "=" + d.f),
            f.indexOf(",") >= 0 && (f = '"' + f.replace(hs, '""') + '"'))
          : (f = "");
      l.push(f);
    }
  return o.blankrows === !1 && c ? null : l.join(s);
}
function Ei(e, t) {
  var r = [],
    n = t ?? {};
  if (e == null || e["!ref"] == null) return "";
  var a = lr(e["!ref"]),
    i = n.FS !== void 0 ? n.FS : ",",
    s = i.charCodeAt(0),
    o =
      n.RS !== void 0
        ? n.RS
        : `
`,
    c = o.charCodeAt(0),
    l = new RegExp((i == "|" ? "\\|" : i) + "+$"),
    f = "",
    m = [];
  n.dense = Array.isArray(e);
  for (
    var p = (n.skipHidden && e["!cols"]) || [],
      d = (n.skipHidden && e["!rows"]) || [],
      _ = a.s.c;
    _ <= a.e.c;
    ++_
  )
    (p[_] || {}).hidden || (m[_] = Wr(_));
  for (var h = 0, x = a.s.r; x <= a.e.r; ++x)
    (d[x] || {}).hidden ||
      ((f = wx(e, a, x, m, s, c, i, n)),
      f != null &&
        (n.strip && (f = f.replace(l, "")),
        (f || n.blankrows !== !1) && r.push((h++ ? o : "") + f)));
  return (delete n.dense, r.join(""));
}
function lo(e, t) {
  (t || (t = {}),
    (t.FS = "	"),
    (t.RS = `
`));
  var r = Ei(e, t);
  return r;
}
function Ax(e) {
  var t = "",
    r,
    n = "";
  if (e == null || e["!ref"] == null) return [];
  var a = lr(e["!ref"]),
    i = "",
    s = [],
    o,
    c = [],
    l = Array.isArray(e);
  for (o = a.s.c; o <= a.e.c; ++o) s[o] = Wr(o);
  for (var f = a.s.r; f <= a.e.r; ++f)
    for (i = Br(f), o = a.s.c; o <= a.e.c; ++o)
      if (
        ((t = s[o] + i),
        (r = l ? (e[f] || [])[o] : e[t]),
        (n = ""),
        r !== void 0)
      ) {
        if (r.F != null) {
          if (((t = r.F), !r.f)) continue;
          ((n = r.f), t.indexOf(":") == -1 && (t = t + ":" + t));
        }
        if (r.f != null) n = r.f;
        else {
          if (r.t == "z") continue;
          if (r.t == "n" && r.v != null) n = "" + r.v;
          else if (r.t == "b") n = r.v ? "TRUE" : "FALSE";
          else if (r.w !== void 0) n = "'" + r.w;
          else {
            if (r.v === void 0) continue;
            r.t == "s" ? (n = "'" + r.v) : (n = "" + r.v);
          }
        }
        c[c.length] = t + "=" + n;
      }
  return c;
}
function co(e, t, r) {
  var n = r || {},
    a = +!n.skipHeader,
    i = e || {},
    s = 0,
    o = 0;
  if (i && n.origin != null)
    if (typeof n.origin == "number") s = n.origin;
    else {
      var c = typeof n.origin == "string" ? kr(n.origin) : n.origin;
      ((s = c.r), (o = c.c));
    }
  var l,
    f = { s: { c: 0, r: 0 }, e: { c: o, r: s + t.length - 1 + a } };
  if (i["!ref"]) {
    var m = lr(i["!ref"]);
    ((f.e.c = Math.max(f.e.c, m.e.c)),
      (f.e.r = Math.max(f.e.r, m.e.r)),
      s == -1 && ((s = m.e.r + 1), (f.e.r = s + t.length - 1 + a)));
  } else s == -1 && ((s = 0), (f.e.r = t.length - 1 + a));
  var p = n.header || [],
    d = 0;
  (t.forEach(function (h, x) {
    jr(h).forEach(function (C) {
      (d = p.indexOf(C)) == -1 && (p[(d = p.length)] = C);
      var F = h[C],
        y = "z",
        P = "",
        G = Ke({ c: o + d, r: s + x + a });
      ((l = jn(i, G)),
        F && typeof F == "object" && !(F instanceof Date)
          ? (i[G] = F)
          : (typeof F == "number"
              ? (y = "n")
              : typeof F == "boolean"
                ? (y = "b")
                : typeof F == "string"
                  ? (y = "s")
                  : F instanceof Date
                    ? ((y = "d"),
                      n.cellDates || ((y = "n"), (F = Kr(F))),
                      (P = n.dateNF || gr[14]))
                    : F === null && n.nullError && ((y = "e"), (F = 0)),
            l
              ? ((l.t = y), (l.v = F), delete l.w, delete l.R, P && (l.z = P))
              : (i[G] = l = { t: y, v: F }),
            P && (l.z = P)));
    });
  }),
    (f.e.c = Math.max(f.e.c, o + p.length - 1)));
  var _ = Br(s);
  if (a) for (d = 0; d < p.length; ++d) i[Wr(d + o) + _] = { t: "s", v: p[d] };
  return ((i["!ref"] = Er(f)), i);
}
function yx(e, t) {
  return co(null, e, t);
}
function jn(e, t, r) {
  if (typeof t == "string") {
    if (Array.isArray(e)) {
      var n = kr(t);
      return (
        e[n.r] || (e[n.r] = []),
        e[n.r][n.c] || (e[n.r][n.c] = { t: "z" })
      );
    }
    return e[t] || (e[t] = { t: "z" });
  }
  return typeof t != "number" ? jn(e, Ke(t)) : jn(e, Ke({ r: t, c: r || 0 }));
}
function Cx(e, t) {
  if (typeof t == "number") {
    if (t >= 0 && e.SheetNames.length > t) return t;
    throw new Error("Cannot find sheet # " + t);
  } else if (typeof t == "string") {
    var r = e.SheetNames.indexOf(t);
    if (r > -1) return r;
    throw new Error("Cannot find sheet name |" + t + "|");
  } else throw new Error("Cannot find sheet |" + t + "|");
}
function Fx() {
  return { SheetNames: [], Sheets: {} };
}
function bx(e, t, r, n) {
  var a = 1;
  if (!r)
    for (
      ;
      a <= 65535 && e.SheetNames.indexOf((r = "Sheet" + a)) != -1;
      ++a, r = void 0
    );
  if (!r || e.SheetNames.length >= 65535)
    throw new Error("Too many worksheets");
  if (n && e.SheetNames.indexOf(r) >= 0) {
    var i = r.match(/(^.*?)(\d+)$/);
    a = (i && +i[2]) || 0;
    var s = (i && i[1]) || r;
    for (++a; a <= 65535 && e.SheetNames.indexOf((r = s + a)) != -1; ++a);
  }
  if ((Q0(r), e.SheetNames.indexOf(r) >= 0))
    throw new Error("Worksheet with name |" + r + "| already exists!");
  return (e.SheetNames.push(r), (e.Sheets[r] = t), r);
}
function kx(e, t, r) {
  (e.Workbook || (e.Workbook = {}),
    e.Workbook.Sheets || (e.Workbook.Sheets = []));
  var n = Cx(e, t);
  switch ((e.Workbook.Sheets[n] || (e.Workbook.Sheets[n] = {}), r)) {
    case 0:
    case 1:
    case 2:
      break;
    default:
      throw new Error("Bad sheet visibility setting " + r);
  }
  e.Workbook.Sheets[n].Hidden = r;
}
function Dx(e, t) {
  return ((e.z = t), e);
}
function fo(e, t, r) {
  return (t ? ((e.l = { Target: t }), r && (e.l.Tooltip = r)) : delete e.l, e);
}
function Nx(e, t, r) {
  return fo(e, "#" + t, r);
}
function Px(e, t, r) {
  (e.c || (e.c = []), e.c.push({ t, a: r || "SheetJS" }));
}
function Ox(e, t, r, n) {
  for (
    var a = typeof t != "string" ? t : lr(t),
      i = typeof t == "string" ? t : Er(t),
      s = a.s.r;
    s <= a.e.r;
    ++s
  )
    for (var o = a.s.c; o <= a.e.c; ++o) {
      var c = jn(e, s, o);
      ((c.t = "n"),
        (c.F = i),
        delete c.v,
        s == a.s.r && o == a.s.c && ((c.f = r), n && (c.D = !0)));
    }
  return e;
}
var Ha = {
  encode_col: Wr,
  encode_row: Br,
  encode_cell: Ke,
  encode_range: Er,
  decode_col: fi,
  decode_row: ci,
  split_cell: Yl,
  decode_cell: kr,
  decode_range: nt,
  format_cell: Ft,
  sheet_add_aoa: f0,
  sheet_add_json: co,
  sheet_add_dom: no,
  aoa_to_sheet: fn,
  json_to_sheet: yx,
  table_to_sheet: ao,
  table_to_book: tx,
  sheet_to_csv: Ei,
  sheet_to_txt: lo,
  sheet_to_json: _a,
  sheet_to_html: to,
  sheet_to_formulae: Ax,
  sheet_to_row_object_array: _a,
  sheet_get_cell: jn,
  book_new: Fx,
  book_append_sheet: bx,
  book_set_sheet_visibility: kx,
  cell_set_number_format: Dx,
  cell_set_hyperlink: fo,
  cell_set_internal_link: Nx,
  cell_add_comment: Px,
  sheet_set_array_formula: Ox,
  consts: { SHEET_VISIBLE: 0, SHEET_HIDDEN: 1, SHEET_VERY_HIDDEN: 2 },
};
function Rx({
  row: e,
  onEditRow: t,
  onDeleteRow: r,
  onSellRow: n,
  onUpdateMubaya: a,
  onMoveParking: i,
  onClickSerial: s,
}) {
  const [o, c] = q.useState(null),
    l = q.useCallback((p) => {
      c(p.currentTarget);
    }, []),
    f = q.useCallback(() => {
      c(null);
    }, []),
    m = (p) => {
      if (!p) return "-";
      if (p.seconds) return new Date(p.seconds * 1e3).toLocaleDateString();
      try {
        return new Date(p).toLocaleDateString();
      } catch {
        return String(p);
      }
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsxs(Ya, {
        sx: { p: 2, mb: 2 },
        children: [
          u.jsxs(me, {
            sx: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            },
            children: [
              u.jsxs(me, {
                sx: { display: "flex", alignItems: "center", gap: 1 },
                children: [
                  u.jsxs(Se, {
                    variant: "subtitle1",
                    children: [e.manufacturer, " ", e.model],
                  }),
                  u.jsx(En, { color: "info", children: e.modelYear }),
                ],
              }),
              u.jsx(St, {
                onClick: l,
                children: u.jsx(Oe, { icon: "eva:more-vertical-fill" }),
              }),
            ],
          }),
          u.jsx(go, { sx: { mb: 2, borderStyle: "dashed" } }),
          u.jsxs(me, {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            children: [
              u.jsxs(me, {
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "Serial Number",
                  }),
                  u.jsx(Se, {
                    variant: "subtitle2",
                    onClick: () => s(e),
                    sx: {
                      color: "primary.main",
                      fontWeight: "bold",
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    },
                    children: e.serialNumber,
                  }),
                ],
              }),
              u.jsxs(me, {
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "Purchased",
                  }),
                  u.jsx(Se, {
                    variant: "body2",
                    children: m(e.purchasingDate),
                  }),
                ],
              }),
              u.jsxs(me, {
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "VIN",
                  }),
                  u.jsx(Se, {
                    variant: "body2",
                    noWrap: !0,
                    children: e.vinChassisNumber,
                  }),
                ],
              }),
              u.jsxs(me, {
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "CRN",
                  }),
                  u.jsx(Se, { variant: "body2", children: e.crn }),
                ],
              }),
              u.jsxs(me, {
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "Sold Status",
                  }),
                  u.jsx(me, {
                    children: u.jsx(En, {
                      color: (e.soldStatus === "Sold" && "error") || "success",
                      children: e.soldStatus,
                    }),
                  }),
                ],
              }),
              u.jsxs(me, {
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "Mubaya",
                  }),
                  u.jsx(me, {
                    children: u.jsx(En, {
                      color:
                        (e.mubayaStatus === "Requested" && "info") ||
                        (e.mubayaStatus === "Arrived" && "warning") ||
                        (e.mubayaStatus === "Handed Over" && "success") ||
                        "default",
                      children: e.mubayaStatus || "Not Requested",
                    }),
                  }),
                ],
              }),
              u.jsxs(me, {
                sx: { gridColumn: "span 2" },
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "Vendor",
                  }),
                  u.jsx(Se, { variant: "body2", children: e.vendor }),
                ],
              }),
              u.jsxs(me, {
                sx: { gridColumn: "span 2" },
                children: [
                  u.jsx(Se, {
                    variant: "caption",
                    color: "text.secondary",
                    children: "Parking",
                  }),
                  u.jsx(Se, { variant: "body2", children: e.parkingLocation }),
                ],
              }),
            ],
          }),

        ],
      }),
      u.jsx(gs, {
        open: !!o,
        anchorEl: o,
        onClose: f,
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        children: u.jsxs(vs, {
          disablePadding: !0,
          sx: { p: 0.5, gap: 0.5, width: 140 },
          children: [
            u.jsxs(ot, {
              onClick: () => {
                (a(e, "forward"), f());
              },
              disabled: e.mubayaStatus === "Handed Over",
              sx: { color: "info.main" },
              children: [
                u.jsx(Oe, { icon: "solar:restart-bold" }),
                "Next Mubaya",
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (i(), f());
              },
              disabled: e.soldStatus === "Sold",
              sx: { color: "warning.main" },
              children: [
                u.jsx(Oe, { icon: "solar:share-bold" }),
                "Move Parking",
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (n(), f());
              },
              disabled: e.soldStatus === "Sold",
              sx: { color: "success.main" },
              children: [u.jsx(Oe, { icon: "solar:cart-3-bold" }), "Sell"],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (t(), f());
              },
              disabled: e.soldStatus === "Sold",
              children: [u.jsx(Oe, { icon: "solar:pen-bold" }), "Edit"],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (r(), f());
              },
              sx: { color: "error.main" },
              disabled: e.soldStatus === "Sold",
              children: [
                u.jsx(Oe, { icon: "solar:trash-bin-trash-bold" }),
                "Delete",
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (a(e, "backward"), f());
              },
              disabled: !e.mubayaStatus || e.mubayaStatus === "Not Requested",
              sx: { color: "error.main" },
              children: [
                u.jsx(Oe, { icon: "solar:undo-left-round-bold" }),
                "Back Mubaya",
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function Ix({
  row: e,
  selected: t,
  onSelectRow: r,
  onEditRow: n,
  onDeleteRow: a,
  onSellRow: i,
  onUpdateMubaya: s,
  onMoveParking: o,
  onClickSerial: c,
}) {
  const { t: l } = Wn(),
    [f, m] = q.useState(null),
    p = q.useCallback((h) => {
      m(h.currentTarget);
    }, []),
    d = q.useCallback(() => {
      m(null);
    }, []),
    _ = (h) => {
      if (!h) return "-";
      const x = h.seconds ? or(h.seconds * 1e3) : or(h);
      return x.isValid() ? x.format("DD MMM YYYY") : "-";
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsxs(Dt, {
        hover: !0,
        tabIndex: -1,
        role: "checkbox",
        selected: t,
        children: [
          u.jsx(Le, {
            padding: "checkbox",
            children: u.jsx(Ds, { disableRipple: !0, checked: t, onChange: r }),
          }),
          u.jsx(Le, {
            children: u.jsx(me, {
              component: "span",
              onClick: () => c(e),
              sx: {
                color: "primary.main",
                fontWeight: "bold",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              },
              children: e.serialNumber,
            }),
          }),
          u.jsx(Le, { children: _(e.purchasingDate) }),
          u.jsx(Le, {
            children: u.jsxs(me, {
              sx: { display: "flex", flexDirection: "column" },
              children: [
                u.jsx(me, {
                  component: "span",
                  sx: { fontWeight: "fontWeightMedium" },
                  children: e.manufacturer,
                }),
                u.jsxs(me, {
                  component: "span",
                  sx: { color: "text.secondary", fontSize: "0.875rem" },
                  children: [e.model, " (", e.modelYear, ")"],
                }),
              ],
            }),
          }),
          u.jsx(Le, { children: e.vinChassisNumber }),
          u.jsx(Le, { children: e.vendor }),
          u.jsx(Le, { children: e.crn }),
          u.jsx(Le, {
            children:
              e.parkingLocation === "Not Collected"
                ? l("vehicles.table.notCollected")
                : e.parkingLocation === "Collected"
                  ? l("vehicles.table.collected")
                  : e.parkingLocation,
          }),
          u.jsx(Le, {
            children: u.jsx(En, {
              color: (e.soldStatus === "Sold" && "error") || "success",
              children:
                e.soldStatus === "Sold"
                  ? l("vehicles.table.sold")
                  : l("vehicles.table.available"),
            }),
          }),
          u.jsx(Le, {
            children: u.jsxs(En, {
              color:
                (e.mubayaStatus === "Requested" && "info") ||
                (e.mubayaStatus === "Arrived" && "warning") ||
                (e.mubayaStatus === "Handed Over" && "success") ||
                "default",
              children: [
                e.mubayaStatus === "Requested" && l("vehicles.table.requested"),
                e.mubayaStatus === "Arrived" && l("vehicles.table.arrived"),
                e.mubayaStatus === "Handed Over" &&
                  l("vehicles.table.handedOver"),
                (!e.mubayaStatus || e.mubayaStatus === "Not Requested") &&
                  l("vehicles.table.notRequested"),
              ],
            }),
          }),
          u.jsx(Le, {
            children: u.jsx(fr, {
              variant: "contained",
              color: "primary",
              size: "small",
              href: e.docsUrl,
              target: "_blank",
              disabled: !e.docsUrl,
              children: l("vehicles.table.docs"),
            }),
          }),
          u.jsx(Le, {
            children: u.jsx(fr, {
              variant: "contained",
              color: "info",
              size: "small",
              href: e.picsUrl,
              target: "_blank",
              disabled: !e.picsUrl,
              children: l("vehicles.table.pics"),
            }),
          }),
          u.jsx(Le, {
            align: "right",
            children: u.jsx(St, {
              onClick: p,
              children: u.jsx(Oe, { icon: "eva:more-vertical-fill" }),
            }),
          }),
        ],
      }),
      u.jsx(gs, {
        open: !!f,
        anchorEl: f,
        onClose: d,
        anchorOrigin: { vertical: "top", horizontal: "left" },
        transformOrigin: { vertical: "top", horizontal: "right" },
        children: u.jsxs(vs, {
          disablePadding: !0,
          sx: {
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${Si.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${Si.selected}`]: { bgcolor: "action.selected" },
            },
          },
          children: [
            u.jsxs(ot, {
              onClick: () => {
                (s(e, "forward"), d());
              },
              disabled: e.mubayaStatus === "Handed Over",
              sx: { color: "info.main" },
              children: [
                u.jsx(Oe, { icon: "solar:restart-bold" }),
                l("vehicles.actions.nextMubaya"),
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (o(), d());
              },
              disabled: e.soldStatus === "Sold",
              sx: { color: "warning.main" },
              children: [
                u.jsx(Oe, { icon: "solar:share-bold" }),
                l("vehicles.actions.moveParking"),
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (i(), d());
              },
              disabled: e.soldStatus === "Sold",
              sx: { color: "success.main" },
              children: [
                u.jsx(Oe, { icon: "solar:cart-3-bold" }),
                l("vehicles.actions.sell"),
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (n(), d());
              },
              disabled: e.soldStatus === "Sold",
              children: [
                u.jsx(Oe, { icon: "solar:pen-bold" }),
                l("vehicles.actions.edit"),
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (a(), d());
              },
              sx: { color: "error.main" },
              disabled: e.soldStatus === "Sold",
              children: [
                u.jsx(Oe, { icon: "solar:trash-bin-trash-bold" }),
                l("vehicles.actions.delete"),
              ],
            }),
            u.jsxs(ot, {
              onClick: () => {
                (s(e, "backward"), d());
              },
              disabled: !e.mubayaStatus || e.mubayaStatus === "Not Requested",
              sx: { color: "error.main" },
              children: [
                u.jsx(Oe, { icon: "solar:undo-left-round-bold" }),
                l("vehicles.actions.backMubaya"),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
function Lx({
  order: e,
  onSort: t,
  orderBy: r,
  rowCount: n,
  headLabel: a,
  numSelected: i,
  onSelectAllRows: s,
}) {
  return u.jsx(bs, {
    children: u.jsxs(Dt, {
      children: [
        u.jsx(Le, {
          padding: "checkbox",
          children: u.jsx(Ds, {
            indeterminate: i > 0 && i < n,
            checked: n > 0 && i === n,
            onChange: (o) => s(o.target.checked),
          }),
        }),
        a.map((o) =>
          u.jsx(
            Le,
            {
              align: o.align || "left",
              sortDirection: r === o.id ? e : !1,
              sx: { width: o.width, minWidth: o.minWidth },
              children: u.jsxs(Bo, {
                hideSortIcon: !0,
                active: r === o.id,
                direction: r === o.id ? e : "asc",
                onClick: () => t(o.id),
                children: [
                  o.label,
                  r === o.id
                    ? u.jsx(me, {
                        sx: { ...Ro },
                        children:
                          e === "desc"
                            ? "sorted descending"
                            : "sorted ascending",
                      })
                    : null,
                ],
              }),
            },
            o.id,
          ),
        ),
      ],
    }),
  });
}
function ds({ numSelected: e }) {
  return u.jsxs(Po, {
    sx: {
      height: 64,
      display: "flex",
      justifyContent: "space-between",
      p: (t) => t.spacing(0, 1, 0, 3),
      ...(e > 0 && { color: "primary.main", bgcolor: "primary.lighter" }),
    },
    children: [
      e > 0
        ? u.jsxs(Se, {
            component: "div",
            variant: "subtitle1",
            children: [e, " selected"],
          })
        : u.jsx(Se, {
            variant: "h6",
            sx: { flexGrow: 1 },
            children: "Vehicles",
          }),
      e > 0 &&
        u.jsx(vo, {
          title: "Delete",
          children: u.jsx(St, {
            children: u.jsx(Oe, { icon: "solar:trash-bin-trash-bold" }),
          }),
        }),
    ],
  });
}
function uo({ open: e, onClose: t, onUpdate: r, editData: n }) {
  var Te, he;
  const { t: a } = Wn(),
    [i, s] = q.useState(!1),
    [o, c] = q.useState(or().format("YYYY-MM-DD")),
    [l, f] = q.useState(null),
    [m, p] = q.useState("Garage Expenses "),
    [d, _] = q.useState(""),
    [h, x] = q.useState(""),
    [C, F] = q.useState("Manual"),
    [y, P] = q.useState([]),
    [G, Q] = q.useState([]),
    [k, j] = q.useState([]);
  q.useEffect(() => {
    e &&
      V().then(() => {
        N();
      });
  }, [e, n, y.length, k.length]);
  const N = () => {
      if (n) {
        c(or(n.date.seconds * 1e3 || n.date).format("YYYY-MM-DD"));
        const le = y.find((ye) => ye.serialNumber === n.serialNumber);
        (f(le || null), p(n.category), _(String(n.amount)));
        const _e = k.find((ye) => ye.label === n.bankPortalName);
        (x((_e == null ? void 0 : _e.id) || ""), F(n.notes || ""));
      } else
        (c(or().format("YYYY-MM-DD")),
          f(null),
          p("Garage Expenses "),
          _(""),
          x(""),
          F("Manual"));
    },
    V = async () => {
      try {
        const le = ar(Ve(pe, "vehicles"), _s("purchasingDate", "desc")),
          _e = await Ye(le);
        P(_e.docs.map((A) => ({ id: A.id, ...A.data() })));
        const Be = (await Ye(Ve(pe, "expenseCategory"))).docs
          .map((A) => A.data().expenseType)
          .filter(Boolean);
        Q(Be);
        const Ie = ar(Ve(pe, "bankPortal"), er("status", "==", !0)),
          Pe = await Ye(Ie);
        j(
          Pe.docs.map((A) => ({
            id: A.id,
            label: A.data().bankPortalName,
            balance: A.data().balance,
          })),
        );
      } catch (le) {
        console.error("Error fetching expense data:", le);
      }
    },
    H = async () => {
      if (!l || !m || !d || !o || !h) {
        alert(a("vehicles.expense.messages.fillRequired"));
        return;
      }
      const le = Number(d);
      if (le <= 0) {
        alert("Amount must be greater than 0.");
        return;
      }
      s(!0);
      try {
        const _e = await rn(pe, async (ye) => {
          var xr, ft, at, X;
          const Be = Qe(pe, "setting", "counter"),
            Ie = await ye.get(Be);
          if (!Ie.exists()) throw new Error("Counters not found");
          const Pe = Ie.data(),
            A = Qe(pe, "bankPortal", h),
            D =
              ((xr = (await ye.get(A)).data()) == null ? void 0 : xr.balance) ||
              0,
            b = Qe(pe, "vehicles", l.id),
            fe =
              ((ft = (await ye.get(b)).data()) == null
                ? void 0
                : ft.totalAccruedCost) || 0;
          let xe = 0,
            ie = null,
            re = 0,
            Ce = null;
          if (n) {
            const ge = ar(
                Ve(pe, "bankPortal"),
                er("bankPortalName", "==", n.bankPortalName),
              ),
              ke = await Ye(ge);
            ke.empty ||
              ((ie = ke.docs[0].ref),
              (xe =
                ((at = (await ye.get(ie)).data()) == null
                  ? void 0
                  : at.balance) || 0));
            const Ue = ar(
                Ve(pe, "vehicles"),
                er("serialNumber", "==", n.serialNumber),
              ),
              be = await Ye(Ue);
            be.empty ||
              ((Ce = be.docs[0].ref),
              (re =
                ((X = (await ye.get(Ce)).data()) == null
                  ? void 0
                  : X.totalAccruedCost) || 0));
          }
          const Ee = (ge, ke) => {
              const Ue = or().format("DDMMYYYY");
              if (!ge) return `${ke}${Ue}0001`;
              const be = ge.substring(ge.length - 4),
                ve = String(Number(be) + 1).padStart(4, "0");
              return `${ke}${Ue}${ve}`;
            },
            qe = (ge) => {
              const ke = or().format("DDMMYYYY");
              if (!ge) return `BNK${ke}0001`;
              const Ue = ge.substring(ge.length - 4),
                be = String(Number(Ue) + 1).padStart(4, "0");
              return `BNK${ke}${be}`;
            },
            Fe = k.find((ge) => ge.id === h),
            ir = (Fe == null ? void 0 : Fe.label) || "Unknown",
            He = aa.fromDate(new Date(o));
          let se = "";
          if (n) {
            const ge = ar(
                Ve(pe, "bankTransaction"),
                er("amount", "==", n.amount),
                er("bankPortalName", "==", n.bankPortalName),
              ),
              Ue = (await Ye(ge)).docs.find((be) =>
                be.data().description.includes(n.serialNumber),
              );
            Ue && (se = Ue.id);
          }
          const vr = n ? n.transactionId : Ee(Pe.lastVehicleExpenses, "VEX"),
            Cr = se || qe(Pe.lastBankTransaction);
          (n && ie && ye.update(ie, { balance: xe + n.amount }),
            n && Ce && ye.update(Ce, { totalAccruedCost: re - n.amount }));
          const zr = Qe(pe, "vehicleExpenses", vr),
            Jr = {
              amount: le,
              bankPortalName: ir,
              category: m,
              date: He,
              notes: C,
              serialNumber: l.serialNumber,
              status: !0,
              transactionId: vr,
            };
          (n ? ye.update(zr, Jr) : ye.set(zr, Jr),
            ye.update(A, { balance: D - le }),
            ye.update(b, { totalAccruedCost: fe + le }));
          const _t = Qe(pe, "bankTransaction", Cr),
            ct = {
              amount: le,
              bankPortalName: ir,
              date: He,
              description: `${m}: ${l.serialNumber} - ${l.manufacturer} ${l.model}${C ? ` - ${C}` : ""}`,
              status: !0,
              transactionId: Cr,
              type: "Debit",
            };
          return (
            se ? ye.update(_t, ct) : ye.set(_t, ct),
            n ||
              ye.update(Be, {
                lastVehicleExpenses: vr,
                lastBankTransaction: Cr,
              }),
            { newVexId: vr, newBankTxId: Cr, bankLabel: ir }
          );
        });
        try {
          await Aa({
            header: {
              title: "💸 New Vehicle Expense",
              subtitle: "Marakish Group",
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      topLabel: "Vehicle",
                      content: `${l.serialNumber} - ${l.manufacturer} ${l.model}`,
                      icon: "CAR",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "Expense Type",
                      content: m,
                      icon: "TICKET",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "Amount",
                      content: Zt(le),
                      icon: "DOLLAR",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "Source",
                      content: _e.bankLabel,
                      icon: "ACCOUNT_BALANCE_WALLET",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "Date",
                      content: or(o).format("DD/MM/YYYY"),
                      icon: "CLOCK",
                    },
                  },
                  { textParagraph: { text: `<b>Notes:</b> ${C}` } },
                ],
              },
              {
                header: "Transaction IDs",
                widgets: [
                  {
                    keyValue: {
                      topLabel: "Expense ID",
                      content: _e.newVexId,
                      icon: "DESCRIPTION",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "Bank ID",
                      content: _e.newBankTxId,
                      icon: "ACCOUNT_BALANCE_WALLET",
                    },
                  },
                ],
              },
            ],
          });
        } catch (ye) {
          console.error("Google Chat notification failed (non-critical):", ye);
        }
        try {
          await kn({
            title: "Vehicle Expense Recorded",
            description: `${m} of ${Zt(le)} for ${l.serialNumber}`,
            type: "vehicle-expense",
          });
        } catch (ye) {
          console.error("Internal notification failed (non-critical):", ye);
        }
        (alert(a("vehicles.expense.messages.expenseRecorded")), r && r(), t());
      } catch (_e) {
        (console.error("Expense transaction failed: ", _e),
          alert(`Failed: ${_e.message}`));
      } finally {
        s(!1);
      }
    },
    Y = k.find((le) => le.id === h),
    Z = (l == null ? void 0 : l.soldStatus) === "Sold";
  return u.jsxs(Dn, {
    open: e,
    onClose: t,
    maxWidth: "md",
    fullWidth: !0,
    children: [
      u.jsxs(Nn, {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        children: [
          a("vehicles.expense.title"),
          u.jsx(St, {
            onClick: t,
            children: u.jsx(Oe, { icon: "mingcute:close-line" }),
          }),
        ],
      }),
      u.jsx(Pn, {
        dividers: !0,
        children: u.jsxs(me, {
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
          gap: 2,
          sx: { mt: 1 },
          children: [
            u.jsx(Ze, {
              fullWidth: !0,
              label: a("vehicles.expense.labels.expenseDate"),
              type: "date",
              value: o,
              onChange: (le) => c(le.target.value),
              InputLabelProps: { shrink: !0 },
              required: !0,
            }),
            u.jsxs(me, {
              sx: { position: "relative" },
              children: [
                u.jsx(Ir, {
                  options: y,
                  getOptionLabel: (le) =>
                    `${le.serialNumber} - ${le.manufacturer} ${le.model} (${le.modelYear})`,
                  value: l,
                  onChange: (le, _e) => f(_e),
                  renderInput: (le) =>
                    u.jsx(Ze, {
                      ...le,
                      label: a("vehicles.expense.labels.vehicleSerial"),
                      required: !0,
                    }),
                }),
                Z &&
                  u.jsx(Se, {
                    variant: "caption",
                    color: "error",
                    sx: { position: "absolute", bottom: -18, left: 0 },
                    children: "Warning: This is a Sold vehicle.",
                  }),
              ],
            }),
            l &&
              u.jsx(me, {
                sx: {
                  gridColumn: "span 2",
                  p: 2,
                  borderRadius: 1,
                  bgcolor: "background.neutral",
                  border: "1px dashed",
                  borderColor: "divider",
                  animation: "slideDown 0.4s ease-out",
                  "@keyframes slideDown": {
                    from: { opacity: 0, transform: "translateY(-10px)" },
                    to: { opacity: 1, transform: "translateY(0)" },
                  },
                },
                children: u.jsxs(me, {
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 1,
                  children: [
                    u.jsx(vn, {
                      label: a("vehicles.table.vin"),
                      value: l.vinChassisNumber || "N/A",
                    }),
                    u.jsx(vn, {
                      label: a("vehicles.table.vendor"),
                      value: l.vendor || "N/A",
                    }),
                    u.jsx(vn, {
                      label: a("vehicles.table.crn"),
                      value: String(l.crn || "N/A"),
                    }),
                    u.jsx(vn, {
                      label: a("vehicles.table.parking"),
                      value: l.parkingLocation || "N/A",
                    }),
                    u.jsx(vn, {
                      label: a("vehicles.expense.labels.accruedCost"),
                      value:
                        ((Te = l.totalAccruedCost) == null
                          ? void 0
                          : Te.toLocaleString()) || "0",
                      highlight: !0,
                    }),
                  ],
                }),
              }),
            u.jsx(Ir, {
              options: G,
              value: m,
              onChange: (le, _e) => p(_e || ""),
              renderInput: (le) =>
                u.jsx(Ze, {
                  ...le,
                  label: a("vehicles.expense.labels.expenseCategory"),
                  required: !0,
                }),
            }),
            u.jsx(Ze, {
              fullWidth: !0,
              label: a("vehicles.expense.labels.amount"),
              type: "number",
              value: d,
              onChange: (le) => _(le.target.value),
              required: !0,
            }),
            u.jsxs(me, {
              children: [
                u.jsx(Ir, {
                  options: k,
                  getOptionLabel: (le) => le.label,
                  value: k.find((le) => le.id === h) || null,
                  onChange: (le, _e) => x(_e ? _e.id : ""),
                  renderInput: (le) =>
                    u.jsx(Ze, {
                      ...le,
                      label: a("vehicles.expense.labels.paymentSource"),
                      required: !0,
                    }),
                }),
                Y &&
                  u.jsx(me, {
                    sx: {
                      mt: 1,
                      p: 0.5,
                      px: 1,
                      borderRadius: 0.5,
                      bgcolor:
                        Y.balance >= 0 ? "success.lighter" : "error.lighter",
                      animation: "fadeIn 0.5s ease-out",
                      "@keyframes fadeIn": {
                        from: { opacity: 0 },
                        to: { opacity: 1 },
                      },
                    },
                    children: u.jsxs(Se, {
                      variant: "caption",
                      sx: {
                        color:
                          Y.balance >= 0 ? "success.darker" : "error.darker",
                        fontWeight: "bold",
                      },
                      children: [
                        a("vehicles.purchase.labels.availableBalance"),
                        ": ",
                        (he = Y.balance) == null ? void 0 : he.toLocaleString(),
                        " AED",
                      ],
                    }),
                  }),
              ],
            }),
            u.jsx(Ze, {
              fullWidth: !0,
              label: a("vehicles.expense.labels.description"),
              value: C,
              onChange: (le) => F(le.target.value),
            }),
          ],
        }),
      }),
      u.jsxs(ia, {
        sx: { px: 3, pb: 3, gap: 1.5 },
        children: [
          u.jsx(fr, {
            onClick: t,
            variant: "outlined",
            children: a("common.cancel"),
          }),
          u.jsx(fr, {
            onClick: H,
            variant: "contained",
            color: "primary",
            disabled: i,
            children: a(
              i
                ? "vehicles.expense.messages.processing"
                : "vehicles.expense.buttons.recordExpense",
            ),
          }),
        ],
      }),
    ],
  });
}
function vn({ label: e, value: t, highlight: r }) {
  return u.jsxs(me, {
    children: [
      u.jsx(Se, { variant: "caption", color: "text.secondary", children: e }),
      u.jsx(Se, {
        variant: "body2",
        sx: {
          fontWeight: r ? "bold" : "normal",
          color: r ? "primary.main" : "inherit",
          fontSize: "0.8rem",
        },
        children: t,
      }),
    ],
  });
}
function Mx({ open: e, onClose: t, vehicle: r }) {
  var _, h;
  const [n, a] = q.useState([]),
    [i, s] = q.useState(!1),
    [o, c] = q.useState(null),
    l = q.useCallback(async () => {
      if (r)
        try {
          const x = ar(
              Ve(pe, "vehicleExpenses"),
              er("serialNumber", "==", r.serialNumber.trim()),
            ),
            F = (await Ye(x)).docs.map((y) => y.data());
          (F.sort((y, P) => {
            var k, j;
            const G = ((k = y.date) == null ? void 0 : k.seconds) || 0;
            return (((j = P.date) == null ? void 0 : j.seconds) || 0) - G;
          }),
            a(F));
        } catch (x) {
          console.error("Error fetching expenses:", x);
        }
    }, [r]);
  q.useEffect(() => {
    e && r && l();
  }, [e, r, l]);
  const f = n.reduce((x, C) => x + (C.amount || 0), 0),
    m = ((r == null ? void 0 : r.vehiclePurchaseCost) || 0) + f,
    p = async (x) => {
      if (
        window.confirm(
          "Are you sure you want to delete this expense? This will also revert bank and vehicle balances.",
        )
      )
        try {
          const C = ar(
              Ve(pe, "bankTransaction"),
              er("amount", "==", x.amount),
              er("bankPortalName", "==", x.bankPortalName),
              er("type", "==", "Debit"),
            ),
            y = (await Ye(C)).docs.find((G) =>
              G.data().description.includes(x.serialNumber),
            ),
            P = y ? y.id : null;
          (await rn(pe, async (G) => {
            var ye, Be;
            const Q = Qe(pe, "setting", "counter"),
              k = await G.get(Q),
              j = k.exists() ? k.data() : {},
              N = (Ie) => {
                var D, b;
                const Pe =
                    ((D = Ie.match(/^[A-Z]+/)) == null ? void 0 : D[0]) || "",
                  A = ((b = Ie.match(/\d+$/)) == null ? void 0 : b[0]) || "0";
                if (Number(A) <= 0) return Ie;
                const O = String(Number(A) - 1).padStart(A.length, "0");
                return Pe + O;
              },
              V = (Ie, Pe) => {
                if (!Pe) return Pe;
                let A = Pe;
                const O = [...Ie].sort().reverse();
                for (const D of O) D === A && (A = N(A));
                return A;
              },
              H = V([x.transactionId], j.lastVehicleExpenses),
              Y = P ? V([P], j.lastBankTransaction) : j.lastBankTransaction,
              Z = ar(
                Ve(pe, "bankPortal"),
                er("bankPortalName", "==", x.bankPortalName),
              ),
              Te = await Ye(Z);
            if (!Te.empty) {
              const Ie = Te.docs[0].ref,
                A =
                  ((ye = (await G.get(Ie)).data()) == null
                    ? void 0
                    : ye.balance) || 0;
              G.update(Ie, { balance: A + x.amount });
            }
            const he = ar(
                Ve(pe, "vehicles"),
                er("serialNumber", "==", x.serialNumber),
              ),
              le = await Ye(he);
            if (!le.empty) {
              const Ie = le.docs[0].ref,
                A =
                  ((Be = (await G.get(Ie)).data()) == null
                    ? void 0
                    : Be.totalAccruedCost) || 0;
              G.update(Ie, { totalAccruedCost: A - x.amount });
            }
            (P && G.delete(Qe(pe, "bankTransaction", P)),
              G.delete(Qe(pe, "vehicleExpenses", x.transactionId)));
            const _e = {};
            (H !== j.lastVehicleExpenses && (_e.lastVehicleExpenses = H),
              Y !== j.lastBankTransaction && (_e.lastBankTransaction = Y),
              Object.keys(_e).length > 0 && G.update(Q, _e));
          }),
            alert("Expense deleted successfully."),
            l());
        } catch (C) {
          (console.error("Error deleting expense:", C),
            alert("Failed to delete expense."));
        }
    },
    d = () => {
      var G, Q, k;
      if (!r) return;
      const x = new Cs("p", "mm", "a4"),
        C = x.internal.pageSize.width;
      (x.setFontSize(22),
        x.setTextColor(33, 43, 54),
        x.text("Marakish Group", 14, 20),
        x.setFontSize(9),
        x.setTextColor(145, 158, 171),
        x.text(
          `Generated on: ${or().format("DD MMM YYYY, HH:mm")}`,
          C - 14,
          20,
          { align: "right" },
        ),
        x.setFontSize(16),
        x.setTextColor(33, 43, 54),
        x.text("Vehicle Financial Statement", 14, 32),
        x.setFillColor(244, 246, 248),
        x.roundedRect(14, 38, C - 28, 25, 2, 2, "F"),
        x.setFontSize(9),
        x.setTextColor(99, 115, 129),
        x.text("SERIAL NUMBER", 20, 46),
        x.text("VEHICLE DETAILS", 20, 52),
        x.text("VIN / CHASSIS", 20, 58),
        x.setTextColor(33, 43, 54),
        x.setFont("helvetica", "bold"),
        x.text(r.serialNumber, 60, 46),
        x.text(`${r.manufacturer} ${r.model} (${r.modelYear})`, 60, 52),
        x.text(r.vinChassisNumber || "-", 60, 58));
      const F = 70,
        y = (C - 42) / 3;
      (x.setFillColor(244, 246, 248),
        x.roundedRect(14, F, y, 20, 1, 1, "F"),
        x.setFontSize(8),
        x.setTextColor(99, 115, 129),
        x.text("PURCHASE PRICE", 18, F + 7),
        x.setFontSize(11),
        x.setTextColor(33, 43, 54),
        x.text(
          `${(G = r == null ? void 0 : r.vehiclePurchaseCost) == null ? void 0 : G.toLocaleString()} AED`,
          18,
          F + 15,
        ),
        x.setFillColor(255, 247, 247),
        x.roundedRect(14 + y + 7, F, y, 20, 1, 1, "F"),
        x.setFontSize(8),
        x.setTextColor(183, 29, 24),
        x.text("ADDITIONAL EXPENSES", 18 + y + 7, F + 7),
        x.setFontSize(11),
        x.text(`${f.toLocaleString()} AED`, 18 + y + 7, F + 15),
        x.setFillColor(33, 43, 54),
        x.roundedRect(14 + (y + 7) * 2, F, y, 20, 1, 1, "F"),
        x.setFontSize(8),
        x.setTextColor(255, 255, 255),
        x.text("TOTAL ACCRUED COST", 18 + (y + 7) * 2, F + 7),
        x.setFontSize(11),
        x.text(`${m.toLocaleString()} AED`, 18 + (y + 7) * 2, F + 15));
      const P = [
        [
          {
            content: "1. VEHICLE ACQUISITION",
            colSpan: 5,
            styles: {
              fillColor: [244, 246, 248],
              fontStyle: "bold",
              textColor: [33, 43, 54],
            },
          },
        ],
        [
          "Initial Purchase",
          or(
            ((Q = r.purchasingDate) == null ? void 0 : Q.seconds) * 1e3 ||
              r.purchasingDate,
          ).format("DD MMM YYYY"),
          r.vendor || "-",
          "-",
          {
            content: `${(k = r.vehiclePurchaseCost) == null ? void 0 : k.toLocaleString()} AED`,
            styles: { fontStyle: "bold" },
          },
        ],
      ];
      (n.length > 0 &&
        (P.push([
          {
            content: "2. MAINTENANCE & OTHER EXPENSES",
            colSpan: 5,
            styles: {
              fillColor: [244, 246, 248],
              fontStyle: "bold",
              textColor: [33, 43, 54],
            },
          },
        ]),
        n.forEach((j) => {
          var N, V;
          P.push([
            j.category || "Misc",
            or(
              ((N = j.date) == null ? void 0 : N.seconds) * 1e3 || j.date,
            ).format("DD MMM YYYY"),
            j.bankPortalName || "-",
            j.notes || "-",
            `${(V = j.amount) == null ? void 0 : V.toLocaleString()} AED`,
          ]);
        })),
        Fs(x, {
          startY: F + 30,
          head: [
            [
              "Description",
              "Date",
              "Source / Vendor",
              "Observations",
              "Amount (AED)",
            ],
          ],
          body: P,
          theme: "grid",
          headStyles: {
            fillColor: [33, 43, 54],
            fontSize: 9,
            halign: "center",
          },
          styles: { fontSize: 8.5, cellPadding: 3, textColor: [33, 43, 54] },
          columnStyles: { 4: { halign: "right" } },
          foot: [
            [
              "GRAND TOTAL ACCRUED COST",
              "",
              "",
              "",
              `${m.toLocaleString()} AED`,
            ],
          ],
          footStyles: {
            fillColor: [33, 43, 54],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "right",
            fontSize: 10,
          },
        }),
        window.open(x.output("bloburl"), "_blank"));
    };
  return u.jsxs(Dn, {
    open: e,
    onClose: t,
    fullWidth: !0,
    maxWidth: "md",
    children: [
      u.jsxs(Nn, {
        sx: {
          m: 0,
          p: 2.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        children: [
          u.jsxs(Se, {
            variant: "h6",
            sx: { fontWeight: 700 },
            children: [
              "Vehicle Statement: ",
              u.jsx(me, {
                component: "span",
                sx: { color: "primary.main" },
                children: r == null ? void 0 : r.serialNumber,
              }),
            ],
          }),
          u.jsx(St, {
            onClick: t,
            sx: { color: "text.disabled" },
            children: u.jsx(Oe, { icon: "mingcute:close-line" }),
          }),
        ],
      }),
      u.jsx(Pn, {
        dividers: !0,
        sx: { p: 3, bgcolor: "background.default" },
        children: u.jsxs(Et, {
          spacing: 4,
          children: [
            u.jsxs(me, {
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
              },
              gap: 3,
              sx: {
                p: 2.5,
                bgcolor: "background.neutral",
                borderRadius: 1.5,
                border: "1px solid",
                borderColor: "divider",
              },
              children: [
                u.jsxs(me, {
                  children: [
                    u.jsx(Se, {
                      variant: "overline",
                      color: "text.secondary",
                      sx: { display: "block", mb: 0.5 },
                      children: "Vehicle Identity",
                    }),
                    u.jsxs(Se, {
                      variant: "subtitle1",
                      sx: { fontWeight: 700 },
                      children: [
                        r == null ? void 0 : r.manufacturer,
                        " ",
                        r == null ? void 0 : r.model,
                      ],
                    }),
                  ],
                }),
                u.jsxs(me, {
                  children: [
                    u.jsx(Se, {
                      variant: "overline",
                      color: "text.secondary",
                      sx: { display: "block", mb: 0.5 },
                      children: "Model Year",
                    }),
                    u.jsx(Se, {
                      variant: "subtitle1",
                      sx: { fontWeight: 700 },
                      children: r == null ? void 0 : r.modelYear,
                    }),
                  ],
                }),
                u.jsxs(me, {
                  children: [
                    u.jsx(Se, {
                      variant: "overline",
                      color: "text.secondary",
                      sx: { display: "block", mb: 0.5 },
                      children: "Chassis Number",
                    }),
                    u.jsx(Se, {
                      variant: "subtitle1",
                      sx: { fontWeight: 700, letterSpacing: 0.5 },
                      children:
                        (r == null ? void 0 : r.vinChassisNumber) || "N/A",
                    }),
                  ],
                }),
              ],
            }),
            u.jsxs(me, {
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
              },
              gap: 3,
              children: [
                u.jsx(Ga, {
                  sx: {
                    p: 2.5,
                    position: "relative",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: (x) => {
                      var C;
                      return (C = x.customShadows) == null ? void 0 : C.card;
                    },
                  },
                  children: u.jsxs(Et, {
                    direction: "row",
                    spacing: 2,
                    alignItems: "center",
                    children: [
                      u.jsx(Oe, {
                        icon: "solar:cart-bold",
                        width: 32,
                        sx: { color: "primary.main", opacity: 0.8 },
                      }),
                      u.jsxs(me, {
                        children: [
                          u.jsx(Se, {
                            variant: "caption",
                            color: "text.secondary",
                            sx: { fontWeight: 700 },
                            children: "PURCHASE PRICE",
                          }),
                          u.jsxs(Se, {
                            variant: "h5",
                            sx: { fontWeight: 800 },
                            children: [
                              (_ =
                                r == null ? void 0 : r.vehiclePurchaseCost) ==
                              null
                                ? void 0
                                : _.toLocaleString(),
                              " ",
                              u.jsx(Se, {
                                component: "span",
                                variant: "caption",
                                children: "AED",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                u.jsx(Ga, {
                  sx: {
                    p: 2.5,
                    position: "relative",
                    bgcolor: "error.lighter",
                    border: "1px solid",
                    borderColor: "error.light",
                    boxShadow: "none",
                  },
                  children: u.jsxs(Et, {
                    direction: "row",
                    spacing: 2,
                    alignItems: "center",
                    children: [
                      u.jsx(Oe, {
                        icon: "solar:ruler-cross-pen-bold",
                        width: 32,
                        sx: { color: "error.main", opacity: 0.8 },
                      }),
                      u.jsxs(me, {
                        children: [
                          u.jsx(Se, {
                            variant: "caption",
                            color: "error.dark",
                            sx: { fontWeight: 700 },
                            children: "OTHER EXPENSES",
                          }),
                          u.jsxs(Se, {
                            variant: "h5",
                            color: "error.darker",
                            sx: { fontWeight: 800 },
                            children: [
                              f.toLocaleString(),
                              " ",
                              u.jsx(Se, {
                                component: "span",
                                variant: "caption",
                                children: "AED",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                u.jsx(Ga, {
                  sx: {
                    p: 2.5,
                    position: "relative",
                    bgcolor: "primary.darker",
                    border: "none",
                    boxShadow: (x) => {
                      var C;
                      return (C = x.customShadows) == null ? void 0 : C.primary;
                    },
                  },
                  children: u.jsxs(Et, {
                    direction: "row",
                    spacing: 2,
                    alignItems: "center",
                    children: [
                      u.jsx(Oe, {
                        icon: "solar:box-minimalistic-bold",
                        width: 32,
                        sx: { color: "primary.lighter", opacity: 0.8 },
                      }),
                      u.jsxs(me, {
                        children: [
                          u.jsx(Se, {
                            variant: "caption",
                            sx: {
                              color: "primary.lighter",
                              fontWeight: 700,
                              opacity: 0.8,
                            },
                            children: "TOTAL ACCRUED",
                          }),
                          u.jsxs(Se, {
                            variant: "h5",
                            sx: { color: "common.white", fontWeight: 800 },
                            children: [
                              m.toLocaleString(),
                              " ",
                              u.jsx(Se, {
                                component: "span",
                                variant: "caption",
                                children: "AED",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            u.jsxs(me, {
              children: [
                u.jsxs(Se, {
                  variant: "h6",
                  sx: {
                    mb: 2,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  },
                  children: [
                    u.jsx(Oe, { icon: "solar:bill-list-bold" }),
                    "Financial Breakdown",
                  ],
                }),
                u.jsx(ks, {
                  sx: {
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1.5,
                    overflow: "hidden",
                    bgcolor: "background.paper",
                  },
                  children: u.jsx(Ts, {
                    children: u.jsxs(Za, {
                      size: "small",
                      children: [
                        u.jsx(bs, {
                          sx: { bgcolor: "background.neutral" },
                          children: u.jsxs(Dt, {
                            children: [
                              u.jsx(Le, {
                                sx: {
                                  color: "text.secondary",
                                  fontWeight: 700,
                                },
                                children: "Description",
                              }),
                              u.jsx(Le, {
                                sx: {
                                  color: "text.secondary",
                                  fontWeight: 700,
                                },
                                children: "Date",
                              }),
                              u.jsx(Le, {
                                sx: {
                                  color: "text.secondary",
                                  fontWeight: 700,
                                },
                                children: "Provider / Bank",
                              }),
                              u.jsx(Le, {
                                sx: {
                                  color: "text.secondary",
                                  fontWeight: 700,
                                },
                                children: "Note",
                              }),
                              u.jsx(Le, {
                                align: "right",
                                sx: {
                                  color: "text.secondary",
                                  fontWeight: 700,
                                },
                                children: "Amount",
                              }),
                              u.jsx(Le, {
                                sx: {
                                  color: "text.secondary",
                                  fontWeight: 700,
                                },
                                children: "Actions",
                              }),
                            ],
                          }),
                        }),
                        u.jsxs(ei, {
                          children: [
                            u.jsx(Dt, {
                              sx: { bgcolor: "action.hover" },
                              children: u.jsx(Le, {
                                colSpan: 6,
                                sx: {
                                  py: 1,
                                  fontWeight: 800,
                                  color: "text.primary",
                                  fontSize: "0.75rem",
                                  letterSpacing: 1,
                                },
                                children: "1. VEHICLE ACQUISITION",
                              }),
                            }),
                            u.jsxs(Dt, {
                              hover: !0,
                              children: [
                                u.jsx(Le, {
                                  sx: { fontWeight: 600 },
                                  children: "Initial Purchase Cost",
                                }),
                                u.jsx(Le, {
                                  children:
                                    r != null && r.purchasingDate
                                      ? or(
                                          r.purchasingDate.seconds * 1e3 ||
                                            r.purchasingDate,
                                        ).format("DD MMM YYYY")
                                      : "-",
                                }),
                                u.jsx(Le, {
                                  children:
                                    (r == null ? void 0 : r.vendor) ||
                                    "Unknown",
                                }),
                                u.jsx(Le, { children: "-" }),
                                u.jsxs(Le, {
                                  align: "right",
                                  sx: { fontWeight: 800 },
                                  children: [
                                    (h =
                                      r == null
                                        ? void 0
                                        : r.vehiclePurchaseCost) == null
                                      ? void 0
                                      : h.toLocaleString(),
                                    " AED",
                                  ],
                                }),
                                u.jsx(Le, { children: "-" }),
                              ],
                            }),
                            n.length > 0 &&
                              u.jsxs(u.Fragment, {
                                children: [
                                  u.jsx(Dt, {
                                    sx: { bgcolor: "action.hover" },
                                    children: u.jsx(Le, {
                                      colSpan: 6,
                                      sx: {
                                        py: 1,
                                        fontWeight: 800,
                                        color: "text.primary",
                                        fontSize: "0.75rem",
                                        letterSpacing: 1,
                                        mt: 2,
                                      },
                                      children:
                                        "2. MAINTENANCE & REHABILITATION",
                                    }),
                                  }),
                                  n.map((x, C) => {
                                    var F;
                                    return u.jsxs(
                                      Dt,
                                      {
                                        hover: !0,
                                        children: [
                                          u.jsx(Le, {
                                            sx: { pl: 3 },
                                            children: x.category,
                                          }),
                                          u.jsx(Le, {
                                            children: or(
                                              x.date.seconds * 1e3 || x.date,
                                            ).format("DD MMM YYYY"),
                                          }),
                                          u.jsx(Le, {
                                            children: x.bankPortalName,
                                          }),
                                          u.jsx(Le, {
                                            sx: {
                                              color: "text.secondary",
                                              fontStyle: "italic",
                                            },
                                            children: x.notes || "-",
                                          }),
                                          u.jsxs(Le, {
                                            align: "right",
                                            sx: { fontWeight: 600 },
                                            children: [
                                              (F = x.amount) == null
                                                ? void 0
                                                : F.toLocaleString(),
                                              " AED",
                                            ],
                                          }),
                                          u.jsx(Le, {
                                            children: u.jsxs(Et, {
                                              direction: "row",
                                              spacing: 1,
                                              children: [
                                                u.jsx(St, {
                                                  size: "small",
                                                  color: "primary",
                                                  onClick: () => {
                                                    (c(x), s(!0));
                                                  },
                                                  children: u.jsx(Oe, {
                                                    icon: "solar:pen-bold",
                                                  }),
                                                }),
                                                u.jsx(St, {
                                                  size: "small",
                                                  color: "error",
                                                  onClick: () => p(x),
                                                  children: u.jsx(Oe, {
                                                    icon: "solar:trash-bin-trash-bold",
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      },
                                      C,
                                    );
                                  }),
                                ],
                              }),
                            n.length === 0 &&
                              u.jsx(Dt, {
                                children: u.jsx(Le, {
                                  colSpan: 6,
                                  align: "center",
                                  sx: {
                                    py: 4,
                                    color: "text.disabled",
                                    fontStyle: "italic",
                                  },
                                  children:
                                    "No additional maintenance expenses recorded.",
                                }),
                              }),
                          ],
                        }),
                      ],
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsxs(me, {
        sx: {
          p: 2.5,
          display: "flex",
          justifyContent: "flex-end",
          gap: 1.5,
          bgcolor: "background.default",
        },
        children: [
          u.jsx(fr, {
            variant: "outlined",
            color: "inherit",
            onClick: t,
            sx: { px: 3 },
            children: "Close",
          }),
          u.jsx(fr, {
            variant: "contained",
            color: "primary",
            startIcon: u.jsx(Oe, { icon: "solar:printer-minimalistic-bold" }),
            onClick: d,
            sx: {
              px: 3,
              boxShadow: (x) => {
                var C;
                return (C = x.customShadows) == null ? void 0 : C.primary;
              },
            },
            children: "Print Statement",
          }),
        ],
      }),
      i &&
        u.jsx(uo, {
          open: i,
          onClose: () => {
            (s(!1), c(null));
          },
          onUpdate: () => {
            l();
          },
          editData: o,
        }),
    ],
  });
}
const Ga = ({ children: e, sx: t }) =>
  u.jsx(me, { sx: { borderRadius: 1.5, ...t }, children: e });
function Bx({ open: e, onClose: t, vehicle: r, onUpdate: n }) {
  const { t: a } = Wn(),
    [i, s] = q.useState(!1),
    [o, c] = q.useState([]),
    [l, f] = q.useState("");
  q.useEffect(() => {
    e && r && (m(), f(r.parkingLocation || ""));
  }, [e, r]);
  const m = async () => {
      try {
        const d = ar(Ve(pe, "parkingList"), er("status", "==", !0)),
          _ = await Ye(d);
        c(_.docs.map((h) => ({ id: h.id, label: h.data().parkingLocation })));
      } catch (d) {
        console.error("Error fetching parking locations:", d);
      }
    },
    p = async () => {
      if (!r || !l) {
        alert(a("vehicles.parking.messages.selectLocation"));
        return;
      }
      if (l === r.parkingLocation) {
        t();
        return;
      }
      s(!0);
      try {
        const d = Qe(pe, "vehicles", r.id);
        await Es(d, { parkingLocation: l });
        try {
          await Aa({
            header: {
              title: "📍 Vehicle Parking Moved",
              subtitle: "Marakish Group",
            },
            sections: [
              {
                widgets: [
                  {
                    keyValue: {
                      topLabel: "Serial Number",
                      content: r.serialNumber,
                      icon: "TICKET",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "Vehicle",
                      content: `${r.manufacturer} ${r.model}`,
                      icon: "CAR",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "From",
                      content: r.parkingLocation || "N/A",
                      icon: "FLIGHT_TAKEOFF",
                    },
                  },
                  {
                    keyValue: {
                      topLabel: "To",
                      content: l,
                      icon: "FLIGHT_LAND",
                    },
                  },
                ],
              },
            ],
          });
        } catch (_) {
          console.error("Google Chat notification failed (non-critical):", _);
        }
        try {
          await kn({
            title: "Parking Location Updated",
            description: `${r.serialNumber} moved from ${r.parkingLocation || "N/A"} to ${l}`,
            type: "parking-move",
          });
        } catch (_) {
          console.error("Internal notification failed (non-critical):", _);
        }
        (alert(a("vehicles.parking.messages.updateSuccess")), n && n(), t());
      } catch (d) {
        (console.error("Move parking failed: ", d),
          alert(`Failed: ${d.message}`));
      } finally {
        s(!1);
      }
    };
  return r
    ? u.jsxs(Dn, {
        open: e,
        onClose: t,
        maxWidth: "xs",
        fullWidth: !0,
        children: [
          u.jsxs(Nn, {
            sx: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
            children: [
              a("vehicles.parking.title"),
              u.jsx(St, {
                onClick: t,
                children: u.jsx(Oe, { icon: "mingcute:close-line" }),
              }),
            ],
          }),
          u.jsx(Pn, {
            dividers: !0,
            children: u.jsxs(me, {
              sx: { mt: 1, mb: 3 },
              children: [
                u.jsxs(Se, {
                  variant: "subtitle2",
                  color: "text.secondary",
                  gutterBottom: !0,
                  children: [
                    a("vehicles.parking.labels.vehicle"),
                    ": ",
                    r.serialNumber,
                    " - ",
                    r.manufacturer,
                    " ",
                    r.model,
                  ],
                }),
                u.jsxs(Se, {
                  variant: "body2",
                  sx: { mb: 2 },
                  children: [
                    a("vehicles.parking.labels.currentLocation"),
                    ": ",
                    u.jsx("strong", { children: r.parkingLocation || "N/A" }),
                  ],
                }),
                u.jsx(Ir, {
                  options: o,
                  getOptionLabel: (d) => d.label,
                  value: o.find((d) => d.label === l) || null,
                  onChange: (d, _) => f(_ ? _.label : ""),
                  renderInput: (d) =>
                    u.jsx(Ze, {
                      ...d,
                      label: `${a("vehicles.parking.labels.newLocation")} *`,
                      required: !0,
                    }),
                }),
              ],
            }),
          }),
          u.jsxs(ia, {
            sx: { px: 3, pb: 3, gap: 1.5 },
            children: [
              u.jsx(fr, {
                onClick: t,
                variant: "outlined",
                children: a("common.cancel"),
              }),
              u.jsx(fr, {
                onClick: p,
                variant: "contained",
                disabled: i || !l || l === r.parkingLocation,
                color: "primary",
                children: a(
                  i
                    ? "vehicles.parking.messages.moving"
                    : "vehicles.parking.buttons.updateLocation",
                ),
              }),
            ],
          }),
        ],
      })
    : null;
}
const jx = Ss(
    u.jsx("path", {
      d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
    }),
  ),
  Ux = Ss(
    u.jsx("path", {
      d: "M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z",
    }),
  ),
  Wx = Ht("span", { shouldForwardProp: ws })({
    position: "relative",
    display: "flex",
  }),
  Vx = Ht(jx)({ transform: "scale(1)" }),
  Hx = Ht(Ux)(
    Ta(({ theme: e }) => ({
      left: 0,
      position: "absolute",
      transform: "scale(0)",
      transition: e.transitions.create("transform", {
        easing: e.transitions.easing.easeIn,
        duration: e.transitions.duration.shortest,
      }),
      variants: [
        {
          props: { checked: !0 },
          style: {
            transform: "scale(1)",
            transition: e.transitions.create("transform", {
              easing: e.transitions.easing.easeOut,
              duration: e.transitions.duration.shortest,
            }),
          },
        },
      ],
    })),
  );
function ho(e) {
  const { checked: t = !1, classes: r = {}, fontSize: n } = e,
    a = { ...e, checked: t };
  return u.jsxs(Wx, {
    className: r.root,
    ownerState: a,
    children: [
      u.jsx(Vx, { fontSize: n, className: r.background, ownerState: a }),
      u.jsx(Hx, { fontSize: n, className: r.dot, ownerState: a }),
    ],
  });
}
const xo = q.createContext(void 0);
function Gx() {
  return q.useContext(xo);
}
function $x(e) {
  return Sa("MuiRadio", e);
}
const xs = Ea("MuiRadio", [
    "root",
    "checked",
    "disabled",
    "colorPrimary",
    "colorSecondary",
    "sizeSmall",
  ]),
  Yx = (e) => {
    const { classes: t, color: r, size: n } = e,
      a = { root: ["root", `color${on(r)}`, n !== "medium" && `size${on(n)}`] };
    return { ...t, ...wa(a, $x, t) };
  },
  zx = Ht(Ho, {
    shouldForwardProp: (e) => ws(e) || e === "classes",
    name: "MuiRadio",
    slot: "Root",
    overridesResolver: (e, t) => {
      const { ownerState: r } = e;
      return [
        t.root,
        r.size !== "medium" && t[`size${on(r.size)}`],
        t[`color${on(r.color)}`],
      ];
    },
  })(
    Ta(({ theme: e }) => ({
      color: (e.vars || e).palette.text.secondary,
      [`&.${xs.disabled}`]: { color: (e.vars || e).palette.action.disabled },
      variants: [
        {
          props: { color: "default", disabled: !1, disableRipple: !1 },
          style: {
            "&:hover": {
              backgroundColor: e.vars
                ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
                : wi(e.palette.action.active, e.palette.action.hoverOpacity),
            },
          },
        },
        ...Object.entries(e.palette)
          .filter(Ai())
          .map(([t]) => ({
            props: { color: t, disabled: !1, disableRipple: !1 },
            style: {
              "&:hover": {
                backgroundColor: e.vars
                  ? `rgba(${e.vars.palette[t].mainChannel} / ${e.vars.palette.action.hoverOpacity})`
                  : wi(e.palette[t].main, e.palette.action.hoverOpacity),
              },
            },
          })),
        ...Object.entries(e.palette)
          .filter(Ai())
          .map(([t]) => ({
            props: { color: t, disabled: !1 },
            style: {
              [`&.${xs.checked}`]: { color: (e.vars || e).palette[t].main },
            },
          })),
        {
          props: { disableRipple: !1 },
          style: {
            "&:hover": {
              "@media (hover: none)": { backgroundColor: "transparent" },
            },
          },
        },
      ],
    })),
  );
function Xx(e, t) {
  return typeof t == "object" && t !== null ? e === t : String(e) === String(t);
}
const Kx = u.jsx(ho, { checked: !0 }),
  qx = u.jsx(ho, {}),
  ta = q.forwardRef(function (t, r) {
    const n = Ja({ props: t, name: "MuiRadio" }),
      {
        checked: a,
        checkedIcon: i = Kx,
        color: s = "primary",
        icon: o = qx,
        name: c,
        onChange: l,
        size: f = "medium",
        className: m,
        disabled: p,
        disableRipple: d = !1,
        slots: _ = {},
        slotProps: h = {},
        inputProps: x,
        ...C
      } = n,
      F = Qa();
    let y = p;
    (F && typeof y > "u" && (y = F.disabled), y ?? (y = !1));
    const P = { ...n, disabled: y, disableRipple: d, color: s, size: f },
      G = Yx(P),
      Q = Gx();
    let k = a;
    const j = _o(l, Q && Q.onChange);
    let N = c;
    Q &&
      (typeof k > "u" && (k = Xx(Q.value, n.value)),
      typeof N > "u" && (N = Q.name));
    const V = h.input ?? x,
      [H, Y] = As("root", {
        ref: r,
        elementType: zx,
        className: bn(G.root, m),
        shouldForwardComponentProp: !0,
        externalForwardedProps: { slots: _, slotProps: h, ...C },
        getSlotProps: (Z) => ({
          ...Z,
          onChange: (Te, ...he) => {
            var le;
            ((le = Z.onChange) == null || le.call(Z, Te, ...he), j(Te, ...he));
          },
        }),
        ownerState: P,
        additionalProps: {
          type: "radio",
          icon: q.cloneElement(o, { fontSize: o.props.fontSize ?? f }),
          checkedIcon: q.cloneElement(i, { fontSize: i.props.fontSize ?? f }),
          disabled: y,
          name: N,
          checked: k,
          slots: _,
          slotProps: { input: typeof V == "function" ? V(P) : V },
        },
      });
    return u.jsx(H, { ...Y, classes: G });
  });
function Jx(e) {
  return Sa("MuiFormGroup", e);
}
Ea("MuiFormGroup", ["root", "row", "error"]);
const Qx = (e) => {
    const { classes: t, row: r, error: n } = e;
    return wa({ root: ["root", r && "row", n && "error"] }, Jx, t);
  },
  Zx = Ht("div", {
    name: "MuiFormGroup",
    slot: "Root",
    overridesResolver: (e, t) => {
      const { ownerState: r } = e;
      return [t.root, r.row && t.row];
    },
  })({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    variants: [{ props: { row: !0 }, style: { flexDirection: "row" } }],
  }),
  ep = q.forwardRef(function (t, r) {
    const n = Ja({ props: t, name: "MuiFormGroup" }),
      { className: a, row: i = !1, ...s } = n,
      o = Qa(),
      c = ys({ props: n, muiFormControl: o, states: ["error"] }),
      l = { ...n, row: i, error: c.error },
      f = Qx(l);
    return u.jsx(Zx, { className: bn(f.root, a), ownerState: l, ref: r, ...s });
  });
function rp(e) {
  return Sa("MuiRadioGroup", e);
}
Ea("MuiRadioGroup", ["root", "row", "error"]);
const tp = (e) => {
    const { classes: t, row: r, error: n } = e;
    return wa({ root: ["root", r && "row", n && "error"] }, rp, t);
  },
  np = q.forwardRef(function (t, r) {
    const {
        actions: n,
        children: a,
        className: i,
        defaultValue: s,
        name: o,
        onChange: c,
        value: l,
        ...f
      } = t,
      m = q.useRef(null),
      p = tp(t),
      [d, _] = To({ controlled: l, default: s, name: "RadioGroup" });
    q.useImperativeHandle(
      n,
      () => ({
        focus: () => {
          let F = m.current.querySelector("input:not(:disabled):checked");
          (F || (F = m.current.querySelector("input:not(:disabled)")),
            F && F.focus());
        },
      }),
      [],
    );
    const h = Eo(r, m),
      x = So(o),
      C = q.useMemo(
        () => ({
          name: x,
          onChange(F) {
            (_(F.target.value), c && c(F, F.target.value));
          },
          value: d,
        }),
        [x, c, _, d],
      );
    return u.jsx(xo.Provider, {
      value: C,
      children: u.jsx(ep, {
        role: "radiogroup",
        ref: h,
        className: bn(p.root, i),
        ...f,
        children: a,
      }),
    });
  });
function ap(e) {
  return Sa("MuiFormControlLabel", e);
}
const Tn = Ea("MuiFormControlLabel", [
    "root",
    "labelPlacementStart",
    "labelPlacementTop",
    "labelPlacementBottom",
    "disabled",
    "label",
    "error",
    "required",
    "asterisk",
  ]),
  ip = (e) => {
    const {
        classes: t,
        disabled: r,
        labelPlacement: n,
        error: a,
        required: i,
      } = e,
      s = {
        root: [
          "root",
          r && "disabled",
          `labelPlacement${on(n)}`,
          a && "error",
          i && "required",
        ],
        label: ["label", r && "disabled"],
        asterisk: ["asterisk", a && "error"],
      };
    return wa(s, ap, t);
  },
  sp = Ht("label", {
    name: "MuiFormControlLabel",
    slot: "Root",
    overridesResolver: (e, t) => {
      const { ownerState: r } = e;
      return [
        { [`& .${Tn.label}`]: t.label },
        t.root,
        t[`labelPlacement${on(r.labelPlacement)}`],
      ];
    },
  })(
    Ta(({ theme: e }) => ({
      display: "inline-flex",
      alignItems: "center",
      cursor: "pointer",
      verticalAlign: "middle",
      WebkitTapHighlightColor: "transparent",
      marginLeft: -11,
      marginRight: 16,
      [`&.${Tn.disabled}`]: { cursor: "default" },
      [`& .${Tn.label}`]: {
        [`&.${Tn.disabled}`]: { color: (e.vars || e).palette.text.disabled },
      },
      variants: [
        {
          props: { labelPlacement: "start" },
          style: { flexDirection: "row-reverse", marginRight: -11 },
        },
        {
          props: { labelPlacement: "top" },
          style: { flexDirection: "column-reverse" },
        },
        {
          props: { labelPlacement: "bottom" },
          style: { flexDirection: "column" },
        },
        {
          props: ({ labelPlacement: t }) =>
            t === "start" || t === "top" || t === "bottom",
          style: { marginLeft: 16 },
        },
      ],
    })),
  ),
  op = Ht("span", {
    name: "MuiFormControlLabel",
    slot: "Asterisk",
    overridesResolver: (e, t) => t.asterisk,
  })(
    Ta(({ theme: e }) => ({
      [`&.${Tn.error}`]: { color: (e.vars || e).palette.error.main },
    })),
  ),
  na = q.forwardRef(function (t, r) {
    const n = Ja({ props: t, name: "MuiFormControlLabel" }),
      {
        checked: a,
        className: i,
        componentsProps: s = {},
        control: o,
        disabled: c,
        disableTypography: l,
        inputRef: f,
        label: m,
        labelPlacement: p = "end",
        name: d,
        onChange: _,
        required: h,
        slots: x = {},
        slotProps: C = {},
        value: F,
        ...y
      } = n,
      P = Qa(),
      G = c ?? o.props.disabled ?? (P == null ? void 0 : P.disabled),
      Q = h ?? o.props.required,
      k = { disabled: G, required: Q };
    ["checked", "name", "onChange", "value", "inputRef"].forEach((he) => {
      typeof o.props[he] > "u" && typeof n[he] < "u" && (k[he] = n[he]);
    });
    const j = ys({ props: n, muiFormControl: P, states: ["error"] }),
      N = { ...n, disabled: G, labelPlacement: p, required: Q, error: j.error },
      V = ip(N),
      H = { slots: x, slotProps: { ...s, ...C } },
      [Y, Z] = As("typography", {
        elementType: Se,
        externalForwardedProps: H,
        ownerState: N,
      });
    let Te = m;
    return (
      Te != null &&
        Te.type !== Se &&
        !l &&
        (Te = u.jsx(Y, {
          component: "span",
          ...Z,
          className: bn(V.label, Z == null ? void 0 : Z.className),
          children: Te,
        })),
      u.jsxs(sp, {
        className: bn(V.root, i),
        ownerState: N,
        ref: r,
        ...y,
        children: [
          q.cloneElement(o, k),
          Q
            ? u.jsxs("div", {
                children: [
                  Te,
                  u.jsxs(op, {
                    ownerState: N,
                    "aria-hidden": !0,
                    className: V.asterisk,
                    children: [" ", "*"],
                  }),
                ],
              })
            : Te,
        ],
      })
    );
  }),
  lp = {
    clientId:
      "586344993025-et5p4fatgfkj4id48je6nvdh0aptsol6.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive",
    parentFolderId: "1h1SBk3TUIbFMIZX8UuG88K7IDbWDSd73",
  },
  { clientId: cp, scope: fp, parentFolderId: up } = lp;
let Un = null;
const po = async () =>
    new Promise((e) => {
      if (Un) {
        e(!0);
        return;
      }
      const t = document.createElement("script");
      ((t.src = "https://accounts.google.com/gsi/client"),
        (t.onload = () => {
          (console.log("Google Identity Services loaded"), e(!1));
        }),
        (t.onerror = () => {
          (console.error("Failed to load Google Identity Services"), e(!1));
        }),
        document.head.appendChild(t));
    }),
  mo = async () => true,
  $a = async (e, t) => {
    try {
      if (!Un) throw new Error("Not authenticated. Please sign in first.");
      console.log(`📁 Creating folder "${e}" in parent "${t}"`);
      const r = {
          name: e,
          mimeType: "application/vnd.google-apps.folder",
          parents: [t],
        },
        n = await fetch(
          "https://www.googleapis.com/drive/v3/files?fields=id,webViewLink",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${Un}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(r),
          },
        );
      if (!n.ok) {
        const i = await n.text();
        let s = `Google Drive API Error (${n.status}): ${n.statusText}`;
        try {
          const o = JSON.parse(i);
          o.error &&
            ((s = `${s}
Details: ${o.error.message || i}`),
            n.status === 403
              ? (s += `

💡 Possible fixes:
- Check if Google Drive API is enabled in Google Cloud Console
- Verify the OAuth scope includes drive access
- Ensure the parent folder ID is correct and accessible`)
              : n.status === 401
                ? (s += `

💡 Token may have expired. Try signing in again.`)
                : n.status === 404 &&
                  (s += `

💡 Parent folder not found. Check the parentFolderId in google-drive-config.ts`));
        } catch {
          s += `
Raw error: ${i}`;
        }
        throw (
          console.error(`❌ Failed to create folder "${e}":`, s),
          new Error(s)
        );
      }
      const a = await n.json();
      return (
        console.log(`✅ Folder "${e}" created successfully. ID: ${a.id}`),
        a.id
      );
    } catch (r) {
      throw (console.error(`❌ Error creating folder "${e}":`, r), r);
    }
  },
  ps = (e) => `https://drive.google.com/drive/folders/${e}`,
  hp = async (e, t, r, n) => ({ picsUrl: "", docsUrl: "" }),
  dp = 2e3,
  xp = new Date().getFullYear(),
  ms = xp + 1,
  pp = Array.from({ length: ms - dp + 1 }, (e, t) => ms - t);
function mp({ open: e, onClose: t, onUpdate: r, vehicle: n }) {
  const { t: a } = Wn(),
    [i, s] = q.useState(!1),
    [o, c] = q.useState(or().format("YYYY-MM-DD")),
    [l, f] = q.useState(""),
    [m, p] = q.useState(""),
    [d, _] = q.useState(""),
    [h, x] = q.useState(""),
    [C, F] = q.useState("Not Collected"),
    [y, P] = q.useState(""),
    [G, Q] = q.useState(""),
    [k, j] = q.useState(""),
    [N, V] = q.useState(""),
    [H, Y] = q.useState(""),
    [Z, Te] = q.useState([]),
    [he, le] = q.useState(""),
    [_e, ye] = q.useState(""),
    [Be, Ie] = q.useState(or().format("YYYY-MM-DD")),
    [Pe, A] = q.useState(0),
    [O, D] = q.useState(0),
    [b, z] = q.useState("Not Requested"),
    [fe, xe] = q.useState([]),
    [ie, re] = q.useState([]),
    [Ce, Ee] = q.useState([]),
    [qe, Fe] = q.useState([]),
    [ir, He] = q.useState([]),
    se = q.useCallback(
      async (L) => {
        try {
          const oe = ar(
              Ve(pe, "vendorsPayment"),
              er("Serial_Number", "==", L),
              _s("date", "asc"),
            ),
            Nr = (await Ye(oe)).docs.map((Je) => ({ id: Je.id, ...Je.data() }));
          Te(Nr);
          const Me = (n == null ? void 0 : n.vehiclePurchaseCost) || 0,
            Re = Nr.reduce((Je, de) => Je + (de.paidAmount || 0), 0);
          A(Me - Re);
        } catch (oe) {
          console.error("Error fetching vendor payments:", oe);
        }
      },
      [n == null ? void 0 : n.vehiclePurchaseCost],
    );
  q.useEffect(() => {
    if (e)
      if (
        (Cr(),
        po().catch((L) => {
          console.error("Failed to initialize Google Drive API:", L);
        }),
        n)
      ) {
        (f(n.manufacturer),
          Ye(Ve(pe, "manufacturers", n.manufacturer, "models")).then((oe) =>
            re(oe.docs.map((we) => ({ id: we.id, label: we.data().model }))),
          ),
          p(n.model),
          _(n.modelYear));
        let L = or();
        (n.purchasingDate &&
          (n.purchasingDate.seconds
            ? (L = or(n.purchasingDate.seconds * 1e3))
            : (L = or(n.purchasingDate))),
          c(L.format("YYYY-MM-DD")),
          V(n.vinChassisNumber),
          j(String(n.crn)),
          F(n.parkingLocation),
          P(String(n.vehiclePurchaseCost)),
          z(n.mubayaStatus || "Not Requested"),
          vr(n),
          se(n.serialNumber));
      } else
        (f(""),
          p(""),
          _(""),
          x(""),
          F("Not Collected"),
          P(""),
          Q(""),
          j(""),
          V(""),
          Y(""),
          c(or().format("YYYY-MM-DD")),
          D(0),
          z("Not Requested"),
          Te([]),
          le(""),
          ye(""));
  }, [e, n, se]);
  const vr = async (L) => {
      try {
        const oe = ar(
            Ve(pe, "vendorsPayment"),
            er("Serial_Number", "==", L.serialNumber),
          ),
          we = await Ye(oe);
        if (!we.empty) {
          const de = we.docs[0].data();
          Q(String(de.paidAmount));
          const sr = ar(Ve(pe, "bankPortal"), er("status", "==", !0)),
            Ar = (await Ye(sr)).docs
              .map((Ge) => ({ id: Ge.id, label: Ge.data().bankPortalName }))
              .find((Ge) => Ge.label === de.paidPortal);
          Ar && Y(Ar.id);
        }
        const Nr = ar(Ve(pe, "vendorsList"), er("status", "==", !0)),
          Je = (await Ye(Nr)).docs
            .map((de) => ({ id: de.id, label: de.data().name }))
            .find((de) => de.label === L.vendor || de.id === L.vendor);
        Je && x(Je.id);
      } catch (oe) {
        console.error("Error loading edit details", oe);
      }
    },
    Cr = async () => {
      try {
        const L = await Ye(Ve(pe, "manufacturers"));
        xe(L.docs.map((de) => ({ id: de.id, label: de.id })));
        const oe = ar(Ve(pe, "vendorsList"), er("status", "==", !0)),
          we = await Ye(oe);
        Ee(we.docs.map((de) => ({ id: de.id, label: de.data().name })));
        const Nr = ar(Ve(pe, "parkingList"), er("status", "==", !0)),
          Me = await Ye(Nr);
        Fe(
          Me.docs.map((de) => ({
            id: de.id,
            label: de.data().parkingLocation,
          })),
        );
        const Re = ar(Ve(pe, "bankPortal"), er("status", "==", !0)),
          Je = await Ye(Re);
        He(
          Je.docs.map((de) => ({
            id: de.id,
            label: de.data().bankPortalName,
            balance: de.data().balance,
          })),
        );
      } catch (L) {
        console.error("Error fetching form data:", L);
      }
    },
    zr = async (L) => {
      if ((f(L), p(""), L))
        try {
          const oe = await Ye(Ve(pe, "manufacturers", L, "models"));
          re(oe.docs.map((we) => ({ id: we.id, label: we.data().model })));
        } catch (oe) {
          (console.error("Error fetching models:", oe), re([]));
        }
      else re([]);
    },
    Jr = (L) => {
      const oe = L.target.value;
      (P(oe), Q(oe));
    },
    [_t, ct] = q.useState(!1),
    [xr, ft] = q.useState("manufacturer"),
    [at, X] = q.useState(""),
    [ge, ke] = q.useState(!1),
    Ue = (L) => {
      if (L === "model" && !l) {
        alert(a("vehicles.purchase.messages.selectManufacturerFirst"));
        return;
      }
      (ft(L), X(""), ct(!0));
    },
    be = () => {
      (ct(!1), X(""));
    },
    ve = async () => {
      if (at.trim()) {
        ke(!0);
        try {
          const L = at.trim(),
            oe = L.toLowerCase();
          if (xr === "manufacturer") {
            if (fe.some((we) => we.id.toLowerCase() === oe)) {
              (alert("This Manufacturer already exists."), ke(!1));
              return;
            }
            (await mn(Qe(pe, "manufacturers", L), { manufacturers: L }),
              xe((we) => [...we, { id: L, label: L }]),
              f(L),
              re([]));
          } else if (xr === "model") {
            if (ie.some((we) => we.label.toLowerCase() === oe)) {
              (alert(
                "This Model already exists for the selected Manufacturer.",
              ),
                ke(!1));
              return;
            }
            (await mn(Qe(pe, "manufacturers", l, "models", L), {
              model: L,
              manufacturers: l,
            }),
              re((we) => [...we, { id: L, label: L }]),
              p(L));
          } else if (xr === "vendor") {
            if (Ce.some((we) => we.label.toLowerCase() === oe)) {
              (alert("This Vendor already exists."), ke(!1));
              return;
            }
            (await mn(Qe(pe, "vendorsList", L), { name: L, status: !0 }),
              Ee((we) => [...we, { id: L, label: L }]),
              x(L));
          } else if (xr === "parking") {
            if (qe.some((we) => we.label.toLowerCase() === oe)) {
              (alert("This Parking Location already exists."), ke(!1));
              return;
            }
            (await mn(Qe(pe, "parkingList", L), {
              parkingLocation: L,
              status: !0,
            }),
              Fe((we) => [...we, { id: L, label: L }]),
              F(L));
          }
          be();
        } catch (L) {
          (console.error("Error adding new item:", L),
            alert("Failed to add new item."));
        } finally {
          ke(!1);
        }
      }
    },
    nr = async () => {
      var we, Nr;
      if (O === 2) {
        if (!he || !_e || !Be) {
          alert(a("vehicles.purchase.messages.fillPaymentRequired"));
          return;
        }
        if (!n) return;
        s(!0);
        try {
          (await rn(pe, async (Me) => {
            var _r, Hr;
            const Re = Qe(pe, "setting", "counter"),
              Je = await Me.get(Re);
            if (!Je.exists()) throw new Error("Counters missing");
            const de = Je.data(),
              sr = (Qr) => {
                var T, S;
                if (!Qr) return "000001";
                const g =
                    ((T = Qr.match(/^[A-Z]+/)) == null ? void 0 : T[0]) || "",
                  E = ((S = Qr.match(/\d+$/)) == null ? void 0 : S[0]) || "0",
                  v = String(Number(E) + 1).padStart(4, "0");
                return g + v;
              },
              wr = sr(de.lastVendorsPayment),
              Pr = sr(de.lastBankTransaction),
              Ar = aa.fromDate(new Date(Be)),
              Ge = Number(he),
              cr =
                ((_r = ir.find((Qr) => Qr.id === _e)) == null
                  ? void 0
                  : _r.label) || "Unknown",
              Ae = Qe(pe, "vendorsPayment", wr);
            Me.set(Ae, {
              Serial_Number: n.serialNumber,
              balance: Pe - Ge,
              date: Ar,
              paidAmount: Ge,
              paidPortal: cr,
              status: !0,
              vehiclePurchaseId: n.vehiclePurchaseCost,
              vendorName: n.vendor,
              transactionId: wr,
            });
            const tr = Qe(pe, "bankPortal", _e),
              pr =
                ((Hr = (await Me.get(tr)).data()) == null
                  ? void 0
                  : Hr.balance) || 0;
            Me.update(tr, { balance: pr - Ge });
            const Fr = Qe(pe, "bankTransaction", Pr);
            (Me.set(Fr, {
              transactionId: Pr,
              amount: Ge,
              bankPortalName: cr,
              date: Ar,
              description: `Vendor Payment: ${n.serialNumber} - ${n.vendor}`,
              status: !0,
              type: "Debit",
            }),
              Me.update(Re, {
                lastVendorsPayment: wr,
                lastBankTransaction: Pr,
              }));
          }),
            alert(a("vehicles.purchase.messages.paymentRecorded")),
            kn({
              title: "Vendor Payment Recorded",
              description: `Paid ${Zt(Number(he))} to ${n.vendor} for SN: ${n.serialNumber}`,
              type: "vehicle-expense",
            }),
            se(n.serialNumber),
            le(""),
            ye(""));
        } catch (Me) {
          alert(`Error: ${Me.message}`);
        } finally {
          s(!1);
        }
        return;
      }
      if (!l || !m || !d || !h || !y || !G || !k || !H) {
        alert(a("vehicles.purchase.messages.fillRequired"));
        return;
      }
      const L = Number(y),
        oe = Number(G);
      if (oe > L) {
        alert(`⚠️ Paid amount (${oe.toLocaleString()} AED) cannot exceed the purchasing price (${L.toLocaleString()} AED).

Please adjust the paid amount.`);
        return;
      }
      s(!0);
      try {
        if (n) {
          const Me = ar(
              Ve(pe, "vendorsPayment"),
              er("Serial_Number", "==", n.serialNumber),
            ),
            Re = ar(
              Ve(pe, "vehiclePurchasing"),
              er("serialNumber", "==", n.serialNumber),
            ),
            [Je, de] = await Promise.all([Ye(Me), Ye(Re)]),
            sr = Je.empty ? null : Je.docs[0].data(),
            wr = (sr && Number(sr.paidAmount)) || 0,
            Pr = sr ? sr.paidPortal : null,
            Ar =
              ((we = ir.find((Ae) => Ae.id === H)) == null
                ? void 0
                : we.label) || "Unknown";
          let Ge = null,
            cr = null;
          if (Pr) {
            const Ae = ar(Ve(pe, "bankPortal"), er("bankPortalName", "==", Pr)),
              tr = await Ye(Ae);
            tr.empty || (Ge = tr.docs[0]);
          }
          if (Ar && Ar !== Pr) {
            const Ae = ar(Ve(pe, "bankPortal"), er("bankPortalName", "==", Ar)),
              tr = await Ye(Ae);
            tr.empty || (cr = tr.docs[0]);
          } else Ar === Pr && (cr = Ge);
          await rn(pe, async (Ae) => {
            var Fr;
            const tr = Qe(pe, "vehicles", n.id),
              ur = aa.fromDate(new Date(o)),
              pr =
                ((Fr = Ce.find((_r) => _r.id === h)) == null
                  ? void 0
                  : Fr.label) || h;
            if (Ge && cr && Ge.id === cr.id) {
              const _r = oe - wr;
              if (_r !== 0) {
                const Qr = (await Ae.get(Ge.ref)).data();
                Ae.update(Ge.ref, {
                  balance: ((Qr == null ? void 0 : Qr.balance) || 0) - _r,
                });
              }
            } else {
              if (Ge) {
                const Hr = (await Ae.get(Ge.ref)).data();
                Ae.update(Ge.ref, {
                  balance: ((Hr == null ? void 0 : Hr.balance) || 0) + wr,
                });
              }
              if (cr) {
                const Hr = (await Ae.get(cr.ref)).data();
                Ae.update(cr.ref, {
                  balance: ((Hr == null ? void 0 : Hr.balance) || 0) - oe,
                });
              }
            }
            (Ae.update(tr, {
              manufacturer: l,
              model: m,
              modelYear: Number(d),
              vendor: pr,
              parkingLocation: C,
              purchasingDate: ur,
              vehiclePurchaseCost: L,
              totalAccruedCost: L,
              crn: Number(k) || k,
              vinChassisNumber: N,
              mubayaStatus: b || "Not Requested",
            }),
              de.forEach((_r) => {
                Ae.update(_r.ref, {
                  purchaseDate: ur,
                  purchasePrice: L,
                  vendor: pr,
                });
              }),
              Je.forEach((_r) => {
                Ae.update(_r.ref, {
                  balance: L - oe,
                  date: ur,
                  paidAmount: oe,
                  paidPortal: Ar,
                  vendorName: pr,
                  vehiclePurchaseId: L,
                });
              }));
          });
        } else {
          let Me = !1;
          try {
            await mo();
          } catch (de) {
            console.error("Drive Auth Error:", de);
            const sr = (de == null ? void 0 : de.message) || "Unknown error";
            if (
              !window.confirm(`Google Drive Sign-in failed: ${sr}

Do you want to continue creating the vehicle WITHOUT Google Drive folders?`)
            )
              return;
            Me = !0;
          }
          const Re = await rn(pe, async (de) => {
            var E, v, T, S, w, I;
            const sr = Qe(pe, "setting", "counter"),
              wr = Qe(pe, "bankPortal", H),
              Pr = await de.get(sr),
              Ar = await de.get(wr);
            if (!Pr.exists())
              throw new Error("Counters document does not exist!");
            const Ge = Pr.data(),
              cr = (U) => {
                var J, ae;
                if (!U) return "000001";
                const R =
                    ((J = U.match(/^[A-Z]+/)) == null ? void 0 : J[0]) || "",
                  M = ((ae = U.match(/\d+$/)) == null ? void 0 : ae[0]) || "0",
                  B = String(Number(M) + 1).padStart(M.length, "0");
                return R + B;
              },
              Ae = cr(Ge.lastSerialNumber),
              tr = cr(Ge.lastVehiclePurchasing),
              ur = cr(Ge.lastVendorsPayment),
              pr = cr(Ge.lastBankTransaction),
              Fr = aa.fromDate(new Date(o)),
              _r = Qe(pe, "vehicles", Ae);
            de.set(_r, {
              serialNumber: Ae,
              manufacturer: l || "",
              model: m || "",
              modelYear: Number(d),
              vendor:
                ((E = Ce.find((U) => U.id === h)) == null ? void 0 : E.label) ||
                h ||
                "",
              parkingLocation: C || "",
              purchasingDate: Fr,
              vehiclePurchaseCost: L,
              totalAccruedCost: L,
              crn: Number(k) || k || "",
              vinChassisNumber: N,
              soldStatus: "Available",
              mubayaStatus: b,
            });
            const Hr = Qe(pe, "vehiclePurchasing", tr);
            de.set(Hr, {
              transactionId: tr,
              purchaseDate: Fr,
              purchasePrice: L,
              serialNumber: Ae,
              vendor:
                ((v = Ce.find((U) => U.id === h)) == null ? void 0 : v.label) ||
                h ||
                "",
              status: !0,
            });
            const Qr = Qe(pe, "vendorsPayment", ur);
            de.set(Qr, {
              Serial_Number: Ae,
              balance: L - oe,
              date: Fr,
              paidAmount: oe,
              paidPortal:
                ((T = ir.find((U) => U.id === H)) == null ? void 0 : T.label) ||
                "Unknown",
              status: !0,
              vehiclePurchaseId: L,
              vendorName:
                ((S = Ce.find((U) => U.id === h)) == null ? void 0 : S.label) ||
                h ||
                "",
              transactionId: ur,
            });
            const g = Qe(pe, "bankTransaction", pr);
            if (
              (de.set(g, {
                transactionId: pr,
                amount: oe,
                bankPortalName:
                  ((w = ir.find((U) => U.id === H)) == null
                    ? void 0
                    : w.label) || "Unknown",
                date: Fr,
                description: `Purchase: ${Ae} - ${l} ${m} - ${((I = Ce.find((U) => U.id === h)) == null ? void 0 : I.label) || h}`,
                status: !0,
                type: "Debit",
              }),
              Ar.exists())
            ) {
              const U = Ar.data().balance || 0;
              de.update(wr, { balance: U - oe });
            }
            return (
              de.update(sr, {
                lastSerialNumber: Ae,
                lastVehiclePurchasing: tr,
                lastVendorsPayment: ur,
                lastBankTransaction: pr,
              }),
              {
                newSerialNumber: Ae,
                newPurchaseId: tr,
                newBankTxId: pr,
                newVendorPaymentId: ur,
                numericPrice: L,
                numericPaid: oe,
              }
            );
          });
          if (!Me)
            try {
              const de = await hp(Re.newSerialNumber, l, m, Number(d)),
                sr = Qe(pe, "vehicles", Re.newSerialNumber);
              (await mn(
                sr,
                { picsUrl: de.picsUrl, docsUrl: de.docsUrl },
                { merge: !0 },
              ),
                console.log("Google Drive folders created successfully:", de));
            } catch (de) {
              (console.error("Error creating Google Drive folders:", de),
                alert(
                  `[v3-Fix] Vehicle purchased, but Drive folder creation failed: ${(de == null ? void 0 : de.message) || de}`,
                ));
            }
          const Je =
            ((Nr = Ce.find((de) => de.id === h)) == null ? void 0 : Nr.label) ||
            h ||
            "Unknown";
          try {
            await Aa({
              header: {
                title: "🚗 New Vehicle Purchased",
                subtitle: "Marakish Group",
              },
              sections: [
                {
                  widgets: [
                    {
                      keyValue: {
                        topLabel: "Serial Number",
                        content: String(Re.newSerialNumber),
                        icon: "TICKET",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Details",
                        content: `${l} ${m} ${d}`,
                        icon: "CAR",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Price",
                        content: Zt(Re.numericPrice),
                        icon: "DOLLAR",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Paid Amount",
                        content: Zt(Re.numericPaid),
                        icon: "MONEY",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Vendor",
                        content: Je,
                        icon: "STORE",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Purchase Date",
                        content: or(o).format("DD/MM/YYYY"),
                        icon: "CLOCK",
                      },
                    },
                  ],
                },
                {
                  header: "Transaction IDs",
                  widgets: [
                    {
                      keyValue: {
                        topLabel: "Purchase ID",
                        content: Re.newPurchaseId,
                        icon: "CONFIRMATION_NUMBER_ICON",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Bank ID",
                        content: Re.newBankTxId,
                        icon: "ACCOUNT_BALANCE_WALLET",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Vendor ID",
                        content: Re.newVendorPaymentId,
                        icon: "DESCRIPTION",
                      },
                    },
                  ],
                },
              ],
            });
          } catch (de) {
            console.error("Google Chat Notification Failed:", de);
          }
          try {
            await kn({
              title: "New Vehicle Purchased",
              description: `${l} ${m} (${Re.newSerialNumber}) purchased for ${Zt(Re.numericPrice)}`,
              type: "vehicle-purchase",
            });
          } catch (de) {
            console.error("In-App Notification Failed:", de);
          }
        }
        (alert(a("vehicles.purchase.messages.purchaseSuccess")),
          console.log("Transaction committed successfully!"),
          r && r(),
          t());
      } catch (Me) {
        (console.error("Transaction failed: ", Me),
          alert(`Failed to save vehicle purchase: ${Me.message}`));
      } finally {
        s(!1);
      }
    };
  return u.jsxs(Dn, {
    open: e,
    onClose: t,
    maxWidth: "md",
    fullWidth: !0,
    children: [
      u.jsxs(Nn, {
        sx: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        children: [
          a(n ? "vehicles.purchase.titleEdit" : "vehicles.purchase.titleNew"),
          u.jsx(St, {
            onClick: t,
            children: u.jsx(Oe, { icon: "mingcute:close-line" }),
          }),
        ],
      }),
      u.jsxs(Pn, {
        dividers: !0,
        children: [
          u.jsxs(Vo, {
            value: O,
            onChange: (L, oe) => D(oe),
            sx: { mb: 3 },
            children: [
              u.jsx(Ra, { label: a("vehicles.purchase.tabs.details") }),
              u.jsx(Ra, { label: a("vehicles.purchase.tabs.mubaya") }),
              n &&
                u.jsx(Ra, {
                  label: a("vehicles.purchase.tabs.vendorPayments"),
                }),
            ],
          }),
          O === 0 &&
            u.jsxs(u.Fragment, {
              children: [
                u.jsx(Se, {
                  variant: "h6",
                  sx: { mb: 2 },
                  children: a("vehicles.purchase.sections.vehicleDetails"),
                }),
                u.jsxs(me, {
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                  gap: 2,
                  sx: { mb: 3 },
                  children: [
                    u.jsxs(me, {
                      children: [
                        u.jsx(Ir, {
                          options: fe,
                          getOptionLabel: (L) => L.label || "",
                          value: fe.find((L) => L.id === l) || null,
                          onChange: (L, oe) => {
                            zr(oe ? oe.id : "");
                          },
                          renderInput: (L) =>
                            u.jsx(Ze, {
                              ...L,
                              label: `${a("vehicles.purchase.labels.manufacturer")} *`,
                            }),
                        }),
                        u.jsx(fr, {
                          variant: "text",
                          size: "small",
                          startIcon: u.jsx(Oe, { icon: "mingcute:add-line" }),
                          onClick: () => Ue("manufacturer"),
                          sx: {
                            mt: 0.5,
                            typography: "caption",
                            color: "text.secondary",
                          },
                          children: a(
                            "vehicles.purchase.buttons.addNewManufacturer",
                          ),
                        }),
                      ],
                    }),
                    u.jsxs(me, {
                      children: [
                        u.jsx(Ir, {
                          options: ie,
                          getOptionLabel: (L) => L.label || "",
                          value: ie.find((L) => L.label === m) || null,
                          disabled: !l,
                          onChange: (L, oe) => {
                            p(oe ? oe.label : "");
                          },
                          renderInput: (L) =>
                            u.jsx(Ze, {
                              ...L,
                              label: `${a("vehicles.purchase.labels.model")} *`,
                            }),
                        }),
                        u.jsx(fr, {
                          variant: "text",
                          size: "small",
                          startIcon: u.jsx(Oe, { icon: "mingcute:add-line" }),
                          onClick: () => Ue("model"),
                          disabled: !l,
                          sx: {
                            mt: 0.5,
                            typography: "caption",
                            color: "text.secondary",
                          },
                          children: a("vehicles.purchase.buttons.addNewModel"),
                        }),
                      ],
                    }),
                    u.jsx(me, {
                      children: u.jsx(Ir, {
                        options: pp,
                        value: d || null,
                        onChange: (L, oe) => {
                          _(oe || "");
                        },
                        renderInput: (L) =>
                          u.jsx(Ze, {
                            ...L,
                            label: `${a("vehicles.purchase.labels.modelYear")} *`,
                          }),
                      }),
                    }),
                  ],
                }),
                u.jsx(Se, {
                  variant: "h6",
                  sx: { mb: 2 },
                  children: a(
                    "vehicles.purchase.sections.purchaseRegistration",
                  ),
                }),
                u.jsxs(me, {
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                  gap: 2,
                  children: [
                    u.jsx(me, {
                      children: u.jsx(Ze, {
                        fullWidth: !0,
                        label: `${a("vehicles.purchase.labels.purchasingDate")} *`,
                        type: "date",
                        value: o,
                        onChange: (L) => c(L.target.value),
                        InputLabelProps: { shrink: !0 },
                      }),
                    }),
                    u.jsxs(me, {
                      children: [
                        u.jsx(Ir, {
                          options: Ce,
                          getOptionLabel: (L) => L.label || "",
                          value: Ce.find((L) => L.id === h) || null,
                          onChange: (L, oe) => {
                            x(oe ? oe.id : "");
                          },
                          renderInput: (L) =>
                            u.jsx(Ze, {
                              ...L,
                              label: `${a("vehicles.purchase.labels.vendor")} *`,
                            }),
                        }),
                        u.jsx(fr, {
                          variant: "text",
                          size: "small",
                          startIcon: u.jsx(Oe, { icon: "mingcute:add-line" }),
                          onClick: () => Ue("vendor"),
                          sx: {
                            mt: 0.5,
                            typography: "caption",
                            color: "text.secondary",
                          },
                          children: a("vehicles.purchase.buttons.addNewVendor"),
                        }),
                      ],
                    }),
                    u.jsxs(me, {
                      children: [
                        u.jsx(Ir, {
                          options: qe,
                          getOptionLabel: (L) => L.label || "",
                          value: qe.find((L) => L.label === C) || null,
                          onChange: (L, oe) => {
                            F(oe ? oe.label : "");
                          },
                          renderInput: (L) =>
                            u.jsx(Ze, {
                              ...L,
                              label: a(
                                "vehicles.purchase.labels.parkingLocation",
                              ),
                            }),
                        }),
                        u.jsx(fr, {
                          variant: "text",
                          size: "small",
                          startIcon: u.jsx(Oe, { icon: "mingcute:add-line" }),
                          onClick: () => Ue("parking"),
                          sx: {
                            mt: 0.5,
                            typography: "caption",
                            color: "text.secondary",
                          },
                          children: a(
                            "vehicles.purchase.buttons.addNewParking",
                          ),
                        }),
                      ],
                    }),
                    u.jsx(me, {
                      children: u.jsx(Ze, {
                        fullWidth: !0,
                        label: `${a("vehicles.purchase.labels.purchasingPrice")} *`,
                        type: "number",
                        value: y,
                        onChange: Jr,
                        placeholder: "0.00",
                      }),
                    }),
                    u.jsx(me, {
                      children: u.jsx(Ze, {
                        fullWidth: !0,
                        label: `${a("vehicles.purchase.labels.paidAmount")} *`,
                        type: "number",
                        value: G,
                        onChange: (L) => Q(L.target.value),
                        placeholder: "0.00",
                      }),
                    }),
                    u.jsx(me, {
                      children: u.jsx(Ze, {
                        fullWidth: !0,
                        label: `${a("vehicles.purchase.labels.crn")} *`,
                        value: k,
                        onChange: (L) => j(L.target.value),
                      }),
                    }),
                    u.jsx(me, {
                      children: u.jsx(Ze, {
                        fullWidth: !0,
                        label: a("vehicles.purchase.labels.vin"),
                        value: N,
                        onChange: (L) => V(L.target.value.toUpperCase()),
                        inputProps: { style: { textTransform: "uppercase" } },
                      }),
                    }),
                    u.jsxs(me, {
                      children: [
                        u.jsx(Ir, {
                          options: ir,
                          getOptionLabel: (L) => L.label || "",
                          value: ir.find((L) => L.id === H) || null,
                          onChange: (L, oe) => {
                            Y(oe ? oe.id : "");
                          },
                          renderInput: (L) =>
                            u.jsx(Ze, { ...L, label: "Payment Source *" }),
                        }),
                        H &&
                          (() => {
                            var oe;
                            const L = ir.find((we) => we.id === H);
                            return L
                              ? u.jsx(me, {
                                  sx: {
                                    mt: 1,
                                    p: 2,
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    bgcolor: (we) =>
                                      we.palette.background.neutral,
                                    animation:
                                      "fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                                    "@keyframes fadeIn": {
                                      "0%": {
                                        opacity: 0,
                                        transform: "translateY(-8px)",
                                      },
                                      "100%": {
                                        opacity: 1,
                                        transform: "translateY(0)",
                                      },
                                    },
                                  },
                                  children: u.jsxs(me, {
                                    sx: {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    },
                                    children: [
                                      u.jsx(Se, {
                                        variant: "body2",
                                        sx: {
                                          color: "text.secondary",
                                          fontWeight: "medium",
                                        },
                                        children: a(
                                          "vehicles.purchase.labels.availableBalance",
                                        ),
                                      }),
                                      u.jsx(Se, {
                                        variant: "subtitle1",
                                        sx: {
                                          color:
                                            L.balance >= 0
                                              ? "success.main"
                                              : "error.main",
                                          fontWeight: "bold",
                                        },
                                        children:
                                          (oe = L.balance) == null
                                            ? void 0
                                            : oe.toLocaleString(),
                                      }),
                                    ],
                                  }),
                                })
                              : null;
                          })(),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          O === 1 &&
            u.jsx(me, {
              sx: { mt: 2 },
              children: u.jsxs(Uo, {
                component: "fieldset",
                children: [
                  u.jsx(Wo, {
                    component: "legend",
                    children: a("vehicles.table.mubaya"),
                  }),
                  u.jsxs(np, {
                    "aria-label": "mubaya-status",
                    name: "mubaya-status",
                    value: b,
                    onChange: (L) => z(L.target.value),
                    children: [
                      u.jsx(na, {
                        value: "Not Requested",
                        control: u.jsx(ta, {}),
                        label: `${a("vehicles.table.notRequested")} (Default)`,
                      }),
                      u.jsx(na, {
                        value: "Requested",
                        control: u.jsx(ta, {}),
                        label: a("vehicles.table.requested"),
                      }),
                      u.jsx(na, {
                        value: "Arrived",
                        control: u.jsx(ta, {}),
                        label: a("vehicles.table.arrived"),
                      }),
                      u.jsx(na, {
                        value: "Handed Over",
                        control: u.jsx(ta, {}),
                        label: a("vehicles.table.handedOver"),
                      }),
                    ],
                  }),
                ],
              }),
            }),
          O === 2 &&
            u.jsxs(me, {
              sx: { mt: 1 },
              children: [
                u.jsxs(me, {
                  sx: {
                    p: 2,
                    mb: 3,
                    borderRadius: 1,
                    bgcolor: Pe > 0 ? "warning.lighter" : "success.lighter",
                    border: 1,
                    borderColor: Pe > 0 ? "warning.main" : "success.main",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  },
                  children: [
                    u.jsxs(Se, {
                      variant: "subtitle1",
                      sx: {
                        color: Pe > 0 ? "warning.darker" : "success.darker",
                        fontWeight: "bold",
                      },
                      children: [
                        a("vehicles.purchase.labels.remainingBalance"),
                        " ",
                        Pe.toLocaleString(),
                        " AED",
                      ],
                    }),
                    u.jsx(Oe, {
                      icon: Pe > 0 ? "solar:restart-bold" : "solar:share-bold",
                      sx: {
                        color: Pe > 0 ? "warning.main" : "success.main",
                        width: 24,
                        height: 24,
                      },
                    }),
                  ],
                }),
                u.jsx(Se, {
                  variant: "h6",
                  sx: { mb: 2 },
                  children: a("vehicles.purchase.sections.paymentHistory"),
                }),
                u.jsx(me, {
                  sx: {
                    mb: 4,
                    overflowX: "auto",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                  },
                  children: u.jsx(Za, {
                    size: "small",
                    children: u.jsxs(ei, {
                      children: [
                        Z.map((L) => {
                          var oe, we;
                          return u.jsxs(
                            "tr",
                            {
                              children: [
                                u.jsx("td", {
                                  style: { padding: "8px 16px" },
                                  children: or(
                                    (oe = L.date) == null
                                      ? void 0
                                      : oe.toDate(),
                                  ).format("DD/MM/YYYY"),
                                }),
                                u.jsx("td", {
                                  style: { padding: "8px 16px" },
                                  children: L.paidPortal,
                                }),
                                u.jsxs("td", {
                                  style: {
                                    padding: "8px 16px",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  },
                                  children: [
                                    (we = L.paidAmount) == null
                                      ? void 0
                                      : we.toLocaleString(),
                                    " AED",
                                  ],
                                }),
                              ],
                            },
                            L.id,
                          );
                        }),
                        Z.length === 0 &&
                          u.jsx("tr", {
                            children: u.jsx("td", {
                              colSpan: 3,
                              style: { textAlign: "center", padding: "16px" },
                              children: a(
                                "vehicles.purchase.messages.noPayments",
                              ),
                            }),
                          }),
                      ],
                    }),
                  }),
                }),
                Pe > 0 &&
                  u.jsxs(u.Fragment, {
                    children: [
                      u.jsx(Se, {
                        variant: "h6",
                        sx: { mb: 2 },
                        children: a("vehicles.purchase.sections.addNewPayment"),
                      }),
                      u.jsxs(me, {
                        display: "grid",
                        gridTemplateColumns: {
                          xs: "1fr",
                          md: "repeat(3, 1fr)",
                        },
                        gap: 2,
                        children: [
                          u.jsx(Ze, {
                            fullWidth: !0,
                            label: `${a("vehicles.purchase.labels.paymentDate")} *`,
                            type: "date",
                            value: Be,
                            onChange: (L) => Ie(L.target.value),
                            InputLabelProps: { shrink: !0 },
                          }),
                          u.jsx(Ze, {
                            fullWidth: !0,
                            label: `${a("vehicles.purchase.labels.amount")} *`,
                            type: "number",
                            value: he,
                            onChange: (L) => le(L.target.value),
                          }),
                          u.jsx(me, {
                            children: u.jsx(Ir, {
                              options: ir,
                              getOptionLabel: (L) => L.label,
                              value: ir.find((L) => L.id === _e) || null,
                              disabled: !he || Number(he) <= 0,
                              onChange: (L, oe) => ye(oe ? oe.id : ""),
                              renderInput: (L) =>
                                u.jsx(Ze, {
                                  ...L,
                                  label: `${a("vehicles.purchase.labels.paymentSource")} *`,
                                }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
        ],
      }),
      u.jsxs(ia, {
        sx: { px: 3, pb: 3, gap: 1.5 },
        children: [
          u.jsx(fr, {
            onClick: t,
            variant: "outlined",
            children: a("common.cancel"),
          }),
          u.jsx(fr, {
            onClick: nr,
            variant: "contained",
            disabled: i,
            color: "primary",
            children: a(
              i
                ? "vehicles.purchase.messages.processing"
                : O === 2
                  ? "vehicles.purchase.buttons.addPayment"
                  : n
                    ? "vehicles.purchase.buttons.updateVehicle"
                    : "vehicles.purchase.buttons.purchaseVehicle",
            ),
          }),
        ],
      }),
      u.jsxs(Dn, {
        open: _t,
        onClose: be,
        maxWidth: "xs",
        fullWidth: !0,
        children: [
          u.jsxs(Nn, {
            children: ["Add New ", xr.charAt(0).toUpperCase() + xr.slice(1)],
          }),
          u.jsx(Pn, {
            children: u.jsx(Ze, {
              autoFocus: !0,
              margin: "dense",
              label: a("common.name"),
              fullWidth: !0,
              value: at,
              onChange: (L) => X(L.target.value),
            }),
          }),
          u.jsxs(ia, {
            sx: { px: 3, pb: 3, gap: 1.5 },
            children: [
              u.jsx(fr, {
                onClick: be,
                color: "inherit",
                children: a("common.cancel"),
              }),
              u.jsx(fr, {
                onClick: ve,
                variant: "contained",
                disabled: ge,
                children: a(
                  ge ? "vehicles.purchase.messages.saving" : "common.save",
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function gp() {
  const [e, t] = q.useState(0),
    [r, n] = q.useState("serialNumber"),
    [a, i] = q.useState(100),
    [s, o] = q.useState([]),
    [c, l] = q.useState("desc"),
    f = q.useCallback(
      (x) => {
        (l(r === x && c === "asc" ? "desc" : "asc"), n(x));
      },
      [c, r],
    ),
    m = q.useCallback((x, C) => {
      if (x) {
        o(C);
        return;
      }
      o([]);
    }, []),
    p = q.useCallback(
      (x) => {
        const C = s.includes(x) ? s.filter((F) => F !== x) : [...s, x];
        o(C);
      },
      [s],
    ),
    d = q.useCallback(() => {
      t(0);
    }, []),
    _ = q.useCallback((x, C) => {
      t(C);
    }, []),
    h = q.useCallback(
      (x) => {
        (i(parseInt(x.target.value, 10)), d());
      },
      [d],
    );
  return q.useMemo(
    () => ({
      page: e,
      order: c,
      onSort: f,
      orderBy: r,
      selected: s,
      rowsPerPage: a,
      onSelectRow: p,
      onResetPage: d,
      onChangePage: _,
      onSelectAllRows: m,
      onChangeRowsPerPage: h,
    }),
    [e, c, f, r, s, a, p, d, _, m, h],
  );
}
function vp() {
  const e = gp(),
    { t } = Wn(),
    { searchQuery: r, setSearchQuery: n } = wo(),
    [a, i] = q.useState([]),
    s = r,
    o = n,
    [c, l] = q.useState(!1),
    [f, m] = q.useState(!1),
    [p, d] = q.useState(!1),
    [_, h] = q.useState(!1),
    [x, C] = q.useState(!1),
    [F, y] = q.useState(null),
    [P, G] = q.useState(null),
    [Q, k] = q.useState(null),
    j = Ao(),
    N = yo(),
    [V] = Co(),
    H = V.get("mubayaStatus"),
    [Y, Z] = q.useState("All"),
    [Te, he] = q.useState("All"),
    [le, _e] = q.useState("All"),
    [ye, Be] = q.useState("All"),
    [Ie, Pe] = q.useState("All"),
    [A, O] = q.useState("All");
  (q.useEffect(() => {
    e.onResetPage();
  }, [r, e]),
    q.useEffect(() => {
      H && Pe(H);
    }, [H]),
    q.useEffect(() => {
      j.pathname === "/vehicles/purchase"
        ? l(!0)
        : j.pathname === "/vehicles/sell"
          ? m(!0)
          : j.pathname === "/vehicles/expense" && d(!0);
    }, [j.pathname]),
    q.useEffect(() => {
      const X = ar(Ve(pe, "vehicles")),
        ge = Fo(X, (ke) => {
          const Ue = ke.docs.map((be) => ({ id: be.id, ...be.data() }));
          i(Ue);
        });
      return () => ge();
    }, []));
  const D = async (X) => {
      var ge;
      if (X.soldStatus === "Sold") {
        alert("Cannot delete a Sold vehicle.");
        return;
      }
      if (
        window.confirm(
          `Are you sure you want to delete ${X.manufacturer} ${X.model}?`,
        )
      )
        try {
          const ke = ar(
              Ve(pe, "vendorsPayment"),
              er("Serial_Number", "==", X.serialNumber),
            ),
            Ue = ar(
              Ve(pe, "vehiclePurchasing"),
              er("serialNumber", "==", X.serialNumber),
            ),
            be = ar(
              Ve(pe, "bankTransaction"),
              er("description", ">=", `Purchase: ${X.serialNumber} `),
              er("description", "<=", `Purchase: ${X.serialNumber} `),
            ),
            [ve, nr, L] = await Promise.all([Ye(ke), Ye(Ue), Ye(be)]),
            oe = new Map();
          for (const we of ve.docs) {
            const Nr = we.data(),
              Me = Nr.paidPortal,
              Re = Number(Nr.paidAmount) || 0;
            if (Me && Re > 0 && !oe.has(Me)) {
              const Je = ar(
                  Ve(pe, "bankPortal"),
                  er("bankPortalName", "==", Me),
                ),
                de = await Ye(Je);
              if (!de.empty) {
                const sr =
                  ((ge = oe.get(Me)) == null ? void 0 : ge.amount) || 0;
                oe.set(Me, { ref: de.docs[0].ref, amount: sr + Re });
              }
            } else if (Me && Re > 0) {
              const Je = oe.get(Me);
              Je.amount += Re;
            }
          }
          (await rn(pe, async (we) => {
            const Nr = Qe(pe, "setting", "counter"),
              Me = await we.get(Nr),
              Re = Me.exists() ? Me.data() : {},
              Je = new Map();
            for (const [Ae, { ref: tr }] of oe.entries()) {
              const pr = (await we.get(tr)).data();
              Je.set(Ae, (pr == null ? void 0 : pr.balance) || 0);
            }
            const de = (Ae) => {
                var Fr, _r;
                const tr =
                    ((Fr = Ae.match(/^[A-Z]+/)) == null ? void 0 : Fr[0]) || "",
                  ur =
                    ((_r = Ae.match(/\d+$/)) == null ? void 0 : _r[0]) || "0";
                if (Number(ur) <= 0) return Ae;
                const pr = String(Number(ur) - 1).padStart(ur.length, "0");
                return tr + pr;
              },
              sr = (Ae, tr) => {
                if (!tr) return tr;
                let ur = tr;
                const pr = [...Ae].sort().reverse();
                for (const Fr of pr) Fr === ur && (ur = de(ur));
                return ur;
              },
              wr = sr([X.serialNumber], Re.lastSerialNumber),
              Pr = sr(
                nr.docs.map((Ae) => Ae.id),
                Re.lastVehiclePurchasing,
              ),
              Ar = sr(
                ve.docs.map((Ae) => Ae.id),
                Re.lastVendorsPayment,
              ),
              Ge = sr(
                L.docs.map((Ae) => Ae.id),
                Re.lastBankTransaction,
              );
            for (const [Ae, { ref: tr, amount: ur }] of oe.entries()) {
              const pr = Je.get(Ae) || 0;
              we.update(tr, { balance: pr + ur });
            }
            (we.delete(Qe(pe, "vehicles", X.id)),
              ve.forEach((Ae) => we.delete(Ae.ref)),
              nr.forEach((Ae) => we.delete(Ae.ref)),
              L.forEach((Ae) => we.delete(Ae.ref)));
            const cr = {};
            (wr !== Re.lastSerialNumber && (cr.lastSerialNumber = wr),
              Pr !== Re.lastVehiclePurchasing &&
                (cr.lastVehiclePurchasing = Pr),
              Ar !== Re.lastVendorsPayment && (cr.lastVendorsPayment = Ar),
              Ge !== Re.lastBankTransaction && (cr.lastBankTransaction = Ge),
              Object.keys(cr).length > 0 && we.update(Nr, cr));
          }),
            alert("Vehicle deleted successfully."));
        } catch (ke) {
          (console.error("Delete error:", ke),
            alert(
              `Failed to delete vehicle: ${ke.message || "Unknown error"}`,
            ));
        }
    },
    b = (X) => {
      if (X.soldStatus === "Sold") {
        alert("Cannot edit a Sold vehicle.");
        return;
      }
      (y(X), l(!0));
    },
    z = () => {
      (l(!1), y(null), j.pathname === "/vehicles/purchase" && N("/vehicles"));
    },
    fe = (X) => {
      if (X.soldStatus === "Sold") {
        alert("This vehicle is already sold.");
        return;
      }
      (G(X), m(!0));
    },
    xe = () => {
      (m(!1), G(null), j.pathname === "/vehicles/sell" && N("/vehicles"));
    },
    ie = async (X, ge = "forward") => {
      const ke = ["Not Requested", "Requested", "Arrived", "Handed Over"],
        Ue = X.mubayaStatus || "Not Requested",
        be = ke.indexOf(Ue);
      let ve = "";
      if (
        (ge === "forward" && be < ke.length - 1
          ? (ve = ke[be + 1])
          : ge === "backward" && be > 0 && (ve = ke[be - 1]),
        ve)
      )
        try {
          const nr = Qe(pe, "vehicles", X.id);
          await Es(nr, { mubayaStatus: ve });
          try {
            await Aa({
              header: {
                title:
                  ge === "forward"
                    ? "📄 Mubaya Status Updated"
                    : "🔄 Mubaya Status Reversed",
                subtitle: "Marakish Group",
              },
              sections: [
                {
                  widgets: [
                    {
                      keyValue: {
                        topLabel: "Serial Number",
                        content: X.serialNumber,
                        icon: "TICKET",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "Vehicle",
                        content: `${X.manufacturer} ${X.model} `,
                        icon: "CAR",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "From",
                        content: Ue,
                        icon: "PENDING",
                      },
                    },
                    {
                      keyValue: {
                        topLabel: "To",
                        content: ve,
                        icon: "CHECK_CIRCLE",
                      },
                    },
                  ],
                },
              ],
            });
          } catch (L) {
            console.error("Google Chat notification failed (non-critical):", L);
          }
          try {
            await kn({
              title:
                ge === "forward"
                  ? "Mubaya Status Updated"
                  : "Mubaya Status Reversed",
              description: `${X.serialNumber} - ${ve} `,
              type: "vehicle-status",
            });
          } catch (L) {
            console.error("Internal notification failed (non-critical):", L);
          }
        } catch (nr) {
          (console.error("Error updating Mubaya status:", nr),
            alert("Failed to update Mubaya status."));
        }
    },
    re = (X) => {
      (y(X), h(!0));
    },
    Ce = (X) => {
      (k(X), C(!0));
    },
    Ee = Io({
      inputData: a,
      comparator: Lo(e.order, e.orderBy),
      filterName: s,
      filters: {
        manufacturer: Y,
        model: Te,
        modelYear: le,
        soldStatus: ye,
        mubayaStatus: Ie,
        vendor: A,
      },
    }),
    qe = (X, ge) => {
      let ke = a;
      Object.keys(ge).forEach((be) => {
        be !== X &&
          ge[be] !== "All" &&
          (ke = ke.filter((ve) => {
            const nr =
              be === "mubayaStatus" ? ve[be] || "Not Requested" : ve[be];
            return String(nr || "") === String(ge[be]);
          }));
      });
      const Ue = Array.from(
        new Set(
          ke
            .map((be) =>
              X === "mubayaStatus" ? be[X] || "Not Requested" : be[X],
            )
            .filter(Boolean),
        ),
      );
      return X === "modelYear"
        ? [
            "All",
            ...Ue.sort((be, ve) => {
              const nr = Number(be),
                L = Number(ve);
              return isNaN(nr) || isNaN(L)
                ? String(be).localeCompare(String(ve))
                : L - nr;
            }),
          ]
        : ["All", ...Ue.sort((be, ve) => String(be).localeCompare(String(ve)))];
    },
    Fe = {
      manufacturer: Y,
      model: Te,
      modelYear: le,
      vendor: A,
      soldStatus: ye,
      mubayaStatus: Ie,
    },
    ir = qe("manufacturer", Fe),
    He = qe("model", Fe),
    se = qe("modelYear", Fe),
    vr = qe("vendor", Fe),
    Cr = qe("soldStatus", Fe),
    zr = qe("mubayaStatus", Fe),
    Jr = !Ee.length && !!s,
    _t = () => {
      const X = new Cs("landscape", "mm", "a4"),
        ge = X.internal.pageSize.width,
        ke = X.internal.pageSize.height;
      (X.setFontSize(18),
        X.setTextColor(40, 48, 60),
        X.text("Marakish Group", 14, 15),
        X.setFontSize(10),
        X.setTextColor(100));
      const Ue = new Date().toLocaleString();
      (X.text(`Generated on: ${Ue} `, ge - 14, 15, { align: "right" }),
        X.setFontSize(14),
        X.setTextColor(0),
        X.text(t("vehicles.title"), 14, 20),
        X.setFontSize(10),
        X.text(`Total: ${Ee.length} units`, 14, 25),
        Fs(X, {
          startY: 30,
          head: [
            [
              t("vehicles.table.serial"),
              t("vehicles.table.date"),
              t("vehicles.table.vehicle"),
              t("vehicles.table.vin"),
              t("vehicles.table.vendor"),
              t("vehicles.table.crn"),
              t("vehicles.table.parking"),
              t("vehicles.table.soldStatus"),
              t("vehicles.table.mubaya"),
            ],
          ],
          body: Ee.map((ve) => {
            var L;
            const nr =
              (L = ve.purchasingDate) != null && L.seconds
                ? or(ve.purchasingDate.seconds * 1e3)
                : or(ve.purchasingDate);
            return [
              ve.serialNumber,
              nr.isValid() ? nr.format("DD MMM YYYY") : "-",
              `${ve.manufacturer} ${ve.model} (${ve.modelYear})`,
              ve.vinChassisNumber,
              ve.vendor,
              ve.crn,
              ve.parkingLocation,
              ve.soldStatus,
              ve.mubayaStatus,
            ];
          }),
          styles: {
            fontSize: 9,
            cellPadding: 3,
            lineColor: [200, 200, 200],
            lineWidth: 0.1,
          },
          headStyles: {
            fillColor: [40, 48, 60],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center",
          },
          columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 22 },
            3: { cellWidth: 35 },
            4: { cellWidth: 30 },
            5: { cellWidth: 20 },
            6: { cellWidth: 25 },
            7: { cellWidth: 20, halign: "center" },
            8: { cellWidth: 25, halign: "center" },
          },
          theme: "grid",
          didDrawPage: (ve) => {
            const nr = `Page ${ve.pageNumber} `;
            (X.setFontSize(8),
              X.setTextColor(150),
              X.text(nr, ge - 20, ke - 10, { align: "right" }));
          },
        }));
      const be = t("vehicles.title")
        .replace(/[:\/\\]/g, "")
        .replace(/\s+/g, "_");
      X.save(`${be}.pdf`);
    },
    ct = () => {
      const X = Ee.map((ve) => {
          var L;
          const nr =
            (L = ve.purchasingDate) != null && L.seconds
              ? or(ve.purchasingDate.seconds * 1e3)
              : or(ve.purchasingDate);
          return {
            [t("vehicles.table.serial")]: ve.serialNumber,
            [t("vehicles.table.date")]: nr.isValid()
              ? nr.format("DD MMM YYYY")
              : "-",
            [t("vehicles.table.vehicle")]:
              `${ve.manufacturer} ${ve.model} (${ve.modelYear})`,
            [t("vehicles.table.vin")]: ve.vinChassisNumber,
            [t("vehicles.table.vendor")]: ve.vendor,
            [t("vehicles.table.crn")]: ve.crn,
            [t("vehicles.table.parking")]: ve.parkingLocation,
            [t("vehicles.table.soldStatus")]: ve.soldStatus,
            [t("vehicles.table.mubaya")]: ve.mubayaStatus,
          };
        }),
        ge = Ha.json_to_sheet(X),
        ke = Ha.book_new();
      Ha.book_append_sheet(ke, ge, "Vehicles");
      const Ue = Object.keys(X[0] || {}).map((ve) =>
        Math.max(ve.length, ...X.map((nr) => String(nr[ve] || "").length)),
      );
      ge["!cols"] = Ue.map((ve) => ({ wch: ve + 2 }));
      const be = t("vehicles.title")
        .replace(/[:\/\\]/g, "")
        .replace(/\s+/g, "_");
      Ex(ke, `${be}.xlsx`);
    },
    xr = () => {
      (o(""),
        Z("All"),
        he("All"),
        _e("All"),
        Be("All"),
        Pe("All"),
        O("All"),
        e.onResetPage());
    },
    ft =
      !!s ||
      Y !== "All" ||
      Te !== "All" ||
      le !== "All" ||
      ye !== "All" ||
      Ie !== "All" ||
      A !== "All",
    at = ko((X) => X.breakpoints.down("md"));
  return u.jsxs(No, {
    maxWidth: "xl",
    children: [
      u.jsxs(Et, {
        direction: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        sx: { mb: 5 },
        children: [
          u.jsx(Se, { variant: "h4", children: t("vehicles.title") }),
          u.jsxs(Et, {
            direction: { xs: "column", sm: "row" },
            sx: { gap: 2 },
            children: [
              u.jsx(fr, {
                variant: "contained",
                color: "inherit",
                startIcon: u.jsx(Oe, { icon: "mingcute:add-line" }),
                onClick: () => l(!0),
                sx: { gap: 1, px: 2 },
                children: t("vehicles.newPurchase"),
              }),
              u.jsx(fr, {
                variant: "contained",
                color: "success",
                startIcon: u.jsx(Oe, { icon: "solar:cart-3-bold" }),
                onClick: () => m(!0),
                sx: { gap: 1, px: 2 },
                children: t("vehicles.sellVehicle"),
              }),
              u.jsx(fr, {
                variant: "contained",
                color: "warning",
                startIcon: u.jsx(Oe, { icon: "solar:bill-list-bold" }),
                onClick: () => d(!0),
                sx: { gap: 1, px: 2 },
                children: t("vehicles.vehicleExpense"),
              }),
            ],
          }),
        ],
      }),
      u.jsx(Ya, {
        sx: { p: 2, mb: 2 },
        children: u.jsxs(me, {
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          children: [
            ft &&
              u.jsx(me, {
                sx: { display: "flex", alignItems: "center" },
                children: u.jsx(fr, {
                  color: "error",
                  variant: "outlined",
                  onClick: xr,
                  startIcon: u.jsx(Oe, { icon: "solar:trash-bin-trash-bold" }),
                  sx: { flexShrink: 0, height: 40, gap: 1, px: 1.5 },
                  children: t("vehicles.clearFilters"),
                }),
              }),
            u.jsx(Ir, {
              fullWidth: !0,
              size: "small",
              options: ir,
              value: Y,
              onChange: (X, ge) => {
                (Z(ge || "All"), e.onResetPage());
              },
              renderInput: (X) =>
                u.jsx(Ze, { ...X, label: t("vehicles.filters.manufacturer") }),
            }),
            u.jsx(Ir, {
              fullWidth: !0,
              size: "small",
              options: He,
              value: Te,
              onChange: (X, ge) => {
                (he(ge || "All"), e.onResetPage());
              },
              renderInput: (X) =>
                u.jsx(Ze, { ...X, label: t("vehicles.filters.model") }),
            }),
            u.jsx(Ir, {
              fullWidth: !0,
              size: "small",
              options: se,
              value: le,
              onChange: (X, ge) => {
                (_e(ge || "All"), e.onResetPage());
              },
              renderInput: (X) =>
                u.jsx(Ze, { ...X, label: t("vehicles.filters.modelYear") }),
            }),
            u.jsx(Ir, {
              fullWidth: !0,
              size: "small",
              options: vr,
              value: A,
              onChange: (X, ge) => {
                (O(ge || "All"), e.onResetPage());
              },
              renderInput: (X) =>
                u.jsx(Ze, { ...X, label: t("vehicles.filters.vendor") }),
            }),
            u.jsx(Ir, {
              fullWidth: !0,
              size: "small",
              options: Cr,
              value: ye,
              onChange: (X, ge) => {
                (Be(ge || "All"), e.onResetPage());
              },
              renderInput: (X) =>
                u.jsx(Ze, { ...X, label: t("vehicles.filters.soldStatus") }),
            }),
            u.jsx(Ir, {
              fullWidth: !0,
              size: "small",
              options: zr,
              value: Ie,
              onChange: (X, ge) => {
                (Pe(ge || "All"), e.onResetPage());
              },
              renderInput: (X) =>
                u.jsx(Ze, { ...X, label: t("vehicles.filters.mubaya") }),
            }),
          ],
        }),
      }),
      u.jsxs(Et, {
        direction: "row",
        alignItems: "center",
        justifyContent: "space-between",
        sx: { mb: 2 },
        children: [
          u.jsx(Se, {
            variant: "subtitle2",
            sx: { color: "text.secondary" },
            children: t("vehicles.shownCount", { count: Ee.length }),
          }),
          u.jsxs(Et, {
            direction: "row",
            spacing: 1,
            children: [
              u.jsx(fr, {
                variant: "outlined",
                color: "success",
                startIcon: u.jsx(Oe, { icon: "solar:bill-list-bold" }),
                onClick: ct,
                sx: { gap: 1, px: 2 },
                children: t("vehicles.downloadExcel"),
              }),
              u.jsx(fr, {
                variant: "outlined",
                color: "info",
                startIcon: u.jsx(Oe, {
                  icon: "solar:printer-minimalistic-bold",
                }),
                onClick: _t,
                sx: { gap: 1, px: 2 },
                children: t("vehicles.printPdf"),
              }),
            ],
          }),
        ],
      }),
      u.jsx(mp, { open: c, onClose: z, vehicle: F }),
      u.jsx(jo, { open: f, onClose: xe, initialVehicle: P }),
      u.jsx(uo, {
        open: p,
        onClose: () => {
          (d(!1), j.pathname === "/vehicles/expense" && N("/vehicles"));
        },
      }),
      u.jsx(Bx, {
        open: _,
        onClose: () => {
          (h(!1), y(null));
        },
        vehicle: F,
      }),
      u.jsx(Mx, {
        open: x,
        onClose: () => {
          (C(!1), k(null));
        },
        vehicle: Q,
      }),
      at
        ? u.jsxs(me, {
            children: [
              u.jsx(ds, { numSelected: e.selected.length }),
              Ee.slice(
                e.page * e.rowsPerPage,
                e.page * e.rowsPerPage + e.rowsPerPage,
              ).map((X) =>
                u.jsx(
                  Rx,
                  {
                    row: X,
                    onEditRow: () => b(X),
                    onDeleteRow: () => D(X),
                    onSellRow: () => fe(X),
                    onUpdateMubaya: (ge, ke) => ie(ge, ke),
                    onMoveParking: () => re(X),
                    onClickSerial: () => Ce(X),
                  },
                  X.id,
                ),
              ),
              u.jsx(yi, {
                component: "div",
                page: e.page,
                count: Ee.length,
                rowsPerPage: e.rowsPerPage,
                onPageChange: e.onChangePage,
                rowsPerPageOptions: [100, 150, 200],
                onRowsPerPageChange: e.onChangeRowsPerPage,
              }),
            ],
          })
        : u.jsxs(Ya, {
            children: [
              u.jsx(ds, { numSelected: e.selected.length }),
              u.jsx(Ts, {
                children: u.jsx(ks, {
                  sx: { overflow: "unset" },
                  children: u.jsxs(Za, {
                    sx: { minWidth: 1400 },
                    children: [
                      u.jsx(Lx, {
                        order: e.order,
                        orderBy: e.orderBy,
                        rowCount: Ee.length,
                        numSelected: e.selected.length,
                        onSort: e.onSort,
                        onSelectAllRows: (X) =>
                          e.onSelectAllRows(
                            X,
                            Ee.map((ge) => ge.id),
                          ),
                        headLabel: [
                          {
                            id: "serialNumber",
                            label: t("vehicles.table.serial"),
                            minWidth: 100,
                          },
                          {
                            id: "purchasingDate",
                            label: t("vehicles.table.date"),
                            minWidth: 140,
                          },
                          {
                            id: "manufacturer",
                            label: t("vehicles.table.vehicle"),
                            minWidth: 180,
                          },
                          {
                            id: "vinChassisNumber",
                            label: t("vehicles.table.vin"),
                            minWidth: 160,
                          },
                          {
                            id: "vendor",
                            label: t("vehicles.table.vendor"),
                            minWidth: 160,
                          },
                          {
                            id: "crn",
                            label: t("vehicles.table.crn"),
                            minWidth: 100,
                          },
                          {
                            id: "parkingLocation",
                            label: t("vehicles.table.parking"),
                            minWidth: 120,
                          },
                          {
                            id: "soldStatus",
                            label: t("vehicles.table.soldStatus"),
                            minWidth: 100,
                          },
                          {
                            id: "mubayaStatus",
                            label: t("vehicles.table.mubaya"),
                            minWidth: 140,
                          },
                          {
                            id: "docsUrl",
                            label: t("vehicles.table.docs"),
                            sortable: !1,
                            minWidth: 100,
                          },
                          {
                            id: "picsUrl",
                            label: t("vehicles.table.pics"),
                            sortable: !1,
                            minWidth: 100,
                          },
                          { id: "", minWidth: 50 },
                        ],
                      }),
                      u.jsxs(ei, {
                        children: [
                          Ee.slice(
                            e.page * e.rowsPerPage,
                            e.page * e.rowsPerPage + e.rowsPerPage,
                          ).map((X) =>
                            u.jsx(
                              Ix,
                              {
                                row: X,
                                selected: e.selected.includes(X.id),
                                onSelectRow: () => e.onSelectRow(X.id),
                                onEditRow: () => b(X),
                                onDeleteRow: () => D(X),
                                onSellRow: () => fe(X),
                                onUpdateMubaya: (ge, ke) => ie(ge, ke),
                                onMoveParking: () => re(X),
                                onClickSerial: () => Ce(X),
                              },
                              X.id,
                            ),
                          ),
                          u.jsx(Do, {
                            height: 68,
                            emptyRows: Mo(e.page, e.rowsPerPage, Ee.length),
                          }),
                          Jr && u.jsx(Oo, { searchQuery: s }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
              u.jsx(yi, {
                component: "div",
                page: e.page,
                count: Ee.length,
                rowsPerPage: e.rowsPerPage,
                onPageChange: e.onChangePage,
                rowsPerPageOptions: [100, 150, 200],
                onRowsPerPageChange: e.onChangeRowsPerPage,
              }),
            ],
          }),
    ],
  });
}
function Vp() {
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx("title", { children: `Vehicles - ${bo.appName}` }),
      u.jsx(vp, {}),
    ],
  });
}
export { Vp as default };
