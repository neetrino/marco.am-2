'use client';

// ─── Figma assets ──────────────────────────────────────────────────────────────
// LEFT card (Group 9270): dark blue bg (#2f4b5d), sofa product, "ΓNEL HIMA" button
const SOFA_CARD_BG = 'https://www.figma.com/api/mcp/asset/206f4d9a-d736-4fee-bf50-173cca2fae20';
const SOFA_PRODUCT = 'https://www.figma.com/api/mcp/asset/857899db-2937-44cc-b57c-120b6093902d';
const SOFA_SHADOW = 'https://www.figma.com/api/mcp/asset/8f8d5212-4946-4429-8ed7-b221083fe2b7';
const BTN_ARROW = 'https://www.figma.com/api/mcp/asset/c2466267-2f7a-4324-a3ab-73ae2a1839c7';

// RIGHT card (Group 9131): light blue-gray bg, smartphone accessories, logo, "AVELYIN" button
const PHONE_CARD_BG = 'https://www.figma.com/api/mcp/asset/27915ec2-c028-463a-8fff-4196f45a5179';
const MARCO_LOGO = 'https://www.figma.com/api/mcp/asset/a053db6b-e8b3-4bfe-b4ed-ee8e84cc1909';

export function PromoCardsSection() {
  return (
    /*
      Figma: two rows of promo cards stacked below each other:
        Group 9270 (left/bottom sofa): x=192, y=4912, w=558, h=566
        Group 9131 (right phones card): x=784, y=5110, w=943, h=368
      Both span y=4912–5478.

      Layout: two side-by-side cards, heights determined by Figma proportions.
      Left card: ~37% width, right card: ~63% width. Gap=26px.
    */
    <section className="bg-white px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px] py-6">
      <div className="flex flex-col md:flex-row gap-[26px]" style={{ minHeight: 368 }}>

        {/* ── LEFT promo card: Sofa ── */}
        {/*
          Figma Group 9270: w=558, h=566.
          bg: #2f4b5d dark blue rounded-[20px].
          Sofa floats above, "ΓNEL HIMA" yellow button + product label.
        */}
        <div
          className="relative rounded-[20px] overflow-hidden flex-shrink-0 flex flex-col justify-end"
          style={{
            width: '100%',
            maxWidth: 558,
            minHeight: 368,
            background: '#2f4b5d',
          }}
        >
          {/* Background overlay image */}
          <img
            src={SOFA_CARD_BG}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          {/* Sofa product image — floats in upper-center area */}
          <img
            src={SOFA_PRODUCT}
            alt="Sofa"
            className="absolute left-1/2 -translate-x-1/2 object-contain pointer-events-none"
            style={{ top: '-5%', width: '90%', height: '75%' }}
          />

          {/* Sofa shadow */}
          <img
            src={SOFA_SHADOW}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{ left: '10%', top: '55%', width: '80%' }}
          />

          {/* Bottom bar with button + label */}
          <div className="relative z-10 flex items-center justify-between px-5 pb-5 pt-4">
            <button
              className="flex items-center gap-2 bg-[#facc15] font-montserrat font-bold rounded-[68px] hover:bg-yellow-400 transition-colors"
              style={{ height: 64, paddingLeft: 20, paddingRight: 8, fontSize: 16, whiteSpace: 'nowrap' }}
            >
              ΓNЭЛ ՀIМА
              <span
                className="flex items-center justify-center bg-black rounded-full text-white flex-shrink-0"
                style={{ width: 48, height: 48, fontSize: 18 }}
              >
                ↗
              </span>
            </button>
            <p className="font-montserrat text-white text-right ml-4" style={{ fontSize: 16, lineHeight: 1.49 }}>
              Ankiunain bazmoc<br />Беллини
            </p>
          </div>
        </div>

        {/* ── RIGHT promo card: Smartphones ── */}
        {/*
          Figma Group 9131: w=943, h=368, bg=#e6eaf6 light blue-gray, rounded-[20px].
          Left side: logo + "Nor serndi smartphoner" text + "AVELYIN" button.
          Right side: product accessories photo.
        */}
        <div
          className="relative rounded-[20px] overflow-hidden flex-1 flex items-stretch"
          style={{ minHeight: 368, background: '#e6eaf6' }}
        >
          {/* Right side: product image */}
          <div
            className="absolute right-0 top-0 bottom-0 rounded-r-[20px] overflow-hidden"
            style={{ width: '55%' }}
          >
            <img
              src={PHONE_CARD_BG}
              alt="Smartphone accessories"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Left side content */}
          <div className="relative z-10 flex flex-col justify-center pl-8 pr-4 py-8" style={{ width: '45%' }}>
            {/* Marco Group logo */}
            <img
              src={MARCO_LOGO}
              alt="Marco Group"
              className="mb-4 object-contain"
              style={{ width: 'clamp(80px, 9.479vw, 182px)' }}
            />

            {/* "Nor serndi smartphoner" heading */}
            <h3
              className="font-montserrat font-black text-black uppercase leading-tight mb-6"
              style={{ fontSize: 'clamp(16px, 1.563vw, 30px)' }}
            >
              Nor<br />serndi<br />smartphoner
            </h3>

            {/* "AVELYIN" black button */}
            <button
              className="flex items-center gap-2 bg-black font-montserrat font-bold text-white rounded-[68px] hover:bg-gray-800 transition-colors"
              style={{ height: 64, paddingLeft: 20, paddingRight: 8, fontSize: 16, whiteSpace: 'nowrap', width: 'fit-content' }}
            >
              AVELYIN
              <span
                className="flex items-center justify-center bg-[#facc15] rounded-full text-black flex-shrink-0"
                style={{ width: 48, height: 48, fontSize: 18 }}
              >
                ↗
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
