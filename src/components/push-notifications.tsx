import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface PushNotificationStatus {
  readonly permission: NotificationPermission;
  readonly isSupported: boolean;
  readonly isSubscribed: boolean;
}

/**
 * Component for handling push notification subscription and management
 */
export const PushNotifications = () => {
  const [status, setStatus] = useState<PushNotificationStatus>({
    permission: "default",
    isSupported: false,
    isSubscribed: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkPushNotificationStatus();
  }, []);

  const checkPushNotificationStatus = async (): Promise<void> => {
    const isSupported = "Notification" in window && "serviceWorker" in navigator;

    let isSubscribed = false;
    if (isSupported) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        isSubscribed = subscription !== null;
      } catch (error) {
        console.error("Error checking subscription status:", error);
      }
    }

    setStatus({
      permission: isSupported ? Notification.permission : "denied",
      isSupported,
      isSubscribed,
    });
  };

  const requestNotificationPermission = async (): Promise<void> => {
    if (!status.isSupported) {
      alert("Push notifications are not supported in this browser");
      return;
    }

    setIsLoading(true);

    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        // The PushEngage service worker will handle the subscription
        await checkPushNotificationStatus();
      }

      setStatus((prev) => ({ ...prev, permission }));
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestNotification = async (): Promise<void> => {
    if (!status.isSupported) {
      alert("Push notifications are not supported in this browser");
      return;
    }

    if (status.permission !== "granted") {
      alert("Please enable notifications first");
      return;
    }

    try {
      // Try to send a test notification using the Notification API
      new Notification("Tutellus Test Notification", {
        body: "This is a test notification from Tutellus! 🎉",
        icon: "/tutellus.svg",
        badge: "/tutellus.svg",
        tag: "tutellus-test",
        requireInteraction: false,
        data: {
          type: "test",
          timestamp: Date.now(),
        },
      });

      console.log("Test notification sent successfully");
    } catch (error) {
      console.error("Failed to send test notification:", error);
      alert("Failed to send test notification. Please check your browser settings.");
    }
  };

  const getStatusBadge = () => {
    if (!status.isSupported) {
      return <Badge variant="destructive">No Soportado</Badge>;
    }

    switch (status.permission) {
      case "granted":
        return status.isSubscribed ? (
          <Badge variant="default" className="bg-success text-success-foreground">
            ✅ Activo
          </Badge>
        ) : (
          <Badge variant="secondary">Permitido</Badge>
        );
      case "denied":
        return <Badge variant="destructive">❌ Denegado</Badge>;
      default:
        return <Badge variant="outline">⏳ Pendiente</Badge>;
    }
  };

  const getDescription = () => {
    if (!status.isSupported) {
      return "Tu navegador no soporta notificaciones push.";
    }

    switch (status.permission) {
      case "granted":
        return status.isSubscribed
          ? "¡Estás suscrito a las notificaciones de Tutellus!"
          : "Permisos concedidos. La suscripción será gestionada automáticamente.";
      case "denied":
        return "Las notificaciones están bloqueadas. Actívalas en la configuración de tu navegador.";
      default:
        return "Activa las notificaciones para mantenerte al día con los últimos cursos y actualizaciones de Tutellus.";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border-0 shadow-lg bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4">
          <span className="text-2xl text-white">🔔</span>
        </div>
        <CardTitle className="text-2xl font-bold">Activar Notificaciones</CardTitle>
        <CardDescription className="text-base leading-relaxed">{getDescription()}</CardDescription>
        <div className="flex justify-center mt-3">{getStatusBadge()}</div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {status.permission === "default" && status.isSupported && (
          <Button
            onClick={requestNotificationPermission}
            disabled={isLoading}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                Activando...
              </div>
            ) : (
              "Activar Notificaciones"
            )}
          </Button>
        )}

        {status.permission === "granted" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <span className="text-success">✅</span>
              <span className="text-sm font-medium text-success">¡Notificaciones activadas!</span>
            </div>
            <Button
              onClick={sendTestNotification}
              variant="outline"
              className="w-full h-10 border-primary/20 hover:bg-primary/5"
            >
              Enviar Notificación de Prueba
            </Button>
            <p className="text-xs text-muted-foreground/70 text-center">
              Haz clic para verificar que las notificaciones funcionan correctamente
            </p>
          </div>
        )}

        {status.permission === "denied" && (
          <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
            <div className="flex gap-3">
              <span className="text-destructive text-lg">⚠️</span>
              <p className="text-sm text-destructive/80 leading-relaxed">
                Para recibir notificaciones, actívalas en la configuración de tu navegador y recarga la página.
              </p>
            </div>
          </div>
        )}

        {!status.isSupported && (
          <div className="p-4 rounded-lg border border-warning/20 bg-warning/5">
            <div className="flex gap-3">
              <span className="text-warning text-lg">ℹ️</span>
              <p className="text-sm text-warning/80 leading-relaxed">
                Las notificaciones push no están soportadas en este navegador. Usa un navegador moderno como Chrome,
                Firefox o Safari.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
