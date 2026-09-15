(function() {
    const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbydAQxvXEGx-iFyWd6q7OErRkaUA69tGulCdS2ILL7oV84potH0r-FN541TU8paCYHf/exec';
    
    function getDeviceId() {
        let id = localStorage.getItem('togoDeviceId');
        if (!id) {
            id = 'dev_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('togoDeviceId', id);
        }
        return id;
    }
    
    function getUserRole() {
        return localStorage.getItem('userRole') || 'anonymous';
    }
    
    function getRegion() {
        return localStorage.getItem('region') || 'unknown';
    }
    
    function getSchool() {
        var commune = localStorage.getItem('commune') || '';
        var school = localStorage.getItem('schoolName') || '';
        if (school && commune) return school + ' (' + commune + ')';
        if (commune) return commune;
        if (school) return school;
        return 'unknown';
    }
    
    function sendAnalytics(page, action, duration) {
        const data = {
            page: page,
            role: getUserRole(),
            deviceId: getDeviceId(),
            school: getSchool(),
            region: getRegion(),
            action: action || 'visit',
            duration: duration || 0,
            browser: navigator.userAgent,
            notes: ''
        };
        
        if (WEB_APP_URL) {
            fetch(WEB_APP_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(err => {});
        }
    }
    
    const page = window.location.pathname;
    const start = Date.now();
    sendAnalytics(page, 'load', 0);
    
    window.addEventListener('beforeunload', function() {
        sendAnalytics(page, 'exit', Math.round((Date.now() - start) / 1000));
    });
})();
