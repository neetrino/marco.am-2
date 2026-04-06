'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '../lib/i18n-client';

/**
 * Figma MCP asset URLs — valid 7 days from 2026-04-06.
 * Node: 214:1056 · Frame: 1440 × 900 px (right card overflows to ~1714 px).
 */
const ASSETS = {
  bgTexture:     'https://www.figma.com/api/mcp/asset/b54ee867-ba6c-49b4-a7c4-e5ab1f666b4e',
  sofa:          'https://www.figma.com/api/mcp/asset/1a5ccb5d-3c4f-45e8-8489-29d2d9124fd1',
  sofaCircle:    'https://www.figma.com/api/mcp/asset/2f91b1da-a2d5-43d1-b75f-f8c532cd6471',
  boxesPhoto:    'https://www.figma.com/api/mcp/asset/4edd1537-ccdc-4093-b73f-bc81d0b2a409',
  truckIcon:     'https://www.figma.com/api/mcp/asset/5249941e-732f-48e2-a3b4-bcadfc9d8ced',
  rightCardBg:   'https://www.figma.com/api/mcp/asset/3f677413-36ef-44bb-a898-711eec0caed7',
  linkIcon1:     'https://www.figma.com/api/mcp/asset/7e5dbdc4-4d4e-47a3-a26b-76000d469a4d',
  linkIcon2:     'https://www.figma.com/api/mcp/asset/01c4ecb0-959a-4403-a191-8d4fe959ea88',
  ellipseCircle: 'https://www.figma.com/api/mcp/asset/d7223cba-07f9-4b3b-b413-ec910607e32f',
  arrow:         'https://www.figma.com/api/mcp/asset/787d7226-c78d-4624-853e-0fd084ba6a51',
} as const;

/**
 * Armenian uppercase text — Unicode escapes keep the source ASCII-safe.
 * Corrections vs previous version: gnel (U+0545→U+0546), hima (U+053E→U+0540, U+0543→U+0544),
 * avelin (U+054D→U+054E, U+0545→U+0546), free/delivery full rewrite.
 */
const ARM = {
  // Գnell = Buy: Գ(0533)+Ն(0546)+Ե(0535)+Լ(053C)
  gnel:        '\u0533\u0546\u0535\u053c',
  // Hima = Now: Հ(0540)+Ի(053B)+Մ(0544)+Ա(0531)
  hima:        '\u0540\u053b\u0544\u0531',
  // Avelin = More: Ա(0531)+Վ(054E)+Ե(0535)+Լ(053C)+Ի(053B)+Ն(0546)
  avelin:      '\u0531\u054e\u0535\u053c\u053b\u0546',
  // Անvchair = Free: Ա(0531)+Ն(0546)+Վ(054E)+Ճ(0543)+Ա(0531)+Ռ(054C)
  free:        '\u0531\u0546\u054e\u0543\u0531\u054c',
  // Arakoum = Delivery: Ա(0531)+Ռ(054C)+Ա(0531)+Ք(0554)+ո(0578)+ւ(0582)+Մ(0544)
  delivery:    '\u0531\u054c\u0531\u0554\u0578\u0582\u0544',
  // Nor = New: Ն(0546)+Ո(0548)+Ռ(054C)
  nor:         '\u0546\u0548\u054c',
  // Serndi = Generation: Ս(054D)+Ե(0535)+Ռ(054C)+Ն(0546)+Դ(0534)+Ի(053B)
  serndi:      '\u054d\u0535\u054c\u0546\u0534\u053b',
  // Smartfonner = Smartphones: Ս+Մ+Ա+Ռ+Տ+Ֆ+Ո+Ն+Ն+Ե+Ռ
  smartphones: '\u054d\u0544\u0531\u054c\u054f\u0556\u0548\u0546\u0546\u0535\u054c',
  // Ankjunain bazmots (lowercase Armenian)
  sofaName:    '\u0531\u0576\u056f\u0575\u0578\u0582\u0576\u0561\u0575\u056b\u0576 \u0562\u0561\u0566\u0584\u0578\u0581',
} as const;

