<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center bg-gray-300">
    <div class="border-4 rounded-2xl border-yellow-700 p-10 max-w-screen-md bg-yellow-300">
      <div class="dados">
        <label>
          <p>Digite os dados:</p>
          <div>
            <input placeholder="2d4+7+5d10-8" v-model="diceInput">
            <button @click="rollAllDices">Jogar</button>
          </div>
        </label>
      </div>
      <!-- <div class="resultado">
        <div v-if="wasError">{{errorMsn}}</div>
        <div v-for="dice in rolledDice" :key="dice.label">
          <div>{{dice.label}}: 
            <span v-for="(roll,i) in dice.rolls" :key="i"> {{roll}} </span> 
            <span>{{dice.diceModSing}}{{Math.abs(dice.diceMod)}} </span>
            <span> = {{dice.total}}</span>
          </div>
        </div>
        <dir>{{totalRoll}}</dir>
      </div> -->
    </div>
    {{errorMsn}}
  </div>
</template>

<script>

export default {
  data(){
    return{
      diceInput: '',
      totalRoll: 0,
      rolledDice: [],
      wasError: false,
      errorMsn: ''
    }
  },
  methods:{
    rollAllDices(){
      if(this.diceInput != ''){
        this.rolledDice = []
        if(this.totalRoll != 0){
          this.totalRoll = 0 
        }
        this.diceAndMod.forEach(this.addDice);
        console.log(this.diceAndMod)
        this.totalRoll = this.diceAndMod[0].total
        if(this.diceAndMod.length > 0){
          for(let i=0; i<(this.diceAndMod.length - 1); i++){
            if(this.diceAndMod[i].diceOperation === "+"){
              this.totalRoll += this.diceAndMod[i+1].total
            }
            if(this.diceAndMod[i].diceOperation === "-"){
              this.totalRoll -= this.diceAndMod[i+1].total
            }
          }
        }
        console.log(this.totalRoll)
      }else{
        this.errorCase(1)
      }
    },
    addDice(dice){
      let total = 0
      dice.rolls = []
      for (let i = 0; i < dice.diceAmount; i++) {
        const roll = this.rollDice(dice.diceType)
        dice.rolls.push(roll)
        total += roll
      }
      if(dice.diceMod != null){
        total += dice.diceMod
      }
      dice.total = total
    },
    rollDice(type) {
      return Math.floor(Math.random() * (type - 1)) + 1;
    },
    errorCase(type){
      switch (type) {
        case 1:
          this.wasError = true
          this.errorMsn = 'Digite Alguma coisa!'
          console.log(this.errorMsn)
          break;
        case 2:
          this.wasError = true
          this.errorMsn = 'Você não pode lançar ZERO dados!'
          console.log(this.errorMsn)
          break;
        case 3:
          this.wasError = false
          this.errorMsn = ''
          console.log(this.errorMsn)
          break;
        case 4:
          this.wasError = true
          this.errorMsn = 'Digite um Formato valido.'
          console.log(this.errorMsn)
          break;
      }
      // console.log(this.errorMsn)
    }
  },
  computed:{
    diceAndMod: function(){
      const regex = /(\d+)[d,D](4|6|8|10|12|20|100)(((\+|-)\d+)(\+|-)?)|(\d+)[d,D](4|6|8|10|12|20|100)(\+|-)?/g
      const matchedGroups = this.diceInput.matchAll(regex);
      const diceAndMod = []
      for(let dice of matchedGroups){
        if(parseInt(dice[1] || dice[7])>0){
          diceAndMod.push({
            label: dice[0],
            diceAmount: parseInt(dice[1] || dice[7]),
            diceType: parseInt(dice[2] || dice[8]),
            diceModSign: dice[5] || null,
            diceMod: parseInt(dice[4]) || null,
            diceOperation: dice[6] || dice[9] || null
          })
        }else{
          this.errorCase(2)
        }
      }
      return diceAndMod
    },
  }
}
</script>

<style>

</style>