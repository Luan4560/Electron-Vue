<template>
  <div id="app">  
    <h1>Hello World</h1>
    <div class="container-img">
      <img v-for="(url, index) in images" v-bind:src="url" :key="index" class="img" @click="processName" />
    </div>
  </div>
</template>

<script>

import api from './service/axios.js'
import { ipcRenderer } from 'electron'

export default {
    data() {
      return {  
        images: [],
        authors: [],
        loading: true,
        errored: false
      }
    },
    methods: {
     

      async processName() {
         try {
           const response = await api.get('v2/list?page=1&limit=6')
            this.authors = response.data.map(element => element.author)
            // const newArray = this.authors.forEach((txt, index) => console.log(txt, index))
            
            ipcRenderer.send('process-channel', this.authors)
            ipcRenderer.on('process-channel', (event, resp) => {
             this.authors =  alert('Autores das fotos: ' + resp)
            })
          
         }catch(error){
           console.log('error')
         }finally {
          () => this.loading = false
         }
      }
    },

    async mounted() {
      try {
        const response = await api.get('v2/list?page=1&limit=6') 
        this.images = response.data.map(element => element.download_url)
        console.log(this.authors)
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

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.container-img {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 20vw);
  gap:15px;
  flex-wrap: wrap;
}

.img {
  width: 20vw;
}
</style>
