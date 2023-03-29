import types from "./film-types";
import { IFilm } from "../../models/film-model";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../store"
import { AnyAction } from "redux";

export const thunkSendMessage =
    (list: IFilm[]): ThunkAction<void, ApplicationState, unknown, AnyAction> =>
        async dispatch => {
            const asyncResp = await exampleAPI()
            dispatch(
                saveList(list)
            )
        }

function exampleAPI() {
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
    saveList,
    updateLoading
};