# Dice & Meeples — Design System

Документация дизайн-системы для проекта **Dice & Meeples** (лендинг клуба и проката настольных игр, Минск).

Архитектура оформления построена на **двух независимых тумблерах** в header, которые формируют матрицу из **4 премиум-тем** через атрибут `data-theme` на `<html>`.

---

## Архитектура двух тумблеров

### Расположение в header

Элементы управления сгруппированы в `.nav__brand-hub` строго вокруг логотипа:

```
[ toggle-material ] → [ Dice & Meeples ] → [ toggle-energy ]
```

| Тумблер | ID | Ось | Выключен (Off) | Включен (On) |
|---------|-----|-----|----------------|--------------|
| Левый | `#toggle-material` | Текстура | 🪵 Аналоговый / Уютный | 🌐 Виртуальный / Глянцевый |
| Правый | `#toggle-energy` | Атмосфера | ☕ Спокойный | ✨ Эффектный / Вау |

### Матрица состояний → `data-theme`

| material | energy | `data-theme` | Название |
|:--------:|:------:|--------------|----------|
| Off | Off | `cozy` | Ламповый вечер |
| On | Off | `glass` | Магическое стекло |
| On | On | `cyber` | Неоновый киберпанк |
| Off | On | `royal` | Королевский делюкс |

### JavaScript

```javascript
function computeTheme(material, energy) {
  if (!material && !energy) return 'cozy';
  if (material && !energy)  return 'glass';
  if (material && energy)   return 'cyber';
  return 'royal';
}
```

- **Persist:** `localStorage` ключи `dm-toggle-material` и `dm-toggle-energy` (boolean string).
- **Legacy:** старый ключ `dm-theme=neon` мигрирует в `{ material: true, energy: true }`.
- **Club image:** `#club-image` меняет `src` и `alt` при каждой смене темы (Unsplash, см. ниже).

### CSS-класс тумблера

- `.premium-toggle` — label-обёртка
- `.premium-toggle__track` — дорожка с иконками 🪵/🌐 или ☕/✨
- `.premium-toggle__thumb` — бегунок с мягкой тенью и glow при `:checked`
- Состояние подписей — через `:has(.premium-toggle__input:checked)`

**Правило для агентов:** не хардкодить цвета в компонентах — использовать CSS-переменные из `[data-theme]`.

---

## Тема 1: Cozy — «Ламповый вечер»

**Комбинация:** 🪵 Off + ☕ Off  
**Настроение:** уютная игровая комната, тёмное дерево, янтарный свет свечей.

### Палитра

| Token | Значение | Назначение |
|-------|----------|------------|
| `--clr-bg` | `#101410` | Фон страницы (тёмное дерево) |
| `--clr-surface-2` | `#1c221c` | Карточки |
| `--clr-amber` | `#d4a574` | Янтарно-золотой акцент |
| `--clr-accent-secondary` | `#8b6914` | Progress bar, второй акцент |
| `--theme-color` | `#101410` | Meta theme-color |

### Типографика и геометрия

| Token | Значение |
|-------|----------|
| `--font-display` | `'Playfair Display', 'Cormorant Garamond', Georgia, serif` |
| `--radius-lg` | `24px` (мягкие скругления) |
| `--transition` | `400ms cubic-bezier(0.4, 0, 0.2, 1)` |

### Клубное фото (Unsplash)

`https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=800&q=80`  
Уютный вечер за настолками при свечах.

---

## Тема 2: Glass — «Магическое стекло»

**Комбинация:** 🌐 On + ☕ Off  
**Настроение:** glassmorphism, холодный премиум, сине-фиолетовое свечение.

### Палитра

| Token | Значение | Назначение |
|-------|----------|------------|
| `--clr-bg` | `#0a0c14` | Глубокий тёмный фон |
| `--clr-amber` | `#7c9cff` | Синий акцент (primary) |
| `--clr-violet` | `#a78bfa` | Фиолетовый акцент |
| `--clr-border` | `rgba(255,255,255,0.12)` | Стеклянная рамка |

### Glassmorphism (v0)

```css
.glass-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.1);
}
```

При `[data-theme="glass"]` класс применяется к `.card`, `.game-card`, `.calc__card`, `.form-step`, `.club__atmosphere-frame`.

### Анимации (v0)

| Класс | Keyframe | Эффект |
|-------|----------|--------|
| `.animate-glow-pulse` | `glow-pulse` | Пульсирующее сине-фиолетовое свечение заголовка |
| `.animate-float` | `float` | Плавное покачивание карточек вверх-вниз (6s) |

Скругления умеренные: `--radius-lg: 16px`.

### Клубное фото

`https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80`  
Минималистичный премиум-интерьер хай-тек клуба.

---

## Тема 3: Cyber — «Неоновый киберпанк»

**Комбинация:** 🌐 On + ✨ On  
**Настроение:** футуристичный игровой зал, неон, острые формы.

### Палитра

| Token | Hex | Назначение |
|-------|-----|------------|
| `--clr-bg` | `#09090b` | Ультра-тёмный фон |
| `--clr-surface-2` | `#14141b` | Карточки |
| `--clr-amber` | `#00f0ff` | Неоновый циан |
| `--clr-violet` | `#ff007f` | Неоновый magenta |

### Геометрия и motion

| Token | Значение |
|-------|----------|
| `--radius-sm` … `--radius-xl` | `4px` (острые углы) |
| `--font-display` | `'Orbitron', 'Rajdhani', sans-serif` |
| `--transition` | `150ms` |

