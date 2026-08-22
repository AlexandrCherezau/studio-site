// Single source of truth for the studio site's copy and config.
// All copy and links below are pulled from real Kwork profiles — do not edit
// services, gigs or testimonials without checking the source profiles:
//   https://kwork.ru/user/alexandrcherezau
//   https://kwork.ru/user/afterburnerr

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
  role: 'lead' | 'partner'
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

export const team: TeamMember[] = [
  {
    name: 'Александр',
    handle: 'AlexandrCherezau',
    role: 'lead',
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
  },
  {
    name: 'Илья',
    handle: 'afterburnerr',
    role: 'partner',
    tagline: 'Fullstack · SaaS и сложные сервисы',
    bio: '5+ лет в IT. SaaS, бизнес-системы, боты для продаж, игровые моды. Закрываю полный стек: фронтенд, бэкенд, базы, деплой. Профессионально работаю с ИИ-инструментами.',
    stack: [
      'React, Next.js, TypeScript, Tailwind, TanStack',
      'Python (FastAPI, Django), Node.js, Spring Boot',
      'OpenAI / Claude / DeepSeek · LangChain · RAG',
      'PostgreSQL, MongoDB, Redis, pgvector',
      'REST · GraphQL · RabbitMQ · Celery',
      'Docker · Docker Compose · CI/CD (GitHub Actions)',
    ],
    since: 'на Kwork с 7 сентября 2025',
    kworkUrl: 'https://kwork.ru/user/afterburnerr',
    githubUrl: 'https://github.com/afterburnerr',
    stats: {
      orders: 6,
      reviews: 5,
      rating: 5.0,
      onTime: 100,
      completion: 100,
      repeat: 0,
    },
  },
]

export type Service = {
  title: string
  description: string
  owner: 'lead' | 'partner' | 'both'
}

export const services: Service[] = [
  {
    title: 'Telegram-боты и Mini Apps',
    description:
      'Воронки, платежи, базы данных, закрытые клубы, ИИ-ассистенты на aiogram 3 и React Mini Apps.',
    owner: 'lead',
  },
  {
    title: 'SaaS и веб-сервисы',
    description:
      'Полный цикл: фронтенд, бэкенд, база, деплой. React/Next.js сверху, FastAPI/Spring под капотом.',
    owner: 'partner',
  },
  {
    title: 'Парсинг и интеграции',
    description:
      'Каталоги, цены, контакты. Обход Cloudflare и капчи. Выгрузка в Excel/БД. Связка с amoCRM, Bitrix24, МойСклад, Google Sheets.',
    owner: 'both',
  },
  {
    title: 'AI-агенты и RAG',
    description:
      'OpenAI, Claude, DeepSeek и локальные модели в продакшен-цепочках. Векторный поиск по вашей базе знаний.',
    owner: 'both',
  },
  {
    title: 'CRM, ERP и бизнес-системы',
    description:
      'Кастомные CRM/ERP с интеграцией Telegram, брокерами задач, микросервисной архитектурой и быстрыми API.',
    owner: 'partner',
  },
  {
    title: 'Срочный фикс и доработки',
    description:
      'Верстка, JS, PHP, WordPress — закрытие тикета за 24 часа. Деплой на вашем сервере под ключ.',
    owner: 'lead',
  },
]

export type Gig = {
  title: string
  price: string
  owner: 'lead' | 'partner'
  kworkUrl: string
}

export const gigs: Gig[] = [
  {
    title: 'REST API на Python FastAPI или Node.js NestJS под ключ',
    price: '1 500 ₽',
    owner: 'lead',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Telegram-бот на aiogram: заявки, оплата, рассылки, CRM',
    price: '1 500 ₽',
    owner: 'lead',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Telegram Mini App на React: магазин, визитка, лендинг, CRM',
    price: '2 000 ₽',
    owner: 'lead',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Парсер сайтов и каталогов на Python — обход защиты, экспорт',
    price: '1 500 ₽',
    owner: 'lead',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Интеграция API: amoCRM, Bitrix24, МойСклад, Google Таблицы',
    price: '1 500 ₽',
    owner: 'lead',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Настройка VPS: Linux, Docker, Nginx, SSL, деплой',
    price: '2 000 ₽',
    owner: 'lead',
    kworkUrl: 'https://kwork.ru/user/alexandrcherezau',
  },
  {
    title: 'Fullstack-сайт: фуллстек и backend-разработка',
    price: '4 500 ₽',
    owner: 'partner',
    kworkUrl: 'https://kwork.ru/user/afterburnerr',
  },
  {
    title: 'Парсер любой сложности под ваши задачи',
    price: '1 000 ₽',
    owner: 'partner',
    kworkUrl: 'https://kwork.ru/user/afterburnerr',
  },
  {
    title: 'Чат-бот: Telegram, Max, Discord',
    price: '1 500 ₽',
    owner: 'partner',
    kworkUrl: 'https://kwork.ru/user/afterburnerr',
  },
]

export type Testimonial = {
  author: string
  service: string
  body: string
  owner: 'lead' | 'partner'
}

export const testimonials: Testimonial[] = [
  {
    author: 'gk_perspektiva',
    service: 'Парсинг 10 каталогов',
    owner: 'lead',
    body: 'Заказывал парсинг 10 больших разноформатных каталогов. С задачей справился быстро. Необходимые корректировки в ходе работы вносил без проблем. Рекомендую исполнителя.',
  },
  {
    author: 'david54333333',
    service: 'Поиск и обработка субтитров на Python',
    owner: 'lead',
    body: 'Исполнитель отлично справился с задачей. До этого я перепробовал множество решений — все упирались в одну и ту же проблему. Александр не только нашёл рабочее решение, но и предоставил подробную документацию. Отдельно отмечу высокую скорость работы.',
  },
  {
    author: 'CTPAHHOE_MECTO',
    service: 'Мод / игровой контент',
    owner: 'lead',
    body: 'Всё отлично! Проделан большой объём работы. Все детали заказа выполнены, как нужно.',
  },
  {
    author: 'AlexandrCherezau',
    service: 'Парсер politpig.ru',
    owner: 'partner',
    body: 'С задачей справился отлично. Рекомендую исполнителя за скорость и качество заказа.',
  },
  {
    author: 'labirintm',
    service: 'CRM с интеграцией Telegram',
    owner: 'partner',
    body: 'Грамотный специалист. Подготовка ТЗ с правильными уточняющими вопросами. Сделал всё по ТЗ с опережением графика. Буду дальше сотрудничать. Рекомендую!',
  },
  {
    author: 'Mr-Apmyc-Anim',
    service: 'Система взаимодействия с манекенами',
    owner: 'partner',
    body: 'Продавец/разработчик выполнил свою работу на 10/10. Как по скорости, так и по качеству. Одобряю каждому, кто работает с датапаками и чем-либо ещё связанным с майкрафтом.',
  },
  {
    author: 'zakaznaryad',
    service: 'Дашборды для телевизоров 65–75"',
    owner: 'partner',
    body: 'Рекомендую данного исполнителя. Оперативно взял заказ в работу и предложил несколько улучшений.',
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

export const lead = team[0]
export const partner = team[1]