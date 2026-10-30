# Urban Cafe website — front-end ordering starter

A responsive café website concept for Urban Cafe, Dhaneta, Himachal Pradesh.

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser, or use VS Code Live Server.
3. Internet access is needed for Google Fonts and remote Unsplash demo images.

## Before showing this as the cafe's real website
The menu, prices, food photos, descriptions, hours, delivery areas, delivery charges, minimum order and dietary claims are placeholders or need owner confirmation. Replace them with approved information.

Edit the `products` array in `script.js` to update menu products.

## Current ordering behaviour
- Menu category filters and search work.
- Cart and quantity controls work in the browser.
- Checkout validates customer details.
- Checkout prepares an order enquiry in WhatsApp using the business number supplied for this project.
- No payment is collected and no order is saved to a server.

## Production requirements still outstanding
This is a front-end starter, not a production ordering/payment system. Before accepting real orders:
1. Set up a backend and database for orders.
2. Add secure owner authentication and order-management dashboard.
3. Integrate a payment provider (e.g. Razorpay) using server-side order creation and signature verification.
4. Add server-side price and availability validation; never trust browser-submitted totals.
5. Add privacy policy, terms, refund/cancellation policy and secure data handling.
6. Test on real phones and across supported browsers.
7. Confirm merchant onboarding and payment provider approval with the owner.

Never put secret API keys in `script.js` or any frontend file.

## Design
- Palette: forest `#24352b`, ivory `#f4efe5`, espresso `#34271f`, brass `#b68c58`.
- Fonts: Playfair Display and DM Sans via Google Fonts.
- Responsive layout, reduced-motion support, keyboard-usable controls and semantic sections.

## Deployment
This static front end can be hosted on GitHub Pages, Netlify or another static host. A production backend and payment integration must be hosted separately or added to a full-stack deployment.
