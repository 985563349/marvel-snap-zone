<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useClipboard } from '@vueuse/core';

import { timeAgo } from '@/utils';
import download from '@/assets/download.svg';

const fetcher = () =>
  fetch('http://192.168.201.114:3000/decks').then((response) => response.json());

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['decks'],
  queryFn: fetcher,
});

const { copy, isSupported } = useClipboard();
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="data">
      <h1 class="my-4 text-center text-xl">Marvel Snap Decks Database</h1>

      <div class="my-8 px-4">
        <form class="flex flex-wrap gap-4">
          <label class="block w-full max-w-sm">
            <select
              name="sources"
              class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
            >
              <option disabled value="">Source</option>
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

      <div class="px-4">
        <ul class="flex flex-col divide-y divide-solid divide-gray-700">
          <li v-for="{ deck } of data" class="py-6 first:pt-0 last:pb-0">
            <div class="flex justify-between mb-4">
              <p class="space-x-2">
                <span class="text-sm">{{ deck.info.name }}</span>
                <span class="text-xs text-gray-500">{{ timeAgo(deck.info.lastup) }}</span>
              </p>
              <span v-if="isSupported" @click="copy(deck.info.code)">
                <img class="w-5 h-5" :src="download" alt="download" />
              </span>
            </div>

            <ul class="grid grid-cols-6">
              <li v-for="{ art, cname } of deck.decklist.cards">
                <div class="relative pb-[100%] h-0">
                  <img class="absolute inset-0 w-full h-full" v-lazy="art" :alt="cname" />
                </div>
              </li>
            </ul>
          </li>
        </ul>

        <div class="py-6 text-center text-sm">Loading...</div>
      </div>
    </div>
  </div>
</template>
