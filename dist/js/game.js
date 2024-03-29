(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'polar-bear-panic');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){
 /* Full tutorial: http://codevinsky.ghost.io/phaser-2-0-tutorial-flappy-bear-part-1/ */
  'use strict';
  function Menu() {}

  Menu.prototype = {
    preload: function() {

    },
    create: function() {
      // add the background sprite
      this.background = this.game.add.sprite(0,0,'background');

      // add the ground sprite as a tile
      // and start scrolling in the negative x direction
      this.ground = this.game.add.tileSprite(0,400, 335,112,'ground');
      this.ground.autoScroll(-200,0);

      /** STEP 1 **/
      // create a group to put the title assets in
      // so they can be manipulated as a whole
      this.titleGroup = this.game.add.group()

      /** STEP 2 **/
      // create the title sprite
      // and add it to the group
      this.title = this.add.sprite(0,0,'title');
      this.titleGroup.add(this.title);

      /** STEP 3 **/
      // create the bear sprite
      // and add it to the title group
      this.bear = this.add.sprite(200,5,'bear');
      this.titleGroup.add(this.bear);

      /** STEP 4 **/
      // add an animation to the bear
      // and begin the animation
      this.bear.animations.add('flap');
      this.bear.animations.play('flap', 12, true);

      /** STEP 5 **/
      // Set the originating location of the group
      this.titleGroup.x = 30;
      this.titleGroup.y = 100;

      /** STEP 6 **/
      //  create an oscillating animation tween for the group
      this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5,0.5);
    },
    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');
    }
  };

  module.exports = Menu;

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
     },
    update: function() {

    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;

},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background', 'assets/background.jpg');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');


    // this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
    this.load.spritesheet('bear', 'assets/bear.png', 33, 46, 5);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])