'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { useCreateUpdateDeleteEventStore, useEventStore } from '@/store/event'
import {
    useCreateUpdateDeleteAnnouncementStore,
    useAnnouncementStore,
} from '@/store/announcement'
import {
    useCreateUpdateDeleteInternshipStore,
    useInternshipStore,
} from '@/store/internship'
import {
    useCreateUpdateDeleteScholarshipStore,
    useScholarshipStore,
} from '@/store/scholarship'

interface ContentListItemProps {
    id: number
    title: string
    image_url?: string
    date_created: Date | string
    body: string
    author?: string
    contentType: string
    onDelete?: () => void
}

const ContentListItem = (props: ContentListItemProps) => {
    const { id, title, image_url, date_created, body, contentType, onDelete } =
        props
    const formattedDate =
        date_created instanceof Date
            ? date_created.toLocaleDateString()
            : typeof date_created === 'string'
              ? new Date(date_created).toLocaleDateString()
              : 'No date'

    const [isButtonHovered, setIsButtonHovered] = useState(false)
    const defaultImage = '/images/placeholder-standard.svg'

    const { remove: removeEvent } = useCreateUpdateDeleteEventStore()
    const { remove: removeAnnouncement } =
        useCreateUpdateDeleteAnnouncementStore()
    const { remove: removeInternship } = useCreateUpdateDeleteInternshipStore()
    const { remove: removeScholarship } =
        useCreateUpdateDeleteScholarshipStore()

    const { fetchAll: fetchAllEvents } = useEventStore()
    const { fetchAll: fetchAllAnnouncements } = useAnnouncementStore()
    const { fetchAll: fetchAllInternships } = useInternshipStore()
    const { fetchAll: fetchAllScholarships } = useScholarshipStore()

    const handleDelete = async () => {
        console.log('DELETING', id)
        try {
            if (removeEvent && contentType === 'event') {
                await removeEvent(id)
                if (onDelete) onDelete()
            } else if (removeAnnouncement && contentType === 'announcement') {
                await removeAnnouncement(id)
                if (onDelete) onDelete()
            } else if (removeInternship && contentType === 'internship') {
                await removeInternship(id)
                if (onDelete) onDelete()
            } else if (removeScholarship && contentType === 'scholarship') {
                await removeScholarship(id)
                if (onDelete) onDelete()
            }
        } catch (error) {
            console.error('Error deleting content:', error)
        }
    }

    return (
        <div
            className={`bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center relative`}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
        >
            <div className="relative w-full md:w-48 h-36 rounded overflow-hidden flex-shrink-0 mb-4 md:mb-0">
                <Image
                    src={image_url || defaultImage}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 192px"
                />
            </div>
            <div className="md:ml-4 flex-1">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-gray-400">{formattedDate}</p>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                    {body}
                </p>
            </div>
            <div
                className={`absolute top-2 right-2 flex space-x-2 ${isButtonHovered ? 'opacity-100' : 'opacity-0'} transition-opacity`}
            >
                <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    <BiEdit size={20} />
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    <BiTrash size={20} />
                </button>
            </div>
        </div>
    )
}

export default ContentListItem
