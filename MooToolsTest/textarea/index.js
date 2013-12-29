var TextArea = new Class({
    initialize: function (el,option) {
        var thiz = this;
        this.option = Object.merge({
            width:null,
            height:null,
            isReadOnly:false
        },option);
        this.textarea = el;
        if(this.option.width) {
            this.textarea.setStyle('width',this.option.width);
        }
        if(this.option.height) {
            this.textarea.setStyle('height',this.option.height);
        }
        if(this.option.isReadOnly) {
            this.textarea.setProperty('readonly',true);
        }
        this.textarea.addClass('textarea');

        return this;
    },
    appendText:function(text){
        this.textarea.value += text;
        return this;
    },
    addClass:function(className){
        this.textarea.addClass(className);
        return this;
    },
    removeClass:function(className) {
        this.textarea.removeClass(className);
        return this;
    }
});