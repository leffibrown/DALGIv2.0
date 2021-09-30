class ComplexCalculator extends RealCalculator {
    add(a, b) {
        return new Complex(
            super.add(a.re, b.re), 
            super.add(a.im, b.im)
        );
    }
    sub(a, b) {
        return new Complex(
            super.sub(a.re, b.re), 
            super.sub(a.im, b.im)
        );
    }
    mult(a, b) {
        return new Complex(
            super.sub(super.mult(a.re, b.re), super.mult(a.im, b.im)), 
            super.add(super.mult(a.re, b.im), super.mult(a.im, b.re))
        );
    }
    div(a, b) {
        return new Complex(
            a.re * b.re + a.im * b.im / b.re * b.re + b.im * b.im,
            a.im * b.re - a.re * b.im / b.re * b.re + b.im * b.im
        );
    }
    prod(a, x) {
        return new Complex(
            super.mult(a.re, x),
            super.mult(a.im, x)
        );
    }
    pow(a, n) {
        var trig = this.conv_to_trig(a);
        var len2 = Math.pow(trig.length, n);
        a.re = len2 * Math.cos(n * trig.angle);
        a.im = len2 * Math.sin(n * trig.angle);
    }
    one() {
        return new Complex(super.one());
    }
    zero() {
        return new Complex(super.zero())
    }
    conv_to_trig(a) {
        var length, angle;
        length = Math.sqrt(a.re * a.re + a.im * a.im);
        angle = Math.acos(a.re / length);
        return { length, angle };
    }
}