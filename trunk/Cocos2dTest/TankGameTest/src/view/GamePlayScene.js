var GamePlayScene = cc.Layer.extend({

    ctor:function(){

    },
    init:function(){
        var ret = false;
        if(this._super){
            var tank = new Tank(s_tank,10,10,10);
            tank.setPosition(tank.position.x,tank.position.y);
            tank.setTag(tank.tag);
            this.addChild(tank);

            this.setKeyboardEnabled(true);

            ret = true;
        }
        return ret;
    },
    onKeyDown:function(e){
        TG.KEYS[e] = true;
    },
    onKeyUp:function(e){
        TG.KEYS[e] = false;
    }
});
GamePlayScene.create = function(){
    var sg = new GamePlayScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};