'use client'

import ContentListItem from './ContentListItem'
import TheButton from '../generics/TheButton'
import SearchBar from './SearchBar'
import { useState, useEffect, ChangeEvent, Key } from 'react'
import { FaPlus } from 'react-icons/fa'
import { usePathname, useRouter } from 'next/navigation'
import { useEventStore } from '@/store/event'
import { useAnnouncementStore } from '@/store/announcement'
import { useInternshipStore } from '@/store/internship'
import { useScholarshipStore } from '@/store/scholarship'

const ContentList = (props: { items: any }) => {
    const { items } = props
    const [filteredItems, setFilteredItems] = useState(items)
    const [showStickyBar, setShowStickyBar] = useState(false)
    const [searchText, setSearchText] = useState('')
    const router = useRouter()

    const pathname = usePathname()

    // Extract the last segment of the path
    const pathSegment = pathname ? pathname.split('/').pop() : ''

    // Get the fetch functions from the appropriate stores
    const { fetchAll: fetchEvents } = useEventStore()
    const { fetchAll: fetchAnnouncements } = useAnnouncementStore()
    const { fetchAll: fetchInternships } = useInternshipStore()
    const { fetchAll: fetchScholarships } = useScholarshipStore()

    useEffect(() => {
        setFilteredItems(items)
    }, [items])

    const handleSearch = (searchText: string) => {
        const filtered = items.filter((item: { title: string }) =>
            item.title.toLowerCase().includes(searchText.toLowerCase())
        )
        setFilteredItems(filtered)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }

    const handleItemDelete = () => {
        // Refresh content based on content type
        if (pathSegment === 'event' && fetchEvents) {
            fetchEvents()
        } else if (pathSegment === 'announcement' && fetchAnnouncements) {
            fetchAnnouncements()
        } else if (pathSegment === 'internship' && fetchInternships) {
            fetchInternships()
        } else if (pathSegment === 'scholarship' && fetchScholarships) {
            fetchScholarships()
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowStickyBar(true)
            } else {
                setShowStickyBar(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="relative px-4 md:px-20 pb-10">
            <h1 className="text-3xl font-bold mt-10 uppercase">
                {pathSegment || 'Content'}s
            </h1>

            <div className="flex justify-between items-center mt-4">
                <div className="flex-grow mt-0">
                    <SearchBar
                        searchText={searchText}
                        onSearch={handleSearch}
                        onInputChange={handleInputChange}
                    />
                </div>
                <div className="ml-4 pr-4">
                    <TheButton
                        onClick={() =>
                            router.push(
                                `/admin/create/content?type=${pathSegment}`
                            )
                        }
                    >
                        <div className="flex items-center h-8">
                            <span className="text-lg text-white hidden md:block mr-2">
                                ADD NEW
                            </span>
                            <FaPlus className="h-6 w-6 text-white" />
                        </div>
                    </TheButton>
                </div>
            </div>
            <br />
            <div className="mt-4 space-y-5">
                {filteredItems.map((item: any) => (
                    <ContentListItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        date_created={item.date_created}
                        body={item.body}
                        image_url={item.image_url}
                        author={item.author}
                        contentType={pathSegment || ''}
                        onDelete={handleItemDelete}
                    />
                ))}
            </div>
        </div>
    )
}

export default ContentList
