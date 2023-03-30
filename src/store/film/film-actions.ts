import types from "./film-types";
import { IFilm, IRating } from "../../models/film-model";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../store"
import { AnyAction } from "redux";
import axios from "axios";
import { IResponse } from "../../models/response-api.model";
import { IImdbResponse } from "../../models/imdb-api.model";
import { IFilterOptions } from "./film-reducer";

const baseUrl = process.env.REACT_APP_API_URL as any as string
const imdbUrl = process.env.REACT_APP_IMDB_API_URL as any as string
const episodeRomanDigits = ["", "I", "II", "III", "IV", "V", "VI"]

export const loadFilmList = (): ThunkAction<void, ApplicationState, unknown, AnyAction> =>
    async dispatch => {
        dispatch(updateLoading(true))

        const filmList = await axios.get<IResponse<IFilm>>(baseUrl).then(response => {
            return response.data.results
        }).catch(err => {
            console.log("film list load: ", err)
            dispatch(updateLoading(false))
            return [] as IFilm[]
        }).finally(() => {
            dispatch(updateLoading(false))
        })

        await Promise.all(filmList.map(async (film) => {
            return await fetchFilmDetails(film)
        })).then(result =>
            dispatch(saveList(result as any as IFilm[]))
        ).finally(() => {
            dispatch(updateLoading(false))
        })

    }

const fetchFilmDetails = async (film: IFilm) => {
    const searchString = `${imdbUrl}t=star+wars+episode+${episodeRomanDigits[film.episode_id]}`

    return await axios.get<IImdbResponse>(searchString).then(response => {
        film.poster = response.data.Poster

        const standardRatings = calculateRatings(response.data.Ratings)
        film.ratings = standardRatings.ratings
        film.averageRating = standardRatings.average

        return film
    }).catch(err => {
        console.log("film detail fetch: ", err)
        return null
    })
}

const calculateRatings = (ratings: { Source: string, Value: string }[]) => {
    let ratingSum = 0
    const filmRatings = ratings.map(rating => {
        let value = 0
        switch (rating.Source) {
            case "Internet Movie Database":
                value = Number(rating.Value.split("/")[0]) * 10
                break;
            case "Rotten Tomatoes":
                value = Number(rating.Value.split("%")[0])
                break;
            case "Metacritic":
                value = Number(rating.Value.split("/")[0])
                break;
            default:
                break;
        }
        ratingSum += value
        return { source: rating.Source, value } as IRating
    })
    return { ratings: filmRatings, average: ratingSum / ratings.length }
}

export const selectFilm = (film: IFilm) => ({
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

export const updateFilter = (filter: IFilterOptions) => ({
    type: types.UPDATE_FILTER,
    payload: filter
});
