import { useFavorite } from "~/store/useFavoriteStore";

export function FavoritesCounter() {
    const favorites = useFavorite((state: any) => state.favorites);

    return (
        <aside>
            My favorite movies:
            {favorites.length}
        </aside>
    )
}