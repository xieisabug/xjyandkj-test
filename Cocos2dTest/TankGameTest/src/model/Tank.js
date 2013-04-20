var Tank = cc.Sprite.extend({
    winSize:null, //游戏的大小
    life:null, //坦克的生命值
    speed:null, //坦克的速度
    attack:null, //坦克的攻击力
    side:null, //坦克的阵营
    position:{x:100, y:100}, //坦克的位置
    direction:TG.DIRECTION.UP, //坦克的朝向
    tmpDirection:TG.DIRECTION.UP, //存储一个过去的方向
    moveDirection:TG.DIRECTION.NULL, //移动的方向，默认不移动
    tag:1000, //坦克的位置标志
    ctor:function (file, side, life, speed, attack) {
        this._super();
        this.initWithFile(file);
        this.winSize = cc.Director.getInstance().getWinSize();
        this.life = life;
        this.speed = speed;
        this.attack = attack;
    },
    update:function () {
        this.setDirection();
        this.rotateToDirection();
        var sqrt = Math.sqrt(this.speed * this.speed / 2);//斜着走的路径
        switch (this.moveDirection) {
            case TG.DIRECTION.NULL:
                break;
            case TG.DIRECTION.UP:
                this.position.y += this.speed;
                break;
            case TG.DIRECTION.LEFT:
                this.position.x -= this.speed;
                break;
            case TG.DIRECTION.RIGHT:
                this.position.x += this.speed;
                break;
            case TG.DIRECTION.DOWN:
                this.position.y -= this.speed;
                break;
            case TG.DIRECTION.LEFT_UP:
                this.position.x -= sqrt;
                this.position.y += sqrt;
                break;
            case TG.DIRECTION.LEFT_DOWN:
                this.position.x -= sqrt;
                this.position.y -= sqrt;
                break;
            case TG.DIRECTION.RIGHT_UP:
                this.position.x += sqrt;
                this.position.y += sqrt;
                break;
            case TG.DIRECTION.RIGHT_DOWN:
                this.position.x += sqrt;
                this.position.y -= sqrt;
                break;
        }
        this.setPosition(this.position.x, this.position.y);
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
        if(keys[cc.KEY.a]){
            this.shoot();
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
            this.attack, 5, this.direction, this.position);
        this.getParent().addChild(bullet);
        TG.CONTAINER.PLAYER_BULLETS.push(bullet);
    },
    getPosition:function () {
        return this.position;
    },
    getLife:function () {
        return this.life;
    },
    setLife:function (life) {
        this.life = life;
    },
    getSpeed:function () {
        return this.speed;
    },
    setSpeed:function (speed) {
        this.speed = speed;
    },
    getAttack:function () {
        return this.attack;
    },
    setAttack:function (attack) {
        this.attack = attack;
    }
});