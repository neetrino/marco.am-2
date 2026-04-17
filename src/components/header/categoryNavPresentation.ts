import type { LucideIcon } from 'lucide-react';
import {
  DoorOpen,
  GlassWater,
  HandMetal,
  Package,
  PanelsTopLeft,
  Refrigerator,
  Tv,
  WashingMachine,
  Wind,
} from 'lucide-react';
import type { LanguageCode } from '../../lib/language';

type LabelSet = {
  readonly hy: string;
  readonly en: string;
  readonly ru: string;
};

/**
 * Root nav rows aligned with Figma 218:4894 (icons + copy per locale).
 * `slugs` — any English/slug variant that should pick this row (lowercased).
 */
const NAV_ROWS: ReadonlyArray<{
  readonly slugs: readonly string[];
  readonly Icon: LucideIcon;
  readonly labels: LabelSet;
}> = [
  {
    slugs: [
      'furniture-hardware',
      'furniture-accessories',
      'cabinet-hardware',
      'furniture-making',
      'kkhuyqi-patrastman',
    ],
    Icon: DoorOpen,
    labels: {
      hy: 'Կահույքի պատրաստման պարագաներ',
      en: 'Furniture manufacturing accessories',
      ru: 'Фурнитура и комплектующие для мебели',
    },
  },
  {
    slugs: ['furniture', 'kkhuyq', 'home-furniture'],
    Icon: PanelsTopLeft,
    labels: {
      hy: 'Կահույք',
      en: 'Furniture',
      ru: 'Мебель',
    },
  },
  {
    slugs: [
      'large-appliances',
      'major-appliances',
      'white-goods',
      'washing-machines',
      'khshor-kentsaghayin-tekhnika',
    ],
    Icon: WashingMachine,
    labels: {
      hy: 'Խոշոր կենցաղային տեխնիկա',
      en: 'Large home appliances',
      ru: 'Крупная бытовая техника',
    },
  },
  {
    slugs: ['kitchen-appliances', 'kitchen', 'patuhanakan-tekhnika', 'refrigerators'],
    Icon: Refrigerator,
    labels: {
      hy: 'Խոհանոցային տեխնիկա',
      en: 'Kitchen appliances',
      ru: 'Кухонная техника',
    },
  },
  {
    slugs: [
      'audio-video',
      'tv-audio',
      'televisions',
      'audio-and-video',
      'audiovideo',
    ],
    Icon: Tv,
    labels: {
      hy: 'Աուդիո և վիդեո համակարգեր',
      en: 'Audio and video systems',
      ru: 'Аудио- и видеотехника',
    },
  },
  {
    slugs: ['water-dispensers', 'water-coolers'],
    Icon: GlassWater,
    labels: {
      hy: 'Ջրի դիսպենսերներ',
      en: 'Water dispensers',
      ru: 'Кулеры и диспенсеры воды',
    },
  },
  {
    slugs: [
      'home-appliances',
      'small-appliances',
      'household-appliances',
      'kentsaghayin-tekhnika',
    ],
    Icon: HandMetal,
    labels: {
      hy: 'Կենցաղային տեխնիկա',
      en: 'Home appliances',
      ru: 'Мелкая бытовая техника',
    },
  },
  {
    slugs: [
      'air-conditioners',
      'climate',
      'hvac',
      'heaters',
      'odorakichner',
    ],
    Icon: Wind,
    labels: {
      hy: 'Օդորակիչներ և տաքացուցիչներ',
      en: 'Air conditioners and heaters',
      ru: 'Кондиционеры и обогреватели',
    },
  },
];

const SLUG_TO_ROW = new Map<string, (typeof NAV_ROWS)[number]>();
for (const row of NAV_ROWS) {
  for (const s of row.slugs) {
    SLUG_TO_ROW.set(s.toLowerCase(), row);
  }
}

function labelForLang(labels: LabelSet, lang: LanguageCode): string {
  if (lang === 'hy') {
    return labels.hy;
  }
  if (lang === 'ru') {
    return labels.ru;
  }
  if (lang === 'ka') {
    return labels.en;
  }
  return labels.en;
}

export function resolveCategoryNavPresentation(
  slug: string,
  apiTitle: string,
  lang: LanguageCode
): { readonly title: string; readonly Icon: LucideIcon } {
  const row = SLUG_TO_ROW.get(slug.trim().toLowerCase());
  if (!row) {
    return { title: apiTitle, Icon: Package };
  }
  return { title: labelForLang(row.labels, lang), Icon: row.Icon };
}
