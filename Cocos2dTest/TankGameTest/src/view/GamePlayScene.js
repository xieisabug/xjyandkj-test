var GamePlayScene = cc.Layer.extend({
    tank:null,
    screenRect:null,
    ctor:function(){

    },
    init:function(){
        var ret = false;
        if(this._super){
            var winSize = cc.Director.getInstance().getWinSize();
            this.screenRect = new cc.rect(0,0,winSize.width,winSize.height);

            this.tank = new Tank(s_tank,10,5,10);
            this.tank.setPosition(100,100);
            this.tank.setTag(TG.TAG.PLAYER_TANK);
            this.addChild(this.tank);

            this.scheduleUpdate();//这个方法会在每一帧调用update方法
            this.setMouseEnabled(true);//设置鼠标可点击
            this.setKeyboardEnabled(true);//设置键盘可输入

            ret = true;
        }
        return ret;
    },
    update:function(dt){
        var sel,obj = this.getChildren();
        for(var i = 0; i<obj.length; i++){
            sel = obj[i];
            if(sel){
                if(typeof sel.update == 'function'){
                    sel.update();
                    if(sel.getTag()==995 && !cc.rectIntersectsRect(this.screenRect,sel.getBoundingBox())){
                        sel.destroy();
                    }
                }
            }
        }
    },
    onKeyDown:function(e){
        TG.KEYS[e] = true;
        if(e == cc.KEY.a){
            this.tank.shoot();
        }
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