var Button = new Class({
    initialize: function (el,option) {
        if(instanceOf(el ,Array)) {
            throw Error("初始化按钮错误，不能传入一个数组对象，如果要创建按钮组，请创建ButtonGroup。");
            return;
        }
        this.body = el;
        //console.log(this.body);
        this.option = Object.merge({
            width:74,
            height:34,
            onclick:function(){
            }
        },option);
        if(this.body.tagName == 'BUTTON') {
            this.body.addEvent('click',this.option.onclick);
        } else if(this.body.tagName == 'A') {
            this.option.height = 'auto';
            this.body.addClass('abtn');
        } else {
            throw Error("您传入的对象类型不对，请用button标签和a标签来构建按钮。");
            return;
        }
        this.body.addClass('btn');
        this.body.setStyles({
            width:this.option.width,
            height:this.option.height
        });
        return this;
    },
    addClass:function(className) {
        this.body.addClass(className);
        return this;
    },
    removeClass:function(className){
        this.body.removeClass(className);
        return this;
    }
});