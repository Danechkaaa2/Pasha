document.addEventListener('DOMContentLoaded', () => {
    // Плавная прокрутка для навигации
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const section = document.querySelector(href);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                window.location.href = href;
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section, .game-card, .gallery-item, .about-section').forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Фильтрация игр
    const filterButtons = document.querySelectorAll('.games-filters .filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    const gamesGrid = document.querySelector('.games-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс нажатой кнопке
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Добавляем/убираем класс single-game-view
            if (gamesGrid) {
                if (filter !== 'all') {
                    gamesGrid.classList.add('single-game-view');
                } else {
                    gamesGrid.classList.remove('single-game-view');
                }
            }

            gameCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Обработка форм
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить логику отправки формы
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            // Показываем сообщение об успешной отправке
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Сообщение отправлено!';
            this.appendChild(successMessage);
            setTimeout(() => {
                successMessage.remove();
                this.reset();
            }, 3000);
        });
    });

    // Fade-in для карточек галереи при загрузке
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, i) => {
        setTimeout(() => item.classList.add('visible'), 100 + i * 60);
    });

    // Обработка кнопок в галерее
    const galleryFilters = document.querySelectorAll('.gallery-filters .filter-btn');

    // Скрываем все фото по умолчанию
    galleryItems.forEach(item => {
        item.style.display = 'none';
        item.style.opacity = '0';
    });

    if (galleryFilters.length > 0) {
        galleryFilters.forEach(button => {
            button.addEventListener('click', () => {
                galleryFilters.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');
                // Сначала скрываем все
                galleryItems.forEach(item => {
                    item.style.display = 'none';
                    item.style.opacity = '0';
                    item.classList.remove('visible');
                });
                // Получаем все фото нужной категории
                const filtered = Array.from(galleryItems).filter(item => item.getAttribute('data-category') === filter);
                // Показываем все фото выбранной категории с анимацией
                filtered.forEach((item, i) => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                        item.classList.add('visible');
                    }, 80 * i);
                });
            });
        });
    }

    // Модальное окно для фото
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const modalClose = document.querySelector('.gallery-modal-close');
    const modalBackdrop = document.querySelector('.gallery-modal-backdrop');

    if (modal && modalImg && modalClose && modalBackdrop) {
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                modal.classList.add('open');
                modalImg.src = img.src;
                modalImg.alt = img.alt;
                document.body.style.overflow = 'hidden';
            });
        });

        function closeModal() {
            modal.classList.remove('open');
            modalImg.src = '';
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('open') && (e.key === 'Escape' || e.key === 'Esc')) {
                closeModal();
            }
        });
    }

    // Анимация для кнопок
    const buttons = document.querySelectorAll('.btn, .filter-btn, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Обработка мобильного меню
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav ul');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }

    // Закрытие мобильного меню при клике на ссылку
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuButton.classList.remove('active');
            }
        });
    });

    // --- ДАННЫЕ ДЛЯ МОДАЛЬНОГО ОКНА ИГР ---
    const gamesData = {
        'Counter-Strike 2': {
            cover: 'game1.jpg',
            role: 'PashaBiceps',
            roleDesc: 'Огневая мощь, главный по бомбе',
            stats: [
                { label: 'Ранг:', value: 'Глава Отряда' },
                { label: 'Часов в игре:', value: '2000+' }
            ],
            achievements: [
                'Мастер гранат',
                'Главный опорник Б',
                'Остаться одному и сказать что мы все хуесосы',
                'Наминант на оскар за роль в фильме "Бэтмен"',
                'Заслуженный VAC-бан 2021',
                'Создал отдельную витрину дорогих предметов на старом аккаунте, и намеренно ограничил себе доступ'
            ],
            pluses: [
                'Отлично отыгрвает Клатч-ситуации',
                'Отличная приемка пуль головой',
                'Завсегдатый остаться в соло'
            ],
            minuses: [
                'Не знает что такое выйти блять в размен',
                'Иногда спреет так, как будто ему под столом делают слюнягого, от которого у него конвульсии'
            ]
        },
        'Fortnite': {
            cover: 'game2.jpg',
            role: 'Krocodil Genbl4',
            roleDesc: 'Так чисто тукончик ебануть',
            stats: [
                { label: 'Уровень:', value: '5000+' },
                { label: 'Победы:', value: 'а вы попробуйте в тукончике выиграть' }
            ],
            achievements: [
                'Множество редких скинов',
                'Высокий K/D ratio',
                'Высокий стаж дрочильни',
                'Пару раз перестрелял типа на джостике'
            ],
            pluses: [
                'Мимо него нахуй ниодна хуйня бесплатная мимо не пройдет',
                'Удивляется тому что в шкафчике есть то чего он блять ниразу не видел'
            ],
            minuses: [
                'Кто такая КБ, я в Тукончик',
                'КТо такая Линия огня, я в Тукончик',
                'Кто такая Фестивал Фортник, я в Тукончик',
                'Кто такая Лега форнтайт, ОООО ЛЕГА ФАРТНАЙТ НАДО ДА МНЕ ТАМ ОПИТА ДАДУД'
            ]
        },
        'Rocket League': {
            cover: 'game3.jpg',
            role: 'Krocodil Genbl4',
            roleDesc: 'Вратарь',
            stats: [
                { label: 'Ранг:', value: 'Золото 2' },
                { label: 'Часов в игре:', value: '1000+(в будущем точно)' }
            ],
            achievements: [
                'Мастер воздушных ударов',
                'Коллекция редких машин',
                'Выиграл там чето какие-то турниры',
                'Ну чисто полудить зашел как и в фортик'
            ],
            pluses: [
                'На воротах стоих дай боже',
                'Выучил все песни хатцуне мико пока сидел в лобби'
            ],
            minuses: [
                'В рот ебал другие режимы игры, надо чисто мячик ебашить который автоматом летит в ворота',
                'Выучил все песни хатцуне мико пока сидел в лобби'
            ]
        },
        'The Witcher 3: Wild Hunt': {
            cover: 'game4.jpg',
            role: 'Паштет',
            roleDesc: 'Павел из Новокаменки',
            stats: [
                { label: 'Прохождение:', value: '100%' },
                { label: 'Часов в игре:', value: '150+' },
            ],
            achievements: [
                'Все достижения разблокированы',
                'Прохождение на максимальной легкой сложности',
                'Переебашил всех чтобы собрать коллекцию Гвинта',
                'Перетрахал всех кого только можно'
            ],
            pluses: [
                'Прошел игру на гуд концовку',
                'Почти осилил самую легкую сложность'
            ],
            minuses: [
                'Длительное время прохождения',
                'Высокий уровень сложности'
            ]
        },
        'Battlefield': {
            cover: 'game5.jpg',
            role: 'Pablo21351235',
            roleDesc: 'Как сердце чувствует',
            stats: [
                { label: 'Уровень:', value: 'Максимальный' },
                { label: 'Часов в игре:', value: 'ну может 15-ый набереться' }
            ],
            achievements: [
                'Мастер всех классов',
                'Коллекционер оружия'
            ],
            pluses: [
                'Высокая точность ударов',
                'Высокая скорость реакции'
            ],
            minuses: [
                'Высокий риск травм',
                'Возможность быть забаненным'
            ]
        },
        'Brawl Stars': {
            cover: 'game6.jpg',
            role: 'Паша',
            roleDesc: 'Универсальный игрок',
            stats: [
                { label: 'Трофеи:', value: '15000+' },
                { label: 'Ранг:', value: 'Легенда' }
            ],
            achievements: [
                'Накрушил яиц годзиллы дал боже',
                'Застал мегаящики нахуй',
            ],
            pluses: [
                'Высокая скорость реакции',
                'Высокая точность ударов'
            ],
            minuses: [
                'Высокий риск травм',
                'Возможность быть забаненным'
            ]
        },
        'Cyberpunk 2077': {
            cover: 'game7.jpg',
            role: 'V',
            roleDesc: 'Наёмник Найт-Сити',
            stats: [
                { label: 'Уровень:', value: '50' },
                { label: 'Часов в игре:', value: '100+' }
            ],
            achievements: [
                'Пройден основной сюжет',
                'Все концовки открыты',
                'Максимальный уровень репутации',
                'Лучший кибердек в городе'
            ],
            pluses: [
                'Крутая атмосфера',
                'Глубокий сюжет'
            ],
            minuses: [
                'Баги на релизе',
                'Высокие системные требования'
            ]
        }
    };

    // --- Модальное окно для подробной информации об игре (Games) ---
    const gameModal = document.getElementById('game-modal');
    if (gameModal) {
        const gameModalBackdrop = document.querySelector('.game-modal-backdrop');
        const gameModalClose = document.querySelector('.game-modal-close');
        const gameModalCover = document.getElementById('game-modal-cover');
        const gameModalTitle = document.getElementById('game-modal-title');
        const gameModalAchievements = document.getElementById('game-modal-achievements');
        const gameModalAwards = document.getElementById('game-modal-awards');
        const gameModalNicknames = document.getElementById('game-modal-nicknames');
        const gameModalSkill = document.getElementById('game-modal-skill');
        const gameModalPluses = document.getElementById('game-modal-pluses');
        const gameModalMinuses = document.getElementById('game-modal-minuses');

        if (gameModalBackdrop && gameModalClose && gameModalCover && gameModalTitle) {
            document.querySelectorAll('.game-card').forEach(card => {
                card.style.pointerEvents = 'auto';
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Получаем название игры
                    const title = card.querySelector('.game-header h2').textContent.trim();
                    const data = gamesData[title];
                    if (!data) return;
                    // Картинка
                    gameModalCover.src = data.cover;
                    gameModalCover.alt = title;
                    // Название
                    gameModalTitle.textContent = title;
                    // Роль/ник
                    gameModalNicknames.textContent = data.role;
                    // Описание роли
                    gameModalSkill.textContent = data.roleDesc;
                    // Статы
                    if (gameModalAwards) {
                        gameModalAwards.innerHTML = '';
                        data.stats.forEach(stat => {
                            const li = document.createElement('li');
                            li.textContent = `${stat.label} ${stat.value}`;
                            gameModalAwards.appendChild(li);
                        });
                    }
                    // Достижения
                    if (gameModalAchievements) {
                        gameModalAchievements.innerHTML = '';
                        data.achievements.forEach(a => {
                            const li = document.createElement('li');
                            li.textContent = a;
                            gameModalAchievements.appendChild(li);
                        });
                    }
                    // Плюсы
                    if (gameModalPluses) {
                        gameModalPluses.innerHTML = '';
                        data.pluses.forEach(a => {
                            const li = document.createElement('li');
                            li.textContent = a;
                            gameModalPluses.appendChild(li);
                        });
                    }
                    // Минусы
                    if (gameModalMinuses) {
                        gameModalMinuses.innerHTML = '';
                        data.minuses.forEach(a => {
                            const li = document.createElement('li');
                            li.textContent = a;
                            gameModalMinuses.appendChild(li);
                        });
                    }
                    // Открыть модалку
                    gameModal.classList.add('open');
                    document.body.style.overflow = 'hidden';

                    // --- Добавляю обработчик для увеличения картинки из game-modal ---
                    gameModalCover.style.cursor = 'zoom-in';
                    // Сначала удаляем предыдущий обработчик (если был)
                    gameModalCover.onclick = null;
                    gameModalCover.addEventListener('click', function handler(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        const galleryModal = document.getElementById('gallery-modal');
                        const galleryModalImg = document.getElementById('gallery-modal-img');
                        if (galleryModal && galleryModalImg) {
                            gameModal.classList.remove('open');
                            galleryModal.classList.add('open');
                            galleryModalImg.src = gameModalCover.src;
                            galleryModalImg.alt = gameModalCover.alt;
                            document.body.style.overflow = 'hidden';
                        }
                    }, { once: true });
                });
            });

            function closeGameModal() {
                gameModal.classList.remove('open');
                document.body.style.overflow = '';
            }

            gameModalClose.addEventListener('click', closeGameModal);
            gameModalBackdrop.addEventListener('click', closeGameModal);
            document.addEventListener('keydown', (e) => {
                if (gameModal.classList.contains('open') && (e.key === 'Escape' || e.key === 'Esc')) {
                    closeGameModal();
                }
            });
        }
    }

    // --- Соцсети: модальные окна на contacts.html ---
    const socialBlocks = document.querySelectorAll('.social-block');
    socialBlocks.forEach(block => {
        block.addEventListener('click', function() {
            const social = block.getAttribute('data-social');
            const modal = document.getElementById('modal-' + social);
            if (modal) {
                modal.classList.add('open');
            }
        });
    });
    document.querySelectorAll('.social-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target.classList.contains('social-modal-backdrop') || e.target.classList.contains('social-modal-close')) {
                modal.classList.remove('open');
            }
            // Гарантирую кликабельность: удаляю все предыдущие обработчики
            const img = modal.querySelector('.social-modal-img');
            if (img) {
                const newImg = img.cloneNode(true);
                img.parentNode.replaceChild(newImg, img);
                newImg.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const galleryModal = document.getElementById('gallery-modal');
                    const galleryModalImg = document.getElementById('gallery-modal-img');
                    if (galleryModal && galleryModalImg) {
                        modal.classList.remove('open');
                        galleryModal.classList.add('open');
                        galleryModalImg.src = newImg.src;
                        galleryModalImg.alt = newImg.alt;
                        document.body.style.overflow = 'hidden';
                    }
                });
            }
        });
    });

    // --- Периферия: модальное окно ---
    const peripheryData = {
        mouse: {
            img: 'mouse.jpg',
            title: 'Мышь',
            desc: 'Ajazz 159 apex',
            specs: [
                'Тип сенсора: оптический',
                'Вес: 56 грамм',
                'DPI: 100-25600',
                'Количество кнопок: 5',
                'Подсветка: Да'
            ]
        },
        keyboard: {
            img: 'key.jpg',
            title: 'Клавиатура',
            desc: 'AULA чето-та',
            specs: [
                'Тип: Свитчики',
                'Форм-фактор: 100%',
                'Подключение: безпроводок',
                'Подсветка: RGB',
                'Переключатели: Механист'
            ]
        },
        headphones: {
            img: 'head.jpg',
            title: 'Наушники',
            desc: 'Bloode G570',
            specs: [
                'Тип: Закрытые',
                'Микрофон: 100 Гц -10 КГц',
                'Вес: 320 г',
                'Частотный диапазон:  20 Гц - 20 КГц'
            ]
        },
        monitor: {
            img: 'monitor.jpg',
            title: 'Монитор',
            desc: 'Samasung LS24C310EAIXCI',
            specs: [
                'Диагональ: 27"',
                'Разрешение: 1920x1080',
                'Частота: 75 Гц',
                'Тип матрицы: IPS',
                'Изогнутый экран: нет'
            ]
        },
        pc: {
            img: 'pc.jpg',
            title: 'Компьютер',
            desc: 'Intel i5, RTX, 16GB RAM — мощная сборка для любых задач.',
            specs: [
                'Процессор: Intel Core i5-10400F',
                'Видеокарта: NVIDIA RTX 5060TI',
                'ОЗУ: 16 ГБ',
                'SSD: 1 ТБ',
                'ОС: Windows 11'
            ]
        }
    };
    const peripheryCards = document.querySelectorAll('.periphery-card');
    const peripheryModal = document.getElementById('periphery-modal');
    const peripheryModalImg = document.getElementById('periphery-modal-img');
    const peripheryModalTitle = document.getElementById('periphery-modal-title');
    const peripheryModalDesc = document.getElementById('periphery-modal-desc');
    const peripheryModalSpecs = document.getElementById('periphery-modal-specs');
    const peripheryModalClose = document.querySelector('.periphery-modal-close');
    const peripheryModalBackdrop = document.querySelector('.periphery-modal-backdrop');
    if (peripheryCards.length && peripheryModal && peripheryModalImg && peripheryModalTitle && peripheryModalDesc && peripheryModalSpecs) {
        peripheryCards.forEach(card => {
            card.addEventListener('click', function() {
                const device = card.getAttribute('data-device');
                const data = peripheryData[device];
                if (!data) return;
                peripheryModalImg.src = data.img;
                peripheryModalImg.alt = data.title;
                peripheryModalTitle.textContent = data.title;
                peripheryModalDesc.textContent = data.desc;
                peripheryModalSpecs.innerHTML = '';
                if (data.specs && data.specs.length) {
                    data.specs.forEach(spec => {
                        const li = document.createElement('li');
                        li.textContent = spec;
                        peripheryModalSpecs.appendChild(li);
                    });
                }
                peripheryModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            });
        });
        function closePeripheryModal() {
            peripheryModal.classList.remove('open');
            document.body.style.overflow = '';
        }
        peripheryModalClose.addEventListener('click', closePeripheryModal);
        peripheryModalBackdrop.addEventListener('click', closePeripheryModal);
        document.addEventListener('keydown', (e) => {
            if (peripheryModal.classList.contains('open') && (e.key === 'Escape' || e.key === 'Esc')) {
                closePeripheryModal();
            }
        });
    }

}); 
