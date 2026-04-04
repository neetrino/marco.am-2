'use client';

// ─── Figma brand logo assets ───────────────────────────────────────────────────
const HISENSE = 'https://www.figma.com/api/mcp/asset/d5dafee6-3418-4a1f-a871-edf133c13a97';
const SAMSUNG = 'https://www.figma.com/api/mcp/asset/55ec3bcb-b38f-48a2-a604-466ec9f8cc92';
const LG = 'https://www.figma.com/api/mcp/asset/b05e6ee0-5b5a-4290-b1c7-d47cd2220782';
const PANASONIC = 'https://www.figma.com/api/mcp/asset/4baacd4d-f84d-4c9c-bb34-42a8c8dc553d';

// ─── Nav arrows ────────────────────────────────────────────────────────────────
const ARROW_LEFT = 'https://www.figma.com/api/mcp/asset/9895c71e-da9a-4a71-a49f-50d93a2919e5';
const ARROW_RIGHT = 'https://www.figma.com/api/mcp/asset/21d5d0cb-1fdb-40d3-889a-508756ebf13b';

const brands = [
  { name: 'Hisense', logo: HISENSE, logoW: 324, logoH: 52 },
  { name: 'Samsung', logo: SAMSUNG, logoW: 281, logoH: 93 },
  { name: 'LG', logo: LG, logoW: 234, logoH: 107 },
  { name: 'Panasonic', logo: PANASONIC, logoW: 329, logoH: 53 },
];

export function BrandsSection() {
  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px]">
      {/* ── Section header: բREND NER ── */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2
            className="font-montserrat font-bold uppercase text-[#181111] leading-none"
            style={{ fontSize: 'clamp(22px, 2.813vw, 54px)', letterSpacing: '-0.6px' }}
          >
            <span className="text-[#ffca03]">բREND</span>NER
          </h2>
          <div className="h-[4px] w-[104px] bg-[#ffca03] mt-2" />
        </div>
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center rounded-full border border-[#e5e7eb] hover:bg-[#ffca03] hover:border-[#ffca03] transition-colors"
            style={{ width: 51, height: 40 }}
            aria-label="Previous"
          >
            <img src={ARROW_LEFT} alt="" aria-hidden className="w-[7px] h-[12px]" />
          </button>
          <button
            className="flex items-center justify-center rounded-full border border-[#e5e7eb] hover:bg-[#ffca03] hover:border-[#ffca03] transition-colors"
            style={{ width: 51, height: 40 }}
            aria-label="Next"
          >
            <img src={ARROW_RIGHT} alt="" aria-hidden className="w-[7px] h-[12px]" />
          </button>
        </div>
      </div>

      {/* ── Brand logo cards ── */}
      {/*
        Figma: 4 cards, each 364×144 px, gap=26px, rounded-[32px], bg=#f6f6f6.
        Logo images are vertically/horizontally centered inside.
      */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[26px]">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex items-center justify-center bg-[#f6f6f6] rounded-[32px] cursor-pointer hover:shadow-md transition-shadow"
            style={{ height: 143.52 }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="object-contain"
              style={{
                maxWidth: '85%',
                maxHeight: '70%',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
