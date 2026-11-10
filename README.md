# ZenLeaf Tea (禅葉) — Artisan Single-Origin Tea Store & API

> An elegant, mindful e-commerce platform and REST API for single-origin loose leaf harvests, ceremonial Uji matcha, and handcrafted Japanese teaware.

Built with **React 19**, **Tailwind CSS v4**, **Vite 8**, **Node.js**, **Express**, and **MongoDB**.

---

## 🍵 Key Features

- **Terroir & Single-Origin Catalog**: Full catalog of Japanese, Chinese, and Himalayan micro-lots with elevation, harvest dates, caffeine levels, tasting notes, and brewing guides.
- **Authoritative E-Commerce Engine**: Real-time inventory tracking, variant price validation, coupon discounts (`ZEN15`, `HARVEST10`, `FIRSTSIP`), and free shipping thresholds ($60+).
- **Guest & Member Checkout**: Seamless order placement with instant order confirmation tracking codes (`ZL-XXXXXX`).
- **Member Sanctuary & Loyalty**: JWT authentication, loyalty tiers, "Leaves" points system, and personal tasting journal logs.
- **The Zen Tasting Flight**: Integrated newsletter signup awarding welcome discount vouchers.
- **Interactive Tea Ritual Quiz**: Algorithmic recommendation engine mapping biorhythms and flavor palettes to specific harvests.
- **Lighthouse Performance Optimizations**: Tree-shaken direct icon path imports, WebP asset compression, LCP hero preloading, and dynamic component code-splitting.

---

## 🏗️ Architecture & Tech Stack

```
                     ┌─────────────────────────────────────────┐
                     │    React 19 Frontend (Vite 8 Client)    │
                     │  - Tailwind CSS v4 & Lucide Icons       │
                     │  - React.lazy & Suspense Code-Splitting │
                     │  - Resilient API Client with Fallback   │
                     └────────────────────┬────────────────────┘
                                          │
                                 HTTP REST /api/v1
                                          │
                     ┌────────────────────▼────────────────────┐
                     │      Express API Server (Port 5000)     │
                     │  - Helmet Security & CORS Control       │
                     │  - Morgan Logging & Express Rate-Limit  │
                     │  - Centralized Error & 404 Handlers     │
                     └────────────────────┬────────────────────┘
                                          │
        ┌─────────────────────────────────┼─────────────────────────────────┐
        │                                 │                                 │
┌───────▼───────┐                 ┌───────▼───────┐                 ┌───────▼───────┐
│  /auth Router │                 │/products Router│                │ /orders Router│
│  - register   │                 │ - search/sort │                 │ - guest & auth│
│  - login (JWT)│                 │ - category ct │                 │ - coupon engine│
│  - profile &  │                 │ - slug lookup │                 │ - stock deduct│
│    journal    │                 │ - admin CRUD  │                 │ - status flow │
└───────┬───────┘                 └───────┬───────┘                 └───────┬───────┘
        │                                 │                                 │
        │   ┌─────────────────────────────┴─────────────────────────────┐   │
        │   │                    /newsletter & /quiz                    │   │
        │   │   - subscribe to Zen Tasting Flight with promo codes      │   │
        │   │   - smart quiz algorithmic recommendation engine          │   │
        │   └─────────────────────────────┬─────────────────────────────┘   │
        │                                 │                                 │
        └─────────────────────────────────┼─────────────────────────────────┘
                                          │
                            ┌─────────────▼─────────────┐
                            │   MongoDB / Mongoose 9    │
                            │  - Indexed text search    │
                            │  - Resilient auto-retry   │
                            └───────────────────────────┘
```

---

## ⚙️ Backend Logic & Business Rules

### 1. Product Catalog & Search (`/api/v1/products`)
- **Query & Filter**: Filter by category (`Green & Matcha`, `Black & Oolong`, `Herbal & Infusions`, `Tea Ware & Gifts`).
- **Text Search**: Full-text regex search matching `name`, `description`, `flavorNotes`, `origin`, and `subregion`.
- **Sorting Options**: `featured` (default), `price-asc`, `price-desc`, `rating`, and `newest`.
- **Category Counts**: Live count aggregation via `/api/v1/products/categories` for UI filter badges.

### 2. Order Fulfillment Engine (`/api/v1/orders`)
- **Dual Checkout Modes**: Supports both guest checkout (name + email) and authenticated members.
- **Authoritative Calculations**: Product prices and variant sizes are verified against database records. Subtotals are calculated server-side to prevent client price tampering.
- **Promotions & Coupons**: Validated through `couponService`:
  - `ZEN15`: 15% off first harvest
  - `HARVEST10`: 10% seasonal discount
  - `FIRSTSIP`: 20% off (min. order $30)
  - `MATCHA25`: 25% connoisseur discount (min. order $50)
- **Shipping Rules**: Automatically computes \$0 free shipping for orders of \$60+ (or \$7 flat rate).
- **Real-time Inventory Management**: Automatically decrements product variant stock upon checkout and marks out-of-stock items when inventory hits 0.
- **Unique Order Identifier**: Generates human-friendly tracking codes (e.g., `ZL-749102`).

