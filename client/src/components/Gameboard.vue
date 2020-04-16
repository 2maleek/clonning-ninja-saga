<template>
  <div>
    <h1>TITLE: "CLONNING NINJA SAGA</h1>
    <div class="arena">
        <div>
            <h3>Player 1</h3>
            <div class="modeAttack">Attack1: {{attack1}}</div>
            <div class="modeDefense">Defense1: {{defense1}}</div>
            <div class="avatar">Icon1</div>
            <div class="power">Power1: {{power1}}</div>
        </div>
        <div class="winnerwarning"></div>
        <div>
            <h3>Player 2</h3>
            <div class="modeAttack">Attack2: {{attack2}}</div>
            <div class="modeDefense">Defense2: {{defense2}}</div>
            <div class="avatar">Icon2</div>
            <div class="power">Power2: {{power2}}</div>
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
                <button @click="sendDefense">Defense</button>
            </form>
        </div>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client';
const fighting = require('../assets/fighting')
let socket = io.connect('http://localhost:3000')//jangan lupa diganti saat deploy
export default {
  data(){
    return {
        power1: 100,
        power2: 100,
        player: '',
        attack1: '',
        attack2: '',
        defense1: '',
        defense2: '',
        elementAttack: '',
        elementDefense: '',
        msgAttack : null,
        msgDefense : null,
    }
  },
  created: function(){
      console.log('created detected')
      //socket = io('http://localhost:3000')
      socket.on('msgAttack', (attack)=>{
          console.log(attack, "......attack")
          this.attackArena(attack)
      })
      socket.on('msgDefense', (defense)=>{
          console.log(defense, "....defense")
          this.fungsi()
          this.defenseArena(defense)
      })
  },
  methods:{
    fungsi(){
        console.log('fungsi')
    },
    attackArena(attack){
        if(attack.player === 'player1'){
              this.attack1 = attack.elementAttack
              console.log(this.attack1, "......attack1")
              this.power2 =this.power2- fighting(this.defense2, this.attack1)
              console.log(this.power2, "......power2")
          } else {
              this.attack2 = attack.elementAttack
              console.log(this.attack2, "......attack2")
              this.power1 =this.power1- fighting(this.defense1, this.attack2)
              console.log(this.power1, "......power1")
          }
    },
    defenseArena(defense){
        if(defense.player === 'player1'){
              console.log(defense.elementDefense,'pl1-defense')
              this.defense1 = defense.elementDefense
              console.log(this.defense1, 'defense1-----')
          } else {
              console.log('pl2-defense')
              this.defense2 = defense.elementDefense
              console.log(this.defense2, 'defense2-----')
          }
    },
    sendAttack (event){
        event.preventDefault();
        this.fungsi()
        //mengisi attack sendiri
        // if(this.player === 'player1'){
        //     this.attack1 = this.elementAttack
        // } else {
        //     this.attack2 = this.elementAttack
        // }
        //menyiapkan message untuk socket
        this.msgAttack = {
            player: this.player,
            elementAttack: this.elementAttack
        }
        console.log(this.msgAttack, '----msgAttack')
        socket.emit('msgAttack', this.msgAttack) //kirim ke socket elementAttack
    },
    sendDefense (event){
        event.preventDefault();
        this.fungsi()
        //mengisi desfense sendiri
        // if(this.player === 'player1'){
        //     this.defense1 = this.elementDefense
        // } else {
        //     this.defense2 = this.elementDefense
        // }
        //menyiapkan msg untuk socket
        this.msgDefense = {
            player: this.player,
            elementDefense: this.elementDefense
        }
        console.log(this.msgDefense,'----msgdefense')
        socket.emit('msgDefense', this.msgDefense) //kirim ke socket elementDefense
    }
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arena{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
