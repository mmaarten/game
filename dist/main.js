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

/***/ "./src/gameobjects/Agent.js":
/*!**********************************!*\
  !*** ./src/gameobjects/Agent.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Sprite = __webpack_require__( /*! ./Sprite */ \"./src/gameobjects/Sprite.js\" );\n\nvar Agent = new Phaser.Class(\n{\n\tExtends : Sprite,\n\n    initialize :\n\n    function constructor( scene, config )\n    {\n        var defaults = \n        {\n            x           : undefined,\n            y           : undefined,\n            texture     : undefined, // required\n            frame       : undefined,\n            movingSpeed : 100,\n            health      : 100,\n            animKeys    : \n            {\n                left  : '', // required\n                right : '', // required\n                up    : '', // required\n                down  : '', // required\n                dead  : '', // required\n            },\n        };\n\n        this.config = Object.assign( {}, defaults, config );\n\n    \tSprite.call( this, scene, config.x, config.y, config.texture, config.frame );\n\n        this.movingSpeed = this.config.movingSpeed;\n        this.health      = this.config.health;\n        this.animKeys    = Object.assign( {}, defaults.animKeys, this.config.animKeys );\n        this.moveDir     = new Phaser.Math.Vector2();\n        this.lookDir     = new Phaser.Math.Vector2();\n        this.weapons     = {};\n        this.weapon      = null;\n        this.target      = null;\n    },\n\n    addWeapon : function( key, weapon )\n    {\n        this.weapons[ key ] = weapon;\n    },\n\n    removeWeapon : function( key )\n    {\n        delete this.weapons[ key ];\n    },\n\n    setWeapon : function( key )\n    {\n        this.weapon = this.weapons[ key ];\n    },\n\n    unsetWeapon : function( key )\n    {\n        this.weapon = null;\n    },\n\n    useWeapon : function( mode )\n    {\n        if ( ! this.weapon ) \n        {\n            console.warn( 'No weapon set.' );\n\n            return;\n        }\n\n        this.weapon.setDirection( this.lookDir.x, this.lookDir.y );\n        this.weapon.use( this, mode );\n    },\n\n    isMoving : function()\n    {\n        return this.body.velocity.x || this.body.velocity.y ? true : false;\n    },\n\n    move : function( dirX, dirY )\n    {\n        this.moveDir.set( dirX, dirY );\n\n    \tthis.setVelocity( this.movingSpeed * this.moveDir.x, this.movingSpeed * this.moveDir.y );\n    },\n\n    moveTo : function( x, y )\n    {\n        var distance = Phaser.Math.Distance.Between( this.x, this.y, x, y );\n\n        var dirX = ( x - this.x ) / distance;\n        var dirY = ( y - this.y ) / distance;\n\n        this.move( dirX, dirY );\n    },\n\n    look : function( dirX, dirY )\n    {\n        this.lookDir.set( dirX, dirY );\n\n        if ( Math.round( this.lookDir.x ) < 0 ) \n        {\n            this.play( this.animKeys.left, this.isMoving() );\n        }\n\n        else if ( Math.round( this.lookDir.x ) > 0 ) \n        {\n            this.play( this.animKeys.right, this.isMoving() );\n        }\n\n        else if ( Math.round( this.lookDir.y ) < 0 ) \n        {\n            this.play( this.animKeys.up, this.isMoving() );\n        }\n\n        else if ( Math.round( this.lookDir.y ) > 0 ) \n        {\n            this.play( this.animKeys.down, this.isMoving() );\n        }\n\n        else\n        {\n            this.play( this.animKeys.down, this.isMoving() );\n        }\n    },\n\n    lookAt : function( x, y )\n    {\n        var distance = Phaser.Math.Distance.Between( this.x, this.y, x, y );\n\n        var dirX = ( x - this.x ) / distance;\n        var dirY = ( y - this.y ) / distance;\n\n        this.look( dirX, dirY );\n    },\n\n    follow : function( target )\n    {\n        this.target = target;\n    },\n\n    unfollow : function()\n    {\n        this.target = null;\n    },\n\n    reset : function()\n    {\n        this.setActive( true );\n        this.setVisible( true );\n\n        this.play( this.animKeys.down );\n        \n        this.movingSpeed = this.config.movingSpeed;\n        this.health      = this.config.health;\n    },\n\n    update: function( time, delta )\n    {\n        if ( this.target ) \n        {\n            this.moveTo( this.target.x, this.target.y );\n        }\n    },\n\n    die : function()\n    {\n        this.play( this.animKeys.dead );\n\n        this.setVelocity( 0 );\n        this.setActive( false );\n        this.body.stop();\n    },\n\n    destroy : function()\n    {\n        this.setActive( false );\n        this.setVisible( false );\n\n        this.body.stop();\n    },\n});\n\nmodule.exports = Agent;\n\n\n//# sourceURL=webpack:///./src/gameobjects/Agent.js?");

