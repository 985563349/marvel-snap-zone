<script setup lang="ts">
import { useFetch } from '@vueuse/core';

const { data, isFinished } = useFetch('http://192.168.201.114:3000/search').json();
</script>

<template>
  <div>
    <div v-if="!isFinished">Loading...</div>

    <div v-else>
      <h1 class="my-4 text-center text-xl">Marvel Snap Card Database</h1>

      <ol class="grid gap-2 grid-cols-3">
        <li v-for="{ id, pretty_url, image, name } of data.card" :key="id">
          <router-link :to="`/${pretty_url}`">
            <div class="relative mb-0.5 pb-[100%] h-0">
              <img class="absolute inset-0 w-full h-full" :src="image" :alt="name" />
            </div>
            <p class="text-xs text-center">{{ name }}</p>
          </router-link>
        </li>
      </ol>
    </div>
  </div>
</template>
