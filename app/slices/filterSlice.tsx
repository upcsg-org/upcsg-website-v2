import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
    selectedProductTypes: string[]
    selectedPriceRanges: string[]
    selectedSizes: string[]
    selectedSort: string[]
}

const initialState: FilterState = {
    selectedProductTypes: [],
    selectedPriceRanges: [],
    selectedSizes: [],
    selectedSort: [],
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setProductTypes(state, action: PayloadAction<string[]>) {
            state.selectedProductTypes = action.payload
        },
        setPriceRange(state, action: PayloadAction<string[]>) {
            state.selectedPriceRanges = action.payload
        },
        setSizes(state, action: PayloadAction<string[]>) {
            state.selectedSizes = action.payload
        },
        setSort(state, action: PayloadAction<string[]>) {
            state.selectedSort = action.payload
        },
    },
})

export const { setProductTypes, setPriceRange, setSizes, setSort } =
    filterSlice.actions
export default filterSlice.reducer
