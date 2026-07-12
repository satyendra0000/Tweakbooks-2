// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initTheme();
    initMobileMenu();
    initStoreStatus();
    initCalculators();
    initBookWiki();
});

/* ==========================================
   1. Theme Toggle & Storage
   ========================================== */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
}

/* ==========================================
   2. Mobile Drawer Menu
   ========================================== */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const header = document.querySelector('.header');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');

    menuToggle.addEventListener('click', () => {
        header.classList.toggle('menu-active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking links
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            header.classList.remove('menu-active');
            navLinks.classList.remove('active');
        });
    });
}

/* ==========================================
   3. Real-time Store Opening Hours
   ========================================== */
function initStoreStatus() {
    const storeStatus = document.getElementById('storeStatus');
    if (!storeStatus) return;

    function checkHours() {
        const now = new Date();
        const currentHour = now.getHours();
        
        // Store open hours: 9:00 AM (9) to 8:00 PM (20)
        const isOpen = currentHour >= 9 && currentHour < 20;

        if (isOpen) {
            storeStatus.className = 'store-status open';
            storeStatus.querySelector('.status-text').textContent = 'Open Now (Closes at 8:00 PM)';
        } else {
            storeStatus.className = 'store-status closed';
            storeStatus.querySelector('.status-text').textContent = 'Closed Now (Opens at 9:00 AM)';
        }
    }

    checkHours();
    // Re-check every minute
    setInterval(checkHours, 60000);
}

/* ==========================================
   4. Rental & Refurbish Calculators
   ========================================== */
function initCalculators() {
    const tabRent = document.getElementById('tabRent');
    const tabRefurbish = document.getElementById('tabRefurbish');
    const rentCalcBody = document.getElementById('rentCalcBody');
    const refurbishCalcBody = document.getElementById('refurbishCalcBody');

    // Switch Tabs
    tabRent.addEventListener('click', () => {
        tabRent.classList.add('active');
        tabRefurbish.classList.remove('active');
        rentCalcBody.classList.add('active');
        refurbishCalcBody.classList.remove('active');
    });

    tabRefurbish.addEventListener('click', () => {
        tabRefurbish.classList.add('active');
        tabRent.classList.remove('active');
        refurbishCalcBody.classList.add('active');
        rentCalcBody.classList.remove('active');
    });

    // --- Book Rental Calculator Logic ---
    const rentCategory = document.getElementById('rentCategory');
    const rentDays = document.getElementById('rentDays');
    const rentBookName = document.getElementById('rentBookName');
    
    const rentRateVal = document.getElementById('rentRateVal');
    const rentBaseFee = document.getElementById('rentBaseFee');
    const rentDeposit = document.getElementById('rentDeposit');
    const rentTotal = document.getElementById('rentTotal');
    const btnRentWhatsApp = document.getElementById('btnRentWhatsApp');

    // Constants
    const rentalRates = {
        Manga: 5,
        Fanfiction: 3,
        Education: 10,
        Biography: 7
    };

    const securityDeposits = {
        Manga: 150,
        Fanfiction: 100,
        Education: 250,
        Biography: 200
    };

    function updateRentalCalculator() {
        const category = rentCategory.value;
        const days = Math.max(1, parseInt(rentDays.value) || 1);
        
        const rate = rentalRates[category];
        const deposit = securityDeposits[category];
        const baseFee = rate * days;
        const total = baseFee + deposit;

        rentRateVal.textContent = `₹${rate}`;
        rentBaseFee.textContent = `₹${baseFee}`;
        rentDeposit.textContent = `₹${deposit}`;
        rentTotal.textContent = `₹${total}`;
    }

    [rentCategory, rentDays].forEach(element => {
        element.addEventListener('input', updateRentalCalculator);
    });

    btnRentWhatsApp.addEventListener('click', () => {
        const category = rentCategory.value;
        const days = rentDays.value;
        const bookName = rentBookName.value.trim();
        const baseFee = rentBaseFee.textContent;
        const deposit = rentDeposit.textContent;
        const total = rentTotal.textContent;

        const bookDetailsStr = bookName ? `"${bookName}" (${category})` : `a ${category} book`;
        const textMessage = `Hello Magan Lal, I am interested in renting ${bookDetailsStr} for ${days} days from Tweakbooks. \n\n*Calculator Summary*:\n- Base Rent: ${baseFee}\n- Refundable Deposit: ${deposit}\n- Total Initial Amount: ${total}\n\nIs this book currently available at the Bardoli branch?`;
        
        const encodedText = encodeURIComponent(textMessage);
        window.open(`https://wa.me/919328291864?text=${encodedText}`, '_blank');
    });

    // --- Refurbish & Buyback Calculator Logic ---
    const bookOriginalPrice = document.getElementById('bookOriginalPrice');
    const bookCondition = document.getElementById('bookCondition');
    const sellBookName = document.getElementById('sellBookName');
    
    const buybackRateVal = document.getElementById('buybackRateVal');
    const buybackOfferVal = document.getElementById('buybackOfferVal');
    const refurbishCostVal = document.getElementById('refurbishCostVal');
    const btnRefurbishWhatsApp = document.getElementById('btnRefurbishWhatsApp');

    const rates = {
        mint: { percentage: 0.50, name: "50% (Mint)", cost: 30 },
        good: { percentage: 0.40, name: "40% (Good)", cost: 50 },
        fair: { percentage: 0.25, name: "25% (Fair)", cost: 100 },
        poor: { percentage: 0.10, name: "10% (Poor)", cost: 180 }
    };

    function updateRefurbishCalculator() {
        const retailPrice = Math.max(0, parseFloat(bookOriginalPrice.value) || 0);
        const condition = bookCondition.value;
        
        const selected = rates[condition];
        const offer = Math.round(retailPrice * selected.percentage);
        const refurbishCost = selected.cost;

        buybackRateVal.textContent = selected.name;
        buybackOfferVal.textContent = `₹${offer}`;
        refurbishCostVal.textContent = `₹${refurbishCost}`;
    }

    [bookOriginalPrice, bookCondition].forEach(element => {
        element.addEventListener('input', updateRefurbishCalculator);
    });

    btnRefurbishWhatsApp.addEventListener('click', () => {
        const title = sellBookName.value.trim();
        const retail = bookOriginalPrice.value;
        const condition = bookCondition.options[bookCondition.selectedIndex].text;
        const offer = buybackOfferVal.textContent;
        const cost = refurbishCostVal.textContent;

        const bookTitleStr = title ? `"${title}"` : `my book`;
        const textMessage = `Hello Magan Lal, I want to sell/refurbish ${bookTitleStr}. \n\n*Calculator Estimate*:\n- Original Price: ₹${retail}\n- Declared Condition: ${condition}\n- Estimated Buyback Offer: ${offer}\n- Restoring Cost: ${cost}\n\nCan I bring it to the store for a physical check?`;
        
        const encodedText = encodeURIComponent(textMessage);
        window.open(`https://wa.me/919328291864?text=${encodedText}`, '_blank');
    });

    // Run calculations initially
    updateRentalCalculator();
    updateRefurbishCalculator();
}

