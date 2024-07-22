let questions = [
    {
        "question": "Wer gilt als Pionier der Künstlichen Intelligenz?",
        "answer_1": "Isaac Newton",
        "answer_2": "Alan Turing",
        "answer_3": "Albert Einstein",
        "answer_4": "Charles Babbage",
        "right_answer": 2
    },
    {
        "question": "Welcher der folgenden Begriffe bezeichnet eine Unterkategorie der Künstlichen Intelligenz, die auf neuronalen Netzen basiert?",
        "answer_1": "Fuzzy-Logik",
        "answer_2": "Expertensysteme",
        "answer_3": "Deep Learning",
        "answer_4": "Evolutionäre Algorithmen",
        "right_answer": 3
    },
    {
        "question": "Welcher Test wird verwendet, um festzustellen, ob eine Maschine menschliches Denkvermögen simulieren kann?",
        "answer_1": "Turing-Test",
        "answer_2": "Moore-Test",
        "answer_3": "Gödel-Test",
        "answer_4": "Lovelace-Test",
        "right_answer": 1
    },
    {
        "question": "Welche Programmiersprache wird am häufigsten für maschinelles Lernen und KI verwendet?",
        "answer_1": "Java",
        "answer_2": "C++",
        "answer_3": "Python",
        "answer_4": "Ruby",
        "right_answer": 3
    }
]


let currentQuestion = 0;
let lastSelection = 0;
let gaveAnswer = false;


function init() {
    resetAnswercardsAndBadges();
    fillQuestionTextAndAnswers();

    document.getElementById('nextButton').disabled = true;
}


function resetAnswercardsAndBadges() {
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answercard_${i}`).classList.remove('wrongAnswercard');
        document.getElementById(`answercard_${i}`).classList.remove('rightAnswercard');
        document.getElementById(`answercard_${i}`).classList.add('answercard');

        document.getElementById(`answerBadge_${i}`).classList.remove('wrongAnswerBadge');
        document.getElementById(`answerBadge_${i}`).classList.remove('rightAnswerBadge');
        document.getElementById(`answerBadge_${i}`).classList.add('answerBadge');

        document.getElementById(`answercard_${i}`).classList.add('hovereffect')
    }

    gaveAnswer = false;
}


function fillQuestionTextAndAnswers() {
    let question = questions[currentQuestion];

    document.getElementById('questionText').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
}


// Funktion um die Farbkodierung anzuzeigen, ob die geklickte Antwort richtig oder falsch war.
function selectedAnswer(selection) {
    lastSelection = selection;

    switch (gaveAnswer) {
        case true:
            break;
        case false:
            gaveAnswer = true

            addColoursToRightAndWrongAnswers(selection);
    }

    for (let i = 1; i < 5; i++) {
        document.getElementById(`answercard_${i}`).classList.remove('hovereffect')
    }

    document.getElementById('nextButton').disabled = false;
}


function addColoursToRightAndWrongAnswers(selection) {
    let question = questions[currentQuestion];
    
    switch (selection) {
        case question.right_answer:
            document.getElementById(`answercard_${selection}`).classList.add('rightAnswercard');

            document.getElementById(`answerBadge_${selection}`).classList.remove('answerBadge');
            document.getElementById(`answerBadge_${selection}`).classList.add('rightAnswerBadge');
            break;
        default:
            document.getElementById(`answercard_${question.right_answer}`).classList.add('rightAnswercard');

            document.getElementById(`answerBadge_${question.right_answer}`).classList.remove('answerBadge');
            document.getElementById(`answerBadge_${question.right_answer}`).classList.add('rightAnswerBadge');

            document.getElementById(`answercard_${selection}`).classList.add('wrongAnswercard');

            document.getElementById(`answerBadge_${selection}`).classList.remove('answerBadge');
            document.getElementById(`answerBadge_${selection}`).classList.add('wrongAnswerBadge');
    }
}


function lastSide() {
    currentQuestion--;
    init();
}


function nextSide() {
    currentQuestion++;
    init();
}