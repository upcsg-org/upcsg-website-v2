import { Scholarship } from '@/interface/scholarship';
import { createGenericStore } from '../lib/zustand';

// Create event store with all CRUD operations
export const useScholarshipStore = createGenericStore<Scholarship>(
    '/cms/scholarships',
    {
        actions: ['fetchAll'],
    }
)
