export function formatPrice(amount: number, currency = 'AED'): string {
  return `${currency} ${amount.toLocaleString()}`;
}

/** Founders Cohort reservation number, e.g. FC-001-A4K9 */
export function generateReservationNumber(seatNum?: number): string {
  const seat = (seatNum ?? Math.floor(Math.random() * 500) + 1).toString().padStart(3, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FC-${seat}-${random}`;
}

// Legacy export kept for compatibility
export const generateOrderNumber = generateReservationNumber;

/** A readable ship-by date, 90 days forward */
export function getShipByDate(days = 90): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const getEstimatedDelivery = () => getShipByDate(90);
