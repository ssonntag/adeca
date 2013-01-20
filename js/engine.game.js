adeca.engine ? adeca.engine = adeca.engine : adeca.engine = {};
adeca.engine.game = (function() {
    var gameFrame = null;
    var runner1 = null;
    var tick = function(frame) {
        gameFrame++;
        
        adeca.canvas.fillStyle="rgb(255,255,255)";
        adeca.canvas.fillRect(0,0,800,800);

        runner1.tick();
        runner1.draw(adeca.canvas);
    };
    var init = function() {
        gameFrame = 0;
        adeca.canvas.fillStyle="rgb(255,255,255)";
        adeca.canvas.fillRect(0,0,800,800);

        runner1 = new adeca.Sprite({
            imageId: 'runner',
            animationFrameCount: 5,
            animationDelay: 200,
            initialX: 100,
            initialY: 100,
            finalX: 300,
            finalY: 300,
            travelTime:2000,
            travelLooping: true,
            onTravelLoopEnd: function(self) {console.log('Travel Loop Finished!',new Date(), self)}
        });
    };
    return {
        tick: tick,
        init: init
    }
})();
