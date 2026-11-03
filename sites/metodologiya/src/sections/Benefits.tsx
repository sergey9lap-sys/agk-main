"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionBackground } from "@/components/SectionBackground";
import { ArrowRight, Briefcase, GraduationCap, Lightbulb, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const benefits = [
  {
    icon: GraduationCap,
    title: "Для экспертов",
    text: "Поймёте, как упаковать свой большой опыт в понятную и сильную образовательную систему.",
  },
  {
    icon: Briefcase,
    title: "Для предпринимателей",
    text: "Соберёте продуктовую линейку, которая не зависит от одного продукта и помогает масштабироваться.",
  },
  {
    icon: Users,
    title: "Для команд",
    text: "Разберётесь, как делегировать проверку домашних заданий и сопровождение учеников без потери качества.",
  },
  {
    icon: Lightbulb,
    title: "Для роста результата",
    text: "Сделаете обучение более ясным, а путь ученика — более сильным и предсказуемым по итогам.",
  },
];

export function Benefits() {
  return (
    <section className="relative overflow-hidden bg-bg py-12 lg:py-16">
      <SectionBackground
        src="/metodologiya/background/IMAGE 2026-05-05 01-31-01.jpg"
        variant="light"
        position="object-center"
      />
      <Container className="relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-8 max-w-4xl text-center lg:mb-10"
        >
          <h2 className="mb-4 font-heading text-3xl font-black uppercase text-text-primary lg:text-4xl">
            Что меняется после внедрения методологии
          </h2>
          <p className="text-lg text-text-secondary lg:text-xl">
            Методология помогает не просто “сделать курс”, а выстроить понятную
            систему продукта, команды и результата.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-orange-1 bg-orange-1 shadow-card-hover">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="group-icon rounded-xl bg-card-bg p-3 shadow-md">
                      <Icon className="h-6 w-6 text-orange-1" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-body text-white/90">{benefit.text}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mx-auto mt-8 max-w-4xl lg:mt-10"
        >
          <div className="rounded-2xl bg-orange-1 p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover lg:p-6">
            <p className="text-lg font-bold text-white lg:text-xl">
              Вы учитесь собирать продукт так, чтобы ученики доходили до
              результата, а не терялись в хаосе материала.
            </p>
            <a href="#pricing" className="mt-5 inline-flex">
              <Button variant="cream" size="lg">
                Смотреть тарифы
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
