import { ChangeEvent, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface SearchBarProps {
    placeholder?: string
    onSearch: (searchText: string) => void
}

const SearchBar = ({ placeholder = 'Search...', onSearch }: SearchBarProps) => {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleSearch = () => {
        onSearch(searchText);
    };

    const inputClassName = 'bg-transparent rounded-xl text-lg md:text-xl px-6 py-4 w-full max-w-[35rem] h-14 border border-gray-300'; // Keep the height consistent

    return (
        <div className="flex items-center">
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder={placeholder}
                className={`${inputClassName} text-white caret-white focus:outline-none focus:border-green-500`}
            />
            <button
                onClick={handleSearch}
                className="ml-2 bg-transparent rounded-xl p-3 hover:-translate-y-1 duration-200 md:hover:scale-110"
            >
                <MagnifyingGlassIcon className="h-10 w-10 text-white hover:text-green-500" />
            </button>
        </div>
    );
};

export default SearchBar;
