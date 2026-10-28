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


    // ---------- 2. PROFILE IMAGE STORAGE & UPLOAD ----------
    const imageUpload = document.getElementById('imageUpload');
    const profileImg = document.getElementById('profileImg');

    // Load saved image from localStorage if available
    const savedImg = localStorage.getItem('alya_profile_img');
    if (savedImg && profileImg) {
        profileImg.src = savedImg;
    }

    if (imageUpload && profileImg) {
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Max size check: 5MB
                if (file.size > 5 * 1024 * 1024) {
                    showToast('Ukuran foto maksimal 5MB ya! ⚠️');
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (event) {
                    const dataUrl = event.target.result;
                    profileImg.src = dataUrl;
                    try {
                        localStorage.setItem('alya_profile_img', dataUrl);
                        showToast('Foto profil berhasil diperbarui! ✨');
                    } catch (err) {
                        // In case localStorage quota exceeded
                        showToast('Foto ditampilkan! (Ukuran terlalu besar untuk disimpan permanen)');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }


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


    // ---------- 6. CONTACT FORM VIA WHATSAPP ----------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('formName')?.value.trim() || 'Pengunjung';
            const email = document.getElementById('formEmail')?.value.trim() || '';
            const subject = document.getElementById('formSubject')?.value.trim() || 'Peluang Proyek / Kolaborasi';
            const message = document.getElementById('formMessage')?.value.trim() || '';

            // Format message for WhatsApp
            const waText = encodeURIComponent(
                `Halo Alya! 👋\n\nNama: ${name}\nEmail: ${email}\nSubjek: ${subject}\n\nPesan:\n${message}`
            );

            showToast('Membuka WhatsApp untuk mengirim pesan... ✨');
            setTimeout(() => {
                window.open(`https://wa.me/6285727610186?text=${waText}`, '_blank');
            }, 700);

            contactForm.reset();
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
