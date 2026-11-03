"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function GiftCertificates() {
  return (
    <section className="bg-bg py-12 lg:py-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto p-6 lg:p-8 rounded-card bg-card-bg/50 border border-card-border flex flex-col md:flex-row items-center gap-6"
        >
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-gold-1/20 flex items-center justify-center">
              <Gift className="w-7 h-7 text-gold-2" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="font-heading text-[20px] md:text-h3 text-text-primary mb-2">
              Подарочные сертификаты
            </h3>
            <p className="text-text-secondary text-small">
              Подарите МЕТОД:КЛУБ коллеге или другу-эксперту. Сертификаты доступны на месяц и на год с сохранением всех бонусов.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Button
              variant="secondary"
              onClick={() => {
                const url = process.env.NEXT_PUBLIC_CERT_YEAR_URL;
                if (url) window.open(url, "_blank");
              }}
            >
              Подарить
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
