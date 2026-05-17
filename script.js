'use strict';

/* ============================================================
   1. БАЗА ДАННЫХ ИГР
============================================================ */
const games = [
  {
    id: 1,
    name: 'The Castles of Burgundy: Special Edition',
    category: 'hardcore',
    price: 18,
    players: '2–4',
    time: '30–90 мин',
    org: 'Deluxe BigBox',
    img: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=500',
  },
  {
    id: 2,
    name: 'Brass: Бирмингем',
    category: 'strategy',
    price: 18,
    players: '2–4',
    time: '60–120 мин',
    org: 'Собственный деревянный',
    img: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=500',
  },
  {
    id: 3,
    name: 'Eclipse: Второй рассвет галактики',
    category: 'hardcore',
    price: 18,
    players: '2–6',
    time: '60–200 мин',
    org: 'Заводской пластиковый',
    img: 'https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=500',
  },
  {
    id: 4,
    name: 'Агрикола. Новое издание',
    category: 'strategy',
    price: 9,
    players: '1–5',
    time: '30–150 мин',
    org: 'Органайзер Gamefit',
    img: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=500',
  },
  {
    id: 5,
    name: 'Azul',
    category: 'family',
    price: 6,
    players: '2–4',
    time: '30–45 мин',
    org: 'Кастомный инлей',
    img: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=500',
  },
  {
    id: 6,
    name: 'Этот безумный мир',
    category: 'family',
    price: 6,
    players: '3–6',
    time: '45–90 мин',
    org: 'Без органайзера (кастомный)',
    img: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?w=500',
  },
];

/* ============================================================
   2. КОНФИГ КАТЕГОРИЙ
============================================================ */
const CATEGORIES = {
  hardcore: { label: 'ХАРДКОР',   cls: 'badge--hardcore' },
  strategy: { label: 'СТРАТЕГИЯ', cls: 'badge--strategy' },
  family:   { label: 'СЕМЕЙНАЯ',  cls: 'badge--family'   },
  party:    { label: 'ВЕЧЕРИНКА', cls: 'badge--party'    },
  coop:     { label: 'КООП',      cls: 'badge--coop'     },
  deluxe:   { label: 'ДЕЛЮКС',    cls: 'badge--deluxe'   },
};

/* Скидка за длительность: от 3 дней — минус 15% */
const DISCOUNT_THRESHOLD = 3;
const DISCOUNT_RATE      = 0.15;

/* ============================================================
   3. DOM — ссылки на элементы из index.html
============================================================ */
const catalogGrid    = document.getElementById('catalog-grid');
const catalogFilters = document.getElementById('catalog-filters');
const catalogEmpty   = document.getElementById('catalog-empty');
const calcGame       = document.getElementById('calc-game');
const calcDays       = document.getElementById('calc-days');
const calcResult     = document.getElementById('calc-result');
const rentalForm     = document.getElementById('rental-calculator');

/* ============================================================
   4. СОСТОЯНИЕ КАТАЛОГА
============================================================ */
let activeFilter = 'all';
let searchQuery  = '';

/* ============================================================
   5. КАТАЛОГ — рендер и фильтрация
============================================================ */

/** Экранирует HTML в строках из пользовательского ввода */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Обработчик ошибки загрузки обложки игры */
function handleImgError(img) {
  const cover = img.closest('.game-card__cover');
  cover.classList.add('game-card__cover--placeholder');
  cover.innerHTML = '<span aria-hidden="true">🎲</span>';
}

/** Возвращает отфильтрованный массив по активному фильтру и строке поиска */
function getFilteredGames() {
  const q = searchQuery.toLowerCase();
  return games.filter(game => {
    const matchFilter = activeFilter === 'all' || game.category === activeFilter;
    const matchSearch = game.name.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });
}

