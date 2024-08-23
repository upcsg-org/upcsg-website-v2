import { TRANSPARENT_TO_CYAN, TRANSPARENT_TO_LIGHT_GREEN, TRANSPARENT_TO_VIOLET } from "./generic/colorGradients"

export const events = [
    {
        id: 1,
        image: 'https://res.cloudinary.com/dc7anycov/image/upload/v1723293291/gen_assembly_vnnfeu.jpg',
        title: 'General Assembly',
        schedule: {
            start: new Date(2024, 7, 13, 1),
            end: new Date(2024, 7, 13, 4, 30),
        },
        backgroundStyle: TRANSPARENT_TO_LIGHT_GREEN,
        link: 'https://www.facebook.com/share/p/jtpkyATL6RKDjZ2P'
    },
    {
        id: 2,
        image: 'https://res.cloudinary.com/dc7anycov/image/upload/v1723294810/web3_g4cxav.png',
        title: 'Building On-Chain with ICP',
        schedule: {
            start: new Date(2024, 7, 24, 1),
            end: new Date(2024, 7, 24, 5),
        },
        backgroundStyle: TRANSPARENT_TO_VIOLET,
        article: {
            title: 'Building On-Chain with ICP',
            image: 'https://res.cloudinary.com/dc7anycov/image/upload/v1723294810/web3_g4cxav.png',
            date: new Date(2024, 7, 11),
            body: `Event Venue: University of San Carlos Talamban Campus
            
Building On-Chain with ICP is an event in partnership with Web3 Cebu and Internet Computer Protocol (ICP) Manila.

This event is a part of a larger initiative by DEVCON Philippines and ISLA Camp (ICP Hub Philippines) to accelerate Web3 builders’ education advocacy in the Philippines. Our partnership aims to launch a series of nationwide code camps, specifically designed to teach IT students and developers how to build their first smart contracts on the Internet Computer Protocol (ICP) blockchain platform.
`,
            author: {
                name: ' - UPCSG Publications',
            }
        },
    },
    {
        id: 3,
        image: 'https://res.cloudinary.com/dc7anycov/image/upload/v1723340706/image_2024-08-11_094502409_bm4hac.png',
        title: 'Acquaintance Party 2024',
        schedule: {
            start: new Date(2023, 8),
            end: new Date(2023, 8),
        },
        backgroundStyle: TRANSPARENT_TO_CYAN,
    }
]
