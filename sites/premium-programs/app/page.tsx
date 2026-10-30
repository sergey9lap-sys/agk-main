import ClientEffects from "./ClientEffects";
import CasesSlider from "./CasesSlider";
import MotionCta from "./MotionCta";
import TariffsSection from "./TariffsSection";
import type { CSSProperties } from "react";

const audience = [
  {
    type: "Эксперт",
    initials: "ЭК",
    avatarPosition: "0% 0%",
    profile: "Есть опыт, результаты и сильная экспертность.",
    symptom: "Текущая модель не приносит желаемых результатов, а рост будто упёрся в потолок.",
  },
  {
    type: "Консультант",
    initials: "КН",
    avatarPosition: "50% 0%",
    profile: "Работаете через консультации или личное сопровождение.",
    symptom: "Всё завязано на вас, и выйти из операционных процессов пока не получается.",
  },
  {
    type: "Предприниматель",
    initials: "ПР",
    avatarPosition: "100% 0%",
    profile: "Хотите перейти к более платежеспособной аудитории.",
    symptom: "Пока неясно, с каким продуктом идти в высокий сегмент и как это сделать.",
  },
  {
    type: "Владелец агентства",
    initials: "ВА",
    avatarPosition: "0% 100%",
    profile: "Задумываетесь об агентской модели, консалтинге или мастер-группе.",
    symptom: "Есть направление, но нет структуры: с чего начать, что упаковать и как продавать.",
  },
  {
    type: "Наставник",
    initials: "НС",
    avatarPosition: "50% 100%",
    profile: "Устали зависеть от запусков и постоянного давления контента.",
    symptom: "Хочется выстроить стабильный поток клиентов на высокие чеки без ежедневной гонки.",
  },
  {
    type: "Офлайн-предприниматель",
    initials: "ОП",
    avatarPosition: "100% 100%",
    profile: "Выходите из офлайна в онлайн и хотите сразу строить сильную линейку.",
    symptom: "Не хочется собирать продукт методом проб и ошибок и терять время на лишние шаги.",
  },
];

const agenda = [
  {
    act: "АКТ I",
    title: "Что такое премиальный продукт на самом деле",
    text: "Не всё, что называют премиальным, действительно им является. Разберём ключевые критерии, эффект «бутикового продукта» и то, как он работает в онлайн-образовании.",
  },
  {
    act: "АКТ II",
    title: "Какие форматы работают в 2026 году",
    text: "Консалтинг, мастер-группы, клубы, стратегические программы, агентская модель. Разберём, кому подходит каждый формат и какая экономика стоит за ним.",
  },
  {
    act: "АКТ III",
    title: "Как понять, какой формат подходит именно вам",
    text: "Главная задача мастер-класса — дать не теорию, а практические ориентиры для вашего проекта, опыта, экспертности, ресурсов и целей.",
  },
  {
    act: "АКТ IV",
    title: "Как формировать цену и не бояться, что не купят",
    text: "Покажем внутреннюю архитектуру высокочековых продуктов и на примере проекта «Визионеры» разберём, за что готовы платить клиенты.",
  },
  {
    act: "АКТ V",
    title: "Как перейти в более платёжеспособный сегмент клиентов",
    text: "Даже если у вас пока нет продукта мечты. Разберём шаги, которые помогают постепенно выстроить новую продуктовую модель.",
  },
];

const transformations = [
  {
    portrait: "Досье 01",
    before: "Не понимаю, что запускать дальше",
    after: "Есть конкретная модель продукта под мой опыт и компетенции",
  },
  {
    portrait: "Досье 02",
    before: "Доход зависит от запусков и выхода в блог",
    after: "Понимаю, как выстроить более устойчивую систему и не зависеть от охватов",
  },
  {
    portrait: "Досье 03",
    before: "Хочу работать с сильными клиентами",
    after: "Понимаю путь перехода в более платежеспособный сегмент",
  },
  {
    portrait: "Досье 04",
    before: "Много идей, попыток внедрить новые инструменты",
    after: "Есть понятная стратегия развития продуктовой линейки",
  },
];

