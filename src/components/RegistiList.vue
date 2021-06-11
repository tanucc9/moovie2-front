<template>
    <q-page-container>
            <div class="q-pa-md q-gutter-sm" style="margin-top: 50px">
        <h3 class="text-center">{{ titleList }}</h3>
    </div>

    <div class="row items-end justify-around">
      <div class="col-md-2" v-for="(director, index) in datas" :key="index">
        <q-card class="my-card q-mb-xl">

            <span class="material-icons account_circle">account_circle</span>
            <q-card-section class="wrap-title-director">
                <div class="text-h6">{{director[0]}}</div>
            </q-card-section>
            
            <q-card-section class="q-pt-none q-mt-md">
                <q-chip square v-if="isMostFilms">
                    <q-avatar color="blue" text-color="white">{{director[1]}}</q-avatar>
                    film girati
                </q-chip>

                <div class="row items-center justify-center" v-else>
                    <p class="voto-medio">
                        Voto:
                    </p>
                    <q-circular-progress
                    show-value
                    class="text-light-blue q-ma-md"
                    :value="director[1] * 10"
                    size="50px"
                    color="blue"
                    track-color="grey-3"
                    >
                        {{director[1]}}
                    </q-circular-progress>
                </div>

            </q-card-section>
        </q-card>
      </div>

    </div>
    </q-page-container>
</template>

<script>

export default {
  props: [
      'datas',
      'isMostFilms',
      'titleList',
  ]
}

</script>

<style scoped>
    .q-page-container {
        padding-top: 20px!important;
    }
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
</style>