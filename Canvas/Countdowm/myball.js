var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

var curTime = new Date();

var balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function() {

	WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // document.documentElement是新标准
	WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
	RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1	//文字宽度占4/5 93*(R+1) + 15*93*(R+1)

	MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	setInterval(
		function() {
			render(context);
			update();
		},
		50
	);
}

// 更新数据结构：1.时间，2.判断时间，小球
function update() {
	var nextTime = new Date();

	var nextHours = (nextTime.getHours() + 100 + '').substr(1);
	var nextMinutes = (nextTime.getMinutes() + 100 + '').substr(1);
	var nextSeconds = (nextTime.getSeconds() + 100 + '').substr(1);

	var curHours = (curTime.getHours() + 100 + '').substr(1);
	var curMinutes = (curTime.getMinutes() + 100 + '').substr(1);
	var curSeconds = (curTime.getSeconds() + 100 + '').substr(1);

	if (curSeconds != nextSeconds) {
		if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
			addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
		}

		if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
			addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
		}

		if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
			addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
		}
		if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
			addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
		}

		if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
			addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
		}
		if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
			addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
		}

		curTime = nextTime
	}
	updateBalls();
}

function updateBalls() {

	for (var i = 0; i < balls.length; i++) {

		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		// 能量损耗
		if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
			balls[i].y = WINDOW_HEIGHT - RADIUS;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}

	// 性能优化，阻止balls数组无限增长
	var cnt = 0;
	for (var i = 0; i < balls.length; i++)
		if (balls[i].x + balls[i].r > 0 && balls[i].x - balls[i].r < WINDOW_WIDTH)
			balls[cnt++] = balls[i]

	while (balls.length > Math.min(300, cnt))
		balls.pop()
}

function addBalls(x, y, num) {
	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length; j++)
			if (digit[num][i][j] == 1) {
				var aBall = {
					x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
					y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
					r: RADIUS,
					g: 1.5 + Math.random(),
					vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4, //(-1)² or -1
					vy: -5,
					color: 'hsl('+Math.round(Math.random()*360)+',50%,70%)'	//随机色彩
					//color: colors[Math.floor(Math.random() * colors.length)] //0~9
				}

				balls.push(aBall)
			}
}

// 渲染：时间，小球
function render(cxt) {
	var hours = (curTime.getHours() + 100 + '').substr(1);
	var minutes = (curTime.getMinutes() + 100 + '').substr(1);
	var seconds = (curTime.getSeconds() + 100 + '').substr(1);

	console.log(hours, minutes, seconds);

	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

	renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
	renderDigit(MARGIN_LEFT + 2 * (RADIUS + 1) * 7 + (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)

	renderDigit(MARGIN_LEFT + 2 * (RADIUS + 1) * 14 + (RADIUS + 1) * 2, MARGIN_TOP, 10, cxt)

	renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
	renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);

	renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);

	renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
	renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

	for (var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt) {
	cxt.fillStyle = "rgb(0,102,153)";

	for (var i = 0; i < digit[num].length; i++)
		for (var j = 0; j < digit[num][i].length; j++)
			if (digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
				cxt.closePath()

				cxt.fill()
			}
}

