import { ChangeEvent, KeyboardEvent } from 'react'
import { FaSearch } from 'react-icons/fa'

interface SearchBarProps {
    placeholder?: string
    searchText: string
    onSearch: (searchText: string) => void
    onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchBar = ({
    placeholder = 'Search...',
    searchText,
    onSearch,
    onInputChange,
}: SearchBarProps) => {
    const handleSearch = () => {
        onSearch(searchText)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="flex md:flex-row items-center w-full">
            <input
                type="text"
                value={searchText}
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="bg-transparent rounded-xl text-xs md:text-xl px-6 py-4 w-full md:max-w-[32rem] h-6 md:h-14 border border-gray-300 text-white caret-white focus:outline-none focus:border-green-500"
            />

            <button
                onClick={handleSearch}
                className="mr-1 md:ml-2 bg-transparent rounded-xl p-3 hover:-translate-y-1 duration-200 md:hover:scale-110"
            >
                <FaSearch className="h-4 w-4 md:h-10 md:w-10 text-white hover:text-green-500" />
            </button>
        </div>
    )
}

export default SearchBar
