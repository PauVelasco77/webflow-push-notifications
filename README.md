# Tutellus Webflow Push Notifications

A simple HTML-based push notification subscription page for Tutellus using PushEngage.

## Overview

This project provides a lightweight, static HTML page that handles push notification subscriptions for Tutellus on a subdomain. It's designed to work with PushEngage's subscription system for users who want to receive notifications about new courses, tokenization updates, and exclusive Web3 community content.

## Features

- ✅ **Lightweight**: Just a single HTML file with embedded PushEngage integration
- ✅ **Subdomain Ready**: Configured for `isSubscriptionOnSubDomain: true`
- ✅ **No Dependencies**: No React, TypeScript, or complex build dependencies
- ✅ **Fast Build**: Builds in ~35ms with minimal output (0.93 kB)
- ✅ **Production Ready**: Optimized for deployment to subdomains

## Project Structure

```
├── index.html          # Main HTML file with PushEngage integration
├── vite.config.ts       # Minimal Vite configuration for building
├── package.json         # Minimal dependencies (only Vite)
├── dist/               # Build output directory
│   └── index.html      # Built HTML file ready for deployment
└── public/
    └── tutellus.svg    # Tutellus logo
```

## Configuration

The PushEngage configuration is embedded in the HTML file:

```javascript
w.PushEngage.push([
  "init",
  {
    appId: "fb1ba9db-ca75-4d09-afed-8edefebe44c9",
    isSubscriptionOnSubDomain: true,
  },
]);
```

## Development

### Prerequisites

- Node.js or Bun
- A PushEngage account with the correct App ID

### Installation

```bash
bun install
```

### Development Server

```bash
bun run dev
```

This will start a local development server where you can test the push notification subscription flow.

### Building for Production

```bash
bun run build
```

This generates a `dist/index.html` file that's ready for deployment.

### Preview Built Version

```bash
bun run preview
```

## Deployment

1. Build the project: `bun run build`
2. Upload the `dist/index.html` file to your subdomain
3. Ensure the subdomain is configured with HTTPS
4. Configure the subdomain in your PushEngage dashboard

## Requirements

- **HTTPS**: Push notifications require HTTPS
- **Modern Browser**: Chrome 42+, Firefox 44+, Safari 16+, Edge 17+
- **PushEngage Account**: Valid App ID configured for subdomain usage

## Usage

When users visit the subdomain page, they will see:

1. A welcome message about Tutellus notifications
2. The PushEngage subscription flow (handled automatically)
3. Proper subdomain subscription handling

The page is designed to be embedded or used as a standalone subscription landing page for your push notification service.

## Troubleshooting

### "Window opener not found" Error

This error was resolved by:
- Removing conflicting service worker registrations
- Using only the HTML-based PushEngage implementation
- Proper subdomain configuration

### Build Issues

If you encounter build issues:
- Ensure you're using the minimal `package.json` with only Vite
- Remove any TypeScript configuration files
- Use `bun run build` instead of complex build scripts

## Support

For PushEngage-specific issues, consult the [PushEngage documentation](https://www.pushengage.com/docs/) or contact their support team.

For project-specific issues, check that:
1. The App ID in `index.html` matches your PushEngage configuration
2. The subdomain is properly configured with HTTPS
3. The subdomain is registered in your PushEngage dashboard