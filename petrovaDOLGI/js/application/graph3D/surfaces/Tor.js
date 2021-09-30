Surface.prototype.Tor = (a, b, pointCount, ringsCount) => {
    a = a || 3;
    b = b || 3;
    pointCount = pointCount || 30;
    ringsCount = ringsCount || 30;
    let dv = Math.PI / pointCount * 2;
    let du = Math.PI / ringsCount * 2;
    let points = [];
    let edges = [];
    let polygons = [];
    for(let u = -Math.PI; u <= Math.PI; u += du){
        for(let v = -Math.PI; v <= Math.PI; v += dv){
            let x = Math.cos(u)*(Math.cos(v) + a);
            let y = Math.sin(u)*(Math.cos(v) + b);
            let z = Math.sin(v);
            points.push(new Point(x, y, z));
        }
    }
    for (let i = 0; i < points.length; i++){
        if((i + 1) < points.length){
            edges.push(new Edge(i, i + 1));
        }
        else{
            edges.push(new Edge(i, 0));
        }
        if((i + pointCount+1) < points.length){
            edges.push(new Edge(i, i + pointCount+1));
        }
        if((i + 1 + pointCount+1) < points.length){
            polygons.push(new Polygon([i, i + pointCount+1, i + 2 + pointCount, i + 1]));
        }
    }
    return new Subject(points, edges, polygons);
}
