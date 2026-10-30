# Мастер-класс в записи: /premium-programs/

Страница в AGK main для RU/COM. Исходники app/src/public перенесены из mkproduct-recording редакции 6. Плашки hero стоят в один ряд на desktop, кнопка поднята. Типографика, фотографии и кейсы сохранены. На узких экранах плашки естественно переносятся, чтобы не обрезать текст.

Next.js: статический экспорт с basePath `/premium-programs`. Для обновления из каталога сайта: `pnpm install --frozen-lockfile --ignore-scripts`, затем `pnpm run build`. Из корня: `node scripts/package-premium-export.mjs`, затем `node scripts/build.mjs ru` и `node scripts/build.mjs com`. Папка export содержит готовый сайт и версионируется. Общая сборка AGK копирует её без повторного запуска Next для каждого региона.

Новый платёжный виджет пока не предоставлен: кнопка «Получить доступ» отключена. Старые формы с неактуальными ценами не перенесены. Выдача доступа и письмо настраиваются в GetCourse отдельно.
