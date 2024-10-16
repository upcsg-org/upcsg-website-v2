import { ChangeEvent, KeyboardEvent } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchBarProps {
    placeholder?: string;
    searchText: string;
    onSearch: (searchText: string) => void;
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ placeholder = 'Search...', searchText, onSearch, onInputChange }: SearchBarProps) => {

    const handleSearch = () => {
        onSearch(searchText);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-row-reverse md:flex-row items-center w-full">
            <input
                type="text"
                value={searchText}
                onChange={onInputChange}
                onKeyDown={handleKeyDown} 
                placeholder={placeholder}
                className="bg-transparent rounded-xl text-lg md:text-xl px-6 py-4 w-full md:max-w-[32rem] h-14 border border-gray-300 text-white caret-white focus:outline-none focus:border-green-500"
            />

            <button
                onClick={handleSearch}
                className="mr-1 md:ml-2 bg-transparent rounded-xl p-3 hover:-translate-y-1 duration-200 md:hover:scale-110"
            >
                <MagnifyingGlassIcon className="h-10 w-10 text-white hover:text-green-500" />
            </button>
        </div>
    );
};

export default SearchBar;
