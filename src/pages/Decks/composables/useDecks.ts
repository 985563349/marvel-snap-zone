import { reactive } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';

export default function useDecks() {
  const search = reactive({
    pageSize: 24,
    sources: '',
    abilities: '',
  });

  const fetcher = ({ pageParam = 1, queryKey }: any) => {
    const params = new URLSearchParams({ currentPage: pageParam, ...queryKey[1] }).toString();
    return fetch(`http://localhost:3000/api/decks?${params}`).then((response) => response.json());
  };

  const queryReturn = useInfiniteQuery({
    queryKey: ['decks', search],
    queryFn: fetcher,
    getNextPageParam: (lastPage, pages) => lastPage.currentPage + 1,
  });

  return {
    search,
    ...queryReturn,
  };
}
