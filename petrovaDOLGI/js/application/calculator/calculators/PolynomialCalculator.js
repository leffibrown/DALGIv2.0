class PolynomialCalculator {
    polynomial(members) {
        return new Polynomial(members);
    }
    add(a, b) {
        const calc = new UniversalCalculator();
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new PolynomialMember(
                    calc.add(elemA.value, member.value),
                    elemA.power
                ));
            } else {
                members.push(new PolynomialMember(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return new Polynomial(members);
    }
}