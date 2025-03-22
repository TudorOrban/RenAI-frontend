import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
    providedIn: "root"
})
export class DataFormatterService {

    formatDate(dateString?: string | Date): string {
        if (!dateString) {
            return "N/A"; 
        }

        try {
            const date = new Date(dateString);
            return formatDate(date, "yyyy-MM-dd HH:mm:ss", "en-US") ?? "N/A";
        } catch (error) {
            console.error("Error formatting date:", error);
            return "Invalid Date";
        }
    }

    formatEnumString(enumString?: string): string {
        if (!enumString) return "";
    
        const words = enumString.split("_");
        const formattedWords = words.map(word => {
            if (word.length === 0) return "";
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
        });
    
        return formattedWords.join(" ");
    }
}