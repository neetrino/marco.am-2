'use client';

// ─── Figma asset URLs (expire in 7 days from generation) ─────────────────────
const BG_BRICK = 'https://www.figma.com/api/mcp/asset/765c304b-110f-428b-87fd-4120e3eecd3d';
const SOFA_IMG = 'https://www.figma.com/api/mcp/asset/4fc23d92-85a6-41ef-926b-65d436f278df';
const SOFA_SHADOW = 'https://www.figma.com/api/mcp/asset/43aac80e-bfdc-4d41-b8aa-0eda56e9e56f';
const DELIVERY_BG = 'https://www.figma.com/api/mcp/asset/982dba55-7c85-4fd0-a819-665a5ece58e3';
const DELIVERY_TRUCK = 'https://www.figma.com/api/mcp/asset/379d443b-173e-4085-af39-6d5485455088';
const ARROW_LINK_1 = 'https://www.figma.com/api/mcp/asset/66582032-92e8-4d07-ba60-1afeeef7331d';
const SMARTPHONE_BG = 'https://www.figma.com/api/mcp/asset/0c14f3f0-6177-4ab6-bef3-74c932c0d255';
const ARROW_LINK_2 = 'https://www.figma.com/api/mcp/asset/88aff27a-cc62-46c5-b114-0a9184ac638e';
const CHAT_CIRCLE = 'https://www.figma.com/api/mcp/asset/f33030cc-a9d7-4605-8fa4-ccc9347b6611';
const MSG_ICON = 'https://www.figma.com/api/mcp/asset/8263a730-4551-44b9-b84b-510e15546f02';

