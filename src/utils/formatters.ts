export function formatPrice(amount: number, currency = 'AED'): string {
  return `${currency} ${amount.toLocaleString()}`;
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TGIW-${timestamp}-${random}`;
}

export function getEstimatedDelivery(): string {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString('en-AE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
