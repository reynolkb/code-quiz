var startButton = document.getElementById("start-btn");
var startContainer = document.getElementById("start-container");
var questionNumber = 0;
var correct = 0;
var previousAnswer = "start";
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
    questionContainer.id = "question-container-" + questionNumber;

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

    if (previousAnswer === "start") {
        var rightWrong = document.createElement("p");
        rightWrong.className = "hide";
        questionContainer.appendChild(rightWrong);
    } else if (previousAnswer === "correct") {
        var rightWrong = document.createElement("p");
        rightWrong.className = "rightWrong";
        rightWrong.style.color = "green";
        rightWrong.textContent = "Previous Answer: Correct";
        questionContainer.appendChild(rightWrong);
    } else if (previousAnswer === "incorrect") {
        var rightWrong = document.createElement("p");
        rightWrong.className = "rightWrong";
        rightWrong.style.color = "red";
        rightWrong.textContent = "Previous Answer: Incorrect";
        questionContainer.appendChild(rightWrong);
    }

    // add to main container
    var mainContainer = document.getElementById("main-container");
    mainContainer.appendChild(questionContainer);
}

function selectAnswer(event) {

    var selectedButton = event.target;

    var answer = selectedButton.getAttribute('data-correct');
    if (answer == 'true') {
        var questionContainer = document.querySelector('#question-container-' + questionNumber);
        questionContainer.classList.add('hide');

        correct++;
        previousAnswer = "correct";

        questionNumber++;
        if (questionNumber < 5) {
            nextQuestion();
        } else {
            gameOver();
        }
    } else {
        var questionContainer = document.querySelector('#question-container-' + questionNumber);
        questionContainer.classList.add('hide');

        previousAnswer = "incorrect";

        questionNumber++;
        if (questionNumber < 5) {
            nextQuestion();
        } else {
            gameOver();
        }
    }
}

function gameOver() {
    var gameOver = document.createElement("div");
    gameOver.className = "game-over-container";

    var gameOverTitle = document.createElement("h2");
    gameOverTitle.textContent = "All Done!";
    gameOver.appendChild(gameOverTitle);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is " + correct + "/5";
    gameOver.appendChild(finalScore);

    var form = document.createElement("form");
    gameOver.appendChild(form);

    var formLabel = document.createElement("label");
    formLabel.htmlFor = "currentPlayer";
    formLabel.textContent = "Enter your name:";
    formLabel.style.padding = "0 10px 0 0";
    form.appendChild(formLabel);

    var formInput = document.createElement("input");
    formInput.id = "currentPlayer";
    formInput.type = "text";
    form.appendChild(formInput);

    var formSubmit = document.createElement("input");
    formSubmit.type = "submit";
    formSubmit.value = "submit";
    formSubmit.className = "btn";
    formSubmit.style.margin = "0 0 0 10px";
    formSubmit.style.display = "inline-block";
    form.appendChild(formSubmit);

    formSubmit.addEventListener('click', setScore);

    // add to main container
    var mainContainer = document.getElementById("main-container");
    mainContainer.appendChild(gameOver);
}

function setScore() {
    var currentScore = correct + "/5";
    var currentName = currentPlayer.value;
    var playerScores = [];
    var savedScores = localStorage.getItem("scores");

    if (!savedScores) {
        // playerScores.push({ name: currentName, score: currentScore });
        playerScores.push([currentName, currentScore]);
        localStorage.setItem("scores", JSON.stringify(playerScores));
    } else {
        var getSavedScores = localStorage.getItem("scores");
        getSavedScores = JSON.parse(getSavedScores);
        // getSavedScores.push({ name: currentName, score: currentScore });
        getSavedScores.push([currentName, currentScore]);
        // sort high scores
        getSavedScores.sort(sortScores);
        localStorage.setItem("scores", JSON.stringify(getSavedScores));
    }

    debugger;
    highScore();
}

function sortScores(arr1, arr2) {
    if (arr1[1] < arr2[1]) {
        return 1;
    } else if (arr1[1] === arr2[1] && arr1[0] < arr2[0]) {
        return -1;
    } else if (arr1[1] > arr2[1]) {
        return -1;
    } else if (arr1[1] === arr2[1] && arr1[0] > arr2[0]) {
        return 1;
    }
}

function highScore() {

    var gameOver = document.querySelector(".game-over-container");
    gameOver.className = "hide";

    var highScoreContainer = document.createElement("div");
    highScoreContainer.className = "high-score-container";

    var highScoreTitle = document.createElement("h2");
    highScoreTitle.textContent = "High Scores";
    highScoreContainer.appendChild(highScoreTitle);

    var getSavedScores = localStorage.getItem("scores");
    getSavedScores = JSON.parse(getSavedScores);

    for (var i = 0; i < getSavedScores.length; i++) {
        var score = document.createElement("p");
        var iCount = i + 1;
        score.className = "high-score";
        score.textContent = iCount + ". " + getSavedScores[i][0] + " - " + getSavedScores[i][1];
        highScoreContainer.appendChild(score);
    }

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    highScoreContainer.appendChild(buttonContainer);

    var goBack = document.createElement("button");
    goBack.className = "btn";
    goBack.textContent = "Go Back";
    buttonContainer.appendChild(goBack);

    goBack.addEventListener('click', startGame);

    var clearHighScores = document.createElement("button");
    clearHighScores.className = "btn";
    clearHighScores.textContent = "Clear High Scores";
    buttonContainer.appendChild(clearHighScores);

    clearHighScores.addEventListener('click', resetHighScores);

    function resetHighScores() {
        getSavedScores = [];
        var highScore = document.getElementsByClassName('high-score');
        highScore.className = "hide";
    }

    // add to main container
    var mainContainer = document.getElementById("main-container");
    mainContainer.appendChild(highScoreContainer);
}