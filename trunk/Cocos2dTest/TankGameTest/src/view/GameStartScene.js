var BGLayer = cc.Layer.extend({
    init:function(){
        this._super();
        var gameSize = cc.Director.getInstance().getWinSize();
        //初始三个菜单
        var start = cc.LabelTTF.create('Start','Arial',22);
        start.setPosition(gameSize.width/2,100);
        this.addChild(start,5,1);
        var option = cc.LabelTTF.create('Option','Arial',22);
        option.setPosition(gameSize.width/2,70);
        this.addChild(option,5,2);
        var exit = cc.LabelTTF.create('Exit','Arial',22);
        exit.setPosition(gameSize.width/2,40);
        this.addChild(exit,5,2);
    }
});

var GameStartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var bgLayer = new BGLayer();
        bgLayer.init();
        this.addChild(bgLayer);
    }
});