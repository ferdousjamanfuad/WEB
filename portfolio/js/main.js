document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Drawer Menu ---
    const drawer = document.getElementById('drawer');
    const openBtn = document.getElementById('drawer-open');
    const closeBtn = document.getElementById('drawer-close');

    if (drawer && openBtn) {
        openBtn.addEventListener('click', () => {
            drawer.showPopover();
            openBtn.setAttribute('aria-expanded', 'true');
        });

        drawer.addEventListener('toggle', (event) => {
            if (event.newState === 'closed') {
                openBtn.setAttribute('aria-expanded', 'false');
                drawer.style.setProperty('--drawer-backdrop', '0');
            }
        });

        // Close on link click
        const drawerLinks = drawer.querySelectorAll('a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                drawer.hidePopover();
            });
        });

        // Close btn inside drawer
        if(closeBtn) {
            closeBtn.addEventListener('click', () => drawer.hidePopover());
        }

        // Basic scroll dimming effect
        const scroller = drawer.querySelector('.Drawer-scroller');
        if(scroller) {
            scroller.addEventListener('scroll', () => {
                const maxScroll = scroller.scrollWidth - scroller.clientWidth;
                if(maxScroll > 0) {
                    const ratio = 1 - (scroller.scrollLeft / maxScroll);
                    drawer.style.setProperty('--drawer-backdrop', Math.max(0, Math.min(1, ratio)));
                }
            });
        }
    }

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('img');
    
    function updateThemeIcon() {
        const isDark = document.documentElement.classList.contains('dark') || 
            (!document.documentElement.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        themeIcon.src = isDark ? 'images/sun.svg' : 'images/moon.svg';
    }

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isCurrentlyLight = document.documentElement.classList.contains('light') || 
                (!document.documentElement.classList.contains('dark') && !window.matchMedia('(prefers-color-scheme: dark)').matches);
            
            if (isCurrentlyLight) {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-scheme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                localStorage.setItem('color-scheme', 'light');
            }
            updateThemeIcon();
        });
    }

    // Listen for OS theme changes if no local override
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('color-scheme')) {
            updateThemeIcon();
        }
    });
    if (themeIcon) updateThemeIcon();

    // --- Typewriter Effect ---
    const roleEl = document.getElementById('typed-role');
    if (roleEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const roles = ['Software Developer', 'ML Researcher', 'Cybersecurity Enthusiast'];
        let roleIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function type() {
            const currentRole = roles[roleIdx];
            if (isDeleting) {
                roleEl.textContent = currentRole.substring(0, charIdx - 1);
                charIdx--;
            } else {
                roleEl.textContent = currentRole.substring(0, charIdx + 1);
                charIdx++;
            }

            let speed = isDeleting ? 50 : 100;
            if (!isDeleting && charIdx === currentRole.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                speed = 500;
            }
            setTimeout(type, speed);
        }
        setTimeout(type, 1000);
    } else if (roleEl) {
        roleEl.textContent = 'Software Developer & ML Researcher';
    }

    // --- Scroll Reveal & Active Nav ---
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => revealObserver.observe(el));

    // Active nav
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(sec => navObserver.observe(sec));

    // --- Form handling ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (form.checkValidity()) {
                const name = document.getElementById('name').value;
                const body = document.getElementById('message').value;
                const subject = document.getElementById('subject').value || 'New message from portfolio';
                window.location.href = `mailto:fuad.jaman.ferdous@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(name + ' wrote:\n\n' + body)}`;
            }
        });
    }

    // Auto year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
