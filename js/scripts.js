// Title of Question Set
const title = document.querySelector(".input_title-input");

// Array of Questions
const questions = [];

// Array of Answers
const answers = [];

// Selecting Inputs and Button
let question = document.querySelector(".input_question-input");
let answer = document.querySelector(".input_answer-input");
let submit = document.querySelector(".input_submit-button");
let display = document.querySelector(".input_display");

// Event Listener on Submit Button for Display Items Idividually
submit.addEventListener("click", function() {
    questions.push(question.value);
    answers.push(answer.value);
    let trashCan = createDisplayItem();
    trashCan.addEventListener("click", function(){
        confirm("Are you sure you want to delete this?")
        && this.parentNode.remove();
    })
    // createDisplayItem();
    inputReset();
});



// // Event Listener on Display Items
// display.addEventListener("click", function(e) {
    
// });



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