/** Figma frame width (px). Content overflows to ~1714 px for the right card. */
const CANVAS_W = 1440;
const CANVAS_H = 900;

/**
 * Left product card — sofa promo with stacked-card depth effect.
 */
function SofaCard() {
  return (
    <>
      {/* Stacked card backgrounds (scaleY-flip creates depth illusion) */}
      <div className="absolute left-[162px] top-[204px] w-[629px] h-[475px] bg-white rounded-[36px] -scale-y-100" />
      <div className="absolute left-[162px] top-[260px] w-[629px] h-[477px] bg-[#c7c7c7] rounded-[36px] -scale-y-100" />
      <div className="absolute left-[162px] top-[323px] w-[631px] h-[481px] bg-[#2f4b5d] rounded-[36px] -scale-y-100" />

      {/* Sofa product image */}
      <div className="absolute left-[194px] top-[100px] w-[563px] h-[563px]">
        <Image src={ASSETS.sofa} alt={ARM.sofaName} fill className="object-contain" unoptimized />
      </div>

      {/* Decorative orbit ring below sofa */}
      <div className="absolute left-[274px] top-[502px] w-[404px] h-[165px]">
        <Image src={ASSETS.sofaCircle} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Product label */}
      <div className="absolute left-[195px] top-[712px] text-white text-base leading-[1.49]">
        <p>{ARM.sofaName}</p>
        <p>Bellini</p>
      </div>

      {/*
       * Yellow "Buy now" CTA pill (w=182 px from Figma left-[27.29%] to right-[60.05%]).
       * The ellipse circle is intentionally positioned at left-[189px] — it overflows the right
       * edge of the 182 px pill, matching the Figma decorative treatment.
       */}
      <Link
        href="/products"
        className="absolute left-[393px] top-[688px] h-[56px] w-[182px] bg-[#facc15] rounded-[68px] overflow-visible"
      >
        <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-bold text-[16px] text-black whitespace-nowrap leading-[24px]">
          {ARM.gnel} {ARM.hima}
        </span>
        {/* Decorative circle — overflows right edge of the pill */}
        <div className="absolute left-[189px] top-[4px] size-[48px]">
          <Image src={ASSETS.ellipseCircle} alt="" fill className="object-contain" unoptimized />
        </div>
        {/* Arrow inside the circle */}
        <div className="absolute left-[207px] top-[22px] size-[12px] flex items-center justify-center -rotate-45">
          <Image src={ASSETS.arrow} alt="" width={17} height={8} className="object-contain" unoptimized />
        </div>
      </Link>
    </>
  );
}

/**
 * Middle card — free-delivery promo with delivery-boxes photo and frosted-glass CTA panel.
 */
function DeliveryCard() {
  return (
    <>
      {/* Delivery boxes background photo, clipped to card top radius */}
      <div className="absolute left-[878px] top-[52px] w-[403px] h-[399px] overflow-hidden rounded-tl-[36px] rounded-tr-[36px]">
        <Image src={ASSETS.boxesPhoto} alt="" fill className="object-cover" unoptimized />
      </div>

      {/* "ԱՆVCHAIR ARAKOUM" headline — overlaps the boundary of left and middle cards */}
      <div className="absolute left-[716px] top-[157px] whitespace-nowrap font-black leading-[43px]">
        <p className="text-[#ffce13] text-[45px]">{ARM.free}</p>
        <p className="text-white text-[45px]">{ARM.delivery}</p>
      </div>

      {/* Delivery truck icon — Figma inset-[35.17%_41.13%_56.19%_53.28%] on 1440×900 */}
      <div className="absolute left-[767px] top-[316px] w-[81px] h-[78px]">
        <Image src={ASSETS.truckIcon} alt="Free delivery" fill className="object-contain" unoptimized />
      </div>

      {/* Arrow/link icon */}
      <div className="absolute left-[1194px] top-[52px] w-[87px] h-[87px]">
        <Image src={ASSETS.linkIcon1} alt="" fill className="object-contain" unoptimized />
      </div>

      {/* Frosted-glass bottom panel with "Buy now" CTA */}
      <div className="absolute left-[878px] top-[451px] w-[403px] h-[157px] rounded-bl-[36px] rounded-br-[36px] overflow-hidden backdrop-blur-[5px] bg-[linear-gradient(135.9deg,rgba(255,255,255,0.6)_0%,rgba(153,153,153,0.2)_100%)] flex items-center justify-center">
        <Link
          href="/products"
          className="flex items-center justify-center h-[56px] w-[250px] bg-black text-white rounded-[60px] font-bold text-[16px]"
        >
          {ARM.gnel} {ARM.hima}
        </Link>
      </div>
    </>
  );
}

