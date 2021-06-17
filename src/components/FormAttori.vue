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

        <div class="col-sm-2 full-mobile">
            <q-input 
                rounded
                filled
                v-model="nomeAttore" 
                label="Ricerca per nome"
            />
        </div>

      <div class="col-md-1 column justify-center">
          <q-btn push color="primary" label="Filtra" @click="submitFilter"/>
      </div>
            <div class="col-md-1 column justify-center">
          <q-btn push outline color="primary" label="Reset" @click="resetFilter"/>
      </div>
    </div>
        <q-dialog v-model="alertFilter">
            <q-card>
                <q-card-section>
                <div class="text-h6">Errore!</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                uno tra i campi "anno", "genere" o "nome" deve essere compilato.
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

export default {
    data() {
        return {
            alertFilter : false,
            anno : '',
            durataMinima: '',
            valSelectGenere : '',
            nomeAttore : '',
            optionsGenere : [
                "Commedia",
                "Avventura",
                "Storico",
                "Western",
                "Drammatico",
                "Poliziesco",
                "Sentimentale",
                "Thriller",
                "Fantasy",
                "Guerra",
                "Biografico",
                "Spionaggio",
                "Azione",
                "Horror",
                "Catastrofico",
                "Animazione",
                "Documentario",
                "Musicale",
                "Mitologico",
                "Noir",
                "Grottesco",
                "Gangster",
                "Sperimentale",
                "Mélo",
                "Supereroi",
                "Biblico",
                "Sportivo"
            ]
        }
    },
    methods: {
        submitFilter : function () {
            if (this.anno === '' && this.valSelectGenere === '' && this.nomeAttore === '') {
                this.alertFilter = true;
                return;
            } else {
                this.$emit('filtered-Actors', this.anno, this.durataMinima, this.valSelectGenere, this.nomeAttore, false);
            }
        },
        resetFilter : function () {
            this.anno = '';
            this.durataMinima = '';
            this.valSelectGenere = '';
            this.nomeAttore = '';

            this.$emit('reset-filters');
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
        padding-left: 3%;
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