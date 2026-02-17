import { Heart } from "lucide-react";
import { useFavorite } from "~/store/useFavoriteStore";

export function FavoritesCounter() {
    const favorites = useFavorite((state: any) => state.favorites);

    return(
        <aside className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-red-100 rounded-full shadow-sm transition-all hover:shadow-md group">
            <div className="relative">
                <Heart 
                    size={20} 
                    className={"fill-red-500 text-red-500 scale-110"}
                />
                {favorites.length > 0 && (
                    <span className="absolute inset-0 rounded-full bg-red-400 blur-sm opacity-20 animate-pulse"></span>
                )}
            </div>
            
            <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-black font-bold leading-none">
                    Favorites
                </span>
                <span className="text-sm font-black text-gray-800 tabular-nums">
                    {favorites.length.toString().padStart(2, '0')}
                </span>
            </div>
        </aside>
    )
}