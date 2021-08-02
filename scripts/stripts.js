//CARD IMGS DATASET 
const imgs = [
	'<img src="assets/bobrossparrot.gif" alt="bobrossparrot"',
	'<img src="assets/explodyparrot.gif" alt="explodyparrot"',
	'<img src="assets/fiestaparrot.gif" alt="fiestaparrot"',
	'<img src="assets/metalparrot.gif" alt="metalparrot"',
	'<img src="assets/revertitparrot.gif" alt="revertitparrot"',
	'<img src="assets/tripletsparrot.gif" alt="tripletsparrot"',
	'<img src="assets/unicornparrot.gif" alt="unicornparrot"'
]

// TIMER GLOBAL VARIABLES AND FUNCTION
let intervalId;
let timerInterval;
let time;

function startTimer() {
	const timer = document.querySelector(".timer");
	timer.innerHTML = time;
	time++;
}

// GLOBAL VARIABLE THAT COUNTS HOW MANY TIMES A CARD HAS BEEN TURNED OVER
let plays;

initGame();

function initGame() {
	//inicializing global variables
	plays = 0;
	time = 0;
	document.querySelector(".timer").innerHTML = 0;

	askPlayerName();

	timerInterval = setInterval(startTimer, 1000);
	
	let cardsNumber;
	do {
		cardsNumber = Number(prompt("Com quantas cartas você quer jogar? Escolha um número par de 4 a 14."));
		if (((cardsNumber % 2) !== 0) || cardsNumber < 4 || cardsNumber > 14) {
			cardsNumber = null;
		}
	} while (!cardsNumber);

	alert("O jogo vai começar com " + cardsNumber + " cartas!");
	addCards(cardsNumber);
	intervalId = setInterval(launchGame, 1000, cardsNumber);
}

function addCards(number) {
	const cards = imgs.slice(0, (number / 2));
	for (let i = 0; i < number / 2; i++) {
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

function launchGame(cardsNumber) {
	localStorage.setItem('cardsNumber', cardsNumber);
	verifyPair();
	if (isVictory(cardsNumber)) {
		saveScore();
		askToPlayAgain();
	}
}

function verifyPair() {
	let selectedCards = document.querySelectorAll(".selected");

	if (selectedCards[0] && selectedCards[1]) {
		if (selectedCards[0].innerHTML === selectedCards[1].innerHTML) {
			for (let i = 0; i < selectedCards.length; i++) {
				scorePoints(selectedCards);
			}
		}else {
			setTimeout(turnDown, 1000, selectedCards);
		}
		selectedCards = [];
	}

	console.log(plays);
}

function scorePoints(selectedCards) {
	for (let i = 0; i < selectedCards.length; i++) {
		selectedCards[i].classList.add("correct");
		selectedCards[i].classList.remove("selected");
	}
}

function isVictory(cardsNumber) {
	let correctCards = document.querySelectorAll(".correct");

	if (correctCards.length == cardsNumber) {
		alert("Parabéns! Você ganhou em " + plays + " jogadas.");
		clearInterval(timerInterval);
		clearInterval(intervalId);

		return true;
	}
	return false;
}

function saveScore() {
	const name = localStorage.getItem('name');
	const cardsNumber = localStorage.getItem('cardsNumber');
	const score = {
		name,
		cardsNumber,
		score: plays
	}

	let rank = JSON.parse(localStorage.getItem('rank'));
	if (!rank) {
		rank = [];
	}

	rank.push(score);
	localStorage.setItem('rank', JSON.stringify(rank));
}

function askToPlayAgain() {
	const answer = prompt("Gostaria de jogar novamente? (Digite 'sim', caso queira)");
	if (!answer) {
		showPlayAgainBtn();
	}else if (answer !== "sim") {
		askToPlayAgain();
	}else {
		restartGame();	
	}
}

function restartGame() {	
	hidePlayAgainBtn();
	removeCards();
	initGame();
}

function askPlayerName() {
	let name = prompt("Qual o seu nome?");
	if(!name){
		name = "Sem nome";
	}
	localStorage.setItem('name', name);
}

function turnUp(selectedCard) {
	removeFastClicks();
	if (!selectedCard.classList.contains("selected")) {
		const selectedCards = document.querySelectorAll(".selected");
		if (selectedCards.length !== 2) {
			selectedCard.classList.add("selected");
		}
		plays++;
	}
}

function removeFastClicks(){
	const cards = document.querySelectorAll(".card");
	for (let i = 0; i < cards.length; i++) {
		cards[i].removeAttribute("onclick");
	}

	setTimeout(function(){
		for (let i = 0; i < cards.length; i++) {
			cards[i].setAttribute("onclick", "turnUp(this)");
		}
	}, 1100, cards);

}

function turnDown(cards) {
	for (let i = 0; i < cards.length; i++) {
		cards[i].classList.remove("selected");
	}
}

function showRank(button) {	
	const rankList = JSON.parse(localStorage.getItem('rank'));
	const scoreBoard = document.querySelector(".score-board");

	if (rankList) {
		rankList.sort(byPlays);
		rankList.sort(byCardsNumber);
		scoreBoard.innerHTML = "<div class='player-score title'><div class='name'>NOME</div><div class='points'>CARTAS</div><div class='points'>RODADAS</div></div>";
		for (let i = 0; i < rankList.length; i++) {
			scoreBoard.innerHTML += "<div class='player-score'><div class='name'>" + rankList[i].name + "</div><div class='points'>" + rankList[i].cardsNumber + "</div><div class='points'>" + rankList[i].score + "</div></div>";
		}
	}

	const gameContent = document.querySelector(".game-content");
	gameContent.classList.toggle("hide");
	scoreBoard.classList.toggle("show");
	toggleRankBtn (button);
}

function toggleRankBtn(button) {
	if (button.innerHTML === "VER RANK") {
		button.innerHTML = "JOGAR";
	}
	else {
		button.innerHTML = "VER RANK";
	}
}

function shuffle(array) {
	for (let i = 0; i < array.length; i++) {
		array.sort(random);
	}
}

function random() {
	return Math.random() - 0.5;
}

function byPlays(a, b) {
	if (a.score < b.score)
		return -1;

	if (a.score > b.score)
		return 1;

	return 0;
}

function byCardsNumber(a, b) {
	if (a.cardsNumber < b.cardsNumber)
		return -1;

	if (a.cardsNumber > b.cardsNumber)
		return 1;

	return 0;
} 

function showPlayAgainBtn() {
	const newGameBtn = document.querySelector(".newGame");
	newGameBtn.classList.remove("hide");
}

function hidePlayAgainBtn() {
	const newGameBtn = document.querySelector(".newGame");
	newGameBtn.classList.add("hide");
}

function removeCards() {
	const gameContent = document.querySelector(".game-content");
	gameContent.innerHTML = "";
}