Set.SetBase = function(){
    this.sets = [];
    this.set = function(name,value){
        this.sets[name] = value;
    };
    this.get = function(name){
        return this.sets[name] || "";
    };
}