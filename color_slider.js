$(document).ready(function(){

    Array.prototype.pickRandom =function () {
        return this[Math.floor(Math.random() * this.length)];
    }

    jQuery.fn.colorBar = function(options){

        var settings = $.extend({
            /**
             * Array or string (string: 'random')
             */
            pallete: ['red', 'blue', 'green', 'yellow'],
            interval: 1000 /* ms */
        },options);

        
        return this.each(function() {
            var $this = $(this);
            $this.settings = settings;

            // creates DOM
            $this.html(
                "<div class='inner'>" +
                    "<div class='item inactive'>&nbsp;</div>" +
                    "<div class='item active'>&nbsp;</div>" +
                "</div>");
            $this.addClass('color-slider-main');

            var pickRandomColor = function(){
                if($this.settings.pallete == "random"){
                    var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
                    return $.Color('#' + arr.pickRandom() + arr.pickRandom() + arr.pickRandom());
                }
                else{
                    return $.Color($this.settings.pallete.pickRandom());
                }
            };
            var changeColor = function(){

                if(!$this.settings.currentColor){
                    $this.settings.currentColor = pickRandomColor()
                }

                $this.settings.newColor = pickRandomColor();
                while($this.settings.newColor == $this.settings.currentColor){
                    $this.settings.newColor = pickRandomColor();
                }

                var $ac = $this.find('.item.active'),
                    $in = $this.find('.item.inactive'),
                    currentColor = $this.settings.currentColor.toHexString(),
                    newColor = $this.settings.newColor.toHexString(),
                    duration = $this.settings.interval - 100;

                $this.settings.currentColor = $this.settings.newColor;

                $ac.css('background', currentColor);
                $in.css('background', newColor);

                $ac.animate({left: '100%'}, duration, 'linear', function(){
                    var $this = $(this);
                    $this.removeClass('active').addClass('inactive').css('left', '-100%');
                });

                $in.animate({left: '0'}, duration, 'linear', function(){
                   var $this = $(this);
                   $this.removeClass('inactive').addClass('active');
                });
            };

            // killing previous intervals
            if(this.colorBarTimeoutID){
                window.clearInterval(this.colorBarTimeoutID);
                delete(this.colorBarTimeoutID);
            }

            // Create the current interval
            this.colorBarTimeoutID = setInterval(changeColor, settings.interval);
        });
    };

});