// гиперболический цилиндр
Surface.prototype.hyperbolicCylinder = (x = 0, y = 0, z = 0, w = 4, h = 8, count = 10) => {
    const points = [];
    const edges = [];
    const polygones = [];

    // points
    const step = w / count;
    for (let pz = 0; pz <= h; pz += h / count) {
        for (let px = step; px <= w; px += step) {
            points.push(new Point(x + px, y + 1 / px, z + pz));
        }
    }
    for (let pz = 0; pz <= h; pz += h / count) {
        for (let px = -step; px >= -w; px -= step) {
            points.push(new Point(x + px, y + 1 / px, z + pz));
        }
    }
    
    // edges
    for (let i = 0; i < points.length; ++i) {
        if ((i+1) % count != 0) {
            edges.push(new Edge(i, i+1));
        }
    }
    for (let k = 0; k < 2; ++k) {
        let offset = k * (count * (count + 1));
        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count; ++j) {
                edges.push(new Edge(offset + i + j * count, offset + i + (j+1) * count));
            }
        }
    }

    // polygones
    for (let k = 0; k < 2; ++k) {
        let offset = k * (count * (count + 1));
        for (let i = 0; i < count; ++i) {
            for (let j = 0; j < count - 1; ++j) {
                polygones.push(new Polygon([
                    offset + i * count + j,
                    offset + (i + 1) * count + j, 
                    offset + (i + 1) * count + (j + 1),
                    offset + i * count + (j + 1),
                ]));
            }
        }
    }

    return new Subject(points, edges, polygones);
};
