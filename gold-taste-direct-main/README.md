# Gold Taste Gateway

Build a complete, premium, mobile-first e-commerce ordering website for a local homemade sweets/halwa brand called:

GOLD TASTE
Premium Halwa
"Traditional Taste • Rich in Flavour"

IMPORTANT:
This is a real small home-based halwa business located in Malda, West Bengal, India. The website should feel like a premium Indian sweets/D2C food brand while remaining simple enough for a small business owner to operate.

==================================================
1. BRAND INFORMATION
==================================================

Brand Name:
Gold Taste

Tagline:
Premium Halwa

Secondary tagline:
Traditional Taste • Rich in Flavour

Business Address:
Ar Ki Mirchok Road, Malda, West Bengal

Phone:
9547897607

Email:
goldtaste26@gmail.com

Delivery:
- Malda Town: 1–2 days
- Outside Malda Town: 2–3 days

Business model:
- Homemade/home-based halwa and sweets
- Customers browse products on website
- Customers select products and quantity
- Customers enter delivery details
- Customers pay using UPI QR
- After payment, website redirects customer to WhatsApp
- WhatsApp message should contain complete order details
- Owner manually verifies payment and confirms order

DO NOT invent product prices or UPI IDs.
Create editable placeholders for these.

==================================================
2. DESIGN DIRECTION
==================================================

Create a VERY PREMIUM luxury Indian sweets website.

Color palette:
- Matte black
- Deep charcoal
- Warm cream
- Metallic gold
- Soft beige

Primary visual identity:
BLACK + GOLD + CREAM

The uploaded Gold Taste product/logo image should be used as the primary brand/product visual wherever appropriate.

Use elegant typography:
- Premium serif font for major headings
- Modern clean sans-serif font for body text

Design inspiration:
- Premium Indian mithai brand
- Luxury food packaging
- Modern D2C food startup
- High-end restaurant aesthetic

Do NOT make it look like a generic restaurant template.

Avoid excessive gradients.
Avoid excessive animations.
Avoid bright colors.
Avoid clutter.

Use subtle Indian ornamental patterns in backgrounds and section dividers.

Use:
- Large food photography
- Soft shadows
- Premium cards
- Rounded corners
- Gold borders
- Smooth hover effects
- Subtle reveal animations
- Elegant spacing
- Excellent mobile responsiveness

==================================================
3. WEBSITE STRUCTURE
==================================================

Create these pages/sections:

1. Home
2. Our Halwa / Products
3. Product Details
4. Cart
5. Checkout
6. Payment
7. Order Confirmation
8. About Gold Taste
9. Delivery Information
10. Contact
11. Admin Dashboard

Use React + TypeScript.

Use a clean component-based architecture.

==================================================
4. NAVBAR
==================================================

Desktop navbar:

LEFT:
Gold Taste logo/wordmark

CENTER:
Home
Our Halwa
About
Delivery
Contact

RIGHT:
Cart icon with item count
"Order Now" gold button

Mobile:
- Hamburger menu
- Gold Taste logo
- Cart icon

Navbar should become sticky after scrolling.

Use black/transparent luxury styling.

==================================================
5. HERO SECTION
==================================================

Create a cinematic premium hero section.

Left side:

SMALL LABEL:
PREMIUM HALWA

MAIN HEADING:
"A Taste Worth Remembering."

SUBHEADING:
"Traditional recipes, rich flavours and freshly prepared halwa — delivered to your doorstep."

Buttons:

"Explore Our Halwa"
"Order on WhatsApp"

Right side:
Use the uploaded Gold Taste product image prominently.

Add subtle gold ornamental decoration.

Below hero add a small trust strip:

"Freshly Prepared"
"Premium Ingredients"
"Carefully Packed"
"Local Delivery"

Hero must look excellent on mobile.

==================================================
6. PRODUCT SECTION
==================================================

Heading:

"Our Signature Halwa"

Subtitle:

"Rich, traditional flavours prepared with care."

Create beautiful premium product cards.

Initially create sample products/placeholders:

1. Gajar Halwa
2. Suji Halwa
3. Moong Dal Halwa
4. Besan Halwa
5. Dry Fruit Halwa
6. Special Gold Taste Halwa

