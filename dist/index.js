var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
    var os = require("os");
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
        var osRelease = os.release().split(".");
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
    var util = require("util");
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
          return util.inspect(arg);
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

// src/run-assertions/runner.js
var require_runner = __commonJS({
  "src/run-assertions/runner.js"(exports2, module2) {
    var _colors = require_safe();
    var fs = require("fs");
    var path = require("path");
    var childProcess = require("child_process");
    function findTestFiles({ dir, pattern, name }) {
      let testFiles = [];
      function getFilesOfDir(currentDir) {
        fs.readdirSync(currentDir).forEach((item) => {
          const fullPath = path.join(currentDir, item);
          if (fs.statSync(fullPath).isDirectory()) {
            getFilesOfDir(fullPath);
          } else if ((!pattern || item.includes(pattern)) && (!name || item.includes(name))) {
            testFiles.push(fullPath);
          }
        });
      }
      getFilesOfDir(dir);
      return testFiles;
    }
    function runTestFiles(testFiles) {
      if (testFiles.length > 0) {
        testFiles.forEach((file) => {
          const subprocess = childProcess.execFile("node", [require.resolve("../src/run-assertions/setup-globals.js"), file], (error, stdout, stderr) => {
            console.log(_colors.blue("\nTest result of " + file));
            if (error) {
              console.log(_colors.red("Test failed: " + error.message));
            }
            if (stdout) {
              process.stdout.write(_colors.green(stdout));
            }
            if (stderr) {
              process.stderr.write(_colors.red(stderr));
            }
          });
        });
      } else {
        console.log(_colors.yellow("No test scripts found."));
      }
    }
    function watchAndRun({ dir, pattern, name }) {
      console.log(_colors.cyan("Watch mode enabled. Watching for file changes..."));
      runAll();
      fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename && (!pattern || filename.includes(pattern))) {
          console.log(_colors.magenta(`
File changed: ${filename}. Re-running tests...`));
          runAll();
        }
      });
      function runAll() {
        const testFiles = findTestFiles({ dir, pattern, name });
        runTestFiles(testFiles);
      }
    }
    function main(options = {}) {
      const dir = options.dir || process.cwd();
      const pattern = options.pattern || "test.js";
      const name = options.name || "";
      const watch = options.watch || false;
      if (watch) {
        watchAndRun({ dir, pattern, name });
      } else {
        const testFiles = findTestFiles({ dir, pattern, name });
        runTestFiles(testFiles);
      }
    }
    module2.exports = main;
  }
});

// src/run-assertions/logger.js
var require_logger = __commonJS({
  "src/run-assertions/logger.js"(exports2, module2) {
    var _colors = require_safe();
    var Logger = class {
      constructor() {
        this.total = 0;
        this.passed = 0;
        this.failed = 0;
        this.testResults = [];
        this.suiteStack = [];
        this.startTime = null;
        this.endTime = null;
      }
      startTimer() {
        this.startTime = Date.now();
      }
      endTimer() {
        this.endTime = Date.now();
      }
      perceive(context, msg) {
        if (context === "describe") {
          this.suiteStack.push(msg);
          console.log(_colors.bold("\n" + msg));
        } else if (context === "test") {
          this.currentTest = { name: msg, suite: [...this.suiteStack], status: null, error: null, duration: 0 };
          this.currentTest.start = Date.now();
          process.stdout.write("  " + msg);
        }
      }
      status(result, error = null) {
        this.total++;
        if (this.currentTest) {
          this.currentTest.duration = Date.now() - this.currentTest.start;
          if (result) {
            this.passed++;
            this.currentTest.status = "passed";
            console.log(" " + _colors.green("\u2713"));
          } else {
            this.failed++;
            this.currentTest.status = "failed";
            this.currentTest.error = error;
            console.log(" " + _colors.red("\u2717"));
          }
          this.testResults.push(this.currentTest);
          this.currentTest = null;
        }
      }
      getStats() {
        return {
          total: this.total,
          passed: this.passed,
          failed: this.failed
        };
      }
      printSummary() {
        this.endTimer();
        const duration = this.endTime && this.startTime ? this.endTime - this.startTime : 0;
        console.log(_colors.bold("\nTest Suites: ") + `${this.failed > 0 ? _colors.red(this.failed + " failed") : _colors.green(this.passed + " passed")} | ${this.total} total`);
        console.log(_colors.bold("Tests:      ") + `${_colors.green(this.passed + " passed")}, ${_colors.red(this.failed + " failed")}, ${this.total} total`);
        console.log(_colors.bold("Time:       ") + `${(duration / 1e3).toFixed(2)}s`);
        for (const result of this.testResults) {
          const suitePath = result.suite.length ? result.suite.join(" > ") + " > " : "";
          const statusColor = result.status === "passed" ? _colors.green : _colors.red;
          console.log("  " + statusColor(result.status.toUpperCase()) + " " + suitePath + result.name + _colors.gray(` (${result.duration}ms)`));
          if (result.status === "failed" && result.error) {
            console.log(_colors.red("    " + (result.error.stack || result.error)));
          }
        }
      }
    };
    module2.exports = { Logger };
  }
});

