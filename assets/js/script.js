// grabs start button and container for manipulation later on.
var startButton = document.getElementById("start-btn");
var startContainer = document.getElementById("start-container");

// sets the question number to 0, after each question you add 1.
var questionNumber = 0;

// variable to determine if their previous answer was correct or not.
var previousAnswer = "start";

// boolean to check if the game is over.
var isGameOver = false;

// object to store all questions and their answers.
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

// starts the game and hides the intro section.
var startGame = function () {
    startContainer.classList.add('hide');
    startTimer();
    nextQuestion();
}

// loads the next question.
var nextQuestion = function () {
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

    // logic if the previous question was correct or not. if the answer was correct you show correct text in green. if the answer was incorrect you show incorrect in red.
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

// performs logic based on the answer selected. hides the previous question.
var selectAnswer = function (event) {
    var selectedButton = event.target;
    var answer = selectedButton.getAttribute('data-correct');

    if (answer == 'true') {
        var questionContainer = document.querySelector('#question-container-' + questionNumber);
        questionContainer.classList.add('hide');

        previousAnswer = "correct";

        questionNumber++;
        if (questionNumber < 5) {
            nextQuestion();
        } else {
            debugger;
            isGameOver = true;
            gameOver();
        }
    } else {
        var questionContainer = document.querySelector('#question-container-' + questionNumber);
        questionContainer.classList.add('hide');

        previousAnswer = "incorrect";
        loseTime();

        questionNumber++;
        if (questionNumber < 5) {
            nextQuestion();
        } else {
            isGameOver = true;
            gameOver();
        }
    }
}

// loads the game over section.
var gameOver = function () {
    // create game over elements
    var gameOver = document.createElement("div");
    gameOver.className = "game-over-container";

    var gameOverTitle = document.createElement("h2");
    gameOverTitle.textContent = "All Done!";
    gameOver.appendChild(gameOverTitle);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is " + timeleft;
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

// sets the score based on the time.
var setScore = function (event) {
    var currentScore = timeleft;
    var currentName = currentPlayer.value;
    var playerScores = [];
    var savedScores = localStorage.getItem("scores");

    // if the saved score is blank then add them
    if (!savedScores) {
        playerScores.push([currentName, currentScore]);
        localStorage.setItem("scores", JSON.stringify(playerScores));
    }
    // if not get the saved scores
    else {
        var getSavedScores = localStorage.getItem("scores");
        getSavedScores = JSON.parse(getSavedScores);
        getSavedScores.push([currentName, currentScore]);
        // sort high scores
        getSavedScores.sort(sortScores);
        localStorage.setItem("scores", JSON.stringify(getSavedScores));
    }

    var gameOver = document.querySelector(".game-over-container");
    gameOver.className = "hide";
    highScore();
    event.preventDefault();
}

// sorts the scores based on the time then by the name in alphabetical order if the scores are the same.
var sortScores = function (arr1, arr2) {
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

// shows the high score section along with the high scores.
var highScore = function () {
    // hides the start container
    startContainer.classList.add('hide');

    // creates the high score elements
    var highScoreContainer = document.createElement("div");
    highScoreContainer.className = "high-score-container";

    var highScoreTitle = document.createElement("h2");
    highScoreTitle.textContent = "High Scores";
    highScoreContainer.appendChild(highScoreTitle);

    var getSavedScores = localStorage.getItem("scores");
    getSavedScores = JSON.parse(getSavedScores);

    var scoreContainer = document.createElement("div");
    scoreContainer.className = "score-container";

    // if there's nothing in the saved scores then alert that and reload the page
    if (getSavedScores == null) {
        window.alert("There are currently no high scores. The page will refresh.");
        location.reload();
    }

    // create a new high score section for each highscore in the array
    for (var i = 0; i < getSavedScores.length; i++) {
        var score = document.createElement("p");
        var iCount = i + 1;
        score.className = "high-score";
        score.textContent = iCount + ". " + getSavedScores[i][0] + ": " + getSavedScores[i][1];
        scoreContainer.appendChild(score);
    }

    highScoreContainer.appendChild(scoreContainer);

    // go back button
    var goBack = document.createElement("button");
    goBack.className = "btn high-score-btn";
    goBack.textContent = "Retake Quiz";
    highScoreContainer.appendChild(goBack);

    // clear high scores button
    var clearHighScores = document.createElement("button");
    clearHighScores.className = "btn high-score-btn";
    clearHighScores.textContent = "Clear High Scores";
    highScoreContainer.appendChild(clearHighScores);

    // reset high scores
    var resetHighScores = function () {
        var scoreContainer = document.querySelector('.score-container');
        scoreContainer.className = "hide";

        localStorage.clear();
    }

    clearHighScores.addEventListener('click', resetHighScores);

    // restart game
    var restartGame = function () {
        location.reload();
    }

    goBack.addEventListener('click', restartGame);

    // add to main container
    var mainContainer = document.getElementById("main-container");
    mainContainer.appendChild(highScoreContainer);
}

// variables for the timer function.
var startTime = 90;
document.getElementById("timer").textContent = "Time: " + startTime;
var timeLeftString = document.getElementById("timer").textContent;
var timeleft = parseInt(timeLeftString.slice(5));

// timer function that begins when the user starts the quiz.
var startTimer = function () {
    var downloadTimer = setInterval(function () {
        document.getElementById("timer").textContent = "Time: " + timeleft;

        // if the game is over clear the timer
        if (isGameOver === true) {
            clearInterval(downloadTimer);
        }
        // else if time is under 0 clear the timer and run the game over function
        else if (timeleft < 0) {
            clearInterval(downloadTimer);
            var questionContainer = document.querySelector('#question-container-' + questionNumber);
            questionContainer.classList.add('hide');
            timeleft = 0;
            document.getElementById("timer").textContent = timeleft;
            gameOver();
        }
        // otherwise remove 1 from the timer
        else {
            timeleft -= 1;
        }

    }, 1000);
}

// user looses 9 seconds along with the 1 second from the function above for a total of 10 seconds if their previous answer was incorrect.
var loseTime = function () {
    timeleft = timeleft - 9;
    document.getElementById("timer").textContent = "Time: " + timeleft;
}

// adds event listener to view high scores in header
var viewHighScores = document.getElementById("view-high-scores");
viewHighScores.addEventListener('click', highScore);

// adds event listener to start button.
startButton.addEventListener('click', startGame);