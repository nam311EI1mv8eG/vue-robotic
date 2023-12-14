<script setup>
import TheHeader from "./components/TheHeader.vue";
import AppStanding from "./components/AppStanding.vue";
import AppSchedule from "./components/AppSchedule.vue";
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
body {
    background: #c0ff72;
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
main {
    display: flex;
}
main .leftside {
    flex: 0 0 70%;
    width: 70%;
    max-width: 70%;
    position: relative;
}
main .rightside {
    flex: 0 0 30%;
    width: 30%;
    max-width: 30%;
}
header {
    display: flex;
    align-items: center;
    gap: 50px;
}
@media (max-width: 991px) {
    main {
        flex-direction: column;
    }
    main .leftside {
        flex: 0 0 100%;
        width: 100%;
        max-width: 100%;
    }
    main .rightside {
        flex: 0 0 100%;
        width: 100%;
        max-width: 100%;
        margin-top: 20px;
    }
}
</style>
