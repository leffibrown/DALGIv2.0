// однополостной гиперболоид
Surface.prototype.oneSheetHyperboloid = (x = 0, y = 0, z = 0, count = 10) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPoints() { 
        const angleStep = Math.PI * 2 / count;
        for (let z = -count; z <=count; z++) {
            const r = Math.sqrt(1 + z * z);
            for (let a = 0; a < Math.PI * 2; a += angleStep) {
                points.push(new Point(
                    r * Math.cos(a),
                    r * Math.sin(a),
                    z
                ));
            }
        }      
    }

    function createEdges() {
        for (let i = 0; i < points.length; ++i) {
            if (points[i + 1]) {
                if ((i + 1) % count == 0) {
                    edges.push(new Edge(i, i + 1 - count));
                }
                else {
                    edges.push(new Edge(i, i + 1));
                }
            }

            if (points[i + count]) {
                edges.push(new Edge(i, i + count));
            }
        }
    }

    function createPolygons() {
        for (let i = 0; i < points.length; ++i) { 
            if ((i + 1) % count == 0) {
                if (points[i + count]) {
                    polygones.push(
                        new Polygon([
                            i,
                            i + 1 - count,
                            i + 1,
                            i + count
                        ])
                    );
                }
            }
            else {
                if (points[i + count + 1]) {
                    polygones.push(
                        new Polygon([
                            i,
                            i + 1,
                            i + 1 + count,
                            i + count
                        ])
                    );
                }
            }
        }
    }

    createPoints();
    createEdges();
    createPolygons();
    return new Subject(points, edges, polygones);
};
