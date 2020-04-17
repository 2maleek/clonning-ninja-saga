
function fighting(defense, attack) {
  let reducePower;
  if (defense === 'fire' && attack === 'water') {
    reducePower = 15;
  } else if (defense === 'fire' && attack === 'fire') {
    reducePower = 10;
  } else if (defense === 'fire' && attack === 'soil') {
    reducePower = 5;
  } else if (defense === 'water' && attack === 'soil') {
    reducePower = 15;
  } else if (defense === 'water' && attack === 'water') {
    reducePower = 10;
  } else if (defense === 'water' && attack === 'fire') {
    reducePower = 5;
  } else if (defense === 'soil' && attack === 'fire') {
    reducePower = 15;
  } else if (defense === 'soil' && attack === 'soil') {
    reducePower = 10;
  } else if (defense === 'soil' && attack === 'water') {
    reducePower = 5;
  }
  return reducePower;
}

module.exports = fighting;
