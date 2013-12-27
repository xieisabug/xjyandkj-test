var Scroll = new Class({
    initialize: function (el, option) {
        var thiz = this;
        this.option = Object.merge({
            width: 500,
            height: 500,
            leftArrowCss : 'leftArrow',
            rightArrowCss : 'rightArrow'
        }, option);
        this.scrollBody = el;
        this.scrollBody.addClass('scroll-content');
        this.scrollBody.setStyles({
            width: this.option.width,
            height: this.option.height
        });
        this.rightBtn = new Element('a',{
            'class':'right rightArrow'
        });
        this.scrollBody.grab(this.rightBtn,'bottom');
        this.rightBtn.addEvent('click',function(){
            thiz.nextPage();
        });
        this.leftBtn = new Element('a',{
            'class':'left leftArrow'
        });
        this.leftBtn.addEvent('click',function(){
            thiz.prePage();
        });
        this.scrollBody.grab(this.leftBtn,'bottom');
        this.pages = this.scrollBody.getChildren('div');
        this.pageCount = this.pages.length;
        if (this.pageCount == 0) {
            throw Error('请添加内容，内容不可为空。');
        }
        this.currentPage = 1;
        this.pages.each(function (item) {
            item.addClass('scroll-item');
            item.setStyle('opacity',0);
        });
        this.pages[0].addClass('show');
        this.animate = null;
        return this;
    },
    scrollTo: function (to) {
        this.pages.removeClass('show');
        this.pages[to - 1].addClass('show');
        this.currentPage = to;
    },
    nextPage: function () {
        if (this.currentPage == this.pageCount) {
            return;
        }
        this.scrollTo(this.currentPage + 1);
    },
    prePage: function () {
        if (this.currentPage == 1) {
            return;
        }
        this.scrollTo(this.currentPage - 1);
    },
    withAnimate: function (type) {
        if (type == 'fadeSlide') {
            this.pages.removeClass('show');
            this.pages.addClass('visible');
            this.pages[this.currentPage - 1].setStyle('opacity', 1);

            this.scrollTo = function (to) {
                this.animate = new Fx.Morph(this.pages[to - 1], {
                    duration: 1000
                });
                this.animate.transition = Fx.Transitions.Cubic.easeOut;
                this.out = new Fx.Morph(this.pages[this.currentPage - 1], {
                    duration: 1000
                });
                this.out.transition = Fx.Transitions.Cubic.easeOut;
                if (to > this.currentPage) {
                    this.animate.start({
                        left: [this.option.width, 0],
                        opacity: [0, 1]
                    });
                    this.out.start({
                        opacity: [1, 0]
                    });
                } else {
                    this.animate.start({
                        opacity: [0, 1]
                    });
                    this.out.start({
                        opacity: [1, 0],
                        left: [0, this.option.width]
                    });
                }
                this.currentPage = to;
            }
        }
        return this;
    }
});