const cases = [
  {
    name: "Ирина Гильманова",
    role: "Маркетолог, руководитель отдела маркетинга",
    lead: "Руководитель отдела маркетинга в федеральном бизнесе с оборотом более 1 млрд Р. Выстраивала отделы маркетинга с нуля в нескольких компаниях.",
    image: "/premium-programs/cases/doc-case-01-irina.jpg",
    points: [
      "увеличила чек на личную работу в 4 раза;",
      "перестала быть «узким горлышком» в своем бизнесе;",
      "создала собственное маркетинговое агентство;",
      "запустила два направления: SMM полного цикла для экспертов и отдел маркетинга на аутсорсе для компаний;",
      "собрала команду, выстроила бизнес-процессы и регламенты работы;",
      "начала работать с клиентами нового уровня.",
    ],
  },
  {
    name: "Даниил Осипов",
    role: "Основатель тренинговой компании Osipov Group, тренер TEDx, преподаватель MBA EMAS",
    result: "Финансовый результат: 1 170 000 Р с первого запуска.",
    image: "/premium-programs/cases/doc-case-02-daniil.jpg",
    points: [
      "создал с нуля мастер-группу для внешних экспертов;",
      "разработал новое позиционирование на рынке;",
      "запустил первый открытый образовательный проект всего за 1,5 месяца;",
      "собрал 15 участников в мастер-группу.",
    ],
  },
  {
    name: "Светлана Беланова",
    role: "Консультант по развитию бизнеса и экспертных проектов",
    result: "Финансовый результат: 150 000 Р за март + контракты и договоренности на следующие месяцы более чем на 300 000 Р.",
    image: "/premium-programs/cases/doc-case-03-belanova.jpg",
    points: [
      "выступила на заседании Ассоциации спикеров;",
      "взяла в работу блогера-миллионника;",
      "начала формировать команду будущего агентства;",
      "запустила регулярное ведение Telegram-канала;",
      "начала писать книгу;",
      "перестала бояться крупных клиентов и начала переход от личного консалтинга к агентской модели.",
    ],
  },
  {
    name: "Диана Семёнычева",
    role: "Лингвокоуч, AI-архитектор обучения",
    lead: "15+ лет обучала взрослых английскому языку.",
    result: "Результат: 550 000 Р.",
    image: "/premium-programs/cases/doc-case-04-diana.jpg",
    points: [
      "создала две новые продуктовые линейки;",
      "запустила продажи интенсивной программы;",
      "разработала концепцию новой профессии «Нейроэффективный языковой ментор»;",
      "получила запросы на премиальную личную работу.",
    ],
  },
  {
    name: "Максим Шаргородский",
    role: "Эксперт по построению отделов продаж",
    result: "Результат: 1 990 000 Р.",
    image: "/premium-programs/cases/doc-case-05-maksim.jpg",
    points: [
      "запустил мастер-группу по увеличению прибыли;",
      "усилил вовлеченность участников;",
      "выстроил более сильную продуктовую систему.",
    ],
  },
  {
    name: "Дания Ткачева",
    role: "Бизнес-консультант по управлению продажами",
    result: "Результат: 739 300 Р с запуска курса и 2,5 млн Р на групповом наставничестве.",
    image: "/premium-programs/cases/doc-case-06-daniya.jpg",
    points: [
      "создала флагманский курс;",
      "внедрила трехуровневую тарифную систему;",
      "выстроила продуктовую линейку на несколько лет вперед.",
    ],
  },
  {
    name: "Светлана Дуда",
    role: "Основатель Академии глубинного коучинга",
    result: "Результат: первый поток на 1,1 млн Р.",
    image: "/premium-programs/cases/doc-case-07-duda.jpg",
    points: [
      "упаковала авторскую методологию;",
      "создала систему подготовки менторов;",
      "разработала новый курс по собственному методу;",
      "запустила новое образовательное направление.",
    ],
  },
  {
    name: "Вадим Алиев",
    role: "Руководитель агентства «КурсМастер»",
    image: "/premium-programs/cases/doc-case-08-vadim.jpg",
    points: [
      "создал авторский курс по подготовке методологов;",
      "разработал курс-наставничество;",
      "собрал систему продуктов вокруг него.",
    ],
  },
  {
    name: "Мария Новаторова",
    role: "Автор метода музыкально-сенсорной терапии",
    lead: "построила продуктовую лестницу:",
    result: "Результат: 650 000 Р.",
    image: "/premium-programs/cases/doc-case-09-maria.jpg",
    points: [
      "трипваер,",
      "флагман,",
      "вторая ступень;",
      "выстроила систему продаж и команду",
    ],
  },
  {
    name: "Алиса Задорожная",
    role: "Фасилитатор, экс-маркетинг-директор Яндекс Дзена",
    lead: "Стало:",
    result: "Результат: 45 участников на 1,5 млн Р.",
    image: "/premium-programs/cases/doc-case-10-alisa.jpg",
    points: [
      "полностью пересобрала флагман;",
      "внедрила новую структуру обучения;",
      "усилила практику, домашние задания и геймификацию;",
      "сформировала основу продуктовой линейки.",
    ],
  },
  {
    name: "Ана Атман",
    role: "Основатель школы «Открытая Жизнь»",
    result: "Результат: 300 000 Р.",
    image: "/premium-programs/cases/doc-case-11-ana.jpg",
    points: [
      "пересобрала продуктовую линейку;",
      "запустила премиальный формат индивидуального сопровождения;",
      "создала систему удержания клиентов внутри образовательной экосистемы.",
    ],
  },
  {
    name: "Наталья Коваленко",
    role: "Психолог, коуч, автор трансформационных программ",
    result: "Результат: доход вырос в 2 раза за месяц.",
    image: "/premium-programs/cases/doc-case-12-natalya.jpg",
    points: [
      "создала новый авторский курс;",
      "определила его как будущий флагман онлайн-школы;",
      "подготовила запуск собственной образовательной платформы.",
    ],
  },
  {
    name: "Константин Воробьев",
    role: "Тренер по плаванию, основатель сети клубов по обучению взрослых плаванию",
    result: "На запуске программы удалось заработать — 1 990 000 Р",
    image: "/premium-programs/cases/doc-case-13-vorobyev.jpg",
    points: [
      "Разработан курс «Сила Воды» по обучению взрослых плаванию через ОНЛАЙН на 2 месяца обучения",
      "Проведен тестовый запуск с фокус-группой",
    ],
  },
];

