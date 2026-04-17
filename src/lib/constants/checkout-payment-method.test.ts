import { describe, expect, it } from 'vitest';
import {
  normalizeCheckoutPaymentMethod,
  resolveCheckoutPaymentMethod,
} from './checkout-payment-method';

describe('normalizeCheckoutPaymentMethod', () => {
  it('maps canonical values', () => {
    expect(normalizeCheckoutPaymentMethod('card')).toBe('card');
    expect(normalizeCheckoutPaymentMethod('cash')).toBe('cash');
    expect(normalizeCheckoutPaymentMethod('CARD')).toBe('card');
  });

  it('maps legacy PSP and COD labels', () => {
    expect(normalizeCheckoutPaymentMethod('idram')).toBe('card');
    expect(normalizeCheckoutPaymentMethod('arca')).toBe('card');
    expect(normalizeCheckoutPaymentMethod('cash_on_delivery')).toBe('cash');
    expect(normalizeCheckoutPaymentMethod('cod')).toBe('cash');
  });

  it('returns null for unknown', () => {
    expect(normalizeCheckoutPaymentMethod('bitcoin')).toBeNull();
  });
});

describe('resolveCheckoutPaymentMethod', () => {
  it('defaults to cash when empty or undefined', () => {
    expect(resolveCheckoutPaymentMethod(undefined)).toBe('cash');
    expect(resolveCheckoutPaymentMethod(null)).toBe('cash');
    expect(resolveCheckoutPaymentMethod('')).toBe('cash');
    expect(resolveCheckoutPaymentMethod('   ')).toBe('cash');
  });

  it('throws for wrong type', () => {
    expect(() => resolveCheckoutPaymentMethod(1)).toThrow();
  });

  it('throws for unknown string', () => {
    expect(() => resolveCheckoutPaymentMethod('wire')).toThrow();
  });
});
