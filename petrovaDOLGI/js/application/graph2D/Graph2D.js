class Graph2D {
	constructor({id, width = 640, height = 480, WINDOW = {}, callbacks}) {
		if (id) {
			this.canvas = document.getElementById(id);
		} else {
			this.canvas = document.createElement("canvas");
			document.querySelector("body").appendChild(this.canvas);
		}

		this.ctx = this.canvas.getContext('2d');
		this.WINDOW = WINDOW;
		this.canvas.width = width;
		this.canvas.height = height;
		if (callbacks) 
		{
			this.canvas.addEventListener('mouseup', callbacks.mouseUp);
			this.canvas.addEventListener('mousedown', callbacks.mouseDown);
			this.canvas.addEventListener('mousemove', callbacks.mouseMove);
			this.canvas.addEventListener('mouseout', callbacks.mouseOut);
			this.canvas.addEventListener('wheel', callbacks.mouseWheel);
		}
	}

	drawArrowVert(x, y, length) {
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.moveTo(this.xs(x) - length / 6, this.ys(y) + length);
		this.ctx.lineTo(this.xs(x) + length / 6, this.ys(y) + length);
		this.ctx.lineTo(this.xs(x), this.ys(y));
		this.ctx.fill();
	};

	drawArrowHorz(x, y, length) {
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.moveTo(this.xs(x) - length, this.ys(y) - length / 6);
		this.ctx.lineTo(this.xs(x) - length, this.ys(y) + length / 6);
		this.ctx.lineTo(this.xs(x), this.ys(y));
		this.ctx.fill();
	};

	drawPolygon(points, color) {
		this.ctx.fillStyle = color || "#ff880055";
		this.ctx.beginPath();
		this.ctx.moveTo(this.xs(points[0].x), this.ys(points[0].y));
		for (var i = 1; i < points.length; ++i) {
			this.ctx.lineTo(this.xs(points[i].x), this.ys(points[i].y));
		}
		this.ctx.lineTo(this.xs(points[0].x), this.ys(points[0].y));
		this.ctx.closePath();
		this.ctx.fill();
	};

	drawText(x, y, text, textSize, marginUp = 0, marginRight = 0, color, addStroke = false) {
		this.drawTextPx(this.xs(x), this.ys(y), text, textSize, marginUp, marginRight, color, addStroke);
	};

	drawTextPx(x, y, text, textSize, marginUp = 0, marginRight = 0, color, addStroke) {
		this.ctx.fillStyle = color || "black";
		this.ctx.strokeStyle = "black";
		this.ctx.lineWidth = 0.5;
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		this.ctx.font = (textSize || 12) + "px Consolas";
		this.ctx.fillText(text, x + marginRight, y - marginUp);

		if (addStroke) {
			this.ctx.strokeText(text, x + marginRight, y - marginUp);
		}
	};

	drawArc(x, y, radius, startAngle, endAngle) {
		this.ctx.strokeStyle = "blue";
		this.ctx.lineWidth = 2;
		this.ctx.beginPath();
		this.ctx.arc(this.xs(x), this.ys(y), radius, startAngle, (2 * Math.PI) - endAngle, true);
		this.ctx.stroke();
	};

	xs(x) {
		return (x - this.WINDOW.left) / this.WINDOW.width * this.canvas.width;
	};

	ys(y) {
		return this.canvas.height - ((y - this.WINDOW.bottom) / this.WINDOW.height * this.canvas.height);
	};

	getUnitPixelSizeX() {
		return this.canvas.width / this.WINDOW.width;
	};

	getUnitPixelSizeY() {
		return this.canvas.height / this.WINDOW.height;
	};

	clear(color = 'white') {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	drawLine(x1, y1, x2, y2, color, lineWidth) {
		this.ctx.beginPath();
		this.ctx.strokeStyle = color || "black";
		this.ctx.lineWidth = lineWidth || 1;
		this.ctx.moveTo(this.xs(x1), this.ys(y1));
		this.ctx.lineTo(this.xs(x2), this.ys(y2));
		this.ctx.stroke();
	};

	drawPoint(x, y, color, radius) {
		let pointRadius = radius || 3;
		this.ctx.beginPath();
		this.ctx.fillStyle = color || "black";
		this.ctx.arc(this.xs(x), this.ys(y), pointRadius, 0, 2 * Math.PI);
		this.ctx.fill();
	};

	drawAxes() {
		var textMargin = 12;
		var textSize = 12;
		var arrowLength = 25;
		var axisLineWidth = 1;
		var markupLineWidth = 0.5;

		// y-axis line & arrow
		this.drawLine(0, this.WINDOW.bottom, 0, this.WINDOW.bottom + this.WINDOW.height, "#222", axisLineWidth);
		this.drawArrowVert(0, this.WINDOW.bottom + this.WINDOW.height, arrowLength);

		// x-axis line & arrow
		this.drawLine(this.WINDOW.left, 0, this.WINDOW.left + this.WINDOW.width, 0, "#222", axisLineWidth);
		this.drawArrowHorz(this.WINDOW.left + this.WINDOW.width, 0, arrowLength);

		for (var i = this.WINDOW.bottom; i < (this.WINDOW.bottom + this.WINDOW.height); ++i) {
			// horizontal lines & y-axis markup
			var lineX = this.WINDOW.left;
			var lineY = Math.round(i);
			this.drawLine(lineX, lineY, lineX + this.WINDOW.width, lineY, "#666", markupLineWidth);
			this.drawText(0, lineY, i.toFixed(0), textSize, 0, textMargin);
		}

		for (var i = this.WINDOW.left; i < (this.WINDOW.left + this.WINDOW.width); ++i) {
			// vertical line & x-axis markup
			var lineX = Math.round(i);
			var lineY = this.WINDOW.bottom;
			this.drawLine(lineX, lineY, lineX, lineY + this.WINDOW.height, "#666", markupLineWidth);
			this.drawText(lineX, 0, i.toFixed(0), textSize, textMargin);
		}
	};
}
