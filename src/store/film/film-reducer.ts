import { CLEAN_LIST, ERROR, SAVE_LIST, SELECT_FILM, UPDATE_LOADING, UPDATE_SEARCH, UPDATE_SORT } from "./film-types";
import { IFilm } from "../../models/film-model";

export interface IFilterOptions {
    search?: string
    sort?: keyof IFilm
    sortDirection?: "asc" | "desc"
}

export interface IFilmReducerState {
    list: IFilm[]
    selected?: IFilm
    isLoading: boolean
    filterOptions?: IFilterOptions
    error?: string;
}

export interface IFilmAction {
    type: string,
    payload: any
}

const INITIAL_STATE = {
    list: [],
    isLoading: false,
    filterOptions: {}
} as IFilmReducerState

const filmReducer = (state = INITIAL_STATE, action: IFilmAction) => {
    switch (action.type) {
        case SAVE_LIST:
            return {
                ...state,
                list: action.payload as IFilm[],
                error: undefined
            }
        case UPDATE_LOADING:
            return {
                ...state,
                isLoading: action.payload as boolean,
            }
        case SELECT_FILM:
            return {
                ...state,
                selected: action.payload as IFilm
            }
        case UPDATE_SEARCH:
            return {
                ...state,
                filterOptions: {
                    ...state.filterOptions,
                    search: action.payload
                }
            }
        case UPDATE_SORT:
            return {
                ...state,
                filterOptions: {
                    ...state.filterOptions,
                    sort: action.payload.sort,
                    sortDirection: action.payload.direction,
                }
            }
        case ERROR:
            return {
                ...state,
                error: (action.payload as string).toLowerCase()
            }
        case CLEAN_LIST:
            return {
                ...state,
                list: []
            }

        default: return state;
    }
}

export default filmReducer;