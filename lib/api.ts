// utils/apiClient.js
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
    InternalAxiosRequestConfig,
} from 'axios'

// Export for testing purposes - make it potentially undefined
export let axiosInstance: AxiosInstance | undefined

// Define the configuration type for initApiClient
// Extends AxiosRequestConfig but makes baseURL mandatory
interface ApiClientConfig extends Omit<AxiosRequestConfig, 'baseURL'> {
    baseURL: string
    requestInterceptors?: (
        config: InternalAxiosRequestConfig
    ) => Promise<InternalAxiosRequestConfig> | InternalAxiosRequestConfig
    requestInterceptorErrors?: (error: any) => Promise<any>
    responseInterceptors?: (
        response: AxiosResponse
    ) => AxiosResponse | Promise<AxiosResponse>
    responseInterceptorErrors?: (error: any) => Promise<any>
}

// Function to initialize the API client
export const initApiClient = (config: ApiClientConfig): void => {
    const {
        baseURL,
        requestInterceptors,
        requestInterceptorErrors,
        responseInterceptors,
        responseInterceptorErrors,
        ...restConfig
    } = config
    axiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
        ...restConfig, // Spread the rest of the config FIRST
        headers: {
            // Define headers AFTER, ensuring merge takes precedence
            'Content-Type': 'application/json',
            ...(restConfig.headers || {}), // Merge custom headers from restConfig
        },
        // No need to spread restConfig again here
    })

    // Add request interceptors if provided
    if (requestInterceptors) {
        axiosInstance.interceptors.request.use(
            requestInterceptors,
            requestInterceptorErrors || ((error) => Promise.reject(error))
        )
    }

    // Add response interceptors if provided
    if (responseInterceptors) {
        axiosInstance.interceptors.response.use(
            responseInterceptors,
            responseInterceptorErrors || ((error) => Promise.reject(error))
        )
    }
}

// Optional: Global error handler (keep as is for now, or add specific error types)
const handleError = (error: any): never => {
    // Using 'any' for now, consider defining a specific error type
    if (error.response) {
        console.error('API Error:', error.response.data)
        throw error.response.data // Re-throw the specific API error data
    } else if (error.request) {
        console.error('No response from server:', error.request)
        throw new Error('No response from server')
    } else {
        console.error('Request error:', error.message)
        throw new Error(`Request failed: ${error.message}`)
    }
}

// Check if axiosInstance is initialized before making a request
// Use a generic type T for the expected response data
const request = async <T = any>(
    method: Method,
    url: string,
    dataOrParams?: any
): Promise<T> => {
    if (!axiosInstance) {
        throw new Error(
            'apiClient not initialized. Call initApiClient(config) first.'
        )
    }
    try {
        // AxiosRequestConfig for get requests uses 'params', others use 'data'
        const config: AxiosRequestConfig = {}
        if (
            method.toLowerCase() === 'get' ||
            method.toLowerCase() === 'delete'
        ) {
            config.params = dataOrParams
        } else {
            config.data = dataOrParams
        }

        const response = await axiosInstance.request<T>({
            method,
            url,
            ...config,
        })
        return response.data
    } catch (err) {
        handleError(err) // Log and potentially transform the error
        throw err // Re-throw the original error to ensure Promise rejection
    }
}

// Define the structure of the apiClient object
interface ApiClient {
    get: <T = any>(url: string, params?: Record<string, any>) => Promise<T>
    post: <T = any>(url: string, data?: any) => Promise<T>
    put: <T = any>(url: string, data?: any) => Promise<T>
    delete: <T = any>(url: string, params?: Record<string, any>) => Promise<T> // DELETE might have params too
    postFile: <T = any>(url: string, formData: FormData) => Promise<T>
}

export const apiClient: ApiClient = {
    get: <T = any>(url: string, params: Record<string, any> = {}) =>
        request<T>('get', url, params),
    post: <T = any>(url: string, data: any = {}) =>
        request<T>('post', url, data),
    put: <T = any>(url: string, data: any = {}) => request<T>('put', url, data),
    delete: <T = any>(url: string, params: Record<string, any> = {}) =>
        request<T>('delete', url, params),

    // Optional: File upload support
    postFile: async <T = any>(url: string, formData: FormData): Promise<T> => {
        if (!axiosInstance) {
            throw new Error(
                'apiClient not initialized. Call initApiClient(config) first.'
            )
        }
        try {
            const response = await axiosInstance.post<T>(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (err) {
            handleError(err) // Log and potentially transform the error
            throw err // Re-throw the original error to ensure Promise rejection
        }
    },
}
