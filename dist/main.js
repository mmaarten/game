/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar EventManager     = __webpack_require__( /*! ./events/EventManager */ \"./src/events/EventManager.js\" );\nvar SceneManager     = __webpack_require__( /*! ./scenes/SceneManager */ \"./src/scenes/SceneManager.js\" );\nvar DOMContentLoaded = __webpack_require__( /*! ./dom/DOMContentLoaded */ \"./src/dom/DOMContentLoaded.js\" );\nvar Keyboard         = __webpack_require__( /*! ./input/Keyboard */ \"./src/input/Keyboard.js\" );\n\nclass Game\n{\n\tconstructor( config )\n\t{\n\t\tvar _this = this;\n\n\t\tvar defaults = \n\t\t{\n\t\t\tparent : 'body',\n\t\t\twidth  : 800,\n\t\t\theight : 600,\n\t\t\tbackgroundColor : 'black',\n\t\t\tfps    : 30,\n\t\t\tscenes : [],\n\t\t\tdebug  : false,\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.parent          = config.parent;\n\t\tthis.width           = config.width;\n\t\tthis.height          = config.height;\n\t\tthis.backgroundColor = config.backgroundColor;\n\t\tthis.fps             = config.fps;\n\t\tthis.debug           = config.debug;\n\n\t\tthis.time        = new Date().getTime();\n\t\tthis.timeElapsed = 0;\n\t\tthis.timeDelta   = 0;\n\n\t\tthis.events = new EventManager();\n\t\tthis.scenes = new SceneManager( this, config.scenes );\n\n\t\tthis.canvas = document.createElement( 'canvas' );\n\t\tthis.canvas.width  = this.width;\n\t\tthis.canvas.height = this.height;\n\t\tthis.canvas.style['background-color'] = this.backgroundColor;\n\n\t\tthis.updateInterval = setInterval( function()\n\t\t{\n\t\t\t_this.update();\n\n\t\t}, 1000 / this.fps );\n\n\t\tthis.events.trigger( 'init' );\n\n\t\t// Check if DOM is ready\n\t\tDOMContentLoaded( this.ready, this );\n\t}\n\n\tready()\n\t{\n\t\tvar parent = document.querySelector( this.parent );\n\t\t\n\t\tparent.appendChild( this.canvas );\n\n\t\tthis.events.trigger( 'ready' );\n\t}\n\n\tupdate()\n\t{\n\t\t// Time\n\t\tvar prevUpdate = this.timeElapsed;\n\n\t\tthis.timeElapsed = new Date().getTime() - this.time;\n\t\tthis.timeDelta   = this.timeElapsed - prevUpdate;\n\n\t\t// Clear canvas\n\t\tvar context = this.canvas.getContext( '2d' );\n\t\tcontext.clearRect( 0, 0, this.canvas.width, this.canvas.height );\n\n\t\t// Notify\n\t\tthis.events.trigger( 'update', [ this.timeElapsed, this.timeDelta ] );\n\t\tthis.events.trigger( 'render' );\n\t}\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/Game.js?");

/***/ }),

/***/ "./src/anims/Animation.js":
/*!********************************!*\
  !*** ./src/anims/Animation.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Animation\n{\n\tconstructor()\n\t{\n\t\tthis.instances = {},\n\n\t\tthis.key   = null;\n\t\tthis.frame = null;\n\t\tthis.loop  = true;\n\t}\n\t\t\n\tcreate( config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tkey       : '',\n\t\t\tframes    : [],\n\t        frameRate : 20,\n\t        repeat    : -1,\n\t\t};\n\n\t\tvar anim = Object.assign( {}, defaults, config );\n\n\t\tthis.instances[ anim.key ] = anim;\n\t}\n\n\tplay( key, loop )\n\t{\n\t\tif ( loop === undefined ) loop = true;\n\n\t\tvar instance = this.instances[ key ];\n\n\t\tif ( key != this.key ) \n\t\t{\n\t\t\tthis.key   = key;\n\t\t\tthis.frame = instance.frames[0];\n\t\t}\n\n\t\tthis.loop = loop;\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\tif ( this.key === null ) \n\t\t{\n\t\t\treturn;\n\t\t}\n\n\t\tvar instance = this.instances[ this.key ];\n\n\t\tvar frames = instance.frames;\n\t\tvar index  = frames.indexOf( this.frame );\n\n\t\tif ( index == -1 ) \n\t\t{\n\t\t\tthis.frame = 0;\n\n\t\t\treturn;\n\t\t}\n\n\t\tif ( this.loop && index + 1 < frames.length ) \n\t\t{\n\t\t\tindex++;\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tindex = 0;\n\t\t}\n\n\t\tthis.frame = frames[ index ];\n\t}\n}\n\nmodule.exports = Animation;\n\n\n//# sourceURL=webpack:///./src/anims/Animation.js?");

/***/ }),

/***/ "./src/dom/DOMContentLoaded.js":
/*!*************************************!*\
  !*** ./src/dom/DOMContentLoaded.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction DOMContentLoaded( callback, context )\n{\n\tif ( document.readyState !== 'loading' ) \n\t{\n\t\tcallback.call( context );\n\n\t\treturn;\n\t}\n\n\tdocument.addEventListener( 'DOMContentLoaded', function()\n\t{\n\t\tcallback.call( context );\n\t});\n}\n\nmodule.exports = DOMContentLoaded;\n\n\n//# sourceURL=webpack:///./src/dom/DOMContentLoaded.js?");

/***/ }),

