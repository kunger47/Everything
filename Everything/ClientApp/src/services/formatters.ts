export function formatAsCurrency(value: number | null, places: number = 2, useCommas: boolean = true): string {
    if (value === null)
        return "N/A";

    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: places, maximumFractionDigits: places, useGrouping: useCommas });
    return `${value < 0 ? '-' : ''}$${formatter.format(Math.abs(value))}`;
};

export function formatAsAbbreviatedCurrency(value: number | null, places: number = 2, useCommas: boolean = true, formatThousands: boolean = true): string {
    if (value === null)
        return "N/A";

    return `${value < 0 ? '-' : ''}$${makeFriendly(Math.abs(value), places, useCommas, formatThousands)}`;
};

function makeFriendly(num: number, places: number = 2, useCommas: boolean = true, formatThousands: boolean) {
    let formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: useCommas });
    if (num >= 1000000)
        return formatter.format(num / 1000000) + 'M';
    if (formatThousands && num >= 1000)
        return formatter.format(num / 1000) + 'k';

    formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: places, maximumFractionDigits: places, useGrouping: useCommas });
    return formatter.format(num);
}

export function formatAsPercentage(value: number | null, places: number = 0, useCommas: boolean = true): string {
    if (value === null)
        return "N/A";

    const valueAsPercentage = value * 100;
    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: places, maximumFractionDigits: places, useGrouping: useCommas });
    return formatter.format(valueAsPercentage) + "%";
}

export function formatAsDecimal(value: number | null, places: number = 0, useCommas: boolean = true) {
    if (value === null)
        return "N/A";

    const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: places, maximumFractionDigits: places, useGrouping: useCommas });
    return formatter.format(value);
}

export function formatAsYesNo(value: boolean | null) {
    if (value)
        return 'Yes';
    return 'No';
}