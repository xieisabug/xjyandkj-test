(function($){
    $.fn.program = function(){
        var me = this;
        me.dblclick(function(){
            var html = "<div class='mask' style='background-color: #"+Math.floor(Math.random()*1000) +" left:-10000px;'></div>";

        });
    }
})(jQuery);