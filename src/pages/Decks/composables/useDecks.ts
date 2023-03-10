import { reactive } from 'vue';
import { useInfiniteQuery } from '@tanstack/vue-query';

export default function useDecks() {
  const search = reactive({
    sources: '',
    abilities: '',
  });

  const fetcher = ({ pageParam = 0, queryKey }: any) => {
    const params = new URLSearchParams({ nextpage: pageParam, ...queryKey[1] }).toString();
    return fetch(`http://192.168.201.114:3000/api/decks?${params}`).then((response) =>
      response.json()
    );
  };

  const queryReturn = useInfiniteQuery({
    queryKey: ['decks', search],
    queryFn: fetcher,
    getNextPageParam: (lastPage, pages) => lastPage.current_page + 1,
  });

  return {
    search,
    ...queryReturn,
  };
}
