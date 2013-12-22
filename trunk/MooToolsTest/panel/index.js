var Panel = new Class({
    initialize: function (el,option) {
        var thiz = this;
        this.option = Object.merge({
            panelTitleCss : 'panel-head',
            panelTitleIcon : 'default',
            panelContentCss : 'panel-content',
            contentHeight:'auto',
            contentWidth:'auto'
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
        this.panelContent.addClass(this.option.panelContentCss);
        this.panelContent.setStyles({
            width:this.option.contentWidth,
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
    }
});