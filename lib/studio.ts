// Single source of truth for the studio site's copy and config.
// All copy and links below are pulled from the real Kwork profile — do not edit
// services, gigs or testimonials without checking the source profile:
//   https://kwork.ru/user/alexandrcherezau

// ponytail: this URL is the Spline Public Viewer — embedded as an iframe
// in the hero because prod.spline.design 403s on the scene file. The
// self-hosted copy at public/3d-models/scene.splinecode stays as a fallback.
export const SCENE_VIEWER_URL =
  'https://my.spline.design/nexbotrobotcharacterconcept-kMIc2WpwfiffHOudLO8OqpFV/'

export const SCENE_URL = '/3d-models/scene.splinecode'

export const SCENE_URL_REMOTE =
  'https://prod.spline.design/i8eNphGELT2tDQVT/scene.splinecode'

export type TeamMember = {
  name: string
  handle: string
  tagline: string
  bio: string
  stack: string[]
  since: string
  kworkUrl: string
  githubUrl?: string
  stats: {
    orders: number
    reviews: number
    rating: number
    onTime: number
    completion: number
    repeat: number
  }
}

export const lead: TeamMember = {
  name: 'Александр',
  handle: 'AlexandrCherezau',
  tagline: 'Python & Fullstack · Боты, парсинг, AI, веб',
  bio: 'Fullstack и Python-разработчик. Делаю надёжные IT-решения для бизнеса: от Telegram-ботов и парсеров до нагруженных веб-сервисов и автоматизации CRM. С 2020 года, 100% закрытых заказов.',
  stack: [
    'Python (FastAPI, Aiogram 3, Scrapy)',
    'Java Spring, Node.js, PHP',
    'React, Next.js, TypeScript, Tailwind',
    'PostgreSQL, MySQL, Redis',
    'OpenAI / Claude / DeepSeek · RAG',
    'Docker · Linux VPS · Nginx · SSL · Git',
  ],
  since: 'на Kwork с 2 июня 2020',
  kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  githubUrl: 'https://github.com/AlexandrCherezau',
  stats: {
    orders: 14,
    reviews: 11,
    rating: 5.0,
    onTime: 93,
    completion: 100,
    repeat: 50,
  },
}

export type Service = {
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Telegram-боты и Mini Apps',
    description:
      'Воронки, платежи, базы данных, закрытые клубы, ИИ-ассистенты на aiogram 3 и React Mini Apps.',
  },
  {
    title: 'SaaS и веб-сервисы',
    description:
      'Полный цикл: фронтенд, бэкенд, база, деплой. React/Next.js сверху, FastAPI/Spring под капотом.',
  },
  {
    title: 'Парсинг и интеграции',
    description:
      'Каталоги, цены, контакты. Обход Cloudflare и капчи. Выгрузка в Excel/БД. Связка с amoCRM, Bitrix24, МойСклад, Google Sheets.',
  },
  {
    title: 'AI-агенты и RAG',
    description:
      'OpenAI, Claude, DeepSeek и локальные модели в продакшен-цепочках. Векторный поиск по вашей базе знаний.',
  },
  {
    title: 'CRM, ERP и бизнес-системы',
    description:
      'Кастомные CRM/ERP с интеграцией Telegram, брокерами задач, микросервисной архитектурой и быстрыми API.',
  },
  {
    title: 'Срочный фикс и доработки',
    description:
      'Верстка, JS, PHP, WordPress — закрытие тикета за 24 часа. Деплой на вашем сервере под ключ.',
  },
]

export type Gig = {
  title: string
  price: string
  kworkUrl: string
}

