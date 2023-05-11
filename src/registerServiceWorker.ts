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

      window.addEventListener('online', function (event) {
        console.log('Network connection re-established. Registering sync event...');
        // event.preventDefault();
        navigator.serviceWorker.ready
          .then(function (registration) {
            registration.sync
              .register('sync-tag')
              .then(() => {
                console.log('Sync event registered');
              })
              .catch((error) => {
                console.log('Sync event registration failed:', error);
              });
          })
          .catch(function (error) {
            console.log('Failed to register sync event:', error);
          });
        const offlineMessage = document.getElementById('offline-message');
        if (navigator.onLine) {
          offlineMessage.style.display = 'none';
        } else {
          offlineMessage.style.display = 'block';
        }
      });
      window.addEventListener('offline', updateOfflineMessage);

      // Update the message on initial load
      updateOfflineMessage();
    });
  }
};

export default registerServiceWorker;
