<template>
  <q-layout>
    <q-tabs slot="navigation" class="bg-secondary">
        <q-tab icon="view_quilt" route="/" exact replace>Partida</q-tab>
        <q-tab icon="view_day" route="addJogador" replace>Historico</q-tab>
    </q-tabs>
    <router-view class="layout-view"></router-view>
  </q-layout>
</template>

<script>

</script>

<style lang="styl">
</style>
