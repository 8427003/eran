//判断手机横竖屏状态： 
function checkDirect() {
    if (window.orientation == 180 || window.orientation == 0) {}
    if (window.orientation == 90 || window.orientation == -90) {
        alert('亲，敢把屏幕旋转为竖屏么？');
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", checkDirect, false);

// 防止屏幕拖动
document.documentElement.addEventListener('touchmove', function(e) {
    e.preventDefault();
});


(function(window, undefined) {
    var Util = {
        extend: function() {
            if (arguments.length > 1) {
                var master = arguments[0];
                for (var i = 1, l = arguments.length; i < l; i++) {
                    var object = arguments[i];
                    for (var key in object) {
                        master[key] = object[key];
                    }
                }
            }
        }
    }
    window['Util'] = Util;
})(window);

(function() {
    var Touch = function(args) {
        this.bindDom = $(args.bindDom);
        this.touchRange = args.touchRange;
        this.callbacks = args.callbacks;
        this._changedTouches = {};
        this._count = {
            LIMIT: args.LIMIT
        };
        this.init();
    }
    Touch.prototype = {
        init: function() {
            this._count.cur = {
                updown: 0,
                leftright: 0
            }
            this._bind();
        },
        _bind: function() {
            var _this = this;
            if (this.bindDom.length === 0) {
                return;
            }
            this.bindDom.on({
                touchstart: function(e) {
                    if (e.changedTouches) {
                        window.changedTouches_sY = e.changedTouches[0].clientY;
                    }
                },
                touchend: function(e) {
                    if (e.changedTouches) {
                        window.changedTouches_eY = e.changedTouches[0].clientY;
                        _this._afterTouchend();
                    }
                }
            });


        },
        _getSubY: function() {
            var ey = changedTouches_eY,
                sy = window.changedTouches_sY;
            return ey - sy;
        },
        _afterTouchend: function() {
            var subY = this._getSubY();
            if (subY < -this.touchRange) {
                //up
                if (this._count.cur.updown < this._count.LIMIT.UP_DOWN) {
                    this._count.cur.updown++;
                }


                if (this.callbacks && this.callbacks.up && typeof this.callbacks.up === 'function') {
                    this.callbacks.up(this._count)
                }
            } else if (subY > this.touchRange) {
                //down
                if (this._count.cur.updown > 0) {
                    this._count.cur.updown--;
                }

                if (this.callbacks && this.callbacks.down && typeof this.callbacks.down === 'function') {
                    this.callbacks.down(this._count)
                }

            }
        }
    }
    window.Touch = Touch;
})();

new Touch({
    bindDom: 'body',
    touchRange: 50,
    callbacks: {
        up: upTouchHandler,
        down: downTouchHandler
    },
    LIMIT: {
        UP_DOWN: 5,
    }
});

function upTouchHandler(Touch) {
    $('.view-stage').eq(Touch.cur.updown).removeClass('none');
    $('.view').animate({
        translate3d: '0,-' + Touch.cur.updown * $('body').height() + 'px,0'
    }, '500', 'ease-out', function() {
        $('.view-stage').eq(Touch.cur.updown - 1).addClass('none');
    });
}

function downTouchHandler(Touch) {
    $('.view-stage').eq(Touch.cur.updown).removeClass('none');

    $('.view').animate({
        translate3d: '0,-' + Touch.cur.updown * $('body').height() + 'px,0'
    }, '500', 'ease-out', function() {
        $('.view-stage').eq(Touch.cur.updown + 1).addClass('none');
    });
}