/***/ }),

/***/ "./src/gameobjects/Bullet.js":
/*!***********************************!*\
  !*** ./src/gameobjects/Bullet.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Sprite = __webpack_require__( /*! ./Sprite */ \"./src/gameobjects/Sprite.js\" );\n\nvar Bullet = new Phaser.Class(\n{\n\tExtends : Sprite,\n\n    initialize :\n\n    function constructor( scene, x, y, texture, frame )\n    {\n    \tSprite.call( this, scene, 0, 0, 'bullets.default' );\n\n        this.lifespan = 2000;\n        this.damage   = 25;\n    },\n\n    reset : function()\n    {\n        this.lifespan = 2000;\n\n        this.setActive( true );\n        this.setVisible( true );\n    },\n\n    update: function( time, delta )\n    {\n        this.lifespan -= delta;\n\n        if ( this.lifespan <= 0 )\n        {\n            this.destroy();\n        }\n    },\n\n    destroy: function()\n    {\n        this.setActive( false );\n        this.setVisible( false );\n\n        this.body.stop();\n    }\n});\n\nmodule.exports = Bullet;\n\n\n//# sourceURL=webpack:///./src/gameobjects/Bullet.js?");

/***/ }),

/***/ "./src/gameobjects/Firearm.js":
/*!************************************!*\
  !*** ./src/gameobjects/Firearm.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar Weapon = __webpack_require__( /*! ./Weapon */ \"./src/gameobjects/Weapon.js\" );\n\nvar Firearm = new Phaser.Class(\n{\n\tExtends : Weapon,\n\n    initialize :\n\n    function constructor( scene, config )\n    {\n        var defaults = \n        {\n            bulletSpeed    : 750,\n            useInterval    : 1000, // ms\n            rounds         : 10,\n            reloadTime     : 1000, // ms\n            deviation      : 50,   // pixels\n            recoil         : 50,   // pixels\n            useSound       : null,\n            reloadSound    : null,\n            emptySound     : null,\n            bullets        : scene.physics.add.group(),\n        };\n\n        config = Object.assign( {}, defaults, config );\n\n    \tWeapon.call( this, scene );\n       \n        this.bulletSpeed   = config.bulletSpeed;\n        this.useInterval   = config.useInterval;\n        this.useSound      = config.useSound;\n        this.reloadSound   = config.reloadSound;\n        this.emptySound    = config.emptySound;\n        this.rounds        = config.rounds;\n        this.reloadTime    = config.reloadTime;\n        this.deviation     = config.deviation;\n        this.recoil        = config.recoil;\n        this.bullets       = config.bullets;\n        this.roundsLeft    = this.rounds;\n        this.isReloading   = false;\n        this.reloadTimeout = null;\n        this.lastUsed      = null;\n    },\n\n    reload : function()\n    {\n        // Stop when already reloading\n\n        if ( this.isReloading ) \n        {\n            return;\n        }\n\n        this.isReloading = true;\n\n        // Make sure previous timeout is destroyed\n\n        if ( this.reloadTimeout ) \n        {\n            clearTimeout( this.reloadTimeout );\n\n            this.reloadTimeout = null;\n        }\n\n        // Play sound\n\n        if ( this.reloadSound ) \n        {\n            this.scene.sound.play( this.reloadSound );\n        }\n\n        // Set timeout\n\n        var _this = this;\n\n        this.reloadTimeout = setTimeout( function()\n        {\n            // Reset rounds\n            _this.roundsLeft = _this.rounds;\n\n            // Reloading complete\n            _this.isReloading = false;\n\n        }, this.reloadTime );\n    },\n\n    canUse : function()\n    {\n        // Check if our 'use' interval is passed.\n\n        var now = new Date();\n\n        if ( ! this.lastUsed ) \n        {\n            return true;\n        }\n\n        if ( now.getTime() - this.lastUsed.getTime() >= this.useInterval ) \n        {\n            return true;\n        }\n\n        return false;\n    },\n\n    use : function( agent, mode )\n    {\n        if ( ! this.canUse() && mode != 'single' ) \n        {\n            return;\n        }\n\n        // Check reloading\n\n        if ( this.isReloading ) \n        {\n            return;\n        }\n\n        // Check clip size\n\n        if ( this.roundsLeft < 1 ) \n        {\n            // Sound\n\n            if ( this.emptySound ) \n            {\n                var sound = this.scene.sounds[ this.emptySound ];\n\n                if ( ! sound.isPlaying ) \n                {\n                    sound.play();\n                }\n            }\n\n            return;\n        }\n\n        // Get next available bullet\n\n        var bullet = this.bullets.get();\n\n        if ( ! bullet ) \n        {\n            console.warn( 'No bullets instances available.' );\n\n            return;\n        }\n\n        // Fire bullet\n        \n        bullet.reset();\n        bullet.setPosition( agent.x, agent.y );\n\n        var deviationX = Phaser.Math.Between( - this.deviation, this.deviation );\n        var deviationY = Phaser.Math.Between( - this.deviation, this.deviation );\n\n        bullet.setVelocity( this.bulletSpeed * this.dirX + deviationX, this.bulletSpeed * this.dirY + deviationY );\n\n        var recoil = Phaser.Math.Between( - this.recoil, this.recoil );\n\n        agent.setVelocity( -1 * this.dirX + recoil, -1 * this.dirY + recoil );\n\n        if ( this.useSound ) \n        {\n            this.scene.sound.play( this.useSound );\n        }\n\n        this.roundsLeft--;\n\n        this.lastUsed = new Date();\n    }\n});\n\nmodule.exports = Firearm;\n\n\n//# sourceURL=webpack:///./src/gameobjects/Firearm.js?");

