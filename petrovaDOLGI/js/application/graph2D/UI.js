class UI {
    constructor({callbacks} = {}) {
        this.num = 0;
        this.callbacks = callbacks;
        var elemToggleMenu = document.getElementById("toggleMenu");
        var elemDivMenu = document.getElementById("menu");

        document.getElementById("addFunction").addEventListener("click", () => {
            var divFuncs = document.getElementById("functions");
            var block = this.createFuncBlock();
            divFuncs.appendChild(block);
        });

        elemToggleMenu.addEventListener("click", () => {
            if (elemDivMenu.style.visibility == "visible")
                elemDivMenu.style.visibility = "hidden";
            else
                elemDivMenu.style.visibility = "visible";
        });
    }

    createFuncInput() {
        var input = document.createElement("input");
        input.setAttribute("placeholder", "Функция #" + this.num);
        //input.classList.add("graphFuncInput");
        input.style.maxWidth = 130;
        return input;
    }

    createColorInput() {
        var input = document.createElement("input");
        input.value = "red";
        input.placeholder = "color";
        input.classList.add("graphFuncInput");
        return input;
    }

    createWidthInput() {
        var input = document.createElement("input");
        input.value = "2";
        input.placeholder = "width";
        input.classList.add("graphFuncInput");
        return input;
    }

    createRemoveButton(parent) {
        var button = document.createElement("button");
        button.innerHTML = "Удалить";
        button.addEventListener("click", () => {
            this.callbacks.removeFunction(parent.dataset.num);
            parent.remove();
        });
        return button;
    }

    createFuncBlock() {
        var block = document.createElement("div");
        block.appendChild(this.createFuncInput());
        block.appendChild(this.createColorInput());
        block.appendChild(this.createWidthInput());
        block.appendChild(this.createRemoveButton(block));
        this.createIntegralCheckbox(block, this.num, "Интеграл");
        this.createDerivativeCheckbox(block, this.num, "Производная");
        block.appendChild(document.createElement("br"));
        block.dataset.num = this.num;
        this.num++;

        block.addEventListener("keyup", () => this.onKeyUp(block));
        return block;
    }

    onKeyUp(elem) {
        try {
            var f = null;
            var funcInput = elem.childNodes[0];
            var colorInput = elem.childNodes[1];
            var widthInput = elem.childNodes[2];
            eval(`f = function(x) { return ${funcInput.value}; }`);
            this.callbacks.enterFunction(f, elem.dataset.num - 0, colorInput.value, widthInput.value);
            funcInput.style.color = "";
        }
        catch (e) {
            console.log(e);
            funcInput.style.color = "red";
        }
    }

    createIntegralCheckbox(parentElement, number, text) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        input.type = "checkbox";
        input.setAttribute("id", "checkbox_itg__" + number);
        label.setAttribute("id", "checkbox_itg___" + number);
        label.innerHTML = text;
        parentElement.appendChild(input);
        parentElement.appendChild(label);

        var onClick = function(ui, elem) {
            var parentDiv = elem.parentElement;
            ui.callbacks.setIntegral(elem.checked, parentDiv.dataset.num);
        }
        input.addEventListener("click", () => onClick(this, input));
    }

    createDerivativeCheckbox(parentElement, number, text) {
        var input = document.createElement("input");
        var label = document.createElement("label");
        input.type = "checkbox";
        input.setAttribute("id", "checkbox_der_" + number);
        label.setAttribute("id", "checkbox_der_" + number);
        label.innerHTML = text;
        parentElement.appendChild(input);
        parentElement.appendChild(label);

        var onClick = function(ui, elem) {
            var parentDiv = elem.parentElement;
            ui.callbacks.setDerivative(elem.checked, parentDiv.dataset.num);
        }
        input.addEventListener("click", () => onClick(this, input));
    }

    getAB() {
        const a = document.getElementById("a").value - 0;
        const b = document.getElementById("b").value - 0;
        return { a, b };
    };
}

function sin(x) {
    return Math.sin(x)
}

function cos(x) {
    return Math.cos(x);
}

function tg(x) {
    return Math.tg(x);
}
