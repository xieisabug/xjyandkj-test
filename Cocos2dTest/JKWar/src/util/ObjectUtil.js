var ObjectUtil = ObjectUtil || {};
ObjectUtil.objectSize = function(obj){
    var count = 0;
    for(var i in obj){
        count++;
    }
    return count;
};