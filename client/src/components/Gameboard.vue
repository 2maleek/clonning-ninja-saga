<template>
  <div>
    <h1>"CLONING NINJA SAGA"</h1>
    <div class="arena">
        <div>
            <h3>Player 1</h3>
            <div class="fightarena">
                <div class="avatar"></div>
                    <img src="../assets/player1.gif" />
                <div class="modeAttack" v-if="showOne">{{attack1}} </div>
                <div class="modeDefense" v-if="showTwo">{{defense1}}</div>
            </div>
            <div class="power1">Power1: {{power1}}
                <div v-bind:style="{width: power1+'%'}"></div>
            </div>

        </div>
        <div class="winnerwarning" v-if="winnerShow">
                <h3>{{winner}} is the WINNER</h3>
                <button @click="playagain">Reset</button>
        </div>
        <div class="attackicon">
            <div v-if="showOne"><img src="../assets/showOne.gif" /></div>
            <div v-if="showTwo"><img src="../assets/showTwo.gif" /></div>
        </div>
        <div>
            <h3>Player 2</h3>
            <div class="fightarena">
                <div class="modeAttack" v-if="showTwo"> {{attack2}}</div>
                <div class="modeDefense" v-if="showOne">{{defense2}}</div>
                <div class="avatar">
                    <img src="../assets/player2.gif" />
                </div>
            </div>
            <div class="power2">Power2: {{power2}}
                <div v-bind:style="{width: power2+'%'}"></div>
            </div>
        </div>
    </div>
    <div class="privateScreen">
        <h3>My Screen</h3>
        <h4>You are : {{player}}</h4>
        <div class="warningReady"></div>
        <form v-if="choosePlayer">
            <label>Choose Player:</label>
            <select v-model="player">
                <option>player1</option>
                <option>player2</option>
            </select>
             <button @click="sendPlayer">Submit</button>
        </form>
        <div class="chooseAttack" v-if="attackShow">
            <form>
                <input type="radio" value="fire" v-model="elementAttack"><label>Fire</label>
                <input type="radio" value="water" v-model="elementAttack"><label>Water</label>
                <input type="radio" value="soil" v-model="elementAttack"><label>Soil</label>
                <button @click="sendAttack">Attack</button>
            </form>
        </div>
        <div class="chooseDefense" v-if="defenseShow">
            <form>
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

const fighting = require('../assets/fighting');

const socket = io.connect('https://dry-mountain-46610.herokuapp.com');// jangan lupa diganti saat deploy
export default {
  data() {
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
      msgAttack: null,
      msgDefense: null,
      defenseShow: false,
      attackShow: false,
      choosePlayer: true,
      showOne: false,
      showTwo: false,
      winner: '',
      winnerShow: false,
    };
  },
  created() {
    console.log('created detected');
    // socket = io('http://localhost:3000')
    socket.on('msgReset', (reset) => {
      console.log('reset');
      this.initial();
    });
    socket.on('msgAttack', (attack) => {
      console.log(attack, '......attack');
      this.attackArena(attack);
    });
    socket.on('msgDefense', (defense) => {
      console.log(defense, '....defense');
      this.defenseArena(defense);
    });
    socket.on('msgPlayer', (play) => {
      console.log(play, '....player dari lawan');
      console.log(this.player);
      this.choosePlayer = false;
      if (play === 'player1') {
        this.player = 'player2';
        this.defenseShow = true;
      } else {
        this.player = 'player1';
      }
    });
  },
  methods: {
    initial() {
      this.power1 = 100;
      this.power2 = 100;
      this.winnerShow = false;
      this.choosePlayer = true;
      this.player = '';
      this.showOne = false;
      this.showTwo = false;
      this.defenseShow = false;
    },
    showWinner(winner) {
      this.winner = winner;
      this.winnerShow = true;
    },
    attackArena(attack) {
      if (attack.player === 'player1') {
        if (this.player === 'player1') {
          this.showOne = true;
          this.defenseShow = true; // step3 giliran player1 siapkan defense
        }
        this.attack1 = attack.elementAttack;
        console.log(this.attack1, '......attack1');
        this.power2 -= fighting(this.defense2, this.attack1);
        console.log(this.power2, '......power2');
        if (this.power2 <= 0) {
          this.power2 = 0;
          this.showWinner('player1');
        }
      } else {
        if (this.player === 'player2') {
          this.showTwo = true;
          this.defenseShow = true; // one cycle - mulai step1
        }
        this.attack2 = attack.elementAttack;
        console.log(this.attack2, '......attack2');
        this.power1 -= fighting(this.defense1, this.attack2);
        console.log(this.power1, '......power1');
        if (this.power1 <= 0) {
          this.power1 = 0;
          this.showWinner('player2');
        }
      }
    },
    defenseArena(defense) {
      if (defense.player === 'player1') {
        if (this.player === 'player2') {
          this.attackShow = true; // step4 player2 attack
        }
        console.log(defense.elementDefense, 'pl1-defense');
        this.defense1 = defense.elementDefense;
        console.log(this.defense1, 'defense1-----');
      } else {
        if (this.player === 'player1') {
          this.attackShow = true; // step2 player1 attack
        }
        console.log('pl2-defense');
        this.defense2 = defense.elementDefense;
        console.log(this.defense2, 'defense2-----');
      }
    },
    sendAttack(event) {
      event.preventDefault();
      this.attackShow = false;
      // mengisi attack sendiri
      // if(this.player === 'player1'){
      //     this.attack1 = this.elementAttack
      // } else {
      //     this.attack2 = this.elementAttack
      // }
      // menyiapkan message untuk socket
      this.msgAttack = {
        player: this.player,
        elementAttack: this.elementAttack,
      };
      console.log(this.msgAttack, '----msgAttack');
      socket.emit('msgAttack', this.msgAttack); // kirim ke socket elementAttack
    },
    sendDefense(event) {
      event.preventDefault();
      this.defenseShow = false;
      this.showOne = false;
      this.showTwo = false;
      // mengisi desfense sendiri
      // if(this.player === 'player1'){
      //     this.defense1 = this.elementDefense
      // } else {
      //     this.defense2 = this.elementDefense
      // }
      // menyiapkan msg untuk socket
      this.msgDefense = {
        player: this.player,
        elementDefense: this.elementDefense,
      };
      console.log(this.msgDefense, '----msgdefense');
      socket.emit('msgDefense', this.msgDefense); // kirim ke socket elementDefense
    },
    sendPlayer(event) {
      event.preventDefault();
      console.log('sendplayer');
      console.log(this.player);
      this.choosePlayer = false;
      if (this.player === 'player2') {
        this.defenseShow = true; // step1 player2 siapkan defense
      }
      socket.emit('msgPlayer', this.player); // kirim ke socket player
    },
    playagain() {
      socket.emit('msgReset', true);// kirim ke socket
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.arena{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border : solid;
    border-radius : 30px
}
.fightarena{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.power1{
    width: 200px;
    border: 2px solid;
    margin: 0 auto 20px auto
}
.power1 div{
    height: 20px;
    background: red
}
.power2{
    width: 200px;
    border: 2px solid;
    margin: 0 auto 20px auto
}
.power2 div{
    height: 20px;
    background: red
}
img{
    width: 100px;
    height: 100px
}
.modeAttack{
    font-size: 30px;
    color: red;
    font-weight: bold;
}
.modeDefense{
    font-size: 25px;
    color: blue
}
form{
    font-size: 20px;
    color: blue
}
button{
    width: 100px;
    height: 30px;
    background-color: grey;
    font-weight: bold;
    border-radius: 10px;
}
.attackicon{
    margin-top: 50px
}
</style>