/***/ "./src/events/EventManager.js":
/*!************************************!*\
  !*** ./src/events/EventManager.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass EventManager\n{\n\tconstructor()\n\t{\n\t\tthis.listeners = {};\n\t}\n\n\ton( type, callback, context )\n\t{\n\t\tif ( this.listeners[ type ] === undefined ) \n\t\t{\n\t\t\tthis.listeners[ type ] = [];\n\t\t}\n\n\t\tvar listener = \n\t\t{\n\t\t\tcallback : callback,\n\t\t\tcontext  : context\n\t\t};\n\n\t\tthis.listeners[ type ].push( listener );\n\t}\n\n\ttrigger( type, args )\n\t{\n\t\tif ( this.listeners[ type ] === undefined ) \n\t\t{\n\t\t\treturn;\n\t\t}\n\n\t\tfor ( var i in this.listeners[ type ] )\n\t\t{\n\t\t\tvar listener = this.listeners[ type ][ i ];\n\n\t\t\tlistener.callback.apply( listener.context, args );\n\t\t}\n\t}\n}\n\nmodule.exports = EventManager;\n\n\n//# sourceURL=webpack:///./src/events/EventManager.js?");

/***/ }),

/***/ "./src/geom/Rectangle.js":
/*!*******************************!*\
  !*** ./src/geom/Rectangle.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Rectangle\n{\n\tconstructor( x, y, width, height )\n\t{\n\t\tthis.left;\n\t\tthis.right;\n\t\tthis.top;\n\t\tthis.bottom;\n\t\t\n\t\tthis.setPosition( x, y );\n\t\tthis.setSize( width, height );\n\t}\n\n\tsetPosition( x, y )\n\t{\n\t\tthis.x = x;\n\t\tthis.y = y;\n\n\t\tthis.update();\n\t}\n\n\tsetSize( width, height )\n\t{\n\t\tthis.width  = width;\n\t\tthis.height = height;\n\n\t\tthis.update();\n\t}\n\n\tupdate()\n\t{\n\t\tthis.left   = this.x;\n\t\tthis.right  = this.x + this.width;\n\t\tthis.top    = this.y;\n\t\tthis.bottom = this.y + this.height;\n\t}\n\n\tcontains( rect )\n\t{\t\n\t\treturn ! ( rect.left > this.right || \n           rect.right < this.left || \n           rect.top > this.bottom ||\n           rect.bottom < this.top );\n\t}\n}\n\nmodule.exports = Rectangle;\n\n\n//# sourceURL=webpack:///./src/geom/Rectangle.js?");

/***/ }),

/***/ "./src/geom/Vector2.js":
/*!*****************************!*\
  !*** ./src/geom/Vector2.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Vector2\n{\n\tconstructor( x, y )\n\t{\n\t\tthis.x = x || 0;\n\t\tthis.y = y || 0;\n\t}\n\n\tset( x, y )\n\t{\t\n\t\tthis.x = x;\n\t\tthis.y = y;\n\t}\n\n\tdistance( x, y )\n\t{\n\t\tvar target;\n\t\t\n\t\tif ( y !== undefined )\n\t\t{\n\t\t\ttarget = new Vector2( x, y );\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\ttarget = x;\n\t\t}\n\n\t\tvar x = this.x - target.x;\n\t\tvar y = this.y - target.y;\n\n\t\treturn Math.sqrt( x * x + y * y );\n\t}\n}\n\nmodule.exports = Vector2;\n\n\n//# sourceURL=webpack:///./src/geom/Vector2.js?");

/***/ }),

/***/ "./src/geom/getDistance.js":
/*!*********************************!*\
  !*** ./src/geom/getDistance.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction getDistance( x1, y1, x2, y2 )\n{\n\tvar x = x1 - x2;\n\tvar y = y1 - y2;\n\n\treturn Math.sqrt( x * x + y * y );\n}\n\nmodule.exports = getDistance;\n\n\n//# sourceURL=webpack:///./src/geom/getDistance.js?");

/***/ }),

/***/ "./src/geom/index.js":
/*!***************************!*\
  !*** ./src/geom/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tgetDistance : __webpack_require__( /*! ./getDistance */ \"./src/geom/getDistance.js\" ),\n\tRectangle   : __webpack_require__( /*! ./Rectangle */ \"./src/geom/Rectangle.js\" ),\n\tVector2     : __webpack_require__( /*! ./Vector2 */ \"./src/geom/Vector2.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/geom/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Game   = __webpack_require__( /*! ./Game */ \"./src/Game.js\" );\nvar Scene1 = __webpack_require__( /*! ./scenes/Scene1 */ \"./src/scenes/Scene1.js\" );\n\nlet game = new Game(\n{\n\twidth  : 32 * 25,\n\theight : 32 * 18,\n\tfps    : 60,\n\tscenes : [ Scene1 ],\n\tdebug  : true,\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/input/Keyboard.js":
/*!*******************************!*\
  !*** ./src/input/Keyboard.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Keyboard\n{\n\tconstructor()\n\t{\n\t\tthis.keys = {};\n\t\tthis.map  = {};\n\n\t\tvar _this = this;\n\n\t\tdocument.addEventListener( 'keydown', function( event )\n\t\t{\n\t\t\tif ( _this.map[ event.key ] !== undefined ) \n\t\t\t{\n\t\t\t\tvar context = _this.map[ event.key ]; \n\n\t\t\t\t_this.keys[ context ].isDown = true;\n\t\t\t}\n\t\t});\n\n\t\tdocument.addEventListener( 'keyup', function( event )\n\t\t{\n\t\t\tif ( _this.map[ event.key ] !== undefined ) \n\t\t\t{\n\t\t\t\tvar context = _this.map[ event.key ]; \n\n\t\t\t\t_this.keys[ context ].isDown = false;\n\t\t\t}\n\t\t});\n\t}\n\n\tcreateKey( context, key )\n\t{\n\t\tthis.keys[ context ] = \n\t\t{\n\t\t\tkey     : key,\n\t\t\tcontext : context,\n\t\t\tisDown  : false,\n\t\t};\n\n\t\tthis.map[ key ] = context;\n\t}\n\n\tcreateKeys( keys )\n\t{\n\t\tfor ( var i in keys )\n\t\t{\n\t\t\tthis.createKey( i, keys[ i ] );\n\t\t}\n\t}\n}\n\nmodule.exports = Keyboard;\n\n\n//# sourceURL=webpack:///./src/input/Keyboard.js?");

/***/ }),

