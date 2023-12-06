<script setup>
import TheHeader from './components/TheHeader.vue'
import AppStanding from './components/AppStanding.vue'
import AppSchedule from './components/AppSchedule.vue'
</script>

<template>  
<header>
  <the-header></the-header>
</header>
<main>
    <div class="leftside">
        <app-standing></app-standing>
    </div>
  <div class="rightside"><app-schedule></app-schedule></div>
  
</main>
</template>

<style scoped>

body{
    background: #C0FF72;
}
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
main{
    display: flex;
}
main .leftside{
    flex:0 0 70%;
    width: 70%;
    max-width: 70%;
}
main .rightside{
    flex:0 0 30%;
    width: 30%;
    max-width: 30%;
    margin-top: 50px;
}
header{
  display: flex;
    align-items: center;
    gap: 50px;
  }
</style>
