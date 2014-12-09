var $ = require('../lib/zepto.js');

/*
 * @params targetelement: slide panel, zepto object
 * @params slideheight:  default is body's height 
 * @params pageClassName: caculate count of page
 * @params animate: default {timingfunction:'ease-out',duration:400}
 */
function Slide(setting) {
    this.targetElement = setting.targetElement;
    this.pageOffset = setting.pageOffset;
    this.pageClassName = setting.pageClassName;
    this.isHoriz = setting.isHoriz;
    this.animate = setting.animate || {
        timingFunction: 'ease-out',
        duration: 400
    };
    this._init();
}

Slide.prototype = {
    constructor: Slide,

    _init: function() {
        this._curIndexOfPage = 0;//current page index
        this._pageCount = this._getPageCount();//get total page count
        this.pageOffset = this._getPageOffset();
        this._bind();
    },
    _bind:function(){
        var _this = this;
    },
    _getPageOffset:function(){
       if(this.isHoriz){
           this.targetElement.width();
       }else{
            return this.targetElement.height(); 
       }
    },
    _setPageOffset:function(offset) {
        alert(this.pageOffset+":"+offset);
        this.pageOffset = offset;
    },
    _getPageCount: function() {
        if (this.targetElement && this.targetElement.length > 0) {
            return this.targetElement.find('.' + this.pageClassName).length;
        } else {
            throw 'targetElement is not defined !';
        }
    },
    /*
     * A public method
     * @params callback, if exist,call!
     */
    nextPage: function(callback) {
        if (!this.hasNextPage()) {
            return;
        }
        var offsetY = this._getPageOffset()* (++this._curIndexOfPage);
        if (this.targetElement && this.targetElement.length > 0) {
            this.targetElement.animate({
                translate3d: '0,-' + offsetY + 'px,0'
            }, this.animate.duration, this.animate.timingFunction, function() {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            throw 'targetElement is not defined !';
        }
    },
     /*
     * A public method
     * @params callback, if exist,call!
     */
    prevPage: function(callback) {
        if (!this.hasPrevPage()) {
            return;
        }
        var offsetY = this._getPageOffset()* (--this._curIndexOfPage);
        if (this.targetElement && this.targetElement.length > 0) {
            this.targetElement.animate({
                translate3d: '0,-' + offsetY + 'px,0'
            }, this.animate.duration, this.animate.timingFunction, function() {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            throw 'targetElement is not defined !';
        }
    },
    hasPrevPage: function() {
        return this._curIndexOfPage > 0 ? true : false;
    },
    hasNextPage: function() {
        return this.getCurIndexOfPage() < this._getPageCount() - 1 ? true : false;
    },
    pageMoveTo: function(subY,callback) {
        var subY = subY || 0;
        var offsetY = this._getPageOffset()* this._curIndexOfPage + subY;
        if (this.targetElement && this.targetElement.length > 0) {
            this.targetElement.animate({
                translate3d: '0,-' + offsetY + 'px,0'
            }, this.animate.duration, this.animate.timingFunction, function() {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            });
        } else {
            throw 'targetElement is not defined !';
        }
    },
    getCurIndexOfPage: function() {
        return this._curIndexOfPage;
    }
}
module.exports = Slide;
