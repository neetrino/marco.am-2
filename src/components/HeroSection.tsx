'use client';

/**
 * MARCO HOME hero — Figma node 119:2156 (Group 9275).
 * Layout, copy, and assets match Figma MCP export; positions are % of 1624×924 reference frame.
 */

const IMG_BRICK = 'https://www.figma.com/api/mcp/asset/740a1b80-5c91-4e55-93d6-2c83216013e0';
const IMG_BRICK_MASK = 'https://www.figma.com/api/mcp/asset/497a71bd-4e5d-4b20-8366-01494c49eb1a';
const IMG_SOFA = 'https://www.figma.com/api/mcp/asset/9e3e1e5b-287e-433b-bf63-ad117d097ef7';
const IMG_SOFA_SHADOW = 'https://www.figma.com/api/mcp/asset/4568d225-7c35-4c06-8e79-8cdd78d42572';
const IMG_DELIVERY_PHOTO = 'https://www.figma.com/api/mcp/asset/52aa0307-f55e-4cf4-ae39-d81f56f79ca1';
const IMG_DELIVERY_MASK = 'https://www.figma.com/api/mcp/asset/61e73be9-9f33-4453-86e8-e8c85f1493cc';
const IMG_ELLIPSE_BTN = 'https://www.figma.com/api/mcp/asset/c80555e4-2e12-4b49-812d-6a351479dc45';
const IMG_ARROW_DIAG = 'https://www.figma.com/api/mcp/asset/87b3f109-59ef-47c5-87dc-f3ceba65a6f2';
const IMG_TRUCK = 'https://www.figma.com/api/mcp/asset/ae69b580-58af-425d-af03-0495227283ad';
const IMG_CARD_LINK_MID = 'https://www.figma.com/api/mcp/asset/b0613f53-9a25-4e68-a276-9b33bbcee226';
const IMG_PHONE_CARD = 'https://www.figma.com/api/mcp/asset/279f0164-7b6d-462e-a190-377ff6875bfe';
const IMG_CARD_LINK_RIGHT = 'https://www.figma.com/api/mcp/asset/7729bc9a-0166-43d0-a6dd-20ac7056890a';
const IMG_CHAT_RING = 'https://www.figma.com/api/mcp/asset/0f331d0a-dfcb-4859-846d-cb5f250bab0a';
const IMG_CHAT_ICON = 'https://www.figma.com/api/mcp/asset/03117bce-4935-468e-9456-a9e8ea327eec';

/** Page coordinates relative to hero inner top-left (page 151, 230). */
const FRAME = { w: 1624, h: 924 };

