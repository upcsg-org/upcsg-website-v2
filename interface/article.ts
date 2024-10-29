export interface Article {
    title: string
    image: string
    date: Date
    body: string
    author: Author
}

export interface ArticleList {
    articles: Article[]
}

export interface Author {
    name: string
    email?: string
    jobTitle?: string
}
