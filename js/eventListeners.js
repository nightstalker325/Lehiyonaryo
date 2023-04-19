let canJump = true;

window.addEventListener('keydown', async (event) => {
  if (player.preventInput) return
  switch (event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]
        if (
          player.hitBox.position.x + player.hitBox.width <=
          door.position.x + door.width &&
          player.hitBox.position.x >= door.position.x &&
          player.hitBox.position.y + player.hitBox.height >= door.position.y &&
          player.hitBox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0,
          player.velocity.y = 0,
          player.preventInput = true,
          player.switchSprite('enterIdle')
          door.play()
          return
        }
      }
      if (canJump) {
        player.velocity.y = -10,
        key.w.pressed = true,
        canJump = false,
        // Add a sleep timer of 1 second (1000 milliseconds)
        await sleep(355),
        canJump = true
      }
      break
    case 'd':
      //move to the right
      key.d.pressed = true
      break;
    case 'a':
      //move to the left
      key.a.pressed = true
      break;
    
    case ' ':
      //attacks
      console.log("Attack key pressed");
      player.switchSprite('attackRight');
      player.attack();
      break;
      
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
      key.w.pressed = false
      //stop move
      break
    case 'd':
      //move to the right
      key.d.pressed = false
      break;
    case 'a':
      //move to the left
      key.a.pressed = false
      break
    case ' ':
      // stop attacking
      player.isAttacking = false
      player.switchSprite('idleRight')
      break;
  }
});

// Sleep function as shown in previous answer
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
