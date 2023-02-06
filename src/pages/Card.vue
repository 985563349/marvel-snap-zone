<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';

const router = useRoute();

const fetcher = (id: string) =>
  fetch(`http://192.168.201.114:3000/cards/${id}`).then((response) => response.json());

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['card-detail', router.params.id],
  queryFn: () => fetcher(router.params.id as string),
});
</script>

<template>
  <div>
    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="data" class="overflow-hidden">
      <ul class="flex px-4 py-4 gap-4 text-purple-500 text-sm">
        <li>
          <router-link to="/">HOME</router-link>
        </li>
        <li>
          <router-link to="/cards">CARDS</router-link>
        </li>
        <li>
          <span>{{ data.name.toUpperCase() }}</span>
        </li>
      </ul>

      <div class="mx-auto w-[88vw]">
        <h1 class="my-5 text-3xl">{{ data.name }}</h1>

        <article class="flex flex-col xl:flex-row gap-6">
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

        <div class="mb-5">
          <h3 class="mb-3 text-2xl">Variants</h3>

          <ul class="flex flex-wrap">
            <li v-for="variant_image of data.variant_images" class="w-1/3 xl:w-1/6">
              <div class="relative pb-[100%] w-full h-0">
                <img class="absolute inset-0 w-full h-full" :src="variant_image" :alt="data.name" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