IMPORTANT:
Prices must be editable and clearly marked as placeholder data until the owner provides actual prices.

Each card should contain:

- Product image
- Product name
- Short description
- Weight options
- Price
- Quantity
- Add to Cart
- Quick Order

Use realistic Indian halwa placeholder images only if actual product photos aren't available.

Do not claim that a product is actually sold until it is configured in the admin dashboard.

==================================================
7. PRODUCT DETAILS
==================================================

When user clicks a product:

Show:

Large product image
Product name
Description
Ingredients section
Available weights
Price
Quantity selector

Buttons:
"Add to Cart"
"Buy Now"

Also show:

"Freshly prepared"
"Carefully packed"
"Delivery available in Malda"

Do not make unsupported health claims.

==================================================
8. CART
==================================================

Create a premium cart drawer/page.

Display:

Product
Weight
Quantity
Price
Subtotal

Allow:
+ quantity
- quantity
Remove

Show:

Subtotal
Delivery
Grand Total

Delivery charge should be configurable from admin.

Button:

"Proceed to Checkout"

==================================================
9. CHECKOUT
==================================================

Create a clean multi-step checkout.

STEP 1:
Customer Details

Fields:

Full Name
Mobile Number
WhatsApp Number
Email (optional)

STEP 2:
Delivery Address

Address
Area
City
State
Pincode

Delivery location:

Radio buttons:

( ) Malda Town
( ) Outside Malda Town

Automatically show:

Malda Town:
"Estimated delivery: 1–2 days"

Outside Malda Town:
"Estimated delivery: 2–3 days"

STEP 3:
Order Review

Show:

Products
Quantity
Subtotal
Delivery fee
Total amount

Button:
"Continue to Payment"

Validate all required fields.

==================================================
10. PAYMENT PAGE
==================================================

Create a premium UPI payment screen.

Heading:

"Complete Your Payment"

Show:

ORDER TOTAL
₹XXXX

Then:

"Scan & Pay using any UPI app"

Create a large QR code placeholder.

IMPORTANT:
Do NOT hardcode a fake UPI ID.

Create an admin setting:

UPI ID
Merchant Name
UPI QR Image

Admin should be able to upload the actual QR image.

Also provide:

"Pay using UPI ID"

with a configurable UPI ID.

If the browser/device supports UPI deep links, provide:

"Pay with UPI App"

using a dynamically generated UPI payment link.

The UPI ID and merchant information must come from configuration/database.

Below QR:

"After completing payment, click the button below to confirm your order on WhatsApp."

Button:

"Payment Completed — Confirm on WhatsApp"

==================================================
11. WHATSAPP ORDER SYSTEM
==================================================

THIS IS VERY IMPORTANT.

After payment, generate a WhatsApp message automatically.

Use WhatsApp number:

9547897607

Create a WhatsApp deep link.

The message should be automatically generated from the order.

Example:

Hello Gold Taste 👋

I would like to confirm my order.

Order ID: GT-20260919-001

Customer:
Rahul

Mobile:
98XXXXXXXX

Delivery Address:
Full customer address

Products:
Gajar Halwa - 500g × 2
Suji Halwa - 250g × 1

Subtotal:
₹XXX

Delivery:
₹XX

Total:
₹XXX

Payment Method:
UPI

Payment Status:
Paid by customer

Please verify my payment and confirm the order.

Thank you,
Gold Taste Customer

The message should be URL encoded correctly.

IMPORTANT:
Do not claim that payment has been automatically verified.

The WhatsApp message should say payment was completed by the customer, and the owner manually verifies it.

Also provide:

"Need Help? Chat on WhatsApp"

button throughout the website.

==================================================
12. ORDER CONFIRMATION PAGE
==================================================

After customer clicks WhatsApp:

Show:

"Order Submitted Successfully 🎉"

Order ID:
GT-XXXXXXXX

Message:

"Your order details have been sent to Gold Taste on WhatsApp. Our team will verify your payment and confirm your order shortly."

Show:

Order Summary
Customer Details
Delivery Address
Estimated Delivery

Buttons:

"Track Order"
"Chat on WhatsApp"
"Back to Home"

==================================================
13. ORDER TRACKING
==================================================

Create a simple order tracking page.

Customer enters:

Order ID
Mobile Number

