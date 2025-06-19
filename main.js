document.addEventListener('DOMContentLoaded', function() {
    // Navigation active state management
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else if (currentPage === '' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });

    // 3D Button Effects
    const interactiveButtons = document.querySelectorAll('.interactive-button');
    
    interactiveButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = x / rect.width * 100;
            const yPercent = y / rect.height * 100;
            
            const transformAmount = 5; 
            const rotateX = (transformAmount / 2) - (yPercent * transformAmount / 100);
            const rotateY = (xPercent * transformAmount / 100) - (transformAmount / 2);
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Publication Filters (if on publications page)
    const filterButtons = document.querySelectorAll('.publication-filter-btn');
    const publicationItems = document.querySelectorAll('.publication-item');
    const publicationSections = document.querySelectorAll('.publication-section');
    const publicationSearch = document.getElementById('publication-search');
    
    // Helper to show/hide sections based on visible items
    function updatePublicationSectionsVisibility() {
        publicationSections.forEach(section => {
            const items = section.querySelectorAll('.publication-item');
            let hasVisible = false;
            items.forEach(item => {
                if (item.style.display !== 'none') {
                    hasVisible = true;
                }
            });
            // Always show summary section (no publication-item)
            if (items.length === 0) {
                section.style.display = '';
            } else {
                section.style.display = hasVisible ? '' : 'none';
            }
        });
    }

    if (filterButtons.length > 0 && publicationItems.length > 0) { // ensure items exist
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filter = this.id.replace('filter-', '');
                
                publicationItems.forEach(item => {
                    if (filter === 'all' || item.dataset.type === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                updatePublicationSectionsVisibility();
            });
        });
        
        if (publicationSearch) {
            publicationSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                publicationItems.forEach(item => {
                    const title = item.querySelector('h4')?.textContent.toLowerCase() || '';
                    const authors = item.querySelector('p')?.textContent.toLowerCase() || '';
                    let keywordMatch = false;
                    item.querySelectorAll('.px-3.py-1')?.forEach(keyword => {
                        if (keyword.textContent.toLowerCase().includes(searchTerm)) {
                            keywordMatch = true;
                        }
                    });
                    
                    if (title.includes(searchTerm) || authors.includes(searchTerm) || keywordMatch) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                updatePublicationSectionsVisibility();
            });
        }
        
        const loadMoreButton = document.getElementById('load-more-publications');
        if (loadMoreButton) {
            loadMoreButton.addEventListener('click', function() {
                this.textContent = 'No more publications to load';
                this.disabled = true;
                this.classList.add('bg-gray-700', 'text-gray-400', 'cursor-not-allowed');
                this.classList.remove('interactive-button');
            });
        }
    }
    
    // FAQ Accordion (if on join-us page)
    const faqItems = document.querySelectorAll('.faq-item'); // Target .faq-item for event delegation
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (question && answer) {
                question.addEventListener('click', function() {
                    const isActive = question.classList.toggle('active');
                    answer.style.maxHeight = isActive ? answer.scrollHeight + 'px' : '0';
                });
            }
        });
    }
    
    // Contact Form (if on join-us page)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formDataObj = {};
            formData.forEach((value, key) => { formDataObj[key] = value; });
            
            let isValid = true;
            const requiredFields = ['name', 'email', 'subject', 'message'];
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && (!formDataObj[field] || formDataObj[field].trim() === '')) {
                    isValid = false;
                    input.classList.add('border-red-500');
                } else if (input) {
                    input.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                contactForm.innerHTML = `
                    <div class="text-center p-6">
                        <div class="h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 class="text-xl font-bold text-primary mb-2">Message Sent!</h4>
                        <p class="text-gray-300 mb-6">
                            Thank you for your interest in our lab. We'll get back to you as soon as possible.
                        </p>
                        <button type="button" class="interactive-button" onclick="location.reload()">Send Another Message</button>
                    </div>
                `;
            }
        });
    }

    // 3D Brain Interaction (check if Spline viewer exists)
    const splineViewerElement = document.querySelector('spline-viewer');
    if (splineViewerElement) {
        const splineContainer = document.querySelector('.spline-container'); // Assumes .spline-container wraps spline-viewer

        if (splineContainer) {
            // Add a custom loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'absolute inset-0 flex items-center justify-center bg-dark bg-opacity-80 z-10 pointer-events-none'; // pointer-events-none for overlay
            loadingIndicator.innerHTML = `
                <div class="text-center">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p class="text-primary">Loading 3D Brain Model...</p>
                </div>
            `;
            splineContainer.appendChild(loadingIndicator);
            
            // Remove loading indicator when Spline model is loaded
            splineViewerElement.addEventListener('load', function() {
                if (loadingIndicator && loadingIndicator.parentElement === splineContainer) {
                    splineContainer.removeChild(loadingIndicator);
                }
            });

            // Add an error handler for the spline viewer
            splineViewerElement.addEventListener('error', function(event) {
                console.error('Spline Viewer Error:', event);
                if (loadingIndicator && loadingIndicator.parentElement === splineContainer) {
                    loadingIndicator.innerHTML = `
                        <div class="text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p class="text-red-400 font-semibold">Failed to load 3D Brain Model.</p>
                            <p class="text-sm text-gray-400 mt-1">Please try refreshing the page. If the issue persists, check the console for errors or contact support.</p>
                        </div>
                    `;
                } else if(splineContainer) { // If loading indicator was already removed but error occurs later
                    const errorFallback = document.createElement('div');
                    errorFallback.className = 'absolute inset-0 flex items-center justify-center bg-dark bg-opacity-80 z-10 pointer-events-none';
                    errorFallback.innerHTML = `
                        <div class="text-center p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-red-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p class="text-red-400 font-semibold">An error occurred with the 3D Brain Model.</p>
                            <p class="text-sm text-gray-400 mt-1">Please check the console for details.</p>
                        </div>
                    `;
                    splineContainer.appendChild(errorFallback);
                }
            });

        } else {
            console.warn('Spline container (.spline-container) not found. Cannot add loading indicator or error handling for Spline viewer.');
        }
    }
    
    // Initialize any dynamic content that needs to be loaded (placeholder)
    // initDynamicContent(); 
});

// Function to initialize dynamic content (placeholder)
// function initDynamicContent() {
    // This function would typically load content from an API or data source
// }



