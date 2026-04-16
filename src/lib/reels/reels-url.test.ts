import { describe, expect, it } from 'vitest';

import {
  getReelsItemHref,
  parseReelsIndexParam,
  REELS_INDEX_QUERY,
  REELS_PAGE_PATH,
} from './reels-url';

describe('reels-url', () => {
  it('getReelsItemHref builds path with index query', () => {
    expect(getReelsItemHref(2)).toBe(`${REELS_PAGE_PATH}?${REELS_INDEX_QUERY}=2`);
  });

  it('parseReelsIndexParam clamps to length', () => {
    expect(parseReelsIndexParam(undefined, 6)).toBe(0);
    expect(parseReelsIndexParam('', 6)).toBe(0);
    expect(parseReelsIndexParam('0', 6)).toBe(0);
    expect(parseReelsIndexParam('5', 6)).toBe(5);
    expect(parseReelsIndexParam('99', 6)).toBe(5);
    expect(parseReelsIndexParam('-1', 6)).toBe(0);
    expect(parseReelsIndexParam('not-a-number', 6)).toBe(0);
  });

  it('parseReelsIndexParam handles length zero', () => {
    expect(parseReelsIndexParam('0', 0)).toBe(0);
  });
});
