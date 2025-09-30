import { Item } from "@/types/item";

export type ApiResponse = {
  items: Item[];
  total: number;
  page: number;
  limit: number;
};

export async function fetchItems(
  query: string,
  page: number,
  limit: number
): Promise<ApiResponse> {
  const url = new URL("https://example.com/api/items");
  url.searchParams.set("q", query);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("خطا در دریافت داده از سرور");

  return res.json();
}
