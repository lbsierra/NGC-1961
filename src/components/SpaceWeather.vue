<template>
    <section id="space-weather">
        <WeatherPanel title="Solar Flares" :events="flareEvents">
            <template #icon>
                <img src="/icons/sun.svg" alt="Solar Flare Icon" class="weather-icon" />
            </template>
        </WeatherPanel>
        <WeatherPanel title="Coronal Mass Ejections" :events="cmeEvents">
            <template #icon>
                <img src="/icons/plasma.svg" alt="CME Icon" class="weather-icon" />
            </template>
        </WeatherPanel>
        <WeatherPanel title="Geomagnetic Storms" :events="stormEvents">
            <template #icon>
                <img src="/icons/waves.svg" alt="Geomagnetic Storms Icon" class="weather-icon" />
            </template>
        </WeatherPanel>
        <WeatherPanel title="Solar Particle Events" :events="speEvents">
            <template #icon>
                <img src="/icons/sun-dust.svg" alt="SPE Icon" class="weather-icon" />
            </template>
        </WeatherPanel>
        <WeatherPanel title="Radio Blackouts" :events="radioEvents">
            <template #icon>
                <img src="/icons/radio.svg" alt="Radio Icon" class="weather-icon" />
            </template>
        </WeatherPanel>n
        <WeatherPanel title="Interplanetary Shocks" :events="shockEvents">
            <template #icon>
                <img src="/icons/shocks.svg" alt="Interplanetary Shocks Icon" class="weather-icon" />
            </template>
        </WeatherPanel>
    </section>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import WeatherPanel from './WeatherPanel.vue';
    import { fetchDONKIEvents } from '../utils/donki.js';

    const props = defineProps({
        apiKey: {
            type: String,
        }
    });

    const key = props.apiKey;
    console.log("API Key in Vue:", key);

    const today = new Date();
    const end = today.toISOString().slice(0, 10);

    const startObj = new Date(today);
    startObj.setDate(today.getDate() - 7);
    const start = startObj.toISOString().slice(0, 10);

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