/***/ "./src/loader/Loader.js":
/*!******************************!*\
  !*** ./src/loader/Loader.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar EventManager = __webpack_require__( /*! ./../events/EventManager.js */ \"./src/events/EventManager.js\" );\n\nclass Loader extends EventManager\n{\n\tconstructor()\n\t{\n\t\tsuper();\n\n\t\tthis.items = {};\n\t\tthis.queue = [];\n\t}\n\n\tadd( key, url, data )\n\t{\n\t\tvar item = \n\t\t{\n\t\t\tkey : key,\n\t\t\turl : url,\n\t\t\timg : new Image(),\n\t\t\tisLoaded : false,\n\t\t\tdata : data || {},\n\t\t};\n\n\t\tthis.items[ item.key ] = item;\n\t}\n\n\tget( key )\n\t{\n\t\treturn this.items[ key ];\n\t}\n\n\tnext()\n\t{\n\t\tvar item = this.queue[ 0 ], _this = this;\n\n\t\titem.img.onload = function()\n\t\t{\n\t\t\t_this.itemComplete( item );\n\t\t}\n\n\t\titem.img.onerror = function()\n\t\t{\n\t\t\t_this.itemError( item );\n\t\t}\n\n\t\titem.img.src = item.url;\n\t}\n\n\titemComplete( item )\n\t{\n\t\titem.isLoaded = true;\n\n\t\tthis.items[ item.key ] = item;\n\n\t\tthis.queue.shift();\n\n\t\tif ( this.queue.length ) \n\t\t{\n\t\t\tthis.next();\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tthis.complete();\n\t\t}\n\t}\n\n\titemError( item )\n\t{\n\t\tthis.queue.shift();\n\n\t\tif ( this.queue.length ) \n\t\t{\n\t\t\tthis.next();\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tthis.complete();\n\t\t}\n\t}\n\n\tcomplete()\n\t{\n\t\tthis.trigger( 'complete' );\n\n\t\tthis.queue = [];\n\t}\n\n\tstart()\n\t{\n\t\tthis.queue = Object.values( this.items );\n\n\t\tif ( this.queue.length ) \n\t\t{\n\t\t\tthis.next();\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tthis.complete();\n\t\t}\n\t}\n}\n\nmodule.exports = Loader;\n\n\n//# sourceURL=webpack:///./src/loader/Loader.js?");

/***/ }),

/***/ "./src/scenes/Scene.js":
/*!*****************************!*\
  !*** ./src/scenes/Scene.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Loader    = __webpack_require__( /*! ./../loader/Loader.js */ \"./src/loader/Loader.js\" );\nvar Keyboard  = __webpack_require__( /*! ./../input/Keyboard.js */ \"./src/input/Keyboard.js\" );\n\nclass Scene\n{\n\tconstructor( config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tid      : '',\n\t\t\tdefault : false,\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.id        = config.id;\n\t\tthis.isDefault = config.default;\n\t\tthis.game      = null;\n\t\tthis.loader    = null;\n\t\tthis.keyboard  = null;\n\t\tthis.sprites   = [];\n\t}\n\n\tinit( game )\n\t{\n\t\tthis.game     = game;\n\t\tthis.loader   = new Loader();\n\t\tthis.keyboard = new Keyboard();\n\t}\n\n\taddSprite( sprite )\n\t{\n\t\tthis.sprites.push( sprite );\n\t}\n\n\tpreload()\n\t{\n\t\t\n\t}\n\n\tcreate()\n\t{\n\t\t\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\t// Sprites\n\t\tfor ( var i in this.sprites )\n\t\t{\n\t\t\tvar sprite = this.sprites[ i ];\n\t\t\n\t\t\tsprite.update( time, delta );\n\t\t}\n\t}\n\n\trender()\n\t{\n\t\t// Sprites\n\t\tfor ( var i in this.sprites )\n\t\t{\n\t\t\tvar sprite = this.sprites[ i ];\n\t\t\n\t\t\tsprite.render();\n\t\t}\n\t}\n\n\tdestroy()\n\t{\n\t\t\n\t}\n}\n\nmodule.exports = Scene;\n\n\n//# sourceURL=webpack:///./src/scenes/Scene.js?");

/***/ }),

