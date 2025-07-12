<template>
    <section id="space-weather">
        <WeatherPanel title="Solar Flares" :events="flareEvents" />
        <WeatherPanel title="Coronal Mass Ejections" :events="cmeEvents" />
        <WeatherPanel title="Geomagnetic Storms" :events="stormEvents" />
        <WeatherPanel title="Solar Particle Events" :events="speEvents" />
        <WeatherPanel title="Radio Blackouts" :events="radioEvents" />
        <WeatherPanel title="Interplanetary Shocks" :events="shockEvents" />
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import WeatherPanel from './WeatherPanel.vue';
    import { fetchDONKIEvents } from '@/utils/donki.js';

    const today = new Date();
    const end = today.toISOString().slice(0, 10);

    const startObj = new Date(today);
    startObj.setDate(today.getDate() - 7);
    const start = startObj.toISOString().slice(0, 10);
    
    const key = import.meta.env.VITE_NASA_API_KEY;

    const flareEvents = ref([]);
    const cmeEvents = ref([]);
    const stormEvents = ref([]);
    const speEvents = ref([]);
    const radioEvents = ref([]);
    const shockEvents = ref([]);

    onMounted(async () => {
        flareEvents.value = await fetchDONKIEvents('FLR', start, end, key)
        cmeEvents.value = await fetchDONKIEvents('CME', start, end, key)
        stormEvents.value = await fetchDONKIEvents('GEO', start, end, key)
        speEvents.value = await fetchDONKIEvents('SEP', start, end, key)
        radioEvents.value = await fetchDONKIEvents('RBE', start, end, key)
        shockEvents.value = await fetchDONKIEvents('IPS', start, end, key)
    });
</script>

<style scoped>
    #space-weather {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem;
    }
</style>



