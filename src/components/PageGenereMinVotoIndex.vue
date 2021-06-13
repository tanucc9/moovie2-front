<template>
  <div>
    <div class="q-pa-md">
      <q-form ref="filterForm" class="q-gutter-md row" style="width: 500px; margin: auto">
        <q-input label="Genere" filled v-model="searchGenere"
                 @input="filtersInput"/>
        <q-input label="Voti minimi" filled v-model="searchVotiMinimi"
                 :rules="[val => /^[0-9]+$/.test(val) || 'Inserisci un numero']"
                 @input="filtersInput"/>
      </q-form>
    </div>

    <q-table
      class="q-my-lg"
      title="Films"
      :data="films"
      :columns="columns"
      :loading="loading">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="titolo_italiano" :props="props">
            {{ props.row.titolo_italiano }}
          </q-td>
          <q-td key="genere" :props="props">
            {{ props.row.genere }}
          </q-td>
          <q-td key="anno" :props="props">
            {{ props.row.anno }}
          </q-td>
          <q-td key="voto_medio" :props="props">
            {{ props.row.voto_medio }}
          </q-td>
          <q-td key="durata" :props="props">
            {{ minutes2duration(props.row.durata) }}
          </q-td>
          <q-td key="attori">
            {{
              (props.row.attori.length > 3)
                ? (props.row.attori[0] + ', ' + props.row.attori[1] + ', ' + props.row.attori[2] + '...')
                : (props.row.attori.join(', '))
            }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      deferredInput: undefined,
      searchGenere: '',
      searchVotiMinimi: '',
      loading: false,
      films: [],
      columns: [
        {
          name: 'titolo_italiano', label: 'Titolo italiano', align: 'left',
          field: 'titolo_italiano', sortable: true, style: 'width: 25%',
        },
        {name: 'genere', align: 'left', label: 'Genere', field: 'genere', sortable: true, style: 'width: 10%'},
        {name: 'anno', align: 'right', label: 'Anno', field: 'anno', sortable: true, style: 'width: 10%'},
        {
          name: 'voto_medio', align: 'center', label: 'Voto medio',
          field: 'voto_medio', sortable: true, style: 'width: 5%',
        },
        {name: 'durata', align: 'right', label: 'Durata', field: 'durata', sortable: true, style: 'width: 5%'},
        {name: 'attori', align: 'left', label: 'Attori', style: 'width: 40%'},
      ],
    };
  },
  methods: {
    minutes2duration(minutes) {
      let durationLang = '';
      let remaining = minutes;
      if (remaining >= 60 * 24) {
        durationLang += Math.floor(minutes / (60 * 24));
        durationLang += 'd ';
        remaining %= (60 * 24);
      }
      if (remaining >= 60) {
        durationLang += Math.floor(minutes / 60);
        durationLang += 'h ';
        remaining %= 60;
      }
      if (remaining > 0) {
        durationLang += remaining;
        durationLang += 'm ';
      }
      durationLang = durationLang.substring(0, durationLang.length - 1);
      return durationLang;
    },
    filtersInput() {
      if (this.deferredInput) {
        clearTimeout(this.deferredInput);
      }
      this.deferredInput = setTimeout(this.deferredFiltersInput, 500);
    },
    deferredFiltersInput() {
      // Nel caso serva, this.$refs.filterForm.resetValidation();
      this.$refs.filterForm.validate().then(success => {
        if (success) {
          this.loadFilteredFilms();
        }
      })
    },
    loadFilteredFilms() {
      this.loading = true;
      this.$api.loadGeneriVotiFilteredFilms(this.searchGenere, this.searchVotiMinimi
      ).then((films) => {
        this.films = films;
      }).catch(err => {
        this.$q.notify('Impossibile caricare i film');
        console.error(err);
      }).finally(() => {
        this.loading = false;
      })
    },
  },
}
</script>
