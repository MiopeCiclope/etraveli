import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IFilm } from "../../models/film-model";
import { selectFilm, updateSearch, loadFilmList, updateSort } from '../../store/film/film-actions';
import { IFilterOptions } from '../../store/film/film-reducer';
import { getFilmList } from '../../store/film/film-selectors';
import { ListColumn, FilmList, ListControls, HomeWrapper, SortButtonWrapper, DetailColumn, YodaQuote, LoadingMessage, ErrorMessage } from './styles';
import { SearchBar } from '../../components/search-bar/search-bar';
import { SortButton } from '../../components/sort-button/sort-button';
import { FilmItem } from '../../components/film-item/film-item';
import { FilmDetail } from '../../components/film-detail/film-detail';

interface StateProps {
  films: IFilm[]
  selectedFilm?: IFilm
  filmFilter?: IFilterOptions
  loading: boolean
  error?: string;
}

interface DispatchProps {
  fetchFilms: () => void
  select: (selected: IFilm) => void
  search: (searchString?: string) => void
  sort: (sortProporty: keyof IFilm) => void
}

type IHomePageProp = StateProps & DispatchProps;

const HomePage = (props: IHomePageProp) => {
  const { films, selectedFilm, filmFilter, loading, error, fetchFilms, select, search, sort } = props

  useEffect(() => {
    fetchFilms()
  }, [fetchFilms])

  const handleInputChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target.value;
    search(value)
  }

  //Makes easier to add new sorting buttons
  const makeSortButtons = (list: string[]) => {
    const titleDict: {
      [key: string]: string;
    } = {
      "release_date": "Date",
      "episode_id": "Episode",
      "averageRating": "Rating"
    }

    return <SortButtonWrapper data-testid="buttonSort">
      <small>Sort by:</small>
      {list.map(property =>
        <SortButton
          key={property}
          data-testid={`sortButton${property}`}
          title={titleDict[property]}
          buttonState={filmFilter?.sort === property ? filmFilter?.sortDirection ?? "off" : "off"}
          color='black'
          backgroundColor='white'
          activeBackgroundColor="lightgreen"
          onClick={() => sort(property as keyof IFilm)}
        />)
      }
    </SortButtonWrapper>
  }

  return (
    <HomeWrapper>
      <ListColumn>
        <ListControls>
          <SearchBar value={filmFilter?.search ?? ""} onChange={handleInputChange} placeholder="Type search here..." data-testid="searchBar" />
          {makeSortButtons(["release_date", "episode_id", "averageRating"])}
        </ListControls>
        <FilmList >
          {error && <ErrorMessage data-testid="errorMessage">{error}</ErrorMessage>}
          {!error && loading && <LoadingMessage data-testid="loadingMessage">fetching data...</LoadingMessage>}
          {!error && films && films.length > 0 &&
            getFilmList(films, filmFilter)?.map((film: IFilm) =>
              <FilmItem
                key={film.episode_id}
                film={film}
                onClick={() => select(film)} isSelected={selectedFilm !== undefined && selectedFilm.episode_id === film.episode_id} />
            )}
        </FilmList>
      </ListColumn>
      <DetailColumn>
        {!selectedFilm && <YodaQuote data-testid="quote" src='https://i0.wp.com/mindsetmadebetter.com/wp-content/uploads/2022/02/515-Do-or-do-not.-There-is-no-try..png?fit=1080%2C1080&ssl=1' />}
        {selectedFilm && <FilmDetail data-testid="detail" film={selectedFilm} />}
      </DetailColumn>
    </HomeWrapper>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  films: state.filmReducer.list,
  selectedFilm: state.filmReducer.selected,
  filmFilter: state.filmReducer.filterOptions,
  loading: state.filmReducer.isLoading,
  error: state.filmReducer.error,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilms: () => dispatch(loadFilmList()),
    select: (film: IFilm) => dispatch(selectFilm(film)),
    search: (searchString?: string) => dispatch(updateSearch(searchString)),
    sort: (sortProporty: keyof IFilm) => dispatch(updateSort(sortProporty)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
