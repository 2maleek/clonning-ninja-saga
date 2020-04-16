<template>
  <div id="home" class="container-fluid mt-5">
    <div class="d-flex justify-content-center align item align-items-center" v-if="page === 'enterName'">
      <div>
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
  name: "Home",
  data() {
    return {
      name: '',
      inputName: null,
      inputRoomName: null,
      currentRoom: null,
      roomList: [],
      page: 'enterName'
    }
  },
  sockets: {
    connect() {
      this.$socket.emit("get rooms")
    },
    "update room data"(room) {
      this.currentRoom = room
    },
    "set name"(data) {
      console.log(data)
      if(data.success) {
        this.name = data.name
      }
    },
    "get rooms"(rooms) {
      console.log(rooms)
      this.roomList = rooms
    },
    "new room"(room) {
      this.roomList.push(room)
    },
    "other player join room"(player) {
      console.log(player.name + " joined the room")
    },
    "other player leave room"(player) {
      console.log(player.name + " leave the room")
    },
    "join room"(data) {
      console.log(data)
      if(data.success) {
        this.page = 'enteredRoom'
      }
    },
    "leave room"(data) {
      console.log(data)
      if (data.success) {
        this.currentRoom = null
      }
    }
  },
  methods: {
    setName(name) {
      this.$socket.emit("set name", name)
      if(this.inputName) {
        this.page = 'searchRoom'
      }
    },
    joinRoom(roomId) {
      this.$socket.emit("join room", roomId)
    },
    createRoom(roomId) {
      this.$socket.emit("create room", roomId)
    },
    leaveRoom() {
      this.page = 'searchRoom'
      this.$socket.emit("leave room")
    },
    startGame() {

    }
  }
}
</script>

<style>
  #home {
    height: 100vh;
  }
</style>