/***/ "./src/scenes/Scene1.js":
/*!******************************!*\
  !*** ./src/scenes/Scene1.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Scene     = __webpack_require__( /*! ./Scene */ \"./src/scenes/Scene.js\" );\nvar TileMap   = __webpack_require__( /*! ./../tiles/TileMap */ \"./src/tiles/TileMap.js\" );\nvar Vector2   = __webpack_require__( /*! ./../geom/Vector2 */ \"./src/geom/Vector2.js\" );\nvar Rectangle = __webpack_require__( /*! ./../geom/Rectangle */ \"./src/geom/Rectangle.js\" );\nvar Agent     = __webpack_require__( /*! ./../sprite/Agent */ \"./src/sprite/Agent.js\" );\n\nclass Scene1 extends Scene\n{\n\tconstructor()\n\t{\n\t\tsuper(\n\t\t{\n\t\t\tid : 'scene1',\n\t\t\tdefault : true,\n\t\t});\n\t}\n\n\tpreload()\n\t{\n\t\tthis.loader.add( 'tiles', 'images/tmw_desert_spacing.png', \n\t\t{\n\t\t\tmargin  : 1,\n\t\t\tspacing : 1,\n\t\t});\n\n\t\tthis.loader.add( 'agent_1', 'images/agent_1.png', \n\t\t{\n\t\t\tframeWidth  : 16,\n\t\t\tframeHeight : 16,\n\t\t});\n\n\t\tthis.loader.add( 'agent_2', 'images/agent_2.png', \n\t\t{\n\t\t\tframeWidth  : 16,\n\t\t\tframeHeight : 16,\n\t\t});\n\t}\n\n\tgetTiles( rect, dirX, dirY )\n\t{\n\n\t}\n\n\tcreate()\n\t{\n\t\t// Keyboard\n\n\t\tthis.keyboard.createKeys(\n\t\t{\n\t\t\tleft  : 'q',\n\t\t\tright : 'd',\n\t\t\tup    : 'z',\n\t\t\tdown  : 's',\n\t\t});\n\n\t\t// Animations\n\n\t\tvar anims = [];\n\n\t\tanims.push(\n\t\t{\n\t\t\tkey       : 'left',\n\t\t\tframes    : [ 6, 7, 8 ],\n\t        frameRate : 20,\n\t        repeat    : -1\n\t\t});\n\n\t\tanims.push(\n\t\t{\n\t\t\tkey       : 'right',\n\t\t\tframes    : [ 0, 1, 2 ],\n\t        frameRate : 20,\n\t        repeat    : -1\n\t\t});\n\n\t\tanims.push(\n\t\t{\n\t\t\tkey       : 'up',\n\t\t\tframes    : [ 9, 10, 11 ],\n\t        frameRate : 20,\n\t        repeat    : -1\n\t\t});\n\n\t\tanims.push(\n\t\t{\n\t\t\tkey       : 'down',\n\t\t\tframes    : [ 3, 4, 5 ],\n\t        frameRate : 20,\n\t        repeat    : -1\n\t\t});\n\n\t\t// Map\n\n\t\tthis.map = new TileMap( this, \n\t\t{\n\t\t\twidth    : 25,\n\t\t\theight   : 18,\n\t\t\ttileSize : 32,\n\t\t\ttileData :\n\t\t\t[\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,31,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,31,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,\n\t\t\t\t29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,37,29,37,29,29,29,29,29,29,29,29,29,37,29,29,29,29,37,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,31,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,31,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,31,29,29,29,29,29,29,29,31,31,31,29,29,29,29,29,29,29,37,29,29,\n\t\t\t\t29,29,37,29,29,29,29,29,29,29,29,29,31,29,31,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,37,29,29,29,31,29,31,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t],\n\t\t\ttileProperties : \n\t\t\t{\n\t\t\t\t31 : { collide : true },\n\t\t\t\t37 : { collide : true },\n\t\t\t},\n\t\t\ttileSheet : 'tiles',\n\t\t});\n\n\t\t// Agents\n\t\tthis.player = new Agent( this, 32 * 2, 32 * 2, 'agent_1', { anims : anims } );\n\t\tthis.enemy  = new Agent( this, 32 * 3, 32 * 3, 'agent_2', { anims : anims, movingSpeed : 75, } );\n\n\t\tvar _this = this;\n\n\t\tthis.game.canvas.addEventListener( 'click', function( event )\n\t\t{\n\t\t\tvar a    = _this.map.getTileIndex( _this.enemy.position.x, _this.enemy.position.y, true );\n\t\t\tvar b    = _this.map.getTileIndex( event.layerX, event.layerY, true );\n\t\t\tvar path = _this.map.getPath( a, b, true );\n\n\t\t\t_this.enemy.setPath( path );\n\t\t});\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\t// Move player\n\n\t\tvar direction = new Vector2();\n\n\t\tif ( this.keyboard.keys.left.isDown ) \n\t\t{\n\t\t\tdirection.x = -1;\n\t\t}\n\n\t\telse if ( this.keyboard.keys.right.isDown ) \n\t\t{\n\t\t\tdirection.x = 1;\n\t\t}\n\n\t\tif ( this.keyboard.keys.up.isDown ) \n\t\t{\n\t\t\tdirection.y = -1;\n\t\t}\n\n\t\telse if ( this.keyboard.keys.down.isDown ) \n\t\t{\n\t\t\tdirection.y = 1;\n\t\t}\n\n\t\tthis.player.move( direction.x, direction.y );\n\t\tthis.player.look( direction.x, direction.y );\n\t\n\t\tsuper.update( time, delta );\n\t}\n\n\trender()\n\t{\n\t\t// Map\n\t\tthis.map.render();\n\n\t\tsuper.render();\n\t}\n}\n\nmodule.exports = Scene1;\n\n\n//# sourceURL=webpack:///./src/scenes/Scene1.js?");

/***/ }),

