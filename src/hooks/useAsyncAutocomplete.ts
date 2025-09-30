import { useEffect, useRef, useState, useCallback } from "react";
import { fetchItems } from "@/api/itemsApi";
import { Item } from "@/types/item";
import { debounce } from "@/utils/debounce";

export function useAsyncAutocomplete(pageSize = 20) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadItems = useCallback(
    async (query: string, currentPage: number) => {
      if (loading) return;
      if (!hasMore && currentPage !== 1) return;

      setLoading(true);
      try {
        const data = await fetchItems(query, currentPage, pageSize);
        setOptions((prev) =>
          currentPage === 1 ? data.items : [...prev, ...data.items]
        );
        setHasMore(data.page * data.limit < data.total);
        setPage(currentPage);
      } catch (err: unknown) {
        if (err instanceof Error) console.error(err.message);
        setError("خطا در اتصال به سرور");
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, pageSize]
  );

  const debouncedSearch = useRef(
    debounce((val: string) => {
      setOptions([]);
      setPage(1);
      setHasMore(true);
      setError(null);
      loadItems(val, 1);
    }, 300)
  ).current;

  useEffect(() => {
    if (open) {
      loadItems(inputValue, 1);
    }
  }, [open, inputValue, loadItems]);

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
