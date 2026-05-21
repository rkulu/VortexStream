export interface AnimeItem {
  id: string;
  title: string;
  image: string | null;

  slug?: string;
  type?: string;
  episode?: string;
  status?: string;
  rating?: string;
  genres?: string[];
  rank?: string;
  time?: string;
  views?: string;
  link?: string;
  description?: string;
}

/* =========================
   COMMON
========================= */

export interface PaginationData {
  current_page: number;
  total_pages: number;
  has_next_page: boolean;
  next_page: number | null;
  prev_page: number | null;
  has_prev_page: boolean;
}

export interface ListResponse {
  status: string;
  creator?: string;
  source?: string;
  message?: string;

  data: AnimeItem[];

  pagination?: PaginationData;

  filters?: {
    order?: string;
  };
}

/* =========================
   EPISODE
========================= */

export interface EpisodeItem {
  id: string;
  title: string;
  slug?: string;
  number?: string;
  aired?: string;
  link?: string;
}

export interface GenreItem {
  name: string;
  url: string;
}

export interface AnimeInfo {
  rating: string;
  season: string;
  genres: GenreItem[];
  status: string;
  type: string;
  episodes_count: string;
  duration: string;
  studio: string;
  release_date: string;
}

export interface AnimeDetail {
  title: string;
  image: string;
  synopsis: string;

  info: AnimeInfo;

  episodes: EpisodeItem[];

  recommendations: AnimeItem[];
}

export interface AnimeDetailResponse {
  status: string;
  creator: string;
  type: string;
  data: AnimeDetail;
}

/* =========================
   STREAM
========================= */

export interface EpisodeStream {
  resolution: string;
  server: string;

  data: {
    post: string;
    nume: string;
    type: string;
  };
}

export interface EpisodeDownload {
  resolution: string;

  links: {
    server: string;
    url: string;
  }[];
}

export interface EpisodeNavigation {
  prev: {
    id: string;
    link: string;
  } | null;

  next: {
    id: string;
    link: string;
  } | null;
}

export interface EpisodeAllEpisode {
  title: string;
  url: string;
  id: string;
  active: boolean;
}

export interface EpisodeDetail {
  title: string;

  downloads: EpisodeDownload[];

  streams: EpisodeStream[];

  navigation: EpisodeNavigation;

  all_episodes: EpisodeAllEpisode[];
}

export interface EpisodeDetailResponse {
  status: string;
  creator: string;
  data: EpisodeDetail;
}

/* =========================
   SERVER
========================= */

export interface ServerResponse {
  status: string;
  creator: string;

  embed_url: string;

  html: string;
}

/* =========================
   HOME
========================= */

export interface HomeData {
  status: string;
  creator: string;
  source: string;

  data: {
    top10_anime: AnimeItem[];

    top10_film: AnimeItem[];

    latest_anime: AnimeItem[];

    latest_film: AnimeItem[];

    latest_series: AnimeItem[];

    tv_show: AnimeItem[];
  };
}

/* =========================
   SEARCH
========================= */

export interface SearchData {
  status: string;
  creator: string;

  query: string;

  results: AnimeItem[];

  pagination: PaginationData;
}

/* =========================
   POPULAR / LIST
========================= */

export type PopularData = ListResponse;

export type SeriesData = ListResponse;

export type FilmData = ListResponse;

/* =========================
   CATALOG
========================= */

export interface CatalogData {
  status?: string;

  data: AnimeItem[];

  genres?: {
    id: string;
    name: string;
    slug: string;
  }[];

  pagination?: PaginationData;
}

/* =========================
   GENRE
========================= */

export interface GenreListItem {
  name: string;
  slug?: string;
  count: number;
  url: string;
}

export interface GenreListData {
  status: string;
  creator: string;

  total: number;

  data: GenreListItem[];
}

export interface GenreData {
  status?: string;

  genre?: string;

  data: AnimeItem[];

  pagination?: PaginationData;
}

/* =========================
   SCHEDULE
========================= */

export interface ScheduleAnimeItem {
  title: string;
  id: string;

  type: string;

  time: string;

  image: string | null;

  score: string;

  url: string;
}

export interface ScheduleData {
  status: string;

  creator: string;

  day: string;

  available_days: string[];

  data: ScheduleAnimeItem[];
}

export type ScheduleDay =
  | "senin"
  | "selasa"
  | "rabu"
  | "kamis"
  | "jumat"
  | "sabtu"
  | "minggu"
  | "acak"
  | "all";