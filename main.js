document.addEventListener('DOMContentLoaded', function() {
    try {
        // Navigation active state management
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = window.location.pathname.split('/').pop();
        
        if (navLinks && navLinks.length > 0) {
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                
                if (linkHref === currentPage) {
                    link.classList.add('active');
                } else if (currentPage === '' && linkHref === 'index.html') {
                    link.classList.add('active');
                }
            });
        }

        // 3D Button Effects
        const interactiveButtons = document.querySelectorAll('.interactive-button');
        
        if (interactiveButtons && interactiveButtons.length > 0) {
            interactiveButtons.forEach(button => {
                if (button) {
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
                }
            });
        }

        // Publication Filters (if on publications page)
        const filterButtons = document.querySelectorAll('.publication-filter-btn');
        const publicationItems = document.querySelectorAll('.publication-item');
        const publicationSections = document.querySelectorAll('.publication-section');
        const publicationSearch = document.getElementById('publication-search');
        
        // Helper to show/hide sections based on visible items
        function updatePublicationSectionsVisibility() {
            if (publicationSections && publicationSections.length > 0) {
                publicationSections.forEach(section => {
                    if (section) {
                        const items = section.querySelectorAll('.publication-item');
                        let hasVisible = false;
                        items.forEach(item => {
                            if (item && item.style.display !== 'none') {
                                hasVisible = true;
                            }
                        });
                        // Always show summary section (no publication-item)
                        if (items.length === 0) {
                            section.style.display = '';
                        } else {
                            section.style.display = hasVisible ? '' : 'none';
                        }
                    }
                });
            }
        }

        if (filterButtons && filterButtons.length > 0 && publicationItems && publicationItems.length > 0) {
            filterButtons.forEach(button => {
                if (button) {
                    button.addEventListener('click', function() {
                        filterButtons.forEach(btn => {
                            if (btn) btn.classList.remove('active');
                        });
                        this.classList.add('active');
                        const filter = this.id ? this.id.replace('filter-', '') : 'all';
                        
                        publicationItems.forEach(item => {
                            if (item) {
                                if (filter === 'all' || (item.dataset && item.dataset.type === filter)) {
                                    item.style.display = 'block';
                                } else {
                                    item.style.display = 'none';
                                }
                            }
                        });
                        updatePublicationSectionsVisibility();
                    });
                }
            });
            
            if (publicationSearch) {
                publicationSearch.addEventListener('input', function() {
                    const searchTerm = this.value ? this.value.toLowerCase() : '';
                    
                    publicationItems.forEach(item => {
                        if (item) {
                            const titleElement = item.querySelector('h4');
                            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
                            const authorsElement = item.querySelector('p');
                            const authors = authorsElement ? authorsElement.textContent.toLowerCase() : '';
                            let keywordMatch = false;
                            
                            const keywords = item.querySelectorAll('.px-3.py-1');
                            if (keywords && keywords.length > 0) {
                                keywords.forEach(keyword => {
                                    if (keyword && keyword.textContent && keyword.textContent.toLowerCase().includes(searchTerm)) {
                                        keywordMatch = true;
                                    }
                                });
                            }
                            
                            if (title.includes(searchTerm) || authors.includes(searchTerm) || keywordMatch) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
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
        const faqItems = document.querySelectorAll('.faq-item');
        if (faqItems && faqItems.length > 0) {
            faqItems.forEach(item => {
                if (item) {
                    const question = item.querySelector('.faq-question');
                    const answer = item.querySelector('.faq-answer');
                    if (question && answer) {
                        question.addEventListener('click', function() {
                            const isActive = question.classList.toggle('active');
                            answer.style.maxHeight = isActive ? answer.scrollHeight + 'px' : '0';
                        });
                    }
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
        
    } catch (error) {
        console.error('Error in main.js:', error);
    }
});



