<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { useClipboard } from '@vueuse/core';

import { timeAgo } from '@/utils';
import download from '@/assets/download.svg';

const router = useRoute();

const { id } = router.params as { id: string };
const { cid } = router.query as { cid?: string };

const fetcher = (id: string, cid?: string) =>
  fetch(`http://192.168.201.114:3000/api/cards/${id}?cid=${cid}`).then((response) =>
    response.json()
  );

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['card-detail', id],
  queryFn: () => fetcher(id, cid),
});

const { copy, isSupported } = useClipboard();
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="data">
      <nav class="space-x-2 p-4 text-purple-500 text-sm font-semibold">
        <router-link to="/" class="hover:text-purple-400">HOME</router-link>
        <span class="select-none">/</span>
        <router-link to="/cards" class="hover:text-purple-400">CARDS</router-link>
        <span class="select-none">/</span>
        <span>{{ data.name.toUpperCase() }}</span>
      </nav>

      <div class="mx-auto w-[88vw]">
        <h1 class="my-5 text-3xl">{{ data.name }}</h1>

        <article class="flex flex-col md:flex-row gap-6 mb-6">
          <div class="w-full xl:w-96">
            <div class="relative pb-[100%] w-full h-0">
              <img class="absolute inset-0 w-full h-full" :src="data.art" :alt="data.name" />
            </div>
          </div>

          <ul class="flex flex-col gap-6">
            <li>
              <p class="mb-3 text-xl">Type</p>
              <p class="text-gray">{{ data.type }}</p>
            </li>

            <li>
              <p class="mb-3 text-xl">Description</p>
              <p class="text-gray">{{ data.description }}</p>
            </li>

            <li>
              <p class="mb-3 text-xl">States</p>
              <p>
                <span>
                  COST:
                  <i>{{ data.cost }}</i>
                </span>
                <span>
                  POWER:
                  <i>{{ data.power }}</i>
                </span>
              </p>
            </li>

            <li>
              <p class="mb-3 text-xl">Source</p>
              <p class="text-gray">{{ data.source }}</p>
            </li>

            <li>
              <p class="mb-3 text-xl">Status</p>
              <p class="text-gray">{{ data.status }}</p>
            </li>
          </ul>

          <div>
            <div class="mb-6">
              <h3 class="mb-3 text-2xl">Stats</h3>
              <p class="text-gray">Data collected from the last 7 days.</p>
            </div>

            <ul class="flex flex-col gap-4">
              <li class="flex justify-between">
                <span>Ranking</span>
                <span class="text-gray">{{ data.ranking }}</span>
              </li>

              <li class="flex justify-between">
                <span>Popularity</span>
                <span class="text-gray">{{ data.popularity }}</span>
              </li>

              <li class="flex justify-between">
                <span>Win Rate</span>
                <span class="text-gray">{{ data.win_rate }}</span>
              </li>

              <li class="flex justify-between">
                <span>Cube Rate</span>
                <span class="text-gray">{{ data.cube_rate }}</span>
              </li>

              <li class="flex justify-between">
                <span># of Games</span>
                <span class="text-gray">{{ data.of_games }}</span>
              </li>

              <li class="flex justify-between">
                <span># of Cubes</span>
                <span class="text-gray">{{ data.of_cubes }}</span>
              </li>
            </ul>
          </div>
        </article>

        <div class="mb-6">
          <h3 class="mb-3 text-2xl">Variants</h3>

          <ul class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-y-9 py-4">
            <li v-for="variant_image of data.variant_images">
              <div class="relative pb-[100%] w-full h-0">
                <img
                  class="absolute inset-0 w-full h-full scale-120"
                  :src="variant_image"
                  :alt="data.name"
                />
              </div>
            </li>
          </ul>
        </div>

        <div v-if="data.desks" class="mb-6">
          <h3 class="mb-3 text-2xl">Related {{ data.name }} decks</h3>

          <ul class="flex flex-col divide-y divide-solid divide-gray-700">
            <li v-for="{ info, cards } of data.desks" class="py-6 first:pt-0 last:pb-0">
              <div class="flex justify-between items-start mb-4">
                <p class="flex-1 space-x-2">
                  <span class="text-sm">{{ info.name }}</span>
                  <span class="text-xs text-gray-500">{{ timeAgo(info.lastup) }}</span>
                </p>
                <span v-if="isSupported" class="cursor-pointer" @click="copy(info.code)">
                  <img class="w-5 h-5" :src="download" alt="download" />
                </span>
              </div>

              <ul class="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-y-4">
                <li v-for="{ art, cname } of cards">
                  <div class="relative pb-[100%] h-0">
                    <img class="absolute inset-0 w-full h-full scale-125" v-lazy="art" :alt="cname" />
                  </div>
                </li>
              </ul>
            </li>
           </ul>
        </div>
      </div>
    </div>
  </div>
</template>
