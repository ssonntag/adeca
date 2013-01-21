adeca.engine ? adeca.engine = adeca.engine : adeca.engine = {};
adeca.engine.game = (function() {
    var runner1 = null;
    var runner2 = null;
    var tick = function(frame) {
        
        adeca.canvas.fillStyle="rgb(255,255,255)";
        adeca.canvas.fillRect(0,0,800,800);

        runner1.tick();
        runner1.draw(adeca.canvas);
        runner2.tick();
        runner2.draw(adeca.canvas);
    };
    var init = function() {
        adeca.canvas.fillStyle="rgb(255,255,255)";
        adeca.canvas.fillRect(0,0,800,800);

        runner1 = new adeca.Sprite({
            imageId: 'runner',
            animationFrameCount: 5,
            animationDelay: 200,
            initialX: 100,
            initialY: 100,
            finalX: 100,
            finalY: 600,
            travelTime:2000,
            travelLooping: false,
            onTravelLoopEnd: function(self) {console.log('Travel Loop Finished!',new Date(), self)}
        });
        
        runner2 = new adeca.Sprite({
            imageId: 'runner',
            animationFrameCount: 5,
            animationDelay: 70,
            initialX: 100,
            initialY: 600,
            finalX: 600,
            finalY: 600,
            travelTime: 1000,
            travelLooping: false,
            initialDelay: 2000
        });
    };
    return {
        tick: tick,
        init: init
    }
})();
