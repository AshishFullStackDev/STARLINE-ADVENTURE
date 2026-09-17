// No blocking startup loader. The page should render immediately and not wait on
// non-critical images or remote media. Keep the site fully usable as soon as DOM content is ready.
const legacyLoader = document.querySelector('.preloader, .loading-screen');
if (legacyLoader) {
    legacyLoader.setAttribute('aria-hidden', 'true');
    legacyLoader.style.display = 'none';
    legacyLoader.style.opacity = '0';
    legacyLoader.style.pointerEvents = 'none';
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
        hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    // Products dropdown toggle
    document.querySelectorAll('.nav-dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation();
            const dropdown = toggle.closest('.nav-dropdown');
            const isOpen = dropdown.classList.contains('open');

            document.querySelectorAll('.nav-dropdown.open').forEach(openDropdown => {
                openDropdown.classList.remove('open');
                openDropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                dropdown.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.setAttribute('aria-label', 'Open navigation menu');
            const dropdown = link.closest('.nav-dropdown');
            if (dropdown) {
                dropdown.classList.remove('open');
                dropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
            document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
                dropdown.classList.remove('open');
                dropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
            });
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;

        document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
            dropdown.classList.remove('open');
            dropdown.querySelector('.nav-dropdown-toggle').setAttribute('aria-expanded', 'false');
        });

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open navigation menu');
        hamburger.focus();
    });
}

// Slider functionality - Initialize after DOM is loaded
let currentSlide = 0;
let slides;
let sliderInterval;

function initSlider() {
    slides = document.querySelectorAll('.slide');
    
    if (slides.length > 0) {
        // Ensure first slide is active
        slides[0].classList.add('active');
        startSliderInterval();
        
        // Pause slider on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });
            heroSection.addEventListener('mouseleave', () => {
                startSliderInterval();
            });
        }

        document.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSliderInterval();
            });
        });

        document.querySelector('.slider-arrow-left')?.addEventListener('click', () => changeSlide(-1));
        document.querySelector('.slider-arrow-right')?.addEventListener('click', () => changeSlide(1));

        showSlide(0);
    }
}

function showSlide(index) {
    if (!slides || slides.length === 0) return;

    currentSlide = (index + slides.length) % slides.length;
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentSlide) {
            slide.classList.add('active');
            // Play video if it's a video slide
            const video = slide.querySelector('video');
            if (video) {
                video.play().catch(e => console.log('Video play failed:', e));
            }
        } else {
            // Pause video if moving away from video slide
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });

    document.querySelectorAll('.slider-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
        dot.setAttribute('aria-current', i === currentSlide ? 'true' : 'false');
    });
}

function nextSlide() {
    if (!slides || slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    if (!slides || slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function changeSlide(direction) {
    if (direction === 1) {
        nextSlide();
    } else {
        prevSlide();
    }
    // Reset auto-advance timer
    resetSliderInterval();
}

function startSliderInterval() {
    sliderInterval = setInterval(nextSlide, 4000);
}

function resetSliderInterval() {
    clearInterval(sliderInterval);
    startSliderInterval();
}

// Initialize slider when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}

// Keyboard navigation for slider
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Search functionality removed (search UI disabled)

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const suffix = element.getAttribute('data-suffix') || '';
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + suffix;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + suffix;
        }
    }, 16);
}

// Intersection Observer for Stats Counter
const observeStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.textContent === '0') {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
};

// Initialize stats observer when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeStats);
} else {
    observeStats();
}

// Portfolio tab switching
function switchTab(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', btn.textContent.trim() === category ? 'true' : 'false');
        if (btn.textContent.trim() === category) {
            btn.classList.add('active');
        }
    });
    
    projectCards.forEach(card => {
        card.classList.toggle('is-hidden', category !== 'All Projects' && card.dataset.category !== category);
    });
}

document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => switchTab(button.textContent.trim()));
});

