# Push Notifications Setup with PushEngage

This React application has been set up to work with PushEngage push notifications. Follow these steps to complete the integration:

## ✅ What's Already Done

1. **Service Worker**: Created `/public/service-worker.js` with PushEngage SDK
2. **Service Worker Registration**: Automatically registers when the app loads
3. **UI Component**: Built a React component to handle notification permissions
4. **Modern Design**: Beautiful, responsive UI with Tailwind CSS and shadcn/ui

## 🔧 Next Steps

### 1. PushEngage Account Setup

1. Sign up for a PushEngage account at https://www.pushengage.com/
2. Create a new site/project in your PushEngage dashboard
3. Get your site key and configuration details

### 2. Configure PushEngage

You'll need to add PushEngage configuration to your application. Create a new file `src/lib/pushengage-config.ts`:

```typescript
export const pushEngageConfig = {
  siteKey: "YOUR_SITE_KEY_HERE", // Replace with your actual site key
  // Add other configuration options as needed
};
```

### 3. Domain Configuration

Based on the instructions you received:

- **Main Domain**: Host this application on your main domain or subdomain
- **Custom Sub Domain**: If using a custom subdomain for HTTPS, configure it in your PushEngage dashboard
- **Service Worker Path**: The service worker is already placed at `/public/service-worker.js` and will be accessible at `https://yourdomain.com/service-worker.js`

### 4. HTTPS Requirement

Push notifications require HTTPS. Make sure your application is served over HTTPS in production.

### 5. Testing

1. Run the application: `npm run dev` or `bun run dev`
2. Open the application in a modern browser (Chrome, Firefox, Safari)
3. Click "Enable Notifications" to test the permission request
4. Check the browser's developer console for any errors

## 📁 File Structure

```
public/
  service-worker.js          # PushEngage service worker
src/
  components/
    push-notifications.tsx   # Main push notification component
  lib/
    service-worker.ts        # Service worker registration utilities
  main.tsx                   # Updated to register service worker
  App.tsx                    # Updated with push notification UI
```

## 🎨 Features

- **Permission Management**: Handles notification permission requests gracefully
- **Status Indicators**: Shows current subscription status with badges
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Provides user-friendly error messages
- **Browser Compatibility**: Checks for push notification support

## 🔍 Browser Support

Push notifications are supported in:

- Chrome 42+
- Firefox 44+
- Safari 16+ (macOS 13+)
- Edge 17+

## 📱 Mobile Support

- **Android**: Supported in Chrome and Firefox
- **iOS**: Supported in Safari 16.4+ (iOS 16.4+)

## 🚀 Deployment

When deploying to production:

1. Ensure HTTPS is configured
2. Update the PushEngage configuration with your production domain
3. Test the service worker registration
4. Verify push notifications work end-to-end

## 🛠️ Customization

The push notification component is fully customizable. You can:

- Modify the UI design in `src/components/push-notifications.tsx`
- Add custom notification handling logic
- Integrate with your existing user authentication system
- Customize the subscription flow

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify the service worker is registered correctly
3. Ensure HTTPS is configured properly
4. Contact PushEngage support for platform-specific issues

## 🔒 Security Notes

- The service worker only loads the PushEngage SDK from their CDN
- No sensitive data is stored in the service worker
- Users can unsubscribe at any time through browser settings
- Notification permissions are handled by the browser's native API
