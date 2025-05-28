interface HeaderProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

const Header = ({ searchQuery, setSearchQuery }: HeaderProps) => {
    return (
        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">USER MANAGEMENT</h1>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none"
                />
            </div>
        </div>
    )
}

export default Header
