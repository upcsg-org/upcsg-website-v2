'use client'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import MerchCard from './MerchCard'
import MerchHeaderButtonGroup from './filters-and-buttons/MerchHeaderButtonGroup'
import MerchHeaderFilterTabs from './filters-and-buttons/MerchHeaderFilterTabs'
import { useMerchStore, useMerchVariantStore } from '@/store/merch'
import { MerchItem } from '@/interface/merch'
import { priceRanges } from '@/constants/merch/merchRanges'
import Empty from '../generics/Empty'

const MerchGrid = () => {
    const [headerFilterType, setHeaderFilterType] = useState('All Items')
    const {
        selectedProductTypes,
        selectedPriceRanges,
        selectedSizes,
        selectedSort,
    } = useSelector((state: RootState) => state.filters)

    const { fetchAll: fetchMerch, items: merchandise } = useMerchStore()
    const { fetchAll: fetchVariants, items: allVariants } =
        useMerchVariantStore()

    useEffect(() => {
        fetchMerch?.()
        fetchVariants?.()
    }, [fetchMerch, fetchVariants])

    useEffect(() => {
        if (merchandise && allVariants) {
            merchandise.forEach((merch) => {
                const merchVariants = allVariants.filter(
                    (v) => v.merch.id === merch.id
                )
                console.log(`Merch: ${merch.name} (ID: ${merch.id})`, {
                    merch,
                    variants: merchVariants,
                })
            })
        }
    }, [merchandise, allVariants])

    const transformedMerchandise =
        merchandise?.map((item) => {
            // Filter variants for this specific merch item
            const itemVariants =
                allVariants?.filter((v) => v.merch.id === item.id) || []

            return {
                id: item.id,
                name: item.name,
                merch_type_id: item.merch_type_id,
                description: item.description,
                image: item.image,
                created_at: item.created_at,
                updated_at: item.updated_at,
                type: {
                    text: item.merch_type?.name || '',
                    value: item.merch_type?.name?.toLowerCase() || '',
                },
                price: itemVariants[0]?.price || 0,
                images: [
                    item.image,
                    ...itemVariants.map((v) => v.image).filter(Boolean),
                ],
                sizes: itemVariants.map((v) => ({
                    text: v.size.name,
                    value: v.size.name.toLowerCase(),
                })),
                colors: [], // Colors not in backend model
                isBestSeller: itemVariants[0]?.is_bestseller || false,
                isAvailable: itemVariants[0]?.is_available || true,
                isLimitedEdition: itemVariants[0]?.is_limited || false,
                onSale: itemVariants[0]?.on_sale || false,
                variants: itemVariants.map((variant) => ({
                    id: variant.id,
                    name: variant.name,
                    price: variant.price,
                    image: variant.image,
                    size: variant.size.name.toLowerCase(),
                    quantity: variant.quantity,
                    isLimited: variant.is_limited,
                    isBestSeller: variant.is_bestseller,
                    isAvailable: variant.is_available,
                    onSale: variant.on_sale,
                })),
            }
        }) || []

    useEffect(() => {
        if (transformedMerchandise.length > 0) {
            console.log('Transformed Merchandise:', transformedMerchandise)
        }
    }, [transformedMerchandise])

    const filterByStatus = (merchList: MerchItem[]) => {
        if (headerFilterType === 'All Items') {
            return merchList
        } else if (headerFilterType === 'Limited Edition') {
            return merchList.filter(
                (merch: MerchItem) => merch.isLimitedEdition
            )
        } else if (headerFilterType === 'On Sale') {
            return merchList.filter((merch: MerchItem) => merch.onSale)
        } else {
            return merchList
        }
    }

    const filterMerchItems = (merch: MerchItem) => {
        const matchesProductType =
            selectedProductTypes.length === 0 ||
            selectedProductTypes.some(
                (type) => merch.type.value === type.toLowerCase()
            )

        const matchesSize =
            selectedSizes.length === 0 ||
            merch.variants?.some((variant) =>
                selectedSizes.includes(variant.size.toLowerCase())
            ) ||
            false

        const matchesRange =
            selectedPriceRanges.length === 0 ||
            priceRanges.some((range) => {
                // Check if any variant's price falls within this range
                const hasVariantInRange = merch.variants?.some((variant) => {
                    const price = variant.price
                    return (
                        (range.lowerBound === null ||
                            price >= range.lowerBound) &&
                        (range.upperBound === null || price <= range.upperBound)
                    )
                })
                return (
                    hasVariantInRange &&
                    selectedPriceRanges.includes(range.label)
                )
            })

        return matchesProductType && matchesRange && matchesSize
    }

    const sortMerchItems = (a: MerchItem, b: MerchItem) => {
        if (selectedSort.includes('Lowest to Highest')) {
            return a.price - b.price
        } else if (selectedSort.includes('Highest to Lowest')) {
            return b.price - a.price
        }
        return 0
    }

    const filteredAndSortedItems = filterByStatus(transformedMerchandise)
        .filter(filterMerchItems)
        .sort(sortMerchItems)

    return (
        <div className="flex flex-col w-full gap-4 p-5 lg:py-10 lg:pl-8 lg:pr-28">
            <div className="w-full flex flex-row max-sm:flex-col max-sm:items-center max-sm:gap-3 flex-wrap align-middle">
                <p className="min-w-fit font-bold tracking-wider max-sm:text-center text-lg sm:text-2xl xl:text-4xl">
                    UPCSG MERCH
                </p>
                <MerchHeaderButtonGroup />
            </div>

            <MerchHeaderFilterTabs handleSwitchFilter={setHeaderFilterType} />

            {filterByStatus(transformedMerchandise).length ? (
                <div
                    className="gap-2 lg:gap-1 w-full text-site-main grid items-center justify-around
                            grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
                >
                    {filteredAndSortedItems.map((merch, index) => (
                        <MerchCard
                            key={index + merch.name + merch.type.text}
                            merch={merch}
                        />
                    ))}
                </div>
            ) : (
                <Empty>
                    <p className="text-sm md:text-xl">
                        No {headerFilterType} Merch Available
                    </p>
                </Empty>
            )}
        </div>
    )
}

export default MerchGrid
