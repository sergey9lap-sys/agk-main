# Подарок и прозрачная форма — 19.10.2026

## Карта изменений
- Hero, основной блок подарка, финальная секция: прежний гайд → «15 механик, которые усиливают продажи».
- Основной блок: описание заменено дословно предоставленным пользователем; «В подарок за регистрацию» сохранено.
- Все три изображения → один guide-sales-v3.webp, оригинал guide.webp сохранён.
- Страница «Спасибо»: то же новое название, прежние ссылки и сценарий регистрации сохранены.
- Формы: убрана принудительная светлая схема оболочки, вызвавшая белую подложку вокруг прозрачного GetCourse. Никакого кадрирования, скрытия согласий или изменения отправки.
- PDF: отдельная копия с кликабельной кнопкой на последней странице; исходные 14 страниц, текст и ссылки сохранены. URL из прежнего PDF: https://agkedu.getcourse.ru/tg_subscribe.
- Остальные секции, фото, дата, аналитика, региональные ID виджетов и диван не изменены.

## Обложка
Встроенный ImageGen, редактирование исходного макета. Результат: public/assets/atelier-v2/guide-sales-v3.webp, 880×880, прозрачный, 83 842 байта.

Prompt: Edit target: attached brown leather guide mockup. Use case text-localization. Preserve exactly the single book, perspective, brown leather texture, gold ornament border, warm gold typography, sharp edges and transparent background. Replace ONLY cover lettering. Small top label remains «ГАЙД». Large number remains «15». Below it exact Russian text on three centered lines: «механик,», «которые усиливают», «продажи». Entire title must read «15 механик, которые усиливают продажи». Remove all old words about игровых and покупки. No extra text, logos or objects. High quality product mockup for same autumn website.

## Граница результата
Проверка: обе региональные сборки успешны, 18 тестов прошли. Форма без белого фона визуально проверена на desktop и mobile; новый блок подарка проверен на mobile. PDF отрендерен после изменения, кнопка не перекрывает прежние ссылки и подпись автора; автоматическая проверка сохранила содержимое первых 13 страниц и все прежние аннотации.

Локальная правка; публикация, изменение рассылки и загрузка PDF в GetCourse не выполнялись. Наличие файла не подтверждает автоматическую выдачу. Формы не отправлялись.