/***/ }),

/***/ "./src/gameobjects/Sprite.js":
/*!***********************************!*\
  !*** ./src/gameobjects/Sprite.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar Sprite = new Phaser.Class(\n{\n\tExtends : Phaser.Physics.Arcade.Sprite,\n\n    initialize :\n\n    function constructor( scene, x, y, texture, frame )\n    {\n    \tPhaser.Physics.Arcade.Sprite.call( this, scene, x, y, texture, frame );\n\n    \t// Setup sprite for scene\n    \tthis.scene = scene;\n    \tthis.scene.add.existing( this );\n    \tthis.scene.physics.world.enableBody( this, 0 );\n    }\n});\n\nmodule.exports = Sprite;\n\n//# sourceURL=webpack:///./src/gameobjects/Sprite.js?");

/***/ }),

/***/ "./src/gameobjects/Weapon.js":
/*!***********************************!*\
  !*** ./src/gameobjects/Weapon.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar Weapon = new Phaser.Class(\n{\n    initialize :\n\n    function constructor( scene )\n    {\n    \tthis.scene = scene;\n\n    \tthis.dirX = 0;\n    \tthis.dirY = 0;\n    },\n\n    setDirection : function( dirX, dirY )\n    {\n    \tthis.dirX = dirX;\n    \tthis.dirY = dirY;\n    },\n\n    use : function( agent )\n    {\n    \t\n    }\n});\n\nmodule.exports = Weapon;\n\n\n//# sourceURL=webpack:///./src/gameobjects/Weapon.js?");

/***/ }),

