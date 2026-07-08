# Tweakbooks Bookstore Website

A premium, fully responsive, static landing and informational website for **Tweakbooks**, a physical bookstore in Bardoli, Gujarat, India, established in 1996 and operated by Magan Lal.

This project is a **100% static, client-side application** with no backend server, no database overhead, and no complex framework dependencies. All interactive elements (like the Book Wiki search and the Contact Enquiry form) are processed entirely in the browser.

---

## Folder Structure

```text
tweakbooks/
│
├── index.html          # Home Page (includes Trust Stats, Services/Genres summaries, LocalBusiness Schema)
├── about.html          # About Us (Story of the store, owner profile, milestone timeline)
├── services.html       # Services Page (detailed descriptions & how-it-works processes)
├── genres.html         # Book Genres (descriptions & popular stocked series)
├── book-wiki.html      # Book Wiki search and category lookup UI
├── contact.html        # Contact Page (timings, interactive form, Google Map location)
├── robots.txt          # SEO instructions for search bots
├── sitemap.xml         # XML sitemap for indexing pages
├── favicon.ico         # Placeholder favicon icon
│
├── assets/
│   ├── css/
│   │   └── style.css   # Custom styling (fonts, glassmorphism, hover transitions)
│   ├── js/
│   │   ├── main.js     # Main page controller (navbar, mobile drawer, scroll contact widgets)
│   │   └── book-wiki.js# Book Wiki search, category filtering & card rendering logic
│   └── images/
│       └── logo.svg    # High-quality bookstore logo vector graphic
│
└── data/
    └── books-data.json # Offline database containing book entries for the Wiki lookup
```

---

## Getting Started

### 1. Running Locally
Because this project fetches data from the local `data/books-data.json` file asynchronously via `fetch()`, modern browser security policies (CORS) might block it if you open the `book-wiki.html` page by simply double-clicking the file in your file explorer.

To run the site properly:
- **Option A (VS Code Live Server)**: If you use VS Code, install the "Live Server" extension, right-click `index.html`, and select **Open with Live Server**.
- **Option B (Python Command)**: Open your terminal/command prompt in the directory and run:
  - Python 3: `python -m http.server 8000`
  - Open `http://localhost:8000` in your browser.
- **Option C (Node.js Server)**: If Node.js is installed, run `npx serve` and navigate to the link provided.

---

## Free Static Deployment

Since the website is completely static, it can be hosted for **free** with zero maintenance:

### 1. Netlify (Drag and Drop)
1. Go to [Netlify](https://www.netlify.com/) and log in.
2. Go to the **Sites** tab.
3. Drag the entire project folder and drop it into the designated upload area at the bottom.
4. Your website will be live in seconds with a custom subdomain (e.g., `tweakbooks.netlify.app`), which you can map to a custom domain.

### 2. GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to the repository's **Settings** tab.
3. Scroll down to **Pages** in the sidebar.
4. Set the Source to `Deploy from a branch`, select your branch (e.g. `main`), and folder (`/root`).
5. Click Save. Your website will be live shortly.

---

## What Magan Lal Needs to Update Later

Sections in the codebase are commented to make editing easy for the owner. Here is a list of sections to personalize:

1. **Real Store Photos**: Replace any placeholder descriptions with actual photos in `/assets/images/` or direct image paths.
2. **Google Maps Embed Code**: Currently, `contact.html` contains a Google Map iframe centered generally on Station Road, Bardoli. Magan Lal can search "Tweakbooks Bardoli" on Google Maps, click **Share -> Embed a map**, copy the iframe source URL, and paste it into the `src` attribute of the iframe in `contact.html`.
3. **Timings**: Adjust the store hours in `contact.html` and the Schema block in `index.html` if hours change.
4. **Testimonials**: Update the sample text quotes in `index.html` with real customer feedback.
5. **Adding Books to Book Wiki**: Open `data/books-data.json` and append new book records. Ensure they follow the JSON structure:
   ```json
   {
     "title": "Book Name",
     "author": "Author Name",
     "genre": "Manga / Fanfiction / Educational / Biography",
     "subgenre": "Sub-classification",
     "summary": "Short description of the book",
     "status": "Available / Popular / New Arrival"
   }
   ```
