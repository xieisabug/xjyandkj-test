var i_cover = "res/cover.jpg";
var i_dayBg = "res/well_detail.png";
var i_loadBar = "res/sc_publish_spin.png";
var i_homeBg = "res/pvz_select_survive_mode.png";
var i_homeIcon = "res/wy_portrait_female_1.jpg";
var i_homeMenu_normal = "res/map_button_menu.png";
var i_homeMenu_selected = "res/home_button.png";
var i_homeMenuDay_normal = "res/item_day.png";
var i_homeMenuDay_select = "res/item_day_select.png";
var i_homeMenuNight_normal = "res/item_night.png";
var i_homeMenuNight_select = "res/item_night_select.png";
var i_selectBg = "res/bk1.jpg";
var i_selectTopBar = "res/seedbank.png";
var i_selectPlantBar = "res/seedstore.png";
var i_selectStartButton = "res/button4.png";
var i_gameTopBar = "res/sdbank.png";
var i_gameSeedFlower = "res/seed_flower.png";
var i_gameSeedPea = "res/seed_pea.png";
var i_gameSun = "res/sun.png";
var i_gameBullet = "res/bullet.png";
var i_gameBullet1 = "res/bullet_1.png";
var i_gameP1 = "res/p_1.png";

var t_itcast_map_day = "res/itcast_map_day.tmx";
var t_itcast_map_night = "res/itcast_map_night.tmx";

var p_p1 = "res/p_1.plist";

var zeroPoint = cc.p(0, 0);

var g_ressources = [
    //image
    {type:"image", src:i_cover},
    {type:"image", src:i_dayBg},
    {type:"image", src:i_loadBar},
    {type:"image", src:i_homeBg},
    {type:"image", src:i_homeIcon},
    {type:"image", src:i_homeMenu_normal},
    {type:"image", src:i_homeMenu_selected},
    {type:"image", src:i_homeMenuDay_normal},
    {type:"image", src:i_homeMenuDay_select},
    {type:"image", src:i_homeMenuNight_normal},
    {type:"image", src:i_homeMenuNight_select},
    {type:"image", src:i_selectBg},
    {type:"image", src:i_selectTopBar},
    {type:"image", src:i_selectPlantBar},
    {type:"image", src:i_selectStartButton},
    {type:"image", src:i_gameTopBar},
    {type:"image", src:i_gameSeedFlower},
    {type:"image", src:i_gameSeedPea},
    {type:"image", src:i_gameSun},
    {type:"image", src:i_gameBullet},
    {type:"image", src:i_gameBullet1},
    {type:"image", src:i_gameP1},
    //plist
    {type:"plist", src:p_p1},

    //fnt

    //tmx
    {type:"tmx", src:t_itcast_map_day},
    {type:"tmx", src:t_itcast_map_night}

    //bgm

    //effect
];
var i_selectPlantCard = ["res/xx01.png","res/xx02.png","res/xx03.png","res/xx04.png","res/xx05.png"];
for(var i = 0; i<i_selectPlantCard.length; i++){
    g_ressources.push({type:"image",src:i_selectPlantCard[i]});
}