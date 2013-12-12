var Select = new Class({
    initialize: function (id, items, option) {
        var thiz = this;
        this.itemNames = [];//下拉列表的名
        this.itemValues = [];//下拉列表的值
        this.body = $(id);
        this.option = Object.merge({
            width: 80,
            height: 30
        }, option);
        this.body.addClass('btn');//为对象增加一个按钮的样式
        this.body.setStyles({
            width: this.option.width,
            height: this.option.height
        });
        //进行下拉列表项的初始化
        if (items) {
            //进行html的组合
            var itemHtml = "<ul>";
            Array.each(items, function (item) {
                //将名值都存储到数组中
                thiz.itemNames.push(item.name);
                thiz.itemValues.push(item.value);
                itemHtml += '<li>' + item.name + '</li>';
            });
            itemHtml += "</ul>";

            //设置第一个item为默认选择的item
            this.body.set('text', items[0].name);
            this.body.set('value', items[0].value);

            //生成html
            this.selectDiv = new Element('div', {
                styles: {
                    height: items.length * 30 + 40,
                    width: 200,
                    top: this.body.getStyle('top'),
                    left: this.body.getStyle('left'),
                    display: 'none'//初始不显示
                },
                'class': 'selectItemDiv',
                html: itemHtml
            });
            $$('body').grab(this.selectDiv);//将选择的面板添加到网页中
            //对按钮绑定点击事件，使面板可以显示和隐藏
            this.body.addEvent('click', function () {
                if (thiz.selectDiv.getStyle('display') == 'none') {
                    thiz.selectDiv.setStyle('display', 'block');
                } else {
                    thiz.selectDiv.setStyle('display', 'none');
                }
            });
            //绑定鼠标事件，当鼠标移开选择面板的时候会隐藏
            this.selectDiv.addEvent('mouseleave', function () {
                this.setStyle('display', 'none');
            });
            //对选择的每个li绑定点击事件
            Array.each(this.selectDiv.getElements('li'), function (item, index) {
                item.addEvent('click', function () {
                    thiz.body.set('text', thiz.itemNames[index]);
                    thiz.body.set('value', thiz.itemValues[index]);
                });
            });
        } else {
            new Error("下拉列表的名称和值不能为空,必须指定Select的第二个参数")
        }

        return this;
    },
    //增加选择项
    selectItemAdd: function (arrays) {
        var thiz = this;
        //重新生成html
        var itemHtml = "<ul>";
        if (thiz.itemNames.length > 0) {//如果之前就有选择项，那么先生成之前的html
            Array.each(thiz.itemNames, function (item) {
                itemHtml += '<li>' + item + '</li>';
            });
        }
        Array.each(arrays, function (item) {
            thiz.itemNames.push(item.name);
            thiz.itemValues.push(item.value);
            itemHtml += '<li>' + item.name + '</li>';
        });
        itemHtml += "</ul>";
        //设置html
        this.selectDiv.set('html', itemHtml);
        //适配高度
        this.selectDiv.setStyle('height', thiz.itemNames.length * 30 + 40);
        //重新绑定事件
        Array.each(this.selectDiv.getElements('li'), function (item, index) {
            item.addEvent('click', function () {
                thiz.body.set('text', thiz.itemNames[index]);
                thiz.body.set('value', thiz.itemValues[index]);
            });
        });
        return this;
    },
    //增加按钮的样式
    addButtonClass:function(className){
        this.body.addClass(className);
        return this;
    },
    //增加选择面板的样式
    addSelectPanelClass:function(className){
        this.selectDiv.addClass(className);
        return this;
    },
    //移除按钮的样式
    removeButtonClass:function(className){
        this.body.removeClass(className);
        return this;
    },
    //移除选择面板的样式
    removeSelectPanelClass:function(className){
        this.selectDiv.removeClass(className);
        return this;
    }
});