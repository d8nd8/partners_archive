import type { Typography } from "@/types";

export const TYPOGRAPHY: Typography = {
  h1: {
    fontFamily: "Inter",
    fontWeight: 400,
    fontSizePx: 59,
    lineHeightPx: 60.8,
    letterSpacing: "-0.64px",
  },
  h2: {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSizePx: 45,
    lineHeightPx: 50,
    letterSpacing: "-0.64px",
  },
  subtitle: {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSizePx: 19,
    lineHeightPx: 27,
    letterSpacing: "-0.2px",
  },
  body: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSizePx: 19,
    lineHeightPx: 27,
    letterSpacing: "-0.2px",
  },
  body2: {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSizePx: 16,
    lineHeightPx: 23,
    letterSpacing: "-0.17px",
  },
  h3: {
    fontFamily: "Inter",
    fontWeight: 300,
    fontSizePx: 33,
    lineHeightPx: 43.2,
    letterSpacing: "0%",
  },
  button: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSizePx: 16,
    lineHeightPx: 22.95,
    letterSpacing: "-0.17px",
  },
  h3medium: {
    fontFamily: "Inter",
    fontWeight: 500,
    fontSizePx: 33,
    lineHeightPx: 43.2,
    letterSpacing: "0",
  },
};

export const COLORS = {
  "badge-button-background": "#ffded2",
  "badge-button-border": "#f4bda9",
  color: {
    primary: {
      background: "#dedede",
      "background-2": "#242424",
      "background-3": "#ffffff",
    },
    text: {
      primary: "#000000",
      primary2: "#e37952",
      secondary: "#8f8f8f",
      menu: "#cecece",
    },
    surface: {
      card: "radial-gradient(#e37952 0%, #ffffff 100%)",
    },
    border: {
      default: "#e6e6e5",
    },
  },
} as const;

export const HEADER_CONTENT = {
  logo: {
    left: "АР",
    star: "*",
    right: "ИВ",
  },
  nav: {
    about: "О нас",
    cases: "Кейсы",
    contacts: "Контакты",
  },
  casesDropdown: [
    { label: "ifeelgood", href: "#case-ifeelgood" },
    { label: "RUQI", href: "#case-ruqi" },
    { label: "АСтрахование", href: "#case-astrakh" },
    { label: "FINO+", href: "#case-fino" },
    { label: "Альва", href: "#case-alva" },
    { label: "РЖД", href: "#case-rzd" },
  ] as const,
  cta: "Узнать больше",
  ctaHref: "https://t.me/archive_case",
} as const;

export const HERO_CONTENT = {
  title: {
    top: "Digital-консалтинг",
    accent: "нового ",
    bottom: "поколения",
  },
  subtitle: "Технологии с понятной рентабельностью",
  cta: "Связаться",
} as const;

export const SITE_METADATA = {
  title: "АРХИВ — digital-консалтинг нового поколения",
  description:
    "Технологии с понятной рентабельностью. Digital-консалтинг для бизнеса: стратегия, внедрение и измеримый результат.",
  ogImage: "/og-banner.jpg",
} as const;

