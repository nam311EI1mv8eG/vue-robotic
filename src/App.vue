<script setup>
import TheHeader from './components/TheHeader.vue'
import AppStanding from './components/AppStanding.vue'
</script>

<template>  
<header>
  <the-header></the-header>
</header>
<main>
  <app-standing></app-standing>
</main>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

header{
  display: flex;
    align-items: center;
    gap: 50px;
  }
</style>