// src/matchers/matchers.js
var require_matchers = __commonJS({
  "src/matchers/matchers.js"(exports2, module2) {
    var util = require("util");
    var { Logger } = require_logger();
    var _log = new Logger();
    function deepEqual(a, b) {
      if (a === b) return true;
      if (typeof a !== typeof b) return false;
      if (typeof a !== "object" || a === null || b === null) return false;
      if (Array.isArray(a) !== Array.isArray(b)) return false;
      if (Array.isArray(a)) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
          if (!deepEqual(a[i], b[i])) return false;
        }
        return true;
      }
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      for (const key of aKeys) {
        if (!b.hasOwnProperty(key) || !deepEqual(a[key], b[key])) return false;
      }
      return true;
    }
    function isMatch(obj, partial) {
      if (typeof obj !== "object" || obj === null || typeof partial !== "object" || partial === null) return false;
      for (const key of Object.keys(partial)) {
        if (!(key in obj) || !deepEqual(obj[key], partial[key])) return false;
      }
      return true;
    }
    function getByPath(obj, path) {
      if (!Array.isArray(path)) path = String(path).split(".");
      return path.reduce((acc, key) => acc && acc[key] !== void 0 ? acc[key] : void 0, obj);
    }
    function hasByPath(obj, path) {
      if (!Array.isArray(path)) path = String(path).split(".");
      let cur = obj;
      for (const key of path) {
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
      if (!result) {
        const notText = isNot ? "not." : "";
        let message = `Expected: ${notText}${matcherName}
  Received: ${JSON.stringify(received)}`;
        if (typeof expected !== "undefined") {
          message += `
  Expected: ${JSON.stringify(expected)}`;
        }
        if (["toEqual", "toMatchObject"].includes(matcherName) && typeof received === "object" && typeof expected === "object") {
          message += formatDiff(received, expected);
        }
        _log.error(message);
      } else {
        _log.status(result);
      }
      return result;
    }
    var baseMatchers = {
      toBe: (received, expected) => getMatcherResult(received === expected, "toBe", received, expected),
      toEqual: (received, expected) => getMatcherResult(deepEqual(received, expected), "toEqual", received, expected),
      toBeNull: (received) => getMatcherResult(received === null, "toBeNull", received),
      toBeUndefined: (received) => getMatcherResult(received === void 0, "toBeUndefined", received),
      toBeCloseTo: (received, expected) => getMatcherResult(Math.round(expected) === Math.round(received), "toBeCloseTo", received, expected),
      toBeTruthy: (received) => getMatcherResult(!!received === true, "toBeTruthy", received),
      toBeFalsy: (received) => getMatcherResult(!received === true, "toBeFalsy", received),
      toBeGreaterThan: (received, expected) => getMatcherResult(received > expected, "toBeGreaterThan", received, expected),
      toBeLessThan: (received, expected) => getMatcherResult(received < expected, "toBeLessThan", received, expected),
      toBeGreaterThanOrEqual: (received, expected) => getMatcherResult(received >= expected, "toBeGreaterThanOrEqual", received, expected),
      toBeLessThanOrEqual: (received, expected) => getMatcherResult(received <= expected, "toBeLessThanOrEqual", received, expected),
      toBeNaN: (received) => getMatcherResult(isNaN(received), "toBeNaN", received),
      toMatch: (received, expected) => {
        const result = typeof expected === "string" ? received.includes(expected) : new RegExp(expected).test(received);
        return getMatcherResult(result, "toMatch", received, expected);
      },
      toMatchObject: (received, expected) => getMatcherResult(isMatch(received, expected), "toMatchObject", received, expected),
      toContain: (received, expected) => {
        let result;
        if (typeof received === "string") {
          result = received.indexOf(String(expected)) !== -1;
        } else if (Array.isArray(received)) {
          result = received.indexOf(expected) !== -1;
        } else {
          result = false;
        }
        return getMatcherResult(result, "toContain", received, expected);
      },
      toHaveLength: (received, expected) => getMatcherResult(received && received.length == expected, "toHaveLength", received, expected),
      toHaveProperty: (received, keyPath, value) => {
        let hasProp = hasByPath(received, keyPath);
        let result = hasProp;
        if (hasProp && arguments.length === 3) {
          result = deepEqual(getByPath(received, keyPath), value);
        }
        return getMatcherResult(result, "toHaveProperty", received, keyPath);
      },
      toThrow: (received, expected) => {
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
      },
      toBeInstanceOf: (received, expected) => getMatcherResult(received instanceof expected, "toBeInstanceOf", received, expected)
    };
    function generateNotMatchers(matchers) {
      const notMatchers = {};
      for (const key in matchers) {
        notMatchers[key] = (...args) => {
          const result = matchers[key](...args);
          if (result && typeof result.then === "function") {
            return result.then((res) => {
              if (res) {
                getMatcherResult(false, key, args[0], args[1], true);
                return false;
              }
              return true;
            });
          }
          if (result) {
            getMatcherResult(false, key, args[0], args[1], true);
            return false;
          }
          return true;
        };
      }
      return notMatchers;
    }
    var userMatchers = {};
    function addMatchers(newMatchers) {
      userMatchers = { ...userMatchers, ...newMatchers };
    }
    function createAsyncMatchers(promise, isReject = false) {
      return new Proxy({}, {
        get(target, matcherName) {
          return async (...args) => {
            try {
              const value = await promise;
              if (isReject) {
                getMatcherResult(false, matcherName, value, args[0]);
                return false;
              }
              return allMatchers(value)[matcherName](...args);
            } catch (err) {
              if (!isReject) {
                getMatcherResult(false, matcherName, err, args[0]);
                return false;
              }
              return allMatchers(err)[matcherName](...args);
            }
          };
        }
      });
    }
    function allMatchers(received) {
      const matchers = {};
      const all = { ...baseMatchers, ...userMatchers };
      for (const key in all) {
        matchers[key] = (...args) => all[key](received, ...args);
      }
      matchers.not = generateNotMatchers(matchers);
      if (received && typeof received.then === "function") {
        matchers.resolves = createAsyncMatchers(received, false);
        matchers.rejects = createAsyncMatchers(received, true);
      }
      return matchers;
    }
    module2.exports = {
      allMatchers,
      baseMatchers,
      // for custom matcher extension
      addMatchers
    };
  }
});

