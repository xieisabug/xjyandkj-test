var canvas, context, image , angle=0, degrees, rotate,
    bullet = [];
function init() {
    canvas = document.getElementById('scene');
    context = canvas.getContext('2d');
    image = new Image();
    image.src = "../util/image/bullet.png";
    context.translate(250,300);
    canvas.onmousemove = function (e) {
        x = e.x;
        y = e.y;
        var oldAngle = angle;
        if (x < 250) {
            angle = Math.atan((300 - y) / (250 - x));
            degrees = 180 / (Math.PI / angle);
            rotate = angle - oldAngle;
        }
        else {
            angle = Math.atan((300 - y) / (x - 250));
            degrees = 180 - 180 / (Math.PI / angle);
            rotate = oldAngle - angle;
        }

        context.rotate(rotate);
    }
    setInterval(gameLoop,50);
}
function gameLoop() {
    context.clearRect(0-25,0-25,50,50);
    context.drawImage(image, 0-24, 0-10);
}