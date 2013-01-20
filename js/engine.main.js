"use strict";

window.requestAnimFrame = (function(){
  return window.requestAnimationFrame       || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function(callback, element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

adeca.engine ? adeca.engine = adeca.engine : adeca.engine = {};

adeca.engine.main = (function() {
    var currentModule = null;
    var currentFrame = 0;
    var tick = function() {
        currentFrame++;
        if (currentFrame > 59) {
            currentFrame = 0;
        }
        currentModule.tick(currentFrame);
        requestAnimFrame(adeca.engine.main.tick);
    };
    
    var stateSwitch = function(state) {
        if (state === 'game') {
            adeca.canvas = $('#screen')[0].getContext('2d');
            currentModule = adeca.engine.game;
            currentModule.init();
        } else {
            currentModule = adeca.engine.intro;
        }
        currentModule.init();
    };
    return {
        tick: tick,
        state: stateSwitch
    }
})();

