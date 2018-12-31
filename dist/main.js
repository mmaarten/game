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

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n__webpack_require__( /*! ./../core */ \"./src/core/index.js\" );\n\nvar Scenes = __webpack_require__( /*! ./scenes */ \"./src/app/scenes/index.js\" );\n\nlet game = new Core.Game(\n{\n\tparent : 'body',\n\twidth  : 25 * 32,\n\theight : 18 * 32,\n\tfps    : 30,\n\tbackgroundColor : 'black',\n\tscenes : [ Scenes.Scene1 ],\n\tdebug  : true,\n});\n\n\n//# sourceURL=webpack:///./src/app/index.js?");

/***/ }),

/***/ "./src/app/scenes/Scene1.js":
/*!**********************************!*\
  !*** ./src/app/scenes/Scene1.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Agent = __webpack_require__( /*! ./../sprites/Agent */ \"./src/app/sprites/Agent.js\" );\n\nclass Scene1 extends Core.Scenes.Scene\n{\n\tconstructor()\n\t{\n\t\tsuper( 'scene_1', true );\n\t}\n\n\tpreload()\n\t{\n\t\tthis.load.spriteSheet( 'tiles', 'images/tmw_desert_spacing.png', \n\t\t{\n\t\t\tframeWidth  : 32,\n\t\t\tframeHeight : 32,\n\t\t\ttileMargin  : 1,\n\t\t\ttilePadding : 1,\n\t\t});\n\n\t\tthis.load.spriteSheet( 'agent_1', 'images/agent_1.png', \n\t\t{\n\t\t\tframeWidth  : 16,\n\t\t\tframeHeight : 16,\n\t\t});\n\t}\n\n\tcreate()\n\t{\n\t\tvar _this = this;\n\n\t\t// Keyboard\n\n\t\tthis.keyboard.createKeys(\n\t\t{\n\t\t\tleft  : 'q',\n\t\t\tright : 'd',\n\t\t\tup    : 'z',\n\t\t\tdown  : 's',\n\t\t});\n\n\t\t// Map\n\t\t\n\t\tthis.map = new Core.Tiles.TileMap( this, 'tiles', \n\t\t{\n\t\t\twidth    : 25,\n\t\t\theight   : 18,\n\t\t\ttileData :\n\t\t\t[\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,31,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,31,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,\n\t\t\t\t29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,37,29,37,29,29,29,29,29,29,29,29,29,37,29,29,29,29,37,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,31,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,31,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,37,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,31,29,29,29,29,29,29,29,31,31,31,29,29,29,29,29,29,29,37,29,29,\n\t\t\t\t29,29,37,29,29,29,29,29,29,29,29,29,31,29,31,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,37,29,29,29,31,29,31,29,29,29,29,29,29,29,29,29,29,\n\t\t\t\t29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,29,\n\t\t\t],\n\t\t\ttileProperties : \n\t\t\t{\n\t\t\t\t31 : { collide : true },\n\t\t\t\t37 : { collide : true },\n\t\t\t},\n\t\t});\n\n\t\t// Agents\n\n\t\tthis.player = new Agent( this, 16 * 3, 16 * 3, 'agent_1' );\n\n\t\t// Walk path\n\n\t\tthis.game.canvas.addEventListener( 'click', function( event )\n\t\t{\n\t\t\tvar a    = _this.map.getTileIndex( _this.player.position.x, _this.player.position.y, true );\n\t\t\tvar b    = _this.map.getTileIndex( event.layerX, event.layerY, true );\n\t\t\tvar path = _this.map.getPath( a, b, true );\n\n\t\t\t_this.player.setPath( path );\n\t\t});\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\t// Move player\n\n\t\tif ( ! this.player.path.length ) \n\t\t{\n\t\t\tvar direction = new Core.Geom.Vector2( 0, 0 );\n\n\t\t\tif ( this.keyboard.keys.left.isDown ) \n\t\t\t{\n\t\t\t\tdirection.x = -1;\n\t\t\t}\n\n\t\t\telse if ( this.keyboard.keys.right.isDown ) \n\t\t\t{\n\t\t\t\tdirection.x = 1;\n\t\t\t}\n\n\t\t\tif ( this.keyboard.keys.up.isDown ) \n\t\t\t{\n\t\t\t\tdirection.y = -1;\n\t\t\t}\n\n\t\t\telse if ( this.keyboard.keys.down.isDown ) \n\t\t\t{\n\t\t\t\tdirection.y = 1;\n\t\t\t}\n\n\t\t\tthis.player.move( direction.x, direction.y );\n\t\t\tthis.player.look( direction.x, direction.y );\n\t\t}\n\n\t\tthis.player.update( time, delta );\n\t}\n\n\trender()\n\t{\n\t\tthis.map.render();\n\t\tthis.player.render();\n\t}\n\n\tdestroy()\n\t{\n\t\t\n\t}\n}\n\nmodule.exports = Scene1;\n\n\n//# sourceURL=webpack:///./src/app/scenes/Scene1.js?");

/***/ }),

/***/ "./src/app/scenes/index.js":
/*!*********************************!*\
  !*** ./src/app/scenes/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tScene1 : __webpack_require__( /*! ./Scene1 */ \"./src/app/scenes/Scene1.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/app/scenes/index.js?");

/***/ }),

