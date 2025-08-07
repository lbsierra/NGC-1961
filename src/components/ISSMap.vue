<template>
    <div id="iss-map" style="height: 400px;"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';

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
      const { latitude, longitude } = data.iss_position;
      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude], map.getZoom()); 
    } catch (err) {
      console.error('Failed to fetch ISS data:', err);
    }
  }

  updateISS(); 
  setInterval(updateISS, 5000);

});

</script>