const categoryContent = {
    'rope-courses': {
        label: 'Featured category',
        title: 'Rope Courses & Obstacles',
        intro: 'Custom-designed rope-based adventure experiences that combine climbing, balance, movement, and confidence-building challenges for family entertainment zones, resorts, and high-energy outdoor destinations.',
        focus: ['Adventure parks', 'Resorts', 'Outdoor recreation zones'],
        activities: ['High rope course circuits', 'Obstacle challenge trails', 'Suspended bridges and crossings', 'Confidence-based team activities']
    },
    'zip-line': {
        label: 'Featured category',
        title: 'Zip Line & Sky Activities',
        intro: 'High-adrenaline sky experiences built for scenic viewpoints, tourism destinations, and adventure parks that need a memorable aerial attraction with strong operational safety.',
        focus: ['Tourism destinations', 'Adventure parks', 'Viewpoint attractions'],
        activities: ['Dual zip line systems', 'Sky cycle experiences', 'Aerial cable rides', 'High-line scenic circuits']
    },
    'climbing': {
        label: 'Featured category',
        title: 'Climbing & Height Activities',
        intro: 'Vertical experiences designed for active guest engagement, skill-based play, and structured challenge zones with safe, durable installation standards.',
        focus: ['Indoor and outdoor zones', 'Family attractions', 'Adventure learning spaces'],
        activities: ['Wall climbing setups', 'Tower climbing systems', 'Challenge ladders', 'Height-based fitness activities']
    },
    'multi-activity': {
        label: 'Featured category',
        title: 'Multi-Activity Structures',
        intro: 'Integrated adventure towers and activity hubs that combine fitness, climbing, zip, and challenge features into a single premium guest experience.',
        focus: ['Large family parks', 'School camps', 'Premium public attractions'],
        activities: ['Multi-level towers', 'Combined climbing and challenge zones', 'Rappelling and zip modules', 'Custom mixed-use adventure structures']
    },
    'thrill-rides': {
        label: 'Featured category',
        title: 'Extreme Thrill Rides',
        intro: 'High-intensity entertainment installations engineered to deliver bold motion, excitement, and memorable guest reactions for dedicated thrill zones.',
        focus: ['Thrill parks', 'Event venues', 'Adventure attractions'],
        activities: ['360-degree motion rides', 'Human gyro attractions', 'High-speed spinning rides', 'Extreme challenge experiences']
    },
    'atv': {
        label: 'Featured category',
        title: 'ATV & Off-Road Adventures',
        intro: 'Off-road, terrain-driven activities that offer a strong adventure value proposition for recreational destinations and outdoor tourism projects.',
        focus: ['Adventure parks', 'Camp grounds', 'Tourism properties'],
        activities: ['ATV trail rides', 'Off-road circuits', 'Adventure driving experiences', 'Terrain-based guest activities']
    },
    'shooting': {
        label: 'Featured category',
        title: 'Shooting & Target Activities',
        intro: 'Precision-based attractions built for entertainment, training, and target challenge experiences with a safe and professionally managed setup.',
        focus: ['Family entertainment parks', 'Training zones', 'Event spaces'],
        activities: ['Target shooting activities', 'Skill challenge games', 'Interactive range systems', 'Precision-based challenge modules']
    },
    'zorbing': {
        label: 'Featured category',
        title: 'Zorbing & Inflatable Adventures',
        intro: 'Lightweight, energetic inflatable and rolling attractions that bring playful excitement to family zones, festivals, and active event spaces.',
        focus: ['Family events', 'Sports zones', 'Festival setups'],
        activities: ['Zorbing experiences', 'Inflatable obstacle setups', 'Rolling fun attractions', 'Play-based obstacle installations']
    },
    'mechanical': {
        label: 'Featured category',
        title: 'Fun & Mechanical Rides',
        intro: 'Classic ride formats and mechanical attractions designed to balance entertainment value, reliability, and broad appeal across age groups.',
        focus: ['Amusement destinations', 'Family zones', 'Public spaces'],
        activities: ['Mechanical rides', 'Family spinning attractions', 'Interactive ride formats', 'Mini amusement experiences']
    },
    'water': {
        label: 'Featured category',
        title: 'Water Adventure Equipment',
        intro: 'Water-based adventure experiences engineered for aquatic facilities, seasonal attractions, and leisure destinations looking for stronger guest engagement.',
        focus: ['Water parks', 'Resorts', 'Leisure destinations'],
        activities: ['Water adventure setups', 'Splash-based challenge modules', 'Aquatic activity systems', 'Pool-side adventure experiences']
    },
    'kids': {
        label: 'Featured category',
        title: 'Kids Adventure Zone',
        intro: 'Play-focused activities carefully designed for younger guests, balancing excitement, safety, and age-appropriate challenge levels.',
        focus: ['Kids zones', 'Family parks', 'School play spaces'],
        activities: ['Junior climbing elements', 'Soft adventure activities', 'Interactive family play modules', 'Age-specific play structures']
    },
    'safety': {
        label: 'Featured category',
        title: 'Safety Equipment',
        intro: 'Essential protection, control, and support systems that ensure each attraction is installed, operated, and managed with professional-grade safety in mind.',
        focus: ['Site safety', 'Operational compliance', 'Professional installation'],
        activities: ['Full-body safety harnesses', 'Helmets and protective gear', 'Belay and rescue components', 'High-strength safety netting and connectors']
    }
};