/* ==========================================
   5. Book Wikipedia (Wiki Search Panel)
   ========================================= */
const localBooks = [
    // Manga
    {
        title: "One Piece, Vol. 1",
        author: "Eiichiro Oda",
        category: "Manga",
        rating: "4.9",
        description: "As a child, Monkey D. Luffy dreamed of becoming King of the Pirates. But his life changed when he accidentally ate the Gum-Gum Fruit, obtaining rubbery powers at the cost of never swimming again!",
        status: "Buy & Rent",
        icon: "🌊",
        stockStatus: "status-in-stock"
    },
    {
        title: "Naruto, Vol. 1",
        author: "Masashi Kishimoto",
        category: "Manga",
        rating: "4.8",
        description: "Naruto Uzumaki is a young shinobi with an incorrigible knack for mischief. He's got a wild sense of humor, but Naruto is completely serious about his mission to become the world's greatest ninja!",
        status: "Refurbished Stock",
        icon: "🦊",
        stockStatus: "status-rent"
    },
    {
        title: "Jujutsu Kaisen, Vol. 1",
        author: "Gege Akutami",
        category: "Manga",
        rating: "4.9",
        description: "Yuji Itadori is a high school student who spends his days visiting his bedridden grandfather. Although he looks like your average teenager, his immense physical strength is something to behold!",
        status: "Buy & Rent",
        icon: "👹",
        stockStatus: "status-in-stock"
    },
    // Fanfiction
    {
        title: "Harry Potter and the Methods of Rationality",
        author: "Eliezer Yudkowsky",
        category: "Fanfiction",
        rating: "4.7",
        description: "A popular alternate universe fanfiction where Petunia Evans married an Oxford biochemist, and Harry grew up reading science, science fiction, and cognitive psychology.",
        status: "Rent Only",
        icon: "⚡",
        stockStatus: "status-rent"
    },
    {
        title: "All the Young Dudes",
        author: "MsKingBean89",
        category: "Fanfiction",
        rating: "4.9",
        description: "A massive, widely read Harry Potter prequel fanfiction chronicling the lives of the Marauders (Remus, Sirius, James, and Peter) during their years at Hogwarts and the first wizarding war.",
        status: "Refurbished Stock",
        icon: "🐺",
        stockStatus: "status-rent"
    },
    // Education
    {
        title: "NCERT Class XII Mathematics (Vol 1 & 2)",
        author: "NCERT Editorial Board",
        category: "Education",
        rating: "4.5",
        description: "Standard Mathematics curriculum for Higher Secondary education in India, widely referenced for CBSE exams and JEE preparation in Bardoli.",
        status: "Refurbished (60% Off)",
        icon: "📐",
        stockStatus: "status-in-stock"
    },
    {
        title: "Automate the Boring Stuff with Python",
        author: "Al Sweigart",
        category: "Education",
        rating: "4.8",
        description: "The classic programming book for beginners. Teaches practical coding techniques to automate office files, web scraping, and computer tasks in Python.",
        status: "Buy & Rent",
        icon: "🐍",
        stockStatus: "status-in-stock"
    },
    // Biography
    {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Biography",
        rating: "4.9",
        description: "The autobiography of the Missile Man and former President of India, Dr. A.P.J. Abdul Kalam. It chronicles his early struggles, work on space research, and missile development projects.",
        status: "Buy & Rent",
        icon: "🚀",
        stockStatus: "status-in-stock"
    },
    {
        title: "Steve Jobs",
        author: "Walter Isaacson",
        category: "Biography",
        rating: "4.7",
        description: "Based on more than forty interviews with Steve Jobs conducted over two years, this book tells the rollercoaster life and intense personality of the creative entrepreneur who revolutionized multiple industries.",
        status: "Refurbished Stock",
        icon: "🍎",
        stockStatus: "status-rent"
    }
];

