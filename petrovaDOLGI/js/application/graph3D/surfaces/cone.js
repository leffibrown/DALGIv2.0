// конус
Surface.prototype.cone = (x = 0, y = 0, z = 0, r = 2, h = 5, steps = 10) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPoints() {
        points.push(new Point(x, y, z));
        for (let i = 0; i < h; i += h / steps) {
            for (let j = 0; j < Math.PI * 2; j += Math.PI * 2 / steps) {
                const radius = r * (1 - i / h);
                const px = radius * Math.cos(j);
                const py = radius * Math.sin(j);
                points.push(new Point(x + px, y + py, z + i));
            }
        }
        points.push(new Point(x, y, z + h));
    }

    function createBaseEdges() {
        for (let i = 1; i <= steps; ++i) {
            edges.push(new Edge(0, i));
        }
        for (let i = 1; i < steps; ++i) {
            edges.push(new Edge(i, i + 1));
        }
        edges.push(new Edge(1, steps));
    }

    function createVertEdges() {
        for (let i = 1; i <= steps; ++i) {
            for (let j = 0; j < steps - 1; ++j) {
                edges.push(new Edge(
                    i + j * steps, 
                    i + (j + 1) * steps
                ));
            }
        }
    }

    function createHorzEdges() {
        for (let i = 0; i < steps; ++i) {
            for (let j = 1; j < steps; ++j) {
                let a = j + i * steps;
                let b = (j + 1) + i * steps;
                edges.push(new Edge(a, b));
            }
        }
        for (let i = 0; i < steps; ++i) {
            edges.push(new Edge(1 + steps * i, 10 + steps * i));
        }
    }

    function createTopEdges() {
        for (let i = 1; i <= steps; ++i) {
            edges.push(new Edge(
                steps * steps + 1, 
                steps * (steps - 1) + i
            ));
        }
    }

    function createEdges() {
        createBaseEdges();
        createVertEdges();
        createHorzEdges();
        createTopEdges();
    }

    function createBasePolygons() {
        for (let i = 1; i < steps; ++i) {
            polygones.push(new Polygon([0, i, i + 1]));
        }
        polygones.push(new Polygon([0, 1, steps]));
    }

    function createTopPolygons() {
        for (let i = 1; i < steps; ++i) {
            polygones.push(new Polygon([
                steps * steps + 1, 
                steps * (steps - 1) + i, 
                steps * (steps - 1) + (i+1)
            ]));
        }
    }

    function createPolygons() {
        createBasePolygons();
        for (let j = 0; j < steps; ++j) {
            for (let i = 1; i < steps; ++i) {
                polygones.push(new Polygon([
                    i, 
                    i+1, 
                    (i+1) + j * steps,
                    i + j * steps, 
                ]));
            }
        }
        createTopPolygons();
    }

    createPoints();
    createEdges();
    createPolygons();
    return new Subject(points, edges, polygones);
};
