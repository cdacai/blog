import settings from '@/settings'

export default function getPageTitle(pageTitle) {
    const title = settings.title || 'NBlog'

    if (pageTitle) {
        return `${pageTitle}${settings.webTitleSuffix}`
    }
    return title
} 