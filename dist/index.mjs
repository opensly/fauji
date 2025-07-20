var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/colors/lib/styles.js
var require_styles = __commonJS({
  "node_modules/colors/lib/styles.js"(exports, module) {
    var styles = {};
    module["exports"] = styles;
    var codes = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],
      brightRed: [91, 39],
      brightGreen: [92, 39],
      brightYellow: [93, 39],
      brightBlue: [94, 39],
      brightMagenta: [95, 39],
      brightCyan: [96, 39],
      brightWhite: [97, 39],
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgBrightRed: [101, 49],
      bgBrightGreen: [102, 49],
      bgBrightYellow: [103, 49],
      bgBrightBlue: [104, 49],
      bgBrightMagenta: [105, 49],
      bgBrightCyan: [106, 49],
      bgBrightWhite: [107, 49],
      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49]
    };
    Object.keys(codes).forEach(function(key) {
      var val = codes[key];
      var style = styles[key] = [];
      style.open = "\x1B[" + val[0] + "m";
      style.close = "\x1B[" + val[1] + "m";
    });
  }
});

// node_modules/colors/lib/system/has-flag.js
var require_has_flag = __commonJS({
  "node_modules/colors/lib/system/has-flag.js"(exports, module) {
    "use strict";
    module.exports = function(flag, argv) {
      argv = argv || process.argv;
      var terminatorPos = argv.indexOf("--");
      var prefix = /^-{1,2}/.test(flag) ? "" : "--";
      var pos = argv.indexOf(prefix + flag);
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/colors/lib/system/supports-colors.js
var require_supports_colors = __commonJS({
  "node_modules/colors/lib/system/supports-colors.js"(exports, module) {
    "use strict";
    var os2 = __require("os");
    var hasFlag = require_has_flag();
    var env = process.env;
    var forceColor = void 0;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env) {
      forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      var min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        var osRelease = os2.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(sign) {
          return sign in env;
        }) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if ("TERM_PROGRAM" in env) {
        var version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Hyper":
            return 3;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      if (env.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      var level = supportsColor(stream);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/colors/lib/custom/trap.js
var require_trap = __commonJS({
  "node_modules/colors/lib/custom/trap.js"(exports, module) {
    module["exports"] = function runTheTrap(text, options) {
      var result = "";
      text = text || "Run the trap, drop the bass";
      text = text.split("");
      var trap = {
        a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
        b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
        c: ["\xA9", "\u023B", "\u03FE"],
        d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
        e: [
          "\xCB",
          "\u0115",
          "\u018E",
          "\u0258",
          "\u03A3",
          "\u03BE",
          "\u04BC",
          "\u0A6C"
        ],
        f: ["\u04FA"],
        g: ["\u0262"],
        h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
        i: ["\u0F0F"],
        j: ["\u0134"],
        k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
        l: ["\u0139"],
        m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
        n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
        o: [
          "\xD8",
          "\xF5",
          "\xF8",
          "\u01FE",
          "\u0298",
          "\u047A",
          "\u05DD",
          "\u06DD",
          "\u0E4F"
        ],
        p: ["\u01F7", "\u048E"],
        q: ["\u09CD"],
        r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
        s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
        t: ["\u0141", "\u0166", "\u0373"],
        u: ["\u01B1", "\u054D"],
        v: ["\u05D8"],
        w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
        x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
        y: ["\xA5", "\u04B0", "\u04CB"],
        z: ["\u01B5", "\u0240"]
      };
      text.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [" "];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== "undefined") {
          result += trap[c][rand];
        } else {
          result += c;
        }
      });
      return result;
    };
  }
});

// node_modules/colors/lib/custom/zalgo.js
var require_zalgo = __commonJS({
  "node_modules/colors/lib/custom/zalgo.js"(exports, module) {
    module["exports"] = function zalgo(text, options) {
      text = text || "   he is here   ";
      var soul = {
        "up": [
          "\u030D",
          "\u030E",
          "\u0304",
          "\u0305",
          "\u033F",
          "\u0311",
          "\u0306",
          "\u0310",
          "\u0352",
          "\u0357",
          "\u0351",
          "\u0307",
          "\u0308",
          "\u030A",
          "\u0342",
          "\u0313",
          "\u0308",
          "\u034A",
          "\u034B",
          "\u034C",
          "\u0303",
          "\u0302",
          "\u030C",
          "\u0350",
          "\u0300",
          "\u0301",
          "\u030B",
          "\u030F",
          "\u0312",
          "\u0313",
          "\u0314",
          "\u033D",
          "\u0309",
          "\u0363",
          "\u0364",
          "\u0365",
          "\u0366",
          "\u0367",
          "\u0368",
          "\u0369",
          "\u036A",
          "\u036B",
          "\u036C",
          "\u036D",
          "\u036E",
          "\u036F",
          "\u033E",
          "\u035B",
          "\u0346",
          "\u031A"
        ],
        "down": [
          "\u0316",
          "\u0317",
          "\u0318",
          "\u0319",
          "\u031C",
          "\u031D",
          "\u031E",
          "\u031F",
          "\u0320",
          "\u0324",
          "\u0325",
          "\u0326",
          "\u0329",
          "\u032A",
          "\u032B",
          "\u032C",
          "\u032D",
          "\u032E",
          "\u032F",
          "\u0330",
          "\u0331",
          "\u0332",
          "\u0333",
          "\u0339",
          "\u033A",
          "\u033B",
          "\u033C",
          "\u0345",
          "\u0347",
          "\u0348",
          "\u0349",
          "\u034D",
          "\u034E",
          "\u0353",
          "\u0354",
          "\u0355",
          "\u0356",
          "\u0359",
          "\u035A",
          "\u0323"
        ],
        "mid": [
          "\u0315",
          "\u031B",
          "\u0300",
          "\u0301",
          "\u0358",
          "\u0321",
          "\u0322",
          "\u0327",
          "\u0328",
          "\u0334",
          "\u0335",
          "\u0336",
          "\u035C",
          "\u035D",
          "\u035E",
          "\u035F",
          "\u0360",
          "\u0362",
          "\u0338",
          "\u0337",
          "\u0361",
          " \u0489"
        ]
      };
      var all = [].concat(soul.up, soul.down, soul.mid);
      function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
      }
      function isChar(character) {
        var bool = false;
        all.filter(function(i) {
          bool = i === character;
        });
        return bool;
      }
      function heComes(text2, options2) {
        var result = "";
        var counts;
        var l;
        options2 = options2 || {};
        options2["up"] = typeof options2["up"] !== "undefined" ? options2["up"] : true;
        options2["mid"] = typeof options2["mid"] !== "undefined" ? options2["mid"] : true;
        options2["down"] = typeof options2["down"] !== "undefined" ? options2["down"] : true;
        options2["size"] = typeof options2["size"] !== "undefined" ? options2["size"] : "maxi";
        text2 = text2.split("");
        for (l in text2) {
          if (isChar(l)) {
            continue;
          }
          result = result + text2[l];
          counts = { "up": 0, "down": 0, "mid": 0 };
          switch (options2.size) {
            case "mini":
              counts.up = randomNumber(8);
              counts.mid = randomNumber(2);
              counts.down = randomNumber(8);
              break;
            case "maxi":
              counts.up = randomNumber(16) + 3;
              counts.mid = randomNumber(4) + 1;
              counts.down = randomNumber(64) + 3;
              break;
            default:
              counts.up = randomNumber(8) + 1;
              counts.mid = randomNumber(6) / 2;
              counts.down = randomNumber(8) + 1;
              break;
          }
          var arr = ["up", "mid", "down"];
          for (var d in arr) {
            var index = arr[d];
            for (var i = 0; i <= counts[index]; i++) {
              if (options2[index]) {
                result = result + soul[index][randomNumber(soul[index].length)];
              }
            }
          }
        }
        return result;
      }
      return heComes(text, options);
    };
  }
});

// node_modules/colors/lib/maps/america.js
var require_america = __commonJS({
  "node_modules/colors/lib/maps/america.js"(exports, module) {
    module["exports"] = function(colors3) {
      return function(letter, i, exploded) {
        if (letter === " ") return letter;
        switch (i % 3) {
          case 0:
            return colors3.red(letter);
          case 1:
            return colors3.white(letter);
          case 2:
            return colors3.blue(letter);
        }
      };
    };
  }
});

// node_modules/colors/lib/maps/zebra.js
var require_zebra = __commonJS({
  "node_modules/colors/lib/maps/zebra.js"(exports, module) {
    module["exports"] = function(colors3) {
      return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors3.inverse(letter);
      };
    };
  }
});

// node_modules/colors/lib/maps/rainbow.js
var require_rainbow = __commonJS({
  "node_modules/colors/lib/maps/rainbow.js"(exports, module) {
    module["exports"] = function(colors3) {
      var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
      return function(letter, i, exploded) {
        if (letter === " ") {
          return letter;
        } else {
          return colors3[rainbowColors[i++ % rainbowColors.length]](letter);
        }
      };
    };
  }
});

// node_modules/colors/lib/maps/random.js
var require_random = __commonJS({
  "node_modules/colors/lib/maps/random.js"(exports, module) {
    module["exports"] = function(colors3) {
      var available = [
        "underline",
        "inverse",
        "grey",
        "yellow",
        "red",
        "green",
        "blue",
        "white",
        "cyan",
        "magenta",
        "brightYellow",
        "brightRed",
        "brightGreen",
        "brightBlue",
        "brightWhite",
        "brightCyan",
        "brightMagenta"
      ];
      return function(letter, i, exploded) {
        return letter === " " ? letter : colors3[available[Math.round(Math.random() * (available.length - 2))]](letter);
      };
    };
  }
});

// node_modules/colors/lib/colors.js
var require_colors = __commonJS({
  "node_modules/colors/lib/colors.js"(exports, module) {
    var colors3 = {};
    module["exports"] = colors3;
    colors3.themes = {};
    var util2 = __require("util");
    var ansiStyles = colors3.styles = require_styles();
    var defineProps = Object.defineProperties;
    var newLineRegex = new RegExp(/[\r\n]+/g);
    colors3.supportsColor = require_supports_colors().supportsColor;
    if (typeof colors3.enabled === "undefined") {
      colors3.enabled = colors3.supportsColor() !== false;
    }
    colors3.enable = function() {
      colors3.enabled = true;
    };
    colors3.disable = function() {
      colors3.enabled = false;
    };
    colors3.stripColors = colors3.strip = function(str) {
      return ("" + str).replace(/\x1B\[\d+m/g, "");
    };
    var stylize = colors3.stylize = function stylize2(str, style) {
      if (!colors3.enabled) {
        return str + "";
      }
      var styleMap = ansiStyles[style];
      if (!styleMap && style in colors3) {
        return colors3[style](str);
      }
      return styleMap.open + str + styleMap.close;
    };
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    var escapeStringRegexp = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
    function build(_styles) {
      var builder = function builder2() {
        return applyStyle.apply(builder2, arguments);
      };
      builder._styles = _styles;
      builder.__proto__ = proto;
      return builder;
    }
    var styles = function() {
      var ret = {};
      ansiStyles.grey = ansiStyles.gray;
      Object.keys(ansiStyles).forEach(function(key) {
        ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
        ret[key] = {
          get: function() {
            return build(this._styles.concat(key));
          }
        };
      });
      return ret;
    }();
    var proto = defineProps(function colors4() {
    }, styles);
    function applyStyle() {
      var args = Array.prototype.slice.call(arguments);
      var str = args.map(function(arg) {
        if (arg != null && arg.constructor === String) {
          return arg;
        } else {
          return util2.inspect(arg);
        }
      }).join(" ");
      if (!colors3.enabled || !str) {
        return str;
      }
      var newLinesPresent = str.indexOf("\n") != -1;
      var nestedStyles = this._styles;
      var i = nestedStyles.length;
      while (i--) {
        var code = ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) {
          str = str.replace(newLineRegex, function(match) {
            return code.close + match + code.open;
          });
        }
      }
      return str;
    }
    colors3.setTheme = function(theme) {
      if (typeof theme === "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var style in theme) {
        (function(style2) {
          colors3[style2] = function(str) {
            if (typeof theme[style2] === "object") {
              var out = str;
              for (var i in theme[style2]) {
                out = colors3[theme[style2][i]](out);
              }
              return out;
            }
            return colors3[theme[style2]](str);
          };
        })(style);
      }
    };
    function init() {
      var ret = {};
      Object.keys(styles).forEach(function(name) {
        ret[name] = {
          get: function() {
            return build([name]);
          }
        };
      });
      return ret;
    }
    var sequencer = function sequencer2(map2, str) {
      var exploded = str.split("");
      exploded = exploded.map(map2);
      return exploded.join("");
    };
    colors3.trap = require_trap();
    colors3.zalgo = require_zalgo();
    colors3.maps = {};
    colors3.maps.america = require_america()(colors3);
    colors3.maps.zebra = require_zebra()(colors3);
    colors3.maps.rainbow = require_rainbow()(colors3);
    colors3.maps.random = require_random()(colors3);
    for (map in colors3.maps) {
      (function(map2) {
        colors3[map2] = function(str) {
          return sequencer(colors3.maps[map2], str);
        };
      })(map);
    }
    var map;
    defineProps(colors3, init());
  }
});

// node_modules/colors/safe.js
var require_safe = __commonJS({
  "node_modules/colors/safe.js"(exports, module) {
    var colors3 = require_colors();
    module["exports"] = colors3;
  }
});

// node_modules/diff/libesm/diff/base.js
var Diff;
var init_base = __esm({
  "node_modules/diff/libesm/diff/base.js"() {
    Diff = class {
      diff(oldStr, newStr, options = {}) {
        let callback;
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if ("callback" in options) {
          callback = options.callback;
        }
        const oldString = this.castInput(oldStr, options);
        const newString = this.castInput(newStr, options);
        const oldTokens = this.removeEmpty(this.tokenize(oldString, options));
        const newTokens = this.removeEmpty(this.tokenize(newString, options));
        return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
      }
      diffWithOptionsObj(oldTokens, newTokens, options, callback) {
        var _a;
        const done = (value) => {
          value = this.postProcess(value, options);
          if (callback) {
            setTimeout(function() {
              callback(value);
            }, 0);
            return void 0;
          } else {
            return value;
          }
        };
        const newLen = newTokens.length, oldLen = oldTokens.length;
        let editLength = 1;
        let maxEditLength = newLen + oldLen;
        if (options.maxEditLength != null) {
          maxEditLength = Math.min(maxEditLength, options.maxEditLength);
        }
        const maxExecutionTime = (_a = options.timeout) !== null && _a !== void 0 ? _a : Infinity;
        const abortAfterTimestamp = Date.now() + maxExecutionTime;
        const bestPath = [{ oldPos: -1, lastComponent: void 0 }];
        let newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
        if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
          return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
        }
        let minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
        const execEditLength = () => {
          for (let diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
            let basePath;
            const removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
            if (removePath) {
              bestPath[diagonalPath - 1] = void 0;
            }
            let canAdd = false;
            if (addPath) {
              const addPathNewPos = addPath.oldPos - diagonalPath;
              canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
            }
            const canRemove = removePath && removePath.oldPos + 1 < oldLen;
            if (!canAdd && !canRemove) {
              bestPath[diagonalPath] = void 0;
              continue;
            }
            if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) {
              basePath = this.addToPath(addPath, true, false, 0, options);
            } else {
              basePath = this.addToPath(removePath, false, true, 1, options);
            }
            newPos = this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
            if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
              return done(this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
            } else {
              bestPath[diagonalPath] = basePath;
              if (basePath.oldPos + 1 >= oldLen) {
                maxDiagonalToConsider = Math.min(maxDiagonalToConsider, diagonalPath - 1);
              }
              if (newPos + 1 >= newLen) {
                minDiagonalToConsider = Math.max(minDiagonalToConsider, diagonalPath + 1);
              }
            }
          }
          editLength++;
        };
        if (callback) {
          (function exec() {
            setTimeout(function() {
              if (editLength > maxEditLength || Date.now() > abortAfterTimestamp) {
                return callback(void 0);
              }
              if (!execEditLength()) {
                exec();
              }
            }, 0);
          })();
        } else {
          while (editLength <= maxEditLength && Date.now() <= abortAfterTimestamp) {
            const ret = execEditLength();
            if (ret) {
              return ret;
            }
          }
        }
      }
      addToPath(path2, added, removed, oldPosInc, options) {
        const last = path2.lastComponent;
        if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) {
          return {
            oldPos: path2.oldPos + oldPosInc,
            lastComponent: { count: last.count + 1, added, removed, previousComponent: last.previousComponent }
          };
        } else {
          return {
            oldPos: path2.oldPos + oldPosInc,
            lastComponent: { count: 1, added, removed, previousComponent: last }
          };
        }
      }
      extractCommon(basePath, newTokens, oldTokens, diagonalPath, options) {
        const newLen = newTokens.length, oldLen = oldTokens.length;
        let oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
        while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(oldTokens[oldPos + 1], newTokens[newPos + 1], options)) {
          newPos++;
          oldPos++;
          commonCount++;
          if (options.oneChangePerToken) {
            basePath.lastComponent = { count: 1, previousComponent: basePath.lastComponent, added: false, removed: false };
          }
        }
        if (commonCount && !options.oneChangePerToken) {
          basePath.lastComponent = { count: commonCount, previousComponent: basePath.lastComponent, added: false, removed: false };
        }
        basePath.oldPos = oldPos;
        return newPos;
      }
      equals(left, right, options) {
        if (options.comparator) {
          return options.comparator(left, right);
        } else {
          return left === right || !!options.ignoreCase && left.toLowerCase() === right.toLowerCase();
        }
      }
      removeEmpty(array) {
        const ret = [];
        for (let i = 0; i < array.length; i++) {
          if (array[i]) {
            ret.push(array[i]);
          }
        }
        return ret;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      castInput(value, options) {
        return value;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tokenize(value, options) {
        return Array.from(value);
      }
      join(chars) {
        return chars.join("");
      }
      postProcess(changeObjects, options) {
        return changeObjects;
      }
      get useLongestToken() {
        return false;
      }
      buildValues(lastComponent, newTokens, oldTokens) {
        const components = [];
        let nextComponent;
        while (lastComponent) {
          components.push(lastComponent);
          nextComponent = lastComponent.previousComponent;
          delete lastComponent.previousComponent;
          lastComponent = nextComponent;
        }
        components.reverse();
        const componentLen = components.length;
        let componentPos = 0, newPos = 0, oldPos = 0;
        for (; componentPos < componentLen; componentPos++) {
          const component = components[componentPos];
          if (!component.removed) {
            if (!component.added && this.useLongestToken) {
              let value = newTokens.slice(newPos, newPos + component.count);
              value = value.map(function(value2, i) {
                const oldValue = oldTokens[oldPos + i];
                return oldValue.length > value2.length ? oldValue : value2;
              });
              component.value = this.join(value);
            } else {
              component.value = this.join(newTokens.slice(newPos, newPos + component.count));
            }
            newPos += component.count;
            if (!component.added) {
              oldPos += component.count;
            }
          } else {
            component.value = this.join(oldTokens.slice(oldPos, oldPos + component.count));
            oldPos += component.count;
          }
        }
        return components;
      }
    };
  }
});

// node_modules/diff/libesm/diff/line.js
function diffLines(oldStr, newStr, options) {
  return lineDiff.diff(oldStr, newStr, options);
}
function tokenize(value, options) {
  if (options.stripTrailingCr) {
    value = value.replace(/\r\n/g, "\n");
  }
  const retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }
  for (let i = 0; i < linesAndNewlines.length; i++) {
    const line = linesAndNewlines[i];
    if (i % 2 && !options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      retLines.push(line);
    }
  }
  return retLines;
}
var LineDiff, lineDiff;
var init_line = __esm({
  "node_modules/diff/libesm/diff/line.js"() {
    init_base();
    LineDiff = class extends Diff {
      constructor() {
        super(...arguments);
        this.tokenize = tokenize;
      }
      equals(left, right, options) {
        if (options.ignoreWhitespace) {
          if (!options.newlineIsToken || !left.includes("\n")) {
            left = left.trim();
          }
          if (!options.newlineIsToken || !right.includes("\n")) {
            right = right.trim();
          }
        } else if (options.ignoreNewlineAtEof && !options.newlineIsToken) {
          if (left.endsWith("\n")) {
            left = left.slice(0, -1);
          }
          if (right.endsWith("\n")) {
            right = right.slice(0, -1);
          }
        }
        return super.equals(left, right, options);
      }
    };
    lineDiff = new LineDiff();
  }
});

