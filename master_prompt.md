# AI Coding Agent Master Prompt: Tweakbooks Bookstore Landing Page

You are an expert front-end web developer and UI/UX designer. Your task is to build a professional, premium, mobile-responsive, production-grade landing and information website for a bookstore named **Tweakbooks**.

---

## 1. Project Context & Information
- **Store Name**: Tweakbooks
- **Established**: 1996
- **Location**: Bardoli, Gujarat, India
- **Owner**: Magan Lal
- **Contact Number**: +91 9328291864 (clickable for phone and WhatsApp)
- **Key Metrics**: 45+ Daily recurring customers, serving the community for over 30 years.
- **Product Offerings**:
  - Fanfiction Books
  - Manga (popular anime titles like Naruto, Jujutsu Kaisen, One Piece, etc.)
  - Educational Books
  - Biography Books
- **Services & Unique Value Propositions**:
  - **Sell & Buy-back**: Customers can buy new/refurbished books, and they can also sell their old books back to Tweakbooks.
  - **Refurbishing**: Tweakbooks buys old/used books, restores/refurbishes them, and sells them at a much lower, affordable price.
  - **Book Rentals**: Rent books on a daily rate (affordable rent-per-day system).
  - **Festive Discounts**: Periodic seasonal discounts and customer rewards.
  - **Book Wikipedia (Wiki Search)**: An interactive encyclopedia search service built into the website where customers can look up book information, synopsis, and characters.

---

## 2. Technical Stack Constraints
- **Core**: Vanilla HTML5, CSS3, and modern Vanilla JavaScript.
- **No Complex Tech Stack**: No back-end database systems, no user authentication servers, and no heavy frameworks (e.g., React, Next.js) unless explicitly requested. It must run out of a simple folder containing `index.html`, `styles.css`, and `app.js`.
- **Payment Integration**: Do **NOT** integrate any payment gateway (e.g., Razorpay or Stripe) at this stage. Instead, use interactive CTAs that direct users to book/buy/sell via direct communication (WhatsApp/Phone call) with pre-filled messaging templates.
- **Responsiveness**: Support all viewport widths perfectly (mobile screens 320px up to ultra-wide displays 2560px). Use a mobile-first approach.
- **SEO & Performance**: Include rich meta descriptions, semantic tag structures (`<header>`, `<main>`, `<section>`, `<footer>`), descriptive IDs, fast loading speed, and optimize layout transitions.

---

## 3. Design Aesthetics & Visual Guidelines
- **Color Palette**: Sophisticated dark-mode-first aesthetic with a light mode toggle. Use curated HSL variables:
  - Background: Deep Slate Dark (`#0B0F19`) / Clean Warm White (`#FAFAFA` for light mode)
  - Primary Accent: Forest Emerald Green (`#10B981` / `#059669`)
  - Secondary Accent: Gold / Amber (`#F59E0B` / `#D97706`)
  - Text: Light Slate Grey (`#E2E8F0`) / Charcoal Dark (`#1F2937`)
- **Typography**: Import Google Fonts **Outfit** (for large bold headings) and **Plus Jakarta Sans** (for highly readable body and interface text).
- **Glassmorphism**: Use elegant floating panels with blurred background transparency (`backdrop-filter: blur(16px)` with subtle border highlights) to give a modern, premium feel.
- **Animations**:
  - Soft scroll-linked fading animations.
  - Micro-interactions on buttons, input elements, and navigation links (slight lift, glow outlines).
  - A subtle floating book animation in the hero banner.

---

## 4. Key Interactive Components to Implement
### A. Header & Sticky Navigation
- Floating header container with blur backdrop.
- Interactive branding logo: "tweakbooks" with an elegant gold-highlighted leaf/book symbol.
- Navigation links: Genres, Services, Calculators, Book Wiki, Contact Us.
- Clean mobile drawer navigation triggered by a stylized hamburger icon.

### B. Hero Banner Section
- Compelling title: "Bardoli's Literary Sanctuary Since 1996".
- Highlighting the refurbished book cycle and rental service.
- Call to Actions (CTAs): "Search Book Wiki" and "Rent a Book".
- Stunning hero image displaying books and mangas in a warm-lit environment.