function inferProductCategory(title) {
    const text = (title || '').toLowerCase();

    if (text.includes('rope') || text.includes('obstacle') || text.includes('bridge')) return 'rope-courses';
    if (text.includes('zip') || text.includes('sky') || text.includes('line')) return 'zip-line';
    if (text.includes('climb') || text.includes('wall') || text.includes('ladder')) return 'climbing';
    if (text.includes('tower') || text.includes('multi') || text.includes('activity')) return 'multi-activity';
    if (text.includes('gyro') || text.includes('360') || text.includes('spinner') || text.includes('spin')) return 'thrill-rides';
    if (text.includes('atv') || text.includes('off-road') || text.includes('off road')) return 'atv';
    if (text.includes('shoot') || text.includes('target')) return 'shooting';
    if (text.includes('zorb') || text.includes('inflatable')) return 'zorbing';
    if (text.includes('bull') || text.includes('cup') || text.includes('meltdown') || text.includes('ride')) return 'mechanical';
    if (text.includes('water') || text.includes('pool')) return 'water';
    if (text.includes('kid') || text.includes('junior') || text.includes('family')) return 'kids';
    if (text.includes('helmet') || text.includes('harness') || text.includes('belay') || text.includes('carabiner') || text.includes('safety') || text.includes('net')) return 'safety';

    return 'all-products';
}

function enhanceProductCards() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.trim() || 'Product';
        const categoryKey = card.dataset.category || inferProductCategory(title);
        card.dataset.category = categoryKey;

        const info = card.querySelector('.product-info');
        if (!info) return;

        if (!info.querySelector('.product-category-tag')) {
            const tag = document.createElement('span');
            tag.className = 'product-category-tag';
            tag.textContent = categoryKey === 'all-products' ? 'Adventure Product' : (categoryContent[categoryKey]?.title || 'Adventure Product');
            const heading = info.querySelector('h3');
            info.insertBefore(tag, heading);
        }

        if (!info.querySelector('.product-summary')) {
            const summary = document.createElement('p');
            summary.className = 'product-summary';
            summary.textContent = card.getAttribute('data-desc') || categoryContent[categoryKey]?.intro || 'Designed for adventure, safety, and memorable guest experiences.';
            const heading = info.querySelector('h3');
            info.insertBefore(summary, heading.nextSibling);
        }
    });
}

function getCategoryDisplayName(categoryKey) {
    if (!categoryKey || categoryKey === 'all-products') return 'Adventure Products';
    return categoryContent[categoryKey]?.title || 'Adventure Products';
}

