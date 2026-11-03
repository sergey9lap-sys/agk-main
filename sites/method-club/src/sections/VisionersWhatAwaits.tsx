"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const items = [
  {
    title: "Квартальное планирование с Александрой",
    text: "Раз в три месяца — личная стратегическая сессия с Сашей. Не общий вебинар на 100 человек, а работа над вашими задачами. Вы получаете живую обратную связь от человека, который ведет корпорации из ТОП-200 Forbes и крупнейшие онлайн-школы",
  },
  {
    title: "Встречи с игроками, которые уже прошли ваш путь",
    text: "Закрытые встречи с крутыми гостями — основателями миллиардных бизнесов, топ-методологами, визионерами рынка. Вы не слушаете их на конференциях. Вы общаетесь лично, задаете вопросы и забираете контакты",
  },
  {
    title: "Экскурсии в компании с многомиллиардным оборотом",
    text: "Мы не рассказываем теории. Мы показываем, как устроены бизнесы изнутри. Вы увидите кухню лидеров рынка, познакомитесь с их командами и заберете практики, которые работают",
  },
  {
    title: "Работа в пятерках равных",
    text: "Мы подберем вам микро-группу из предпринимателей вашего уровня. Без наставничества сверху — чистая взаимная поддержка, обмен опытом и удержание ответственности",
  },
];

export function VisionersWhatAwaits() {
  return (
    <section className="bg-bg section-compact">
      <Container>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="section-title--gold text-center"
        >
          Вот что вас ждёт:
        </motion.h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="hover-lift-card rounded-[28px] border border-gold-2/22 bg-[radial-gradient(circle_at_top_right,rgba(240,212,165,0.12),transparent_24%),linear-gradient(180deg,rgba(24,20,16,0.96),rgba(11,10,9,0.98))] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:p-6"
            >
              <h3 className="card-title--gold min-h-[72px] text-[24px] sm:min-h-[88px] sm:text-[30px]">
                {item.title}
              </h3>
              <p className="card-copy mt-5 text-text-secondary sm:text-[18px]">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
