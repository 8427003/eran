var $ = require('./lib/jquery.lazyload.js');
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
                        "top": offset + "px"
                    }, 1000);
                } else {
                    _this.targetDom.animate({
                        "top": 0
                    }, 1000);
                }
            }, 500);
        };
    }
    Fixed.prototype.initItem = function() {
        var cityList = $('.city-name');
        var cites = [];
        cityList.each(function(index, item) {
            cites.push('<li class="item"><a href="javascript:;" title="" data-offset="' + ($(this).offset().top - 30) + '">' + $(this).html() + '</a></li>');
        });
        $('.js-access-nav').html(cites.join(''));
    }
    window.Fixed = Fixed;
})();

new Fixed({
    targetDom: '.js-access'
});

// 图片延迟加载
$("img").lazyload({
    effect: "fadeIn"
});
$('.txt-yue').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    $(this).removeClass('animated-3 fadeIn').addClass("animated rubberBand");
});
