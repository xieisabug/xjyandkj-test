var GamePlayScene = cc.Layer.extend({
    tank:null,
    ctor:function(){

    },
    init:function(){
        var ret = false;
        if(this._super){
            this.tank = new Tank(s_tank,10,5,10);
            this.tank.setPosition(this.tank.position.x,this.tank.position.y);
            this.tank.setTag(this.tank.tag);
            this.addChild(this.tank);

            this.scheduleUpdate();//这个方法会在每一帧调用update方法
            this.setMouseEnabled(true);//设置鼠标可点击
            this.setKeyboardEnabled(true);//设置键盘可输入

            ret = true;
        }
        return ret;
    },
    update:function(dt){
        this.tank.update(dt);
        for(var i = 0; i < TG.CONTAINER.PLAYER_BULLETS.length; i++){
            TG.CONTAINER.PLAYER_BULLETS[i].update();
        }
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