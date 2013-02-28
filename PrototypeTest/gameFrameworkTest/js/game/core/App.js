game.core.App = Class.create({
    initialize:function(){
        _bodyEl = document.getElementsByTagName('body')[0];
        new Ajax.Request('js/game/scene/BaseScene.js',{
            method:'post'
        });
        scene = new game.scene.BaseScene(500,800,'center','center',"#555");
        scene.appendTo(_bodyEl);
    }
});