Show status:

Payment Pending
Payment Verification
Confirmed
Preparing
Ready for Dispatch
Out for Delivery
Delivered

Use a beautiful progress timeline.

==================================================
14. DELIVERY SECTION
==================================================

Create a visually impressive delivery section.

Heading:

"Freshness Meets Your Doorstep"

Two cards:

MALDA TOWN

1–2 Days

"Freshly prepared and delivered within Malda Town."

OUTSIDE MALDA TOWN

2–3 Days

"Delivery timeline may vary depending on location."

Add note:

"Delivery times are estimated and may vary depending on order volume, location and other delivery conditions."

==================================================
15. ABOUT SECTION
==================================================

Heading:

"Made With Tradition. Presented With Care."

Content:

"Gold Taste is a home-based premium halwa brand serving Malda and nearby customers with traditionally inspired sweet flavours and carefully prepared products."

Keep the tone warm and authentic.

Do not invent:
- Years of experience
- Awards
- Certifications
- Factory
- Number of customers
- False claims

==================================================
16. WHY GOLD TASTE
==================================================

Create four premium cards:

01
Freshly Prepared

02
Traditional Taste

03
Carefully Packed

04
Local Delivery

Use elegant icons.

==================================================
17. GALLERY
==================================================

Create a premium image gallery.

Use:
- Halwa close-up
- Packaging
- Spoon/product presentation
- Ingredient photography
- Brand/logo

Use the uploaded Gold Taste image as one of the featured visuals.

Create an easy admin system to replace images later.

==================================================
18. TESTIMONIALS
==================================================

Create testimonial section but use placeholder testimonials only.

Clearly make them editable from admin.

DO NOT fabricate real customer reviews.

Example placeholder:

"Customer reviews will appear here."

==================================================
19. CONTACT
==================================================

Create a premium contact section.

Gold Taste

Ar Ki Mirchok Road
Malda, West Bengal

Phone:
9547897607

Email:
goldtaste26@gmail.com

Buttons:

Call Now
WhatsApp
Email Us

Add Google Maps embed placeholder.

Do not invent exact GPS coordinates.

==================================================
20. FOOTER
==================================================

Black luxury footer.

Gold Taste logo

"Premium Halwa"

Links:

Home
Our Halwa
About
Delivery
Contact
Privacy Policy
Terms & Conditions

Contact:

9547897607
goldtaste26@gmail.com

Copyright:

© 2026 Gold Taste. All rights reserved.

==================================================
21. ADMIN DASHBOARD
==================================================

Create a proper protected admin dashboard.

Admin sections:

Dashboard
Products
Orders
Customers
Payments
Delivery Settings
UPI Settings
Website Content
Gallery
Settings

Dashboard statistics:

Today's Orders
Pending Orders
Confirmed Orders
Preparing
Delivered
Revenue

==================================================
22. PRODUCT MANAGEMENT
==================================================

Admin can:

Add product
Edit product
Delete product
Enable/disable product

Fields:

Product Name
Description
Image
Ingredients
Available Weights
Price
Stock Status
Featured
Active/Inactive

Allow multiple weight variants:

250g
500g
1kg

Price should be independently configurable.

==================================================
23. ORDER MANAGEMENT
==================================================

Admin can see:

Order ID
Customer
Phone
Products
Amount
Payment status
Order status
Delivery location
Date

Admin can change:

Payment:
Pending
Paid
Rejected

Order:
Pending
Confirmed
Preparing
Ready
Dispatched
Delivered
Cancelled

Add:

"Open WhatsApp"

button for every order.

==================================================
24. PAYMENT SETTINGS
==================================================

Create:

UPI Settings

Fields:

UPI ID
Merchant Name
QR Code Image

Example placeholder:

UPI ID:
YOUR-UPI-ID@upi

IMPORTANT:
Clearly label this as placeholder until the business owner provides the real UPI ID.

Allow admin to upload the actual QR image.

Do not expose secret payment gateway keys in frontend code.

==================================================
25. DELIVERY SETTINGS
==================================================

Admin can configure:

Malda Town delivery time:
1–2 days

Outside Malda delivery time:
2–3 days

Delivery charges:
Editable

Minimum order:
Editable

==================================================
26. DATABASE
==================================================

