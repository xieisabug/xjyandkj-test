var MathUtil = {};
MathUtil.random = function(from, to){
    return Math.floor((cc.RANDOM_0_1()*from)+to);
};