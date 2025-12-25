import { ApiRoute, PageRoute } from "./types";

const BASE_URL = "http://localhost:9453";

export class NextLensError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "NextLensError";
  }
}

async function fetchFromNextLens<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new NextLensError(`Failed to fetch from next-lens: ${response.statusText}`, response.status);
  }

  const data = await response.json();
  return data as T;
}

export async function fetchApiRoutes(): Promise<ApiRoute[]> {
  return fetchFromNextLens<ApiRoute[]>("/api/routes");
}

export async function fetchPageRoutes(): Promise<PageRoute[]> {
  return fetchFromNextLens<PageRoute[]>("/api/pages");
}


