var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn2, res) => function __init() {
  return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/is-empty-dir/index.js
var require_is_empty_dir = __commonJS({
  "node_modules/is-empty-dir/index.js"(exports2, module2) {
    var { readdir, stat } = require("fs/promises");
    var { readdirSync, statSync } = require("fs");
    async function isEmptyDir2(dirPath, options = {}) {
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
    function isEmptyDirSync(dirPath, options = {}) {
      const { ignore = [], followSymlinks = false } = options;
      if (typeof dirPath !== "string") {
        throw new TypeError("Expected dirPath to be a string");
      }
      try {
        const stats = statSync(dirPath);
        if (!stats.isDirectory()) {
          throw new Error(`Path is not a directory: ${dirPath}`);
        }
        const files = readdirSync(dirPath, { withFileTypes: true });
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
    module2.exports = isEmptyDir2;
    module2.exports.isEmptyDir = isEmptyDir2;
    module2.exports.isEmptyDirSync = isEmptyDirSync;
    module2.exports.default = isEmptyDir2;
  }
});

// src/run-assertions/test-discovery.js
var test_discovery_exports = {};
async function findTestFiles({ dir, pattern, name }) {
  const empty2 = await isEmptyDir(dir, { ignore: [/^\./, "node_modules"] });
  if (empty2) {
    console.warn(`No test files found in directory: ${dir}`);
    return [];
  }
  let testFiles = [];
  async function getFilesOfDir(currentDir) {
    const items = await fs.readdir(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await getFilesOfDir(fullPath);
      } else if ((!pattern || item.includes(pattern)) && (!name || item.includes(name))) {
        testFiles.push(fullPath);
      }
    }
  }
  await getFilesOfDir(dir);
  return testFiles;
}
var fs, path, isEmptyDir;
var init_test_discovery = __esm({
  "src/run-assertions/test-discovery.js"() {
    fs = require("fs").promises;
    path = require("path");
    isEmptyDir = require_is_empty_dir();
    module.exports = { findTestFiles };
  }
});

// node_modules/colors/lib/styles.js
var require_styles = __commonJS({
  "node_modules/colors/lib/styles.js"(exports2, module2) {
    var styles = {};
    module2["exports"] = styles;
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
  "node_modules/colors/lib/system/has-flag.js"(exports2, module2) {
    "use strict";
    module2.exports = function(flag, argv) {
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
  "node_modules/colors/lib/system/supports-colors.js"(exports2, module2) {
    "use strict";
    var os2 = require("os");
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
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/colors/lib/custom/trap.js
var require_trap = __commonJS({
  "node_modules/colors/lib/custom/trap.js"(exports2, module2) {
    module2["exports"] = function runTheTrap(text, options) {
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
  "node_modules/colors/lib/custom/zalgo.js"(exports2, module2) {
    module2["exports"] = function zalgo(text, options) {
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
  "node_modules/colors/lib/maps/america.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      return function(letter, i, exploded) {
        if (letter === " ") return letter;
        switch (i % 3) {
          case 0:
            return colors.red(letter);
          case 1:
            return colors.white(letter);
          case 2:
            return colors.blue(letter);
        }
      };
    };
  }
});

// node_modules/colors/lib/maps/zebra.js
var require_zebra = __commonJS({
  "node_modules/colors/lib/maps/zebra.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors.inverse(letter);
      };
    };
  }
});

// node_modules/colors/lib/maps/rainbow.js
var require_rainbow = __commonJS({
  "node_modules/colors/lib/maps/rainbow.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
      return function(letter, i, exploded) {
        if (letter === " ") {
          return letter;
        } else {
          return colors[rainbowColors[i++ % rainbowColors.length]](letter);
        }
      };
    };
  }
});

// node_modules/colors/lib/maps/random.js
var require_random = __commonJS({
  "node_modules/colors/lib/maps/random.js"(exports2, module2) {
    module2["exports"] = function(colors) {
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
        return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
      };
    };
  }
});

// node_modules/colors/lib/colors.js
var require_colors = __commonJS({
  "node_modules/colors/lib/colors.js"(exports2, module2) {
    var colors = {};
    module2["exports"] = colors;
    colors.themes = {};
    var util2 = require("util");
    var ansiStyles = colors.styles = require_styles();
    var defineProps = Object.defineProperties;
    var newLineRegex = new RegExp(/[\r\n]+/g);
    colors.supportsColor = require_supports_colors().supportsColor;
    if (typeof colors.enabled === "undefined") {
      colors.enabled = colors.supportsColor() !== false;
    }
    colors.enable = function() {
      colors.enabled = true;
    };
    colors.disable = function() {
      colors.enabled = false;
    };
    colors.stripColors = colors.strip = function(str) {
      return ("" + str).replace(/\x1B\[\d+m/g, "");
    };
    var stylize = colors.stylize = function stylize2(str, style) {
      if (!colors.enabled) {
        return str + "";
      }
      var styleMap = ansiStyles[style];
      if (!styleMap && style in colors) {
        return colors[style](str);
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
    var proto = defineProps(function colors2() {
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
      if (!colors.enabled || !str) {
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
    colors.setTheme = function(theme) {
      if (typeof theme === "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var style in theme) {
        (function(style2) {
          colors[style2] = function(str) {
            if (typeof theme[style2] === "object") {
              var out = str;
              for (var i in theme[style2]) {
                out = colors[theme[style2][i]](out);
              }
              return out;
            }
            return colors[theme[style2]](str);
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
    colors.trap = require_trap();
    colors.zalgo = require_zalgo();
    colors.maps = {};
    colors.maps.america = require_america()(colors);
    colors.maps.zebra = require_zebra()(colors);
    colors.maps.rainbow = require_rainbow()(colors);
    colors.maps.random = require_random()(colors);
    for (map in colors.maps) {
      (function(map2) {
        colors[map2] = function(str) {
          return sequencer(colors.maps[map2], str);
        };
      })(map);
    }
    var map;
    defineProps(colors, init());
  }
});

// node_modules/colors/safe.js
var require_safe = __commonJS({
  "node_modules/colors/safe.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = colors;
  }
});

// src/run-assertions/test-execution.js
var test_execution_exports = {};
async function runTestFiles(testFiles, options = {}) {
  if (!testFiles.length) {
    console.log(_colors.yellow("No test scripts found."));
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
      const worker = new Worker(require.resolve("../src/run-assertions/worker-thread.js"), {
        workerData: { testFile: file, env }
      });
      worker.on("message", (msg) => {
        if (msg.type === "result") {
          console.log(_colors.blue("\nTest result of " + file));
          if (msg.stdout) process.stdout.write(_colors.green(msg.stdout));
          if (msg.stderr) process.stderr.write(_colors.red(msg.stderr));
          if (msg.error) {
            console.log(_colors.red("Test failed: " + msg.error));
            failed++;
          }
          completed++;
          running--;
          results.push({ file, error: msg.error });
          if (completed === testFiles.length) {
            if (options.report) {
              if (options.report === "html") console.log(_colors.cyan("HTML report written to fauji-report.html"));
              if (options.report === "json") console.log(_colors.cyan("HTML report written to fauji-report.json"));
            }
            if (failed > 0) {
              console.log(_colors.red(`
${failed} test file(s) failed.`));
              process.exit(1);
            } else {
              console.log(_colors.green("\nAll test files passed."));
              process.exit(0);
            }
            resolve(results);
          } else {
            runNext();
          }
        }
      });
      worker.on("error", (err) => {
        console.log(_colors.red("Worker thread error: " + err.message));
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
          console.log(_colors.red(`Worker stopped with exit code ${code}`));
        }
      });
    }
    for (let i = 0; i < Math.min(maxWorkers, testFiles.length); i++) {
      runNext();
    }
  });
}
var _colors, os, Worker;
var init_test_execution = __esm({
  "src/run-assertions/test-execution.js"() {
    _colors = require_safe();
    os = require("os");
    ({ Worker } = require("worker_threads"));
    module.exports = {
      runTestFiles
    };
  }
});

// src/run-assertions/cache.js
var cache_exports = {};
async function loadCache() {
  try {
    await fs2.access(CACHE_FILE);
    const data = await fs2.readFile(CACHE_FILE, "utf8");
    return JSON.parse(data);
  } catch (e) {
  }
  return {};
}
async function saveCache(cache) {
  try {
    await fs2.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (e) {
  }
}
var fs2, path2, CACHE_FILE;
var init_cache = __esm({
  "src/run-assertions/cache.js"() {
    fs2 = require("fs").promises;
    path2 = require("path");
    CACHE_FILE = path2.join(process.cwd(), ".fauji-cache.json");
    module.exports = { loadCache, saveCache };
  }
});

// src/run-assertions/env-setup.js
var env_setup_exports = {};
function setupJsdomIfNeeded(options) {
  if (options.env === "jsdom") {
    try {
      const { JSDOM } = require("jsdom");
      const dom = new JSDOM("<!doctype html><html><body></body></html>");
      global.window = dom.window;
      global.document = dom.window.document;
      global.navigator = dom.window.navigator;
      Object.getOwnPropertyNames(dom.window).forEach((prop) => {
        if (!(prop in global)) {
          global[prop] = dom.window[prop];
        }
      });
      console.log("jsdom environment set up.");
    } catch (e) {
      console.error("jsdom is not installed. Run `npm install jsdom` to use the jsdom environment.");
      process.exit(1);
    }
  }
}
var init_env_setup = __esm({
  "src/run-assertions/env-setup.js"() {
    module.exports = { setupJsdomIfNeeded };
  }
});

// src/run-assertions/runner.js
var runner_exports = {};
var findTestFiles2, runTestFiles2, loadCache2, saveCache2, setupJsdomIfNeeded2;
var init_runner = __esm({
  "src/run-assertions/runner.js"() {
    ({ findTestFiles: findTestFiles2 } = (init_test_discovery(), __toCommonJS(test_discovery_exports)));
    ({ runTestFiles: runTestFiles2 } = (init_test_execution(), __toCommonJS(test_execution_exports)));
    ({ loadCache: loadCache2, saveCache: saveCache2 } = (init_cache(), __toCommonJS(cache_exports)));
    ({ setupJsdomIfNeeded: setupJsdomIfNeeded2 } = (init_env_setup(), __toCommonJS(env_setup_exports)));
  }
});

// node_modules/diff/libcjs/diff/base.js
var require_base = __commonJS({
  "node_modules/diff/libcjs/diff/base.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var Diff = (
      /** @class */
      function() {
        function Diff2() {
        }
        Diff2.prototype.diff = function(oldStr, newStr, options) {
          if (options === void 0) {
            options = {};
          }
          var callback;
          if (typeof options === "function") {
            callback = options;
            options = {};
          } else if ("callback" in options) {
            callback = options.callback;
          }
          var oldString = this.castInput(oldStr, options);
          var newString = this.castInput(newStr, options);
          var oldTokens = this.removeEmpty(this.tokenize(oldString, options));
          var newTokens = this.removeEmpty(this.tokenize(newString, options));
          return this.diffWithOptionsObj(oldTokens, newTokens, options, callback);
        };
        Diff2.prototype.diffWithOptionsObj = function(oldTokens, newTokens, options, callback) {
          var _this = this;
          var _a;
          var done = function(value) {
            value = _this.postProcess(value, options);
            if (callback) {
              setTimeout(function() {
                callback(value);
              }, 0);
              return void 0;
            } else {
              return value;
            }
          };
          var newLen = newTokens.length, oldLen = oldTokens.length;
          var editLength = 1;
          var maxEditLength = newLen + oldLen;
          if (options.maxEditLength != null) {
            maxEditLength = Math.min(maxEditLength, options.maxEditLength);
          }
          var maxExecutionTime = (_a = options.timeout) !== null && _a !== void 0 ? _a : Infinity;
          var abortAfterTimestamp = Date.now() + maxExecutionTime;
          var bestPath = [{ oldPos: -1, lastComponent: void 0 }];
          var newPos = this.extractCommon(bestPath[0], newTokens, oldTokens, 0, options);
          if (bestPath[0].oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
            return done(this.buildValues(bestPath[0].lastComponent, newTokens, oldTokens));
          }
          var minDiagonalToConsider = -Infinity, maxDiagonalToConsider = Infinity;
          var execEditLength = function() {
            for (var diagonalPath = Math.max(minDiagonalToConsider, -editLength); diagonalPath <= Math.min(maxDiagonalToConsider, editLength); diagonalPath += 2) {
              var basePath = void 0;
              var removePath = bestPath[diagonalPath - 1], addPath = bestPath[diagonalPath + 1];
              if (removePath) {
                bestPath[diagonalPath - 1] = void 0;
              }
              var canAdd = false;
              if (addPath) {
                var addPathNewPos = addPath.oldPos - diagonalPath;
                canAdd = addPath && 0 <= addPathNewPos && addPathNewPos < newLen;
              }
              var canRemove = removePath && removePath.oldPos + 1 < oldLen;
              if (!canAdd && !canRemove) {
                bestPath[diagonalPath] = void 0;
                continue;
              }
              if (!canRemove || canAdd && removePath.oldPos < addPath.oldPos) {
                basePath = _this.addToPath(addPath, true, false, 0, options);
              } else {
                basePath = _this.addToPath(removePath, false, true, 1, options);
              }
              newPos = _this.extractCommon(basePath, newTokens, oldTokens, diagonalPath, options);
              if (basePath.oldPos + 1 >= oldLen && newPos + 1 >= newLen) {
                return done(_this.buildValues(basePath.lastComponent, newTokens, oldTokens)) || true;
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
              var ret = execEditLength();
              if (ret) {
                return ret;
              }
            }
          }
        };
        Diff2.prototype.addToPath = function(path4, added, removed, oldPosInc, options) {
          var last = path4.lastComponent;
          if (last && !options.oneChangePerToken && last.added === added && last.removed === removed) {
            return {
              oldPos: path4.oldPos + oldPosInc,
              lastComponent: { count: last.count + 1, added, removed, previousComponent: last.previousComponent }
            };
          } else {
            return {
              oldPos: path4.oldPos + oldPosInc,
              lastComponent: { count: 1, added, removed, previousComponent: last }
            };
          }
        };
        Diff2.prototype.extractCommon = function(basePath, newTokens, oldTokens, diagonalPath, options) {
          var newLen = newTokens.length, oldLen = oldTokens.length;
          var oldPos = basePath.oldPos, newPos = oldPos - diagonalPath, commonCount = 0;
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
        };
        Diff2.prototype.equals = function(left, right, options) {
          if (options.comparator) {
            return options.comparator(left, right);
          } else {
            return left === right || !!options.ignoreCase && left.toLowerCase() === right.toLowerCase();
          }
        };
        Diff2.prototype.removeEmpty = function(array) {
          var ret = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i]) {
              ret.push(array[i]);
            }
          }
          return ret;
        };
        Diff2.prototype.castInput = function(value, options) {
          return value;
        };
        Diff2.prototype.tokenize = function(value, options) {
          return Array.from(value);
        };
        Diff2.prototype.join = function(chars) {
          return chars.join("");
        };
        Diff2.prototype.postProcess = function(changeObjects, options) {
          return changeObjects;
        };
        Object.defineProperty(Diff2.prototype, "useLongestToken", {
          get: function() {
            return false;
          },
          enumerable: false,
          configurable: true
        });
        Diff2.prototype.buildValues = function(lastComponent, newTokens, oldTokens) {
          var components = [];
          var nextComponent;
          while (lastComponent) {
            components.push(lastComponent);
            nextComponent = lastComponent.previousComponent;
            delete lastComponent.previousComponent;
            lastComponent = nextComponent;
          }
          components.reverse();
          var componentLen = components.length;
          var componentPos = 0, newPos = 0, oldPos = 0;
          for (; componentPos < componentLen; componentPos++) {
            var component = components[componentPos];
            if (!component.removed) {
              if (!component.added && this.useLongestToken) {
                var value = newTokens.slice(newPos, newPos + component.count);
                value = value.map(function(value2, i) {
                  var oldValue = oldTokens[oldPos + i];
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
        };
        return Diff2;
      }()
    );
    exports2.default = Diff;
  }
});

// node_modules/diff/libcjs/diff/character.js
var require_character = __commonJS({
  "node_modules/diff/libcjs/diff/character.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.characterDiff = void 0;
    exports2.diffChars = diffChars;
    var base_js_1 = require_base();
    var CharacterDiff = (
      /** @class */
      function(_super) {
        __extends(CharacterDiff2, _super);
        function CharacterDiff2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        return CharacterDiff2;
      }(base_js_1.default)
    );
    exports2.characterDiff = new CharacterDiff();
    function diffChars(oldStr, newStr, options) {
      return exports2.characterDiff.diff(oldStr, newStr, options);
    }
  }
});

// node_modules/diff/libcjs/util/string.js
var require_string = __commonJS({
  "node_modules/diff/libcjs/util/string.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.longestCommonPrefix = longestCommonPrefix;
    exports2.longestCommonSuffix = longestCommonSuffix;
    exports2.replacePrefix = replacePrefix;
    exports2.replaceSuffix = replaceSuffix;
    exports2.removePrefix = removePrefix;
    exports2.removeSuffix = removeSuffix;
    exports2.maximumOverlap = maximumOverlap;
    exports2.hasOnlyWinLineEndings = hasOnlyWinLineEndings;
    exports2.hasOnlyUnixLineEndings = hasOnlyUnixLineEndings;
    exports2.trailingWs = trailingWs;
    exports2.leadingWs = leadingWs;
    function longestCommonPrefix(str1, str2) {
      var i;
      for (i = 0; i < str1.length && i < str2.length; i++) {
        if (str1[i] != str2[i]) {
          return str1.slice(0, i);
        }
      }
      return str1.slice(0, i);
    }
    function longestCommonSuffix(str1, str2) {
      var i;
      if (!str1 || !str2 || str1[str1.length - 1] != str2[str2.length - 1]) {
        return "";
      }
      for (i = 0; i < str1.length && i < str2.length; i++) {
        if (str1[str1.length - (i + 1)] != str2[str2.length - (i + 1)]) {
          return str1.slice(-i);
        }
      }
      return str1.slice(-i);
    }
    function replacePrefix(string2, oldPrefix, newPrefix) {
      if (string2.slice(0, oldPrefix.length) != oldPrefix) {
        throw Error("string ".concat(JSON.stringify(string2), " doesn't start with prefix ").concat(JSON.stringify(oldPrefix), "; this is a bug"));
      }
      return newPrefix + string2.slice(oldPrefix.length);
    }
    function replaceSuffix(string2, oldSuffix, newSuffix) {
      if (!oldSuffix) {
        return string2 + newSuffix;
      }
      if (string2.slice(-oldSuffix.length) != oldSuffix) {
        throw Error("string ".concat(JSON.stringify(string2), " doesn't end with suffix ").concat(JSON.stringify(oldSuffix), "; this is a bug"));
      }
      return string2.slice(0, -oldSuffix.length) + newSuffix;
    }
    function removePrefix(string2, oldPrefix) {
      return replacePrefix(string2, oldPrefix, "");
    }
    function removeSuffix(string2, oldSuffix) {
      return replaceSuffix(string2, oldSuffix, "");
    }
    function maximumOverlap(string1, string2) {
      return string2.slice(0, overlapCount(string1, string2));
    }
    function overlapCount(a, b) {
      var startA = 0;
      if (a.length > b.length) {
        startA = a.length - b.length;
      }
      var endB = b.length;
      if (a.length < b.length) {
        endB = a.length;
      }
      var map = Array(endB);
      var k = 0;
      map[0] = 0;
      for (var j = 1; j < endB; j++) {
        if (b[j] == b[k]) {
          map[j] = map[k];
        } else {
          map[j] = k;
        }
        while (k > 0 && b[j] != b[k]) {
          k = map[k];
        }
        if (b[j] == b[k]) {
          k++;
        }
      }
      k = 0;
      for (var i = startA; i < a.length; i++) {
        while (k > 0 && a[i] != b[k]) {
          k = map[k];
        }
        if (a[i] == b[k]) {
          k++;
        }
      }
      return k;
    }
    function hasOnlyWinLineEndings(string2) {
      return string2.includes("\r\n") && !string2.startsWith("\n") && !string2.match(/[^\r]\n/);
    }
    function hasOnlyUnixLineEndings(string2) {
      return !string2.includes("\r\n") && string2.includes("\n");
    }
    function trailingWs(string2) {
      var i;
      for (i = string2.length - 1; i >= 0; i--) {
        if (!string2[i].match(/\s/)) {
          break;
        }
      }
      return string2.substring(i + 1);
    }
    function leadingWs(string2) {
      var match = string2.match(/^\s*/);
      return match ? match[0] : "";
    }
  }
});

// node_modules/diff/libcjs/diff/word.js
var require_word = __commonJS({
  "node_modules/diff/libcjs/diff/word.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.wordsWithSpaceDiff = exports2.wordDiff = void 0;
    exports2.diffWords = diffWords;
    exports2.diffWordsWithSpace = diffWordsWithSpace;
    var base_js_1 = require_base();
    var string_js_1 = require_string();
    var extendedWordChars = "a-zA-Z0-9_\\u{C0}-\\u{FF}\\u{D8}-\\u{F6}\\u{F8}-\\u{2C6}\\u{2C8}-\\u{2D7}\\u{2DE}-\\u{2FF}\\u{1E00}-\\u{1EFF}";
    var tokenizeIncludingWhitespace = new RegExp("[".concat(extendedWordChars, "]+|\\s+|[^").concat(extendedWordChars, "]"), "ug");
    var WordDiff = (
      /** @class */
      function(_super) {
        __extends(WordDiff2, _super);
        function WordDiff2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        WordDiff2.prototype.equals = function(left, right, options) {
          if (options.ignoreCase) {
            left = left.toLowerCase();
            right = right.toLowerCase();
          }
          return left.trim() === right.trim();
        };
        WordDiff2.prototype.tokenize = function(value, options) {
          if (options === void 0) {
            options = {};
          }
          var parts;
          if (options.intlSegmenter) {
            var segmenter = options.intlSegmenter;
            if (segmenter.resolvedOptions().granularity != "word") {
              throw new Error('The segmenter passed must have a granularity of "word"');
            }
            parts = Array.from(segmenter.segment(value), function(segment) {
              return segment.segment;
            });
          } else {
            parts = value.match(tokenizeIncludingWhitespace) || [];
          }
          var tokens = [];
          var prevPart = null;
          parts.forEach(function(part) {
            if (/\s/.test(part)) {
              if (prevPart == null) {
                tokens.push(part);
              } else {
                tokens.push(tokens.pop() + part);
              }
            } else if (prevPart != null && /\s/.test(prevPart)) {
              if (tokens[tokens.length - 1] == prevPart) {
                tokens.push(tokens.pop() + part);
              } else {
                tokens.push(prevPart + part);
              }
            } else {
              tokens.push(part);
            }
            prevPart = part;
          });
          return tokens;
        };
        WordDiff2.prototype.join = function(tokens) {
          return tokens.map(function(token, i) {
            if (i == 0) {
              return token;
            } else {
              return token.replace(/^\s+/, "");
            }
          }).join("");
        };
        WordDiff2.prototype.postProcess = function(changes, options) {
          if (!changes || options.oneChangePerToken) {
            return changes;
          }
          var lastKeep = null;
          var insertion = null;
          var deletion = null;
          changes.forEach(function(change) {
            if (change.added) {
              insertion = change;
            } else if (change.removed) {
              deletion = change;
            } else {
              if (insertion || deletion) {
                dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, change);
              }
              lastKeep = change;
              insertion = null;
              deletion = null;
            }
          });
          if (insertion || deletion) {
            dedupeWhitespaceInChangeObjects(lastKeep, deletion, insertion, null);
          }
          return changes;
        };
        return WordDiff2;
      }(base_js_1.default)
    );
    exports2.wordDiff = new WordDiff();
    function diffWords(oldStr, newStr, options) {
      if ((options === null || options === void 0 ? void 0 : options.ignoreWhitespace) != null && !options.ignoreWhitespace) {
        return diffWordsWithSpace(oldStr, newStr, options);
      }
      return exports2.wordDiff.diff(oldStr, newStr, options);
    }
    function dedupeWhitespaceInChangeObjects(startKeep, deletion, insertion, endKeep) {
      if (deletion && insertion) {
        var oldWsPrefix = (0, string_js_1.leadingWs)(deletion.value);
        var oldWsSuffix = (0, string_js_1.trailingWs)(deletion.value);
        var newWsPrefix = (0, string_js_1.leadingWs)(insertion.value);
        var newWsSuffix = (0, string_js_1.trailingWs)(insertion.value);
        if (startKeep) {
          var commonWsPrefix = (0, string_js_1.longestCommonPrefix)(oldWsPrefix, newWsPrefix);
          startKeep.value = (0, string_js_1.replaceSuffix)(startKeep.value, newWsPrefix, commonWsPrefix);
          deletion.value = (0, string_js_1.removePrefix)(deletion.value, commonWsPrefix);
          insertion.value = (0, string_js_1.removePrefix)(insertion.value, commonWsPrefix);
        }
        if (endKeep) {
          var commonWsSuffix = (0, string_js_1.longestCommonSuffix)(oldWsSuffix, newWsSuffix);
          endKeep.value = (0, string_js_1.replacePrefix)(endKeep.value, newWsSuffix, commonWsSuffix);
          deletion.value = (0, string_js_1.removeSuffix)(deletion.value, commonWsSuffix);
          insertion.value = (0, string_js_1.removeSuffix)(insertion.value, commonWsSuffix);
        }
      } else if (insertion) {
        if (startKeep) {
          var ws = (0, string_js_1.leadingWs)(insertion.value);
          insertion.value = insertion.value.substring(ws.length);
        }
        if (endKeep) {
          var ws = (0, string_js_1.leadingWs)(endKeep.value);
          endKeep.value = endKeep.value.substring(ws.length);
        }
      } else if (startKeep && endKeep) {
        var newWsFull = (0, string_js_1.leadingWs)(endKeep.value), delWsStart = (0, string_js_1.leadingWs)(deletion.value), delWsEnd = (0, string_js_1.trailingWs)(deletion.value);
        var newWsStart = (0, string_js_1.longestCommonPrefix)(newWsFull, delWsStart);
        deletion.value = (0, string_js_1.removePrefix)(deletion.value, newWsStart);
        var newWsEnd = (0, string_js_1.longestCommonSuffix)((0, string_js_1.removePrefix)(newWsFull, newWsStart), delWsEnd);
        deletion.value = (0, string_js_1.removeSuffix)(deletion.value, newWsEnd);
        endKeep.value = (0, string_js_1.replacePrefix)(endKeep.value, newWsFull, newWsEnd);
        startKeep.value = (0, string_js_1.replaceSuffix)(startKeep.value, newWsFull, newWsFull.slice(0, newWsFull.length - newWsEnd.length));
      } else if (endKeep) {
        var endKeepWsPrefix = (0, string_js_1.leadingWs)(endKeep.value);
        var deletionWsSuffix = (0, string_js_1.trailingWs)(deletion.value);
        var overlap = (0, string_js_1.maximumOverlap)(deletionWsSuffix, endKeepWsPrefix);
        deletion.value = (0, string_js_1.removeSuffix)(deletion.value, overlap);
      } else if (startKeep) {
        var startKeepWsSuffix = (0, string_js_1.trailingWs)(startKeep.value);
        var deletionWsPrefix = (0, string_js_1.leadingWs)(deletion.value);
        var overlap = (0, string_js_1.maximumOverlap)(startKeepWsSuffix, deletionWsPrefix);
        deletion.value = (0, string_js_1.removePrefix)(deletion.value, overlap);
      }
    }
    var WordsWithSpaceDiff = (
      /** @class */
      function(_super) {
        __extends(WordsWithSpaceDiff2, _super);
        function WordsWithSpaceDiff2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        WordsWithSpaceDiff2.prototype.tokenize = function(value) {
          var regex = new RegExp("(\\r?\\n)|[".concat(extendedWordChars, "]+|[^\\S\\n\\r]+|[^").concat(extendedWordChars, "]"), "ug");
          return value.match(regex) || [];
        };
        return WordsWithSpaceDiff2;
      }(base_js_1.default)
    );
    exports2.wordsWithSpaceDiff = new WordsWithSpaceDiff();
    function diffWordsWithSpace(oldStr, newStr, options) {
      return exports2.wordsWithSpaceDiff.diff(oldStr, newStr, options);
    }
  }
});

// node_modules/diff/libcjs/util/params.js
var require_params = __commonJS({
  "node_modules/diff/libcjs/util/params.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateOptions = generateOptions;
    function generateOptions(options, defaults) {
      if (typeof options === "function") {
        defaults.callback = options;
      } else if (options) {
        for (var name in options) {
          if (Object.prototype.hasOwnProperty.call(options, name)) {
            defaults[name] = options[name];
          }
        }
      }
      return defaults;
    }
  }
});

// node_modules/diff/libcjs/diff/line.js
var require_line = __commonJS({
  "node_modules/diff/libcjs/diff/line.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.lineDiff = void 0;
    exports2.diffLines = diffLines;
    exports2.diffTrimmedLines = diffTrimmedLines;
    exports2.tokenize = tokenize;
    var base_js_1 = require_base();
    var params_js_1 = require_params();
    var LineDiff = (
      /** @class */
      function(_super) {
        __extends(LineDiff2, _super);
        function LineDiff2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.tokenize = tokenize;
          return _this;
        }
        LineDiff2.prototype.equals = function(left, right, options) {
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
          return _super.prototype.equals.call(this, left, right, options);
        };
        return LineDiff2;
      }(base_js_1.default)
    );
    exports2.lineDiff = new LineDiff();
    function diffLines(oldStr, newStr, options) {
      return exports2.lineDiff.diff(oldStr, newStr, options);
    }
    function diffTrimmedLines(oldStr, newStr, options) {
      options = (0, params_js_1.generateOptions)(options, { ignoreWhitespace: true });
      return exports2.lineDiff.diff(oldStr, newStr, options);
    }
    function tokenize(value, options) {
      if (options.stripTrailingCr) {
        value = value.replace(/\r\n/g, "\n");
      }
      var retLines = [], linesAndNewlines = value.split(/(\n|\r\n)/);
      if (!linesAndNewlines[linesAndNewlines.length - 1]) {
        linesAndNewlines.pop();
      }
      for (var i = 0; i < linesAndNewlines.length; i++) {
        var line = linesAndNewlines[i];
        if (i % 2 && !options.newlineIsToken) {
          retLines[retLines.length - 1] += line;
        } else {
          retLines.push(line);
        }
      }
      return retLines;
    }
  }
});

// node_modules/diff/libcjs/diff/sentence.js
var require_sentence = __commonJS({
  "node_modules/diff/libcjs/diff/sentence.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.sentenceDiff = void 0;
    exports2.diffSentences = diffSentences;
    var base_js_1 = require_base();
    function isSentenceEndPunct(char) {
      return char == "." || char == "!" || char == "?";
    }
    var SentenceDiff = (
      /** @class */
      function(_super) {
        __extends(SentenceDiff2, _super);
        function SentenceDiff2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        SentenceDiff2.prototype.tokenize = function(value) {
          var _a;
          var result = [];
          var tokenStartI = 0;
          for (var i = 0; i < value.length; i++) {
            if (i == value.length - 1) {
              result.push(value.slice(tokenStartI));
              break;
            }
            if (isSentenceEndPunct(value[i]) && value[i + 1].match(/\s/)) {
              result.push(value.slice(tokenStartI, i + 1));
              i = tokenStartI = i + 1;
              while ((_a = value[i + 1]) === null || _a === void 0 ? void 0 : _a.match(/\s/)) {
                i++;
              }
              result.push(value.slice(tokenStartI, i + 1));
              tokenStartI = i + 1;
            }
          }
          return result;
        };
        return SentenceDiff2;
      }(base_js_1.default)
    );
    exports2.sentenceDiff = new SentenceDiff();
    function diffSentences(oldStr, newStr, options) {
      return exports2.sentenceDiff.diff(oldStr, newStr, options);
    }
  }
});

// node_modules/diff/libcjs/diff/css.js
var require_css = __commonJS({
  "node_modules/diff/libcjs/diff/css.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.cssDiff = void 0;
    exports2.diffCss = diffCss;
    var base_js_1 = require_base();
    var CssDiff = (
      /** @class */
      function(_super) {
        __extends(CssDiff2, _super);
        function CssDiff2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        CssDiff2.prototype.tokenize = function(value) {
          return value.split(/([{}:;,]|\s+)/);
        };
        return CssDiff2;
      }(base_js_1.default)
    );
    exports2.cssDiff = new CssDiff();
    function diffCss(oldStr, newStr, options) {
      return exports2.cssDiff.diff(oldStr, newStr, options);
    }
  }
});

// node_modules/diff/libcjs/diff/json.js
var require_json = __commonJS({
  "node_modules/diff/libcjs/diff/json.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.jsonDiff = void 0;
    exports2.diffJson = diffJson;
    exports2.canonicalize = canonicalize;
    var base_js_1 = require_base();
    var line_js_1 = require_line();
    var JsonDiff = (
      /** @class */
      function(_super) {
        __extends(JsonDiff2, _super);
        function JsonDiff2() {
          var _this = _super !== null && _super.apply(this, arguments) || this;
          _this.tokenize = line_js_1.tokenize;
          return _this;
        }
        Object.defineProperty(JsonDiff2.prototype, "useLongestToken", {
          get: function() {
            return true;
          },
          enumerable: false,
          configurable: true
        });
        JsonDiff2.prototype.castInput = function(value, options) {
          var undefinedReplacement = options.undefinedReplacement, _a = options.stringifyReplacer, stringifyReplacer = _a === void 0 ? function(k, v) {
            return typeof v === "undefined" ? undefinedReplacement : v;
          } : _a;
          return typeof value === "string" ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), null, "  ");
        };
        JsonDiff2.prototype.equals = function(left, right, options) {
          return _super.prototype.equals.call(this, left.replace(/,([\r\n])/g, "$1"), right.replace(/,([\r\n])/g, "$1"), options);
        };
        return JsonDiff2;
      }(base_js_1.default)
    );
    exports2.jsonDiff = new JsonDiff();
    function diffJson(oldStr, newStr, options) {
      return exports2.jsonDiff.diff(oldStr, newStr, options);
    }
    function canonicalize(obj, stack, replacementStack, replacer, key) {
      stack = stack || [];
      replacementStack = replacementStack || [];
      if (replacer) {
        obj = replacer(key === void 0 ? "" : key, obj);
      }
      var i;
      for (i = 0; i < stack.length; i += 1) {
        if (stack[i] === obj) {
          return replacementStack[i];
        }
      }
      var canonicalizedObj;
      if ("[object Array]" === Object.prototype.toString.call(obj)) {
        stack.push(obj);
        canonicalizedObj = new Array(obj.length);
        replacementStack.push(canonicalizedObj);
        for (i = 0; i < obj.length; i += 1) {
          canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, String(i));
        }
        stack.pop();
        replacementStack.pop();
        return canonicalizedObj;
      }
      if (obj && obj.toJSON) {
        obj = obj.toJSON();
      }
      if (typeof obj === "object" && obj !== null) {
        stack.push(obj);
        canonicalizedObj = {};
        replacementStack.push(canonicalizedObj);
        var sortedKeys = [];
        var key_1;
        for (key_1 in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key_1)) {
            sortedKeys.push(key_1);
          }
        }
        sortedKeys.sort();
        for (i = 0; i < sortedKeys.length; i += 1) {
          key_1 = sortedKeys[i];
          canonicalizedObj[key_1] = canonicalize(obj[key_1], stack, replacementStack, replacer, key_1);
        }
        stack.pop();
        replacementStack.pop();
      } else {
        canonicalizedObj = obj;
      }
      return canonicalizedObj;
    }
  }
});

