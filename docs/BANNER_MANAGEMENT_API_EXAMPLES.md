# Banner Management API Examples

Admin banner configuration is stored in `settings.key = banners`.

## Slots

Allowed `slot` values:

- `home.hero.primary`
- `home.hero.secondary`
- `home.promo.strip`
- `catalog.top`
- `catalog.sidebar`

## Admin — GET configuration

`GET /api/v1/supersudo/banners`

Returns full stored document:

```json
{
  "version": 1,
  "banners": [
    {
      "id": "hero-primary-spring-2026",
      "slot": "home.hero.primary",
      "title": {
        "en": "Spring Sale",
        "hy": "Գարնանային Զեղչ",
        "ru": "Весенняя распродажа"
      },
      "imageDesktopUrl": "https://cdn.shop.am/banners/spring-hero-desktop.jpg",
      "imageMobileUrl": "https://cdn.shop.am/banners/spring-hero-mobile.jpg",
      "link": {
        "href": "/products?sale=true",
        "openInNewTab": false
      },
      "schedule": {
        "startsAt": "2026-04-20T00:00:00.000Z",
        "endsAt": "2026-05-01T00:00:00.000Z"
      },
      "active": true,
      "sortOrder": 0
    }
  ]
}
```

## Admin — PUT configuration (replace document)

`PUT /api/v1/supersudo/banners`

Payload shape is identical to GET response.

Validation rules:

- `link.href` can be relative (`/products`), hash (`#promo`), `http(s)` URL, or `mailto:`.
- `javascript:` and `data:` links are rejected.
- if both `startsAt` and `endsAt` are set, then `endsAt` must be greater than `startsAt`.
- inactive banners (`active: false`) stay stored but are hidden from public API.

## Public — GET active banners by slot

`GET /api/v1/banners?slot=<slot>&locale=<en|hy|ru>[&at=<ISO8601>]`

Example:

`GET /api/v1/banners?slot=home.hero.primary&locale=hy`

Response:

```json
{
  "slot": "home.hero.primary",
  "generatedAt": "2026-04-18T14:36:00.000Z",
  "items": [
    {
      "id": "hero-primary-spring-2026",
      "slot": "home.hero.primary",
      "title": "Գարնանային Զեղչ",
      "imageDesktopUrl": "https://cdn.shop.am/banners/spring-hero-desktop.jpg",
      "imageMobileUrl": "https://cdn.shop.am/banners/spring-hero-mobile.jpg",
      "link": {
        "href": "/products?sale=true",
        "openInNewTab": false
      },
      "sortOrder": 0
    }
  ]
}
```

Public filtering behavior:

- only banners with matching `slot`
- only `active: true`
- only banners currently inside schedule window
- sorted by `sortOrder` ascending (then `id`)
