(function ($) {
    function create(jq, options) {
        //判断当前是否打开了这个窗口
        if($('#'+jq.text().trim()).length!=0) return jq;
        //设置
        var setting = $.extend($.fn.window.default, options || {});
        //主要html拼凑
        var html = '<div class="window"></div>';
        //添加关闭按钮，设置大小，设置可拖动，添加内容，绑定关闭事件
        $(html).append('<div class="window-title" id="' + jq.text().trim() + '">' + setting.title.trim() + '<div class="window-close">X</div></div>').appendTo($('body'))
            .css({
                width:setting.width,
                height:setting.height
            })
            .draggable({
                handle:'.window-title'
            })
            .append(setting.href ? '<iframe src="' + setting.href + '" style="width:100%; height:' + (setting.height - 40) + 'px; border: 0px;"></iframe>' : setting.content ? setting.content : '')
            .find('div.window-close').click(function(){
                destroy(jq);
            });
        //返回jq对象，支持链式操作
        return jq;
    }

    function hide(jq,type){
        $('#'+jq.text().trim()).parent('div.window').hide();
        return jq;
    }

    function destroy(jq){
        $('#'+jq.text().trim()).parent('div.window').remove();
        return jq;
    }

    $.fn.window = function (options, param) {
        if (typeof options == 'string')
            return $.contextMenu.methods[options](this, param);

        create(this, options);

        return this;
    };

    $.fn.window.methods = {
        create:function (jq, options) {
            return create(jq, options);
        },
        hide:function(jq,type){
            return hide(jq,type);
        },
        destroy:function(jq){
            return destroy(jq);
        }
    };

    $.fn.window.default = {
        width:400,
        height:400,
        title:'无标题',
        showMask:false,
        href:'',
        content:''
    }

})(jQuery);