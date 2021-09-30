class Component {
    constructor({id, parent = null, template = () => {"<div>template</div>"}, templateParams = null, callbacks = {}, className = ""}) {
        this.id = id;
        this.parent = parent;
        this.callbacks = callbacks;
        this.render(template, className);
        this.addEventListeners();
    }

    render(template, className) {
        const element = document.createElement('div');
        element.setAttribute("id", this.id);
        if (className) {
            element.classList.add(className);
        }
        element.innerHTML = template();
        if (this.parent) {
            document.getElementById(this.parent).appendChild(element);
        } else {
            document.body.appendChild(element);
        }
    }
    
    addEventListeners() {}
    show() {
        document.getElementById(this.id).classList.remove("hide");
    }
    hide() {
        document.getElementById(this.id).classList.add("hide");
    }
}