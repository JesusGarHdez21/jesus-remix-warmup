import { create } from 'zustand';
import type { Movie } from '~/types/movie';

export const useFavorite = create((set) => ({
    favorites: [],
    toggleFavorite: (movie: Movie) => set((state: any) => {
        const isFavorite = state.favorites.find((m: any) => m.id === movie.id);

        return {
            favorites: isFavorite ? state.favorites.filter((m: any) => m.id !== movie.id) : [...state.favorites, movie]
        }
    }
    )
})
);