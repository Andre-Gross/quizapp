


function startScreenHTML() {
    quizcardContent.innerHTML = '';
    quizcardContent.innerHTML = /*HTML*/`
        <div class="d-flex flex-column">
            <h5 class="text-center mt-5 card-title w-75 align-self-center">Welcom to the awesome AI Quiz</h5>
            <p class="text-center card-text w-75 align-self-center">Ready for the challenge?</p>
        </div>
        <a href="#" class="btn align-self-end bg-ff4d10 text-light fs-6 font-weight-light" onclick="nextSide()"><span class="mr-3">START NOW</span> ></a>
    `
}


function endScreenHTML() {
    quizcardContent.innerHTML = '';
    quizcardContent.innerHTML = /*HTML*/`
    <div class="endScreen d-flex flex-column justify-content-between">
        <img class="h-25" src="img/brain result.png" alt="">
        <p>COMPLETE KI QUIZ</p>
        <p>
            <span class="text-ff4d10 mr-16p">YOUR SCORE </span>
            <span>${rightGivenAnswers}/${questions.length}</span>
        </p>
        <div class="d-flex flex-column">
            <button class="btn btn-primary">SHARE</button>
            <button onclick="replay()" class="btn text-primary">REPLAY</button>
        </div>
    </div>
    `
}


function fillQnAHTML() {
    let quizcardContent = document.getElementById('quizcardContent');
    quizcardContent.innerHTML = '';
    quizcardContent.innerHTML = /*HTML*/`
        <h5 id="questionText" class="card-title">Frage</h5>

        <div class="card border-0 rounded-0 mb-2">
            <div id="answercard_1" class="card-body answercard hovereffect d-inline-flex"
                onclick="selectedAnswer(1)">
                <span id="answerBadge_1" class="answerBadge badge rounded-0">A</span>
                <div class="d-flex align-items-center">
                    <span id="answer_1" class="answerText">Anwort</span>
                </div>
            </div>
        </div>

        <div class="card border-0 rounded-0 mb-2">
            <div id="answercard_2" class="card-body answercard hovereffect d-inline-flex"
                onclick="selectedAnswer(2)">
                <span id="answerBadge_2" class="answerBadge badge rounded-0">B</span>
                <div class="d-flex align-items-center">
                    <span id="answer_2" class=" answerText">Anwort</span>
                </div>
            </div>
        </div>

        <div class="card border-0 rounded-0 mb-2">
            <div id="answercard_3" class="card-body answercard hovereffect d-inline-flex"
                onclick="selectedAnswer(3)">
                <span id="answerBadge_3" class="answerBadge badge rounded-0">C</span>
                <div class="d-flex align-items-center">
                    <span id="answer_3" class="answerText">Anwort</span>
                </div>
            </div>
        </div>

        <div class="card border-0 rounded-0 mb-2">
            <div id="answercard_4" class="card-body answercard hovereffect d-inline-flex"
                onclick="selectedAnswer(4)">
                <span id="answerBadge_4" class="answerBadge badge rounded-0">D</span>
                <div class="d-flex align-items-center">
                    <span id="answer_4" class="answerText">Anwort</span>
                </div>
            </div>
        </div>
    `;

}