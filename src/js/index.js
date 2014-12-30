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
        $(window).on('scroll', this.scrollHandler());
        $('.js-re-top').on('click', function() {
            $('.js-access-nav a').removeClass('cur');
            $('body,html').animate({
                scrollTop: 0
            });
        });
        $('.js-access-nav').delegate('a', 'click', function() {
            $('.js-access-nav a').removeClass('cur');
            $(this).addClass('cur');
            var tabIndex = parseInt($(this).attr('data-tab-index'), 10);
            var curTab = $('.tablist li:eq(' + tabIndex + ')');
            if (!curTab.hasClass('active')) {
                curTab.find('a').trigger('click');
            }

            _this.scrollHandler();

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
                        "top": offset + "px"
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
        var cityList = $('.panellist .hot-city');
        var cites = [];
        cityList.each(function(index, item) {
            var li = $(this).parents('li');
            var tabIndex = li.parent().find('li.item').index(li);
            var text = $.trim($(this).html());
            $(this).before('<a style="font-size:0;line-height:0;" name="' + text + '"></a>');

            if (index > 4) {
                cites.push('<li class="item bg-red"><a href="#' + text + '" data-tab-index="' + tabIndex + '" >' + text + '</a></li>');
            } else {
                cites.push('<li class="item"><a href="#' + text + '" data-tab-index="' + tabIndex + '" >' + text + '</a></li>');
            }

        });
        $('.js-access-nav').html(cites.join(''));
    }
    window.Fixed = Fixed;
})();
var fixed = new Fixed({
    targetDom: '.js-accesss'
});

(function() {
    function Swichable(args) {
        this.tablist = $(".tablist");
        this.panellist = $(".panellist");
        this.disNone = 'g-none';
        this.active = 'active';
        this.current = 'current';
        this.afterSwich = (args || {}).afterSwich;
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

            if (that.afterSwich && typeof that.afterSwich === 'function') {
                that.afterSwich();
            }
        });
    }
    Swichable.prototype.showCurPanel = function(index) {
        var curPanelItem = this.panellist.find('li:eq(' + index + ')');
        this.panellist.find('li').addClass(this.disNone).removeClass(this.current);
        curPanelItem.removeClass(this.disNone).addClass(this.current);
    }
    window.Swichable = Swichable;
})();
new Swichable({
    afterSwich: function() {
        // fixed.initItem();
    }
});

//页面初始化，处理hash，是页面内容转到指定hash下
var cityName = $.trim(window.location.hash);
if (cityName) {
    cityName = cityName.substr(1, cityName.length);
    var cityNavList = $('.js-access-nav li a');
    cityNavList.each(function(index, item) {
        if ($(this).html() == cityName) {
            $(this).trigger('click');
        }
    });
}