// node_modules/diff/libcjs/diff/array.js
var require_array = __commonJS({
  "node_modules/diff/libcjs/diff/array.js"(exports2) {
    "use strict";
    var __extends = exports2 && exports2.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.arrayDiff = void 0;
    exports2.diffArrays = diffArrays;
    var base_js_1 = require_base();
    var ArrayDiff = (
      /** @class */
      function(_super) {
        __extends(ArrayDiff2, _super);
        function ArrayDiff2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        ArrayDiff2.prototype.tokenize = function(value) {
          return value.slice();
        };
        ArrayDiff2.prototype.join = function(value) {
          return value;
        };
        ArrayDiff2.prototype.removeEmpty = function(value) {
          return value;
        };
        return ArrayDiff2;
      }(base_js_1.default)
    );
    exports2.arrayDiff = new ArrayDiff();
    function diffArrays(oldArr, newArr, options) {
      return exports2.arrayDiff.diff(oldArr, newArr, options);
    }
  }
});

// node_modules/diff/libcjs/patch/line-endings.js
var require_line_endings = __commonJS({
  "node_modules/diff/libcjs/patch/line-endings.js"(exports2) {
    "use strict";
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.unixToWin = unixToWin;
    exports2.winToUnix = winToUnix;
    exports2.isUnix = isUnix;
    exports2.isWin = isWin;
    function unixToWin(patch) {
      if (Array.isArray(patch)) {
        return patch.map(function(p) {
          return unixToWin(p);
        });
      }
      return __assign(__assign({}, patch), { hunks: patch.hunks.map(function(hunk) {
        return __assign(__assign({}, hunk), { lines: hunk.lines.map(function(line, i) {
          var _a;
          return line.startsWith("\\") || line.endsWith("\r") || ((_a = hunk.lines[i + 1]) === null || _a === void 0 ? void 0 : _a.startsWith("\\")) ? line : line + "\r";
        }) });
      }) });
    }
    function winToUnix(patch) {
      if (Array.isArray(patch)) {
        return patch.map(function(p) {
          return winToUnix(p);
        });
      }
      return __assign(__assign({}, patch), { hunks: patch.hunks.map(function(hunk) {
        return __assign(__assign({}, hunk), { lines: hunk.lines.map(function(line) {
          return line.endsWith("\r") ? line.substring(0, line.length - 1) : line;
        }) });
      }) });
    }
    function isUnix(patch) {
      if (!Array.isArray(patch)) {
        patch = [patch];
      }
      return !patch.some(function(index) {
        return index.hunks.some(function(hunk) {
          return hunk.lines.some(function(line) {
            return !line.startsWith("\\") && line.endsWith("\r");
          });
        });
      });
    }
    function isWin(patch) {
      if (!Array.isArray(patch)) {
        patch = [patch];
      }
      return patch.some(function(index) {
        return index.hunks.some(function(hunk) {
          return hunk.lines.some(function(line) {
            return line.endsWith("\r");
          });
        });
      }) && patch.every(function(index) {
        return index.hunks.every(function(hunk) {
          return hunk.lines.every(function(line, i) {
            var _a;
            return line.startsWith("\\") || line.endsWith("\r") || ((_a = hunk.lines[i + 1]) === null || _a === void 0 ? void 0 : _a.startsWith("\\"));
          });
        });
      });
    }
  }
});

