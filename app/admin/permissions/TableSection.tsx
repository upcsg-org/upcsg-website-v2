import React from 'react'
import { FaUserCircle, FaToggleOn, FaToggleOff, FaTrash } from 'react-icons/fa'
import { User } from '@/interface/user'

interface TableProps {
    users: User[]
    loading: boolean
    error: Error | null
    onToggleSuperuser: (
        userId: string | number,
        currentStatus: boolean,
        username: string
    ) => Promise<void>
    onRemoveUser: (userId: string | number) => Promise<void>
}

const Table = ({
    users,
    loading,
    error,
    onToggleSuperuser,
    onRemoveUser,
}: TableProps) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-8">
                <div className="text-gray-400">Loading users...</div>
            </div>
        )
    }

    return (
        <table className="border-spacing-y-2 w-full border-separate text-left">
            <thead>
                <tr className="bg-gray-900 text-white-400">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Superuser</th>
                    <th className="py-3 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.length === 0 ? (
                    <tr>
                        <td
                            colSpan={5}
                            className="py-3 px-4 text-gray-400 text-center"
                        >
                            No users found.
                        </td>
                    </tr>
                ) : (
                    users.map((user) => (
                        <tr key={user.id} className="bg-gray-800">
                            <td className="py-3 px-4 flex items-center">
                                {user.image_url ? (
                                    <img
                                        src={user.image_url}
                                        alt={`${user.first_name} ${user.last_name}`}
                                        className="h-8 w-8 rounded-full mr-3 object-cover"
                                    />
                                ) : (
                                    <FaUserCircle className="h-8 w-8 mr-3 text-gray-400" />
                                )}
                                <div>
                                    <div className="font-medium">
                                        {user.first_name} {user.last_name}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        @{user.username}
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-4">{user.email}</td>
                            <td className="py-3 px-4">
                                <span
                                    className={`px-3 py-1 inline-block rounded-lg text-sm ${
                                        user.is_active
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                    }`}
                                >
                                    {user.is_active ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() =>
                                        onToggleSuperuser(
                                            user.id!,
                                            user.is_superuser,
                                            user.username
                                        )
                                    }
                                    className="flex items-center space-x-2 hover:opacity-80"
                                    title={`${user.is_superuser ? 'Remove' : 'Grant'} superuser access`}
                                >
                                    {user.is_superuser ? (
                                        <FaToggleOn className="h-6 w-6 text-green-500" />
                                    ) : (
                                        <FaToggleOff className="h-6 w-6 text-gray-400" />
                                    )}
                                    <span
                                        className={
                                            user.is_superuser
                                                ? 'text-green-500'
                                                : 'text-gray-400'
                                        }
                                    >
                                        {user.is_superuser ? 'Yes' : 'No'}
                                    </span>
                                </button>
                            </td>
                            <td className="py-3 px-4">
                                <button
                                    onClick={() => onRemoveUser(user.id!)}
                                    className="px-3 py-1 bg-red-500 text-white flex items-center rounded-lg hover:bg-red-600"
                                >
                                    <FaTrash className="h-3 w-4 mr-2" />
                                    Remove User
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default Table
