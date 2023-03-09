<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { kebabCase } from 'lodash';

const fetcher = () =>
  fetch('http://192.168.201.114:3000/api/cards').then((response) => response.json());

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['cards'],
  queryFn: fetcher,
  networkMode: 'always',
});

const formData = reactive({
  name: '',
  pool: '',
});

const cards = computed(() => data.value?.filter((card) => {
  const { name, pool } = formData;
  const isNameMatch = !name || card.name.includes(name);
  const isPoolMatch = !pool || card.source === pool;

  return isNameMatch && isPoolMatch;
}));

const options = [
  'Starter Card',
  'Collection Level 1-14',
  'Collection Level 18-214 (Pool 1)',
  'Collection Level 222-474 (Pool 2)',
  'Collection Level 486+ (Pool 3)',
  'Series 4 Rare - Collection Level 486+ (Pool 4)',
  'Series 5 Ultra Rare - Collection Level 486+ (Pool 5)',
  'Recruit Season',
  'Season Pass'
];
</script>

<template>
  <div>
    <nav class="space-x-2 p-4 text-purple-500 text-sm font-semibold">
      <router-link to="/" class="hover:text-purple-400">HOME</router-link>
      <span class="select-none">/</span>
      <span>CARDS</span>
    </nav>

    <h1 class="my-4 text-center text-xl">Marvel Snap Card Database</h1>

    <div class="my-8 px-4">
      <form class="flex flex-wrap gap-4">
        <label class="block w-full max-w-sm">
          <input
            v-model="formData.name"
            name="search"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
            placeholder="Search"
          />
        </label>

        <label class="block w-full max-w-sm">
          <select
            v-model="formData.pool"
            name="abilities"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
          >
            <option disabled value="">Source</option>
            <option v-for="option of options" :value="option">{{ option }}</option>
          </select>
        </label>
      </form>
    </div>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="cards" class="p-4">
      <ul class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-y-6">
        <li v-for="{ cid, url, art, name } of cards">
          <router-link :to="`/cards/${kebabCase(name)}?cid=${cid}`">
            <div class="relative mb-4 pb-[100%] h-0">
              <img class="absolute inset-0 w-full h-full scale-125 pointer-events-none" v-lazy="art" :alt="name" />
            </div>
            <p class="text-xs text-center">{{ name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