// node_modules/diff/libesm/patch/create.js
function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  let optionsObj;
  if (!options) {
    optionsObj = {};
  } else if (typeof options === "function") {
    optionsObj = { callback: options };
  } else {
    optionsObj = options;
  }
  if (typeof optionsObj.context === "undefined") {
    optionsObj.context = 4;
  }
  const context = optionsObj.context;
  if (optionsObj.newlineIsToken) {
    throw new Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");
  }
  if (!optionsObj.callback) {
    return diffLinesResultToPatch(diffLines(oldStr, newStr, optionsObj));
  } else {
    const { callback } = optionsObj;
    diffLines(oldStr, newStr, Object.assign(Object.assign({}, optionsObj), { callback: (diff) => {
      const patch = diffLinesResultToPatch(diff);
      callback(patch);
    } }));
  }
  function diffLinesResultToPatch(diff) {
    if (!diff) {
      return;
    }
    diff.push({ value: "", lines: [] });
    function contextLines(lines) {
      return lines.map(function(entry) {
        return " " + entry;
      });
    }
    const hunks = [];
    let oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
    for (let i = 0; i < diff.length; i++) {
      const current = diff[i], lines = current.lines || splitLines(current.value);
      current.lines = lines;
      if (current.added || current.removed) {
        if (!oldRangeStart) {
          const prev = diff[i - 1];
          oldRangeStart = oldLine;
          newRangeStart = newLine;
          if (prev) {
            curRange = context > 0 ? contextLines(prev.lines.slice(-context)) : [];
            oldRangeStart -= curRange.length;
            newRangeStart -= curRange.length;
          }
        }
        for (const line of lines) {
          curRange.push((current.added ? "+" : "-") + line);
        }
        if (current.added) {
          newLine += lines.length;
        } else {
          oldLine += lines.length;
        }
      } else {
        if (oldRangeStart) {
          if (lines.length <= context * 2 && i < diff.length - 2) {
            for (const line of contextLines(lines)) {
              curRange.push(line);
            }
          } else {
            const contextSize = Math.min(lines.length, context);
            for (const line of contextLines(lines.slice(0, contextSize))) {
              curRange.push(line);
            }
            const hunk = {
              oldStart: oldRangeStart,
              oldLines: oldLine - oldRangeStart + contextSize,
              newStart: newRangeStart,
              newLines: newLine - newRangeStart + contextSize,
              lines: curRange
            };
            hunks.push(hunk);
            oldRangeStart = 0;
            newRangeStart = 0;
            curRange = [];
          }
        }
        oldLine += lines.length;
        newLine += lines.length;
      }
    }
    for (const hunk of hunks) {
      for (let i = 0; i < hunk.lines.length; i++) {
        if (hunk.lines[i].endsWith("\n")) {
          hunk.lines[i] = hunk.lines[i].slice(0, -1);
        } else {
          hunk.lines.splice(i + 1, 0, "\\ No newline at end of file");
          i++;
        }
      }
    }
    return {
      oldFileName,
      newFileName,
      oldHeader,
      newHeader,
      hunks
    };
  }
}
function formatPatch(patch) {
  if (Array.isArray(patch)) {
    return patch.map(formatPatch).join("\n");
  }
  const ret = [];
  if (patch.oldFileName == patch.newFileName) {
    ret.push("Index: " + patch.oldFileName);
  }
  ret.push("===================================================================");
  ret.push("--- " + patch.oldFileName + (typeof patch.oldHeader === "undefined" ? "" : "	" + patch.oldHeader));
  ret.push("+++ " + patch.newFileName + (typeof patch.newHeader === "undefined" ? "" : "	" + patch.newHeader));
  for (let i = 0; i < patch.hunks.length; i++) {
    const hunk = patch.hunks[i];
    if (hunk.oldLines === 0) {
      hunk.oldStart -= 1;
    }
    if (hunk.newLines === 0) {
      hunk.newStart -= 1;
    }
    ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
    for (const line of hunk.lines) {
      ret.push(line);
    }
  }
  return ret.join("\n") + "\n";
}
function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
  if (typeof options === "function") {
    options = { callback: options };
  }
  if (!(options === null || options === void 0 ? void 0 : options.callback)) {
    const patchObj = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
    if (!patchObj) {
      return;
    }
    return formatPatch(patchObj);
  } else {
    const { callback } = options;
    structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, Object.assign(Object.assign({}, options), { callback: (patchObj) => {
      if (!patchObj) {
        callback(void 0);
      } else {
        callback(formatPatch(patchObj));
      }
    } }));
  }
}
function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}
function splitLines(text) {
  const hasTrailingNl = text.endsWith("\n");
  const result = text.split("\n").map((line) => line + "\n");
  if (hasTrailingNl) {
    result.pop();
  } else {
    result.push(result.pop().slice(0, -1));
  }
  return result;
}
var init_create = __esm({
  "node_modules/diff/libesm/patch/create.js"() {
    init_line();
  }
});

// node_modules/diff/libesm/index.js
var init_libesm = __esm({
  "node_modules/diff/libesm/index.js"() {
    init_create();
  }
});

// src/run-assertions/logger.js
var logger_exports = {};
__export(logger_exports, {
  Logger: () => Logger
});
import fs3 from "fs";
var colors2, Logger;
var init_logger = __esm({
  "src/run-assertions/logger.js"() {
    "use strict";
    colors2 = __toESM(require_safe(), 1);
    init_libesm();
    Logger = class {
      constructor() {
        this.total = 0;
        this.passed = 0;
        this.failed = 0;
        this.skipped = 0;
        this.testResults = [];
        this.suiteStack = [];
        this.startTime = null;
        this.endTime = null;
        this.lastError = null;
        this.slowThreshold = 500;
        this.progressBarLength = 40;
      }
      startTimer() {
        this.startTime = Date.now();
      }
      endTimer() {
        this.endTime = Date.now();
      }
      perceive(context, msg, annotations) {
        if (context === "describe") {
          this.suiteStack.push(msg);
          let ann = annotations && Object.keys(annotations).length ? " " + colors2.cyan(JSON.stringify(annotations)) : "";
          console.log(colors2.bold("\n" + msg) + ann);
        } else if (context === "test") {
          this.currentTest = { name: msg, suite: [...this.suiteStack], status: null, error: null, duration: 0, skipped: false };
          if (annotations && Object.keys(annotations).length) {
            this.currentTest.annotations = annotations;
          }
          this.currentTest.start = Date.now();
          let ann = annotations && Object.keys(annotations).length ? " " + colors2.cyan(JSON.stringify(annotations)) : "";
          process.stdout.write("  " + msg + ann);
        }
      }
      status(result, error = null, skipped = false) {
        this.total++;
        if (this.currentTest) {
          this.currentTest.duration = Date.now() - this.currentTest.start;
          this.currentTest.skipped = skipped;
          if (skipped) {
            this.skipped++;
            this.currentTest.status = "skipped";
            console.log(" " + colors2.yellow("- SKIPPED"));
          } else if (result) {
            this.passed++;
            this.currentTest.status = "passed";
            let slow = this.currentTest.duration > this.slowThreshold;
            let slowMsg = slow ? colors2.yellow(" (SLOW)") : "";
            console.log(" " + colors2.green("\u2713") + slowMsg);
          } else {
            this.failed++;
            this.currentTest.status = "failed";
            this.currentTest.error = error;
            console.log(" " + colors2.red("\u2717"));
            this.printErrorDetails(error);
          }
          this.testResults.push(this.currentTest);
          this.currentTest = null;
          this.printProgressBar();
        }
      }
      error(message) {
        this.lastError = message;
        console.error(colors2.red(message));
      }
      printErrorDetails(error) {
        if (!error) return;
        if (error.expected !== void 0 && error.actual !== void 0) {
          const diffLines2 = createPatch("difference", String(error.expected), String(error.actual)).split("\n").slice(4);
          console.error(colors2.red("--- Expected"));
          console.error(colors2.green("+++ Received"));
          diffLines2.forEach((line) => {
            if (line.startsWith("-")) console.error(colors2.red(line));
            else if (line.startsWith("+")) console.error(colors2.green(line));
            else console.error(line);
          });
        }
        if (error.stack) {
          const match = error.stack.match(/\(([^)]+):(\d+):(\d+)\)/);
          if (match) {
            const [file, line] = [match[1], parseInt(match[2], 10)];
            try {
              const lines = fs3.readFileSync(file, "utf8").split("\n");
              const start = Math.max(0, line - 3);
              const end = Math.min(lines.length, line + 2);
              for (let i = start; i < end; i++) {
                const prefix = i + 1 === line ? colors2.bgRed.white(">") : " ";
                console.error(prefix + " " + (i + 1).toString().padStart(4) + " | " + lines[i]);
              }
            } catch {
            }
          }
        }
        if (error.stack) {
          console.error(colors2.gray(error.stack));
        } else {
          console.error(colors2.red(error.toString()));
        }
      }
      printProgressBar() {
        const done = this.passed + this.failed + this.skipped;
        const percent = done / this.total;
        const filled = Math.round(this.progressBarLength * percent);
        const bar = colors2.green("\u2588".repeat(filled)) + colors2.gray("\u2591".repeat(this.progressBarLength - filled));
        process.stdout.write(`\rProgress: [${bar}] ${done}/${this.total}`);
        if (done === this.total) process.stdout.write("\n");
      }
      getStats() {
        return {
          total: this.total,
          passed: this.passed,
          failed: this.failed,
          skipped: this.skipped
        };
      }
      getResultsJSON() {
        return {
          stats: this.getStats(),
          duration: this.endTime && this.startTime ? this.endTime - this.startTime : 0,
          tests: this.testResults.map((r) => ({
            name: r.name,
            suite: r.suite,
            status: r.status,
            error: r.error ? r.error.stack || r.error.toString() : null,
            duration: r.duration,
            annotations: r.annotations || {}
          }))
        };
      }
      getResultsHTML() {
        const results = this.getResultsJSON();
        const html = [];
        html.push('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Fauji Test Report</title>');
        html.push("<style>body{font-family:sans-serif;} .passed{color:green;} .failed{color:red;} .skipped{color:orange;} .suite{font-weight:bold;} .test{margin-left:2em;} .duration{color:gray;} pre{background:#f8f8f8;padding:1em;}</style>");
        html.push("</head><body>");
        html.push(`<h1>Fauji Test Report</h1>`);
        html.push(`<p><b>Total:</b> ${results.stats.total} &nbsp; <span class="passed">Passed:</span> ${results.stats.passed} &nbsp; <span class="failed">Failed:</span> ${results.stats.failed} &nbsp; <span class="skipped">Skipped:</span> ${results.stats.skipped} &nbsp; <b>Time:</b> ${(results.duration / 1e3).toFixed(2)}s</p>`);
        let lastSuite = [];
        for (const test2 of results.tests) {
          let suiteDiffIdx = 0;
          while (suiteDiffIdx < test2.suite.length && lastSuite[suiteDiffIdx] === test2.suite[suiteDiffIdx]) suiteDiffIdx++;
          for (let i = suiteDiffIdx; i < test2.suite.length; i++) {
            html.push(`<div class="suite" style="margin-left:${i}em;">${test2.suite[i]}</div>`);
          }
          lastSuite = test2.suite;
          let statusClass = test2.status;
          let slow = test2.duration > this.slowThreshold;
          let slowMsg = slow ? ' <span style="color:orange;">(SLOW)</span>' : "";
          let ann = test2.annotations && Object.keys(test2.annotations).length ? `<span style='color:teal;'> ${JSON.stringify(test2.annotations)}</span>` : "";
          html.push(`<div class="test ${statusClass}" style="margin-left:${test2.suite.length}em;">${test2.status === "passed" ? "\u2713" : test2.status === "skipped" ? "-" : "\u2717"} ${test2.name}${ann} <span class="duration">(${test2.duration}ms${slowMsg})</span></div>`);
          if (test2.status === "failed" && test2.error) {
            html.push(`<pre>${(test2.error.stack || test2.error).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`);
          }
        }
        html.push("</body></html>");
        return html.join("\n");
      }
      printSummary() {
        this.endTimer();
        const duration = this.endTime && this.startTime ? this.endTime - this.startTime : 0;
        console.log(colors2.bold("\nTest Suites: ") + `${this.failed > 0 ? colors2.red(this.failed + " failed") : colors2.green(this.passed + " passed")} | ${this.total} total | ${colors2.yellow(this.skipped + " skipped")}`);
        console.log(colors2.bold("Tests:      ") + `${colors2.green(this.passed + " passed")}, ${colors2.red(this.failed + " failed")}, ${colors2.yellow(this.skipped + " skipped")}, ${this.total} total`);
        console.log(colors2.bold("Time:       ") + `${(duration / 1e3).toFixed(2)}s`);
        for (const result of this.testResults) {
          const suitePath = result.suite.length ? result.suite.join(" > ") + " > " : "";
          const statusColor = result.status === "passed" ? colors2.green : result.status === "skipped" ? colors2.yellow : colors2.red;
          let slow = result.duration > this.slowThreshold;
          let slowMsg = slow ? colors2.yellow(" (SLOW)") : "";
          console.log("  " + statusColor(result.status.toUpperCase()) + " " + suitePath + result.name + colors2.gray(` (${result.duration}ms)`) + slowMsg);
          if (result.status === "failed" && result.error) {
            this.printErrorDetails(result.error);
          }
        }
      }
    };
  }
});

