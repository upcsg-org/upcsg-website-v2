export interface Article {
    title: string
    date: Date
    body: string
    author: Author
}

export interface Author {
    name: string
    email?: string
    jobTitle: string
}
