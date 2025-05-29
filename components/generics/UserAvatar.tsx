import React from 'react'
import Image from 'next/image'
import { User } from '@/interface/user'

interface UserAvatarProps {
    user: User
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    user,
    size = 'md',
    className = '',
}) => {
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'h-8 w-8 text-sm'
            case 'md':
                return 'h-10 w-10 text-base'
            case 'lg':
                return 'h-32 w-32 text-3xl'
            default:
                return 'h-10 w-10 text-base'
        }
    }

    const sizeClasses = getSizeClasses()

    if (user.image_url) {
        return (
            <div
                className={`${sizeClasses} rounded-full overflow-hidden ${className}`}
            >
                <Image
                    src={user.image_url}
                    alt={`${user.first_name} ${user.last_name}`}
                    width={size === 'lg' ? 128 : size === 'md' ? 40 : 32}
                    height={size === 'lg' ? 128 : size === 'md' ? 40 : 32}
                    className="object-cover w-full h-full"
                />
            </div>
        )
    }

    return (
        <div
            className={`${sizeClasses} rounded-full bg-gray-200 flex items-center justify-center ${className}`}
        >
            <span className="text-gray-600 font-medium">
                {user.username.charAt(0).toUpperCase()}
            </span>
        </div>
    )
}

export default UserAvatar