export const HOW_WE_HELP_CONTENT = {
  heading: "Как именно мы помогаем?",
  subtitle: "Рассказываем пошагово, как и чем мы помогаем вашему бизнесу.",
  cta: {
    ask: "Задать вопрос",
    contact: "Связаться с нами",
  },
  cards: [
    {
      title: "Стратегический уровень",
      description:
        "Проектируем, как ИТ будет работать в компании через 1–3 года. Для тех, кто хочет выстроить процессы и снизить зависимость от кадровой текучки.",
      image: "/images/strategic.svg",
    },
    {
      title: "Операционный уровень",
      description:
        "Разбираем, где бизнес теряет деньги прямо сейчас — в том числе в ФОТ, где часто скрыто до 20% неэффективности.",
      image: "/images/operational.svg",
    },
    {
      title: "Технологический уровень",
      description:
        "Подбираем и внедряем подходящие инструменты. Полноценная ИТ-экспертиза без найма штата за сопоставимый бюджет.",
      image: "/images/tech.svg",
    },
    {
      title: "Информационная безопасность",
      description: "Понимаем риски до того, как что-то сломалось или утекло.",
      image: "/images/security.svg",
    },
    {
      title: "Цифровая трансформация",
      description:
        "Помогаем адаптироваться к цифре осмысленно. В большинстве компаний до 20% операций можно сразу заменить автоматизацией или ИИ-агентом.",
      image: "/images/digital.svg",
    },
    {
      title: "Консалтинг по ПО",
      description:
        "Помогаем выбрать и встроить софт так, чтобы он работал на бизнес, а не наоборот.",
      image: "/images/consulting.svg",
    },
  ],
} as const;

export const EXPERTISE_TAGLINE_CONTENT = {
  before: "Мы ",
  accent1: "задаём вопросы",
  middle: " и ",
  accent2: "даём мнение",
  after: " со стороны благодаря многолетней экспертизе в консалтинговых компаниях, где клиентами были такие компании как Роснефть, X5 Group, РЖД, МТС",
} as const;

export const CASES_CONTENT = {
  heading: "Наши кейсы",
  badge: "КЕЙС",
  items: [
    {
      id: "ruqi",
      title: "RUQI",
      description:
        "B2B-платформа для поиска и найма самозанятых, аналогичная платформам вроде YouDo",
    },
    {
      id: "fino",
      title: "FINO+",
      description:
        "Внутренний финпродукт для аутсорсинговой компании с большим штатом и множеством постоянных расходов — поток заявок постоянно растёт.",
    },
    {
      id: "ifeelgood",
      title: "ifeelgood",
      description:
        "Приложение о ЗОЖ с программами по привычкам, рекомендациями и ИИ-ассистентом.",
    },
    {
      id: "rzd",
      title: "РЖД",
      description:
        "Панель мониторинга качества рельсошпальной решётки — телеметрия с оборудования, учёт замечаний, чек-листы сборки и аналитика для смен на объекте.",
    },
    {
      id: "alva",
      title: "Альва",
      description:
        "Операционная панель для компании по обращению с отходами: заявки, справочники и контроль на весовой с компьютерным зрением.",
    },
    {
      id: "astrakh",
      title: "АСтрахование",
      description:
        "Для страховщика собрали дизайн-систему с единой библиотекой компонентов и правилами оформления сайта, лендингов и личных кабинетов.",
    },
  ],
} as const;

