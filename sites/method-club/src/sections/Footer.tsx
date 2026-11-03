import { SUPPORT_LINKS } from "@/lib/constants";
import { getTelegramHref } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { widont } from "@/lib/typography";
import { Mail } from "lucide-react";

const legalLinks = [
  {
    label: "Договор-оферта",
    href: "https://agkedu.getcourse.ru/oferta_club",
  },
  {
    label: "Политика конфиденциальности",
    href: "https://agkedu.getcourse.ru/personaldata",
  },
];

const supportLinks = [
  {
    label: "Телеграм службы заботы",
    hrefType: "telegram",
  },
  {
    label: "Макс службы заботы",
    href: SUPPORT_LINKS.max,
  },
  {
    label: "ВКонтакте службы заботы",
    href: SUPPORT_LINKS.vk,
  },
] as const;

const footerNotes = [
  "Мастермайнд — «выдающийся ум», «вдохновитель» — это формат групповой работы, при котором участники регулярно встречаются для обмена опытом, генерации идей и взаимной поддержки в достижении личных или профессиональных целей. Это форма взаимного обучения, где каждый выступает и советчиком, и учеником.",
  "Золотой билет дает доступ к тарифу мастер-класса стоимостью до 2000 рублей.",
  "Годовой доступ = первые 6 месяцев оплачиваемого доступа + вторые 6 месяцев в подарок",
];

const developerLink = "https://t.me/lp_sergey";

export function Footer() {
  const tgUrl = getTelegramHref(
    process.env.NEXT_PUBLIC_TELEGRAM_SUPPORT || SUPPORT_LINKS.telegramHandle
  );
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,#120f0d_0%,#090909_100%)] py-12 lg:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-2/40 to-transparent" />
      <div className="pointer-events-none absolute left-[-120px] top-[-40px] h-64 w-64 rounded-full bg-gold-1/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[-60px] h-56 w-56 rounded-full bg-gold-2/6 blur-3xl" />
      <Container>
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Реквизиты */}
          <div className="space-y-4">
            <h3 className="font-heading text-[20px] md:text-h3 text-gold-2 mb-4">
              Реквизиты
            </h3>
            <div className="text-text-secondary text-small space-y-2">
              <p>Индивидуальный предприниматель</p>
              <p className="text-text-primary font-medium">
                Горева-Куртышева Александра Александровна
              </p>
              <p>ИНН: 246212538610</p>
            </div>
          </div>

          {/* Банковские реквизиты */}
          <div className="space-y-4">
            <h3 className="font-heading text-[20px] md:text-h3 text-gold-2 mb-4">
              Банк
            </h3>
            <div className="text-text-secondary text-small space-y-2">
              <p>ООО «Банк Точка»</p>
              <p>БИК: 044 525 104</p>
              <p>Р/с: 4080 2810 4065 0000 0883</p>
              <p>К/с: 3010 1810 7453 7452 5104</p>
            </div>
          </div>

          {/* Контакты и ссылки */}
          <div className="space-y-4">
            <h3 className="font-heading text-[20px] md:text-h3 text-gold-2 mb-4">
              Контакты
            </h3>
            <div className="text-text-secondary text-small space-y-3">
              <a
                href="mailto:info@agkedu.com"
                className="flex items-center gap-2 hover:text-gold-2 motion-safe:transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@agkedu.com
              </a>
              {supportLinks.map((link) => {
                const href = "hrefType" in link ? tgUrl || "#" : link.href;

                return (
                  <a
                    key={link.label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-gold-2 hover:text-gold-3 motion-safe:transition-colors"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 space-y-2">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-text-muted text-small hover:text-gold-2 motion-safe:transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/8 pt-6">
          <div className="max-w-4xl space-y-3 text-[12px] leading-6 text-text-muted md:text-[13px]">
            {footerNotes.map((note, index) => (
              <p key={note}>
                <span className="mr-2 font-medium text-gold-2">
                  {index === 0 ? "*" : index === 1 ? "**" : "***"}
                </span>
                {widont(note)}
              </p>
            ))}
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-card-border pt-8 text-center">
          <p className="text-text-muted text-small">
            {widont(`© ${year} МЕТОД:КЛУБ. Все права защищены.`)}
          </p>
          <a
            href={developerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-gold-2/30 px-4 py-2 text-small font-medium text-gold-2 hover:border-gold-2/60 hover:text-gold-3 motion-safe:transition-colors"
          >
            Разработка сайтов
          </a>
        </div>
      </Container>
    </footer>
  );
}
