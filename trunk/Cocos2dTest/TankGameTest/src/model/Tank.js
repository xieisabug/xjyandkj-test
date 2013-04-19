var Tank = cc.Sprite.extend({
    winSize:null,
    life:null,
    speed:null,
    attack:null,
    position:{x:100, y:100},
    direction:TG.DIRECTION.UP,
    tmpDirection:TG.DIRECTION.UP,
    tag:1000,
    ctor:function (file, life, speed, attack) {
        this.initWithFile(file);
        this.winSize = cc.Director.getInstance().getWinSize();
        this.life = life;
        this.speed = speed;
        this.attack = attack;
    },
    update:function () {
        var pos = this.getPosition();
        if (TG.KEYS[cc.KEY.up] && this.position.y <= this.winSize.height) {
            pos.y += this.speed;
        }
        if (TG.KEYS[cc.KEY.down] && this.position.y >= 0) {
            pos.y -= this.speed;
        }
        if (TG.KEYS[cc.KEY.left] && this.position.x >= 0) {
            pos.x -= this.speed;
        }
        if (TG.KEYS[cc.KEY.right] && this.position.x <= this.winSize.width) {
            pos.x += this.speed;
        }
        this.setDirection();
        this.rotateToDirection();
        this.setPosition(pos.x, pos.y);
    },
    setDirection:function () {
        var keys = TG.KEYS;
        this.tmpDirection = this.direction;
        if (keys[cc.KEY.up] && !keys[cc.KEY.down] && keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.LEFT_UP;
        } else if (!keys[cc.KEY.up] && keys[cc.KEY.down] && keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.LEFT_DOWN;
        } else if (keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.RIGHT_UP;
        } else if (!keys[cc.KEY.up] && keys[cc.KEY.down] && !keys[cc.KEY.left] && keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.RIGHT_DOWN;
        } else if (keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.UP;
        } else if (!keys[cc.KEY.up] && keys[cc.KEY.down] && !keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.DOWN;
        } else if (!keys[cc.KEY.up] && !keys[cc.KEY.down] && keys[cc.KEY.left] && !keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.LEFT;
        } else if (!keys[cc.KEY.up] && !keys[cc.KEY.down] && !keys[cc.KEY.left] && keys[cc.KEY.right]) {
            this.direction = TG.DIRECTION.RIGHT;
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