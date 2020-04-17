<template>
  <div id="app">
    <RoomTest></RoomTest>
     <Gameboard/>
  </div>
</template>

<script>
import RoomTest from './components/RoomTest.vue';
import Gameboard from './components/Gameboard.vue';

export default {
  name: 'App',
  components: {
    RoomTest,
    Gameboard,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
