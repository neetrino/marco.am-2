'use client';

// ─── Figma assets ──────────────────────────────────────────────────────────────
// App-download section (Group 9251): yellow bg, phone mockup, QR code, store icons
const PHONE_MOCKUP = 'https://www.figma.com/api/mcp/asset/dfcd39e2-b969-4f9b-b729-1ed1d01f0406';
const QR_CODE = 'https://www.figma.com/api/mcp/asset/5452a800-219e-4031-9489-cbbee1e7659c';
const APP_STORES = 'https://www.figma.com/api/mcp/asset/eb266858-b305-4053-8641-da0dd14096b9';

export function AppDownloadSection() {
  return (
    /*
      Figma: Group 9251 – x=191, y=4452, w=1536, h=574.
      Background: #d3f500 (lime yellow) with mix-blend-color overlay #ffe11f → net yellow.
      Left half: phone/wallet mockup image with top-right rounded corner cutout.
      Right half: "NERBERNNEL BJJAYIN HAVELVADE" text + QR code + app store buttons.
    */
    <section className="bg-white px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px] py-6">
      <div
        className="relative w-full rounded-[20px] overflow-hidden flex items-stretch"
        style={{ minHeight: 320, background: '#ffe11f' }}
      >
        {/* ── Left: phone mockup image ── */}
        {/*
          Figma: image positioned from x=253, with rounded-tl=21, rounded-tr=253 (a pill-top shape).
          Width=827px → ~54% of 1536. The image has a very tall top-right corner radius.
        */}
        <div
          className="relative flex-shrink-0 overflow-hidden"
          style={{
            width: '54%',
            borderTopLeftRadius: 21,
            borderBottomLeftRadius: 21,
            borderTopRightRadius: 200,
            borderBottomRightRadius: 21,
          }}
        >
          <img
            src={PHONE_MOCKUP}
            alt="Download our mobile app"
            className="w-full h-full object-cover object-left-top"
            style={{ minHeight: 320 }}
          />
        </div>

        {/* ── Right: text + QR + store buttons ── */}
        <div className="flex-1 flex flex-col items-end justify-center pr-8 pl-4 py-8 gap-6">
          {/* Headline */}
          <h2
            className="font-montserrat font-bold uppercase text-black text-right leading-tight"
            style={{ fontSize: 'clamp(18px, 2.083vw, 40px)', letterSpacing: '0.7px' }}
          >
            NERBERNNEL<br />BJJAYIN<br />HAVELVADE
          </h2>

          {/* QR code */}
          <img
            src={QR_CODE}
            alt="QR code to download app"
            style={{ width: 'clamp(100px, 11vw, 211px)', height: 'clamp(100px, 11vw, 211px)' }}
          />

          {/* App store icons */}
          <img
            src={APP_STORES}
            alt="App Store and Google Play"
            style={{ height: 'clamp(24px, 1.719vw, 33px)' }}
          />
        </div>
      </div>
    </section>
  );
}
