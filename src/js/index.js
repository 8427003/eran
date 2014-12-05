var $ = require('./lib/zepto.js'),
    Touch = require('./module/Touch.js'),
    Slide = require('./module/Slide.js'),
    WXShare = require('./module/WXShare.js');

var slide = new Slide({
    targetElement: $('.page-wrap'),
    pageClassName: 'page'
});

var TouchCallback = {
    upTouchHandler: function() {
        if (slide.hasNextPage()) {
            slide.nextPage();
        }
    },
    downTouchHandler: function() {

        if (slide.hasPrevPage()) {
            slide.prevPage();
        }
    },
    moveTouchHandler: function() {}
}
new Touch({
    bindDom: 'body',
    callbacks: {
        up: TouchCallback.upTouchHandler,
        down: TouchCallback.downTouchHandler,
        move: TouchCallback.moveTouchHandler
    }
});

(function() {
    $(window).on('resize', resizeHandler());

    function resizeHandler() {
        var timer,
            doc = $('html'),
            win = $(window),
            MAX_WIDHT = 540;

        return function() {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(function() {
                var width = win.width();
                width = width > MAX_WIDHT ? MAX_WIDHT: width; 
                var scale = width / 320; 
                var fontSize = 16 * scale;
                doc.css('fontSize',fontSize + "px");
            }, 50);
        }
    }
    setTimeout(resizeHandler(),0);

}());


(function(silde){
    $('.g-arrow').on('click',function(){
        if(slide.hasNextPage()){
            slide.nextPage();
        }
    });
}(slide));

(function(){
    var wxshare = new WXShare({
        title:'#前台最大牌，邀你住酒店#去哪儿网携手暖男佟大为，女神柳岩为你提供贴心服务，名额有限，先到先得',
        img_url:'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141203/wxshare.jpg',
        img_width:200,
        img_height:200,
        link:window.location.href,
    });
    wxshare.init();
}());
