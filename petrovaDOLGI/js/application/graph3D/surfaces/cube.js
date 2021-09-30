// куб
Surface.prototype.cube = (x = 0, y = 0, z = 0, size = 10) => {
    return new Subject([
        new Point(x, y, z),
        new Point(x, y, z + size),
        new Point(x + size, y, z + size),
        new Point(x + size, y, z),
        new Point(x, y + size, z),
        new Point(x, y + size, z + size),
        new Point(x + size, y + size, z),
        new Point(x + size, y + size, z + size)
    ], [
        new Edge(0, 1),
        new Edge(1, 2),
        new Edge(2, 3),
        new Edge(3, 0),
        new Edge(4, 5),
        new Edge(5, 7),
        new Edge(6, 7),
        new Edge(4, 6),
        new Edge(0, 4),
        new Edge(1, 5),
        new Edge(3, 6),
        new Edge(7, 2),
    ], [
        new Polygon([0, 1, 2], "#0000ff"),
        new Polygon([0, 2, 3], "#0000ff"),
        new Polygon([0, 4, 5], "#00aa55"),
        new Polygon([0, 1, 5], "#00aa55"),
        new Polygon([0, 3, 4], "#aa2233"),
        new Polygon([3, 4, 6], "#aa2233"),
        new Polygon([1, 2, 5], "#227700"),
        new Polygon([2, 7, 5], "#227700"),
        new Polygon([3, 6, 7], "#ffaa00"),
        new Polygon([3, 2, 7], "#ffaa00"),
        new Polygon([5, 4, 6], "#00ffff"),
        new Polygon([6, 7, 5], "#00ffff")
    ]);
};