let books = [];
let activeGenre = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  fetchBooksData();
  setupGenreFilters();
  setupSearchInput();
});

/**
 * Fetches sample book dataset and initiates rendering
 */
async function fetchBooksData() {
  const container = document.getElementById('books-grid');
  const skeleton = document.getElementById('wiki-skeleton');
  
  try {
    const response = await fetch('./data/books-data.json');
    if (!response.ok) {
      throw new Error(`Failed to load books database (HTTP ${response.status})`);
    }
    books = await response.json();
    
    // Hide skeleton loading cards
    if (skeleton) skeleton.classList.add('hidden');
    
    renderBooks();
  } catch (error) {
    console.error('Error fetching book wiki data:', error);
    if (container) {
      container.innerHTML = `
        <div class="col-span-full text-center py-12 px-4 glass-card rounded-2xl border-red-200">
          <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
          <h3 class="text-lg font-serif font-bold text-book-charcoal mb-2">Failed to load Book Wiki</h3>
          <p class="text-sm text-book-muted mb-4">The local database couldn't be loaded. Please ensure you are viewing this page through a local development server.</p>
          <button onclick="window.location.reload()" class="bg-book-forest text-book-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-book-terracotta transition-colors">Try Again</button>
        </div>
      `;
    }
  }
}

/**
 * Sets up listeners for the genre filter buttons
 */
function setupGenreFilters() {
  const filterContainer = document.getElementById('genre-filters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    // Remove active styling from previous active button
    const activeBtn = filterContainer.querySelector('[data-active="true"]');
    if (activeBtn) {
      activeBtn.setAttribute('data-active', 'false');
      activeBtn.className = "px-4 py-2 text-sm font-semibold rounded-lg text-book-muted hover:text-book-charcoal hover:bg-book-sand transition-all";
    }

    // Set new active button style
    button.setAttribute('data-active', 'true');
    button.className = "px-4 py-2 text-sm font-semibold rounded-lg bg-book-forest text-book-cream transition-all shadow-md shadow-book-forest/10";

    activeGenre = button.getAttribute('data-genre');
    renderBooks();
  });
}

/**
 * Sets up live searching input events
 */
function setupSearchInput() {
  const searchInput = document.getElementById('wiki-search');
  const clearBtn = document.getElementById('clear-search');
  
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    if (clearBtn) {
      if (searchQuery.length > 0) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
    }
    renderBooks();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.classList.add('hidden');
      searchInput.focus();
      renderBooks();
    });
  }

  // Keyboard navigation shortcuts
  document.addEventListener('keydown', (e) => {
    // Focus search bar on pressing '/' key when not already inside an input/textarea
    if (e.key === '/' && document.activeElement !== searchInput && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

/**
 * Filter books and render them into the DOM
 */
function renderBooks() {
  const container = document.getElementById('books-grid');
  const resultCount = document.getElementById('result-count');
  if (!container) return;

  // Filter criteria
  const filtered = books.filter(book => {
    const matchesGenre = activeGenre === 'all' || book.genre.toLowerCase() === activeGenre.toLowerCase();
    const matchesSearch = book.title.toLowerCase().includes(searchQuery) ||
                          book.author.toLowerCase().includes(searchQuery) ||
                          book.summary.toLowerCase().includes(searchQuery) ||
                          (book.subgenre && book.subgenre.toLowerCase().includes(searchQuery));
    return matchesGenre && matchesSearch;
  });

  // Update results counter
  if (resultCount) {
    resultCount.textContent = `Showing ${filtered.length} of ${books.length} entries`;
  }

  // Empty state handling
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 px-4 glass-card rounded-2xl border border-book-muted/15 flex flex-col items-center justify-center">
        <svg class="w-14 h-14 text-book-muted/60 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253"/>
        </svg>
        <h3 class="text-xl font-serif font-bold text-book-charcoal mb-2">No matching books found</h3>
        <p class="text-sm text-book-muted max-w-md mb-6">We couldn't find anything matching "${searchQuery}" in our ${activeGenre === 'all' ? '' : activeGenre + ' '}catalog. Try another search or request this book.</p>
        <a href="contact.html?message=Hi%20Tweakbooks,%20I%20am%20looking%20for%20a%20book%20titled:%20" class="inline-flex items-center gap-2 bg-book-forest text-book-cream px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-book-terracotta hover-lift transition-all">
          Request This Book
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
        </a>
      </div>
    `;
    return;
  }

  // Render cards
  container.innerHTML = filtered.map(book => {
    // Generate URL for book enquiry
    const queryMessage = `Hi Tweakbooks, I am interested in checking the availability of the book: "${book.title}" by ${book.author} (${book.genre}).`;
    const contactUrl = `contact.html?message=${encodeURIComponent(queryMessage)}`;

    return `
      <div class="glass-card hover-lift p-6 rounded-2xl flex flex-col justify-between h-full border border-book-muted/10">
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-book-forest/10 text-book-forest">${book.genre}</span>
            ${book.status ? `<span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-book-terracotta/10 text-book-terracotta">${book.status}</span>` : ''}
          </div>
          <h3 class="text-lg font-bold font-serif mb-1 leading-snug text-book-charcoal hover:text-book-forest transition-colors duration-200">${book.title}</h3>
          <p class="text-xs text-book-muted font-medium mb-3.5">by ${book.author}</p>
          <p class="text-sm text-book-charcoal/80 leading-relaxed mb-4 line-clamp-3">${book.summary}</p>
        </div>
        <div class="pt-4 border-t border-book-sand flex items-center justify-between mt-auto">
          <span class="text-[11px] text-book-muted tracking-wide font-medium">${book.subgenre || ''}</span>
          <a href="${contactUrl}" class="text-xs font-bold text-book-forest hover:text-book-terracotta transition-colors inline-flex items-center gap-1 group">
            Enquire Now
            <svg class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>
      </div>
    `;
  }).join('');
}
