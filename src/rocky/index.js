// file: /src/rocky/index.js
var rocky = require('rocky');

var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",
  "Oct", "Nov", "Dec"];

function drawMinutes(ctx, m, x, y, angle, length) {
  // find coordinates
  var x2 = x + Math.sin(angle) * length;
  var y2 = y - Math.cos(angle) * length;

  ctx.fillText(m, x2, y2, 50);
}

function displayDate(ctx, d, w, h) {
  // set text style
  ctx.fillStyle = 'darkgray';
  ctx.font = '24px bold Gothic';

  // display date at the bottom of the screen
  var weekday = d.getDay();
  var month = d.getMonth();
  var day = d.getDate();
  ctx.fillText(weekdays[weekday] + "  " + day + "  " + months[month], w / 2, h - 28, w);
}

function displayHours(ctx, d, w, cpw, cph) {
  // set text style
  ctx.fillStyle = 'black';
  ctx.font = '42px bold numbers Leco-numbers';

  // display hours in the middle of the screen, -21 because of font size
  ctx.fillText(d.getHours().toString(), cpw, cph - 21, w);
}

function displayMinutes(ctx, d, cpw, cph, maxLength) {
  // set text style
  ctx.fillStyle = 'tiffanyblue';
  ctx.font = '20px bold Leco-numbers';

  // draw minutes
  var m = d.getMinutes();
  var minuteAngle = 2 * Math.PI * (m / 60);
  drawMinutes(ctx, m, cpw, cph - 10, minuteAngle, maxLength);
}


rocky.on('draw', function(event) {
  // get CanvasRenderingContext2D object
  var ctx = event.context;

  // clear screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // change background colour
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // find width and height of display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // date takes up 22px, use to adjust available height
  var dateOffset = 22;

  // add 5px margin around edges (doesn't work - no monospaced fonts available)
  var maxLength = (Math.min(w, (h - dateOffset)) - 30) / 2;

  // center point of canvas
  var cpw = w / 2;
  var cph = (h - dateOffset) / 2;

  // get current date/time
  var d = new Date();

  // display date/time
  ctx.textAlign = 'center';
  displayDate(ctx, d, w, h);
  displayHours(ctx, d, w, cpw, cph);
  displayMinutes(ctx, d, cpw, cph, maxLength);
});


rocky.on('minutechange', function(event) {
  // request screen to be redrawn every minute
  rocky.requestDraw();
});
