// эллиптический параболоид
Surface.prototype.ellipticalParaboloid = (x0 = 0, y0 = 0, z0 = 0, a = 5, b = 5, c = 5, pointCount = 20) => {
    const points = [];
    const edges = [];
    const polygones = [];

    const twoPI = Math.PI * 2;
    const dt = twoPI / pointCount;
    for (let u = 0; u <= 2; u += 0.5) {
        var y = c * Math.cosh(u) + y0;
        for (let t = 0; t < twoPI; t += dt) {
            var x = a * Math.sinh(u) * Math.cos(t) + x0;
            var z = b * Math.sinh(u) * Math.sin(t) + z0;
            points.push(new Point(x, y, z));
        }
    }
    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % pointCount !== 0) {
            edges.push(new Edge(i, i + 1));
        } else {
            if ((i + 1) % pointCount === 0) {
                edges.push(new Edge(i, i + 1 - pointCount));
            }
        }
        if (i + pointCount < points.length) {
            edges.push(new Edge(i, i + pointCount));
        }
    }
    for (let i = 0; i < points.length; i++) {
        if ((i + 1 + pointCount) < points.length && ((i + 1) % pointCount) != 0) {
            polygones.push(new Polygon([i, i + 1, i + 1 + pointCount, i + pointCount]));
        } else {
            if ((i + pointCount) < points.length && ((i + 1) % pointCount) == 0) {
                polygones.push(new Polygon([i, i - pointCount + 1, i + 1, i + pointCount]));
            }
        }
    }
    return new Subject(points, edges, polygones);
};
