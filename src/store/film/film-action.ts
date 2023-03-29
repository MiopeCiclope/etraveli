import types from "./film-types";
import { IFilm } from "../../models/film-model";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../store"
import { AnyAction } from "redux";
import axios from "axios";
import { IResponse } from "../../models/response-api.model";
import { IImdbResponse } from "../../models/imdb-api.model";

const baseUrl = process.env.REACT_APP_API_URL as any as string
const imdbUrl = process.env.REACT_APP_IMDB_API_URL as any as string
const episodeRomanDigits = ["", "I", "II", "III", "IV", "V", "VI"]

export const loadFilmList = (): ThunkAction<void, ApplicationState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(updateLoading(true))

        await axios.get<IResponse<IFilm>>(baseUrl).then(response => {
            dispatch(saveList(response.data.results))
        }).catch(err => {
            console.log("film list load: ", err)
        }).finally(() => {
            dispatch(updateLoading(false))
        })
    }

// Change it to check if data was already loaded
export const selectFilm = (selected: IFilm): ThunkAction<void, ApplicationState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(updateLoading(true))
        const searchString = `${imdbUrl}t=star+wars+episode+${episodeRomanDigits[selected.episode_id]}`

        await axios.get<IImdbResponse>(searchString).then(response => {
            selected.poster = response.data.Poster
            selected.ratings = response.data.Ratings
            
            dispatch(storeSelectedFilm(selected))
        }).catch(err => {
            console.log("select film: ", err)
        }).finally(() => {
            dispatch(updateLoading(false))
        })
    }

const storeSelectedFilm = (film: IFilm) => ({
    type: types.SELECT_FILM,
    payload: film
});


const saveList = (filmList: IFilm[]) => ({
    type: types.SAVE_LIST,
    payload: filmList
});

const updateLoading = (newStatus: boolean) => ({
    type: types.UPDATE_LOADING,
    payload: newStatus
});


export default {
    loadFilmList,
    selectFilm
};