/***/ "./src/gameobjects/index.js":
/*!**********************************!*\
  !*** ./src/gameobjects/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tSprite  : __webpack_require__( /*! ./Sprite */ \"./src/gameobjects/Sprite.js\" ),\n\tAgent   : __webpack_require__( /*! ./Agent */ \"./src/gameobjects/Agent.js\" ),\n\tWeapon  : __webpack_require__( /*! ./Weapon */ \"./src/gameobjects/Weapon.js\" ),\n\tFirearm : __webpack_require__( /*! ./Firearm */ \"./src/gameobjects/Firearm.js\" ),\n\tBullet  : __webpack_require__( /*! ./Bullet */ \"./src/gameobjects/Bullet.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/gameobjects/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {\nvar App = \n{\n\tScenes      : __webpack_require__( /*! ./scenes */ \"./src/scenes/index.js\" ),\n\tGameObjects : __webpack_require__( /*! ./gameobjects */ \"./src/gameobjects/index.js\" ),\n};\n\nmodule.exports = App;\n\nglobal.App = App;\n\n__webpack_require__( /*! ./init */ \"./src/init.js\" );\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/init.js":
/*!*********************!*\
  !*** ./src/init.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nlet game = new Phaser.Game(\n{\n    type   : Phaser.AUTO,\n    width  : 650,\n    height : 650 / 800 * 600,\n    roundPixels: true,\n    physics: \n    {\n        default: 'arcade',\n        arcade: \n        {\n            gravity: { y: 0 },\n            debug: false,\n        }\n    },\n    scene : [ App.Scenes.MyScene ],\n});\n\n\n//# sourceURL=webpack:///./src/init.js?");

/***/ }),

