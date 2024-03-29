import { IFilm } from "../../models/film-model";
import { IFilterOptions } from "./film-reducer";

export const getFilmList = (films?: IFilm[], filterOptions?: IFilterOptions) => {
    if (films && filterOptions && films.length > 0) {
        let resultList = filterOptions.search ?
            films.filter(film => trimSearchString(film.title).includes(trimSearchString(filterOptions.search as string)))
            : films

        resultList = filterOptions.sort ?
            sortByProperty(resultList, filterOptions)
            : resultList

        return resultList
    } else {
        return films
    }
}

const trimSearchString = (search: string) => search.replace(/\s+/g, '').toLocaleLowerCase()

const sortByProperty = (films: IFilm[], filterOptions: IFilterOptions) => {
    return films.sort((a, b) => {
        let comparison = 0;

        if (filterOptions.sort !== "release_date") {
            const propA = a[filterOptions.sort as keyof IFilm];
            const propB = b[filterOptions.sort as keyof IFilm];

            if (propA > propB) {
                comparison = 1;
            } else if (propA < propB) {
                comparison = -1;
            }
        } else {
            if (new Date(a[filterOptions.sort]).getTime() > new Date(b[filterOptions.sort]).getTime()) {
                comparison = 1;
            } else if (new Date(a[filterOptions.sort]).getTime() < new Date(b[filterOptions.sort]).getTime()) {
                comparison = -1;
            }
        }

        return filterOptions.sortDirection === 'desc' ? comparison * -1 : comparison;
    })
}