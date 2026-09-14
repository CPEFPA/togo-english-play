(function() {
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbydAQxvXEGx-iFyWd6q7OErRkaUA69tGulCdS2ILL7oV84potH0r-FN541TU8paCYHf/exec';
    function getDeviceId() {
        let id = localStorage.getItem('togoDeviceId');
        if (!id) { id = 'dev_' + Math.random().toString(36).substr(2, 9); localStorage.setItem('togoDeviceId', id); }
        return id;
    }
    function sendAnalytics(page, action, duration) {
        const data = {
            page: page, role: localStorage.getItem('userRole') || 'anonymous',
            deviceId: getDeviceId(), school: localStorage.getItem('schoolName') || 'unknown',
            region: localStorage.getItem('region') || 'unknown', action: action || 'visit',
            duration: duration || 0, browser: navigator.userAgent
        };
        fetch(WEB_APP_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(err => {});
        
        let stats = JSON.parse(localStorage.getItem('togoStats')) || { total: 0, roles: { kids: 0, parents: 0, teachers: 0 }, pages: {} };
        stats.total++; stats.pages[page] = (stats.pages[page] || 0) + 1;
        if (stats.roles[data.role] !== undefined) stats.roles[data.role]++;
        localStorage.setItem('togoStats', JSON.stringify(stats));
    }
    const page = window.location.pathname;
    const start = Date.now();
    sendAnalytics(page, 'load', 0);
    window.addEventListener('beforeunload', () => sendAnalytics(page, 'exit', Math.round((Date.now() - start) / 1000)));
})();