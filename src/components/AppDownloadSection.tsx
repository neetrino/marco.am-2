'use client';

/**
 * App download banner — Figma node 119:2121 (Group 9251).
 */

const IMG_PHONE = 'https://www.figma.com/api/mcp/asset/93836d40-5cc3-42f0-badf-d7f90198e7dc';
const IMG_QR = 'https://www.figma.com/api/mcp/asset/a95dd996-be86-4ee0-bc2b-bbdc87c33bdf';
const IMG_STORES = 'https://www.figma.com/api/mcp/asset/55335ed0-9635-4c34-b203-d64ca6032f48';

const BAR_W = 1535.8;

export function AppDownloadSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px] py-6">
      <div
        className="relative mx-auto w-full overflow-hidden rounded-[20px] bg-[#d3f500]"
        style={{ maxWidth: BAR_W, minHeight: 280 }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[20px] bg-[#ffe11f] mix-blend-color"
          aria-hidden
        />

        <div className="relative flex min-h-[280px] flex-col lg:min-h-[574px] lg:flex-row">
          <div
            className="relative w-full shrink-0 overflow-hidden rounded-bl-[21px] rounded-br-[21px] rounded-tl-[21px] rounded-tr-[253px] lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[53.86%]"
          >
            <img
              src={IMG_PHONE}
              alt=""
              className="h-56 w-full object-cover object-left-top lg:h-full lg:min-h-[574px]"
            />
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-6 py-8 lg:ml-[53.86%] lg:min-h-[574px] lg:w-[46.14%] lg:items-end lg:pr-10">
            <h2 className="font-montserrat text-center text-[40px] font-bold uppercase leading-[47px] tracking-[0.7px] text-black lg:text-right">
              ՆԵՐԲԵՌՆԵԼ ԲՋՋԱՅԻՆ
              <br />
              ՀԱՎԵԼՎԱԾԸ
            </h2>
            <img
              src={IMG_QR}
              alt="QR code to download the Marco app"
              width={211}
              height={211}
              className="size-[211px] max-w-[min(211px,85vw)] shrink-0"
            />
            <img
              src={IMG_STORES}
              alt="App Store and Google Play"
              width={126}
              height={33}
              className="h-[33px] w-auto max-w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
