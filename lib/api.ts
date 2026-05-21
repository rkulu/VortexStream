import {
  HomeData,
  SearchData,
  AnimeDetailResponse,
  AnimeDetail,
  EpisodeDetailResponse,
  EpisodeDetail,
  ServerResponse,
  CatalogData,
  GenreListData,
  GenreData,
  ScheduleData,
  ScheduleDay,
  AnimeItem,
  PopularData,
  SeriesData,
  FilmData,
  ListResponse,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.sankavollerei.com/anime/winbu";

async function fetchApi<T>(endpoint: string, revalidate: number = 3600): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  console.log('Fetching API endpoint:', url);
  
  try {
    const res = await fetch(url, {
      next: {
        revalidate,
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`Endpoint not found: ${endpoint}`);
      }
      console.error('API error response:', res.status, res.statusText);
      throw new Error(`API Error ${res.status}: Failed to fetch ${endpoint}`);
    }

    const data = await res.json();
    console.log('API response data for', endpoint, data);
    
    if (!data) {
      throw new Error(`Empty response data for ${endpoint}`);
    }
    
    return data;
  } catch (error) {
    console.error('Fetch error for', endpoint, error);
    throw error;
  }
}

/* =========================
   HOME
========================= */

export const getHomeData = () =>
  fetchApi<HomeData>("/home", 60);

/* =========================
   SEARCH
========================= */

export async function searchAnime(
  query: string,
  page?: number
): Promise<SearchData> {
  const params = new URLSearchParams({
    q: query,
  });

  if (page) {
    params.set("page", page.toString());
  }

  return fetchApi<SearchData>(`/search?${params.toString()}`, 300);
}

/* =========================
   DETAIL
========================= */

export async function getAnimeDetail(
  id: string
): Promise<AnimeDetail> {
  const response =
    await fetchApi<AnimeDetailResponse>(
      `/anime/${id}`,
      600
    );

  return response.data;
}

export async function getEpisodeDetail(
  id: string
): Promise<EpisodeDetail> {
  const response =
    await fetchApi<EpisodeDetailResponse>(
      `/episode/${id}`,
      600
    );

  return response.data;
}

export async function getSeriesDetail(
  id: string
): Promise<AnimeDetail> {
  const response =
    await fetchApi<AnimeDetailResponse>(
      `/series/${id}`,
      600
    );

  return response.data;
}

export async function getFilmDetail(
  id: string
): Promise<AnimeDetail> {
  const response =
    await fetchApi<AnimeDetailResponse>(
      `/film/${id}`,
      600
    );

  return response.data;
}

/* =========================
   LIST
========================= */

function buildPageQuery(page?: number) {
  return page ? `?page=${page}` : "";
}

// export function getAnimeList(
//   page?: number
// ): Promise<{ results: AnimeItem[] }> {
//   return fetchApi<{ results: AnimeItem[] }>(
//     `/anime${buildPageQuery(page)}`
//   );
// }

export async function getFilmList(
  page?: number
): Promise<ListResponse> {
  // Primary endpoint (may not exist). Fall back to home data if needed.
  try {
    return await fetchApi<ListResponse>(
      `/film${buildPageQuery(page)}`,
      300
    );
  } catch (e) {
    console.warn('Film endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return {
      status: home.status,
      creator: home.creator,
      data: home.data.top10_film,
    } as unknown as ListResponse;
  }
}

export async function getSeriesList(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(
      `/series${buildPageQuery(page)}`,
      300
    );
  } catch (e) {
    console.warn('Series endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return {
      status: home.status,
      creator: home.creator,
      data: home.data.latest_series,
    } as ListResponse;
  }
}

export async function getTvShowList(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(
      `/tvshow${buildPageQuery(page)}`,
      300
    );
  } catch (e) {
    console.warn('TV Show endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return {
      status: home.status,
      creator: home.creator,
      data: home.data.tv_show,
    } as ListResponse;
  }
}

