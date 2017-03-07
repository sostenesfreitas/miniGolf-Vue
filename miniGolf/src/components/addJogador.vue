<template>
  <div>
    <div class="cont shadow-3"  v-for="jogador in jogadores" v-on:click="getPlacar(jogador.id)">
      <q-collapsible group="jogadores" icon="explore" :label="jogador.name">
        <div class="in row justify-around text-center content-center" v-for="p in placar">
          <p>Buraco: {{p.numeroburaco}}</p>
          <p>Score: {{p.score}}</p>
        </div>
      </q-collapsible>
    </div>
  </div>
</template>
<script>
import database from './database'
var buracos = []
var placar = []
var jogadores = []
var db = null
export default {
  mixins: [database],
  data () {
    this.getVencedores()
    this.getBuracos()
    return {
      jogadores,
      buracos,
      placar
    }
  },
  methods: {
    getPlacar: function (idj) {
      placar.length = 0
      buracos.forEach(function (buraco) {
        if (idj === buraco.id) {
          placar.push(buraco)
        }
      })
    },
    getVencedores: function () {
      jogadores.length = 0
      db = this.init()
      db.transaction(function (tx) {
        var query = 'SELECT * FROM vencedores'
        tx.executeSql(query, [], function (tx, resultSet) {
          for (var x = 0; x < resultSet.rows.length; x++) {
            jogadores.push(resultSet.rows.item(x))
          }
        })
      })
    },
    getBuracos: function () {
      buracos.length = 0
      db = this.init()
      db.transaction(function (tx) {
        var query = 'SELECT * FROM buraco'
        tx.executeSql(query, [], function (tx, resultSet) {
          for (var x = 0; x < resultSet.rows.length; x++) {
            buracos.push(resultSet.rows.item(x))
          }
        })
      })
    }
  }
}
</script>
<style lang="styl">
  .cont
    margin 10%
    color #7a7a7a
  .in p
    margin 3%
</style>
