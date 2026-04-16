import type { Metadata } from 'next';

import { ReelsVerticalFeed } from '../../components/reels/ReelsVerticalFeed';
import { REELS_ITEMS } from '../../components/home/home-reels.constants';
import { parseReelsIndexParam } from '../../lib/reels/reels-url';

export const metadata: Metadata = {
  title: 'Reels — MARCO',
  description: 'Product highlights and vertical feed',
};

export default async function ReelsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const rawI = sp.i;
  const raw =
    typeof rawI === 'string'
      ? rawI
      : Array.isArray(rawI)
        ? rawI[0]
        : undefined;
  const initialIndex = parseReelsIndexParam(raw, REELS_ITEMS.length);

  return <ReelsVerticalFeed initialIndex={initialIndex} />;
}
