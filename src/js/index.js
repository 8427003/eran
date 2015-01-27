 if (window.attachEvent) {
     window.attachEvent("onload", main);
 } else if (window.addEventListener) {
     window.addEventListener("load", main, false);
 }

 function main() {
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
