import { createGenericStore } from '../lib/zustand';
import { Concern } from '@/interface/help';

export const useConcernStore = createGenericStore<Concern>('/help/concerns', {
    actions: ['create'],
});

export const useListConcernStore = createGenericStore<Concern>('/help/concerns/manage', {
    actions: ['fetchAll'],
});

export const useCreateUpdateDeleteConcernStore = createGenericStore<Concern>('/help/concerns/manage', {
    actions: ['fetchOne', 'update', 'remove'],
});
