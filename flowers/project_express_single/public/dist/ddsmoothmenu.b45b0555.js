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
})({"js/ddsmoothmenu.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

//** Smooth Navigational Menu- By Dynamic Drive DHTML code library: http://www.dynamicdrive.com
//** Script Download/ instructions page: http://www.dynamicdrive.com/dynamicindex1/ddlevelsmenu/
//** Menu created: Nov 12, 2008
//** Dec 12th, 08" (v1.01): Fixed Shadow issue when multiple LIs within the same UL (level) contain sub menus: http://www.dynamicdrive.com/forums/showthread.php?t=39177&highlight=smooth
//** Feb 11th, 09" (v1.02): The currently active main menu item (LI A) now gets a CSS class of ".selected", including sub menu items.
//** May 1st, 09" (v1.3):
//** 1) Now supports vertical (side bar) menu mode- set "orientation" to 'v'
//** 2) In IE6, shadows are now always disabled
//** July 27th, 09" (v1.31): Fixed bug so shadows can be disabled if desired.
//** Feb 2nd, 10" (v1.4): Adds ability to specify delay before sub menus appear and disappear, respectively. See showhidedelay variable below
var ddsmoothmenu = {
  //Specify full URL to down and right arrow images (23 is padding-right added to top level LIs with drop downs):
  arrowimages: {
    down: ['downarrowclass', 'down.gif', 23],
    right: ['rightarrowclass', 'right.gif']
  },
  transition: {
    overtime: 300,
    outtime: 300
  },
  //duration of slide in/ out animation, in milliseconds
  shadow: {
    enable: true,
    offsetx: 5,
    offsety: 5
  },
  //enable shadow?
  showhidedelay: {
    showdelay: 100,
    hidedelay: 200
  },
  //set delay in milliseconds before sub menus appear and disappear, respectively
  ///////Stop configuring beyond here///////////////////////////
  detectwebkit: navigator.userAgent.toLowerCase().indexOf("applewebkit") != -1,
  //detect WebKit browsers (Safari, Chrome etc)
  detectie6: document.all && !window.XMLHttpRequest,
  getajaxmenu: function getajaxmenu($, setting) {
    //function to fetch external page containing the panel DIVs
    var $menucontainer = $('#' + setting.contentsource[0]); //reference empty div on page that will hold menu

    $menucontainer.html("Loading Menu...");
    $.ajax({
      url: setting.contentsource[1],
      //path to external menu file
      async: true,
      error: function error(ajaxrequest) {
        $menucontainer.html('Error fetching content. Server Response: ' + ajaxrequest.responseText);
      },
      success: function success(content) {
        $menucontainer.html(content);
        ddsmoothmenu.buildmenu($, setting);
      }
    });
  },
  buildmenu: function buildmenu($, setting) {
    var smoothmenu = ddsmoothmenu;
    var $mainmenu = $("#" + setting.mainmenuid + ">ul"); //reference main menu UL

    $mainmenu.parent().get().className = setting.classname || "ddsmoothmenu";
    var $headers = $mainmenu.find("ul").parent();
    $headers.hover(function (e) {
      $(this).children('a:eq(0)').addClass('selected');
    }, function (e) {
      $(this).children('a:eq(0)').removeClass('selected');
    });
    $headers.each(function (i) {
      //loop through each LI header
      var $curobj = $(this).css({
        zIndex: 100 - i
      }); //reference current LI header

      var $subul = $(this).find('ul:eq(0)').css({
        display: 'block'
      });
      $subul.data('timers', {});
      this._dimensions = {
        w: this.offsetWidth,
        h: this.offsetHeight,
        subulw: $subul.outerWidth(),
        subulh: $subul.outerHeight()
      };
      this.istopheader = $curobj.parents("ul").length == 1 ? true : false; //is top level header?

      $subul.css({
        top: this.istopheader && setting.orientation != 'v' ? this._dimensions.h + "px" : 0
      });

      if (smoothmenu.shadow.enable) {
        this._shadowoffset = {
          x: this.istopheader ? $subul.offset().left + smoothmenu.shadow.offsetx : this._dimensions.w,
          y: this.istopheader ? $subul.offset().top + smoothmenu.shadow.offsety : $curobj.position().top
        }; //store this shadow's offsets

        if (this.istopheader) $parentshadow = $(document.body);else {
          var $parentLi = $curobj.parents("li:eq(0)");
          $parentshadow = $parentLi.get(0).$shadow;
        }
        this.$shadow = $('<div class="ddshadow' + (this.istopheader ? ' toplevelshadow' : '') + '"></div>').prependTo($parentshadow).css({
          left: this._shadowoffset.x + 'px',
          top: this._shadowoffset.y + 'px'
        }); //insert shadow DIV and set it to parent node for the next shadow div
      }

      $curobj.hover(function (e) {
        var $targetul = $subul; //reference UL to reveal

        var header = $curobj.get(0); //reference header LI as DOM object

        clearTimeout($targetul.data('timers').hidetimer);
        $targetul.data('timers').showtimer = setTimeout(function () {
          header._offsets = {
            left: $curobj.offset().left,
            top: $curobj.offset().top
          };
          var menuleft = header.istopheader && setting.orientation != 'v' ? 0 : header._dimensions.w;
          menuleft = header._offsets.left + menuleft + header._dimensions.subulw > $(window).width() ? header.istopheader && setting.orientation != 'v' ? -header._dimensions.subulw + header._dimensions.w : -header._dimensions.w : menuleft; //calculate this sub menu's offsets from its parent

          if ($targetul.queue().length <= 1) {
            //if 1 or less queued animations
            $targetul.css({
              left: menuleft + "px",
              width: header._dimensions.subulw + 'px'
            }).animate({
              height: 'show',
              opacity: 'show'
            }, ddsmoothmenu.transition.overtime);

            if (smoothmenu.shadow.enable) {
              var shadowleft = header.istopheader ? $targetul.offset().left + ddsmoothmenu.shadow.offsetx : menuleft;
              var shadowtop = header.istopheader ? $targetul.offset().top + smoothmenu.shadow.offsety : header._shadowoffset.y;

              if (!header.istopheader && ddsmoothmenu.detectwebkit) {
                //in WebKit browsers, restore shadow's opacity to full
                header.$shadow.css({
                  opacity: 1
                });
              }

              header.$shadow.css({
                overflow: '',
                width: header._dimensions.subulw + 'px',
                left: shadowleft + 'px',
                top: shadowtop + 'px'
              }).animate({
                height: header._dimensions.subulh + 'px'
              }, ddsmoothmenu.transition.overtime);
            }
          }
        }, ddsmoothmenu.showhidedelay.showdelay);
      }, function (e) {
        var $targetul = $subul;
        var header = $curobj.get(0);
        clearTimeout($targetul.data('timers').showtimer);
        $targetul.data('timers').hidetimer = setTimeout(function () {
          $targetul.animate({
            height: 'hide',
            opacity: 'hide'
          }, ddsmoothmenu.transition.outtime);

          if (smoothmenu.shadow.enable) {
            if (ddsmoothmenu.detectwebkit) {
              //in WebKit browsers, set first child shadow's opacity to 0, as "overflow:hidden" doesn't work in them
              header.$shadow.children('div:eq(0)').css({
                opacity: 0
              });
            }

            header.$shadow.css({
              overflow: 'hidden'
            }).animate({
              height: 0
            }, ddsmoothmenu.transition.outtime);
          }
        }, ddsmoothmenu.showhidedelay.hidedelay);
      }); //end hover
    }); //end $headers.each()

    $mainmenu.find("ul").css({
      display: 'none',
      visibility: 'visible'
    });
  },
  init: function init(setting) {
    if (_typeof(setting.customtheme) == "object" && setting.customtheme.length == 2) {
      //override default menu colors (default/hover) with custom set?
      var mainmenuid = '#' + setting.mainmenuid;
      var mainselector = setting.orientation == "v" ? mainmenuid : mainmenuid + ', ' + mainmenuid;
      document.write('<style type="text/css">\n' + mainselector + ' ul li a {background:' + setting.customtheme[0] + ';}\n' + mainmenuid + ' ul li a:hover {background:' + setting.customtheme[1] + ';}\n' + '</style>');
    }

    this.shadow.enable = document.all && !window.XMLHttpRequest ? false : this.shadow.enable; //in IE6, always disable shadow

    jQuery(document).ready(function ($) {
      //ajax menu?
      if (_typeof(setting.contentsource) == "object") {
        //if external ajax menu
        ddsmoothmenu.getajaxmenu($, setting);
      } else {
        //else if markup menu
        ddsmoothmenu.buildmenu($, setting);
      }
    });
  }
}; //end ddsmoothmenu variable
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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/ddsmoothmenu.js"], null)
//# sourceMappingURL=/ddsmoothmenu.b45b0555.js.map