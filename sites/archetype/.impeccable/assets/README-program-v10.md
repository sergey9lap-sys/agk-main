# Три пробные рамки программы — v10

Режим: встроенный ImageGen, три отдельные генерации с transparent_background=true. Для локального сравнения, без распространения на весь сайт. Растровый декор не содержит текста: содержимое карточек остаётся HTML.

| Вариант | PNG и полный промпт | Изображение на сайте |
|---|---|---|
| Арочное окно | program-arch-v10.png / program-arch-v10.prompt.txt | ../../img/program-arch-v10.webp |
| Световая панель | program-light-v10.png / program-light-v10.prompt.txt | ../../img/program-light-v10.webp |
| Створка витража | program-vitrail-v10.png / program-vitrail-v10.prompt.txt | ../../img/program-vitrail-v10.webp |

Исходный каталог генераций: `C:/Users/User/.codex/generated_images/01a004a0-79b1-7bc0-84c2-39e98907cfbe/`.

- Арка: exec-7fb44839-1614-40e5-843f-ad2265bd7973.png
- Панель: exec-3ee61d23-cb50-4ef8-97ba-67956cad9aec.png
- Витраж: exec-66674097-747c-49fa-b3cd-1679ce526711.png

Подготовка: scripts/archetype-media.mjs, удаление прозрачных полей, ширина до 700px, WebP quality88/alpha100. Центры остаются прозрачными, интегрированный вид проверен на компьютере и телефоне. Форма рамки масштабируется под полноту текста.
