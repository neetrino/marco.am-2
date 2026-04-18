import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { ReelsVerticalFeed } from '../../components/reels/ReelsVerticalFeed';
import { LANGUAGE_PREFERENCE_KEY, parseLanguageFromServer } from '../../lib/language';
import { reelsManagementService } from '../../lib/services/reels-management.service';
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
  const cookieStore = await cookies();
  const locale =
    parseLanguageFromServer(cookieStore.get(LANGUAGE_PREFERENCE_KEY)?.value) ?? 'en';
  const feed = await reelsManagementService.getPublicPayload(locale);

  const sp = searchParams ? await searchParams : {};
  const rawI = sp.i;
  const raw =
    typeof rawI === 'string'
      ? rawI
      : Array.isArray(rawI)
        ? rawI[0]
        : undefined;
  const initialIndex = parseReelsIndexParam(raw, feed.items.length);

  return <ReelsVerticalFeed initialIndex={initialIndex} items={feed.items} />;
}
