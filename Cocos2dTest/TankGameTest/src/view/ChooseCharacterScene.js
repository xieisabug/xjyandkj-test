//todo 这个是用来做人物的列表显示的
var CharacterList = cc.Layer.extend({
    ctor:function () {
    },
    init:function () {

    }
});

var ChooseCharacterContent = cc.Layer.extend({
    _winSize : null,
    ctor:function(){

    },
    init:function(){
        var ret = false;
        var characterListTag = 5;

        if(this._super()){
            this._winSize = cc.Director.getInstance().getWinSize();

            var content = cc.Sprite.create(s_characterContent);
            content.setPosition(this._winSize.width/2,this._winSize.height/2+2);
            this.addChild(content);

            //todo 以后还需要加入人物选择的业务，目前这段代码没用
            var characterList = new CharacterList();
            characterList.init();
            this.addChild(characterList,characterListTag,characterListTag);

            var ok = cc.MenuItemFont.create('OK','gameStart',this);
            ok.setColor(new cc.Color3B(0,0,0));
            var menu = cc.Menu.create();
            menu.addChild(ok);
            menu.setPosition(this._winSize.width-100,50);
            this.addChild(menu);

            ret = true;
        }

        return ret;
    },
    gameStart:function(){
        var scene = cc.Scene.create();
        scene.addChild(GamePlayScene.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});

ChooseCharacterContent.create = function () {
    var sg = new ChooseCharacterContent();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};