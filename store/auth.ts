import { create } from 'zustand';
import { apiClient, axiosInstance } from '../lib/api';
import Cookies from 'js-cookie';
import { User } from '../interface/user';

// STORAGE_KEYS for token management
const STORAGE_KEYS = {
    TOKENS: 'auth_tokens',
};

// Authentication tokens interface
export interface AuthTokens {
    access: string;
    refresh: string;
    access_expiration?: string;
    refresh_expiration?: string;
}

// Auth state interface for the store
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: Error | null;
    isAuthChecked: boolean;
    // Auth actions
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => Promise<void>;
    verifyToken: (token?: string) => Promise<boolean>;
    refreshToken: () => Promise<boolean>;
    loadUserFromCookies: () => Promise<void>;
    getProfile: () => Promise<void>;
    updateProfile: (updatedUserData: Partial<User>) => Promise<void>;
    setIsAuthChecked: (checked: boolean) => void;
}

// Registration data interface
export interface RegisterData {
    email: string;
    username?: string;
    password1: string;
    password2: string;
    is_host?: boolean;
    avatar_url?: string;
}

// Get access token from cookies
export const getAccessToken = (): string | null => {
    const tokens = Cookies.get(STORAGE_KEYS.TOKENS);
    if (tokens) {
        try {
            return JSON.parse(tokens).access || null;
        } catch (e) {
            console.error('Failed to parse tokens cookie', e);
            return null;
        }
    }
    return null;
};

// Get refresh token from cookies
export const getRefreshToken = (): string | null => {
    const tokens = Cookies.get(STORAGE_KEYS.TOKENS);
    if (tokens) {
        try {
            return JSON.parse(tokens).refresh || null;
        } catch (e) {
            console.error('Failed to parse tokens cookie', e);
            return null;
        }
    }
    return null;
};

// Save tokens to cookies
export const saveTokens = (tokens: AuthTokens): void => {
    Cookies.set(
        STORAGE_KEYS.TOKENS,
        JSON.stringify(tokens),
        { expires: 7, path: '/', sameSite: 'Lax' }
    );
};

// Clear tokens from cookies
export const clearTokens = (): void => {
    Cookies.remove(STORAGE_KEYS.TOKENS);
};

// Auth store using Zustand
export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    isAuthChecked: false,

    setIsAuthChecked: (checked: boolean) => set({ isAuthChecked: true }),

    login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.post<{ access: string; refresh: string; user: User }>(
                '/user/login/',
                { username, password }
            );

            saveTokens({
                access: response.access,
                refresh: response.refresh,
            });

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error instanceof Error ? error : new Error(String(error)),
                isLoading: false,
                isAuthenticated: false,
            });
        }
    },

    register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.post<{ access: string; refresh: string; user: User }>(
                '/user/registration/',
                data
            );

            saveTokens({
                access: response.access,
                refresh: response.refresh,
            });

            set({
                user: response.user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error: any) {
            set({
                error: error instanceof Error ? error : new Error(String(error)),
                isLoading: false,
            });
        }
    },

    logout: async () => {
        set({ isLoading: true, error: null });
        const refreshToken = getRefreshToken();
        try {
            // Try to call the backend logout endpoint if we have an axios instance
            if (axiosInstance) {
                await axiosInstance.post('/user/logout/', {
                    refresh: refreshToken,
                });
            }
        } catch (error) {
            console.error('Failed to logout on server', error);
            // Continue with logout process regardless of server response
        }

        // Always clear local state
        clearTokens();
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        });

        // Redirect to login page
        if (typeof window !== 'undefined') {
            // window.location.href = '/login';
        }
    },

    verifyToken: async (token?: string) => {
        const tokenToVerify = token || getAccessToken();
        if (!tokenToVerify) return false;

        try {
            await apiClient.post('/user/token/verify/', { token: tokenToVerify });
            return true;
        } catch (error) {
            return false;
        }
    },

    refreshToken: async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken) return false;

        try {
            const response = await apiClient.post<AuthTokens>(
                '/user/token/refresh/',
                { refresh: refreshToken }
            );

            saveTokens({
                access: response.access,
                refresh: response.refresh,
                access_expiration: response.access_expiration,
                refresh_expiration: response.refresh_expiration,
            });

            return true;
        } catch (error) {
            return false;
        }
    },

    getProfile: async () => {
        try {
            const response = await apiClient.get<User>('/user/user/');
            set({ user: response });
        } catch (error) {
            console.error("AuthStore: Failed to get profile", error);
        }
    },

    updateProfile: async (updatedUserData: Partial<User>) => {
        set({ isLoading: true, error: null });
        try {
            const response = await apiClient.put<User>('/user/user/', updatedUserData);
            set({ user: response, isLoading: false });
        } catch (error) {
            console.error("AuthStore: Failed to update profile", error);
            set({
                error: error instanceof Error ? error : new Error('Failed to update profile'),
                isLoading: false
            });
            throw error; // Re-throw so component can handle it
        }
    },

    loadUserFromCookies: async () => {
        const accessToken = getAccessToken();
        if (!accessToken) return;

        set({ isLoading: true });
        try {
            // First verify the token is valid
            const isValid = await get().verifyToken(accessToken);

            if (!isValid) {
                // Try to refresh the token if not valid
                const refreshed = await get().refreshToken();
                if (!refreshed) {
                    set({ isAuthenticated: false, isLoading: false });
                    return;
                }
            }

            // If token is valid (or was successfully refreshed), fetch user profile
            set({ isAuthenticated: true });
            await get().getProfile();
            set({ isLoading: false });
        } catch (error) {
            console.error("AuthStore: Failed to load user from cookies", error);
            set({
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
}));

// Don't auto-initialize - export an init function instead
export const initializeAuth = async (): Promise<void> => {
    // This should be called after API client is initialized
    if (typeof window !== 'undefined') {
        await useAuthStore.getState().loadUserFromCookies();
    }
};
