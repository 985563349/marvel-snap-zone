<script lang="ts">
export default {
  name: 'Cards',
};
</script>

<script setup lang="ts">
import { kebabCase } from 'lodash';

import useCards from './composables/useCards';
import useFilteredCards from './composables/useFilteredCards';

const { isLoading, isError, data, error } = useCards();
const { filter, filteredCards } = useFilteredCards(data);

const pools = [
  'Starter Card',
  'Collection Level 1-14',
  'Collection Level 18-214 (Pool 1)',
  'Collection Level 222-474 (Pool 2)',
  'Collection Level 486+ (Pool 3)',
  'Series 4 Rare - Collection Level 486+ (Pool 4)',
  'Series 5 Ultra Rare - Collection Level 486+ (Pool 5)',
  'Recruit Season',
  'Season Pass',
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
            v-model.lazy="filter.name"
            name="name"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
            placeholder="Search"
          />
        </label>

        <label class="block w-full max-w-sm">
          <select
            v-model="filter.pool"
            name="pool"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
          >
            <option value="">Source</option>
            <option v-for="pool of pools" :value="pool">{{ pool }}</option>
          </select>
        </label>
      </form>
    </div>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="filteredCards" class="p-4">
      <ul class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-y-6">
        <li v-for="{ cid, art, name } of filteredCards">
          <router-link :to="`/cards/${kebabCase(name)}?cid=${cid}`">
            <div class="relative mb-4 pb-[100%] h-0">
              <img
                class="absolute inset-0 w-full h-full scale-125 pointer-events-none"
                v-lazy="art"
                :alt="name"
              />
            </div>
            <p class="text-xs text-center">{{ name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
