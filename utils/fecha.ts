export function formatDate(date: Date) {
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        dateStyle: 'long'
    });
}