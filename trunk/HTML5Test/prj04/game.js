var canvas, context, image , angle = 0, degrees, rotate,
    bullet = [];
function init() {
    canvas = document.getElementById('scene');
    context = canvas.getContext('2d');
    image = new Image();
    image.src = "../util/image/bullet.png";
    context.translate(250, 300);
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
    canvas.onmousedown = function (e) {
        Log(e.x + "," + e.y);
        bullet.push({
            toX:Math.floor(e.x - 250),
            toY:Math.floor(e.y - 300),
            nowX:0,
            nowY:0
        });
        console.log(bullet);
    }
    setInterval(gameLoop, 20);
}
function gameLoop() {
    context.clearRect(0 - 250, 0 - 300, 800, 800);
    context.drawImage(image, 0 - 24, 0 - 10);
    for (i in bullet) {
        var b = bullet[i];
        context.fillRect(b.nowX - 3, b.nowY - 3, 6, 6);
        if (b.nowX < b.toX) {
            b.nowX++;
        }
        if (b.nowY < b.toY) {
            b.nowY++;
        }
        if (b.nowX > b.toX) {
            b.nowX--;
        }
        if (b.nowY > b.toY) {
            b.nowY--;
        }
        if (b.nowX == b.toX && b.nowY == b.toY) {
            bullet.pop();
        }
    }
}