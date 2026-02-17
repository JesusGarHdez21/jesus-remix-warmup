import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Movie } from '~/types/movie';

export const useFavorite = create<FavoriteState>()(
    persist(
        (set) => ({
            favorites: [],
            toggleFavorite: (movie) =>
                set((state) => {
                    const isFavorite = state.favorites.some((f) => f.id === movie.id);
                    if (isFavorite) {
                        return { favorites: state.favorites.filter((f) => f.id !== movie.id) };
                    }
                    return { favorites: [...state.favorites, movie] };
                }),
        }),
        {
            name: "movie-favorites"
        }
    )
);