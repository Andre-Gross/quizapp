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


let currentQuestion = -1;
let lastSelection = 0;
let gaveAnswer = false;
let lastAnswers = [];
let rightGivenAnswers = 0;

let AUDIO_SUCCES = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3')


function init() {
    let quizcardContent = document.getElementById('quizcardContent');

    document.getElementById('lastAndNextButton').classList.remove('d-none');
    document.getElementById('trophyRight').classList.add('d-none');

    if (currentQuestion < 0) {
        showStartScreen(quizcardContent);
    } else if (currentQuestion >= questions.length) {
        showEndScreen(quizcardContent);
    } else {
        showQuestionsAndAnswers(quizcardContent);
    }

    updateProgressBar()
    document.getElementById('nextButton').disabled = true;
}


function showStartScreen(quizcardContent) {
    document.getElementById('lastAndNextButton').classList.add('d-none');

    startScreenHTML(quizcardContent);
}


function showEndScreen(quizcardContent) {
    document.getElementById('trophyRight').classList.remove('d-none');
    document.getElementById('lastAndNextButton').classList.add('d-none');

    endScreenHTML(quizcardContent);
}


function showQuestionsAndAnswers(quizcardContent) {
    quizcardContent.classList.remove('align-items-center');
    fillQnAHTML(quizcardContent);
    resetAnswers();
    fillQnAContent(quizcardContent);
}


// Entfernt die Farbcodierungen von den richtigen und falschen Antworten
function resetAnswers() {
    for (let i = 1; i < 5; i++) {
        resetAnswerCards(i);
        resetAnswerBadges(i)

        document.getElementById(`answercard_${i}`).classList.add('hovereffect') //Aktiviert den Hovereffect
    }

    gaveAnswer = false;
}


function resetAnswerCards(i) {
    document.getElementById(`answercard_${i}`).classList.remove('wrongAnswercard');
    document.getElementById(`answercard_${i}`).classList.remove('rightAnswercard');
    document.getElementById(`answercard_${i}`).classList.add('answercard');
}


function resetAnswerBadges(i) {
    document.getElementById(`answerBadge_${i}`).classList.remove('wrongAnswerBadge');
    document.getElementById(`answerBadge_${i}`).classList.remove('rightAnswerBadge');
    document.getElementById(`answerBadge_${i}`).classList.add('answerBadge');
}


function fillQnAContent() {
    let question = questions[currentQuestion];

    document.getElementById('questionText').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
}


// Funktion um die Farbkodierung anzuzeigen, ob die geklickte Antwort richtig oder falsch war.
function selectedAnswer(selection) {

    switch (gaveAnswer) {
        case true:
            break;
        case false:
            gaveAnswer = true

            showRightAndWrongAnswers(selection);
            checkAnswer(selection);
    }
    for (let i = 1; i < 5; i++) {
        document.getElementById(`answercard_${i}`).classList.remove('hovereffect')
    }
    document.getElementById('nextButton').disabled = false;
}


function checkAnswer(selection) {
    let rightAnswer = questions[currentQuestion].right_answer;

    if (selection == rightAnswer) {
        rightGivenAnswers++;
        lastAnswers.push(true);
        AUDIO_SUCCES.play();
    } else {
        lastAnswers.push(false);
        AUDIO_WRONG.play();
    }
}


function showRightAndWrongAnswers(selection) {
    let rightAnswer = questions[currentQuestion].right_answer;

    switch (selection) {
        case wrongAnswer(selection, rightAnswer):
            showWrongSelection(selection);
        default:
            showRightAnswer(rightAnswer);
    }
}


function wrongAnswer(selection, rightAnswer) {
    if (selection != rightAnswer) {
        return selection
    }
}


function showRightAnswer(selection) {
    document.getElementById(`answercard_${selection}`).classList.add('rightAnswercard');
    document.getElementById(`answerBadge_${selection}`).classList.remove('answerBadge');
    document.getElementById(`answerBadge_${selection}`).classList.add('rightAnswerBadge');
}


function showWrongSelection(selection) {
    document.getElementById(`answercard_${selection}`).classList.add('wrongAnswercard');
    document.getElementById(`answerBadge_${selection}`).classList.remove('answerBadge');
    document.getElementById(`answerBadge_${selection}`).classList.add('wrongAnswerBadge');
}


function updateProgressBar() {
    if (currentQuestion >= 0) {+
        showProgressBar();
    } else {
        hideProgressBar();
    }
}


function showProgressBar() {
    let percent = calculatePercent();

    document.getElementById('progress').classList.remove('d-none');
    document.getElementById('progress-alternate').classList.add('d-none');

    document.getElementById('progress-bar').style = `width: ${percent}%`;
    document.getElementById('progress-bar').innerHTML = `${percent}%`
}


function calculatePercent() {
    let percent = currentQuestion / questions.length;
    percent = percent * 100;
    percent = Math.round(percent);

    return percent;
}


function hideProgressBar() {
    document.getElementById('progress').classList.add('d-none');
    document.getElementById('progress-alternate').classList.remove('d-none');
}



function lastSide() {
    currentQuestion--;
    let lastSingleAnswer = lastAnswers[currentQuestion];

    switch (lastSingleAnswer) {
        case true:
            rightGivenAnswers--;
        default:
            lastAnswers.splice[currentQuestion, 1];
    }
    init();
}


function nextSide() {
    currentQuestion++;
    init();
}


function replay() {
    currentQuestion = -1;
    rightGivenAnswers = 0;
    lastAnswers = [];
    init();
}