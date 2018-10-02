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


submit.addEventListener("click", function(){
    questions.push(question.value);
    answers.push(answer.value);
    createDisplayItem(question.value, answer.value);
    inputReset();
})

function inputReset(){
    question.value = "";
    answer.value = "";
}



function createDisplayItem(){
    // Create new Div
    let newDiv = document.createElement("div");

    // Create Paragraph Elements
    let pQuestion = document.createElement("p");
    let pAnswer = document.createElement("p");

    // Set classes
    newDiv.className = "input_display-item";
    pQuestion.className = "input_display-question";
    pAnswer.className = "input_display-answer";

    // Set P textContent
    pQuestion.textContent = question.value;
    pAnswer.textContent = answer.value;

    // Append Children
    display.appendChild(newDiv);
    newDiv.appendChild(pQuestion);
    newDiv.appendChild(pAnswer);
    
    console.log(question.value, answer.value);
}



// console.log(title);
// console.log(question);
// console.log(answer);
console.log(display);