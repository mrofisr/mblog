// Load Umami Analytics script dynamically and expose helper functions
export function initUmami(scriptUrl, websiteId) {
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.setAttribute('data-umami-id', websiteId);
    script.src = scriptUrl;
    document.head.appendChild(script);
}

export function trackEvent(eventName, eventData = {}) {
    if (window.umami) {
        // Assuming umami exposes a global method 'trackEvent'
        window.umami.trackEvent(eventName, eventData);
    } else {
        console.warn("Umami Analytics not initialized.");
    }
}
