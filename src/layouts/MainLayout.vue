<template>
  <q-layout view="hHh LpR fff" class="shadow-2 rounded-borders">

    <Header @setDrawer="setDrawer"/>
    <q-drawer v-model="left" side="left" elevated></q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  components: {
    Header
  },
  data() {
    return {
      left: false,
    }
  },
  methods: {
    setDrawer(value) {
      this.left = value;
    }
  }
}
</script>
