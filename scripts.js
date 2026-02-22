document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Simulation
    const contactForm = document.getElementById('quote-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // reCAPTCHA Validation
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                formStatus.textContent = 'Please complete the reCAPTCHA verification.';
                formStatus.style.color = '#e74c3c';
                return;
            }

            const data = new FormData(contactForm);
            const name = data.get('name');
            const phone = data.get('phone');
            const email = data.get('email');
            const service = data.get('service');
            const message = data.get('message');

            formStatus.textContent = 'Submitting your request...';
            formStatus.style.color = '#0a2351';

            try {
                // Formatting for WhatsApp Direct (Immediate Notification)
                const waMessage = `*New Enquiry Received*%0A*Name:* ${name}%0A*Mobile:* ${phone}%0A*Email:* ${email}%0A*Service:* ${service}%0A*Message:* ${message}`;
                const ownerWaUrl = `https://wa.me/919540141077?text=${waMessage}`;

                // 1. Submit to Formspree (Handles Storage & Owner Email)
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Success! Your request has been sent. Opening WhatsApp for instant notification...';
                    formStatus.style.color = '#2ecc71';

                    // 2. Open WhatsApp (Frontend Redirect for Owner)
                    window.open(ownerWaUrl, '_blank');

                    contactForm.reset();
                    grecaptcha.reset();
                } else {
                    const result = await response.json();
                    formStatus.textContent = result.errors ? result.errors.map(error => error.message).join(", ") : "Submission failed.";
                    formStatus.style.color = '#e74c3c';
                }
            } catch (error) {
                formStatus.textContent = "Oops! Problem connecting to the server.";
                formStatus.style.color = '#e74c3c';
            }
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Mobile Menu Toggle (Basic)
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#fff';
                navLinks.style.padding = '2rem';
                navLinks.style.boxShadow = '0 10px 10px rgba(0,0,0,0.1)';
            }
        });
    }
});
