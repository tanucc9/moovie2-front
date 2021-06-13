<template>
  <div>
    <q-dialog v-model="showSearch" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center bg-black text-white">
          <div class="text-h6">Ricerca</div>
        </q-card-section>
        <q-card-section>
          <div class="q-pa-md">
            <q-form class="q-gutter-md" @submit="loadPaginatedFilms" @reset="resetSearch">
              <q-input label="Titolo" filled v-model="searchTitolo"/>
              <q-input label="Genere" filled v-model="searchGenere"/>
              <q-input label="Anno" filled v-model="searchAnno"
                       :rules="[val => /^[0-9]*$/.test(val) || 'Inserisci un anno valido']"/>
              <div>
                <q-btn label="Applica" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-if="viewFilm" v-model="viewFilmOpen">
      <q-card style="width: 50vw">
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title class="flex" style="align-items: center">
              <div class="text-h6">
                {{ viewFilm.titolo_italiano }}
              </div>
              <q-space/>
              <q-btn
                flat
                round
                icon="close"
                @click="closeFilm"/>
            </q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator/>
        <q-card-section style="max-height: 70vh" class="scroll">
          <p>
            <b>Titolo originale</b>: {{ viewFilm.titolo_originale }}
          </p>
          <p>
            <b>Anno</b>: {{ viewFilm.anno }}
          </p>
          <p>
            <b>Durata</b>: {{ minutes2duration(viewFilm.durata) }}
          </p>
          <p>
            <b>Genere</b>: {{ minutes2duration(viewFilm.genere) }}
          </p>
          <p>
            <b>Registi</b>: {{ viewFilm.registi.join(', ') }}
          </p>
          <p>
            <b>Attori</b>: {{ viewFilm.attori.join(', ') }}
          </p>
          <p>
            <b>Voto medio</b>: {{ viewFilm.voto_medio }}
          </p>
          <p>
            <b>Numero voti</b>: {{ viewFilm.voti }}
          </p>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-table
      class="q-my-xl"
      title="Films"
      :data="films"
      :columns="columns"
      :pagination.sync="pagination"
      :loading="loading"
      @request="onRequest">
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
          <q-td key="action">
            <q-btn
              flat
              round
              size="sm"
              icon="open_in_full"
              @click="openFilm(props.row._id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-page-sticky position="bottom-right" :offset="[28, 28]">
      <q-btn fab icon="search" color="primary" @click="showSearch = true" :disable="loading"/>
    </q-page-sticky>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchTitolo: '',
      searchGenere: '',
      searchAnno: '',
      showSearch: false,
      loading: false,
      viewFilmOpen: false,
      viewFilm: null,
      filters: {
        titolo: undefined,
        anno: undefined,
        genere: undefined,
      },
      pagination: {
        sortBy: 'anno',
        descending: true,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
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
        {name: 'action', align: 'left', label: 'Azioni', style: 'width: 5%'},
      ],
    };
  },
  methods: {
    onRequest({pagination}) {
      this.loadPaginatedFilms({
        pageNum: pagination.page,
        pageSize: pagination.rowsPerPage,
        sort: pagination.sortBy ? (pagination.sortBy + ' ' + (pagination.descending ? 'desc' : 'asc')) : undefined,
      });
    },
    loadPaginatedFilms(params) {
      this.showSearch = false;
      this.loading = true;
      if (typeof this.searchTitolo === 'string' && this.searchTitolo) {
        if (!params) params = {};
        params.titolo = this.searchTitolo;
      }
      if (typeof this.searchGenere === 'string' && this.searchGenere) {
        if (!params) params = {};
        params.genere = this.searchGenere;
      }
      if (typeof this.searchAnno === 'string' && this.searchAnno) {
        if (!params) params = {};
        params.anno = this.searchAnno;
      }
      this.$api.paginatedFilms(params).then(({paginatedFilms, totalFilms, pageNum, pageSize, sortBy, descending}) => {
        this.films = paginatedFilms;
        this.pagination.rowsNumber = totalFilms;
        this.pagination.page = pageNum;
        this.pagination.rowsPerPage = pageSize;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
      }).catch(err => {
        this.$q.notify('Impossibile caricare i film');
        console.error(err);
      }).finally(() => {
        this.loading = false;
      })
    },
    openFilm(id) {
      this.$api.loadFilm(id).then((film) => {
        this.viewFilm = film;
        this.viewFilmOpen = true;
      }).catch(err => {
        this.closeFilm();
        if (err?.response?.status === 404) {
          this.$q.notify('Film non trovato');
        } else {
          this.$q.notify('Impossibile caricare il film selezionato');
        }
        console.error(err);
      })
    },
    closeFilm() {
      this.viewFilm = null;
      this.viewFilmOpen = true;
    },
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
    resetSearch() {
      this.searchTitolo = '';
      this.searchGenere = '';
      this.searchAnno = '';
    },
  },
  created() {
    this.loadPaginatedFilms();
  },
}
</script>
