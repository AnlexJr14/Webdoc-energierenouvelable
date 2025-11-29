/* --- DONNÉES DU JEU (15 Questions basées sur le Webdoc) --- */
const questions = [
    {
        question: "Les panneaux solaires ne fonctionnent pas quand il pleut.",
        isTrue: false,
        explanation: "Faux ! Ils fonctionnent grâce à la luminosité. Même sous la pluie, ils produisent (bien que moins qu'en plein soleil)."
    },
    {
        question: "Un panneau solaire est recyclable à près de 95%.",
        isTrue: true,
        explanation: "Vrai (94,7% exactement) ! Le verre, l'aluminium et le silicium se recyclent très bien grâce à la filière Soren en France."
    },
    {
        question: "Il faut 10 ans à un panneau pour 'rembourser' l'énergie utilisée pour sa fabrication.",
        isTrue: false,
        explanation: "Intox ! Il faut seulement 1 an environ pour qu'un panneau produise plus d'énergie qu'il n'en a fallu pour sa fabrication."
    },
    {
        question: "La France est le 1er producteur d'énergie solaire en Europe.",
        isTrue: false,
        explanation: "Faux. La France est 3ème (avec 20 GW+), loin derrière l'Allemagne (29 TWh) et l'Espagne."
    },
    {
        question: "Le prix des panneaux solaires a chuté de 80% en dix ans.",
        isTrue: true,
        explanation: "Vrai. C'est ce qui rend cette énergie de plus en plus accessible aux particuliers aujourd'hui."
    },
    {
        question: "Pour être rentable, il faut consommer son électricité la nuit (Heures Creuses).",
        isTrue: false,
        explanation: "Faux ! Avec le solaire, il faut 'renverser' ses habitudes et lancer les machines en journée, quand le soleil brille (comme Jean-Stéphane, propriétaire de panneaux solaires)."
    },
    {
        question: "La durée de vie moyenne d'un panneau photovoltaïque est de 30 ans.",
        isTrue: true,
        explanation: "Vrai. C'est un investissement sur le très long terme."
    },
    {
        question: "L'énergie solaire représente aujourd'hui plus de 10% du mix énergétique français.",
        isTrue: false,
        explanation: "Faux. Elle ne représente que 2,6% du mix actuel. Il y a encore du chemin à faire pour 2050 !"
    },
    {
        question: "La fabrication des panneaux est totalement neutre en carbone.",
        isTrue: false,
        explanation: "C'est faux. Comme expliqué dans l'article Analyse, la fabrication (souvent en Asie) utilise de l'électricité au charbon et des métaux miniers."
    },
    {
        question: "L'installation d'Arlette Ferreira lui permet d'économiser environ 500€ par an.",
        isTrue: true,
        explanation: "Vrai. Et contrairement au prix du réseau, cette économie est protégée contre l'inflation."
    },
    {
        question: "Historiquement, une transition énergétique consiste à remplacer une énergie par une autre.",
        isTrue: false,
        explanation: "Faux. Selon l'historien J-B Fressoz, nous avons toujours 'additionné' les énergies (charbon + pétrole + solaire) sans jamais en supprimer."
    },
    {
        question: "Le transport maritime des panneaux pèse lourd dans leur bilan carbone.",
        isTrue: true,
        explanation: "Vrai. Fabriqués majoritairement en Asie, leur acheminement par porte-conteneurs consomme beaucoup de pétrole."
    },
    {
        question: "L'autonomie totale (vivre coupé du réseau) est la solution la plus recommandée par les experts.",
        isTrue: false,
        explanation: "Faux. C'est techniquement complexe et coûteux. L'autoconsommation partielle (avec raccordement réseau) est plus résiliente."
    },
    {
        question: "La ville de Bordeaux a lancé un programme pour solariser les toits publics.",
        isTrue: true,
        explanation: "Vrai. C'est un exemple d'initiative locale, tout comme Freiberg en Allemagne."
    },
    {
        question: "Jean-Stéphane a réduit sa facture par 3 simplement en installant des panneaux, sans changer ses habitudes.",
        isTrue: false,
        explanation: "Faux. Il a réduit sa facture (400€ à 160€) grâce au 'pilotage' : il surveille sa production avant de lancer ses appareils."
    }
];

let currentQuestionIndex = 0;
let score = 0;

/* --- FONCTIONS DU JEU --- */

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('solarGame').classList.remove('game-finished'); // Reset classe visuelle
    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    const gameContainer = document.getElementById('solarGame');
    
    // Calcul barre de progression
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;

    gameContainer.innerHTML = `
            <div class="progress-bar-container">
                <div class="progress-game" style="width: ${progressPercent}%"></div>
            </div>
            
            <div class="quiz-content fade-in">
                <span class="question-counter">Question ${currentQuestionIndex + 1} / ${questions.length}</span>
                <h3 class="question-text">${q.question}</h3>
                
                <div class="answers-grid">
                    <button class="btn-answer btn-true" onclick="checkAnswer(true)">
                        <span class="icon"><i class="fas fa-check"></i></span> VRAI
                    </button>
                    <button class="btn-answer btn-false" onclick="checkAnswer(false)">
                        <span class="icon"><i class="fas fa-times"></i></span> FAUX
                    </button>
                </div>
            </div>
        `;
}

function checkAnswer(userAnswer) {
    const q = questions[currentQuestionIndex];
    const isCorrect = (userAnswer === q.isTrue);

    if (isCorrect) score++;

    const gameContainer = document.getElementById('solarGame');

    gameContainer.innerHTML = `
            <div class="progress-bar-container">
                <div class="progress-game" style="width: ${(currentQuestionIndex + 1) / questions.length * 100}%"></div>
            </div>
            
            <div class="feedback-box fade-in">
                <div class="feedback-icon ${isCorrect ? 'icon-correct' : 'icon-wrong'}">
                    ${isCorrect ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>'}
                </div>
                <h3 class="feedback-title ${isCorrect ? 'correct' : 'wrong'}">
                    ${isCorrect ? 'Exact !' : 'Oups...'}
                </h3>
                <p class="feedback-desc">${q.explanation}</p>
                <button class="btn-next" onclick="nextQuestion()">
                    ${currentQuestionIndex === questions.length - 1 ? 'Voir mon résultat' : 'Question suivante'} <i class="fas fa-arrow-right"></i>
                </button>
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
    let subMessage = "";

    if (score >= 13) {
        message = "Expert du Solaire !";
        subMessage = "Vous avez lu le webdoc avec une grande attention, bravo !";
    } else if (score >= 10) {
        message = "Très bon score !";
        subMessage = "Vous avez de solides connaissances, quelques détails vous ont échappé.";
    } else if (score >= 6) {
        message = "En bonne voie...";
        subMessage = "Vous avez compris l'essentiel, mais n'hésitez pas à relire les articles.";
    } else {
        message = "Débutant curieux";
        subMessage = "Le solaire a encore des secrets pour vous. Recommencez après avoir lu le reportage !";
    }

    gameContainer.innerHTML = `
            <div class="result-box fade-in">
                <h3>Quiz Terminé</h3>
                <div class="score-display">
                    <span class="score-number">${score}</span>
                    <span class="score-total">/ ${questions.length}</span>
                </div>
                <h4 class="result-message">${message}</h4>
                <p class="result-submessage">${subMessage}</p>
                <button class="btn-restart" onclick="startGame()"><i class="fas fa-redo"></i> Rejouer</button>
            </div>
        `;
}