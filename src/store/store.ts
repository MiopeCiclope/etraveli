import { createStore, applyMiddleware, Store, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import filmReducer, { IFilmReducerState } from "./film/film-reducer"

export interface ApplicationState {
    filmReducer: IFilmReducerState
};

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducer = combineReducers({
    filmReducer
});

const store: Store<ApplicationState> = createStore(
    combinedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export { store };
