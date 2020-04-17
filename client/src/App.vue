<template>
  <div id="app">
    <Home></Home>
    <RoomTest></RoomTest>
    <Gameboard></Gameboard>/>
  </div>
</template>

<script>
import RoomTest from './components/RoomTest.vue';
import Home from './components/Home.vue';
import Gameboard from './components/Gameboard.vue';

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
    Gameboard,
  },
};
</script>

<style>
body{
 height: 100vh;
}

</style>
