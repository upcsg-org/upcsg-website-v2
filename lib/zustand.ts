// stores/createGenericStore.ts
import { create, StoreApi, UseBoundStore } from 'zustand';
import { apiClient } from './api';

// Define the structure for pagination metadata
export interface Meta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

// Define the base state for the generic store
export interface GenericState<T> {
  items: T[];
  item: T | null;
  loading: boolean;
  error: Error | null;
  meta: Meta;
}

// Define the available actions as string literals
export type ActionType = 'fetchAll' | 'fetchOne' | 'create' | 'update' | 'remove';

// Define the actions for the generic store
export interface GenericActions<T> {
  fetchAll?: (params?: Record<string, any>) => Promise<void>;
  fetchOne?: (id: string | number) => Promise<void>;
  create?: (payload: Partial<T>) => Promise<T | undefined>;
  update?: (id: string | number, payload: Partial<T>) => Promise<T | undefined>;
  remove?: (id: string | number) => Promise<void>;
}

// Define the type for the optional extendStore function
// TExtension defines the shape of the object returned by extendStore
type ExtendStore<T, TExtension extends Record<string, any>> = (
  set: StoreApi<GenericState<T> & GenericActions<T> & TExtension>['setState'],
  get: StoreApi<GenericState<T> & GenericActions<T> & TExtension>['getState'],
) => TExtension;

// Define the return type of createGenericStore
// It returns a Zustand hook specialized for the combined type
type CreateGenericStoreReturn<T, TExtension extends Record<string, any>> = UseBoundStore<StoreApi<GenericState<T> & GenericActions<T> & TExtension>>;


// Update function signature to accept TExtension generic
export const createGenericStore = <
    T extends { id: string | number },
    TExtension extends Record<string, any> = Record<string, never> // Default to empty object if no extension
>(
  endpoint: string,
  options?: {
    actions?: ActionType[];
    extendStore?: ExtendStore<T, TExtension>;
  }
): CreateGenericStoreReturn<T, TExtension> => { // Use the updated return type

    // Default function if extendStore is not provided
    // Cast the empty object to TExtension to satisfy the type
    const defaultExtend = (() => ({} as TExtension)) as ExtendStore<T, TExtension>;
    
    // Default actions include all available actions if none specified
    const availableActions: ActionType[] = options?.actions || ['fetchAll', 'fetchOne', 'create', 'update', 'remove'];

    // Define the full state type for casting partial updates
    type FullStoreState = GenericState<T> & GenericActions<T> & TExtension;

    return create<FullStoreState>((set, get) => {
      // Initialize with base state
      const store: GenericState<T> & Partial<GenericActions<T>> = {
        // === Generic state ===
        items: [],
        item: null,
        loading: false,
        error: null,
        meta: {
          currentPage: 1,
          totalPages: 1,
          totalCount: 0,
        }
      };

      // Conditionally add actions based on configuration
      if (availableActions.includes('fetchAll')) {
        store.fetchAll = async (params: Record<string, any> = {}) => {
          set({ loading: true, error: null } as Partial<FullStoreState>);
          try {
            interface ApiResponse {
                objects?: T[];
                current_page?: number;
                num_pages?: number;
                total_count?: number;
            }
            const data: ApiResponse = await apiClient.get<ApiResponse>(`${endpoint}/`, params);
            set({
              items: data.objects || [],
              meta: {
                currentPage: data.current_page || 1,
                totalPages: data.num_pages || 1,
                totalCount: data.total_count || (data.objects ? data.objects.length : 0),
              },
              loading: false,
            } as Partial<FullStoreState>);
          } catch (error: any) {
            set({ error: error instanceof Error ? error : new Error(String(error)), loading: false } as Partial<FullStoreState>);
          }
        };
      }

      if (availableActions.includes('fetchOne')) {
        store.fetchOne = async (id: string | number) => {
          set({ loading: true, error: null } as Partial<FullStoreState>);
          try {
            const data = await apiClient.get<T>(`${endpoint}/${id}/`);
            set({ item: data, loading: false } as Partial<FullStoreState>);
          } catch (error: any) {
            set({ error: error instanceof Error ? error : new Error(String(error)), loading: false } as Partial<FullStoreState>);
          }
        };
      }

      if (availableActions.includes('create')) {
        store.create = async (payload: Partial<T>) => {
          set({ loading: true, error: null } as Partial<FullStoreState>);
          let createdData: T | undefined = undefined;
          try {
            createdData = await apiClient.post<T>(`${endpoint}/`, payload);
            set({ loading: false } as Partial<FullStoreState>);
            // Refetch list if fetchAll is available
            const state = get();
            if ('fetchAll' in state && typeof state.fetchAll === 'function') {
              await state.fetchAll();
            }
            return createdData;
          } catch (error: any) {
            set({ error: error instanceof Error ? error : new Error(String(error)), loading: false } as Partial<FullStoreState>);
            return undefined;
          }
        };
      }

      if (availableActions.includes('update')) {
        store.update = async (id: string | number, payload: Partial<T>) => {
          set({ loading: true, error: null } as Partial<FullStoreState>);
          let updatedData: T | undefined = undefined;
          try {
            updatedData = await apiClient.put<T>(`${endpoint}/${id}/`, payload);
            set({ loading: false } as Partial<FullStoreState>);
            // Refetch list if fetchAll is available
            const state = get();
            if ('fetchAll' in state && typeof state.fetchAll === 'function') {
              await state.fetchAll();
            }
            return updatedData;
          } catch (error: any) {
            set({ error: error instanceof Error ? error : new Error(String(error)), loading: false } as Partial<FullStoreState>);
            return undefined;
          }
        };
      }

      if (availableActions.includes('remove')) {
        store.remove = async (id: string | number) => {
          set({ loading: true, error: null } as Partial<FullStoreState>);
          try {
            await apiClient.delete(`${endpoint}/${id}/`);
            set({ loading: false } as Partial<FullStoreState>);
            // Refetch list if fetchAll is available
            const state = get();
            if ('fetchAll' in state && typeof state.fetchAll === 'function') {
              await state.fetchAll();
            }
          } catch (error: any) {
            set({ error: error instanceof Error ? error : new Error(String(error)), loading: false } as Partial<FullStoreState>);
          }
        };
      }

      return {
        ...store as unknown as FullStoreState,
        // === Add custom state/actions here ===
        ...(options?.extendStore ? options.extendStore(set, get) : defaultExtend(set, get)),
      };
    });
};
