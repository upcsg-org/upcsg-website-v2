import { Internship } from '@/interface/internship';
import { createGenericStore } from '../lib/zustand';

// Create event store with all CRUD operations
export const useInternshipStore = createGenericStore<Internship>(
    '/cms/internships',
    {
        actions: ['fetchAll', 'fetchOne'],
    }
)

export const useCreateUpdateDeleteInternshipStore = createGenericStore<Internship>(
    '/cms/internships/manage',
    {
        actions: ['create', 'update', 'remove'],
    }
)
