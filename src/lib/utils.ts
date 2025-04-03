import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isStringInvalid(text: string | number | undefined | null) {
    return !text;
}

export function isNumeric(value: string | number) {
    if (!isStringInvalid(value)) {
        if (typeof value === 'string') return !isNaN(Number(value));
        else return !isNaN(value);
    } else return false;
}
