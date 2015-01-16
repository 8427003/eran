(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function (require, module, exports) {
        /**
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
         $('.js-re-top').on('click', function() {
         $('body,html').animate({
         scrollTop: 0
         });
         });
         $('.js-access-nav').delegate('a', 'click', function() {
         $('.js-access-nav a').parent('li').removeClass('cur');
         $(this).parent('li').addClass('cur');
         var index =  parseInt($(this).parent('li').attr('data-index'),10);
         var offsetTop = parseInt($(this).parent('li').attr('data-offsettop'),10);
         $('html,body').animate({
         scrollTop:offsetTop
         });
         
         $(".js-tab-nav li a").eq(index).trigger('click');
         
         });
         }
         
         Fixed.prototype.initItem = function() {
         var cityList = $('.js-tab-nav li a');
         var cites = [];
         var offsetTop= $('.nav-title').offset().top;
         cityList.each(function(index, item) {
         var cur = "";
         (index === 0) ? cur = 'cur' : cur = '';
         
         cites.push('<li class="item '+cur+'" data-offsettop="'+offsetTop+'" data-index="'+index+'"><a href="javascript:;">'+$(this).html()+'</a></li>');
         
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
         
         swichAccess(index);
         }
         window.Swichable = Swichable;
         })();
         function loadTabImg($curPanelItem){
         var imgs = $curPanelItem.find('.img_box img');
         imgs.each(function(index,item){
         $(this).attr('src',$(this).attr('data-original'));
         });
         }
         function swichAccess(index){
         $('.js-access-nav li').removeClass('cur').eq(index).addClass('cur');
         }
         var swich = new Swichable({
         tablist: ".js-tab-nav",
         panellist: ".js-tab-list"
         });
         **/

        /**
         $("img").lazyload({
         effect : "fadeIn"
         });
         **/
        /**
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
         **/

    },
    {}]
}, {}, [1])
