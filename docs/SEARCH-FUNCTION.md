# Поиск в проекте WhiteShop.am

Документ описывает, как реализован поиск в проекте. **Сторонние поисковые движки (Meilisearch, Algolia и т.п.) не используются** — только собственный поиск через Prisma и PostgreSQL.

---

## Текущая реализация

### Общая схема

- **Каталог товаров** (`/products`): поиск по строке `?search=...` обрабатывается API и сервисом `products-find-query`. Условие строится в Prisma (регистронезависимый `contains` по переводам и SKU).
- **Сервер:** Next.js API и сервисный слой → Prisma → PostgreSQL. Никаких внешних поисковых сервисов.

### Где реализовано

| Место | Описание |
|-------|----------|
| `src/lib/services/products-find-query/query-builder.ts` | Построение фильтра поиска для Prisma: `buildSearchFilter(search)` |
| `src/app/api/v1/products/route.ts` | API списка товаров, принимает параметр `search` |
| `src/app/products/page.tsx` | Страница каталога: передаёт `search` из URL в API |

### Логика поиска (query-builder)

Поиск по полям (OR, регистронезависимо, `mode: "insensitive"`):

- **Переводы товара:** `title`, `subtitle`
- **Варианты:** `sku`

Условие добавляется в общий `where` вместе с фильтрами категории, бренда и т.д.

---

## Вариант «хороший или лучше»

**Текущий вариант (собственный поиск через Prisma) — хороший и достаточный** для типичного каталога на Vercel:

- Нет зависимостей от внешнего поискового сервиса (ни хостинг, ни лимиты).
- Один источник правды — PostgreSQL; не нужно синхронизировать индекс.
- Регистронезависимый поиск по названию, подзаголовку и SKU покрывает большинство сценариев.
- Подходит для объёма в тысячи товаров при нормальных индексах БД.

**Когда имеет смысл подключать Meilisearch/Algolia:**

- Очень большой каталог (десятки/сотни тысяч позиций) и жёсткие требования к скорости и релевантности.
- Нужны подсказки (autocomplete), исправление опечаток, фасетный поиск «из коробки».

**Итог:** для WhiteShop.am оставляем собственный поиск через Prisma — этого достаточно. При росте требований можно отдельно добавить instant search в хедере (см. ниже) или позже рассмотреть внешний движок.

---

## Instant Search (поиск по мере ввода в хедере)

**Реализован** через `GET /api/search/instant` с debounce на клиенте (`useInstantSearch`).

### Контракт API

- Query: `q` (обяз.), `lang` (`en|hy|ru`, optional), `limit` (legacy alias для `productLimit`), `productLimit`, `categoryLimit`.
- Response:
  - `results[]` — товары (slug/title/price/image/category/href),
  - `categories[]` — категории (slug/title/fullPath/href),
  - `suggestions[]` — объединённый список подсказок (`type = product|category`) для быстрого dropdown UX.
- Поиск делается через Prisma/PostgreSQL без внешнего движка.

### Ключевые файлы

| Файл | Назначение |
|------|------------|
| `src/components/hooks/useInstantSearch.ts` | Хук: состояние, debounce, fetch к API, навигация с клавиатуры |
| `src/app/api/search/instant/route.ts` | API endpoint: parse query-параметры и вернуть `results + categories + suggestions` |
| `src/lib/services/instant-search.service.ts` | Бизнес-логика поиска товаров+категорий, сбор `suggestions` |
| `src/components/SearchDropdown.tsx` | UI выпадающего списка (карточки, лоадер, ссылка «Տեսնել բոլորը» на `/products?search=...`) |
| Хедер (DesktopHeader / MobileHeader или общий Header) | Инпут + хук + SearchDropdown, Enter → `/products?search=...` |

### Важно

- Отмена предыдущего запроса через `AbortController` при новом вводе.
- Без кэша ответа, чтобы новые товары из админки сразу отображались.
- Доступность: `aria-controls`, `aria-expanded`, `role="listbox"`, `role="option"`.

Категории и suggestions уже доступны в API-контракте для дальнейшего расширения UI (например, смешанный dropdown с товарами и категориями).

---

*Документ актуален для WhiteShop.am. Meilisearch из проекта удалён; используется только собственный поиск через Prisma.*
