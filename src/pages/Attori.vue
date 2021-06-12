<template>
    <q-page>
        <FormAttori />
    </q-page>
</template>

<script>
import FormAttori from '../components/FormAttori.vue';

export default {
    name : 'Attori',
    components : {
        FormAttori,
    }
}
</script>

<style scoped>
    .q-page {
        max-width: 1300px;
        margin:auto;
    }
</style>