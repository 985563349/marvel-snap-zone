import { reactive, computed } from 'vue';
import type { Ref } from 'vue';

export default function useFilteredCards(data: Ref<any[] | undefined>) {
  const filter = reactive({
    name: '',
    pool: '',
  });

  const filteredCards = computed(() =>
    data.value?.filter((card) => {
      const { name, pool } = filter;
      const isNameMatch = !name || new RegExp(name, 'i').test(card.name);
      const isPoolMatch = !pool || card.source === pool;
      return isNameMatch && isPoolMatch;
    })
  );

  return {
    filter,
    filteredCards,
  };
}