// node_modules/@sinonjs/commons/lib/global.js
var require_global = __commonJS({
  "node_modules/@sinonjs/commons/lib/global.js"(exports, module) {
    "use strict";
    var globalObject;
    if (typeof global !== "undefined") {
      globalObject = global;
    } else if (typeof window !== "undefined") {
      globalObject = window;
    } else {
      globalObject = self;
    }
    module.exports = globalObject;
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/throws-on-proto.js
var require_throws_on_proto = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/throws-on-proto.js"(exports, module) {
    "use strict";
    var throwsOnProto;
    try {
      const object = {};
      object.__proto__;
      throwsOnProto = false;
    } catch (_) {
      throwsOnProto = true;
    }
    module.exports = throwsOnProto;
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js
var require_copy_prototype_methods = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js"(exports, module) {
    "use strict";
    var call = Function.call;
    var throwsOnProto = require_throws_on_proto();
    var disallowedProperties = [
      // ignore size because it throws from Map
      "size",
      "caller",
      "callee",
      "arguments"
    ];
    if (throwsOnProto) {
      disallowedProperties.push("__proto__");
    }
    module.exports = function copyPrototypeMethods(prototype) {
      return Object.getOwnPropertyNames(prototype).reduce(
        function(result, name) {
          if (disallowedProperties.includes(name)) {
            return result;
          }
          if (typeof prototype[name] !== "function") {
            return result;
          }
          result[name] = call.bind(prototype[name]);
          return result;
        },
        /* @__PURE__ */ Object.create(null)
      );
    };
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/array.js
var require_array = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/array.js"(exports, module) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module.exports = copyPrototype(Array.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/called-in-order.js
var require_called_in_order = __commonJS({
  "node_modules/@sinonjs/commons/lib/called-in-order.js"(exports, module) {
    "use strict";
    var every = require_array().every;
    function hasCallsLeft(callMap, spy3) {
      if (callMap[spy3.id] === void 0) {
        callMap[spy3.id] = 0;
      }
      return callMap[spy3.id] < spy3.callCount;
    }
    function checkAdjacentCalls(callMap, spy3, index, spies) {
      var calledBeforeNext = true;
      if (index !== spies.length - 1) {
        calledBeforeNext = spy3.calledBefore(spies[index + 1]);
      }
      if (hasCallsLeft(callMap, spy3) && calledBeforeNext) {
        callMap[spy3.id] += 1;
        return true;
      }
      return false;
    }
    function calledInOrder(spies) {
      var callMap = {};
      var _spies = arguments.length > 1 ? arguments : spies;
      return every(_spies, checkAdjacentCalls.bind(null, callMap));
    }
    module.exports = calledInOrder;
  }
});

// node_modules/@sinonjs/commons/lib/class-name.js
var require_class_name = __commonJS({
  "node_modules/@sinonjs/commons/lib/class-name.js"(exports, module) {
    "use strict";
    function className(value) {
      const name = value.constructor && value.constructor.name;
      return name || null;
    }
    module.exports = className;
  }
});

// node_modules/@sinonjs/commons/lib/deprecated.js
var require_deprecated = __commonJS({
  "node_modules/@sinonjs/commons/lib/deprecated.js"(exports) {
    "use strict";
    exports.wrap = function(func, msg) {
      var wrapped = function() {
        exports.printWarning(msg);
        return func.apply(this, arguments);
      };
      if (func.prototype) {
        wrapped.prototype = func.prototype;
      }
      return wrapped;
    };
    exports.defaultMsg = function(packageName, funcName) {
      return `${packageName}.${funcName} is deprecated and will be removed from the public API in a future version of ${packageName}.`;
    };
    exports.printWarning = function(msg) {
      if (typeof process === "object" && process.emitWarning) {
        process.emitWarning(msg);
      } else if (console.info) {
        console.info(msg);
      } else {
        console.log(msg);
      }
    };
  }
});

// node_modules/@sinonjs/commons/lib/every.js
var require_every = __commonJS({
  "node_modules/@sinonjs/commons/lib/every.js"(exports, module) {
    "use strict";
    module.exports = function every(obj, fn2) {
      var pass = true;
      try {
        obj.forEach(function() {
          if (!fn2.apply(this, arguments)) {
            throw new Error();
          }
        });
      } catch (e) {
        pass = false;
      }
      return pass;
    };
  }
});

// node_modules/@sinonjs/commons/lib/function-name.js
var require_function_name = __commonJS({
  "node_modules/@sinonjs/commons/lib/function-name.js"(exports, module) {
    "use strict";
    module.exports = function functionName(func) {
      if (!func) {
        return "";
      }
      try {
        return func.displayName || func.name || // Use function decomposition as a last resort to get function
        // name. Does not rely on function decomposition to work - if it
        // doesn't debugging will be slightly less informative
        // (i.e. toString will say 'spy' rather than 'myFunc').
        (String(func).match(/function ([^\s(]+)/) || [])[1];
      } catch (e) {
        return "";
      }
    };
  }
});

// node_modules/@sinonjs/commons/lib/order-by-first-call.js
var require_order_by_first_call = __commonJS({
  "node_modules/@sinonjs/commons/lib/order-by-first-call.js"(exports, module) {
    "use strict";
    var sort = require_array().sort;
    var slice = require_array().slice;
    function comparator(a, b) {
      var aCall = a.getCall(0);
      var bCall = b.getCall(0);
      var aId = aCall && aCall.callId || -1;
      var bId = bCall && bCall.callId || -1;
      return aId < bId ? -1 : 1;
    }
    function orderByFirstCall(spies) {
      return sort(slice(spies), comparator);
    }
    module.exports = orderByFirstCall;
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/function.js
var require_function = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/function.js"(exports, module) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module.exports = copyPrototype(Function.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/map.js
var require_map = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/map.js"(exports, module) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module.exports = copyPrototype(Map.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/object.js
var require_object = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/object.js"(exports, module) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module.exports = copyPrototype(Object.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/set.js
var require_set = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/set.js"(exports, module) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module.exports = copyPrototype(Set.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/string.js
var require_string = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/string.js"(exports, module) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module.exports = copyPrototype(String.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/index.js
var require_prototypes = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/index.js"(exports, module) {
    "use strict";
    module.exports = {
      array: require_array(),
      function: require_function(),
      map: require_map(),
      object: require_object(),
      set: require_set(),
      string: require_string()
    };
  }
});

// node_modules/type-detect/type-detect.js
var require_type_detect = __commonJS({
  "node_modules/type-detect/type-detect.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.typeDetect = factory();
    })(exports, function() {
      "use strict";
      var promiseExists = typeof Promise === "function";
      var globalObject = typeof self === "object" ? self : global;
      var symbolExists = typeof Symbol !== "undefined";
      var mapExists = typeof Map !== "undefined";
      var setExists = typeof Set !== "undefined";
      var weakMapExists = typeof WeakMap !== "undefined";
      var weakSetExists = typeof WeakSet !== "undefined";
      var dataViewExists = typeof DataView !== "undefined";
      var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== "undefined";
      var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== "undefined";
      var setEntriesExists = setExists && typeof Set.prototype.entries === "function";
      var mapEntriesExists = mapExists && typeof Map.prototype.entries === "function";
      var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Set()).entries());
      var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf((/* @__PURE__ */ new Map()).entries());
      var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === "function";
      var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
      var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === "function";
      var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(""[Symbol.iterator]());
      var toStringLeftSliceLength = 8;
      var toStringRightSliceLength = -1;
      function typeDetect(obj) {
        var typeofObj = typeof obj;
        if (typeofObj !== "object") {
          return typeofObj;
        }
        if (obj === null) {
          return "null";
        }
        if (obj === globalObject) {
          return "global";
        }
        if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
          return "Array";
        }
        if (typeof window === "object" && window !== null) {
          if (typeof window.location === "object" && obj === window.location) {
            return "Location";
          }
          if (typeof window.document === "object" && obj === window.document) {
            return "Document";
          }
          if (typeof window.navigator === "object") {
            if (typeof window.navigator.mimeTypes === "object" && obj === window.navigator.mimeTypes) {
              return "MimeTypeArray";
            }
            if (typeof window.navigator.plugins === "object" && obj === window.navigator.plugins) {
              return "PluginArray";
            }
          }
          if ((typeof window.HTMLElement === "function" || typeof window.HTMLElement === "object") && obj instanceof window.HTMLElement) {
            if (obj.tagName === "BLOCKQUOTE") {
              return "HTMLQuoteElement";
            }
            if (obj.tagName === "TD") {
              return "HTMLTableDataCellElement";
            }
            if (obj.tagName === "TH") {
              return "HTMLTableHeaderCellElement";
            }
          }
        }
        var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
        if (typeof stringTag === "string") {
          return stringTag;
        }
        var objPrototype = Object.getPrototypeOf(obj);
        if (objPrototype === RegExp.prototype) {
          return "RegExp";
        }
        if (objPrototype === Date.prototype) {
          return "Date";
        }
        if (promiseExists && objPrototype === Promise.prototype) {
          return "Promise";
        }
        if (setExists && objPrototype === Set.prototype) {
          return "Set";
        }
        if (mapExists && objPrototype === Map.prototype) {
          return "Map";
        }
        if (weakSetExists && objPrototype === WeakSet.prototype) {
          return "WeakSet";
        }
        if (weakMapExists && objPrototype === WeakMap.prototype) {
          return "WeakMap";
        }
        if (dataViewExists && objPrototype === DataView.prototype) {
          return "DataView";
        }
        if (mapExists && objPrototype === mapIteratorPrototype) {
          return "Map Iterator";
        }
        if (setExists && objPrototype === setIteratorPrototype) {
          return "Set Iterator";
        }
        if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
          return "Array Iterator";
        }
        if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
          return "String Iterator";
        }
        if (objPrototype === null) {
          return "Object";
        }
        return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
      }
      return typeDetect;
    });
  }
});

// node_modules/@sinonjs/commons/lib/type-of.js
var require_type_of = __commonJS({
  "node_modules/@sinonjs/commons/lib/type-of.js"(exports, module) {
    "use strict";
    var type = require_type_detect();
    module.exports = function typeOf(value) {
      return type(value).toLowerCase();
    };
  }
});

// node_modules/@sinonjs/commons/lib/value-to-string.js
var require_value_to_string = __commonJS({
  "node_modules/@sinonjs/commons/lib/value-to-string.js"(exports, module) {
    "use strict";
    function valueToString(value) {
      if (value && value.toString) {
        return value.toString();
      }
      return String(value);
    }
    module.exports = valueToString;
  }
});

// node_modules/@sinonjs/commons/lib/index.js
var require_lib = __commonJS({
  "node_modules/@sinonjs/commons/lib/index.js"(exports, module) {
    "use strict";
    module.exports = {
      global: require_global(),
      calledInOrder: require_called_in_order(),
      className: require_class_name(),
      deprecated: require_deprecated(),
      every: require_every(),
      functionName: require_function_name(),
      orderByFirstCall: require_order_by_first_call(),
      prototypes: require_prototypes(),
      typeOf: require_type_of(),
      valueToString: require_value_to_string()
    };
  }
});

