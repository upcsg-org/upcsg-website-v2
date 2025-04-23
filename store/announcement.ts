import { createGenericStore } from '../lib/zustand';
import { Announcement } from '@/interface/announcement';

// Create event store with all CRUD operations
export const useAnnouncementStore = createGenericStore<Announcement>(
    '/cms/announcements',
    {
        actions: ['fetchAll'],
    }
)
