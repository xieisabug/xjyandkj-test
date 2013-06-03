var LoginLayer = cc.Layer.extend({
    TAG_BG:1,
    TAG_WELCOME_BG:5,
    TAG_WELCOME_INFO:10,
    init:function () {
        this._super();

        //加入背景
        var winSize = cc.Director.getInstance().getWinSize();
        var bg = cc.Sprite.create(i_cover);
        bg.setAnchorPoint(zeroPoint);
        this.addChild(bg, this.TAG_BG, this.TAG_BG);

        //加入累计天数
        var dayBg = cc.Sprite.create(i_dayBg);
        dayBg.setPosition(winSize.width/2,100);
        this.addChild(dayBg, this.TAG_WELCOME_BG, this.TAG_WELCOME_BG);
        var dayLabel = cc.LabelTTF.create("欢迎来到计科大战");
        dayLabel.setAnchorPoint(zeroPoint);
        dayLabel.setFontSize(20);
        dayLabel.setPosition(40,20);
        dayBg.addChild(dayLabel,this.TAG_WELCOME_INFO,this.TAG_WELCOME_INFO);

        //加入进度条
        var bar = cc.Sprite.create()
        return true;
    }
});

var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        layer.init();
        this.addChild(layer);
    }
});