### 3. Customer Authentication & Loyalty (`/api/v1/auth`)
- **Security**: Passwords securely hashed with `bcryptjs` (salt factor 10); Bearer tokens signed with `jsonwebtoken` (7-day expiry).
- **Loyalty Program**:
  - `leavesPoints`: Members earn 10 Leaves for every \$10 spent.
  - `tier`: Progressive member status (Initiate → Kyoto Apprentice → Master of the Way).
  - `tastingJournal`: Personal journal records steep parameters, ratings, and notes, awarding +5 Leaves per entry.

### 4. Tasting Flight Newsletter (`/api/v1/newsletter`)
- Dedicated subscriber collection with automated duplicate detection.
- Emits the welcome voucher code `ZEN15` upon successful email validation.

### 5. Tea Ritual Quiz Recommendation (`/api/v1/quiz`)
- Evaluates customer preferences across biorhythm timing (morning / midday / sunset), flavor palettes (umami / roasted / floral), and preparation rituals (ceremonial whisk / teapot / infuser) to recommend matching harvests.

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/health` | Public | System status, database connection, and uptime |
| **GET** | `/api/v1/products` | Public | List products with search, category filter, sort & pagination |
| **GET** | `/api/v1/products/categories` | Public | Category list with live product counts |
| **GET** | `/api/v1/products/:id` | Public | Get single product by custom ID (`zen-01`), slug, or ObjectId |
| **POST** | `/api/v1/products` | Admin | Create a new artisan product |
| **PUT** | `/api/v1/products/:id` | Admin | Update an existing product |
| **DELETE**| `/api/v1/products/:id` | Admin | Delete a product |
| **POST** | `/api/v1/orders` | Public / Auth | Create and place an order (guest or member) |
| **POST** | `/api/v1/orders/validate-coupon` | Public | Validate promo code and calculate savings |
| **GET** | `/api/v1/orders/:orderId` | Public | Fetch order status by confirmation number (`ZL-XXXXXX`) |
| **GET** | `/api/v1/orders/customer/my-orders`| Member | Fetch authenticated customer's order history |
| **PATCH**| `/api/v1/orders/:orderId/status` | Admin | Update fulfillment status (`processing`, `shipped`, `delivered`) |
| **POST** | `/api/v1/auth/register` | Public | Register customer account (earns welcome bonus points) |
| **POST** | `/api/v1/auth/login` | Public | Customer login & Bearer token generation |
| **GET** | `/api/v1/auth/me` | Member | Get profile, loyalty points, journal, and recent orders |
| **POST** | `/api/v1/auth/tasting-journal` | Member | Add tasting note to personal journal (+5 Leaves) |
| **POST** | `/api/v1/newsletter/subscribe` | Public | Join Zen Tasting Flight and get 15% discount code |
| **POST** | `/api/v1/quiz/recommend` | Public | Get algorithmic tea recommendation from quiz answers |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Community Edition v6.0+ (running locally on port 27017 or a MongoDB Atlas URI)

### 2. Environment Configuration
Create a `.env` file in the project root:

```ini
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/zenleaf_tea
JWT_SECRET=zenleaf_artisan_tea_jwt_secret_key_2026_super_secure
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed the Database
Populates MongoDB with artisan single-origin harvests, demo users, and sample orders:
```bash
npm run seed
```

> **Pre-configured Demo Credentials:**
> - **Customer**: `eleanor.vance@mindfultravel.com` / `tea123456`
> - **Admin**: `admin@zenleaftea.com` / `admin123456`

---

## 💻 Running the Application

### Development Mode

Run the backend and frontend simultaneously:

**Terminal 1 — Express Backend API (Port 5000):**
```bash
npm run server:dev
# or standard mode:
npm run server
```

**Terminal 2 — Vite React Frontend (Port 5173):**
```bash
npm run dev
```

*The Vite dev server automatically proxies all `/api/*` calls to `http://localhost:5000`.*

---

### Production Build & Preview

```bash
# 1. Compile and bundle frontend with code-splitting & minification
npm run build

# 2. Preview the production build locally
npm run preview
```

### Code Quality & Linting

```bash
npm run lint
```

---

## ⚡ Performance Optimizations

1. **Tree-Shaking with Direct Icon Imports**:
   - Converted barrel `import { Icon } from 'lucide-react'` to direct path imports (`import Icon from 'lucide-react/dist/esm/icons/icon-name'`), dropping transformed modules during build from **1,944 to 73** (a 96% reduction).
2. **Chunk Splitting (`vite.config.js`)**:
   - Isolated `vendor-react` (`react`, `react-dom`, `scheduler`) and `vendor-ui` (`lucide-react`) to optimize browser cache reuse.
3. **Lazy-Loading Below-The-Fold Components**:
   - `OriginsSection`, `Footer`, `Toast`, and all interactive modals are loaded asynchronously via `React.lazy()` and `<Suspense>`, reducing the initial JavaScript entry chunk to **43.47 kB** (12.90 kB gzipped).
4. **Asset Optimization**:
   - High-fidelity **WebP** image formats (~85% smaller than raw JPEG).
   - High-priority hero image preloading (`fetchpriority="high"`, `loading="eager"`).
   - Non-blocking asynchronous Google Fonts with `display=swap`.

---

## 📄 License
Private project. Mindfully crafted for serene living.