function updateProductHeadingAndCount() {
    const sectionTitle = document.querySelector('.product-section-copy h2');
    const sectionMeta = document.querySelector('.product-section-controls span');
    const buttons = document.querySelectorAll('.category-button');
    const activeButton = document.querySelector('.category-button.active');
    const activeCategory = activeButton ? activeButton.dataset.category : 'all-products';
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const total = cards.length;
    const matching = cards.filter(card => !card.classList.contains('is-hidden')).length;
    const visible = cards.filter(card => !card.classList.contains('is-hidden') && !card.classList.contains('page-hidden')).length;

    if (sectionTitle) {
        sectionTitle.textContent = getCategoryDisplayName(activeCategory);
    }

    if (sectionMeta) {
        const selectedLabel = activeCategory === 'all-products' ? 'All products' : getCategoryDisplayName(activeCategory);
        sectionMeta.textContent = `Showing ${visible} of ${matching || total} ${selectedLabel.toLowerCase() === 'adventure products' ? 'activities' : 'items'}`;
    }

    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === activeCategory);
    });

    const pagerButtons = document.querySelectorAll('.product-nav-buttons button');
    const pageCount = Math.max(1, Math.ceil(matching / productPageSize));
    pagerButtons.forEach((button, index) => {
        button.disabled = matching === 0 || (index === 0 ? productPage === 0 : productPage >= pageCount - 1);
    });
}

const productPageSize = 6;
let productPage = 0;

function applyProductFilters() {
    const searchInput = document.getElementById('productSearch');
    const activeButton = document.querySelector('.category-button.active');
    const activeCategory = activeButton ? activeButton.dataset.category : 'all-products';
    const term = (searchInput ? searchInput.value.trim() : '').toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    const matchingCards = [];

    cards.forEach(card => {
        const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
        const summary = (card.querySelector('.product-summary')?.textContent || '').toLowerCase();
        const category = card.dataset.category || inferProductCategory(card.querySelector('h3')?.textContent || '');
        const matchesCategory = activeCategory === 'all-products' || category === activeCategory;
        const matchesSearch = !term || title.includes(term) || summary.includes(term) || (categoryContent[category]?.title || '').toLowerCase().includes(term);
        const shouldShow = matchesCategory && matchesSearch;
        card.classList.toggle('is-hidden', !shouldShow);
        card.classList.remove('page-hidden');
        if (shouldShow) matchingCards.push(card);
    });

    const pageCount = Math.max(1, Math.ceil(matchingCards.length / productPageSize));
    productPage = Math.min(productPage, pageCount - 1);
    const firstCard = productPage * productPageSize;
    matchingCards.forEach((card, index) => {
        card.classList.toggle('page-hidden', index < firstCard || index >= firstCard + productPageSize);
    });

    const visibleCount = matchingCards.filter(card => !card.classList.contains('page-hidden')).length;

    updateProductHeadingAndCount();

    const emptyState = document.getElementById('productEmptyState');
    if (visibleCount === 0) {
        if (!emptyState) {
            const node = document.createElement('div');
            node.id = 'productEmptyState';
            node.className = 'product-empty-state';
            node.innerHTML = `
                <h3>No matching products found</h3>
                <p>Try another search or request category details for a customized solution.</p>
                <div class="category-enquiry-actions">
                    <a class="request-category-button" href="contact.html">Request Category Details</a>
                    <a class="talk-expert-button" href="https://wa.me/919424904000?text=${encodeURIComponent('Hello Starline Adventures, I am looking for a custom adventure solution.')}">Talk to Our Expert</a>
                </div>
            `;
            const grid = document.querySelector('.product-grid');
            if (grid) grid.insertAdjacentElement('afterend', node);
        }
    } else if (emptyState) {
        emptyState.remove();
    }
}

