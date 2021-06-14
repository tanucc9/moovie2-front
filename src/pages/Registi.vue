<template>
  <q-page>
    
    <!--- Titolo e pulsante per filtrare --->
    <div class="row justify-center title-row">  
        <div class="q-pa-md q-gutter-sm">
            <h3 class="text-center">Classifica Best Director</h3>
        </div>
        <div class="q-pa-md q-gutter-sm">
            <q-btn outline color="primary" class="filter-year-btn" @click="isFilterYearVisible = !isFilterYearVisible">
                <div class="text-btn" v-if="!isFilterYearVisible">Filtra per anno</div>
                <div class="text-btn" v-else>Chiudi Filtro</div>
                <span class="material-icons calendar-icon" v-show="!isFilterYearVisible">today</span>
            </q-btn>
        </div>
    </div>
    <!--- END Titolo e pulsante per filtrare --->

    <!--- Filtro per anno --->
    <transition
        appear
        leave-active-class="animated zoomOut"
    >
        <div class="row justify-center q-pb-xl" v-if="isFilterYearVisible">
            <div class="q-gutter-y-md wrap-filters wrap-filter-left">
                <transition
                    appear
                    enter-active-class="animated slideInLeft"
                >
                    <q-input rounded filled v-model="dataInizio" label="Anno d'inizio"
                        :rules="[ val => (val.match(/^[0-9]{4}$/) || val === '') || 'Errore! L\'anno deve avere il formato YYYY.' ]">
                        <template v-slot:prepend>
                            <q-icon name="event" />
                        </template>
                    </q-input>
                </transition>
            </div>
            <div class="q-gutter-y-md wrap-filters wrap-filter-right">
                <transition
                    appear
                    enter-active-class="animated slideInRight"
                >
                    <q-input 
                     rounded
                     filled 
                     v-model="dataFine" 
                     label="Anno di fine" 
                     :rules="[ val => ( (val.match(/^[0-9]{4}$/) && val >= this.dataInizio) || val === '') || 'Errore! L\'anno deve avere il formato YYYY e deve essere maggiore della data di inizio.' ]">
                        <template v-slot:prepend>
                            <q-icon name="event" />
                        </template>
                    </q-input>
                </transition>
            </div>
            <div class="q-gutter-y-md column container-btn-filter">
                <transition
                    appear
                    enter-active-class="animated slideInRight"
                >
                    <q-btn push color="primary" label="Applica" id="btn-filtro-data" @click="applyFiltersDatas"/>
                </transition>
            </div>
        </div>
    </transition>
    <!--- END Filtro per anno --->

    <!--- Body classifica best director --->
    <div class="row items-end" id="section-best-director">
      <div class="col-md-4" v-for="(director, index) in bestDirectors" :key="index">
        <q-card class="my-card" :class="{ 'float-right' : index === 0, 'center-card' : index === 1 }">
            <q-badge class="custom-badge-rounded" :class="{'bg-yellow-14' : index === 0, 'bg-grey-13' : index === 1, 'bg-brown-6' : index === 2}" floating >
                {{index + 1}}
            </q-badge>

            <span class="material-icons account_circle">account_circle</span>
            <q-card-section class="wrap-title-director">
                <div class="text-h6">{{director._id}}</div>
            </q-card-section>
            <div class="row items-center justify-center">
                <p class="voto-medio">
                    Voto:
                    <q-tooltip anchor="bottom middle" self="center middle">Il voto è stato ottenuto calcolando il voto medio finale in base ai voti dei singoli film.</q-tooltip>
                </p>
                <q-circular-progress
                show-value
                class="text-light-blue q-ma-md"
                :value="director.media_voti * 10"
                size="50px"
                color="blue"
                track-color="grey-3"
                >
                {{Number((director.media_voti).toFixed(2))}}
                </q-circular-progress>
            </div>
            
            <q-card-section class="q-pt-none">
                <q-chip square>
                    <q-avatar color="blue" text-color="white">{{director.film_girati}}</q-avatar>
                    film girati
                </q-chip>

            </q-card-section>
        </q-card>
      </div>

    </div>
    <div class="q-pa-lg flex flex-center" v-show="noResultsBestDirector">
        <h6>Nessun risultato trovato con i filtri inseriti.</h6>
    </div>
    <!--- END Body classifica best director --->

    <!--- Sezione registi con più film girati ---> 
    <RegistiList :datas="registiMostFilmsDatas" :isMostFilms="true" titleList ="I 5 registi con più film girati" />
    <!--- END Sezione registi con più film girati --->


    <!--- Sezione registi con media più alta --->
    <RegistiList :datas="registiMediaFilms" :isMostFilms="false" titleList ="I 5 registi con la media più alta" />
    <!--- END Sezione registi con con media più alta --->

        <q-dialog v-model="alertFilter">
            <q-card>
                <q-card-section>
                <div class="text-h6">Errore!</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                Controlla di aver inserito correttamente le date.
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </q-page>
</template>

