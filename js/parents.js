// Charger les données des vidéos
let allVideos = [];

fetch('data/videos.json')
    .then(response => response.json())
    .then(data => {
        // Aplatir toutes les vidéos de toutes les unités en une seule liste
        const units = Object.values(data);
        units.forEach(unit => {
            unit.weeks.forEach(week => {
                week.videos.forEach(video => {
                    allVideos.push({
                        ...video,
                        unitTitle: unit.title,
                        week: week.week,
                        theme: week.theme
                    });
                });
            });
        });
        displayVideos(allVideos);
    })
    .catch(error => {
        console.error('Erreur de chargement des vidéos:', error);
        document.getElementById('videoList').innerHTML = '<p style="color:white; text-align:center;">Erreur de chargement des données. Vérifiez le fichier videos.json.</p>';
    });

function displayVideos(videos) {
    const container = document.getElementById('videoList');
    container.innerHTML = '';

    if (videos.length === 0) {
        container.innerHTML = '<p style="color:white; text-align:center;">Aucune vidéo trouvée pour ce filtre.</p>';
        return;
    }

    videos.forEach(video => {
        // Extraire l'ID YouTube pour l'iframe
        let videoId = video.youtubeId;
        if (video.url.includes('v=')) {
            videoId = video.url.split('v=')[1].split('&')[0];
        } else if (video.url.includes('youtu.be/')) {
            videoId = video.url.split('youtu.be/')[1];
        }

        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="video-badge">${video.unitTitle} • Semaine ${video.week}</div>
            <h3>${video.title}</h3>
            <div class="video-container">
                <iframe src="https://www.youtube-nocookie.com/embed/${videoId}" 
                        title="${video.title}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
            </div>
            <div class="video-info">
                <p>🎯 <strong>Objectif :</strong> ${video.objective}</p>
                <p>🗣️ <strong>À la maison :</strong> ${video.activity || 'Regardez et répétez ensemble !'}</p>
                ${video.status === 'REPLACEMENT_VIDEO' ? '<p style="color:orange; font-size:0.9em;">⚠️ Vidéo de remplacement (lien original invalide dans le PDF)</p>' : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

function filterVideos(type) {
    if (type === 'all') {
        displayVideos(allVideos);
    } else {
        const filtered = allVideos.filter(v => v.type === type);
        displayVideos(filtered);
    }
}