/*
  spriteOptions: 
  { imageId:  
        the id attribute of spritesheet image element. REQUIRED.
    animationFrameCount: 
        the amount of animation frames are in the spritesheet image. default: 1 (=keeps "looping" only the first spriteframe)
    frameDelay: 
        the time between frames in animation, milliseconds. default: 70
    initialDelay:
        the time before this sprite appears, milliseconds. default: 0
    initialX: 
        the upper left x coordinates on canvas where to place the sprite. default: 0
    initialY: 
        the upper left y coordinate on canvas where to place the sprite. default: 0
    finalX: 
        the upper left x coordinate where to travel the sprite. default: same as initialX (=no movement)
    finalY: 
        the upper left y coordinate where to travel the sprite. default: same as initialY (=no movement)
    travelTime: 
        time it takes to move the sprite from initial to final coordinates in milliseconds. if not given, does not travel. 
    travelLooping: 
        boolean. if yes, the sprite will move back to initial coordinates when travelled. If false, sprite will disappear. 
        (you must set travelTime have a value to have travelLooping have any effect)
    onTravelLoopEnd: 
        function that's called when travelTime ends. first parameter is the sprite object itself.
        Will run at every go-back if travelLooping is true.
    Note: you can have sprite visible for a set amount of time if you play with travelTime even if you don't give final coordinates.
  }
 */

adeca.Sprite = function(spriteOptions) {
    this.calculateFramesToTravel = function(travelTime) {
        var milliSecondsPerFrame = 1000/60;
        return Math.floor(travelTime / milliSecondsPerFrame);
    };
    this.calculateFrameTravel = function(startx, starty, endx, endy, travelTime) {
        var milliSecondsPerFrame = 1000/60;
        var framesToTravel = travelTime / milliSecondsPerFrame;
        return {
            dX: (endx-startx) / framesToTravel,
            dY: (endy-starty) / framesToTravel            
        }
    };
    this.calculateFrameDelay = function(milliseconds) {
        var milliSecondsPerFrame = 1000/60;
        return milliseconds / milliSecondsPerFrame;
    };

    if (typeof spriteOptions === 'undefined') {}
    else {
        this.spritesheet = document.getElementById(spriteOptions.imageId);
        if (typeof spriteOptions.initialX === 'undefined') {
            this.initialX = 0;
        } else {
            this.initialX = spriteOptions.initialX;
        }
        if (typeof spriteOptions.initialY === 'undefined') {
            this.initialY = 0;
        } else {
            this.initialY = spriteOptions.initialY;
        }
        if (typeof spriteOptions.finalX === 'undefined') {
            this.finalX = this.initialX;
        } else {
            this.finalX = spriteOptions.finalX;
        }
        if (typeof spriteOptions.finalY === 'undefined') {
            this.finalY = this.initialY;
        } else {
            this.finalY = spriteOptions.finalY;
        }
        if (typeof spriteOptions.travelTime === 'undefined') {
            this.travels = false;
            this.travelLooping = false;
            this.frameTravelX = 0;
            this.frameTravelY = 0;
        } else {
            this.travels = true;
            var travelDelta = this.calculateFrameTravel(this.initialX, this.initialY, this.finalX, this.finalY, spriteOptions.travelTime);
            this.frameTravelX = travelDelta.dX;
            this.frameTravelY = travelDelta.dY;
            if (typeof spriteOptions.travelLooping === 'undefined') {
                this.travelLooping = false;
            } else {
                this.travelLooping = spriteOptions.travelLooping;
                this.framesToTravel = this.calculateFramesToTravel(spriteOptions.travelTime);
            }
        }
        if (typeof spriteOptions.animationDelay === 'undefined') {
            this.frameDelay = this.calculateFrameDelay(70);
        } else {
            this.frameDelay = this.calculateFrameDelay(spriteOptions.animationDelay);
        }
        
        if (typeof spriteOptions.animationFrameCount === 'undefined') {
            this.animationFrameCount = 1
        } else {
            this.animationFrameCount = spriteOptions.animationFrameCount;
        }
        if (typeof spriteOptions.onTravelLoopEnd ==='function') {
            this.finalizer = spriteOptions.onTravelLoopEnd
        } else {
            this.finalizer = false;
        }
        if (typeof spriteOptions.initialDelay ==='undefined') {
            this.initialDelayFrames = 0;
        } else {
            this.initialDelayFrames = spriteOptions.initialDelay / (1000/60);
        }

        this.framesRun = 0;
        this.started = false;
        this.visible = false;
    }
    this.tick = function() {
        if (this.started) {
            this.framesRun++;
            this.currentAnimationFrameIndex = Math.floor(this.framesRun / this.frameDelay) % this.animationFrameCount;
            if (this.travels) {
                this.xPos = this.xPos + this.frameTravelX;
                this.yPos = this.yPos + this.frameTravelY;             
                if (this.framesRun > this.framesToTravel) {
                    if (this.travelLooping) {
                        this.xPos = this.initialX;
                        this.yPos = this.initialY;
                        this.framesRun = 0;
                        if (this.finalizer) {
                            var self = this;
                            this.finalizer(self);
                        }
                    } else if (this.visible && this.finalizer) {
                        var self = this;
                        this.finalizer(self);
                        this.visible = false;
                    } else {
                        this.visible = false;
                    }
                }
            }
        } else if (this.initialDelayFrames > 0) {
            this.initialDelayFrames--;
        } else {
            this.started = true;
            this.visible = true;
            this.currentAnimationFrameIndex = 1;
            this.xPos = this.initialX;
            this.yPos = this.initialY;
            this.framesRun = 0;
        }
    };
    this.draw = function(context) {
        if (this.visible) {
            context.drawImage(this.spritesheet, 
                          this.currentAnimationFrameIndex*128, 0, // spriten koordinaatit spritesheetissä
                          128, 128, // spriten leveys
                          this.xPos, this.yPos, // spriten koordinaatit canvasilla
                          128, 128); // spriten koko canvasilla
        }
    };
    

}