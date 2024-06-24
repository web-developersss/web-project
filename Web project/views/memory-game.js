// Function to open the memory game modal
function openMemoryGame() {
    let modal = document.getElementById('memory-game-modal');
    modal.style.display = "flex";
    setTimeout(() => modal.querySelector('.modal-content').classList.add('show'), 10);
    document.getElementById('main-content').classList.add('blur'); // Add blur to main content

    // Initialize the memory game when the modal is opened
    initializeMemoryGame();
}

// Function to close the memory game modal
function closeMemoryGame() {
    let modal = document.getElementById('memory-game-modal');
    modal.querySelector('.modal-content').classList.remove('show');
    setTimeout(() => modal.style.display = "none", 300);
    document.getElementById('main-content').classList.remove('blur'); // Remove blur from main content
}

// Function to initialize the memory game
function initializeMemoryGame() {
    const cardsArray = [
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' }
    ];

    cardsArray.sort(() => 0.5 - Math.random());

    const grid = document.getElementById('grid');
    grid.innerHTML = ''; // Clear previous cards
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    cardsArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${item.img}</div>
            </div>
        `;
        card.dataset.name = item.name;
        grid.appendChild(card);
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.name === secondCard.dataset.name) {
            disableCards();
            if (document.querySelectorAll('.card.flipped').length === cardsArray.length) {
                document.getElementById('coupon').classList.remove('hidden');
                document.getElementById('coupon-code').innerText = generateCouponCode();
            }
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function generateCouponCode() {
        return "DISCOUNT2024";
    }
}
