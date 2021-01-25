<template>
  <div>
    <label>
      <p>Digite os dados:</p>
      <div>
        <input placeholder="2d4+7+5d10-8" v-model="diceInput">
        <button @click="rollAllDices">Jogar</button>
      </div>
    </label>
  </div>
</template>

<script>

export default {
  data(){
    return{
      diceInput: '',
      totalRoll: 0
    }
  },
  methods:{
    rollAllDices(){
      for (let i = 0; i < this.diceAndMod.length; i++) {
        const element = this.diceAndMod[i];
        // this.calcDiceRoll(element.diceAmount, element.diceType)
        element.rolls = this.calcDiceRoll(element.diceAmount, element.diceType)
        element.total = this.calcDiceTotal(element.rolls, element.diceMod)
        this.calcTotal(element.total)
      }
    },
    calcDiceRoll(amount, type){
      const rolls = [];
      for(let i = 0; i < amount; i++){
        const roll = Math.floor(Math.random() * (type - 1) + 1)
        rolls.push(roll)
      }
      return rolls
    },
    calcDiceTotal(rolls, mod){
       let total = mod
      for (let i = 0; i < rolls.length; i++) {
        const element = rolls[i];
        total += element
      }
      return total
    },
    calcTotal(diceTotal){
      return this.totalRoll += diceTotal
    }
  },
  computed:{
    diceAndMod: function(){
      const regex = /((\d+)[d,D](4|6|8|10|12|20|100))((\+|-)\d)?/g
      const matchedGroups = this.diceInput.matchAll(regex);
      const diceAndMod = []
      for(let groups of matchedGroups){
        if(parseInt(groups[2])>0){
          // if (groups[4] != null) {
          //   diceAndMod.push({
          //     label: groups[0],
          //     diceAmount: parseInt(groups[2]),
          //     diceType: parseInt(groups[3]),
          //     diceMod:parseInt(groups[4]),
          //     diceModSing: groups[5]
          //   })
          // }
          diceAndMod.push({
            label: groups[0],
            diceAmount: parseInt(groups[2]),
            diceType: parseInt(groups[3]),
            diceMod: groups[4] != null ? parseInt(groups[4]) : null,
            diceModSing: groups[5] != null ? groups[5] : null,
            // rolls: this.calcDiceRoll(parseInt(groups[2]),parseInt(groups[3])),
            // total: null
          })
        }else{
          console.log('Não pode jogar Zero dados')
        }
      }
      return diceAndMod
    }
  },
  watch:{}
}
</script>

<style>

</style>
