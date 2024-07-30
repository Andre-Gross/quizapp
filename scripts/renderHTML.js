function startScreenHTML(quizcardContent) {
    quizcardContent.innerHTML = '';
    quizcardContent.innerHTML = /*HTML*/`
        <div class="d-flex flex-column">
            <h5 class="text-center mt-5 card-title w-75 align-self-center">Welcom to the awesome AI Quiz</h5>
            <p class="text-center card-text w-75 align-self-center">Ready for the challenge?</p>
        </div>
        <a href="#" class="btn align-self-end bg-ff4d10 text-light fs-6 font-weight-light" onclick="nextSide()"><span class="mr-3">START NOW</span> ></a>
    `
}


function endScreenHTML(quizcardContent) {
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