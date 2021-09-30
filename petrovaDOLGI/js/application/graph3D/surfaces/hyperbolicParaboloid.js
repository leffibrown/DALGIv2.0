// гиперболический параболоид
Surface.prototype.hyperbolicParaboloid = (px = 0, py = 0, pz = 0, p = 2, q = 2, count = 20) => {
    const points = [];
    const edges = [];
    const polygones = [];

    const LEFT = -10;
    const RIGHT = 10;
    const step = (RIGHT - LEFT) / count;

    // add points
    for (let x = LEFT; x < RIGHT; x += step) {
        for (let y = LEFT; y < RIGHT; y += step) {
            points.push(new Point(
                px + x,
                py + (x ** 2 / p - y ** 2 / q) / 2,
                pz + y
            ));
        }
    }

    // add edges 
    for (let i = 0; i < points.length; ++i) {
        if (points[i + 1] && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        }
        if (points[i + count]) {
            edges.push(new Edge(i, i + count));
        }
    }

    // add polygones
    for (let i = 0; i < points.length; ++i) {
        if (points[i + 1 + count] && (i + 1) % count !== 0) {
            polygones.push(new Polygon([
                i, 
                i + 1,
                i + 1 + count,
                i + count
            ]));
        }
    }

        // zebra popitka 100500
    for (let i = 0; i < polygones.length; ++i) {
        const a = Math.floor(i / count);
        if ((i + a) % 2 == 0) {
            polygones[i].color = {r: 255, g: 255, b: 255};
        }
        else {
            polygones[i].color = {r: 0, g: 0, b: 0};
        }
    }
    return new Subject(points, edges, polygones);
};
