import { useQuery } from '@tanstack/vue-query';

type CardModel = {
  id: string;
  cid: string;
  name: string;
  art: string;
  source: string;
};

export default function useCards() {
  const fetcher = () =>
    fetch('http://localhost:3008/api/cards').then((response) => response.json());

  return useQuery<CardModel[]>({
    queryKey: ['cards'],
    queryFn: fetcher,
    networkMode: 'always',
  });
}
