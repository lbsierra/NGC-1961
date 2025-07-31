<template>
    <div class="earth-panel">
        <section class="epic-section">
            <h3>Latest Earth View</h3>
            <img v-if="imageUrl" :src=imageUrl alt=imageAlt class="epic-image" />
            <p v-else>Loading image...</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imageUrl = ref('');
const imageAlt = ref('EPIC image of Earth');

onMounted(async () => {
    try {
        console.log(import.meta.env);
        const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
        console.log(apiKey);
        const dateResponse = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`);
        const dateData = await dateResponse.json();

        if (dateData && dateData.length > 0) {
            const latestDataEntry = dateData[0];
            const dateString = latestDataEntry.date.split(' ')[0];
            const cleanedDate = dateString.replace(/-/g, '/');
            const imageName = latestDataEntry.image;

            imageUrl.value = `https://epic.gsfc.nasa.gov/archive/natural/${cleanedDate}/png/${imageName}.png`;
            imageAlt.value = `EPIC image of Earth on ${dateString}`;
    } 
    } catch (error) {
        console.error('Error fetching EPIC image:', error);
    }
});
</script>

<style scoped>
.earth-panel {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: linear-gradient(#001f3f, #003366);
    padding: 2rem;
    border-radius: 10px;
}

.epic-image {
    max-width: 100%;
    border: 2px solid #4aa3df;
    border-radius: 8px;
}
</style>