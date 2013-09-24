/* Relaxation Class */

window.onload = function(){
	var relaxation = new Relaxation();
}


function Relaxation() {
	this.width = $(window).width();
	this.height = $(window).height();
	this.numberOfCircles = 20;
	this.init();
}

Relaxation.prototype.init = function() {
	var that = this;
	this.stage = new Kinetic.Stage({
		container: 'relaxation-container',
		width: this.width,
		height: this.height
	});
	this.layer = new Kinetic.Layer();
	this.addBackground();
	this.addCircles();
	this.addMouseEvents(this.layer);
	this.stage.add(this.layer);
}

//adds a gradient filled rectangle background to layer
Relaxation.prototype.addBackground = function() {
	this.background = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: this.width,
		height: this.height,
		fillLinearGradientStartPoint: [0, 0],
		fillLinearGradientEndPoint: [0, this.height],
		fillLinearGradientColorStops: [0, '#080C18', 1, '#43628F'],
	});
	this.layer.add(this.background);
}

Relaxation.prototype.addCircles = function() {
	this.circleArray = new Array();
	for (var i = 0; i < this.numberOfCircles; i++) {
		var circle = new Circle(this, this.stage, this.layer);
		this.circleArray.push(circle);
		circle.updatePosition();
	}
}

Relaxation.prototype.generateRandomCoordinate = function() {
	var x = Math.random() * this.width;
	var y = Math.random() * this.height;
	var coord = [x, y];
	return coord;
}

Relaxation.prototype.addMouseEvents = function(layer){
	var mouseIsDown = false;
	var that = this;
	var mouseTracker = new Array();
	layer.on('mousedown', function() {
		mouseIsDown = true;
	});
	layer.on('mousemove', function() {
		if (mouseIsDown) {
			var mousePos = that.stage.getMousePosition();
			mouseTracker.push(mousePos);
			var mouseX = mousePos.x;
			var mouseY = mousePos.y;
			if (mouseTracker.length > 2) {
				for (var i = 0; i < that.circleArray.length; i++) {
					if (Math.abs(that.circleArray[i].circleObject.getPosition().x - mouseX) < 200) {
						if (Math.abs(that.circleArray[i].circleObject.getPosition().y - mouseY) < 200) {
							that.circleArray[i].circleObject.move(
								mouseTracker[1].x - mouseTracker[0].x,
								mouseTracker[1].y - mouseTracker[0].y
							);
						}
					}
				}
				mouseTracker.shift();
			}
		}
	});
	layer.on('mouseup', function() {
		mouseIsDown = false;
	});
}