export const PROCESS_CONTENT = {
  heading: "Как мы работаем?",
  items: [
    {
      title: "Формирование ТЗ и погружение в идею",
      sections: [
        {
          heading: "Знакомство и интервью",
          body: "Проводим детальное интервью о вашем бизнесе — как зарабатываете, где теряете деньги, где слабые места и человеческий фактор. Это не формальность, нам важно понять систему изнутри.",
        },
        {
          heading: "Второй звонок с визуализацией",
          body: "Приходим уже с макетной версией дизайна, сгенерированной с помощью ИИ. Вы видите примерные флоу и экраны — обсуждаем не абстрактно, а на конкретном визуальном примере. Фиксируем цели, гипотезы и проблемные зоны в виде чётких записей.",
        },
        {
          heading: "Стратегия и этапы",
          body: "Предлагаем базовую стратегию развития продукта и договариваемся о структуре работы. На этом этапе уходим в доработку ТЗ — уже в деньгах.",
        },
        {
          heading: "Созваниваемся, пока не поймём",
          body: "Если после звонков осталось что-то неясное — с нашей стороны или с вашей — просто назначаем ещё один звонок. И ещё один, если нужно. Погружение в идею не ограничено по количеству итераций, это часть процесса, а не проблема.",
        },
      ],
    },
    {
      title: "Коммерческое предложение",
      sections: [
        {
          heading: "Полноценное ТЗ как питч",
          body: "Презентуем КП в формате стартап-питча — с набросками дизайна, чёткой структурой и разбивкой на модули. Вы платите не за всё сразу, а за каждый выполненный модуль, это удобно и прозрачно.",
        },
        {
          heading: "Дизайн входит в любой тариф",
          body: "Полноценный дизайн от наших специалистов — без доплат. Как и бизнес-экспертиза на всём протяжении проекта.\nПосле презентации КП вы точно знаете:\n— что будет сделано и зачем\n— сколько это стоит\n— сколько это сэкономит или принесёт вашему бизнесу",
        },
      ],
    },
    {
      title: "Договор и разработка",
      sections: [
        {
          heading: "Заключаем договор",
          body: "Прописываем порядок оплаты под вашу ситуацию, никаких шаблонных схем.\n\nСтандартный порядок оплаты — 50% до начала разработки модуля, 50% по завершении. Условия фиксируются индивидуально.",
        },
        {
          heading: "Регулярные синки",
          body: "Созвоны и встречи в рабочем режиме — вы всегда видите, что делается прямо сейчас, какие вопросы решаем и что будет следующим шагом. Никакого «исчезновения» команды на месяц.",
        },
      ],
    },
  ],
} as const;

export const FOOTER_CONTENT = {
  nav: [
    { label: "О нас", href: "#about-us" },
    { label: "Кейсы", href: "#cases" },
  ],
  contacts: [
    { label: "hello@archive-it.ru", href: "mailto:hello@archive-it.ru" },
    { label: "+7 (963) 696-71-70", href: "tel:+79636967170" },
  ],
  companyInfo: ['ООО "АРХИВ"', "ИНН 9703210801"],
  privacyPolicy: {
    label: "Политика конфиденциальности и обработки персональных данных",
    href: "/documents/privacy.docx",
  },
} as const;

export const WHY_CONTENT = {
  heading: "Почему к нам приходят?",
  subheading: {
    before: "Бизнесу нужна не «автоматизация», ",
    accent: "бизнесу нужна система",
    after: ", которая:",
  },
  problems: [
    {
      icon: "FileX" as const,
      title: "Ошибки, которые стоят денег",
      items: [
        "Данные вносятся вручную",
        "Цифры не сходятся между системами",
        "Решения принимаются на неточных данных",
        "Ошибки повторяются, потому что они не фиксируются системой",
      ],
    },
    {
      icon: "UserRoundPlus" as const,
      title: "Все бизнес процессы «затыкаются» людьми",
      items: [
        "Новый процесс = ещё один человек",
        "Рост = больше согласований",
        "Всё держится на конкретных сотрудниках",
        "Ушёл человек — процесс сломался",
      ],
    },
    {
      icon: "Grid2X2Plus" as const,
      title: "Масштабирование затыкается",
      items: [
        "Бизнес растёт, а скорость решений — нет",
        "Любое изменение требует ручного вмешательства",
        "Любой нестандарт — аврал",
      ],
    },
    {
      icon: "EyeOff" as const,
      title: "Контроль над бизнесом теряется",
      items: [
        "Нет единой картины",
        "Руководство получает отчёты с задержкой",
        "Цифры нужно «перепроверять»",
        "Возникает недоверие даже к собственным данным",
      ],
    },
  ],
  solutions: [
    {
      icon: "UserRoundMinus" as const,
      title: "Снижает влияние человеческого фактора",
    },
    {
      icon: "ClipboardList" as const,
      title: "Фиксирует правила",
    },
    {
      icon: "SlidersVertical" as const,
      title: "Предотвращает ошибки до их появления",
    },
    {
      icon: "SquareArrowOutUpRight" as const,
      title: "Позволяет делать масштаб без хаоса",
    },
  ],
} as const;

