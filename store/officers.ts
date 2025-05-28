import { createGenericStore } from '@/lib/zustand'

// Types
export interface Term {
    id: number
    startYear: number
    endYear: number
    created_at: string
    updated_at: string
    officers?: Officer[]
}

export interface Officer {
    id: number
    term: number
    name: string
    position: string
    yearlevel: string
    image_url: string
    created_at: string
    updated_at: string
}

// Create stores for each entity
export const useTermStore = createGenericStore<Term>('/board/terms', {
    actions: ['fetchAll', 'fetchOne'],
})

export const useCreateUpdateDeleteTermStore = createGenericStore<Term>(
    '/board/terms/manage',
    {
        actions: ['create', 'update', 'remove'],
    }
)

export const useOfficerStore = createGenericStore<Officer>('/board/officers', {
    actions: ['fetchAll', 'fetchOne'],
})

export const useCreateUpdateDeleteOfficerStore = createGenericStore<Officer>(
    '/board/officers/manage',
    {
        actions: ['create', 'update', 'remove'],
    }
)
