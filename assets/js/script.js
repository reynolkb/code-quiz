var startButton = document.getElementById("start-btn");
var startContainer = document.getElementById("start-container");
var questionNumber = 0;
var questions = [
    {
        question: 'Commonly used data types DO NOT Include:',
        answers: [
            { text: '1. strings', correct: false },
            { text: '2. booleans', correct: false },
            { text: '3. alerts', correct: true },
            { text: '4. numbers', correct: false },
        ]
    },
    {
        question: 'The condition in an if / else statement is enclosed with ________.',
        answers: [
            { text: '1. quotes', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. parenthesis', correct: true },
            { text: '4. square brackets', correct: false },
        ]
    },
    {
        question: 'Arrays In JavaScript can be used to store',
        answers: [
            { text: '1. numbers and strings', correct: false },
            { text: '2. other arrays', correct: false },
            { text: '3. booleans', correct: false },
            { text: '4. all of the above', correct: true },
        ]
    },
    {
        question: 'String values must be enclosed within _____ when being assigned to variables',
        answers: [
            { text: '1. commas', correct: false },
            { text: '2. curly brackets', correct: false },
            { text: '3. quotes', correct: true },
            { text: '4. parenthesis', correct: false },
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: '1. JavaScript', correct: false },
            { text: '2. terminal/bash', correct: false },
            { text: '3. for loops', correct: false },
            { text: '4. console.log', correct: true },
        ]
    },
]

startButton.addEventListener('click', startGame);

function startGame() {
    console.log('Started');
    startContainer.classList.add('hide');



    nextQuestion();
}

function nextQuestion() {
    var questionContainer = document.createElement("div");
    questionContainer.className = "question-container";

    // Set Question Text
    var questionText = document.createElement("h2");
    questionText.textContent = questions[questionNumber].question;
    questionContainer.appendChild(questionText);

    // Answer 1
    var answerOne = document.createElement("button");
    answerOne.className = "btn answer-btn";
    answerOne.textContent = questions[questionNumber].answers[0].text;
    answerOne.setAttribute("data-correct", questions[questionNumber].answers[0].correct);
    questionContainer.appendChild(answerOne);

    answerOne.addEventListener('click', selectAnswer);

    // Answer 2
    var answerTwo = document.createElement("button");
    answerTwo.className = "btn answer-btn";
    answerTwo.textContent = questions[questionNumber].answers[1].text;
    answerTwo.setAttribute("data-correct", questions[questionNumber].answers[1].correct);
    questionContainer.appendChild(answerTwo);

    answerTwo.addEventListener('click', selectAnswer);

    // Answer 3
    var answerThree = document.createElement("button");
    answerThree.className = "btn answer-btn";
    answerThree.textContent = questions[questionNumber].answers[2].text;
    answerThree.setAttribute("data-correct", questions[questionNumber].answers[2].correct);
    questionContainer.appendChild(answerThree);

    answerThree.addEventListener('click', selectAnswer);

    // Answer 4
    var answerFour = document.createElement("button");
    answerFour.className = "btn answer-btn";
    answerFour.textContent = questions[questionNumber].answers[3].text;
    questionContainer.appendChild(answerFour);
    answerFour.setAttribute("data-correct", questions[questionNumber].answers[3].correct);

    answerFour.addEventListener('click', selectAnswer);

    // add to main container
    var mainContainer = document.getElementById("main-container");
    mainContainer.appendChild(questionContainer);
}

function selectAnswer(event) {
    var selectedButton = event.target;

    var answer = selectedButton.getAttribute('data-correct');
    if (answer == 'true') {
        selectedButton.classList.add("correct");
        questionNumber++;
        nextQuestion();
    } else {
        selectedButton.classList.add("incorrect");
        questionNumber++;
        nextQuestion();
    }
}
