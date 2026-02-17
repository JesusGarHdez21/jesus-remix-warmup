import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Movie, TMBDResponse } from "~/types/movie";
import { MovieCard } from "~/components/MovieCard";
import { FavoritesCounter } from "~/components/FavoritesSidebar";

export async function loader({ context }: LoaderFunctionArgs) {
    const apiKey = context.cloudflare.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Response("Api key is not defined", { status: 500 });
    }

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    if(!res.ok) {
        throw new Response("Failed to fetch information", { status: res.status });
    }

    const data: TMBDResponse = await res.json();
    return { initialMovies: data.results };
}

export default function Index() {
    const { initialMovies } = useLoaderData<typeof loader>();
    const { data: movies } = useQuery({
        queryKey: ["movies", "popular"],
        queryFn: async () => {
            const res = await fetch("/api/movies");
            return res.json();
        },
        initialData: initialMovies
    });

    return (
        <span>
            <FavoritesCounter/>
            {
                movies?.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))
            }
        </span>
    )
}