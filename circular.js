
;( function(global) {
    function CirCleProgress(_target, _duration, _percent,_callback,_idx, _filldirection) {
        this.ctx = document.getElementById(_target).getContext('2d');;
        this.canvas = document.getElementById(_target);
        this.duration = _duration;
        this.percent = _percent;
        this.callback = _callback;
        this.idx = _idx;
        this.filldirection = _filldirection;
        this.endTime;
        this.diff;
        this.timer;
        this.canvas.width = 200;
        this.canvas.height = 200;
    };

    CirCleProgress.prototype = {
        drawCircle : function(){
            var self = this,
                ctx = self.ctx,
                imd,
                now = new Date().getTime(),
                remaining = Math.max((self.endTime - now) / self.duration, 0),
                value = self.percent - (remaining * self.percent),
                // remaining = Math.max((self.endTime) / self.duration, 0),
                // value = Math.round(self.percent / self.percent),
                cWidth =  self.ctx.canvas.width,
                cHeight = self.ctx.canvas.height,
                startAngle = 4.72;

            self.diff = ((value / 100) * Math.PI * 2 *10).toFixed(2);
            imd = ctx.getImageData(0, 0, cWidth, cHeight);
            ctx.putImageData(imd, 0, 0);
            ctx.beginPath();
            ctx.clearRect(0, 0, cWidth, cHeight);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#e98c02";
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.beginPath();
            //fill
            if(!self.filldirection){
              ctx.arc(cWidth / 2 , cHeight / 2, (cHeight / 2) - 2, self.diff/10+startAngle, startAngle, false);
            }else{
              ctx.arc(cWidth / 2 , cHeight / 2, (cHeight / 2) - 2, startAngle, self.diff/10+startAngle, false);
            }
            
            ctx.stroke();
            ctx.closePath();

            if (value === self.percent) {
                cancelAnimationFrame(self.timer);
                if(typeof self.callback  === 'function'){
                    self.callback();
                }
            }
          
            value++;
        },
        enterFrame : function(){
            var self = this;
            self.timer = requestAnimationFrame(function () {
                self.enterFrame();
            });
            self.drawCircle();
        },
        start :function(){
            var self = this;
            var now = new Date().getTime();
            self.endTime = now + self.duration;
            self.enterFrame();
        },
        stop : function(){
            var self = this;
            cancelAnimationFrame(self.timer);
            self.ctx.clearRect(0, 0,  self.ctx.canvas.width, self.ctx.canvas.height);
        }
    };
    global.CirCleProgress = CirCleProgress;
}(window));

var circle = new CirCleProgress('canvas', 10000, 100, function(){
  console.log('circle1 complete!');
}, 0, true);
circle.start();
var circle2 = new CirCleProgress('canvas2', 10000, 100, function(){
  console.log('circle2 complete!');
}, 0, false);
circle2.start();
