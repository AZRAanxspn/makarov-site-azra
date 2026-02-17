// Файл: script.js
// Основной JavaScript для сайта Владимира Макарова

// Мобильное меню
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    // Мобильное меню
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.classList.toggle('active');
            mobileMenuBtn.innerHTML = nav.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Игнорируем ссылки на другие страницы
            if (href === '#' || href.startsWith('#!')) return;

            // Проверяем, ведет ли ссылка на элемент на текущей странице
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Анимация элементов при скролле
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.block, .dossier-card, .gallery-item, .video-card, .stat-card, .team-member'
        );

        if (animatedElements.length === 0) return;

        function checkScroll() {
            animatedElements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;

                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Инициализация анимации
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);

        // Первоначальная проверка
        setTimeout(checkScroll, 100);
    }

    initScrollAnimations();

    // Слайдер для главной страницы
    function initHeroSlider() {
        const heroImg = document.getElementById('hero-img');

        if (!heroImg) return;

        const heroImages = [
            { src: 'assets/images/makarov1.jpg', alt: 'Владимир Макаров в тактическом обмундировании' },
            { src: 'assets/images/makarov2.jpg', alt: 'Макаров как командир ЧВК Конни' },
            { src: 'assets/images/makarov3.jpg', alt: 'Макаров в тюрьме Зордая' }
        ];

        let currentImageIndex = 0;

        // Функция смены изображения
        function changeHeroImage() {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            const nextImage = heroImages[currentImageIndex];

            // Плавное переключение
            heroImg.style.opacity = '0';

            setTimeout(() => {
                heroImg.src = nextImage.src;
                heroImg.alt = nextImage.alt;
                heroImg.style.opacity = '1';
            }, 500);
        }

        // Меняем изображение каждые 5 секунд
        setInterval(changeHeroImage, 5000);

        // Предзагрузка изображений
        heroImages.forEach(img => {
            const preloadImg = new Image();
            preloadImg.src = img.src;
        });
    }

    initHeroSlider();

    // Активный пункт меню на основе текущей страницы
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav a');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            // Удаляем активный класс у всех ссылок
            link.classList.remove('active');

            // Добавляем активный класс к текущей странице
            if (linkHref === currentPage ||
                (currentPage === '' && linkHref === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavItem();

    // Год в футере
    function updateFooterYear() {
        const yearElements = document.querySelectorAll('.copyright');
        const currentYear = new Date().getFullYear();

        yearElements.forEach(element => {
            // Заменяем год в тексте
            element.innerHTML = element.innerHTML.replace(/©\s*\d{4}/, `© ${currentYear}`);
        });
    }

    updateFooterYear();

    // Обработка форм
    function initForms() {
        const forms = document.querySelectorAll('form');

        forms.forEach(form => {
            form.addEventListener('submit', function (e) {
                // Предотвращаем отправку по умолчанию для демо-форм
                if (this.id === 'contactForm' || this.hasAttribute('data-demo')) {
                    e.preventDefault();

                    // Простая валидация
                    const inputs = this.querySelectorAll('input[required], textarea[required]');
                    let isValid = true;

                    inputs.forEach(input => {
                        if (!input.value.trim()) {
                            isValid = false;
                            input.style.borderColor = '#8b0000';

                            // Убираем подсветку при исправлении
                            input.addEventListener('input', function () {
                                this.style.borderColor = '#444';
                            });
                        }
                    });

                    if (!isValid) {
                        alert('Пожалуйста, заполните все обязательные поля.');
                        return;
                    }

                    // Имитация отправки
                    alert('Спасибо! Ваше сообщение отправлено. В реальном проекте здесь была бы отправка на сервер.');
                    this.reset();
                }
            });
        });
    }

    initForms();

    // Анимация для временной шкалы на странице биографии
    function initTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.bio-event');

        if (timelineItems.length === 0) return;

        function checkTimelineScroll() {
            timelineItems.forEach((item, index) => {
                const itemPosition = item.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;

                if (itemPosition < screenPosition) {
                    // Задержка для последовательного появления
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }

        // Инициализация анимации
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });

        window.addEventListener('scroll', checkTimelineScroll);
        checkTimelineScroll();
    }

    initTimelineAnimation();

    // Темная тема (уже установлена, но добавим переключатель для демо)
    function initThemeToggle() {
        // Создаем кнопку переключения темы (скрытую по умолчанию)
        const themeToggle = document.createElement('button');
        themeToggle.id = 'themeToggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.title = 'Переключить тему';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #8b0000;
            color: white;
            border: none;
            cursor: pointer;
            z-index: 100;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            transition: all 0.3s;
        `;

        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', function () {
            // Для демо просто меняем иконку
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-moon')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                this.title = 'Включить тёмную тему';
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                this.title = 'Включить светлую тему';
            }

            // В реальном проекте здесь была бы смена темы
            alert('В реальном проекте здесь происходило бы переключение между тёмной и светлой темами.');
        });
    }

    // Инициализируем переключатель темы
    initThemeToggle();

    // Показ/скрытие дополнительной информации
    function initExpandableSections() {
        const expandButtons = document.querySelectorAll('.expand-btn');

        expandButtons.forEach(button => {
            button.addEventListener('click', function () {
                const targetId = this.dataset.target;
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const isHidden = targetElement.style.display === 'none' ||
                        targetElement.classList.contains('hidden');

                    if (isHidden) {
                        targetElement.style.display = 'block';
                        targetElement.classList.remove('hidden');
                        this.innerHTML = this.innerHTML.replace('показать', 'скрыть');
                    } else {
                        targetElement.style.display = 'none';
                        targetElement.classList.add('hidden');
                        this.innerHTML = this.innerHTML.replace('скрыть', 'показать');
                    }
                }
            });
        });
    }

    initExpandableSections();

    // Интерактивные элементы с hover-эффектами
    function initHoverEffects() {
        const interactiveElements = document.querySelectorAll(
            '.btn, .nav-button, .filter-btn, .tab-btn, .form-submit'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 5px 15px rgba(139, 0, 0, 0.4)';
            });

            element.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }

    initHoverEffects();

    // Загрузка изображений с fallback
    function initImageFallbacks() {
        const images = document.querySelectorAll('img[data-fallback]');

        images.forEach(img => {
            img.addEventListener('error', function () {
                this.src = this.dataset.fallback;
                this.alt = 'Изображение не загрузилось. Заглушка.';
            });
        });
    }

    initImageFallbacks();

    // Консольное сообщение для разработчиков
    console.log('%c⚡ Сайт "Владимир Макаров" загружен!', 'color: #8b0000; font-size: 16px; font-weight: bold;');
    console.log('%c👨‍💻 Разработано в образовательных целях', 'color: #b8860b; font-size: 14px;');

    // Обновление времени загрузки страницы
    window.addEventListener('load', function () {
        const loadTime = window.performance.timing.domContentLoadedEventEnd -
            window.performance.timing.navigationStart;
        console.log(`Время загрузки страницы: ${loadTime}ms`);
    });
});