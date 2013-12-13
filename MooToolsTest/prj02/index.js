var Tab = new Class({
    initialize: function (id) {
        var thiz = this;
        this.body = $(id);
        this.body.addClass('tab');
        this.tabTitles = $$('#'+id+'>ul>li');
        this.tabContents = $$('#'+id+'>div');
        this.tabTitles.each(function(tab, index){
            tab.addClass('tabTitle');
            tab.addEvent('click',function(){
                thiz.tabContents.removeClass('selected');
                thiz.tabContents[index].addClass('selected');
            })
        });
        this.tabContents[0].addClass('selected');
        Array.each(this.tabContents, function(content){
            content.addClass('tabContent');
        });

    }
});