import { useEffect, useRef, useState, useCallback } from "react";
import type { Item } from "../types/item.ts";
import { fetchItems } from "../api/itemsApi.ts";
import { debounce } from "../utils/debounce.ts";

export function useAsyncAutocomplete(pageSize = 20) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearch = useRef(
    debounce((val: string) => {
      setOptions([]);
      setPage(1);
      setHasMore(true);
      setError(null);
      loadItems(val, 1);
    }, 900)
  ).current;

  const loadItems = useCallback(
    async (query: string, currentPage: number) => {
      if (loading) return;
      if (!hasMore && currentPage !== 1) return;

      setLoading(true);
      try {
        const data = await fetchItems(query, currentPage, pageSize);
        setOptions((prev) =>
          currentPage === 1 ? data.users : [...prev, ...data.users]
        );
        setHasMore(data.skip * data.limit < data.total);
        setPage(currentPage);
      } catch (err: unknown) {
        if (err instanceof Error) console.error(err.message);
        setError("خطا در اتصال به سرور");
      } finally {
        setLoading(false);
      }
    },
    [hasMore, pageSize]
  );

  useEffect(() => {
    if (open) {
      loadItems(inputValue, 1);
    }
  }, [open, loadItems]);

  const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const el = e.currentTarget;
    if (
      el.scrollTop + el.clientHeight >= el.scrollHeight - 150 &&
      !loading &&
      hasMore
    ) {
      loadItems(inputValue, page + 1);
    }
  };

  return {
    open,
    setOpen,
    inputValue,
    setInputValue: (val: string) => {
      setInputValue(val);
      debouncedSearch(val);
    },
    options,
    loading,
    error,
    onScroll,
  };
}
