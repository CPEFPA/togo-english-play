// Afficher/masquer les sections
function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    
    // Afficher la section sélectionnée
    document.getElementById(sectionId).style.display = 'block';
    
    // Mettre à jour les boutons actifs
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Données des critères d'évaluation
const assessmentData = {
    1: {
        title: "Unit 1: My School",
        weeks: [
            {
                week: 1,
                objectives: ["Greet in English", "Sing alphabet song"],
                listening: [
                    "Able to differentiate types of greetings in English",
                    "Able to identify different letters of the alphabets in English"
                ],
                speaking: [
                    "Able to greet in English",
                    "Able to sing alphabets song",
                    "Able to name some letters of the alphabets in English"
                ]
            },
            {
                week: 2,
                objectives: ["Give basic information about themselves"],
                listening: [
                    "Able to identify the subject pronouns I, you, he, she",
                    "Able to differentiate between subject pronouns I, you, he, she",
                    "Able to identify their names, age and gender"
                ],
                speaking: [
                    "Able to use subject pronouns through a song",
                    "Able to name subject pronouns I, you, he, she",
                    "Able to state their names, age and gender"
                ]
            },
            {
                week: 3,
                objectives: ["Name the various objects in the classroom"],
                listening: [
                    "Able to identify various objects in the classroom",
                    "Able to classify various objects in the classroom"
                ],
                speaking: [
                    "Able to name some classroom objects",
                    "Able to answer questions related to classroom objects"
                ]
            }
        ]
    },
    2: {
        title: "Unit 2: My Identity",
        weeks: [
            {
                week: 1,
                objectives: ["Say more about themselves", "Use praise formulations"],
                listening: [
                    "Able to identify words to introduce oneself",
                    "Able to recognize identification words and expressions",
                    "Able to hear praise formulations"
                ],
                speaking: [
                    "Able to introduce themselves",
                    "Able to say their age",
                    "Able to say where they live"
                ]
            },
            {
                week: 2,
                objectives: ["Talk about their family"],
                listening: [
                    "Able to identify the name of their family members",
                    "Able to identify the gender of their family members"
                ],
                speaking: [
                    "Able to name their family members",
                    "Able to talk about their parents",
                    "Able to introduce their parents",
                    "Able to describe the members of their families"
                ]
            },
            {
                week: 3,
                objectives: ["Describe their home", "Describe their school"],
                listening: [
                    "Able to identify home/school",
                    "Able to identify home/school items",
                    "Able to identify different components of a home/school",
                    "Able to point to various colours used in the home/school"
                ],
                speaking: [
                    "Able to talk about home/school",
                    "Able to talk about home/school items",
                    "Able to talk about different component of home/school",
                    "Able to describe the home/school"
                ]
            }
        ]
    },
    3: {
        title: "Unit 3: Food",
        weeks: [
            {
                week: 1,
                objectives: ["Identify specimens of fruits and vegetables"],
                listening: [
                    "Able to identify different fruits",
                    "Able to identify different vegetables",
                    "Able to point to different fruits",
                    "Able to point to different vegetables"
                ],
                speaking: [
                    "Able to name different fruits",
                    "Able to name different vegetables",
                    "Able to answer questions regarding names of fruits and vegetables",
                    "Able to express preferences of fruit and vegetables"
                ]
            },
            {
                week: 2,
                objectives: ["Classify local and world foods"],
                listening: [
                    "Able to identify local food",
                    "Able to identify world food",
                    "Able to differentiate between local and world food"
                ],
                speaking: [
                    "Able to name local food",
                    "Able to name world food",
                    "Able to differentiate between local and world food"
                ]
            },
            {
                week: 3,
                objectives: ["Talk about meal time routines"],
                listening: [
                    "Able to identify breakfast",
                    "Able to identify lunch",
                    "Able to identify dinner",
                    "Able to point to various items relating to meal time",
                    "Able to name action relating to mealtime"
                ],
                speaking: [
                    "Able to talk about breakfast",
                    "Able to talk about lunch",
                    "Able to talk about dinner",
                    "Able to describe mealtime routines"
                ]
            }
        ]
    },
    4: {
        title: "Unit 4: Physical Activities",
        weeks: [
            {
                week: 1,
                objectives: ["Name body parts", "Identify body parts"],
                listening: [
                    "Able to point parts of the body",
                    "Able to identify different body parts"
                ],
                speaking: [
                    "Able to name different body parts",
                    "Able to describe the use of the different body parts"
                ]
            },
            {
                week: 2,
                objectives: ["Identify physical activities", "Name different kinds of sports"],
                listening: [
                    "Able to identify some different physical activities",
                    "Able to demonstrate different kinds of sport"
                ],
                speaking: [
                    "Able to name different physical activities",
                    "Able to name different kinds of sports",
                    "Able to describe physical activities",
                    "Able to describe different kinds of sports"
                ]
            },
            {
                week: 3,
                objectives: ["Name items related to sports"],
                listening: [
                    "Able to identify items related to sports",
                    "Able to differentiate various items related to sports"
                ],
                speaking: [
                    "Able to name some items related to sports",
                    "Able to say the use of items related to sports"
                ]
            }
        ]
    },
    5: {
        title: "Unit 5: Healthy Habits",
        weeks: [
            {
                week: 1,
                objectives: ["Practice Body hygiene"],
                listening: [
                    "Able to identify the body parts",
                    "Able to know the body hygiene"
                ],
                speaking: [
                    "Able to name body parts",
                    "Able to describe body parts",
                    "Able to talk about body hygiene"
                ]
            },
            {
                week: 2,
                objectives: ["Learn healthy diet", "Identify common ailments"],
                listening: [
                    "Able to know about healthy diet",
                    "Able to know about common ailments",
                    "Able to learn about healthy diet",
                    "Able to learn about common ailments"
                ],
                speaking: [
                    "Able to talk about healthy diet",
                    "Able to talk healthy diet",
                    "Able to talk about common ailments"
                ]
            }
        ]
    },
    6: {
        title: "Unit 6: Domestic and wild animals",
        weeks: [
            {
                week: 1,
                objectives: ["Name domestic and wild animals"],
                listening: [
                    "Able to identify domestic animals",
                    "Able to identify wild animals",
                    "Able to point to different domestic animals",
                    "Able to point to different wild animals"
                ],
                speaking: [
                    "Able to name domestic animals",
                    "Able to name wild animals"
                ]
            },
            {
                week: 2,
                objectives: ["Identify five domestic and five wild animals"],
                listening: [
                    "Able to identify domestic animals by their sounds",
                    "Able to identify wild animals by their sounds"
                ],
                speaking: [
                    "Able to name domestic animals",
                    "Able to name wild animals",
                    "Able to describe an animal habitat"
                ]
            }
        ]
    }
};

// Afficher les critères d'évaluation d'une unité
function showUnitAssessment(unitNumber) {
    const data = assessmentData[unitNumber];
    const container = document.getElementById('assessment-content');
    
    let html = `<h3>${data.title}</h3>`;
    
    data.weeks.forEach(week => {
        html += `
            <div class="week-assessment">
                <h4>Week ${week.week}</h4>
                <div class="objectives">
                    <strong>Objectives:</strong>
                    <ul>
                        ${week.objectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                </div>
                <div class="criteria-listening">
                    <strong>Listening Criteria:</strong>
                    <ul>
                        ${week.listening.map(crit => `<li>✅ ${crit}</li>`).join('')}
                    </ul>
                </div>
                <div class="criteria-speaking">
                    <strong>Speaking Criteria:</strong>
                    <ul>
                        ${week.speaking.map(crit => `<li>✅ ${crit}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Afficher l'Unit 1 par défaut
showUnitAssessment(1);