game.character.Character = Class.create({
        initialize:function (id) {
            this.obj = $(id);
            this.controller = new game.act.Move();
        },
        move:function (to_x, to_y) {
            this.controller.move(this.obj, to_x, to_y);
        },
        hide : function(){
            this.obj.hide();
        }
    }
)
