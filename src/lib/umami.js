export function trackEvent(eventName, eventData = {}) {
    if (window.umami) {
        // Assuming umami exposes a global method 'trackEvent'
        window.umami.trackEvent(eventName, eventData);
    } else {
        console.warn("Umami Analytics not initialized.");
    }
}
