import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IFilm } from "../../models/film-model";
import filmAction from '../../store/film/film-action';

interface StateProps {
  films: IFilm[]
  selectedFilm?: IFilm
}

interface DispatchProps {
  fetchFilms: () => void
  select: (selected: IFilm) => void
}

type IHomePageProp = StateProps & DispatchProps;

const HomePage = (props: IHomePageProp) => {
  const { films, selectedFilm, fetchFilms, select } = props

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flex: 1, flexDirection: "row" }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {films && films.length > 0 &&
          films.map((film: IFilm) =>
            <span key={film.episode_id} onClick={() => select(film)} >{film.title}</span>)}
      </div>
      <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: "black", color: "white" }}>
        {selectedFilm && <h5>{selectedFilm.title}</h5>}
      </div>

      {/* <button onClick={fetchFilms} >test</button> */}
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  films: state.filmReducer.list,
  selectedFilm: state.filmReducer.selected
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilms: () => dispatch(filmAction.loadFilmList()),
    select: (film: IFilm) => dispatch(filmAction.selectFilm(film))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