export function HeroSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-[80px] xl:px-[120px] 2xl:px-[151px] py-6">
      {/*
        ── Hero container ──────────────────────────────────────────────────
        Figma: 1624 × 924 px, rounded-[36px], yellow brick-wall background.
        We keep a fixed height on desktop and use the same proportional layout.
      */}
      <div
        className="relative w-full rounded-[36px] overflow-hidden"
        style={{ minHeight: 560, height: 'clamp(560px, 48.125vw, 924px)' }}
      >
        {/* ── Background brick-wall image ── */}
        <img
          src={BG_BRICK}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ── "ԱՆVCHАР ARACHUM" top-left title ── */}
        {/* Figma: x=195-151=44 → ~2.7% | y=330-230=100 → ~10.8% of 924px */}
        <div
          className="absolute font-montserrat font-black uppercase leading-none z-10"
          style={{ left: '2.7%', top: '10.8%' }}
        >
          <span className="text-black" style={{ fontSize: 'clamp(28px,3.125vw,60px)' }}>
            ԱՆVЧАР{' '}
          </span>
          <span className="text-white" style={{ fontSize: 'clamp(28px,3.125vw,60px)' }}>
            АРАКУМ
          </span>
        </div>

        {/*
          ── LEFT product showcase ─────────────────────────────────────────
          Figma: x=195, width=631, contains stacked cards + sofa image.
          Stacked cards start at y=909-230=679 (73.5% of 924).
          Sofa image: y=330-230=100, h=563.
        */}
        <div
          className="absolute z-10"
          style={{ left: '2.7%', top: 0, width: '38.9%', height: '100%' }}
        >
          {/* Stacked colored cards (visible at bottom) */}
          {/* White card */}
          <div
            className="absolute bg-white rounded-[36px]"
            style={{ left: 0, bottom: '-8%', right: 0, height: '51.4%' }}
          />
          {/* Gray card */}
          <div
            className="absolute bg-[#c7c7c7] rounded-[36px]"
            style={{ left: 0, bottom: '-6%', right: 0, height: '51.6%' }}
          />
          {/* Dark blue card */}
          <div
            className="absolute bg-[#2f4b5d] rounded-[36px]"
            style={{ left: 0, bottom: '-4%', right: 0, height: '52%' }}
          />

          {/* Sofa product image (floating above cards) */}
          <img
            src={SOFA_IMG}
            alt="Sofa product"
            className="absolute w-full object-contain pointer-events-none"
            style={{ left: '3%', top: '5%', width: '94%', height: '68%' }}
          />

          {/* Sofa shadow/ellipse */}
          <img
            src={SOFA_SHADOW}
            alt=""
            aria-hidden
            className="absolute pointer-events-none"
            style={{ left: '14%', top: '67%', width: '68%' }}
          />

          {/* Product name text */}
          <p
            className="absolute font-montserrat text-white z-20"
            style={{ left: '5%', bottom: '22%', fontSize: 'clamp(11px,0.833vw,16px)', lineHeight: 1.49 }}
          >
            Անkĸunain բаzmoc<br />Беллини
          </p>

          {/* "ΓNEL HIMA" yellow button */}
          <button
            className="absolute flex items-center gap-2 bg-[#facc15] font-montserrat font-bold rounded-[68px] z-20 hover:bg-yellow-400 transition-colors"
            style={{
              left: '26%',
              bottom: '14%',
              height: 'clamp(40px,2.917vw,56px)',
              paddingLeft: 'clamp(14px,1.25vw,24px)',
              paddingRight: 'clamp(14px,1.25vw,24px)',
              fontSize: 'clamp(11px,0.833vw,16px)',
            }}
          >
            ΓNЭЛ ՀIМА
            <span className="flex items-center justify-center bg-black rounded-full text-white"
              style={{ width: 'clamp(28px,2.5vw,48px)', height: 'clamp(28px,2.5vw,48px)', fontSize: '1.1em' }}
            >↗</span>
          </button>
        </div>

        {/*
          ── MIDDLE delivery card ──────────────────────────────────────────
          Figma: x=911-151=760 → 46.8% | y=282-230=52 → 5.6%
          Width=403 → 24.8% | Height=556 → 60.2%
        */}
        <div
          className="absolute z-10 rounded-[36px] overflow-hidden"
          style={{ left: '46.8%', top: '5.6%', width: '24.8%', height: '60.2%' }}
        >
          {/* Delivery boxes background */}
          <img
            src={DELIVERY_BG}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Arrow link icon top-right */}
          <img
            src={ARROW_LINK_1}
            alt=""
            aria-hidden
            className="absolute top-[14px] right-[14px] w-[52px] h-[52px] z-10"
          />

          {/* Frosted glass bottom overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-6 pt-4 backdrop-blur-sm"
            style={{
              background: 'linear-gradient(135.9deg, rgba(255,255,255,0.6) 0%, rgba(153,153,153,0.2) 100%)',
              height: '42%',
            }}
          >
            {/* "ԱՆVCHАР ARACHUM" bold text */}
            <p
              className="font-montserrat font-black uppercase text-center leading-tight mb-4"
              style={{ fontSize: 'clamp(14px,1.302vw,25px)' }}
            >
              <span className="text-[#ffce13]">ԱՆVЧАР</span>
              <br />
              <span className="text-white">АРАКУМ</span>
            </p>
            {/* Delivery truck icon */}
            <img
              src={DELIVERY_TRUCK}
              alt="Free delivery"
              className="mb-4"
              style={{ width: 'clamp(40px,3.645vw,70px)' }}
            />
            {/* "ΓNEL HIMA" black button */}
            <button
              className="bg-black text-white font-montserrat font-bold rounded-[60px] hover:bg-gray-800 transition-colors"
              style={{
                height: 'clamp(36px,2.917vw,56px)',
                paddingLeft: 'clamp(16px,1.667vw,32px)',
                paddingRight: 'clamp(16px,1.667vw,32px)',
                fontSize: 'clamp(10px,0.833vw,16px)',
              }}
            >
              ΓNЭЛ ՀIМА
            </button>
          </div>
        </div>

        {/*
          ── RIGHT smartphone card ─────────────────────────────────────────
          Figma: x=1345-151=1194 → 73.5% | y=282-230=52 → 5.6%
          Width=489 → 30.1% | Height=556 → 60.2%
        */}
        <div
          className="absolute z-10 rounded-[36px] overflow-hidden"
          style={{ left: '73.5%', top: '5.6%', width: '24%', height: '60.2%' }}
        >
          {/* Smartphone card background (masked image) */}
          <img
            src={SMARTPHONE_BG}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Arrow link icon top-right */}
          <img
            src={ARROW_LINK_2}
            alt=""
            aria-hidden
            className="absolute top-[14px] right-[14px] w-[52px] h-[52px] z-10"
          />

          {/* "80%" large text */}
          <p
            className="absolute font-montserrat font-extrabold text-[#facc15] leading-none"
            style={{
              left: '8%',
              top: '15%',
              fontSize: 'clamp(32px,4.063vw,78px)',
            }}
          >
            80%
          </p>

          {/* Product name text */}
          <div
            className="absolute font-montserrat font-black uppercase leading-tight"
            style={{ left: '8%', top: '55%', fontSize: 'clamp(10px,0.938vw,18px)' }}
          >
            <p className="text-[#facc15]">Nor</p>
            <p className="text-white">serndi</p>
            <p className="text-white">smartfoner</p>
          </div>

          {/* "AVELYIN" white button */}
          <button
            className="absolute bg-white font-montserrat font-bold rounded-[60px] hover:bg-gray-100 transition-colors"
            style={{
              left: '8%',
              bottom: '16%',
              height: 'clamp(36px,2.917vw,56px)',
              paddingLeft: 'clamp(12px,1.25vw,24px)',
              paddingRight: 'clamp(12px,1.25vw,24px)',
              fontSize: 'clamp(10px,0.833vw,16px)',
            }}
          >
            AVEЛYN
          </button>
        </div>

        {/*
          ── Bottom center promo text ──────────────────────────────────────
          Figma: x=862-151=711 → 43.8% | y=898-230=668 → 72.3%
        */}
        <p
          className="absolute font-montserrat font-semibold text-white z-10"
          style={{
            left: '43.8%',
            top: '72.3%',
            width: '40%',
            fontSize: 'clamp(10px,0.833vw,16px)',
            lineHeight: 1.5,
          }}
        >
          Zgatsek tekhnologiayi hzorutyune: Stacek minchev 20% zelch aysورva
          nakhinakan patverner hamar:
        </p>

        {/*
          ── Bottom-right chat + help button ──────────────────────────────
          Figma: x=1313-151=1162 → 71.6% | y=967-230=737 → 79.8%
        */}
        <div
          className="absolute flex items-center gap-3 z-10"
          style={{ left: '71.6%', top: '79.8%' }}
        >
          <button
            className="flex items-center justify-center bg-[#2f4b5d] text-white font-montserrat font-bold rounded-[68px] shadow-[0px_4px_24px_0px_rgba(150,150,150,0.28)] hover:bg-[#3a5f73] transition-colors"
            style={{
              height: 'clamp(36px,2.917vw,56px)',
              paddingLeft: 'clamp(12px,1.25vw,24px)',
              paddingRight: 'clamp(12px,1.25vw,24px)',
              fontSize: 'clamp(9px,0.729vw,14px)',
              whiteSpace: 'nowrap',
            }}
          >
            Incho՞v karog enk dzez ognel
          </button>
          <div className="relative flex-shrink-0">
            <img
              src={CHAT_CIRCLE}
              alt=""
              aria-hidden
              style={{ width: 'clamp(48px,5.208vw,100px)', height: 'clamp(48px,5.208vw,100px)' }}
            />
            <img
              src={MSG_ICON}
              alt="Chat"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: '50%', height: '50%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
