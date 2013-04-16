(function($){
    $.fn.program = function(){
        var me = this;
        me.find('span')[0].onselectstart = function(){
            return false;
        };
        me.dblclick(function(){
            var html = "<div class='mask' style='background-color: #"+Math.floor(Math.random()*1000) +";'></div>";
            var width = window.innerWidth;
            $(html).appendTo($('body')).css({
                left: -width,
                top:0
            }).animate({
                left:0
            },800);
        }).click(function(){
            $(this).find('span').toggleClass('select','notSelect');
        }).hover(function(){
            $(this).find('span').toggleClass('hover','notHover')
        });
    }
})(jQuery);