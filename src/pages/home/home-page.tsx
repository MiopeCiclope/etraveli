import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IFilm } from "../../models/film-model";
import { selectFilm, updateFilter, loadFilmList } from '../../store/film/film-actions';
import { IFilterOptions } from '../../store/film/film-reducer';
import { getFilmList } from '../../store/film/film-selectors';
import { Body, Header, HomeWrapper, SortButtonWrapper } from './styles';
import { SearchBar } from '../../components/search-bar/search-bar';
import { SortButton } from '../../components/sort-button/sort-button';

interface StateProps {
  films: IFilm[]
  selectedFilm?: IFilm
  filmFilter?: IFilterOptions
  loading: boolean
}

interface DispatchProps {
  fetchFilms: () => void
  select: (selected: IFilm) => void
  filter: (filterOptions: IFilterOptions) => void
}

type IHomePageProp = StateProps & DispatchProps;

const HomePage = (props: IHomePageProp) => {
  const { films, selectedFilm, filmFilter, loading, fetchFilms, select, filter } = props
  const [searchString, setSearchString] = useState("")
  const [sortDate, setSortDate] = useState(0)
  const [sortEpisode, setSortEpisode] = useState(0)
  const [sortRating, setSortRating] = useState(0)

  useEffect(() => {
    fetchFilms()
  }, [fetchFilms])

  const handleInputChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value;

    const newFilter = { ...filmFilter }
    newFilter.search = (value && value.length >= 3) ? value : undefined

    filter(newFilter)
    setSearchString(value as string)
  }

  const triggerSort = (sortValue: number, updateFunction: React.Dispatch<React.SetStateAction<number>>, type: "date" | "episode" | "rating") => {
    setSortDate(0)
    setSortEpisode(0)

    const newValue = (sortValue + 1) % 3
    updateFunction(newValue)

    const newFilter = { ...filmFilter }
    newFilter.sort = undefined
    newFilter.sortDirection = undefined

    if (newValue > 0) {
      switch (type) {
        case "date":
          newFilter.sort = "created"
          break;
        case "episode":
          newFilter.sort = "episode_id"
          break;

        case "rating":
          newFilter.sort = "averageRating"
          break;
      }
      newFilter.sortDirection = newValue === 1 ? "asc" : "desc"
    }

    filter(newFilter)
  }

  return (
    <HomeWrapper>
      <Header>
        <SearchBar value={searchString} onChange={handleInputChange} placeholder="Type search here..." />
        <SortButtonWrapper>
          <SortButton title="Date" buttonState='desc' color='black' backgroundColor='white' onClick={() => console.log("test")} />
          {/* ButtonWrapper<button value={sortDate} onClick={() => triggerSort(sortDate, setSortDate, "date")}>Sort by Date</button> */}
          <button value={sortEpisode} onClick={() => triggerSort(sortEpisode, setSortEpisode, "episode")}>Sort by Episode</button>
          <button value={sortRating} onClick={() => triggerSort(sortRating, setSortRating, "rating")}>Sort by Rating</button>
        </SortButtonWrapper>
      </Header>
      <Body>
        {loading && <div>Fetching data ....</div>}
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          {films && films.length > 0 &&
            getFilmList(films, filmFilter)?.map((film: IFilm) =>
              <span key={film.episode_id} onClick={() => select(film)} >{`${film.title} - ${film.averageRating}`}</span>)}
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
          {!selectedFilm && <div> You can click a film on the list</div>}
          {selectedFilm &&
            <>
              <h5>{selectedFilm.title}</h5>
              <img alt={`${selectedFilm.title}'s Poster`} src={selectedFilm.poster} style={{ maxHeight: 400, objectFit: "contain" }} />
              <ul>
                {selectedFilm.ratings && selectedFilm.ratings.length > 0 &&
                  selectedFilm.ratings.map((rating, index) =>
                    <li key={index}>{`${rating.source} - ${rating.value}`}</li>)
                }
              </ul>
            </>
          }
        </div>
      </Body>
    </HomeWrapper>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  films: state.filmReducer.list,
  selectedFilm: state.filmReducer.selected,
  filmFilter: state.filmReducer.filterOptions,
  loading: state.filmReducer.isLoading
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilms: () => dispatch(loadFilmList()),
    select: (film: IFilm) => dispatch(selectFilm(film)),
    filter: (filterOptions: IFilterOptions) => dispatch(updateFilter(filterOptions)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
