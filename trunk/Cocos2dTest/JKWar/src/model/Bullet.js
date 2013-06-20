var Bullet = cc.Sprite.extend({
    hurt:25,
    npc:null,
    ctor:function(name,npc){
        this._super(name);
        this.npc = npc;
        this.setScale(0.6);
        var t = cc.pDistance(this.getPosition(), npc.getPosition())/350;
        var p = npc.getPosition();

        var to = cc.MoveTo.create(t, cc.p(p.x-15, p.y+15));

        var fun = cc.CallFunc.create("call", this);
        this.runAction(cc.Sequence.create(to, fun));
    },
    call:function(){
        var life = this.npc.getLife()-this.hurt;
        if(life<=0){
            this.npc.detory();
        }else{
            this.npc.setLife(life);
        }
        this.removeFromParent(true);
    }
});
Bullet.createBullet = function(name,npc){
    var bullet = new Bullet(name,npc);
    return bullet;
};