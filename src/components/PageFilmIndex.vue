<template>
  <div>
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
      @request="onRequest">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="titolo_italiano" :props="props">
            {{ props.row.titolo_italiano }}
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
  </div>
</template>

<script>

export default {
  data() {
    return {
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
          field: 'titolo_italiano', sortable: true, style: 'width: 30%',
        },
        {name: 'anno', align: 'right', label: 'Anno', field: 'anno', sortable: true, style: 'width: 10%'},
        {
          name: 'voto_medio', align: 'center', label: 'Voto medio',
          field: 'voto_medio', sortable: true, style: 'width: 5%',
        },
        {name: 'durata', align: 'right', label: 'Durata', field: 'durata', sortable: true, style: 'width: 5%'},
        {name: 'attori', align: 'left', label: 'Attori', style: 'width: 40%'},
        {name: 'action', align: 'left', label: 'Azioni', style: 'width: 10%'},
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
      this.loading = true;
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
  },
  created() {
    this.loadPaginatedFilms();
  },
}
</script>