function px(x: number, y: number, w: number, h: number) {
  const left = ((x - 151) / FRAME.w) * 100;
  const top = ((y - 230) / FRAME.h) * 100;
  const width = (w / FRAME.w) * 100;
  const height = (h / FRAME.h) * 100;
  return { left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%` };
}

export function HeroSection() {
  const leftStack = px(195, 330, 631, 594);
  const midCard = px(911, 282, 403.156, 556);
  const rightCard = px(1344.91, 282, 402.01, 556);

  return (
    <section className="bg-white px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px] py-6">
      <div
        className="relative mx-auto w-full max-w-[1624px] overflow-hidden rounded-[36px]"
        style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}
      >
        {/* Brick background — mask + fill per Figma 119:2157–119:2159 */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage: `url('${IMG_BRICK_MASK}')`,
            maskImage: `url('${IMG_BRICK_MASK}')`,
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        >
          <img src={IMG_BRICK} alt="" aria-hidden className="size-full object-cover" />
        </div>

        {/* Main headline — 119:2218 */}
        <p
          className="absolute z-10 font-montserrat font-black leading-[72px] text-[clamp(28px,3.75vw,60px)]"
          style={{ left: '2.71%', top: '10.81%' }}
        >
          <span className="text-black">ԱՆՎՃԱՐ </span>
          <span className="text-white">ԱՌԱՔՈՒՄ</span>
        </p>

        {/* Left product column — stacked cards + sofa */}
        <div className="absolute z-10" style={leftStack}>
          <div
            className="absolute rounded-[36px] bg-white"
            style={{ left: 0, bottom: '-8%', width: '99.7%', height: '51.4%' }}
          />
          <div
            className="absolute rounded-[36px] bg-[#c7c7c7]"
            style={{ left: 0, bottom: '-6%', width: '99.7%', height: '51.6%' }}
          />
          <div
            className="absolute rounded-[36px] bg-[#2f4b5d]"
            style={{ left: 0, bottom: '-4%', width: '100%', height: '52%' }}
          />

          <div
            className="absolute"
            style={{ left: '5.07%', top: 0, width: '89.24%', height: '95%' }}
          >
            <img src={IMG_SOFA} alt="" className="pointer-events-none size-full object-contain" />
          </div>
          <div
            className="pointer-events-none absolute"
            style={{ left: '14%', top: '67%', width: '68%' }}
          >
            <img src={IMG_SOFA_SHADOW} alt="" aria-hidden className="w-full" />
          </div>

          <p
            className="absolute z-20 font-montserrat text-[16px] leading-[23.8px] text-white"
            style={{ left: '5.3%', bottom: '10%' }}
          >
            Անկյունային բազմոց
            <br />
            Беллини
          </p>

          <button
            type="button"
            className="absolute z-20 flex items-center rounded-[68px] bg-[#facc15] font-montserrat text-[16px] font-bold leading-6 text-black transition-colors hover:bg-[#e6bd14]"
            style={{ left: '57.3%', bottom: '6.5%', height: 56, paddingLeft: 20, paddingRight: 12 }}
          >
            ԳՆԵԼ ՀԻՄԱ
            <span className="relative ml-2 inline-flex size-12 shrink-0 items-center justify-center">
              <img src={IMG_ELLIPSE_BTN} alt="" aria-hidden className="absolute size-12" />
              <span className="relative z-10 flex size-[12px] items-center justify-center">
                <img src={IMG_ARROW_DIAG} alt="" aria-hidden className="size-[12px]" />
              </span>
            </span>
          </button>
        </div>

        {/* Middle delivery card */}
        <div className="absolute z-10 overflow-hidden rounded-[36px]" style={midCard}>
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: `url('${IMG_DELIVERY_MASK}')`,
              maskImage: `url('${IMG_DELIVERY_MASK}')`,
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <img src={IMG_DELIVERY_PHOTO} alt="" className="size-full object-cover" />
          </div>
          <img
            src={IMG_CARD_LINK_MID}
            alt=""
            aria-hidden
            className="absolute right-[14px] top-[14px] z-10 w-[52px] h-[52px]"
          />

          <div
            className="absolute font-montserrat font-black text-white"
            style={{ left: '19%', top: '14%', width: '62%' }}
          >
            <p className="text-[clamp(22px,2.8vw,45px)] leading-[43px] text-[#ffce13]">ԱՆՎՃԱՐ</p>
            <p className="text-[clamp(22px,2.8vw,45px)] leading-[43px]">ԱՌԱՔՈՒՄ</p>
          </div>

          <div className="absolute left-1/2 top-[49%] z-10 w-[27%] -translate-x-1/2">
            <img src={IMG_TRUCK} alt="" aria-hidden className="w-full" />
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 flex justify-center backdrop-blur-[5px]"
            style={{
              height: '28.2%',
              borderBottomLeftRadius: 36,
              borderBottomRightRadius: 36,
              backgroundImage:
                'linear-gradient(135.9083793333826deg, rgba(255, 255, 255, 0.6) 0%, rgba(153, 153, 153, 0.2) 100%)',
            }}
          >
            <button
              type="button"
              className="absolute bottom-[12%] h-14 w-[250px] rounded-[60px] bg-black font-montserrat text-[16px] font-bold leading-6 text-white transition-colors hover:bg-neutral-900"
            >
              ԳՆԵԼ ՀԻՄԱ
            </button>
          </div>
        </div>

        {/* Right smartphone promo card */}
        <div className="absolute z-10 overflow-hidden rounded-[36px]" style={rightCard}>
          <img src={IMG_PHONE_CARD} alt="" className="absolute inset-0 size-full object-cover" />
          <img
            src={IMG_CARD_LINK_RIGHT}
            alt=""
            aria-hidden
            className="absolute right-[14px] top-[2px] z-10 size-[86px]"
          />

          <p
            className="absolute font-montserrat font-extrabold leading-[63px] text-[#facc15]"
            style={{ left: '9.5%', top: '12%', fontSize: 'clamp(40px,4.8vw,78px)' }}
          >
            80%
          </p>

          <div
            className="absolute font-montserrat font-black"
            style={{ left: '9.5%', top: '59%', fontSize: 'clamp(18px,1.7vw,28px)' }}
          >
            <p className="leading-[33px] text-[#facc15]">Նոր</p>
            <p className="leading-[33px] text-white">սերնդի</p>
            <p className="leading-[33px] text-white">սմարթֆոններ</p>
          </div>

          <div
            className="absolute shadow-[0px_0px_25px_0px_rgba(66,50,0,0.8)]"
            style={{ left: '50%', top: '7.9%', width: '96.7%', height: '65.8%', transform: 'translateX(-50%)' }}
          >
            <img src={IMG_SOFA} alt="" className="size-full object-contain" />
          </div>

          <button
            type="button"
            className="absolute bottom-[12%] left-[9.5%] h-14 w-[250px] rounded-[60px] bg-white font-montserrat text-[16px] font-bold leading-6 text-black transition-colors hover:bg-neutral-100"
          >
            ԱՎԵԼԻՆ
          </button>
        </div>

        {/* Promo line — 119:2217 */}
        <p
          className="absolute z-10 font-montserrat text-[24px] font-semibold leading-7 text-white"
          style={{
            left: '43.78%',
            top: '72.29%',
            right: '8%',
            maxWidth: '48%',
          }}
        >
          Զգացեք տեխնոլոգիայի հզորությունը: Ստացեք մինչև 20% զեղչ այսօրվա նախնական պատվերների համար:
        </p>

        {/* Help + chat — 119:2211 */}
        <div className="absolute z-10 flex items-center gap-3" style={{ left: '71.55%', top: '79.76%' }}>
          <button
            type="button"
            className="rounded-[68px] bg-[#2f4b5d] font-montserrat text-[16px] font-bold leading-6 text-white shadow-[0px_4px_24px_0px_rgba(150,150,150,0.28)] transition-colors hover:bg-[#3a5f73]"
            style={{ height: 56, paddingLeft: 32, paddingRight: 32, whiteSpace: 'nowrap' }}
          >
            Ինչո՞վ կարող ենք ձեզ օգնել
          </button>
          <div className="relative size-[100px] shrink-0">
            <img src={IMG_CHAT_RING} alt="" aria-hidden className="absolute inset-0 size-full" />
            <img
              src={IMG_CHAT_ICON}
              alt=""
              aria-hidden
              className="absolute left-1/2 top-1/2 size-[50px] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
