Xg.define('game.character.Person',{
    initialize : function(){
        this.age = 10;
        this.sound = 'aaa~';
    },
    getAge:function(){
        return this.age;
    },
    shut:function(){
        document.write(this.sound);
    }
});