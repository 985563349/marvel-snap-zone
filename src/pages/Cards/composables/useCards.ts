import { useQuery } from '@tanstack/vue-query';

type CardModel = {
  id: string;
  cid: string;
  name: string;
  art: string;
  source: string;
};

const fetcher = () => fetch('http://localhost:3000/api/cards').then((response) => response.json());

export default function useCards() {
  return useQuery<CardModel[]>({
    queryKey: ['cards'],
    queryFn: fetcher,
    networkMode: 'offlineFirst',
  });
}
