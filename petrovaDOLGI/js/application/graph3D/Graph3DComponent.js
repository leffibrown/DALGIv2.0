class Graph3DComponent extends Component {
    constructor(options) {
        super(options);
        this.WINDOW = {
            left: -5,
            bottom: -5, 
            width: 10,
            height: 10,
            center: new Point(0, 0, -40),
            camera: new Point(0, 0, -50)
        }
        this.LIGHT = new Light(-30, 0, 30, 32000);
        this.surface = new Surface();
        this.graph2D = new Graph2D({ 
            id: "graph3D", 
            WINDOW: this.WINDOW,
            width: 800,
            height: 600
        });
        this.graph3D = new Graph3D({ WINDOW: this.WINDOW });
        this.canRotate = false;
        this.showPoints = true;
        this.showPointNums = true;
        this.showEdges = true;
        this.showPolygones = true;
        this.subjects = [];
        this.dx = 0;
        this.dy = 0;
        this.addSubjects();
        this.printScene();
    }
    
    addEventListeners() {
        document.getElementById("graph3D").addEventListener("mouseup", () => this.mouseup());
        document.getElementById("graph3D").addEventListener("mousedown", (event) => this.mousedown(event));
        document.getElementById("graph3D").addEventListener("mouseleave", () => this.mouseleave());
        document.getElementById("graph3D").addEventListener("mousemove", (event) => this.mousemove(event));
        document.getElementById("graph3D").addEventListener("wheel", (event) => this.mousewheel(event));
        document.getElementById("togglePoints").addEventListener("change", () => {
            this.showPoints = !this.showPoints;
            this.printScene();
        });
        document.getElementById("toggleEdges").addEventListener("change", () => {
            this.showEdges = !this.showEdges;
            this.printScene();
        });
        document.getElementById("togglePolygones").addEventListener("change", () => {
            this.showPolygones = !this.showPolygones;
            this.printScene();
        });
        document.getElementById("togglePointNums").addEventListener("change", () => {
            this.showPointNums = !this.showPointNums;
            this.printScene();
        });
        document.getElementById('currentSubject').addEventListener("change", () => {
            let subjectName = document.getElementById('currentSubject').value;
            if (subjectName == "sphere") {
                this.subjects[0] = this.surface.sphere();
            }
            if (subjectName == "cube") {
                this.subjects[0] = this.surface.cube(-5, -5);
            }
            if (subjectName == "cone") {
                this.subjects[0] = this.surface.cone();
            }
            if (subjectName == "ellipticalCylinder") {
                this.subjects[0] = this.surface.ellipticalCylinder();
            }
            if (subjectName == "parabolicCylinder") {
                this.subjects[0] = this.surface.parabolicCylinder();
            }
            if (subjectName == "hyperbolicCylinder") {
                this.subjects[0] = this.surface.hyperbolicCylinder();
            }
            if (subjectName == "oneSheetHyperboloid") {
                this.subjects[0] = this.surface.oneSheetHyperboloid();
            }
            if (subjectName == "twoSheetHyperboloid") {
                this.subjects[0] = this.surface.twoSheetHyperboloid();
            }
            if (subjectName == "ellipticalParaboloid") {
                this.subjects[0] = this.surface.ellipticalParaboloid();
            }
            if (subjectName == "hyperbolicParaboloid") {
                this.subjects[0] = this.surface.hyperbolicParaboloid();
            }
            if (subjectName == "ellipsoid") {
                this.subjects[0] = this.surface.ellipsoid();
            }
            this.printScene();
        });
    }

    clear() {
        this.graph2D.clear('#bbb');
    }

    addSubjects() {
        this.subjects.push(this.surface.sphere());
    }

    printEdges(subject) {
        for (let i = 0; i < subject.edges.length; ++i) {
            const edge = subject.edges[i];
            const p1 = subject.points[edge.p1];
            const p2 = subject.points[edge.p2];
            this.graph2D.drawLine(this.graph3D.xs(p1), this.graph3D.ys(p1), this.graph3D.xs(p2), this.graph3D.ys(p2))
        }
    }

    printPoints(subject) {
        for (let i = 0; i < subject.points.length; ++i) {
            const point = subject.points[i];
            if (this.showPointNums) {
                this.graph2D.drawText(this.graph3D.xs(point), this.graph3D.ys(point), i, 12, 10, -10, "black");
            }
            this.graph2D.drawPoint(this.graph3D.xs(point), this.graph3D.ys(point));
        }
    }

    printScene() {
        this.clear();
        if (this.showPolygones)
        {
            const polygones = [];
            this.subjects.forEach((subject) => { 
                this.graph3D.calcDistance(subject, this.WINDOW.camera, 'distance');
                this.graph3D.calcDistance(subject, this.LIGHT, 'lumen');

                for (let i = 0; i < subject.polygones.length; ++i) {
                    const polygon = subject.polygones[i];
                    const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                    let {r, g, b} = polygon.color;
                    r = Math.round(r * lumen),
                    g = Math.round(g * lumen),
                    b = Math.round(b * lumen)
                    polygones.push({ 
                        points: polygon.points.map((elem, j) => { 
                            return subject.points[polygon.points[j]]; 
                        }),
                        color: polygon.rgbToHex(r, g, b),
                        distance: polygon.distance
                    });
                }
            });
            
            // draw polygones
            this.graph3D.sortByArtistAlgorithm(polygones);
            for (let i = 0; i < polygones.length; ++i) {
                const points = polygones[i].points;
                const array = [];
                for (let j = 0; j < points.length; ++j) {
                    array.push({
                        x: this.graph3D.xs(points[j]),
                        y: this.graph3D.ys(points[j])
                    });
                }
                this.graph2D.drawPolygon(array, polygones[i].color);
            }
        }
        // draw points and edges
        this.subjects.forEach((subject) => {
            if (this.showEdges) {
                this.printEdges(subject);
            }
            if (this.showPoints) {
                this.printPoints(subject);
            }
        });
    }

    mouseup() {
        this.canRotate = false;
    }

    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    mouseleave() {
        this.canRotate = false;
    }

    mousewheel(event) {
        let moveStep = (event.deltaY > 0) ? -1 : 1;
        this.graph3D.move(0, 0, moveStep, this.WINDOW.camera);
        this.printScene();
    }

    mousemove(event) {
        const deltaX = event.offsetX - this.dx;
        const deltaY = event.offsetY - this.dy;
        if (this.canRotate) {
            const gradus = 2 * Math.PI / 360 * 1;
            this.subjects.forEach((subject) => {
                subject.points.forEach(point => { 
                    const isRightButton = event.buttons & 2;
                    if (isRightButton) {
                        this.graph3D.rotateOz(deltaY * gradus, point);
                    }
                    else {
                        this.graph3D.rotateOy(deltaX * gradus, point);
                        this.graph3D.rotateOx(deltaY * gradus, point);
                    }
                });
            });
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.printScene();
        }
    }
}