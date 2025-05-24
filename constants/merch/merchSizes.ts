import { useMerchSizeStore } from '@/store/merch'

// Fetch sizes from backend
export const useMerchSizes = () => {
    const { fetchAll: fetchSizes, items: sizes } = useMerchSizeStore()

    // Transform sizes to match the required format and ensure uniqueness
    const transformedSizes = Array.from(
        new Set(sizes?.map((size) => size.name.toLowerCase()))
    ).map((sizeName, index) => ({
        id: index,
        text: sizeName,
    }))

    return {
        fetchSizes,
        sizes: transformedSizes,
    }
}

// Export the array of sizes (will be populated from backend)
export const merchSizes = [] as { id: number; text: string }[]
