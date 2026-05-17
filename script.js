'use strict';

/* ============================================================
   ПУТЬ К ОБЛОЖКАМ ИГР
   Каждая обложка хранится в images/catalog/{id}.jpg
   Если файл отсутствует — браузер подставит images/logo-placeholder.png
============================================================ */
function gameImgPath(id) {
  return `images/catalog/${id}.jpg`;
}

/* ============================================================
   БАЗА ДАННЫХ ИГР
============================================================ */
const games = [
  { id:  1, name: 'The Castles of Burgundy: Special Edition', category: 'deluxe',   price: 18, rating: 10.0, players: '2–4', time: '30–90 мин',   org: 'BigBox',           },
  { id:  2, name: 'Анахронность Биг Бокс',                    category: 'deluxe',   price: 18, rating: 10.0, players: '2–4', time: '90–180 мин',  org: 'BigBox',           },
  { id:  3, name: 'Покорение Марса (BigBox)',                  category: 'deluxe',   price: 15, rating:  9.75,players: '1–5', time: '90–120 мин',  org: 'BigBox',           },
  { id:  4, name: 'Рыцарь-маг. Полное издание',               category: 'deluxe',   price: 15, rating:  0,   players: '1–4', time: '90–180 мин',  org: 'Gamefit',          },
  { id:  5, name: 'Слишком много костей',                      category: 'deluxe',   price: 20, rating: 10.0, players: '1–4', time: '90–240 мин',  org: 'BigBox',           },
  { id:  6, name: 'Бессознательное (супер Эго + плейматы)',    category: 'deluxe',   price: 15, rating:  0,   players: '1–4', time: '90–120 мин',  org: 'собственный',      },
  { id:  7, name: 'Brass. Бирмингем',                          category: 'hardcore', price: 18, rating:  8.75,players: '2–4', time: '60–120 мин',  org: 'собственный',      },
  { id:  8, name: 'Eclipse. Второй рассвет галактики',         category: 'hardcore', price: 18, rating:  9.5, players: '2–6', time: '60–200 мин',  org: 'GameTrayz',        },
  { id:  9, name: 'Великая стена',                             category: 'hardcore', price: 18, rating:  9.25,players: '1–4', time: '60–150 мин',  org: 'Awaken Realms',    },
  { id: 10, name: 'Галерист',                                  category: 'hardcore', price: 15, rating:  0,   players: '1–4', time: '60–120 мин',  org: 'собственный',      },
  { id: 11, name: 'Гегемония: Классовая борьба',               category: 'hardcore', price: 15, rating:  0,   players: '2–4', time: '90–180 мин',  org: 'Meeple House',     },
  { id: 12, name: 'Во славу Одина',                            category: 'hardcore', price: 15, rating:  8.75,players: '1–4', time: '60–120 мин',  org: 'собственный',      },
  { id: 13, name: 'Гавр',                                      category: 'hardcore', price: 12, rating:  9.0, players: '1–5', time: '30–150 мин',  org: 'Maify',            },
  { id: 14, name: 'Великий западный путь',                     category: 'hardcore', price: 12, rating:  9.5, players: '2–4', time: '75–150 мин',  org: 'Gamefit',          },
  { id: 15, name: 'Великий Западный Путь: Новая Зеландия',     category: 'hardcore', price: 12, rating:  0,   players: '1–4', time: '75–150 мин',  org: 'собственный',      },
  { id: 16, name: 'Изобретения: Эволюция идей',                category: 'hardcore', price: 18, rating:  0,   players: '1–4', time: '90–180 мин',  org: 'собственный',      },
  { id: 17, name: 'Каменный век: На заре человечества',        category: 'hardcore', price: 15, rating: 10.0, players: '1–4', time: '90–180 мин',  org: 'Meeple House',     },
  { id: 18, name: 'Канбан Электро',                            category: 'hardcore', price: 15, rating:  0,   players: '2–5', time: '120–180 мин', org: 'собственный',      },
  { id: 19, name: 'Кланы Каледонии',                           category: 'hardcore', price: 15, rating:  9.5, players: '1–4', time: '60–150 мин',  org: 'Maify',            },
  { id: 20, name: 'Ла-Гранха',                                 category: 'hardcore', price: 12, rating:  9.25,players: '2–4', time: '60–120 мин',  org: 'Meeple House',     },
  { id: 21, name: 'Лиссабон',                                  category: 'hardcore', price: 18, rating:  0,   players: '2–4', time: '90–180 мин',  org: 'собственный',      },
  { id: 22, name: 'Маракайбо',                                 category: 'hardcore', price: 15, rating:  8.5, players: '1–4', time: '90–180 мин',  org: 'Meeple House',     },
  { id: 23, name: 'Машина погоды',                             category: 'hardcore', price: 18, rating:  0,   players: '1–2', time: '180–240 мин', org: 'собственный',      },
  { id: 24, name: 'На Марсе',                                  category: 'hardcore', price: 18, rating:  0,   players: '1–4', time: '120–240 мин', org: 'собственный',      },
  { id: 25, name: 'Неизвестная планета',                       category: 'hardcore', price: 12, rating:  8.25,players: '1–4', time: '90–180 мин',  org: 'собственный',      },
  { id: 26, name: 'Орлеан',                                    category: 'hardcore', price: 12, rating:  9.25,players: '2–4', time: '90–120 мин',  org: 'собственный',      },
  { id: 27, name: 'Памперо',                                   category: 'hardcore', price: 18, rating:  0,   players: '2–4', time: '120–180 мин', org: 'GameTrayz',        },
  { id: 28, name: 'Плотина',                                   category: 'hardcore', price: 18, rating: 10.0, players: '1–4', time: '120–240 мин', org: 'Boardgamelab',     },
  { id: 29, name: 'Подводные города',                          category: 'hardcore', price: 15, rating: 10.0, players: '1–4', time: '60–120 мин',  org: 'Mightybox',        },
  { id: 30, name: 'Прет-а-порте',                              category: 'hardcore', price: 12, rating:  9.25,players: '2–4', time: '90–180 мин',  org: 'собственный',      },
  { id: 31, name: 'Проект «Гайя»',                             category: 'hardcore', price: 18, rating: 10.0, players: '2–4', time: '90–150 мин',  org: 'GBA',              },
  { id: 32, name: 'Проект Возрождение',                        category: 'hardcore', price: 18, rating: 10.0, players: '1–5', time: '120–240 мин', org: 'Boardgamelab',     },
  { id: 33, name: 'Серп',                                      category: 'hardcore', price: 15, rating:  9.75,players: '1–5', time: '90–120 мин',  org: 'BigBox',           },
  { id: 34, name: 'Сквозь Века',                               category: 'hardcore', price: 15, rating:  8.75,players: '2–4', time: '120–180 мин', org: 'Gamefit',          },
  { id: 35, name: 'Сумеречная борьба',                         category: 'hardcore', price: 15, rating:  9.0, players: '2',   time: '120–180 мин', org: 'Boardgamelab',     },
  { id: 36, name: 'Теотиуакан. Город богов',                   category: 'hardcore', price: 12, rating:  9.0, players: '1–4', time: '90–180 мин',  org: 'Maify',            },
  { id: 37, name: 'Трикерион: Искусство иллюзии',              category: 'hardcore', price: 15, rating:  0,   players: '2–4', time: '90–150 мин',  org: 'собственный',      },
  { id: 38, name: 'Экспансия: Век паруса',                     category: 'hardcore', price: 12, rating:  9.25,players: '2–5', time: '90–120 мин',  org: 'GameTrayz',        },
  { id: 39, name: 'Vinhos: Русское издание',                   category: 'hardcore', price: 15, rating:  0,   players: '2–4', time: '60–120 мин',  org: 'собственный',      },
  { id: 40, name: 'Pax Pamir: Большая игра',                   category: 'hardcore', price: 15, rating:  0,   players: '2–5', time: '90–180 мин',  org: 'Boardgamelab',     },
  { id: 41, name: 'Keyflower',                                  category: 'hardcore', price: 12, rating:  8.0, players: '2–6', time: '90–150 мин',  org: 'Meeple House',     },
  { id: 42, name: 'Агрикола. Новое издание',                   category: 'strategy', price:  9, rating:  8.5, players: '1–5', time: '30–150 мин',  org: 'Gamefit',          },
  { id: 43, name: 'Алхимики',                                  category: 'strategy', price:  9, rating:  8.25,players: '2–4', time: '120 мин',     org: 'без органайзера',  },
  { id: 44, name: 'Белый Замок',                               category: 'strategy', price:  9, rating:  9.0, players: '1–4', time: '60–80 мин',   org: 'фанера от ПМ',    },
  { id: 45, name: 'Битоку',                                    category: 'strategy', price:  9, rating:  0,   players: '1–5', time: '45–75 мин',   org: '3D печать',        },
  { id: 46, name: 'Борьба за Галактику',                       category: 'strategy', price:  7, rating:  0,   players: '2–4', time: '60–90 мин',   org: 'без органайзера',  },
  { id: 47, name: 'Бразилия',                                  category: 'strategy', price:  9, rating:  0,   players: '2–5', time: '60–120 мин',  org: 'Meeple House',     },
  { id: 48, name: 'Брюгге',                                    category: 'strategy', price:  9, rating:  9.0, players: '2–4', time: '90 мин',      org: 'Gamefit',          },
  { id: 49, name: 'Бухта торговцев',                           category: 'strategy', price:  9, rating:  0,   players: '2–5', time: '60–90 мин',   org: 'Boardgamelab',     },
  { id: 50, name: 'Вдали от Солнца',                           category: 'strategy', price: 12, rating:  0,   players: '1–4', time: '90–180 мин',  org: 'Meeple House',     },
  { id: 51, name: 'Вечная зима: Палеоиндейцы',                 category: 'strategy', price:  9, rating:  0,   players: '1–5', time: '60–150 мин',  org: 'собственный',      },
  { id: 52, name: 'Виноделие: Полное издание',                 category: 'strategy', price:  9, rating:  9.5, players: '1–6', time: '45–120 мин',  org: 'собственный',      },
  { id: 53, name: 'Генотип',                                   category: 'strategy', price:  9, rating:  8.5, players: '2–5', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 54, name: 'Глен-Мор II: Хроники',                     category: 'strategy', price: 12, rating:  0,   players: '2–5', time: '75–120 мин',  org: 'Meeple House',     },
  { id: 55, name: 'Гранд-отель «Австрия»',                    category: 'strategy', price: 12, rating:  9.25,players: '1–4', time: '60–120 мин',  org: 'Boardgamelab',     },
  { id: 56, name: 'Детектив: Современное расследование',       category: 'strategy', price:  9, rating:  7.0, players: '1–5', time: '120 мин',     org: 'собственный',      },
  { id: 57, name: 'Дюна: Империя',                             category: 'strategy', price: 12, rating:  8.0, players: '2–4', time: '60–120 мин',  org: 'Boardgamelab',     },
  { id: 58, name: 'Земля',                                     category: 'strategy', price:  9, rating:  0,   players: '1–5', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 59, name: 'История рыцаря',                            category: 'strategy', price:  9, rating:  9.0, players: '1–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 60, name: 'Контейнер: Юбилейное издание',              category: 'strategy', price:  7, rating:  7.5, players: '3–5', time: '90–120 мин',  org: 'собственный',      },
  { id: 61, name: 'Костёр',                                    category: 'strategy', price:  9, rating:  9.0, players: '2–5', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 62, name: 'Крылья',                                    category: 'strategy', price:  9, rating:  9.0, players: '1–5', time: '40–70 мин',   org: 'Boardgamelab',     },
  { id: 63, name: 'Летопись: Полное издание',                  category: 'strategy', price:  7, rating:  0,   players: '2–4', time: '30–60 мин',   org: 'Meeple House',     },
  { id: 64, name: 'Лихолетье',                                 category: 'strategy', price:  9, rating:  0,   players: '2–4', time: '45–90 мин',   org: 'Meeple House',     },
  { id: 65, name: 'Лоренцо Великолепный',                     category: 'strategy', price:  9, rating:  8.75,players: '2–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 66, name: 'Мерв',                                      category: 'strategy', price:  9, rating:  0,   players: '2–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 67, name: 'Мессина 1347',                              category: 'strategy', price: 12, rating:  9.0, players: '1–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 68, name: 'Ни шагу назад!',                            category: 'strategy', price:  9, rating:  9.0, players: '2–4', time: '60–120 мин',  org: 'Meeple House',     },
  { id: 69, name: 'Ост-Индская компания',                      category: 'strategy', price:  9, rating:  8.0, players: '2–5', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 70, name: 'Паладины западного королевства',            category: 'strategy', price:  9, rating:  8.25,players: '1–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 71, name: 'Подлодка',                                  category: 'strategy', price:  9, rating:  8.0, players: '2–4', time: '60–120 мин',  org: 'Meeple House',     },
  { id: 72, name: 'Прага: Сердце Империи',                     category: 'strategy', price:  9, rating:  0,   players: '2–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 73, name: 'Пригород',                                  category: 'strategy', price:  9, rating:  8.5, players: '2–4', time: '45–75 мин',   org: 'GameTrayz',        },
  { id: 74, name: 'Путешествия Марко Поло',                    category: 'strategy', price:  9, rating:  8.75,players: '2–4', time: '75–120 мин',  org: 'Maify',            },
  { id: 75, name: 'Пять племён',                               category: 'strategy', price:  9, rating:  8.5, players: '2–4', time: '60–90 мин',   org: 'собственный',      },
  { id: 76, name: 'Руины острова Арнак',                       category: 'strategy', price:  9, rating:  9.0, players: '2–4', time: '60–90 мин',   org: 'Boardgamelab',     },
  { id: 77, name: 'Таверны Тифенталя',                         category: 'strategy', price:  7, rating:  8.25,players: '2–4', time: '30–60 мин',   org: 'Meeple House',     },
  { id: 78, name: 'Техену: Обелиск Солнца',                   category: 'strategy', price:  9, rating:  8.0, players: '2–4', time: '45–90 мин',   org: 'Meeple House',     },
  { id: 79, name: 'Федерация',                                 category: 'strategy', price:  9, rating:  0,   players: '2–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 80, name: 'Халлертау',                                 category: 'strategy', price: 12, rating:  8.5, players: '1–4', time: '75–120 мин',  org: 'Meeple House',     },
  { id: 81, name: 'Цолькин: Календарь Майя',                  category: 'strategy', price: 12, rating:  8.5, players: '2–4', time: '90 мин',      org: 'Meeple House',     },
  { id: 82, name: 'Чума (набор улучшений)',                    category: 'strategy', price:  9, rating:  0,   players: '2–4', time: '45–75 мин',   org: 'собственный',      },
  { id: 83, name: 'Эверделл',                                  category: 'strategy', price:  9, rating:  9.0, players: '1–4', time: '45–90 мин',   org: 'Maify',            },
  { id: 84, name: 'IKI: Игра о мастерах эпохи Эдо',           category: 'strategy', price:  9, rating:  8.0, players: '2–4', time: '60–90 мин',   org: 'Meeple House',     },
  { id: 85, name: 'Ticket to Ride. Наследие: Легенды Запада', category: 'strategy', price:  9, rating:  0,   players: '2–5', time: '90–180 мин',  org: 'собственный',      },
  { id: 86, name: 'Мрачная гавань',                            category: 'coop',     price: 18, rating:  0,   players: '1–4', time: '60–180 мин',  org: 'Maify',            },
  { id: 87, name: 'Остров духов',                              category: 'coop',     price: 15, rating:  8.5, players: '1–4', time: '90–120 мин',  org: 'GBA',              },
  { id: 88, name: 'Палео',                                     category: 'coop',     price:  9, rating:  9.5, players: '2–4', time: '45–75 мин',   org: 'Meeple House',     },
  { id: 89, name: 'Пандемия: Наследие. Сезон 1',              category: 'coop',     price:  9, rating:  0,   players: '2–4', time: '60–90 мин',   org: 'собственный',      },
  { id: 90, name: 'Побег из Вистара',                          category: 'coop',     price:  9, rating:  0,   players: '2–4', time: '45–75 мин',   org: 'Meeple House',     },
  { id: 91, name: 'Робинзон Крузо: Приключения',              category: 'coop',     price:  9, rating:  8.75,players: '1–4', time: '60–120 мин',  org: 'Gamefit',          },
  { id: 92, name: 'Это моя война',                             category: 'coop',     price: 12, rating:  9.0, players: '1–6', time: '90–180 мин',  org: 'GBA',              },
  { id: 93, name: 'Azul',                                      category: 'family',   price:  6, rating:  8.25,players: '2–4', time: '30–45 мин',   org: 'собственный',      },
  { id: 94, name: 'Этот безумный мир',                         category: 'family',   price:  6, rating:  0,   players: '3–6', time: '45–90 мин',   org: 'без органайзера',  },
  { id: 95, name: 'Время Кофе',                                category: 'family',   price:  6, rating:  7.5, players: '2–4', time: '30–45 мин',   org: 'собственный',      },
  { id: 96, name: 'Крутое пике',                               category: 'family',   price:  5, rating:  0,   players: '2–6', time: '30–45 мин',   org: 'без органайзера',  },
  { id: 97, name: 'Эра: Средневековье',                        category: 'family',   price:  6, rating:  0,   players: '2–6', time: '30–60 мин',   org: 'собственный',      },
  { id: 98, name: 'Ticket to Ride: Европа',                    category: 'family',   price:  5, rating:  7.5, players: '2–5', time: '30–75 мин',   org: 'собственный',      },
];

/* ============================================================
   КОНФИГ КАТЕГОРИЙ
============================================================ */
const CATEGORIES = {
  hardcore: { label: 'ХАРДКОР',   cls: 'badge--hardcore' },
  strategy: { label: 'СТРАТЕГИЯ', cls: 'badge--strategy' },
  family:   { label: 'СЕМЕЙНАЯ',  cls: 'badge--family'   },
  coop:     { label: 'КООП',      cls: 'badge--coop'     },
  deluxe:   { label: 'ДЕЛЮКС',    cls: 'badge--deluxe'   },
};

/* ============================================================
   КОНФИГ УСЛУГ КЛУБА
============================================================ */
const SERVICES = {
  rental:       { label: 'Аренда игры из каталога',           price: null, isDays: true  },
  club_single:  { label: 'Разовое посещение клуба',           price: 12,   isDays: false },
  club_monthly: { label: 'Абонемент «Постоянный игрок»',      price: 45,   isDays: false },
};

const DISCOUNT_THRESHOLD = 3;
const DISCOUNT_RATE      = 0.15;
const INITIAL_LIMIT      = 12;

/* ============================================================
   DOM — ссылки
============================================================ */
const catalogGrid    = document.getElementById('catalog-grid');
const catalogFilters = document.getElementById('catalog-filters');
const catalogEmpty   = document.getElementById('catalog-empty');
const calcGame       = document.getElementById('calc-game');
const calcDays       = document.getElementById('calc-days');
const calcResult     = document.getElementById('calc-result');
const rentalForm     = document.getElementById('rental-calculator');

/* ============================================================
   СОСТОЯНИЕ
============================================================ */
let activeFilter = 'all';
let searchQuery  = '';
let showAll      = false;

/* ============================================================
   УТИЛИТЫ
============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function pluralDays(n) {
  const m10 = n % 10, m100 = n % 100;
  if (m100 >= 11 && m100 <= 14) return 'дней';
  if (m10 === 1) return 'день';
  if (m10 >= 2 && m10 <= 4) return 'дня';
  return 'дней';
}

function handleImgError(img) {
  const cover = img.closest('.game-card__cover');
  cover.classList.add('game-card__cover--placeholder');
  cover.innerHTML = '<span aria-hidden="true">🎲</span>';
}

/* ============================================================
   КАТАЛОГ
============================================================ */
function getFilteredGames() {
  const q = searchQuery.toLowerCase();
  return games.filter(g => {
    const matchFilter = activeFilter === 'all' || g.category === activeFilter;
    const matchSearch = g.name.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });
}

function buildGameCard(game, index) {
  const cat        = CATEGORIES[game.category] ?? { label: game.category.toUpperCase(), cls: '' };
  const imgSrc     = gameImgPath(game.id);
  const ratingHtml = game.rating > 0
    ? `<span class="game-card__rating">⭐ ${game.rating.toFixed(1)}</span>` : '';

  const li = document.createElement('li');
  li.className = 'game-card';
  li.style.animationDelay = `${index * 0.06}s`;
  li.innerHTML = `
    <div class="game-card__cover">
      <img src="${imgSrc}" alt="Обложка: ${escapeHtml(game.name)}" loading="lazy" decoding="async"
           onerror="this.onerror=null; this.src='images/logo-placeholder.png'"/>
    </div>
    <div class="game-card__body">
      <div class="game-card__badges">
        <span class="badge ${cat.cls}">${cat.label}</span>${ratingHtml}
      </div>
      <h3 class="game-card__name">${escapeHtml(game.name)}</h3>
      <p class="game-card__meta"><span>👥 ${game.players}</span><span>⏱ ${game.time}</span></p>
      <p class="game-card__organizer">⚡ Игронайзер: <em>${escapeHtml(game.org)}</em></p>
      <div class="game-card__price-row">
        <div class="game-card__price">${game.price} BYN<span>за сутки</span></div>
        <button class="btn btn--outline" data-game-id="${game.id}" data-action="book"
                aria-label="Оформить прокат: ${escapeHtml(game.name)}">
          Оформить прокат
        </button>
      </div>
    </div>`;
  return li;
}

function renderCatalog(filteredGames) {
  catalogGrid.innerHTML = '';
  catalogEmpty.hidden = true;

  if (filteredGames.length === 0) {
    catalogEmpty.hidden = false;
    updateShowMoreBtn(filteredGames);
    return;
  }

  const visible  = showAll ? filteredGames : filteredGames.slice(0, INITIAL_LIMIT);
  const fragment = document.createDocumentFragment();
  visible.forEach((g, i) => fragment.appendChild(buildGameCard(g, i)));
  catalogGrid.appendChild(fragment);
  updateShowMoreBtn(filteredGames);
}

function updateShowMoreBtn(filteredGames) {
  const container = document.getElementById('catalog-more');
  const btn       = document.getElementById('catalog-show-more');
  if (!container || !btn) return;
  const hasHidden = !showAll && filteredGames.length > INITIAL_LIMIT;
  container.hidden = !hasHidden;
  if (hasHidden) btn.textContent = `Показать все игры (${filteredGames.length})`;
}

function appendRemainingGames() {
  const filtered  = getFilteredGames();
  const remaining = filtered.slice(INITIAL_LIMIT);
  const fragment  = document.createDocumentFragment();
  remaining.forEach((g, i) => fragment.appendChild(buildGameCard(g, INITIAL_LIMIT + i)));
  catalogGrid.appendChild(fragment);
  showAll = true;
  updateShowMoreBtn(filtered);
}

function filterAndRender() {
  showAll = false;
  renderCatalog(getFilteredGames());
}

/* Фильтры */
catalogFilters.addEventListener('click', e => {
  const btn = e.target.closest('.btn--filter');
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  catalogFilters.querySelectorAll('.btn--filter').forEach(b =>
    b.classList.toggle('btn--active', b === btn));
  filterAndRender();
});

/* «Показать все» */
document.addEventListener('click', e => {
  if (e.target.id === 'catalog-show-more') appendRemainingGames();
});

/* «Оформить прокат» на карточке → прокрутка к форме + пресет */
catalogGrid.addEventListener('click', e => {
  const btn = e.target.closest('[data-action="book"]');
  if (!btn) return;

  const gameId      = Number(btn.dataset.gameId);
  const serviceEl   = document.getElementById('service-type');
  if (serviceEl) { serviceEl.value = 'rental'; updateServiceUI(); }

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
   ПОИСК
============================================================ */
function injectSearchInput() {
  const wrapper = document.createElement('div');
  wrapper.className = 'catalog__search';
  wrapper.innerHTML = `
    <input type="search" class="form-input catalog__search-input" id="catalog-search"
           placeholder="🔍 Поиск по названию игры..." autocomplete="off" spellcheck="false"
           aria-label="Поиск по каталогу"/>`;
  catalogFilters.insertAdjacentElement('beforebegin', wrapper);
  document.getElementById('catalog-search').addEventListener('input', e => {
    searchQuery = e.target.value.trim();
    filterAndRender();
  });
}

/* ============================================================
   КАЛЬКУЛЯТОР
============================================================ */
function populateCalcSelect() {
  games.forEach(game => {
    const opt = document.createElement('option');
    opt.value = game.id;
    opt.textContent = `${game.name}  —  ${game.price} BYN/сутки`;
    calcGame.appendChild(opt);
  });
}

function updateCalculator() {
  const serviceEl   = document.getElementById('service-type');
  const serviceType = serviceEl ? serviceEl.value : 'rental';

  if (serviceType !== 'rental') {
    const svc = SERVICES[serviceType];
    calcResult.hidden = false;
    calcResult.innerHTML = `
      <span class="calc__game-name">${svc.label}</span>
      <strong>${svc.price} BYN</strong>
      <span class="calc__hint">Итого к оплате</span>`;
    return;
  }

  const gameId = Number(calcGame.value);
  const days   = parseInt(calcDays.value, 10);
  if (!gameId || !days || days < 1) { calcResult.hidden = true; return; }

  const game        = games.find(g => g.id === gameId);
  if (!game) return;
  const base        = game.price * days;
  const hasDiscount = days >= DISCOUNT_THRESHOLD;
  const total       = hasDiscount ? Math.round(base * (1 - DISCOUNT_RATE)) : base;

  calcResult.hidden = false;
  calcResult.innerHTML = hasDiscount ? `
    <span class="calc__game-name">${escapeHtml(game.name)}</span>
    <span class="calc__days">${days} ${pluralDays(days)}</span>
    <span class="calc__discount-badge">🎉 Скидка за длительность: 15%!</span>
    <s class="calc__old-price">${base} BYN</s>
    <strong>${total} BYN</strong>
    <span class="calc__hint">Итого к оплате</span>` : `
    <span class="calc__game-name">${escapeHtml(game.name)}</span>
    <span class="calc__days">${days} ${pluralDays(days)}</span>
    <strong>${total} BYN</strong>
    <span class="calc__hint">Итого к оплате</span>`;
}

calcGame.addEventListener('change', updateCalculator);
calcDays.addEventListener('input',  updateCalculator);

/* ============================================================
   ТИП УСЛУГИ — переключение режимов формы
============================================================ */
function updateServiceUI() {
  const serviceEl   = document.getElementById('service-type');
  if (!serviceEl) return;
  const serviceType = serviceEl.value;
  const gameSection = document.getElementById('game-section');
  const daysSection = document.getElementById('days-section');
  const submitBtn   = document.getElementById('calc-submit');
  const isRental    = serviceType === 'rental';

  gameSection.hidden = !isRental;
  daysSection.hidden = !isRental;
  submitBtn.textContent = isRental
    ? 'Рассчитать и забронировать'
    : 'Записаться в клуб';

  updateCalculator();
}

/* Клик «Записаться» / «Оформить» в тарифных карточках */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-plan]');
  if (!btn) return;
  e.preventDefault();
  const serviceEl = document.getElementById('service-type');
  if (serviceEl) {
    serviceEl.value = btn.dataset.plan;
    updateServiceUI();
  }
  document.getElementById('prices').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ============================================================
   ФОРМА — инжекция полей Имя / Телефон
============================================================ */
function injectBookingFields() {
  const submitBtn = document.getElementById('calc-submit');

  const nameGroup = document.createElement('div');
  nameGroup.className = 'form-group';
  nameGroup.innerHTML = `
    <label class="form-label" for="booking-name">Ваше имя</label>
    <input class="form-input" type="text" id="booking-name" name="booking-name"
           placeholder="Иван Иванов" autocomplete="name"/>
    <span class="form-error" id="err-name" hidden>Введите имя (минимум 2 символа)</span>`;

  const phoneGroup = document.createElement('div');
  phoneGroup.className = 'form-group';
  phoneGroup.innerHTML = `
    <label class="form-label" for="booking-phone">Телефон</label>
    <input class="form-input" type="tel" id="booking-phone" name="booking-phone"
           placeholder="+375 29 000-00-00" autocomplete="tel"/>
    <span class="form-error" id="err-phone" hidden>Введите корректный номер телефона</span>`;

  submitBtn.before(nameGroup, phoneGroup);
}

/* ============================================================
   МОДАЛЬНОЕ ОКНО — ЧЕКОВЫЙ БИЛЕТ
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
    <div class="modal__box" id="modal-box">
      <button class="modal__close" aria-label="Закрыть" data-close>✕</button>
      <div class="modal__content" id="modal-content"></div>
      <button class="btn btn--primary modal__btn" data-close id="modal-action-btn">
        Отлично, жду звонка!
      </button>
    </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target.hasAttribute('data-close')) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal({ type = 'success', content }) {
  const modal     = document.getElementById('booking-modal');
  const box       = document.getElementById('modal-box');
  const contentEl = document.getElementById('modal-content');
  const actionBtn = document.getElementById('modal-action-btn');

  box.classList.toggle('modal__box--ticket', type === 'success');
  box.classList.toggle('modal__box--error',  type === 'error');
  actionBtn.textContent = type === 'error' ? 'Понял, исправлю' : 'Отлично, жду звонка!';

  contentEl.innerHTML = content;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal__close').focus();
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  modal.hidden = true;
  document.body.style.overflow = '';
}

/** Собирает HTML чека для успешного бронирования */
function buildTicketContent({ name, phone, serviceType, game, days, total, base, hasDiscount }) {
  const isRental = serviceType === 'rental';
  const svc      = SERVICES[serviceType];

  const serviceRows = isRental ? `
    <div class="ticket__row">
      <span class="ticket__label">Игра</span>
      <span class="ticket__value">${escapeHtml(game.name)}</span>
    </div>
    <div class="ticket__row">
      <span class="ticket__label">Игронайзер</span>
      <span class="ticket__value">${escapeHtml(game.org)}</span>
    </div>
    <div class="ticket__row">
      <span class="ticket__label">Срок аренды</span>
      <span class="ticket__value">${days} ${pluralDays(days)}</span>
    </div>` : `
    <div class="ticket__row">
      <span class="ticket__label">Услуга</span>
      <span class="ticket__value">${svc.label}</span>
    </div>`;

  const discountRow = (isRental && hasDiscount) ? `
    <div class="ticket__row">
      <span class="ticket__label">Скидка</span>
      <span class="ticket__value ticket__value--accent">−15% за 3+ дней</span>
    </div>
    <div class="ticket__row">
      <span class="ticket__label">Без скидки</span>
      <span class="ticket__value"><s style="color:var(--clr-text-muted)">${base} BYN</s></span>
    </div>` : '';

  return `
    <div class="modal__ticket-header">
      <span class="modal__ticket-brand">Dice &amp; Meeples</span>
      <h2 class="modal__title" id="modal-title">Бронь подтверждена!</h2>
    </div>
    <div class="modal__ticket-divider"></div>
    <div class="ticket__rows">
      <div class="ticket__row">
        <span class="ticket__label">Клиент</span>
        <span class="ticket__value">${escapeHtml(name)}</span>
      </div>
      <div class="ticket__row">
        <span class="ticket__label">Телефон</span>
        <span class="ticket__value">${escapeHtml(phone)}</span>
      </div>
      ${serviceRows}
      ${discountRow}
    </div>
    <div class="modal__ticket-divider"></div>
    <div class="ticket__row ticket__row--total">
      <span class="ticket__label">Итого к оплате</span>
      <strong class="ticket__total-amount">${total} BYN</strong>
    </div>
    <p class="ticket__note">📞 Мы перезвоним вам для подтверждения</p>`;
}

/** Собирает HTML для модалки с ошибками валидации */
function buildErrorContent(errors) {
  return `
    <div class="modal__error-header">
      <div class="modal__error-icon">⚠️</div>
      <h2 class="modal__title" id="modal-title" style="color:var(--badge-hardcore)">
        Проверьте данные
      </h2>
    </div>
    <ul class="modal__error-list">
      ${errors.map(e => `<li>${e}</li>`).join('')}
    </ul>`;
}

/* ============================================================
   ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ
============================================================ */
function setFieldState(input, errorEl, isValid) {
  input.classList.toggle('form-input--error', !isValid);
  errorEl.hidden = isValid;
}

rentalForm.addEventListener('submit', e => {
  e.preventDefault();

  const serviceEl   = document.getElementById('service-type');
  const serviceType = serviceEl ? serviceEl.value : 'rental';
  const isRental    = serviceType === 'rental';

  const gameId  = isRental ? Number(calcGame.value) : 0;
  const daysVal = isRental ? parseInt(calcDays.value, 10) : 1;
  const nameEl  = document.getElementById('booking-name');
  const phoneEl = document.getElementById('booking-phone');
  const errName  = document.getElementById('err-name');
  const errPhone = document.getElementById('err-phone');

  const name  = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  const nameOk  = name.length >= 2;
  const phoneOk = /^[\d\s+\-()]{7,}$/.test(phone);
  const gameOk  = !isRental || !!gameId;
  const daysOk  = !isRental || (!isNaN(daysVal) && daysVal >= 1);

  setFieldState(nameEl,  errName,  nameOk);
  setFieldState(phoneEl, errPhone, phoneOk);
  if (isRental) {
    calcGame.classList.toggle('form-input--error', !gameOk);
    calcDays.classList.toggle('form-input--error', !daysOk);
  }

  if (!gameOk || !daysOk || !nameOk || !phoneOk) {
    const errors = [];
    if (!gameOk)  errors.push('Выберите игру из списка');
    if (!daysOk)  errors.push('Укажите количество дней (минимум 1)');
    if (!nameOk)  errors.push('Введите ваше имя (минимум 2 символа)');
    if (!phoneOk) errors.push('Введите корректный номер телефона');
    openModal({ type: 'error', content: buildErrorContent(errors) });
    return;
  }

  let game, base, hasDiscount, total;
  if (isRental) {
    game        = games.find(g => g.id === gameId);
    base        = game.price * daysVal;
    hasDiscount = daysVal >= DISCOUNT_THRESHOLD;
    total       = hasDiscount ? Math.round(base * (1 - DISCOUNT_RATE)) : base;
  } else {
    game        = null;
    base        = SERVICES[serviceType].price;
    hasDiscount = false;
    total       = base;
  }

  openModal({
    type: 'success',
    content: buildTicketContent({
      name, phone, serviceType, game,
      days: isRental ? daysVal : null,
      total, base, hasDiscount,
    }),
  });

  rentalForm.reset();
  calcResult.hidden = true;
  updateServiceUI();
  [calcGame, calcDays, nameEl, phoneEl].forEach(el => el.classList.remove('form-input--error'));
  if (errName)  errName.hidden  = true;
  if (errPhone) errPhone.hidden = true;
});

/* ============================================================
   BURGER MENU
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
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('nav__links--open');
  }));
}

/* ============================================================
   HEADER SCROLL
============================================================ */
function initScrollHeader() {
  const header = document.querySelector('.site-header');
  const fn = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

/* ============================================================
   ГОД В ФУТЕРЕ
============================================================ */
function setFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   ИНИЦИАЛИЗАЦИЯ
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

  const serviceEl = document.getElementById('service-type');
  if (serviceEl) {
    serviceEl.addEventListener('change', updateServiceUI);
    updateServiceUI();
  }
});
