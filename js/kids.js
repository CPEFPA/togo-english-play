// Charger les données
let programData = {};
let currentUnit = null;
let currentWeek = null;

// Charger le score depuis localStorage
let totalStars = parseInt(localStorage.getItem('totalStars')) || 0;
let completedLessons = parseInt(localStorage.getItem('completedLessons')) || 0;

fetch('data/videos.json')
    .then(response => response.json())
    .then(data => {
        programData = data;
        displayUnits();
        updateScore();
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Erreur de chargement des données');
    });

// Afficher les unités
function displayUnits() {
    const grid = document.getElementById('unitsGrid');
    grid.innerHTML = '<h2 style="color: white; text-align: center; margin-bottom: 20px;">Choisis ton unité :</h2>';
    
    const units = Object.keys(programData);
    units.forEach((unitKey, index) => {
        const unit = programData[unitKey];
        const unitCard = document.createElement('div');
        unitCard.className = 'unit-card';
        unitCard.onclick = () => selectUnit(unitKey);
        unitCard.innerHTML = `
            <div class="unit-icon">${getUnitIcon(index)}</div>
            <h3>${unit.title}</h3>
            <p>${unit.weeks.length} semaines</p>
        `;
        grid.appendChild(unitCard);
    });
}

// Icônes pour chaque unité
function getUnitIcon(index) {
    const icons = ['📚', '👨‍👩‍👧', '🍎', '⚽', '🧼', '🦁'];
    return icons[index] || '📖';
}

// Sélectionner une unité
function selectUnit(unitKey) {
    currentUnit = unitKey;
    const unit = programData[unitKey];
    const grid = document.getElementById('unitsGrid');
    
    grid.innerHTML = `<h2 style="color: white; text-align: center; margin-bottom: 20px;">${unit.title} - Choisis une semaine :</h2>`;
    
    unit.weeks.forEach((week, index) => {
        const weekCard = document.createElement('div');
        weekCard.className = 'week-card';
        weekCard.onclick = () => selectWeek(index);
        weekCard.innerHTML = `
            <h3>Semaine ${week.week}</h3>
            <p>${week.theme}</p>
            <p>${week.videos.length} vidéo(s)</p>
        `;
        grid.appendChild(weekCard);
    });
    
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.onclick = displayUnits;
    backBtn.textContent = '← Retour aux unités';
    backBtn.style.marginTop = '20px';
    grid.appendChild(backBtn);
}

// Sélectionner une semaine
function selectWeek(weekIndex) {
    currentWeek = weekIndex;
    const unit = programData[currentUnit];
    const week = unit.weeks[weekIndex];
    
    if (week.videos.length === 0) {
        alert('Aucune vidéo disponible pour cette semaine');
        return;
    }
    
    // Afficher la première vidéo
    displayLesson(week.videos[0], week.theme);
}

// Afficher la leçon
function displayLesson(video, theme) {
    document.getElementById('unitsGrid').style.display = 'none';
    document.getElementById('lessonContent').style.display = 'block';
    
    document.getElementById('lessonTitle').textContent = video.title;
    document.getElementById('lessonTheme').textContent = theme;
    
    // Extraire l'ID YouTube
    let videoId = video.youtubeId;
    if (video.url.includes('v=')) {
        videoId = video.url.split('v=')[1].split('&')[0];
    } else if (video.url.includes('youtu.be/')) {
        videoId = video.url.split('youtu.be/')[1];
    }
    
    document.getElementById('lessonVideo').src = `https://www.youtube-nocookie.com/embed/${videoId}`;
    
    // Créer des flashcards simples basées sur l'objectif
    createFlashcards(video);
    
    // Créer un quiz simple
    createQuiz(video);
}

// Créer des flashcards
function createFlashcards(video) {
    const container = document.getElementById('flashcardsContainer');
    container.innerHTML = '';
    
    // Mots clés basés sur l'objectif
    const keywords = extractKeywords(video.objective);
    
    keywords.forEach(word => {
        const card = document.createElement('div');
        card.className = 'flashcard';
        card.innerHTML = `
            <div class="flashcard-word">${word}</div>
            <button onclick="speakWord('${word}')">🔊 Écouter</button>
        `;
        container.appendChild(card);
    });
}

// Extraire des mots clés de l'objectif
function extractKeywords(objective) {
    const keywords = [];
    if (objective.toLowerCase().includes('greet')) {
        keywords.push('Hello', 'Good morning', 'Good afternoon');
    } else if (objective.toLowerCase().includes('alphabet')) {
        keywords.push('A', 'B', 'C', 'D', 'E');
    } else if (objective.toLowerCase().includes('family')) {
        keywords.push('Father', 'Mother', 'Brother', 'Sister');
    } else if (objective.toLowerCase().includes('fruit')) {
        keywords.push('Apple', 'Banana', 'Mango', 'Orange');
    } else if (objective.toLowerCase().includes('animal')) {
        keywords.push('Cat', 'Dog', 'Cow', 'Lion');
    } else {
        keywords.push('English', 'Learn', 'Play');
    }
    return keywords;
}

// Fonction pour prononcer un mot
function speakWord(word) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    } else {
        alert('Votre navigateur ne supporte pas la synthèse vocale');
    }
}

// Créer un quiz simple
function createQuiz(video) {
    const container = document.getElementById('quizContainer');
    const keywords = extractKeywords(video.objective);
    
    if (keywords.length < 2) {
        container.innerHTML = '<p style="color: white;">Quiz indisponible pour cette leçon</p>';
        return;
    }
    
    const question = `Quel mot signifie "${keywords[0].toLowerCase()}" en anglais ?`;
    const options = [keywords[0], keywords[1], 'Apple', 'Book'];
    
    let quizHTML = `<div class="quiz-question"><p>${question}</p><div class="quiz-options">`;
    
    options.forEach((option, index) => {
        quizHTML += `<button class="quiz-option" onclick="checkAnswer('${option}', '${keywords[0]}')">${option}</button>`;
    });
    
    quizHTML += `</div><div id="quizResult"></div></div>`;
    container.innerHTML = quizHTML;
}

// Vérifier la réponse
function checkAnswer(selected, correct) {
    const resultDiv = document.getElementById('quizResult');
    
    if (selected === correct) {
        resultDiv.innerHTML = '<p style="color: #4CAF50; font-weight: bold;">✅ Bravo ! Bonne réponse !</p>';
        totalStars += 1;
        localStorage.setItem('totalStars', totalStars);
        updateScore();
    } else {
        resultDiv.innerHTML = `<p style="color: #FF5722; font-weight: bold;">❌ La bonne réponse était : ${correct}</p>`;
    }
}

// Terminer la leçon
function completeLesson() {
    completedLessons += 1;
    totalStars += 5; // Bonus pour avoir terminé la leçon
    
    localStorage.setItem('completedLessons', completedLessons);
    localStorage.setItem('totalStars', totalStars);
    
    updateScore();
    alert(`🎉 Félicitations ! Tu as gagné 5 étoiles !\nTotal : ${totalStars} étoiles`);
    
    backToUnits();
}

// Retour aux unités
function backToUnits() {
    document.getElementById('unitsGrid').style.display = 'block';
    document.getElementById('lessonContent').style.display = 'none';
    displayUnits();
}

// Mettre à jour le score
function updateScore() {
    document.getElementById('totalStars').textContent = totalStars;
    document.getElementById('completedLessons').textContent = completedLessons;
}