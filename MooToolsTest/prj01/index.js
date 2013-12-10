var Select = new Class({
    initialize: function (id, name, option) {
        this.itemName = [];
        this.itemValue = [];
        this.body = $(id);
        this.option = Object.merge({
            width: 80,
            height: 30
        },option);
        this.body.addClass('btn');
        if (name) {
            this.body.setProperty(
                'name', name
            );
            this.body.set('text', name);
        }
        this.body.setStyles({
            width: this.option.width,
            height: this.option.height
        });
        return this;
    },
    selectItemInit:function(arrays){
        var thiz = this;
        var itemHtml = "<ul>";
        Array.each(arrays,function(item){
            thiz.itemName.push(item.name);
            thiz.itemValue.push(item.value);
            itemHtml += '<li>' + item.name +'</li>';
        });
        itemHtml += "</ul>";
        this.selectDiv = new Element('div',{
            styles : {
                height:arrays.length*20,
                'class':'selectItemDiv',
                width:100,
                top : this.body.getStyle('top'),
                left:this.body.getStyle('left'),
                display:'none'
            },
            html : itemHtml
        });
        $$('body').grab(this.selectDiv);
        this.body.addEvent('click',function(){
            if(thiz.selectDiv.getStyle('display') == 'none') {
                thiz.selectDiv.setStyle('display','block');
            } else {
                thiz.selectDiv.setStyle('display','none');
            }
        });
    }
});