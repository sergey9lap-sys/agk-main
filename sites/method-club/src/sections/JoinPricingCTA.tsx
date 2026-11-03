"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function JoinPricingCTA() {
  return (
    <section className="bg-bg py-8 sm:py-10">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          transition={{ duration: 0.45 }}
          className="mx-auto flex justify-center"
        >
          <a href="#pricing">
            <Button variant="primary" size="lg" className="w-full min-w-0 sm:min-w-[260px]">
              Я с вами
            </Button>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
