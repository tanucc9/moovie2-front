<template>
        <q-header elevated>
        <q-toolbar>
          <q-btn flat round dense icon="menu" class="q-mr-sm" @click="setDrawer"/>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>

          <q-toolbar-title>Moovie2</q-toolbar-title>

          <transition
            appear
            enter-active-class="animated bounceInRight"
            leave-active-class="animated fadeOut"
          >
        <q-input v-if="activeSearchBar" dark v-model="searchText" label="Cerca film..." dense color="white" label-color="white">
            <template v-slot:append>
                <q-icon name="search" class="cursor-pointer" color="white"/>
            </template>
        </q-input>
        </transition>
        
          <q-btn flat round dense icon="search" v-if="!activeSearchBar" @click="activeSearchBar = !activeSearchBar"/>
        </q-toolbar>

        <q-tabs v-model="tab">
          <q-route-tab to="/" name="film" label="Film" />
          <q-route-tab to="/attori" name="attori" label="Attori" />
          <q-route-tab to="/registi" name="registi" label="Registi" />
        </q-tabs>
      </q-header>
</template>

<script>
export default {
  data () {
    return {
      tab: 'film',
      searchText: '',
      activeSearchBar: false,
      left: false,
    }
  },
  methods: {
      setDrawer(event) {
          this.left = !this.left;
          this.$emit('setDrawer', this.left);
      }
  }
}
</script>