<template>
    <section id="exoplanet-catalog">
        <h2>Exoplanet Catalog</h2>

        <div v-if="loading">Loading exoplanets...</div>
        <div v-else>
            <div class="controls">
                <label for="host-select">Host Star:</label>
                <select id="host-select" v-model="selectedHostStar">
                    <option v-for="host in hostStars" :key="host" :value="host">
                        {{ host }}
                    </option>
                </select>
            </div>

            <div class="planet-grid">
                <PlanetCard
                    v-for="planet in filteredPlanets"
                    :key="planet.pl_name"
                    :planet="planet"
                />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import PlanetCard from './PlanetCard.vue';
import { fetchExoplanets } from '../utils/exoplanetData.js';

const allPlanets = ref([]);
const selectedHostStar = ref('');
const loading = ref(true);

fetchExoplanets().then(data => {
    allPlanets.value = data;
    const topHosts = getTopHostStars(data, 50);
    selectedHostStar.value = topHosts[0] || '';
    loading.value = false;
});

function getTopHostStars(planets, limit = 10) {
    const counts = {};
    for (const p of planets) {
        counts[p.hostname] = (counts[p.hostname] || 0) + 1;
    }
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([hostname]) => hostname);
}

const hostStars = computed(() => getTopHostStars(allPlanets.value, 50));

const filteredPlanets = computed(() => {
    return allPlanets.value.filter(p => p.hostname === selectedHostStar.value);
});
</script>

<style scoped>
h2 {
    font-family: 'Orbitron', sans-serif;
}

#exoplanet-catalog {
    margin: 2rem auto;
    padding: 2rem;
    background-color: #0b0e15;
    color: #eee;
}

.controls {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
}

select {
    padding: 0.5rem;
    background-color: #1c1f2a;
    color: #eee;
    border: 1px solid #444;
    border-radius: 4px;
    font-family: 'Orbitron', sans-serif;
}

label {
    font-family: 'Orbitron', sans-serif;
}

.planet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

@media (max-width: 768px) {
    h2 {
        font-size: 2.5rem;
    }

    label, select {
        font-size: 1.5rem;
    }

    .planet-card {
        font-size: 1.5rem;
    }
}
</style>    