import axios, {
  AxiosHeaders,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

function getStoredAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("admin_token") ?? "";
}

const adminApi = axios.create({
  headers: {
    Accept: "application/json",
  },
});

adminApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getStoredAdminToken();

  if (!token) {
    return config;
  }

  const headers = AxiosHeaders.from(config.headers);
  headers.set("Authorization", `Bearer ${token}`);
  config.headers = headers;

  return config;
});

function normalizeHeaders(headers?: HeadersInit): Record<string, string> {
  if (!headers) {
    return {};
  }

  if (headers instanceof Headers) {
    const normalized: Record<string, string> = {};
    headers.forEach((value, key) => {
      normalized[key] = value;
    });
    return normalized;
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return headers as Record<string, string>;
}

function buildAxiosConfig(
  url: string,
  options: RequestInit = {},
): AxiosRequestConfig {
  const normalizedHeaders = normalizeHeaders(options.headers);

  if (options.body instanceof FormData) {
    delete normalizedHeaders["Content-Type"];
  } else if (
    typeof options.body === "string" &&
    !normalizedHeaders["Content-Type"]
  ) {
    normalizedHeaders["Content-Type"] = "application/json";
  }

  return {
    url,
    method: (options.method ?? "GET") as AxiosRequestConfig["method"],
    data: options.body,
    headers: normalizedHeaders,
  };
}

export async function adminFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const config = buildAxiosConfig(url, options);
  const response = await adminApi.request(config);

  const responseBody =
    response.data == null
      ? ""
      : typeof response.data === "string"
        ? response.data
        : JSON.stringify(response.data);

  const headers = new Headers();
  if (response.headers && typeof response.headers.forEach === "function") {
    response.headers.forEach((value: string, key: string) => {
      headers.set(key, value);
    });
  }

  return new Response(responseBody, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export { adminApi };
