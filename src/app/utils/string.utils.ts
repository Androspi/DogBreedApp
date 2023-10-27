import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StringUtils {

    /**
     * convert the first letter of a text to uppercase
     * @param text text
     * @returns formatted text
     */
    capitalizeFirst(text: string) {
        return `${(text[0] ?? '').toUpperCase()}${text.slice(1)}`;
    }

    /**
     * remove empty spaces from text
     * @param text text
     * @returns formatted text
     */
    trim(text: string) {
        return (text ?? '').trim().replace(/\s\s+/g, ' ');
    }

}