/***/ "./src/app/sprites/Agent.js":
/*!**********************************!*\
  !*** ./src/app/sprites/Agent.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Agent extends Core.Sprites.Sprite\n{\n\tconstructor( scene, x, y, texture, config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tmovingSpeed : 100,\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tsuper( scene, x, y, texture, 0 );\n\n\t\tthis.movingSpeed = config.movingSpeed;\n\t\tthis.moveDir     = new Core.Geom.Vector2();\n\t\tthis.lookDir     = new Core.Geom.Vector2();\n\t\tthis.path        = [];\n\t\tthis.pathIndex   = -1;\n\t}\n\n\tmove( dirX, dirY )\n\t{\n\t\tthis.moveDir.set( dirX, dirY );\n\n\t\tthis.setVelocity( this.movingSpeed * this.moveDir.x, this.movingSpeed * this.moveDir.y );\n\t}\n\n\tmoveTo( x, y )\n\t{\n\t\tvar distance = Core.Geom.Distance.Between( this.position.x, this.position.y, x, y );\n\n\t\tvar dirX = ( x - this.position.x ) / distance;\n\t\tvar dirY = ( y - this.position.y ) / distance;\n\n\t\tthis.move( dirX, dirY );\n\t}\n\n\tlook( dirX, dirY )\n\t{\n\t\tthis.lookDir.set( dirX, dirY );\n\n\t\t/*\n\t\tif ( Math.round( this.lookDir.x ) < 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'left', this.isMoving() );\n\t\t}\n\n\t\telse if ( Math.round( this.lookDir.x ) > 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'right', this.isMoving() );\n\t\t}\n\n\t\telse if ( Math.round( this.lookDir.y ) < 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'up', this.isMoving() );\n\t\t}\n\n\t\telse if ( Math.round( this.lookDir.y ) > 0 ) \n\t\t{\n\t\t\tthis.anims.play( 'down', this.isMoving() );\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tthis.anims.play( 'down', this.isMoving() );\n\t\t}\n\t\t*/\n\t}\n\n\tlookAt( x, y )\n\t{\n\t\tvar distance = Core.Geom.Distance.Between( this.position.x, this.position.y, x, y );\n\n\t\tvar dirX = ( x - this.position.x ) / distance;\n\t\tvar dirY = ( y - this.position.y ) / distance;\n\t\n\t\tthis.look( dirX, dirY );\n\t}\n\n\tsetPath( path )\n\t{\n\t\tthis.path = path;\n\t\tthis.pathIndex = this.path.length ? 0 : -1;\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\tsuper.update( time, delta );\n\n\t\t//\n\n\t\tvar movingSpeed = ( this.movingSpeed / 1000 ) * delta;\n\n\t\tvar target;\n\n\t\t// Walk path\n\n\t\tif ( this.pathIndex != -1 ) \n\t\t{\n\t\t\tvar target = this.path[ this.pathIndex ];\n\n\t\t\tvar distance = target.distance( this.position );\n\n\t\t\tif ( distance < movingSpeed ) \n\t\t\t{\n\t\t\t\tif ( this.pathIndex + 1 < this.path.length )\n\t\t\t\t{\n\t\t\t\t\tthis.pathIndex++;\n\n\t\t\t\t\ttarget = this.path[ this.pathIndex ];\n\t\t\t\t}\n\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\ttarget = null;\n\t\t\t\t\tthis.setVelocity( 0, 0 );\n\t\t\t\t\tthis.path = [];\n\t\t\t\t\tthis.pathIndex = -1;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\tif ( target ) \n\t\t{\n\t\t\tthis.moveTo( target.x, target.y );\n\t\t\tthis.lookAt( target.x, target.y )\n\t\t}\n\t}\n\n\trender()\n\t{\n\t\t// Debug\n\t\tif ( this.scene.game.debug ) \n\t\t{\n\t\t\t// Path\n\n\t\t\tvar context = this.scene.game.canvas.getContext( '2d' );\n\t\t\tvar color   = 'rgba( 0, 0, 0, .25 )';\n\n\t\t\tfor ( var i = 0; i < this.path.length; i++ )\n\t\t\t{\n\t\t\t\tvar node = this.path[ i ];\n\t\t\t\tvar next = this.path[ i + 1 ];\n\n\t\t\t\t// Node\n\t\t\t\tcontext.save();\n\t\t\t\tcontext.translate( node.x, node.y );\n\t\t\t\tcontext.beginPath();\n\t\t\t\tcontext.arc( 0, 0, 3, 0, 2 * Math.PI );\n\t\t\t\tcontext.fillStyle = color;\n\t\t\t\tcontext.fill();\n\t\t\t\tcontext.closePath();\n\t\t\t\tcontext.restore();\n\n\t\t\t\t// Direction\n\t\t\t\tif ( next ) \n\t\t\t\t{\n\t\t\t\t\tcontext.save();\n\t\t\t\t\tcontext.translate( node.x, node.y );\n\t\t\t\t\tcontext.beginPath();\n\t\t\t\t\tcontext.moveTo( 0, 0 );\n\t\t\t\t\tcontext.lineTo( next.x - node.x, next.y - node.y )\n\t\t\t\t\tcontext.strokeStyle = color;\n\t\t\t\t\tcontext.stroke();\n\t\t\t\t\tcontext.closePath();\n\t\t\t\t\tcontext.restore();\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\t//\n\n\t\tsuper.render();\n\t}\n}\n\nmodule.exports = Agent;\n\n\n//# sourceURL=webpack:///./src/app/sprites/Agent.js?");

/***/ }),