function changeProductPage(direction) {
    const matching = Array.from(document.querySelectorAll('.product-card')).filter(card => !card.classList.contains('is-hidden')).length;
    const pageCount = Math.max(1, Math.ceil(matching / productPageSize));
    productPage = Math.max(0, Math.min(productPage + direction, pageCount - 1));
    applyProductFilters();
    document.querySelector('.product-category')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCategoryDetail(categoryKey) {
    const panel = document.getElementById('category-detail-panel');
    if (!panel) return;
    if (categoryKey === 'all-products') {
        panel.hidden = true;
        panel.innerHTML = '';
        return;
    }
    if (!categoryContent[categoryKey]) return;

    const data = categoryContent[categoryKey];
    panel.hidden = false;
    const focusList = data.focus.map(item => `<span>${item}</span>`).join('');
    const activityList = data.activities.map(item => `<li>${item}</li>`).join('');

    panel.innerHTML = `
        <div class="category-detail-header">
            <p class="category-detail-label">${data.label}</p>
            <h2>${data.title}</h2>
        </div>
        <div class="category-detail-body">
            <div class="category-detail-copy">
                <p>${data.intro}</p>
                <div class="category-detail-meta">${focusList}</div>
            </div>
            <div class="category-detail-list-wrap">
                <h3>Available options</h3>
                <ul class="category-detail-list">${activityList}</ul>
            </div>
        </div>
        <div class="category-enquiry-box">
            <h3>Looking for detailed information or a customized solution?</h3>
            <div class="category-enquiry-actions">
                <a class="request-category-button" href="contact.html">Request Category Details</a>
                <a class="talk-expert-button" href="https://wa.me/919424904000?text=${encodeURIComponent('Hello Starline Adventures, I would like details for the ' + data.title + ' category.')}">Talk to Our Expert</a>
            </div>
        </div>
    `;

    panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initCategoryButtons() {
    const buttons = document.querySelectorAll('.category-button');
    const searchInput = document.getElementById('productSearch');
    const clearSearchButton = document.getElementById('clearSearch');
    const panel = document.getElementById('category-detail-panel');

    if (!buttons.length) return;

    enhanceProductCards();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            productPage = 0;
            buttons.forEach(item => item.classList.toggle('active', item === button));
            renderCategoryDetail(button.dataset.category);
            applyProductFilters();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', applyProductFilters);
    }

    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
            }
            productPage = 0;
            applyProductFilters();
        });
    }

    document.querySelectorAll('.product-nav-buttons button').forEach((button, index) => {
        button.addEventListener('click', () => changeProductPage(index === 0 ? -1 : 1));
    });

    if (panel) {
        renderCategoryDetail('rope-courses');
    }

    applyProductFilters();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryButtons);
} else {
    initCategoryButtons();
}

// Share functionality
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'STARLINE ADVENTURES PVT LTD',
            text: 'Check out Starline Adventure - Manufacturers of Adventure Equipment',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    }
}

// ===================================================================
// CONTACT FORM HANDLING - Enquiry API (email) + WhatsApp click-to-chat
// ===================================================================
// The contact form posts to a small backend (see server/ folder) that emails
// every enquiry to us. Update ENQUIRY_API_URL to the deployed server's URL
// once it's hosted (see server/README.md).
// In addition, after a successful submit we show a WhatsApp click-to-chat
// button pre-filled with the enquiry details - this works with zero
// third-party API dependency (the visitor just taps it and hits send).
const ENQUIRY_API_URL = (STARLINE_CONFIG && STARLINE_CONFIG.enquiryApiUrl) || '/api/enquiry';

// Sanitize URL parameters to prevent XSS
function getURLParameter(param) {
    const params = new URLSearchParams(window.location.search);
    const value = params.get(param);
    if (!value) return null;
    // Sanitize: remove script tags and dangerous characters
    const div = document.createElement('div');
    div.textContent = value;
    return div.innerHTML;
}

// Pre-fill product field from URL parameter
function preselectProductFromURL() {
    const productParam = getURLParameter('product');
    if (productParam) {
        const productSelect = document.getElementById('product');
        if (productSelect) {
            // Normalize the product name to match select options
            const productMap = {
                'zipline': 'zipline',
                'zip line': 'zipline',
                'rope': 'rope',
                'rope course': 'rope',
                'swing': 'swing',
                'giant swing': 'swing',
                'climbing': 'climbing',
                'wall climbing': 'climbing',
                'safety': 'safety',
                'safety equipment': 'safety',
                'custom': 'custom',
                'custom solution': 'custom'
            };
            const normalizedProduct = productMap[productParam.toLowerCase()] || productParam;
            productSelect.value = normalizedProduct;
            // Scroll to product field to show pre-selection
            setTimeout(() => {
                productSelect.focus();
            }, 300);
        }
    }
}

// Build a pre-filled WhatsApp click-to-chat message from the enquiry form data
function buildWhatsAppEnquiryMessage(formData) {
    return `Hello STARLINE ADVENTURES,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company || 'N/A'}\nLocation: ${formData.location}\nInterested In: ${formData.product}\n\nDetails: ${formData.message}`;
}

