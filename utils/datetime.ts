export const getDateString = (datetime: Date) => {
    if (!(datetime instanceof Date)) {
        datetime = new Date(datetime);
    }

    const day = datetime.getDate();

    const formatOptions: Intl.DateTimeFormatOptions = day > 1
        ? {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        : {
            year: 'numeric',
            month: 'long',
        };

    const dateString = datetime.toLocaleDateString('en-US', formatOptions);
    return dateString;
}

export const getTimeString = (datetime: Date) => {
    const hours = datetime.getHours();
    const minutes = datetime.getMinutes();
    const seconds = datetime.getSeconds();

    // Check if time is exactly midnight (00:00:00)
    if (hours === 0 && minutes === 0 && seconds === 0) {
        return undefined;
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false,
    };

    const timeString = datetime.toLocaleTimeString('en-US', formatOptions);
    return timeString;
}

export const getDayOfWeek = (datetime: Date) => {
    const day = datetime.getDate();

    // If the day is 1 and the time is 00:00:00.000, assume only year and month were provided
    if (day === 1 && datetime.getHours() === 0 && datetime.getMinutes() === 0 && datetime.getSeconds() === 0 && datetime.getMilliseconds() === 0) {
        return undefined;
    }

    const dayOfWeek = datetime.toLocaleDateString('en-US', {
        weekday: 'long',
    });

    return dayOfWeek;
}



