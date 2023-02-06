<template>
  <div class="flex flex-col justify-center min-h-screen">
    <h1 class="my-8 px-4 text-2xl text-center">Welcome to Marvel Snap Zone!</h1>

    <ul class="flex justify-center gap-4">
      <li>
        <router-link to="/cards" class="block px-4 py-2 rounded bg-purple-500 hover:bg-purple-700"
          >Cards</router-link
        >
      </li>
      <li>
        <router-link to="/decks" class="block px-4 py-2 rounded bg-purple-500 hover:bg-purple-700"
          >Decks</router-link
        >
      </li>
    </ul>
  </div>
</template>
