import { useQuery } from '@tanstack/vue-query';

export default function useCardInfo(id: string) {
  const fetcher = (id: string) =>
    fetch(`http://192.168.201.114:3000/api/cards/${id}`).then((response) => response.json());

  return useQuery({
    queryKey: ['card-info', id],
    queryFn: () => fetcher(id),
  });
}
