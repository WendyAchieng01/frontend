export function formatAmount(amount: string | number) {
  if (typeof amount == "string") amount = parseFloat(amount);
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  }).format(amount);
}
