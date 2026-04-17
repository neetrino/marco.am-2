'use client';

import { UseFormRegister, UseFormSetValue, UseFormHandleSubmit, FieldErrors } from 'react-hook-form';
import { ShippingAddressModal } from './components/ShippingAddressModal';
import { CardDetailsModal } from './components/CardDetailsModal';
import type { CheckoutPaymentMethodId } from '../../lib/constants/checkout-payment-method';
import type { ShippingMethodId } from '../../lib/constants/shipping-method';
import { CheckoutFormData, Cart } from './types';

interface CheckoutModalsProps {
  showShippingModal: boolean;
  setShowShippingModal: (show: boolean) => void;
  showCardModal: boolean;
  setShowCardModal: (show: boolean) => void;
  register: UseFormRegister<CheckoutFormData>;
  setValue: UseFormSetValue<CheckoutFormData>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  isSubmitting: boolean;
  shippingMethod: ShippingMethodId;
  paymentMethod: CheckoutPaymentMethodId;
  shippingCity: string | undefined;
  cart: Cart | null;
  orderSummary: {
    subtotalDisplay: number;
    taxDisplay: number;
    shippingDisplay: number;
    totalDisplay: number;
  };
  currency: 'USD' | 'AMD' | 'EUR' | 'RUB' | 'GEL';
  loadingCheckoutTotals: boolean;
  isLoggedIn: boolean;
  onSubmit: (data: CheckoutFormData) => void;
}

export function CheckoutModals({
  showShippingModal,
  setShowShippingModal,
  showCardModal,
  setShowCardModal,
  register,
  setValue,
  handleSubmit,
  errors,
  isSubmitting,
  shippingMethod,
  paymentMethod,
  shippingCity,
  cart,
  orderSummary,
  currency,
  loadingCheckoutTotals,
  isLoggedIn,
  onSubmit,
}: CheckoutModalsProps) {
  return (
    <>
      <ShippingAddressModal
        isOpen={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        register={register}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        shippingMethod={shippingMethod}
        paymentMethod={paymentMethod}
        cart={cart}
        orderSummary={orderSummary}
        currency={currency}
        shippingCity={shippingCity}
        loadingCheckoutTotals={loadingCheckoutTotals}
        onSubmit={onSubmit}
      />

      <CardDetailsModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        register={register}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
        shippingMethod={shippingMethod}
        shippingCity={shippingCity}
        cart={cart}
        orderSummary={orderSummary}
        currency={currency}
        loadingCheckoutTotals={loadingCheckoutTotals}
        isLoggedIn={isLoggedIn}
        onShowShippingModal={() => setShowShippingModal(true)}
        onSubmit={onSubmit}
      />
    </>
  );
}
