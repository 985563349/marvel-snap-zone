import { useQuery } from '@tanstack/vue-query';

const fetcher = (id: string) =>
  fetch(`http://localhost:3000/api/cards/${id}/decks`).then((response) => response.json());

export default function useCardDecks(id: string) {
  return useQuery({
    queryKey: ['card-desks', id],
    queryFn: () => fetcher(id),
  });
}
