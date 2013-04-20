//按键
TG.KEYS = [];

//方向
TG.DIRECTION = {
    UP:1,
    DOWN:2,
    LEFT:3,
    RIGHT:4,
    LEFT_UP:5,
    LEFT_DOWN:6,
    RIGHT_DOWN:7,
    RIGHT_UP:8,
    NULL:9
};

//容器
TG.CONTAINER = {
    ENEMIES:[],
    ENEMY_BULLETS:[],
    PLAYER_BULLETS:[]
};

//阵营
TG.SIDE = {
    PLAYER:1,
    ENEMIES:2,
    ALL:3,
    NULL:4
};

//Tag
TG.TAG = {
    PLAYER_TANK:1000,
    ENEMY_TANK:1000,
    BULLET:995
};

TG.LIFE = 3;