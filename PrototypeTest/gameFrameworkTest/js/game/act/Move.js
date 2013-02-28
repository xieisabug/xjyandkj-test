/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-1-17
 * Time: 上午10:05
 * To change this template use File | Settings | File Templates.
 */
game.act.Move = Class.create({
    initialize:function () {
    },
    move:function (obj, toX, toY) {
        obj.setStyle({
            top : toY+'px',
            left : toX+'px'
        });
    }
});
