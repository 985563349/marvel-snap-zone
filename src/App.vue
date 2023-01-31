<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style>
body {
  color: #fff;
  background-color: #14171b;
}
</style>