// Main form submission handler - Send to local Node.js server with proper error handling
function handleEnquiry(event) {
    event.preventDefault();
    
    const form = event.target;
    const status = form.querySelector('.form-status');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!status) return;
    
    // Collect form data
    const formData = {
        name: form.querySelector('#name').value.trim(),
        email: form.querySelector('#email').value.trim(),
        phone: form.querySelector('#phone').value.trim(),
        company: form.querySelector('#company').value.trim(),
        location: form.querySelector('#location').value.trim(),
        product: form.querySelector('#product').value.trim(),
        message: form.querySelector('#message').value.trim()
    };
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.product || !formData.message) {
        status.textContent = '❌ Please fill in all required fields.';
        status.style.color = '#d32f2f';
        return;
    }
    
    // Show loading state
    status.textContent = '⏳ Sending your enquiry...';
    status.style.color = '#F47621';
    submitBtn.disabled = true;
    
    // Get the API URL from config
    const apiUrl = STARLINE_CONFIG?.enquiryApiUrl || 'http://localhost:3000/api/enquiry';
    
    // Send to server
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        timeout: 10000
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            status.textContent = '✅ Enquiry sent successfully! We\'ll get back to you soon.';
            status.style.color = '#4caf50';
            form.reset();
            submitBtn.disabled = false;
            // Keep success message for 5 seconds
            setTimeout(() => {
                status.textContent = '';
            }, 5000);
        } else {
            const errorMsg = data.error || 'Failed to send enquiry.';
            status.textContent = `❌ Error: ${errorMsg}`;
            status.style.color = '#d32f2f';
            submitBtn.disabled = false;
            console.error('Server error:', data);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        status.textContent = `❌ Network error: ${error.message}. Make sure the server is running on http://localhost:3000`;
        status.style.color = '#d32f2f';
        submitBtn.disabled = false;
    });
}

// Attach form submit listener (FormSpree will handle actual submission)
const enquiryForm = document.querySelector('.enquiry-form');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', handleEnquiry);
    // Pre-select product from URL parameter on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preselectProductFromURL);
    } else {
        preselectProductFromURL();
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Testimonial slider controls
const testimonialTrack = document.querySelector('.testimonial-track');
if (testimonialTrack) {
    const testimonialSlider = testimonialTrack.closest('.testimonial-slider');
    const testimonialCards = Array.from(testimonialTrack.children);
    const previousButton = testimonialSlider.querySelector('.testimonial-prev');
    const nextButton = testimonialSlider.querySelector('.testimonial-next');
    let testimonialIndex = 0;

    const getVisibleTestimonials = () => {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    };
    let touchStartX = 0;
    let touchStartY = 0;
    testimonialSlider.addEventListener('touchstart', event => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });
    testimonialSlider.addEventListener('touchend', event => {
        const touchEndX = event.changedTouches[0].screenX;
        const touchEndY = event.changedTouches[0].screenY;
        const horizontalDistance = touchEndX - touchStartX;
        const verticalDistance = touchEndY - touchStartY;
        if (Math.abs(horizontalDistance) < 45 || Math.abs(horizontalDistance) < Math.abs(verticalDistance)) return;
        testimonialIndex += horizontalDistance < 0 ? 1 : -1;
        updateTestimonials();
    }, { passive: true });

    const updateTestimonials = () => {
        const visibleTestimonials = getVisibleTestimonials();
        const maximumIndex = Math.max(0, testimonialCards.length - visibleTestimonials);
        testimonialIndex = Math.min(testimonialIndex, maximumIndex);
        const cardWidth = testimonialCards[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(testimonialTrack).gap) || 0;
        testimonialTrack.style.transform = `translateX(-${testimonialIndex * (cardWidth + gap)}px)`;
        previousButton.disabled = testimonialIndex === 0;
        nextButton.disabled = testimonialIndex === maximumIndex;
    };

    previousButton.addEventListener('click', () => {
        testimonialIndex -= 1;
        updateTestimonials();
    });

    nextButton.addEventListener('click', () => {
        testimonialIndex += 1;
        updateTestimonials();
    });

    window.addEventListener('resize', updateTestimonials);
    updateTestimonials();
}

