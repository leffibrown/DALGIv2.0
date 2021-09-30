// сфера
Surface.prototype.Spheretest = (x, y, z, R, pointCount, ringCount) => {
    let x0 = x || 0;
    let y0 = y || 0;
    let z0 = z || 0;
    R = R || 6;                     
    ringCount = ringCount || 10;     
    pointCount = pointCount || 10;  
    let points = [];
    let edges = [];
    let polygons = [];
    let points2 = [];
    for (let beta = Math.PI / 2; beta >= -Math.PI / 2; beta -= Math.PI / ringCount) {
        let r = Math.cos(beta) * R;
        let height = Math.sin(beta) * R;
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI / pointCount * 2) {
            let x = Math.cos(alpha) * r + x0;
            let y = height + y0;
            let z = Math.sin(alpha) * r + z0;
            points.push(new Point(x, y, z));
        }
    }

    

    for (let i = 0; i < points.length; i++) {
        if (i % pointCount === 0 && i !== 0) {
            edges.push(new Edge(i, i + 1));
        } else {
            if (i + 1 < points.length && (i + 1) % pointCount !== 0) {
                edges.push(new Edge(i, i + 1));
            } else {
                edges.push(new Edge(i, i + 1 - pointCount));
            }
        }
        
        if (i + pointCount < points.length) {
                edges.push(new Edge(i, i + pointCount))
        }
        
    }
    for (let i = 0; i < points.length; i++) {
        if (i % 2 == 0) {                                                                                                  // watermellon
            if ((i + 1 + pointCount) < points.length && ((i + 1) % pointCount) != 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + pointCount, i + pointCount], '#228B22'));
            } else {
                if ((i + pointCount) < points.length && ((i + 1) % pointCount) == 0) {
                    polygons.push(new Polygon([i, i - pointCount + 1, i + 1, i + pointCount], '#228B22'));
                }
            }
        } else {
            if ((i + 1 + pointCount) < points.length && ((i + 1) % pointCount) != 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + pointCount, i + pointCount], '#0064001'));
            } else {
                if ((i + pointCount) < points.length && ((i + 1) % pointCount) == 0) {
                    polygons.push(new Polygon([i, i - pointCount + 1, i + 1, i + pointCount], '#0064001'));
                }
            }
        }
        
      

       
        if ((i + 1 + pointCount) < points.length && ((i + 1) % pointCount) != 0) {                                              // classic
            polygons.push(new Polygon([i, i + 1, i + 1 + pointCount, i + pointCount]));
        } else {
            if ((i + pointCount) < points.length && ((i + 1) % pointCount) == 0) {
                polygons.push(new Polygon([i, i - pointCount + 1, i + 1, i + pointCount]));
            }
        }
        
    }
    for (let beta = Math.PI / 2; beta >= -Math.PI / 2; beta -= Math.PI / ringCount) {
        let r = Math.cos(beta) * (R + 5);
        let height = Math.sin(beta) * (R + 5);
        for (let alpha = 0; alpha < Math.PI * 2; alpha += Math.PI / pointCount * 2) {
            let x = Math.cos(alpha) * r + x0;
            let y = height + y0;
            let z = Math.sin(alpha) * r + z0;
            points.push(new Point(x, y, z));
        }
    }

    for (let i = 0; i < (points.length)/2; i++) {
        if (i % pointCount === 0 && i !== 0) {
            edges.push(new Edge(i, (points.length)/2 + i));
        } else {
            if (i + 1 < points.length && (i + 1) % pointCount !== 0) {
                edges.push(new Edge(i, (points.length)/2 + i));
            } else {
                edges.push(new Edge(i, (points.length)/2 + i));
            }
        }
        
        if (i + pointCount < points.length) {
                edges.push(new Edge(i, i + pointCount))
        }
        
    }
    return new Subject(points, edges, polygons);
}