### C. Stats Ribbon
- Row of numeric highlights:
  - **30+** Years of Heritage (Since 1996)
  - **45+** Daily Happy Readers
  - **₹0** Platform Fees (We buy & sell direct)

### D. Genre Grid (Interactive Catalog)
- 4 rich cards displaying Manga, Fanfiction, Biographies, and Educational material.
- Each card has a brief description, sample popular titles, and a click state that filters the Book Wiki to that category automatically.

### E. Services Showcase & Calculators
- **Refurbishing & Buying Calculator**:
  - Interactive inputs: original retail price of user's book, condition rating (Poor, Fair, Good, Mint).
  - Output calculation: instant estimated buy-back value (e.g., Mint = 50% of retail, Good = 40%, Fair = 25%, Poor = 10%) and estimated refurbishing cost.
  - Action Button: "Sell/Refurbish via WhatsApp" which generates a direct WhatsApp link to Magan Lal (`9328291864`) pre-filled with the exact details.
- **Book Rent-per-Day Calculator**:
  - Interactive inputs: Book Category (Manga, Fanfiction, Education, Biography) and number of days to rent.
  - Rental Rate: Manga (₹5/day), Fanfiction (₹3/day), Education (₹10/day), Biography (₹7/day).
  - Output calculation: Total rental cost + security deposit (refundable).
  - Action Button: "Reserve via WhatsApp" opening WhatsApp with pre-filled message: *"Hello Magan Lal, I would like to rent a [Category] book for [Days] days. Expected price: ₹[Total]. Please confirm availability."*
- **Festive Discounts Banner**:
  - A cards layout displaying seasonal discounts (e.g., *"Diwali Book Fiesta: Buy 2 Get 1 Free on Mangas"* or *"Exam season discount: 20% off all educational guides"*).

### F. The Interactive Book Wiki
- A fully functional search and detail dashboard.
- Features a search input field and quick-filter category buttons.
- Utilizes a pre-loaded local JavaScript dataset of popular books (e.g., Manga: *One Piece, Naruto, Death Note*; Biographies: *Wings of Fire, Steve Jobs*; Educational: *Modern Indian History, Python Programming*; Fanfiction: *Harry Potter fan-fiction adaptations*).
- Displays book title, cover placeholder/illustration, category, average rating, brief plot synopsis, and availability status (Buy, Rent, or Refurbished Stock).
- **External Fetch Fallback**: If a user searches for a book not in the local dataset, write an asynchronous fetch calling the public **OpenLibrary Search API** (`https://openlibrary.org/search.json?q=YOUR_QUERY`), parse the response, and display the first matching books with cover images dynamically.

### G. Location & Contact Footer
- Showcase the owner: **Magan Lal**.
- Contact info with phone details and WhatsApp links.
- Stylized Bardoli, Gujarat map card or placeholder with custom map styling.
- Business hours widget displaying whether the physical store is currently "Open" or "Closed" based on the user's system time (e.g., Open daily from 9:00 AM to 8:00 PM).

---

## 5. File Architecture & Implementation Steps
1. **Initialize `index.html`**: Build out the clean semantic skeleton. Incorporate links to fonts (Outfit, Plus Jakarta Sans), icons (FontAwesome or Google Material Symbols), and `styles.css` / `app.js`.
2. **Define Design Tokens in `styles.css`**: Set up `:root` colors, layout sizing, and typography variables. Establish general styles, container layout systems, responsive grids, and navigation.
3. **Build UI Sections**: Write the visual styles for Hero, Stats, Genres, Services, Calculators, Wiki, and Footer. Ensure layout wrapping is responsive.
4. **Implement Interactive State logic in `app.js`**: Create the local data arrays, write event listeners for inputs in calculators, create the OpenLibrary API integration, implement current-time-based opening/closing store indicators, and format target URL encoders for WhatsApp redirections.
5. **Quality Review**: Inspect mobile screens, verify accessibility contrast, test error handling on search, and check performance optimization.
