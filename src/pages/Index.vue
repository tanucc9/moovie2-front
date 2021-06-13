<template>
  <q-page style="max-width: 1300px; margin: auto">
    <q-tabs v-model="tab" class="q-mt-lg">
      <q-tab name="films_table" label="Tabella di film"/>
      <q-tab name="voti" label="Voti"/>
    </q-tabs>

    <PageFilmIndex v-if="tab === 'films_table'"/>
    <PageGenereMinVotoIndex v-if="tab === 'voti'"/>
  </q-page>
</template>

<script>
import PageFilmIndex from "components/PageFilmIndex";
import PageGenereMinVotoIndex from "components/PageGenereMinVotoIndex";

export default {
  name: 'PageIndex',
  components: {
    PageFilmIndex,
    PageGenereMinVotoIndex,
  },
  data() {
    return {
      tab: 'films_table',
    };
  },
}
</script>
