<template>
  <div id="home" class="container-fluid">
    <div class="d-flex justify-content-center align item align-items-center" v-if="page === 'enterName'">
      <section class="snow-bg"></section>
      <div>
        <h1  class="text-center" style="font-family: 'Long Cang', cursive;  font-size: 60px; font-weight: bolder; margin-top: 20vh; ">Clonning Ninja Saga </h1>
        <div class="d-flex justify-content-center mt-2">
          <img src="../assets/avatar.png" alt="avatar">
          <b-form inline @submit.prevent="setName(inputName)">
            <div class="input-group mb-2 mr-sm-2">
              <label class="sr-only" for="name">Nickname</label>
              <b-input
                v-model="inputName"
                id="name"
                class="form-control form-control-lg"
                placeholder="Enter your nickname"
              ></b-input>
            </div>
            <div class="input-group mb-2 mr-sm-2">
              <b-button  type="submit" class="btn btn-lg" variant="primary">Enter</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
    <div id="afterEnter" v-if="page === 'searchRoom'">
      <b-form inline class="d-flex justify-content-center"  @submit.prevent="createRoom(inputRoomName)">
        <label class="sr-only" for="name">Room name</label>
        <b-input
          v-model="inputRoomName"
          id="name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Enter room name"
        ></b-input>

        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
      <div class="container-fluid mt-5">
        <h3 class="text-center">List Room</h3>
        <div class="row">
          <div class="col-md-3" v-for="room in roomList" :key="room.id">
            <b-card bg-variant="primary" text-variant="white" header="Primary" class="text-center">
              <b-card-text>{{room.name}}</b-card-text>
              <button @click.prevent="joinRoom(room.id)">Join</button>
            </b-card>
          </div>
        </div>
      </div>
      <div v-if="currentRoom">
        Player List:
        <ul>
          <li v-for="(player, playerId, index) in currentRoom.players" :key="index">
            {{player.name}}
          </li>
        </ul>
        <button @click="leaveRoom">Leave Room</button>
      </div>
    </div>
    <div v-if="currentRoom">
      <div class="container">
        <div class="d-flex justify-content-between">
          <button class="btn btn-danger" @click="leaveRoom">Leave Room</button>
          <button class="btn btn-success" @click="startGame">Start Game</button>
        </div>
        <div class="row">
          <div class="col-6" v-for="(player, playerId, index) in currentRoom.players" :key="index">
            <h2 class="text-center"> {{player.name}} </h2>
            <img class="text-center" src="../assets/prepare.gif" width="50%" alt="gambarnya gerak gerak">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      name: '',
      inputName: null,
      inputRoomName: null,
      currentRoom: null,
      roomList: [],
      page: 'enterName',
    };
  },
  sockets: {
    connect() {
      this.$socket.emit('get rooms');
    },
    'update room data': function (room) {
      this.currentRoom = room;
    },
    'set name': function (data) {
      console.log(data);
      if (data.success) {
        this.name = data.name;
      }
    },
    'get rooms': function (rooms) {
      console.log(rooms);
      this.roomList = rooms;
    },
    'new room': function (room) {
      this.roomList.push(room);
    },
    'other player join room': function (player) {
      console.log(`${player.name} joined the room`);
    },
    'other player leave room': function (player) {
      console.log(`${player.name} leave the room`);
    },
    'join room': function (data) {
      console.log(data);
      if (data.success) {
        this.page = 'enteredRoom';
      }
    },
    'leave room': function (data) {
      console.log(data);
      if (data.success) {
        this.currentRoom = null;
      }
    },
    'start game': function (data) {
      console.log(data)
      this.$emit('startGame')
    }
  },
  methods: {
    setName(name) {
      this.$socket.emit('set name', name);
      if (this.inputName) {
        this.page = 'searchRoom';
      }
    },
    joinRoom(roomId) {
      this.$socket.emit('join room', roomId);
    },
    createRoom(roomId) {
      this.$socket.emit('create room', roomId);
    },
    leaveRoom() {
      this.page = 'searchRoom';
      this.$socket.emit('leave room');
    },
    startGame() {
      this.$socket.emit('start game')
    },
  },
};
</script>

<style scoped>
  #home {
    height: 100vh;
    background-color: darkolivegreen;
  }
  .snow-bg {
    content: '';
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background-image: url('http://www.mcctours.com.my/wp-content/uploads/2018/01/sakura-1-1.png'), url('http://www.mcctours.com.my/wp-content/uploads/2018/01/sakura-2.png');
    animation: snow 20s linear infinite;
  }

  @keyframes snow {
    0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
    50% {background-position: 500px 500px, 100px 200px, -100px 150px;}
    100% {background-position: 500px 1000px, 200px 400px, -100px 300px;}
  }

  @media (max-width: 768px) {
    .woocommerce ul.products li.product, 
    .woocommerce-page ul.products li.product, 
    .woocommerce-page[class*=columns-] ul.products li.product,
    .woocommerce[class*=columns-] ul.products li.product {
      width: 100%;
      float: left;
      clear: both;
      margin: 0 7em;
    }
  }
</style>
