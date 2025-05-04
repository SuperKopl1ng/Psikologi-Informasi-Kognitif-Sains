document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const flashcard = document.getElementById('flashcard');
    const flashcardInner = document.getElementById('flashcard-inner');
    const questionEl = document.getElementById('question');
    const answerEl = document.getElementById('answer');
    const correctBtn = document.getElementById('correct-btn');
    const wrongBtn = document.getElementById('wrong-btn');
    const addCardBtn = document.getElementById('add-card-btn');
    const addCardForm = document.getElementById('add-card-form');
    const saveCardBtn = document.getElementById('save-card-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const newQuestionInput = document.getElementById('new-question');
    const newAnswerInput = document.getElementById('new-answer');
    const deleteBtn = document.getElementById('delete-btn');
    deleteBtn.addEventListener('click', deleteCurrentCard);

    // Sample Data
    let flashcards = [
        { question: "Apa hukum Newton pertama?", answer: "Hukum Inersia: Benda diam tetap diam kecuali ada gaya eksternal" },
        { question: "Apa ibukota Jepang?", answer: "Tokyo" },
        { question: "Rumus luas lingkaran?", answer: "π × r²" }
    ];

    let currentCardIndex = 0;
    let difficultCards = [];

    // Initialize
    showCurrentCard();

    // Event Listeners
    flashcard.addEventListener('click', flipCard);
    correctBtn.addEventListener('click', () => handleAnswer(true));
    wrongBtn.addEventListener('click', () => handleAnswer(false));
    addCardBtn.addEventListener('click', showAddCardForm);
    saveCardBtn.addEventListener('click', saveNewCard);
    cancelBtn.addEventListener('click', hideAddCardForm);
    deleteBtn.addEventListener('click', deleteCurrentCard);

    // Functions
    function showCurrentCard() {
        if (flashcards.length === 0) {
            questionEl.textContent = "Tidak ada kartu tersedia";
            answerEl.textContent = "";
            return;
        }
        questionEl.textContent = flashcards[currentCardIndex].question;
        answerEl.textContent = flashcards[currentCardIndex].answer;
        flashcard.classList.remove('flipped');
    }

    function flipCard() {
        flashcard.classList.toggle('flipped');
    }

    function handleAnswer(isCorrect) {
        if (!isCorrect) {
            difficultCards.push(flashcards[currentCardIndex]);
        }

        // Simple spaced repetition: Prioritize difficult cards
        if (difficultCards.length > 0 && Math.random() > 0.7) {
            currentCardIndex = flashcards.indexOf(difficultCards.pop());
        } else {
            currentCardIndex = (currentCardIndex + 1) % flashcards.length;
        }

        showCurrentCard();
    }

    function showAddCardForm() {
        addCardForm.style.display = 'block';
        newQuestionInput.value = '';
        newAnswerInput.value = '';
    }

    function hideAddCardForm() {
        addCardForm.style.display = 'none';
    }

    function saveNewCard() {
        const newQuestion = newQuestionInput.value.trim();
        const newAnswer = newAnswerInput.value.trim();

        if (newQuestion && newAnswer) {
            flashcards.push({ question: newQuestion, answer: newAnswer });
            hideAddCardForm();
            if (flashcards.length === 1) { // If it was empty before
                currentCardIndex = 0;
                showCurrentCard();
            }
        }
    }

    function deleteCurrentCard() {
        if (flashcards.length === 0) return;       
        flashcards.splice(currentCardIndex, 1);
                
        if (flashcards.length === 0) {
            questionEl.textContent = "Semua kartu telah dihapus.";
            answerEl.textContent = "";
            return;
        }    
        // Pastikan index tetap valid
        currentCardIndex = currentCardIndex % flashcards.length;
        showCurrentCard();
    }
});