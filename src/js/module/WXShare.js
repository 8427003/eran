var $ = require('../lib/zepto.js');


function WXShare(setting) {
    this.setting = setting;
    this.init();
}

WXShare.prototype = {
    constructor: WXShare,
    init: function() {
        this._bind();
    },
    _bind: function() {
        var _this = this;
        $(document).on('WeixinJSBridgeReady', function onBridgeReady() {
            _this._sendMessage();
        });
    },
    //初始化分享内容的函数
    _sendMessage: function() {
        var _this = this.setting;
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid": "", //appid 设置为空
                "img_url": _this.img_url, //分享图片路径
                "img_width": _this.img_width, //图片宽度
                "img_height": _this.img_height, //图片高度 
                "link": _this.link, //源链接地址
                "title": _this.title,
                "desc": ''
            }, function(res) {
                /*** 回调函数，最好设置为空 ***/
                var curPage = $('.page-wrap .page').eq(1);
               var isStateOk = $('.m-page-4 .select .state').hasClass('s-3'); 
                if (curPage.attr('data-iscur') == 'true' && curPage.attr('data-slide') == 'true' && curPage.attr('data-page') == 'm-page-4' && isStateOk) {
                    var offsetY = $(window).height();
                    $('.page-wrap').animate({
                        translate3d: '0,-' + offsetY * 2 + 'px,0'
                    }, function() {
                        $('.page-wrap .page').eq(1).attr('data-iscur','');
                    });
                }
            });
        });
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": "", //appid 设置为空
                "img_url": _this.img_url, //分享图片路径
                "img_width": _this.img_width, //图片宽度
                "img_height": _this.img_height, //图片高度 
                "link": _this.link, //源链接地址
                "title": _this.title,
                "desc": _this.desc
            }, function(res) {
                var curPage = $('.page-wrap .page').eq(1);
               var isStateOk = $('.m-page-4 .select .state').hasClass('s-3'); 
                if (curPage.attr('data-iscur') == 'true' && curPage.attr('data-slide') == 'true' && curPage.attr('data-page') == 'm-page-4' && isStateOk) {
                    var offsetY = $(window).height();
                    $('.page-wrap').animate({
                        translate3d: '0,-' + offsetY * 2 + 'px,0'
                    }, function() {
                         $('.page-wrap .page').eq(1).attr('data-iscur','');
                    });
                }
            })
        });
    }
}
module.exports = WXShare;