// node_modules/diff/libcjs/patch/parse.js
var require_parse = __commonJS({
  "node_modules/diff/libcjs/patch/parse.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parsePatch = parsePatch;
    function parsePatch(uniDiff) {
      var diffstr = uniDiff.split(/\n/), list = [];
      var i = 0;
      function parseIndex() {
        var index = {};
        list.push(index);
        while (i < diffstr.length) {
          var line = diffstr[i];
          if (/^(---|\+\+\+|@@)\s/.test(line)) {
            break;
          }
          var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
          if (header) {
            index.index = header[1];
          }
          i++;
        }
        parseFileHeader(index);
        parseFileHeader(index);
        index.hunks = [];
        while (i < diffstr.length) {
          var line = diffstr[i];
          if (/^(Index:\s|diff\s|---\s|\+\+\+\s|===================================================================)/.test(line)) {
            break;
          } else if (/^@@/.test(line)) {
            index.hunks.push(parseHunk());
          } else if (line) {
            throw new Error("Unknown line " + (i + 1) + " " + JSON.stringify(line));
          } else {
            i++;
          }
        }
      }
      function parseFileHeader(index) {
        var fileHeader = /^(---|\+\+\+)\s+(.*)\r?$/.exec(diffstr[i]);
        if (fileHeader) {
          var data = fileHeader[2].split("	", 2), header = (data[1] || "").trim();
          var fileName = data[0].replace(/\\\\/g, "\\");
          if (/^".*"$/.test(fileName)) {
            fileName = fileName.substr(1, fileName.length - 2);
          }
          if (fileHeader[1] === "---") {
            index.oldFileName = fileName;
            index.oldHeader = header;
          } else {
            index.newFileName = fileName;
            index.newHeader = header;
          }
          i++;
        }
      }
      function parseHunk() {
        var _a;
        var chunkHeaderIndex = i, chunkHeaderLine = diffstr[i++], chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
        var hunk = {
          oldStart: +chunkHeader[1],
          oldLines: typeof chunkHeader[2] === "undefined" ? 1 : +chunkHeader[2],
          newStart: +chunkHeader[3],
          newLines: typeof chunkHeader[4] === "undefined" ? 1 : +chunkHeader[4],
          lines: []
        };
        if (hunk.oldLines === 0) {
          hunk.oldStart += 1;
        }
        if (hunk.newLines === 0) {
          hunk.newStart += 1;
        }
        var addCount = 0, removeCount = 0;
        for (; i < diffstr.length && (removeCount < hunk.oldLines || addCount < hunk.newLines || ((_a = diffstr[i]) === null || _a === void 0 ? void 0 : _a.startsWith("\\"))); i++) {
          var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? " " : diffstr[i][0];
          if (operation === "+" || operation === "-" || operation === " " || operation === "\\") {
            hunk.lines.push(diffstr[i]);
            if (operation === "+") {
              addCount++;
            } else if (operation === "-") {
              removeCount++;
            } else if (operation === " ") {
              addCount++;
              removeCount++;
            }
          } else {
            throw new Error("Hunk at line ".concat(chunkHeaderIndex + 1, " contained invalid line ").concat(diffstr[i]));
          }
        }
        if (!addCount && hunk.newLines === 1) {
          hunk.newLines = 0;
        }
        if (!removeCount && hunk.oldLines === 1) {
          hunk.oldLines = 0;
        }
        if (addCount !== hunk.newLines) {
          throw new Error("Added line count did not match for hunk at line " + (chunkHeaderIndex + 1));
        }
        if (removeCount !== hunk.oldLines) {
          throw new Error("Removed line count did not match for hunk at line " + (chunkHeaderIndex + 1));
        }
        return hunk;
      }
      while (i < diffstr.length) {
        parseIndex();
      }
      return list;
    }
  }
});

