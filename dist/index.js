!function t(o,e,i){function n(r,a){if(!e[r]){if(!o[r]){var h="function"==typeof require&&require;if(!a&&h)return h(r,!0);if(s)return s(r,!0);throw new Error("Cannot find module '"+r+"'")}var c=e[r]={exports:{}};o[r][0].call(c.exports,function(t){var e=o[r][1][t];return n(e?e:t)},c,c.exports,t,o,e,i)}return e[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)n(i[r]);return n}({1:[function(){window.onload=function(){!function(){function t(t){this.targetDom=$(t.targetDom),this.init()}t.prototype.init=function(){this._initOffsetTop=this.targetDom.offset().top,this.bind(),this.initItem(),this.initSpec()},t.prototype.bind=function(){$(window).on("scroll",this.scrollHandler()),$(".js-spec-item").on("click",function(){$(".js-access-nav a").removeClass("cur");var t=parseInt($(this).attr("data-offset"),10)||0;$("body,html").animate({scrollTop:t})}),$(".js-access-nav").delegate("a","click",function(){$(".js-access-nav a").removeClass("cur"),$(this).addClass("cur");var t=($(document).scrollTop(),parseInt($(this).attr("data-offset"),10));$("html,body").animate({scrollTop:t})})},t.prototype.scrollHandler=function(){var t,o=this;return function(){t&&window.clearTimeout(t),t=window.setTimeout(function(){var t=$(document).scrollTop(),e=t-o._initOffsetTop+25;e>0?o.targetDom.animate({top:e+"px"},800):o.targetDom.animate({top:"25px"},800)},300)}},t.prototype.initItem=function(){var t,o=$(".js-nav-item"),e=[];o.each(function(o){t=$(".m-girl .inner:eq("+o+")").offset().top,e.push('<li class="item"><a href="javascript:;" title="" data-offset="'+t+'">'+$(this).html()+"</a></li>")}),$(".js-access-nav").html(e.join(""))},t.prototype.initSpec=function(){var t=$(".js-spec-offset"),o=t.offset().top;$(".js-spec-item").attr("data-offset",o)},window.Fixed=t}(),new Fixed({targetDom:".js-accesss"}),function(){function t(t){this.targetDom=$(t.targetDom),this.targetDom.length<=0||(this.contentDom=this.targetDom.find(".c"),this.btnMoreDom=this.targetDom.find(".js-btn-more"),this.classNameOfNone="g-none",this.leftArrowDom=$(t.leftArrowDom),this.defaultHeight=this.targetDom.css("height"),this.offsetWords=15,this.init(),this.bind())}t.prototype.init=function(){this.maxNum=parseInt(this.contentDom.attr("data-max-words-num"),10),this.content=this.contentDom.attr("data-content")||"",this.showFlag=!1,this.getNumOfContent()>this.maxNum?(this.btnMoreDom.removeClass(this.classNameOfNone),this.contentDom.html(this.content.substr(0,this.maxNum-this.offsetWords)+"..."),this.updateBtn(!1),this.updateLeftArrow(!0)):this.contentDom.html(this.content),this.targetDom.height(this.defaultHeight)},t.prototype.bind=function(){var t=this;this.btnMoreDom.on("click",function(){t.btnMoreHandler()})},t.prototype.btnMoreHandler=function(){this.showFlag?this.init():(this.contentDom.html(this.content),this.targetDom.css("height","auto"),this.showFlag=!0,this.updateBtn(!0),this.updateLeftArrow(!1))},t.prototype.getNumOfContent=function(){return this.content.length},t.prototype.updateBtn=function(t){t?(this.btnMoreDom.find(".txt").html("收 起"),this.btnMoreDom.find(".arrow").removeClass("arrow-down").addClass("arrow-up"),this.btnMoreDom.addClass("show")):(this.btnMoreDom.find(".txt").html("显示全部"),this.btnMoreDom.find(".arrow").removeClass("arrow-up").addClass("arrow-down"),this.btnMoreDom.removeClass("show"))},t.prototype.updateLeftArrow=function(t){t?this.leftArrowDom.css("visibility","visible"):this.leftArrowDom.css("visibility","hidden")};for(var o=0;5>o;o++)!function(o){new t({targetDom:".js-girl-desc-"+o,leftArrowDom:".js-left-arrow-"+o}),new t({targetDom:".js-hotel-desc-"+o,leftArrowDom:".js-left-arrow-"+o})}(o)}()}},{}]},{},[1]);