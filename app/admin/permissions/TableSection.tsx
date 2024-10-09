import { PencilIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/solid"; 

const Table = ({ currentPage }) => {

    // Simulated user data for different pages
    const usersPageData = {
        1: [
            { name: "Admin Name 1", email: "admin1@up.edu.ph", role: "Admin" },
            { name: "User 1", email: "user1@up.edu.ph", role: "Designer" },
            { name: "User 69", email: "user69@up.edu.ph", role: "Designer" }
        ],
        2: [
            { name: "Admin Name 2", email: "admin2@up.edu.ph", role: "Developer" },
            { name: "User 2", email: "user2@up.edu.ph", role: "Designer" }
        ],
        3: [
            { name: "Admin Name 3", email: "admin3@up.edu.ph", role: "Developer" },
            { name: "User 3", email: "user3@up.edu.ph", role: "Designer" }
        ],
        4: [
            { name: "Admin Name 4", email: "admin4@up.edu.ph", role: "Developer" },
            { name: "User 4", email: "user4@up.edu.ph", role: "Designer" }
        ]
    };

    // Fallback if no data is available for the current page
    const users = usersPageData[currentPage] || [];

    return (
        <table className="border-spacing-y-2 w-full border-separate text-left">
            <thead>
                <tr className="bg-gray-900 text-white-400">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="py-3 px-4 text-center text-gray-400">
                            No users available for this page.
                        </td>
                    </tr>
                ) : (
                    users.map((user, index) => (
                        <tr key={index} className="bg-gray-800">
                            <td className="py-3 px-4 flex items-center">
                                <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
                                {user.name}
                            </td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                                <span className="inline-block px-3 py-1 text-sm bg-green-500 text-white rounded-lg">
                                    {user.role}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <div className="flex space-x-8">
                                    <button className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center">
                                        <PencilIcon className="h-5 w-5 mr-2" />
                                        Modify Roles
                                    </button>
                                    <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center">
                                        <TrashIcon className="h-5 w-5 mr-2" />
                                        Remove User
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default Table;