// src/run-assertions/watcher.js
var require_watcher = __commonJS({
  "src/run-assertions/watcher.js"(exports2, module2) {
    var { allMatchers } = require_matchers();
    var { Logger } = require_logger();
    var Suite = class {
      constructor(desc) {
        this.desc = desc;
        this.tests = [];
        this.suites = [];
        this.hooks = { beforeAll: [], beforeEach: [], afterEach: [], afterAll: [] };
        this.parent = null;
      }
    };
    var rootSuite = new Suite("");
    var currentSuite = rootSuite;
    var _log = new Logger();
    function describe(desc, fn) {
      const suite = new Suite(desc);
      suite.parent = currentSuite;
      currentSuite.suites.push(suite);
      currentSuite = suite;
      fn();
      currentSuite = suite.parent;
    }
    function test(desc, fn) {
      currentSuite.tests.push({ desc, fn });
    }
    function beforeAll(fn) {
      currentSuite.hooks.beforeAll.push(fn);
    }
    function afterAll(fn) {
      currentSuite.hooks.afterAll.push(fn);
    }
    function beforeEach(fn) {
      currentSuite.hooks.beforeEach.push(fn);
    }
    function afterEach(fn) {
      currentSuite.hooks.afterEach.push(fn);
    }
    function runSuite(suite) {
      _log.perceive("describe", suite.desc);
      suite.hooks.beforeAll.forEach((fn) => fn());
      for (const test2 of suite.tests) {
        suite.hooks.beforeEach.forEach((fn) => fn());
        try {
          _log.perceive("test", test2.desc);
          test2.fn();
          _log.status(true);
        } catch (e) {
          _log.status(false, e);
        }
        suite.hooks.afterEach.forEach((fn) => fn());
      }
      for (const child of suite.suites) {
        runSuite(child);
      }
      suite.hooks.afterAll.forEach((fn) => fn());
      _log.suiteStack.pop();
    }
    function run() {
      _log.startTimer();
      for (const suite of rootSuite.suites) {
        runSuite(suite);
      }
      _log.printSummary();
    }
    function expect(exp) {
      return allMatchers(exp);
    }
    module2.exports = {
      describe,
      test,
      beforeAll,
      afterAll,
      beforeEach,
      afterEach,
      expect,
      run
    };
  }
});

// src/index.js
module.exports = {
  runner: require_runner(),
  watcher: require_watcher(),
  logger: require_logger(),
  setupGlobals: require("../src/run-assertions/setup-globals.js"),
  matchers: require_matchers()
};
//# sourceMappingURL=index.js.map
