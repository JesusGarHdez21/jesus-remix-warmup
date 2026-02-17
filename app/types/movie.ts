export interface Movie {
    adult: Boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: number;
    vote_count: number;
}

export interface TMBDResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}