// node_modules/@sinonjs/fake-timers/src/fake-timers-src.js
var require_fake_timers_src = __commonJS({
  "node_modules/@sinonjs/fake-timers/src/fake-timers-src.js"(exports, module) {
    "use strict";
    var globalObject = require_lib().global;
    var timersModule;
    var timersPromisesModule;
    if (typeof __require === "function" && typeof module === "object") {
      try {
        timersModule = __require("timers");
      } catch (e) {
      }
      try {
        timersPromisesModule = __require("timers/promises");
      } catch (e) {
      }
    }
    function withGlobal(_global) {
      const maxTimeout = Math.pow(2, 31) - 1;
      const idCounterStart = 1e12;
      const NOOP = function() {
        return void 0;
      };
      const NOOP_ARRAY = function() {
        return [];
      };
      const isPresent = {};
      let timeoutResult, addTimerReturnsObject = false;
      if (_global.setTimeout) {
        isPresent.setTimeout = true;
        timeoutResult = _global.setTimeout(NOOP, 0);
        addTimerReturnsObject = typeof timeoutResult === "object";
      }
      isPresent.clearTimeout = Boolean(_global.clearTimeout);
      isPresent.setInterval = Boolean(_global.setInterval);
      isPresent.clearInterval = Boolean(_global.clearInterval);
      isPresent.hrtime = _global.process && typeof _global.process.hrtime === "function";
      isPresent.hrtimeBigint = isPresent.hrtime && typeof _global.process.hrtime.bigint === "function";
      isPresent.nextTick = _global.process && typeof _global.process.nextTick === "function";
      const utilPromisify = _global.process && __require("util").promisify;
      isPresent.performance = _global.performance && typeof _global.performance.now === "function";
      const hasPerformancePrototype = _global.Performance && (typeof _global.Performance).match(/^(function|object)$/);
      const hasPerformanceConstructorPrototype = _global.performance && _global.performance.constructor && _global.performance.constructor.prototype;
      isPresent.queueMicrotask = _global.hasOwnProperty("queueMicrotask");
      isPresent.requestAnimationFrame = _global.requestAnimationFrame && typeof _global.requestAnimationFrame === "function";
      isPresent.cancelAnimationFrame = _global.cancelAnimationFrame && typeof _global.cancelAnimationFrame === "function";
      isPresent.requestIdleCallback = _global.requestIdleCallback && typeof _global.requestIdleCallback === "function";
      isPresent.cancelIdleCallbackPresent = _global.cancelIdleCallback && typeof _global.cancelIdleCallback === "function";
      isPresent.setImmediate = _global.setImmediate && typeof _global.setImmediate === "function";
      isPresent.clearImmediate = _global.clearImmediate && typeof _global.clearImmediate === "function";
      isPresent.Intl = _global.Intl && typeof _global.Intl === "object";
      if (_global.clearTimeout) {
        _global.clearTimeout(timeoutResult);
      }
      const NativeDate = _global.Date;
      const NativeIntl = isPresent.Intl ? Object.defineProperties(
        /* @__PURE__ */ Object.create(null),
        Object.getOwnPropertyDescriptors(_global.Intl)
      ) : void 0;
      let uniqueTimerId = idCounterStart;
      if (NativeDate === void 0) {
        throw new Error(
          "The global scope doesn't have a `Date` object (see https://github.com/sinonjs/sinon/issues/1852#issuecomment-419622780)"
        );
      }
      isPresent.Date = true;
      class FakePerformanceEntry {
        constructor(name, entryType, startTime, duration) {
          this.name = name;
          this.entryType = entryType;
          this.startTime = startTime;
          this.duration = duration;
        }
        toJSON() {
          return JSON.stringify({ ...this });
        }
      }
      function isNumberFinite(num) {
        if (Number.isFinite) {
          return Number.isFinite(num);
        }
        return isFinite(num);
      }
      let isNearInfiniteLimit = false;
      function checkIsNearInfiniteLimit(clock2, i) {
        if (clock2.loopLimit && i === clock2.loopLimit - 1) {
          isNearInfiniteLimit = true;
        }
      }
      function resetIsNearInfiniteLimit() {
        isNearInfiniteLimit = false;
      }
      function parseTime(str) {
        if (!str) {
          return 0;
        }
        const strings = str.split(":");
        const l = strings.length;
        let i = l;
        let ms = 0;
        let parsed;
        if (l > 3 || !/^(\d\d:){0,2}\d\d?$/.test(str)) {
          throw new Error(
            "tick only understands numbers, 'm:s' and 'h:m:s'. Each part must be two digits"
          );
        }
        while (i--) {
          parsed = parseInt(strings[i], 10);
          if (parsed >= 60) {
            throw new Error(`Invalid time ${str}`);
          }
          ms += parsed * Math.pow(60, l - i - 1);
        }
        return ms * 1e3;
      }
      function nanoRemainder(msFloat) {
        const modulo = 1e6;
        const remainder = msFloat * 1e6 % modulo;
        const positiveRemainder = remainder < 0 ? remainder + modulo : remainder;
        return Math.floor(positiveRemainder);
      }
      function getEpoch(epoch) {
        if (!epoch) {
          return 0;
        }
        if (typeof epoch.getTime === "function") {
          return epoch.getTime();
        }
        if (typeof epoch === "number") {
          return epoch;
        }
        throw new TypeError("now should be milliseconds since UNIX epoch");
      }
      function inRange(from, to, timer) {
        return timer && timer.callAt >= from && timer.callAt <= to;
      }
      function getInfiniteLoopError(clock2, job) {
        const infiniteLoopError = new Error(
          `Aborting after running ${clock2.loopLimit} timers, assuming an infinite loop!`
        );
        if (!job.error) {
          return infiniteLoopError;
        }
        const computedTargetPattern = /target\.*[<|(|[].*?[>|\]|)]\s*/;
        let clockMethodPattern = new RegExp(
          String(Object.keys(clock2).join("|"))
        );
        if (addTimerReturnsObject) {
          clockMethodPattern = new RegExp(
            `\\s+at (Object\\.)?(?:${Object.keys(clock2).join("|")})\\s+`
          );
        }
        let matchedLineIndex = -1;
        job.error.stack.split("\n").some(function(line, i) {
          const matchedComputedTarget = line.match(computedTargetPattern);
          if (matchedComputedTarget) {
            matchedLineIndex = i;
            return true;
          }
          const matchedClockMethod = line.match(clockMethodPattern);
          if (matchedClockMethod) {
            matchedLineIndex = i;
            return false;
          }
          return matchedLineIndex >= 0;
        });
        const stack = `${infiniteLoopError}
${job.type || "Microtask"} - ${job.func.name || "anonymous"}
${job.error.stack.split("\n").slice(matchedLineIndex + 1).join("\n")}`;
        try {
          Object.defineProperty(infiniteLoopError, "stack", {
            value: stack
          });
        } catch (e) {
        }
        return infiniteLoopError;
      }
      function createDate() {
        class ClockDate extends NativeDate {
          /**
           * @param {number} year
           * @param {number} month
           * @param {number} date
           * @param {number} hour
           * @param {number} minute
           * @param {number} second
           * @param {number} ms
           * @returns void
           */
          // eslint-disable-next-line no-unused-vars
          constructor(year, month, date, hour, minute, second, ms) {
            if (arguments.length === 0) {
              super(ClockDate.clock.now);
            } else {
              super(...arguments);
            }
            Object.defineProperty(this, "constructor", {
              value: NativeDate,
              enumerable: false
            });
          }
          static [Symbol.hasInstance](instance) {
            return instance instanceof NativeDate;
          }
        }
        ClockDate.isFake = true;
        if (NativeDate.now) {
          ClockDate.now = function now() {
            return ClockDate.clock.now;
          };
        }
        if (NativeDate.toSource) {
          ClockDate.toSource = function toSource() {
            return NativeDate.toSource();
          };
        }
        ClockDate.toString = function toString() {
          return NativeDate.toString();
        };
        const ClockDateProxy = new Proxy(ClockDate, {
          // handler for [[Call]] invocations (i.e. not using `new`)
          apply() {
            if (this instanceof ClockDate) {
              throw new TypeError(
                "A Proxy should only capture `new` calls with the `construct` handler. This is not supposed to be possible, so check the logic."
              );
            }
            return new NativeDate(ClockDate.clock.now).toString();
          }
        });
        return ClockDateProxy;
      }
      function createIntl() {
        const ClockIntl = {};
        Object.getOwnPropertyNames(NativeIntl).forEach(
          (property) => ClockIntl[property] = NativeIntl[property]
        );
        ClockIntl.DateTimeFormat = function(...args) {
          const realFormatter = new NativeIntl.DateTimeFormat(...args);
          const formatter = {};
          ["formatRange", "formatRangeToParts", "resolvedOptions"].forEach(
            (method) => {
              formatter[method] = realFormatter[method].bind(realFormatter);
            }
          );
          ["format", "formatToParts"].forEach((method) => {
            formatter[method] = function(date) {
              return realFormatter[method](date || ClockIntl.clock.now);
            };
          });
          return formatter;
        };
        ClockIntl.DateTimeFormat.prototype = Object.create(
          NativeIntl.DateTimeFormat.prototype
        );
        ClockIntl.DateTimeFormat.supportedLocalesOf = NativeIntl.DateTimeFormat.supportedLocalesOf;
        return ClockIntl;
      }
      function enqueueJob(clock2, job) {
        if (!clock2.jobs) {
          clock2.jobs = [];
        }
        clock2.jobs.push(job);
      }
      function runJobs(clock2) {
        if (!clock2.jobs) {
          return;
        }
        for (let i = 0; i < clock2.jobs.length; i++) {
          const job = clock2.jobs[i];
          job.func.apply(null, job.args);
          checkIsNearInfiniteLimit(clock2, i);
          if (clock2.loopLimit && i > clock2.loopLimit) {
            throw getInfiniteLoopError(clock2, job);
          }
        }
        resetIsNearInfiniteLimit();
        clock2.jobs = [];
      }
      function addTimer(clock2, timer) {
        if (timer.func === void 0) {
          throw new Error("Callback must be provided to timer calls");
        }
        if (addTimerReturnsObject) {
          if (typeof timer.func !== "function") {
            throw new TypeError(
              `[ERR_INVALID_CALLBACK]: Callback must be a function. Received ${timer.func} of type ${typeof timer.func}`
            );
          }
        }
        if (isNearInfiniteLimit) {
          timer.error = new Error();
        }
        timer.type = timer.immediate ? "Immediate" : "Timeout";
        if (timer.hasOwnProperty("delay")) {
          if (typeof timer.delay !== "number") {
            timer.delay = parseInt(timer.delay, 10);
          }
          if (!isNumberFinite(timer.delay)) {
            timer.delay = 0;
          }
          timer.delay = timer.delay > maxTimeout ? 1 : timer.delay;
          timer.delay = Math.max(0, timer.delay);
        }
        if (timer.hasOwnProperty("interval")) {
          timer.type = "Interval";
          timer.interval = timer.interval > maxTimeout ? 1 : timer.interval;
        }
        if (timer.hasOwnProperty("animation")) {
          timer.type = "AnimationFrame";
          timer.animation = true;
        }
        if (timer.hasOwnProperty("idleCallback")) {
          timer.type = "IdleCallback";
          timer.idleCallback = true;
        }
        if (!clock2.timers) {
          clock2.timers = {};
        }
        timer.id = uniqueTimerId++;
        timer.createdAt = clock2.now;
        timer.callAt = clock2.now + (parseInt(timer.delay) || (clock2.duringTick ? 1 : 0));
        clock2.timers[timer.id] = timer;
        if (addTimerReturnsObject) {
          const res = {
            refed: true,
            ref: function() {
              this.refed = true;
              return res;
            },
            unref: function() {
              this.refed = false;
              return res;
            },
            hasRef: function() {
              return this.refed;
            },
            refresh: function() {
              timer.callAt = clock2.now + (parseInt(timer.delay) || (clock2.duringTick ? 1 : 0));
              clock2.timers[timer.id] = timer;
              return res;
            },
            [Symbol.toPrimitive]: function() {
              return timer.id;
            }
          };
          return res;
        }
        return timer.id;
      }
      function compareTimers(a, b) {
        if (a.callAt < b.callAt) {
          return -1;
        }
        if (a.callAt > b.callAt) {
          return 1;
        }
        if (a.immediate && !b.immediate) {
          return -1;
        }
        if (!a.immediate && b.immediate) {
          return 1;
        }
        if (a.createdAt < b.createdAt) {
          return -1;
        }
        if (a.createdAt > b.createdAt) {
          return 1;
        }
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
      }
      function firstTimerInRange(clock2, from, to) {
        const timers2 = clock2.timers;
        let timer = null;
        let id, isInRange;
        for (id in timers2) {
          if (timers2.hasOwnProperty(id)) {
            isInRange = inRange(from, to, timers2[id]);
            if (isInRange && (!timer || compareTimers(timer, timers2[id]) === 1)) {
              timer = timers2[id];
            }
          }
        }
        return timer;
      }
      function firstTimer(clock2) {
        const timers2 = clock2.timers;
        let timer = null;
        let id;
        for (id in timers2) {
          if (timers2.hasOwnProperty(id)) {
            if (!timer || compareTimers(timer, timers2[id]) === 1) {
              timer = timers2[id];
            }
          }
        }
        return timer;
      }
      function lastTimer(clock2) {
        const timers2 = clock2.timers;
        let timer = null;
        let id;
        for (id in timers2) {
          if (timers2.hasOwnProperty(id)) {
            if (!timer || compareTimers(timer, timers2[id]) === -1) {
              timer = timers2[id];
            }
          }
        }
        return timer;
      }
      function callTimer(clock2, timer) {
        if (typeof timer.interval === "number") {
          clock2.timers[timer.id].callAt += timer.interval;
        } else {
          delete clock2.timers[timer.id];
        }
        if (typeof timer.func === "function") {
          timer.func.apply(null, timer.args);
        } else {
          const eval2 = eval;
          (function() {
            eval2(timer.func);
          })();
        }
      }
      function getClearHandler(ttype) {
        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
          return `cancel${ttype}`;
        }
        return `clear${ttype}`;
      }
      function getScheduleHandler(ttype) {
        if (ttype === "IdleCallback" || ttype === "AnimationFrame") {
          return `request${ttype}`;
        }
        return `set${ttype}`;
      }
      function createWarnOnce() {
        let calls = 0;
        return function(msg) {
          !calls++ && console.warn(msg);
        };
      }
      const warnOnce = createWarnOnce();
      function clearTimer(clock2, timerId, ttype) {
        if (!timerId) {
          return;
        }
        if (!clock2.timers) {
          clock2.timers = {};
        }
        const id = Number(timerId);
        if (Number.isNaN(id) || id < idCounterStart) {
          const handlerName = getClearHandler(ttype);
          if (clock2.shouldClearNativeTimers === true) {
            const nativeHandler = clock2[`_${handlerName}`];
            return typeof nativeHandler === "function" ? nativeHandler(timerId) : void 0;
          }
          warnOnce(
            `FakeTimers: ${handlerName} was invoked to clear a native timer instead of one created by this library.
To automatically clean-up native timers, use \`shouldClearNativeTimers\`.`
          );
        }
        if (clock2.timers.hasOwnProperty(id)) {
          const timer = clock2.timers[id];
          if (timer.type === ttype || timer.type === "Timeout" && ttype === "Interval" || timer.type === "Interval" && ttype === "Timeout") {
            delete clock2.timers[id];
          } else {
            const clear = getClearHandler(ttype);
            const schedule = getScheduleHandler(timer.type);
            throw new Error(
              `Cannot clear timer: timer created with ${schedule}() but cleared with ${clear}()`
            );
          }
        }
      }
      function uninstall(clock2, config) {
        let method, i, l;
        const installedHrTime = "_hrtime";
        const installedNextTick = "_nextTick";
        for (i = 0, l = clock2.methods.length; i < l; i++) {
          method = clock2.methods[i];
          if (method === "hrtime" && _global.process) {
            _global.process.hrtime = clock2[installedHrTime];
          } else if (method === "nextTick" && _global.process) {
            _global.process.nextTick = clock2[installedNextTick];
          } else if (method === "performance") {
            const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
              clock2,
              `_${method}`
            );
            if (originalPerfDescriptor && originalPerfDescriptor.get && !originalPerfDescriptor.set) {
              Object.defineProperty(
                _global,
                method,
                originalPerfDescriptor
              );
            } else if (originalPerfDescriptor.configurable) {
              _global[method] = clock2[`_${method}`];
            }
          } else {
            if (_global[method] && _global[method].hadOwnProperty) {
              _global[method] = clock2[`_${method}`];
            } else {
              try {
                delete _global[method];
              } catch (ignore) {
              }
            }
          }
          if (clock2.timersModuleMethods !== void 0) {
            for (let j = 0; j < clock2.timersModuleMethods.length; j++) {
              const entry = clock2.timersModuleMethods[j];
              timersModule[entry.methodName] = entry.original;
            }
          }
          if (clock2.timersPromisesModuleMethods !== void 0) {
            for (let j = 0; j < clock2.timersPromisesModuleMethods.length; j++) {
              const entry = clock2.timersPromisesModuleMethods[j];
              timersPromisesModule[entry.methodName] = entry.original;
            }
          }
        }
        if (config.shouldAdvanceTime === true) {
          _global.clearInterval(clock2.attachedInterval);
        }
        clock2.methods = [];
        for (const [listener, signal] of clock2.abortListenerMap.entries()) {
          signal.removeEventListener("abort", listener);
          clock2.abortListenerMap.delete(listener);
        }
        if (!clock2.timers) {
          return [];
        }
        return Object.keys(clock2.timers).map(function mapper(key) {
          return clock2.timers[key];
        });
      }
      function hijackMethod(target, method, clock2) {
        clock2[method].hadOwnProperty = Object.prototype.hasOwnProperty.call(
          target,
          method
        );
        clock2[`_${method}`] = target[method];
        if (method === "Date") {
          target[method] = clock2[method];
        } else if (method === "Intl") {
          target[method] = clock2[method];
        } else if (method === "performance") {
          const originalPerfDescriptor = Object.getOwnPropertyDescriptor(
            target,
            method
          );
          if (originalPerfDescriptor && originalPerfDescriptor.get && !originalPerfDescriptor.set) {
            Object.defineProperty(
              clock2,
              `_${method}`,
              originalPerfDescriptor
            );
            const perfDescriptor = Object.getOwnPropertyDescriptor(
              clock2,
              method
            );
            Object.defineProperty(target, method, perfDescriptor);
          } else {
            target[method] = clock2[method];
          }
        } else {
          target[method] = function() {
            return clock2[method].apply(clock2, arguments);
          };
          Object.defineProperties(
            target[method],
            Object.getOwnPropertyDescriptors(clock2[method])
          );
        }
        target[method].clock = clock2;
      }
      function doIntervalTick(clock2, advanceTimeDelta) {
        clock2.tick(advanceTimeDelta);
      }
      const timers = {
        setTimeout: _global.setTimeout,
        clearTimeout: _global.clearTimeout,
        setInterval: _global.setInterval,
        clearInterval: _global.clearInterval,
        Date: _global.Date
      };
      if (isPresent.setImmediate) {
        timers.setImmediate = _global.setImmediate;
      }
      if (isPresent.clearImmediate) {
        timers.clearImmediate = _global.clearImmediate;
      }
      if (isPresent.hrtime) {
        timers.hrtime = _global.process.hrtime;
      }
      if (isPresent.nextTick) {
        timers.nextTick = _global.process.nextTick;
      }
      if (isPresent.performance) {
        timers.performance = _global.performance;
      }
      if (isPresent.requestAnimationFrame) {
        timers.requestAnimationFrame = _global.requestAnimationFrame;
      }
      if (isPresent.queueMicrotask) {
        timers.queueMicrotask = _global.queueMicrotask;
      }
      if (isPresent.cancelAnimationFrame) {
        timers.cancelAnimationFrame = _global.cancelAnimationFrame;
      }
      if (isPresent.requestIdleCallback) {
        timers.requestIdleCallback = _global.requestIdleCallback;
      }
      if (isPresent.cancelIdleCallback) {
        timers.cancelIdleCallback = _global.cancelIdleCallback;
      }
      if (isPresent.Intl) {
        timers.Intl = NativeIntl;
      }
      const originalSetTimeout = _global.setImmediate || _global.setTimeout;
      function createClock(start, loopLimit) {
        start = Math.floor(getEpoch(start));
        loopLimit = loopLimit || 1e3;
        let nanos = 0;
        const adjustedSystemTime = [0, 0];
        const clock2 = {
          now: start,
          Date: createDate(),
          loopLimit
        };
        clock2.Date.clock = clock2;
        function getTimeToNextFrame() {
          return 16 - (clock2.now - start) % 16;
        }
        function hrtime(prev) {
          const millisSinceStart = clock2.now - adjustedSystemTime[0] - start;
          const secsSinceStart = Math.floor(millisSinceStart / 1e3);
          const remainderInNanos = (millisSinceStart - secsSinceStart * 1e3) * 1e6 + nanos - adjustedSystemTime[1];
          if (Array.isArray(prev)) {
            if (prev[1] > 1e9) {
              throw new TypeError(
                "Number of nanoseconds can't exceed a billion"
              );
            }
            const oldSecs = prev[0];
            let nanoDiff = remainderInNanos - prev[1];
            let secDiff = secsSinceStart - oldSecs;
            if (nanoDiff < 0) {
              nanoDiff += 1e9;
              secDiff -= 1;
            }
            return [secDiff, nanoDiff];
          }
          return [secsSinceStart, remainderInNanos];
        }
        function fakePerformanceNow() {
          const hrt = hrtime();
          const millis = hrt[0] * 1e3 + hrt[1] / 1e6;
          return millis;
        }
        if (isPresent.hrtimeBigint) {
          hrtime.bigint = function() {
            const parts = hrtime();
            return BigInt(parts[0]) * BigInt(1e9) + BigInt(parts[1]);
          };
        }
        if (isPresent.Intl) {
          clock2.Intl = createIntl();
          clock2.Intl.clock = clock2;
        }
        clock2.requestIdleCallback = function requestIdleCallback(func, timeout) {
          let timeToNextIdlePeriod = 0;
          if (clock2.countTimers() > 0) {
            timeToNextIdlePeriod = 50;
          }
          const result = addTimer(clock2, {
            func,
            args: Array.prototype.slice.call(arguments, 2),
            delay: typeof timeout === "undefined" ? timeToNextIdlePeriod : Math.min(timeout, timeToNextIdlePeriod),
            idleCallback: true
          });
          return Number(result);
        };
        clock2.cancelIdleCallback = function cancelIdleCallback(timerId) {
          return clearTimer(clock2, timerId, "IdleCallback");
        };
        clock2.setTimeout = function setTimeout2(func, timeout) {
          return addTimer(clock2, {
            func,
            args: Array.prototype.slice.call(arguments, 2),
            delay: timeout
          });
        };
        if (typeof _global.Promise !== "undefined" && utilPromisify) {
          clock2.setTimeout[utilPromisify.custom] = function promisifiedSetTimeout(timeout, arg) {
            return new _global.Promise(function setTimeoutExecutor(resolve) {
              addTimer(clock2, {
                func: resolve,
                args: [arg],
                delay: timeout
              });
            });
          };
        }
        clock2.clearTimeout = function clearTimeout(timerId) {
          return clearTimer(clock2, timerId, "Timeout");
        };
        clock2.nextTick = function nextTick(func) {
          return enqueueJob(clock2, {
            func,
            args: Array.prototype.slice.call(arguments, 1),
            error: isNearInfiniteLimit ? new Error() : null
          });
        };
        clock2.queueMicrotask = function queueMicrotask(func) {
          return clock2.nextTick(func);
        };
        clock2.setInterval = function setInterval(func, timeout) {
          timeout = parseInt(timeout, 10);
          return addTimer(clock2, {
            func,
            args: Array.prototype.slice.call(arguments, 2),
            delay: timeout,
            interval: timeout
          });
        };
        clock2.clearInterval = function clearInterval(timerId) {
          return clearTimer(clock2, timerId, "Interval");
        };
        if (isPresent.setImmediate) {
          clock2.setImmediate = function setImmediate(func) {
            return addTimer(clock2, {
              func,
              args: Array.prototype.slice.call(arguments, 1),
              immediate: true
            });
          };
          if (typeof _global.Promise !== "undefined" && utilPromisify) {
            clock2.setImmediate[utilPromisify.custom] = function promisifiedSetImmediate(arg) {
              return new _global.Promise(
                function setImmediateExecutor(resolve) {
                  addTimer(clock2, {
                    func: resolve,
                    args: [arg],
                    immediate: true
                  });
                }
              );
            };
          }
          clock2.clearImmediate = function clearImmediate(timerId) {
            return clearTimer(clock2, timerId, "Immediate");
          };
        }
        clock2.countTimers = function countTimers() {
          return Object.keys(clock2.timers || {}).length + (clock2.jobs || []).length;
        };
        clock2.requestAnimationFrame = function requestAnimationFrame(func) {
          const result = addTimer(clock2, {
            func,
            delay: getTimeToNextFrame(),
            get args() {
              return [fakePerformanceNow()];
            },
            animation: true
          });
          return Number(result);
        };
        clock2.cancelAnimationFrame = function cancelAnimationFrame(timerId) {
          return clearTimer(clock2, timerId, "AnimationFrame");
        };
        clock2.runMicrotasks = function runMicrotasks() {
          runJobs(clock2);
        };
        function doTick(tickValue, isAsync, resolve, reject) {
          const msFloat = typeof tickValue === "number" ? tickValue : parseTime(tickValue);
          const ms = Math.floor(msFloat);
          const remainder = nanoRemainder(msFloat);
          let nanosTotal = nanos + remainder;
          let tickTo = clock2.now + ms;
          if (msFloat < 0) {
            throw new TypeError("Negative ticks are not supported");
          }
          if (nanosTotal >= 1e6) {
            tickTo += 1;
            nanosTotal -= 1e6;
          }
          nanos = nanosTotal;
          let tickFrom = clock2.now;
          let previous = clock2.now;
          let timer, firstException, oldNow, nextPromiseTick, compensationCheck, postTimerCall;
          clock2.duringTick = true;
          oldNow = clock2.now;
          runJobs(clock2);
          if (oldNow !== clock2.now) {
            tickFrom += clock2.now - oldNow;
            tickTo += clock2.now - oldNow;
          }
          function doTickInner() {
            timer = firstTimerInRange(clock2, tickFrom, tickTo);
            while (timer && tickFrom <= tickTo) {
              if (clock2.timers[timer.id]) {
                tickFrom = timer.callAt;
                clock2.now = timer.callAt;
                oldNow = clock2.now;
                try {
                  runJobs(clock2);
                  callTimer(clock2, timer);
                } catch (e) {
                  firstException = firstException || e;
                }
                if (isAsync) {
                  originalSetTimeout(nextPromiseTick);
                  return;
                }
                compensationCheck();
              }
              postTimerCall();
            }
            oldNow = clock2.now;
            runJobs(clock2);
            if (oldNow !== clock2.now) {
              tickFrom += clock2.now - oldNow;
              tickTo += clock2.now - oldNow;
            }
            clock2.duringTick = false;
            timer = firstTimerInRange(clock2, tickFrom, tickTo);
            if (timer) {
              try {
                clock2.tick(tickTo - clock2.now);
              } catch (e) {
                firstException = firstException || e;
              }
            } else {
              clock2.now = tickTo;
              nanos = nanosTotal;
            }
            if (firstException) {
              throw firstException;
            }
            if (isAsync) {
              resolve(clock2.now);
            } else {
              return clock2.now;
            }
          }
          nextPromiseTick = isAsync && function() {
            try {
              compensationCheck();
              postTimerCall();
              doTickInner();
            } catch (e) {
              reject(e);
            }
          };
          compensationCheck = function() {
            if (oldNow !== clock2.now) {
              tickFrom += clock2.now - oldNow;
              tickTo += clock2.now - oldNow;
              previous += clock2.now - oldNow;
            }
          };
          postTimerCall = function() {
            timer = firstTimerInRange(clock2, previous, tickTo);
            previous = tickFrom;
          };
          return doTickInner();
        }
        clock2.tick = function tick(tickValue) {
          return doTick(tickValue, false);
        };
        if (typeof _global.Promise !== "undefined") {
          clock2.tickAsync = function tickAsync(tickValue) {
            return new _global.Promise(function(resolve, reject) {
              originalSetTimeout(function() {
                try {
                  doTick(tickValue, true, resolve, reject);
                } catch (e) {
                  reject(e);
                }
              });
            });
          };
        }
        clock2.next = function next() {
          runJobs(clock2);
          const timer = firstTimer(clock2);
          if (!timer) {
            return clock2.now;
          }
          clock2.duringTick = true;
          try {
            clock2.now = timer.callAt;
            callTimer(clock2, timer);
            runJobs(clock2);
            return clock2.now;
          } finally {
            clock2.duringTick = false;
          }
        };
        if (typeof _global.Promise !== "undefined") {
          clock2.nextAsync = function nextAsync() {
            return new _global.Promise(function(resolve, reject) {
              originalSetTimeout(function() {
                try {
                  const timer = firstTimer(clock2);
                  if (!timer) {
                    resolve(clock2.now);
                    return;
                  }
                  let err;
                  clock2.duringTick = true;
                  clock2.now = timer.callAt;
                  try {
                    callTimer(clock2, timer);
                  } catch (e) {
                    err = e;
                  }
                  clock2.duringTick = false;
                  originalSetTimeout(function() {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(clock2.now);
                    }
                  });
                } catch (e) {
                  reject(e);
                }
              });
            });
          };
        }
        clock2.runAll = function runAll() {
          let numTimers, i;
          runJobs(clock2);
          for (i = 0; i < clock2.loopLimit; i++) {
            if (!clock2.timers) {
              resetIsNearInfiniteLimit();
              return clock2.now;
            }
            numTimers = Object.keys(clock2.timers).length;
            if (numTimers === 0) {
              resetIsNearInfiniteLimit();
              return clock2.now;
            }
            clock2.next();
            checkIsNearInfiniteLimit(clock2, i);
          }
          const excessJob = firstTimer(clock2);
          throw getInfiniteLoopError(clock2, excessJob);
        };
        clock2.runToFrame = function runToFrame() {
          return clock2.tick(getTimeToNextFrame());
        };
        if (typeof _global.Promise !== "undefined") {
          clock2.runAllAsync = function runAllAsync() {
            return new _global.Promise(function(resolve, reject) {
              let i = 0;
              function doRun() {
                originalSetTimeout(function() {
                  try {
                    runJobs(clock2);
                    let numTimers;
                    if (i < clock2.loopLimit) {
                      if (!clock2.timers) {
                        resetIsNearInfiniteLimit();
                        resolve(clock2.now);
                        return;
                      }
                      numTimers = Object.keys(
                        clock2.timers
                      ).length;
                      if (numTimers === 0) {
                        resetIsNearInfiniteLimit();
                        resolve(clock2.now);
                        return;
                      }
                      clock2.next();
                      i++;
                      doRun();
                      checkIsNearInfiniteLimit(clock2, i);
                      return;
                    }
                    const excessJob = firstTimer(clock2);
                    reject(getInfiniteLoopError(clock2, excessJob));
                  } catch (e) {
                    reject(e);
                  }
                });
              }
              doRun();
            });
          };
        }
        clock2.runToLast = function runToLast() {
          const timer = lastTimer(clock2);
          if (!timer) {
            runJobs(clock2);
            return clock2.now;
          }
          return clock2.tick(timer.callAt - clock2.now);
        };
        if (typeof _global.Promise !== "undefined") {
          clock2.runToLastAsync = function runToLastAsync() {
            return new _global.Promise(function(resolve, reject) {
              originalSetTimeout(function() {
                try {
                  const timer = lastTimer(clock2);
                  if (!timer) {
                    runJobs(clock2);
                    resolve(clock2.now);
                  }
                  resolve(clock2.tickAsync(timer.callAt - clock2.now));
                } catch (e) {
                  reject(e);
                }
              });
            });
          };
        }
        clock2.reset = function reset() {
          nanos = 0;
          clock2.timers = {};
          clock2.jobs = [];
          clock2.now = start;
        };
        clock2.setSystemTime = function setSystemTime(systemTime) {
          const newNow = getEpoch(systemTime);
          const difference = newNow - clock2.now;
          let id, timer;
          adjustedSystemTime[0] = adjustedSystemTime[0] + difference;
          adjustedSystemTime[1] = adjustedSystemTime[1] + nanos;
          clock2.now = newNow;
          nanos = 0;
          for (id in clock2.timers) {
            if (clock2.timers.hasOwnProperty(id)) {
              timer = clock2.timers[id];
              timer.createdAt += difference;
              timer.callAt += difference;
            }
          }
        };
        clock2.jump = function jump(tickValue) {
          const msFloat = typeof tickValue === "number" ? tickValue : parseTime(tickValue);
          const ms = Math.floor(msFloat);
          for (const timer of Object.values(clock2.timers)) {
            if (clock2.now + ms > timer.callAt) {
              timer.callAt = clock2.now + ms;
            }
          }
          clock2.tick(ms);
        };
        if (isPresent.performance) {
          clock2.performance = /* @__PURE__ */ Object.create(null);
          clock2.performance.now = fakePerformanceNow;
        }
        if (isPresent.hrtime) {
          clock2.hrtime = hrtime;
        }
        return clock2;
      }
      function install(config) {
        if (arguments.length > 1 || config instanceof Date || Array.isArray(config) || typeof config === "number") {
          throw new TypeError(
            `FakeTimers.install called with ${String(
              config
            )} install requires an object parameter`
          );
        }
        if (_global.Date.isFake === true) {
          throw new TypeError(
            "Can't install fake timers twice on the same global object."
          );
        }
        config = typeof config !== "undefined" ? config : {};
        config.shouldAdvanceTime = config.shouldAdvanceTime || false;
        config.advanceTimeDelta = config.advanceTimeDelta || 20;
        config.shouldClearNativeTimers = config.shouldClearNativeTimers || false;
        if (config.target) {
          throw new TypeError(
            "config.target is no longer supported. Use `withGlobal(target)` instead."
          );
        }
        function handleMissingTimer(timer) {
          if (config.ignoreMissingTimers) {
            return;
          }
          throw new ReferenceError(
            `non-existent timers and/or objects cannot be faked: '${timer}'`
          );
        }
        let i, l;
        const clock2 = createClock(config.now, config.loopLimit);
        clock2.shouldClearNativeTimers = config.shouldClearNativeTimers;
        clock2.uninstall = function() {
          return uninstall(clock2, config);
        };
        clock2.abortListenerMap = /* @__PURE__ */ new Map();
        clock2.methods = config.toFake || [];
        if (clock2.methods.length === 0) {
          clock2.methods = Object.keys(timers);
        }
        if (config.shouldAdvanceTime === true) {
          const intervalTick = doIntervalTick.bind(
            null,
            clock2,
            config.advanceTimeDelta
          );
          const intervalId = _global.setInterval(
            intervalTick,
            config.advanceTimeDelta
          );
          clock2.attachedInterval = intervalId;
        }
        if (clock2.methods.includes("performance")) {
          const proto = (() => {
            if (hasPerformanceConstructorPrototype) {
              return _global.performance.constructor.prototype;
            }
            if (hasPerformancePrototype) {
              return _global.Performance.prototype;
            }
          })();
          if (proto) {
            Object.getOwnPropertyNames(proto).forEach(function(name) {
              if (name !== "now") {
                clock2.performance[name] = name.indexOf("getEntries") === 0 ? NOOP_ARRAY : NOOP;
              }
            });
            clock2.performance.mark = (name) => new FakePerformanceEntry(name, "mark", 0, 0);
            clock2.performance.measure = (name) => new FakePerformanceEntry(name, "measure", 0, 100);
            clock2.performance.timeOrigin = getEpoch(config.now);
          } else if ((config.toFake || []).includes("performance")) {
            return handleMissingTimer("performance");
          }
        }
        if (_global === globalObject && timersModule) {
          clock2.timersModuleMethods = [];
        }
        if (_global === globalObject && timersPromisesModule) {
          clock2.timersPromisesModuleMethods = [];
        }
        for (i = 0, l = clock2.methods.length; i < l; i++) {
          const nameOfMethodToReplace = clock2.methods[i];
          if (!isPresent[nameOfMethodToReplace]) {
            handleMissingTimer(nameOfMethodToReplace);
            continue;
          }
          if (nameOfMethodToReplace === "hrtime") {
            if (_global.process && typeof _global.process.hrtime === "function") {
              hijackMethod(_global.process, nameOfMethodToReplace, clock2);
            }
          } else if (nameOfMethodToReplace === "nextTick") {
            if (_global.process && typeof _global.process.nextTick === "function") {
              hijackMethod(_global.process, nameOfMethodToReplace, clock2);
            }
          } else {
            hijackMethod(_global, nameOfMethodToReplace, clock2);
          }
          if (clock2.timersModuleMethods !== void 0 && timersModule[nameOfMethodToReplace]) {
            const original = timersModule[nameOfMethodToReplace];
            clock2.timersModuleMethods.push({
              methodName: nameOfMethodToReplace,
              original
            });
            timersModule[nameOfMethodToReplace] = _global[nameOfMethodToReplace];
          }
          if (clock2.timersPromisesModuleMethods !== void 0) {
            if (nameOfMethodToReplace === "setTimeout") {
              clock2.timersPromisesModuleMethods.push({
                methodName: "setTimeout",
                original: timersPromisesModule.setTimeout
              });
              timersPromisesModule.setTimeout = (delay, value, options = {}) => new Promise((resolve, reject) => {
                const abort = () => {
                  options.signal.removeEventListener(
                    "abort",
                    abort
                  );
                  clock2.abortListenerMap.delete(abort);
                  clock2.clearTimeout(handle);
                  reject(options.signal.reason);
                };
                const handle = clock2.setTimeout(() => {
                  if (options.signal) {
                    options.signal.removeEventListener(
                      "abort",
                      abort
                    );
                    clock2.abortListenerMap.delete(abort);
                  }
                  resolve(value);
                }, delay);
                if (options.signal) {
                  if (options.signal.aborted) {
                    abort();
                  } else {
                    options.signal.addEventListener(
                      "abort",
                      abort
                    );
                    clock2.abortListenerMap.set(
                      abort,
                      options.signal
                    );
                  }
                }
              });
            } else if (nameOfMethodToReplace === "setImmediate") {
              clock2.timersPromisesModuleMethods.push({
                methodName: "setImmediate",
                original: timersPromisesModule.setImmediate
              });
              timersPromisesModule.setImmediate = (value, options = {}) => new Promise((resolve, reject) => {
                const abort = () => {
                  options.signal.removeEventListener(
                    "abort",
                    abort
                  );
                  clock2.abortListenerMap.delete(abort);
                  clock2.clearImmediate(handle);
                  reject(options.signal.reason);
                };
                const handle = clock2.setImmediate(() => {
                  if (options.signal) {
                    options.signal.removeEventListener(
                      "abort",
                      abort
                    );
                    clock2.abortListenerMap.delete(abort);
                  }
                  resolve(value);
                });
                if (options.signal) {
                  if (options.signal.aborted) {
                    abort();
                  } else {
                    options.signal.addEventListener(
                      "abort",
                      abort
                    );
                    clock2.abortListenerMap.set(
                      abort,
                      options.signal
                    );
                  }
                }
              });
            } else if (nameOfMethodToReplace === "setInterval") {
              clock2.timersPromisesModuleMethods.push({
                methodName: "setInterval",
                original: timersPromisesModule.setInterval
              });
              timersPromisesModule.setInterval = (delay, value, options = {}) => ({
                [Symbol.asyncIterator]: () => {
                  const createResolvable = () => {
                    let resolve, reject;
                    const promise = new Promise((res, rej) => {
                      resolve = res;
                      reject = rej;
                    });
                    promise.resolve = resolve;
                    promise.reject = reject;
                    return promise;
                  };
                  let done = false;
                  let hasThrown = false;
                  let returnCall;
                  let nextAvailable = 0;
                  const nextQueue = [];
                  const handle = clock2.setInterval(() => {
                    if (nextQueue.length > 0) {
                      nextQueue.shift().resolve();
                    } else {
                      nextAvailable++;
                    }
                  }, delay);
                  const abort = () => {
                    options.signal.removeEventListener(
                      "abort",
                      abort
                    );
                    clock2.abortListenerMap.delete(abort);
                    clock2.clearInterval(handle);
                    done = true;
                    for (const resolvable of nextQueue) {
                      resolvable.resolve();
                    }
                  };
                  if (options.signal) {
                    if (options.signal.aborted) {
                      done = true;
                    } else {
                      options.signal.addEventListener(
                        "abort",
                        abort
                      );
                      clock2.abortListenerMap.set(
                        abort,
                        options.signal
                      );
                    }
                  }
                  return {
                    next: async () => {
                      if (options.signal?.aborted && !hasThrown) {
                        hasThrown = true;
                        throw options.signal.reason;
                      }
                      if (done) {
                        return { done: true, value: void 0 };
                      }
                      if (nextAvailable > 0) {
                        nextAvailable--;
                        return { done: false, value };
                      }
                      const resolvable = createResolvable();
                      nextQueue.push(resolvable);
                      await resolvable;
                      if (returnCall && nextQueue.length === 0) {
                        returnCall.resolve();
                      }
                      if (options.signal?.aborted && !hasThrown) {
                        hasThrown = true;
                        throw options.signal.reason;
                      }
                      if (done) {
                        return { done: true, value: void 0 };
                      }
                      return { done: false, value };
                    },
                    return: async () => {
                      if (done) {
                        return { done: true, value: void 0 };
                      }
                      if (nextQueue.length > 0) {
                        returnCall = createResolvable();
                        await returnCall;
                      }
                      clock2.clearInterval(handle);
                      done = true;
                      if (options.signal) {
                        options.signal.removeEventListener(
                          "abort",
                          abort
                        );
                        clock2.abortListenerMap.delete(abort);
                      }
                      return { done: true, value: void 0 };
                    }
                  };
                }
              });
            }
          }
        }
        return clock2;
      }
      return {
        timers,
        createClock,
        install,
        withGlobal
      };
    }
    var defaultImplementation = withGlobal(globalObject);
    exports.timers = defaultImplementation.timers;
    exports.createClock = defaultImplementation.createClock;
    exports.install = defaultImplementation.install;
    exports.withGlobal = withGlobal;
  }
});

