var ViewUtil = ViewUtil || {};
ViewUtil.getSprite = function (name, position, scaleX, scaleY, anchorPoint) {
    var s = cc.Sprite.create(name);
    s.setScaleX(scaleX || 1);
    s.setScaleY(scaleY || 1);
    s.setAnchorPoint(anchorPoint || zeroPoint);
    s.setPosition(position || zeroPoint);
    return s;
};

ViewUtil.getLabel = function (text,position, size, color) {
    var l = cc.LabelTTF.create(text);
    l.setPosition(position || zeroPoint);
    l.setFontSize(size || 20);
    l.setColor(color || cc.c3b(0,0,0));
    return l;
};

ViewUtil.getSpriteArray = function(type) {
    var array = [];
    var sp,i;
    switch (type) {
        case JK.character.Sun:
            for(i=1; i<=8; i++){
                sp = cc.SpriteFrameCache.getInstance().getSpriteFrame("p_1_0" + i + ".png");
                array.push(sp);
            }
            break;
        case JK.character.Plant:
            for(i=1; i<=8; i++){
                sp = cc.SpriteFrame.create("res/p_2_0" + i + ".png",cc.rect(0,0,80,80));
                array.push(sp);
            }
            break;
        case JK.character.Npc:
            for(i=1; i<=7; i++){
                sp = cc.SpriteFrame.create("res/z_1_0" + i + ".png",cc.rect(0,0,90,130));
                array.push(sp);
            }
            break;
    }
    return array;
};

ViewUtil.random = function(i,j){
    return Math.floor(Math.random()*(j-i+1) + i);
};

ViewUtil.touchMove = function(event,tiledMap){

}