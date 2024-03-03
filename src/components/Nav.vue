<template>
  <div>
    <router-link to="/home" class="index1" :class="{'active' : active1, 'noactive' : !active1}" @click="active1 = true, active2 = false">首页</router-link>
    <router-link to="/add" class="index2" :class="{'active' : active2, 'noactive' : !active2}" @click="active2 = true, active1 = false">添加</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const active1 = ref(true)
const active2 = ref(false)
</script>

<style scoped>
[class*="index"] {
  display: inline-block;
  width: 100%;
  font-size: 1.8vw;
  color: white;
  text-decoration: none;
  letter-spacing: 1vw;
  text-indent: 23%;
}
.active {
  background-color: rgb(44, 147, 226);
}
.noactive {
  background-color: rgb(49, 159, 187);
}
.index1 {
  margin-top: 32vh;
}
.index2 {
  margin-top: 2vh;
}
</style>
