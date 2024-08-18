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


function remove(id, styleClass) {
    document.getElementById(id).classList.remove(styleClass);
}


function add(id, styleClass) {
    document.getElementById(id).classList.add(styleClass);
}


function fillHTML(id, content) {
    document.getElementById(id).innerHTML = `${content}`;
}


function init() {
    remove('lastAndNextButton', 'd-none');
    add('trophyRight', 'd-none');

    if (currentQuestion < 0) {
        showStartScreen();
    } else if (currentQuestion >= questions.length) {
        showEndScreen();
    } else {
        showQuestionsAndAnswers();
    }

    updateProgressBar()
    document.getElementById('nextButton').disabled = true;
}


function showStartScreen() {
    add('lastAndNextButton', 'd-none');

    startScreenHTML();
}


function showEndScreen() {
    remove('trophyRight', 'd-none');
    add('lastAndNextButton', 'd-none');

    endScreenHTML();
}


function showQuestionsAndAnswers() {
    remove('quizcardContent', 'align-items-center');
    fillQnAHTML();
    resetAnswers();
    fillQnAContent();
}


function resetAnswers() {
    for (let i = 1; i < 5; i++) {
        resetAnswerCards(i);
        resetAnswerBadges(i)

        add(`answercard_${i}`, 'hovereffect');
    }

    gaveAnswer = false;
}


function resetAnswerCards(i) {
    remove(`answercard_${i}`, 'wrongAnswercard');
    remove(`answercard_${i}`, 'rightAnswercard');
    add(`answercard_${i}`, 'answercard');
}


function resetAnswerBadges(i) {
    remove(`answerBadge_${i}`, 'wrongAnswerBadge');
    remove(`answerBadge_${i}`, 'rightAnswerBadge');
    add(`answerBadge_${i}`, 'answerBadge');
}


function fillQnAContent() {
    let question = questions[currentQuestion];

    fillHTML('questionText', question.question);
    fillHTML('answer_1', question.answer_1);
    fillHTML('answer_2', question.answer_2);
    fillHTML('answer_3', question.answer_3);
    fillHTML('answer_4', question.answer_4);
}


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
        remove(`answercard_${i}`, 'hovereffect')
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
    add(`answercard_${selection}`, 'rightAnswercard');
    remove(`answerBadge_${selection}`, 'answerBadge');
    add(`answerBadge_${selection}`, 'rightAnswerBadge');
}


function showWrongSelection(selection) {
    add(`answercard_${selection}`, 'wrongAnswercard');
    remove(`answerBadge_${selection}`, 'answerBadge');
    add(`answerBadge_${selection}`, 'wrongAnswerBadge');
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

    remove('progress', 'd-none');
    add('progress-alternate', 'd-none');

    document.getElementById('progress-bar').style = `width: ${percent}%`;
    fillHTML('progress-bar', `${percent}%`);
}


function calculatePercent() {
    let percent = currentQuestion / questions.length;
    percent = percent * 100;
    percent = Math.round(percent);

    return percent;
}


function hideProgressBar() {
    add('progress', 'd-none');
    remove('progress-alternate', 'd-none');
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