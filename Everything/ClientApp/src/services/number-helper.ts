export function zeroIfNaN(value: number | null | undefined): number {
    return isNaN(value ?? 0) || !value ? 0 : value;
}

export function nullIfNaN(value: number | null | undefined): number | null {
    return isNaN(value ?? 0) || !value ? null : value;
}

export function isANumberAndGreaterThan0(value: number): boolean {
    return !!value && !isNaN(value);
}

export function isANumber(value: number | null): boolean {
    return (!!value || value == 0) && !isNaN(value);
}