// node_modules/diff/libcjs/util/distance-iterator.js
var require_distance_iterator = __commonJS({
  "node_modules/diff/libcjs/util/distance-iterator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.default = default_1;
    function default_1(start, minLine, maxLine) {
      var wantForward = true, backwardExhausted = false, forwardExhausted = false, localOffset = 1;
      return function iterator() {
        if (wantForward && !forwardExhausted) {
          if (backwardExhausted) {
            localOffset++;
          } else {
            wantForward = false;
          }
          if (start + localOffset <= maxLine) {
            return start + localOffset;
          }
          forwardExhausted = true;
        }
        if (!backwardExhausted) {
          if (!forwardExhausted) {
            wantForward = true;
          }
          if (minLine <= start - localOffset) {
            return start - localOffset++;
          }
          backwardExhausted = true;
          return iterator();
        }
        return void 0;
      };
    }
  }
});

// node_modules/diff/libcjs/patch/apply.js
var require_apply = __commonJS({
  "node_modules/diff/libcjs/patch/apply.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.applyPatch = applyPatch;
    exports2.applyPatches = applyPatches;
    var string_js_1 = require_string();
    var line_endings_js_1 = require_line_endings();
    var parse_js_1 = require_parse();
    var distance_iterator_js_1 = require_distance_iterator();
    function applyPatch(source, patch, options) {
      if (options === void 0) {
        options = {};
      }
      var patches;
      if (typeof patch === "string") {
        patches = (0, parse_js_1.parsePatch)(patch);
      } else if (Array.isArray(patch)) {
        patches = patch;
      } else {
        patches = [patch];
      }
      if (patches.length > 1) {
        throw new Error("applyPatch only works with a single input.");
      }
      return applyStructuredPatch(source, patches[0], options);
    }
    function applyStructuredPatch(source, patch, options) {
      if (options === void 0) {
        options = {};
      }
      if (options.autoConvertLineEndings || options.autoConvertLineEndings == null) {
        if ((0, string_js_1.hasOnlyWinLineEndings)(source) && (0, line_endings_js_1.isUnix)(patch)) {
          patch = (0, line_endings_js_1.unixToWin)(patch);
        } else if ((0, string_js_1.hasOnlyUnixLineEndings)(source) && (0, line_endings_js_1.isWin)(patch)) {
          patch = (0, line_endings_js_1.winToUnix)(patch);
        }
      }
      var lines = source.split("\n"), hunks = patch.hunks, compareLine = options.compareLine || function(lineNumber, line2, operation, patchContent) {
        return line2 === patchContent;
      }, fuzzFactor = options.fuzzFactor || 0;
      var minLine = 0;
      if (fuzzFactor < 0 || !Number.isInteger(fuzzFactor)) {
        throw new Error("fuzzFactor must be a non-negative integer");
      }
      if (!hunks.length) {
        return source;
      }
      var prevLine = "", removeEOFNL = false, addEOFNL = false;
      for (var i = 0; i < hunks[hunks.length - 1].lines.length; i++) {
        var line = hunks[hunks.length - 1].lines[i];
        if (line[0] == "\\") {
          if (prevLine[0] == "+") {
            removeEOFNL = true;
          } else if (prevLine[0] == "-") {
            addEOFNL = true;
          }
        }
        prevLine = line;
      }
      if (removeEOFNL) {
        if (addEOFNL) {
          if (!fuzzFactor && lines[lines.length - 1] == "") {
            return false;
          }
        } else if (lines[lines.length - 1] == "") {
          lines.pop();
        } else if (!fuzzFactor) {
          return false;
        }
      } else if (addEOFNL) {
        if (lines[lines.length - 1] != "") {
          lines.push("");
        } else if (!fuzzFactor) {
          return false;
        }
      }
      function applyHunk(hunkLines, toPos2, maxErrors2, hunkLinesI, lastContextLineMatched, patchedLines, patchedLinesLength) {
        if (hunkLinesI === void 0) {
          hunkLinesI = 0;
        }
        if (lastContextLineMatched === void 0) {
          lastContextLineMatched = true;
        }
        if (patchedLines === void 0) {
          patchedLines = [];
        }
        if (patchedLinesLength === void 0) {
          patchedLinesLength = 0;
        }
        var nConsecutiveOldContextLines = 0;
        var nextContextLineMustMatch = false;
        for (; hunkLinesI < hunkLines.length; hunkLinesI++) {
          var hunkLine = hunkLines[hunkLinesI], operation = hunkLine.length > 0 ? hunkLine[0] : " ", content = hunkLine.length > 0 ? hunkLine.substr(1) : hunkLine;
          if (operation === "-") {
            if (compareLine(toPos2 + 1, lines[toPos2], operation, content)) {
              toPos2++;
              nConsecutiveOldContextLines = 0;
            } else {
              if (!maxErrors2 || lines[toPos2] == null) {
                return null;
              }
              patchedLines[patchedLinesLength] = lines[toPos2];
              return applyHunk(hunkLines, toPos2 + 1, maxErrors2 - 1, hunkLinesI, false, patchedLines, patchedLinesLength + 1);
            }
          }
          if (operation === "+") {
            if (!lastContextLineMatched) {
              return null;
            }
            patchedLines[patchedLinesLength] = content;
            patchedLinesLength++;
            nConsecutiveOldContextLines = 0;
            nextContextLineMustMatch = true;
          }
          if (operation === " ") {
            nConsecutiveOldContextLines++;
            patchedLines[patchedLinesLength] = lines[toPos2];
            if (compareLine(toPos2 + 1, lines[toPos2], operation, content)) {
              patchedLinesLength++;
              lastContextLineMatched = true;
              nextContextLineMustMatch = false;
              toPos2++;
            } else {
              if (nextContextLineMustMatch || !maxErrors2) {
                return null;
              }
              return lines[toPos2] && (applyHunk(hunkLines, toPos2 + 1, maxErrors2 - 1, hunkLinesI + 1, false, patchedLines, patchedLinesLength + 1) || applyHunk(hunkLines, toPos2 + 1, maxErrors2 - 1, hunkLinesI, false, patchedLines, patchedLinesLength + 1)) || applyHunk(hunkLines, toPos2, maxErrors2 - 1, hunkLinesI + 1, false, patchedLines, patchedLinesLength);
            }
          }
        }
        patchedLinesLength -= nConsecutiveOldContextLines;
        toPos2 -= nConsecutiveOldContextLines;
        patchedLines.length = patchedLinesLength;
        return {
          patchedLines,
          oldLineLastI: toPos2 - 1
        };
      }
      var resultLines = [];
      var prevHunkOffset = 0;
      for (var i = 0; i < hunks.length; i++) {
        var hunk = hunks[i];
        var hunkResult = void 0;
        var maxLine = lines.length - hunk.oldLines + fuzzFactor;
        var toPos = void 0;
        for (var maxErrors = 0; maxErrors <= fuzzFactor; maxErrors++) {
          toPos = hunk.oldStart + prevHunkOffset - 1;
          var iterator = (0, distance_iterator_js_1.default)(toPos, minLine, maxLine);
          for (; toPos !== void 0; toPos = iterator()) {
            hunkResult = applyHunk(hunk.lines, toPos, maxErrors);
            if (hunkResult) {
              break;
            }
          }
          if (hunkResult) {
            break;
          }
        }
        if (!hunkResult) {
          return false;
        }
        for (var i_1 = minLine; i_1 < toPos; i_1++) {
          resultLines.push(lines[i_1]);
        }
        for (var i_2 = 0; i_2 < hunkResult.patchedLines.length; i_2++) {
          var line = hunkResult.patchedLines[i_2];
          resultLines.push(line);
        }
        minLine = hunkResult.oldLineLastI + 1;
        prevHunkOffset = toPos + 1 - hunk.oldStart;
      }
      for (var i = minLine; i < lines.length; i++) {
        resultLines.push(lines[i]);
      }
      return resultLines.join("\n");
    }
    function applyPatches(uniDiff, options) {
      var spDiff = typeof uniDiff === "string" ? (0, parse_js_1.parsePatch)(uniDiff) : uniDiff;
      var currentIndex = 0;
      function processIndex() {
        var index = spDiff[currentIndex++];
        if (!index) {
          return options.complete();
        }
        options.loadFile(index, function(err, data) {
          if (err) {
            return options.complete(err);
          }
          var updatedContent = applyPatch(data, index, options);
          options.patched(index, updatedContent, function(err2) {
            if (err2) {
              return options.complete(err2);
            }
            processIndex();
          });
        });
      }
      processIndex();
    }
  }
});

// node_modules/diff/libcjs/patch/reverse.js
var require_reverse = __commonJS({
  "node_modules/diff/libcjs/patch/reverse.js"(exports2) {
    "use strict";
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.reversePatch = reversePatch;
    function reversePatch(structuredPatch) {
      if (Array.isArray(structuredPatch)) {
        return structuredPatch.map(function(patch) {
          return reversePatch(patch);
        }).reverse();
      }
      return __assign(__assign({}, structuredPatch), { oldFileName: structuredPatch.newFileName, oldHeader: structuredPatch.newHeader, newFileName: structuredPatch.oldFileName, newHeader: structuredPatch.oldHeader, hunks: structuredPatch.hunks.map(function(hunk) {
        return {
          oldLines: hunk.newLines,
          oldStart: hunk.newStart,
          newLines: hunk.oldLines,
          newStart: hunk.oldStart,
          lines: hunk.lines.map(function(l) {
            if (l.startsWith("-")) {
              return "+".concat(l.slice(1));
            }
            if (l.startsWith("+")) {
              return "-".concat(l.slice(1));
            }
            return l;
          })
        };
      }) });
    }
  }
});

