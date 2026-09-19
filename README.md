# GrowthBuddy — Full-Stack AI Agency Platform (Phase 1 & Phase 2 Complete)

> **Business**: GrowthBuddy  
> **CEO**: Hanzala Khan  
> **Industry**: AI Agency & Workflow Automation for Small & Medium Businesses (SMBs)  
> **Status**: Full-Stack Architecture Active (Frontend + Backend + SQLite + Real-Time Sync via Socket.io)

---

## 🔑 Default Test Accounts & Login Credentials

Two test accounts have been pre-seeded into the database so you can immediately log in and test all portal features:

| Role | Email | Password | Access & Capabilities |
| :--- | :--- | :--- | :--- |
| **🛡️ Agency Admin** | `admin@growthbuddy.agency` | `AdminPassword2026!` | Access to the **Admin Operations Portal**: View all clients, update project status & progress sliders in real time, add client notes, view and manage incoming leads/CRM, and change passwords. |
| **👤 Sample Client** | `client@apexcommercial.com` | `ClientPassword2026!` | Access to the **Client Portal** for Marcus Reynolds (Apex Commercial): View active AI services (*AI Lead Gen* at 75%, *Website Creation* at 90%), animated progress bars, agency execution notes, and notifications. |

> **Tip on Login Screen**: On [`pages/portal-login.html`](http://localhost:3000/pages/portal-login.html), there are **"Quick-Fill" buttons** (`👤 Client` and `🛡️ Admin`) so you can test logins in a single click without typing credentials manually!

---

## 🚀 How to Run the Website Locally (Step-by-Step)

### Step 1: Install Node.js (If you haven't already)
1. Download the LTS version of Node.js from [nodejs.org](https://nodejs.org/).
2. Run the installer and click "Next" through the setup wizard.
3. Verify installation by opening PowerShell or Command Prompt and typing:
   ```bash
   node -v
   ```
   *(Node v18, v20, v22, or v24 all work seamlessly).*

### Step 2: Start the GrowthBuddy Server
1. Open PowerShell or Command Prompt in the project folder (`d:\growth buddy`).
2. Run:
   ```powershell
   npm start
   ```
3. You will see:
   ```text
   ======================================================
   🚀 GrowthBuddy Agency Server running on http://localhost:3000
   ⚡ Socket.io Real-Time Synchronization is ACTIVE
   🔒 Authentication: Admin & Customer Roles Configured
   📦 Database: SQLite (WAL mode, parameterized)
   ======================================================
   ```

### Step 3: Open in Your Browser
- **Public Home Page**: [http://localhost:3000](http://localhost:3000)
- **Services & Pricing**: [http://localhost:3000/pages/services.html](http://localhost:3000/pages/services.html)
- **Why Choose Us**: [http://localhost:3000/pages/why-us.html](http://localhost:3000/pages/why-us.html)
- **About & Leadership**: [http://localhost:3000/pages/about.html](http://localhost:3000/pages/about.html)
- **Consultation Form**: [http://localhost:3000/pages/contact.html](http://localhost:3000/pages/contact.html)
- **Portals Sign-In**: [http://localhost:3000/pages/portal-login.html](http://localhost:3000/pages/portal-login.html)

---

## ⚡ How to Test the Socket.io Real-Time Sync (Live Demo)

One of GrowthBuddy's flagship features is **real-time synchronization**: when an Admin modifies a client's project status or progress percentage, it reflects on that customer's screen **instantly with zero page refresh**.

Follow these 4 simple steps to see it in action:

1. **Open Customer Dashboard**:
   - Open your browser (e.g. Chrome) and navigate to `http://localhost:3000/pages/portal-login.html`.
   - Click the **"👤 Client (Marcus)"** quick-fill button and click **"Sign In"**.
   - You are now inside the **Client Portal** displaying Marcus's active services. Notice the green pulsating badge: `🟢 Live Real-Time Sync Active`.
2. **Open Admin Dashboard in a Second Window**:
   - Open a **New Incognito Window** (or Microsoft Edge) so you have two windows side-by-side.
   - Navigate to `http://localhost:3000/pages/portal-login.html`.
   - Click the **"🛡️ Admin (Hanzala)"** quick-fill button and click **"Sign In"**.
   - You are now inside the **Admin Operations Console**.
3. **Trigger an Update**:
   - On the Admin screen, find Marcus Reynolds' *"AI Sales Lead Generator"*.
   - Click the **"Edit & Sync"** button.
   - Move the progress slider from `75%` to `85%`.
   - Change status to **"Completed"** (or keep as "In Progress").
   - Add a note: *"Campaign scaled to 1,000 property managers. 24 qualified discovery calls booked."*
   - Click **"Update & Sync in Real Time"**.
4. **Watch the Magic in the Client Window**:
   - Immediately look at Window 1 (Customer Portal).
   - Without refreshing the page, the customer's progress bar animates to `85%`, the status badge turns emerald, the agency notes update, and a floating real-time toast alert appears!

---

## ☁️ How to Deploy to Production (Beginner Friendly)

You can host GrowthBuddy on beginner-friendly cloud platforms in under 5 minutes:

### Option A: Deploy on Render.com (Recommended)
1. **Push your code to GitHub**:
   - Create a free account at [github.com](https://github.com).
   - Create a new repository named `growthbuddy-website` and push this project folder to it.
2. **Create a Web Service on Render**:
   - Go to [render.com](https://render.com) and sign in.
   - Click **"New +"** → **"Web Service"**.
   - Connect your `growthbuddy-website` repository.
   - Configure the following settings:
     - **Name**: `growthbuddy-agency`
     - **Runtime**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `node server.js`
     - **Plan**: Free (or Starter)
3. **Add Environment Variables**:
   - Under the **"Environment"** tab on Render, add:
     - `PORT`: `3000`
     - `NODE_ENV`: `production`
     - `JWT_SECRET`: *(Generate any long random string)*
     - `DATABASE_PATH`: `./growthbuddy.db`
     - *(Optional SMTP credentials for real emails)*
4. **Custom Domain**:
   - In Render's dashboard, navigate to **Settings** → **Custom Domains**.
   - Type your domain: `growthbuddy.agency` (or `www.growthbuddy.agency`).
   - Copy the DNS CNAME record provided by Render into your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).

### Option B: Deploy on Railway.app
1. Go to [railway.app](https://railway.app) and sign in with GitHub.
2. Click **"New Project"** → **"Deploy from GitHub repo"**.
3. Select your GrowthBuddy repository.
4. Add a persistent disk volume pointing to `/app/growthbuddy.db` so database changes persist across redeploys.
5. In **Settings** → **Domains**, click **"Generate Domain"** or add your custom domain.

---

## 📬 How to Configure Real Email Alerts (Nodemailer)

By default, when someone submits the consultation form on [`pages/contact.html`](http://localhost:3000/pages/contact.html), GrowthBuddy saves the lead to the SQLite CRM database and logs the full email notification to the terminal in sandbox mode.

To send real emails to your personal inbox:
1. Open the `.env` file in the project root.
2. Replace the placeholder SMTP settings with your email provider:
   ```env
   SMTP_HOST=smtp.sendgrid.net       # or smtp.gmail.com / smtp.mailgun.org
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_real_username
   SMTP_PASS=your_real_password_or_app_token
   EMAIL_FROM="GrowthBuddy Alerts" <notifications@yourdomain.com>
   ADMIN_NOTIFICATION_EMAIL=hanzala@growthbuddy.agency
   ```
3. Restart the server (`npm start`). All contact form submissions will now arrive directly in your inbox!

---

## 🔒 How to Change the Admin Password

You can change your Admin password in two ways:
- **Method 1 (Easiest — via UI)**:
  1. Log into the Admin Dashboard at `http://localhost:3000/pages/admin-dashboard.html`.
  2. Click on the **"Admin Security & Password"** tab.
  3. Enter your current password (`AdminPassword2026!`) and your new desired password.
  4. Click **"Update Password"**.
- **Method 2 (CLI / Database Reset)**:
  - If you ever forget your password, run `node backend/database/seed.js` to reset default credentials.

---

## ✏️ Non-Coder Guide: How to Make Basic Edits

### 1. Changing Business Info or Service Descriptions
You don't need to touch database code or complex server files! Simply open:
👉 [`backend/config/appConfig.js`](file:///d:/growth%20buddy/backend/config/appConfig.js)
Here you can edit:
- Company phone number, email, and HQ address
- The 4 core services names, categories, and descriptions
- Permitted service status stages

### 2. Changing Text, Case Studies, or Testimonials on Webpages
All pages live in standard, beautifully commented HTML:
- **Home Page**: [`index.html`](file:///d:/growth%20buddy/index.html)
- **Services & Pricing**: [`pages/services.html`](file:///d:/growth%20buddy/pages/services.html)
- **Why Choose Us & Comparison Table**: [`pages/why-us.html`](file:///d:/growth%20buddy/pages/why-us.html)
- **About CEO Hanzala Khan & Story**: [`pages/about.html`](file:///d:/growth%20buddy/pages/about.html)
- **Case Studies & Articles**: [`pages/case-studies.html`](file:///d:/growth%20buddy/pages/case-studies.html)
- **Contact Info & Hotline**: [`pages/contact.html`](file:///d:/growth%20buddy/pages/contact.html)

### 3. Viewing the Raw Database
The database is stored in a single, lightweight file: **`growthbuddy.db`**.
If you want to view, export, or inspect all tables (leads, users, services) visually:
1. Download the free tool **DB Browser for SQLite** from [sqlitebrowser.org](https://sqlitebrowser.org/).
2. Open `growthbuddy.db`.
3. Browse data in the `leads`, `services`, or `users` tables, or export them to Excel/CSV with one click.

---

## 📁 Full Architecture Summary

```
d:\growth buddy\
├── server.js                      # Express HTTP Server + Socket.io + Route Mounts
├── package.json                   # Project dependencies (Express, Socket.io, bcrypt, JWT)
├── .env                           # Active environment configuration
├── .env.example                   # Environment configuration template
├── growthbuddy.db                 # SQLite Database (auto-created with WAL mode)
├── robots.txt                     # SEO Crawler instructions
├── sitemap.xml                    # XML Sitemap for search engines
├── favicon.svg                    # Brand vector icon
├── 404.html                       # Custom styled 404 error page
├── index.html                     # 3D Animated Hero & Home Page
│
├── backend/
│   ├── config/
│   │   ├── appConfig.js           # Central business constants & service definitions
│   │   └── mailer.js              # Nodemailer service with console sandbox fallback
│   ├── database/
│   │   ├── db.js                  # SQLite connection & automated table initialization
│   │   └── seed.js                # Database seeder for default Admin & Customer accounts
│   ├── middleware/
│   │   ├── auth.js                # JWT verification, cookie parsing & role guards
│   │   ├── rateLimiter.js         # Rate limiting for auth & contact form anti-spam
│   │   └── validation.js          # Input sanitization and validators
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth (login, me, change-password, logout)
│   │   ├── contactRoutes.js       # /api/contact (form submission & admin CRM leads)
│   │   ├── customerRoutes.js      # /api/customer (services, progress & notifications)
│   │   └── adminRoutes.js         # /api/admin (stats, clients, services CRUD & Socket broadcast)
│   └── socket/
│       └── socketHandler.js       # Socket.io live rooms & bidirectional status pushes
│
├── assets/
│   ├── css/
│   │   ├── style.css              # Design tokens, navbar, footer, typography
│   │   ├── components.css         # Buttons, cards, chat widget, cookie banner
│   │   └── pages.css              # Layouts for 3D hero, comparison table, portals
│   ├── js/
│   │   ├── main.js                # Sticky header, mobile drawer, chat widget
│   │   ├── hero-3d.js             # Three.js 3D AI neural constellation & core
│   │   └── portal.js              # Live portal authentication & redirect engine
│   └── images/
│       ├── logo.svg               # Full vector brand logo
│       └── og-preview.svg         # OpenGraph social share image
│
└── pages/
    ├── customer-dashboard.html    # [NEW] Customer Portal with real-time Socket.io sync
    ├── admin-dashboard.html       # [NEW] Admin Operations Console & CRM controller
    ├── portal-login.html          # Portal login screen connected to real authentication
    ├── contact.html               # Consultation form connected to SQLite & Nodemailer
    ├── services.html              # 4 core services, workflow process & pricing tiers
    ├── why-us.html                # SMB AI pitch, comparison matrix & testimonials
    ├── about.html                 # CEO Hanzala Khan profile, mission & agency story
    ├── case-studies.html          # Filterable SMB case studies & executive guides
    ├── privacy.html               # GDPR & CCPA privacy policy
    └── terms.html                 # Agency terms of service
```

---

## 👨‍💼 Leadership & Inquiries
- **Agency**: GrowthBuddy
- **Chief Executive Officer**: Hanzala Khan
- **Direct Hotline**: `+1 (800) 584-GROW`
- **Email**: `hello@growthbuddy.agency`
