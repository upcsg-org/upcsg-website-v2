import { Article } from "./article";

export interface Announcement {
    id: number;
    title: string;
    image_url?: string | null;
    summary: string;
    date_created: string;
    date_updated: string;
    article?: Article;
    external_url?: string;
}
