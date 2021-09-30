// эллиптический цилиндр
Surface.prototype.ellipticalCylinder = (x = 0, y = 0, z = 0, a = 4, b = 4, height = 5, pointCount = 20) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPoints() {              
        for (let pz = -height; pz <= height; pz += 1) {
            const pi2 = 2 * Math.PI;
            const angleStep = pi2 / pointCount;
            for (let angle = 0; angle < pi2; angle += angleStep) {
                const px = a * Math.cos(angle);
                const py = b * Math.sin(angle);
                points.push(new Point(x + px, y + py, z + pz));
            }
        }
    }

    function createHorzEdges() {
        const stepCount = points.length / pointCount;
        for (let j = 0; j < stepCount; ++j) {
            for (let i = 0; i < pointCount; ++i) {
                const p1 = i;
                const p2 = (i + 1) % pointCount;
                edges.push(new Edge(p1 + j * pointCount, p2 + j * pointCount));
            }
        }
    }

    function createVertEdges() {
        const stepCount = points.length / pointCount;
        for (let j = 0; j < pointCount; ++j) {
            for (let i = 0; i < stepCount - 1; ++i) {
                edges.push(new Edge(pointCount * i + j, pointCount * (i+1) + j));
            }
        }
    }

    function createEdges() {
        createHorzEdges();
        createVertEdges();
    }

    function createPolygons() 
    {
        const levelCount = points.length / pointCount;
        for (let j = 0; j < levelCount - 1; ++j) {
            for (let i = 0; i < pointCount; ++i) {
                polygones.push(new Polygon([
                    i + j * pointCount, 
                    i + (j+1) * pointCount, 
                    (i+1) % pointCount + (j+1) * pointCount,
                    (i+1) % pointCount + j * pointCount
                ]));
            }
        }
    }

    createPoints();
    createEdges();
    createPolygons();
    return new Subject(points, edges, polygones);
};