export async function getOthersList(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(
      `/others${buildPageQuery(page)}`,
      300
    );
  } catch (e) {
    console.warn('Others endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return {
      status: home.status,
      creator: home.creator,
      data: [...home.data.top10_anime, ...home.data.top10_film],
    } as ListResponse;
  }
}

export async function getAnimedonghua(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(`/animedonghua${buildPageQuery(page)}`, 300);
  } catch (e) {
    console.warn('animedonghua endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return { status: home.status, creator: home.creator, data: home.data.latest_anime } as ListResponse;
  }
}

export function getPopular(
  page?: number
): Promise<PopularData> {
  return fetchApi<PopularData>(
    `/populer${buildPageQuery(page)}`,
    300
  );
}

/* =========================
   SCHEDULE
========================= */

export async function getSchedule(
  day: ScheduleDay = "all"
): Promise<ScheduleData> {
  const params = new URLSearchParams({
    day,
  });

  return fetchApi<ScheduleData>(
    `/schedule?${params.toString()}`,
    300
  );
}

/*
CONTOH:
getSchedule()
=> /schedule?day=all

getSchedule("Senin")
=> /schedule?day=Senin
*/

/* =========================
   GENRES
========================= */

export function getGenres(): Promise<GenreListData> {
  return fetchApi<GenreListData>("/genres", 600);
}

export function getGenreBySlug(
  slug: string,
  page?: number
): Promise<GenreData> {
  return fetchApi<GenreData>(
    `/genre/${slug}${buildPageQuery(page)}`,
    600
  );
}

/* =========================
   CATALOG
========================= */

export function getCatalog(
  params?: Record<string, string>
): Promise<CatalogData> {
  const query = params
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  return fetchApi<CatalogData>(
    `/catalog${query}`,
    300
  );
}

/* =========================
   OTHER LISTS
========================= */

export async function getUpdated(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(`/updated${buildPageQuery(page)}`, 60);
  } catch (e) {
    console.warn('updated endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return { status: home.status, creator: home.creator, data: home.data.latest_anime } as ListResponse;
  }
}

export async function getLatest(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(`/latest${buildPageQuery(page)}`, 60);
  } catch (e) {
    console.warn('latest endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return { status: home.status, creator: home.creator, data: home.data.latest_anime } as ListResponse;
  }
}

export async function getOngoing(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(`/ongoing${buildPageQuery(page)}`, 60);
  } catch (e) {
    console.warn('ongoing endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return { status: home.status, creator: home.creator, data: home.data.top10_anime } as ListResponse;
  }
}

export async function getCompleted(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(`/completed${buildPageQuery(page)}`, 300);
  } catch (e) {
    console.warn('completed endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return { status: home.status, creator: home.creator, data: home.data.top10_anime } as ListResponse;
  }
}

export async function getAllAnime(
  page?: number
): Promise<ListResponse> {
  try {
    return await fetchApi<ListResponse>(
      `/all-anime${buildPageQuery(page)}`,
      300
    );
  } catch (e) {
    console.warn('all-anime endpoint failed, falling back to home data', e);
    const home = await getHomeData();
    return {
      status: home.status,
      creator: home.creator,
      data: home.data.top10_anime,
    } as ListResponse;
  }
}

export async function getAnimeList(
  page?: number
): Promise<ListResponse> {
  const params = page ? `?page=${page}` : "";

  return fetchApi<ListResponse>(
    `/all-anime${params}`,
    300
  );
}

export function getAllAnimeReverse(
  page?: number
): Promise<{ results: AnimeItem[] }> {
  return fetchApi<{ results: AnimeItem[] }>(
    `/all-anime-reverse${buildPageQuery(page)}`,
    300
  );
}

/* =========================
   SERVER EMBED
========================= */

export async function getServerEmbed(
  post: string,
  nume: string,
  type: string
): Promise<ServerResponse> {
  const params = new URLSearchParams({
    post,
    nume,
    type,
  });

  return fetchApi<ServerResponse>(
    `/server?${params.toString()}`,
    3600
  );
}
