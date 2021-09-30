// эллипсоид
// x^2/a^2 + y^2/b^2 + z^2/c^2 = 1
Surface.prototype.ellipsoid = (x = 0, y = 0, z = 0, a = 2, b = 2, c = 3, count = 10) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPoints() {  
        const left = -c;
        const right = c;
        const step = (right - left) / count;
        points.push(new Point(x, y, z - c));
        for (let pz = -c; pz < c; pz += step) {
            const pi2 = 2 * Math.PI;
            const angleStep = pi2 / count;
            const radius = Math.sqrt(1 - (pz ** 2) / (c ** 2));
            if (radius < 0.001)
                continue;
            for (let angle = 0; angle < pi2; angle += angleStep) {
                const px = a * Math.cos(angle) * radius;
                const py = b * Math.sin(angle) * radius;
                points.push(new Point(x + px, y + py, z + pz));
            }
        }
        points.push(new Point(x, y, z + c));
    }

    function createEdges() {
        // upper cup
        for (let i = 1; i < count; ++i) {
            edges.push(new Edge(i, 0));
            edges.push(new Edge(i, i + 1));
        }
        edges.push(new Edge(0, count));
        edges.push(new Edge(1, count));

        // vertical edges
        for (let i = 1; i <= count; ++i) {
            for (let j = 0; j < count - 2; ++j) {
                edges.push(new Edge(
                    i + j * count, 
                    i + (j + 1) * count
                ));
            }
        }

        // horizontal edges
        for (let j = 0; j < count - 1; ++j) {
            for (let i = 0; i < count; ++i) {
                edges.push(new Edge(
                    (i+1) + j * count, 
                    (i+1) % count + 1 + j * count
                ));
            }
        }

        // lower cup
        const lastIndex = count * (count - 1) + 1;
        for (let i = 0; i < count; ++i) {
            edges.push(new Edge(
                lastIndex, 
                i + 1 + count * (count - 2)
            ));
        }
    }

    function createPolygons() {
        // upper cup
        for (let i = 1; i < count; ++i) {
            polygones.push(new Polygon([0, i, i + 1]));
        }
        polygones.push(new Polygon([0, 1, count]));

        // main part
        for (let i = 0; i < count - 2; ++i) {
            for (let j = 0; j < count; ++j) {
                polygones.push(new Polygon([
                    j + 1 + i * count, 
                    j + 1 + (i + 1) * count,
                    ((j + 1) % count + 1) + (i + 1) * count,
                    ((j + 1) % count + 1) + i * count
                ]));
            }
        }

        // lower cup
        const lastIndex = count * (count - 1) + 1;
        for (let i = 0; i < count; ++i) {
            polygones.push(new Polygon([
                lastIndex, 
                i + 1 + count * (count - 2),
                i + 2 + count * (count - 2)
            ]));
        }
        polygones.push(new Polygon([
            lastIndex, 
            lastIndex - 1,
            1 + count * (count - 2)
        ]));
    }

    createPoints();
    createEdges();
    createPolygons();
    return new Subject(points, edges, polygones);
};