/***/ "./src/scenes/MyScene.js":
/*!*******************************!*\
  !*** ./src/scenes/MyScene.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar GameObjects = __webpack_require__( /*! ./../gameobjects */ \"./src/gameobjects/index.js\" );\nvar Utils = __webpack_require__( /*! ./../utils */ \"./src/utils/index.js\" );\n\nvar MyScene = new Phaser.Class(\n{\n    Extends : Phaser.Scene,\n\n    initialize :\n\n    function constructor()\n    {\n    \tPhaser.Scene.call( this,\n    \t{\n    \t\tkey    : 'myScene',\n    \t\tactive : true,\n    \t});\n    },\n\n    preload : function()\n\t{\n\t\t// Map\n\t\tthis.load.image( 'tiles', 'assets/tmw_desert_spacing.png' );\n\t\tthis.load.tilemapCSV( 'map', 'assets/map.csv' );\n\n\t\t// Agents\n\n\t\tthis.load.spritesheet( 'agents.agent_1', 'assets/agent_1.png', \n\t\t{\n\t\t\tframeWidth : 16,\n\t\t\tframeHeight: 16,\n\t\t});\n\n\t\tthis.load.spritesheet( 'agents.agent_2', 'assets/agent_2.png', \n\t\t{\n\t\t\tframeWidth : 16,\n\t\t\tframeHeight: 16,\n\t\t});\n\n\t\tthis.load.spritesheet( 'bullets.default', 'assets/bullet.png', \n\t\t{\n\t\t\tframeWidth : 10,\n\t\t\tframeHeight: 10,\n\t\t});\n\n\t\t// Sounds\n\n\t\tthis.load.audio( 'gun_shot', 'assets/sounds/gun-shot.mp3', \n\t\t{\n        \tinstances: 1,\n    \t});\n\n    \tthis.load.audio( 'gun_reload', 'assets/sounds/gun-reload.mp3', \n\t\t{\n        \tinstances: 1,\n    \t});\n\n    \tthis.load.audio( 'gun_empty', 'assets/sounds/gun-empty.mp3', \n\t\t{\n        \tinstances: 1,\n    \t});\n\n    \tthis.load.audio( 'gun_shell_fall', 'assets/sounds/gun-shell-fall.mp3', \n\t\t{\n        \tinstances: 1,\n    \t});\n\n    \tthis.load.audio( 'uzi_shot', 'assets/sounds/uzi-shot.mp3', \n\t\t{\n        \tinstances: 1,\n    \t});\n\t},\n\n\tcreate : function()\n\t{\n\t\t/**\n\t\t * Keyboard keys\n\t\t */\n\n\t\tthis.cursors = this.input.keyboard.createCursorKeys();\n\n\t\tthis.cursors = this.input.keyboard.addKeys(\n\t\t{\n\t\t\tup       : Phaser.Input.Keyboard.KeyCodes.Z,\n\t\t\tdown     : Phaser.Input.Keyboard.KeyCodes.S,\n\t\t\tleft     : Phaser.Input.Keyboard.KeyCodes.Q,\n\t\t\tright    : Phaser.Input.Keyboard.KeyCodes.D,\n\t\t\treload   : Phaser.Input.Keyboard.KeyCodes.R,\n\t\t\tweapon_1 : Phaser.Input.Keyboard.KeyCodes.O,\n\t\t\tweapon_2 : Phaser.Input.Keyboard.KeyCodes.P,\n\t\t});\n\n\t\t/**\n\t\t * Sounds\n\t\t */\n\n\t\tthis.sounds = {};\n\n\t\t[ 'gun_shot', 'gun_reload', 'gun_empty', 'gun_shell_fall', 'uzi_shot' ].forEach( function( key )\n\t\t{\n\t\t\tthis.sounds[ key ] = this.sound.add( key );\n\t\t}, this );\n\n\t\t/**\n\t\t * Map\n\t\t */\n\n\t\tthis.map     = this.make.tilemap( { key: 'map', tileWidth: 32, tileHeight: 32 } );\n\t\tthis.tileset = this.map.addTilesetImage( 'tiles', 'tiles', 32, 32, 1, 1 );\n\t\tthis.layer   = this.map.createStaticLayer( 0, this.tileset, 0, 0 ); // layer index, tileset, x, y\n\t\tthis.layer.setCollision( [ 37, 31 ], true );\n\t\t\n\t\t// Any tile with the collides property set to true (in Tiled) will be set to collide\n    \t// this.layer.setCollisionByProperty({ collides: true });\n\n\t\t/**\n\t\t * Bullets\n\t\t */\n\n\t\tthis.bullets = this.physics.add.group(\n\t\t{\n\t        classType      : GameObjects.Bullet,\n\t        maxSize        : 1000,\n\t        runChildUpdate : true,\n    \t});\n\n\t    /**\n\t\t * Agents\n\t\t */\n\n\t\tthis.agents = \n\t\t{\n\t\t\tagent_1 : \n\t\t\t{\n\t\t\t\ttexture     : 'agents.agent_1',\n\t\t\t\tmovingSpeed : 100,\n\t            health      : 500,\n\t            animKeys : \n\t            {\n\t                left  : 'agents.agent_1.left',\n\t                right : 'agents.agent_1.right',\n\t                up    : 'agents.agent_1.up',\n\t                down  : 'agents.agent_1.down',\n\t                dead  : 'agents.agent_1.dead',\n\t            },\n\t\t\t},\n\n\t\t\tagent_2 : \n\t\t\t{\n\t\t\t\ttexture     : 'agents.agent_2',\n\t\t\t\tmovingSpeed : 75,\n\t            health      : 100,\n\t            animKeys : \n\t            {\n\t                left  : 'agents.agent_2.left',\n\t                right : 'agents.agent_2.right',\n\t                up    : 'agents.agent_2.up',\n\t                down  : 'agents.agent_2.down',\n\t                dead  : 'agents.agent_2.dead',\n\t            },\n\t\t\t},\n\t\t};\n\n\t\t// Create animations\n\n\t\tvar textures = [ 'agents.agent_1', 'agents.agent_2' ];\n\n\t\tfor ( var i in textures )\n\t\t{\n\t\t\tvar texture = textures[ i ];\n\n\t\t\tthis.anims.create( \n\t\t\t{\n\t\t\t\tkey       : texture + '.left',\n\t\t\t\tframes    : this.anims.generateFrameNumbers( texture, { start: 6, end: 8 } ),\n\t\t        frameRate : 20,\n\t\t        repeat    : -1\n\t\t\t});\n\n\t\t\tthis.anims.create( \n\t\t\t{\n\t\t\t\tkey       : texture + '.right',\n\t\t\t\tframes    : this.anims.generateFrameNumbers( texture, { start: 0, end: 2 } ),\n\t\t        frameRate : 20,\n\t\t        repeat    : -1\n\t\t\t});\n\n\t\t\tthis.anims.create( \n\t\t\t{\n\t\t\t\tkey       : texture + '.up',\n\t\t\t\tframes    : this.anims.generateFrameNumbers( texture, { start: 9, end: 11 } ),\n\t\t        frameRate : 20,\n\t\t        repeat    : -1\n\t\t\t});\n\n\t\t\tthis.anims.create( \n\t\t\t{\n\t\t\t\tkey       : texture + '.down',\n\t\t\t\tframes    : this.anims.generateFrameNumbers( texture, { start: 3, end: 5 } ),\n\t\t        frameRate : 20,\n\t\t        repeat    : -1\n\t\t\t});\n\n\t\t\tthis.anims.create( \n\t\t\t{\n\t\t\t\tkey       : texture + '.dead',\n\t\t\t\tframes    : this.anims.generateFrameNumbers( texture, { start: 12, end: 12 } ),\n\t\t        frameRate : 20,\n\t\t        repeat    : -1\n\t\t\t});\n\t\t};\n\n\t\t// Create agents\n\n\t\tthis.player = new GameObjects.Agent( this, this.agents.agent_1 );\n\t\tthis.player.setPosition( 32 * 5, 32 * 10 );\n\t\t//this.player.setCollideWorldBounds( true );\n\n\t\tthis.enemies = this.physics.add.group();\n\n\t\tvar cols = 19, x = 0, y = 0, spacing = 32; \n\n\t\tfor ( var i = 0; i < 100; i++ )\n\t\t{\n\t\t\tif ( i % cols === 0 ) \n\t\t\t{\n\t\t\t\tx = spacing;\n\t\t\t\ty += spacing;\n\t\t\t}\n\n\t\t\telse\n\t\t\t{\n\t\t\t\tx += spacing;\n\t\t\t}\n\n\t\t\tvar enemy = new GameObjects.Agent( this, this.agents.agent_2 );\n\t\t\tenemy.setPosition( x, y );\n\t\t\tenemy.follow( this.player );\n\n\t\t\tthis.enemies.add( enemy );\n\t\t}\n\n\t\t/**\n\t\t * Colliders\n\t\t */\n\n\t\tthis.physics.add.collider( this.player , this.layer );\n\t\tthis.physics.add.collider( this.enemies, this.layer );\n\t\t//this.physics.add.collider( this.bullets, this.layer );\n\t\tthis.physics.add.collider( this.player , this.enemies );\n\t\tthis.physics.add.collider( this.enemies, this.enemies );\n\n\t\t/**\n\t\t * Collision detection\n\t\t */\n\n\t\tthis.physics.add.overlap( this.bullets, this.enemies, this.hitEnemy, this.checkBulletVsEnemy, this );\n\n\t\t/**\n\t\t * Weapons\n\t\t */\n\n\t\tthis.weapons = \n\t\t{\n\t\t\tpistol : \n\t\t\t{\n\t            useInterval    : 1000, // ms\n\t            rounds         : 10,\n\t            bulletTexture  : 'bullets.default',\n\t            useSound       : 'gun_shot',\n\t            reloadSound    : 'gun_reload',\n\t            emptySound     : 'gun_empty',\n\t            bullets        : this.bullets,\n\t\t\t},\n\n\t\t\tuzi : \n\t\t\t{\n\t            useInterval    : 50, // ms\n\t            useSound       : 'gun_shot',\n\t            reloadSound    : 'gun_reload',\n\t            emptySound     : 'gun_empty',\n\t            rounds         : 40,\n\t            bulletTexture  : 'bullets.default',\n\t            useSound       : 'uzi_shot',\n\t            reloadSound    : 'gun_reload',\n\t            emptySound     : 'gun_empty',\n\t            bullets        : this.bullets,\n\t\t\t},\n\t\t};\n\n\t\tthis.player.addWeapon( 1, new GameObjects.Firearm( this, this.weapons.pistol ) );\n\t\tthis.player.addWeapon( 2, new GameObjects.Firearm( this, this.weapons.uzi ) );\n\t\tthis.player.setWeapon( 1 );\n\n\t\tthis.input.keyboard.on( 'keydown', function( event )\n\t\t{\n\t\t\tif ( this.cursors.reload.keyCode == event.keyCode ) \n\t\t\t{\n\t\t\t\tthis.player.weapon.reload();\n\t\t\t}\n\n\t\t\telse if ( this.cursors.weapon_1.keyCode == event.keyCode ) \n\t\t\t{\n\t\t\t\tthis.player.setWeapon( 1 );\n\t\t\t}\n\n\t\t\telse if ( this.cursors.weapon_2.keyCode == event.keyCode ) \n\t\t\t{\n\t\t\t\tthis.player.setWeapon( 2 );\n\t\t\t}\n\t\t\t\n\t\t}, this );\n\n\t\t/**\n\t\t * Camera\n\t\t */\n\n\t\tthis.cameras.main.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );\n    \tthis.cameras.main.startFollow( this.player );\n\n    \tvar help = this.add.text(16, 16, 'ZQSD keys to move.', \n    \t{\n\t        fontSize: '18px',\n\t        fill: '#ffffff'\n    \t});\n\t},\n\n\tcheckBulletVsEnemy : function( bullet, enemy )\n\t{\n\t    return ( bullet.active && enemy.active );\n\t},\n\n\thitEnemy : function( bullet, enemy )\n\t{\n\t\tvar recoil = 5;\n\n\t\t// Push back effect\n\t\tvar dir = Utils.getDirection( bullet.x, bullet.y, enemy.x, enemy.y );\n\t\t\n\t\tenemy.setPosition( enemy.x + recoil * dir.x, enemy.y + recoil * dir.y );\n\t\t//enemy.lookAt( bullet.x, bullet.y );\n\n\t\t// decrease health\n\t\tenemy.health -= bullet.damage;\n\n\t\t// TODO : decrease moving speed\n\n\t\tif ( enemy.health <= 0 ) \n\t\t{\n\t\t\tenemy.die();\n\t\t}\n\n\t    bullet.destroy();\n\t},\n\n\tupdate : function( time, delta )\n\t{\n\t\tthis.enemies.children.iterate( function( enemy )\n\t\t{\n\t\t\tenemy.update( time, delta )\n\t\t}, this );\n\n\t\t/**\n\t\t * Player\n\t\t */\n\n\t\t// Move\n\n\t\tvar dirX = 0, dirY = 0;\n\n\t    if ( this.cursors.left.isDown )\n\t    {\n\t    \tdirX = -1;\n\t    }\n\n\t    else if ( this.cursors.right.isDown )\n\t    {\n\t\t\tdirX = 1;\n\t    }\n\n\t    if ( this.cursors.up.isDown )\n\t    {\n\t        dirY = -1;\n\t    }\n\n\t    else if ( this.cursors.down.isDown )\n\t    {\n\t        dirY = 1;\n\t    }\n\n\t    this.player.move( dirX, dirY );\n\n\t\t// Look at mouse\n\n\t    this.player.lookAt( this.input.mousePointer.worldX, this.input.mousePointer.worldY );\n\n\t    // Shoot\n\n\t    if ( this.input.mousePointer.justDown )\n\t    {\n\t    \tthis.player.useWeapon( 'single' );\n\t    }\n\n\t    else if ( this.input.mousePointer.isDown ) \n\t    {\n\t    \tthis.player.useWeapon();\n\t    }\n\t},\n});\n\nmodule.exports = MyScene;\n\n\n//# sourceURL=webpack:///./src/scenes/MyScene.js?");

/***/ }),

/***/ "./src/scenes/index.js":
/*!*****************************!*\
  !*** ./src/scenes/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nmodule.exports = \n{\n\tMyScene : __webpack_require__( /*! ./MyScene */ \"./src/scenes/MyScene.js\" ),\n};\n\n\n//# sourceURL=webpack:///./src/scenes/index.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nfunction getDirection( x1, y1, x2, y2 )\n{\n\tvar distance = Phaser.Math.Distance.Between( x1, y1, x2, y2 );\n\n\treturn { \n\t\tx : ( x2 - x1 ) / distance,\n\t\ty : ( y2 - y1 ) / distance\n\t}\n}\n\nmodule.exports = \n{\n\tgetDirection : getDirection,\n};\n\n//# sourceURL=webpack:///./src/utils/index.js?");

/***/ })

/******/ });