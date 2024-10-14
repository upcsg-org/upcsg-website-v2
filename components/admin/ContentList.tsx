"use client";

import { ArticleList } from '@/interface/article';
import ContentListItem from './ContentListItem';
import TheButton from '../generics/TheButton';
import SearchBar from './SearchBar';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/solid';

const ContentList = (props: ArticleList) => {
    const { articles } = props;
    const [filteredArticles, setFilteredArticles] = useState(articles);

    const handleSearch = (searchText: string) => {
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    return (
        <div className="relative px-4 md:px-20 top-4"> 
            <div className="flex justify-between items-center mt-10">
                <div className="flex-grow mt-0">
                    <SearchBar onSearch={handleSearch} />
                </div>
                
                <div className="ml-4 pr-4">
                    <TheButton>
                        <div className="flex items-center h-10">
                            <span className="text-lg text-white">ADD NEW</span>
                            <PlusIcon className="h-6 w-6 text-white ml-2" />
                        </div>
                    </TheButton>
                </div>
            </div>
            <br />
            <div className="mt-4 space-y-5">
                {filteredArticles.map((article, index) => (
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
        </div>
    );
};

export default ContentList;
