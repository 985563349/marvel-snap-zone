<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';

const installed = ref(true);
let installPrompt: any = null;

onBeforeMount(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    installed.value = false;
    return false;
  });

  window.addEventListener('appinstalled', () => {
    installed.value = true;
  });
});

const install = async () => {
  if (!installPrompt) {
    return;
  }
  await installPrompt.prompt();
  installPrompt = null;
};
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive include="Cards">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <button
      v-if="!installed"
      class="fixed bottom-10 right-10 block px-4 py-2 rounded bg-purple-500 hover:bg-purple-700"
      @click="install"
    >
      Install
    </button>
  </div>
</template>

<style>
body {
  color: #fff;
  background-color: #14171b;
}
</style>
