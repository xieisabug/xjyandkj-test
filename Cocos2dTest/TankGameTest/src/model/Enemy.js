var Enemy = Tank.extend({
    movePosition:null,
    ctor:function(file,life, speed, attack){
        this._super(file,TG.SIDE.ENEMIES,life,speed,attack);
    },
    update:function(){
        var frameArray = [];
        frameArray.push(this.randomDirection());
        cc.Animation.create(frameArray,2000);
    },
    randomDirection:function(){
        var dir = MathUtil.random(1,9);
        this.direction = dir;
        var rotate = null;
        switch (dir) {
            case TG.DIRECTION.UP:
                rotate = cc.RotateTo.create(0.0, 0.0);
                break;
            case TG.DIRECTION.LEFT:
                rotate = cc.RotateTo.create(0.0, 270.0);
                break;
            case TG.DIRECTION.RIGHT:
                rotate = cc.RotateTo.create(0.0, 90.0);
                break;
            case TG.DIRECTION.DOWN:
                rotate = cc.RotateTo.create(0.0, 180.0);
                break;
            case TG.DIRECTION.LEFT_UP:
                rotate = cc.RotateTo.create(0.0, 315.0);
                break;
            case TG.DIRECTION.RIGHT_UP:
                rotate = cc.RotateTo.create(0.0, 45.0);
                break;
            case TG.DIRECTION.LEFT_DOWN:
                rotate = cc.RotateTo.create(0.0, 225.0);
                break;
            case TG.DIRECTION.RIGHT_DOWN:
                rotate = cc.RotateTo.create(0.0, 135.0);
                break;
        }
        return rotate;
    },
    randomMove:function(){

    }
});