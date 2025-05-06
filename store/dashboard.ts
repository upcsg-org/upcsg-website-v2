import { createGenericStore } from "../lib/zustand";
import { DashboardData } from "../interface/dashboard";
import { apiClient } from "@/lib/api";

// Define the store extension shape
interface DashboardStoreExtension {
    dashboardData: DashboardData | null;
    isRefreshing: boolean;
    refresh: () => Promise<void>;
    fetchData: () => Promise<void>;
}

export const useDashboardStore = createGenericStore<DashboardData, DashboardStoreExtension>('/cms/dashboard', {
    // Specify which default actions you want (optional)
    actions: ['fetchAll', 'fetchOne'],

    // Extend the store with custom state and actions
    extendStore: (set, get) => ({
        // Add custom state
        dashboardData: null,
        isRefreshing: false,

        // Add custom actions
        refresh: async () => {
            const state = get();
            set({ isRefreshing: true } as any);

            if (state.fetchAll) {
                await state.fetchAll();
            }

            set({ isRefreshing: false } as any);
        },

        // Example of a custom action that updates specific data
        fetchData: async () => {
            try {
                console.log('Fetching dashboard data...');
                const response = await apiClient.get<DashboardData>('/cms/dashboard/');
                console.log('Dashboard data received:', response);
                set({ dashboardData: response });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                set({ dashboardData: null });
            }
        }
    })
});
