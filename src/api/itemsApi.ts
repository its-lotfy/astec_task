import type { Item } from "../types/item.ts";

export type ApiResponse = {
  users: Item[];
  total: number;
  skip: number;
  limit: number;
};

export async function fetchItems(
  query: string,
  skip: number,
  limit: number
): Promise<ApiResponse> {
  const url = new URL(`https://dummyjson.com/users${query && "/search"}`);
  url.searchParams.set("q", query);
  url.searchParams.set("skip", String(skip));
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("خطا در دریافت داده از سرور");

  return res.json();
}
