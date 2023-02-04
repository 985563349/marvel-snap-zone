<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';
import { watchEffect } from 'vue';

const router = useRoute();
const { data, isFinished } = useFetch(
  `http://192.168.201.114:3000/cards/${router.params.id}`
).json();
</script>

<template>
  <div>
    <div v-if="!isFinished">Loading...</div>

    <div v-else class="mx-auto w-[88vw] overflow-hidden">
      <h1 class="my-5 text-3xl">{{ data.name }}</h1>

      <article class="flex flex-col">
        <div class="relative pb-[100%] w-full h-0">
          <img class="absolute inset-0 w-full h-full" :src="data.art" :alt="data.name" />
        </div>

        <ol class="flex flex-col gap-6 my-6">
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
        </ol>
      </article>

      <div class="mb-5">
        <h3 class="mb-3 text-2xl">Variants</h3>

        <ul class="flex flex-wrap">
          <li v-for="variant_image of data.variant_images" class="w-1/3">
            <img class="w-full" :src="variant_image" :alt="data.name" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
