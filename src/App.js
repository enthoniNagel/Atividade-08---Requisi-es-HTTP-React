// src/App.js

import React from 'react';
import Header from './Header';
import MovieList from './MovieList';
import './App.css';


const App = () => {
    return (
        <div>
            <Header />
            <MovieList />
        </div>
    );
};

export default App;
