import {
    createSlice
} from "@reduxjs/toolkit";

const initialState = { items: [], loading: false, error: null, search: '' };

export const searchSlice = createSlice({
    name: "searches",
    initialState,
    selectors: {
        searcState: (state) => state
    },
    reducers: {
        searchSkillsFailure: (state, action) => {

            return { ...state, loading: false, error: action.payload }
        },
        searchSkillsRequest: (state, action) => {

            return { ...state, search: action.payload.search, loading: true, error: null }
        },
        searchSkillsSuccess: (state, action) => {

            return { ...state, items: action.payload, loading: false, error: null }
        },
        changeSearchField: (state, action) => {

            return { ...state, items: [], search: action.payload.search }
        },
    },
});

export const { searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess, changeSearchField } = searchSlice.actions;
export default searchSlice.reducer;