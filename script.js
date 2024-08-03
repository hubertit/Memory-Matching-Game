document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.game-board');
    const restartBtn = document.getElementById('restart');
    const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
    let flippedCards = [];
    let matchedCards = [];

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createBoard() {
        shuffle(cardsArray);
        board.innerHTML = '';
        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            board.appendChild(cardElement);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            card.textContent = card.dataset.value;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.dataset.value === secondCard.dataset.value) {
            matchedCards.push(firstCard, secondCard);
        } else {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
        }

        flippedCards = [];

        if (matchedCards.length === cardsArray.length) {
            alert('You Win!');
        }
    }

    board.addEventListener('click', event => {
        if (event.target.classList.contains('card')) {
            flipCard(event.target);
        }
    });

    restartBtn.addEventListener('click', createBoard);

    createBoard();
});
