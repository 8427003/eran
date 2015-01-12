var $ = require('./lib/jquery.js');
(function() {
    function Fixed(args) {
        this.targetDom = $(args.targetDom);
        this.init();
    }
    Fixed.prototype.init = function() {
        this._initOffsetTop = this.targetDom.offset().top;
        this.bind();
        this.initItem();
    }
    Fixed.prototype.bind = function() {
        var _this = this;
       // $(window).on('scroll', this.scrollHandler());
        $('.js-re-top').on('click', function() {
            $('.js-access-nav a').removeClass('cur');
            $('body,html').animate({
                scrollTop: 0
            });
        });
        $('.js-access-nav').delegate('a', 'click', function() {
            $('.js-access-nav a').removeClass('cur');
            $(this).addClass('cur');
            var scrollTop = $(document).scrollTop();
            var offset = parseInt($(this).attr('data-offset'), 10);
            $('html,body').animate({
                scrollTop: offset
            });

        });
    }
    Fixed.prototype.scrollHandler = function() {
        var timer;
        var _this = this;
        return function() {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(function() {
                var scrollTop = $(document).scrollTop(),
                    offset = scrollTop - _this._initOffsetTop;
                if (offset > 0) {
                    _this.targetDom.animate({
                        "top": offset+150 + "px"
                    }, 500);
                } else {
                    _this.targetDom.animate({
                        "top": 0
                    }, 500);
                }
            }, 300);
        };
    }
    Fixed.prototype.initItem = function() {
        var cityList = $('.m-tab');
        var cites = [];
        var offset;
        cityList.each(function(index, item) {
            offset = $(this).offset().top - 150;
            cites.push('<li class="item"><a href="javascript:;" data-offset="' + offset + '">' + $(this).attr('data-name') +'</a>' );
            if(index != cityList.length - 1){
                cites.push('<span class="after-bg"></span>');
            }
            cites.push('</li>');
        });
        $('.js-access-nav').html(cites.join(''))
    }
    window.Fixed = Fixed;
})();
var fixed = new Fixed({
    targetDom: '.js-accesss'
});

(function() {
    function Swichable(args) {
        this.tablist = $(args.tablist);
        this.panellist = $(args.panellist);
        this.disNone = 'g-none';
        this.active = 'cur';
        this.panelItem = '.list-wrap';
        this.current = 'cur';
        this.init();
    }
    Swichable.prototype.init = function() {

        this._bind();
    }
    Swichable.prototype._bind = function() {
        var that = this;
        this.tablist.delegate('li a', 'click', function() {
            var item = $(this).parent();
            var index = that.tablist.find('li').index(item);
            var curItem = that.tablist.find('li:eq(' + index + ')');
            that.showCurPanel(index);
            that.tablist.find('li').removeClass(that.active);
            curItem.addClass(that.active);
        });
    }
    Swichable.prototype.showCurPanel = function(index) {
        var curPanelItem = this.panellist.find(this.panelItem + ':eq(' + index + ')');
        this.panellist.find(this.panelItem).addClass(this.disNone);
        curPanelItem.removeClass(this.disNone);

        loadTabImg(curPanelItem);
    }
    window.Swichable = Swichable;
})();
function loadTabImg($curPanelItem){
    var imgs = $curPanelItem.find('.pic-wrap .pic');
    imgs.each(function(index,item){
        $(this).attr('src',$(this).attr('data-original'));
    });
}
new Swichable({
    tablist: ".js-tab-nav-1",
    panellist: ".js-tab-list-1"
});

new Swichable({
    tablist: ".js-tab-nav-2",
    panellist: ".js-tab-list-2"
});

new Swichable({
    tablist: ".js-tab-nav-3",
    panellist: ".js-tab-list-3"
});

new Swichable({
    tablist: ".js-tab-nav-4",
    panellist: ".js-tab-list-4"
});
/**
 $("img").lazyload({
            effect : "fadeIn"
        });
       **/
var ie6 = navigator.userAgent.indexOf("MSIE 6.0") > 0;
if(ie6){
    function IE6Handler(){
        var scrollTop       = $(document).scrollTop();
        var clientHeight    = $(window).height();
        var offsetHeight    = $(".js-accesss").height();
        var offsetTop  = scrollTop + clientHeight - offsetHeight - 100 - 631;
        $('.js-accesss').css({'top':offsetTop + "px","position":"absolute","bottom":"auto"});     
    }
    IE6Handler();
    $(window).on('scroll',IE6Handler );
}
           
