import { db } from "@white-shop/db";
import {
  COMPARE_MAX_ITEMS,
  COMPARE_SESSION_MAX_AGE_SECONDS,
} from "@/lib/constants/compare-session";

function compareExpiresAt(): Date {
  return new Date(Date.now() + COMPARE_SESSION_MAX_AGE_SECONDS * 1000);
}

/**
 * Moves guest compare list into the authenticated user (union by product).
 * Deletes the guest list after merge.
 */
export async function mergeGuestCompareIntoUser(
  sessionToken: string | undefined,
  userId: string
): Promise<{ mergedItems: number; guestCompareFound: boolean }> {
  if (!sessionToken) {
    return { mergedItems: 0, guestCompareFound: false };
  }

  return db.$transaction(async (tx) => {
    const guest = await tx.compareList.findUnique({
      where: { sessionToken },
      include: { items: true },
    });

    if (!guest) {
      return { mergedItems: 0, guestCompareFound: false };
    }

    if (guest.items.length === 0) {
      await tx.compareList.delete({ where: { id: guest.id } });
      return { mergedItems: 0, guestCompareFound: true };
    }

    const userCompare = await tx.compareList.findUnique({
      where: { userId },
    });

    if (!userCompare) {
      const sortedGuest = [...guest.items].sort((a, b) => a.position - b.position);
      const keepItems = sortedGuest.slice(0, COMPARE_MAX_ITEMS);

      await tx.compareList.update({
        where: { id: guest.id },
        data: {
          userId,
          sessionToken: null,
          expiresAt: compareExpiresAt(),
        },
      });

      if (sortedGuest.length > keepItems.length) {
        const removableIds = sortedGuest
          .slice(COMPARE_MAX_ITEMS)
          .map((item) => item.id);
        await tx.compareItem.deleteMany({
          where: { id: { in: removableIds } },
        });
      }

      return { mergedItems: keepItems.length, guestCompareFound: true };
    }

    const existingIds = new Set(
      (
        await tx.compareItem.findMany({
          where: { compareListId: userCompare.id },
          select: { productId: true },
        })
      ).map((row) => row.productId)
    );

    let pos =
      ((
        await tx.compareItem.aggregate({
          where: { compareListId: userCompare.id },
          _max: { position: true },
        })
      )._max.position ?? -1) + 1;

    let merged = 0;
    const sortedGuest = [...guest.items].sort((a, b) => a.position - b.position);

    for (const line of sortedGuest) {
      if (existingIds.has(line.productId)) {
        continue;
      }
      const size = await tx.compareItem.count({
        where: { compareListId: userCompare.id },
      });
      if (size >= COMPARE_MAX_ITEMS) {
        break;
      }
      await tx.compareItem.create({
        data: {
          compareListId: userCompare.id,
          productId: line.productId,
          position: pos,
        },
      });
      pos += 1;
      existingIds.add(line.productId);
      merged += 1;
    }

    await tx.compareList.delete({ where: { id: guest.id } });
    await tx.compareList.update({
      where: { id: userCompare.id },
      data: { expiresAt: compareExpiresAt() },
    });

    return { mergedItems: merged, guestCompareFound: true };
  });
}
