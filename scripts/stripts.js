initGame();

function initGame() {
    let cardsNumber;
    do {
        cardsNumber = prompt("Com quantas cartas você quer jogar? Escolha um número par.");
        if (((cardsNumber % 2) === 0) && cardsNumber === "0") {
            cardsNumber = null;
        }     
    } while (!cardsNumber);
    startGame(cardsNumber);
}

function startGame(cardsNumber) {
    alert("O jogo vai começar com " + cardsNumber + " cartas!");
}