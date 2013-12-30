var Dialog = new Class({
    initialize: function (el, option) {
        var thiz = this;
        this.option = Object.merge({
            width: null,
            height: null,
            left:'center',
            top:'center',
            titleCss: 'dialog-title',
            contentCss: 'dialog-content',
            titleHtml:'',
            contentHtml:'',
            position: 'left_bottom',
            draggable: false,
            model: true,
            closeable:false,
            show:false
        }, option);
        this.dialog = el;
        //如果不是自己确定的绝对定位，那么不允许拖拽
        if(this.option.position!='absolute') {
            this.option.draggable = false;
            this.option.show = false;
            this.dialog.setStyles({
                'position':'fixed',
                overflow : 'hidden'
            });
            //创建动画
            this.animate = new Fx.Morph(this.dialog, {
                duration: 1000
            });
        } else {//如果是绝对定位，则要处理位置
            if(this.option.left == 'center') {
                this.dialog.setStyle('left',(document.getWidth()-this.option.width)/2);
            } else {
                this.dialog.setStyle('left',this.option.left);
            }
            if(this.option.top == 'center') {
                this.dialog.setStyle('top',(document.getHeight()-this.option.height)/2);
            } else {
                this.dialog.setStyle('top',this.option.top);
            }
            this.dialog.setStyle('position','absolute');
        }
        //可拖拽
        if (this.option.draggable) {
            this.dialog.makeDraggable();
        }
        //模态对话框
        if (this.option.model) {
            this.dialog.setStyle('z-index',101);
            this.createShadowDiv();
        }
        //创建头
        this.title = new Element('div', {
            'class': this.option.titleCss,
            html:this.option.titleHtml
        });
        //如果可以关闭，则添加关闭按钮
        if(this.option.closeable) {
            this.title.grab(new Element('div',{
                html:'x',
                styles:{
                    float:'right',
                    height:20,
                    width:20,
                    'cursor':'pointer'
                },
                events:{
                    click:function(){
                        thiz.close();
                    }
                }
            }));
        }
        //创建内容框
        this.content = new Element('div', {
            'class': this.option.contentCss,
            html:this.option.contentHtml,
            styles:{
                height:this.option.height?this.option.height-37:0
            }
        });
        //如果指定了宽高则设置
        if (this.option.width) {
            this.dialog.setStyle('width', this.option.width);
        }
        if (this.option.height) {
            this.dialog.setStyle('height', this.option.height);
        }
        //将标题栏和内容框添加进来
        this.dialog.grab(this.title);
        this.dialog.grab(this.content);
        //如果指定了一开始就显示，则直接显示
        if(!this.option.show) {
            this.dialog.setStyle('visibility','hidden');
        }
        return this;
    },
    show:function(){
        if(this.option.position == 'left_bottom') {
            this.dialog.setStyles({
                bottom:0,
                left:10,
                visibility:'visible',
                opacity:0
            });
            this.animate.start({
                height:[0,this.option.height],
                opacity:[0.5,1]
            });
        } else if(this.option.position == 'right_bottom') {
            this.dialog.setStyles({
                bottom:0,
                right:10,
                visibility:'visible',
                opacity:0
            });
            this.animate.start({
                height:[0,this.option.height],
                opacity:[0.5,1]
            });
        } else {
            this.dialog.setStyle('visibility','visible');
        }

        return this;
    },
    close:function(){
        var thiz = this;
        if(this.option.position == 'left_bottom') {
            this.animate.start({
                height:[this.option.height,0],
                opacity:[1,0.5]
            }).chain(function(){
                thiz.dialog.setStyle('visibility','hidden');
            });
        } else if(this.option.position == 'right_bottom'){
            this.animate.start({
                height:[this.option.height,0],
                opacity:[1,0.5]
            }).chain(function(){
                    thiz.dialog.setStyle('visibility','hidden');
                });
        } else {
            this.dialog.setStyle('visibility','hidden');
        }
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
        this.shadow.setStyle('visibility','hidden');
        return this;
    }
});