/***/ "./src/core/Game.js":
/*!**************************!*\
  !*** ./src/core/Game.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar EventManager     = __webpack_require__( /*! ./events/EventManager */ \"./src/core/events/EventManager.js\" );\nvar SceneManager     = __webpack_require__( /*! ./scenes/SceneManager */ \"./src/core/scenes/SceneManager.js\" );\nvar DOMContentLoaded = __webpack_require__( /*! ./dom/DOMContentLoaded */ \"./src/core/dom/DOMContentLoaded.js\" );\n\nclass Game\n{\n\tconstructor( config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tparent : 'body',\n\t\t\twidth  : 800,\n\t\t\theight : 600,\n\t\t\tfps    : 30,\n\t\t\tbackgroundColor : 'black',\n\t\t\tscenes : [],\n\t\t\tdebug  : false,\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.parent          = config.parent;\n\t\tthis.width           = config.width;\n\t\tthis.height          = config.height;\n\t\tthis.fps             = config.fps;\n\t\tthis.backgroundColor = config.backgroundColor;\n\t\tthis.debug           = config.debug;\n\n\t\tthis.events         = new EventManager();\n\t\tthis.scenes         = new SceneManager( this, config.scenes );\n\t\tthis.updateInterval = null;\n\t\tthis.time           = null;\n\t\tthis.timeElapsed    = 0;\n\t\tthis.timeDelta      = 0;\n\n\t\tthis.canvas = document.createElement( 'canvas' );\n\t\tthis.canvas.width  = this.width;\n\t\tthis.canvas.height = this.height;\n\t\tthis.canvas.style[ 'background-color' ] = this.backgroundColor;\n\n\t\tthis.events.trigger( 'init' );\n\n\t\tDOMContentLoaded( this.ready, this );\n\t}\n\n\tready()\n\t{\n\t\tvar _this = this;\n\n\t\tvar parent = document.querySelector( this.parent );\n\t\tparent.appendChild( this.canvas );\n\n\t\tthis.updateInterval = setInterval( function()\n\t\t{\n\t\t\t_this.update();\n\n\t\t}, 1000 / this.fps );\n\n\t\tthis.events.trigger( 'ready' );\n\t}\n\n\tupdate()\n\t{\n\t\tvar now = new Date().getTime();\n\t\tvar prevTimeElapsed = this.timeElapsed;\n\n\t\tif ( this.time === null ) \n\t\t{\n\t\t\tthis.time = now;\n\t\t}\n\n\t\tthis.timeElapsed = now - this.time;\n\t\tthis.timeDelta   = this.timeElapsed - prevTimeElapsed;\n\n\t\t//\n\n\t\tvar context = this.canvas.getContext( '2d' );\n\n\t\tcontext.clearRect( 0, 0, this.canvas.width, this.canvas.height );\n\n\t\t//\n\n\t\tthis.events.trigger( 'update', [ this.timeElapsed, this.timeDelta ] );\n\t\tthis.events.trigger( 'render' );\n\t}\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/core/Game.js?");

/***/ }),

/***/ "./src/core/dom/DOMContentLoaded.js":
/*!******************************************!*\
  !*** ./src/core/dom/DOMContentLoaded.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction DOMContentLoaded( callback, context )\n{\n\tif( document.readyState === \"complete\" ) \n\t{\n  \t\tcallback.call( context );\n\t}\n\t\n\telse \n\t{\n  \t\tdocument.addEventListener( 'DOMContentLoaded', function()\n  \t\t{\n  \t\t\tcallback.call( context );\n  \t\t}, false);\n\t}\n}\n\nmodule.exports = DOMContentLoaded;\n\n\n//# sourceURL=webpack:///./src/core/dom/DOMContentLoaded.js?");

/***/ }),

/***/ "./src/core/dom/index.js":
/*!*******************************!*\
  !*** ./src/core/dom/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tDOMContentLoaded : __webpack_require__( /*! ./DOMContentLoaded */ \"./src/core/dom/DOMContentLoaded.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/dom/index.js?");

/***/ }),

/***/ "./src/core/events/EventManager.js":
/*!*****************************************!*\
  !*** ./src/core/events/EventManager.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass EventManager\n{\n\tconstructor()\n\t{\n\t\tthis.listeners = {};\n\t}\n\n\ton( type, callback, context )\n\t{\n\t\tif ( this.listeners[ type ] === undefined ) \n\t\t{\n\t\t\tthis.listeners[ type ] = [];\n\t\t}\n\n\t\tvar listener = \n\t\t{\n\t\t\ttype     : type,\n\t\t\tcallback : callback,\n\t\t\tcontext  : context,\n\t\t};\n\n\t\tthis.listeners[ type ].push( listener );\n\t}\n\n\ttrigger( type, args )\n\t{\n\t\tif ( this.listeners[ type ] === undefined ) \n\t\t{\n\t\t\treturn;\n\t\t}\n\n\t\tfor ( var i in this.listeners[ type ] )\n\t\t{\n\t\t\tvar listener = this.listeners[ type ][ i ];\n\n\t\t\tlistener.callback.apply( listener.context, args );\n\t\t}\n\t}\n}\n\nmodule.exports = EventManager;\n\n\n//# sourceURL=webpack:///./src/core/events/EventManager.js?");

/***/ }),

/***/ "./src/core/events/index.js":
/*!**********************************!*\
  !*** ./src/core/events/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tEventManager : __webpack_require__( /*! ./EventManager */ \"./src/core/events/EventManager.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/events/index.js?");

/***/ }),

/***/ "./src/core/geom/Vector2.js":
/*!**********************************!*\
  !*** ./src/core/geom/Vector2.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Vector2\n{\n\tconstructor( x, y )\n\t{\n\t\tthis.x = x;\n\t\tthis.y = y;\n\t}\n\n\tset( x, y )\n\t{\n\t\tthis.setX( x );\n\t\tthis.setY( y );\n\t}\n\n\tsetX( x )\n\t{\n\t\tthis.x = x;\n\t}\n\n\tsetY( y )\n\t{\n\t\tthis.y = y;\n\t}\n\n\tadd( x, y )\n\t{\n\t\tthis.addX( x );\n\t\tthis.addY( y );\n\t}\n\n\taddX( x )\n\t{\n\t\tthis.x += x;\n\t}\n\n\taddY( y )\n\t{\n\t\tthis.y += y;\n\t}\n\n\tdistance( x, y )\n\t{\n\t\tvar v;\n\n\t\tif ( y !== undefined ) \n\t\t{\n\t\t\tv = new Vector2( x, y );\n\t\t}\n\n\t\telse\n\t\t{\n\t\t\tv = x;\n\t\t}\n\n\t\tvar x = v.x - this.x;\n\t\tvar y = v.y - this.y;\n\n\t\treturn Math.sqrt( x * x + y * y );\n\t}\n}\n\nmodule.exports = Vector2;\n\n\n//# sourceURL=webpack:///./src/core/geom/Vector2.js?");

/***/ }),