/***/ "./src/scenes/SceneManager.js":
/*!************************************!*\
  !*** ./src/scenes/SceneManager.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass SceneManager\n{\n\tconstructor( game, scenes )\n\t{\n\t\tthis.config = \n\t\t{\n\t\t\tscenes : scenes,\n\t\t};\n\n\t\tthis.game   = game;\n\t\tthis.scenes = {};\n\t\tthis.scene = null; // active scene\n\t\tthis.defaultScene = null;\n\n\t\tthis.game.events.on( 'init' , this.gameInit, this );\n\t\tthis.game.events.on( 'ready', this.gameReady, this );\n\t\tthis.game.events.on( 'update', this.gameUpdate, this );\n\t\tthis.game.events.on( 'render', this.gameRender, this );\n\t}\n\n\tadd( Scene )\n\t{\n\t\tvar scene = new Scene();\n\n\t\tthis.scenes[ scene.id ] = scene;\n\n\t\treturn scene;\n\t}\n\n\tsetScene( id )\n\t{\n\t\t// Destroy current\n\n\t\tif ( this.scene ) \n\t\t{\n\t\t\tthis.scene.destroy();\n\t\t}\n\n\t\t// Init requested\n\n\t\tthis.scene = this.scenes[ id ];\n\n\t\tthis.scene.init( this.game );\n\n\t\tthis.scene.loader.on( 'complete', function()\n\t\t{\n\t\t\tthis.scene.create();\n\t\t}, this );\n\n\t\tthis.scene.preload();\n\t\tthis.scene.loader.start();\n\t}\n\n\tgameInit()\n\t{\n\t\t// Add scenes\n\t\tfor ( var i in this.config.scenes )\n\t\t{\n\t\t\tthis.add( this.config.scenes[ i ] );\n\t\t}\n\n\t\t// Get default scene\n\t\tfor ( var i in this.scenes )\n\t\t{\n\t\t\tvar scene = this.scenes[ i ];\n\n\t\t\tif ( scene.isDefault ) \n\t\t\t{\n\t\t\t\tthis.defaultScene = scene.id;\n\t\t\t}\n\t\t}\n\t}\n\n\tgameReady()\n\t{\n\t\tif ( this.defaultScene ) \n\t\t{\n\t\t\tthis.setScene( this.defaultScene );\n\t\t}\n\t}\n\n\tgameUpdate( time, delta )\n\t{\n\t\tif ( this.scene ) \n\t\t{\n\t\t\tthis.scene.update( time, delta );\n\t\t}\n\t}\n\n\tgameRender()\n\t{\n\t\tif ( this.scene ) \n\t\t{\n\t\t\tthis.scene.render();\n\t\t}\n\t}\n}\n\nmodule.exports = SceneManager;\n\n\n//# sourceURL=webpack:///./src/scenes/SceneManager.js?");

/***/ }),

/***/ "./src/sprite/Agent.js":
/*!*****************************!*\
  !*** ./src/sprite/Agent.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Geom = __webpack_require__( /*! ./../geom */ \"./src/geom/index.js\" );\n\nvar Sprite  = __webpack_require__( /*! ./Sprite */ \"./src/sprite/Sprite.js\" );\n\nclass Agent extends Sprite\n{\n\tconstructor( scene, x, y, texture, config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tmovingSpeed : 100,\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tsuper( scene, x, y, texture, config );\n\n\t\tthis.movingSpeed = config.movingSpeed;\n\t\tthis.moveDir     = new Geom.Vector2();\n\t\tthis.lookDir     = new Geom.Vector2();\n\t\tthis.path        = [];\n\t\tthis.pathIndex   = -1;\n\t}\n\n\tmove( dirX, dirY )\n\t{\n\t\tthis.moveDir.set( dirX, dirY );\n\n\t\tthis.setVelocity( this.movingSpeed * this.moveDir.x, this.movingSpeed * this.moveDir.y );\n\t}\n\n\tmoveTo( x, y )\n\t{\n\t\tvar distance = Geom.getDistance( this.position.x, this.position.y, x, y );\n\n\t\tvar dirX = ( x - this.position.x ) / distance;\n\t\tvar dirY = ( y - this.position.y ) / distance;\n\n\t\tthis.move( dirX, dirY );\n\t}\n\n\tlook( dirX, dirY )\n\t{\n\t\tthis.lookDir.set( dirX, dirY );\n\n\t\tif ( Math.round( this.lookDir.x ) < 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'left', this.isMoving() );\n\t\t}\n\n\t\telse if ( Math.round( this.lookDir.x ) > 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'right', this.isMoving() );\n\t\t}\n\n\t\telse if ( Math.round( this.lookDir.y ) < 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'up', this.isMoving() );\n\t\t}\n\n\t\telse if ( Math.round( this.lookDir.y ) > 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'down', this.isMoving() );\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tthis.anims.play( 'down', this.isMoving() );\n\t\t}\n\t}\n\n\tlookAt( x, y )\n\t{\n\t\tvar distance = Geom.getDistance( this.position.x, this.position.y, x, y );\n\n\t\tvar dirX = ( x - this.position.x ) / distance;\n\t\tvar dirY = ( y - this.position.y ) / distance;\n\t\n\t\tthis.look( dirX, dirY );\n\t}\n\n\tsetPath( path )\n\t{\n\t\tthis.path = path;\n\t\tthis.pathIndex = this.path.length ? 0 : -1;\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\tsuper.update( time, delta );\n\n\t\t//\n\n\t\tvar movingSpeed = ( this.movingSpeed / 1000 ) * delta;\n\n\t\tvar target;\n\n\t\t// Walk path\n\n\t\tif ( this.pathIndex != -1 ) \n\t\t{\n\t\t\tvar target = this.path[ this.pathIndex ];\n\n\t\t\tvar distance = target.distance( this.position );\n\n\t\t\tif ( distance < movingSpeed ) \n\t\t\t{\n\t\t\t\tif ( this.pathIndex + 1 < this.path.length )\n\t\t\t\t{\n\t\t\t\t\tthis.pathIndex++;\n\n\t\t\t\t\ttarget = this.path[ this.pathIndex ];\n\t\t\t\t}\n\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\ttarget = null;\n\t\t\t\t\tthis.setVelocity( 0, 0 );\n\t\t\t\t\tthis.path = [];\n\t\t\t\t\tthis.pathIndex = -1;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif ( target ) \n\t\t{\n\t\t\tthis.moveTo( target.x, target.y );\n\t\t\tthis.lookAt( target.x, target.y )\n\t\t}\n\t}\n\n\trender()\n\t{\n\t\t// Debug\n\t\tif ( this.scene.game.debug ) \n\t\t{\n\t\t\t// Path\n\n\t\t\tvar context = this.scene.game.canvas.getContext( '2d' );\n\t\t\tvar color   = 'rgba( 0, 0, 0, .25 )';\n\n\t\t\tfor ( var i = 0; i < this.path.length; i++ )\n\t\t\t{\n\t\t\t\tvar node = this.path[ i ];\n\t\t\t\tvar next = this.path[ i + 1 ];\n\n\t\t\t\t// Node\n\t\t\t\tcontext.save();\n\t\t\t\tcontext.translate( node.x, node.y );\n\t\t\t\tcontext.beginPath();\n\t\t\t\tcontext.arc( 0, 0, 3, 0, 2 * Math.PI );\n\t\t\t\tcontext.fillStyle = color;\n\t\t\t\tcontext.fill();\n\t\t\t\tcontext.closePath();\n\t\t\t\tcontext.restore();\n\n\t\t\t\t// Direction\n\t\t\t\tif ( next ) \n\t\t\t\t{\n\t\t\t\t\tcontext.save();\n\t\t\t\t\tcontext.translate( node.x, node.y );\n\t\t\t\t\tcontext.beginPath();\n\t\t\t\t\tcontext.moveTo( 0, 0 );\n\t\t\t\t\tcontext.lineTo( next.x - node.x, next.y - node.y )\n\t\t\t\t\tcontext.strokeStyle = color;\n\t\t\t\t\tcontext.stroke();\n\t\t\t\t\tcontext.closePath();\n\t\t\t\t\tcontext.restore();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t//\n\n\t\tsuper.render();\n\t}\n}\n\nmodule.exports = Agent;\n\n\n//# sourceURL=webpack:///./src/sprite/Agent.js?");

