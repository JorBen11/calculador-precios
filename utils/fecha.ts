export function formatDate(date: Date | string) {
    if(!date) return '';

    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        dateStyle: 'medium'
    });
}