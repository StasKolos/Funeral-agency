# Funeral Agency

Сайт ритуального агентства "Грань ДВ" с отдельными frontend, backend, базой данных и S3-совместимым хранилищем изображений.

## Стек

- Frontend: Next.js, React, TypeScript, TanStack Query, Axios, SCSS modules.
- Backend: NestJS, TypeScript, Prisma, PostgreSQL.
- Storage: MinIO, S3-compatible object storage для изображений товаров.
- Infrastructure: Docker Compose для локальных Postgres и MinIO.

Рекомендуемые версии:

- Node.js: `>=20.9`, лучше Node `24`.
- npm: `>=10`.
- Docker Desktop / Docker Engine с Compose plugin.

## Структура

```text
funeral-agency/
  frontend/          Next.js приложение
  backend/           NestJS API
  docker-compose.yml Postgres и MinIO для разработки
```

Backend отдает категории и товары через API. Товары и категории хранятся в PostgreSQL. Картинки товаров лежат в MinIO, а в базе хранится только `imageKey`.

## Первый запуск

Установить зависимости:

```
cd backend
npm ci

cd ../frontend
npm ci
```

Поднять Postgres и MinIO из корня проекта:

```
docker compose up -d
```

Применить миграции и сгенерировать Prisma Client:

```
cd backend
npx prisma migrate deploy
npx prisma generate
```

## Запуск в разработке

```
docker compose up -d
```

```
cd backend
npm run start:dev
```

Backend будет доступен на `http://127.0.0.1:3001`.

```
cd frontend
npm run dev
```

Frontend будет доступен на `http://localhost:3000`.

Frontend ходит к backend через proxy `/api/backend/*`, который настроен в `frontend/next.config.mjs`.

## Отправка заказов на почту

Заказы отправляет backend через SMTP. Для ящика `z-l00@bk.ru` добавьте в
`backend/.env`:

```dotenv
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=z-l00@bk.ru
SMTP_PASSWORD=пароль_для_внешнего_приложения
MAIL_FROM="Грань ДВ <z-l00@bk.ru>"
ORDER_RECIPIENT_EMAIL=z-l00@bk.ru
```

Для `SMTP_PASSWORD` нужен отдельный пароль для внешнего приложения, а не основной
пароль от почты. Если почтовый провайдер изменится, достаточно заменить SMTP-параметры
без изменений в коде заказа.

## Проверки

Backend:

```
cd backend
npm run typecheck
npm run lint
npm run build
npm audit
```

Frontend:

```
cd frontend
npm run typecheck
npm run lint
npm run build
npm audit
```

## Production

На сервере приложение работает из `/var/www/funeral-agency`.

Основные процессы:

- `funeral-agency` - frontend Next.js.
- `funeral-agency-backend` - backend NestJS.
- `postgres` и `minio` - через Docker Compose.
- nginx проксирует публичный сайт на frontend и `/storage/*` на MinIO.

Перед деплоем нужно:

1. Забрать свежий код из `main`.
2. Установить зависимости.
3. Выполнить Prisma migrations/generate.
4. Собрать backend и frontend.
5. Перезапустить systemd-сервисы.

## Данные

- PostgreSQL хранит категории и товары.
- MinIO хранит изображения товаров.
- Backup должен включать код, дамп PostgreSQL и данные MinIO.

### Цены товаров

Цены из таблицы поставщика сохранены в `backend/prisma/data/product-prices.json`.
Импорт сопоставляет товары по категории и артикулу, проверяет полный список и
изменяет только цену. По умолчанию выполняется проверка без записи:

```sh
cd backend
node scripts/update-product-prices.mjs --input prisma/data/product-prices.json
```

Для применения нужен отдельный путь к резервной копии существующих товаров:

```sh
node scripts/update-product-prices.mjs --input prisma/data/product-prices.json --apply --backup /safe/path/product-prices-before.json
```

Скрипт рассчитан на подключение к локальной БД, в том числе при запуске на сервере.
Перед production-импортом также создайте полный дамп PostgreSQL.
Минимальная цена категории рассчитывается автоматически по её товарам.
Цены стелл С-397–С-416 пока временные: 92 000–100 000 ₽.
