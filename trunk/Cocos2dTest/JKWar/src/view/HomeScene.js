var HomeScene = cc.Layer.extend({
    TAG_BG:1,
    TAG_BAR:4,
    TAG_ICON:5,
    TAG_MONEY:10,
    TAG_LEVEL:15,
    TAG_MENU:20,
    TAG_MENU_MENU:25,
    TAG_MENU_DAY:30,
    TAG_MENU_NIGHT:35,
    winSize:null,
    ctor:function () {
        if(!this.init()){
            cc.log("初始化失败");
        } else {
            this.menu();
        }
    },
    init:function () {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        //加入背景
        var bg = ViewUtil.getSprite(i_homeBg, zeroPoint, 1.1, 0.95);
        this.addChild(bg, this.TAG_BG, this.TAG_BG);

        //加入头像
        var icon = ViewUtil.getSprite(i_homeIcon, cc.p(10, 10));
        this.addChild(icon, this.TAG_ICON, this.TAG_ICON);

        //加入金钱
        var money = ViewUtil.getLabel("金钱：" + JK.game_money, cc.p(150, 20), 25, cc.c3b(255, 255, 255));
        this.addChild(money, this.TAG_MONEY, this.TAG_MONEY);

        //加入等级
        var level = ViewUtil.getLabel("等级：" + JK.level, cc.p(300, 20), 25, cc.c3b(255, 255, 255));
        this.addChild(level, this.TAG_LEVEL, this.TAG_LEVEL);

        cc.SpriteFrameCache.getInstance().addSpriteFrames(p_p1, i_gameP1);
        return true;
    },
    menu:function () {
        var menu = cc.Menu.create();
        menu.setPosition(zeroPoint);

        //菜单按钮
        var homeMenu_normal = cc.Sprite.create(i_homeMenu_normal);
        var homeMenu_selected = cc.Sprite.create(i_homeMenu_selected);
        var item = cc.MenuItemSprite.create(homeMenu_normal, homeMenu_selected, this.menuCall, this);
        item.setAnchorPoint(zeroPoint);
        item.setPosition(this.winSize.width / 2 - 70, 10);
        menu.addChild(item, this.TAG_MENU_MENU, this.TAG_MENU_MENU);

        //TODO 按钮按下的图片需要更换
        //白天按钮
        var homeMenuDay = cc.Sprite.create(i_homeMenuDay_normal);
        var homeMenuDay_select = cc.Sprite.create(i_homeMenuDay_select);
        var dayItem = cc.MenuItemSprite.create(homeMenuDay,homeMenuDay_select, this.menuCall, this);
        dayItem.setAnchorPoint(zeroPoint);
        dayItem.setPosition(30, 250);
        menu.addChild(dayItem, this.TAG_MENU_DAY, this.TAG_MENU_DAY);

        //黑夜按钮
        var homeMenuNight = cc.Sprite.create(i_homeMenuNight_normal);
        var homeMenuNight_select = cc.Sprite.create(i_homeMenuNight_select);
        var nightItem = cc.MenuItemSprite.create(homeMenuNight,homeMenuNight_select, this.menuCall, this);
        nightItem.setAnchorPoint(zeroPoint);
        nightItem.setPosition(160, 250);
        menu.addChild(nightItem, this.TAG_MENU_NIGHT, this.TAG_MENU_NIGHT);

        this.addChild(menu, this.TAG_MENU, this.TAG_MENU);
    },
    menuCall:function (obj) {
        switch (obj.getTag()) {
            case this.TAG_MENU_DAY:
                JK.gameType = JK.gameTypeData.day;
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new SelectScene()));
                break;
            case this.TAG_MENU_NIGHT:
                JK.gameType = JK.gameTypeData.night;
                cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, new SelectScene()));
                break;
            case this.TAG_MENU_MENU:
                break;
        }
    }
});
HomeScene.create = function () {
    var home = cc.Scene.create();
    var layer = new HomeScene();
    home.addChild(layer);
    return home;
};