var $ = require('../lib/zepto.js');


function WXShare (setting) {
    this.img_url = setting.img_url;
    this.img_width= setting.img_width || 120;
    this.img_height= setting.img_height|| 120;
    this.link = setting.link;
    this.title = setting.title;
    this.desc= setting.desc;
}

WXShare.prototype = {
    constructor: WXShare,
    init: function() {
        this.desc = this.desc || this.title;
        this._bind();
    },
    _bind: function() {
        var _this = this;
        $(document).on('WeixinJSBridgeReady', function onBridgeReady(){
           _this._sendMessage(); 
        });
    },
    //初始化分享内容的函数
    _sendMessage: function() {
        var _this = this;
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                "appid": "", //appid 设置为空
                "img_url": _this.img_url, //分享图片路径
                "img_width": _this.img_width, //图片宽度
                "img_height": _this.img_height, //图片高度 
                "link": _this.link, //源链接地址
                "desc": _this.desc, //分享内容介绍
                "title":_this.title 
            }, function(res) {
                /*** 回调函数，最好设置为空 ***/
            });
        });
    }
}
module.exports = WXShare;
