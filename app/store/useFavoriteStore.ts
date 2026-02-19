import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '~/types/movie';

interface FavoriteState {
    favorites: Movie[];
    toggleFavorite: (movie: Movie) => void;
}

export const useFavorite = create<FavoriteState>()(
    persist(
        (set) => ({
            favorites: [],
            toggleFavorite: (movie: Movie) =>
                set((state: any) => {
                    const isFavorite = state.favorites.some((f: Movie) => f.id === movie.id);
                    if (isFavorite) {
                        return { favorites: state.favorites.filter((f: Movie) => f.id !== movie.id) };
                    }
                    return { favorites: [...state.favorites, movie] };
                }),
        }),
        {
            name: "movie-favorites"
        }
    )
);