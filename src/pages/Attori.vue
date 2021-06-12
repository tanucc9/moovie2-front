<template>
    <q-page>
        <FormAttori />
        <div class="row container-attori">
            <div class="col-sm-6" :class="{'left-side' : index % 2 === 0, 'right-side' : index % 2 !== 0}" v-for="(attore, index) in attoriMock" :key="index">
                <AttoreSection :nomeAttore="attore.nome" :films="attore.films"/>
            </div>
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
            attoriMock : [
                {
                    nome : 'Lello Kawasaki',
                    films : [
                        {
                            nome : 'Il ritorno di R',
                            durata : '125',
                            voto : '7.9'
                        },
                        {
                            nome : 'Il ritorno di R1',
                            durata : '100',
                            voto : '9'
                        },
                        {
                            nome : 'Il ritorno di R3',
                            durata : '105',
                            voto : '7.2'
                        },
                        {
                            nome : 'Il ritorno di C',
                            durata : '25',
                            voto : '4.9'
                        },
                        {
                            nome : 'Il ritorno di C++',
                            durata : '120',
                            voto : '6.5'
                        },
                        {
                            nome : 'Il ritorno di R3, la vendemmia',
                            durata : '300',
                            voto : '10'
                        },                    
                    ], 
                },
                {
                    nome : 'Ciruzz Mertens',
                    films : [
                        {
                            nome : 'A caccia di R',
                            durata : '125',
                            voto : '7.9'
                        },
                        {
                            nome : 'A caccia di R R1',
                            durata : '100',
                            voto : '9'
                        },
                        {
                            nome : 'A caccia di R3',
                            durata : '105',
                            voto : '7.2'
                        },
                        {
                            nome : 'A caccia di C',
                            durata : '25',
                            voto : '4.9'
                        },
                        {
                            nome : 'A caccia di C++',
                            durata : '120',
                            voto : '6.5'
                        },
                        {
                            nome : 'A caccia di vendemmia',
                            durata : '300',
                            voto : '10'
                        },                    
                    ], 
                },
                {
                    nome : 'Pino Pinu',
                    films : [
                        {
                            nome : 'Il ritorno di R',
                            durata : '12',
                            voto : '7.9'
                        },
                        {
                            nome : 'Il ritorno di R1',
                            durata : '109',
                            voto : '10'
                        },
                        {
                            nome : 'Il ritorno di R3',
                            durata : '123',
                            voto : '2'
                        },
                        {
                            nome : 'Il ritorno di C',
                            durata : '253',
                            voto : '5'
                        },
                        {
                            nome : 'Il ritorno di C++',
                            durata : '120',
                            voto : '6.5'
                        },
                        {
                            nome : 'Il ritorno di R3, la vendemmia',
                            durata : '300',
                            voto : '10'
                        },                    
                    ], 
                },
                {
                    nome : 'Mario Rossi',
                    films : [
                        {
                            nome : 'Il ritorno di R',
                            durata : '12',
                            voto : '7.9'
                        },
                        {
                            nome : 'Il ritorno di R1',
                            durata : '109',
                            voto : '10'
                        },
                        {
                            nome : 'Il ritorno di R3',
                            durata : '123',
                            voto : '2'
                        },
                        {
                            nome : 'Il ritorno di C',
                            durata : '253',
                            voto : '5'
                        },
                        {
                            nome : 'Il ritorno di C++',
                            durata : '120',
                            voto : '6.5'
                        },
                        {
                            nome : 'Il ritorno di R3, la vendemmia',
                            durata : '300',
                            voto : '10'
                        },                    
                    ], 
                },
            ],
        }
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

    @media (max-width: 599px) {
        .left-side, .right-side {
            padding: 0 0;
        }
    }
    
</style>