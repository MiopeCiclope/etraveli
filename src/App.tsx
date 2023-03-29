import React from 'react';
import { Provider } from "react-redux";
import { store } from "./store/store";

import './App.css';
import HomePage from './pages/home/home-page';

function App() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}

export default App;
