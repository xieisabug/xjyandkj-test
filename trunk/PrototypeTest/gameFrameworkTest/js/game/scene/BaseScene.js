/**
 * 情景类的基类
 *
 * @type {*}
 */
game.scene.BaseScene = Class.create({
    initialize:function (height, width, x, y, background) {
        _s = new Element('div');
        _sSty = _s.style;

        _sSty.position = 'absolute';
        _sSty.background = background || "";
        sceneWidth = width;
        sceneHeight =  height;
        this.setSize(width,height);
        this.setPosition(x,y);
    },
    setSize:function(width,height){
        if(Object.isNumber(width))
            _sSty.width = width + 'px';
        else
            _sSty.width = '100px';
        if(Object.isNumber(height))
            _sSty.height = height + 'px';
        else
            _sSty.height = '100px';
    },
    setPosition:function(x,y){
        if (Object.isString(x)) {
            if (x == 'auto' || x == 'center')
                _sSty.left = (window.innerWidth - sceneWidth) / 2 + 'px';
            else if(x == 'left')
                _sSty.left = '0px';
            else if(x == 'right')
                _sSty.left = (window.innerWidth - sceneWidth) + 'px';
            else
                _sSty.left = (window.innerWidth - sceneWidth) / 2 + 'px';
        } else if(Object.isNumber(x)){
            _sSty.left = x + 'px';
        }

        if (Object.isString(y)) {
            if (y == 'auto' || y == 'center')
                _sSty.top = (window.innerHeight - sceneHeight) / 2 + 'px';
            else if(y == 'top')
                _sSty.top = '0px';
            else if(y == 'bottom')
                _sSty.top = (window.innerHeight - sceneHeight) + 'px';
            else
                _sSty.top = (window.innerHeight - sceneHeight) / 2 + 'px';
        } else if(Object.isNumber(y)){
            _sSty.top = y + 'px';
        }
    },
    setBackgroud:function (config) {
        _sSty.background = config;
    },
    appendTo:function (el) {
        Element.insert(el, _s);
    },
    insert:function (el) {
        Element.insert(_s, el);
    }
});
