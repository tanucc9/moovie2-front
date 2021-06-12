<template>
    <div class="section-filter">
        <h5>Filtra attori</h5>
    <div class="row justify-evenly box-filter">
      <div class="col-sm-2 full-mobile">
        <q-input 
            rounded
            filled
            v-model="anno" 
            label="Anno"
            :rules="[ val => ( val.match(/^[0-9]{4}$/) || val === '') || 'Errore! L\'anno deve avere il formato YYYY' ]">
            <template v-slot:prepend>
                <q-icon name="event" />
            </template>
        </q-input>
      </div>
      <div class="col-sm-2 full-mobile genere-wrap">
        <q-select
            label="Genere Film"
            transition-show="flip-up"
            transition-hide="flip-down"
            filled
            rounded
            v-model="valSelectGenere"
            :options="optionsGenere"
        />
      </div>
      <div class="col-sm-2 full-mobile">
            <q-input 
                rounded
                filled
                v-model="durataMinima" 
                label="Durata minima del film"
                :rules="[ val => ( val.match(/^[0-9]+/) || val === '') || 'Errore! La durata minima deve avere un valore numerico.' ]"
            />
      </div>
      <div class="col-md-2 column justify-center">
          <q-btn push color="primary" label="Filtra" />
      </div>
    </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            anno : '',
            durataMinima: '',
            valSelectGenere : '',
            optionsGenere : [
                'Fantasy',
                'Horror',
                'Comici',
                'Azione',
                'Drammatici'
            ]
        }
    }
}
</script>

<style scoped>
    .box-filter {
        margin-top: 20px!important;
    }
    .section-filter h5 {
        margin-bottom: 0!important;
        margin-top: 0!important;
        padding-left: 7%;
    }
    .section-filter {
        margin-top: 30px;
        box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%);
        border-radius: 5px;
        padding-bottom: 15px;
        padding-top: 15px;
    }

    @media (max-width: 1300px) {
        .section-filter {
            margin-left: 15px;
            margin-right: 15px;
        }
    }
    
    @media (max-width: 599px) {
        .full-mobile {
            width: 90%;
        }
        .genere-wrap {
            margin-bottom: 20px;
        }
    }
</style>