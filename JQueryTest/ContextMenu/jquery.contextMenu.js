(function ($) {
    function create(jq, options) {
        var setting = $.extend($.fn.contextMenu.default, options || {});

        var html = '<div class="context_menu"></div>';

        $(html).appendTo(jq)
            .css({
                'width':setting.width,
                'background':setting.background,
                'font-size':setting.fontSize
            })
            .hide()
            .append(setting.item);

        jq[0].oncontextmenu = function (e) {
            e.returnValue = false;
            jq.find('.context_menu')
                .hide()
                .css({
                    top:e.clientY,
                    left:e.clientX
                })
                .stop()
                .fadeIn(200);
        };
        $(document).click(function () {
            jq.find('.context_menu')
                .stop()
                .fadeOut(200);
        });

        return jq;
    }

    $.fn.contextMenu = function (options, param) {
        if (typeof options == 'string') {
            return $.fn.contextMenu.methods[options](this, param);
        }
        return create(this, options);
    };

    $.fn.contextMenu.methods = {
    };

    $.fn.contextMenu.default = {
        fontSize:15,
        background:'#aaa',
        width:'100px',
        item:[]
    };

})(jQuery);