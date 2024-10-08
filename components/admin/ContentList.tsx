import { ArticleList } from '@/interface/article'
import ContentListItem from './ContentListItem'

const ContentList = (props: ArticleList) => {
    const { articles } = props

    return (
        <div>
            {articles.map((article, index) => (
                <ContentListItem
                    key={index}
                    title={article.title}
                    date={article.date}
                    body={article.body}
                    image={article.image}
                    author={article.author}
                />
            ))}
        </div>
    )
}

export default ContentList