/***/ "./src/core/geom/distance/Between.js":
/*!*******************************************!*\
  !*** ./src/core/geom/distance/Between.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction between( x1, y1, x2, y2 )\n{\n\tvar x = x1 - x2;\n\tvar y = y1 - y2;\n\n\treturn Math.sqrt( x * x + y * y );\n}\n\nmodule.exports = between;\n\n\n//# sourceURL=webpack:///./src/core/geom/distance/Between.js?");

/***/ }),

/***/ "./src/core/geom/distance/index.js":
/*!*****************************************!*\
  !*** ./src/core/geom/distance/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tBetween : __webpack_require__( /*! ./Between */ \"./src/core/geom/distance/Between.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/geom/distance/index.js?");

/***/ }),

/***/ "./src/core/geom/index.js":
/*!********************************!*\
  !*** ./src/core/geom/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tDistance : __webpack_require__( /*! ./distance */ \"./src/core/geom/distance/index.js\" ),\n\tVector2  : __webpack_require__( /*! ./Vector2 */ \"./src/core/geom/Vector2.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/geom/index.js?");

/***/ }),

/***/ "./src/core/index.js":
/*!***************************!*\
  !*** ./src/core/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {\nvar Core = \n{\n\tDOM     : __webpack_require__( /*! ./dom */ \"./src/core/dom/index.js\" ),\n\tEvents  : __webpack_require__( /*! ./events */ \"./src/core/events/index.js\" ),\n\tGeom    : __webpack_require__( /*! ./geom */ \"./src/core/geom/index.js\" ),\n\tInput   : __webpack_require__( /*! ./input */ \"./src/core/input/index.js\" ),\n\tLoaders : __webpack_require__( /*! ./loaders */ \"./src/core/loaders/index.js\" ),\n\tScenes  : __webpack_require__( /*! ./scenes */ \"./src/core/scenes/index.js\" ),\n\tSprites : __webpack_require__( /*! ./sprites */ \"./src/core/sprites/index.js\" ),\n\tTiles   : __webpack_require__( /*! ./tiles */ \"./src/core/tiles/index.js\" ),\n\tGame    : __webpack_require__( /*! ./Game */ \"./src/core/Game.js\" ),\n};\n\nglobal.Core = Core;\n\nmodule.exports = Core;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/core/index.js?");

/***/ }),

/***/ "./src/core/input/Keyboard.js":
/*!************************************!*\
  !*** ./src/core/input/Keyboard.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Keyboard\n{\n\tconstructor()\n\t{\n\t\tthis.keys = {};\n\t\tthis.map  = {};\n\n\t\tvar _this = this;\n\n\t\tdocument.addEventListener( 'keydown', function( event )\n\t\t{\n\t\t\tif ( _this.map[ event.key ] !== undefined ) \n\t\t\t{\n\t\t\t\tvar context = _this.map[ event.key ]; \n\n\t\t\t\t_this.keys[ context ].isDown = true;\n\t\t\t}\n\t\t});\n\n\t\tdocument.addEventListener( 'keyup', function( event )\n\t\t{\n\t\t\tif ( _this.map[ event.key ] !== undefined ) \n\t\t\t{\n\t\t\t\tvar context = _this.map[ event.key ]; \n\n\t\t\t\t_this.keys[ context ].isDown = false;\n\t\t\t}\n\t\t});\n\t}\n\n\tcreateKey( context, key )\n\t{\n\t\tthis.keys[ context ] = \n\t\t{\n\t\t\tkey     : key,\n\t\t\tcontext : context,\n\t\t\tisDown  : false,\n\t\t};\n\n\t\tthis.map[ key ] = context;\n\t}\n\n\tcreateKeys( keys )\n\t{\n\t\tfor ( var i in keys )\n\t\t{\n\t\t\tthis.createKey( i, keys[ i ] );\n\t\t}\n\t}\n}\n\nmodule.exports = Keyboard;\n\n\n//# sourceURL=webpack:///./src/core/input/Keyboard.js?");

/***/ }),

/***/ "./src/core/input/index.js":
/*!*********************************!*\
  !*** ./src/core/input/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tKeyboard : __webpack_require__( /*! ./Keyboard */ \"./src/core/input/Keyboard.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/input/index.js?");

/***/ }),

