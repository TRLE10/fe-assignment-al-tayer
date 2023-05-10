const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('worker.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Failed to register Service Worker:', error);
        });

      // Listen for network connectivity changes
      const updateOfflineMessage = () => {
        const offlineMessage = document.getElementById('offline-message');

        if (!offlineMessage) return;

        if (navigator.onLine) {
          offlineMessage.style.display = 'none';
        } else {
          offlineMessage.style.display = 'block';
        }
      };

      window.addEventListener('online', updateOfflineMessage);
      window.addEventListener('offline', updateOfflineMessage);

      // Update the message on initial load
      updateOfflineMessage();
    });
  }
};

export default registerServiceWorker;
