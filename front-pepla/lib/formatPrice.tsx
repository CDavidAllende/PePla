export function formatPrice(price: number, useCurrency?: { symbol: string, currency: string }) {
    if (useCurrency) {
        return `${useCurrency.symbol}${price} ${useCurrency.currency}`
    }
    return `$${price}`
}