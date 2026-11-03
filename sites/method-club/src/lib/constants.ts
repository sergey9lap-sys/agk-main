export const PRICING = {
  month: { oldPrice: 9900, price: 3990, perDay: 167 },
  year: { oldPrice: 99900, price: 39900, perDay: 137 },
  visioners: { oldPrice: 1000000, price: 550000, perDay: null },
};

export const PAYMENT_LINKS = {
  month: "https://agkedu.getcourse.ru/club_month_3990",
  year: "https://agkedu.getcourse.ru/club_year_39900",
  testWeek: "https://agkedu.getcourse.ru/club_test",
} as const;

export const SUPPORT_LINKS = {
  telegram: "https://t.me/agkclub_bot",
  telegramHandle: "@agkclub_bot",
  max: "https://max.ru/u/f9LHodD0cOK_cBnuaMlteniuxCkpaNEl0jIez15BMU_5_UuWL9tSUYw_rZc",
  vk: "https://agkedu.getcourse.ru/vk_subscribe",
} as const;

export const formatPrice = (price: number): string => {
  return price.toLocaleString("ru-RU") + " ₽";
};
