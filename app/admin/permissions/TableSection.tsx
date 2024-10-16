import React from "react";
import { FaPencilAlt, FaTrash, FaUserCircle } from "react-icons/fa";

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
                        <td colSpan="4" className="py-3 px-4 text-gray-400 text-center">
                            No users available for this page.
                        </td>
                    </tr>
                ) : (
                    users.map((user, index) => (
                        <tr key={index} className="bg-gray-800">
                            <td className="py-3 px-4 flex items-center">
                                <FaUserCircle className="h-5 w-5 mr-2" />
                                {user.name}
                            </td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                                <span className="px-3 py-1 bg-green-500 text-white inline-block rounded-lg text-sm">
                                    {user.role}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <div className="space-x-8 flex">
                                    <button className= "px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center">
                                        <FaPencilAlt className="h-3 w-4 mr-2" />
                                        Modify Roles
                                    </button>
                                    <button className="px-3 py-1 bg-red-500 text-white flex items-center rounded-lg hover:bg-red-600">
                                        <FaTrash  className="h-3 w-4 mr-2" />
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