/** Генерирует карточки игр и вставляет в Grid-сетку */
function renderCatalog(filteredGames) {
  catalogGrid.innerHTML = '';

  if (filteredGames.length === 0) {
    catalogEmpty.hidden = false;
    return;
  }
  catalogEmpty.hidden = true;

  const fragment = document.createDocumentFragment();

  filteredGames.forEach((game, index) => {
    const cat = CATEGORIES[game.category] ?? { label: game.category.toUpperCase(), cls: '' };

    const li = document.createElement('li');
    li.className = 'game-card';
    li.style.animationDelay = `${index * 0.07}s`;

    li.innerHTML = `
      <div class="game-card__cover">
        <img
          src="${game.img}"
          alt="Обложка игры ${escapeHtml(game.name)}"
          loading="lazy"
          decoding="async"
          onerror="handleImgError(this)"
        />
      </div>
      <div class="game-card__body">
        <div class="game-card__badges">
          <span class="badge ${cat.cls}">${cat.label}</span>
        </div>
        <h3 class="game-card__name">${escapeHtml(game.name)}</h3>
        <p class="game-card__meta">
          <span>👥 ${game.players}</span>
          <span>⏱ ${game.time}</span>
        </p>
        <p class="game-card__organizer">
          ⚡ Упаковано: <em>${escapeHtml(game.org)}</em>
        </p>
        <div class="game-card__price-row">
          <div class="game-card__price">
            ${game.price} BYN
            <span>за сутки</span>
          </div>
          <button
            class="btn btn--outline"
            data-game-id="${game.id}"
            data-action="book"
            aria-label="Забронировать ${escapeHtml(game.name)}"
          >
            Забронировать
          </button>
        </div>
      </div>
    `;

    fragment.appendChild(li);
  });

  catalogGrid.appendChild(fragment);
}

/** Применяет текущий фильтр + поиск и перерисовывает каталог */
function filterAndRender() {
  renderCatalog(getFilteredGames());
}

/* --- Обработчик кнопок фильтра --- */
catalogFilters.addEventListener('click', e => {
  const btn = e.target.closest('.btn--filter');
  if (!btn) return;

  activeFilter = btn.dataset.filter;

  catalogFilters.querySelectorAll('.btn--filter').forEach(b => {
    b.classList.toggle('btn--active', b === btn);
  });

  filterAndRender();
});

/* --- Клик «Забронировать» на карточке → прокрутка к калькулятору --- */
catalogGrid.addEventListener('click', e => {
  const btn = e.target.closest('[data-action="book"]');
  if (!btn) return;

  const gameId = Number(btn.dataset.gameId);
  calcGame.value = gameId;
  updateCalculator();

  document.getElementById('prices').scrollIntoView({ behavior: 'smooth', block: 'start' });

  setTimeout(() => {
    calcGame.focus();
    calcGame.classList.add('calc-highlight');
    setTimeout(() => calcGame.classList.remove('calc-highlight'), 1400);
  }, 500);
});

/* ============================================================
   6. ПОИСК — инжектируем инпут в каталог
============================================================ */
function injectSearchInput() {
  const wrapper = document.createElement('div');
  wrapper.className = 'catalog__search';
  wrapper.innerHTML = `
    <input
      type="search"
      class="form-input catalog__search-input"
      id="catalog-search"
      placeholder="🔍 Поиск по названию игры..."
      autocomplete="off"
      spellcheck="false"
      aria-label="Поиск по каталогу"
    />
  `;
  /* Вставляем между заголовком и фильтрами */
  catalogFilters.insertAdjacentElement('beforebegin', wrapper);

  document.getElementById('catalog-search').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    filterAndRender();
  });
}

/* ============================================================
   7. КАЛЬКУЛЯТОР — заполнение select и живой пересчёт
============================================================ */

/** Правильное склонение слова «день» */
function pluralDays(n) {
  const mod10  = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return 'дней';
  if (mod10 === 1)                   return 'день';
  if (mod10 >= 2 && mod10 <= 4)      return 'дня';
  return 'дней';
}

/** Заполняет <select> именами игр из массива */
function populateCalcSelect() {
  games.forEach(game => {
    const opt = document.createElement('option');
    opt.value = game.id;
    opt.textContent = `${game.name}  —  ${game.price} BYN/сутки`;
    calcGame.appendChild(opt);
  });
}

