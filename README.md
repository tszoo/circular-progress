# circular-progress
canvas circular progress


# usage

CirCleProgress(_target, _duration, _percent,_callback,_idx, _filldirection);

var circle = new CirCleProgress('canvas', 10000, 100, function(){
  console.log('circle1 complete!');
}, 0, true);

circle.start();
