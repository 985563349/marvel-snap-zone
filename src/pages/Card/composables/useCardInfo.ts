import { useQuery } from '@tanstack/vue-query';

const fetcher = (id: string) =>
  fetch(`https://marvel-snap-crawler.vercel.app/api/cards/${id}`).then((response) =>
    response.json()
  );

export default function useCardInfo(id: string) {
  return useQuery({
    queryKey: ['card-info', id],
    queryFn: () => fetcher(id),
    refetchOnWindowFocus: false,
    networkMode: 'offlineFirst',
  });
}
