var Dialog = new Class({
    initialize: function (el, option) {
        var thiz = this;
        this.option = Object.merge({
            width: null,
            height: null,
            titleCss: 'dialog-title',
            contentCss: 'dialog-content',
            position: 'left',
            draggable: false,
            model: true
        }, option);
        this.dialog = el;
        if (this.option.draggable) {
            this.dialog.makeDraggable();
        }
        if (this.option.model) {
            this.createShadowDiv();
            this.dialog.setStyle('z-index',101);
        }
        this.title = new Element('div', {
            'class': this.option.titleCss
        });
        this.content = new Element('div', {
            'class': this.option.contentCss
        });
        if (this.option.width) {
            this.dialog.setStyle('width', this.option.width);
        }
        if (this.option.height) {
            this.dialog.setStyle('height', this.option.height);
        }
        this.dialog.grab(this.title);
        this.dialog.grab(this.content);
        return this;
    },
    appendText: function (text) {
        this.textarea.value += text;
        return this;
    },
    addClass: function (className) {
        this.textarea.addClass(className);
        return this;
    },
    removeClass: function (className) {
        this.textarea.removeClass(className);
        return this;
    },
    createShadowDiv: function () {
        this.shadow = new Element('div');
        this.shadow.setStyles({
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute',
            'background-color': '#000',
            'z-index': 100,
            opacity: 0.5,
            filter: 'alpha(opacity=50)'
        });
        $$('body').adopt(this.shadow);
        return this;
    },
    closeShadow:function(){
        this.shadow.setStyle('visibility','none');
    }
});