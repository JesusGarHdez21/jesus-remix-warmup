import { useFavorite } from "~/store/useFavoriteStore";
import type { Movie } from "~/types/movie";
import { Heart } from "lucide-react";
import { useEffect } from "react";

export function MovieCard({ movie }: { movie: Movie }) {
    const { favorites, toggleFavorite } = useFavorite();
    const isFavorite = favorites.some((f: Movie) => f.id === movie.id);

    return (
        <div>
            <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            />

            <button
                onClick={() => toggleFavorite(movie)}
            >
                <Heart size={20} />
            </button>

            <div>
                <h3>{movie.title}</h3>
                <p>{movie.release_date.split('-')[0]}</p>
            </div>
        </div>
    )
}