// node_modules/diff/libcjs/patch/create.js
var require_create = __commonJS({
  "node_modules/diff/libcjs/patch/create.js"(exports2) {
    "use strict";
    var __assign = exports2 && exports2.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.structuredPatch = structuredPatch;
    exports2.formatPatch = formatPatch;
    exports2.createTwoFilesPatch = createTwoFilesPatch;
    exports2.createPatch = createPatch;
    var line_js_1 = require_line();
    function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
      var optionsObj;
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
      var context = optionsObj.context;
      if (optionsObj.newlineIsToken) {
        throw new Error("newlineIsToken may not be used with patch-generation functions, only with diffing functions");
      }
      if (!optionsObj.callback) {
        return diffLinesResultToPatch((0, line_js_1.diffLines)(oldStr, newStr, optionsObj));
      } else {
        var callback_1 = optionsObj.callback;
        (0, line_js_1.diffLines)(oldStr, newStr, __assign(__assign({}, optionsObj), { callback: function(diff2) {
          var patch = diffLinesResultToPatch(diff2);
          callback_1(patch);
        } }));
      }
      function diffLinesResultToPatch(diff2) {
        if (!diff2) {
          return;
        }
        diff2.push({ value: "", lines: [] });
        function contextLines(lines2) {
          return lines2.map(function(entry) {
            return " " + entry;
          });
        }
        var hunks = [];
        var oldRangeStart = 0, newRangeStart = 0, curRange = [], oldLine = 1, newLine = 1;
        for (var i = 0; i < diff2.length; i++) {
          var current = diff2[i], lines = current.lines || splitLines(current.value);
          current.lines = lines;
          if (current.added || current.removed) {
            if (!oldRangeStart) {
              var prev = diff2[i - 1];
              oldRangeStart = oldLine;
              newRangeStart = newLine;
              if (prev) {
                curRange = context > 0 ? contextLines(prev.lines.slice(-context)) : [];
                oldRangeStart -= curRange.length;
                newRangeStart -= curRange.length;
              }
            }
            for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
              var line = lines_1[_i];
              curRange.push((current.added ? "+" : "-") + line);
            }
            if (current.added) {
              newLine += lines.length;
            } else {
              oldLine += lines.length;
            }
          } else {
            if (oldRangeStart) {
              if (lines.length <= context * 2 && i < diff2.length - 2) {
                for (var _a = 0, _b = contextLines(lines); _a < _b.length; _a++) {
                  var line = _b[_a];
                  curRange.push(line);
                }
              } else {
                var contextSize = Math.min(lines.length, context);
                for (var _c = 0, _d = contextLines(lines.slice(0, contextSize)); _c < _d.length; _c++) {
                  var line = _d[_c];
                  curRange.push(line);
                }
                var hunk = {
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
        for (var _e = 0, hunks_1 = hunks; _e < hunks_1.length; _e++) {
          var hunk = hunks_1[_e];
          for (var i = 0; i < hunk.lines.length; i++) {
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
      var ret = [];
      if (patch.oldFileName == patch.newFileName) {
        ret.push("Index: " + patch.oldFileName);
      }
      ret.push("===================================================================");
      ret.push("--- " + patch.oldFileName + (typeof patch.oldHeader === "undefined" ? "" : "	" + patch.oldHeader));
      ret.push("+++ " + patch.newFileName + (typeof patch.newHeader === "undefined" ? "" : "	" + patch.newHeader));
      for (var i = 0; i < patch.hunks.length; i++) {
        var hunk = patch.hunks[i];
        if (hunk.oldLines === 0) {
          hunk.oldStart -= 1;
        }
        if (hunk.newLines === 0) {
          hunk.newStart -= 1;
        }
        ret.push("@@ -" + hunk.oldStart + "," + hunk.oldLines + " +" + hunk.newStart + "," + hunk.newLines + " @@");
        for (var _i = 0, _a = hunk.lines; _i < _a.length; _i++) {
          var line = _a[_i];
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
        var patchObj = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);
        if (!patchObj) {
          return;
        }
        return formatPatch(patchObj);
      } else {
        var callback_2 = options.callback;
        structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, __assign(__assign({}, options), { callback: function(patchObj2) {
          if (!patchObj2) {
            callback_2(void 0);
          } else {
            callback_2(formatPatch(patchObj2));
          }
        } }));
      }
    }
    function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
      return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
    }
    function splitLines(text) {
      var hasTrailingNl = text.endsWith("\n");
      var result = text.split("\n").map(function(line) {
        return line + "\n";
      });
      if (hasTrailingNl) {
        result.pop();
      } else {
        result.push(result.pop().slice(0, -1));
      }
      return result;
    }
  }
});

// node_modules/diff/libcjs/convert/dmp.js
var require_dmp = __commonJS({
  "node_modules/diff/libcjs/convert/dmp.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertChangesToDMP = convertChangesToDMP;
    function convertChangesToDMP(changes) {
      var ret = [];
      var change, operation;
      for (var i = 0; i < changes.length; i++) {
        change = changes[i];
        if (change.added) {
          operation = 1;
        } else if (change.removed) {
          operation = -1;
        } else {
          operation = 0;
        }
        ret.push([operation, change.value]);
      }
      return ret;
    }
  }
});

// node_modules/diff/libcjs/convert/xml.js
var require_xml = __commonJS({
  "node_modules/diff/libcjs/convert/xml.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertChangesToXML = convertChangesToXML;
    function convertChangesToXML(changes) {
      var ret = [];
      for (var i = 0; i < changes.length; i++) {
        var change = changes[i];
        if (change.added) {
          ret.push("<ins>");
        } else if (change.removed) {
          ret.push("<del>");
        }
        ret.push(escapeHTML(change.value));
        if (change.added) {
          ret.push("</ins>");
        } else if (change.removed) {
          ret.push("</del>");
        }
      }
      return ret.join("");
    }
    function escapeHTML(s) {
      var n = s;
      n = n.replace(/&/g, "&amp;");
      n = n.replace(/</g, "&lt;");
      n = n.replace(/>/g, "&gt;");
      n = n.replace(/"/g, "&quot;");
      return n;
    }
  }
});

// node_modules/diff/libcjs/index.js
var require_libcjs = __commonJS({
  "node_modules/diff/libcjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.canonicalize = exports2.convertChangesToXML = exports2.convertChangesToDMP = exports2.reversePatch = exports2.parsePatch = exports2.applyPatches = exports2.applyPatch = exports2.formatPatch = exports2.createPatch = exports2.createTwoFilesPatch = exports2.structuredPatch = exports2.arrayDiff = exports2.diffArrays = exports2.jsonDiff = exports2.diffJson = exports2.cssDiff = exports2.diffCss = exports2.sentenceDiff = exports2.diffSentences = exports2.diffTrimmedLines = exports2.lineDiff = exports2.diffLines = exports2.wordsWithSpaceDiff = exports2.diffWordsWithSpace = exports2.wordDiff = exports2.diffWords = exports2.characterDiff = exports2.diffChars = exports2.Diff = void 0;
    var base_js_1 = require_base();
    exports2.Diff = base_js_1.default;
    var character_js_1 = require_character();
    Object.defineProperty(exports2, "diffChars", { enumerable: true, get: function() {
      return character_js_1.diffChars;
    } });
    Object.defineProperty(exports2, "characterDiff", { enumerable: true, get: function() {
      return character_js_1.characterDiff;
    } });
    var word_js_1 = require_word();
    Object.defineProperty(exports2, "diffWords", { enumerable: true, get: function() {
      return word_js_1.diffWords;
    } });
    Object.defineProperty(exports2, "diffWordsWithSpace", { enumerable: true, get: function() {
      return word_js_1.diffWordsWithSpace;
    } });
    Object.defineProperty(exports2, "wordDiff", { enumerable: true, get: function() {
      return word_js_1.wordDiff;
    } });
    Object.defineProperty(exports2, "wordsWithSpaceDiff", { enumerable: true, get: function() {
      return word_js_1.wordsWithSpaceDiff;
    } });
    var line_js_1 = require_line();
    Object.defineProperty(exports2, "diffLines", { enumerable: true, get: function() {
      return line_js_1.diffLines;
    } });
    Object.defineProperty(exports2, "diffTrimmedLines", { enumerable: true, get: function() {
      return line_js_1.diffTrimmedLines;
    } });
    Object.defineProperty(exports2, "lineDiff", { enumerable: true, get: function() {
      return line_js_1.lineDiff;
    } });
    var sentence_js_1 = require_sentence();
    Object.defineProperty(exports2, "diffSentences", { enumerable: true, get: function() {
      return sentence_js_1.diffSentences;
    } });
    Object.defineProperty(exports2, "sentenceDiff", { enumerable: true, get: function() {
      return sentence_js_1.sentenceDiff;
    } });
    var css_js_1 = require_css();
    Object.defineProperty(exports2, "diffCss", { enumerable: true, get: function() {
      return css_js_1.diffCss;
    } });
    Object.defineProperty(exports2, "cssDiff", { enumerable: true, get: function() {
      return css_js_1.cssDiff;
    } });
    var json_js_1 = require_json();
    Object.defineProperty(exports2, "diffJson", { enumerable: true, get: function() {
      return json_js_1.diffJson;
    } });
    Object.defineProperty(exports2, "canonicalize", { enumerable: true, get: function() {
      return json_js_1.canonicalize;
    } });
    Object.defineProperty(exports2, "jsonDiff", { enumerable: true, get: function() {
      return json_js_1.jsonDiff;
    } });
    var array_js_1 = require_array();
    Object.defineProperty(exports2, "diffArrays", { enumerable: true, get: function() {
      return array_js_1.diffArrays;
    } });
    Object.defineProperty(exports2, "arrayDiff", { enumerable: true, get: function() {
      return array_js_1.arrayDiff;
    } });
    var apply_js_1 = require_apply();
    Object.defineProperty(exports2, "applyPatch", { enumerable: true, get: function() {
      return apply_js_1.applyPatch;
    } });
    Object.defineProperty(exports2, "applyPatches", { enumerable: true, get: function() {
      return apply_js_1.applyPatches;
    } });
    var parse_js_1 = require_parse();
    Object.defineProperty(exports2, "parsePatch", { enumerable: true, get: function() {
      return parse_js_1.parsePatch;
    } });
    var reverse_js_1 = require_reverse();
    Object.defineProperty(exports2, "reversePatch", { enumerable: true, get: function() {
      return reverse_js_1.reversePatch;
    } });
    var create_js_1 = require_create();
    Object.defineProperty(exports2, "structuredPatch", { enumerable: true, get: function() {
      return create_js_1.structuredPatch;
    } });
    Object.defineProperty(exports2, "createTwoFilesPatch", { enumerable: true, get: function() {
      return create_js_1.createTwoFilesPatch;
    } });
    Object.defineProperty(exports2, "createPatch", { enumerable: true, get: function() {
      return create_js_1.createPatch;
    } });
    Object.defineProperty(exports2, "formatPatch", { enumerable: true, get: function() {
      return create_js_1.formatPatch;
    } });
    var dmp_js_1 = require_dmp();
    Object.defineProperty(exports2, "convertChangesToDMP", { enumerable: true, get: function() {
      return dmp_js_1.convertChangesToDMP;
    } });
    var xml_js_1 = require_xml();
    Object.defineProperty(exports2, "convertChangesToXML", { enumerable: true, get: function() {
      return xml_js_1.convertChangesToXML;
    } });
  }
});

// src/run-assertions/logger.js
var logger_exports = {};
var _colors2, diff, fs3, Logger;
var init_logger = __esm({
  "src/run-assertions/logger.js"() {
    _colors2 = require_safe();
    diff = require_libcjs();
    fs3 = require("fs");
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
          let ann = annotations && Object.keys(annotations).length ? " " + _colors2.cyan(JSON.stringify(annotations)) : "";
          console.log(_colors2.bold("\n" + msg) + ann);
        } else if (context === "test") {
          this.currentTest = { name: msg, suite: [...this.suiteStack], status: null, error: null, duration: 0, skipped: false };
          if (annotations && Object.keys(annotations).length) {
            this.currentTest.annotations = annotations;
          }
          this.currentTest.start = Date.now();
          let ann = annotations && Object.keys(annotations).length ? " " + _colors2.cyan(JSON.stringify(annotations)) : "";
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
            console.log(" " + _colors2.yellow("- SKIPPED"));
          } else if (result) {
            this.passed++;
            this.currentTest.status = "passed";
            let slow = this.currentTest.duration > this.slowThreshold;
            let slowMsg = slow ? _colors2.yellow(" (SLOW)") : "";
            console.log(" " + _colors2.green("\u2713") + slowMsg);
          } else {
            this.failed++;
            this.currentTest.status = "failed";
            this.currentTest.error = error;
            console.log(" " + _colors2.red("\u2717"));
            this.printErrorDetails(error);
          }
          this.testResults.push(this.currentTest);
          this.currentTest = null;
          this.printProgressBar();
        }
      }
      error(message) {
        this.lastError = message;
        console.error(_colors2.red(message));
      }
      printErrorDetails(error) {
        if (!error) return;
        if (error.expected !== void 0 && error.actual !== void 0) {
          const diffLines = diff.createPatch("difference", String(error.expected), String(error.actual)).split("\n").slice(4);
          console.error(_colors2.red("--- Expected"));
          console.error(_colors2.green("+++ Received"));
          diffLines.forEach((line) => {
            if (line.startsWith("-")) console.error(_colors2.red(line));
            else if (line.startsWith("+")) console.error(_colors2.green(line));
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
                const prefix = i + 1 === line ? _colors2.bgRed.white(">") : " ";
                console.error(prefix + " " + (i + 1).toString().padStart(4) + " | " + lines[i]);
              }
            } catch {
            }
          }
        }
        if (error.stack) {
          console.error(_colors2.gray(error.stack));
        } else {
          console.error(_colors2.red(error.toString()));
        }
      }
      printProgressBar() {
        const done = this.passed + this.failed + this.skipped;
        const percent = done / this.total;
        const filled = Math.round(this.progressBarLength * percent);
        const bar = _colors2.green("\u2588".repeat(filled)) + _colors2.gray("\u2591".repeat(this.progressBarLength - filled));
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
        for (const test3 of results.tests) {
          let suiteDiffIdx = 0;
          while (suiteDiffIdx < test3.suite.length && lastSuite[suiteDiffIdx] === test3.suite[suiteDiffIdx]) suiteDiffIdx++;
          for (let i = suiteDiffIdx; i < test3.suite.length; i++) {
            html.push(`<div class="suite" style="margin-left:${i}em;">${test3.suite[i]}</div>`);
          }
          lastSuite = test3.suite;
          let statusClass = test3.status;
          let slow = test3.duration > this.slowThreshold;
          let slowMsg = slow ? ' <span style="color:orange;">(SLOW)</span>' : "";
          let ann = test3.annotations && Object.keys(test3.annotations).length ? `<span style='color:teal;'> ${JSON.stringify(test3.annotations)}</span>` : "";
          html.push(`<div class="test ${statusClass}" style="margin-left:${test3.suite.length}em;">${test3.status === "passed" ? "\u2713" : test3.status === "skipped" ? "-" : "\u2717"} ${test3.name}${ann} <span class="duration">(${test3.duration}ms${slowMsg})</span></div>`);
          if (test3.status === "failed" && test3.error) {
            html.push(`<pre>${(test3.error.stack || test3.error).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`);
          }
        }
        html.push("</body></html>");
        return html.join("\n");
      }
      printSummary() {
        this.endTimer();
        const duration = this.endTime && this.startTime ? this.endTime - this.startTime : 0;
        console.log(_colors2.bold("\nTest Suites: ") + `${this.failed > 0 ? _colors2.red(this.failed + " failed") : _colors2.green(this.passed + " passed")} | ${this.total} total | ${_colors2.yellow(this.skipped + " skipped")}`);
        console.log(_colors2.bold("Tests:      ") + `${_colors2.green(this.passed + " passed")}, ${_colors2.red(this.failed + " failed")}, ${_colors2.yellow(this.skipped + " skipped")}, ${this.total} total`);
        console.log(_colors2.bold("Time:       ") + `${(duration / 1e3).toFixed(2)}s`);
        for (const result of this.testResults) {
          const suitePath = result.suite.length ? result.suite.join(" > ") + " > " : "";
          const statusColor = result.status === "passed" ? _colors2.green : result.status === "skipped" ? _colors2.yellow : _colors2.red;
          let slow = result.duration > this.slowThreshold;
          let slowMsg = slow ? _colors2.yellow(" (SLOW)") : "";
          console.log("  " + statusColor(result.status.toUpperCase()) + " " + suitePath + result.name + _colors2.gray(` (${result.duration}ms)`) + slowMsg);
          if (result.status === "failed" && result.error) {
            this.printErrorDetails(result.error);
          }
        }
      }
    };
    module.exports = { Logger };
  }
});