<script>
import RegistiList from '../components/RegistiList.vue';

export default {
  components: { RegistiList },
  name: 'Registi',
  components : {
      RegistiList,
    },
  data() {
      return {
          noResultsBestDirector: false,
          alertFilter: false,
          dataInizio : '',
          dataFine : '',
          isFilterYearVisible : false,
          counter : 2,
          bestDirectors : [],
          registiMostFilmsDatas : [],
          registiMediaFilms: [],
           mockMediaFilms : [
            ['Lello Kawasaki', 9.8],
            ['Toni Colombo', 8.9],
            ['Peppe', 8],
            ['Mario Rossi', 8],
            ['Pepito Rossi', 7.7]
          ],
      }
  },
  methods: {
      loadBestDirectors : function () {
        this.$api.registiBest(
            this.dataInizio !== '' ? this.dataInizio : 0,
            this.dataFine !== '' ? this.dataFine : 0
        ).then((registi) => {
            console.log(registi);
            this.bestDirectors = registi;

            this.noResultsBestDirector = this.bestDirectors.length < 1 ? true : false;
        })
      },
      applyFiltersDatas : function () {

          //Validazione delle date
          if( (this.dataInizio <= this.dataFine) 
                || (this.dataInizio !== '' && this.dataFine === '')
                || (this.dataInizio === '' && this.dataFine === '') 
            ) {
                this.loadBestDirectors();
            } else {
                this.alertFilter = true;
            }
      },
      loadRegistiMostFilms : function () {
          this.$api.registiMostFilms()
          .then((registi) => {
              console.log(registi);
              this.registiMostFilmsDatas = registi;
          })
      },
      loadRegistiMediaFilms : function () {
          this.$api.registiMediaFilms()
          .then((registi) => {
                console.log(registi);
                this.registiMediaFilms = registi;
          })
      }
  },
  created () {
      this.loadBestDirectors();
      this.loadRegistiMostFilms();
      this.loadRegistiMediaFilms();
  }
}
</script>

<style scoped>

    .row {
        max-width: 1300px;
        margin: auto;
    }
    .my-card {
        width: 230px;
        text-align: center;
    }
    .my-card.center-card {
        margin: auto;
    }
    .custom-badge-rounded {
        top: -11px;
        right: -12px;
        padding: 12px 15px;
        border-radius: 20px!important;
        color: black;
        font-weight: 600;
        font-size: 15px;
    }
    .voto-medio {
        margin: 0!important;
    }
    .account_circle {
        font-size: 80px;
        color: #1976d2;
        margin-block: 10px;
    }
    .wrap-title-director {
        padding: 0!important;
    }

    .calendar-icon {
        font-size: 1.5em;
    }

    .filter-year-btn .text-btn {
        padding-right: 10px;
        padding-top: 1px;
    }

    .title-row {
        margin-top: 30px;
    }

    .title-row button {
        margin-top: 17px;
    }

    .wrap-filters {
        max-width: 300px;
    }
    .wrap-filter-left {
        margin-right: 10px;
    }
    .wrap-filter-right {
        margin-left: 10px;
        margin-right: 20px;
    }

    @media (max-width: 768px) {
        #section-best-director {
            justify-content: space-around;
        }

        #section-best-director .col-md-4 {
            margin-bottom: 30px;
        }
        .wrap-filter-left, .wrap-filter-right {
            width: 100%;
        }
        .wrap-filter-left {
            margin-bottom: 30px;
        }
        .wrap-filter-right {
            margin-bottom: 15px;
        }

        .container-btn-filter {
            width: 120px;
        }
        .title-row h3 {
            margin-bottom: 0;
        }
        .filter-year-btn {
            margin-bottom: 20px;
        }
    }
</style>