/**
 * Right card — new-arrivals promo (extends ~274 px beyond the 1440 px Figma frame).
 */
function ElectronicsCard() {
  return (
    <>
      {/* Pre-masked dark card background */}
      <div className="absolute left-[1312px] top-[52px] w-[402px] h-[556px]">
        <Image src={ASSETS.rightCardBg} alt="" fill className="object-cover rounded-[36px]" unoptimized />
      </div>

      {/* Discount badge — spans boundary between delivery and right card */}
      <p className="absolute left-[1012px] top-[125px] text-[#facc15] text-[78px] leading-[63px] font-black whitespace-nowrap">
        80%
      </p>

      {/* Product image with warm-glow shadow */}
      <div className="absolute left-[1172px] top-[96px] w-[389px] h-[366px] shadow-[0px_0px_25px_0px_rgba(66,50,0,0.8)]">
        <Image src={ASSETS.sofa} alt="Product" fill className="object-cover" unoptimized />
      </div>

      {/* Sub-headline */}
      <div className="absolute left-[1012px] top-[366px] font-black text-[28px] leading-[33px] whitespace-nowrap">
        <p className="text-[#facc15]">{ARM.nor}</p>
        <p className="text-white">{ARM.serndi}</p>
        <p className="text-white">{ARM.smartphones}</p>
      </div>

      {/* White "More" CTA */}
      <Link
        href="/products"
        className="absolute left-[1394px] top-[502px] flex items-center justify-center h-[56px] w-[250px] bg-white text-black rounded-[60px] font-bold text-[16px] overflow-hidden"
      >
        {ARM.avelin}
      </Link>

      {/* Arrow/link icon */}
      <div className="absolute left-[1628px] top-[53px] w-[86px] h-[86px]">
        <Image src={ASSETS.linkIcon2} alt="" fill className="object-contain" unoptimized />
      </div>
    </>
  );
}

/**
 * Home page hero banner — Figma node 214:1056.
 *
 * The Figma artboard is 1440 × 900 px; the right card overflows to ~1714 px.
 * On viewports narrower than 1714 px the right card is partially clipped (by design).
 */
export function HomeBanner() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full overflow-hidden bg-[#facc15]">
      <div className="relative mx-auto h-[900px] w-full max-w-[1714px]">
        {/* Full-bleed background texture */}
        <div className="absolute inset-0">
          <Image src={ASSETS.bgTexture} alt="" fill className="object-cover" priority unoptimized />
        </div>

        {/* Large headline — top-left corner (Figma left-[8.44%] = 121 px on 1440 canvas) */}
        <p className="absolute left-[121px] top-[88px] whitespace-nowrap font-black text-[60px] leading-[72px]">
          <span className="text-black">{ARM.free} </span>
          <span className="text-white">{ARM.delivery}</span>
        </p>

        <SofaCard />
        <DeliveryCard />
        <ElectronicsCard />

        {/* Promo sub-copy (Figma left-[43.18%] right-[22.6%] on 1440 canvas) */}
        <p className="absolute left-[622px] right-[325px] top-[656px] text-white text-[24px] leading-[28px] font-semibold">
          {t('home.hero_subtitle')}
        </p>
      </div>
    </section>
  );
}
