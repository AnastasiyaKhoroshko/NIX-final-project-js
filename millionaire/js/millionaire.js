let questionsArr = [
    {
        question: "Яка клавіша є на клавіатурі комп'ютера?",
        1: "пробіл", 2: "прокол", 3: "просвіт", 4: "простріл", correct: "пробіл",
    },
    {
        question: "Звідки, як то кажуть, беруться вигадані, недостовірні дані?",
        1: "з пола", 2: "з вікон", 3: "з підвіконня", 4: "зі стелі", correct: "зі стелі",
    },
    {
        question: "Що ставлять хворому під час застуди?",
        1: "пломбу", 2: "двійку", 3: "гірчичники", 4: "клеймо", correct: "гірчичники",
    },
    {
        question: "Як Кіт у чоботях відрекомендував королю свого господаря у казці Шарля Перро?",
        1: "маркіз де Карабас", 2: "барон де Дуремар", 3: "герцог де Буратіно", 4: "граф де Артемон", correct: "маркіз де Карабас",
    },
    {
        question: "Де знаходиться Силіконова долина?",
        1: "у Франції", 2: "у Швейцарії", 3: "в США", 4: "в Німеччині", correct: "в США",
    },
    {
        question: "Як в абревіатурі ООН розшифровується перша літера?",
        1: "організація", 2: "обмежена", 3: "область", 4: "об'єднана", correct: "організація",
    },
    {
        question: "Як в народі називають просту автоматичну фотокамеру?",
        1: "пудрениц", 2: "вафельниця", 3: "милиця", 4: "школярка", correct: "милиця",
    },
    {
        question: "Який біг в помірній кількості вважається корисним для зміцнення здоров'я?",
        1: "гуськом", 2: "підтюпцем", 3: "галопом", 4: "риссю", correct: "підтюпцем",
    },
    {
        question: "Як звали коня Олександра Македонського?",
        1: "Буцефал", 2: "Цендебал", 3: "Енцефаліт", 4: "Росинант", correct: "Буцефал",
    },
    {
        question: "Яка найвідоміша програма для професійного редагування фото?",
        1: "Paint", 2: "Photoshop", 3: "Linux", 4: "Canon", correct: "Photoshop",
    },
    {
        question: "Держава, що має кордон тільки з Іспанією.",
        1: "Італія", 2: "Францію", 3: "Португалія", 4: "Швеція", correct: "Португалія",
    },
    {
        question: "Як називається перший фільм про Гаррі Поттера?",
        1: "Келих вогню", 2: "В'язень Азкабану", 3: "Філософський камінь", 4: "Таємна кімната", correct: "Філософський камінь",
    },
    {
        question: "Які з цих годинників можуть мати секундну стрілку?",
        1: "Пісочні", 2: "Сонячні", 3: "Кварцеві", 4: "Водяні", correct: "Кварцеві",
    },
    {
        question: "Хто бився з вітряними млинами?",
        1: "Річард Левове серце", 2: "Дон Жуан", 3: "Д’Артаньян", 4: "Дон Кіхот", correct: "Дон Кіхот",
    },
    {
        question: "Яка з цих тварин з'являється на світ не з яйця?",
        1: "Крокодил", 2: "Страус", 3: "Тюлень", 4: "Черепаха", correct: "Тюлень",
    },
]

let prizeArr = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000]

let question = document.querySelector(".game__question");
let answers = document.querySelector(".game__answers");
let prize = document.querySelector(".game__money_text");
let fiftyFifty = document.querySelector(".game__fifyFifty");
let friend = document.querySelector(".game__callFriend");
let popup = document.querySelector(".popup");
let overlay = document.querySelector("#overlay");
let count = 0;

function rightAnswer(event) {
    if (event.target.innerHTML != questionsArr[count].correct) {
        event.target.classList.add("wrong");
        if (1000 <= prizeArr[count] && prizeArr[count] < 32000) {
            openClosePopup();
            popup.firstElementChild.innerHTML = `Нажаль відповідь неправильна. Ваш виграш становить `;
            popup.children[1].innerHTML = `1 000 грн`;
        } else if (32000 <= prizeArr[count] && prizeArr[count] < 1000000) {
            openClosePopup();
            popup.firstElementChild.innerHTML = `Нажаль відповідь неправильна. Ваш виграш становить`;
            popup.children[1].innerHTML = `32 000 грн`;
        } else {
            openClosePopup();
            popup.firstElementChild.innerHTML = `Нажаль ви програли. Спробуйте ще раз`;
        }
        count = 0;
        fiftyFifty.removeAttribute("disabled");
        friend.removeAttribute("disabled")
        setTimeout(() => addQuestion(count), 1000);

    } else {
        event.target.classList.add("right");
        count++;
        if (prizeArr[count] == 1000000) {
            openClosePopup();
            popup.firstElementChild.innerHTML = `Ви виграли`;
            popup.children[1].innerHTML = `1 000 000 грн`;
            count = 0;
            fiftyFifty.removeAttribute('disabled');
            friend.removeAttribute("disabled")
            setTimeout(() => addQuestion(count), 1000);
        }
        setTimeout(() => addQuestion(count), 1000);
    }
    setTimeout(() => event.target.classList.remove("right"), 1000);
    setTimeout(() => event.target.classList.remove("wrong"), 1000);
}

function removeTwoAnswers(event) {
    let counter = 0;
    for (let i = 0; i < 4; i++) {
        if (answers.children[i].innerHTML == questionsArr[count].correct) {
            continue;
        } else {
            answers.children[i].innerHTML = "";
            counter++;
        }
        if (counter == 2) break;
    }
    event.target.setAttribute('disabled', true);
}

function openClosePopup() {
    popup.classList.add("active");
    overlay.classList.add("active");
    popup.querySelector(".popup__button").addEventListener("click", () => {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    })
}

function callFriend(event) {
    openClosePopup();
    popup.firstElementChild.innerHTML = `Ваш друг каже:
      “Перше, що спадає мені на думку, - це "${questionsArr[count].correct}", але я не фахівець у цій
     сфері.Не можу допомогти тобі з відповіддю.Просто не поспішай і гарненько подумай!”`
    event.target.setAttribute('disabled', true);
}

function addQuestion(count) {

    question.innerHTML = questionsArr[count].question;
    prize.innerHTML = prizeArr[count] + " грн";

    for (let i = 0; i < 4; i++) {
        answers.children[i].innerHTML = questionsArr[count][i + 1];
    }
    fiftyFifty.addEventListener("click", removeTwoAnswers);
    friend.addEventListener("click", callFriend);
    answers.addEventListener("click", rightAnswer);

}



addQuestion(count);