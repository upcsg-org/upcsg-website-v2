'use client'

import type React from 'react'
import { useDebounce } from '@/hooks/DebounceHook'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import {
    useMerchTypeStore,
    useCreateUpdateDeleteMerchStore,
    useCreateUpdateDeleteMerchVariantStore,
    useCreateUpdateDeleteMerchTypeStore,
    useCreateUpdateDeleteMerchSizeStore,
    useMerchStore,
    useMerchVariantStore,
} from '@/store/merch'
import type { MerchType, MerchSize } from '@/store/merch'
import { uploadImageToCloudinary } from '@/hooks/cloudinary'

interface SizeRow {
    id: number
    size: string
    price: string
    quantity: string
}

interface Variant {
    id: number
    name: string
    sizeRows: SizeRow[]
    isLimited: boolean
    variantImage: string | null
}

interface VariantFormError {
    id: number
    name: boolean
    image: boolean
    sizes: boolean
}

export default function EditProductPage() {
    const params = useParams()
    const productId = params?.id as string

    const router = useRouter()
    const { fetchAll: FetchTypes, items: existingTypes } = useMerchTypeStore()
    const { fetchOne: fetchMerch, item: fetchedMerch } = useMerchStore()
    const { fetchAll: fetchVariants, items: fetchedVariants } =
        useMerchVariantStore()
    const { update: updateMerch } = useCreateUpdateDeleteMerchStore()
    const {
        update: updateMerchVariant,
        create: createMerchVariant,
        remove: deleteMerchVariant,
    } = useCreateUpdateDeleteMerchVariantStore()
    const { create: createMerchType } = useCreateUpdateDeleteMerchTypeStore()
    const { create: createMerchSize, remove: removeMerchSize } =
        useCreateUpdateDeleteMerchSizeStore()

    const [productName, setProductName] = useState('')
    const [productTypeSearch, setProductTypeSearch] = useState('')
    const [selectedProductType, setSelectedProductType] =
        useState<MerchType | null>(null)
    const [showProductTypeDropdown, setShowProductTypeDropdown] =
        useState(false)
    const [productDescription, setProductDescription] = useState('')

    const [activeDropdown, setActiveDropdown] = useState<{
        variantIndex: number
        rowIndex: number
    } | null>(null)
    const [variants, setVariants] = useState<Variant[]>([])
    const [sizeSearch, setSizeSearch] = useState('')
    const [selectedSize, setSelectedSize] = useState<MerchSize | null>(null)
    const [deletedVariantIds, setDeletedVariantIds] = useState<number[]>([])
    const [deletedSizeIds, setDeletedSizeIds] = useState<
        Record<number, number[]>
    >({})
    const [coverImage, setCoverImage] = useState<string | null>(null)
    const [formErrors, setFormErrors] = useState<{
        coverImage: boolean
        productName: boolean
        productType: boolean
        productDescription: boolean
        variants: VariantFormError[]
    }>({
        coverImage: false,
        productName: false,
        productType: false,
        productDescription: false,
        variants: [],
    })
    const [showValidation, setShowValidation] = useState(false)
    const [isFormValid, setIsFormValid] = useState(true)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const variantImageRefs = useRef<(HTMLInputElement | null)[]>([])
    const coverImageRef = useRef<HTMLInputElement>(null)

    // Filter product types and sizes based on search
    const filteredProductTypes = useDebounce(
        existingTypes?.filter((type) =>
            type.name.toLowerCase().includes(productTypeSearch.toLowerCase())
        ) || [],
        300
    )

    const filteredSizes = useDebounce(
        selectedProductType?.sizes?.filter((size) =>
            size.name.toLowerCase().includes(sizeSearch.toLowerCase())
        ) || [],
        300
    )

    // Run validation when showValidation changes or when form fields change
    useEffect(() => {
        if (showValidation) {
            validateForm()
        }
    }, [
        showValidation,
        productName,
        productTypeSearch,
        productDescription,
        coverImage,
        variants,
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await FetchTypes?.()
                await fetchMerch?.(parseInt(productId))
                await fetchVariants?.()
            } catch (error) {
                console.error('Error fetching data:', error)
                setSubmitError('Failed to load product data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [productId, FetchTypes, fetchMerch, fetchVariants])

    useEffect(() => {
        if (!fetchedMerch) return

        setProductName(fetchedMerch.name)
        setProductDescription(fetchedMerch.description)
        setCoverImage(fetchedMerch.image)

        const productType = existingTypes?.find(
            (type) => type.id === fetchedMerch.merch_type.id
        )

        if (productType) {
            setSelectedProductType(productType)
            setProductTypeSearch(productType.name)
        }
    }, [fetchedMerch, existingTypes])

    useEffect(() => {
        if (!fetchedVariants || fetchedVariants.length === 0) return

        const productVariants = fetchedVariants.filter(
            (v) => v.merch.id === parseInt(productId)
        )

        console.log('Filtered variants for product:', productVariants)

        if (productVariants.length > 0) {
            const groupedVariants = productVariants.reduce((acc, variant) => {
                const existingVariant = acc.find((v) => v.name === variant.name)
                if (existingVariant) {
                    existingVariant.sizeRows.push({
                        id: variant.id,
                        size: variant.size.name,
                        price: variant.price.toString(),
                        quantity: variant.quantity.toString(),
                    })
                } else {
                    acc.push({
                        id: variant.id,
                        name: variant.name,
                        sizeRows: [
                            {
                                id: variant.id,
                                size: variant.size.name,
                                price: variant.price.toString(),
                                quantity: variant.quantity.toString(),
                            },
                        ],
                        isLimited: variant.is_limited,
                        variantImage: variant.image,
                    })
                }
                return acc
            }, [] as Variant[])

            setVariants(groupedVariants)
            setFormErrors((prev) => ({
                ...prev,
                variants: groupedVariants.map((v) => ({
                    id: v.id,
                    name: false,
                    image: false,
                    sizes: false,
                })),
            }))
        }
    }, [fetchedVariants, productId])

    const validateForm = () => {
        let isValid = true

        const newErrors = {
            coverImage: !coverImage,
            productName: !productName.trim(),
            productType: !selectedProductType,
            productDescription: !productDescription.trim(),
            variants: variants.map((variant) => ({
                id: variant.id,
                name: !variant.name.trim(),
                image: !variant.variantImage,
                sizes: variant.sizeRows.some(
                    (row) =>
                        !row.size?.toString().trim() ||
                        !row.price.trim() ||
                        !row.quantity
                ),
            })),
        }

        setFormErrors(newErrors)

        const hasTopLevelError =
            newErrors.coverImage ||
            newErrors.productName ||
            newErrors.productType ||
            newErrors.productDescription

        const hasVariantError = newErrors.variants.some(
            (v) => v.name || v.image || v.sizes
        )

        isValid = !(hasTopLevelError || hasVariantError)

        setIsFormValid(isValid)
        return isValid
    }

    const handleSubmit = async () => {
        setShowValidation(true)
        setSubmitError(null)

        if (!validateForm()) return

        if (
            !updateMerch ||
            !updateMerchVariant ||
            !createMerchType ||
            !createMerchSize
        ) {
            setSubmitError('Store functions not available')
            return
        }

        try {
            setIsSubmitting(true)

            for (const variantIndex in deletedSizeIds) {
                const sizeIds = deletedSizeIds[variantIndex]
                for (const sizeId of sizeIds) {
                    try {
                        await deleteMerchVariant?.(sizeId) // Assuming size row is a variant row with a unique ID
                    } catch (error) {
                        console.error(
                            'Failed to delete size row',
                            error,
                            sizeId
                        )
                    }
                }
            }

            // 1. Upload cover image if changed
            let coverImageUrl = coverImage
            const coverImageFile = coverImageRef.current?.files?.[0]
            if (coverImageFile) {
                coverImageUrl = await uploadImageToCloudinary(coverImageFile)
            }

            // 2. Ensure product type exists
            let productType = selectedProductType
            if (!productType) {
                const newType = await createMerchType({
                    name: productTypeSearch,
                    sizes: [],
                })
                if (!newType) throw new Error('Failed to create product type')
                productType = newType
            }

            // 3. Update the base merch product
            const updatedMerch = await updateMerch(parseInt(productId), {
                id: parseInt(productId),
                name: productName,
                merch_type_id: productType.id,
                description: productDescription,
                image: coverImageUrl || '',
            })
            if (!updatedMerch) throw new Error('Failed to update merch')

            // 4. Loop through each variant
            for (let index = 0; index < variants.length; index++) {
                const variant = variants[index]
                const variantImageFile: File | undefined =
                    variantImageRefs.current[index]?.files?.[0]

                let variantImageUrl = variant.variantImage // Existing image URL from state

                // Check if existing image is a valid Cloudinary URL
                const hasValidImage =
                    variantImageUrl && variantImageUrl.startsWith('http')

                // Only upload if there's no existing valid image but the user selected a new file
                if (!hasValidImage) {
                    if (variantImageFile) {
                        variantImageUrl =
                            await uploadImageToCloudinary(variantImageFile)
                    } else {
                        throw new Error(
                            `Variant image is required for ${variant.name}`
                        )
                    }
                }
                for (const row of variant.sizeRows) {
                    let size = productType.sizes?.find(
                        (s) => s.name === row.size
                    )
                    if (!size) {
                        size = await createMerchSize({
                            name: row.size,
                            merch_type: productType.id,
                        })
                        if (!size)
                            throw new Error(
                                `Failed to create size: ${row.size}`
                            )
                    }

                    const variantData = {
                        id: row.id,
                        merch_id: updatedMerch.id,
                        name: variant.name,
                        price: parseFloat(row.price),
                        image: variantImageUrl || undefined,
                        variant: variant.name,
                        is_limited: variant.isLimited,
                        size_id: size.id,
                        quantity: parseInt(row.quantity),
                        is_bestseller: false,
                        is_available: true,
                        on_sale: false,
                    }

                    // Check if the variant already exists
                    const existingVariant = fetchedVariants.find(
                        (v) => v.id === row.id
                    )
                    if (existingVariant) {
                        // Update the existing variant
                        const update = await updateMerchVariant(
                            existingVariant.id,
                            variantData
                        )
                        if (!update)
                            throw new Error(
                                `Failed to update variant: ${variant.name}`
                            )
                    } else {
                        // Create a new variant
                        const create = await createMerchVariant?.(variantData)
                        if (!create)
                            throw new Error(
                                `Failed to create variant: ${variant.name}`
                            )
                    }
                }
            }

            router.push('/admin/merch/products')
        } catch (error) {
            console.error('Error submitting form:', error)
            setSubmitError(
                error instanceof Error ? error.message : 'Failed to submit form'
            )
        } finally {
            setIsSubmitting(false)
        }
    }
    const addSizeRow = (variantIndex: number) => {
        const updatedVariants = [...variants]
        const variant = updatedVariants[variantIndex]
        const newId =
            variant.sizeRows.length > 0
                ? Math.max(...variant.sizeRows.map((row) => row.id)) + 1
                : 1
        variant.sizeRows = [
            ...variant.sizeRows,
            { id: newId, size: '', price: '', quantity: '' },
        ]
        setVariants(updatedVariants)
    }

    const handleDeleteSizeRow = (variantIndex: number, rowIndex: number) => {
        const updatedVariants = [...variants]
        const variant = updatedVariants[variantIndex]

        const removedRow = variant.sizeRows[rowIndex]
        variant.sizeRows.splice(rowIndex, 1)
        setVariants(updatedVariants)

        // Track deleted size ID if it existed in backend
        if (removedRow.id) {
            setDeletedSizeIds((prev) => {
                const prevIds = prev[variantIndex] || []
                return { ...prev, [variantIndex]: [...prevIds, removedRow.id] }
            })
        }
    }

    const deleteVariant = () => {
        if (variants.length <= 1) return

        // Get the last variant to be deleted
        const variantToDelete = variants[variants.length - 1]

        // Remove last variant from variants array
        const updatedVariants = variants.slice(0, -1)
        setVariants(updatedVariants)

        // Add variant id to deletedVariantIds if it exists (means it exists in backend)
        if (variantToDelete.id) {
            setDeletedVariantIds((prev) => [...prev, variantToDelete.id])
        }
    }

    const addVariant = () => {
        const newId =
            variants.length > 0
                ? Math.max(...variants.map((variant) => variant.id)) + 1
                : 1
        setVariants([
            ...variants,
            {
                id: newId,
                name: '',
                sizeRows: [{ id: 1, size: '', price: '', quantity: '' }],
                isLimited: false,
                variantImage: null,
            },
        ])

        setFormErrors((prev) => ({
            ...prev,
            variants: [
                ...prev.variants,
                { id: newId, name: false, image: false, sizes: false },
            ],
        }))
    }

    const toggleLimited = (variantIndex: number) => {
        const updatedVariants = [...variants]
        updatedVariants[variantIndex].isLimited =
            !updatedVariants[variantIndex].isLimited
        setVariants(updatedVariants)
    }

    const handleVariantNameChange = (variantIndex: number, value: string) => {
        const updatedVariants = [...variants]
        updatedVariants[variantIndex].name = value
        setVariants(updatedVariants)
    }

    const handleSizeRowChange = (
        variantIndex: number,
        rowIndex: number,
        field: string,
        value: string
    ) => {
        const updatedVariants = [...variants]
        const row = updatedVariants[variantIndex].sizeRows[rowIndex] as any
        row[field] = value
        setVariants(updatedVariants)
    }

    const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const imageUrl = URL.createObjectURL(file)
            setCoverImage(imageUrl)
        }
    }

    const handleVariantImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        variantIndex: number
    ) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const imageUrl = URL.createObjectURL(file)

            const updatedVariants = [...variants]
            updatedVariants[variantIndex].variantImage = imageUrl
            setVariants(updatedVariants)
        }
    }

    // Clean up object URLs when component unmounts or images change
    useEffect(() => {
        return () => {
            if (coverImage && coverImage.startsWith('blob:')) {
                URL.revokeObjectURL(coverImage)
            }
            variants.forEach((variant) => {
                if (
                    variant.variantImage &&
                    variant.variantImage.startsWith('blob:')
                ) {
                    URL.revokeObjectURL(variant.variantImage)
                }
            })
        }
    }, [coverImage, variants])

    const removeCoverImage = () => {
        if (coverImage && coverImage.startsWith('blob:')) {
            URL.revokeObjectURL(coverImage)
        }
        setCoverImage(null)
        if (coverImageRef.current) {
            coverImageRef.current.value = ''
        }
    }

    const removeVariantImage = (variantIndex: number) => {
        const updatedVariants = [...variants]
        if (updatedVariants[variantIndex].variantImage?.startsWith('blob:')) {
            URL.revokeObjectURL(updatedVariants[variantIndex].variantImage)
        }
        updatedVariants[variantIndex].variantImage = null
        setVariants(updatedVariants)

        if (variantImageRefs.current[variantIndex]) {
            variantImageRefs.current[variantIndex]!.value = ''
        }
    }

    if (isLoading) {
        return (
            <div className="flex-1 rounded-md p-6 bg-[#0F1729] text-white">
                <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#30b8c4]"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 rounded-md p-6 bg-[#0F1729] text-white">
            <div className="mb-6 pb-3 border-b border-black">
                <button
                    onClick={() => router.push('/admin/merch/products')}
                    className="flex items-center text-[#2D4486] hover:text-[#25376e] text-xl"
                >
                    <svg
                        className="w-7 h-7 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 30 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12h26M12 5l-7 7 7 7"
                        />
                    </svg>
                    Back to Products
                </button>
            </div>

            <h2 className="text-lg font-medium mb-4">EDIT PRODUCT</h2>

            <div className="grid grid-cols-10 gap-6 border-4 border-[#242460] rounded-lg p-4 mb-8">
                <div className="col-span-7 space-y-6 pr-4">
                    <div>
                        <label className="text-gray-400 text-s uppercase block mb-2">
                            PRODUCT NAME
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                showValidation && formErrors.productName
                                    ? 'border-2 border-red-500 bg-red-50'
                                    : ''
                            }`}
                        />
                        {showValidation && formErrors.productName && (
                            <p className="text-red-500 text-sm mt-1">
                                Product name is required
                            </p>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-gray-400 text-s uppercase block mb-2">
                            PRODUCT TYPE
                        </label>
                        <input
                            type="text"
                            placeholder="Search product types..."
                            value={productTypeSearch}
                            onChange={(e) => {
                                setProductTypeSearch(e.target.value)
                                setShowProductTypeDropdown(true)
                            }}
                            onFocus={() => setShowProductTypeDropdown(true)}
                            className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                showValidation && formErrors.productType
                                    ? 'border-2 border-red-500 bg-red-50'
                                    : ''
                            }`}
                        />
                        {showProductTypeDropdown &&
                            productTypeSearch &&
                            filteredProductTypes.length > 0 && (
                                <ul className="absolute z-10 bg-white border text-black border-gray-300 w-full mt-1 rounded shadow-md max-h-40 overflow-y-auto">
                                    {filteredProductTypes.map((type) => (
                                        <li
                                            key={type.id}
                                            onClick={() => {
                                                setProductTypeSearch(type.name)
                                                setSelectedProductType(type)
                                                setShowProductTypeDropdown(
                                                    false
                                                )
                                            }}
                                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                        >
                                            {type.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        {showValidation && formErrors.productType && (
                            <p className="text-red-500 text-sm mt-1">
                                Product type is required
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="text-gray-400 text-s uppercase block mb-2">
                            PRODUCT DESCRIPTION
                        </label>
                        <textarea
                            placeholder="Enter product description"
                            value={productDescription}
                            onChange={(e) =>
                                setProductDescription(e.target.value)
                            }
                            className={`w-full bg-white text-black border-0 rounded px-3 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                showValidation && formErrors.productDescription
                                    ? 'border-2 border-red-500 bg-red-50'
                                    : ''
                            }`}
                        ></textarea>
                        {showValidation && formErrors.productDescription && (
                            <p className="text-red-500 text-sm mt-1">
                                Product description is required
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-span-3">
                    <div className="flex flex-col h-full">
                        <input
                            type="file"
                            ref={coverImageRef}
                            onChange={handleCoverImageUpload}
                            className="hidden"
                            accept="image/*"
                        />

                        <div
                            className={`bg-[#1C2539] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#232C43] transition-colors mb-2 h-[400px] relative overflow-hidden ${
                                showValidation && formErrors.coverImage
                                    ? 'border-2 border-red-500'
                                    : ''
                            }`}
                            onClick={() =>
                                !coverImage && coverImageRef.current?.click()
                            }
                        >
                            {coverImage ? (
                                <Image
                                    src={coverImage}
                                    alt="Cover photo"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="text-gray-400 text-center font-medium">
                                    <div>UPLOAD</div>
                                    <div>COVER PHOTO</div>
                                </div>
                            )}
                        </div>

                        {showValidation && formErrors.coverImage && (
                            <div className="mt-2 text-red-500 text-sm">
                                Cover image is required
                            </div>
                        )}

                        {coverImage ? (
                            <button
                                onClick={removeCoverImage}
                                className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                            >
                                REMOVE IMAGE
                            </button>
                        ) : (
                            <button
                                onClick={() => coverImageRef.current?.click()}
                                className="w-full bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-3 py-2 rounded"
                            >
                                UPLOAD IMAGE
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-medium mb-4">VARIANTS</h2>

            {variants.map((variant, variantIndex) => (
                <div
                    key={variant.id}
                    className="mb-6 pb-6 bg-[#22264B] border-4 border-[#242460] rounded-lg p-4"
                >
                    <div className="grid grid-cols-10 gap-6">
                        <div className="col-span-7 pr-4">
                            <div className="mb-6">
                                <label className="text-gray-400 text-s uppercase block mb-2">
                                    VARIANT NAME
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Black Denim"
                                    value={variant.name}
                                    onChange={(e) =>
                                        handleVariantNameChange(
                                            variantIndex,
                                            e.target.value
                                        )
                                    }
                                    className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        showValidation &&
                                        formErrors.variants[variantIndex]?.name
                                            ? 'border-2 border-red-500 bg-red-50'
                                            : ''
                                    }`}
                                />
                                {showValidation &&
                                    formErrors.variants[variantIndex]?.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            Variant name is required
                                        </p>
                                    )}
                            </div>

                            <div className="mb-4">
                                <div className="grid grid-cols-4 gap-4 mb-2">
                                    <div>
                                        <label className="text-gray-400 text-s uppercase block mb-2">
                                            SIZE
                                        </label>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-s uppercase block mb-2">
                                            PRICE
                                        </label>
                                    </div>
                                    <div>
                                        <label className="text-gray-400 text-s uppercase block mb-2">
                                            QUANTITY
                                        </label>
                                    </div>
                                    <div></div>
                                </div>

                                {variant.sizeRows.map((row, index) => {
                                    // Define currentSizeName here, at the start of the map callback
                                    const currentSizeName =
                                        typeof row.size === 'string'
                                            ? row.size
                                            : row.size?.name || ''

                                    return (
                                        <div
                                            key={row.id}
                                            className="grid grid-cols-4 gap-4 mb-4"
                                        >
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder="Search size..."
                                                    value={currentSizeName} // use it here
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value
                                                        handleSizeRowChange(
                                                            variantIndex,
                                                            index,
                                                            'size',
                                                            value
                                                        )
                                                        setActiveDropdown({
                                                            variantIndex,
                                                            rowIndex: index,
                                                        })
                                                    }}
                                                    onFocus={() =>
                                                        setActiveDropdown({
                                                            variantIndex,
                                                            rowIndex: index,
                                                        })
                                                    }
                                                    className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        showValidation &&
                                                        formErrors.variants[
                                                            variantIndex
                                                        ]?.sizes
                                                            ? 'border-2 border-red-500 bg-red-50'
                                                            : ''
                                                    }`}
                                                />

                                                {/* Your dropdown code here, using currentSizeName for filtering */}
                                                {activeDropdown?.variantIndex ===
                                                    variantIndex &&
                                                    activeDropdown?.rowIndex ===
                                                        index &&
                                                    selectedProductType?.sizes &&
                                                    (() => {
                                                        const availableSizes =
                                                            selectedProductType.sizes.filter(
                                                                (size) => {
                                                                    const isUsed =
                                                                        variants[
                                                                            variantIndex
                                                                        ].sizeRows.some(
                                                                            (
                                                                                otherRow,
                                                                                otherIndex
                                                                            ) =>
                                                                                otherIndex !==
                                                                                    index &&
                                                                                (typeof otherRow.size ===
                                                                                'string'
                                                                                    ? otherRow.size ===
                                                                                      size.name
                                                                                    : otherRow
                                                                                          .size
                                                                                          ?.name ===
                                                                                      size.name)
                                                                        )
                                                                    return (
                                                                        !isUsed &&
                                                                        size.name
                                                                            .toLowerCase()
                                                                            .includes(
                                                                                currentSizeName.toLowerCase()
                                                                            )
                                                                    )
                                                                }
                                                            )

                                                        if (
                                                            availableSizes.length ===
                                                            0
                                                        )
                                                            return null

                                                        return (
                                                            <ul className="absolute z-10 bg-white border text-black border-gray-300 w-full mt-1 rounded shadow-md max-h-40 overflow-y-auto">
                                                                {availableSizes.map(
                                                                    (size) => (
                                                                        <li
                                                                            key={
                                                                                size.id
                                                                            }
                                                                            onClick={() => {
                                                                                handleSizeRowChange(
                                                                                    variantIndex,
                                                                                    index,
                                                                                    'size',
                                                                                    size.name
                                                                                )
                                                                                setSelectedSize(
                                                                                    size
                                                                                )
                                                                                setActiveDropdown(
                                                                                    null
                                                                                )
                                                                            }}
                                                                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                                                        >
                                                                            {
                                                                                size.name
                                                                            }
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        )
                                                    })()}
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    placeholder="PHP"
                                                    value={row.price}
                                                    onChange={(e) =>
                                                        handleSizeRowChange(
                                                            variantIndex,
                                                            index,
                                                            'price',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        showValidation &&
                                                        formErrors.variants[
                                                            variantIndex
                                                        ]?.sizes
                                                            ? 'border-2 border-red-500 bg-red-50'
                                                            : ''
                                                    }`}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    step="0.01"
                                                    min="0"
                                                    value={row.quantity}
                                                    onChange={(e) =>
                                                        handleSizeRowChange(
                                                            variantIndex,
                                                            index,
                                                            'quantity',
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full bg-white text-black border-0 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                                        showValidation &&
                                                        formErrors.variants[
                                                            variantIndex
                                                        ]?.sizes
                                                            ? 'border-2 border-red-500 bg-red-50'
                                                            : ''
                                                    }`}
                                                />
                                            </div>
                                            {variant.sizeRows.length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteSizeRow(
                                                            variantIndex,
                                                            index
                                                        )
                                                    }
                                                    className="w-8 h-8 bg-[#EB5B5B] hover:bg-red-500 text-white rounded-full flex items-center justify-center text-xl"
                                                >
                                                    {'-'}
                                                </button>
                                            )}
                                        </div>
                                    )
                                })}
                                {showValidation &&
                                    formErrors.variants[variantIndex]
                                        ?.sizes && (
                                        <p className="text-red-500 text-sm mt-1">
                                            All size fields must be completed
                                        </p>
                                    )}
                            </div>

                            <div className="mb-6 flex items-center gap-4 w-full">
                                <button
                                    onClick={() => addSizeRow(variantIndex)}
                                    className="w-8 h-8 bg-[#41A01E] hover:bg-green-500 text-white rounded-full flex items-center justify-center text-xl"
                                >
                                    {'+'}
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 self-start sticky top-6">
                            <div className="flex flex-col">
                                <input
                                    type="file"
                                    ref={(el) => {
                                        if (el) {
                                            variantImageRefs.current[
                                                variantIndex
                                            ] = el
                                        }
                                    }}
                                    onChange={(e) =>
                                        handleVariantImageUpload(
                                            e,
                                            variantIndex
                                        )
                                    }
                                    className="hidden"
                                    accept="image/*"
                                />

                                <div
                                    className={`bg-[#1C2539] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#232C43] transition-colors mb-2 h-[400px] relative overflow-hidden ${
                                        showValidation &&
                                        formErrors.variants[variantIndex]?.image
                                            ? 'border-2 border-red-500'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        !variant.variantImage &&
                                        variantImageRefs.current[
                                            variantIndex
                                        ]?.click()
                                    }
                                >
                                    {variant.variantImage ? (
                                        <Image
                                            src={variant.variantImage}
                                            alt="Variant image"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    ) : (
                                        <div className="text-gray-400 text-center font-medium">
                                            <div>UPLOAD</div>
                                            <div>VARIANT IMAGE</div>
                                        </div>
                                    )}
                                </div>

                                {showValidation &&
                                    formErrors.variants[variantIndex]
                                        ?.image && (
                                        <div className="mt-2 text-red-500 text-sm">
                                            Variant image is required
                                        </div>
                                    )}

                                {variant.variantImage ? (
                                    <button
                                        onClick={() =>
                                            removeVariantImage(variantIndex)
                                        }
                                        className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                                    >
                                        REMOVE IMAGE
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            variantImageRefs.current[
                                                variantIndex
                                            ]?.click()
                                        }
                                        className="w-full bg-[#30b8c4] hover:bg-[#2aa0aa] text-white px-3 py-2 rounded"
                                    >
                                        UPLOAD IMAGE
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center mt-6">
                        <div
                            className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center cursor-pointer ${variant.isLimited ? 'border-purple-500 bg-purple-500' : 'border-gray-400'}`}
                            onClick={() => toggleLimited(variantIndex)}
                        >
                            {variant.isLimited && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                        </div>
                        <label
                            htmlFor={`limitedEdition-${variant.id}`}
                            className="text-purple-400 flex items-center cursor-pointer"
                            onClick={() => toggleLimited(variantIndex)}
                        >
                            LIMITED EDITION
                        </label>
                    </div>
                </div>
            ))}

            <div className="mb-6 flex items-center justify-between w-full">
                <button
                    onClick={addVariant}
                    className="w-1/5 bg-[#B63EFF] hover:bg-[#A035E5] text-white px-4 py-2 rounded flex items-center justify-center"
                >
                    ADD MORE VARIANTS
                </button>
                <button
                    onClick={() =>
                        variants.length > 1 ? deleteVariant() : null
                    }
                    className={`w-1/5 ${variants.length > 1 ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 cursor-not-allowed'} text-white px-4 py-2 rounded flex items-center justify-center`}
                    disabled={variants.length <= 1}
                >
                    DELETE VARIANT
                </button>
            </div>

            {submitError && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {submitError}
                </div>
            )}

            <div className="flex justify-center">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-1/2 bg-[#5077C3] hover:bg-[#4066A8] text-white px-20 py-3 rounded font-medium ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
            </div>
        </div>
    )
}
