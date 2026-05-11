import { useI18n } from 'vue-i18n'

export const useTimeAgo = () => {
  const { t } = useI18n()

  const formatDateShort = (date: string, locale = 'en-ES') => {
    return new Date(date).toLocaleDateString(locale, {
      month: 'short',
      year: 'numeric',
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)

    const diffMs = now.getTime() - date.getTime()

    const minutes = Math.floor(diffMs / (1000 * 60))
    const hours = Math.floor(diffMs / (1000 * 60 * 60))
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    // minutes
    if (minutes < 60) {
      return t('TIME.MIN', { count: minutes })
    }

    // hours
    if (hours < 24) {
      return t('TIME.HOUR', { count: hours })
    }

    // days
    if (days < 30) {
      return t('TIME.DAY', { count: days })
    }

    // months
    const months = Math.floor(days / 30)
    if (months < 12) {
      return t('TIME.MONTH', { count: months })
    }

    // years
    const years = Math.floor(months / 12)
    return t('TIME.YEAR', { count: years })
  }

  return { formatTimeAgo, formatDateShort }
}
