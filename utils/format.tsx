export const formatCurrency = (amount: number | null) => {
    const value = amount || 0;
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export function formatQuantity(quantity: number, noun: string): string {
    if (quantity === 1) return `${quantity} ${noun}`;

    const words = noun.split(" ");
    words[0] += "s"; // Add 's' to the first word only
    return `${quantity} ${words.join(" ")}`;
}