/***/ "./src/core/loaders/Loader.js":
/*!************************************!*\
  !*** ./src/core/loaders/Loader.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar EventManager = __webpack_require__( /*! ./../events/EventManager */ \"./src/core/events/EventManager.js\" );\n\nclass Loader extends EventManager\n{\n\tconstructor( scene )\n\t{\n\t\tsuper();\n\n\t\tthis.scene = scene;\n\t\tthis.items = {};\n\t\tthis.queue = [];\n\t}\n\n\tspriteSheet( key, url, data )\n\t{\n\t\tthis.addItem( key, url, data, function( item )\n\t\t{\n\t\t\tif ( ! item.isLoaded ) \n\t\t\t{\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tvar config = {};\n\n\t\t\tif ( item.data.frameWidth !== undefined ) \n\t\t\t{\n\t\t\t\tconfig.frameWidth = item.data.frameWidth;\n\t\t\t}\n\n\t\t\tif ( item.data.frameHeight !== undefined ) \n\t\t\t{\n\t\t\t\tconfig.frameHeight = item.data.frameHeight;\n\t\t\t}\n\n\t\t\tif ( item.data.tileMargin !== undefined ) \n\t\t\t{\n\t\t\t\tconfig.tileMargin = item.data.tileMargin;\n\t\t\t}\n\n\t\t\tif ( item.data.tilePadding !== undefined ) \n\t\t\t{\n\t\t\t\tconfig.tilePadding = item.data.tilePadding;\n\t\t\t}\n\n\t\t\tthis.scene.spriteSheets.add( item.key, item.img, config );\n\n\t\t}, this );\n\t}\n\n\taddItem( key, url, data, complete, context )\n\t{\n\t\tvar item = \n\t\t{\n\t\t\tkey : key,\n\t\t\turl : url,\n\t\t\tdata : data,\n\t\t\tisLoaded : false,\n\t\t\tcomplete : complete,\n\t\t\tcontext : context,\n\t\t};\n\n\t\tthis.items[ item.key ] = item;\n\t}\n\n\tstart()\n\t{\n\t\t// Build queue\n\n\t\tthis.queue = [];\n\n\t\tfor ( var i in this.items )\n\t\t{\n\t\t\tvar item = this.items[ i ];\n\n\t\t\tif ( item.isLoaded ) \n\t\t\t{\n\t\t\t\tcontinue;\n\t\t\t}\n\n\t\t\tthis.queue.push( item.key );\n\t\t}\n\n\t\tif ( ! this.next() ) \n\t\t{\n\t\t\tthis.complete();\n\t\t}\n\t}\n\n\tnext()\n\t{\n\t\tvar key = this.queue.shift();\n\n\t\tif ( key === undefined ) \n\t\t{\n\t\t\treturn false;\n\t\t};\n\n\t\tvar item = this.items[ key ], _this = this;\n\n\t\titem.img = new Image(); \n\n\t\titem.img.onload = function()\n\t\t{\n\t\t\t_this.itemComplete( key );\n\t\t};\n\n\t\titem.img.onerror = function()\n\t\t{\n\t\t\t_this.itemError( key );\n\t\t};\n\t\t\n\t\titem.img.src = item.url;\n\n\t\tthis.items[ key ] = item;\n\n\t\treturn true;\n\t}\n\n\titemComplete( key )\n\t{\n\t\tvar item = this.items[ key ];\n\n\t\titem.isLoaded = true;\n\n\t\tthis.items[ item.key ] = item;\n\n\t\titem.complete.call( item.context, item );\n\n\t\tif ( ! this.next() ) \n\t\t{\n\t\t\tthis.complete();\n\t\t}\n\t}\n\n\titemError( key )\n\t{\n\t\tif ( ! this.next() ) \n\t\t{\n\t\t\tthis.complete();\n\t\t}\n\t}\n\n\tcomplete()\n\t{\n\t\tthis.queue = [];\n\n\t\tthis.trigger( 'complete' );\n\t}\n}\n\nmodule.exports = Loader;\n\n\n//# sourceURL=webpack:///./src/core/loaders/Loader.js?");

/***/ }),

/***/ "./src/core/loaders/index.js":
/*!***********************************!*\
  !*** ./src/core/loaders/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tLoader : __webpack_require__( /*! ./Loader */ \"./src/core/loaders/Loader.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/loaders/index.js?");

/***/ }),

/***/ "./src/core/scenes/Scene.js":
/*!**********************************!*\
  !*** ./src/core/scenes/Scene.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Loader             = __webpack_require__( /*! ./../loaders/Loader */ \"./src/core/loaders/Loader.js\" );\nvar SpriteSheetManager = __webpack_require__( /*! ./../sprites/SpriteSheetManager */ \"./src/core/sprites/SpriteSheetManager.js\" );\nvar Keyboard           = __webpack_require__( /*! ./../input/Keyboard */ \"./src/core/input/Keyboard.js\" );\n\nclass Scene\n{\n\tconstructor( id, isDefault )\n\t{\n\t\tif ( isDefault === undefined ) isDefault = false;\n\n\t\tthis.id      = id;\n\t\tthis.default = isDefault;\n\t\tthis.game;\n\t\t\n\t\tthis.spriteSheets = new SpriteSheetManager();\n\t\tthis.load         = new Loader( this );\n\t\tthis.keyboard     = new Keyboard();\n\t}\n\n\tpreload()\n\t{\n\t\t\n\t}\n\n\tcreate()\n\t{\n\t\t\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\t\n\t}\n\n\trender()\n\t{\n\t\t\n\t}\n\n\tdestroy()\n\t{\n\t\t\n\t}\n}\n\nmodule.exports = Scene;\n\n\n//# sourceURL=webpack:///./src/core/scenes/Scene.js?");

/***/ }),

/***/ "./src/core/scenes/SceneManager.js":
/*!*****************************************!*\
  !*** ./src/core/scenes/SceneManager.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass SceneManager\n{\n\tconstructor( game, scenes )\n\t{\n\t\tthis.game       = game;\n\t\tthis.loadScenes = scenes;\n\t\tthis.scenes     = {};\n\t\tthis.scene      = null;\n\n\t\tgame.events.on( 'init'  , this.init, this );\n\t\tgame.events.on( 'ready' , this.ready, this );\n\t\tgame.events.on( 'update', this.update, this );\n\t\tgame.events.on( 'render', this.render, this );\n\t}\n\n\tinit()\n\t{\n\t\tfor ( var i in this.loadScenes )\n\t\t{\n\t\t\tthis.addScene( this.loadScenes[ i ] );\n\t\t}\n\t}\n\n\taddScene( Scene )\n\t{\n\t\tvar scene = new Scene();\n\n\t\tthis.scenes[ scene.id ] = scene;\n\t}\n\n\tsetScene( id )\n\t{\n\t\tif ( this.scene ) \n\t\t{\n\t\t\tthis.scene.destroy();\n\t\t}\n\n\t\tthis.scene = this.scenes[ id ];\n\t\tthis.scene.game = this.game;\n\t\tthis.scene.preload();\n\t\tthis.scene.load.on( 'complete', this.scene.create, this.scene );\n\t\tthis.scene.load.start();\n\t}\n\n\tready()\n\t{\n\t\t// Get current scene\n\n\t\tvar currentScene;\n\n\t\tfor ( var i in this.scenes )\n\t\t{\n\t\t\tvar scene = this.scenes[ i ];\n\n\t\t\tif ( scene.default ) \n\t\t\t{\n\t\t\t\tcurrentScene = scene.id;\n\t\t\t}\n\t\t}\n\n\t\tif ( currentScene === undefined ) \n\t\t{\n\t\t\tvar ids = Object.keys( this.scenes );\n\n\t\t\tif ( ids.length )\n\t\t\t{\n\t\t\t\tcurrentScene = ids[ 0 ];\n\t\t\t}\n\t\t}\n\n\t\t// Set current scene\n\n\t\tif ( currentScene !== undefined ) \n\t\t{\n\t\t\tthis.setScene( currentScene );\n\t\t}\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\tif ( this.scene ) \n\t\t{\n\t\t\tthis.scene.update( time, delta );\n\t\t}\n\t}\n\n\trender()\n\t{\n\t\tif ( this.scene ) \n\t\t{\n\t\t\tthis.scene.render();\n\t\t}\n\t}\n}\n\nmodule.exports = SceneManager;\n\n\n//# sourceURL=webpack:///./src/core/scenes/SceneManager.js?");

/***/ }),

