<template>
    <div class="mars-panel">
        <section class="rover">
            <h3>Latest from Perseverance</h3>
            <img v-if="imageUrl" :src="imageUrl" :alt="imgAlt" class="rover-img"/>
            <p v-else>Loading Martian surface...</p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
const imageUrl = ref('');
const imgAlt = ref('Perseverance rover image');
onMounted(async () => {
    try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${apiKey}`);
        const data = await response.json();
        const latest = data.latest_photos[0];
        if (response.ok) {
            imageUrl.value = latest.img_src;
            imgAlt.value = 'Perseverance rover image from Mars';
        } else {
            console.error('Failed to fetch Perseverance image');
        }
    } catch (error) {
        console.error('Error fetching Perseverance image:', error);
    }
});
</script>

<style scoped>
.mars-panel {
    background: linear-gradient(#3b0a2e, #6b1f4c);
    padding: 2rem;
    border-radius: 10px;
    color: #eee;
}

.rover-image {
    max-width: 100%;
    border: 2px solid #ff6ff1;
    border-radius: 8px;
}
</style>