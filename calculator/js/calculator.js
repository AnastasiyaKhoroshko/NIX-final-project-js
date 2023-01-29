let button = document.querySelector(".button");
const screen = document.querySelector(".text");

button.addEventListener("click", clickButton);
let term1 = "";
let term2 = "";
let operators = "";
let result = "";

function clickButton(event) {
    if (event.target.id == "ac") {
        term1 = "";
        term2 = "";
        operators = "";
        result = "";
        screen.innerHTML = "0";
    }

    if (event.target.classList.contains("number") && operators == "") {
        if (term1.length < 9) {
            if (term1[0] == "0" && term1[1] != ".") {
                term1 = event.target.id;
                screen.innerHTML = term1;
            } else {
                term1 += event.target.id;
                screen.innerHTML = term1;
            }
        }
    }
    if (event.target.classList.contains("operator") && term1 != "") {
        if (operators == "") {
            operators = event.target.id;
        }
        if (term2 != "" && result == "") {
            getResult(term1, term2, operators);
            operators = event.target.id;
            term1 = result;
            term2 = "";
        }
        if (result != "") {
            operators = event.target.id;
            term1 = result;
            term2 = "";
        }
    }
    if (event.target.classList.contains("number") && operators != "") {
        if (term2.length < 9) {
            if (term2[0] == "0" && term2[1] != ".") {
                term2 = event.target.id;
                screen.innerHTML = term2;
            } else {
                term2 += event.target.id;
                screen.innerHTML = term2;
            }
        }
    }
    if (event.target.id == ".") {
        switch (screen.innerHTML) {
            case term1: if (!term1.includes(".")) { term1 += event.target.id; screen.innerHTML = term1; };
                break;
            case term2: if (!term2.includes(".")) { term2 += event.target.id; screen.innerHTML = term2; };
                break;
        }
    }
    if (event.target.id == "=") {
        if (result == "") {
            result = getResult(term1, term2, operators);
            operators = "";
        } else {
            term1 = result;
            result = getResult(term1, term2, operators);
            operators = "";
        }
    }

    if (event.target.id == "%") {
        let screenNow = screen.innerHTML;
        switch (screenNow) {
            case term1: term1 = percent(term1);
                break;
            case term2: term2 = percentSecondNumber(term1, term2);
                break;
            case result.toString(): result = percent(result);
                break;
        }
    }
    if (event.target.id == "sign") {
        let numScreen = screen.innerHTML;
        switch (numScreen) {
            case term1: term1 = addSign(term1);
                break;
            case term2: term2 = addSign(term2);
                break;
            case result.toString(): result = addSign(result);
                break;
        }
    }
}
function addSign(num) {
    if (num.includes("-")) {
        num = num.slice(1);
    } else {
        num = "-" + num.slice(0);
    }
    screen.innerHTML = num;
    return num
}

function getResult(term1, term2, operators) {
    switch (operators) {
        case "+": result = (+term1) + (+term2);
            break;
        case "-": result = term1 - term2;
            break;
        case "/": if (term2 != "0") {
            result = term1 / term2;
        } else {
            result = "Помилка";
        }
            break;
        case "*": result = term1 * term2;
            break;
    }
    result = result.toString();
    if (result.length > 9) {
        if (result.includes(".")) {
            result = Number(result);
            result = result.toPrecision(4);
            screen.innerHTML = +result;
        } else {
            result = Number(result);
            result = result.toExponential(3);
            screen.innerHTML = result;
        }
    } else { screen.innerHTML = result; }

    return result;
}

function percent(num) {
    num = num / 100;
    screen.innerHTML = num;
    return num
}
function percentSecondNumber(term1, term2) {
    term2 = (term2 * term1) / 100;
    screen.innerHTML = term2;
    return term2;
}