/***/ "./src/core/scenes/index.js":
/*!**********************************!*\
  !*** ./src/core/scenes/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tScene        : __webpack_require__( /*! ./Scene */ \"./src/core/scenes/Scene.js\" ),\n\tSceneManager : __webpack_require__( /*! ./SceneManager */ \"./src/core/scenes/SceneManager.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/scenes/index.js?");

/***/ }),

/***/ "./src/core/sprites/Sprite.js":
/*!************************************!*\
  !*** ./src/core/sprites/Sprite.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Geom = __webpack_require__( /*! ../geom */ \"./src/core/geom/index.js\" );  \n\nclass Sprite\n{\n\tconstructor( scene, x, y, texture, frame )\n\t{\n\t\tthis.scene    = scene;\n\t\tthis.texture  = texture;\n\t\tthis.frame    = frame || 0;\n\t\tthis.position = new Geom.Vector2( x, y );\n\t\tthis.velocity = new Geom.Vector2( 0, 0 );\n\t\tthis.width    = 24;\n\t\tthis.height   = 24;\n\n\t\tthis.sheet = this.scene.spriteSheets.get( this.texture );\n\n\t\tif ( this.sheet )\n\t\t{\n\t\t\tthis.width  = this.sheet.frameWidth;\n\t\t\tthis.height = this.sheet.frameHeight;\n\t\t}\n\t}\n\n\tsetPosition( x, y )\n\t{\n\t\tthis.position.set( x, y );\n\t}\n\n\tsetVelocity( x, y )\n\t{\n\t\tthis.velocity.set( x, y );\n\t}\n\n\tsetVelocityX( x )\n\t{\n\t\tthis.velocity.setX( x );\n\t}\n\n\tsetVelocityY( y )\n\t{\n\t\tthis.velocity.setY( y );\n\t}\n\n\tupdate( time, delta )\n\t{\n\t\tvar x = ( this.velocity.x / 1000 ) * delta;\n\t\tvar y = ( this.velocity.y / 1000 ) * delta;\n\n\t\tthis.position.add( x, y );\n\t}\n\n\trender()\n\t{\n\t\tif ( ! this.sheet ) \n\t\t{\n\t\t\treturn;\n\t\t}\n\n\t\tvar frame = this.sheet.getFrame( this.frame );\n\n\t\tvar context = this.scene.game.canvas.getContext( '2d' );\n\n\t\tcontext.save();\n\t\tcontext.translate( this.position.x, this.position.y );\n\t\tcontext.drawImage( this.sheet.img, frame.x, frame.y, frame.width, frame.height, -this.width / 2, -this.height / 2, this.width, this.height );\n\t\tcontext.restore();\n\n\t\t// Debug\n\t\tif ( this.scene.game.debug ) \n\t\t{\n\t\t\t// Velocity\n\t\t\tcontext.save();\n\t\t\tcontext.translate( this.position.x, this.position.y );\n\t\t\tcontext.beginPath();\n\t\t\tcontext.moveTo( 0, 0 );\n\t\t\tcontext.lineTo( this.velocity.x, this.velocity.y );\n\t\t\tcontext.closePath();\n\t\t\tcontext.strokeStyle = 'purple';\n\t\t\tcontext.stroke();\n\t\t\tcontext.restore();\n\n\t\t\t// Pedestal\n\t\t\tcontext.save();\n\t\t\tcontext.translate( this.position.x, this.position.y );\n\t\t\tcontext.strokeStyle = 'purple';\n\t\t\tcontext.strokeRect( - this.width / 2, - this.height / 2, this.width, this.height );\n\t\t\tcontext.restore();\n\t\t}\n\t}\n}\n\nmodule.exports = Sprite;\n\n\n//# sourceURL=webpack:///./src/core/sprites/Sprite.js?");

/***/ }),

/***/ "./src/core/sprites/SpriteSheet.js":
/*!*****************************************!*\
  !*** ./src/core/sprites/SpriteSheet.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Geom = __webpack_require__( /*! ../geom */ \"./src/core/geom/index.js\" );\n\nclass SpriteSheet\n{\n\tconstructor( id, img, config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\tframeWidth  : 32,\n\t\t\tframeHeight : 32,\n\t\t\ttileMargin  : 0,\n\t\t\ttilePadding : 0,\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.id          = id;\n\t\tthis.img         = img;\n\t\tthis.frameWidth  = config.frameWidth;\n\t\tthis.frameHeight = config.frameHeight;\n\t\tthis.tileMargin  = config.tileMargin;\n\t\tthis.tilePadding = config.tilePadding;\n\t}\n\n\tgetFrameLocation( index )\n\t{\n\t\tvar x = index % Math.floor( this.img.width / this.frameWidth );\n\t\tvar y = ( index - x ) / Math.floor( this.img.width / this.frameHeight );\n\n\t\treturn new Geom.Vector2( x, y );\n\t}\n\n\tgetFrame( index )\n\t{\n\t\tvar location = this.getFrameLocation( index );\n\n\t\treturn {\n\t\t\tx      : location.x * ( this.frameWidth  + this.tilePadding ) + this.tileMargin,\n\t\t\ty      : location.y * ( this.frameHeight + this.tilePadding ) + this.tileMargin,\n\t\t\twidth  : this.frameWidth,\n\t\t\theight : this.frameHeight,\n\t\t};\n\t}\n}\n\nmodule.exports = SpriteSheet;\n\n\n//# sourceURL=webpack:///./src/core/sprites/SpriteSheet.js?");

