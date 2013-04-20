var Bullet = cc.Sprite.extend({
    attack:null,
    side:null,
    direction:null,
    speed:null,
    position:{x:0,y:0},
    ctor:function(file,side,attack,speed,dir,pos){
        this.initWithFile(file);
        this.side = side;
        this.attack = attack;
        this.speed = speed;
        this.direction = dir;
        this.position = pos;
    },
    update:function(){
        var sqrt = Math.sqrt(2*this.speed*this.speed);
        switch (this.direction){
            case TG.DIRECTION.UP:
                this.position.y-=this.speed;
                break;
            case TG.DIRECTION.LEFT:
                this.position.x-=this.speed;
                break;
            case TG.DIRECTION.RIGHT:
                this.position.x+=this.speed;
                break;
            case TG.DIRECTION.DOWN:
                this.position.y+=this.speed;
                break;
            case TG.DIRECTION.LEFT_UP:
                this.position.x-=sqrt;
                this.position.y-=sqrt;
                break;
            case TG.DIRECTION.LEFT_DOWN:
                this.position.x-=sqrt;
                this.position.y+=sqrt;
                break;
            case TG.DIRECTION.RIGHT_UP:
                this.position.x+=sqrt;
                this.position.y-=sqrt;
                break;
            case TG.DIRECTION.RIGHT_DOWN:
                this.position.x+=sqrt;
                this.position.y+=sqrt;
                break;
        }
    },
    hit:function(){

    }
});

Bullet.create = function(file,side,attack,speed,dir,pos){
    var bullet = new Bullet(file,side,attack,speed,dir,pos);
    return bullet;
}