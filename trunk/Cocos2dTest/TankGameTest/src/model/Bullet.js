var Bullet = cc.Sprite.extend({
    attack:null,
    side:null,
    direction:null,
    speed:null,
    ctor:function (file, side, attack, speed, dir) {
        this.initWithFile(file);
        this.side = side;
        this.attack = attack;
        this.speed = speed;
        this.direction = dir;
    },
    update:function () {
        var pos = this.getPosition();
        var sqrt = Math.sqrt(this.speed * this.speed/2);
        switch (this.direction) {
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
        this.setPosition(pos.x,pos.y);
    },
    hit:function (tank) {
        if(cc.rectIntersectsRect(this.getBoundingBox(),tank.getBoundingBox())){
            if(tank.side != this.side){
                tank.hurt(this.attack);
                this.destroy();
            }
        }
    },
    destroy:function(){
        if(this.side == TG.SIDE.PLAYER){
            cc.ArrayRemoveObject(TG.CONTAINER.PLAYER_BULLETS,this);
        } else {
            cc.ArrayRemoveObject(TG.CONTAINER.ENEMY_BULLETS,this);
        }
        this.removeFromParent(true);
    }
});

Bullet.create = function (file, side, attack, speed, dir, pos) {
    var bullet = new Bullet(file, side, attack, speed, dir, pos);
    bullet.setPosition(pos.x,pos.y);
    bullet.setTag(TG.TAG.BULLET);
    if(side == TG.SIDE.PLAYER){
        TG.CONTAINER.PLAYER_BULLETS.push(bullet);
    } else {
        TG.CONTAINER.ENEMY_BULLETS.push(bullet);
    }
    return bullet;
}