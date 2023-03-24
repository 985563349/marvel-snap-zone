import { useQuery } from '@tanstack/vue-query';

export default function useCardDecks(cid: string) {
  const fetcher = (cid: string) =>
    fetch(`https://marvel-snap-crawler.vercel.app/api/cards/${cid}/decks`).then((response) =>
      response.json()
    );

  return useQuery({
    queryKey: ['card-desks', cid],
    queryFn: () => fetcher(cid),
  });
}
