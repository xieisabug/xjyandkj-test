var Tank = cc.Sprite.extend({
    winSize:null, //游戏的大小
    life:null, //坦克的生命值
    maxLife:null, //生命值上限
    speed:null, //坦克的速度
    attack:null, //坦克的攻击力
    side:null, //坦克的阵营
    direction:TG.DIRECTION.UP, //坦克的朝向
    tmpDirection:TG.DIRECTION.UP, //存储一个过去的方向
    moveDirection:TG.DIRECTION.NULL, //移动的方向，默认不移动
    ctor:function (file, side, life, speed, attack) {
        this._super();
        this.initWithFile(file);
        this.winSize = cc.Director.getInstance().getWinSize();
        this.side = side;
        this.life = life;
        this.maxLife = life;
        this.speed = speed;
        this.attack = attack;
    },
    update:function () {
        this.setDirection();
        this.rotateToDirection();
        var pos = this.getPosition();
        var tmppos = pos;
        var sqrt = Math.sqrt(this.speed * this.speed / 2);//斜着走的路径
        switch (this.moveDirection) {
            case TG.DIRECTION.NULL:
                break;
            case TG.DIRECTION.UP:
                pos.y += this.speed;
                break;
            case TG.DIRECTION.LEFT:
                pos.x -= this.speed;
                break;
            case TG.DIRECTION.RIGHT:
                pos.x += this.speed;
                break;
            case TG.DIRECTION.DOWN:
                pos.y -= this.speed;
                break;
            case TG.DIRECTION.LEFT_UP:
                pos.x -= sqrt;
                pos.y += sqrt;
                break;
            case TG.DIRECTION.LEFT_DOWN:
                pos.x -= sqrt;
                pos.y -= sqrt;
                break;
            case TG.DIRECTION.RIGHT_UP:
                pos.x += sqrt;
                pos.y += sqrt;
                break;
            case TG.DIRECTION.RIGHT_DOWN:
                pos.x += sqrt;
                pos.y -= sqrt;
                break;
        }
        if (pos.y >= this.winSize.height)
            pos.y = this.winSize.height;
        if (pos.y <= 0)
            pos.y = 0;
        if (pos.x >= this.winSize.width)
            pos.x = this.winSize.width;
        if (pos.x <= 0)
            pos.x = 0;
        var len = TG.CONTAINER.WALLS.length;
        for (var i = 0; i < len; i++) {
            if(cc.rectContainsPoint(TG.CONTAINER.WALLS[i],pos)){
                pos = tmppos;
            }
        }
        this.setPosition(pos.x, pos.y);
    },
    setDirection:function () {
        var keys = TG.KEYS;
        this.tmpDirection = this.direction;
        if (keys[cc.KEY.up] && !keys[cc.KEY.down] && keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.LEFT_UP;
            this.moveDirection = TG.DIRECTION.LEFT_UP;
        } else if (!keys[cc.KEY.up] && keys[cc.KEY.down] && keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.LEFT_DOWN;
            this.moveDirection = TG.DIRECTION.LEFT_DOWN;
        } else if (keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.RIGHT_UP;
            this.moveDirection = TG.DIRECTION.RIGHT_UP;
        } else if (!keys[cc.KEY.up] && keys[cc.KEY.down] && !keys[cc.KEY.left] && keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.RIGHT_DOWN;
            this.moveDirection = TG.DIRECTION.RIGHT_DOWN;
        } else if (keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.UP;
            this.moveDirection = TG.DIRECTION.UP;
        } else if (!keys[cc.KEY.up] && keys[cc.KEY.down] && !keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.DOWN;
            this.moveDirection = TG.DIRECTION.DOWN;
        } else if (!keys[cc.KEY.up] && !keys[cc.KEY.down] && keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.LEFT;
            this.moveDirection = TG.DIRECTION.LEFT;
        } else if (!keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.RIGHT;
            this.moveDirection = TG.DIRECTION.RIGHT;
        } else if (!keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.moveDirection = TG.DIRECTION.NULL;
        }
    },
    rotateToDirection:function () {
        var rotate = null;
        if (this.tmpDirection == this.direction) return;
        switch (this.direction) {
            case TG.DIRECTION.UP:
                rotate = cc.RotateTo.create(0.0, 0.0);
                break;
            case TG.DIRECTION.LEFT:
                rotate = cc.RotateTo.create(0.0, 270.0);
                break;
            case TG.DIRECTION.RIGHT:
                rotate = cc.RotateTo.create(0.0, 90.0);
                break;
            case TG.DIRECTION.DOWN:
                rotate = cc.RotateTo.create(0.0, 180.0);
                break;
            case TG.DIRECTION.LEFT_UP:
                rotate = cc.RotateTo.create(0.0, 315.0);
                break;
            case TG.DIRECTION.RIGHT_UP:
                rotate = cc.RotateTo.create(0.0, 45.0);
                break;
            case TG.DIRECTION.LEFT_DOWN:
                rotate = cc.RotateTo.create(0.0, 225.0);
                break;
            case TG.DIRECTION.RIGHT_DOWN:
                rotate = cc.RotateTo.create(0.0, 135.0);
                break;
        }
        this.runAction(rotate);
    },
    shoot:function () {
        var bullet = Bullet.create(s_bullet, this.side,
            this.attack, 15, this.direction, this.getPosition());
        this.getParent().addChild(bullet, TG.TAG.BULLET, TG.TAG.BULLET);

        TG.CONTAINER.PLAYER_BULLETS.push(bullet);
    },
    hurt:function (attack) {
        this.life -= attack;
        if (this.life <= 0) {
            if (TG.LIFE > 0) {
                this.reborn();
            } else {
                this.destroy();
            }
        }
    },
    reborn:function () {
        TG.LIFE--;
        this.life = this.maxLife;
        //todo 写一个重生的动画
    },
    destroy:function () {
        this.removeFromParent();
    }
});