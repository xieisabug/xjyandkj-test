var Tank = cc.Sprite.extend({
    life:null,
    speed:null,
    attack:null,
    position:{x:100,y:100},
    tag:1000,
    ctor:function(file,life,speed,attack){
        this.initWithFile(file);
        this.life = life;
        this.speed = speed;
        this.attack = attack;
    },
    getPosition:function(){
        return this.position;
    },
    setPosition:function(pos){
        this.position = pos;
    },
    getLife:function(){
        return this.life;
    },
    setLife:function(life){
        this.life = life;
    },
    getSpeed:function(){
        return this.speed;
    },
    setSpeed:function(speed){
        this.speed = speed;
    },
    getAttack:function(){
        return this.attack;
    },
    setAttack:function(attack){
        this.attack = attack;
    }
});