// src/run-assertions/fake-timers.js
var fake_timers_exports = {};
__export(fake_timers_exports, {
  advanceTimersByTime: () => advanceTimersByTime,
  getTimerCallCount: () => getTimerCallCount,
  getTimerCalls: () => getTimerCalls,
  resetTimers: () => resetTimers,
  runAllTimers: () => runAllTimers,
  useFakeTimers: () => useFakeTimers,
  useRealTimers: () => useRealTimers
});
function useFakeTimers() {
  clock = import_fake_timers.default.install();
}
function useRealTimers() {
  if (clock) clock.uninstall();
  clock = null;
}
function advanceTimersByTime(ms) {
  if (clock) clock.tick(ms);
}
function runAllTimers() {
  if (clock) clock.runAll();
}
function resetTimers() {
  if (clock) clock.reset();
}
function getTimerCalls() {
  return clock ? clock.timers : null;
}
function getTimerCallCount() {
  return clock ? Object.keys(clock.timers).length : 0;
}
var import_fake_timers, clock;
var init_fake_timers = __esm({
  "src/run-assertions/fake-timers.js"() {
    "use strict";
    import_fake_timers = __toESM(require_fake_timers_src(), 1);
    clock = null;
  }
});

// src/matchers/spy.js
var spy_exports = {};
__export(spy_exports, {
  createMock: () => createMock,
  createSpy: () => createSpy,
  createStub: () => createStub,
  fn: () => fn,
  isSpy: () => isSpy,
  mock: () => mock,
  requireActual: () => requireActual,
  requireMock: () => requireMock,
  resetAllMocks: () => resetAllMocks,
  spy: () => spy,
  spyOn: () => spyOn,
  stub: () => stub,
  unmock: () => unmock
});
import { builtinModules } from "module";
function createSpy(fn2) {
  const spy3 = function(...args) {
    spy3.calls.push(args);
    spy3.callCount++;
    return fn2 ? fn2.apply(this, args) : void 0;
  };
  spy3.calls = [];
  spy3.callCount = 0;
  spy3.isSpy = true;
  spy3.restore = () => {
  };
  return spy3;
}
function isSpy(fn2) {
  return fn2 && fn2.isSpy;
}
function createStub(obj, methodName, impl) {
  if (!obj || typeof obj[methodName] !== "function") throw new Error("No such method to stub");
  const original = obj[methodName];
  const spy3 = createSpy(impl);
  obj[methodName] = spy3;
  spy3.restore = () => {
    obj[methodName] = original;
  };
  return spy3;
}
function createMock(modulePath, mockImpl) {
  const resolved = __require.resolve(modulePath);
  const original = __require.cache[resolved];
  __require.cache[resolved] = { ...original, exports: mockImpl };
  return {
    restore: () => {
      __require.cache[resolved] = original;
    }
  };
}
function fn(impl) {
  const mockFn = function(...args) {
    mockFn.mock.calls.push(args);
    mockFn.mock.instances.push(this);
    let result, threw = false, error;
    try {
      result = impl ? impl.apply(this, args) : void 0;
    } catch (e) {
      threw = true;
      error = e;
      throw e;
    } finally {
      mockFn.mock.results.push({ type: threw ? "throw" : "return", value: threw ? error : result });
    }
    return result;
  };
  mockFn.mock = { calls: [], instances: [], results: [] };
  return mockFn;
}
function spyOn(obj, methodName) {
  if (!obj || typeof obj[methodName] !== "function") throw new Error("No such method to spyOn");
  const original = obj[methodName];
  const spy3 = fn(original);
  obj[methodName] = spy3;
  spy3.restore = () => {
    obj[methodName] = original;
  };
  return spy3;
}
function autoMockExports(exports) {
  const mocked = {};
  for (const key of Object.keys(exports)) {
    if (typeof exports[key] === "function") {
      mocked[key] = fn();
    } else {
      mocked[key] = exports[key];
    }
  }
  return mocked;
}
function isBuiltinModule(modulePath) {
  return builtins.includes(modulePath) || builtins.includes(modulePath.replace(/^node:/, ""));
}
function mock(modulePath, mockImpl) {
  let resolved;
  if (isBuiltinModule(modulePath)) {
    resolved = modulePath;
    if (!_originalModules.has(resolved)) {
      _originalModules.set(resolved, __require(modulePath));
    }
    __require.cache[resolved] = { exports: mockImpl };
    _mockedModules.set(resolved, mockImpl);
    return { restore: () => unmock(modulePath) };
  } else {
    resolved = __require.resolve(modulePath);
  }
  if (!_originalModules.has(resolved)) {
    _originalModules.set(resolved, __require.cache[resolved]);
  }
  let mockExports;
  if (mockImpl === void 0) {
    const manualMockPath = findManualMock(resolved);
    if (manualMockPath) {
      mockExports = __require(manualMockPath);
    } else {
      const realExports = __require(resolved);
      mockExports = autoMockExports(realExports);
    }
  } else if (typeof mockImpl === "object" && !Array.isArray(mockImpl)) {
    const realExports = __require(resolved);
    mockExports = { ...realExports, ...mockImpl };
    for (const key of Object.keys(mockImpl)) {
      if (typeof mockImpl[key] === "function" && !mockImpl[key].mock) {
        mockExports[key] = fn(mockImpl[key]);
      }
    }
  } else {
    mockExports = mockImpl;
  }
  __require.cache[resolved] = { ...__require.cache[resolved], exports: mockExports };
  _mockedModules.set(resolved, mockExports);
  return {
    restore: () => unmock(modulePath)
  };
}
function unmock(modulePath) {
  const resolved = __require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    __require.cache[resolved] = _originalModules.get(resolved);
    _mockedModules.delete(resolved);
    _originalModules.delete(resolved);
  }
}
function resetAllMocks() {
  for (const resolved of _mockedModules.keys()) {
    if (_originalModules.has(resolved)) {
      __require.cache[resolved] = _originalModules.get(resolved);
    }
  }
  _mockedModules.clear();
  _originalModules.clear();
}
function requireActual(modulePath) {
  const resolved = __require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    return _originalModules.get(resolved).exports;
  }
  return __require(resolved);
}
function requireMock(modulePath) {
  const resolved = __require.resolve(modulePath);
  if (_mockedModules.has(resolved)) {
    return _mockedModules.get(resolved);
  }
  return __require(resolved);
}
var spy, stub, _mockedModules, _originalModules, builtins;
var init_spy = __esm({
  "src/matchers/spy.js"() {
    "use strict";
    spy = createSpy;
    stub = createStub;
    _mockedModules = /* @__PURE__ */ new Map();
    _originalModules = /* @__PURE__ */ new Map();
    builtins = builtinModules || [];
  }
});

