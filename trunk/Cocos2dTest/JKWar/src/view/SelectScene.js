var SelectScene = cc.Layer.extend({
    TAG_BG:1,
    TAG_TOP_BAR:5,
    TAG_PLANT_BAR:10,
    TAG_START_BUTTON:15,
    TAG_PLANT_CARD:100,
    TAG_SELECT_PLANT_CARD:300,
    winSize:null,
    spList:[],
    selectList:[],
    selectMap:{},
    ctor:function () {
        this.winSize = cc.Director.getInstance().getWinSize();
        JK.selectPlantMap = {};
        this.init();
    },
    init:function () {
        this._super();
        this.setTouchEnabled(true);
        this.setMouseEnabled(true);
        var bg = ViewUtil.getSprite(i_selectBg, cc.p(-149, 0), 1.4, 1.4);
        this.addChild(bg, this.TAG_BG, this.TAG_BG);

        var topBar = cc.Sprite.create(i_selectTopBar);
        topBar.setRotation(90);
        topBar.setPosition(cc.p(this.winSize.width / 2, this.winSize.height - 50));
        this.addChild(topBar, this.TAG_TOP_BAR, this.TAG_TOP_BAR);

        var plantBar = ViewUtil.getSprite(i_selectPlantBar, cc.p(10, 5), 0.8, 0.65);
        this.addChild(plantBar, this.TAG_PLANT_BAR, this.TAG_PLANT_BAR);

        var startButton = ViewUtil.getSprite(i_selectStartButton, cc.p(this.winSize.width - 140, 0));
        this.addChild(startButton, this.TAG_START_BUTTON, this.TAG_START_BUTTON);

        for (var i = 0; i < i_selectPlantCard.length; i++) {
            var card = cc.Sprite.create(i_selectPlantCard[i]);
            card.setAnchorPoint(zeroPoint);
            card.setPosition(cc.p(30 + 70 * (i % 5), 220 - 85 * Math.floor(i / 5)));
            this.addChild(card, this.TAG_PLANT_CARD + i, this.TAG_PLANT_CARD + i);
            this.spList.push(card);
        }

    },
    onTouchBegan:function (touch) {
        var point = this.convertTouchToNodeSpace(touch);
        this.selectPlant(point);
    },
    onTouchEnded:function (touch) {
        var point = this.convertTouchToNodeSpace(touch);
        this.nextScene(point);
    },
    onMouseDown:function(event){
        var point = this.convertToNodeSpace(event._point);
        this.selectPlant(point);
    },
    onMouseUp:function(event){
        var point = this.convertToNodeSpace(event._point);
        this.nextScene(point);
    },
    selectPlant:function(point){
        for(var i = 0; i<this.spList.length; i++){
            var sp = this.spList[i];
            if(cc.rectContainsPoint(sp.getBoundingBox(),point) && !this.selectMap[sp.getTag()+200]){
                var len = ObjectUtil.objectSize(this.selectMap);
                var sprite = cc.Sprite.create(i_selectPlantCard[i]);
                sprite.setScale(0.75);
                sprite.setAnchorPoint(0,0);
                sprite.setPosition(sp.getPosition());
                this.addChild(sprite, this.TAG_SELECT_PLANT_CARD+i, this.TAG_SELECT_PLANT_CARD+i);
                var to = cc.MoveTo.create(0.5, cc.p(220+len*50, this.winSize.height-80));
                sprite.runAction(to);

                this.selectList.push(sprite);
                JK.selectPlantMap[this.TAG_SELECT_PLANT_CARD+i]= sp.getTag();
                this.selectMap[sprite.getTag()] = sprite;
                return false;
            }
        }

        //判断选中的植物是否被点击
        for(var j=0; j<this.selectList.length; j++){
            var selectSp = this.selectList[j];
            if(cc.rectContainsPoint(selectSp.getBoundingBox(), point)){
                //移除本身
                selectSp.removeFromParent(true);
                //selectList中对应的数据删除
                cc.ArrayRemoveObjectAtIndex(this.selectList,j);
                //selectMap中对应的数据删除
                for(var sm in this.selectMap) {
                    if(sm == selectSp.getTag()){
                        delete this.selectMap[sm];
                        break;
                    }
                }
                delete JK.selectPlantMap[selectSp.getTag()];
                //让处在右边的选中植物执行向左移一位的动画
                for(var a=j; a<this.selectList.length; a++){
                    var moveSp = this.selectList[a];
                    var by = cc.MoveBy.create(0.3, cc.p(-50, 0));
                    moveSp.runAction(by);
                }
                break;
            }
        }
    },
    nextScene:function(point){
        var sp = this.getChildByTag(this.TAG_START_BUTTON);
        if(cc.rectContainsPoint(sp.getBoundingBox(), point)){
            cc.Director.getInstance().replaceScene(GameScene.create());
        }
    }
});