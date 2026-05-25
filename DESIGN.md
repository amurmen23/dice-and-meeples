# Dice & Meeples — Design System

Документация дизайн-системы для проекта **Dice & Meeples** (лендинг клуба и проката настольных игр, Минск).  
Поддерживаются **две переключаемые темы** через атрибут `data-theme` на `<html>`.

---

## Переключение тем

| Механизм | Значение |
|----------|----------|
| HTML-атрибут | `<html data-theme="cozy">` или `data-theme="neon"` |
| JavaScript | `setTheme('cozy' \| 'neon')` в `script.js` |
| Persist | `localStorage` ключ `dm-theme` |
| UI | Кнопки `.theme-switch__btn[data-theme-set]` в header |

**Правило для агентов:** не хардкодить цвета в компонентах — использовать CSS-переменные из `:root` / `[data-theme]`.

---

## Тема A: Cozy Classic («Ламповый вечер»)

**Настроение:** уютная игровая комната, дерево, тёплый свет, премиальные коробки.

### Палитра

| Token | Hex | Назначение |
|-------|-----|------------|
| `--clr-bg` | `#101410` | Фон страницы |
| `--clr-surface` | `#181a17` | Карточки формы, вторичный фон |
| `--clr-surface-2` | `#20211f` | Карточки, инпуты |
| `--clr-surface-alt` | `#141614` | Чередующиеся секции `.section--alt` |
| `--clr-border` | `#2e332c` | Границы |
| `--clr-text` | `#e8e4dc` | Основной текст |
| `--clr-text-muted` | `#9a968e` | Подзаголовки |
| `--clr-white` | `#f5f0e8` | Заголовки |
| `--clr-amber` | `#d4a574` | Primary accent (янтарь/золото) |
| `--clr-amber-dark` | `#b8894f` | Hover primary |
| `--clr-accent-secondary` | `#8b6914` | Второй акцент (progress bar) |
| `--theme-color` | `#101410` | Meta theme-color, PWA |

### Типографика

| Token | Stack |
|-------|-------|
| `--font-display` | `'Playfair Display', 'Cormorant Garamond', Georgia, serif` |
| `--font-base` | `'Inter', system-ui, sans-serif` |
| `--font-mono` | `'JetBrains Mono', ui-monospace, monospace` |

### Геометрия и motion

| Token | Cozy |
|-------|------|
| `--radius-sm` | `8px` |
| `--radius-md` | `20px` |
| `--radius-lg` | `24px` |
| `--radius-xl` | `28px` |
| `--transition` | `400ms cubic-bezier(0.4, 0, 0.2, 1)` |
| `--game-card-hover` | `translateY(-6px) perspective(800px) rotateX(3deg)` |

### Кнопки

- **Primary:** заливка `--clr-amber`, текст `--btn-primary-text`, лёгкий inset highlight («восковая печать»).
- **Outline:** прозрачный фон, border amber, glow при hover.

---

## Тема B: Neon Meeple («Cyber Nonconformist»)

**Настроение:** футуристичный игровой архив, неон, острые формы.

### Палитра

| Token | Hex | Назначение |
|-------|-----|------------|
| `--clr-bg` | `#050508` | Фон |
| `--clr-surface` | `#0a0a10` | Поверхности |
| `--clr-surface-2` | `#12121a` | Карточки |
| `--clr-amber` | `#00f0ff` | Neon cyan (primary) |
| `--clr-accent-secondary` / `--clr-violet` | `#ff007f` | Neon magenta |
| `--theme-color` | `#050508` | Meta theme-color |

### Типографика

| Token | Stack |
|-------|-------|
| `--font-display` | `'Orbitron', 'Rajdhani', sans-serif` |
| `--font-base` | `'Inter', system-ui, sans-serif` |
| `--font-mono` | `'JetBrains Mono'` — цены, итоги калькулятора |

### Геометрия и motion

| Token | Neon |
|-------|------|
| `--radius-sm` … `--radius-xl` | `4px` … `8px` |
| `--transition` | `150ms` |
| `--game-card-hover` | `translateY(-4px)` (без 3D tilt) |

### Кнопки

- **Primary:** outline + neon border; hover — glow `box-shadow: var(--shadow-amber)`.
- Тонкие 1px borders на карточках и формах.

---

## Общие layout-токены (обе темы)

| Token | Значение |
|-------|----------|
| `--section-py` | `5rem` (desktop), `3.5rem` / `3rem` (tablet/mobile) |
| `--container-max` | `1200px` |
| `--container-px` | `1.5rem` |
| `--header-h` | `68px` |

### Секции

- `.section--default` — фон `--clr-bg`
- `.section--alt` — фон `--clr-surface-alt` + border-block

Чередование на странице: hero (default) → advantages (alt) → catalog (default) → calculator (alt) → club (default) → footer (alt).

---

## Компоненты

### Header

- `.site-header` — fixed, `--header-bg`, blur backdrop
- `.theme-switch` — pill toggle Cozy / Neon
- `.nav__links a.is-active` — scroll-spy (JS)

### Hero

- `.hero__image` — semantic `<img>` (SEO + LCP)
- `.hero__badges` — «98 игр», «Игронайзер», «Минск»
- `.hero__actions` — dual CTA

### Catalog

- Сетка `.catalog__grid`: 4 → 3 → 2 → 1 col (breakpoints)
- `.game-card--skeleton` — loader до рендера JS
- Обложки: `images/catalog/{id}.jpg`, fallback `images/logo-placeholder.png`

### Form (`.calc__card`)

- `.form-progress` — «Шаг N из 3»
- `fieldset.form-step` + `legend.form-step__legend` — шаги 1–3

### Club

- `.club__atmosphere` — фото `images/club-atmosphere.jpg`

### Footer

- 5 колонок desktop: brand, contacts, directions, hours, social
- `.social-links--icons` — SVG + text

### Modal

- `.modal__box--ticket` / `--error` — используют `--clr-amber`, `--badge-hardcore`

---

## SEO & structured data

- Canonical: `https://amurmen23.github.io/dice-and-meeples/`
- OG image: `images/og-cover.jpg`
- JSON-LD: Organization, LocalBusiness, ItemList, Offer — в `index.html` перед `</body>`

---

## Контентные константы

- **98 игр** в каталоге — единая цифра по всему сайту
- **Полная коллекция с обложками** — `images/catalog/1.jpg` … `98.jpg`
- УТП: **Игронайзер**, быстрая раскладка, клуб в **Минске**

---

## Файловая структура стилей

| Файл | Роль |
|------|------|
| `style.css` | Все токены, компоненты, темы, responsive |
| `index.html` | Разметка, meta, JSON-LD, шрифты (preconnect) |
| `script.js` | Каталог, тема, skeleton, form progress, scroll-spy |

---

## Checklist для изменений (агентам)

1. Новый цвет → добавить token в **обе** темы (`cozy` + `neon`).
2. Новый компонент → только `var(--…)`, без hex в rules (кроме white `#fff` на обложках игр).
3. Анимации → уважать `@media (prefers-reduced-motion: reduce)`.
4. Изображения → всегда `alt`; hero/club — lazy где уместно.
5. После правок темы — проверить modal, form, catalog cards, header toggle.

---

## Lighthouse-ориентиры

- Semantic HTML: один `h1`, `section` + `aria-labelledby`
- Skip link: `.skip-link`
- Focus: `:focus-visible` с `--clr-amber`
- Fonts: preconnect + `display=swap` в Google Fonts link
- Hero image: `fetchpriority="high"`, preload в `<head>`
