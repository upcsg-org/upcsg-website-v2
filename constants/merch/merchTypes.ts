import { useMerchTypeStore } from '@/store/merch'

// Fetch merch types from backend
export const useMerchTypes = () => {
    const { fetchAll: fetchTypes, items: types } = useMerchTypeStore()

    // Transform types to match the required format and ensure uniqueness
    const transformedTypes = Array.from(
        new Set(types?.map((type) => type.name.toLowerCase()))
    ).map((typeName, index) => ({
        id: index,
        text: typeName,
    }))

    return {
        fetchTypes,
        types: transformedTypes,
    }
}

// Export the array of types (will be populated from backend)
export const merchTypes = [] as { id: number; text: string }[]
