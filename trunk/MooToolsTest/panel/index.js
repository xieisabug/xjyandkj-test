var Panel = new Class({
    initialize: function (el,option) {
        var thiz = this;
        this.option = Object.merge({
            panelTitleCss : 'panel-head',
            panelTitleIcon : 'default',
            panelContentCss : 'panel-content',
            titleWidth:200,
            contentHeight:200
        },option);
        this.panel = el;
        var childrens = el.getChildren();
        if(childrens.length != 2) {
            throw Error("Panel的格式不对，其中应该只包含两个子div。");
        }
        this.panelTitle = childrens[0];
        this.panelContent = childrens[1];
        this.panelTitleIcon = this.panelTitle.getElement('.panel-head-icon');
        if(this.option.panelTitleIcon == 'default') {
            this.panelTitleIcon.addClass('panel-head-icon-arrow');
        } else {
            this.panelTitleIcon.addClass('panel-head-icon-'+this.option.panelTitleIcon);
        }

        this.panelTitle.addClass(this.option.panelTitleCss);
        this.panelTitle.setStyle('width',this.option.titleWidth);
        this.panelContent.addClass(this.option.panelContentCss);
        this.panelContent.setStyles({
            width:this.option.titleWidth-26,
            height:this.option.contentHeight
        });
        return this;
    },
    addPanelTitleCss:function(className) {
        this.panelTitle.addClass(className);
        return this;
    },
    removePanelTitleCss : function(className) {
        this.panelTitle.removeClass(className);
        return this;
    },
    addPanelContentCss : function(className) {
        this.panelContent.addClass(className);
        return this;
    },
    removePanelContentCss : function(className) {
        this.panelContent.removeClass(className);
        return this;
    },
    updateWithAnimate:function(type,html){
        var thiz = this;
        var fx = new Fx.Morph(thiz.panelContent, {
            duration: 1000,
            transition:Fx.Transitions['Quad']['easeIn']
        });
        if(type == 'toggle') {
            var h = thiz.panelContent.getSize().y-27;
            fx.start({
                height:0
            }).chain(function(){
                thiz.panelContent.set('html',html);
                fx.start({
                    height:h
                });
            });
        } else if(type == 'append') {
            new Element('div').set('html',html).getChildren().each(function(item){
                thiz.panelContent.grab(item);
            });
            var h = thiz.panelContent.getScrollSize().y-27;
            fx.start({height:h});
        }
    }
});