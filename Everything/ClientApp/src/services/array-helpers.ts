import { areDatesEqual } from "./date";

export function average(array: (number)[]): number {
    if (!array.length)
        return 0;
    return sum(array) / array.length;
}

export function sumByProperty<T>(array: T[], property: keyof T): number {
    if (!array.length)
        return 0;
    return sum(array.map(a => (a[property] as unknown as number) ?? 0));
}

export function sum(array: (number)[]): number {
    if (!array.length)
        return 0;
    return array.reduce((a, b) => a + b);
}

export function distinctByProperty<T>(array: T[], property: keyof T) {
    let tempArray = array.map(a => a[property]).filter(item => !!item);
    return distinct(tempArray);
}

export function distinctByPropertyFull<T>(array: T[], property: keyof T) {
    return array.filter((a, index) => array.findIndex(item => item[property] == a[property]) == index)
}

export function distinct<T>(array: T[]) {
    return array.filter((a, index) => array.indexOf(a) == index);
}

export function distinctDate(array: Date[]) {
    return array.filter((a, index) => array.findIndex(b => areDatesEqual(a, b)) == index);
}