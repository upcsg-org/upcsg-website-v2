import { apiClient, axiosInstance, initApiClient } from './api';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
    getAccessToken,
    getRefreshToken,
    saveTokens,
    clearTokens,
    AuthTokens
} from '../store/auth';

// Check if the URL matches a public endpoint that doesn't need authentication
const isPublicEndpoint = (url?: string): boolean => {
    if (!url) return false;
    const publicEndpoints = [
        '/api/user/registration/',
        '/api/user/login/',
        '/api/user/token/refresh/',
        '/api/user/token/verify/',
        '/api/user/logout/',
    ];
    return publicEndpoints.some((endpoint) => url.endsWith(endpoint));
};

// Token refresh state management
let isRefreshing = false;
let requestQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: Error) => void;
}> = [];

// Type for custom headers
interface CustomHeaders extends Record<string, any> {
    _retry?: boolean;
    Authorization?: string;
}

const processQueue = (error: Error | null, token: string | null = null) => {
    requestQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    requestQueue = [];
};

// Manually handle logout instead of using useAuthStore to avoid circular imports
const handleLogout = async (): Promise<void> => {
    try {
        // Try to call the backend logout endpoint if we have an axios instance
        if (axiosInstance) {
            await axiosInstance.post('/user/logout/');
        }
    } catch (error) {
        console.error('Failed to logout on server', error);
    }

    // Clear tokens
    clearTokens();

    // Redirect to login page
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
};

// Request interceptor
const requestInterceptor = async (
    reqConfig: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
    if (isPublicEndpoint(reqConfig.url)) {
        return reqConfig;
    }

    const accessToken = getAccessToken();
    if (accessToken && reqConfig.headers) {
        reqConfig.headers.Authorization = `Bearer ${accessToken}`;
    }
    return reqConfig;
};

// Request error interceptor
const requestErrorInterceptor = (error: any) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
};

// Response interceptor
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
};

// Response error interceptor with token refresh logic
const responseErrorInterceptor = async (
    error: AxiosError
): Promise<AxiosResponse> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
        headers: CustomHeaders;
    };

    if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest.headers?._retry ||
        isPublicEndpoint(originalRequest.url)
    ) {
        return Promise.reject(error);
    }

    if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
            requestQueue.push({
                resolve: (token: string) => {
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        originalRequest.headers._retry = true;
                    }
                    resolve(axiosInstance!.request(originalRequest));
                },
                reject: (err: Error) => {
                    reject(err);
                },
            });
        });
    }

    isRefreshing = true;
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        await handleLogout();
        isRefreshing = false;
        processQueue(new Error('Logout due to missing refresh token'), null);
        return Promise.reject(error);
    }

    try {
        const response = await axiosInstance!.post<AuthTokens>(
            '/api/user/token/refresh/',
            {
                refresh: refreshToken,
            }
        );

        const newAccessToken = response.data.access;
        const newRefreshToken = response.data.refresh;

        if (!newAccessToken) {
            throw new Error('Failed to refresh token: No access token returned.');
        }

        saveTokens({
            access: newAccessToken,
            refresh: newRefreshToken,
        });

        if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers._retry = true;
        }

        processQueue(null, newAccessToken);
        return axiosInstance!.request(originalRequest);
    } catch (refreshError) {
        let errorToReject: Error;
        if (refreshError instanceof Error) {
            errorToReject = refreshError;
        } else {
            errorToReject = new Error(
                `Token refresh failed: ${JSON.stringify(refreshError)}`
            );
        }
        processQueue(errorToReject, null);
        await handleLogout();
        return Promise.reject(errorToReject);
    } finally {
        isRefreshing = false;
    }
};

// Initialize API with interceptors
export const initApiWithAuth = (baseURL: string): void => {
    initApiClient({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Add interceptors to the axios instance
    if (axiosInstance) {
        axiosInstance.interceptors.request.use(
            requestInterceptor,
            requestErrorInterceptor
        );
        axiosInstance.interceptors.response.use(
            responseInterceptor,
            responseErrorInterceptor
        );
    }
};

// Export auth-related utilities
export {
    isPublicEndpoint,
};

// Re-export api client for convenience
export { apiClient };
