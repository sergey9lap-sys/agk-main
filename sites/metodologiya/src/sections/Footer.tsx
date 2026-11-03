import { Container } from "@/components/ui/Container";
import { MessageCircle, MessagesSquare, Phone, Send } from "lucide-react";

const footerLinks = [
  { label: "О курсе", href: "#about" },
  { label: "Программа", href: "#program" },
  { label: "Тарифы", href: "#pricing" },
  { label: "Вопросы", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

const legalLinks = [
  {
    label: "Лицензия",
    href: "https://islod.obrnadzor.gov.ru/rlic/details/6009a6d6-0d6f-7d9f-197f-9f9286292347/",
  },
  {
    label: "Договор-оферта",
    href: "https://agkedu.getcourse.ru/oferta_methodology",
  },
  {
    label: "Политика конфиденциальности",
    href: "https://agkedu.getcourse.ru/personaldata",
  }
];

const contactLinks = [
  {
    label: "+7 (989) 542-15-60",
    href: "tel:+79895421560",
    icon: Phone,
  },
  {
    label: "Telegram",
    href: "https://agkedu.getcourse.ru/tg_subscribe",
    icon: Send,
  },
  {
    label: "MAX",
    href: "https://agkedu.getcourse.ru/max_subscribe",
    icon: MessagesSquare,
  },
  {
    label: "ВКонтакте",
    href: "https://agkedu.getcourse.ru/vk_subscribe",
    icon: MessageCircle,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#080808] py-10 lg:py-12">
      <Container className="relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr_1fr] gap-8 lg:gap-10">
          <div className="space-y-4 text-center lg:text-left">
            <a
              href="#"
              className="inline-block font-sans font-black text-2xl text-text-primary uppercase tracking-tight"
            >
              МЕТОДОЛОГИЯ
            </a>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
              Академия Методологии. Обучение, поддержка и сопровождение экспертов
              и предпринимателей в сфере образовательных продуктов.
            </p>
            <div className="text-white/70 text-sm leading-relaxed space-y-1">
              <p>Индивидуальный предприниматель</p>
              <p>Горева-Куртышева Александра Александровна</p>
              <p>ИНН: 246212538610</p>
            </div>
          </div>

          <div className="space-y-4 text-center lg:text-left">
            <h3 className="font-heading font-bold text-2xl text-white uppercase">
              Навигация
            </h3>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-orange-1 transition-colors text-sm font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-4 text-center lg:text-left">
            <h3 className="font-heading font-bold text-2xl text-white uppercase">
              Контакты
            </h3>
            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:grid-cols-4 lg:grid-cols-2">
              {contactLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="min-w-0 overflow-hidden flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-3 text-[13px] font-semibold text-white/80 transition-all hover:-translate-y-0.5 hover:border-orange-1 hover:text-orange-1 sm:text-sm lg:justify-start"
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="min-w-0 whitespace-nowrap">{link.label}</span>
                  </a>
                );
              })}
            </div>
            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-white/70 hover:text-orange-1 transition-colors text-sm font-semibold"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm text-center lg:text-left">
            &copy; 2026 Академия Методологии. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
            <a
              href="https://t.me/lp_sergey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white/70 transition-colors hover:text-orange-1"
            >
              Разработка сайтов
            </a>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-orange-1 transition-colors text-sm font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
