<template>
  <div class="room-test">
    <form @submit.prevent="setName(inputName)">
      <input type="text" v-model="inputName" placeholder="name" />
      <button type="submit">Set Name</button>
    </form>
    <form @submit.prevent="createRoom(inputRoomName)">
      <input type="text" v-model="inputRoomName" placeholder="room name" />
      <button type="submit">Add</button>
    </form>
    <div class="div">
      rooms:
      <div v-for="room in roomList" :key="room.id">
        {{room.name}}
        <button @click.prevent="joinRoom(room.id)">Join</button>
      </div>
    </div>
    <button v-if="currentRoom" @click="leaveRoom">Leave Room</button>
  </div>
</template>

<script>
export default {
  name: "RoomTest",
  data() {
    return {
      name: '',
      inputName: null,
      inputRoomName: null,
      currentRoom: null,
      roomList: []
    }
  },
  sockets: {
    connect() {
      this.$socket.emit("get rooms")
    },
    "set name"(data) {
      console.log(data)
      if(data.success) {
        this.name = data.name
      }
    },
    "get rooms"(rooms) {
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
      if (data.success) {
        this.currentRoom = data.room
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
    },
    joinRoom(roomId) {
      this.$socket.emit("join room", roomId)
    },
    createRoom(roomId) {
      this.$socket.emit("create room", roomId)
    },
    leaveRoom() {
      this.$socket.emit("leave room")
    }
  }
}
</script>