"use client";

import { ArticleList } from '@/interface/article';
import ContentListItem from './ContentListItem';
import TheButton from '../generics/TheButton';
import SearchBar from './SearchBar';
import { useState, useEffect, ChangeEvent } from 'react';
import { FaPlus } from 'react-icons/fa';

const ContentList = (props: ArticleList) => {
    const { articles } = props;
    const [filteredArticles, setFilteredArticles] = useState(articles);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [searchText, setSearchText] = useState(''); 

    const handleSearch = (searchText: string) => {
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredArticles(filtered);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowStickyBar(true);
            } else {
                setShowStickyBar(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative px-4 md:px-20 top-4">
            <div className="flex justify-between items-center mt-8">
                <div className="flex-grow mt-0">
                    <SearchBar 
                        searchText={searchText} 
                        onSearch={handleSearch}
                        onInputChange={handleInputChange}
                    />
                </div>
                <div className="ml-4 pr-4">
                    <TheButton>
                        <div className="flex items-center h-8">
                            <span className="text-lg text-white hidden md:block mr-2">ADD NEW</span>
                            <FaPlus className="h-6 w-6 text-white" />
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
