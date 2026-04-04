'use client';

/**
 * Bottom promo row — Figma 119:2140 (Group 9270) + 119:2131 (Group 9249).
 */

const IMG_SOFA_BG = 'https://www.figma.com/api/mcp/asset/7140dd1b-4030-4d37-937f-7c3c31a2970c';
const IMG_SOFA_PRODUCT = 'https://www.figma.com/api/mcp/asset/5a76e8b4-cf6f-4f9a-b9a7-bc43fe98119a';
const IMG_SOFA_SHADOW = 'https://www.figma.com/api/mcp/asset/b140176c-777b-4957-aec1-0c84ea968c80';
const IMG_ELLIPSE_BTN = 'https://www.figma.com/api/mcp/asset/bffe41e7-f468-4fcc-925a-ce212047a49f';
const IMG_ARROW_DIAG = 'https://www.figma.com/api/mcp/asset/94e18af6-96e4-4451-9a68-caaa6ce2c558';

const IMG_PHONES = 'https://www.figma.com/api/mcp/asset/55ec56b3-4ee8-4aa4-99cf-5c4b087d0383';
const IMG_LOGO = 'https://www.figma.com/api/mcp/asset/002f3bd3-e257-46ab-b20d-af5cc7bf1154';
const IMG_ELLIPSE_BTN_LIGHT = 'https://www.figma.com/api/mcp/asset/03213305-bc2d-4822-b3c8-b80ebffdc325';
const IMG_ARROW_DIAG_LIGHT = 'https://www.figma.com/api/mcp/asset/05a0b9d2-3376-42df-b568-d4bae1882cf9';

export function PromoCardsSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px] py-6">
      <div className="mx-auto flex w-full max-w-[1537px] flex-col gap-[26px] md:flex-row md:items-stretch">
        {/* Left — 119:2140 */}
        <div
          className="relative w-full shrink-0 overflow-visible rounded-[20px] md:max-w-[558px]"
          style={{ minHeight: 368 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[20px]">
            <img
              src={IMG_SOFA_BG}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full max-w-none object-cover"
              style={{ height: '160.88%', width: '120.46%', left: '-11.5%', top: '-48.15%' }}
            />
            <div className="absolute inset-0 rounded-[20px] bg-[#2f4b5d]" aria-hidden />
          </div>

          <div
            className="relative z-10 flex justify-center"
            style={{ marginTop: -198, marginBottom: -40 }}
          >
            <div className="relative size-[min(454px,85vw)]">
              <img
                src={IMG_SOFA_PRODUCT}
                alt="Անկյունային բազմոց Беллини"
                className="size-full object-contain"
              />
              <div className="pointer-events-none absolute left-[14%] top-[71%] w-[72%]">
                <img src={IMG_SOFA_SHADOW} alt="" aria-hidden className="w-full" />
              </div>
            </div>
          </div>

          <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-5 pb-5 pt-2">
            <button
              type="button"
              className="relative flex h-16 shrink-0 items-center rounded-[68px] bg-[#facc15] pl-[47px] pr-2 font-montserrat text-[16px] font-bold leading-6 text-black transition-colors hover:bg-[#e6bd14]"
              style={{ width: 226 }}
            >
              ԳՆԵԼ ՀԻՄԱ
              <span className="absolute right-2 top-2 flex size-12 items-center justify-center">
                <img src={IMG_ELLIPSE_BTN} alt="" aria-hidden className="absolute size-12" />
                <span className="relative z-10 flex size-[12px] items-center justify-center [&_img]:-rotate-45">
                  <img src={IMG_ARROW_DIAG} alt="" aria-hidden className="size-[12px]" />
                </span>
              </span>
            </button>
            <p className="font-montserrat text-[16px] leading-[23.8px] text-white">
              Անկյունային բազմոց
              <br />
              Беллини
            </p>
          </div>
        </div>

        {/* Right — 119:2131 */}
        <div
          className="relative flex min-h-[368px] flex-1 flex-col overflow-hidden rounded-[20px] bg-[#e6eaf6] md:flex-row"
        >
          <div
            className="relative z-10 order-2 flex w-full flex-col justify-center px-6 py-8 md:order-1 md:w-[44%] md:max-w-[419px] md:pr-4"
          >
            <div className="relative mb-4 aspect-[548/485] w-[min(182px,40vw)] max-w-full">
              <img
                src={IMG_LOGO}
                alt="Marco Group"
                className="absolute inset-0 size-full max-w-none object-cover object-center"
                style={{ height: '278.35%', width: '197.08%', left: '-48.54%', top: '-75.88%' }}
              />
            </div>
            <h3 className="mb-6 font-montserrat text-[30px] font-black leading-[40px] text-black">
              Նոր
              <br />
              սերնդի
              <br />
              սմարթֆոններ
            </h3>
            <button
              type="button"
              className="relative flex h-16 w-[220px] shrink-0 items-center rounded-[68px] bg-black pl-[62px] pr-2 font-montserrat text-[16px] font-bold leading-6 text-white transition-colors hover:bg-neutral-900"
            >
              ԱՎԵԼԻՆ
              <span className="absolute right-2 top-2 flex size-12 items-center justify-center">
                <img src={IMG_ELLIPSE_BTN_LIGHT} alt="" aria-hidden className="absolute size-12" />
                <span className="relative z-10 flex size-[12px] items-center justify-center [&_img]:-rotate-45">
                  <img src={IMG_ARROW_DIAG_LIGHT} alt="" aria-hidden className="size-[12px]" />
                </span>
              </span>
            </button>
          </div>

          <div className="relative order-1 h-56 w-full shrink-0 overflow-hidden md:absolute md:right-0 md:top-0 md:order-2 md:h-full md:w-[55.6%] md:max-w-[680px] md:rounded-r-[20px]">
            <img
              src={IMG_PHONES}
              alt=""
              className="absolute size-full max-w-none object-cover"
              style={{ height: '100.14%', width: '110.83%', left: '-10.83%', top: '-0.07%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
