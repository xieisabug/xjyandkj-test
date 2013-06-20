var Npc = cc.Sprite.extend({
    roadPointArray:[],
    id:null,
    life:100,
    seq:null,
    hurt:30,
    isDestroy:false,
    num:1,
    n:0,
    ctor:function(name,roadPointArray){
        this._super(name);
        this.roadPointArray = roadPointArray;
        this.setScale(0.6);
        this.setAnchorPoint(0,0);
        this.setPosition(roadPointArray[0]);

        this.walk();
        this.schedule("refresh", 0.5);
    },
    walk:function(){
        var t = cc.pDistance(this.getPosition(), this.roadPointArray[this.num])/40;
        var to = cc.MoveTo.create(t, this.roadPointArray[this.num]);
        var fun = cc.CallFunc.create("walkCall",this);
        this.seq = cc.Sequence.create(to, fun);
        this.runAction(this.seq);

        var anim = cc.Animation.create(ViewUtil.getSpriteArray(JK.character.Npc),0.2);
        var a = cc.Animate.create(anim);
        this.runAction(cc.RepeatForever.create(a));
    },
    walkCall:function(){
        this.stopAllActions();
        if(this.num==1){
            this.num++;
            this.walk();
        }else{
            this.detory();
        }
    },
    refresh:function(){
        var tiledMap =  this.getParent();
        var x = (this.getPosition().x/tiledMap.getTileSize().width);//列
        var y = ((tiledMap.getContentSize().height-this.getPosition().y)
            /tiledMap.getTileSize().height);//行
        var layer = tiledMap.getLayer("块层 1");
        var tiledId = layer.getTileGIDAt(cc.p(x,y));

        if(JK.towerMap.hasOwnProperty(tiledId)){//npc所在的图块有植物

            this.stopAction(this.seq);
            var tower = JK.towerMap[tiledId];
            var life = tower.getLife()-this.hurt;
            if(life<=0){
                tower.destroy();
                this.walk();
            }else{
                tower.setLife(life);
            }

        }
    },
    destroy:function(){
        delete JK.npcMap[this.id];
        this.removeFromParent(true);
    },
    getLife:function(){
        return this.life;
    },
    setLife:function(life){
        this.life = life;
    }
});
Npc.createNpc = function(name,id,roadPointArray){
    var npc = new Npc(name,roadPointArray);
    npc.id = id;
    return npc;
};