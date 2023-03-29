import types from "./film-types";
import { IFilm } from "../../models/film-model";

export interface IFilmReducerState {
    list: IFilm[]
    selected?: IFilm
    isLoading: boolean
}

export interface IFilmAction {
    type: string,
    payload: any
}

const INITIAL_STATE = {
    list: [],
    isLoading: false
} as IFilmReducerState

const filmReducer = (state = INITIAL_STATE, action: IFilmAction) => {
    switch (action.type) {
        case types.SAVE_LIST:
            return {
                ...state,
                list: action.payload as IFilm[]
            }
        case types.UPDATE_LOADING:
            return {
                ...state,
                isLoading: action.payload as boolean
            }
        default: return state;
    }
}

export default filmReducer;