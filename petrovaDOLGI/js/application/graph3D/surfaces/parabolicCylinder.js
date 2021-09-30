// параболический цилиндр
Surface.prototype.parabolicCylinder = (x = 0, y = 0, z = 0, a = -2, b = 2, h = 8, count = 15) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPoints() {
        const step = (b - a) / (count - 1);
        for (let pz = 0; pz <= h; pz += h / (count - 1)) {
            for (let px = a; px <= b; px += step) {
                points.push(new Point(x + px, y + px ** 2, z + pz));
            }
        }
    }

    function createEdges() {
        for (let i = 0; i < points.length; ++i) {
            if ((i+1) % count != 0) {
                edges.push(new Edge(i, i+1));
            }
        }

        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count - 1; ++j) {
                edges.push(new Edge(i + j * count, i + (j+1) * count));
            }
        }
    }

    function createPolygons() {
        for (let i = 0; i < count - 1; ++i) {
            for (let j = 0; j < count - 1; ++j) {
                polygones.push(new Polygon([
                    i * count + j,
                    (i + 1) * count + j, 
                    (i + 1) * count + (j + 1),
                    i * count + (j + 1),
                ]));
            }
        }
    }

    createPoints();
    createEdges();
    createPolygons();
    return new Subject(points, edges, polygones);
};
