import { useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

type MaybeRef<T> = Ref<T> | T;

export default function useCardDecks(cid: string, enabled: MaybeRef<boolean | undefined>) {
  const fetcher = (cid: string) =>
    fetch(`https://marvel-snap-crawler.vercel.app/api/cards/${cid}/decks`).then((response) =>
      response.json()
    );

  return useQuery({
    queryKey: ['card-desks', cid],
    queryFn: () => fetcher(cid),
    enabled,
  });
}
