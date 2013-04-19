var TankController = cc.Class.extend({
    winSize:null,
    ctor:function(){
        winSize = cc.Director.getInstance().getWinSize();
    },
    controlIt:function(tank){
        var pos = tank.getPosition();
        if(TG.KEYS[cc.KEY.up] && tank.position.y <= winSize.height){
            pos.y += tank.speed;
        }
        if(TG.KEYS[cc.KEY.down] && tank.position.y >= 0){
            pos.y -= tank.speed;
        }
        if(TG.KEYS[cc.KEY.left] && tank.position.x >= 0){
            pos.x -= tank.speed;
        }
        if(TG.KEYS[cc.KEY.right] && tank.position.x <= winSize.width){
            pos.x += tank.speed;
        }
        tank.setPosition(pos);
    }
});