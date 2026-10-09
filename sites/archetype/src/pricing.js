export const tiers = {
  1: { name:'Базовый', prices:[1900,2900,3900] },
  2: { name:'Полный', prices:[5900,7900,9900] },
  3: { name:'Личный', prices:[29900,32900,35900] }
};
export const priceDates = ['2026-10-16T00:00:00+03:00','2026-10-19T00:00:00+03:00'];
export function priceStage(date = new Date()) {
  const time = +date;
  return time >= Date.parse(priceDates[1]) ? 2 : time >= Date.parse(priceDates[0]) ? 1 : 0;
}
export function priceFor(tier, date = new Date()) {
  if(!Object.hasOwn(tiers,tier)) throw new RangeError('Unknown tariff');
  return tiers[tier].prices[priceStage(date)];
}
export function formatPrice(price) {
  return new Intl.NumberFormat('ru-RU').format(price) + ' Р';
}
