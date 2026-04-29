/**
 * Thin wrapper around fetch that automatically attaches the stored
 * admin_token as an Authorization header.
 *
 * Usage (identical to fetch):
 *   const res = await adminFetch("/api/admin/leads");
 *   const res = await adminFetch("/api/admin/leads", { method: "DELETE", body: JSON.stringify({ id }) });
 */
export async function adminFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const token =
    typeof window !== "undefined"
      ? (localStorage.getItem("admin_token") ?? "")
      : "";

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers ?? {}),
    },
  });
}
