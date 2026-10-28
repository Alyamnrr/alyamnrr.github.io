/* ========================================================
   PORTOFOLIO : NURUL MUTA'ALYA (ALYA)
   Main Interactive Scripts
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. THEME TOGGLE (DARK / LIGHT) ----------
    const themeToggleBtn = document.getElementById('themeToggle');
    
    // Check saved theme or system preference
    if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
                showToast('Tema terang diaktifkan ☀️');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
                showToast('Tema gelap diaktifkan 🌙');
            }
        });
    }


    // ---------- 2. PROFILE IMAGE ----------
    // Clear any test storage to prioritize real assets/images/profile.jpg
    try {
        localStorage.removeItem('alya_profile_img');
    } catch (e) {}


    // ---------- 3. TYPING EFFECT ----------
    const words = [
        "AI Engineer 🤖",
        "Data Science Enthusiast 📊",
        "Teknik Informatika @ Telkom Univ 🎓",
        "Machine Learning & Fuzzy Logic 💡",
        "Music & Tech Lover 🎶"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingTarget = document.getElementById('typingText');

    function typeLoop() {
        if (!typingTarget) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 35 : 75;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2200; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before new word
        }

        setTimeout(typeLoop, typeSpeed);
    }

    if (typingTarget) {
        typeLoop();
    }


    // ---------- 4. NAVBAR SCROLL EFFECT ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 30) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });


    // ---------- 5. MOBILE MENU ----------
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close on navigation link click
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // ---------- 6. CONTACT FORM VIA EMAIL (FormSubmit API + Mailto Fallback) ----------
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('formName')?.value.trim() || '';
            const email = document.getElementById('formEmail')?.value.trim() || '';
            const subject = document.getElementById('formSubject')?.value.trim() || 'Pesan dari Portofolio Web';
            const message = document.getElementById('formMessage')?.value.trim() || '';

            const btnText = submitBtn ? submitBtn.querySelector('span') : null;
            if (btnText) btnText.textContent = 'Sedang Mengirim...';

            showToast('Mengirim pesan ke email Alya... ✉️');

            try {
                const response = await fetch('https://formsubmit.co/ajax/mutaalya1108@gmail.com', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `[Portofolio Web] ${subject}`,
                        message: message
                    })
                });

                if (response.ok) {
                    showToast('Pesan berhasil terkirim ke mutaalya1108@gmail.com! ✨');
                    contactForm.reset();
                } else {
                    throw new Error('Gagal mengirim via FormSubmit API');
                }
            } catch (err) {
                // Fallback: langsung buka aplikasi email pengguna
                const mailtoUrl = `mailto:mutaalya1108@gmail.com?subject=${encodeURIComponent(`[Portofolio] ${subject}`)}&body=${encodeURIComponent(`Halo Alya,\n\nNama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`)}`;
                window.location.href = mailtoUrl;
                showToast('Membuka aplikasi email untuk mengirim pesan ke Alya... ✉️');
                contactForm.reset();
            } finally {
                if (btnText) btnText.textContent = 'Kirim Pesan ke Email Alya';
            }
        });
    }

});


// ---------- 7. PROJECT FILTER (Global Scope) ----------
function filterProjects(category, btnEl) {
    const cards = document.querySelectorAll('.project-card');
    const btns = document.querySelectorAll('.project-filter-btn');

    btns.forEach((btn) => {
        btn.classList.remove('bg-maroon-800', 'text-white', 'shadow-md');
        btn.classList.add('bg-cream-200/80', 'dark:bg-maroon-950', 'text-slate-700', 'dark:text-cream-200');
    });

    if (btnEl) {
        btnEl.classList.remove('bg-cream-200/80', 'dark:bg-maroon-950', 'text-slate-700', 'dark:text-cream-200');
        btnEl.classList.add('bg-maroon-800', 'text-white', 'shadow-md');
    }

    cards.forEach((card) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
            card.style.display = 'flex';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
}


// ---------- 8. EXPERIENCE TABS (Global Scope) ----------
function switchExpTab(tabName) {
    const tabs = document.querySelectorAll('.exp-tab-btn');
    const contents = document.querySelectorAll('.exp-content');

    tabs.forEach((tab) => {
        tab.classList.remove('border-maroon-800', 'text-maroon-900', 'dark:text-cream-100', 'font-bold');
        tab.classList.add('border-transparent', 'text-slate-500', 'dark:text-cream-300/60', 'font-medium');
    });

    contents.forEach((content) => {
        content.classList.add('hidden');
    });

    const activeTab = document.getElementById(`tab-${tabName}`);
    const activeContent = document.getElementById(`content-${tabName}`);

    if (activeTab && activeContent) {
        activeTab.classList.add('border-maroon-800', 'text-maroon-900', 'dark:text-cream-100', 'font-bold');
        activeTab.classList.remove('border-transparent', 'text-slate-500', 'dark:text-cream-300/60', 'font-medium');
        activeContent.classList.remove('hidden');
    }
}


// ---------- 9. COPY CLIPBOARD FUNCTION ----------
function copyToClipboard(text, label = 'Teks') {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(`${label} berhasil disalin ke clipboard! 📋`);
        }).catch(() => fallbackCopy(text, label));
    } else {
        fallbackCopy(text, label);
    }
}

function fallbackCopy(text, label) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`${label} berhasil disalin ke clipboard! 📋`);
}


// ---------- 10. TOAST NOTIFICATION SYSTEM ----------
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'bg-maroon-900 text-cream-50 text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-xl border border-maroon-700/80 pointer-events-auto transition-all transform duration-300 translate-y-2 opacity-0 flex items-center gap-2.5';
    toast.innerHTML = `<i class="fa-solid fa-sparkles text-amber-300"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 15);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3200);
}
