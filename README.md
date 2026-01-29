# Grab Travel Prep

A pixel-perfect recreation of Grab's Trip Preparation UI for mobile screens.

![Demo](demo.gif)

## Features

- **Trip Preparation Cards**: Grab Travel Pass, Advance Booking, Sync Travel Plans
- **Sync Animation**: When user syncs, colored summary cards stack in from top
- **Expandable Cards**: Tap to expand flight details, eSIM usage, savings, payment actions
- **Other Essentials Grid**: Partner services like Firsty, HelloRide, redBus
- **PWA Ready**: Works offline, installable on mobile devices
- **Smooth Animations**: Card stacking, expand/collapse, touch feedback

## Interactions

1. **Initial State**: Shows 3 feature cards + essentials grid
2. **Tap "Sync"**: Trip summary cards animate in, feature cards collapse
3. **Tap Summary Cards**: Expand to show detailed information
   - Flight: Route, times, duration
   - eSIM: Data usage with progress circle
   - Travel Pass: Savings amount, validity, voucher link
   - GrabPay: Quick actions (Scan, Balance, Deposit, Add)

## Tech Stack

- Pure HTML/CSS/JS (no frameworks)
- CSS Variables for theming
- CSS Grid/Flexbox for layout
- CSS Animations & Transitions
- Service Worker for offline capability
- Inter font from Google Fonts

## Color Palette

| Element | Color |
|---------|-------|
| Grab Green | `#00A651` |
| Grab Dark | `#004D40` |
| Flight Card | `#D32F2F` |
| eSIM Card | `#F9A825` |
| Pass Card | `#00A651` |
| Pay Card | `#006B5A` |

## Run Locally

```bash
# Using Python
python3 -m http.server 8080

# Using Node
npx serve

# Using PHP
php -S localhost:8080
```

Then open `http://localhost:8080` on your mobile browser or use Chrome DevTools mobile emulation.

## Deploy

The project is static HTML/CSS/JS - deploy to any static hosting:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

## License

MIT
