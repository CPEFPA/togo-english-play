// Enregistrer le Service Worker pour le mode hors-ligne
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/togo-english-play/sw.js')
      .then(registration => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
      })
      .catch(error => {
        console.log('Échec de l\'enregistrement du Service Worker:', error);
      });
  });
}

// Gestion de l'installation de la PWA
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Afficher la bannière d'installation après 3 secondes
  setTimeout(() => {
    document.getElementById('installBanner').style.display = 'flex';
  }, 3000);
});

// Bouton d'installation
document.addEventListener('DOMContentLoaded', () => {
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('Application installée !');
        }
        deferredPrompt = null;
        document.getElementById('installBanner').style.display = 'none';
      }
    });
  }
});

function closeInstallBanner() {
  document.getElementById('installBanner').style.display = 'none';
}