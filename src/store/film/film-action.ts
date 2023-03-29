import types from "./film-types";
import { IFilm } from "../../models/film-model";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../store"
import { AnyAction } from "redux";
import axios from "axios";
import { IResponse } from "../../models/response-api.model";

const baseUrl = process.env.REACT_APP_API_URL as any as string

export const loadFilmList = (): ThunkAction<void, ApplicationState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(updateLoading(true))

        await axios.get<IResponse<IFilm>>(baseUrl).then(response => {
            dispatch(saveList(response.data.results))
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            dispatch(updateLoading(false))
        })
    }

const exampleAPI = () => {
    return Promise.resolve([{
        title: "test1"
    } as any as IFilm])
}

const saveList = (filmList: IFilm[]) => ({
    type: types.SAVE_LIST,
    payload: filmList
});

const updateLoading = (newStatus: boolean) => ({
    type: types.UPDATE_LOADING,
    payload: newStatus
});


export default {
    loadFilmList
};