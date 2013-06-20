var GameScene = cc.Layer.extend({
    TAG_MAP:1,
    TAG_TOP_BAR:10,
    TAG_SUN:20,
    TAG_PLANT:30,
    TAG_MONEY:40,
    TAG_TOUCH_PLANT:100,
    TAG_NPC:300,
    winSize:null,
    contentSize:null,
    midPoint:null,
    plantId:null,
    tiledMap:null,
    roadList:[],
    touchList:[],
    isTouchPlant:false,
    touchSprite:null,
    name:null,
    ctor:function () {
        if (!this.init()) {
            cc.log("初始化失败");
        }
    },
    init:function () {
        this._super();
        this.setTouchEnabled(true);
        this.setMouseEnabled(true);
        this.winSize = cc.Director.getInstance().getWinSize();
        this.initMap();
        this.parseMap();
        this.initView();
        return true;
    },
    onTouchBegan:function (touch) {
        var point = this.convertTouchToNodeSpace(touch);
        var mapPoint = this.tiledMap.convertTouchToNodeSpace(touch);
        this.clickEvent(point, mapPoint);
    },
    onTouchEnded:function (touch) {
        var mapPoint = this.tiledMap.convertTouchToNodeSpace(touch);
        this.clickEventEnd(mapPoint);
    },
    onTouchMoved:function (touch) {
        var point = this.convertTouchToNodeSpace(touch);
        this.clickEventMove(point);
    },
    onMouseDown:function (event) {
        console.log("mouse down");
        var point = this.convertToNodeSpace(event._point);
        var mapPoint = this.tiledMap.convertToNodeSpace(event._point);
        this.clickEvent(point, mapPoint);
    },
    onMouseUp:function (event) {
        var mapPoint = this.tiledMap.convertToNodeSpace(event._point);
        this.clickEventEnd(mapPoint);
    },
    onMouseDragged:function (event) {
        var point = this.convertToNodeSpace(event._point);
        this.clickEventMove(point);
    },
    initMap:function () {
        if (JK.gameType == JK.gameTypeData.day) {
            this.tiledMap = cc.TMXTiledMap.create(t_itcast_map_day);
        } else if (JK.gameType == JK.gameTypeData.night) {
            this.tiledMap = cc.TMXTiledMap.create(t_itcast_map_night);
        }
        var mapSize = this.tiledMap.getMapSize();
        var tileSize = this.tiledMap.getTileSize();
        this.contentSize = {
            width:mapSize.width * tileSize.width,
            height:mapSize.height * tileSize.height
        };
        //tiledMap.setPosition(mapSize.width/2, mapSize.height/2);
        //tiledMap.setAnchorPoint(mapSize.width/2, mapSize.height/2);
        this.tiledMap.setScale(1.4);
        var by = cc.MoveBy.create(1, cc.p(this.contentSize.width - this.winSize.width, 0));
        var delay = cc.DelayTime.create(2);
        var seq = cc.Sequence.create(by, delay, by.reverse());
        this.tiledMap.runAction(seq);
        this.addChild(this.tiledMap, this.TAG_MAP, this.TAG_MAP);
    },
    parseMap:function () {
        var group = this.tiledMap.getObjectGroup("road01");
        if (group == null)return;
        var array = group.getObjects();
        for (var i = 0; i < array.length; i++) {
            this.roadList.push(cc.p(array[i].x, array[i].y));
        }
    },
    initView:function () {
        //顶部栏
        var topBar = cc.Sprite.create(i_gameTopBar);
        topBar.setPosition(cc.p(this.winSize.width / 2, this.winSize.height - 50));
        this.addChild(topBar, this.TAG_TOP_BAR, this.TAG_TOP_BAR);
        //金钱
        var money = cc.LabelTTF.create(JK.game_money);
        money.setAnchorPoint(0, 0);
        money.setPosition(12, 3);
        money.setColor(cc.c3b(255, 0, 0));
        topBar.addChild(money, this.TAG_MONEY, this.TAG_MONEY);
        for (var i in JK.selectPlantMap) {
            switch (JK.selectPlantMap[i]) {
                case 100://向日葵
                    var sun = ViewUtil.getSprite(i_gameSeedFlower, cc.p(265, this.winSize.height - 80),
                        0.43, 0.43);
                    this.touchList.push(sun);
                    this.addChild(sun, this.TAG_SUN, this.TAG_SUN);
                    break;
                case 101://射手
                    var pea = ViewUtil.getSprite(i_gameSeedPea, cc.p(315, this.winSize.height - 80),
                        0.43, 0.43);
                    this.touchList.push(pea);
                    this.addChild(pea, this.TAG_PLANT, this.TAG_PLANT);
                    break;
                default :
                    break;
            }
        }
    },
    clickEvent:function (point, mapPoint) {
        for (var i in this.touchList) {
            var sp = this.touchList[i];
            if (cc.rectContainsPoint(sp.getBoundingBox(), point)) {
                if (sp.getTag() == this.TAG_SUN) {//向日葵
                    this.name = i_gameSeedFlower;
                    JK.towerType = JK.character.Sun;
                } else if (sp.getTag() == this.TAG_PLANT) {//豌豆
                    JK.towerType = JK.character.Plant;
                    this.name = i_gameSeedPea;
                }
                this.touchSprite = cc.Sprite.create(this.name);
                this.touchSprite.setScale(0.65);
                this.touchSprite.setPosition(sp.getPosition());
                this.addChild(this.touchSprite, this.TAG_TOUCH_PLANT, this.TAG_TOUCH_PLANT);
                this.isTouchPlant = true;
                break;
            }
        }
        //销毁该销毁的阳光
        for (var i = JK.sunList.length - 1; i >= 0; i--) {
            var sun = JK.sunList[i];
            console.log(JK.sunList);
            console.log(sun instanceof Sun);
            if (sun.isDestroy()) {
                delete JK.sunList[i];
            }
        }
        //处理阳光点击
        for (var i in JK.sunList) {
            var sun = JK.sunList[i];
            if (cc.rectContainsPoint(sun.getBoundingBox(), mapPoint)) {
                //计算地图拖动的距离
                var m = Math.floor(this.contentSize.width / 2 - this.tiledMap.getPosition().x);
                var endPoint = cc.p(140 + m, this.winSize.height - 30);
                sun.move(endPoint);
            }
        }
    },
    clickEventEnd:function (mapPoint) {
        //console.log(this.isCanCreatePlant());
        //手指离开屏幕之前所点位置有图片;该位置能创建植物
        if (this.isTouchPlant && this.isCanCreatePlant(mapPoint) && !JK.towerMap.hasOwnProperty(this.plantId) &&
            ((JK.towerType == JK.character.Sun && JK.game_money >= 50)
                || JK.towerType == JK.character.Plant && JK.game_money >= 100)) {//在地图上创建植物
            var life = 0;
            if (JK.towerType == JK.character.Sun) {//向日葵
                life = 100;
                JK.game_money -= 50;
            } else if (JK.towerType == JK.character.Plant) {
                JK.game_money -= 100;
                life = 200;
            }
            this.refreshMoney();
            Tower.shareTower(JK.towerType);
            var tower = Tower.createTower("p_1_01.png", this.plantId, life, JK.towerType);
            tower.setPosition(this.midPoint);
            this.tiledMap.addChild(tower);
            JK.towerMap[this.plantId] = tower;
//			plantIdMap.put(plantId, plantId);


        }
        if (this.isTouchPlant) {
            this.removeChildByTag(this.TAG_TOUCH_PLANT, true);
            this.isTouchPlant = false;
        }
    },
    clickEventMove:function (point) {
        if (this.isTouchPlant) {//点中了植物,进行对新创建的植物的拖动
            this.touchSprite.setPosition(point);
        }
        /*else{
         this.tiledMap.touchMove(event, tiledMap);
         }*/
    },
    refreshMoney:function () {
        var money = this.getChildByTag(this.TAG_TOP_BAR).getChildByTag(this.TAG_MONEY);
        money.setString(JK.game_money);
    },
    isCanCreatePlant:function (mapPoint) {
        var x = (mapPoint.x / this.tiledMap.getTileSize().width);//列
        var y = ((this.contentSize.height - mapPoint.y) / this.tiledMap.getTileSize().height);//行

        this.midPoint = cc.p(x * this.tiledMap.getTileSize().width + 23,
            this.contentSize.height - y * this.tiledMap.getTileSize().height - 5);

        var layer = this.tiledMap.getLayer("块层 1");
        this.plantId = layer.getTileGIDAt(cc.p(x, y));
        var map = this.tiledMap.propertiesForGID(this.plantId);
        return (map != null && map["buildable"] != null);
    }
});
GameScene.create = function () {
    var game = cc.Scene.create();
    var layer = new GameScene();
    game.addChild(layer);
    return game;
};