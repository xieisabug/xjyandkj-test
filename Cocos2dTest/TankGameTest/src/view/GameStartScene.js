var BGLayer = cc.Layer.extend({
    init:function () {
        this._super();
        var gameSize = cc.Director.getInstance().getWinSize();
        var menu = cc.Menu.create();
        //初始三个菜单
        var start = cc.MenuItemFont.create('Start', 'gameStart', this);
        start.setPosition(menu.width/2, 150);
        menu.addChild(start, 5, 1);

        var option = cc.MenuItemFont.create('Option', 'gameOption', this);
        option.setPosition(menu.width / 2, 100);
        menu.addChild(option, 5, 2);

        var exit = cc.MenuItemFont.create('Exit', 'gameExit', this);
        exit.setPosition(menu.width / 2, 50);
        menu.addChild(exit, 5, 2);

        menu.setPosition(gameSize.width/2,50);
        this.addChild(menu);
    },
    gameStart:function () {
        var scene = cc.Scene.create();
        scene.addChild(ChooseCharacterContent.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    },
    gameOption:function () {
        cc.Director.getInstance().replaceScene();
    },
    gameExit:function () {
        cc.Director.getInstance().end();
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