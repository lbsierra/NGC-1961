<template>
  <div class="mars-panel">
    <section class="rover">
      <h3>Latest from Mars</h3>
      <div class="image-holder">
        <img v-if="imageUrl" :src="imageUrl" :alt="imgAlt" class="space-image rover-img" />
        <p v-else>Loading Martian surface...</p>
      </div>
      <div v-if="roverMeta">
        <p><strong>Camera:</strong> {{ roverMeta.camera }}</p>
        <p><strong>Sol (Martian Day):</strong> {{ roverMeta.sol }}</p>
        <p><strong>Earth Date:</strong> {{ roverMeta.earthDate }}</p>
        <p><strong>Rover:</strong> {{ roverMeta.rover }}</p>
        <p v-if="cameraInfo"><strong>Camera Info:</strong> {{ cameraInfo }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const imageUrl = ref('');
const imgAlt = ref('Perseverance rover image from Mars');
const roverMeta = ref({
  camera: '',
  sol: '',
  earthDate: '',
  rover: ''
});
const cameraInfo = ref('');

const cameraDescriptions: Record<string, string> = {
  FHAZ: 'Front Hazard Avoidance Camera - navigational safety views',
  RHAZ: 'Rear Hazard Avoidance Camera - rear safety perspective',
  NAVCAM: 'Navigation Camera - aids in driving and targeting',
  MAST: 'Mast Camera - panoramic color imaging',
  SUPERCAM: 'SuperCam - laser spectroscopy and color imaging',
  CHEMCAM: 'ChemCam - chemical analysis of rocks',
  SHERLOC: 'SHERLOC - spectrometer with imaging for organics',
  PIXL: 'PIXL - X-ray fluorescence for detailed composition'
};

onMounted(async () => {
  try {
    const apiKey = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?api_key=${apiKey}`);
    const data = await response.json();

    if (response.ok && data.latest_photos.length > 0) {
      const latest = data.latest_photos[0];
      imageUrl.value = latest.img_src;
      imgAlt.value = `Image from ${latest.camera.full_name}, captured on Sol ${latest.sol}`;
      roverMeta.value = {
        camera: latest.camera.full_name,
        sol: latest.sol,
        earthDate: latest.earth_date,
        rover: latest.rover.name
      };

      const shortName = latest.camera.name;
      if (cameraDescriptions[shortName]) {
        cameraInfo.value = cameraDescriptions[shortName];
      }
    } else {
      console.error('Failed to fetch image');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }
});
</script>

<style scoped>
.mars-panel {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: linear-gradient(#3b0a2e, #6b1f4c);
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  color: #eee;
}
</style>