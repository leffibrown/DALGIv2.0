class Graph2DComponent extends Component {
    constructor(options) {
        super(options);
        this.funcs = [];
        this.WINDOW = {
            left: -10,
            bottom: -10,
            width: 20,
            height: 20
        }
        this.graph = new Graph2D({
            id: "canvas",
            width: 800, 
            height: 800,
            WINDOW: this.WINDOW,
            callbacks: {
                mouseUp: this.mouseUp,
                mouseDown: this.mouseDown,
                mouseMove: this.mouseMove,
                mouseWheel: this.mouseWheel,
                mouseOut: this.mouseOut
            }
        });
        this.ui = new UI({
            callbacks: {
                enterFunction: this.enterFunction,
                removeFunction: this.removeFunction,
                setIntegral: this.setIntegral,
                setDerivative: this.setDerivative
            }
        });
        this.canDragGraph = false;
        this.mouseX = 0;
        this.drawGraph();
    }

    mouseWheel = (event) => {
        var zoomStep = 1;
        var delta = event.deltaY > 0 ? zoomStep : -zoomStep;
        if (this.WINDOW.width + delta > 0)
        {
            this.WINDOW.width += delta;
            this.WINDOW.height += delta;
            this.WINDOW.left -= delta / 2;
            this.WINDOW.bottom -= delta / 2;
        }
        this.drawGraph();
    }

    mouseMove = (event) => {
        if (this.canDragGraph)
        {
            this.WINDOW.left += -event.movementX / this.graph.getUnitPixelSizeX();
            this.WINDOW.bottom += event.movementY / this.graph.getUnitPixelSizeY();
        }
        this.mouseX = this.WINDOW.left + (event.offsetX / this.graph.getUnitPixelSizeX());
        this.drawGraph();
    }

    mouseDown = () => {
        this.canDragGraph = true;
    }

    mouseUp = () => {
        this.canDragGraph = false;
    }

    mouseOut = () => {
        this.canDragGraph = false;
    }

	findFuncZero(func, start, end, eps = 0.01) {
		var x;
		var a = start;
		var b = end;
		eps *= 2; 
		while (Math.abs(a - b) > eps)
		{
			x = (a + b) / 2;
			if (func(a) * func(x) < 0) {
                b = x;
            }
			else {
                a = x;
            }
		}
		x = (a + b) / 2;
		if (Math.abs(func(x) - 0) > eps)
			return null;
		else
			return x;
	}

    markFuncZeros(func, a, b) {
		var iterCount = 10;
		var delta = Math.abs(b - a) / iterCount;
		var startX = a;
		for (var i = 0; i < iterCount; ++i)
		{
			var endX = startX + delta;
			var zeroX = this.findFuncZero(func, startX, endX, 0.001);
			if (zeroX != null) {
				this.graph.drawPoint(zeroX, func(zeroX), "red", 1);
			}
			startX = endX;
		}
	}

    getTangentFunc(f)
    {
        var ctx = this;
        return function(x) {
            var x0 = ctx.mouseX;
            var k = ctx.getDerivative(f, x0);
            var b = f(x0);
            return k * (x - x0) + b;
        }
    }

    getTangentIntersectX(f)
    {
        var x0 = this.mouseX;
        var k = this.getDerivative(f, x0);
        var b = f(x0);
        return -b / k + x0; 
    }

    getDerivative(func, x)
    {
        var deltaX = 0.001;
        var deltaY = func(x + deltaX) - func(x);
        return deltaY / deltaX;
    }

    calcIntegral(f, a, b) {
        var dx = (b - a) / 1000;
        var x = a;
        var sum = 0;
        while (x <= b) {
            sum += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 * dx;
            x += dx;
        }
        return sum;
    }

    enterFunction = (func, num, color, width) => {
        this.funcs[num] = {
            func,
            color,
            width
        };
        this.drawGraph();
    }

    removeFunction = (num) => {
        this.funcs[num] = null;
        this.drawGraph();
    }

    setIntegral = (isChecked, num) => {
        if (this.funcs[num]) {
            this.funcs[num].integral = isChecked;
            this.drawGraph();
        }
    }

    setDerivative = (isChecked, num) => {
        if (this.funcs[num]) {
            this.funcs[num].derivative = isChecked;
            this.drawGraph();
        }
    }
    drawFuncGraph(func, color, lineWidth, subdivCount = 1000) {
		var startX = this.WINDOW.left;
		var deltaX = this.WINDOW.width / subdivCount;
		for (var i = 0; i < subdivCount - 1; ++i)
		{
			var x = startX + deltaX * i;
			this.graph.drawLine(x, func(x), x + deltaX, func(x + deltaX), color, lineWidth);
		}
	}

    drawFuncIntegral(f, a, b) {
		const divCount = 100;
        if (!isNaN(a) && !isNaN(b) && a != b) 
        {
            if (a > b) 
            {
                var tmp = b;
                b = a;
                a = temp;
            }
            var dx = (b - a) / divCount;
            var x = a;
            var points = [];
            points.push({x: a, y: 0});
            while (x <= b) {
                points.push({x, y: f(x)});
                x += dx;
            }
            points.push({x: b, y: 0});
            this.graph.drawPolygon(points);
        }
    }

	drawDerivAngle(intersectX, derValue)
	{
		var arcAngle = Math.atan(derValue);
		var text = "tg a = " + derValue.toFixed(2);
		
		if (arcAngle < 0)
			arcAngle -= Math.PI;

        this.graph.drawText(intersectX, 0, text, 12, 25, 0, "#7b917b", true);
        this.graph.drawArc(intersectX, 0, 25, 0, arcAngle);
	}
	
    drawGraph() {
        this.graph.clear();
        this.graph.drawAxes();
        
        for (var i = 0; i < this.funcs.length; ++i)
        {
            if (this.funcs[i])
            {
                this.drawFuncGraph(this.funcs[i].func, this.funcs[i].color, this.funcs[i].width);
                this.markFuncZeros(this.funcs[i].func, 0, 4);

                if (this.funcs[i].integral) {
                    const values = this.ui.getAB();
                    const a = values.a;
                    const b = values.b;
                    this.drawFuncIntegral(this.funcs[i].func, a, b);
                    this.graph.drawText((b-a) / 2, 0, "TODO INTEGRAL VALUE", 12, 25, 0, "#7b917b", true);
                }

                if (this.funcs[i].derivative) {
                    this.drawFuncGraph(this.getTangentFunc(this.funcs[i].func), "green", this.funcs[i].width);
                    var intersectX = this.getTangentIntersectX(this.funcs[i].func);
                    this.drawDerivAngle(intersectX, this.getDerivative(this.funcs[i].func, this.mouseX));
                }
            }
        }
    }
}