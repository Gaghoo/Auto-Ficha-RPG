const input = '2d10+3+2D20-3+1d4+1+2d8-2+3d12+4+1d12';
const regex = /((\d+)[d,D](4|6|8|10|12|20|100)((\+|\-)\d+)?)/g;

const matchedGroups = input.matchAll(regex);

const dices = [];

for (let groups of matchedGroups) {
  dices.push({
    label: groups[0],
    diceAmount: parseInt(groups[2]),
    diceType: parseInt(groups[3]),
    diceMod: groups[4] != null ? parseInt(groups[4]) : null,
    diceModSign: groups[5] != null ? groups[5] : null
  });
}

const container = document.getElementById('container');
const list = document.getElementById('list');

dices.forEach(addDice);

const totalPlay = dices.reduce(reduceTotalPlay, 0);

function reduceTotalPlay(sum, dice) {
  return sum + dice.total;
}

const totalPlayLabel = document.createElement('h1');
totalPlayLabel.appendChild(document.createTextNode(`Your play points is: ${totalPlay}`));
container.appendChild(totalPlayLabel);

function addDice(dice, index) {
  const li = document.createElement('li');
  
  let total = 0;
  dice.rolls = [];
  for (let i = 0; i < dice.diceAmount; i++) {
    const roll = rollDice(dice.diceType);
    dice.rolls.push(roll);
    total += roll;
  }
  if (dice.diceMod != null) {
    total += dice.diceMod
  }
  
  dice.total = total;
  
  //callDiceAnimation(dice);
  
  li.appendChild(document.createTextNode(`${dice.label} = ${dice.rolls.join(' + ')}${dice.diceMod != null ? ` ${dice.diceModSign} ${Math.abs(dice.diceMod)}` : ''} = ${dice.total}`))
  
  list.appendChild(li);
}

function rollDice(type) {
  return Math.floor(Math.random() * (type - 1)) + 1;
}