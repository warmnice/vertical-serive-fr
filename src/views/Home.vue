<template>
  <Nav class="nav"></Nav>
  <router-view class="view"></router-view>
</template>

<script setup>
import Nav from '../components/Nav.vue'
</script>

<style scoped>
.nav {
  float: left;
  width: 9%;
  height: 100vh;
  background-color: rgb(12, 74, 140);
}
.view {
  float: left;
  box-sizing: border-box;
  width: 91%;
  height: 100vh;
  padding-left: 5%;
}
</style>
