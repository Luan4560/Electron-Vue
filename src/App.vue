<template>
  <div id="app">  
    <h1>Hello World Cacete</h1>
    <div>
      <img v-for="(url, index) in images" v-bind:src="url" :key="index">
    </div>
  </div>
</template>

<script>

import api from './service/axios.js'

export default {
    data() {
      return {  
        images: [],
        loading: true,
        errored: false
      }
    },

    async mounted() {
      try {
        const response = await api.get('v2/list')
        console.log()
        this.images = response.data
      }catch(error) {
        console.log(error, 'Deu ruim')
        this.errored = true

      }finally {
        () => this.loading = false
      }

    }  
  } 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
