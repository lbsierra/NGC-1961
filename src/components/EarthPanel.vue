<template>
  <div class="earth-panel">
    <section class="epic-section">
      <h3>Latest Earth View</h3>
      <div class="image-holder">
        <img v-if="imageUrl" :src="imageUrl" :alt="imageAlt" class="space-image epic-image" />
        <p v-else>Loading image...</p>
      </div>
      <div v-if="caption">
        <p class="image-caption"><strong>Description:</strong> {{ caption }}</p>
        <p><strong>Coordinates:</strong> {{ coords.lat }}, {{ coords.lon }}</p>
        <p><strong>Sun Position:</strong> {{ sunPosition.lat }}, {{ sunPosition.lon }}</p>
        <p><strong>Satellite Position:</strong> {{ satellitePosition.lat }}, {{ satellitePosition.lon }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imageUrl = ref('');
const imageAlt = ref('EPIC image of Earth');
const caption = ref('');
const coords = ref({ lat: '', lon: '' });
const sunPosition = ref({ lat: '', lon: '' });
const satellitePosition = ref({ lat: '', lon: '' });

onMounted(async () => {
  try {
    const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
    const dateResponse = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`);
    const dateData = await dateResponse.json();

    if (dateData && dateData.length > 0) {
      const latestDataEntry = dateData[0];
      const dateString = latestDataEntry.date.split(' ')[0];
      const cleanedDate = dateString.replace(/-/g, '/');
      const imageName = latestDataEntry.image;

      imageUrl.value = `https://epic.gsfc.nasa.gov/archive/natural/${cleanedDate}/png/${imageName}.png`;
      imageAlt.value = `EPIC image of Earth on ${dateString}`;

      caption.value = latestDataEntry.caption;
      coords.value = {
        lat: latestDataEntry.centroid_coordinates.lat,
        lon: latestDataEntry.centroid_coordinates.lon
      };
      sunPosition.value = {
        lat: latestDataEntry.sun_j2000_position.x,
        lon: latestDataEntry.sun_j2000_position.y
      };
      satellitePosition.value = {
        lat: latestDataEntry.dscovr_j2000_position.x,
        lon: latestDataEntry.dscovr_j2000_position.y
      };
    }
  } catch (error) {
    console.error('Error fetching EPIC image metadata:', error);
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
    max-width: 500px;
}

.epic-image {
    border: 2px solid #4aa3df;
    border-radius: 8px;
}

.space-image {
    max-width: 55%;
    height: auto;
}

.image-holder {
    width: 100%;
    max-width: 600px;
    aspect-ratio: 16 / 9;
    overflow: hidden;
}

</style>