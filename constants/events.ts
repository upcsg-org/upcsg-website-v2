const LIGHT_GREEN = 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(65, 160, 30,0.7), rgba(65, 160, 30,1))'
const VIOLET = 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(123, 0, 198,0.7), rgba(123, 0, 198,1))'
const CYAN = 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6), rgba(57, 162, 174,0.7), rgba(57, 162, 174, 1))'

export const events = [
    {
        id: 1,
        image: '/images/placeholder.png',
        title: 'API Generation / Postman Workshop',
        schedule: {
            start: new Date(2023, 8, 20, 8),
            end: new Date(2023, 8, 20, 11),
        },
        backgroundStyle: LIGHT_GREEN
    },
    {
        id: 2,
        image: '/images/placeholder.png',
        title: 'API Generation / Postman Workshop',
        schedule: {
            start: new Date(2023, 8, 20, 8),
            end: new Date(2023, 8, 20, 11),
        },
        backgroundStyle: VIOLET
    },
    {
        id: 3,
        image: '/images/placeholder.png',
        title: 'API Generation / Postman Workshop',
        schedule: {
            start: new Date(2023, 8, 20, 8),
            end: new Date(2023, 8, 20, 11),
        },
        backgroundStyle: CYAN
    }
]
