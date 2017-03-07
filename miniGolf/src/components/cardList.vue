<template>
<div>
  <q-collapsible icon="people" label="Inserir Jogadores" style="color: #7a7a7a">
    <div class="flex justify-between">
      <div class="floating-label">
        <input maxlength="5" v-model="name" required>
        <label>Nome</label>
      </div>
      <button class="primary push" v-on:click="addJogador(name)">Inserir</button>
    </div>
  </q-collapsible>
    <div class="container" >
      <div class="inner row gutter  justify-stretch " v-for="item in itens">
        <div class="name sm-width-1of4 bg-width-1of7 auto">
          <p>{{item.name}}</p>
          <span class="label bg-secondary text-white shadow-1">{{item.score}}</span>
        </div>
          <div class="score auto">
            <q-numeric
            v-model="number"
            :min="1"
            :max="20"
            ></q-numeric>
          </div>
          <div class="buttoes row auto">
            <button class="negative push"  v-on:click="removeJogador(item.idj)">Remove</button>
            <button class="warning push"  v-on:click="atualizaJogador(item, model, number)">Update</button>
          </div>
      </div>
      <q-fab
       class="absolute-bottom-right"
       @click="encerrarPartida(itens)"
       classNames="primary"
       active-icon="done_all"
       icon="done"
       direction="left"
       style="right: 18px; bottom: 18px;"
       >
       <label>Finalizar partida</label>
     </q-fab>
     <q-knob
     class="absolute-bottom-left"
     v-model="model"
     :min="min"
     :max="max"
     size="50px"
     style='left: 18px; bottom: 18px;'
     track-color="white"
     ></q-knob>
  </div>
</div>
</template>

<script>
var itens = []
import { Toast } from 'quasar'
import database from './database'
var db = null

export default {
  mixins: [database],
  data () {
    this.getJogador()
    return {
      model: 1,
      min: 1,
      max: 20,
      itens
    }
  },
  methods: {
    encerrarPartida: function () {
      var maior = 0
      var t = null
      db = this.init()
      itens.forEach(function (item) {
        if (maior < Math.max(item.score)) {
          maior = Math.max(item.score)
          t = item
        }
      })
      this.insertVencedor(db, t.name, t.score, t.idj)
      this.deleteAll(db)
    },
    addJogador: function (name) {
      db = this.init()
      Toast.create('Inserindo')
      this.insertJogador(db, name, 0)
      this.getJogador()
    },
    getJogador: function () {
      itens.length = 0
      db = this.init()
      db.transaction(function (tx) {
        var query = 'SELECT * FROM jogador'
        tx.executeSql(query, [], function (tx, resultSet) {
          for (var x = 0; x < resultSet.rows.length; x++) {
            itens.push(resultSet.rows.item(x))
          }
        })
      })
    },
    removeJogador: function (id) {
      db = this.init()
      this.delete(db, id)
      this.getJogador()
    },
    atualizaJogador: function (item, numeroburaco, score) {
      db = this.init()
      this.insertBuraco(db, numeroburaco, score, item.idj)
      score += item.score
      this.update(db, item.idj, score)
      this.getJogador()
    },
    finalizar: function (itens) {

    }
  }
}
</script>

<style lang="styl">
  .name p
    color #7a7a7a
  .inner
    padding 2%

</style>
