class Math3D {
    move(sx, sy, sz, point) {
        const array = this.multMatrix([
                [1, 0, 0, sx],
                [0, 1, 0, sy],
                [0, 0, 1, sz],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    multMatrix(T, m) {
        const c = [];
        const rows = T.length;
        const cols = m.length;
        for (let i = 0; i < cols; ++i)
        {
            let S = 0;
            for (let j = 0; j < rows; ++j) {
                S += T[i][j] * m[j];
            }
            c.push(S);
        }
        return c;
    }

    rotateOx(alpha, point) {
        const array = this.multMatrix([
                [1, 0, 0, 0],
                [0, Math.cos(alpha), Math.sin(alpha), 0],
                [0, -Math.sin(alpha), Math.cos(alpha), 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOy(alpha, point) {
        const array = this.multMatrix([
                [Math.cos(alpha), 0, -Math.sin(alpha), 0],
                [0, 1, 0, 0],
                [Math.sin(alpha), 0, Math.cos(alpha), 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    rotateOz(alpha, point) {
        const array = this.multMatrix([
                [Math.cos(alpha), Math.sin(alpha), 0, 0],
                [-Math.sin(alpha), Math.cos(alpha), 0, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 1]
            ],
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
}
