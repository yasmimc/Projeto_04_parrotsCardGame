const imgs = [
    '<img src="assets/bobrossparrot.gif" alt="bobrossparrot"',
    '<img src="assets/explodyparrot.gif" alt="explodyparrot"',
    '<img src="assets/fiestaparrot.gif" alt="fiestaparrot"',
    '<img src="assets/metalparrot.gif" alt="metalparrot"',
    '<img src="assets/revertitparrot.gif" alt="revertitparrot"',
    '<img src="assets/tripletsparrot.gif" alt="tripletsparrot"',
    '<img src="assets/unicornparrot.gif" alt="unicornparrot"'
]

initGame();

function initGame() {
    let cardsNumber;
    do {
        cardsNumber = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
        
        if (((cardsNumber % 2) !== 0) || cardsNumber < 4 || cardsNumber > 14) {
            cardsNumber = null;
        }     
    } while (!cardsNumber);
    startGame(cardsNumber);
}

function startGame(cardsNumber) {
    alert("O jogo vai começar com " + cardsNumber + " cartas!");

    addCards(cardsNumber);
}

function addCards(number) {
    const cards = imgs.slice(0, (number/2));
    for (let i = 0; i < number/2; i++) {
        cards.push(cards[i]);
    }
    shuffle(cards);

    const gameContent = document.querySelector(".game-content");
    for (let i = 0; i < number; i++) {
        gameContent.innerHTML = gameContent.innerHTML + 
        '<div class="card" onclick="turnUp(this);">' +  
            '<div class="front-face face">' +
                '<img src="assets/front.png" alt="">' +
            '</div>' +
            '<div class="back-face face">' +
                cards[i] +
            '</div>' +
        '</div>'        
    }
}

function turnUp (selectedCard) {
    selectedCard.classList.add("selected") 
}

function shuffle (array) {
    for (let i = 0; i < array.length; i++) {
        array.sort(random);        
    }
}

function random() {
    return Math.random() - 0.5;
}