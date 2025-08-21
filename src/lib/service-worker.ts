/**
 * Registers the service worker for push notifications
 */
export const registerServiceWorker = async (): Promise<void> => {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service workers are not supported in this browser");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/service-worker.js");
    console.log("Service worker registered successfully:", registration);
  } catch (error) {
    console.error("Service worker registration failed:", error);
  }
};

/**
 * Unregisters all service workers
 */
export const unregisterServiceWorker = async (): Promise<void> => {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
    console.log("All service workers unregistered");
  } catch (error) {
    console.error("Failed to unregister service workers:", error);
  }
};
