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

//TENTATIVA DE RESOLVER O PROBLEMA DE CAPTURA DE VALORES NA REGEX por meio da captura em partes e substituição dos valores ja usados.

const input2 = '2d10+3-2D20+1d4+1+0d8+3d12+4-1d12-4+5d20';
const regexDices = /(\d+)[d,D](4|6|8|10|12|20|100)(((\+|-)\d+)(\+|-))|(\d+)[d,D](4|6|8|10|12|20|100)(\+|-)?/g;

///(\d+)[d,D](4|6|8|10|12|20|100)(((\+|-)\d+)(\+|-))|(\d+)[d,D](4|6|8|10|12|20|100)(\+|-)?/g <--- REGEX CORRETA, A ANTIGA DA PROBLEMA NO MOD NEGATIVO

const dices2 = []

const matchedDices = input2.matchAll(regexDices);
// [2d10, 2D20, 1d4, 0d8, 3d12, 1d12]

for(let dice of matchedDices){
  //console.log(dice)
  dices2.push({
    label: dice[0],
    diceAmount: parseInt(dice[1] || dice[7]),
    diceType: parseInt(dice[2] || dice[8]),
    diceModSign: dice[5] || null,
    diceMod: parseInt(dice[4]) || null,
    diceOperation: dice[6] || dice[9] || null
  })
}

function addDice2(dice) {
  let total = 0
  dice.rolls = []

  for (let i = 0; i < dice.diceAmount; i++) {
    const roll = rollDice(dice.diceType)
    dice.rolls.push(roll)
    total += roll
  }

  if(dice.diceMod != null){
    total += dice.diceMod
  }
  
  dice.total = total
}

dices2.forEach(addDice2)

console.log(dices2)

let totalPlayed = dices2[0].total

for (let i = 0; i < dices2.length; i++) {
  const element = dices2[i].diceOperation;
  const el2 = dices2[i].total
  console.log(el2, ' ', element)
}

for (let i = 0; i < dices2.length; i++) {
  if (dices2[i].diceOperation === "+") {
    totalPlayed += dices2[i+1].total
  }
  if (dices2[i].diceOperation === "-") {
    totalPlayed -= dices2[i+1].total
  }
  console.log(totalPlayed)
}


console.log(totalPlayed)

// const modsOperation = input2.replace(regexDices, filter)
// // xxx+3-xxx-3+xxx+1+xxx-xxx+4+xxx+4

// var res = modsOperation.split(filter)
// // ['', +3-, -3+, +1+, -, +4+, +4]
// res.shift();
// if (res[res.length - 1] == '') {
//   res.pop();
// }
// // [+3-, -3+, +1+, -, +4+, +4]

// for (let i = 0; i < matchedDices.length; i++) {
//   let dadoDaVez = matchedDices[0];
//   if (i == 0) {
//     const mod = res[0];
    
//   } else {
    
//   }
// }

// for(let dice of matchedDices) {
//   dices2.push({
//     label: dice[0],
//     diceAmount: dice[1],
//     diceType: dice[2]
//   })
// }

// for (let i = 0; i < res.length; i++) {
//   const element = res[i];
//   const element2 = element.split("")
//   // console.log(element2, element2.length)
//   // if (element2.length > 1) {
//   //   console.log(element2)
//   // }
// }