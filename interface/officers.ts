export interface OfficerRank {
    id: number;
    text: string
}

export interface Officer {
    firstName: string;
    lastName: string;
    role: string;
    rank: OfficerRank
}

