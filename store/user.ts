import { createGenericStore } from '../lib/zustand';
import { User } from '@/interface/user';

export const useManageUserStore = createGenericStore<User>(
    '/user/manage',
    {
        actions: ['fetchAll', 'fetchOne', 'update', 'remove'],
    }
)
