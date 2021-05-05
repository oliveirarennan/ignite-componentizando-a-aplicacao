import { useState, useEffect } from 'react';
import { api } from '../services/api';
import '../styles/content.scss';

import {MovieCard} from "./MovieCard"

type GenreResponseProps = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

type MovieProps = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

type ContentProps = {
  genre: GenreResponseProps;
}


export function Content(props: ContentProps) {
  // Complete aqui
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.genre.id}`).then(response => {
      setMovies(response.data);
    });

    
  }, [props.genre.id]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {props.genre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}