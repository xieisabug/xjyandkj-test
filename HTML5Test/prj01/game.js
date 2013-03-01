var canvas,context;
function init(){
    canvas = document.getElementById('scene');
    context = canvas.getContext('2d');

    gameLoop();
}
function gameLoop(){
    canvas.onmousedown = function(e){
        width = Math.random()*100;
        height = Math.random()*100;
        x = e.x - width/2;
        y = e.y - height/2;
        context.fillRect(x, y, width, height);
    }
}