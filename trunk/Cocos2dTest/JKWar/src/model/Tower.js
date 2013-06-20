var Tower = cc.Sprite.extend({
    id:null,
    life:null,
    type:null,
    name:null,
    isDestroy:false,
    TAG_SUN:500,
    ctor:function(name,type){
        this._super();
        this.setScale(0.65);

        this.type = type;
        this.name = name;
        this.initWithSpriteFrameName(name);

        if(type==JK.character.Sun){
            //5秒创建一个阳光
            this.schedule("buildSun", 5);
        }else if(type==JK.character.Plant){
            this.schedule("createBullet", 2);
        }

    },
    buildSun:function(){
        var sun = Sun.createSun(i_gameSun);
        sun.setPosition(this.getPosition().x+30, this.getPosition().y-25);
        JK.sunList.push(sun);
        this.getParent().addChild(sun, this.TAG_SUN, this.TAG_SUN);
        this.TAG_SUN++;
    },
    createBullet:function(){
        var size = ObjectUtil.objectSize(JK.npcMap);
        if(size!=0){
            for(var i in JK.npcMap){
                var npc = JK.npcMap[i];
                //控制子弹的创建条件
                if(npc.getPosition().x-this.getPosition().x<150){
                    var name = "";
                    if(ViewUtil.random(1, 2)==1){
                        name = i_gameBullet;
                    }else{
                        name = i_gameBullet1;
                    }
                    var bullet = Bullet.createBullet(name, npc);
                    bullet.setAnchorPoint(0,0);
                    bullet.setPosition(this.getPosition().x+14, this.getPosition().y+8);
                    this.getParent().addChild(bullet);
                    break;
                }
            }
        }
    },
    getLife:function(){
        return this.life;
    },
    setLife:function(life){
        this.life = life;
    },
    destroy:function(){
        this.runAction(cc.Hide.create());
        this.isDestroy = true;
        this.schedule("remove", 1);
    },
    remove:function(){
        this.unschedule("remove");
        delete JK.towerMap[this.id];
        this.removeFromParent(true);
    }
});
Tower.createTower = function(name, id, life, type){
    var tower = new Tower(name, type);
    tower.id = id;
    tower.life = life;
    var anim = cc.AnimationCache.getInstance().getAnimation(type);
    var a = cc.Animate.create(anim);
    tower.runAction(cc.RepeatForever.create(a));
    return tower;
};
Tower.shareTower = function(type){
    //序列帧动画
    var anim = cc.Animation.create(ViewUtil.getSpriteArray(type),0.1);
    //anim.setRestoreOriginalFrame(true);
    cc.AnimationCache.getInstance().addAnimation(anim,type);
};