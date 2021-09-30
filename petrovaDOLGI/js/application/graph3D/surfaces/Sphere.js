// сфера
Surface.prototype.sphere = (x = 0, y = 0, z = 0, radius = 4, step = 12) => {
    const points = [];
    const edges = [];
    const polygones = [];

    function createPointFromSpherical(radius, zenith, azimuth) {
        let px = radius * Math.sin(zenith) * Math.cos(azimuth);
        let py = radius * Math.sin(zenith) * Math.sin(azimuth);
        let pz = radius * Math.cos(zenith);
        return new Point(x + px, y + py, z + pz);
    }

    function createPoints(x, y, z, radius) {
        const zenithStep = Math.PI / step;
        const azimuthStep = 2 * Math.PI / step;
        points.push(createPointFromSpherical(radius, 0, 0));
        for (let j = 0; j < step; ++j) {
            let azimuth = azimuthStep * j;
            for (let i = 1; i < step; ++i) {
                let zenith = zenithStep * i;
                const point = createPointFromSpherical(radius, zenith, azimuth);
                points.push(point);
            }
        }
        points.push(createPointFromSpherical(radius, Math.PI, 0));
    }

    function createUpperCupEdges() {
        for (let i = 0; i < step - 1; ++i) {
            edges.push(new Edge(1 + (step - 1) * i, 0));
            edges.push(new Edge(1 + (step - 1) * i, 1 + (step - 1) * (i+1)));
        }
        edges.push(new Edge(0, 1 + (step - 1) * (step - 1)));
        edges.push(new Edge(1, 1 + (step - 1) * (step - 1)));
    }

    function createLowerCupEdges() {
        const lastIndex = ((step - 1) * step) + 1;
        for (let i = 1; i < step; ++i) {
            edges.push(new Edge((step - 1) * i, lastIndex));
            edges.push(new Edge((step - 1) * i, (step - 1) * (i+1)));
        }
        edges.push(new Edge(lastIndex - 1, lastIndex));
        edges.push(new Edge(lastIndex - 1, step - 1));
    }

    function createVertEdges() {
        for (let j = 0; j < step; ++j) {
            for (let i = 1; i < step - 1; ++i) {
                const a = (step - 1) * j;
                edges.push(new Edge(a + i, a + i + 1));
            }
        }
    }

    function createHorzEdges() {
        for (let j = 0; j < step - 2; ++j) {
            for (let i = 0; i < step - 1; ++i) {
                edges.push(new Edge(2 + j + (step-1) * i, 2 + j + (i+1) * (step-1)));
            }
            edges.push(new Edge(2 + j, 2 + j + (step-1) * (step-1)));
        }
    }

    function createEdges() {
        createUpperCupEdges();
        createLowerCupEdges();
        createVertEdges();
        createHorzEdges();
    }

    function createMainPartPolys() {
        for (let i = 0; i < step - 1; ++i) {
            for (let j = 0; j < step - 2; ++j) {
                const index = j + i * (step - 1);
                polygones.push(new Polygon([
                    index + 1, 
                    index + 2,
                    step + index + 1,
                    step + index
                ]));
            }
        }
    }

    function createVertJointPolys() {
        for (let i = 0; i < step - 2; ++i) {
            const index = Math.pow(step - 1, 2);
            polygones.push(new Polygon([
                i + 1, 
                i + 2,
                i + index + 2,
                i + index + 1 
            ]));
        }
    }

    function createUpperCupPolys() {
        for (let i = 0; i < step - 1; ++i) {
            polygones.push(new Polygon([0, 1 + (step - 1) * i, 1 + (step - 1) * (i + 1)]));
        }
        polygones.push(new Polygon([0, 1, Math.pow(step - 1, 2) + 1]));
    }

    function createLowerCupPolys() {
        const lastIndex = ((step - 1) * step) + 1;
        for (let i = 0; i < step - 1; ++i) {
            polygones.push(new Polygon([lastIndex, (step - 1) * (i + 1), (step - 1) * (i + 2)]));
        }
        polygones.push(new Polygon([lastIndex, lastIndex - 1, step - 1]));
    }

    function createPolygons(step) {
        createMainPartPolys();
        createVertJointPolys();
        createUpperCupPolys();
        createLowerCupPolys();
    }

    createPoints(x, y, z, radius, step);
    createEdges(step);
    createPolygons(step);
    return new Subject(points, edges, polygones);
}
