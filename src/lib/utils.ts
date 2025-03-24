import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return function(...args: never[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};