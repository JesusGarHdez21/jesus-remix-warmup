import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";
import type { Movie, TMBDResponse } from "~/types/movie";
import { MovieCard } from "~/components/MovieCard";
import { FavoritesCounter } from "~/components/FavoritesSidebar";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export async function loader({ context }: LoaderFunctionArgs) {
    const apiKey = context.cloudflare.env.TMDB_API_KEY;
    if (!apiKey) {
        throw new Response("Api key is not defined", { status: 500 });
    }

    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    if (!res.ok) {
        throw new Response("Failed to fetch information", { status: res.status });
    }

    const data: TMBDResponse = await res.json();
    return { initialMovies: data.results, apiKey };
}

export default function Index() {
    const { initialMovies, apiKey } = useLoaderData<typeof loader>();
    const [searchTerm, setSearchTerm] = useState("");
    const { data: movies, isLoading } = useQuery({
        queryKey: ["movies", searchTerm],
        queryFn: async () => {
            if (!searchTerm) return initialMovies;

            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`);
            const data: TMBDResponse = await res.json();

            return data.results;
        },
        enabled: searchTerm.length > 2 || searchTerm.length === 0,
        initialData: initialMovies
    });

    return (
        <main className="p-10">
            <div className="flex flex-row my-7">
                <h1 className="w-1/2 text-center text-3xl font-bold mb-8 text-white">Popular Movies</h1>
                <div className="w-1/3 relative mx-auto">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 text-fuchsia-500 animate-spin" />
                        ) : (
                            <Search className="h-5 w-5 text-slate-400" />
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Search for movies, actors, genres..."
                        className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500 transition-all placeholder:text-slate-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="fixed bottom-6 right-6 z-5">
                <FavoritesCounter />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies?.map((movie: Movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </main>
    )
}