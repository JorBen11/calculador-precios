import i18n from "@/i18n";

export function formatDate(date: Date | string) {
    if(!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        dateStyle: 'medium'
    });
}