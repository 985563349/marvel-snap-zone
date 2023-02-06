<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const fetcher = () =>
  fetch('http://192.168.201.114:3000/cards').then((response) => response.json());

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['cards'],
  queryFn: fetcher,
});
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
            name="search"
            class="px-4 border-1 border-gray-500 rounded w-full py-2 text-gray-400 bg-inherit appearance-none leading-tight focus:outline-none focus:border-purple-500"
            placeholder="Search"
          />
        </label>
      </form>
    </div>

    <div v-if="isLoading">Loading...</div>

    <div v-else-if="isError">Error: {{ error }}</div>

    <div v-else-if="data">
      <ul class="grid gap-2 grid-cols-3 xl:grid-cols-6">
        <li v-for="{ url, art, name } of data">
          <router-link :to="`/cards/${url.match(/[^/]+$/)[0]}`">
            <div class="relative mb-0.5 pb-[100%] h-0">
              <img class="absolute inset-0 w-full h-full" v-lazy="art" :alt="name" />
            </div>
            <p class="text-xs text-center">{{ name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
