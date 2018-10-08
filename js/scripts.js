// Title of Question Set
const title = document.querySelector(".input_title-input");

// Array of Questions
const questions = [];
let chosen = [];

// Selected Question
let qChosen = [];

// Array of Answers
const answers = [];

// Toggles if a new question is selected
let toggle = 0;

// Selecting Inputs and Button
let question = document.querySelector(".input_question-input");
let answer = document.querySelector(".input_answer-input");
let submit = document.querySelector(".input_submit-button");
let display = document.querySelector(".input_display");
let card = document.querySelector(".card_container");

// Select P quiz card values
let cardQuestion = document.querySelector(".quiz_question");
let cardAnswer = document.querySelector(".quiz_answer");


// Event Listener on Submit Button for Display Items Idividually
submit.addEventListener("click", function() {
    questions.push(question.value);
    answers.push(answer.value);

    let trashCan = createDisplayItem();
    trashCan.addEventListener("click", function(){
        // confirm("Are you sure you want to delete this?") && 
        this.parentNode.remove();
    })
    inputReset();
    toggle = questions.length;
});



// Resets inputs to blank after submit
function inputReset() {
    question.value = "";
    answer.value = "";
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
function generateCard(){
    random();
    if (toggle < 0){
        cardQuestion.textContent = "There are no more questions left";
    }
    else {
        cardQuestion.textContent = qChosen;
    }
}


// Choses a random value for the selection set
function random() {  
    if(questions.length === 0){
        toggle = -1;
    }
    else {
        let num = Math.floor(Math.random() * questions.length);
        chosen = questions.splice(num, 1).concat(chosen);
        qChosen = chosen[0];
    }
}

