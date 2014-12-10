var $ = require('./lib/zepto.js'),
    FastClick = require('./lib/fastclick.js'),
    Touch = require('./module/Touch.js'),
    Slide = require('./module/Slide.js'),
    WXShare = require('./module/WXShare.js'),
    LoadSource = require('./module/LoadSources.js');
$(function() {
    FastClick.attach(document.body);
    var slide = new Slide({
        targetElement: $('.page-wrap'),
        pageClassName: 'page'
    });
    var WXInfo = {
        title: '来“去哪儿网”订酒店，佟大为帮您check in，快为他挑选前台制服吧！',
        img_url: 'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/checkin.jpg',
        img_width: 120,
        img_height: 120,
        desc: '',
        link: window.location.href
    }
    var wxshare = new WXShare(WXInfo);

    function getSources() {
        var imgs = $('img'),
            lis = $('.m-page-4 .bottom-label li'),
            img,
            li,
            /**
            sources = [
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/label.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/label-cur.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-0.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-1.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-2.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-3.png',
                'http://hanyx.sinaapp.com/test.mp3'

            ];
            **/
            sources = [
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/label.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/label-cur.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-0.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-1.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-2.png',
                'http://source.qunar.com/mobile_platform/mobile_douxing/qtuan/topic/yy/20141209/select-3.png'

            ];
        for (var i = 0; i < imgs.length; i++) {
            img = imgs.eq(i);
            sources.push(img.attr('data-src'));
        }

        for (var j = 0; j < lis.length; j++) {
            li = lis.eq(j);
            sources.push(li.attr('data-index-url'));
        }
        return sources;
    }

    function loadImages() {
        var imgs = $('img');
        for (var i = 0; i < imgs.length; i++) {
            img = imgs.eq(i);
            img.attr('src', img.attr('data-src'));
        }

        var audio = $('audio');
        audio.attr('src', audio.attr('data-src'));

    }
    var loadSource = new LoadSource({
        progress: function(e) {},
        endload: function(e) {
            loadImages();
            setTimeout(function() {
                if (slide.hasNextPage()) {
                    $('.page-wrap .page').eq(0).remove();
                    $('.m-page-2 .content').removeClass('g-none');
                    $('.page-wrap').animate({
                        translate3d: '0, 0, 0'
                    }, 0, function() {

                    });
                }
            }, 1000)
        },
        sources: getSources()
    });

    var TouchCallback = {
        upTouchHandler: function(e) {
            var curPage = $('.page-wrap .page').eq(0);
            if (curPage.attr('data-slide') == 'true' && curPage.attr('data-page') == 'm-page-2') {
                curPage.attr('data-page', '');
                slide.nextPage();
                return;
            }
            curPage = $('.page-wrap .page').eq(1);
            if (curPage.attr('data-slide') == 'true' && curPage.attr('data-page') == 'm-page-4' && $('.m-page-4 .state').hasClass('s-3')) {
                var offsetY = $(window).height();
                $('.page-wrap').animate({
                    translate3d: '0,-' + offsetY * 2 + 'px,0'
                }, function() {

                });
            }
        },
        downTouchHandler: function() {
            var curPage = $('.page-wrap .page').eq(2);
            if (curPage.attr('data-slide') == 'true' && curPage.attr('data-page') == 'm-page-5') {
                var offsetY = $(window).height();
                $('.page-wrap').animate({
                    translate3d: '0,-' + offsetY + 'px,0'
                }, function() {
                    $('.page-wrap .page').eq(1).attr('data-iscur', 'true');
                });
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

    $('.m-page-3 .finger-wrap .fg img')
        .on('touchstart', function() {
            $('.m-page-3 .finger-wrap .fg-bg').removeClass('zd').addClass('zding');
        })
        .on('touchend', function() {
            $('.m-page-3 .finger-wrap .fg-bg').removeClass('zding').addClass('zdout');
            setTimeout(function() {

                var curPage = $('.page-wrap .page').eq(0);
                curPage.remove();
                $('.page-wrap .page').eq(1).attr('data-iscur', 'true');
            }, 1500);
        })
        .on('touchmove', function(e) {
            e.preventDefault();
        });

    $('.m-page-4 .select .state').on('click', function() {
        if ($(this).hasClass('s-0')) {
            $(this).addClass('rotate90');
            var _this = this;
            $(_this).removeClass('s-0').addClass('s-1 rotate90');
            $('.m-page-4 .bottom-label').removeClass('g-none');
            setTimeout(function() {
                $(_this).removeClass('s-1 rotate90').addClass('s-2');
            }, 700);
        } else if ($(this).hasClass('s-2')) {
            $(this).removeClass('s-2').addClass('s-3');
            $('.m-page-4 .txt-top-wrap').removeClass('g-none myDownOut').addClass('myDownIn');
            $('.m-page-4 .bottom-label').removeClass('myUpIn').addClass('myUpOut');
            $('.m-page-4 .bottom-ok').removeClass('g-none myUpOut').addClass("myUpIn");

            WXInfo.desc = "我为佟大为设计了" + $('.m-page-4 .left-txt .txt-big span').html() + "酒店前台制服，佟大为穿啥，由你做主！";
        }

    });

    $('.m-page-4 .label-wrap').delegate('li', 'click', function() {
        var index = parseInt($(this).attr('data-index'), 10);
        var url = $(this).attr('data-index-url');
        var title1 = $(this).attr('data-title-1');
        var title2 = $(this).attr('data-title-2');
        $('.m-page-4 .label-wrap li').removeClass('cur');
        $(this).addClass('cur');
        changeLabel(url, title1, title2);
    });

    function changeLabel(url, title1, title2) {
        if ($('.m-page-4 .txt-big').hasClass('fadeInLeft')) {
            $('.m-page-4 .txt-big.fadeInLeft').removeClass('fadeInLeft').addClass('fadeOutLeft');
            $('.m-page-4 .txt-small.fadeInLeft').removeClass('fadeInLeft').addClass('fadeOutLeft');
            setTimeout(function() {
                $('.m-page-4 .txt-big span').html(title1);
                $('.m-page-4 .txt-big.fadeOutLeft').removeClass('fadeOutLeft').addClass('fadeInLeft');
                $('.m-page-4 .txt-small span').html(title2);
                $('.m-page-4 .txt-small.fadeOutLeft').removeClass('fadeOutLeft').addClass('fadeInLeft');
            }, 500);
        }

        // $('.m-page-4. .txt-big .fadeOutLeftBig').removeClass('fadeOutLeftBig').addClass('.fadeInLeftBig');
        $('.m-page-4 .txt-small span').html(title2);
        $('.m-page-4 .bottom .man img').addClass('myrotate');
        setTimeout(function() {
            $('.m-page-4 .bottom .man img').attr('src', url).removeClass('myrotate').addClass('myrotate-2');
        }, 250);
        setTimeout(function() {
            $('.m-page-4 .bottom .man img').removeClass('myrotate-2');
        }, 500);


    }

    $('.m-page-4 .btn-reselect').on('click', function() {
        $('.m-page-4 .state').removeClass('s-3').addClass('s-2');
        $('.m-page-4 .bottom-ok').removeClass('myUpIn').addClass('myUpOut');
        $('.m-page-4 .bottom-label').removeClass('myUpOut').addClass('myUpIn');
        $('.m-page-4 .txt-top-wrap').removeClass('myDownIn').addClass('myDownOut');
    });

    $('.m-page-4 .btn-shares .inner-wrap').on('click', function() {
        $('.m-page-4 .mask-share').removeClass('g-none');
        setTimeout(function() {

            $('.m-page-4 .mask-share').addClass('g-none');


        }, 5000);
    });

    $('.js-now-do').on('click', function() {
        window.location.href = "http://touch.qunar.com/h5/group/ext/sact/AFbEFj?ex_track=weixin_H5_CheckIn";
    });

    $('.js-attation').on('click', function() {
        window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA3Mjc2NTcwOA==&mid=201327021&idx=1&sn=ba685b83e0f82b3af8a6ad6e4f1f2e23&key=1507480b90e51e637cf19f36a927315cc9b4a9fc5ef456b268432ae8dfa65159e3d4eb5a6a79549c65dc552f984d47c2&ascene=1&uin=ODUyNzU5NTAx&devicetype=webwx&version=70000001&pass_ticket=uVJbne7LtmkaK2wGdBY7ogXJ897OM2iWBYVmwFacqbn8ksakZbOF%2FqITbf%2BbQtoD";
    });
});


(function() {
    $(window).on('resize', resizeHandler());
    var initHeight = $(window).height();
    var initOffset = undefined;

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
                width = width > MAX_WIDHT ? MAX_WIDHT : width;
                var scale = width / 320;
                var fontSize = 16 * scale;
                doc.css('fontSize', fontSize + "px");
            }, 50);
        }
    }
    setTimeout(resizeHandler(), 0);

    var autoPlay = 1;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('android') > 0) {
        autoPlay = 0;
    }
    $('.btn-audio').on('click', function() {
        var aud = $("#js-audio");
        var _this = this;
        $(this).addClass('rotate-3');
        setTimeout(function() {
            $(_this).removeClass('rotate-3');
        }, 1000);
        if (autoPlay == '1') {
            aud[0].pause();
            autoPlay = 0;
        } else if (autoPlay == '0') {
            aud[0].play()
            autoPlay = 1;
        }
    });

}());
