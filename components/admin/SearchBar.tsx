import { ChangeEvent, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

interface SearchBarProps {
    placeholder?: string
    onSearch: (searchText: string) => void
}

const SearchBar = ({ placeholder = 'Search...', onSearch }: SearchBarProps) => {
    const [searchText, setSearchText] = useState('')

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleSearch = () => {
        onSearch(searchText)
    }

    return (
        <div className="flex flex-row-reverse md:flex-row items-center w-full">
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
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
    )
}

export default SearchBar
