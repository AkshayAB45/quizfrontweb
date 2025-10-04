// --- DATA: Quiz Questions ---
const quizQuestions = [
    {
        question: "What is the capital city of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    },
    {
        question: "Which element's chemical symbol is 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        answer: "Oxygen"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        answer: "Mars"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Great White Shark"],
        answer: "Blue Whale"
    }
];

// --- STATE MANAGEMENT ---
let currentQuestionIndex = 0;
let score = 0;

// --- DOM ELEMENT REFERENCES ---
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const nextButtonEl = document.getElementById('next-button');
const restartButtonEl = document.getElementById('restart-button');
const resultsAreaEl = document.getElementById('results-area');
const questionAreaEl = document.getElementById('question-area');
const finalScoreEl = document.getElementById('final-score');
const totalQuestionsEl = document.getElementById('total-questions');
const resultMessageEl = document.getElementById('result-message');


// --- CORE FUNCTIONS ---

/**
 * Starts the quiz by resetting state and displaying the first question.
 */
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreEl.textContent = score;

    questionAreaEl.classList.remove('hidden');
    resultsAreaEl.classList.add('hidden');
    nextButtonEl.classList.add('hidden');
    restartButtonEl.classList.add('hidden');
    
    displayQuestion();
}

/**
 * Displays the current question and its options.
 */
function displayQuestion() {
    optionsContainerEl.innerHTML = '';
    nextButtonEl.classList.add('hidden');

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionTextEl.textContent = currentQuestion.question;

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        // Use the new, simple class for styling option buttons
        button.classList.add('option-btn');
        button.onclick = () => selectAnswer(button, option);
        optionsContainerEl.appendChild(button);
    });
}

/**
 * Handles the user's answer selection, provides feedback, and updates the score.
 * @param {HTMLButtonElement} buttonEl The button element that was clicked.
 * @param {string} selectedOption The text content of the selected option.
 */
function selectAnswer(buttonEl, selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    if (isCorrect) {
        score++;
        scoreEl.textContent = score;
        buttonEl.classList.add('correct');
    } else {
        buttonEl.classList.add('incorrect');
    }

    Array.from(optionsContainerEl.children).forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQuestion.answer) {
            btn.classList.add('correct');
        }
    });
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextButtonEl.classList.remove('hidden');
    } else {
        // Use a short delay before showing results to let the user see the feedback
        setTimeout(showResults, 1000); 
    }
}

/**
 * Displays the final results of the quiz.
 */
function showResults() {
    questionAreaEl.classList.add('hidden');
    resultsAreaEl.classList.remove('hidden');
    nextButtonEl.classList.add('hidden');
    restartButtonEl.classList.remove('hidden');
    
    finalScoreEl.textContent = score;
    totalQuestionsEl.textContent = quizQuestions.length;

    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) {
        resultMessageEl.textContent = "Perfect score! You're a quiz master!";
    } else if (percentage >= 75) {
        resultMessageEl.textContent = "Excellent work! You really know your stuff.";
    } else if (percentage >= 50) {
        resultMessageEl.textContent = "Good job! A solid performance.";
    } else {
        resultMessageEl.textContent = "Nice try! Keep learning and try again.";
    }
}

// --- EVENT LISTENERS ---
nextButtonEl.addEventListener('click', () => {
    currentQuestionIndex++;
    displayQuestion();
});

restartButtonEl.addEventListener('click', startQuiz);

// --- INITIALIZATION ---
// This ensures the quiz starts as soon as the HTML content is fully loaded.
document.addEventListener('DOMContentLoaded', startQuiz);