export const gigs: Gig[] = [
  {
    title: 'REST API на Python FastAPI или Node.js NestJS под ключ',
    price: '1 500 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Telegram-бот на aiogram: заявки, оплата, рассылки, CRM',
    price: '1 500 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Telegram Mini App на React: магазин, визитка, лендинг, CRM',
    price: '2 000 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Парсер сайтов и каталогов на Python — обход защиты, экспорт',
    price: '1 500 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Интеграция API: amoCRM, Bitrix24, МойСклад, Google Таблицы',
    price: '1 500 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Настройка VPS: Linux, Docker, Nginx, SSL, деплой',
    price: '2 000 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Fullstack-сайт: фуллстек и backend-разработка',
    price: '4 500 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Парсер любой сложности под ваши задачи',
    price: '1 000 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Чат-бот: Telegram, Max, Discord',
    price: '1 500 ₽',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
]

export type Testimonial = {
  author: string
  service: string
  body: string
}

export const testimonials: Testimonial[] = [
  {
    author: 'gk_perspektiva',
    service: 'Парсинг 10 каталогов',
    body: 'Заказывал парсинг 10 больших разноформатных каталогов. С задачей справился быстро. Необходимые корректировки в ходе работы вносил без проблем. Рекомендую исполнителя.',
  },
  {
    author: 'david54333333',
    service: 'Поиск и обработка субтитров на Python',
    body: 'Исполнитель отлично справился с задачей. До этого я перепробовал множество решений — все упирались в одну и ту же проблему. Александр не только нашёл рабочее решение, но и предоставил подробную документацию. Отдельно отмечу высокую скорость работы.',
  },
  {
    author: 'CTPAHHOE_MECTO',
    service: 'Мод / игровой контент',
    body: 'Всё отлично! Проделан большой объём работы. Все детали заказа выполнены, как нужно.',
  },
  {
    author: 'AlexandrCherezau',
    service: 'Парсер politpig.ru',
    body: 'С задачей справился отлично. Рекомендую исполнителя за скорость и качество заказа.',
  },
  {
    author: 'labirintm',
    service: 'CRM с интеграцией Telegram',
    body: 'Грамотный специалист. Подготовка ТЗ с правильными уточняющими вопросами. Сделал всё по ТЗ с опережением графика. Буду дальше сотрудничать. Рекомендую!',
  },
  {
    author: 'Mr-Apmyc-Anim',
    service: 'Система взаимодействия с манекенами',
    body: 'Продавец/разработчик выполнил свою работу на 10/10. Как по скорости, так и по качеству. Одобряю каждому, кто работает с датапаками и чем-либо ещё связанным с майкрафтом.',
  },
  {
    author: 'zakaznaryad',
    service: 'Дашборды для телевизоров 65–75"',
    body: 'Рекомендую данного исполнителя. Оперативно взял заказ в работу и предложил несколько улучшений.',
  },
]

export type Portfolio = {
  id: string
  title: string
  client: string
  month: string
  stack: string[]
  category: string
  scope: string
  preview: string
  previewType: 'webp' | 'jpg'
  kworkUrl: string
}

// ponytail: real Kwork portfolio items, copy of the actual titles
// from the Kwork profiles + scraped og:image previews. Each card
// in the portfolio grid links to the case-study page on Kwork.
// `preview` is the path under /portfolio/ that Next serves as a
// static asset (downloaded from the kwork CDN, optim).
export const portfolio: Portfolio[] = [
  {
    id: 'k23569286',
    title: 'Telegram-бот-парсер Amazon',
    client: 'Kwork',
    month: 'Aug 2026',
    stack: ['Python', 'aiogram', 'Scrapy'],
    category: 'бот / парсер',
    scope: 'Маленький бот · 2-3 недели',
    preview: '/portfolio/23569286.webp',
    previewType: 'webp',
    kworkUrl: 'https://kwork.ru/portfolio/23569286',
  },
  {
    id: 'k22552936',
    title: 'Сайт для собственной IDE — Piqle',
    client: 'Kwork',
    month: 'May 2026',
    stack: ['Next.js', 'TypeScript', 'Tailwind'],
    category: 'лендинг',
    scope: 'Mid-size сайт · 3-4 недели',
    preview: '/portfolio/22552936.webp',
    previewType: 'webp',
    kworkUrl: 'https://kwork.ru/portfolio/22552936',
  },
  {
    id: 'k23569177',
    title: 'Сайт POLITPIG — Minecraft-сервер',
    client: 'Kwork',
    month: 'Aug 2026',
    stack: ['Next.js', 'Tailwind', 'Vercel'],
    category: 'игровой лендинг',
    scope: 'Каталог + донат · 2-3 недели',
    preview: '/portfolio/23569177.webp',
    previewType: 'webp',
    kworkUrl: 'https://kwork.ru/portfolio/23569177',
  },
  {
    id: 'k23570036',
    title: 'Сайт для бренда одежды — VÉLÈNE',
    client: 'Kwork',
    month: 'Aug 2026',
    stack: ['Next.js', 'Tailwind', 'Stripe'],
    category: 'e-commerce',
    scope: 'Каталог + корзина + оплата',
    preview: '/portfolio/23570036.jpg',
    previewType: 'jpg',
    kworkUrl: 'https://kwork.ru/portfolio/23570036',
  },
]

export const process = [
  {
    step: '01',
    title: 'Скоуп',
    body: 'Бриф в ЛС — уточняем стек, фиксируем цену и сроки. Без сюрпризов на выходе.',
  },
  {
    step: '02',
    title: 'Сборка',
    body: 'Еженедельные демо на реальном стенде. Видите код, запускаете продукт, правите приоритеты по ходу.',
  },
  {
    step: '03',
    title: 'Сдача и поддержка',
    body: 'Деплой на вашем сервере под ключ. Гарантия после сдачи, документация, чистый код, готовый к развитию.',
  },
] as const