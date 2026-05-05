// src/utils/date.ts

export const formatDateShort = (date: string, locale = 'en-ES') => {
    return new Date(date)
        .toLocaleDateString(locale, {
            month: 'short',
            year: 'numeric',
        })
        .toUpperCase()
}

export const formatDateRelative = (date: string, locale = 'es-ES') => {
    const diff = Date.now() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return locale === 'es-ES' ? 'HOY' : 'TODAY'
    if (days === 1) return locale === 'es-ES' ? 'AYER' : 'YESTERDAY'

    return locale === 'es-ES'
        ? `HACE ${days} DÍAS`
        : `${days} DAYS AGO`
}