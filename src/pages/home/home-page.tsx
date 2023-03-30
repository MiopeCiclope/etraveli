import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IFilm } from "../../models/film-model";
import { selectFilm, updateFilter, loadFilmList } from '../../store/film/film-actions';
import { IFilterOptions } from '../../store/film/film-reducer';
import { getFilmList } from '../../store/film/film-selectors';

interface StateProps {
  films: IFilm[]
  selectedFilm?: IFilm
  filmFilter?: IFilterOptions
}

interface DispatchProps {
  fetchFilms: () => void
  select: (selected: IFilm) => void
  filter: (filterOptions: IFilterOptions) => void
}

type IHomePageProp = StateProps & DispatchProps;

const HomePage = (props: IHomePageProp) => {
  const { films, selectedFilm, filmFilter, fetchFilms, select, filter } = props
  const [searchString, setSearchString] = useState("")
  const [sortDate, setSortDate] = useState(0)
  const [sortEpisode, setSortEpisode] = useState(0)

  useEffect(() => {
    fetchFilms()
  }, [fetchFilms])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const newFilter = { ...filmFilter }
    newFilter.search = (value.length >= 3) ? value : undefined

    filter(newFilter)
    setSearchString(value)
  }

  const triggerSort = (sortValue: number, updateFunction: React.Dispatch<React.SetStateAction<number>>, type: "date" | "episode") => {
    setSortDate(0)
    setSortEpisode(0)

    const newValue = (sortValue + 1) % 3
    updateFunction(newValue)

    const newFilter = { ...filmFilter }
    newFilter.sort = undefined
    newFilter.sortDirection = undefined

    if (newValue > 0) {
      newFilter.sort = type === "date" ? "created" : "episode_id"
      newFilter.sortDirection = newValue === 1 ? "asc" : "desc"
    }

    filter(newFilter)
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flex: 1, flexDirection: "column" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flex: 1, flexDirection: "row" }}>
        <input value={searchString} onChange={handleInputChange} style={{ display: "flex", flex: 1, maxHeight: 50 }} />
        <button value={sortDate} onClick={() => triggerSort(sortDate, setSortDate, "date")}>Sort by Date</button>
        <button value={sortEpisode} onClick={() => triggerSort(sortEpisode, setSortEpisode, "episode")}>Sort by Episode</button>
      </div>
      <div style={{ width: "100%", height: "100%", display: "flex", flex: 6, flexDirection: "row" }}>
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          {films && films.length > 0 &&
            getFilmList(films, filmFilter)?.map((film: IFilm) =>
              <span key={film.episode_id} onClick={() => select(film)} >{film.title}</span>)}
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          {selectedFilm &&
            <>
              <h5>{selectedFilm.title}</h5>
              <img alt={`${selectedFilm.title}'s Poster`} src={selectedFilm.poster} style={{ maxHeight: 400, objectFit: "contain" }} />
              <ul>
                {selectedFilm.ratings && selectedFilm.ratings.length > 0 &&
                  selectedFilm.ratings.map((rating, index) =>
                    <li key={index}>{`${rating.Source} - ${rating.Value}`}</li>)
                }
              </ul>
            </>
          }
        </div>
      </div>

      {/* <button onClick={fetchFilms} >test</button> */}
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  films: state.filmReducer.list,
  selectedFilm: state.filmReducer.selected,
  filmFilter: state.filmReducer.filterOptions
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilms: () => dispatch(loadFilmList()),
    select: (film: IFilm) => dispatch(selectFilm(film)),
    filter: (filterOptions: IFilterOptions) => dispatch(updateFilter(filterOptions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
