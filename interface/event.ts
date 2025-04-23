import { Article } from "./article";

export interface Event {
    id: number;
    image_url?: string;
    title: string;
    start_date?: Date;
    end_date?: Date;
    article?: Article
    external_url?: string
    date_created: Date;
    date_updated: Date;
    body: string;
}
