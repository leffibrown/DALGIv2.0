class Polynomial {
    constructor(members = []) {
        this.poly = members;
        this.poly.sort((a, b) => b.power - a.power);
    }
    getValue(x) {
        const calc = new UniversalCalculator();
        return this.poly.reduce((s, elem) => calc.add(s, calc.mult));
    }
}