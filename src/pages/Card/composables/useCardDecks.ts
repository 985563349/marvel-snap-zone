import { useQuery } from '@tanstack/vue-query';

export default function useCardDecks(id: string) {
  const fetcher = (id: string) =>
    fetch(`https://marvel-snap-crawler.vercel.app/api/cards/${id}/decks`).then((response) =>
      response.json()
    );

  return useQuery({
    queryKey: ['card-desks', id],
    queryFn: () => fetcher(id),
  });
}
