// Title of Question Set
const title = document.querySelector(".input_title-input");

// Array of Questions
let questions = [];
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
let resetQuiz = document.querySelector(".reset");

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
        });
        inputReset();
        toggle = questions.length;
        start.removeAttribute("disabled");
    }
});

start.addEventListener("click", function() {
    generateCard();
    hideInputs();
    submit.disabled = true;
    start.disabled = true;
});

// Event Listener to test if guess is correct
submitGuess.addEventListener("click", function() {
    
    if (guessInput.value === ""){
        guessInput.classList.toggle("error");
        setTimeout(function(){
            guessInput.classList.toggle("error");
        }, 1000);
    }
    else if (guessInput.value.toLowerCase() === qChosen.answer.toLowerCase()) {
        card.classList.toggle("flip");
        submitGuess.disabled = true;
        nextQuestion.disabled = false;
    } 
    else {
        // Insert wrong message here
        cardQuestion.textContent = "You have guessed incorrectly. Please Try Again";
        // SetTimeout to reset back to Chosen Question
        setTimeout(function(){
            cardQuestion.textContent = qChosen.question;
        }, 1000);
    }
});

// Selects the Next question
nextQuestion.addEventListener("click", function() {
    card.classList.toggle("flip");
    guessInput.value = "";
    submitGuess.disabled = false;
    setTimeout(generateCard, 1000);

    // When no questions, hide next Question and unhide reset
    if (questions.length === 0){
        nextQuestion.classList.toggle("fadeOut");
        resetQuiz.classList.toggle("fadeOut");
    }
});


// Reset the Quiz back to the start
resetQuiz.addEventListener("click", function() {
    questions = [];
    chosen = [];
    qChosen = [];
    toggle = 0;
    start.disabled = true;
    submit.disabled = false;
    cardQuestion.textContent = "Please Set Some Questions Up";
    resetQuiz.classList.toggle("fadeOut");
    nextQuestion.classList.toggle("fadeOut");
    nextQuestion.disabled = true;
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


// FadeOut the display items when trashCan is clicked.
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








// // Delete Soon after just for reference
// box.addEventListener("click", function(e){
//     e.preventDefault;
//     p.classList.remove("start");
//     p.classList.add("middle");
//     p.innerHTML = "wrong answer";
//     void box.offsetWidth;
    
    
//     setTimeout(function(){
//         p.classList.add("start");
//         p.classList.remove("middle");
//         p.innerHTML = "Original Text";
//     }, 1950);
// })


// .start {
//     animation: start 1s ease-in-out;
//   }

//   .middle {
//     animation: middle 2s ease-in-out;
//   }
  
  

//   /* and end */
//   @keyframes start {
//     0% {opacity: 0;}
//     100% {opacity: 1;}
//   }

//   @keyframes middle {
//     0% {opacity: 0;}
//     50% {opacity: 1;}
//     100% {opacity: 0;}
//   }