/** Пересчитывает стоимость и обновляет <output> */
function updateCalculator() {
  const gameId = Number(calcGame.value);
  const days   = parseInt(calcDays.value, 10);

  if (!gameId || !days || days < 1) {
    calcResult.hidden = true;
    return;
  }

  const game       = games.find(g => g.id === gameId);
  if (!game) return;

  const base        = game.price * days;
  const hasDiscount = days >= DISCOUNT_THRESHOLD;
  const total       = hasDiscount ? Math.round(base * (1 - DISCOUNT_RATE)) : base;

  calcResult.hidden = false;

  if (hasDiscount) {
    calcResult.innerHTML = `
      <span class="calc__game-name">${escapeHtml(game.name)}</span>
      <span class="calc__days">${days} ${pluralDays(days)}</span>
      <span class="calc__discount-badge">🎉 Скидка за длительность: 15%!</span>
      <s class="calc__old-price">${base} BYN</s>
      <strong>${total} BYN</strong>
      <span class="calc__hint">Итого к оплате</span>
    `;
  } else {
    calcResult.innerHTML = `
      <span class="calc__game-name">${escapeHtml(game.name)}</span>
      <span class="calc__days">${days} ${pluralDays(days)}</span>
      <strong>${total} BYN</strong>
      <span class="calc__hint">Итого к оплате</span>
    `;
  }
}

/* Живой пересчёт при любом изменении */
calcGame.addEventListener('change', updateCalculator);
calcDays.addEventListener('input',  updateCalculator);

/* ============================================================
   8. ФОРМА БРОНИРОВАНИЯ — поля Имя / Телефон
============================================================ */
function injectBookingFields() {
  const submitBtn = document.getElementById('calc-submit');

  const nameGroup = document.createElement('div');
  nameGroup.className = 'form-group';
  nameGroup.innerHTML = `
    <label class="form-label" for="booking-name">Ваше имя</label>
    <input
      class="form-input"
      type="text"
      id="booking-name"
      name="booking-name"
      placeholder="Иван Иванов"
      autocomplete="name"
    />
    <span class="form-error" id="err-name" hidden>Введите имя (минимум 2 символа)</span>
  `;

  const phoneGroup = document.createElement('div');
  phoneGroup.className = 'form-group';
  phoneGroup.innerHTML = `
    <label class="form-label" for="booking-phone">Телефон</label>
    <input
      class="form-input"
      type="tel"
      id="booking-phone"
      name="booking-phone"
      placeholder="+375 29 000-00-00"
      autocomplete="tel"
    />
    <span class="form-error" id="err-phone" hidden>Введите корректный номер телефона</span>
  `;

  submitBtn.before(nameGroup, phoneGroup);
}