// src/run-assertions/test-discovery.js
import fs from "fs/promises";
import path from "path";

// node_modules/is-empty-dir/index.mjs
var { readdir, stat } = __require("fs/promises");
var { readdirSync, statSync } = __require("fs");
async function isEmptyDir(dirPath, options = {}) {
  const { ignore = [], followSymlinks = false } = options;
  if (typeof dirPath !== "string") {
    throw new TypeError("Expected dirPath to be a string");
  }
  try {
    const stats = await stat(dirPath);
    if (!stats.isDirectory()) {
      throw new Error(`Path is not a directory: ${dirPath}`);
    }
    const files = await readdir(dirPath, { withFileTypes: true });
    for (const file of files) {
      if (!followSymlinks && file.isSymbolicLink()) {
        continue;
      }
      if (!shouldIgnore(file.name, ignore)) {
        return false;
      }
    }
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`Directory does not exist: ${dirPath}`);
    }
    if (error.code === "EACCES") {
      throw new Error(`Permission denied: ${dirPath}`);
    }
    throw error;
  }
}
function shouldIgnore(filename, ignorePatterns) {
  if (!Array.isArray(ignorePatterns)) {
    return false;
  }
  return ignorePatterns.some((pattern) => {
    if (typeof pattern === "string") {
      return filename === pattern;
    }
    if (pattern instanceof RegExp) {
      return pattern.test(filename);
    }
    if (typeof pattern === "function") {
      return pattern(filename);
    }
    return false;
  });
}
var is_empty_dir_default = isEmptyDir;

// src/run-assertions/test-discovery.js
async function findTestFiles({ dir, pattern, name }) {
  const empty = await is_empty_dir_default(dir, { ignore: [/^\./, "node_modules"] });
  if (empty) {
    console.warn(`No test files found in directory: ${dir}`);
    return [];
  }
  let testFiles = [];
  async function getFilesOfDir(currentDir) {
    const items = await fs.readdir(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat2 = await fs.stat(fullPath);
      if (stat2.isDirectory()) {
        await getFilesOfDir(fullPath);
      } else if ((!pattern || item.includes(pattern)) && (!name || item.includes(name))) {
        testFiles.push(fullPath);
      }
    }
  }
  await getFilesOfDir(dir);
  return testFiles;
}

