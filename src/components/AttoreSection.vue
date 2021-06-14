<template>
    <div class="row wrap-section-attore">
        <div class="col-sm-4 self-center left-side">
            <h4>{{ nomeAttore }}</h4>
        </div>
        <div class="col-sm-8 right-side">
            <q-virtual-scroll
                style="max-height: 200px;"
                :items="films"
                separator
            >
                <template v-slot="{ item, index }">
                <q-item :key="index">
                    <q-item-section>
                        <q-item-label>{{ item.titolo_originale }}</q-item-label>
                        <q-item-label caption>Durata del film: {{ item.durata }} minuti.</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                        <q-badge color="blue" > voto: {{ item.voto_medio }} </q-badge>
                    </q-item-section>
                </q-item>
                </template>
            </q-virtual-scroll>
        </div>
    </div>
</template>

<script>
let films = [];

export default {
    props: [
        'nomeAttore',
        'films',
    ],
    data() {
        return {
            contentStyle: {
                backgroundColor: 'rgba(0,0,0,0.02)',
                color: '#555'
            },
            thumbStyle: {
                right: '2px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            },
            visible : true,
        }
    }
}
</script>

<style scoped>
    .wrap-section-attore {
        background-color: #1976D2;
        height: 200px;
        box-shadow: 0 1px 5px rgb(0 0 0), 0 1px 2px rgb(0 0 0 / 55%), 0 3px 1px -2px rgb(0 0 0 / 48%);
        width: 100%;
    }
    .wrap-section-attore .left-side {
        color: white;
        text-align: center;
    }
    .wrap-section-attore .left-side h4 {
        width: 90%;
        margin: auto;
    }

    .wrap-section-attore .right-side {
        background-color: white;
    }

    @media (max-width: 599px) {
        .left-side, .right-side {
            width: 100%;
        }
        .left-side {
            padding: 10px 0;
        }
        .wrap-section-attore {
            height: auto;
        }
    }

    
</style>