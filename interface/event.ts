import { Article } from "./article";

export interface Event {
    id: number;
    image: string;
    title: string;
    schedule: {
        start: Date;
        end: Date;
    }
    backgroundStyle: string;
    article: Article
}
