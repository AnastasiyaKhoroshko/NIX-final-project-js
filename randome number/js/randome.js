function testChecked(type) {
    return type == "checkbox";
}

let form = document.forms.generateNumber;

function getFormItems(event) {
    event.preventDefault();

    let items = {};

    for (let val of form) {
        let { name } = val;
        if (name) {
            let { type, checked, value } = val;
            items[name] = testChecked(type) ? checked : value;
        }
    }

    (items.unique == true) ? createUniqueGeneration(items) : createGeneration(items);

}

form.addEventListener("submit", getFormItems);

function createGeneration(obj) {
    if (obj.min >= obj.max) {
        alert("Мінімальне значення повинно бути меньше за максимальне");
        return
    }
    let screen = document.querySelector("#result");
    let arrNumbers = [];
    for (let i = 0; i < obj.numSize; i++) {
        let num = Math.floor((Math.random() * (obj.max - obj.min + 1)) + +obj.min);
        arrNumbers[i] = num;
    }
    screen.innerHTML = arrNumbers.join(", ");
}

function createUniqueGeneration(obj) {
    if (obj.min >= obj.max) {
        alert("Мінімальне значення повинно бути меньше за максимальне");
        return
    }
    let screen = document.querySelector("#result");
    let objNumbers = new Set();
    if ((obj.max - obj.min) >= +obj.numSize) {
        while (objNumbers.size < obj.numSize) {
            let num = Math.floor((Math.random() * (obj.max - obj.min + 1)) + +obj.min);
            objNumbers.add(num);
        }
    } else {
        while (objNumbers.size <= (obj.max - obj.min)) {
            let num = Math.floor((Math.random() * (obj.max - obj.min + 1)) + +obj.min);
            objNumbers.add(num);
        }
    }

    let arrNumbers = [];

    for (let item of objNumbers) {
        arrNumbers.push(item);
    }
    screen.innerHTML = arrNumbers.join(", ");
}
