<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {store} from './store/store'

store.commit('getuser')
store.commit('loadsource')

export default {
  store
}
</script>

<style scoped>

</style>