/***/ }),

/***/ "./src/core/sprites/SpriteSheetManager.js":
/*!************************************************!*\
  !*** ./src/core/sprites/SpriteSheetManager.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar SpriteSheet = __webpack_require__( /*! ./SpriteSheet */ \"./src/core/sprites/SpriteSheet.js\" ); \n\nclass SpriteSheetManager\n{\n\tconstructor()\n\t{\n\t\tthis.sheets = {};\n\t}\n\n\tget( id )\n\t{\n\t\treturn this.sheets[ id ];\n\t}\n\n\tadd( id, img, config )\n\t{\n\t\tvar sheet = new SpriteSheet( id, img, config );\n\n\t\tthis.sheets[ sheet.id ] = sheet;\n\t}\n}\n\nmodule.exports = SpriteSheetManager;\n\n\n//# sourceURL=webpack:///./src/core/sprites/SpriteSheetManager.js?");

/***/ }),

/***/ "./src/core/sprites/index.js":
/*!***********************************!*\
  !*** ./src/core/sprites/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tSprite             : __webpack_require__( /*! ./Sprite */ \"./src/core/sprites/Sprite.js\" ),\n\tSpriteSheet        : __webpack_require__( /*! ./SpriteSheet */ \"./src/core/sprites/SpriteSheet.js\" ),\n\tSpriteSheetManager : __webpack_require__( /*! ./SpriteSheetManager */ \"./src/core/sprites/SpriteSheetManager.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/sprites/index.js?");

/***/ }),

/***/ "./src/core/tiles/Tile.js":
/*!********************************!*\
  !*** ./src/core/tiles/Tile.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass Tile\n{\n\tconstructor( layer, index, frame, x, y, width, height )\n\t{\n\t\tthis.layer   = layer;\n\t\tthis.index   = index;\n\t\tthis.frame   = frame;\n\t\tthis.x       = x;\n\t\tthis.y       = y;\n\t\tthis.width   = width;\n\t\tthis.height  = height;\n\t\tthis.xPixels = this.x * this.width;\n\t\tthis.yPixels = this.y * this.height;\n\t\tthis.collide = false;\n\t}\n\n\trender()\n\t{\n\t\tvar game      = this.layer.scene.game;\n\t\tvar tileSheet = this.layer.tileSheet;\n\t\tvar frame     = tileSheet.getFrame( this.frame );\n\t\tvar context   = game.canvas.getContext( '2d' );\n\n\t\tcontext.save();\n\t\tcontext.translate( this.xPixels, this.yPixels );\n\t\tcontext.drawImage( tileSheet.img, frame.x, frame.y, frame.width, frame.height, 0, 0, this.width, this.height );\n\t\tcontext.restore();\n\n\t\tif ( game.debug ) \n\t\t{\n\t\t\tcontext.save();\n\t\t\tcontext.translate( this.xPixels, this.yPixels );\n\t\t\tcontext.strokeStyle = 'rgba( 0, 0, 0, .15 )';\n\t\t\tcontext.strokeRect( 0, 0, this.width, this.height );\n\t\t\tcontext.restore();\n\t\t}\n\t}\n}\n\nmodule.exports = Tile;\n\n\n//# sourceURL=webpack:///./src/core/tiles/Tile.js?");

/***/ }),

