<template>
    <section id="exoplanet-catalog">
        <h2>Exoplanet Catalog</h2>

        <div v-if="loading">Loading exoplanets...</div>
        <div v-else>
        <div class="controls">
            <label for="host-select">Host Star:</label>
            <select id="host-select" v-model="selectedHostStar" @change="currentPage = 1">
                <option v-for="host in hostStars" :key="host" :value="host">
                    {{ host }}
                </option>
            </select>
        </div>

        <div class="planet-grid">
            <PlanetCard
                v-for="planet in visiblePlanets"
                :key="planet.pl_name"
                :planet="planet"
            />
        </div>
        
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
const currentPage = ref(1);
const pageSize = 10;
const loading = ref(true);

fetchExoplanets().then(data => {
    allPlanets.value = data;
    const topHosts = getTopHostStars(data, 10);
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

const hostStars = computed(() => getTopHostStars(allPlanets.value, 10));

const filteredPlanets = computed(() => {
    return allPlanets.value.filter(p => p.hostname === selectedHostStar.value);
});

const totalPages = computed(() => {
   return Math.ceil(filteredPlanets.value.length / pageSize);
});

const visiblePlanets = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return filteredPlanets.value.slice(start, start + pageSize);
});

function nextPage() {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
}

function prevPage() {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
}
</script>

<style scoped>

#exoplanet-catalog {
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
}

.planet-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
}

.pagination {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

button {
    padding: 0.5rem 1rem;
    background-color: #1c1f2a;
    color: #eee;
    border: 1px solid #444;
    border-radius: 4px;
}

button:disabled {
    opacity: 0.5;
}

</style>