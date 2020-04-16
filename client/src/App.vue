<template>
  <div id="app">
    <Home></Home>
    <RoomTest v-if="enter"></RoomTest>
  </div>
</template>

<script>
import RoomTest from './components/RoomTest.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',
  data() {
    return {
      enter: null,
    }
  },
  components: {
    Home,
    RoomTest,
  }
};
</script>

<style>
body{
 height: 100vh;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