// src/run-assertions/test-execution.js
var import_safe = __toESM(require_safe(), 1);
import os from "os";
import { Worker } from "worker_threads";
async function runTestFiles(testFiles, options = {}) {
  if (!testFiles.length) {
    console.log(import_safe.default.yellow("No test scripts found."));
    process.exit(0);
  }
  const maxWorkers = typeof options.parallel === "number" ? options.parallel : os.cpus().length;
  let completed = 0;
  let failed = 0;
  let running = 0;
  let idx = 0;
  const results = [];
  return new Promise((resolve) => {
    function runNext() {
      if (idx >= testFiles.length) return;
      const file = testFiles[idx++];
      running++;
      const env = { ...process.env };
      if (options.report) env.FAUJI_REPORT = options.report;
      const worker = new Worker(new URL("./worker-thread.js", import.meta.url), {
        workerData: { testFile: file, env }
      });
      worker.on("message", (msg) => {
        if (msg.type === "result") {
          console.log(import_safe.default.blue("\nTest result of " + file));
          if (msg.stdout) process.stdout.write(import_safe.default.green(msg.stdout));
          if (msg.stderr) process.stderr.write(import_safe.default.red(msg.stderr));
          if (msg.error) {
            console.log(import_safe.default.red("Test failed: " + msg.error));
            failed++;
          }
          completed++;
          running--;
          results.push({ file, error: msg.error });
          if (completed === testFiles.length) {
            if (options.report) {
              if (options.report === "html") console.log(import_safe.default.cyan("HTML report written to fauji-report.html"));
              if (options.report === "json") console.log(import_safe.default.cyan("HTML report written to fauji-report.json"));
            }
            if (failed > 0) {
              console.log(import_safe.default.red(`
${failed} test file(s) failed.`));
              process.exit(1);
            } else {
              console.log(import_safe.default.green("\nAll test files passed."));
              process.exit(0);
            }
            resolve(results);
          } else {
            runNext();
          }
        }
      });
      worker.on("error", (err) => {
        console.log(import_safe.default.red("Worker thread error: " + err.message));
        failed++;
        completed++;
        running--;
        results.push({ file, error: err.message });
        if (completed === testFiles.length) {
          resolve(results);
        } else {
          runNext();
        }
      });
      worker.on("exit", (code) => {
        if (code !== 0) {
          console.log(import_safe.default.red(`Worker stopped with exit code ${code}`));
        }
      });
    }
    for (let i = 0; i < Math.min(maxWorkers, testFiles.length); i++) {
      runNext();
    }
  });
}

// src/run-assertions/cache.js
import fs2 from "fs";
async function loadCache() {
  try {
    const data = fs2.readFileSync(".fauji-cache.json", "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}
async function saveCache(cache) {
  fs2.writeFileSync(".fauji-cache.json", JSON.stringify(cache, null, 2), "utf8");
}

// src/run-assertions/env-setup.js
import { JSDOM } from "jsdom";
function setupJsdomIfNeeded(options) {
  if (options.env === "jsdom") {
    const dom = new JSDOM("<!doctype html><html><body></body></html>");
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;
    global.HTMLElement = dom.window.HTMLElement;
    global.Node = dom.window.Node;
    global.Event = dom.window.Event;
    global.CustomEvent = dom.window.CustomEvent;
    global.getComputedStyle = dom.window.getComputedStyle;
  }
}

// src/run-assertions/runner.js
var runner_default = {
  findTestFiles,
  runTestFiles,
  loadCache,
  saveCache,
  setupJsdomIfNeeded
};

// src/index.js
init_logger();

// src/run-assertions/suite.js
var rootSuite = { desc: "root", suites: [], tests: [], hooks: { beforeAll: [], afterAll: [], beforeEach: [], afterEach: [] }, fixtures: {}, parent: null };

// src/run-assertions/registration.js
function describe(desc, optionsOrFn, maybeFn) {
  let options = {}, fn2;
  if (typeof optionsOrFn === "function") {
    fn2 = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn2 = maybeFn;
  }
  return _describe(desc, fn2, "normal", options.annotations);
}
describe.only = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn2;
  if (typeof optionsOrFn === "function") {
    fn2 = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn2 = maybeFn;
  }
  return _describe(desc, fn2, "only", options.annotations);
};
describe.skip = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn2;
  if (typeof optionsOrFn === "function") {
    fn2 = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn2 = maybeFn;
  }
  return _describe(desc, fn2, "skip", options.annotations);
};
function _describe(desc, fn2, mode, annotations) {
  const suite = new Suite(desc, mode, annotations || {});
  suite.parent = getCurrentSuite();
  getCurrentSuite().suites.push(suite);
  setCurrentSuite(suite);
  fn2();
  setCurrentSuite(suite.parent);
}
function test(desc, optionsOrFn, maybeFn) {
  let options = {}, fn2;
  if (typeof optionsOrFn === "function") {
    fn2 = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn2 = maybeFn;
  }
  return _test(desc, fn2, "normal", options);
}
test.only = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn2;
  if (typeof optionsOrFn === "function") {
    fn2 = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn2 = maybeFn;
  }
  return _test(desc, fn2, "only", options);
};
test.skip = (desc, optionsOrFn, maybeFn) => {
  let options = {}, fn2;
  if (typeof optionsOrFn === "function") {
    fn2 = optionsOrFn;
  } else {
    options = optionsOrFn || {};
    fn2 = maybeFn;
  }
  return _test(desc, fn2, "skip", options);
};
function _test(desc, fn2, mode, options) {
  getCurrentSuite().tests.push({
    desc,
    fn: fn2,
    mode,
    fixtures: options.fixtures || [],
    annotations: options.annotations || {}
  });
}

// src/run-assertions/hooks.js
var fakeTimers = (init_fake_timers(), __toCommonJS(fake_timers_exports));
var spy2 = (init_spy(), __toCommonJS(spy_exports));
function beforeAll(fn2) {
  rootSuite.hooks.beforeAll.push(fn2);
}
function afterAll(fn2) {
  rootSuite.hooks.afterAll.push(fn2);
}
function beforeEach(fn2) {
  rootSuite.hooks.beforeEach.push(fn2);
}
function afterEach(fn2) {
  rootSuite.hooks.afterEach.push(fn2);
}
rootSuite.hooks.afterEach.push(function() {
  if (typeof fakeTimers.resetTimers === "function") fakeTimers.resetTimers();
  if (typeof spy2.resetAllMocks === "function") spy2.resetAllMocks();
});

// src/run-assertions/runner-core.js
init_logger();

// src/matchers/equality.js
var equality_exports = {};
__export(equality_exports, {
  toBe: () => toBe,
  toBeCloseTo: () => toBeCloseTo,
  toBeNull: () => toBeNull,
  toBeUndefined: () => toBeUndefined,
  toEqual: () => toEqual
});

// src/matchers/utils.js
var utils_exports = {};
__export(utils_exports, {
  deepEqual: () => esm_default,
  formatDiff: () => formatDiff,
  getByPath: () => getByPath,
  getMatcherResult: () => getMatcherResult,
  hasByPath: () => hasByPath,
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isDate: () => isDate,
  isEmpty: () => isEmpty,
  isFunction: () => isFunction,
  isMatch: () => isMatch,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isValidEmail: () => isValidEmail,
  isValidJSON: () => isValidJSON,
  isValidURL: () => isValidURL,
  isValidUUID: () => isValidUUID,
  matchSchema: () => matchSchema
});
import util from "util";

// node_modules/deep-equal-check/dist/esm/core/deep-equal-core.js
function deepEqualCore(a, b, options, seen, depth) {
  if (depth > options.maxDepth)
    return false;
  if (a === b) {
    return !options.strictZero || (a !== 0 || 1 / a === 1 / b);
  }
  if (a !== a && b !== b)
    return options.nanEqual;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") {
    return false;
  }
  if (a.constructor !== b.constructor && options.checkPrototypes) {
    return false;
  }
  if (seen.has(a)) {
    return seen.get(a) === b;
  }
  seen.set(a, b);
  if (Array.isArray(a)) {
    const arrA = a;
    const arrB = b;
    const length = arrA.length;
    if (length !== arrB.length)
      return false;
    for (let i = length; i-- !== 0; ) {
      if (!deepEqualCore(arrA[i], arrB[i], options, seen, depth + 1)) {
        return false;
      }
    }
    return true;
  }
  if (a.constructor === RegExp) {
    const regexA = a;
    const regexB = b;
    return regexA.source === regexB.source && regexA.flags === regexB.flags;
  }
  if (a.constructor === Date) {
    const dateA = a;
    const dateB = b;
    return dateA.getTime() === dateB.getTime();
  }
  if (a.constructor === ArrayBuffer) {
    const bufA = a;
    const bufB = b;
    if (bufA.byteLength !== bufB.byteLength)
      return false;
    const viewA = new Uint8Array(bufA);
    const viewB = new Uint8Array(bufB);
    for (let i = 0; i < viewA.length; i++) {
      if (viewA[i] !== viewB[i])
        return false;
    }
    return true;
  }
  if (ArrayBuffer.isView(a)) {
    const arrA = a;
    const arrB = b;
    if (arrA.constructor !== arrB.constructor || arrA.length !== arrB.length) {
      return false;
    }
    for (let i = 0; i < arrA.length; i++) {
      const valA = arrA[i];
      const valB = arrB[i];
      if (valA !== valB) {
        if (!(options.nanEqual && typeof valA === "number" && typeof valB === "number" && Number.isNaN(valA) && Number.isNaN(valB))) {
          return false;
        }
      }
    }
    return true;
  }
  if (a.valueOf !== Object.prototype.valueOf) {
    return a.valueOf() === b.valueOf();
  }
  if (a.constructor === Error) {
    const errA = a;
    const errB = b;
    return errA.name === errB.name && errA.message === errB.message;
  }
  if (a.constructor === Set) {
    const setA = a;
    const setB = b;
    if (setA.size !== setB.size)
      return false;
    return compareSetOptimized(setA, setB, options, seen, depth);
  }
  if (a.constructor === Map) {
    const mapA = a;
    const mapB = b;
    if (mapA.size !== mapB.size)
      return false;
    return compareMapOptimized(mapA, mapB, options, seen, depth);
  }
  return compareObjectOptimized(a, b, options, seen, depth);
}
function compareSetOptimized(setA, setB, options, seen, depth) {
  if (setA.size <= 10) {
    const processedB2 = /* @__PURE__ */ new Set();
    for (const itemA of setA) {
      let found = false;
      let index = 0;
      for (const itemB of setB) {
        if (!processedB2.has(index)) {
          const newSeen = /* @__PURE__ */ new WeakMap();
          if (deepEqualCore(itemA, itemB, options, newSeen, depth + 1)) {
            processedB2.add(index);
            found = true;
            break;
          }
        }
        index++;
      }
      if (!found)
        return false;
    }
    return true;
  }
  const arrA = Array.from(setA);
  const arrB = Array.from(setB);
  if (arrA.length !== arrB.length)
    return false;
  const processedB = /* @__PURE__ */ new Set();
  for (let i = arrA.length; i-- !== 0; ) {
    let found = false;
    for (let j = arrB.length; j-- !== 0; ) {
      if (!processedB.has(j)) {
        const newSeen = /* @__PURE__ */ new WeakMap();
        if (deepEqualCore(arrA[i], arrB[j], options, newSeen, depth + 1)) {
          processedB.add(j);
          found = true;
          break;
        }
      }
    }
    if (!found)
      return false;
  }
  return true;
}
function compareMapOptimized(mapA, mapB, options, seen, depth) {
  for (const [keyA, valueA] of mapA) {
    let found = false;
    for (const [keyB, valueB] of mapB) {
      if (deepEqualCore(keyA, keyB, options, seen, depth + 1) && deepEqualCore(valueA, valueB, options, seen, depth + 1)) {
        found = true;
        break;
      }
    }
    if (!found)
      return false;
  }
  return true;
}
function compareObjectOptimized(objA, objB, options, seen, depth) {
  const keysA = Object.keys(objA);
  const length = keysA.length;
  if (length !== Object.keys(objB).length)
    return false;
  for (let i = length; i-- !== 0; ) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i])) {
      return false;
    }
  }
  for (let i = length; i-- !== 0; ) {
    const key = keysA[i];
    if (!deepEqualCore(objA[key], objB[key], options, seen, depth + 1)) {
      return false;
    }
  }
  return true;
}

// node_modules/deep-equal-check/dist/esm/index.js
function deepEqualCheck(a, b, options = {}) {
  const opts = {
    nanEqual: options.nanEqual ?? true,
    checkPrototypes: options.checkPrototypes ?? false,
    strictZero: options.strictZero ?? false,
    maxDepth: options.maxDepth ?? 1e3
  };
  return deepEqualCore(a, b, opts, /* @__PURE__ */ new WeakMap(), 0);
}
var esm_default = deepEqualCheck;

