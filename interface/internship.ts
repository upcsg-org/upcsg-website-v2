import { Article } from "./article";

export interface Internship {
    id: number;
    title: string;
    image_url?: string;
    opening_date?: string;
    deadline?: string;
    requirements?: string;
    benefits?: string;
    organization?: string;
    article?: Article;
    external_url?: string;
}