/***/ }),

/***/ "./src/sprite/Sprite.js":
/*!******************************!*\
  !*** ./src/sprite/Sprite.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Vector2   = __webpack_require__( /*! ./../geom/Vector2 */ \"./src/geom/Vector2.js\" );\nvar Animation = __webpack_require__( /*! ./../anims/Animation */ \"./src/anims/Animation.js\" );\n\nclass Sprite\n{\n\tconstructor( scene, x, y, texture, config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tanims : {},\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.scene    = scene;\n\t\tthis.texture  = texture;\n\t\tthis.sheet    = this.scene.loader.get( this.texture );\n\t\tthis.width    = this.sheet.data.frameWidth;\n\t\tthis.height   = this.sheet.data.frameHeight;\n\t\tthis.anims    = new Animation();\n\t\tthis.position = new Vector2( x, y );\n\t\tthis.velocity = new Vector2();\n\n\t\tfor ( var i in config.anims )\n\t\t{\n\t\t\tthis.anims.create( config.anims[ i ] );\n\t\t}\n\n\t\tthis.scene.addSprite( this );\n\t}\n\n\tsetPosition( x, y )\n\t{\n\t\tthis.position.set( x, y );\n\t}\n\n\tsetVelocity( x, y )\n\t{\n\t\tthis.velocity.set( x, y );\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\tvar vx = ( this.velocity.x / 1000 ) * delta;\n\t\tvar vy = ( this.velocity.y / 1000 ) * delta;\n\n\t\tthis.setPosition( this.position.x + vx, this.position.y + vy );\n\n\t\tthis.anims.update( time, delta );\n\t}\n\n\tisMoving()\n\t{\n\t\treturn this.velocity.x || this.velocity.y;\n\t}\n\n\trender()\n\t{\n\t\tvar context = this.scene.game.canvas.getContext( '2d' );\n\n\t\tvar frame = this.anims.frame;\n\n\t\tvar col = frame % Math.floor( this.sheet.img.width / this.sheet.data.frameWidth );\n\t\tvar row = ( frame - col ) / Math.floor( this.sheet.img.height / this.sheet.data.frameHeight );\n\n\t\tcontext.save();\n\t\tcontext.translate( this.position.x, this.position.y );\n\t\tcontext.drawImage( this.sheet.img,\n\t\t\tcol * this.sheet.data.frameWidth,\n\t\t\trow * this.sheet.data.frameHeight,\n\t\t\tthis.sheet.data.frameWidth,\n\t\t\tthis.sheet.data.frameHeight,\n\t\t\t- this.width / 2,\n\t\t\t- this.height / 2,\n\t\t\tthis.sheet.data.frameWidth,\n\t\t\tthis.sheet.data.frameHeight );\n\t\tcontext.restore();\n\n\t\t// Debug\n\t\tif ( this.scene.game.debug ) \n\t\t{\n\t\t\t// Velocity\n\t\t\tcontext.save();\n\t\t\tcontext.translate( this.position.x, this.position.y );\n\t\t\tcontext.beginPath();\n\t\t\tcontext.moveTo( 0, 0 );\n\t\t\tcontext.lineTo( this.velocity.x, this.velocity.y );\n\t\t\tcontext.closePath();\n\t\t\tcontext.strokeStyle = 'purple';\n\t\t\tcontext.stroke();\n\t\t\tcontext.restore();\n\n\t\t\t// Pedestal\n\t\t\tcontext.save();\n\t\t\tcontext.translate( this.position.x, this.position.y );\n\t\t\tcontext.strokeStyle = 'purple';\n\t\t\tcontext.strokeRect( - this.width / 2, - this.height / 2, this.width, this.height );\n\t\t\tcontext.restore();\n\t\t}\n\t}\n}\n\nmodule.exports = Sprite;\n\n\n//# sourceURL=webpack:///./src/sprite/Sprite.js?");

