var Sun = cc.Sprite.extend({
    money:25,
    destroy:false,
    ctor:function(name){
        this._super();
        this.setScale(0.6);
        this.initWithFile(name);
        this.schedule("call",3);
    },
    call:function(){
        this.unschedule("call");

        var by = cc.MoveBy.create(1.5,cc.p(0,-300));
        this.runAction(by);

        this.destroy = true;
    },
    move:function(endPoint){
        if(this.destroy)return;

        var to = cc.MoveTo.create(0.8, endPoint);
        var fun = cc.CallFunc.create(this.moveCall,this);

        this.runAction(cc.Sequence.create(to, fun));
    },
    moveCall:function(){
        JK.game_money += this.money;

        var scene = this.getParent().getParent();
        scene.refreshMoney();
        this.destroy = true;
        this.runAction(cc.Hide.create());
    },
    isDestroy:function(){
        return this.destroy;
    }

});
Sun.createSun = function(name){
    return new Sun(name);
}