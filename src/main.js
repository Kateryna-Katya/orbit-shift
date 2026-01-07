/**
 * ORBIT-SHIFT | Full Website Logic (2026)
 * Libraries used: Vanta.js (Three.js), AOS, Lucide
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК (LUCIDE)
    // ==========================================
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================
    // 2. 3D ЭФФЕКТ (VANTA.JS) С ОПТИМИЗАЦИЕЙ ПОД МОБИЛЬНЫЕ
    // ==========================================
    const initVanta = () => {
        if (typeof VANTA !== 'undefined' && document.querySelector("#hero-canvas")) {
            const isMobile = window.innerWidth < 768;

            VANTA.NET({
                el: "#hero-canvas",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 0.5, // Снижаем разрешение на мобилках для FPS
                color: 0x3b82f6,      // Electric Blue
                backgroundColor: 0x0, // Black
                points: isMobile ? 8.00 : 12.00, // Меньше точек на смартфонах
                maxDistance: isMobile ? 18.00 : 22.00,
                spacing: isMobile ? 18.00 : 16.00,
                showDots: true
            });
        }
    };
    initVanta();

    // ==========================================
    // 3. МОБИЛЬНОЕ МЕНЮ И СКРОЛЛ
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;
    const header = document.getElementById('header');

    if (menuToggle && menuOverlay) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuOverlay.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
            body.style.overflow = isActive ? 'hidden' : ''; // Блокируем скролл при меню
        });

        // Закрытие при клике на ссылку
        document.querySelectorAll('.mobile-nav__link').forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuToggle.classList.remove('is-active');
                body.style.overflow = '';
            });
        });
    }

    // Изменение хедера при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 4. ПЛАВНЫЙ СКРОЛЛ (SMOOTH SCROLL)
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 5. ЛОГИКА ФОРМЫ: ТЕЛЕФОН, КАПЧА, AJAX
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('captcha-input');
    const formMessage = document.getElementById('form-message');

    // Только цифры в телефоне
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^\d+]/g, '');
        });
    }

    // Генерация капчи
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    const captchaResult = n1 + n2;
    if (captchaLabel) {
        captchaLabel.innerText = `Подтвердите, что вы не бот: ${n1} + ${n2} =`;
    }

    // Обработка отправки
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Валидация капчи
            if (parseInt(captchaInput.value) !== captchaResult) {
                updateFormStatus("Ошибка: Неверный ответ капчи", "red");
                return;
            }

            updateFormStatus("Отправка данных...", "var(--color-text)");

            // Имитация AJAX
            setTimeout(() => {
                updateFormStatus("Успешно отправлено! Мы свяжемся с вами.", "green");
                contactForm.reset();
                setTimeout(() => { formMessage.style.display = 'none'; }, 4000);
            }, 1500);
        });
    }

    function updateFormStatus(text, color) {
        if (!formMessage) return;
        formMessage.innerText = text;
        formMessage.style.color = color;
        formMessage.style.display = 'block';
    }

    // ==========================================
    // 6. COOKIE POPUP
    // ==========================================
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookies = document.getElementById('accept-cookies');

    if (cookiePopup && !localStorage.getItem('orbit_cookies_accepted')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 3000);
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', () => {
            localStorage.setItem('orbit_cookies_accepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    // ==========================================
    // 7. ИНИЦИАЛИЗАЦИЯ AOS
    // ==========================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            disable: 'mobile' // Опционально: отключаем на мобилках для лучшей производительности
        });
    }
});