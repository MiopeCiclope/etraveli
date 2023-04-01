import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IFilm } from "../../models/film-model";
import { selectFilm, updateSearch, loadFilmList, updateSort } from '../../store/film/film-actions';
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
  search: (searchString?: string) => void
  sort: (sortProporty: keyof IFilm) => void
}

type IHomePageProp = StateProps & DispatchProps;

const HomePage = (props: IHomePageProp) => {
  const { films, selectedFilm, filmFilter, loading, fetchFilms, select, search, sort } = props

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
      "created": "Date",
      "episode_id": "Episode",
      "averageRating": "Rating"
    }

    return <SortButtonWrapper>
      {list.map(property =>
        <SortButton
          key={property}
          title={titleDict[property]}
          buttonState={filmFilter?.sort === property ? filmFilter?.sortDirection ?? "off" : "off"}
          color='black' backgroundColor='white'
          onClick={() => sort(property as keyof IFilm)}
        />)
      }
    </SortButtonWrapper>
  }

  return (
    <HomeWrapper>
      <Header>
        <SearchBar value={filmFilter?.search ?? ""} onChange={handleInputChange} placeholder="Type search here..." />
        {makeSortButtons(["created", "episode_id", "averageRating"])}
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
    search: (searchString?: string) => dispatch(updateSearch(searchString)),
    sort: (sortProporty: keyof IFilm) => dispatch(updateSort(sortProporty)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
