<script lang="ts">
export default {
  name: 'Decks',
};
</script>

<script setup lang="ts">
import { watch } from 'vue';
import { useScroll, useClipboard } from '@vueuse/core';

import { timeAgo } from '@/utils';
import download from '@/assets/download.svg';

import useDecks from './composables/useDecks';

const { isLoading, isError, isFetching, search, data, error, hasNextPage, fetchNextPage } =
  useDecks();

const { arrivedState } = useScroll(window, {
  offset: { bottom: 200 },
});

watch(
  () => arrivedState.bottom,
  () => {
    if (arrivedState.bottom && hasNextPage?.value && isFetching.value === false) {
      fetchNextPage();
    }
  }
);

const { copy, isSupported } = useClipboard();
</script>

<template>
  <div>
    <nav class="space-x-2 p-4 text-purple-500 text-sm font-semibold">
      <router-link to="/" class="hover:text-purple-400">HOME</router-link>
      <span class="select-none">/</span>
      <span>DECKS</span>
    </nav>

    <h1 class="my-4 text-center text-xl">Marvel Snap Decks Database</h1>

    <div class="my-8 px-4">
      <form class="flex flex-wrap gap-4">
        <label class="block w-full max-w-sm">
          <select
            v-model="search.sources"
            name="sources"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
          >
            <option value="">Source</option>
            <option value="1">Collection Level 1-14</option>
            <option value="2">Not Available</option>
            <option value="3">Collection Level 18-214 (Pool 1)</option>
            <option value="4">Collection Level 222-474 (Pool 2)</option>
            <option value="5">Collection Level 486+ (Pool 3)</option>
            <option value="6">Series 4 Rare - Collection Level 486+ (Pool 4)</option>
            <option value="7">Series 5 Ultra Rare - Collection Level 486+ (Pool 5)</option>
            <option value="8">Recruit Season</option>
            <option value="9">Starter Card</option>
          </select>
        </label>

        <label class="block w-full max-w-sm">
          <select
            v-model="search.abilities"
            name="abilities"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
          >
            <option disabled value="">Abilities</option>
            <option value="1">On Reveal</option>
            <option value="2">Ongoing</option>
            <option value="3">Move</option>
            <option value="4">Destroy</option>
            <option value="5">Discard</option>
          </select>
        </label>
      </form>
    </div>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="data" class="px-4">
      <ul class="flex flex-col divide-y divide-solid divide-gray-700">
        <template v-for="{ decks } of data.pages">
          <li v-for="{ deck } of decks" class="py-6 first:pt-0 last:pb-0">
            <div class="flex justify-between items-start mb-4">
              <p class="flex-1 space-x-2">
                <span class="text-sm">{{ deck.info.name }}</span>
                <span class="text-xs text-gray-500">{{ timeAgo(deck.info.lastup) }}</span>
              </p>
              <span v-if="isSupported" class="cursor-pointer" @click="copy(deck.info.code)">
                <img class="w-5 h-5" :src="download" alt="download" />
              </span>
            </div>

            <ul class="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-y-4">
              <li v-for="{ art, cname } of deck.decklist.cards">
                <div class="relative pb-[100%] h-0">
                  <img class="absolute inset-0 w-full h-full scale-125" v-lazy="art" :alt="cname" />
                </div>
              </li>
            </ul>
          </li>
        </template>
      </ul>

      <div v-if="hasNextPage" class="py-6 text-center text-sm">Loading...</div>
    </div>
  </div>
</template>
