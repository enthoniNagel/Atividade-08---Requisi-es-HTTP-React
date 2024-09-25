import React, { useState, useEffect } from 'react';
import MovieModal from './MovieModal';
import './MovieList.css'; // Importar o CSS para estilização

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Função para buscar filmes
    const fetchMovies = async () => {
        const movieTitles = ["avengers", "inception", "interstellar", "matrix", "frozen", "titanic", "gladiator", "avatar", "spider-man", "batman"];
        const moviePromises = movieTitles.map(title => 
            fetch(`http://www.omdbapi.com/?s=${title}&apikey=57746edf`)
        );

        try {
            const responses = await Promise.all(moviePromises);
            const dataPromises = responses.map(res => res.json());
            const dataResults = await Promise.all(dataPromises);

            // Coletando todos os filmes
            const allMovies = dataResults.flatMap(data => data.Search || []);
            setMovies(allMovies);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const openModal = (index) => {
        setCurrentMovieIndex(index);
        setModalIsOpen(true);
    };

    const filteredMovies = movies.filter(movie =>
        movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
        
    );

    return (
        <div className="movie-list-container">
            <h2>Bem-vindo ao Tela Fria!</h2>
            <input
                type="text"
                placeholder="Buscar filme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            
            <div className="movie-container">
                {filteredMovies.map((movie, index) => (
                    <div key={movie.imdbID} onClick={() => openModal(index)} className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                    </div>
                ))}
            </div>

            {filteredMovies.length > 0 && (
                <MovieModal
                    isOpen={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    movie={filteredMovies[currentMovieIndex]}
                    nextMovie={() => setCurrentMovieIndex((prev) => (prev + 1) % filteredMovies.length)}
                    prevMovie={() => setCurrentMovieIndex((prev) => (prev - 1 + filteredMovies.length) % filteredMovies.length)}
                />
            )}
        </div>
    );
};

export default MovieList;