/***/ "./src/core/tiles/TileMap.js":
/*!***********************************!*\
  !*** ./src/core/tiles/TileMap.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Tile = __webpack_require__( /*! ./Tile */ \"./src/core/tiles/Tile.js\" ); \nvar Geom = __webpack_require__( /*! ./../geom */ \"./src/core/geom/index.js\" );  \n\nclass TileMap\n{\n\tconstructor( scene, tileSheet, config )\n\t{\n\t\tvar defaults = \n\t\t{\n\t\t\twidth : 0,\n\t\t\theight : 0,\n\t\t\ttileData : [],\n\t\t\ttileProperties : {},\n\t\t};\n\n\t\tconfig = Object.assign( {}, defaults, config );\n\n\t\tthis.scene          = scene;\n\t\tthis.width          = config.width;\n\t\tthis.height         = config.height;\n\t\tthis.tileData       = config.tileData;\n\t\tthis.tileProperties = config.tileProperties;\n\t\tthis.tileSheet      = this.scene.spriteSheets.get( tileSheet );\n\t\tthis.tileWidth      = this.tileSheet.frameWidth;\n\t\tthis.tileheight     = this.tileSheet.frameHeight;\n\t\tthis.tiles          = {};\n\n\t\tfor ( var index = 0; index < this.tileData.length; index++ )\n\t\t{\n\t\t\tthis.addTile( index, this.tileData[ index ] );\n\t\t}\n\t}\n\n\tgetTile( index )\n\t{\n\t\treturn this.tiles[ index ];\n\t}\n\n\tgetTileAt( x, y, translate )\n\t{\n\t\tvar index = this.getTileIndex( x, y, translate );\n\n\t\treturn this.getTile( index );\n\t}\n\n\taddTile( index, frame )\n\t{\n\t\tvar location = this.getTileLocation( index );\n\t\tvar properties = this.tileProperties[ frame ] || {};\n\n\t\tvar tile = new Tile( this, \n\t\t\tindex, \n\t\t\tframe, \n\t\t\tlocation.x, \n\t\t\tlocation.y, \n\t\t\tthis.tileWidth, \n\t\t\tthis.tileheight );\n\n\t\ttile.collide = properties.collide !== undefined ? properties.collide : false;\n\n\t\tthis.tiles[ tile.index ] = tile;\n\t}\n\n\tgetTileIndex( x, y, translate )\n\t{\n\t\tif ( translate ) \n\t\t{\n\t\t\tx = Math.floor( x / this.tileWidth );\n\t\t\ty = Math.floor( y / this.tileheight );\n\t\t}\n\n\t\tif ( x < 0 || x >= this.width || y < 0 || y >= this.height ) \n\t\t{\n\t\t\treturn -1;\n\t\t}\n\n\t\treturn this.width * y + x;\n\t}\n\n\tgetTileLocation( index )\n\t{\n\t\tvar x = index % this.width;\n\t\tvar y = ( index - x ) / this.width;\n\n\t\treturn new Geom.Vector2( x, y );\n\t}\n\n\tgetTileNeighbors( index, diagonal )\n\t{\n\t\tif ( diagonal === undefined ) diagonal = false;\n\n\t\tvar loc = this.getTileLocation( index );\n\n\t\tvar n  = this.getTileAt( loc.x + 0, loc.y - 1 );\n\t\tvar ne = this.getTileAt( loc.x + 1, loc.y - 1 );\n\t\tvar e  = this.getTileAt( loc.x + 1, loc.y + 0 );\n\t\tvar se = this.getTileAt( loc.x + 1, loc.y + 1 );\n\t\tvar s  = this.getTileAt( loc.x + 0, loc.y + 1 );\n\t\tvar sw = this.getTileAt( loc.x - 1, loc.y + 1 );\n\t\tvar w  = this.getTileAt( loc.x - 1, loc.y + 0 );\n\t\tvar nw = this.getTileAt( loc.x - 1, loc.y - 1 );\n\n\t\tvar neighbors = [];\n\n\t\tif ( n && ! n.collide ) neighbors.push( n.index );\n\t\tif ( e && ! e.collide ) neighbors.push( e.index );\n\t\tif ( s && ! s.collide ) neighbors.push( s.index );\n\t\tif ( w && ! w.collide ) neighbors.push( w.index );\n\n\t\tif ( diagonal ) \n\t\t{\n\t\t\tif ( ne && ! ne.collide && n && ! n.collide && e && ! e.collide ) neighbors.push( ne.index );\n\t\t\tif ( se && ! se.collide && s && ! s.collide && e && ! e.collide ) neighbors.push( se.index );\n\t\t\tif ( sw && ! sw.collide && s && ! s.collide && w && ! w.collide ) neighbors.push( sw.index );\n\t\t\tif ( nw && ! nw.collide && n && ! n.collide && w && ! w.collide ) neighbors.push( nw.index );\n\t\t};\n\n\t\treturn neighbors;\n\t}\n\n\tgetFlowField( index )\n\t{\n\t\tvar frontier = [ index ];\n\t\tvar visited = { [ index ] : 0 };\n\n\t\twhile ( frontier.length )\n\t\t{\n\t\t\tvar current = frontier.shift();\n\n\t\t\tvar neighbors = this.getTileNeighbors( current );\n\n\t\t\tfor ( var i in neighbors )\n\t\t\t{\n\t\t\t\tvar next = neighbors[ i ];\n\n\t\t\t\tif ( visited[ next ] === undefined ) \n\t\t\t\t{\n\t\t\t\t\tfrontier.push( next );\n\n\t\t\t\t\tvisited[ next ] = 1 + visited[ current ];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn visited;\n\t}\n\n\tgetPath( a, b, translate )\n\t{\n\t\tif ( translate === undefined ) translate = false;\n\n\t\tvar field = this.getFlowField( b );\n\n\t\tif ( field[ a ] === undefined || field[ b ] === undefined ) \n\t\t{\n\t\t\tconsole.warn( 'Unable to find path from ' + a + ' to ' + b + '.' );\n\n\t\t\treturn [];\n\t\t}\n\n\t\tvar path = [];\n\n\t\t//\n\n\t\tvar frontier = [ a ];\n\t\tvar visited = { [ a ] : true };\n\n\t\twhile ( frontier.length )\n\t\t{\n\t\t\tvar current = frontier.shift();\n\t\t\tvar next, cost;\n\n\t\t\t// Get neighbor with lowest cost\n\t\t\tvar neighbors = this.getTileNeighbors( current, true );\n\n\t\t\tfor ( var i in neighbors )\n\t\t\t{\n\t\t\t\tvar neighbor = neighbors[ i ];\n\n\t\t\t\tif ( cost === undefined || cost > field[ neighbor ] ) \n\t\t\t\t{\n\t\t\t\t\tcost = field[ neighbor ];\n\t\t\t\t\tnext = neighbor;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tif ( next !== undefined && visited[ next ] === undefined ) \n\t\t\t{\n\t\t\t\tfrontier.push( next );\n\n\t\t\t\tvisited[ next ] = true;\n\n\t\t\t\tpath.push( next );\n\t\t\t}\n\t\t}\n\n\t\t//\n\n\t\tif ( translate ) \n\t\t{\n\t\t\treturn this.translatePath( path );\n\t\t}\n\n\t\treturn path;\n\t}\n\n\ttranslatePath( path )\n\t{\n\t\tvar translation = [];\n\n\t\tfor ( var i in path )\n\t\t{\n\t\t\tvar index = path[ i ];\n\t\t\tvar tile  = this.getTile( index );\n\n\t\t\tvar position = new Geom.Vector2( tile.xPixels + tile.width / 2, tile.yPixels + tile.height / 2 );\n\n\t\t\ttranslation.push( position );\n\t\t}\n\n\t\treturn translation;\n\t}\n\n\trender()\n\t{\n\t\tif ( ! this.tileSheet ) \n\t\t{\n\t\t\treturn;\n\t\t}\n\n\t\tfor ( var i in this.tiles )\n\t\t{\n\t\t\tthis.tiles[ i ].render();\n\t\t}\n\t}\n}\n\nmodule.exports = TileMap;\n\n\n//# sourceURL=webpack:///./src/core/tiles/TileMap.js?");

/***/ }),

/***/ "./src/core/tiles/index.js":
/*!*********************************!*\
  !*** ./src/core/tiles/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tTileMap : __webpack_require__( /*! ./TileMap */ \"./src/core/tiles/TileMap.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/core/tiles/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n__webpack_require__( /*! ./app */ \"./src/app/index.js\" );\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });