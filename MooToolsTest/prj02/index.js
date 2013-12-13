var Tab = new Class({
    initialize: function (id,option) {
        var thiz = this;
        this.option = Object.merge({
            tabTitleCss : 'tabTitle',
            tabTitleSelectedCss : 'selected',
            tabChangeEvent : 'click',
            tabContentCss : 'tabContent',
            tabContentSelectedCss : 'selected'
        }, option);
        this.body = $(id);
        this.body.addClass('tab');
        $$('#'+id+'>ul').addClass('tabTitles');
        this.tabTitles = $$('#'+id+'>ul>li');
        this.tabContents = $$('#'+id+'>div');
        this.tabTitles.each(function(tab, index){
            tab.addClass(thiz.option.tabTitleCss);
            tab.addEvent(thiz.option.tabChangeEvent,function(){
                thiz.tabContents.removeClass(thiz.option.tabContentSelectedCss);
                thiz.tabContents[index].addClass(thiz.option.tabContentSelectedCss);
                thiz.tabTitles.removeClass(thiz.option.tabTitleSelectedCss);
                thiz.tabTitles[index].addClass(thiz.option.tabTitleSelectedCss);
            })
        });
        this.tabTitles[0].addClass(thiz.option.tabTitleSelectedCss);
        this.tabContents[0].addClass(thiz.option.tabContentSelectedCss);
        Array.each(this.tabContents, function(content){
            content.addClass(thiz.option.tabContentCss);
        });
        return this;
    },
    setTabTitleCss : function(className){
        this.option.tabTitleCss = className;
        return this;
    },
    setTabTitleSelectedCss : function(className){
        this.option.tabTitleSelectedCss = className;
        return this;
    },
    setTabContentCss : function(className) {
        this.option.tabContentCss = className;
        return this;
    },
    setTabContentSelectedCss : function(className) {
        this.option.tabContentSelectedCss = className;
    }

});