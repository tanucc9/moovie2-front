<template>
    <q-page>
        <FormAttori @filtered-Actors="attoriFiltered" @reset-filters="resetFilters"/>
        <div class="row container-attori">
            <div class="col-sm-6" :class="{'left-side' : index % 2 === 0, 'right-side' : index % 2 !== 0}"
             v-for="(attore, index) in attori" :key="index">
                <AttoreSection :nomeAttore="attore.nome" :films="attore.films"/>
            </div>
        </div>
        <div class="q-pa-lg flex flex-center" v-show="noResults">
            <h4>Nessun risultato trovato con i filtri inseriti.</h4>
        </div>
        <div class="q-pa-lg flex flex-center">
            <q-pagination
                v-model="currentPagePagination"
                :max="nLastPage"
                input
                class="pagination-attori"
            />
            attori per pagina: <q-select v-model="numPerPage" :options="optionsNumPerPage" class="selectNumPerPage"/>
        </div>
    </q-page>
</template>

<script>
import FormAttori from '../components/FormAttori.vue';
import AttoreSection from '../components/AttoreSection.vue';

export default {
    name : 'Attori',
    components : {
        FormAttori,
        AttoreSection,
    },
    data() {
        return {
            noResults : false,
            noFilter : true,
            filterYear : '',
            filterGenere : '',
            filterDurata : '',
            attori : [],
            currentPagePagination : 1,
            numPerPage: 20,
            nLastPage : 0,
            optionsNumPerPage : [
                20, 50, 100, 200, 500
            ]
        }
    },
    methods: {
        loadPaginatedAttori : function (numPage, numPerPage) {
            this.$api.loadAttori(numPage, numPerPage).then((attori) => {
                this.noResults = false;
                this.attori = attori.attoriResult;                             
                this.manageNumPagePagination(attori.numMaxRecord);
            }).catch(err => {
                this.$q.notify('Impossibile caricare gli attori');
                console.error(err);
            });
        },
        loadPaginatedAttoriWithFilter : function () {
            this.$api.loadAttoriFiltered(this.currentPagePagination, 
                                        this.numPerPage, 
                                        this.filterYear !== '' ? this.filterYear : 0, 
                                        this.filterDurata !== '' ? this.filterDurata : 0, 
                                        this.filterGenere !== '' ? this.filterGenere : 'null')
            .then((attori) => {
                if(attori.attoriResult.length > 0) {
                    this.noResults = false;
                    this.attori = attori.attoriResult; 
                    console.log(attori.numMaxRecord);
                    this.manageNumPagePagination(attori.numMaxRecord);
                } else {
                    this.noResults = true;
                    this.attori = [];
                    this.numPage = 1;
                    this.nLastPage = 1;
                }
            }).catch(err => {
                this.$q.notify('Impossibile caricare gli attori');
                console.error(err);
            });
        },
        manageNumPagePagination : function (numRecords) {
            //Gestione numero totale pagine in paginazione
            this.nLastPage = parseInt(numRecords) / this.numPerPage;

            const decimalNumberPage = this.nLastPage.toString().split('.')[0];
                
            if( (parseInt(numRecords) % this.numPerPage) !== 0 )
                    this.nLastPage = parseInt(decimalNumberPage) + 1;   
        },
        attoriFiltered : function (anno, durataMinima, valSelectGenere, noFilter) {
            this.filterYear = anno;
            this.filterDurata = durataMinima;
            this.filterGenere = valSelectGenere;
            this.noFilter = noFilter;

            this.loadPaginatedAttoriWithFilter();
        },
        resetFilters : function () {
            this.noFilter = true;
            this.filterYear = '';
            this.filterGenere = '';
            this.filterDurata = '';

            this.loadPaginatedAttori(this.numPage, this.numPerPage);
        }
    },
    watch: {
        currentPagePagination : function(newValue, oldValue) {
            if (this.noFilter)
                this.loadPaginatedAttori(newValue, this.numPerPage);
            else
                this.loadPaginatedAttoriWithFilter();
        },
        numPerPage : function (newValue, oldValue) {
            if (this.noFilter)
                this.loadPaginatedAttori(this.currentPagePagination, newValue);
            else
                this.loadPaginatedAttoriWithFilter();
        }
    },
    created() {
        this.loadPaginatedAttori(this.currentPagePagination, this.numPerPage);
    },
}
</script>

<style scoped>
    .q-page {
        max-width: 1300px;
        margin:auto;
    }

    .left-side, .right-side {
        margin-bottom: 20px
    }

    .left-side {
        padding-right: 10px;
    }
    .right-side {
        padding-left: 10px;
    }

    .container-attori {
        margin-top: 30px;
    }

    .selectNumPerPage {
        margin-left: 10px;
    }
    .pagination-attori {
        margin-right: 30px;
    }

    @media (max-width: 1300px) {
        .container-attori {
            margin-left: 15px;
            margin-right: 15px;
        }
    }

    @media (max-width: 599px) {
        .left-side, .right-side {
            padding: 0 0;
        }
    }
    
</style>