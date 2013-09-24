/* Circle Class */

function Circle(relaxation, stage, layer) {
	this.relaxation = relaxation;
	this.stage = stage;
	this.layer = layer;
	this.coord = relaxation.generateRandomCoordinate();
	this.colors = this.getRandomColors();
	this.radius = (Math.random() * 60) + 5;
	this.strokeWidth = Math.floor(this.radius/10) + 2;
	this.x = this.coord[0];
	this.y = this.coord[1];
	if (this.x - this.radius < 0) this.x+=this.radius;
	if (this.x + this.radius > relaxation.width) this.x-=this.radius;
	if (this.y - this.radius < 0) this.y+=this.radius;
	if (this.y + this.radius > relaxation.height) this.y-=this.radius;
	this.dx = Math.random() * 2 + 0.1; //speed in x direction
	this.dy = Math.random() * 2 + 0.1; //speed in y direction
	this.draw();
}

Circle.prototype.getRandomColors = function() {
	var colors = new Array();
	var randomNo = Math.random();
	var redOne = Math.floor(32 * randomNo) + 133; //165
	var greenOne = Math.floor(42 * randomNo) + 173; //215
	var blueOne = Math.floor(43 * randomNo) + 176; //219
	var redTwo = Math.floor(16 * randomNo) + 99; //165
	var greenTwo = Math.floor(21 * randomNo) + 133; //215
	var blueTwo = Math.floor(21 * randomNo) + 137; //219
	var alpha = (0.4 * Math.random()) + 0.6;
	colors[0] = 'rgba('+redOne+','+greenOne+','+blueOne+','+alpha+')';
	colors[1] = 'rgba('+redTwo+','+greenTwo+','+blueTwo+','+alpha+')';
	colors[2] = 'rgb('+redOne+','+greenOne+','+blueOne+')';
	return colors;
}

Circle.prototype.draw = function() {
	this.circleObject = new Kinetic.Circle({
		x: this.x,
		y: this.y,
		radius: this.radius,
		fillRadialGradientStartPoint: 0,
		fillRadialGradientStartRadius: 0,
		fillRadialGradientEndPoint: 0,
		fillRadialGradientEndRadius: this.radius,
		fillRadialGradientColorStops: [0, this.colors[0], 1, this.colors[1]],
		stroke: this.colors[2],
		strokeWidth: this.strokeWidth
	});
	this.layer.add(this.circleObject);
}

Circle.prototype.updatePosition = function() {
	var that = this;
	var anim = new Kinetic.Animation(function(frame) {
		if ((that.circleObject.getPosition().x - that.radius) <= 0 || (that.circleObject.getPosition().x + that.radius) >= that.relaxation.width) {
			that.dx = -that.dx;
		}
		if ((that.circleObject.getPosition().y - that.radius) <= 0 || (that.circleObject.getPosition().y + that.radius) >= that.relaxation.height) {
			that.dy = -that.dy;
		}
		that.x+=that.dx;
		that.y+=that.dy;
		that.circleObject.setX(that.x);
		that.circleObject.setY(that.y);
	}, that.layer);
	anim.start();
}