// Set active page in navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Certificate Modal Functions
function openCertificate(element) {
    const img = element.querySelector('img');
    const fullImageUrl = img.getAttribute('data-full') || img.src;
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImg');
    
    modalImg.src = fullImageUrl;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close certificate modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCertificate();
    }
});

// Product details modal functions
function viewDetails(button) {
    const card = button.closest('.product-card');
    const title = card?.querySelector('h3')?.textContent?.trim() || 'Product Details';
    const desc = button.getAttribute('data-desc') || card?.querySelector('.product-summary')?.textContent || 'Premium adventure equipment for custom installations.';
    const specsText = button.getAttribute('data-specs') || '';
    const applicationsText = button.getAttribute('data-applications') || '';
    const image = card?.querySelector('img')?.src || '';
    const categoryKey = card?.dataset.category || inferProductCategory(title);
    const categoryName = getCategoryDisplayName(categoryKey);
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalApplications = document.getElementById('modalApplications');
    const modalQuote = document.getElementById('modalQuote');
    const modalWhatsApp = document.getElementById('modalWhatsApp');
    modal.returnFocus = button;

    modalImage.src = image;
    modalImage.alt = title;
    modalCategory.textContent = categoryName;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    modalSpecs.innerHTML = '';
    if (specsText) {
        specsText.split('|').forEach(spec => {
            const item = document.createElement('li');
            item.textContent = spec.trim();
            modalSpecs.appendChild(item);
        });
    } else {
        const item = document.createElement('li');
        item.textContent = 'Custom specification available on request.';
        modalSpecs.appendChild(item);
    }

    modalApplications.innerHTML = '';
    const applications = applicationsText ? applicationsText.split('|') : categoryContent[categoryKey]?.focus || ['Adventure parks', 'Resorts', 'Custom installations'];
    applications.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.trim();
        modalApplications.appendChild(li);
    });

    // Update links to pass product parameter to contact form
    modalQuote.href = `contact.html?product=${encodeURIComponent(title)}`;
    const whatsappMsg = `Hello Starline Adventures, I would like a quote for ${title}.`;
    modalWhatsApp.href = `https://wa.me/919424904000?text=${encodeURIComponent(whatsappMsg)}`;

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-close')?.focus();
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
    modal.returnFocus?.focus();
    modal.returnFocus = null;
}

// Close product modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProductModal();
    }
});

// ===== BACK-TO-TOP BUTTON =====
function createBackToTopButton() {
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('title', 'Back to top');
    button.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(button);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    // Scroll to top smoothly
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back-to-top button
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBackToTopButton);
} else {
    createBackToTopButton();
}

// ===== SCROLL PROGRESS BAR =====
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.insertBefore(progressBar, document.body.firstChild);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createScrollProgressBar);
} else {
    createScrollProgressBar();
}

// ===== CURRENT PAGE HIGHLIGHT IN NAV =====
document.addEventListener('DOMContentLoaded', () => {
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navDropdownButtons = document.querySelectorAll('.nav-dropdown-toggle');
    
    // Check direct links
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
            link.classList.add('current-page');
        }
    });
    
    // Check dropdown menus for current page and highlight the button
    navDropdownButtons.forEach(button => {
        const dropdownMenu = button.nextElementSibling;
        if (dropdownMenu && dropdownMenu.classList.contains('nav-dropdown-menu')) {
            const links = dropdownMenu.querySelectorAll('a');
            links.forEach(link => {
                const href = link.getAttribute('href').split('#')[0] || 'index.html'; // Handle anchor links
                if (href === currentLocation || href.split('/').pop() === currentLocation) {
                    // Highlight the dropdown button
                    button.classList.add('current-page');
                }
            });
        }
    });
});

// ===== NEWSLETTER FORM HANDLER =====
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value.trim();
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Validate email
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Disable button during submission
            button.disabled = true;
            button.textContent = 'Subscribing...';
            
            // Simulate API call (you can replace with actual API endpoint)
            setTimeout(() => {
                // Show success message
                button.textContent = '✅ Subscribed!';
                button.style.background = '#4caf50';
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    button.style.background = '';
                }, 3000);
            }, 800);
        });
    });
});