// src/matchers/utils.js
function isMatch(obj, partial) {
  if (typeof obj !== "object" || obj === null || typeof partial !== "object" || partial === null) return false;
  for (const key of Object.keys(partial)) {
    if (!(key in obj) || !esm_default(obj[key], partial[key])) return false;
  }
  return true;
}
function getByPath(obj, path2) {
  if (!Array.isArray(path2)) path2 = String(path2).split(".");
  return path2.reduce((acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0, obj);
}
function hasByPath(obj, path2) {
  if (!Array.isArray(path2)) path2 = String(path2).split(".");
  let cur = obj;
  for (const key of path2) {
    if (cur == null || !(key in cur)) return false;
    cur = cur[key];
  }
  return true;
}
function formatDiff(received, expected) {
  if (typeof received === "object" && typeof expected === "object") {
    return `
  Received: ${util.inspect(received, { depth: 5, colors: false })}
  Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
  }
  return "";
}
function getMatcherResult(result, matcherName, received, expected, isNot = false) {
  Promise.resolve().then(() => (init_logger(), logger_exports)).then(({ Logger: Logger2 }) => {
    const _log2 = new Logger2();
    if (!result) {
      const notText = isNot ? "not." : "";
      const err = new Error();
      const stackLines = (err.stack || "").split("\n");
      let testFrame = stackLines.find((l) => l.includes(".js") && !l.includes("matchers.js") && !l.includes("logger.js")) || stackLines[2] || "";
      let location = "";
      const match = testFrame.match(/\(([^)]+)\)/) || testFrame.match(/at ([^ ]+)/);
      if (match && match[1]) {
        location = match[1];
      }
      let codeFrame = "";
      if (location) {
        const [file, line, col] = location.split(/:|\//).slice(-3);
        try {
          const fs4 = __require("fs");
          const lines = fs4.readFileSync(location.split(":")[0], "utf8").split("\n");
          const lineNum = parseInt(line, 10) - 1;
          const start = Math.max(0, lineNum - 2);
          const end = Math.min(lines.length, lineNum + 3);
          codeFrame = lines.slice(start, end).map((l, i) => {
            const n = start + i + 1;
            return (n === lineNum + 1 ? "> " : "  ") + n.toString().padStart(3) + " | " + l;
          }).join("\n");
        } catch {
        }
      }
      let message = "";
      message += `
${location ? "at " + location : ""}`;
      if (codeFrame) message += `
${codeFrame}
`;
      message += `
Difference:`;
      if (typeof expected !== "undefined") {
        message += `
- Expected: ${util.inspect(expected, { depth: 5, colors: false })}`;
        message += `
+ Received: ${util.inspect(received, { depth: 5, colors: false })}`;
      } else {
        message += `
- Expected: ${notText}${matcherName}`;
        message += `
+ Received: ${util.inspect(received, { depth: 5, colors: false })}`;
      }
      if (["toEqual", "toMatchObject"].includes(matcherName) && typeof received === "object" && typeof expected === "object") {
        message += formatDiff(received, expected);
      }
      message += "\n";
      if (_log2.error) {
        _log2.error(message);
      } else {
        console.error(message);
      }
    } else {
      _log2.status(result);
    }
  });
  return result;
}
function isArray(val) {
  return Array.isArray(val);
}
function isObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val) && !(val instanceof Date) && !(val instanceof RegExp);
}
function isString(val) {
  return typeof val === "string";
}
function isNumber(val) {
  return typeof val === "number" && !isNaN(val);
}
function isBoolean(val) {
  return typeof val === "boolean";
}
function isFunction(val) {
  return typeof val === "function";
}
function isDate(val) {
  return val instanceof Date;
}
function isRegExp(val) {
  return val instanceof RegExp;
}
function isEmpty(val) {
  if (val == null) return true;
  if (typeof val === "string" || Array.isArray(val)) return val.length === 0;
  if (val instanceof Map || val instanceof Set) return val.size === 0;
  if (typeof val === "object") return Object.keys(val).length === 0;
  return false;
}
function isValidJSON(val) {
  if (typeof val !== "string") return false;
  try {
    JSON.parse(val);
    return true;
  } catch {
    return false;
  }
}
function isValidURL(val) {
  try {
    new URL(val);
    return true;
  } catch {
    return false;
  }
}
function isValidEmail(val) {
  return typeof val === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val);
}
function isValidUUID(val) {
  return typeof val === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val);
}
function matchSchema(obj, schema) {
  if (typeof schema !== "object" || schema === null) return false;
  for (const key in schema) {
    if (!(key in obj)) return false;
    const type = schema[key];
    if (typeof type === "string") {
      if (typeof obj[key] !== type) return false;
    } else if (typeof type === "function") {
      if (!(obj[key] instanceof type)) return false;
    } else if (typeof type === "object") {
      if (!matchSchema(obj[key], type)) return false;
    }
  }
  return true;
}

// src/matchers/equality.js
function toBe(received, expected) {
  return getMatcherResult(received === expected, "toBe", received, expected);
}
function toEqual(received, expected) {
  return getMatcherResult(esm_default(received, expected), "toEqual", received, expected);
}
function toBeNull(received) {
  return getMatcherResult(received === null, "toBeNull", received);
}
function toBeUndefined(received) {
  return getMatcherResult(received === void 0, "toBeUndefined", received);
}
function toBeCloseTo(received, expected) {
  return getMatcherResult(Math.round(expected) === Math.round(received), "toBeCloseTo", received, expected);
}

// src/matchers/type.js
var type_exports = {};
__export(type_exports, {
  toBeArray: () => toBeArray,
  toBeBoolean: () => toBeBoolean,
  toBeDate: () => toBeDate,
  toBeFunction: () => toBeFunction,
  toBeNumber: () => toBeNumber,
  toBeObject: () => toBeObject,
  toBeRegExp: () => toBeRegExp,
  toBeString: () => toBeString
});
function toBeArray(received) {
  return getMatcherResult(isArray(received), "toBeArray", received);
}
function toBeObject(received) {
  return getMatcherResult(isObject(received), "toBeObject", received);
}
function toBeString(received) {
  return getMatcherResult(isString(received), "toBeString", received);
}
function toBeNumber(received) {
  return getMatcherResult(isNumber(received), "toBeNumber", received);
}
function toBeBoolean(received) {
  return getMatcherResult(isBoolean(received), "toBeBoolean", received);
}
function toBeFunction(received) {
  return getMatcherResult(isFunction(received), "toBeFunction", received);
}
function toBeDate(received) {
  return getMatcherResult(isDate(received), "toBeDate", received);
}
function toBeRegExp(received) {
  return getMatcherResult(isRegExp(received), "toBeRegExp", received);
}

// src/matchers/string.js
var string_exports = {};
__export(string_exports, {
  toContain: () => toContain,
  toMatch: () => toMatch
});
function toMatch(received, expected) {
  return getMatcherResult(typeof received === "string" && (expected instanceof RegExp ? expected.test(received) : received.includes(expected)), "toMatch", received, expected);
}
function toContain(received, expected) {
  let result;
  if (typeof received === "string") {
    result = received.indexOf(String(expected)) !== -1;
  } else if (Array.isArray(received)) {
    result = received.indexOf(expected) !== -1;
  } else {
    result = false;
  }
  return getMatcherResult(result, "toContain", received, expected);
}

// src/matchers/object.js
var object_exports = {};
__export(object_exports, {
  toHaveProperty: () => toHaveProperty,
  toMatchObject: () => toMatchObject
});
function toMatchObject(received, expected) {
  return getMatcherResult(isMatch(received, expected), "toMatchObject", received, expected);
}
function toHaveProperty(received, key, value) {
  const has = hasByPath(received, key);
  const val = getByPath(received, key);
  return getMatcherResult(has && (arguments.length < 3 || esm_default(val, value)), "toHaveProperty", received, key);
}

// src/matchers/number.js
var number_exports = {};
__export(number_exports, {
  toBeGreaterThan: () => toBeGreaterThan,
  toBeGreaterThanOrEqual: () => toBeGreaterThanOrEqual,
  toBeLessThan: () => toBeLessThan,
  toBeLessThanOrEqual: () => toBeLessThanOrEqual
});
function toBeGreaterThan(received, expected) {
  return getMatcherResult(isNumber(received) && received > expected, "toBeGreaterThan", received, expected);
}
function toBeGreaterThanOrEqual(received, expected) {
  return getMatcherResult(isNumber(received) && received >= expected, "toBeGreaterThanOrEqual", received, expected);
}
function toBeLessThan(received, expected) {
  return getMatcherResult(isNumber(received) && received < expected, "toBeLessThan", received, expected);
}
function toBeLessThanOrEqual(received, expected) {
  return getMatcherResult(isNumber(received) && received <= expected, "toBeLessThanOrEqual", received, expected);
}

// src/matchers/spyMatchers.js
var spyMatchers_exports = {};
__export(spyMatchers_exports, {
  toHaveBeenCalled: () => toHaveBeenCalled,
  toHaveBeenCalledTimes: () => toHaveBeenCalledTimes,
  toHaveBeenCalledWith: () => toHaveBeenCalledWith
});
init_spy();
function toHaveBeenCalled(received) {
  return getMatcherResult(isSpy(received) && received.callCount > 0, "toHaveBeenCalled", received);
}
function toHaveBeenCalledWith(received, ...args) {
  return getMatcherResult(isSpy(received) && received.calls.some((call) => esm_default(call, args)), "toHaveBeenCalledWith", received, args);
}
function toHaveBeenCalledTimes(received, times) {
  return getMatcherResult(isSpy(received) && received.callCount === times, "toHaveBeenCalledTimes", received, times);
}

// src/matchers/async.js
var async_exports = {};
__export(async_exports, {
  toReject: () => toReject,
  toResolve: () => toResolve
});
async function toResolve(received) {
  try {
    await received;
    return getMatcherResult(true, "toResolve", received);
  } catch {
    return getMatcherResult(false, "toResolve", received);
  }
}
async function toReject(received) {
  try {
    await received;
    return getMatcherResult(false, "toReject", received);
  } catch {
    return getMatcherResult(true, "toReject", received);
  }
}

// src/matchers/schema.js
var schema_exports = {};
__export(schema_exports, {
  toMatchSchema: () => toMatchSchema
});
function toMatchSchema(received, schema) {
  return getMatcherResult(matchSchema(received, schema), "toMatchSchema", received, schema);
}

// src/matchers/empty.js
var empty_exports = {};
__export(empty_exports, {
  toBeEmpty: () => toBeEmpty
});
function toBeEmpty(received) {
  return getMatcherResult(isEmpty(received), "toBeEmpty", received);
}

// src/matchers/validation.js
var validation_exports = {};
__export(validation_exports, {
  toBeValidEmail: () => toBeValidEmail,
  toBeValidJSON: () => toBeValidJSON,
  toBeValidURL: () => toBeValidURL,
  toBeValidUUID: () => toBeValidUUID
});
function toBeValidJSON(received) {
  return getMatcherResult(isValidJSON(received), "toBeValidJSON", received);
}
function toBeValidURL(received) {
  return getMatcherResult(isValidURL(received), "toBeValidURL", received);
}
function toBeValidEmail(received) {
  return getMatcherResult(isValidEmail(received), "toBeValidEmail", received);
}
function toBeValidUUID(received) {
  return getMatcherResult(isValidUUID(received), "toBeValidUUID", received);
}

// src/matchers/satisfy.js
var satisfy_exports = {};
__export(satisfy_exports, {
  toSatisfy: () => toSatisfy
});
function toSatisfy(received, predicate) {
  return getMatcherResult(typeof predicate === "function" && predicate(received), "toSatisfy", received, predicate);
}

// src/matchers/throw.js
var throw_exports = {};
__export(throw_exports, {
  toThrow: () => toThrow
});
function toThrow(received, expected) {
  let threw = false;
  let error;
  try {
    if (typeof received === "function") {
      received();
    } else if (received && typeof received.then === "function") {
      return received.then(
        () => getMatcherResult(false, "toThrow", received, expected),
        (err) => {
          if (!expected) return getMatcherResult(true, "toThrow", received, expected);
          if (typeof expected === "string") return getMatcherResult(err && err.message && err.message.includes(expected), "toThrow", received, expected);
          if (expected instanceof RegExp) return getMatcherResult(expected.test(err && err.message), "toThrow", received, expected);
          if (typeof expected === "function") return getMatcherResult(err instanceof expected, "toThrow", received, expected);
          return getMatcherResult(false, "toThrow", received, expected);
        }
      );
    }
  } catch (err) {
    threw = true;
    error = err;
  }
  if (!threw) return getMatcherResult(false, "toThrow", received, expected);
  if (!expected) return getMatcherResult(true, "toThrow", received, expected);
  if (typeof expected === "string") return getMatcherResult(error && error.message && error.message.includes(expected), "toThrow", received, expected);
  if (expected instanceof RegExp) return getMatcherResult(expected.test(error && error.message), "toThrow", received, expected);
  if (typeof expected === "function") return getMatcherResult(error instanceof expected, "toThrow", received, expected);
  return getMatcherResult(false, "toThrow", received, expected);
}

// src/matchers/length.js
var length_exports = {};
__export(length_exports, {
  toHaveLength: () => toHaveLength
});
function toHaveLength(received, expected) {
  return getMatcherResult(received && received.length == expected, "toHaveLength", received, expected);
}

// src/matchers/index.js
var customMatchers = {};
function addMatchers(matchers) {
  Object.assign(customMatchers, matchers);
}
function allMatchers(received) {
  const builtIn = {
    ...equality_exports,
    ...type_exports,
    ...string_exports,
    ...object_exports,
    ...number_exports,
    ...spyMatchers_exports,
    ...async_exports,
    ...schema_exports,
    ...empty_exports,
    ...validation_exports,
    ...satisfy_exports,
    ...throw_exports,
    ...length_exports,
    ...utils_exports
  };
  const matchers = { ...builtIn, ...customMatchers };
  const proxy = {};
  for (const key of Object.keys(matchers)) {
    proxy[key] = (...args) => matchers[key](received, ...args);
  }
  proxy.not = {};
  for (const key of Object.keys(matchers)) {
    proxy.not[key] = (...args) => !matchers[key](received, ...args);
  }
  return proxy;
}
var matchers_default = {
  ...equality_exports,
  ...type_exports,
  ...string_exports,
  ...object_exports,
  ...number_exports,
  ...spyMatchers_exports,
  ...async_exports,
  ...schema_exports,
  ...empty_exports,
  ...validation_exports,
  ...satisfy_exports,
  ...throw_exports,
  ...length_exports,
  ...utils_exports,
  addMatchers,
  allMatchers
};

// src/run-assertions/runner-core.js
var _log = new Logger();
function filterOnlySuites(suite) {
  const onlySuites = suite.suites.filter((s) => s.mode === "only" || hasOnly(s));
  const onlyTests = suite.tests.filter((t) => t.mode === "only");
  if (onlySuites.length || onlyTests.length) {
    suite.suites = onlySuites;
    suite.tests = onlyTests;
    suite.suites.forEach(filterOnlySuites);
  } else {
    suite.suites.forEach(filterOnlySuites);
  }
}
function hasOnly(suite) {
  if (suite.mode === "only") return true;
  if (suite.tests.some((t) => t.mode === "only")) return true;
  return suite.suites.some(hasOnly);
}
async function resolveFixtures(test2, suite) {
  const fixtures = {};
  let current = suite;
  while (current) {
    Object.assign(fixtures, current.fixtures);
    current = current.parent;
  }
  const resolved = [];
  const teardowns = [];
  for (const name of test2.fixtures || []) {
    if (!fixtures[name]) throw new Error(`Fixture not found: ${name}`);
    const result = await fixtures[name]();
    if (result && typeof result === "object" && "value" in result) {
      resolved.push(result.value);
      if (typeof result.teardown === "function") teardowns.push(result.teardown);
    } else {
      resolved.push(result);
    }
  }
  return { resolved, teardowns };
}
async function runSuite(suite) {
  if (suite.mode === "skip") return;
  _log.perceive("describe", suite.desc, suite.annotations);
  for (const fn2 of suite.hooks.beforeAll) await fn2();
  for (const test2 of suite.tests) {
    if (test2.mode === "skip") {
      _log.perceive("test", test2.desc + " (skipped)", test2.annotations);
      _log.status(true, null, true);
      continue;
    }
    for (const fn2 of suite.hooks.beforeEach) await fn2();
    let teardowns = [];
    try {
      _log.perceive("test", test2.desc, test2.annotations);
      const { resolved, teardowns: tds } = await resolveFixtures(test2, suite);
      teardowns = tds;
      const maybePromise = test2.fn(...resolved);
      if (maybePromise && typeof maybePromise.then === "function") {
        await maybePromise;
      }
      _log.status(true);
    } catch (e) {
      _log.status(false, e);
    }
    for (const td of teardowns) {
      try {
        const maybePromise = td();
        if (maybePromise && typeof maybePromise.then === "function") {
          await maybePromise;
        }
      } catch (e) {
      }
    }
    for (const fn2 of suite.hooks.afterEach) await fn2();
  }
  for (const child of suite.suites) {
    await runSuite(child);
  }
  for (const fn2 of suite.hooks.afterAll) await fn2();
  _log.suiteStack.pop();
}
function run() {
  _log.startTimer();
  if (hasOnly(rootSuite)) {
    filterOnlySuites(rootSuite);
  }
  (async () => {
    for (const suite of rootSuite.suites) {
      await runSuite(suite);
    }
    _log.printSummary();
    if (process.env.FAUJI_REPORT || global.FAUJI_REPORT) {
      const type = process.env.FAUJI_REPORT || global.FAUJI_REPORT;
      const fs4 = await import("fs");
      if (type === "html") {
        fs4.writeFileSync("fauji-report.html", _log.getResultsHTML(), "utf8");
        console.log("HTML report written to fauji-report.html");
      } else if (type === "json") {
        fs4.writeFileSync("fauji-report.json", JSON.stringify(_log.getResultsJSON(), null, 2), "utf8");
        console.log("JSON report written to fauji-report.json");
      }
    }
    if (_log.failed > 0) {
      process.exitCode = 1;
    }
  })();
}

// src/run-assertions/setup-globals.js
init_fake_timers();
init_spy();
function setupGlobals() {
  global.describe = describe;
  global.test = test;
  global.beforeAll = beforeAll;
  global.afterAll = afterAll;
  global.beforeEach = beforeEach;
  global.afterEach = afterEach;
  global.expect = allMatchers;
  global.run = run;
  global.addMatchers = addMatchers;
  global.describe.only = describe.only;
  global.describe.skip = describe.skip;
  global.test.only = test.only;
  global.test.skip = test.skip;
  global.useFakeTimers = useFakeTimers;
  global.useRealTimers = useRealTimers;
  global.advanceTimersByTime = advanceTimersByTime;
  global.runAllTimers = runAllTimers;
  global.resetTimers = resetTimers;
  global.fn = fn;
  global.spyOn = spyOn;
  global.mock = mock;
  global.unmock = unmock;
  global.resetAllMocks = resetAllMocks;
  global.requireActual = requireActual;
  global.requireMock = requireMock;
  global.getTimerCalls = getTimerCalls;
  global.getTimerCallCount = getTimerCallCount;
}
var setup_globals_default = setupGlobals;
async function cliAutoRun() {
  if (process.argv[1] && process.argv[1].endsWith("setup-globals.js") && process.argv[2]) {
    setupGlobals();
    const testFile = process.argv[2];
    await import(new URL(testFile, `file://${process.cwd()}/`).href);
    run();
  }
}
if (typeof process !== "undefined" && process.argv && process.argv[1] && process.argv[1].endsWith("setup-globals.js")) {
  cliAutoRun();
}

// src/index.js
init_spy();
export {
  Logger,
  addMatchers,
  allMatchers,
  mock,
  run,
  runner_default as runner,
  setup_globals_default as setupGlobals,
  spy,
  stub
};
//# sourceMappingURL=index.mjs.map
