"use client";

import { ReviewCarousel, ReviewCarouselItem } from "@/components/ReviewCarousel";

const combinedTestimonials: ReviewCarouselItem[] = [
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 1",
    imagePath: encodeURI("/method-club/images/Отзывы 4 слайд.png"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 2",
    imagePath: encodeURI("/method-club/images/Отзывы 4 слайд 2.png"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 3",
    imagePath: encodeURI("/method-club/images/Отзывы 4 слайд 3.png"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 4",
    imagePath: encodeURI("/method-club/images/Отзывы 4 слайд 4.png"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 5",
    imagePath: encodeURI("/method-club/images/Отзывы 4 слайд 5.png"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 6",
    imagePath: encodeURI("/method-club/images/Отзывы 4 слайд 6.png"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 7",
    imagePath: encodeURI("/method-club/optimized/6a9cdfd1886292.webp"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 8",
    imagePath: encodeURI("/method-club/optimized/cad2c3efac843a.webp"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 9",
    imagePath: encodeURI("/method-club/optimized/578fe6f09ce741.webp"),
  },
  {
    title: "Скриншот отзыва участника МЕТОД:КЛУБ 10",
    imagePath: encodeURI("/method-club/optimized/279f8618d1f01f.webp"),
  },
];

export function Testimonials() {
  return (
    <ReviewCarousel
      id="reviews"
      eyebrow="Отзывы"
      title="Отзывы участников экосистемы"
      items={combinedTestimonials}
    />
  );
}
