import { describe, expect, it } from 'vitest';
import { normalizePhoneForTelUri, phoneToTelHref } from './contact-locations';

describe('normalizePhoneForTelUri', () => {
  it('keeps international +374 numbers', () => {
    expect(normalizePhoneForTelUri('+374 93 52 04 06')).toBe('+37493520406');
  });

  it('normalizes Armenian national mobile 0XX… to +374', () => {
    expect(normalizePhoneForTelUri('093 52 04 06')).toBe('+37493520406');
  });

  it('normalizes Yerevan landline 011… to +374 11…', () => {
    expect(normalizePhoneForTelUri('011 52 04 06')).toBe('+37411520406');
  });

  it('adds plus when digits already start with 374', () => {
    expect(normalizePhoneForTelUri('37477510406')).toBe('+37477510406');
  });
});

describe('phoneToTelHref', () => {
  it('returns tel href with normalized body', () => {
    expect(phoneToTelHref('011 52 04 06')).toBe('tel:+37411520406');
  });

  it('returns hash for empty input', () => {
    expect(phoneToTelHref('   ')).toBe('#');
  });
});
