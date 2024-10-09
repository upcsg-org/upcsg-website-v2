const Header = () => {
   

    return (

        <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">PERMISSIONS</h1>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search a User..."
                    className="px-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none"
                />
                <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
                    ADD USER
                </button>
            </div>
        </div>
    
    );
};

export default Header;