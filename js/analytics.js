// Système de statistiques avec Google Sheets
(function() {
    const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbydAQxvXEGx-iFyWd6q7OErRkaUA69tGulCdS2ILL7oV84potH0r-FN541TU8paCYHf/exec';
    
    function getDeviceId() {
        let deviceId = localStorage.getItem('togoDeviceId');
        if (!deviceId) {
            deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
            localStorage.setItem('togoDeviceId', deviceId);
        }
        return deviceId;
    }
    
    function sendAnalytics(page, action, duration) {
        const data = {
            page: page,
            role: localStorage.getItem('userRole') || 'anonymous',
            deviceId: getDeviceId(),
            school: localStorage.getItem('schoolName') || 'unknown',
            region: localStorage.getItem('region') || 'unknown',
            action: action || 'visit',
            duration: duration || 0,
            browser: navigator.userAgent,
            notes: ''
        };
        
        if (GOOGLE_SHEETS_API) {
            fetch(GOOGLE_SHEETS_API, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(err => console.log('Analytics error:', err));
        }
        
        let localStats = JSON.parse(localStorage.getItem('togoEnglishStats')) || { 
            totalVisits: 0, 
            roles: { kids: 0, parents: 0, teachers: 0, admin: 0 },
            pages: {} 
        };
        
        localStats.totalVisits++;
        localStats.pages[page] = (localStats.pages[page] || 0) + 1;
        
        const currentRole = localStorage.getItem('userRole');
        if (currentRole && localStats.roles[currentRole] !== undefined) {
            localStats.roles[currentRole]++;
        }
        
        localStorage.setItem('togoEnglishStats', JSON.stringify(localStats));
    }
    
    const page = window.location.pathname;
    const startTime = Date.now();
    sendAnalytics(page, 'page_load', 0);
    
    window.addEventListener('beforeunload', function() {
        const duration = Math.round((Date.now() - startTime) / 1000);
        sendAnalytics(page, 'page_exit', duration);
    });
})();