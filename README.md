# E-Commerce Web App

This is my solution for the the Spot & Tango Junior Software Engineer take-home project.
A React-based e-commerce web app with filtering, cart management, and responsive design.

## Tech Stack

- **Vite**
- **React**
- **JavaScript**
- **Tailwind CSS**
- **Lucide React** (for icons)
- **Google Fonts**

## Key Features

* Product browsing with category and availability filters
* Responsive product grid with hover effects
* View cart in a sidebar or full cart page
* Real-time cart updates
* Sliding navigation sidebar that closes on scroll for small screens

## Core Components

* **`NavigationBar`** – Logo, desktop menu, mobile menu, and cart icon with item badge.
* **`Products`** – Fetches product data, applies filters, and renders product grid with add-to-cart buttons.
* **`Filter`** – Sidebar for category and availability selection; works on desktop and mobile.
* **`CartProvider`** – Context API provider managing cart state and providing cart utilities.
* **`CartPage`** – Full cart view with quantity controls, item removal, and order summary.
* **`CartSidebar`** – Slide-out cart for quick access on any page.

## State Management

* **`CartProvider`** context handles:

  * `cart` object mapping product IDs to `{ product, quantity }`
  * `totalQuantity` and `subtotalPrice`
  * Methods: `addToCart`, `removeFromCart`, `updateQuantity`

* Filters and selected products are managed locally in `Products` and `Filter` components using `useState`.

## Styling & Libraries

* **Tailwind CSS** for fast on-the-go styling
* **Lucide React** for icons (`ShoppingCart`, `Trash`, `Menu`, `X`, etc.)

## Project Structure

```
src/
│
├─ components/
│   ├─ NavigationBar.jsx
│   ├─ Products.jsx
│   ├─ Filter.jsx
│   ├─ CartPage.jsx
│   ├─ CartSidebar.jsx
│   └─ QuantityButton.jsx
│
├─ utilities.js      # Cart context, useCart hook, and groupData object to map product groups to labels and images.
├─ App.jsx
└─ index.js
```

## Usage

```bash
npm install
npm start
```

Open [http://localhost:5173](http://localhost:5173) or the link given in your terminal.