### Hover-эффекты

Карточки и game-card при hover получают неоновое свечение рамки: `border-color: var(--clr-amber)` + `box-shadow: var(--shadow-amber)`.

Primary-кнопки — outline с neon glow (как в прежней теме Neon Meeple).

### Клубное фото

`https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80`  
Игровой неоновый зал будущего.

---

## Тема 4: Royal — «Королевский делюкс»

**Комбинация:** 🪵 Off + ✨ On  
**Настроение:** бархатный VIP-зал, жидкое золото, текстурированные поверхности.

### Палитра (v0 tokens)

| Token | Значение | Назначение |
|-------|----------|------------|
| `--clr-bg` | `oklch(0.12 0.01 320)` | Глубокий бархатный чёрный |
| `--clr-surface-2` | `oklch(0.15 0.015 320)` | Карточки |
| `--gold` / `--clr-amber` | `#D4AF37` | Жидкое металлическое золото |

### Текстуры

- `body` — SVG noise overlay + radial gold highlight
- `.hero::after` — лёгкий fractalNoise паттерн

### Анимация (v0)

| Класс | Keyframe | Эффект |
|-------|----------|--------|
| `.animate-shimmer` | `shimmer` | Золотой блик, проходящий по `.btn--primary` при hover |

```css
[data-theme="royal"] .btn--primary:hover::after {
  animation: shimmer 0.75s ease forwards;
}
```

Шрифт заголовков: `'Playfair Display'` (благородный Serif).

### Клубное фото

`https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80`  
Роскошный VIP-зал с тёмным деревом.

---

## Общие layout-токены (все темы)

| Token | Значение |
|-------|----------|
| `--section-py` | `5rem` (desktop), `3.5rem` / `3rem` (tablet/mobile) |
| `--container-max` | `1200px` |
| `--container-px` | `1.5rem` |
| `--header-h` | `68px` |
| `--font-base` | `'Inter', system-ui, sans-serif` |

### Секции

- `.section--default` — фон `--clr-bg`
- `.section--alt` — фон `--clr-surface-alt` + border-block

Чередование: hero (default) → advantages (alt) → catalog (default) → calculator (alt) → club (default) → footer (alt).

---

## Компоненты

### Header

- `.site-header` — fixed, `--header-bg`, blur backdrop
- `.nav__brand-hub` — группа [тумблер → логотип → тумблер]
- `.premium-toggle` — интерактивные переключатели material / energy
- `.nav__links a.is-active` — scroll-spy (JS)

### Hero

- `.hero__image` — semantic `<img>` (SEO + LCP)
- `.hero__badges` — «98 игр», «Игронайзер», «Минск»
- `.hero::after` — тематический overlay (тепло / glass glow / cyber grid / royal texture)

### Catalog

- Сетка `.catalog__grid`: 4 → 3 → 2 → 1 col
- `.game-card--skeleton` — loader до рендера JS
- Обложки: `images/catalog/{id}.jpg`

### Form (`.calc__card`)

- `.form-progress` — «Шаг N из 3»
- `fieldset.form-step` — шаги 1–3

### Club — «Клубные встречи»

- `#club-image` — динамическое фото, меняется при смене `data-theme`
- `.club__atmosphere-frame` — рамка со скруглением `--radius-lg`
- `#club-theme-tag` — бейдж с названием активной темы
- Переход фото: класс `.is-swapping` (opacity + scale)

### Footer

- 5 колонок desktop: brand, contacts, directions, hours, social
- `.social-links--icons` — SVG + text

### Modal

- `.modal__box--ticket` / `--error` — используют `--clr-amber`, `--badge-hardcore`

---

## SEO & structured data

- Canonical: `https://amurmen23.github.io/dice-and-meeples/`
- OG image: `images/og-cover.jpg`
- JSON-LD: Organization, LocalBusiness, ItemList, Offer — в `index.html`

---

## Контентные константы

- **98 игр** в каталоге — единая цифра по всему сайту
- **Полная коллекция с обложками** — `images/catalog/1.jpg` … `98.jpg`
- УТП: **Игронайзер**, быстрая раскладка, клуб в **Минске**

---

## Файловая структура

| Файл | Роль |
|------|------|
| `style.css` | 4 темы, тумблеры, glass/royal/cyber extras, responsive |
| `index.html` | Разметка, header hub, `#club-image`, meta, JSON-LD |
| `script.js` | Каталог, theme matrix, localStorage, club image swap |
| `DESIGN.md` | Эта документация |

---

## Checklist для изменений (агентам)

1. Новый цвет → добавить token во **все 4** темы (`cozy`, `glass`, `cyber`, `royal`).
2. Новый компонент → только `var(--…)`, без hex в rules (кроме white `#fff` на обложках игр).
3. Анимации → уважать `@media (prefers-reduced-motion: reduce)`.
4. Изображения → всегда `alt`; hero/club — lazy где уместно.
5. После правок темы — проверить все 4 комбинации тумблеров, modal, form, catalog cards.
6. Club image — обновить `CLUB_IMAGES` и `CLUB_IMAGE_ALT` в `script.js` синхронно.

---

## Lighthouse-ориентиры

- Semantic HTML: один `h1`, `section` + `aria-labelledby`
- Skip link: `.skip-link`
- Focus: `:focus-visible` с `--clr-amber`
- Fonts: preconnect + `display=swap`
- Hero image: `fetchpriority="high"`, preload в `<head>`
- Toggles: `aria-label` на checkbox, подписи Off/On для screen readers
