import { useQuery } from '@tanstack/vue-query';

type CardModel = {
  id: string;
  cid: string;
  name: string;
  url: string;
  art: string;
  source: string;
};

const fetcher = () =>
  fetch('https://marvel-snap-crawler.vercel.app/api/cards').then((response) => response.json());

export default function useCards() {
  return useQuery<CardModel[]>({
    queryKey: ['cards'],
    queryFn: fetcher,
    networkMode: 'offlineFirst',
  });
}