/***/ }),

/***/ "./src/tiles/Tile.js":
/*!***************************!*\
  !*** ./src/tiles/Tile.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Tile\n{\n\tconstructor( layer, index, x, y, width, height, type, collide )\n\t{\n\t\tthis.layer   = layer;\n\t\tthis.index   = index;\n\t\tthis.x       = x;\n\t\tthis.y       = y;\n\t\tthis.width   = width;\n\t\tthis.height  = height;\n\t\tthis.type    = type;\n\t\tthis.collide = collide;\n\t\t\n\t\tthis.xPixels = this.x * this.width;\n\t\tthis.yPixels = this.y * this.height;\n\n\t\tthis.data = {};\n\t}\n\n\trender( context )\n\t{\n\t\tvar context;\n\t\tvar img;\n\t\tvar frameX;\n\t\tvar frameY;\n\n\t\tcontext.drawImage( img, \n\t\t\tframeX, \n\t\t\tframeY, \n\t\t\tthis.width, \n\t\t\tthis.height, \n\t\t\tthis.xPixels, \n\t\t\tthis.yPixels, \n\t\t\tthis.width, \n\t\t\tthis.height \n\t\t);\n\t}\n}\n\nmodule.exports = Tile;\n\n\n//# sourceURL=webpack:///./src/tiles/Tile.js?");

/***/ }),

