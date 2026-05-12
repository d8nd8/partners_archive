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
        "Портал о ЗОЖ с системным подходом: материалы о привычках и их влиянии на здоровье и качество жизни.",
    },
    {
      id: "astrakh",
      title: "АСтрахование",
      description:
        "Внутренний финпродукт для страховой компании с широкой линейкой услуг и высоким объёмом регулярных выплат — поток страховых заявок и операций стабильно увеличивается.",
    },
  ],
} as const;

export const PROCESS_CONTENT = {
  heading: "Как мы работаем?",
  items: [
    {
      title: "Бесплатно, до заключения договора",
      description:
        "1.Знакомство и интервью\n2.Подготовка предложение, возможно встреча экскурсия по вашему предприятию\n3.Второй звонок и формирование четкого ТЗ для дальнейшей работы в формате записей\n4.Предложение базовой стратегии развития\nбез четкого ТЗ и базовые намётки (ваерфреймы) UX/UI",
    },
    {
      title: "Если проект нам интересен",
      description:
        "1. Создание полноценного ТЗ\n\nПрезентуем, как стартап-питч.\n\nВы понимаете:\n\n- что будет сделано\n- зачем\n- сколько стоит\n- сколько сэкономит\n\n2. Работа по данному ТЗ\n\n3. Каждую неделю синк и обсуждение че да как прошло",
    },
    {
      title: "Когда 1 версия проекта сдана",
      description:
        "1. Бесплатная поддержка и минимальные дополнительные доработки продукта первые 2 месяца при заключении годового контракта на поддержку, а дальше в рамках договора и покупкой человекочасов\n\n2. Если же контракта нет – поддержка и устранение багов, найденных после сдачи на 60 дней",
    },
  ],
} as const;

export const FOOTER_CONTENT = {
  nav: [
    { label: "О нас", href: "#how-we-help" },
    { label: "Кейсы", href: "#cases" },
  ],
  contacts: [
    { label: "info@archive.ru", href: "mailto:info@archive.ru" },
    { label: "+7 (963) 696-71-70", href: "tel:+79636967170" },
  ],
  companyInfo: ['ООО "АРХИВ"', "ИНН 9703210801"],
  legal: [
    { label: "Политика конфиденциальности", href: "#" },
    { label: "Политика обработки персональных данных", href: "#" },
  ],
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

