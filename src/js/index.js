window.onload = function() {
    (function() {
        function Fixed(args) {
            this.targetDom = $(args.targetDom);
            this.init();
        }
        Fixed.prototype.init = function() {
            this._initOffsetTop = this.targetDom.offset().top;
            this.bind();
            this.initItem();
            this.initSpec();
        }
        Fixed.prototype.bind = function() {
            var _this = this;
            $(window).on('scroll', this.scrollHandler());

            $('.js-spec-item').on('click', function() {
                $('.js-access-nav a').removeClass('cur');
                var offset = parseInt($(this).attr('data-offset'), 10) || 0;
                $('body,html').animate({
                    scrollTop: offset
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
                        offset = scrollTop - _this._initOffsetTop + 25;

                    if (offset > 0) {
                        _this.targetDom.animate({
                            "top": offset + "px"
                        }, 800);
                    } else {
                        _this.targetDom.animate({
                            "top": '25px'
                        }, 800);
                    }
                }, 300);
            };
        }
        Fixed.prototype.initItem = function() {
            var cityList = $('.js-nav-item');
            var cites = [];
            var offset;
            cityList.each(function(index, item) {
                offset = $('.m-girl .inner:eq(' + index + ')').offset().top;
                cites.push('<li class="item"><a href="javascript:;" title="" data-offset="' + offset + '">' + $(this).html() + '</a></li>');
            });
            $('.js-access-nav').html(cites.join(''));
        }
        Fixed.prototype.initSpec = function() {
            var dom = $('.js-spec-offset');
            var offset = dom.offset().top;
            $('.js-spec-item').attr('data-offset', offset);
        }
        window.Fixed = Fixed;
    })();
    new Fixed({
        targetDom: '.js-accesss'
    });

    (function() {
        function MoreContrl(args) {
            this.targetDom = $(args.targetDom);
            if(this.targetDom.length <=0 ){
                return;
            }
            this.contentDom = this.targetDom.find('.c')
            this.btnMoreDom = this.targetDom.find('.js-btn-more')
            this.classNameOfNone = 'g-none';
            this.leftArrowDom = $(args.leftArrowDom);
            this.defaultHeight = this.targetDom.css('height');
            this.offsetWords = 15;
            this.init();
            this.bind();
        }

        MoreContrl.prototype.init = function() {
            this.maxNum = parseInt(this.contentDom.attr('data-max-words-num'), 10);
            this.content = this.contentDom.attr('data-content') || "";
            this.showFlag = false;
            if (this.getNumOfContent() > this.maxNum) {
                this.btnMoreDom.removeClass(this.classNameOfNone);
                this.contentDom.html(this.content.substr(0, this.maxNum - this.offsetWords) + '...');
                this.updateBtn(false);
                this.updateLeftArrow(true);
            } else {
                this.contentDom.html(this.content);
            }
            this.targetDom.height(this.defaultHeight);

        }
        MoreContrl.prototype.bind = function() {
            var _this = this;
            this.btnMoreDom.on('click', function() {
                _this.btnMoreHandler();
            });
        }
        MoreContrl.prototype.btnMoreHandler = function() {
            if (!this.showFlag) {
                this.contentDom.html(this.content);
                this.targetDom.css('height', 'auto');
                this.showFlag = true;
                this.updateBtn(true);
                this.updateLeftArrow(false);
            } else {
                this.init();
            }

        }
        MoreContrl.prototype.getNumOfContent = function() {
            return this.content.length;
        }
        MoreContrl.prototype.updateBtn = function(toShow) {
            if (toShow) {
                this.btnMoreDom.find('.txt').html('收 起');
                this.btnMoreDom.find('.arrow').removeClass('arrow-down').addClass('arrow-up');
                this.btnMoreDom.addClass('show');

            } else {
                this.btnMoreDom.find('.txt').html('显示全部');
                this.btnMoreDom.find('.arrow').removeClass('arrow-up').addClass('arrow-down');
                this.btnMoreDom.removeClass('show');
            }

        }
        MoreContrl.prototype.updateLeftArrow = function(toShow) {
            if (!toShow) {
                this.leftArrowDom.css('visibility', 'hidden');
            } else {
                this.leftArrowDom.css('visibility', 'visible');
            }
        }


        for (var i = 0; i < 5; i++) {
            (function(i) {
                new MoreContrl({
                    targetDom: '.js-girl-desc-' + i,
                    leftArrowDom: '.js-left-arrow-' + i
                });
                new MoreContrl({
                    targetDom: '.js-hotel-desc-' + i,
                    leftArrowDom: '.js-left-arrow-' + i
                });
            })(i);
        }


    })();
}