/***/ "./src/tiles/TileMap.js":
/*!******************************!*\
  !*** ./src/tiles/TileMap.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Tile = __webpack_require__( /*! ./Tile */ \"./src/tiles/Tile.js\" );\nvar Geom = __webpack_require__( /*! ./../geom */ \"./src/geom/index.js\" );\n\nclass TileMap\n{\n\tconstructor( scene, config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\twidth          : undefined,\n\t\t\theight         : undefined,\n\t\t\ttileSize       : 32,\n\t\t\ttileData       : [],\n\t\t\ttileProperties : {},\n\t\t\ttileSheet      : '',\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.scene          = scene;\n\t\tthis.width          = config.width;\n\t\tthis.height         = config.height;\n\t\tthis.tileSize       = config.tileSize;\n\t\tthis.tileData       = config.tileData;\n\t\tthis.tileProperties = config.tileProperties;\n\t\tthis.tileSheet      = config.tileSheet;\n\t\tthis.tiles          = {};\n\n\t\t// Create tiles\n\t\tfor ( var index = 0; index < this.tileData.length; index++ )\n\t\t{\n\t\t\tthis.setTile( index, this.tileData[ index ] );\n\t\t}\n\t}\n\n\tsetTile( index, type )\n\t{\n\t\tvar loc   = this.getTileLocation( index );\n\t\tvar props = this.tileProperties[ type ] || {};\n\n\t\tvar tile = new Tile(\n\t\t\tthis,\n\t\t\tindex,\n\t\t\tloc.x,\n\t\t\tloc.y,\n\t\t\tthis.tileSize,\n\t\t\tthis.tileSize,\n\t\t\ttype,\n\t\t\tprops.collide !== undefined ? props.collide : false\n\t\t);\n\n\t\tthis.tiles[ tile.index ] = tile;\n\t}\n\n\tgetTile( index )\n\t{\n\t\treturn this.tiles[ index ];\n\t}\n\n\tgetTileAt( x, y, translate )\n\t{\n\t\tvar index = this.getTileIndex( x, y, translate );\n\n\t\treturn this.getTile( index );\n\t}\n\n\tgetTileIndex( x, y, translate )\n\t{\n\t\tif ( translate ) \n\t\t{\n\t\t\tx = Math.floor( x / this.tileSize );\n\t\t\ty = Math.floor( y / this.tileSize );\n\t\t}\n\n\t\tif ( x < 0 || x >= this.width || y < 0 || y >= this.height ) \n\t\t{\n\t\t\treturn -1;\n\t\t}\n\n\t\treturn this.width * y + x;\n\t}\n\n\tgetTileLocation( index )\n\t{\n\t\tvar x = index % this.width;\n\t\tvar y = ( index - x ) / this.width;\n\n\t\treturn { x : x, y : y };\n\t}\n\n\tgetTileNeighbors( index, diagonal )\n\t{\n\t\tif ( diagonal === undefined ) diagonal = false;\n\n\t\tvar loc = this.getTileLocation( index );\n\n\t\tvar n  = this.getTileAt( loc.x + 0, loc.y - 1 );\n\t\tvar ne = this.getTileAt( loc.x + 1, loc.y - 1 );\n\t\tvar e  = this.getTileAt( loc.x + 1, loc.y + 0 );\n\t\tvar se = this.getTileAt( loc.x + 1, loc.y + 1 );\n\t\tvar s  = this.getTileAt( loc.x + 0, loc.y + 1 );\n\t\tvar sw = this.getTileAt( loc.x - 1, loc.y + 1 );\n\t\tvar w  = this.getTileAt( loc.x - 1, loc.y + 0 );\n\t\tvar nw = this.getTileAt( loc.x - 1, loc.y - 1 );\n\n\t\tvar neighbors = [];\n\n\t\tif ( n && ! n.collide ) neighbors.push( n.index );\n\t\tif ( e && ! e.collide ) neighbors.push( e.index );\n\t\tif ( s && ! s.collide ) neighbors.push( s.index );\n\t\tif ( w && ! w.collide ) neighbors.push( w.index );\n\n\t\tif ( diagonal ) \n\t\t{\n\t\t\tif ( ne && ! ne.collide && n && ! n.collide && e && ! e.collide ) neighbors.push( ne.index );\n\t\t\tif ( se && ! se.collide && s && ! s.collide && e && ! e.collide ) neighbors.push( se.index );\n\t\t\tif ( sw && ! sw.collide && s && ! s.collide && w && ! w.collide ) neighbors.push( sw.index );\n\t\t\tif ( nw && ! nw.collide && n && ! n.collide && w && ! w.collide ) neighbors.push( nw.index );\n\t\t};\n\n\t\treturn neighbors;\n\t}\n\n\tgetFlowField( index )\n\t{\n\t\tvar frontier = [ index ];\n\t\tvar visited = { [ index ] : 0 };\n\n\t\twhile ( frontier.length )\n\t\t{\n\t\t\tvar current = frontier.shift();\n\n\t\t\tvar neighbors = this.getTileNeighbors( current );\n\n\t\t\tfor ( var i in neighbors )\n\t\t\t{\n\t\t\t\tvar next = neighbors[ i ];\n\n\t\t\t\tif ( visited[ next ] === undefined ) \n\t\t\t\t{\n\t\t\t\t\tfrontier.push( next );\n\n\t\t\t\t\tvisited[ next ] = 1 + visited[ current ];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn visited;\n\t}\n\n\tgetPath( a, b, translate )\n\t{\n\t\tif ( translate === undefined ) translate = false;\n\n\t\tvar field = this.getFlowField( b );\n\n\t\tif ( field[ a ] === undefined || field[ b ] === undefined ) \n\t\t{\n\t\t\tconsole.warn( 'Unable to find path from ' + a + ' to ' + b + '.' );\n\n\t\t\treturn [];\n\t\t}\n\n\t\tvar path = [];\n\n\t\t//\n\n\t\tvar frontier = [ a ];\n\t\tvar visited = { [ a ] : true };\n\n\t\twhile ( frontier.length )\n\t\t{\n\t\t\tvar current = frontier.shift();\n\t\t\tvar next, cost;\n\n\t\t\t// Get neighbor with lowest cost\n\t\t\tvar neighbors = this.getTileNeighbors( current, true );\n\n\t\t\tfor ( var i in neighbors )\n\t\t\t{\n\t\t\t\tvar neighbor = neighbors[ i ];\n\n\t\t\t\tif ( cost === undefined || cost > field[ neighbor ] ) \n\t\t\t\t{\n\t\t\t\t\tcost = field[ neighbor ];\n\t\t\t\t\tnext = neighbor;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ( next !== undefined && visited[ next ] === undefined ) \n\t\t\t{\n\t\t\t\tfrontier.push( next );\n\n\t\t\t\tvisited[ next ] = true;\n\n\t\t\t\tpath.push( next );\n\t\t\t}\n\t\t}\n\n\t\t//\n\n\t\tif ( translate ) \n\t\t{\n\t\t\treturn this.translatePath( path );\n\t\t}\n\n\t\treturn path;\n\t}\n\n\ttranslatePath( path )\n\t{\n\t\tvar translation = [];\n\n\t\tfor ( var i in path )\n\t\t{\n\t\t\tvar index = path[ i ];\n\t\t\tvar tile  = this.getTile( index );\n\n\t\t\tvar position = new Geom.Vector2( tile.xPixels + tile.width / 2, tile.yPixels + tile.height / 2 );\n\n\t\t\ttranslation.push( position );\n\t\t}\n\n\t\treturn translation;\n\t}\n\n\trender()\n\t{\n\t\tvar sheet   = this.scene.loader.get( this.tileSheet );\n\t\tvar context = this.scene.game.canvas.getContext( '2d' );\n\n\t\tfor ( var i in this.tiles )\n\t\t{\n\t\t\tvar tile = this.tiles[ i ];\n\n\t\t\tvar index = parseInt( tile.type );\n\t\t\tvar col   = index % Math.floor( sheet.img.width / this.tileSize );\n\t\t\tvar row   = ( index - col ) / Math.floor( sheet.img.width / this.tileSize );\n\n\t\t\tcontext.save();\n\t\t\tcontext.translate( tile.xPixels, tile.yPixels );\n\t\t\tcontext.drawImage( sheet.img,\n\t\t\t\tcol * ( tile.width + sheet.data.spacing ) + sheet.data.margin,\n\t\t\t\trow * ( tile.height + sheet.data.spacing ) + sheet.data.margin,\n\t\t\t\ttile.width,\n\t\t\t\ttile.height,\n\t\t\t\t0,\n\t\t\t\t0,\n\t\t\t\ttile.width,\n\t\t\t\ttile.height );\n\t\t\tcontext.restore();\n\n\t\t\t// Debug\n\t\t\tcontext.save();\n\t\t\tcontext.translate( tile.xPixels, tile.yPixels );\n\t\t\tcontext.strokeStyle = 'rgba( 0, 0, 0,.15 )';\n\t\t\tcontext.strokeRect( 0, 0, tile.width, tile.height );\n\t\t\tcontext.restore();\n\t\t}\n\t}\n}\n\nmodule.exports = TileMap;\n\n\n//# sourceURL=webpack:///./src/tiles/TileMap.js?");

/***/ })

/******/ });