<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useFetch } from '@vueuse/core';

const router = useRoute();
const { data, isFinished } = useFetch(
  `http://192.168.201.114:3000/card/${router.params.id}`
).json();
</script>

<template>
  <div>
    <div v-if="!isFinished">Loading...</div>

    <div v-else class="mx-auto w-[88vw] overflow-hidden">
      <h1 class="my-5 text-3xl">{{ data.name }}</h1>

      <article class="flex flex-col">
        <div class="relative pb-[100%] w-full h-0">
          <img class="absolute inset-0 w-full h-full" :src="data.image" :alt="data.name" />
        </div>

        <ol class="flex flex-col gap-6 my-6">
          <li>
            <p class="mb-3 text-xl">Type</p>
            <p class="text-gray">{{ data.type }}</p>
          </li>

          <li>
            <p class="mb-3 text-xl">Description</p>
            <p class="text-gray">{{ data.ability }}</p>
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
            <p class="text-gray">{{ data.method }}</p>
          </li>
        </ol>
      </article>

      <div class="mb-5">
        <h3 class="mb-3 text-2xl">Variants</h3>

        <ol class="flex flex-wrap">
          <li v-for="variant of data.variant_images" :key="variant" class="w-1/2">
            <img class="w-full" :src="variant" :alt="data.name" />
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
