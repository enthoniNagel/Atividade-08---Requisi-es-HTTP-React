# Projeto Tela Fria

O **Tela Fria** é um site de exibição de filmes, onde os usuários podem buscar e visualizar informações de diferentes filmes utilizando a API pública do OMDB. O projeto apresenta uma interface intuitiva com um sistema de busca e uma imagem de fundo fixa, garantindo uma experiência de navegação agradável.

## Estrutura do Projeto

### 1. **MovieList.js**
Este componente React é responsável por buscar filmes da API OMDB, exibi-los em cartões (cards), e gerenciar a interação do usuário.

#### Funcionalidades:
- **Busca de Filmes**: O site faz uma busca de filmes pré-definidos (ex: Avengers, Inception) e exibe seus títulos e imagens.
- **Sistema de Busca**: Um campo de busca permite ao usuário procurar filmes específicos e visualizar os resultados em tempo real.

## Mudanças Recentes

- Remoção de comentários desnecessários no código para melhor legibilidade e organização.
- Melhorias gerais no código.

## Ícone Representativo
![Ícone de Filme](https://cdn-icons-png.flaticon.com/512/3574/3574820.png)

Fonte do ícone: [Flaticon](https://www.flaticon.com/br/icone-gratis/assistindo-um-filme_3574820?term=filme&related_id=3574820)

---

Esse ícone representa a temática do projeto relacionado à API de filmes.
<<<<<<< HEAD
#### Código:

```javascript
import React, { useState, useEffect } from 'react';
import './MovieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchMovies = async () => {
        const movieTitles = ["avengers", "inception", "interstellar", "matrix", "frozen", "titanic", "gladiator", "avatar", "spider-man", "batman"];
        const moviePromises = movieTitles.map(title => 
            fetch(`http://www.omdbapi.com/?s=${title}&apikey=57746edf`)
        );

        try {
            const responses = await Promise.all(moviePromises);
            const dataPromises = responses.map(res => res.json());
            const dataResults = await Promise.all(dataPromises);
            const allMovies = dataResults.flatMap(data => data.Search || []);
            setMovies(allMovies);
        } catch (error) {
            console.error("Erro ao buscar filmes:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

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
                    <div key={movie.imdbID} className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} />
                        <h3>{movie.Title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};
