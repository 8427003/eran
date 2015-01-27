 if (window.attachEvent) {
     window.attachEvent("onload", main);
 } else if (window.addEventListener) {
     window.addEventListener("load", main, false);
 }

 function main() {
     $(function() {
         var FIXED_CLASS = 'Qt_acess_wrap_fixed';
         var ACCESS_WRAP_CLASS = 'js-access-wrap';
         var ACCESS_CLASS = 'js-access';
         var ACCESS_INNER_CLASS = 'js-access-inner';
         var ACCESS_MINI_BUTTON_CLASS = 'js-access-mini-button';
         var GOTOP_CLASS = 'js-access-gotop';
         var ITEM_CLASS = 'js-access-item';
         var ACCESS_CONTAINER = 'js-access-container';
         var ITEM_ACTIVE_CLASS = 'cur';

         var PAGE_WIDTH = 980;

         var DURING = 400;

         var Access = function() {
             // this.$accessWrap;
             // this.$access;
             this.isDisplay = false;
             this.bindEvent = false;
             this.animating = false;
             this.timer;

             this.init();
         };


         Access.prototype = {
             constructor: Access,
             init: function() {
                 var $accessWrap = $('.' + ACCESS_WRAP_CLASS);
                 var $access = $('.' + ACCESS_CLASS);
                 var $accessInner = $('.' + ACCESS_INNER_CLASS);
                 var $accessMiniButton = $('.' + ACCESS_MINI_BUTTON_CLASS);

                 if ($accessWrap.length > 0 && this.setupData()) {
                     this.$accessWrap = $accessWrap;
                     this.$access = $access;
                     this.$accessInner = $accessInner;
                     this.$accessMiniButton = $accessMiniButton;

                     $accessWrap.show();
                     $accessInner.css('right', -$access.width());

                     this.listen();

                     $(window).scroll();
                     this.resetPosition();
                 }
             },
             setupData: function() {
                 var $titles = $('.js-tab-module[data-show-title=false] .js-tab-column-title');
                 var count = 0;
                 var accessItems = []; // { id, name }

                 $titles.each(function() {
                     count++;

                     var $title = $(this);
                     var id = 'tab-column-' + count;
                     var name = $title.attr('data-name');

                     $title.attr('id', id);
                     accessItems.push({
                         id: id,
                         name: name
                     });
                 });

                 if (accessItems.length == 0) {
                     return false;
                 }

                 var html = this.getAccessItemsTemplate(accessItems);

                 // QTMPL.accessItems.render({ accessItems: accessItems });
                 $('.' + ACCESS_CONTAINER).prepend(html); // there is a `li` tag in the container, don't use html();

                 return true;
             },
             getAccessItemsTemplate: function(accessItems) {
                 var html = '',
                     i, length, item;

                 for (i = 0, length = accessItems.length; i < length; i++) {
                     item = accessItems[i];
                     html += '<li><a href="#' + item.id + '" class="item js-access-item">' + item.name + '</a></li>';
                 }

                 return html;
             },
             showMiniButton: function(afterAnimate) {
                 var $access = this.$access;
                 var $accessInner = this.$accessInner;
                 var $accessMiniButton = this.$accessMiniButton;
                 var accessWidth = $access.outerWidth();

                 $accessInner.stop(true, true).animate({
                     right: -accessWidth
                 }, DURING, function() {
                     $access.hide();
                     $accessMiniButton.show();
                     typeof afterAnimate == 'function' && afterAnimate();
                 });
             },
             showAccess: function(afterAnimate) {
                 var $access = this.$access;
                 var $accessInner = this.$accessInner;
                 var $accessMiniButton = this.$accessMiniButton;

                 $accessMiniButton.hide();
                 $access.show();
                 $accessInner.stop(true, true).animate({
                     right: 0
                 }, DURING, function() {
                     typeof afterAnimate == 'function' && afterAnimate();
                 });
             },
             resetPosition: function() {
                 var self = this;

                 var $accessInner = this.$accessInner;
                 var $access = this.$access;
                 var $accessMiniButton = this.$accessMiniButton;

                 var windowWidth = $(window).width();
                 var accessWidth = $access.outerWidth();
                 var right = (windowWidth - PAGE_WIDTH) / 2 - accessWidth;

                 var miniButtonMouseEnter = function() {
                     clearTimeout(self.timer);
                     self.timer = setTimeout(function() {
                         self.showAccess();
                     }, 200);
                 };

                 var accessMouseLeave = function() {
                     clearTimeout(self.timer);
                     self.timer = setTimeout(function() {
                         self.showMiniButton();
                     }, 200);
                 };

                 var bindMiniButtons = function() {
                     if (self.isBindEvent) {
                         return;
                     }

                     $accessMiniButton.on('mouseenter', miniButtonMouseEnter);
                     $access.on('mouseleave', accessMouseLeave);
                     self.isBindEvent = true;
                 };

                 var unbindMiniButtons = function() {
                     $accessMiniButton.off('mouseenter');
                     $access.off('mouseleave');
                     self.isBindEvent = false;
                 };

                 if (right > 0) {
                     unbindMiniButtons();

                     $access.css('right', right);
                     $accessMiniButton.hide();

                     if (!this.isDisplay) {
                         this.isDisplay = true;
                         self.showAccess();
                     }

                 } else {
                     if (self.isDisplay) {
                         $access.css('right', 0);
                         this.isDisplay = false;

                         self.showMiniButton(function() {
                             bindMiniButtons();
                         });

                     } else {
                         $accessMiniButton.show();
                         bindMiniButtons();
                     }
                 }
             },
             listen: function() {
                 var $accessWrap = this.$accessWrap;
                 var $access = this.$access;

                 var self = this;
                 $(window).resize(function() {
                     self.resetPosition();
                 });

                 $(window).scroll(function() {
                     var scrollTop = $(this).scrollTop();
                     var offsetTop = $accessWrap.offset().top;

                     if (!$accessWrap.hasClass(FIXED_CLASS)) {
                         if (scrollTop > offsetTop) {
                             $accessWrap.addClass(FIXED_CLASS);
                         }
                     } else {
                         if (scrollTop <= offsetTop) {
                             $accessWrap.removeClass(FIXED_CLASS);
                         }
                     }

                     var $accessItems = $access.find('.' + ITEM_CLASS);
                     var founded = false;

                     $accessItems.each(function() {
                         var $item = $(this);
                         var $target = $($item.attr('href'));

                         if ($target.length == 0) {
                             return true; // continue;
                         }

                         var targetOffsetTop = $target.offset().top;
                         var targetHeight = $target.height();

                         if (scrollTop >= targetOffsetTop - 1 && scrollTop < targetOffsetTop + targetHeight) {
                             var $parent = $item.parents('li');
                             founded = true;

                             if (!$parent.hasClass(ITEM_ACTIVE_CLASS)) {
                                 $access.find('.' + ITEM_ACTIVE_CLASS).removeClass(ITEM_ACTIVE_CLASS);
                                 $parent.addClass(ITEM_ACTIVE_CLASS);

                                 return true;
                             }
                         }
                     });

                     if (!founded) {
                         $access.find('.' + ITEM_ACTIVE_CLASS).removeClass(ITEM_ACTIVE_CLASS);
                     }
                 });

                 $access.on('click', 'a', function(e) {
                     var $this = $(this);

                     if ($this.hasClass(GOTOP_CLASS)) {
                         $('html, body').stop(true, true).animate({
                             scrollTop: 0
                         }, DURING);

                         e.preventDefault();

                     } else if ($this.hasClass(ITEM_CLASS)) {
                         var target = $this.attr('href');
                         var $target = $(target);

                         if ($target.length > 0) {
                             var targetOffsetTop = $target.offset().top;

                             $('html, body').stop(true, true).animate({
                                 scrollTop: targetOffsetTop
                             }, DURING);

                             e.preventDefault();
                             return false;
                         }
                     }
                 });
             }
         };
         new Access();
     });
     (function() {
         function Swichable(args) {
             this.tablist = $(args.tablist);
             this.panellist = $(args.panellist);
             this.tabNavItem = 'td.item'
             this.disNone = 'g-none';
             this.active = 'cur';
             this.panelItem = '.tab-item';
             this.current = 'cur';
             this.init();
         }
         Swichable.prototype.init = function() {

             this._bind();
         }
         Swichable.prototype._bind = function() {
             var that = this;
             this.tablist.delegate('.item a', 'click', function() {
                 var item = $(this).parents(that.tabNavItem);
                 var index = that.tablist.find(that.tabNavItem).index(item);
                 var curItem = item;
                 that.showCurPanel(index);
                 that.tablist.find(that.tabNavItem).removeClass(that.active);
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

     function loadTabImg($curPanelItem) {
         var imgs = $curPanelItem.find('img');
         var original;
         imgs.each(function(index, item) {
             original = $(this).attr('data-original');
             if (original) {
                 $(this).attr('src', original);
             }
         });
     }
    
    var tabNavs= $('.js-tab-nav'); 
    var tabLists = $('.js-tab-list'); 
    tabNavs.each(function(index,item){
        new Swichable({
            tablist: tabNavs[index],
            panellist:tabLists[index] 
        });
    }) 

 }