Use Supabase for backend/database.

Create appropriate tables:

products
product_variants
orders
order_items
customers
payments
delivery_settings
site_settings
gallery
admins

Use proper relationships.

Enable Row Level Security.

Customers should only be able to access their own order information.

Admin operations must be protected.

Never expose Supabase service-role keys in frontend.

Use environment variables for secrets.

==================================================
27. SECURITY
==================================================

Implement:

- Supabase authentication for admin
- Protected admin routes
- Row Level Security
- Input validation
- Server-side validation where necessary
- No secret keys in frontend
- No hardcoded admin passwords
- Sanitize user input
- Secure database policies

==================================================
28. MOBILE EXPERIENCE
==================================================

This is VERY IMPORTANT.

Most customers will likely use mobile phones.

The website must be optimized for:

iPhone
Android
Small screens
Tablet
Desktop

Mobile checkout must be extremely easy.

Sticky bottom mobile CTA:

"Order Now"

and/or

"WhatsApp"

Use large touch-friendly buttons.

==================================================
29. SEO
==================================================

Add proper:

Title:
Gold Taste | Premium Halwa in Malda

Meta description:

"Gold Taste offers premium homemade halwa in Malda with convenient local delivery. Order fresh traditional halwa and sweets online."

Add Open Graph metadata.

Add structured data where appropriate for the business/product pages.

Use semantic HTML.

Optimize image loading.

==================================================
30. PERFORMANCE
==================================================

Optimize for:

Fast loading
Lazy loaded images
Compressed images
Responsive images
Minimal unnecessary JavaScript
Good Lighthouse performance

==================================================
31. UX DETAILS
==================================================

Add polished micro-interactions:

- Gold underline on navigation hover
- Product card hover
- Smooth scrolling
- Add-to-cart animation
- Cart count animation
- Button loading states
- Toast notifications
- Form validation
- Payment loading state
- WhatsApp redirect state

Do NOT make animations excessive.

==================================================
32. ERROR HANDLING
==================================================

Handle:

Invalid phone number
Missing address
Empty cart
Payment not completed
Invalid order
Product unavailable
Database errors
Network errors

Show friendly messages.

Example:

"Please complete your delivery address before continuing."

==================================================
33. IMPORTANT BUSINESS LOGIC
==================================================

DO NOT create a fake automatic payment confirmation system.

The initial system is:

Customer pays using UPI
↓
Customer clicks "Payment Completed"
↓
WhatsApp opens
↓
Customer sends order/payment details
↓
Owner verifies payment manually
↓
Owner changes order status to Confirmed

Later this architecture should allow integration with Razorpay/PhonePe payment gateway without rebuilding the whole website.

==================================================
34. WHATSAPP NUMBER
==================================================

Use:

9547897607

When generating WhatsApp links, correctly convert it to the Indian international format:

919547897607

Do not display the international format unnecessarily to customers.

==================================================
35. BRAND IMAGE
==================================================

I have provided an image containing the Gold Taste branding/product packaging.

Use this image as the main visual reference.

The website logo should match the provided Gold Taste branding:
- Gold typography
- Black background
- Premium luxury appearance
- Crown/floral emblem
- Gold Taste wordmark

Do not distort the image.

Allow the owner to replace it later through admin.

==================================================
36. FINAL QUALITY REQUIREMENT
==================================================

DO NOT build this as a basic template.

It should look like a real premium Indian food startup website that could be shown to a paying client.

Prioritize:

1. Premium visual design
2. Mobile experience
3. Simple ordering
4. UPI payment flow
5. WhatsApp confirmation
6. Product management
7. Order management
8. Security
9. Fast performance
10. Easy future payment-gateway integration

Before finishing, test:

- Homepage
- Product browsing
- Add to cart
- Quantity updates
- Checkout
- Address validation
- Delivery selection
- Total calculation
- UPI payment screen
- WhatsApp redirect
- Order creation
- Order tracking
- Admin login
- Product management
- Order management
- Mobile responsiveness

Make the entire application functional rather than creating static mockups.

Use realistic placeholder data where required, but clearly mark business-specific information such as prices and UPI credentials as configurable.

Do not invent facts about Gold Taste.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a6cdb35b-fd25-4217-bde4-359893af6710).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
