import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to conditionally join class names together.
 * It merges Tailwind classes efficiently while resolving conflicts.
 */
export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs));
}
