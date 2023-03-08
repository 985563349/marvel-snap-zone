<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

const router = useRoute();

const fetcher = (id: string) =>
  fetch(`http://192.168.201.114:3000/api/cards/${id}`).then((response) => response.json());

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['card-detail', router.params.id],
  queryFn: () => fetcher(router.params.id as string),
});
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

        <article class="flex flex-col md:flex-row gap-6">
          <div class="w-full xl:w-96">
            <div class="relative pb-[100%] w-full h-0">
              <img class="absolute inset-0 w-full h-full" :src="data.art" :alt="data.name" />
            </div>
          </div>

          <ul class="flex flex-col gap-6 mb-6">
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
        </article>

        <div>
          <h3 class="mb-3 text-2xl">Variants</h3>

          <ul class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-y-9 py-4">
            <li v-for="variant_image of data.variant_images">
              <div class="relative pb-[100%] w-full h-0">
                <img class="absolute inset-0 w-full h-full scale-120" :src="variant_image" :alt="data.name" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
