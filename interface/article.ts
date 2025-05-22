export interface Article {
    id: number
    title: string
    date_created: Date
    date_updated: Date
    body: string
    author: string
}

export interface ArticleList {
    articles: Article[]
}
