var TextArea = new Class({
    initialize: function (el,option) {
        var thiz = this;
        this.option = Object.merge({
            isReadOnly:false
        },option);
        this.textarea = el;
        if(this.option.isReadOnly) {
            this.textarea.setProperty('readonly',true);
        }
    },
    appendText:function(text){
        this.textarea.text += text;
    }
});