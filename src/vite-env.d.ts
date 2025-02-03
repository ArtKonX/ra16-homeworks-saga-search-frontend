/// <reference types="vite/client" />

interface ApiRequests {
    payload: {
        search: string
    },
    url: string,
    type: string
}

interface ApiCreateRequest {
    url: string,
    method: string,
}

interface Item {
    id: number,
    name: string
}

interface SearchState {
    items: Item[],
    loading: boolean,
    error: null | string,
    search: string
}

interface SkillsSelector {
    searches: {
        items: Item[],
        loading: boolean,
        error: string | null,
        search: string
    }
}

interface SearchSkillsSaga {
    type: string,
    payload: {
        search: string,
    }
}