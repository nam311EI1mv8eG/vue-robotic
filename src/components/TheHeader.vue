<template>
    <div class="desktop-v">
        <div class="left-side"><img src="../assets/qr-code.jpg" alt="" /></div>
        <div class="middle-side"><h1>FPT Robotics Challenge 2023</h1></div>
        <div class="right-side"><img src="../assets/logo.png" alt="" /></div>
    </div>
    <div class="mobile-v">
        <div class="left-side"><img src="../assets/qr-code.jpg" alt="" /></div>
        <div class="right-side"><img src="../assets/logo.png" alt="" /></div>
        <div class="middle-side"><h1>FPT Robotics Challenge 2023</h1></div>
    </div>
</template>

<script>
// import logo from "./assets/logo.png";
export default {};
</script>

<style>
header .desktop-v {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 0;
    width: 100%;
}
header .mobile-v {
    display: none;
}
.left-side img {
    max-width: 9.8em;
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 99;
}
.right-side img {
    max-width: 250px;
}
@media (max-width: 767px) {
    header .desktop-v {
        display: none;
    }
    header .mobile-v {
        display: flex;
        flex-wrap: wrap;
    }
    header .mobile-v .left-side,
    header .mobile-v .right-side {
        width: 50%;
        display: flex;
        align-items: center;
    }
    header .mobile-v .left-side img,
    header .mobile-v .right-side img {
        width: 100%;
    }
    header .mobile-v .middle-side {
        width: 100%;
        margin: 20px 0 10px;
    }
}
</style>
