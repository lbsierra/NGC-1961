<template>
    <section class="beyond-panel">
        <h3>Astronomy Picture of the Day</h3>
        <div v-if="imageUrl">
            <img :src="imageUrl" :alt="imageAlt" class="apod-image" />
            <h4>{{ imageAlt }}</h4>
            <p>{{ description }}</p>
        </div>
        <div v-else>
            <p>Loading image...</p>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imageUrl = ref('');
const imageAlt = ref('');
const description = ref('');

onMounted(async () => {
    try {
        const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            imageUrl.value = data.url;
            imageAlt.value = data.title;
            description.value = data.explanation;
        } else {
            console.error('Failed to fetch Astronomy Picture of the Day');
        }
    } catch (error) {
        console.error('Error fetching Astronomy Picture of the Day:', error);
    }
});
</script>

<style scoped>
.beyond-panel {
    background: radial-gradient(circle at top, #1c1b3f, #0b0c2e);
    color: #eee;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
}

.apod-image {
    max-width: 100%;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
}

.beyond-panel h3 {
    margin: 0.5rem 0;
}

.beyond-panel p {
    font-size: 0.95rem;
    line-height: 1.5;
}
</style>