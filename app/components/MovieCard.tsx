import { useFavorite } from "~/store/useFavoriteStore";
import type { Movie } from "~/types/movie";
import { Heart } from "lucide-react";

export function MovieCard({ movie }: { movie: Movie }) {
    const { favorites, toggleFavorite } = useFavorite();
    const isFavorite = favorites.some((f: Movie) => f.id === movie.id);

    return (
        <div className="group relative bg-slate-800/40 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-fuchsia-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt={movie.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80" />
                
                {/* Botón flotante */}
                <button
                    onClick={() => toggleFavorite(movie)}
                    className="absolute top-4 right-4 p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 hover:bg-slate-800 transition-all"
                >
                    <Heart
                        size={20}
                        className={`${isFavorite ? "fill-fuchsia-500 text-fuchsia-500" : "text-white"}`}
                    />
                </button>
            </div>

            <div className="p-5">
                <h3 className="font-bold text-lg text-slate-100 truncate group-hover:text-fuchsia-400 transition-colors">
                    {movie.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-medium px-2 py-1 bg-slate-700/50 rounded-md text-slate-400">
                        {movie.release_date.split('-')[0]}
                    </span>
                    <span className="text-xs text-yellow-500 flex items-center gap-1">
                        ★ {movie.vote_average.toFixed(1)}
                    </span>
                </div>
            </div>
        </div>
    )
}