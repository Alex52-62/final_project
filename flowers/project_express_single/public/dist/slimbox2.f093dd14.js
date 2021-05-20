// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/slimbox2.js":[function(require,module,exports) {
/*
	Slimbox v2.03 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2009 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
(function (w) {
  var E = w(window),
      u,
      g,
      F = -1,
      o,
      x,
      D,
      v,
      y,
      L,
      s,
      n = !window.XMLHttpRequest,
      e = window.opera && document.compatMode == "CSS1Compat" && w.browser.version >= 9.3,
      m = document.documentElement,
      l = {},
      t = new Image(),
      J = new Image(),
      H,
      a,
      h,
      q,
      I,
      d,
      G,
      c,
      A,
      K;
  w(function () {
    w("body").append(w([H = w('<div id="lbOverlay" />')[0], a = w('<div id="lbCenter" />')[0], G = w('<div id="lbBottomContainer" />')[0]]).css("display", "none"));
    h = w('<div id="lbImage" />').appendTo(a).append(q = w('<div style="position: relative;" />').append([I = w('<a id="lbPrevLink" href="#" />').click(B)[0], d = w('<a id="lbNextLink" href="#" />').click(f)[0]])[0])[0];
    c = w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').add(H).click(C)[0], A = w('<div id="lbCaption" />')[0], K = w('<div id="lbNumber" />')[0], w('<div style="clear: both;" />')[0]])[0];
  });

  w.slimbox = function (O, N, M) {
    u = w.extend({
      loop: false,
      overlayOpacity: 0.8,
      overlayFadeDuration: 400,
      resizeDuration: 400,
      resizeEasing: "swing",
      initialWidth: 250,
      initialHeight: 250,
      imageFadeDuration: 400,
      captionAnimationDuration: 400,
      counterText: "Image {x} of {y}",
      closeKeys: [27, 88, 67],
      previousKeys: [37, 80],
      nextKeys: [39, 78]
    }, M);

    if (typeof O == "string") {
      O = [[O, N]];
      N = 0;
    }

    y = E.scrollTop() + (e ? m.clientHeight : E.height()) / 2;
    L = u.initialWidth;
    s = u.initialHeight;
    w(a).css({
      top: Math.max(0, y - s / 2),
      width: L,
      height: s,
      marginLeft: -L / 2
    }).show();
    v = n || H.currentStyle && H.currentStyle.position != "fixed";

    if (v) {
      H.style.position = "absolute";
    }

    w(H).css("opacity", u.overlayOpacity).fadeIn(u.overlayFadeDuration);
    z();
    k(1);
    g = O;
    u.loop = u.loop && g.length > 1;
    return b(N);
  };

  w.fn.slimbox = function (M, P, O) {
    P = P || function (Q) {
      return [Q.href, Q.title];
    };

    O = O || function () {
      return true;
    };

    var N = this;
    return N.unbind("click").click(function () {
      var S = this,
          U = 0,
          T,
          Q = 0,
          R;
      T = w.grep(N, function (W, V) {
        return O.call(S, W, V);
      });

      for (R = T.length; Q < R; ++Q) {
        if (T[Q] == S) {
          U = Q;
        }

        T[Q] = P(T[Q], Q);
      }

      return w.slimbox(T, U, M);
    });
  };

  function z() {
    var N = E.scrollLeft(),
        M = e ? m.clientWidth : E.width();
    w([a, G]).css("left", N + M / 2);

    if (v) {
      w(H).css({
        left: N,
        top: E.scrollTop(),
        width: M,
        height: E.height()
      });
    }
  }

  function k(M) {
    w("object").add(n ? "select" : "embed").each(function (O, P) {
      if (M) {
        w.data(P, "slimbox", P.style.visibility);
      }

      P.style.visibility = M ? "hidden" : w.data(P, "slimbox");
    });
    var N = M ? "bind" : "unbind";
    E[N]("scroll resize", z);
    w(document)[N]("keydown", p);
  }

  function p(O) {
    var N = O.keyCode,
        M = w.inArray;
    return M(N, u.closeKeys) >= 0 ? C() : M(N, u.nextKeys) >= 0 ? f() : M(N, u.previousKeys) >= 0 ? B() : false;
  }

  function B() {
    return b(x);
  }

  function f() {
    return b(D);
  }

  function b(M) {
    if (M >= 0) {
      F = M;
      o = g[F][0];
      x = (F || (u.loop ? g.length : 0)) - 1;
      D = (F + 1) % g.length || (u.loop ? 0 : -1);
      r();
      a.className = "lbLoading";
      l = new Image();
      l.onload = j;
      l.src = o;
    }

    return false;
  }

  function j() {
    a.className = "";
    w(h).css({
      backgroundImage: "url(" + o + ")",
      visibility: "hidden",
      display: ""
    });
    w(q).width(l.width);
    w([q, I, d]).height(l.height);
    w(A).html(g[F][1] || "");
    w(K).html((g.length > 1 && u.counterText || "").replace(/{x}/, F + 1).replace(/{y}/, g.length));

    if (x >= 0) {
      t.src = g[x][0];
    }

    if (D >= 0) {
      J.src = g[D][0];
    }

    L = h.offsetWidth;
    s = h.offsetHeight;
    var M = Math.max(0, y - s / 2);

    if (a.offsetHeight != s) {
      w(a).animate({
        height: s,
        top: M
      }, u.resizeDuration, u.resizeEasing);
    }

    if (a.offsetWidth != L) {
      w(a).animate({
        width: L,
        marginLeft: -L / 2
      }, u.resizeDuration, u.resizeEasing);
    }

    w(a).queue(function () {
      w(G).css({
        width: L,
        top: M + s,
        marginLeft: -L / 2,
        visibility: "hidden",
        display: ""
      });
      w(h).css({
        display: "none",
        visibility: "",
        opacity: ""
      }).fadeIn(u.imageFadeDuration, i);
    });
  }

  function i() {
    if (x >= 0) {
      w(I).show();
    }

    if (D >= 0) {
      w(d).show();
    }

    w(c).css("marginTop", -c.offsetHeight).animate({
      marginTop: 0
    }, u.captionAnimationDuration);
    G.style.visibility = "";
  }

  function r() {
    l.onload = null;
    l.src = t.src = J.src = o;
    w([a, h, c]).stop(true);
    w([I, d, h, G]).hide();
  }

  function C() {
    if (F >= 0) {
      r();
      F = x = D = -1;
      w(a).hide();
      w(H).stop().fadeOut(u.overlayFadeDuration, k);
    }

    return false;
  }
})(jQuery); // AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)


if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
  jQuery(function ($) {
    $("a[rel^='lightbox']").slimbox({
      /* Put custom options here */
    }, null, function (el) {
      return this == el || this.rel.length > 8 && this.rel == el.rel;
    });
  });
}
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3783" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/slimbox2.js"], null)
//# sourceMappingURL=/slimbox2.f093dd14.js.map