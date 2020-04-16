<template>
  <div>
    <h1>TITLE: "CLONNING NINJA SAGA</h1>
    <div class="arena">
        <div class="winnerwarning"></div>
        <div>
            <h3>Player 1</h3>
            <div class="modeAttack">{{attack1}}</div>
            <div class="modeDefense">{{defense1}}</div>
            <div class="avatar">Icon1</div>
            <div class="power">{{power1}}</div>
        </div>
        <div>
            <h3>Player 2</h3>
            <div class="modeAttack">{{attack2}}</div>
            <div class="modeDefense">{{defense2}}</div>
            <div class="avatar">Icon2</div>
            <div class="power">{{power2}}</div>
        </div>
    </div>
    <div class="privateScreen">
        <h3>My Screen</h3>
        <div class="warningReady"></div>
        <div class="chooseAttack">
            <form>
                <input type="text" v-model="player">
                <input type="radio" value="fire" v-model="elementAttack"><label>Fire</label>
                <input type="radio" value="water" v-model="elementAttack"><label>Water</label>
                <input type="radio" value="soil" v-model="elementAttack"><label>Soil</label>
                <button @click="sendAttack">Attack</button>
            </form>
        </div>
        <div class="chooseDefense">
            <form>
                <input type="text" v-model="player">
                <input type="radio" value="fire" v-model="elementDefense"><label>Fire</label>
                <input type="radio" value="water" v-model="elementDefense"><label>Water</label>
                <input type="radio" value="soil" v-model="elementDefense"><label>Soil</label>
                <button>Defense</button>
            </form>
        </div>
    </div>

  </div>
</template>

<script>

export default {
  data(){
    return {
        power: 100,
        player: '',
        attack: false,
        defense: false,
        elementAttack: '',
        elementDefense: '',
        msgAttack : null,
        msgDefense : null,
    }
  },
  created: function(){
      console.log('created detected')
      socket = io()
      socket.on('msgAttack', function(attackOp){
          console.log(attackOp, "attackOp on")

      })
  },
  methods:{
    sendAttack (event){
        event.preventDefault();
        this.msgAttack = {
            player: this.player,
            elementAttack: this.elementAttack
        }
        console.log(this.msgAttack)
        socket.emit('msgAttack', this.msgAttack) //kirim ke socket elementAttack
    },
    sendDefense (event){
        event.preventDefault();
        this.msgDefense = {
            player: this.player,
            elementDefense: this.elementDefense
        }
        console.log(this.msgDefense)
        socket.emit('msgDefense', this.msgDefense) //kirim ke socket elementDefense
    }
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