// src/run-assertions/suite.js
var suite_exports = {};
function setCurrentSuite(suite) {
  currentSuite = suite;
}
function getCurrentSuite() {
  return currentSuite;
}
var Suite, rootSuite, currentSuite;
var init_suite = __esm({
  "src/run-assertions/suite.js"() {
    Suite = class {
      constructor(desc, mode = "normal", annotations = {}) {
        this.desc = desc;
        this.tests = [];
        this.suites = [];
        this.hooks = { beforeAll: [], beforeEach: [], afterEach: [], afterAll: [] };
        this.parent = null;
        this.mode = mode;
        this.fixtures = {};
        this.teardowns = {};
        this.annotations = annotations;
      }
    };
    rootSuite = new Suite("");
    currentSuite = rootSuite;
    module.exports = {
      Suite,
      rootSuite,
      getCurrentSuite,
      setCurrentSuite
    };
  }
});

// src/run-assertions/registration.js
var registration_exports = {};
function fixture(name, fn2) {
  getCurrentSuite2().fixtures[name] = fn2;
}
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
function _describe(desc, fn2, mode, annotations) {
  const suite = new Suite2(desc, mode, annotations || {});
  suite.parent = getCurrentSuite2();
  getCurrentSuite2().suites.push(suite);
  setCurrentSuite2(suite);
  fn2();
  setCurrentSuite2(suite.parent);
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
function _test(desc, fn2, mode, options) {
  getCurrentSuite2().tests.push({
    desc,
    fn: fn2,
    mode,
    fixtures: options.fixtures || [],
    annotations: options.annotations || {}
  });
}
var Suite2, getCurrentSuite2, setCurrentSuite2;
var init_registration = __esm({
  "src/run-assertions/registration.js"() {
    ({ Suite: Suite2, getCurrentSuite: getCurrentSuite2, setCurrentSuite: setCurrentSuite2 } = (init_suite(), __toCommonJS(suite_exports)));
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
    module.exports = {
      describe,
      test,
      fixture
    };
  }
});

// node_modules/@sinonjs/commons/lib/global.js
var require_global = __commonJS({
  "node_modules/@sinonjs/commons/lib/global.js"(exports2, module2) {
    "use strict";
    var globalObject;
    if (typeof global !== "undefined") {
      globalObject = global;
    } else if (typeof window !== "undefined") {
      globalObject = window;
    } else {
      globalObject = self;
    }
    module2.exports = globalObject;
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/throws-on-proto.js
var require_throws_on_proto = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/throws-on-proto.js"(exports2, module2) {
    "use strict";
    var throwsOnProto;
    try {
      const object2 = {};
      object2.__proto__;
      throwsOnProto = false;
    } catch (_) {
      throwsOnProto = true;
    }
    module2.exports = throwsOnProto;
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js
var require_copy_prototype_methods = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/copy-prototype-methods.js"(exports2, module2) {
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
    module2.exports = function copyPrototypeMethods(prototype) {
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
var require_array2 = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/array.js"(exports2, module2) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module2.exports = copyPrototype(Array.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/called-in-order.js
var require_called_in_order = __commonJS({
  "node_modules/@sinonjs/commons/lib/called-in-order.js"(exports2, module2) {
    "use strict";
    var every = require_array2().every;
    function hasCallsLeft(callMap, spy4) {
      if (callMap[spy4.id] === void 0) {
        callMap[spy4.id] = 0;
      }
      return callMap[spy4.id] < spy4.callCount;
    }
    function checkAdjacentCalls(callMap, spy4, index, spies) {
      var calledBeforeNext = true;
      if (index !== spies.length - 1) {
        calledBeforeNext = spy4.calledBefore(spies[index + 1]);
      }
      if (hasCallsLeft(callMap, spy4) && calledBeforeNext) {
        callMap[spy4.id] += 1;
        return true;
      }
      return false;
    }
    function calledInOrder(spies) {
      var callMap = {};
      var _spies = arguments.length > 1 ? arguments : spies;
      return every(_spies, checkAdjacentCalls.bind(null, callMap));
    }
    module2.exports = calledInOrder;
  }
});

// node_modules/@sinonjs/commons/lib/class-name.js
var require_class_name = __commonJS({
  "node_modules/@sinonjs/commons/lib/class-name.js"(exports2, module2) {
    "use strict";
    function className(value) {
      const name = value.constructor && value.constructor.name;
      return name || null;
    }
    module2.exports = className;
  }
});

// node_modules/@sinonjs/commons/lib/deprecated.js
var require_deprecated = __commonJS({
  "node_modules/@sinonjs/commons/lib/deprecated.js"(exports2) {
    "use strict";
    exports2.wrap = function(func, msg) {
      var wrapped = function() {
        exports2.printWarning(msg);
        return func.apply(this, arguments);
      };
      if (func.prototype) {
        wrapped.prototype = func.prototype;
      }
      return wrapped;
    };
    exports2.defaultMsg = function(packageName, funcName) {
      return `${packageName}.${funcName} is deprecated and will be removed from the public API in a future version of ${packageName}.`;
    };
    exports2.printWarning = function(msg) {
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
  "node_modules/@sinonjs/commons/lib/every.js"(exports2, module2) {
    "use strict";
    module2.exports = function every(obj, fn2) {
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
  "node_modules/@sinonjs/commons/lib/function-name.js"(exports2, module2) {
    "use strict";
    module2.exports = function functionName(func) {
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
  "node_modules/@sinonjs/commons/lib/order-by-first-call.js"(exports2, module2) {
    "use strict";
    var sort = require_array2().sort;
    var slice = require_array2().slice;
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
    module2.exports = orderByFirstCall;
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/function.js
var require_function = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/function.js"(exports2, module2) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module2.exports = copyPrototype(Function.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/map.js
var require_map = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/map.js"(exports2, module2) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module2.exports = copyPrototype(Map.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/object.js
var require_object = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/object.js"(exports2, module2) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module2.exports = copyPrototype(Object.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/set.js
var require_set = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/set.js"(exports2, module2) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module2.exports = copyPrototype(Set.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/string.js
var require_string2 = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/string.js"(exports2, module2) {
    "use strict";
    var copyPrototype = require_copy_prototype_methods();
    module2.exports = copyPrototype(String.prototype);
  }
});

// node_modules/@sinonjs/commons/lib/prototypes/index.js
var require_prototypes = __commonJS({
  "node_modules/@sinonjs/commons/lib/prototypes/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      array: require_array2(),
      function: require_function(),
      map: require_map(),
      object: require_object(),
      set: require_set(),
      string: require_string2()
    };
  }
});

// node_modules/type-detect/type-detect.js
var require_type_detect = __commonJS({
  "node_modules/type-detect/type-detect.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.typeDetect = factory();
    })(exports2, function() {
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
  "node_modules/@sinonjs/commons/lib/type-of.js"(exports2, module2) {
    "use strict";
    var type2 = require_type_detect();
    module2.exports = function typeOf(value) {
      return type2(value).toLowerCase();
    };
  }
});

// node_modules/@sinonjs/commons/lib/value-to-string.js
var require_value_to_string = __commonJS({
  "node_modules/@sinonjs/commons/lib/value-to-string.js"(exports2, module2) {
    "use strict";
    function valueToString(value) {
      if (value && value.toString) {
        return value.toString();
      }
      return String(value);
    }
    module2.exports = valueToString;
  }
});

// node_modules/@sinonjs/commons/lib/index.js
var require_lib = __commonJS({
  "node_modules/@sinonjs/commons/lib/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
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
  "node_modules/@sinonjs/fake-timers/src/fake-timers-src.js"(exports2, module2) {
    "use strict";
    var globalObject = require_lib().global;
    var timersModule;
    var timersPromisesModule;
    if (typeof require === "function" && typeof module2 === "object") {
      try {
        timersModule = require("timers");
      } catch (e) {
      }
      try {
        timersPromisesModule = require("timers/promises");
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
      const utilPromisify = _global.process && require("util").promisify;
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
    exports2.timers = defaultImplementation.timers;
    exports2.createClock = defaultImplementation.createClock;
    exports2.install = defaultImplementation.install;
    exports2.withGlobal = withGlobal;
  }
});

// src/run-assertions/fake-timers.js
var fake_timers_exports = {};
function useFakeTimers() {
  if (!clock) {
    clock = FakeTimers.install({
      toFake: [
        "setTimeout",
        "clearTimeout",
        "setInterval",
        "clearInterval",
        "Date",
        "nextTick",
        "setImmediate",
        "clearImmediate"
      ],
      now: Date.now(),
      shouldAdvanceTime: false,
      advanceTimeDelta: 20
    });
  }
}
function useRealTimers() {
  if (clock) {
    clock.uninstall();
    clock = null;
  }
}
function advanceTimersByTime(ms) {
  if (!clock) throw new Error("Fake timers not in use");
  clock.tick(ms);
}
function runAllTimers() {
  if (!clock) throw new Error("Fake timers not in use");
  clock.runAll();
}
function resetTimers() {
  if (clock) {
    clock.reset();
  }
}
function getTimerCalls(fnName) {
  return [];
}
function getTimerCallCount(fnName) {
  return 0;
}
var FakeTimers, clock;
var init_fake_timers = __esm({
  "src/run-assertions/fake-timers.js"() {
    FakeTimers = require_fake_timers_src();
    clock = null;
    module.exports = {
      useFakeTimers,
      useRealTimers,
      advanceTimersByTime,
      runAllTimers,
      resetTimers,
      getTimerCalls,
      getTimerCallCount
    };
  }
});

// src/matchers/spy.js
var spy_exports = {};
function createSpy(fn2) {
  const spy4 = function(...args) {
    spy4.calls.push(args);
    spy4.callCount++;
    return fn2 ? fn2.apply(this, args) : void 0;
  };
  spy4.calls = [];
  spy4.callCount = 0;
  spy4.isSpy = true;
  spy4.restore = () => {
  };
  return spy4;
}
function isSpy(fn2) {
  return fn2 && fn2.isSpy;
}
function createStub(obj, methodName, impl) {
  if (!obj || typeof obj[methodName] !== "function") throw new Error("No such method to stub");
  const original = obj[methodName];
  const spy4 = createSpy(impl);
  obj[methodName] = spy4;
  spy4.restore = () => {
    obj[methodName] = original;
  };
  return spy4;
}
function createMock(modulePath, mockImpl) {
  const resolved = require.resolve(modulePath);
  const original = require.cache[resolved];
  require.cache[resolved] = { ...original, exports: mockImpl };
  return {
    restore: () => {
      require.cache[resolved] = original;
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
  const spy4 = fn(original);
  obj[methodName] = spy4;
  spy4.restore = () => {
    obj[methodName] = original;
  };
  return spy4;
}
function autoMockExports(exports2) {
  const mocked = {};
  for (const key of Object.keys(exports2)) {
    if (typeof exports2[key] === "function") {
      mocked[key] = fn();
    } else {
      mocked[key] = exports2[key];
    }
  }
  return mocked;
}
function findManualMock(modulePath) {
  const dir = path3.dirname(modulePath);
  const base = path3.basename(modulePath, path3.extname(modulePath));
  const mockPath = path3.join(dir, "__mocks__", base + ".js");
  if (fs4.existsSync(mockPath)) {
    return mockPath;
  }
  return null;
}
function isBuiltinModule(modulePath) {
  return builtins.includes(modulePath) || builtins.includes(modulePath.replace(/^node:/, ""));
}
function mock(modulePath, mockImpl) {
  let resolved;
  if (isBuiltinModule(modulePath)) {
    resolved = modulePath;
    if (!_originalModules.has(resolved)) {
      _originalModules.set(resolved, require(modulePath));
    }
    require.cache[resolved] = { exports: mockImpl };
    _mockedModules.set(resolved, mockImpl);
    return { restore: () => unmock(modulePath) };
  } else {
    resolved = require.resolve(modulePath);
  }
  if (!_originalModules.has(resolved)) {
    _originalModules.set(resolved, require.cache[resolved]);
  }
  let mockExports;
  if (mockImpl === void 0) {
    const manualMockPath = findManualMock(resolved);
    if (manualMockPath) {
      mockExports = require(manualMockPath);
    } else {
      const realExports = require(resolved);
      mockExports = autoMockExports(realExports);
    }
  } else if (typeof mockImpl === "object" && !Array.isArray(mockImpl)) {
    const realExports = require(resolved);
    mockExports = { ...realExports, ...mockImpl };
    for (const key of Object.keys(mockImpl)) {
      if (typeof mockImpl[key] === "function" && !mockImpl[key].mock) {
        mockExports[key] = fn(mockImpl[key]);
      }
    }
  } else {
    mockExports = mockImpl;
  }
  require.cache[resolved] = { ...require.cache[resolved], exports: mockExports };
  _mockedModules.set(resolved, mockExports);
  return {
    restore: () => unmock(modulePath)
  };
}
function unmock(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    require.cache[resolved] = _originalModules.get(resolved);
    _mockedModules.delete(resolved);
    _originalModules.delete(resolved);
  }
}
function resetAllMocks() {
  for (const resolved of _mockedModules.keys()) {
    if (_originalModules.has(resolved)) {
      require.cache[resolved] = _originalModules.get(resolved);
    }
  }
  _mockedModules.clear();
  _originalModules.clear();
}
function requireActual(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_originalModules.has(resolved)) {
    return _originalModules.get(resolved).exports;
  }
  return require(resolved);
}
function requireMock(modulePath) {
  const resolved = require.resolve(modulePath);
  if (_mockedModules.has(resolved)) {
    return _mockedModules.get(resolved);
  }
  return require(resolved);
}
var _mockedModules, _originalModules, path3, fs4, builtins;
var init_spy = __esm({
  "src/matchers/spy.js"() {
    _mockedModules = /* @__PURE__ */ new Map();
    _originalModules = /* @__PURE__ */ new Map();
    path3 = require("path");
    fs4 = require("fs");
    builtins = require("module").builtinModules || [];
    module.exports = {
      createSpy,
      isSpy,
      createStub,
      createMock,
      spy: createSpy,
      stub: createStub,
      mock,
      fn,
      spyOn,
      unmock,
      resetAllMocks,
      requireActual,
      requireMock
    };
  }
});

// src/run-assertions/hooks.js
var hooks_exports = {};
function beforeAll(fn2) {
  getCurrentSuite3().hooks.beforeAll.push(fn2);
}
function afterAll(fn2) {
  getCurrentSuite3().hooks.afterAll.push(fn2);
}
function beforeEach(fn2) {
  getCurrentSuite3().hooks.beforeEach.push(fn2);
}
function afterEach(fn2) {
  getCurrentSuite3().hooks.afterEach.push(fn2);
}
var getCurrentSuite3, fakeTimers, spy;
var init_hooks = __esm({
  "src/run-assertions/hooks.js"() {
    ({ getCurrentSuite: getCurrentSuite3 } = (init_suite(), __toCommonJS(suite_exports)));
    fakeTimers = (init_fake_timers(), __toCommonJS(fake_timers_exports));
    spy = (init_spy(), __toCommonJS(spy_exports));
    getCurrentSuite3().hooks.afterEach.push(function() {
      if (typeof fakeTimers.resetTimers === "function") fakeTimers.resetTimers();
      if (typeof spy.resetAllMocks === "function") spy.resetAllMocks();
    });
    module.exports = {
      beforeAll,
      afterAll,
      beforeEach,
      afterEach
    };
  }
});

// node_modules/deep-equal-check/dist/cjs/core/deep-equal-core.js
var require_deep_equal_core = __commonJS({
  "node_modules/deep-equal-check/dist/cjs/core/deep-equal-core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deepEqualCore = deepEqualCore;
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
        const length2 = arrA.length;
        if (length2 !== arrB.length)
          return false;
        for (let i = length2; i-- !== 0; ) {
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
      const length2 = keysA.length;
      if (length2 !== Object.keys(objB).length)
        return false;
      for (let i = length2; i-- !== 0; ) {
        if (!Object.prototype.hasOwnProperty.call(objB, keysA[i])) {
          return false;
        }
      }
      for (let i = length2; i-- !== 0; ) {
        const key = keysA[i];
        if (!deepEqualCore(objA[key], objB[key], options, seen, depth + 1)) {
          return false;
        }
      }
      return true;
    }
  }
});

// node_modules/deep-equal-check/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/deep-equal-check/dist/cjs/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.deepEqualCheck = deepEqualCheck;
    var deep_equal_core_1 = require_deep_equal_core();
    function deepEqualCheck(a, b, options = {}) {
      const opts = {
        nanEqual: options.nanEqual ?? true,
        checkPrototypes: options.checkPrototypes ?? false,
        strictZero: options.strictZero ?? false,
        maxDepth: options.maxDepth ?? 1e3
      };
      return (0, deep_equal_core_1.deepEqualCore)(a, b, opts, /* @__PURE__ */ new WeakMap(), 0);
    }
    exports2.default = deepEqualCheck;
  }
});

// src/matchers/utils.js
var utils_exports = {};
function isMatch(obj, partial) {
  if (typeof obj !== "object" || obj === null || typeof partial !== "object" || partial === null) return false;
  for (const key of Object.keys(partial)) {
    if (!(key in obj) || !deepEqual(obj[key], partial[key])) return false;
  }
  return true;
}
function getByPath(obj, path4) {
  if (!Array.isArray(path4)) path4 = String(path4).split(".");
  return path4.reduce((acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0, obj);
}
function hasByPath(obj, path4) {
  if (!Array.isArray(path4)) path4 = String(path4).split(".");
  let cur = obj;
  for (const key of path4) {
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
  const { Logger: Logger3 } = (init_logger(), __toCommonJS(logger_exports));
  const _log2 = new Logger3();
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
        const fs5 = require("fs");
        const lines = fs5.readFileSync(location.split(":")[0], "utf8").split("\n");
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
function matchSchema(obj, schema2) {
  if (typeof schema2 !== "object" || schema2 === null) return false;
  for (const key in schema2) {
    if (!(key in obj)) return false;
    const type2 = schema2[key];
    if (typeof type2 === "string") {
      if (typeof obj[key] !== type2) return false;
    } else if (typeof type2 === "function") {
      if (!(obj[key] instanceof type2)) return false;
    } else if (typeof type2 === "object") {
      if (!matchSchema(obj[key], type2)) return false;
    }
  }
  return true;
}
var util, deepEqual;
var init_utils = __esm({
  "src/matchers/utils.js"() {
    util = require("util");
    deepEqual = require_cjs();
    module.exports = {
      deepEqual,
      isMatch,
      getByPath,
      hasByPath,
      formatDiff,
      getMatcherResult,
      isArray,
      isObject,
      isString,
      isNumber,
      isBoolean,
      isFunction,
      isDate,
      isRegExp,
      isEmpty,
      isValidJSON,
      isValidURL,
      isValidEmail,
      isValidUUID,
      matchSchema
    };
  }
});

// src/matchers/equality.js
var equality_exports = {};
var getMatcherResult2, deepEqual2;
var init_equality = __esm({
  "src/matchers/equality.js"() {
    ({ getMatcherResult: getMatcherResult2 } = (init_utils(), __toCommonJS(utils_exports)));
    deepEqual2 = require_cjs();
    module.exports = {
      toBe: (received, expected) => getMatcherResult2(received === expected, "toBe", received, expected),
      toEqual: (received, expected) => getMatcherResult2(deepEqual2(received, expected), "toEqual", received, expected),
      toBeNull: (received) => getMatcherResult2(received === null, "toBeNull", received),
      toBeUndefined: (received) => getMatcherResult2(received === void 0, "toBeUndefined", received),
      toBeCloseTo: (received, expected) => getMatcherResult2(Math.round(expected) === Math.round(received), "toBeCloseTo", received, expected)
    };
  }
});

// src/matchers/type.js
var type_exports = {};
var getMatcherResult3, isArray2, isObject2, isString2, isNumber2, isBoolean2, isFunction2, isDate2, isRegExp2;
var init_type = __esm({
  "src/matchers/type.js"() {
    ({ getMatcherResult: getMatcherResult3, isArray: isArray2, isObject: isObject2, isString: isString2, isNumber: isNumber2, isBoolean: isBoolean2, isFunction: isFunction2, isDate: isDate2, isRegExp: isRegExp2 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toBeArray: (received) => getMatcherResult3(isArray2(received), "toBeArray", received),
      toBeObject: (received) => getMatcherResult3(isObject2(received), "toBeObject", received),
      toBeString: (received) => getMatcherResult3(isString2(received), "toBeString", received),
      toBeNumber: (received) => getMatcherResult3(isNumber2(received), "toBeNumber", received),
      toBeBoolean: (received) => getMatcherResult3(isBoolean2(received), "toBeBoolean", received),
      toBeFunction: (received) => getMatcherResult3(isFunction2(received), "toBeFunction", received),
      toBeDate: (received) => getMatcherResult3(isDate2(received), "toBeDate", received),
      toBeRegExp: (received) => getMatcherResult3(isRegExp2(received), "toBeRegExp", received)
    };
  }
});

// src/matchers/string.js
var string_exports = {};
var getMatcherResult4;
var init_string = __esm({
  "src/matchers/string.js"() {
    ({ getMatcherResult: getMatcherResult4 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toMatch: (received, expected) => {
        const result = typeof expected === "string" ? received.includes(expected) : new RegExp(expected).test(received);
        return getMatcherResult4(result, "toMatch", received, expected);
      },
      toContain: (received, expected) => {
        let result;
        if (typeof received === "string") {
          result = received.indexOf(String(expected)) !== -1;
        } else if (Array.isArray(received)) {
          result = received.indexOf(expected) !== -1;
        } else {
          result = false;
        }
        return getMatcherResult4(result, "toContain", received, expected);
      }
    };
  }
});

// src/matchers/object.js
var object_exports = {};
var getMatcherResult5, isMatch2, hasByPath2, getByPath2, deepEqual3;
var init_object = __esm({
  "src/matchers/object.js"() {
    ({ getMatcherResult: getMatcherResult5, isMatch: isMatch2, hasByPath: hasByPath2, getByPath: getByPath2, deepEqual: deepEqual3 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toMatchObject: (received, expected) => getMatcherResult5(isMatch2(received, expected), "toMatchObject", received, expected),
      toHaveProperty: (received, keyPath, value) => {
        let hasProp = hasByPath2(received, keyPath);
        let result = hasProp;
        if (hasProp && arguments.length === 3) {
          result = deepEqual3(getByPath2(received, keyPath), value);
        }
        return getMatcherResult5(result, "toHaveProperty", received, keyPath);
      }
    };
  }
});

// src/matchers/number.js
var number_exports = {};
var getMatcherResult6, isNumber3;
var init_number = __esm({
  "src/matchers/number.js"() {
    ({ getMatcherResult: getMatcherResult6, isNumber: isNumber3 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toBeGreaterThan: (received, expected) => getMatcherResult6(received > expected, "toBeGreaterThan", received, expected),
      toBeLessThan: (received, expected) => getMatcherResult6(received < expected, "toBeLessThan", received, expected),
      toBeGreaterThanOrEqual: (received, expected) => getMatcherResult6(received >= expected, "toBeGreaterThanOrEqual", received, expected),
      toBeLessThanOrEqual: (received, expected) => getMatcherResult6(received <= expected, "toBeLessThanOrEqual", received, expected),
      toBeNaN: (received) => getMatcherResult6(isNaN(received), "toBeNaN", received),
      toBeWithinRange: (received, min, max) => getMatcherResult6(isNumber3(received) && received >= min && received <= max, "toBeWithinRange", received, [min, max])
    };
  }
});

// src/matchers/spyMatchers.js
var spyMatchers_exports = {};
var getMatcherResult7, deepEqual4, isSpy2;
var init_spyMatchers = __esm({
  "src/matchers/spyMatchers.js"() {
    ({ getMatcherResult: getMatcherResult7, deepEqual: deepEqual4 } = (init_utils(), __toCommonJS(utils_exports)));
    ({ isSpy: isSpy2 } = (init_spy(), __toCommonJS(spy_exports)));
    module.exports = {
      toHaveBeenCalled: (received) => getMatcherResult7(isSpy2(received) && received.callCount > 0, "toHaveBeenCalled", received),
      toHaveBeenCalledWith: (received, ...args) => getMatcherResult7(isSpy2(received) && received.calls.some((call) => deepEqual4(call, args)), "toHaveBeenCalledWith", received, args),
      toHaveBeenCalledTimes: (received, times) => getMatcherResult7(isSpy2(received) && received.callCount === times, "toHaveBeenCalledTimes", received, times)
    };
  }
});

// src/matchers/async.js
var async_exports = {};
var getMatcherResult8;
var init_async = __esm({
  "src/matchers/async.js"() {
    ({ getMatcherResult: getMatcherResult8 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      async toResolve(received) {
        try {
          await received;
          return getMatcherResult8(true, "toResolve", received);
        } catch {
          return getMatcherResult8(false, "toResolve", received);
        }
      },
      async toReject(received) {
        try {
          await received;
          return getMatcherResult8(false, "toReject", received);
        } catch {
          return getMatcherResult8(true, "toReject", received);
        }
      }
    };
  }
});

// src/matchers/schema.js
var schema_exports = {};
var getMatcherResult9, matchSchema2;
var init_schema = __esm({
  "src/matchers/schema.js"() {
    ({ getMatcherResult: getMatcherResult9, matchSchema: matchSchema2 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toMatchSchema: (received, schema2) => getMatcherResult9(matchSchema2(received, schema2), "toMatchSchema", received, schema2)
    };
  }
});

// src/matchers/empty.js
var empty_exports = {};
var getMatcherResult10, isEmpty2;
var init_empty = __esm({
  "src/matchers/empty.js"() {
    ({ getMatcherResult: getMatcherResult10, isEmpty: isEmpty2 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toBeEmpty: (received) => getMatcherResult10(isEmpty2(received), "toBeEmpty", received)
    };
  }
});

// src/matchers/validation.js
var validation_exports = {};
var getMatcherResult11, isValidJSON2, isValidURL2, isValidEmail2, isValidUUID2;
var init_validation = __esm({
  "src/matchers/validation.js"() {
    ({ getMatcherResult: getMatcherResult11, isValidJSON: isValidJSON2, isValidURL: isValidURL2, isValidEmail: isValidEmail2, isValidUUID: isValidUUID2 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toBeValidJSON: (received) => getMatcherResult11(isValidJSON2(received), "toBeValidJSON", received),
      toBeValidURL: (received) => getMatcherResult11(isValidURL2(received), "toBeValidURL", received),
      toBeValidEmail: (received) => getMatcherResult11(isValidEmail2(received), "toBeValidEmail", received),
      toBeValidUUID: (received) => getMatcherResult11(isValidUUID2(received), "toBeValidUUID", received)
    };
  }
});

// src/matchers/satisfy.js
var satisfy_exports = {};
var getMatcherResult12;
var init_satisfy = __esm({
  "src/matchers/satisfy.js"() {
    ({ getMatcherResult: getMatcherResult12 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toSatisfy: (received, predicate) => getMatcherResult12(typeof predicate === "function" && predicate(received), "toSatisfy", received, predicate)
    };
  }
});

// src/matchers/throw.js
var throw_exports = {};
var getMatcherResult13;
var init_throw = __esm({
  "src/matchers/throw.js"() {
    ({ getMatcherResult: getMatcherResult13 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toThrow: (received, expected) => {
        let threw = false;
        let error;
        try {
          if (typeof received === "function") {
            received();
          } else if (received && typeof received.then === "function") {
            return received.then(
              () => getMatcherResult13(false, "toThrow", received, expected),
              (err) => {
                if (!expected) return getMatcherResult13(true, "toThrow", received, expected);
                if (typeof expected === "string") return getMatcherResult13(err && err.message && err.message.includes(expected), "toThrow", received, expected);
                if (expected instanceof RegExp) return getMatcherResult13(expected.test(err && err.message), "toThrow", received, expected);
                if (typeof expected === "function") return getMatcherResult13(err instanceof expected, "toThrow", received, expected);
                return getMatcherResult13(false, "toThrow", received, expected);
              }
            );
          }
        } catch (err) {
          threw = true;
          error = err;
        }
        if (!threw) return getMatcherResult13(false, "toThrow", received, expected);
        if (!expected) return getMatcherResult13(true, "toThrow", received, expected);
        if (typeof expected === "string") return getMatcherResult13(error && error.message && error.message.includes(expected), "toThrow", received, expected);
        if (expected instanceof RegExp) return getMatcherResult13(expected.test(error && error.message), "toThrow", received, expected);
        if (typeof expected === "function") return getMatcherResult13(error instanceof expected, "toThrow", received, expected);
        return getMatcherResult13(false, "toThrow", received, expected);
      }
    };
  }
});

// src/matchers/length.js
var length_exports = {};
var getMatcherResult14;
var init_length = __esm({
  "src/matchers/length.js"() {
    ({ getMatcherResult: getMatcherResult14 } = (init_utils(), __toCommonJS(utils_exports)));
    module.exports = {
      toHaveLength: (received, expected) => getMatcherResult14(received && received.length == expected, "toHaveLength", received, expected)
    };
  }
});

// src/matchers/index.js
var matchers_exports = {};
function addMatchers(matchers3) {
  Object.assign(customMatchers, matchers3);
}
function allMatchers(received) {
  const builtIn = {
    ...equality,
    ...type,
    ...string,
    ...object,
    ...number,
    ...spyMatchers,
    ...asyncMatchers,
    ...schema,
    ...empty,
    ...validation,
    ...satisfy,
    ...throwMatcher,
    ...length,
    ...utils
  };
  const matchers3 = { ...builtIn, ...customMatchers };
  const proxy = {};
  for (const key of Object.keys(matchers3)) {
    proxy[key] = (...args) => matchers3[key](received, ...args);
  }
  proxy.not = {};
  for (const key of Object.keys(matchers3)) {
    proxy.not[key] = (...args) => !matchers3[key](received, ...args);
  }
  return proxy;
}
var equality, type, string, object, number, spyMatchers, asyncMatchers, schema, empty, validation, satisfy, throwMatcher, length, utils, customMatchers;
var init_matchers = __esm({
  "src/matchers/index.js"() {
    equality = (init_equality(), __toCommonJS(equality_exports));
    type = (init_type(), __toCommonJS(type_exports));
    string = (init_string(), __toCommonJS(string_exports));
    object = (init_object(), __toCommonJS(object_exports));
    number = (init_number(), __toCommonJS(number_exports));
    spyMatchers = (init_spyMatchers(), __toCommonJS(spyMatchers_exports));
    asyncMatchers = (init_async(), __toCommonJS(async_exports));
    schema = (init_schema(), __toCommonJS(schema_exports));
    empty = (init_empty(), __toCommonJS(empty_exports));
    validation = (init_validation(), __toCommonJS(validation_exports));
    satisfy = (init_satisfy(), __toCommonJS(satisfy_exports));
    throwMatcher = (init_throw(), __toCommonJS(throw_exports));
    length = (init_length(), __toCommonJS(length_exports));
    utils = (init_utils(), __toCommonJS(utils_exports));
    customMatchers = {};
    module.exports = {
      ...equality,
      ...type,
      ...string,
      ...object,
      ...number,
      ...spyMatchers,
      ...asyncMatchers,
      ...schema,
      ...empty,
      ...validation,
      ...satisfy,
      ...throwMatcher,
      ...length,
      ...utils,
      addMatchers,
      allMatchers
    };
  }
});

// src/run-assertions/runner-core.js
var runner_core_exports = {};
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
async function resolveFixtures(test3, suite) {
  const fixtures = {};
  let current = suite;
  while (current) {
    Object.assign(fixtures, current.fixtures);
    current = current.parent;
  }
  const resolved = [];
  const teardowns = [];
  for (const name of test3.fixtures || []) {
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
  for (const test3 of suite.tests) {
    if (test3.mode === "skip") {
      _log.perceive("test", test3.desc + " (skipped)", test3.annotations);
      _log.status(true, null, true);
      continue;
    }
    for (const fn2 of suite.hooks.beforeEach) await fn2();
    let teardowns = [];
    try {
      _log.perceive("test", test3.desc, test3.annotations);
      const { resolved, teardowns: tds } = await resolveFixtures(test3, suite);
      teardowns = tds;
      const maybePromise = test3.fn(...resolved);
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
  if (hasOnly(rootSuite2)) {
    filterOnlySuites(rootSuite2);
  }
  (async () => {
    for (const suite of rootSuite2.suites) {
      await runSuite(suite);
    }
    _log.printSummary();
    if (process.env.FAUJI_REPORT || global.FAUJI_REPORT) {
      const type2 = process.env.FAUJI_REPORT || global.FAUJI_REPORT;
      const fs5 = require("fs");
      if (type2 === "html") {
        fs5.writeFileSync("fauji-report.html", _log.getResultsHTML(), "utf8");
        console.log("HTML report written to fauji-report.html");
      } else if (type2 === "json") {
        fs5.writeFileSync("fauji-report.json", JSON.stringify(_log.getResultsJSON(), null, 2), "utf8");
        console.log("JSON report written to fauji-report.json");
      }
    }
    if (_log.failed > 0) {
      process.exitCode = 1;
    }
  })();
}
function expect(exp) {
  return allMatchers2(exp);
}
var rootSuite2, Logger2, allMatchers2, _log;
var init_runner_core = __esm({
  "src/run-assertions/runner-core.js"() {
    ({ rootSuite: rootSuite2 } = (init_suite(), __toCommonJS(suite_exports)));
    ({ Logger: Logger2 } = (init_logger(), __toCommonJS(logger_exports)));
    ({ allMatchers: allMatchers2 } = (init_matchers(), __toCommonJS(matchers_exports)));
    _log = new Logger2();
    module.exports = {
      run,
      expect,
      runSuite,
      filterOnlySuites,
      hasOnly
    };
  }
});

// src/run-assertions/setup-globals.js
var setup_globals_exports = {};
function setupGlobals() {
  global.describe = describe2;
  global.test = test2;
  global.beforeAll = beforeAll2;
  global.afterAll = afterAll2;
  global.beforeEach = beforeEach2;
  global.afterEach = afterEach2;
  global.expect = matchers.allMatchers;
  global.run = run2;
  global.addMatchers = matchers.addMatchers;
  global.describe.only = describe2.only;
  global.describe.skip = describe2.skip;
  global.test.only = test2.only;
  global.test.skip = test2.skip;
  global.useFakeTimers = fakeTimers2.useFakeTimers;
  global.useRealTimers = fakeTimers2.useRealTimers;
  global.advanceTimersByTime = fakeTimers2.advanceTimersByTime;
  global.runAllTimers = fakeTimers2.runAllTimers;
  global.resetTimers = fakeTimers2.resetTimers;
  global.fn = spy2.fn;
  global.spyOn = spy2.spyOn;
  global.mock = spy2.mock;
  global.unmock = spy2.unmock;
  global.resetAllMocks = spy2.resetAllMocks;
  global.requireActual = spy2.requireActual;
  global.requireMock = spy2.requireMock;
  global.getTimerCalls = fakeTimers2.getTimerCalls;
  global.getTimerCallCount = fakeTimers2.getTimerCallCount;
}
var describe2, test2, beforeAll2, afterAll2, beforeEach2, afterEach2, run2, matchers, fakeTimers2, spy2;
var init_setup_globals = __esm({
  "src/run-assertions/setup-globals.js"() {
    ({ describe: describe2, test: test2 } = (init_registration(), __toCommonJS(registration_exports)));
    ({ beforeAll: beforeAll2, afterAll: afterAll2, beforeEach: beforeEach2, afterEach: afterEach2 } = (init_hooks(), __toCommonJS(hooks_exports)));
    ({ run: run2 } = (init_runner_core(), __toCommonJS(runner_core_exports)));
    matchers = (init_matchers(), __toCommonJS(matchers_exports));
    fakeTimers2 = (init_fake_timers(), __toCommonJS(fake_timers_exports));
    spy2 = (init_spy(), __toCommonJS(spy_exports));
    module.exports = setupGlobals;
    if (require.main === module && process.argv[2]) {
      setupGlobals();
      const testFile = process.argv[2];
      require(require("path").resolve(testFile));
      run2();
    }
  }
});

// src/index.js
var runner = (init_runner(), __toCommonJS(runner_exports));
var logger = (init_logger(), __toCommonJS(logger_exports));
var setupGlobals2 = (init_setup_globals(), __toCommonJS(setup_globals_exports));
var matchers2 = (init_matchers(), __toCommonJS(matchers_exports));
var spy3 = (init_spy(), __toCommonJS(spy_exports)).spy;
var stub = (init_spy(), __toCommonJS(spy_exports)).stub;
var mock2 = (init_spy(), __toCommonJS(spy_exports)).mock;
var { run: run3 } = (init_runner_core(), __toCommonJS(runner_core_exports));
module.exports = {
  runner,
  logger,
  setupGlobals: setupGlobals2,
  run: run3,
  addMatchers: matchers2.addMatchers,
  ...matchers2,
  spy: spy3,
  stub,
  mock: mock2
};
//# sourceMappingURL=index.cjs.map
