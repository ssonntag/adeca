Building
========

* Create a link 'Decathlon' that points to the images directory. 
* Doing sprites as GIFs with canvas didn't look so fun, actually. Let's do them in png spritesheets instead. Helpful tip:
* Install imagemagick: brew install imagemagick, then do like this:

montage animatedSprite.gif -tile x1 -geometry '1x1+0+0<' -alpha On \ 
  -background "rgba(0, 0, 0, 0.0)" -quality 100 spriteSheet.png


* the tip was from here: http://nick.onetwenty.org/index.php/2011/01/21/animated-gif-to-sprite-sheet-using-imagemagick/

