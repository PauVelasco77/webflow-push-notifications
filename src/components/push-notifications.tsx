import {useEffect, useState} from "react";
import {Button} from "./ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "./ui/card";
import {Alert, AlertDescription} from "./ui/alert";
import {Badge} from "./ui/badge";

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

      setStatus((prev) => ({...prev, permission}));
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!status.isSupported) {
      return <Badge variant='destructive'>Not Supported</Badge>;
    }

    switch (status.permission) {
      case "granted":
        return status.isSubscribed ? (
          <Badge variant='default'>Subscribed</Badge>
        ) : (
          <Badge variant='secondary'>Permitted</Badge>
        );
      case "denied":
        return <Badge variant='destructive'>Denied</Badge>;
      default:
        return <Badge variant='outline'>Not Asked</Badge>;
    }
  };

  const getDescription = () => {
    if (!status.isSupported) {
      return "Your browser doesn't support push notifications.";
    }

    switch (status.permission) {
      case "granted":
        return status.isSubscribed
          ? "You're subscribed to push notifications!"
          : "Permission granted. The subscription will be handled by PushEngage.";
      case "denied":
        return "Push notifications are blocked. Please enable them in your browser settings.";
      default:
        return "Click the button below to enable push notifications and stay updated.";
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <CardTitle>Push Notifications</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>{getDescription()}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {status.permission === "default" && status.isSupported && (
          <Button onClick={requestNotificationPermission} disabled={isLoading} className='w-full'>
            {isLoading ? "Requesting..." : "Enable Notifications"}
          </Button>
        )}

        {status.permission === "denied" && (
          <Alert>
            <AlertDescription>
              To receive notifications, please enable them in your browser settings and refresh the page.
            </AlertDescription>
          </Alert>
        )}

        {!status.isSupported && (
          <Alert>
            <AlertDescription>
              Push notifications are not supported in this browser. Please try using a modern browser like Chrome,
              Firefox, or Safari.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
