<template>
  <div id="app">
    <Home 
    v-if="!statusGame"
    @startGame="startGame"
    ></Home>
    <!-- <RoomTest></RoomTest> -->
    <Gameboard v-if="statusGame"></Gameboard>
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
      statusGame: false,
    };
  },
  methods: {
    startGame() {
      console.log('masuk ke game')
      this.statusGame = true
    },
  },
  components: {
    Home,
    // RoomTest,  
    Gameboard,
  },
};
</script>

<style>
body{
 height: 100vh;
}

</style>
