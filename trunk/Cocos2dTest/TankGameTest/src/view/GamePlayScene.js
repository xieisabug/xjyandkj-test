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

            this.tank = new Tank(s_tank,TG.SIDE.PLAYER ,10,5,10);
            this.tank.setPosition(100,100);
            this.tank.setTag(TG.TAG.PLAYER_TANK);
            this.addChild(this.tank);

            var e = new Enemy(s_tank,5,5,5);
            e.setPosition(200,200);
            this.addChild(e);
            TG.CONTAINER.ENEMIES.push(e);

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
                    if(sel.getTag()==TG.TAG.BULLET){//如果是子弹
                        for(var j=0;j<TG.CONTAINER.ENEMIES.length;j++){
                            var tank = TG.CONTAINER.ENEMIES[j];
                            sel.hit(tank);//对每一个敌人尝试打击
                        }
                        if(!cc.rectIntersectsRect(this.screenRect,sel.getBoundingBox())){
                            sel.destroy();//飞出边界就销毁
                        }
                    }
                }
            }
        }
    },
    onKeyDown:function(e){
        TG.KEYS[e] = true;
    },
    onKeyUp:function(e){
        TG.KEYS[e] = false;
        if(e == cc.KEY.a){
            this.tank.shoot();
        }
    }
});
GamePlayScene.create = function(){
    var sg = new GamePlayScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};