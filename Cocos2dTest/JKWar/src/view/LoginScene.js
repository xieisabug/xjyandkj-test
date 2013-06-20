var LoginLayer = cc.Layer.extend({
    TAG_BG:1,
    TAG_WELCOME_BG:5,
    TAG_WELCOME_INFO:10,
    TAG_BAR:15,
    TAG_VERSION:20,
    ctor:function(){
        if(!this.init()){
            cc.log("初始化界面失败");
        }
        this.scheduleOnce("call",1);
    },
    init:function () {
        this._super();
        //加入背景
        var winSize = cc.Director.getInstance().getWinSize();
        var bg = cc.Sprite.create(i_cover);
        bg.setAnchorPoint(zeroPoint);
        bg.setScale(1, 0.9);
        this.addChild(bg, this.TAG_BG, this.TAG_BG);

        //加入累计天数
        var dayBg = cc.Sprite.create(i_dayBg);
        dayBg.setPosition(winSize.width / 2, 100);
        this.addChild(dayBg, this.TAG_WELCOME_BG, this.TAG_WELCOME_BG);
        var dayLabel = cc.LabelTTF.create("欢迎来到计科大战");
        dayLabel.setAnchorPoint(zeroPoint);
        dayLabel.setFontSize(20);
        dayLabel.setPosition(40, 20);
        dayBg.addChild(dayLabel, this.TAG_WELCOME_INFO, this.TAG_WELCOME_INFO);

        //加入进度条
        var bar = cc.Sprite.create(i_loadBar);
        bar.setPosition(winSize.width / 2, 200);
        this.addChild(bar, this.TAG_BAR, this.TAG_BAR);
        var by = cc.RotateBy.create(1, 180);
        bar.runAction(cc.RepeatForever.create(by));

        //加入版本号
        var versionLable = cc.LabelTTF.create(JK.version);
        versionLable.setAnchorPoint(zeroPoint);
        versionLable.setFontSize(30);
        versionLable.setColor(cc.c3b(0, 0, 255));
        versionLable.setPosition(15, 25);
        this.addChild(versionLable, this.TAG_VERSION, this.TAG_VERSION);

        return true;
    },
    call:function(e){
        var home = cc.Scene.create();
        var layer = new HomeScene();
        layer.init();
        home.addChild(layer);
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, home));
    }
});

var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});