export const getDateString = (datetime: Date) => {
    const formatOptions: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const dateString = datetime.toLocaleDateString('en-US', formatOptions)
    return dateString
}

export const getTimeString = (datetime: Date) => {
    const formatOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
    }
    const timeString = datetime.toLocaleTimeString('en-US', formatOptions)
    return timeString
}

export const getDayOfWeek = (datetime: Date) => {
    const dayOfWeek = datetime.toLocaleDateString('en-US', {
        weekday: 'long',
    })

    return dayOfWeek
}
