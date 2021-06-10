<template>
  <q-page>
    <div class="row justify-center title-row">  
        <div class="q-pa-md q-gutter-sm">
            <h3 class="text-center">Classifica Best Director</h3>
        </div>
        <div class="q-pa-md q-gutter-sm">
            <q-btn outline color="primary" class="filter-year-btn">
                <div class="text-btn">Filtra per anno</div>
                <span class="material-icons calendar-icon">today</span>
            </q-btn>
        </div>
    </div>
    <div class="row items-end">
      <div class="col" v-for="(director, index) in mockBestDirector" :key="index">
        <q-card class="my-card" :class="{ 'float-right' : index === 0, 'center-card' : index === 1 }">
            <q-badge class="custom-badge-rounded" :class="{'bg-yellow-14' : index === 0, 'bg-grey-13' : index === 1, 'bg-brown-6' : index === 2}" floating >
                {{index + 1}}
            </q-badge>

            <span class="material-icons account_circle">account_circle</span>
            <q-card-section class="wrap-title-director">
                <div class="text-h6">{{director[0]}}</div>
            </q-card-section>
            <div class="row items-center justify-center">
                <p class="voto-medio">Voto medio:</p>
                <q-circular-progress
                show-value
                class="text-light-blue q-ma-md"
                :value="director[2] * 10"
                size="50px"
                color="blue"
                track-color="grey-3"
                >
                {{director[2]}}
                </q-circular-progress>
            </div>
            

            <q-card-section class="q-pt-none">
                <q-chip square>
                    <q-avatar color="blue" text-color="white">{{director[1]}}</q-avatar>
                    film girati
                </q-chip>


            </q-card-section>
        </q-card>
    </div>

    </div>
    
  </q-page>
</template>

<script>
export default {
  name: 'Registi',
  data() {
      return {
          text : '',
          counter : 2,
          mockBestDirector : [
            ['Lello Kawasaki', 21, 9.3],
            ['Toni Colombo', 30, 8.5],
            ['Peppe', 3, 7.0]
          ]
      }
  },
}
</script>

<style scoped>
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
</style>
