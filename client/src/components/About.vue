<template>
  <div id="about">
      <h1>About This Game</h1>
      <h3>Start the game</h3>
      <p>This game is required two players. Players are required to enter a room.<br>
         One player shall choose the role as 'player 1' or 'player 2'. Once 'player 1' is chosen, the other player will be assigned as 'player 2'.<br>
         Then the form to choose player is disappeared.
      <p><br>
      <h3>Defense and Attack</h3>
      <p>First, 'player 2' is required to prepare the defense by choosing one of the three elements : fire, water, and soil. <br>
         Once the 'player 2' submits the element for defense, the form will be disappeard and form attack will be shown in 'player 1'.<br>
         Second, 'player 1' is required to choose the element for attack then submit it. Both elements of defense and attack are shown in the screen<br>
         Power of 'player 2' (defensor) will be decreased as scheme below.<br>
         Third, 'player 1' is required to prepare the defense and submit it. <br>
         Fourth, 'player 2' is required to attack then submit it.<br>
         Power of 'player 1' (defensor) will be decreased as scheme below.<br>
         One cycle of defense and attack is completed. Start again from first step where 'player 1' as defensor.
      </p><br>
      <h3>Winner</h3>
      <p>Once one of the power reaches zero, this player is the loser and the other is the winner.<br>
         Notification will appear on the screen who is the winner.<br>
         Players can choose if they want to play again by clicking button 'reset'
      </p>
      <h3>Power Lost Scheme</h3>
      <p>
          Defense 'fire':
          <ul>
              <li>Attacked by water : power reduces 15</li>
              <li>Attacked by fire : power reduces 10</li>
              <li>Attacked by soil : power reduces 5</li>
          </ul><br>
          Defense 'water':
          <ul>
              <li>Attacked by soil : power reduces 15</li>
              <li>Attacked by water : power reduces 10</li>
              <li>Attacked by fire : power reduces 5</li>
          </ul><br>
          Defense 'soil':
          <ul>
              <li>Attacked by fire : power reduces 15</li>
              <li>Attacked by soil : power reduces 10</li>
              <li>Attacked by water : power reduces 5</li>
          </ul><br>
      </p>      <h3>Developer</h3>
      <p>This game is group project #4, developed by:
          <ul>
              <li>Malik Ibrahim</li>
              <li>Evandy</li>
              <li>Ignatius Agus</li>
          </ul><br>
      </p>
  </div>
</template>

<script>
export default {

}

</script>