const supportQuestions = [
  "Какой тариф выбрать?",
  "Подойдёт ли мне программа?",
  "Есть ли запись эфира?",
];

export default function Page() {
  return (
    <main className="site-shell">
      <ClientEffects />

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow" data-reveal>
            <span>Мастер-класс</span>
          </div>
          <h1 data-split>
            Методология создания и запуска<br />
            премиальных программ,<br />
            консалтинга и агентств<br />
            в реалиях 2026 года
          </h1>
          <p className="hero-lead" data-reveal>
            Охваты падают. Запуски приносят меньше результатов. Как не потерять
            выручку и продолжить расти?
          </p>
          <div className="hero-dates" data-stagger>
            {["Смотрите и внедряйте в своём темпе", "Доступ сразу после оплаты"].map(
              (item) => (
                <span key={item} data-item>
                  {item}
                </span>
              ),
            )}
          </div>
          <div className="hero-actions">
            <MotionCta className="btn-gold">Выбрать тариф</MotionCta>
          </div>
        </div>
        <div className="hero-visual" aria-label="Фото Александры">
          <img className="hero-art" src="/premium-programs/alexandra-hero.jpg" alt="Александра" />
          <div className="orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section className="section audience archive" id="for-whom">
        <div className="archive-head">
          <p>Если узнаёте себя хотя бы в одном досье — мастер-класс будет для вас полезен.</p>
        </div>
        <div className="archive-desk" data-archive>
          <span className="archive-line archive-line-a" aria-hidden="true" />
          <span className="archive-line archive-line-b" aria-hidden="true" />
          {audience.map((item, index) => (
            <article
              className="dossier-card"
              key={item.type}
              data-dossier
              style={{ "--rotate": `${[-0.7, 0.35, -0.45, 0.55, -0.35, 0.65][index]}deg` } as CSSProperties}
            >
              <img className="dossier-finished" src={`/premium-programs/dossiers/dossier-${index + 1}.webp`} srcSet={`/premium-programs/dossiers/dossier-${index + 1}-400.webp 400w, /premium-programs/dossiers/dossier-${index + 1}.webp 800w`} sizes="(max-width:680px) 90vw, (max-width:1100px) 44vw, 370px" width="800" height="1000" alt={`Иллюстрация досье: ${item.type}`} loading="lazy" />
              <div className="dossier-paper sr-only">
                <div className="paper-corner" aria-hidden="true" />
                <div className="paper-clip" aria-hidden="true" />
                <div className="dossier-top">
                  <div
                    className="avatar-stamp"
                    aria-hidden="true"
                    style={{ "--avatar-position": item.avatarPosition } as CSSProperties}
                  >
                    <span>{item.initials}</span>
                  </div>
                  <div>
                    <small>Досье №{String(index + 1).padStart(2, "0")}</small>
                    <strong>{item.type}</strong>
                  </div>
                  <em>Дело {24 + index}-{index + 7}</em>
                </div>
                <div className="dossier-section">
                  <span>Профиль</span>
                  <p>{item.profile}</p>
                </div>
                <div className="dossier-section">
                  <span>Что мешает</span>
                  <p>{item.symptom}</p>
                </div>
                <div className="dossier-footer">
                  <mark>Совпадение найдено</mark>
                  <i aria-hidden="true" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section transformation" aria-labelledby="transformation-title">
        <div className="transformation-head" data-reveal>
          <h2 id="transformation-title" data-split>Вот что изменится после МК</h2>
        </div>
        <div className="transformation-grid" data-transformation-grid>
          {transformations.map((item, index) => (
            <article className="transformation-card" key={item.before} data-transformation-card>
              <div className="change-columns">
                <div className="change-cell is-before" data-transformation-before>
                  <span>Было</span>
                  <p>{item.before}</p>
                </div>
                <div className="change-arrow" aria-hidden="true" data-transformation-arrow><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></div>
                <div className="change-cell is-after" data-transformation-after>
                  <span>Стало</span>
                  <p>{item.after}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section why cinematic" data-cinematic>
        <div className="cinematic-glow" aria-hidden="true" />
        <div className="cinematic-intro">
          <span className="kicker">Зачем идти</span>
          <h2 data-split>
            Рынок премиальных продуктов продолжает расти, «бутиковые продукты» также нужны аудитории,
            но такая аудитория теперь покупает по-другому.
          </h2>
        </div>
        <div className="act-stage">
          {agenda.map((item, index) => (
            <article className="act-card" key={item.title} data-act>
              <div className="act-frame" aria-hidden="true" />
              <span className="act-ghost">{String(index + 1).padStart(2, "0")}</span>
              <div className="act-meta">
                <small>{item.act}</small>
                <i>{index + 1}/5</i>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="act-cta" data-act-cta>
          <MotionCta className="btn-cream">Посмотреть тарифы</MotionCta>
        </div>
        <div className="scroll-hint" data-scroll-hint aria-hidden="true">
          <span />
        </div>
      </section>

      <TariffsSection />

      <section className="section cases">
        <div className="cases-head" data-reveal>
          <h2>У них получилось…</h2>
          <p>Листайте кейсы участников и смотрите, как они пересобирали продукты, запускали новые форматы и выходили на сильные результаты.</p>
        </div>
        <CasesSlider cases={cases} />
      </section>

      <section className="section host expert-section">
        <div className="host-portrait" data-host-photo>
          <img src="/premium-programs/newphoto.jpg" alt="Александра Горева-Куртышева" />
        </div>
        <div className="host-copy">
          <span className="kicker">Кто ведёт</span>
          <h2 data-split>Александра Горева-Куртышева</h2>
          <p>
            EdTech-предприниматель, основатель крупнейшей школы по методологии и методического агентства.
          </p>
          <div className="host-facts" data-host-facts>
            <span>С 2009 года в бизнес-обучении</span>
            <span>С 2020 — в онлайн-образовании</span>
            <span>Архитектор акселератора Бизнес 360 в Сбере</span>
            <span>40 000 участников</span>
            <span>Консультант Сбер, Роснефть, Норникель, Nestle, X5, ВкусВилл</span>
            <span>Выпускница Сколково. Резидент Клуба Первых</span>
          </div>
        </div>
      </section>

      <section className="final-cta support-section" data-support>
        <div className="support-copy">
          <span className="kicker">Остались вопросы?</span>
          <h2>Напишите нам в любой удобный мессенджер</h2>
          <p>Команда заботы поможет с тарифами, записью эфира и любыми вопросами по участию.</p>
          <div className="support-actions">
            <a href="https://agkedu.getcourse.ru/tg_subscribe">Телеграм</a>
            <a href="https://agkedu.getcourse.ru/max_subscribe">Макс</a>
            <a href="https://agkedu.getcourse.ru/vk_subscribe">ВКонтакте</a>
          </div>
        </div>
        <div className="support-phone-wrap">
          {supportQuestions.map((item, index) => (
            <span className={`flying-question flying-question-${index + 1}`} key={item} data-question>
              {item}
            </span>
          ))}
          <img src="/premium-programs/botagkclub-portrait.webp" alt="Служба заботы" />
        </div>
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <a className="footer-brand" href="#">
              Методология премиальных программ
            </a>
            <p>
              Онлайн-мастер-класс для экспертов и предпринимателей о премиальных программах, консалтинге
              и агентствах в реалиях 2026 года.
            </p>
          </div>
          <div>
            <h3>Данные</h3>
            <p>Индивидуальный предприниматель<br />Горева-Куртышева Александра Александровна<br />ИНН: 246212538610</p>
          </div>
          <div>
            <h3>Контакты</h3>
            <nav>
              <a href="tel:+79895421560">+7 (989) 542-15-60</a>
              <a href="https://agkedu.getcourse.ru/tg_subscribe">Телеграм</a>
              <a href="https://agkedu.ru/personaldata">Политика конфиденциальности</a>
              <a href="https://docs.google.com/document/d/1t6jZzRgC6MbYSxAhUuTf2HJbVIn9GXzp/edit?usp=sharing&ouid=112592013953206750379&rtpof=true&sd=true">
                Договор-оферта
              </a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Методология премиальных программ. Все права защищены.</p>
          <a href="https://t.me/lp_sergey">Разработка сайтов</a>
        </div>
      </footer>
    </main>
  );
}
