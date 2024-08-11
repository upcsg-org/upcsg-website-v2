export interface OfficerRank {
    id: number;
    text: string
}

export interface Officer {
    firstName: string;
    lastName: string;
    image: string;
    role: string;
    year: string;
    rank: OfficerRank;
}

