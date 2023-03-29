import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/store';
import { IFilm } from "../../models/film-model";
import filmAction from '../../store/film/film-action';

interface StateProps {
  films: IFilm[]
}

interface DispatchProps {
  fetchFilms: () => void;
}

type IHomePageProp = StateProps & DispatchProps;

const HomePage = (props: IHomePageProp) => {
  const { films, fetchFilms } = props

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flex: 1, flexDirection: "row" }}>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        {films && films.length > 0 && films.map((film: IFilm) => <span key={film.episode_id} >{film.title}</span>)}
      </div>
      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}></div>

      {/* <button onClick={fetchFilms} >test</button> */}
    </div>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  films: state.filmReducer.list,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchFilms: () => dispatch(filmAction.loadFilmList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
