import { useQuery } from '@tanstack/vue-query';

type CardModel = {
  id: string;
  cid: string;
  name: string;
  url: string;
  art: string;
  source: string;
};

export default function useCards() {
  const fetcher = () =>
    fetch('http://192.168.201.114:3000/api/cards').then((response) => response.json());

  return useQuery<CardModel[]>({
    queryKey: ['cards'],
    queryFn: fetcher,
    networkMode: 'always',
  });
}
