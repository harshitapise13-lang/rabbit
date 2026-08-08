// ======================================
// LITTLE LEARNERS QUIZ GAME
// ======================================

const questions = [

    // Colors
    {
        category: "🎨 Colors",
        question: "Which one is RED? ❤️",
        answers: ["🔴", "🔵", "🟢", "🟡"],
        correct: 0
    },

    // Shapes
    {
        category: "🔷 Shapes",
        question: "Which one is a CIRCLE?",
        answers: ["🔺", "⬛", "🔵", "⭐"],
        correct: 2
    },

    // Animals
    {
        category: "🐾 Animals",
        question: "Which animal says MEOW? 🐱",
        answers: ["🐶", "🐱", "🐮", "🦁"],
        correct: 1
    },

    // Numbers
    {
        category: "🔢 Numbers",
        question: "How many apples? 🍎🍎🍎",
        answers: ["1️⃣", "2️⃣", "3️⃣", "5️⃣"],
        correct: 2
    },

    // Colors
    {
        category: "🎨 Colors",
        question: "Which one is BLUE? 💙",
        answers: ["🟡", "🔴", "🟢", "🔵"],
        correct: 3
    },

    // Shapes
    {
        category: "🔷 Shapes",
        question: "Which one is a STAR? ⭐",
        answers: ["❤️", "⭐", "🔵", "⬛"],
        correct: 1
    },

    // Animals
    {
        category: "🐾 Animals",
        question: "Which animal says WOOF? 🐶",
        answers: ["🐱", "🐸", "🐶", "🐔"],
        correct: 2
    },

    // Numbers
    {
        category: "🔢 Numbers",
        question: "How many bananas? 🍌🍌",
        answers: ["1️⃣", "2️⃣", "4️⃣", "5️⃣"],
        correct: 1
    }
];


// ======================================
// GAME VARIABLES
// ======================================

let currentQuestion = 0;
let score = 0;
let answered = false;


// ======================================
// GET HTML ELEMENTS
// ======================================

const quizScreen =
    document.getElementById("quiz-screen");

const resultScreen =
    document.getElementById("result-screen");

const category =
    document.getElementById("category");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const feedback =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("next-btn");

const stars =
    document.getElementById("stars");

const progress =
    document.getElementById("progress");

const finalScore =
    document.getElementById("score");

const finalMessage =
    document.getElementById("message");


// ======================================
// START GAME
// ======================================

function startGame() {

    currentQuestion = 0;

    score = 0;

    answered = false;

    quizScreen.classList.remove("hidden");

    resultScreen.classList.add("hidden");

    showQuestion();
}


// ======================================
// SHOW QUESTION
// ======================================

function showQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    category.textContent = current.category;

    question.textContent = current.question;

    feedback.textContent = "";

    nextButton.classList.add("hidden");

    answers.innerHTML = "";


    // Create answer buttons

    current.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.setAttribute(
            "aria-label",
            "Answer option"
        );

        button.addEventListener(
            "click",
            () => checkAnswer(index, button)
        );

        answers.appendChild(button);
    });


    updateProgress();
}


// ======================================
// CHECK ANSWER
// ======================================

function checkAnswer(selected, button) {

    // Prevent multiple clicks
    if (answered) {
        return;
    }

    answered = true;

    const correctAnswer =
        questions[currentQuestion].correct;


    // Correct
    if (selected === correctAnswer) {

        score++;

        button.classList.add("correct");

        feedback.textContent =
            randomFeedback([
                "🎉 Yay! Correct!",
                "⭐ Super!",
                "🥳 Amazing!",
                "👏 Great job!",
                "🌈 You got it!"
            ]);

    }

    // Wrong
    else {

        button.classList.add("wrong");

        feedback.textContent =
            randomFeedback([
                "😊 Nice try!",
                "💪 Almost!",
                "🌟 Good try!",
                "🐣 Let's try again!"
            ]);


        // Show correct answer
        const allButtons =
            document.querySelectorAll(".answer-btn");

        allButtons[correctAnswer]
            .classList.add("correct");
    }


    updateProgress();


    // Last question
    if (
        currentQuestion ===
        questions.length - 1
    ) {

        setTimeout(showResult, 900);

    }

    // More questions
    else {

        nextButton.classList.remove("hidden");
    }
}


// ======================================
// NEXT QUESTION
// ======================================

nextButton.addEventListener(
    "click",
    function () {

        currentQuestion++;

        if (
            currentQuestion <
            questions.length
        ) {

            showQuestion();

        } else {

            showResult();
        }
    }
);


// ======================================
// UPDATE PROGRESS
// ======================================

function updateProgress() {

    let starText = "";

    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (i < score) {

            starText += "⭐ ";

        } else {

            starText += "☆ ";
        }
    }

    stars.textContent = starText;


    let completed =
        currentQuestion +
        (answered ? 1 : 0);

    let percentage =
        (completed / questions.length) * 100;

    progress.style.width =
        Math.min(percentage, 100) + "%";
}


// ======================================
// SHOW RESULT
// ======================================

function showResult() {

    quizScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    finalScore.textContent =
        `You got ${score} out of ${questions.length}!`;


    if (
        score === questions.length
    ) {

        finalMessage.textContent =
            "🏆 WOW! You got everything right! You are a SUPER STAR! 🌟";

    }

    else if (
        score >= questions.length * 0.75
    ) {

        finalMessage.textContent =
            "🌈 Fantastic! You are a super learner! ⭐";

    }

    else if (
        score >= questions.length * 0.5
    ) {

        finalMessage.textContent =
            "🎉 Great job! Keep learning and playing!";

    }

    else {

        finalMessage.textContent =
            "💪 Good try! Play again and learn more!";
    }
}


// ======================================
// RANDOM FEEDBACK
// ======================================

function randomFeedback(messages) {

    const index =
        Math.floor(
            Math.random() * messages.length
        );

    return messages[index];
}


// ======================================
// START GAME WHEN PAGE LOADS
// ======================================

startGame();