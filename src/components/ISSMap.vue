<template>
    <div id="iss-map" style="height: 400px;"></div>
    <div v-if="latitude && longitude" class="map-coordinates">
      <p>Latitude: {{ latitude }}, Longitude: {{ longitude }}</p>
    </div>  
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';

const latitude = ref(null);
const longitude = ref(null);
const location = ref('');
const emit = defineEmits(['updateLocation']);


async function getLocation(lat, lon) {
  const url = `http://localhost:5000/api/geocode?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.location || 'the Ocean';
  } catch (err) {
    console.error('Reverse geocoding failed:', err);
    return 'Unknown Location';
  }
}

onMounted(() => {
    const map = L.map('iss-map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

     const marker = L.marker([0, 0]).addTo(map).bindPopup('ISS Location');

  async function updateISS() {
    try {
      const res = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await res.json();
      const { latitude: lat, longitude: lon } = data.iss_position;
      latitude.value = lat;
      longitude.value = lon;
      location.value = await getLocation(lat, lon);

      emit('updateLocation', location.value);

      marker.setLatLng([lat, lon]);
      map.setView([lat, lon], map.getZoom()); 

    } catch (err) {
      console.error('Failed to fetch ISS data:', err);
    }
  }

  updateISS(); 
  setInterval(updateISS, 5000);

});

</script>

<style scoped>

.map-coordinates {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  color: #ccc;
  font-family: 'Orbitron', sans-serif; 
}

</style>