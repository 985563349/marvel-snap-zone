import { useQuery } from '@tanstack/vue-query';

export default function useCardInfo(id: string) {
  const fetcher = (id: string) =>
    fetch(`http://localhost:3000/api/cards/${id}`).then((response) => response.json());

  return useQuery({
    queryKey: ['card-info', id],
    queryFn: () => fetcher(id),
  });
}
