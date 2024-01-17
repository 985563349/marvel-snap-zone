import { useQuery } from '@tanstack/vue-query';

const fetcher = (cid: string) =>
  fetch(`https://marvel-snap-crawler.vercel.app/api/cards/${cid}/decks`).then((response) =>
    response.json()
  );

export default function useCardDecks(cid: string) {
  return useQuery({
    queryKey: ['card-desks', cid],
    queryFn: () => fetcher(cid),
  });
}
