class CalculatorComponent extends Component {
    constructor(options) {
        super(options);
        this.calculator = new UniversalCalculator();
        this.a = null;
        this.b = null;
        this.matrixSize = 1;
        this.vectorSize = 1;
        this.clearElement();
    }

    addEventListeners() {
        document.getElementById("clearElement").addEventListener("click", () => this.clearElement());
        document.getElementById("addVectorSize").addEventListener("click", () => this.addVectorSize());
        document.getElementById("subVectorSize").addEventListener("click", () => this.subVectorSize());
        document.getElementById("addMatrixSize").addEventListener("click", () => this.addMatrixSize());
        document.getElementById("subMatrixSize").addEventListener("click", () => this.subMatrixSize());
        
        document.getElementById("addVector").addEventListener("click", () => this.addVector());
        document.getElementById("addMatrix").addEventListener("click", () => this.addMatrix());
        document.getElementById("addComplex").addEventListener("click", () => this.addComplex());
        
        document.getElementById("add").addEventListener("click", () => this.addElements());
        document.getElementById("sub").addEventListener("click", () => this.subElements());
        document.getElementById("mult").addEventListener("click", () => this.multElements());
        document.getElementById("div").addEventListener("click", () => this.divElements());
    }

    fillInfo() {
        const divElement = document.getElementById("calcElement");
        if (typeof this.a === 'number') {
            divElement.innerHTML = 'Вещест. число';
        }
        if (this.a instanceof Complex) {
            divElement.innerHTML = 'Компл. число';
        }
        if (this.a instanceof Matrix) {
            divElement.innerHTML = 'Матрица';
        }
        if (this.a instanceof Vector) {
            divElement.innerHTML = 'Вектор';
        }
        document.getElementById("matrixSize").innerHTML = `Размер матрицы: ${this.matrixSize}`;
        document.getElementById("vectorSize").innerHTML = `Размер вектора: ${this.vectorSize}`;
    }

    fillCalculator() {
        document.getElementById("elementA").innerHTML = this.genCalculatorHTML(this.a, "a");
        document.getElementById("elementB").innerHTML = this.genCalculatorHTML(this.a, "b");
    }
    
    fillElements() {
        this.goToElementValues(this.a, document.querySelectorAll('.a'));
        this.goToElementValues(this.b, document.querySelectorAll('.b'));
    }
    
    genCalculatorHTML(elem, className) {
        if (elem instanceof Matrix) {
            return this.genMatrixHTML(elem.values.length, this.genCalculatorHTML(elem.values[0][0], className));
        } else if (elem instanceof Vector) {
            return this.genVectorHTML(elem.values.length, this.genCalculatorHTML(elem.values[0], className));
        } else if (elem instanceof Complex) {
            return `<input class="${className}" value="${elem.re}"></input>+i*<input class="${className}" value="${elem.im}"></input>"`;
        } else {
            return `<input class="${className}" value="${elem}"></input>`;
        }
    }
    
    genMatrixHTML(size, elem) {
        let str = "";
        for (let i = 0; i < size; ++i) {
            for (let j = 0; j < size; ++j) {
                str += `${elem}, `;
            }
            str += `<br>`;
        }
        return `<span>(</span>${str}<span>)</span>`;
    }
    
    genVectorHTML(size, elem) {
        let str = "";
        for (let i = 0; i < size; ++i) {
            str += `${elem}, `;
        }
        return `<span>(</span>${str}<span>)</span>`;
    }
    
    goToElementValues(elem, values, num = 0, length = 0) {
        if (elem instanceof Matrix) {
            elem.values.forEach((column, j) => column.forEach((el, i) => {
                const index = j * elem.values.length + i + num * length;
                if (typeof el === 'number') {
                    elem.values[j][i] = values[index].value - 0;
                } else {
                    this.goToElementValues(elem.values[j][i], values, index, elem.values.length + 1);
                }
            }));
        } 
        else if (elem instanceof Vector) {
            elem.values.forEach((el, i) => {
                const index = i + num * length;
                if (typeof elem.values[i] === 'number') {
                    elem.values[i] = values[index].value - 0;
                } else {
                    this.goToElementValues(elem.values[i], values, index, elem.values.length + 1);
                }
            });
        } 
        else if (elem instanceof Complex) {
            elem.re = values[num * 2].value - 0;
            elem.im = values[num * 2 + 1].value - 0;
        } 
    }
    
    clearElement() {
        this.a = this.calculator.zero();
        this.b = this.calculator.zero();
        this.fillInfo();
        this.fillCalculator();
    }

    addComplex() {
        this.a = this.calculator.zero('Complex');
        this.b = this.calculator.zero('Complex');
        this.fillInfo();
        this.fillCalculator();
    }

    addVector() {
        const values = [];
        for (let i = 0; i < this.vectorSize; ++i) {
            values.push(0);
        }
        this.a = this.calculator.zero(null, new Vector(values));
        this.b = this.calculator.zero(null, new Vector(values));
        this.fillInfo();
        this.fillCalculator();
    }

    addVectorSize() {
        this.vectorSize++;
        this.fillInfo();
        this.fillCalculator();
    }

    subVectorSize() {
        if (this.vectorSize > 1) {
            this.vectorSize--;
            this.fillInfo();
            this.fillCalculator();
        }
    }

    addMatrix() {
        const values = [];
        for (let i = 0; i < this.matrixSize; ++i) {
            values.push([]);
            for (let j = 0; j < this.matrixSize; ++j) {
                values[i].push(this.a);
            }
        }
        this.a = this.calculator.zero(null, this.calculator.matrix(values));
        this.b = this.calculator.zero(null, this.calculator.matrix(values)); // -//- ??? в лекции написано так
        this.fillInfo();
        this.fillCalculator();
    }

    addMatrixSize() {
        this.matrixSize++;
        this.fillInfo();
        this.fillCalculator();
    }

    subMatrixSize() {
        if (this.matrixSize > 1) {
            this.matrixSize--;
            this.fillInfo();
            this.fillCalculator();
        }
    }
    
    addElements() {
        this.fillElements();
        const c = this.calculator.add(this.a, this.b);
        this.printResult(c);
    }
    
    subElements() {
        this.fillElements();
        const c = this.calculator.sub(this.a, this.b);
        this.printResult(c);
    }
    
    multElements() {
        this.fillElements();
        const c = this.calculator.mult(this.a, this.b);
        this.printResult(c);
    }
    
    divElements() {
        this.fillElements();
        const c = this.calculator.div(this.a, this.b);
        this.printResult(c);
    }

    printResult(value) {
        var text = "";
        if (typeof value === 'number') {
            text = value;
        }
        if (value instanceof Complex) {
            text = value.re + " + " + value.im + "i";
        }
        if (value instanceof Matrix) {
            text = "Matrix not implemented";
        }
        if (value instanceof Vector) {
            text = "(";
            value.values.forEach((vecElem) => {
                text += vecElem + ", ";
            });
            text += ")";
        }
        document.getElementById("calcResult").innerHTML = text;
    }
}