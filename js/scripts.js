// Title of Question Set
const title = document.querySelector(".input_title-input");

// Array of Questions
const questions = [];
let chosen = [];

// Selected Question
let qChosen = [];

// Toggles if a new question is selected
let toggle = 0;

// Selecting Inputs and Button
let question = document.querySelector(".input_question-input");
let answer = document.querySelector(".input_answer-input");
let submit = document.querySelector(".input_submit-button");
let display = document.querySelector(".input_display");
let card = document.querySelector(".card_container");
let start = document.querySelector(".input_start-btn");
let guessInput = document.querySelector(".guess_input");
let submitGuess = document.querySelector(".submitGuess");
let nextQuestion = document.querySelector(".nextQuestion");

// Select all display items
let displayItems = document.getElementsByClassName("input_display-item");

// Select LI quiz card values
let cardQuestion = document.querySelector(".quiz_question");
let cardAnswer = document.querySelector(".quiz_answer");

// Event Listener on Submit Button for Display Items Idividually
submit.addEventListener("click", function() {
    if (question.value === "" || answer.value === "") {
        question.classList.toggle("error");
        answer.classList.toggle("error");
    } else {
        createObj();

        let trashCan = createDisplayItem();
        trashCan.dataset.index = questions.length - 1;
        trashCan.addEventListener("click", function(e) {
            start.disabled = true;
            questions.splice(this.dataset.index, 1);
            // this.parentNode.remove();
            let thisItem = this.parentNode;
            fadeOutIn(thisItem, 1000);

            
            console.log(questions.length);
        });
        inputReset();
        toggle = questions.length;
        start.removeAttribute("disabled");


        console.log(questions.length);
    }
});

start.addEventListener("click", function() {
    generateCard();
    hideInputs();
});

// Event Listener to test if guess is correct
submitGuess.addEventListener("click", function() {
    if (guessInput.value.toLowerCase() === qChosen.answer.toLowerCase()) {
        card.classList.toggle("flip");
        submitGuess.disabled = true;
    } else {
        console.log("wrong or not working");
    }
});

nextQuestion.addEventListener("click", function() {
    card.classList.toggle("flip");
    guessInput.value = "";
    submitGuess.disabled = false;
    setTimeout(generateCard, 1000);

    console.log(questions.length);
});

// Create The object for inclusion to array
function createObj() {
    let obj = {};
    obj.question = question.value;
    obj.answer = answer.value;
    questions.push(obj);
}

// Resets inputs to blank after submit
function inputReset() {
    question.value = "";
    answer.value = "";
    if (question.classList.contains("error")) {
        question.classList.toggle("error");
        answer.classList.toggle("error");
    }
}

// Creates Each Display Item
function createDisplayItem() {
    // Create new Div
    let newUl = document.createElement("ul");

    // Create Li and Image Elements
    let liQuestion = document.createElement("li");
    let liAnswer = document.createElement("li");
    let trashCan = document.createElement("img");

    // Set img src
    trashCan.src = "../assets/trash.svg";

    // Set classes
    newUl.className = "input_display-item";
    liQuestion.className = "input_display-question";
    liAnswer.className = "input_display-answer";
    trashCan.className = "input_display-delete";

    // Set LI textContent
    liQuestion.textContent = question.value;
    liAnswer.textContent = answer.value;

    // Append Children
    display.appendChild(newUl);
    newUl.appendChild(liQuestion);
    newUl.appendChild(liAnswer);
    return newUl.appendChild(trashCan);
}

//Generating Card Information per question
function generateCard() {
    random();
    if (toggle < 0) {
        cardQuestion.textContent = "There are no more questions left";
        cardAnswer.textContent = "There are no more questions left";
    } else {
        cardQuestion.textContent = qChosen.question;
        cardAnswer.textContent = qChosen.answer;
    }
}

// Choses a random value for the selection set
function random() {
    if (questions.length === 0) {
        toggle = -1;
    } else {
        let num = Math.floor(Math.random() * questions.length);
        chosen = questions.splice(num, 1).concat(chosen);
        qChosen = chosen[0];
    }
}

// hides all the inputs when start quiz is selected
function hideInputs(){
    for(let i = 0; i < displayItems.length; i++){
        fadeOutIn(displayItems[i], 1000);
    }
}

function fadeOutIn(elem, speed){
    if(!elem.style.opacity){
        elem.style.opacity = 1;
    }

    var outInterval = setInterval(function(){
        elem.style.opacity -= 0.02;
        if(elem.style.opacity <=0){
            clearInterval(outInterval);
            elem.remove();
        }
    }, speed/50)
}
