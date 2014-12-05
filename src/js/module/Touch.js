    var $ = require('../lib/zepto.js');

    var Touch = function(args) {
        this.bindDom = $(args.bindDom) || $('body');
        this.touchRange = args.touchRange || 50;
        this.callbacks = args.callbacks;
        this._changedTouches = {};
        this.init();
    }
    Touch.prototype = {
        init: function() {
            this._bind();
        },
        _bind: function() {
            var _this = this;
            if (this.bindDom.length === 0) {
                return;
            }
            this.bindDom.on({
                touchstart: function(e) {
                    _this._touchstartWrap(e);
                },
                touchend: function(e) {
                    _this._touchendWrap(e);
                },
                touchmove: function(e) {
                    _this._touchmoveWrap(e);
                }
            });
        },
        _touchstartWrap: function(e) {
            if (e.changedTouches) {
                this._changedTouches.sY = e.changedTouches[0].clientY;
            }
        },
        _touchendWrap: function(e) {
            if (e.changedTouches) {
                this._changedTouches.eY = e.changedTouches[0].clientY;
                this._afterTouchend();
            }
        },
        _touchmoveWrap: function(e) {
            e.preventDefault();
            if (e.changedTouches) {
                this._changedTouches.mY = e.changedTouches[0].clientY;
            }
            if (this.callbacks && this.callbacks.move && typeof this.callbacks.move === 'function') {
                setTimeout(this.callbacks.move, 0, this._changedTouches);
            }
        },
        _getSubY: function() {

            var ey = this._changedTouches.eY || 0,
                sy = this._changedTouches.sY || 0;
            return ey - sy;
        },
        _afterTouchend: function() {
            var subY = this._getSubY();
            if (subY < -this.touchRange) {
                if (this.callbacks && this.callbacks.up && typeof this.callbacks.up === 'function') {
                    setTimeout(this.callbacks.up, 0, this._changedTouches)
                }
            } else if (subY > this.touchRange) {
                if (this.callbacks && this.callbacks.down && typeof this.callbacks.down === 'function') {
                    setTimeout(this.callbacks.down, 0, this._changedTouches);
                }
            }
        }
    }
    module.exports = Touch;