/* ============================================================
   9. МОДАЛЬНОЕ ОКНО
============================================================ */
function injectModal() {
  const modal = document.createElement('div');
  modal.id = 'booking-modal';
  modal.className = 'modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-title');
  modal.hidden = true;

  modal.innerHTML = `
    <div class="modal__overlay" data-close></div>
    <div class="modal__box">
      <button class="modal__close" aria-label="Закрыть модальное окно" data-close>✕</button>
      <div class="modal__icon" id="modal-icon">🎲</div>
      <h2 class="modal__title" id="modal-title">Бронирование принято!</h2>
      <div class="modal__body" id="modal-body"></div>
      <button class="btn btn--primary modal__btn" data-close>Отлично, спасибо!</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('click', e => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

function openModal({ type = 'success', body }) {
  const modal = document.getElementById('booking-modal');
  const icon  = document.getElementById('modal-icon');
  const title = document.getElementById('modal-title');

  if (type === 'error') {
    icon.textContent  = '⚠️';
    title.textContent = 'Проверьте данные';
    title.style.color = 'var(--badge-hardcore)';
  } else {
    icon.textContent  = '🎲';
    title.textContent = 'Бронирование принято!';
    title.style.color = '';
  }

  document.getElementById('modal-body').innerHTML = body;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  /* Ловушка фокуса — фокусируем кнопку закрытия */
  modal.querySelector('.modal__close').focus();
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  modal.hidden = true;
  document.body.style.overflow = '';
}

/* ============================================================
   10. ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ
============================================================ */

/** Помечает поле как валидное / невалидное */
function setFieldState(input, errorEl, isValid) {
  input.classList.toggle('form-input--error', !isValid);
  errorEl.hidden = isValid;
}

rentalForm.addEventListener('submit', e => {
  e.preventDefault();

  const gameId = Number(calcGame.value);
  const days   = parseInt(calcDays.value, 10);
  const nameEl  = document.getElementById('booking-name');
  const phoneEl = document.getElementById('booking-phone');
  const errName  = document.getElementById('err-name');
  const errPhone = document.getElementById('err-phone');

  const name  = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  /* --- Валидация --- */
  const nameOk  = name.length >= 2;
  const phoneOk = /^[\d\s+\-()]{7,}$/.test(phone);
  const gameOk  = !!gameId;
  const daysOk  = !isNaN(days) && days >= 1;

  setFieldState(nameEl,  errName,  nameOk);
  setFieldState(phoneEl, errPhone, phoneOk);
  calcGame.classList.toggle('form-input--error', !gameOk);
  calcDays.classList.toggle('form-input--error', !daysOk);

  if (!gameOk || !daysOk || !nameOk || !phoneOk) {
    const errors = [];
    if (!gameOk)  errors.push('Выберите игру из списка');
    if (!daysOk)  errors.push('Укажите количество дней (минимум 1)');
    if (!nameOk)  errors.push('Введите ваше имя (минимум 2 символа)');
    if (!phoneOk) errors.push('Введите корректный номер телефона');

    openModal({
      type: 'error',
      body: `
        <ul class="modal__error-list">
          ${errors.map(err => `<li>${err}</li>`).join('')}
        </ul>
      `,
    });
    return;
  }

  /* --- Расчёт итога --- */
  const game        = games.find(g => g.id === gameId);
  const base        = game.price * days;
  const hasDiscount = days >= DISCOUNT_THRESHOLD;
  const total       = hasDiscount ? Math.round(base * (1 - DISCOUNT_RATE)) : base;

  const discountHtml = hasDiscount
    ? `<span class="modal__discount">🎉 Применена скидка 15% за аренду от 3 дней!</span>`
    : '';

  openModal({
    type: 'success',
    body: `
      <p>
        Игра <strong>${escapeHtml(game.name)}</strong> забронирована на
        <strong>${days} ${pluralDays(days)}</strong>
        для <strong>${escapeHtml(name)}</strong>.
      </p>
      ${discountHtml}
      <div class="modal__summary">
        <span>💰 К оплате:</span>
        <strong class="modal__total">${total} BYN</strong>
      </div>
      <p class="modal__note">
        📞 Свяжемся с вами по номеру <strong>${escapeHtml(phone)}</strong><br />
        📍 Ждём вас в пункте выдачи:<br />
        <small>г. Минск, ул. Примерная, д. 1, офис 101</small>
      </p>
    `,
  });

  rentalForm.reset();
  calcResult.hidden = true;

  /* Снимаем состояния ошибок после успешной отправки */
  [calcGame, calcDays, nameEl, phoneEl].forEach(el => el.classList.remove('form-input--error'));
  errName.hidden  = true;
  errPhone.hidden = true;
});

/* ============================================================
   11. BURGER MENU
============================================================ */
function initBurger() {
  const burger   = document.querySelector('.nav__burger');
  const navLinks = document.getElementById('nav-links');
  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('nav__links--open', !isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('nav__links--open');
    });
  });
}

/* ============================================================
   12. HEADER — класс .scrolled при прокрутке
============================================================ */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   13. ГОД В ФУТЕРЕ
============================================================ */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   14. ИНИЦИАЛИЗАЦИЯ
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  injectSearchInput();
  injectBookingFields();
  injectModal();
  populateCalcSelect();
  filterAndRender();
  initBurger();
  initScrollHeader();
});
