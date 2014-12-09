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
                "desc":''
            }, function(res) {
                /*** 回调函数，最好设置为空 ***/
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
                "desc":_this.desc
            }, function(res) {
                //_report('send_msg', res.err_msg);
            })
        });
    }
}
module.exports = WXShare;
