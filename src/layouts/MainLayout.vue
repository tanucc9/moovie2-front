<template>
    <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      
      <Header />
      
      <q-page-container>
        <router-view />
      </q-page-container>
      
    </q-layout>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components : {
    Header
  }  
}
</script>