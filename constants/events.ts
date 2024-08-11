import { TRANSPARENT_TO_CYAN, TRANSPARENT_TO_LIGHT_GREEN, TRANSPARENT_TO_VIOLET } from "./generic/colorGradients"

export const events = [
    {
        id: 1,
        image: '/images/placeholder.png',
        title: 'API Generation / Postman Workshop',
        schedule: {
            start: new Date(2023, 8, 20, 8),
            end: new Date(2023, 8, 20, 11),
        },
        backgroundStyle: TRANSPARENT_TO_LIGHT_GREEN,
        article: {
            title: 'Test',
            date: new Date(0),
            body: 'sdfsdf\nfdsfds\n',
            author: {
                name: 'test',
                email: 'test',
                jobTitle: 'test'
            }
        }
    },
    {
        id: 2,
        image: '/images/placeholder.png',
        title: 'API Generation / Postman Workshop',
        schedule: {
            start: new Date(2023, 8, 20, 8),
            end: new Date(2023, 8, 20, 11),
        },
        backgroundStyle: TRANSPARENT_TO_VIOLET,
        article: {
            title: 'Test',
            date: new Date(0),
            body: `test
            set
            setes`,
            author: {
                name: 'test',
                email: 'test',
                jobTitle: 'test'
            }
        }
    },
    {
        id: 3,
        image: '/images/placeholder.png',
        title: 'API Generation / Postman Workshop',
        schedule: {
            start: new Date(2023, 8, 20, 8),
            end: new Date(2023, 8, 20, 11),
        },
        backgroundStyle: TRANSPARENT_TO_CYAN,
        article: {
            title: 'Test',
            date: new Date(0),
            body: `test
            set
            setes`,
            author: {
                name: 'test',
                email: 'test',
                jobTitle: 'test'
            }
        }
    }
]
