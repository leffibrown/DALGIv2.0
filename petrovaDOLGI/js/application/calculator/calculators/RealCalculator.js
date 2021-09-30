class RealCalculator {
    add(a, b) {
        return a + b;
    }
    sub(a, b) {
        return a - b;
    }
    mult(a, b) {
        return a * b;
    }
    div(a, b) {
        return a / b;
    }
    prod(a, x) {
        return a * x; // ???
    }
    pow(a, n) {
        return Math.pow(a, n);
    }
    one() {
        return 1;
    }
    zero() {
        return 0;
    }
    type(calc, elem, method) {
        if (elem instanceof Matrix) {
            return calc[method](elem.values.length, elem.values[0][0]);
        }
        else if (elem instanceof Vector) {
            return calc[method](elem.values.length, elem.values[0]);
        }
        return calc[method]();
    }
    get(a) {
        if (a instanceof Matrix)
            return new MatrixCalculator();
        else if (a instanceof Vector)
            return new VectorCalculator();
        else if (a instanceof Complex)
            return new ComplexCalculator();
        else
            return new RealCalculator();
    }
}
