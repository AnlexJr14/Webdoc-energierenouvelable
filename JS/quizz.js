/* --- DONNÉES DU JEU --- */
const questions = [
    {
        question: "Les panneaux solaires ne fonctionnent pas quand il pleut.",
        isTrue: false,
        explanation: "Faux ! Ils fonctionnent grâce à la luminosité, pas la chaleur. Même sous la pluie, ils produisent (bien que moins qu'en plein soleil)."
    },
    {
        question: "Un panneau solaire est recyclable à 95%.",
        isTrue: true,
        explanation: "Vrai ! Le verre, l'aluminium et le silicium se recyclent très bien grâce à la filière Soren en France."
    },
    {
        question: "Il faut environ 10 ans à un panneau pour 'rembourser' l'énergie utilisée pour le fabriquer.",
        isTrue: false,
        explanation: "Intox ! Il faut seulement 1 an (en Europe) pour qu'un panneau produise plus d'énergie qu'il n'en a fallu pour sa fabrication."
    },
    {
        question: "L'autoconsommation permet de réduire sa facture d'électricité de 30 à 50%.",
        isTrue: true,
        explanation: "C'est vrai. En consommant directement votre production, vous achetez moins au réseau, ce qui allège considérablement la facture."
    }
];

let currentQuestionIndex = 0;
let score = 0;

/* --- FONCTIONS DU JEU --- */

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    const gameContainer = document.getElementById('solarGame');

    // Calcul barre de progression
    const progressPercent = (currentQuestionIndex / questions.length) * 100;

    gameContainer.innerHTML = `
            <div class="progress-game" style="width: ${progressPercent}%"></div>
            <div class="question-text">${q.question}</div>
            <div class="answers-grid">
                <button class="btn-answer btn-true" onclick="checkAnswer(true)">INFO (VRAI)</button>
                <button class="btn-answer btn-false" onclick="checkAnswer(false)">INTOX (FAUX)</button>
            </div>
            <p style="margin-top: 20px; font-size: 0.9rem; color: #aaa;">Question ${currentQuestionIndex + 1} / ${questions.length}</p>
        `;
}

function checkAnswer(userAnswer) {
    const q = questions[currentQuestionIndex];
    const isCorrect = (userAnswer === q.isTrue);

    if (isCorrect) score++;

    const gameContainer = document.getElementById('solarGame');

    // Affiche le résultat
    gameContainer.innerHTML = `
            <div class="feedback-box">
                <div class="feedback-title ${isCorrect ? 'correct' : 'wrong'}">
                    ${isCorrect ? '<i class="fas fa-check-circle"></i> Bonne réponse !' : '<i class="fas fa-times-circle"></i> Oups, raté !'}
                </div>
                <p class="feedback-desc">${q.explanation}</p>
                <button class="btn-next" onclick="nextQuestion()">Suivant &rarr;</button>
            </div>
        `;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const gameContainer = document.getElementById('solarGame');
    let message = "";

    if (score === 4) message = "Incroyable ! Vous êtes un véritable expert du solaire.";
    else if (score >= 2) message = "Pas mal du tout ! Vous avez de bonnes bases.";
    else message = "C'est l'occasion de lire nos articles pour en apprendre plus !";

    gameContainer.innerHTML = `
            <h3>Quiz terminé !</h3>
            <div style="font-size: 3rem; font-weight: bold; color: var(--primary-color); margin: 20px 0;">
                ${score} / ${questions.length}
            </div>
            <p>${message}</p>
            <button class="btn-restart" onclick="startGame()">Rejouer</button>
        `;
}