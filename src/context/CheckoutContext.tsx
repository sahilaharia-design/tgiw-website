import React, { createContext, useContext, useState } from 'react';
import type { CartItem } from './CartContext';

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  emirate: string;
  zipCode?: string;
  instructions?: string;
}

export interface OrderData {
  orderNumber: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  total: number;
  timestamp: Date;
}

interface CheckoutContextType {
  step: number;
  setStep: (s: number) => void;
  shippingInfo: ShippingInfo | null;
  setShippingInfo: (info: ShippingInfo) => void;
  orderData: OrderData | null;
  setOrderData: (data: OrderData) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  return (
    <CheckoutContext.Provider value={{ step, setStep, shippingInfo, setShippingInfo, orderData, setOrderData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}
