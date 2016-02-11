/*[system-bundles-config]*/
System.bundles = {"bundles/index.css!":["style/style.less!$less"]};
/*npm-utils*/
define("npm-utils",function(e,t,r){function a(e){var t=String(e).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return t?{href:t[0]||"",protocol:t[1]||"",authority:t[2]||"",host:t[3]||"",hostname:t[4]||"",port:t[5]||"",pathname:t[6]||"",search:t[7]||"",hash:t[8]||""}:null}var n=/.+@.+\..+\..+#.+/,o={extend:function(e,t){for(var r in t)e[r]=t[r];return e},map:function(e,t){for(var r=0,a=e.length,n=[];a>r;r++)n.push(t.call(e,e[r]));return n},filter:function(e,t){for(var r,a=0,n=e.length,o=[];n>a;a++)r=t.call(e,e[a]),r&&o.push(r);return o},forEach:function(e,t){for(var r=0,a=e.length;a>r;r++)t.call(e,e[r],r)},moduleName:{create:function(e,t){if(t)return e.moduleName;if("@empty"===e)return e;var r;return e.modulePath&&(r="./"===e.modulePath.substr(0,2)?e.modulePath.substr(2):e.modulePath),e.packageName+(e.version?"@"+e.version:"")+(r?"#"+r:"")+(e.plugin?e.plugin:"")},isNpm:function(e){return n.test(e)},parse:function(e,t){var r=e.split("!"),a=r[0].split("#"),n=a[0].split("@");a[1]||n[0]||(n=["@"+n[1]]);var s,i;if(t&&o.path.isRelative(e))s=t,i=n[0];else if(a[1])s=n[0],i=a[1];else{var u=n[0].split("/");s=u.shift(),i=u.join("/")}return{plugin:2===r.length?"!"+r[1]:void 0,version:n[1],modulePath:i,packageName:s,moduleName:e}},parseFromPackage:function(e,t,r,a){var n=o.pkg.name(t),s=o.moduleName.parse(r,n);if(o.path.isRelative(s.modulePath)){var i=o.moduleName.parse(a,n);i.packageName===s.packageName&&i.modulePath&&(s.modulePath=o.path.makeRelative(o.path.joinURIs(i.modulePath,s.modulePath)))}var u,l=o.moduleName.create(s);!(t.browser&&"string"!=typeof t.browser&&l in t.browser)||t.system&&t.system.ignoreBrowser||(u=t.browser[l]===!1?"@empty":t.browser[l]);var p=e&&e.globalBrowser&&e.globalBrowser[l];return p&&(u=p.moduleName===!1?"@empty":p.moduleName),u?o.moduleName.parse(u,n):s}},pkg:{name:function(e){return e.system&&e.system.name||e.name},main:function(e){return o.path.removeJS(e.system&&e.system.main||"string"==typeof e.browser&&e.browser||e.main||"index")},rootDir:function(e,t){var r=t?o.path.removePackage(e.fileUrl):o.path.pkgDir(e.fileUrl),a=e.system&&e.system.directories&&e.system.directories.lib;return a&&(r=o.path.joinURIs(o.path.addEndingSlash(r),a)),r},findByModuleNameOrAddress:function(e,t,r){if(e.npm){if(t){var a=o.moduleName.parse(t);if(a.version&&a.packageName){var n=a.packageName+"@"+a.version;if(n in e.npm)return e.npm[n]}}if(r){var s=o.pkg.folderAddress(r);return s?e.npmPaths[s]:e.npmPaths.__default}return e.npmPaths.__default}},folderAddress:function(e){var t="/node_modules/",r=e.lastIndexOf(t),a=e.indexOf("/",r+t.length);return r>=0?a>=0?e.substr(0,a):e:void 0},findDep:function(e,t,r){if(e.npm&&t&&!o.path.startsWithDotSlash(r))for(var a=o.path.depPackageDir(t.fileUrl,r);a;){var n=e.npmPaths[a];if(n)return n;var s=o.path.parentNodeModuleAddress(a);if(!s)return;a=s+"/"+r}},findByName:function(e,t){return e.npm&&!o.path.startsWithDotSlash(t)?e.npm[t]:void 0},hasDirectoriesLib:function(e){var t=e.system;return t&&t.directories&&!!t.directories.lib}},path:{makeRelative:function(e){return o.path.isRelative(e)&&"/"!==e.substr(0,1)?e:"./"+e},removeJS:function(e){return e.replace(/\.js(!|$)/,function(e,t){return t})},removePackage:function(e){return e.replace(/\/package\.json.*/,"")},addJS:function(e){return/\.js(on)?$/.test(e)?e:e+".js"},isRelative:function(e){return"."===e.substr(0,1)},joinURIs:function(e,t){function r(e){var t=[];return e.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(e){"/.."===e?t.pop():t.push(e)}),t.join("").replace(/^\//,"/"===e.charAt(0)?"/":"")}return t=a(t||""),e=a(e||""),t&&e?(t.protocol||e.protocol)+(t.protocol||t.authority?t.authority:e.authority)+r(t.protocol||t.authority||"/"===t.pathname.charAt(0)?t.pathname:t.pathname?(e.authority&&!e.pathname?"/":"")+e.pathname.slice(0,e.pathname.lastIndexOf("/")+1)+t.pathname:e.pathname)+(t.protocol||t.authority||t.pathname?t.search:t.search||e.search)+t.hash:null},startsWithDotSlash:function(e){return"./"===e.substr(0,2)},endsWithSlash:function(e){return"/"===e[e.length-1]},addEndingSlash:function(e){return o.path.endsWithSlash(e)?e:e+"/"},depPackage:function(e,t){var r=e.replace(/\/package\.json.*/,"");return(r?r+"/":"")+"node_modules/"+t+"/package.json"},depPackageDir:function(e,t){return o.path.depPackage(e,t).replace(/\/package\.json.*/,"")},parentNodeModuleAddress:function(e){var t="/node_modules/",r=e.lastIndexOf(t),a=e.lastIndexOf(t,r-1);return a>=0?e.substr(0,a+t.length-1):void 0},pkgDir:function(e){var t="/node_modules/",r=e.lastIndexOf(t),a=e.indexOf("/",r+t.length);return r>=0?a>=0?e.substr(0,a):e:void 0}},includeInBuild:!0};r.exports=o});
/*npm-extension*/
define("npm-extension",function(a,e,t){"format cjs";var i=a("./npm-utils");e.includeInBuild=!0,e.addExtension=function(a){var e=a.normalize;a.normalize=function(a,t,r){if(t&&i.path.isRelative(a)&&!i.moduleName.isNpm(t))return e.call(this,a,t,r);var n=i.pkg.findByModuleNameOrAddress(this,t,r);if(!n)return e.call(this,a,t,r);var m=i.moduleName.parseFromPackage(this,n,a,t),s=i.pkg.findDep(this,n,m.packageName);if(s||(s=i.pkg.findByName(this,m.packageName)),!s){var o=this.globalBrowser[m.packageName];o&&(m.packageName=o,s=i.pkg.findByName(this,m.packageName))}if(!s&&n===this.npmPaths.__default&&a===n.main&&i.pkg.hasDirectoriesLib(n))return m.version=n.version,m.packageName=n.name,m.modulePath=i.pkg.main(n),e.call(this,i.moduleName.create(m),t,r);if(s){m.version=s.version,m.modulePath||(m.modulePath=i.pkg.main(s));var l=i.moduleName.create(m);return n.system&&n.system.map&&"string"==typeof n.system.map[l]&&(l=n.system.map[l]),e.call(this,l,t,r)}if(s===this.npmPaths.__default){var u=m.modulePath?m.modulePath+(m.plugin?m.plugin:""):i.pkg.main(s);return e.call(this,u,t,r)}return n.browser&&n.browser[a]?e.call(this,n.browser[a],t,r):e.call(this,a,t,r)};var t=a.locate;a.locate=function(a){var e=i.moduleName.parse(a.name),r=this;if(e.version&&this.npm&&!r.paths[a.name]){var n=this.npm[e.packageName];if(n)return t.call(this,a).then(function(a){var t=i.pkg.rootDir(n,n===r.npmPaths.__default);return e.modulePath?i.path.joinURIs(i.path.addEndingSlash(t),e.plugin?e.modulePath:i.path.addJS(e.modulePath)):a})}return t.call(this,a)};var r=function(a,e){var t=i.pkg.findByName(a,e.split("/")[0]);if(t){var r=i.moduleName.parse(e,t.name);return r.version=t.version,r.modulePath||(r.modulePath=i.pkg.main(t)),i.moduleName.create(r)}return e},n={map:function(a){var e,t={};for(var i in a)e=a[i],t[r(this,i)]="object"==typeof e?n.map(e):r(this,e);return t},meta:function(a){var e={};for(var t in a)e[r(this,t)]=a[t];return e},paths:function(a){var e={};for(var t in a)e[r(this,t)]=a[t];return e}},m=a.config;a.config=function(a){var e=this;for(var t in a)n[t]&&(a[t]=n[t].call(e,a[t]));m.apply(e,arguments)}}});
/*semver*/
define('semver', [], function(){ return {}; });
/*npm-crawl*/
define('npm-crawl', [], function(){ return {}; });
/*npm*/
define('npm', [], function(){ return {}; });
/*package.json!npm*/
define("package.json!npm",["@loader","npm-extension","module"],function(e,s,t){s.addExtension(e),e.main||(e.main="index"),e._npmExtensions=[].slice.call(arguments,2),function(e,s){var o=e.global;o.process||(o.process={cwd:function(){},env:{NODE_ENV:e.env}}),e.npm||(e.npm={},e.npmPaths={},e.globalBrowser={}),e.npmPaths.__default=s[0];var n=(s[0].system&&s[0].system.directories&&s[0].system.directories.lib,function(s,t){for(var o in s)e.globalBrowser[o]={pkg:t,moduleName:s[o]}}),a=function(s,t){e.npm[s]||(e.npm[s]=t),e.npm[s+"@"+t.version]=t},i=function(e,s){for(var t=0,o=e.length;o>t;t++)s.call(e,e[t])},c=function(){var s=!(!e.liveReloadInstalled&&!e._liveMap);s&&e["import"]("live-reload",{name:t.id}).then(function(s){s.dispose(function(){delete e.npm,delete e.npmPaths})})};i(s,function(s){if(s.system){var t=s.system.main;delete s.system.main,delete s.system.configDependencies,e.config(s.system),s.system.main=t}s.globalBrowser&&n(s.globalBrowser,s);var o=s.system&&s.system.name;o?a(o,s):a(s.name,s),e.npm[s.name]||(e.npm[s.name]=s),e.npm[s.name+"@"+s.version]=s;var i=s.fileUrl.replace(/\/package\.json.*/,"");e.npmPaths[i]=s}),i(e._npmExtensions||[],function(s){s.systemConfig&&e.config(s.systemConfig)}),c()}(e,[{name:"wowbao",version:"0.0.0",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/package.json",main:"index.js",globalBrowser:{},browser:{}},{name:"can",version:"2.3.15",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/node_modules/can/package.json",main:"./can",system:{ignoreBrowser:!0,main:"can",map:{"can@2.3.15#can":"can@2.3.15#can","jquery@2.2.0#jquery":"jquery@2.2.0#dist/jquery","steal-benchmark/steal-benchmark":"steal-benchmark","can-simple-dom@0.3.0-pre.3#can-simple-dom":"can-simple-dom@0.3.0-pre.3#simple-dom","jquery-ui/jquery-ui":"jquery-ui","steal-qunit/steal-qunit":"steal-qunit","can@2.3.15#util/vdom/vdom":"@empty"},paths:{"benchmark/benchmark":"bower_components/benchmark/benchmark.js","dojo/dojo":"util/dojo/dojo-1.8.1.js","yui/yui":"util/yui/yui-3.7.3.js","mootools/mootools":"bower_components/mootools/dist/mootools-core.js","zepto/zepto":"bower_components/zepto/zepto.js"},meta:{"benchmark/benchmark":{format:"global",exports:"Benchmark"},"jquery@2.2.0#dist/jquery":{format:"global",exports:"jQuery"},"dojo/dojo":{format:"global",exports:"Dojo"},"yui/yui":{exports:"YUI",format:"global",scriptEval:!0},"mootools/mootools":{exports:"MooTools",format:"global",scriptEval:!0},"zepto/zepto":{format:"global",exports:"Zepto"},"can@2.3.15#util/vdom/vdom":{sideBundle:!0}},ext:{ejs:"can/view/ejs/system",mustache:"can/view/mustache/system",stache:"can/view/stache/system"},buildConfig:{map:{"can@2.3.15#util/util":"can@2.3.15#util/domless/domless"}},npmIgnore:{"grunt-docco2":!0,testee:!0,zombie:!0,"bitovi-tools":!0,steal:!0,bower:!0,"steal-tools":!0,connect:!0,grunt:!0,"grunt-cli":!0,"grunt-contrib-clean":!0,"grunt-contrib-connect":!0,"grunt-contrib-jshint":!0,"grunt-contrib-uglify":!0,"grunt-jsbeautifier":!0,"grunt-plato":!0,"grunt-release-steps":!0,"grunt-shell":!0,"grunt-simple-mocha":!0,"grunt-string-replace":!0,rimraf:!0,lodash:!0,browserify:!0,"grunt-banner":!0,documentjs:!0},envs:{"server-development":{map:{"can/util/vdom/vdom":"can/util/vdom/vdom"},meta:{jquery:{format:"global",exports:"jQuery",deps:["can/util/vdom/vdom"]}}},"server-production":{map:{"can/util/vdom/vdom":"can/util/vdom/vdom"},meta:{jquery:{format:"global",deps:["can/util/vdom/vdom"]}}},"build-development":{map:{"can/util/vdom/vdom":"can/util/vdom/vdom"},meta:{jquery:{format:"global",exports:"jQuery",deps:["can/util/vdom/vdom"]}}}}},globalBrowser:{},browser:{"can#can":"can#dist/cjs/can","can#component/component":"can#dist/cjs/component/component","can#construct/construct":"can#dist/cjs/construct/construct","can#map/map":"can#dist/cjs/map/map","can#list/list":"can#dist/cjs/list/list","can#list/promise/promise":"can#dist/cjs/list/promise/promise","can#observe/observe":"can#dist/cjs/observe/observe","can#compute/compute":"can#dist/cjs/compute/compute","can#model/model":"can#dist/cjs/model/model","can#view/view":"can#dist/cjs/view/view","can#view/ejs/ejs":"can#dist/cjs/view/ejs/ejs","can#view/stache/stache":"can#dist/cjs/view/stache/stache","can#view/href/href":"can#dist/cjs/view/href/href","can#control/control":"can#dist/cjs/control/control","can#route/route":"can#dist/cjs/route/route","can#control/route/route":"can#dist/cjs/control/route/route","can#view/mustache/mustache":"can#dist/cjs/view/mustache/mustache","can#route/pushstate/pushstate":"can#dist/cjs/route/pushstate/pushstate","can#model/queue/queue":"can#dist/cjs/model/queue/queue","can#construct/super/super":"can#dist/cjs/construct/super/super","can#construct/proxy/proxy":"can#dist/cjs/construct/proxy/proxy","can#map/lazy/lazy":"can#dist/cjs/map/lazy/lazy","can#map/delegate/delegate":"can#dist/cjs/map/delegate/delegate","can#map/setter/setter":"can#dist/cjs/map/setter/setter","can#map/attributes/attributes":"can#dist/cjs/map/attributes/attributes","can#map/validations/validations":"can#dist/cjs/map/validations/validations","can#map/backup/backup":"can#dist/cjs/map/backup/backup","can#map/list/list":"can#dist/cjs/map/list/list","can#map/define/define":"can#dist/cjs/map/define/define","can#list/sort/sort":"can#dist/cjs/list/sort/sort","can#control/plugin/plugin":"can#dist/cjs/control/plugin/plugin","can#view/modifiers/modifiers":"can#dist/cjs/view/modifiers/modifiers","can#util/fixture/fixture":"can#dist/cjs/util/fixture/fixture","can#view/bindings/bindings":"can#dist/cjs/view/bindings/bindings","can#view/live/live":"can#dist/cjs/view/live/live","can#view/scope/scope":"can#dist/cjs/view/scope/scope","can#util/tests/tests":"can#dist/cjs/util/tests/tests","can#util/object/object":"can#dist/cjs/util/object/object","can#util/function/function":"can#dist/cjs/util/function/function","can#view/autorender/autorender":"can#dist/cjs/view/autorender/autorender","can#util/domless/domless":"can#dist/cjs/util/domless/domless","can#view/stache/system":"can#dist/cjs/view/stache/system","can#view/mustache/system":"can#dist/cjs/view/mustache/system","can#view/ejs/system":"can#dist/cjs/view/ejs/system","can#util/event":"can#dist/cjs/util/event","can#map/sort/sort":"can#dist/cjs/map/sort/sort","can#util/vdom/build_fragment/build_fragment":"can#dist/cjs/util/vdom/build_fragment/build_fragment","can#util/vdom/document/document":"can#dist/cjs/util/vdom/document/document","can#view/import/import":"can#dist/cjs/view/import/import"}},{name:"jquery",version:"2.2.0",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/node_modules/jquery/package.json",main:"dist/jquery.js",globalBrowser:{},browser:{}},{name:"moment",version:"2.11.2",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/node_modules/moment/package.json",main:"./moment.js",globalBrowser:{},browser:{}},{name:"can-simple-dom",version:"0.3.0-pre.3",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/node_modules/can/node_modules/can-simple-dom/package.json",main:"dist/cjs/simple-dom.js",system:{main:"simple-dom.js",directories:{lib:"lib"},npmIgnore:{testee:!0},transpiler:"babel"},globalBrowser:{},browser:{}},{name:"micro-location",version:"0.1.5",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/node_modules/can/node_modules/can-simple-dom/node_modules/micro-location/package.json",main:"lib/micro-location.js",globalBrowser:{},browser:{}},{name:"simple-html-tokenizer",version:"0.2.1",fileUrl:"file:/Users/mark/Projects/Bitovi/wowbao/node_modules/can/node_modules/can-simple-dom/node_modules/simple-html-tokenizer/package.json",main:"dist/simple-html-tokenizer.js",globalBrowser:{},browser:{}}])});
/*$css*/
define("$css",function(e,t,n){var d=e("@loader");"production"===d.env?t.fetch=function(e){var t=e.address,n=document.createElement("link");return n.rel="stylesheet",n.href=t,document.head.appendChild(n),""}:t.instantiate=function(e){var t=this;e.metadata.deps=[],e.metadata.execute=function(){var n=e.source+"/*# sourceURL="+e.address+" */";if(n=n.replace(/url\(['"]?([^'"\)]*)['"]?\)/g,function(t,n){return"url("+steal.joinURIs(e.address,n)+")"}),e.source&&"undefined"!=typeof document){var d=document.head?document:document.getElementsByTagName?document:document.documentElement,a=d.head||d.getElementsByTagName("head")[0],o=document.createElement("style");if(!a){var r=d.documentElement||d;a=document.createElement("head"),r.insertBefore(a,r.firstChild)}if(o.type="text/css",o.styleSheet?o.styleSheet.cssText=n:o.appendChild(document.createTextNode(n)),a.appendChild(o),t.has("live-reload")){var c=t["import"]("live-reload",{name:"$css"});Promise.resolve(c).then(function(n){t["import"](e.name).then(function(){n.once(e.name,function(){a.removeChild(o)})})})}}return System.newModule({source:n})},e.metadata.format="css"},t.buildType="css",t.includeInBuild=!0});
/*less*/
define('less', [], function(){ return {}; });
/*$less*/
define('$less', [], function(){ return {}; });
/*index*/
define("index",["exports","style/style.less!"],function(e,s){"use strict"});