function initBookWiki() {
    const searchInput = document.getElementById('wikiSearchInput');
    const clearBtn = document.getElementById('wikiClearBtn');
    const resultsGrid = document.getElementById('wikiResultsGrid');
    const resultsCount = document.getElementById('resultsCount');
    const searchSourceBadge = document.getElementById('searchSourceBadge');
    const stateMsg = document.getElementById('wikiStateMsg');
    const filterPills = document.querySelectorAll('.filter-pill');
    const genreCards = document.querySelectorAll('.genre-card');

    let activeFilter = 'all';
    let apiDebounceTimeout;

    // Initially render all local books
    renderResults(localBooks);

    // Search Input Event
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        
        if (query.length > 0) {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }

        clearTimeout(apiDebounceTimeout);
        
        // Filter locally first
        const localMatches = filterLocalBooks(query, activeFilter);
        
        if (localMatches.length > 0 || query === '') {
            stateMsg.classList.add('hidden');
            searchSourceBadge.textContent = 'Local Database';
            resultsCount.textContent = `Found ${localMatches.length} match${localMatches.length !== 1 ? 'es' : ''} in store`;
            renderResults(localMatches);
        } else {
            // No local results found, schedule OpenLibrary API query after 800ms
            searchSourceBadge.textContent = 'External Search';
            resultsCount.textContent = `Searching external library...`;
            resultsGrid.innerHTML = '';
            stateMsg.classList.remove('hidden');
            
            apiDebounceTimeout = setTimeout(() => {
                fetchFromOpenLibrary(query);
            }, 800);
        }
    });

    // Clear Button Event
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        stateMsg.classList.add('hidden');
        searchSourceBadge.textContent = 'Local Database';
        const matches = filterLocalBooks('', activeFilter);
        resultsCount.textContent = `Showing featured books`;
        renderResults(matches);
        searchInput.focus();
    });

    // Category Filter Pills
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.getAttribute('data-filter');
            
            const query = searchInput.value.trim();
            const matches = filterLocalBooks(query, activeFilter);
            
            resultsCount.textContent = query ? `Found ${matches.length} matches in store` : `Showing ${activeFilter} books`;
            renderResults(matches);
            stateMsg.classList.add('hidden');
        });
    });

    // Category Quick Filters from home page Genre Cards
    genreCards.forEach(card => {
        card.addEventListener('click', () => {
            const genre = card.getAttribute('data-genre');
            
            // Activate the corresponding pill
            filterPills.forEach(p => {
                if (p.getAttribute('data-filter') === genre) {
                    p.click();
                }
            });
            
            // Scroll to wiki section
            document.getElementById('wiki').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Local filter algorithm
    function filterLocalBooks(query, category) {
        const cleanQuery = query.toLowerCase();
        return localBooks.filter(book => {
            const matchesCategory = category === 'all' || book.category === category;
            const matchesQuery = !query || 
                book.title.toLowerCase().includes(cleanQuery) || 
                book.author.toLowerCase().includes(cleanQuery) || 
                book.category.toLowerCase().includes(cleanQuery) || 
                book.description.toLowerCase().includes(cleanQuery);
            return matchesCategory && matchesQuery;
        });
    }

    // Render results helper
    function renderResults(booksList, isExternal = false) {
        resultsGrid.innerHTML = '';
        
        if (booksList.length === 0) {
            resultsGrid.innerHTML = `
                <div class="no-results-placeholder">
                    <p>No titles found matching your search. Try searching general topics or author names!</p>
                </div>
            `;
            return;
        }

        booksList.forEach(book => {
            const card = document.createElement('div');
            card.className = 'wiki-card';
            
            const ratingStars = '★'.repeat(Math.round(parseFloat(book.rating || 4.0))) + '☆'.repeat(5 - Math.round(parseFloat(book.rating || 4.0)));
            const buyText = isExternal ? 'Request Purchase' : 'Enquire';
            
            card.innerHTML = `
                <div class="wiki-book-cover">
                    ${book.coverUrl ? `<img src="${book.coverUrl}" alt="${book.title} cover">` : `<span>${book.icon || '📖'}</span>`}
                </div>
                <div class="wiki-book-info">
                    <span class="wiki-book-cat">${book.category}</span>
                    <h4 class="wiki-book-title">${book.title}</h4>
                    <span class="wiki-book-author">By ${book.author}</span>
                    <div class="wiki-book-rating">
                        <span>${ratingStars}</span>
                        <span>(${book.rating || 'N/A'})</span>
                    </div>
                    <p class="wiki-book-desc">${book.description}</p>
                    <div class="wiki-book-status-row">
                        <span class="wiki-stock-badge ${book.stockStatus || 'status-in-stock'}">${book.status || 'Available'}</span>
                        <button class="wiki-card-action" title="${buyText}" onclick="enquireAboutBook('${book.title}', '${book.author}', ${isExternal})">
                            <i data-lucide="message-square"></i>
                        </button>
                    </div>
                </div>
            `;
            resultsGrid.appendChild(card);
        });
        
        lucide.createIcons();
    }

    // Fetch from OpenLibrary API
    async function fetchFromOpenLibrary(query) {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`);
            if (!response.ok) throw new Error('Network error');
            
            const data = await response.json();
            stateMsg.classList.add('hidden');
            
            if (!data.docs || data.docs.length === 0) {
                resultsCount.textContent = 'No external matches found';
                renderResults([]);
                return;
            }

            const externalBooks = data.docs.map(doc => {
                const coverId = doc.cover_i;
                const author = doc.author_name ? doc.author_name[0] : 'Unknown Author';
                const subjects = doc.subject ? doc.subject.slice(0, 3).join(', ') : 'Literature';
                
                return {
                    title: doc.title,
                    author: author,
                    category: subjects,
                    rating: doc.ratings_average ? doc.ratings_average.toFixed(1) : '4.2',
                    description: doc.first_sentence ? doc.first_sentence[0] : `A literary publication originally printed in ${doc.first_publish_year || 'various years'}. Find it on Tweakbooks shelves.`,
                    coverUrl: coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : null,
                    status: "Request Trade",
                    icon: "📖",
                    stockStatus: "status-rent"
                };
            });

            resultsCount.textContent = `Found ${externalBooks.length} titles in digital index`;
            renderResults(externalBooks, true);

        } catch (error) {
            console.error('API Error:', error);
            stateMsg.classList.add('hidden');
            resultsCount.textContent = 'Database offline, showing local catalog';
            
            // Fall back to local search
            const fallbackMatches = filterLocalBooks(query, activeFilter);
            renderResults(fallbackMatches);
        }
    }
}

// Global Enquiry function (available inline in rendered cards HTML)
window.enquireAboutBook = function(title, author, isExternal) {
    const sourceText = isExternal ? "seen on the OpenLibrary wiki index" : "listed on your bookstore site";
    const textMessage = `Hello Magan Lal, I am searching for "${title}" by ${author} (${sourceText}). Do you currently have it in stock at your Bardoli store (new, refurbished, or rental)?`;
    
    const encodedText = encodeURIComponent(textMessage);
    window.open(`https://wa.me/919328291864?text=${encodedText}`, '_blank');
};
