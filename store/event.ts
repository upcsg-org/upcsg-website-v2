import { createGenericStore } from '../lib/zustand';
import { Event } from '@/interface/event';

// Create event store with all CRUD operations
export const useEventStore = createGenericStore<Event>('/cms/events', {
    actions: ['fetchAll'],
});

export const useCreateUpdateDeleteEventStore = createGenericStore<Event>('/cms/events/manage', {
    actions: ['create', 'update', 'remove'],
});
