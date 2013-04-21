var Enemy = Tank.extend({
    ctor:function (file, life, speed, attack) {
        this._super(file, TG.SIDE.ENEMIES, life, speed, attack);
        this.schedule(this.randomDirection, 1, cc.RepeatForever);
    },
    update:function () {
        this.randomMove();
    },
    randomDirection:function (dt) {
        var dir = Math.floor((cc.RANDOM_0_1()*9)+1);
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
            default :
                rotate = cc.RotateTo.create(0.0, 0.0);
        }
        this.runAction(rotate);
    },
    randomMove:function () {
        var pos = this.getPosition();
        var sqrt = Math.sqrt(this.speed * this.speed / 2);//斜着走的路径
        switch (this.direction) {
            case TG.DIRECTION.NULL:
                break;
            case TG.DIRECTION.UP:
                pos.y += this.speed;
                break;
            case TG.DIRECTION.LEFT:
                pos.x -= this.speed;
                break;
            case TG.DIRECTION.RIGHT:
                pos.x += this.speed;
                break;
            case TG.DIRECTION.DOWN:
                pos.y -= this.speed;
                break;
            case TG.DIRECTION.LEFT_UP:
                pos.x -= sqrt;
                pos.y += sqrt;
                break;
            case TG.DIRECTION.LEFT_DOWN:
                pos.x -= sqrt;
                pos.y -= sqrt;
                break;
            case TG.DIRECTION.RIGHT_UP:
                pos.x += sqrt;
                pos.y += sqrt;
                break;
            case TG.DIRECTION.RIGHT_DOWN:
                pos.x += sqrt;
                pos.y -= sqrt;
                break;
        }
        if(pos.y >= this.winSize.height)
            pos.y = this.winSize.height;
        if(pos.y <= 0)
            pos.y = 0;
        if(pos.x >= this.winSize.width)
            pos.x = this.winSize.width;
        if(pos.x <= 0)
            pos.x = 0;
        this.setPosition(pos.x, pos.y);
    },
    hurt:function (attack) {
        this.life -= attack;
        if (this.life <= 0) {
            this.destroy();
        }
    },
    destroy:function(){
        this.removeFromParent();
        cc.ArrayRemoveObject(TG.CONTAINER.ENEMIES,this);
    }
});