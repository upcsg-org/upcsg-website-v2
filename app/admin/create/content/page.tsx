'use client'

import React from 'react'

import CreateEventForm from '@/components/admin/create/content/CreateEventForm'

const AdminCreateContent = () => {
    return (
        <section className="px-14 md:px-32">
            {/* Create Event Selector */}
            <CreateEventForm />
        </section>
    )
}

export default AdminCreateContent
