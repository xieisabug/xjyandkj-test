/**
 * 按键控制的插件
 * @param key 所按的键所对应的键值
 * @param fn 按键后所调用的函数
 * @param param 调用函数所传递的参数
 *
 * eg:
 * var aa = function(html,a){
 *     $("#content").html('<p>我按的是s</p>' + html + a);
 * };
 * $(document).keyControl(KEY.s,aa,["aaa","bbb"]);
 * -->我按的是s
 *    aaabbb
 */
(function($){
    KEY = {
        s : 83
    };
    $.fn.keyControl = function(key, fn, param){
        if(typeof fn == 'function'){
            this.keydown(function(e){
                if(e.keyCode == key){
                    fn.apply(this,param);
                }
            });
        } else {
            throw Error("您调用的不是一个正确的函数");
        }
    }
})(jQuery);