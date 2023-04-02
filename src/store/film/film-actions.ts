import { ERROR, SAVE_LIST, SELECT_FILM, UPDATE_LOADING, UPDATE_SEARCH, UPDATE_SORT } from "./film-types";
import { IFilm, IRating } from "../../models/film-model";
import { ThunkAction } from "redux-thunk";
import { ApplicationState, store } from "../store"
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

        const filmList = await axios.get<IResponse<IFilm>>(baseUrl).then(response => {
            return response.data.results
        }).catch(err => {
            dispatch(updateLoading(false))
            dispatch(errorMessage("fail to load film list"))
            return [] as IFilm[]
        }).finally(() => {
            dispatch(updateLoading(false))
        })

        if (filmList.length > 0) {
            await Promise.allSettled(filmList.map(async (film) => {
                return await fetchFilmDetails(film)
            })).then(results => {
                const errors = results.filter(result => result.status === 'rejected');
                if (errors.length > 0) {
                    dispatch(errorMessage((results[0] as any).reason.message))
                    return;
                }

                dispatch(saveList(results.map(result => (result as any).value as IFilm)))
            }
            ).finally(() => {
                dispatch(updateLoading(false))
            })
        }
    }
const errorMessage = (errorMessage: string) => ({
    type: ERROR,
    payload: errorMessage
});

const fetchFilmDetails = async (film: IFilm) => {
    const searchString = `${imdbUrl}t=star+wars+episode+${episodeRomanDigits[film.episode_id]}`

    return await axios.get<IImdbResponse>(searchString).then(response => {
        film.poster = response.data.Poster

        const standardRatings = calculateRatings(response.data.Ratings)
        film.ratings = standardRatings.ratings
        film.averageRating = standardRatings.average

        return film
    }).catch(err => {
        throw Error(`fail to load film detail: ${film.title}`)
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
    type: SELECT_FILM,
    payload: film
});


const saveList = (filmList: IFilm[]) => ({
    type: SAVE_LIST,
    payload: filmList
});

const updateLoading = (newStatus: boolean) => ({
    type: UPDATE_LOADING,
    payload: newStatus
});

export const updateSearch = (searchString?: string) => ({
    type: UPDATE_SEARCH,
    payload: searchString
});

/*
 * Three phase sort
 *  - First call sort asc
 *  - Second call sort desc
 *  - Third call removes sort
 * 
 *  In case of a different sort property,
 *  it "turns off" the other sort
 */
export const updateSort = (sort: keyof IFilm) => {
    const sortDirectionOrder = ["off", "asc", "desc"]
    const filter = store.getState().filmReducer.filterOptions

    if (!filter?.sort) {
        return {
            type: UPDATE_SORT,
            payload: { sort: sort, direction: "asc" }
        }
    } else if (filter?.sort === sort) {
        const newSortIndex = (sortDirectionOrder.indexOf(filter?.sortDirection ?? "off") + 1) % 3
        return {
            type: UPDATE_SORT,
            payload: { sort: sort, direction: sortDirectionOrder[newSortIndex] }
        }
    } else {
        return {
            type: UPDATE_SORT,
            payload: { sort: sort, direction: "asc" }
        }
    }
};

