initGame();

function initGame() {
    let cardsNumber;
    do {
        cardsNumber = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
        console.log(cardsNumber);
        if (((cardsNumber % 2) !== 0) || cardsNumber < 4 || cardsNumber > 14) {
            cardsNumber = null;
            console.log("teste")
        }     
    } while (!cardsNumber);
    startGame(cardsNumber);
}

function startGame(cardsNumber) {
    alert("O jogo vai começar com " + cardsNumber + " cartas!");

    addCards(cardsNumber);
}

function addCards(number) {
    const gameContent = document.querySelector(".game-content");
    for (let i = 0; i < number; i++) {
        gameContent.innerHTML = gameContent. innerHTML + 
        '<div class="card">' +  
            '<img src="assets/front.png" alt="" srcset="">' +
        '</div>'        
    }
}